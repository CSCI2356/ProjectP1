
/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * server.js: 
 * This is the node.js file that is run on the server.
 * It provides all the server.post() that will be needed for this
 * project.
 */

//Constant to allow changing the maximum number of emails.
const MAX_NUM_EMAILS = 10; 

const DEBUG_SERVER = false; //SET TO TRUE TO SET UP DEBUGGING FLAGS. 

//constant to changes the port number in one place if required.
var port = 3115;

var express = require('express');  
var mongodb = require('mongodb');   
                                    
//mongodb needs the local host and a credential string to connect.
var username = 'hm_agowun';             
var password = 'A00430163';
var localHost = '127.0.0.1';    // 127.0.0.1 says to use the local host 
var localPort = '27017';        // port number of the local port
var database = 'hm_agowun';     // name of database 
var credentialsString = 'mongodb://' + username + ':' 
    + password + '@' + localHost + ':' + localPort + '/' + database;

var server = express();

// server.use(). This was copy-pasted directly from the professor
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/scripts', express.static(__dirname + '/scripts'));
//This was added because of how the folders in our project are.
server.use('/scripts/composing', express.static(__dirname + '/scripts/composing'));
server.use('/scripts/inboxAndSentItems', express.static(__dirname + '/scripts/inboxAndSentItems'));
server.use('/scripts/viewEmails', express.static(__dirname + '/scripts/viewEmails'));
server.use('/scripts/helps', express.static(__dirname + '/scripts/helps'));
server.use('/css', express.static(__dirname + '/css'));
server.use(express.static(__dirname));
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
server.use(allowCrossDomain);

/*
 * This is the function run if there is an error.
 * It presents a message and ends the calls.
 *
 * err = the error
 * where = the message of where that function failed
 *
 * returns nothing as it ends the execution.
 */ 
function runIfServerError(err, where) {
    console.log("An error occured " + where);
    return;
}

/*** POSTS REQUIRED BY THE INBOX AND SENT ITEMS SCREENS****/


/* This is the post for displaying an email row. */ 
server.post('/displayEmailRows', displayEmailRows);

/*
 * Function passed to the post for displaying an email.
 * 
 * req = the request object sent by the user.
 * res = the response object that we are going to send
 *
 * returns a JSON of all the emails at the given collection name.
 */ 
function displayEmailRows(req, res) {
    var name = req.body.collectionName;
    if (DEBUG_SERVER) {
        console.log("asked to display email rows from collection: " + name);
    }
    globalDB.collection(name).findOne({}, sendEmailsToUser);

    function sendEmailsToUser(err, foundJSON) {
        if (err) runIfServerError(err, "in sending emails to user");

        if (DEBUG_SERVER) {
            console.log("sending emails to user from collection: " + name);
        }

        var JSONToSend = {"JSONInCollection":foundJSON, "collectionName":name};
        return res.status(200).send(JSONToSend);
    }
}

/*
 * This function is used everytime the collection needs to be changed.
 * We first drop the collection, then we insert the new updated one.
 *
 * name = the name of the collection
 * newJSON = the new JSON to be set at that collection
 * purpose = a simple message that is printed on the server.
 *
 * returns N/A
 */ 
function dropAndInsertNewJSON(name, newJSON, purpose) {
    if (DEBUG_SERVER) {
        console.log("dropping and inserting: " + purpose);
    }

    globalDB.collection(name).drop(insertNewJSON);
    
    function insertNewJSON(dropError, dropSuccess) {
        if (dropError) runIfServerError(dropError, "in dropping " + name)
        if (DEBUG_SERVER) {
            console.log("dropSucess:\t" + dropSuccess 
                + "\ninserting new JSON back at:\t" + name);
        }

        if (dropSuccess) {
            globalDB.collection(name).insertOne(newJSON, callAfterInsertion);
        }

        function callAfterInsertion(err) {
            if (err) runIfServerError(err, "in insertion after drop" + name);
            if (DEBUG_SERVER) {
                console.log("insertion After dropping successful:\t" 
                    + name);
            }
        }
    }
}

/*Post for when the user clicks a checkbox*/
server.post('/clickCheckBox', clickCheckBox);

/*
 * Callback function when a check box is clicked.
 *
 * req = the user request
 * res = the response from the server.
 *
 * returns N/A
 */ 
function clickCheckBox(req, res) {
    var name = req.body.collectionName;
    var index = req.body.index;
    if (DEBUG_SERVER) {
        console.log("clicking checkbox:\t" + name);
    }

    globalDB.collection(name).findOne({}, prepareToChangeUrgency);

    function prepareToChangeUrgency(err, foundJSON) {
        if (err) throw err;
        var newJSON = changeUrgency(foundJSON, index);
        dropAndInsertNewJSON(name, newJSON, "For clicking a checkbox");
        if (DEBUG_SERVER) {
            return res.status(200).send({"message":"checkBox success"});
        }
    }

    function changeUrgency(foundJSON, index) {
        if (DEBUG_SERVER) {
            console.log("changing urgency");
        }
        if (foundJSON.emails[index].urgency == "urgent") {
            foundJSON.emails[index].urgency = "not urgent";
        } else {
            foundJSON.emails[index].urgency = "urgent";
        }
        return foundJSON;
    }
}


/*Post for when an email is deleted*/
server.post('/deleteEmail', deleteEmail);

/*
 * Callback function for when an email is deleted.
 * It alters the required JSON by deleting an email.
 *
 * req = the user's request
 * res = the response object
 *
 * returns N/A
 */ 
function deleteEmail(req, res) {
    var name = req.body.collectionName; 
    var index = req.body.index;
    if (DEBUG_SERVER) {
        console.log("deleting email:\t" + name + "\tindex: " + index);
    }
    globalDB.collection(name).findOne({}, deleteTheEmail);

    function deleteTheEmail(err, foundJSON) {
        if (err) runIfServerError(err, "in deleting an email");
        foundJSON.emails.splice(index, 1);
        dropAndInsertNewJSON(name, foundJSON, "For deleting an email");
        if (DEBUG_SERVER) {
            return res.status(200).send({"message" : "delete success"});
        }
    } 
}

/*POST FOR VIEWING AN EMAIL*/

/* This is the post for sending an email to be viewed. */ 
server.post('/viewEmail', viewEmail);

/*
 * CallBack function for when a user wants to read an email
 *
 * req = the request from the user.
 * res = the response from the server.
 *
 * returns the email the user wants to see.
 */ 
function viewEmail(req, res) {
    var name = req.body.collectionName;
    var index = req.body.index;
    if (DEBUG_SERVER) {
        console.log("viewing email in collection: " + name 
            + "\tindex " + index);
    }

    globalDB.collection(name).findOne({}, sendEmailToView);

    function sendEmailToView(err, foundJSON) {
        if (err) runIfServerError(err, "in viewing an email");
        var email = retrieveEmail(foundJSON);
        setReadTag(foundJSON); //Should not be bold.
        var json = {"email" : email};
        return res.status(200).send(json);
    }

    function retrieveEmail(foundJSON) {
        var email = foundJSON.emails[index];
        if (DEBUG_SERVER) {
            console.log("this is the email that was found "+ "\n\t" + email);
        }
        return email;
    }

    function setReadTag(foundJSON) {
        foundJSON.emails[index].read = "read";
        dropAndInsertNewJSON(name, foundJSON, "For setting read tag");
    }
}

/*POST FOR THE COMPOSING SCREENS*/

/*
 * post for when loading a compose page. 
 * checks if there is enough space to compose
 */
server.post('/checkIfEnoughSpace', checkIfEnoughSpace);

/*
 * Callback function that is read when we check if there is enough space
 * to compose an email.
 *
 * req = the request object sent by the user.
 * res = the response object.
 *
 * returns a JSON that says if there is enough space in the inbox and the
 * sent items for this user to be able to compose.
 */ 
function checkIfEnoughSpace(req, res) {
    var inboxName = req.body.inboxName;
    var sentName = req.body.sentName;

    globalDB.collection(inboxName).findOne({}, checkIfEnoughSpaceInbox);

    function checkIfEnoughSpaceInbox(err, foundJSON){
        if (err) runIfServerError(err, "in checking inbox space " + name);

        var enoughInbox = foundJSON.emails.length < MAX_NUM_EMAILS;
        if (DEBUG_SERVER) {
            console.log("enoughInbox: " + enoughInbox);
        }

        globalDB.collection(sentName).findOne({}, checkIfEnoughSpaceSent);
        
        function checkIfEnoughSpaceSent(err, foundJSON) {
            if (err) runIfServerError(err, "in checking sent space " + name);
            var enoughSent = foundJSON.emails.length < MAX_NUM_EMAILS;
            if (DEBUG_SERVER) {
                console.log("enoughSent: " + enoughSent);
            }
            var json = {"enoughInbox":enoughInbox, "enoughSent":enoughSent};
            return res.status(200).send(json);
        }
    }
}

/*Used to store the email in the inbox when sending an email*/
server.post('/storeEmailToInboxJSON', storeEmailToInboxJSON);

/*
 * Callback for storing a JSON in the inbox collection when sending
 * an email
 * 
 * req = the request object sent by the user.
 * res = the response object.
 * 
 * returns N/A
 */ 
function storeEmailToInboxJSON(req, res) {
    var name = req.body.collectionName; 
    var newEmail = req.body.newEmail;

    if (DEBUG_SERVER) {
        console.log("storing email for inbox: " + name);  
        console.log("The email's subject is " + newEmail.subject);
    }
    globalDB.collection(name).findOne({}, storeNewEmail);

    function storeNewEmail(err, foundJSON) {
        if (err) runIfServerError(err, "for storing an inbox email");

        foundJSON.emails.unshift(newEmail);
        dropAndInsertNewJSON(name, foundJSON, "For storing in inbox");
        if (DEBUG_SERVER) {
            return res.status(200).send({"message": "stored inbox"});
        }
    }
}
/*Used to store the email in the inbox when sending an email*/
server.post('/storeEmailToSentJSON', storeEmailToSentJSON);

/*
 * Callback for storing a JSON in the sent collection when sending
 * an email
 * 
 * req = the request object sent by the user.
 * res = the response object.
 * 
 * returns N/A
 */ 
function storeEmailToSentJSON(req, res) {
    var name = req.body.collectionName;   
    var newEmail = req.body.newEmail;
    globalDB.collection(name).findOne({}, storeNewEmail);

    if (DEBUG_SERVER) {
        console.log("storing email for sent: " + name);  
        console.log("The email's subject is " + newEmail.subject);
    }

    function storeNewEmail(err, foundJSON) {
        if (err) runIfServerError(err, "for storing a sent email");
        foundJSON.emails.unshift(newEmail);
        dropAndInsertNewJSON(name, foundJSON, "For storing in sent");
        if (DEBUG_SERVER) {
            return res.status(200).send({"message": "stored sent"});
        }
    }
}

mongodb.connect(credentialsString, getDBReference);
var globalDB;

/*
 * callback for connecting to the database
 *
 * err = the error
 * ref = the reference to the database 
 *
 * returns N/A
 */ 
function getDBReference(err, ref) {
    if (err == null) {
        process.on('SIGTERM', function () {
            console.log("Shutting server down.");
            ref.close();
            server.close();
        });
        globalDB = ref.db("hm_agowun");      
        server.listen(port, function () {
            console.log('Listening on port ' + port);
        });
    }
}
