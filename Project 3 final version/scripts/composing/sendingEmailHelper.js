/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * sendAdminEmail.js:
 * js file that is used by both the admin and student compose screens 
 * to send an email. It contains function that are repeating between
 * sendAdminEmail and sendStudentEmail.
 */

//Constant for the review message.
const REVIEW_MESSAGE = "1) Is everything spelled correctly?"
    + "\n\n2) Did you use full sentences?"
    + "\n\n3) Is the email addressed to the correct person?"
    + "\n\n4) Did you sign your name at the end of the email?";

/*
 * Function that creates the JSON for the request sent to the server.
 *
 * name = the collection name
 * emailJSON = the new email to be put on the server.
 *
 * return the JSON for the request.
 */ 
function createNameEmailReq(name, emailJSON) {
    return {"collectionName":name, "newEmail":emailJSON};
}

/*
 * Function that both the student and admin compose email call to post on
 * the server.
 *
 * reqInboxJSON = the request used to store in an inbox name
 * reqSentJSON = the request used to store in an set name
 */ 
function callPostForSendingEmails(reqInboxJSON, reqSentItemsJSON) {
    if (DEBUG) {
        alert("reqInboxJSON.collectionName: " + reqInboxJSON.collectionName
            + "\nreqSentItemsJSON.collectionName: " 
            + reqSentItemsJSON.collectionName);
    }
    $.post(SERVER_URL + '/storeEmailToInboxJSON', reqInboxJSON,
        runAfterStoringInbox).fail(runIfFailStoring);
    $.post(SERVER_URL + '/storeEmailToSentJSON', reqSentItemsJSON,
        runAfterStoringSent).fail(runIfFailStoring);

    function runAfterStoringInbox(data) {
        if (DEBUG) alert(data.message);
    }

    function runAfterStoringSent(data) {
        if (DEBUG) alert(data.message);
    }

    function runIfFailStoring(err) {
        if (DEBUG) alert("error in storing an email");
    }
}

/*
 * Function that is used by both admin and student compose scripts to 
 * create the email JSON
 *
 * partner = the email to or from.
 * cc = the email's cc
 * subject = the email's subject
 * emailText = the email's body text
 * read = flag used to change from bold to not bold
 * urgency = flag used to tick the emails
 *
 * returns an email JSON
 */ 
function createEmailJSON (partner, cc, subject, emailText, 
    read, urgency) {
    return {"conversationPartner" : partner, "cc" : cc, 
            "subject" : subject, "emailText" : emailText, 
            "read" : read, "urgency" : urgency};
}
