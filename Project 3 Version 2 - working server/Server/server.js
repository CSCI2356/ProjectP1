const MAX_NUM_EMAILS = 10; 

var express = require('express');  
var mongodb = require('mongodb');   
                                    
                                    
var username = 'hm_agowun';             
var password = 'A00430163';
var localHost = '127.0.0.1';  //127.0.0.1 says to use the local host on the current server... mongodb needs the local host in the credential string.
                                    
var localPort = '27017';            // port number of the local port
var database = 'hm_agowun';             // name of database (yours should be the same as your username)

var credentialsString = 'mongodb://' + username + ':' + password + '@' + localHost + ':' + localPort + '/' + database;

var server = express();

var port = 3115;

// server.use()
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/scripts', express.static(__dirname + '/scripts'));
server.use('/css', express.static(__dirname + '/css'));
server.use(express.static(__dirname));
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
server.use(allowCrossDomain);


/*** POST ****/

server.post('/checkIfEnoughSpace', checkIfEnoughSpace);
function checkIfEnoughSpace(req, res) {
    var inboxKey = req.body.inboxKey;
    var sentKey = req.body.sentKey;
    globalDB.collection(inboxKey).findOne({}, checkIfEnoughSpaceInbox);
    function checkIfEnoughSpaceInbox(err, foundJSON){
        if (err == null) {
            console.log(inboxKey + "   " + foundJSON.emails);
            var enoughInbox = foundJSON.emails.length < MAX_NUM_EMAILS;
            globalDB.collection(sentKey).findOne({}, checkIfEnoughSpaceSent);
            function checkIfEnoughSpaceSent(err, foundJSON) {
                if (err==null) {
                    var enoughSent = foundJSON.emails.length < MAX_NUM_EMAILS;
                    var json = {"enoughInbox":enoughInbox, "enoughSent":enoughSent};
                    return res.status(200).send(json);
                }
            }
        }
    }
}

server.post('/storeEmailToInboxJSON', storeEmailToInboxJSON);
function storeEmailToInboxJSON(req, res) {
    var key = req.body.key; 
    console.log(key);  
    var newEmail = req.body.newEmail;
    console.log(newEmail);
    globalDB.collection(key).findOne({}, storeNewEmail);

    function storeNewEmail(err, foundJSON) {
        if (err == null) {
            addNewEmailToKey(key, foundJSON, newEmail); 
        }
    }
}

function addNewEmailToKey(key, json, newEmail) {
    json.emails.unshift(newEmail);
    dropAndInsertNewJSON(key, json);
}

function dropAndInsertNewJSON(key, newJSON) {
    globalDB.collection(key).drop(insertNewJSON);
    console.log("drop     " + key);
    function insertNewJSON(dropError, dropSuccess) {
        console.log("the insert new JSON is reached");
        console.log("dropSucess   " + dropSuccess);
        if (dropSuccess) {
            console.log("drop sucess reached");
            console.log(newJSON);
            globalDB.collection(key).insertOne(
                newJSON, callAfterInsertion);
        }
    }
}

function callAfterInsertion(err) {
    console.log("call after insertion reached");
    if(err != null) {
         console.log("an error occurred on the server");
    }
}

server.post('/storeEmailToSentJSON', storeEmailToSentJSON);
function storeEmailToSentJSON(req, res) {
    var key = req.body.key;   
    var newEmail = req.body.newEmail;
    globalDB.collection(key).findOne({}, storeNewEmail);

    function storeNewEmail(err, foundJSON) {
        if (err == null) {
            addNewEmailToKey(key, foundJSON, newEmail);         
        }
    }
}



server.post('/clickCheckBox', clickCheckBox);
function clickCheckBox(req, res) {
    var key = req.body.key;
    var index = req.body.index;
    globalDB.collection(key).findOne({}, prepareToChangeUrgency);

    function prepareToChangeUrgency(err, foundJSON) {
        if (err==null) {
            var json = changeUrgency(foundJSON, index);
            dropAndInsertNewJSON(key, json);
        }
    }
}

function changeUrgency(foundJSON, index) {
    if (foundJSON.emails[index].urgency == "urgent") {
                foundJSON.emails[index].urgency = "not urgent";
    } else {
        foundJSON.emails[index].urgency = "urgent";
    }
    return foundJSON;
}

server.post('/deleteEmail', deleteEmail);

function deleteEmail(req, res) {
    var key = req.body.key; 
    var index = req.body.index;
    globalDB.collection(key).findOne({}, deleteTheEmail);

    function deleteTheEmail(err, foundJSON) {
        if (err == null) {
            foundJSON.emails.splice(index, 1);
            dropAndInsertNewJSON(key, foundJSON);
        }
    } 
}

server.post('/viewEmail', viewEmail);
function viewEmail(req, res) {
    var key = req.body.key;
    var index = req.body.index;
    console.log("viewing email  " + key + "\tindex " + index);
    var email;
    globalDB.collection(key).findOne({}, getEmail);
    function getEmail(err, foundJSON) {
        if (err==null) {
            console.log(foundJSON);
            email = foundJSON.emails[index];
            console.log(email);
            var json = {"email" : email};
            foundJSON.emails[index].read = "read";
            dropAndInsertNewJSON(key, foundJSON);
            return res.status(200).send(json);
        }
    }
}

server.post('/displayEmailRows', displayEmailRows);
function displayEmailRows(req, res) {
    var key = req.body.key;
    console.log(key);
    globalDB.collection(key).findOne({}, sendJSONToUser);

    function sendJSONToUser(err, foundJSON) {
        if (err == null) {
            console.log("sendJSONToUser" + key);
            var JSONToSend = {"foundJSON" : foundJSON, "key":key};
            return res.status(200).send(JSONToSend);
        }
    }
}

mongodb.connect(credentialsString, getDBReference);
var globalDB;

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


