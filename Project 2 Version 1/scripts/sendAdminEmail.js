
/*
 * Important comments:
 *
 * Our email JSON looks like this: 
 * {
 *      conversationPartner : ""
 *      cc : ""
 *      subject : ""
 *      body : ""
 *      read : "read" OR "unread"
 * }
 */

//Constants for key
const STUDENT_INBOX_KEY = "studentInbox";
const ADMIN_INBOX_KEY = "adminInbox";

const STUDENT_SENT_ITEMS_KEY = "studentSent";
const ADMIN_SENT_ITEMS_KEY = "adminSent";

const REVIEW_MESSAGE = "1) Is everything spelled correctly?"
    + "\n\n2) Did you use full sentences?"
    + "\n\n3) Is the email addressed to the correct person?"
    + "\n\n4) Did you sign your name at the end of the email?";

/*buttons methods*/

function sendAdminEmail() {
    var from = $("#fromDropDown").val(); 
    if (from == null || from.length == 0) {
        alert('"From" field is blank');
        return;
    }
    var ans = confirm(REVIEW_MESSAGE);
    if (ans == true) {
        //Retrieving the values from the text boxes
        var to = $("#toDropDown").val();
        var cc = $("#ccDropDown").val();
        var subject = $("#subjectTextBox").val();
        var body = $("#composeTextBox").val();
        try {
            storeAdminEmailTwice(to, from, cc, subject, body);
            linkBackAfterSending();
        } catch (e) {
            alert(e.name + "\n" + e.message);
        }
    }
}

function storeAdminEmailTwice(to, from, cc, subject, body) {
    //Admin is sending an email
    storeJSONAtGivenKey(
        createEmailJSON(to, cc, subject, body, "read"), 
        ADMIN_SENT_ITEMS_KEY);
    storeJSONAtGivenKey(
        createEmailJSON(from, cc, subject, body, "unread"), 
        STUDENT_INBOX_KEY);
}

function createEmailJSON (partner, cc, subject, emailText, read) {
    return {"conversationPartner" : partner, "cc" : cc, 
            "subject" : subject, "emailText" : emailText, 
            "read" : read};
}

function storeJSONAtGivenKey(json, key) {
    if (localStorage.getItem(key) === null) {
        //Need to create JSON
        var toLocalStorage = {"emails" : [json]};
        localStorage.setItem(key, JSON.stringify(toLocalStorage));
    } else if (localStorage.getItem(key) !== null) {
        //JSON already exists need to add new item
        var mailsJSON = JSON.parse(localStorage.getItem(key));
        mailsJSON.emails.unshift(json);
        localStorage.setItem(key, JSON.stringify(mailsJSON));
    }
}
