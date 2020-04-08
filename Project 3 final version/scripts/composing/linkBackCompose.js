/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * linkBackCompose.js:
 * js file that is used by BOTH admin and student inbox, sent items 
 * and compose screen to link back from their compose screen.
 */

/*
 * Function to cancel composing an email. Ask for confirmation and links 
 * back. It is used when the cancel button is clicked.
 *
 * no inputs
 * 
 * return N/A
 */ 
function cancel() {
    var ans = confirm("Are you sure you want to cancel?");
    if (ans == true) {
        returnToPreviousScreen();
    }
}

/*
 * Function that links back to the previous screen based on fromWhere's 
 * value. Also used when there are too many emails in the recipient inbox
 * or the current user's sent items
 * 
 * no inputs
 * 
 * returns N/A
 */ 
function returnToPreviousScreen() {
    var fromWhere = getFromWhereComposeWasClicked();
    if (DEBUG) {
        alert("returning to previous screen. fromWhere: " + fromWhere);
    }
    linkBackToCorrectPage(fromWhere);
}

/*
 * Function to link back after sending an email. Required because we are 
 * allowing reply.
 * 
 * no inputs
 * 
 * return N/A
 */ 
function linkBackAfterSending() {
    try {
        returnToPreviousScreen();
    } catch (e) {
        alert(e.name + "\n" + e.message);
    }
}

/*
 * Functions that gets fromWhere from local Storage and returns it
 * 
 * no inputs
 * 
 * return an integer encoding the fromWhere compose was clicked
 */ 
function getFromWhereComposeWasClicked() {
    var fWhere = JSON.parse(localStorage.getItem("fromWhere")).fromWhere;
    localStorage.removeItem("fromWhere");
    return fWhere;
}

/*
 * Function that links back to the correct page based on which fromWhere 
 * was used.
 * 
 * fromWhere = the integer encoding from Where compose was clicked
 * 
 * returns N/A
 */ 
function linkBackToCorrectPage(fromWhere) {
    //Link Back to the correct page.
    if (fromWhere === FROM_ADMIN_INBOX) {
        window.location.href = "adminInbox.html";
    } else if (fromWhere === FROM_ADMIN_SENT_ITEMS) {
        window.location.href = "adminSentItems.html";
    } else if (fromWhere === FROM_STUDENT_INBOX) {
        window.location.href = "index.html";
    } else if (fromWhere === FROM_STUDENT_SENT_ITEMS) {
        window.location.href = "sentItems.html";
    }
}
