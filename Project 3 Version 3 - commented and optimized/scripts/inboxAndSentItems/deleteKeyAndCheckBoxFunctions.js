/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * deleteKeyAndCheckBoxFunctions.js:
 * js file that is used by the inbox and sent items screens.
 * It describes :how to delete an email,
 *               what happens when the check box is clicked
 */

/*
 * Function read when checkbox is clicked.
 *
 * i = index of the email.
 * encoding = encoding for the collection name.
 *
 * returns N/A
 */ 
function clickCheckBox(i, encoding) {
    var name = getNameFromEncoding(encoding);
    $.post(SERVER_URL + '/clickCheckBox', 
        createNameIndexReq(name, i), 
        runOnCheckBoxSuccess).fail(runOnCheckBoxError);

    function runOnCheckBoxSuccess(data) {
        if (DEBUG) console.log("checkBox click successful");
    }

    function runOnCheckBoxError(err) {
        alert("Server error in clicking checkbox");
    }
}


/*
 * Function that create the request for the deletion and urgency server logic.
 *
 * name = the collection name
 * i = the index of the email
 *
 * return a JSON that is used as a request for posts.
 */ 
function createNameIndexReq(name, i) {
    return {"collectionName":name, "index":i};
}

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
        if (DEBUG) console.log("deletion was a success");
    }

    function runOnSuccessFulDeletion(data) {
        console.log("deletion was successful");
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
