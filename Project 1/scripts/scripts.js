/*
 * author : Humaid Muhammad Agowun (A00430163)
 * 
 * scripts.js :
 * It is the file that contains all the functions used by all the HTML 
 * webpages for assignment 2 to add responsiveness to the pages.
 */

//Constants to make the code for linking back function more readable.
const FROM_INBOX = 1;
const FROM_ADMIN_INBOX = 3;

const FROM_SENT_ITEMS = 2;
const FROM_ADMIN_SENT_ITEMS = 4;

const STUDENT_INBOX_KEY = "studentInbox";
const ADMIN_INBOX_KEY = "userInbox";

const STUDENT_SENT_ITEMS_KEY = "studentSent";
const ADMIN_SENT_ITEMS_KEY = "adminSent";

const STUDENT_EMAIL = "a";
const ADMIN_EMAIL = "b";

/*
 * Function to link to the inbox page.
 *
 * Pre-conditions: The inbox button is clicked.
 * Post-conditions: The browser now displays the inbox page.
 */ 
function linkInbox() {
    window.location.href = "index.html";
}

/*
 * Function to link to the sent Items page.
 *
 * Pre-conditions: The sent items button is clicked.
 * Post-conditions: The browser now displays the sent items page.
 */ 
function linkSent() {
    window.location.href = "sentItems.html";
}

/*
 * Function to link to the compose page. It sets up local storage 
 * so that we can link back to the original page. 
 *
 * Pre-conditions: 1 or 2 passed through the variable fWhere to say
 * from where the page was linked to from.
 * Post-conditions: The browser displays the compose page and stores 
 * fWhere in local Storage. OR an exception is thrown and the user is alerted.
 */ 
function linkCompose(fWhere) {
    try {
        if (typeof(window.Storage) == "undefined") {
            alert("Local storage is not defined for this browser.")
        } else {
            var json = {"fromWhere" : fWhere};
            localStorage.setItem("fromWhere",JSON.stringify(json));
            window.location.href = "compose.html";
        }
    } catch (e) {
        alert("A " + e.name + " was caught. Message: " + e.message);
    }
}

/*
 * Function to link to a page where an inbox element would be read.
 *
 * Pre-conditions: One of the inbox emails is clicked.
 * Post-conditions: the browser displays the viewInbox page 
 * (currently empty fields).
 */ 
function viewInbox() {
    window.location.href = "viewInbox.html";
}

/*
 * Function to link to a page where a sent element would be read.
 *
 * Pre-conditions: One of the sent emails is clicked.
 * Post-conditions: the browser displays the viewSent page 
 * (currently empty fields).
 */
function viewSent() {
    window.location.href = "viewSent.html";
}

/*
 * Function to link back from the compose page to page where compose was clicked.
 *
 * Pre-conditions: Cancel was clicked.
 * Post-conditions: Browser now displays the previous page or the user is
 * alerted of an exception.
 */ 
function linkBackFromCompose() {
    try {
        var fromWhere = getFromWhereComposeWasClicked()

        //Link Back to the correct page.
        if (fromWhere === FROM_INBOX) {
            window.location.href = "index.html";
        } else if (fromWhere === FROM_SENT_ITEMS) {
            window.location.href = "sentItems.html";
        } else if (fromWhere === FROM_ADMIN_INBOX) {
            window.location.href = "adminInbox.html";
        } else if (fromWhere === FROM_ADMIN_SENT_ITEMS) {
            window.location.href = "adminSentItems.html";
        } else {
            console.log(fromWhere); //Used when debugging. 
        }
    } catch (e) {
        alert("A " + e.name + " was caught. Message: " + e.message);
    }
}

/*
 * Helper function to get the encoding(1 or 2) of from where the compose 
 * page was clicked.
 *
 * Pre-conditions: Method called.
 * Post-condition: The encoding returned and the fromWhere item is removed
 * from Local storage.
 */ 
function getFromWhereComposeWasClicked() {
    var fWhere = JSON.parse(localStorage.getItem("fromWhere")).fromWhere;
    localStorage.removeItem("fromWhere");
    return fWhere;
}

/*
 * Function used to send an email after it was composed.
 * 
 * Pre-condition: the send button is clicked with all the fields of the
 * compose page properly filled.
 * Post-condition: The email is displayed in JSON format in the console.
 */ 
function sendEmail() {
    //Retrieving the values from the text boxes
    var toText = $("#toTextBox").val();
    var ccText = $("#ccTextBox").val();
    var subjectText = $("#subjectTextBox").val();
    var composeText = $("#composeTextBox").val();
    
    addToStorages(toText, ccText, subjectText, composeText);
    linkBackFromCompose();
}

function addToStorages(to, cc, subject, email) {
    if (to == ADMIN_EMAIL) {
        var toInboxEmail = {"from" : STUDENT_EMAIL, "cc" : cc, 
            "sb" : subject, "emailText" : compose};
        var toSentEmail = {"to" : ADMIN_EMAIL, "cc" : cc, 
            "sb" : subject, "emailText" : compose};
        addToJSON(toSentEmail, STUDENT_SENT_ITEMS_KEY);
        addToJSON(toInboxEmail, ADMIN_INBOX_KEY);
    } else if (to == STUDENT_EMAIL){
        var toInboxEmail = {"from" : ADMIN_EMAIL, "cc" : cc, 
            "sb" : subject, "emailText" : compose};
        var toSentEmail = {"to" : STUDENT_EMAIL, "cc" : cc, 
            "sb" : subject, "emailText" : compose};
        addToJSON(email, ADMIN_SENT_ITEMS_KEY);
        addToJSON(email, STUDENT_INBOX_KEY);
    }
}

function addToJSON(email, key) {
    try {
        if (typeof(window.Storage) === "undefined") {
            alert("No local Storage");
        } else if (localStorage.getItem(key) === null) {
            var json = {"emails":[email]};
            localStorage.setItem(key, JSON.stringify(json));
            alert("new JSON: " + key);
        } else if (localStorage.getItem(key) !== null) {
            var mailsJSON = JSON.parse(localStorage.getItem(key));
            mailsJSON.mails.push(email);
            localStorage.setItem(key, JSON.stringify(mailsJSON));
            alert("added to JSON: " + key);
        }
    } catch (e) {
        alert("A " + e.name + " was caught.\nIts messsage is: " + e.message);
    }
}

function loadStudentInbox() {
    displayInboxEmails(STUDENT_INBOX_KEY);
}

function loadAdminInbox() {
    displayInboxEmails(ADMIN_INBOX_KEY);
}

function loadStudentSent() {
    displaySentEmails(STUDENT_SENT_ITEMS_KEY);
}

function loadAdminSent() {
    displaySentEmails(ADMIN_SENT_ITEMS_KEY);
}


function displayInboxEmails(key) {
    var divPointer = $("div.toDisplayInboxEmails");
    var emails = JSON.parse(localStorage.getItem(key)).emails;

    var toDisplay = "";
    for (var i = 0; i < emails.length; i++) {
        toDisplay += '<span class = "rowButtons" onclick=viewInboxEmail('
            + i +')>'+ '<a data-role="button" class="btn email">' 
            + emails[i].from + '</a>' //The emails' to is 'from' for other user 
            + '<a data-role="button class="btn email">'
            + emails[i].subject + '</a>'
            + '<span><br>';
    }
    divPointer.html(toDisplay);
    console.log("successful");
}

function displaySentEmails(key) {
        var divPointer = $("div.toDisplaySentItems");
    var emails = JSON.parse(localStorage.getItem(key)).mails;

    var toDisplay = "";
    for (var i = 0; i < emails.length; i++) {
        toDisplay += '<span class = "rowButtons" onclick=viewSentEmail('
            + i +')>'+ '<a data-role="button" class="btn email">' 
            + emails[i].to + '</a>' 
            + '<a data-role="button class="btn email">'
            + emails[i].subject + '</a>'
            + '<span>';
    }
    divPointer.html(toDisplay);
}

function linkAdminInbox() {
    window.location.href = "adminInbox.html";
}

function linkAdminSentItems() {
    window.location.href = "adminSentItems.html";
}

function deleteEmail() {
    console.log("DELETE");
}
