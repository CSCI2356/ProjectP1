/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * deleteKey.js:
 * js file that is used by the inbox and sent items screens.
 * It describes :how to delete an email,
 */

/*DELETING AN EMAIL*/

/*
 * Function that deletes an email. Is the function that is run on clicking the 
 * delete key.
 *
 * encoding = encoding for the collection Name.
 * i = the index of the email
 *
 * returns N/A
 */ 
function deleteEmail(encoding, i) {
    var ans = confirm("Are you sure you want to delete this email?");

    if (ans == true) {
        var name = getNameFromEncoding(encoding);
        $.post(SERVER_URL + '/deleteEmail', 
            createNameIndexReq(name, i), 
            runOnSuccessFulDeletion).fail(runOnDeleteFail);
        reloadPage(name);
    }

    function runOnSuccessFulDeletion(data) {
        if (DEBUG) {
            alert(data.message);
        }
    }

    function runOnDeleteFail(err) {
        alert("could not delete email");
    }
}

/*
 * After removing the email from the JSON, we reload the page. This is the
 * function that reloads the page based on the key used.
 *
 * name = name of the collection from which an email was deleted
 *
 * returns N/A
 */ 
function reloadPage(name) {
    if (name === ADMIN_INBOX_NAME) {
        window.location.href = "adminInbox.html";
    } else if (name === ADMIN_SENT_ITEMS_NAME) {
        window.location.href = "adminSentItems.html";
    } else if (name == STUDENT_INBOX_NAME) {
        window.location.href = "index.html";
    } else if (name == STUDENT_SENT_ITEMS_NAME) {
        window.location.href = "sentItems.html";
    }
}
