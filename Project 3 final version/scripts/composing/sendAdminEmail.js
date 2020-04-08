/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * sendAdminEmail.js:
 * js file that is used by the admin compose screens to send an email.
 * It contains the function for the SEND button.
 */

/*
 * Function that is run when the send button is pressed in the admin compose
 * screen. Stores the email on the server.
 *
 * no inputs
 *
 * returns N/A
 */ 
function sendAdminEmail() {
    //Checking if the from field is not empty.
    var from = $("#fromDropDown").val(); 
    if (from == null || from.length == 0) {
        alert('"From" field is blank');
        return; //Cancels the sending of the email.
    }

    var ans = confirm(REVIEW_MESSAGE);
    if (ans == true) {
        //Retrieving the values from the text boxes
        var to = $("#toDropDown").val();
        var cc = $("#ccDropDown").val();
        var subject = $("#subjectTextBox").val();
        var body = $("#composeTextBox").val();
        storeAdminEmailOnServer(to, from, cc, subject, body);
        linkBackAfterSending();
    }
}

/*
 * Function that sends the email to the server and stores it in the database.
 *
 * to = the email's to 
 * from = the email's from
 * cc = the email's cc
 * subject = the email's subject
 * body = the email's body 
 *
 * returns N/A
 */ 
function storeAdminEmailOnServer(to, from, cc, subject, body) {
    var reqInboxJSON = createNameEmailReq(
        STUDENT_INBOX_NAME, 
        createEmailJSON(from, cc, subject, body, "unread", "not urgent")
    );
    var reqSentItemsJSON = createNameEmailReq(
        ADMIN_SENT_ITEMS_NAME, 
        createEmailJSON(to, cc, subject, body, "read", "not urgent")
    );

    callPostForSendingEmails(reqInboxJSON, reqSentItemsJSON);
}
