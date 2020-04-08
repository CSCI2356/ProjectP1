/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * displayEmails.js:
 * js file that is used by the inbox and sent items screens.
 * It is used to fetch emails from the server and 
 * display them on the screen.
 */

/*
 * Function that is called from the load..Emails function for the 
 * admin and student inbox. The function fetches the emails from the 
 * server and displays them on the screen.
 *
 * collectionName = the name of the collection on the server.
 *
 * returns N/A
 */ 
function addInboxEmailsFromCollection(collectionName) {
    var req = {"collectionName": collectionName};
    if (DEBUG) {
        alert("inbox collectionName: " + req.collectionName);
    }
    $.post(SERVER_URL + '/displayEmailRows', req,
        displayInboxEmails).fail(runOnAdditionError);
}

/*
 * Callback function read when the emails have been returned from the server.
 * It adds the email strings to HTML.
 *
 * data = data received from the server
 * 
 * returns N/A
 */ 
function displayInboxEmails(data) {
    var emails = data.JSONInCollection.emails;
    var name = data.collectionName;
    if (DEBUG) {
        alert("display inbox reached.\nname: " + data.collectionName);
    }
    var encoding = getCodeFromName(name);
    for (var i = 0; i < emails.length && i < MAX_NUM_EMAILS; i++) {
        $("div.email" + i).html(
            createNewInboxRow(i, encoding, emails[i]) + "<br><br>"
        );
    }
}

/*
 * Function that creates a new inbox row, that is the FROM and SUBJECT
 * buttons, the checkbox and the delete key for one row.
 *
 * i = the index of the email
 * encoding = the encoding for the collection name.
 * email = the json containing the email.
 *
 * return a string containing an inbox email row.
 */ 
function createNewInboxRow(i, encoding, email) {
    return '<div data-type="horizontal">'
            + createEmailTwoButtons(i,encoding, email)
            + createCheckBox(email.urgency, i, encoding)
            + createDeleteKey(encoding, i)
         + '</div>';
}

/*
 * Function that is run in case of errors in the server.
 *
 * err = the error object.
 *
 * returns N/A
 */ 
function runOnAdditionError(err) {
    alert("There was a server error in adding the emails to this page.");
}


/*
 * Function that is called from the load..Emails function for the 
 * admin and student sent items. The function fetches the emails from 
 * the server and display them on the screen.
 *
 * name = the name of the collection on the server.
 *
 * returns N/A
 */ 
function addSentEmailsFromCollection(name) {
    var req = {"collectionName":name};
    if (DEBUG) {
        alert("sent collectionName: " + req.collectionName);
    }
    $.post(SERVER_URL + '/displayEmailRows', req,
        displaySentEmails).fail(runOnAdditionError);
}

/*
 * Callback function read when the emails have been returned from the server.
 * It adds the email strings to HTML for the sent items screen/No checkBox.
 *
 * data = data received from the server
 *
 * returns N/A
 */ 
function displaySentEmails(data) {
    var emails = data.JSONInCollection.emails;
    var name = data.collectionName;
    if (DEBUG) {
        alert("display sent reached.\nname: " + data.collectionName);
    }

    var encoding = getCodeFromName(name);
    for (var i = 0; i < emails.length && i < MAX_NUM_EMAILS; i++) {
        $("div.email" + i).html(
            createNewSentRow(i, encoding, emails[i]) + "<br><br>"
        );
    }
}

/*
 * Function that creates a new sent items row, that is the TO and SUBJECT
 * buttons and the delete key for one row.
 *
 * i = the index of the email
 * encoding = the encoding for the collection name.
 * email = the json containing the email.
 *
 * returns the string containing a sent email row.
 */
function createNewSentRow(i, encoding, email) {
    return '<div data-type="horizontal">'
            + createEmailTwoButtons(i, encoding, email)
            + createDeleteKey(encoding, i)
        + '</div>';
}
