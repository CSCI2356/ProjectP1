/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * sendStudentEmail.js:
 * js file that is used by the student compose screens to send an email.
 * The SEND button.
 */

/*buttons methods*/

/*
 * Function that is run when the send button is pressed in the student compose
 * screen. Stores the email on the server.
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

        storeStudentEmailOnServer(to, cc, subject, body);
        linkBackAfterSending();
    }
}

/*
 * Function that sends the email to the server and stores it in the database.
 *
 * to = the email's to 
 * cc = the email's cc
 * subject = the email's subject
 * body = the email's body 
 *
 * returns N/A
 */ 
function storeStudentEmailOnServer(to, cc, subject, body) {
    var reqInboxJSON = createNameEmailReq(
        ADMIN_INBOX_NAME,
        createEmailJSON(STUDENT_EMAIL, cc, subject, body, "unread", "not urgent")
    );
    var reqSentItemsJSON = createNameEmailReq(
        STUDENT_SENT_ITEMS_NAME,
        createEmailJSON(to, cc, subject, body, "read", "not urgent")
    );
    callPostForSendingEmails(reqInboxJSON, reqSentItemsJSON);
}
