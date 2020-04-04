/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * js file that is used by the admin compose screens to send an email.
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
 *      urgency : "urgent" OR "not urgent"
 * }
 */

const REVIEW_MESSAGE = "1) Is everything spelled correctly?"
    + "\n\n2) Did you use full sentences?"
    + "\n\n3) Is the email addressed to the correct person?"
    + "\n\n4) Did you sign your name at the end of the email?";

/*buttons methods*/

function sendAdminEmail() {
    //Checking if the from field is not empty.
    var from = $("#fromDropDown").val(); 
    if (from == null || from.length == 0) {
        alert('"From" field is blank');
        return; //Cancels the sending of the email.
    }

    //Sending an email
    var ans = confirm(REVIEW_MESSAGE);
    if (ans == true) {
        //Retrieving the values from the text boxes
        var to = $("#toDropDown").val();
        var cc = $("#ccDropDown").val();
        var subject = $("#subjectTextBox").val();
        var body = $("#composeTextBox").val();
        try {
            storeAdminEmailOnServer(to, from, cc, subject, body);
            linkBackAfterSending();
        } catch (e) {
            alert(e.name + "\n" + e.message);
        }
    }
}

function storeAdminEmailOnServer(to, from, cc, subject, body) {
    var reqInboxJSON = createReqJSONForSending(STUDENT_INBOX_KEY, 
        createEmailJSON(from, cc, subject, body, "unread",
            "not urgent"));
    var reqSentItemsJSON = createReqJSONForSending(ADMIN_SENT_ITEMS_KEY, 
        createEmailJSON(to, cc, subject, body, "read", 
            "not urgent"));

    callPostForSendingEmails(reqInboxJSON, reqSentItemsJSON);
}

function createReqJSONForSending(key, emailJSON) {
    return {"key":key, "newEmail":emailJSON};
}

function callPostForSendingEmails(reqInboxJSON, reqSentItemsJSON) {
    $.post(SERVER_URL + '/storeEmailToInboxJSON', reqInboxJSON,
    displayMessageFromServer).fail(errorFunction);
    $.post(SERVER_URL + '/storeEmailToSentJSON', reqSentItemsJSON,
    displayMessageFromServer).fail(errorFunction);

    function displayMessageFromServer(data) {
        alert(data.message);
    }

    function errorFunction(error) {
        alert(error);
    }
}

function createEmailJSON (partner, cc, subject, emailText, 
    read, urgency) {
    return {"conversationPartner" : partner, "cc" : cc, 
            "subject" : subject, "emailText" : emailText, 
            "read" : read, "urgency" : urgency};
}
