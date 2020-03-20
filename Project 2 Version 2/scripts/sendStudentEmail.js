/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * js file that is used by the student compose screens to send an email.
 * The SEND button.
 */

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

//Constants for student Email. THE STUDENT dont have a FROM!!!
const STUDENT_EMAIL = "student"

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

/*
 * Function read on pressing the send Button in the student compose screen.
 * It creates and stores an email JSON in the appropriate local Storage keys.
 *
 * no inputs
 *
 * returns N/A
 */ 
function sendStudentEmail() {
    var ans = confirm(REVIEW_MESSAGE);
    if (ans == true) {
        //Retrieving the values from the text boxes
        var to = $("#toDropDown").val();
        var cc = $("#ccDropDown").val();
        var subject = $("#subjectTextBox").val();
        var body = $("#composeTextBox").val();
        try {
            storeStudentEmailTwice(to, cc, subject, body);
            linkBackAfterSending();
        } catch (e) {
            alert(e.name + "\n" + e.message);
        }
    }
}

/*
 * Uses the fields to creates JSON that are stored in two appropriate local 
 * Storage keys.
 *
 * to = the to text from its textBox
 * cc = the cc text from its textBox
 * subject = the subject text from its textBox
 * body = the body text from its textArea
 *
 * returns N/A
 */ 
function storeStudentEmailTwice(to, cc, subject, body) {
    //Student is sending an email: student Sent and admin inbox
    storeJSONAtGivenKey(
        createEmailJSON(to, cc, subject, body, "read"), 
        STUDENT_SENT_ITEMS_KEY);
    storeJSONAtGivenKey(
        createEmailJSON(STUDENT_EMAIL, cc, subject, body, "unread"), 
        ADMIN_INBOX_KEY);
}

/*
 * Function that creates the email JSON.
 *
 * partner = the email to or from
 * cc = the email cc
 * subject = the email subject
 * emailText = the email email compose text
 * read = used to say whether the email was read or not. used for BOLD
 *
 * returns the JSON created.
 */ 
function createEmailJSON (partner , cc, subject, emailText, read) {
    return {"conversationPartner" : partner, "cc" : cc, 
            "subject" : subject, "emailText" : emailText,
            "read" : read};
}

/*
 * Places the JSON at the correct key in local Storage.
 *
 * json = the email json to store
 *
 * key = the local Storage key containing the JSON of emails.
 */ 
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
