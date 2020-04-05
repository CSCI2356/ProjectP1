/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * settingUpToViewEmail.js
 * js file for when the user click on an email.
 * It sets up to link the viewSent or viewInbox.html
 */

/*
 * The function that is called when the user wants to view an email.
 * It takes the index and the encoding, sets up a JSON and just links to the 
 * appropriate page.
 *
 * i = the index of the email
 * encoding = the code for the key that is displayed on the screen.
 *
 * returns N/A
 */
function viewEmail(i , encoding) {
    try {
        var name = getNameFromEncoding(encoding);
        var json = {"collectionName": name, 
            "index" : i, "fromWhere" : getFromWhere(name)};
        localStorage.setItem("emailToView", JSON.stringify(json));
        linkToCorrectViewPage(name);
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}

/*
 * Function used to get the fromWhere for a collection name. 
 * this is required to allow users to reply to an email.
 *
 * name = the name of the collection where the email the student wants to see
 * is.
 *
 * returns an integer representing the fromWhere.
 */ 
function getFromWhere(name) {
    if (name == STUDENT_INBOX_NAME) return FROM_STUDENT_INBOX;
    else if (name == STUDENT_SENT_ITEMS_NAME) return FROM_STUDENT_SENT_ITEMS;
    else if (name == ADMIN_INBOX_NAME) return FROM_ADMIN_INBOX;
    else if (name == ADMIN_SENT_ITEMS_NAME) return FROM_ADMIN_SENT_ITEMS;
    else alert("AN ISSUE OCCURED IN getFromWhere().");
}

/*
 * Function that links to the student's or admin's viewInbox or viewSent page
 * based on what email is clicked.
 * 
 * name = the name of the collection where the email the student wants to see
 * is.
 * 
 * returns N/A
 */
function linkToCorrectViewPage(name) {
    if (name == STUDENT_SENT_ITEMS_NAME) {
        window.location.href = "viewSent.html";
    } else if (name == ADMIN_SENT_ITEMS_NAME) {
        window.location.href = "viewSentAdmin.html";
    } else if (name == ADMIN_INBOX_NAME) {
        window.location.href = "viewInboxAdmin.html";
    } else if (name == STUDENT_INBOX_NAME) {
        window.location.href = "viewInbox.html";
    }
}
