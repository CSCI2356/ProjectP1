
/*
 * Important comments:
 *
 * Our email JSON looks like this: 
 * {
 *      conversationPartner : ""
 *      cc : ""
 *      subject : ""
 *      body : ""
 * }
 */

const FROM_STUDENT_INBOX = 1;
const FROM_STUDENT_SENT_ITEMS = 2;

//Constants for email
const STUDENT_EMAIL = "student";
const ADMIN_EMAIL = "admin";

//Constants for key
const STUDENT_INBOX_KEY = "studentInbox";
const ADMIN_INBOX_KEY = "adminInbox";

const STUDENT_SENT_ITEMS_KEY = "studentSent";
const ADMIN_SENT_ITEMS_KEY = "adminSent";

/*buttons methods*/

function linkBack() {
    window.history.back();
}

function sendStudentEmail() {
    //Retrieving the values from the text boxes
    var to = $("#toTextBox").val();
    var cc = $("#ccTextBox").val();
    var subject = $("#subjectTextBox").val();
    var body = $("#composeTextBox").val();
    try {
        storeStudentEmailTwice(to, cc, subject, body);
        linkBackAfterSending();
    } catch (e) {
        alert(e.name + "\n" + e.message);
    }
}

function storeStudentEmailTwice(to, cc, subject, body) {
    //Student is sending an email
    storeJSONAtGivenKey(
        createEmailJSON(ADMIN_EMAIL, cc, subject, body), 
        STUDENT_SENT_ITEMS_KEY);
    storeJSONAtGivenKey(
        createEmailJSON(STUDENT_EMAIL, cc, subject, body), 
        ADMIN_INBOX_KEY);
}

function createEmailJSON (partner , cc, subject, emailText) {
    return {"conversationPartner" : partner, "cc" : cc, 
            "subject" : subject, "emailText" : emailText};
}


function storeJSONAtGivenKey(json, key) {
    if (localStorage.getItem(key) === null) {
        //Need to create JSON
        var toLocalStorage = {"emails" : [json]};
        localStorage.setItem(key, JSON.stringify(toLocalStorage));
    } else if (localStorage.getItem(key) !== null) {
        //JSON already exists need to add new item
        var mailsJSON = JSON.parse(localStorage.getItem(key));
        mailsJSON.emails.push(json);
        localStorage.setItem(key, JSON.stringify(mailsJSON));
    }
}

function linkBackAfterSending() {
    try {
        var fromWhere = getFromWhereComposeWasClicked()
        linkBackToCorrectPage(fromWhere);
    } catch (e) {
        alert(e.name + "\n" + e.message);
    }
}

function linkBackToCorrectPage(fromWhere) {
    //Link Back to the correct page.
    if (fromWhere === FROM_STUDENT_INBOX) {
        window.location.href = "index.html";
    } else if (fromWhere === FROM_STUDENT_SENT_ITEMS) {
        window.location.href = "sentItems.html";
    } 
}

function getFromWhereComposeWasClicked() {
    var fWhere = JSON.parse(localStorage.getItem("fromWhere")).fromWhere;
    localStorage.removeItem("fromWhere");
    return fWhere;
}
