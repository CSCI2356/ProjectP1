/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * js file that is used by BOTH admin and student inbox, sent items 
 * and compose screen to link back from their compose screen.
 */

//Constants that help readability of linking back
const FROM_STUDENT_INBOX = 1;
const FROM_STUDENT_SENT_ITEMS = 2;
const FROM_ADMIN_INBOX = 3;
const FROM_ADMIN_SENT_ITEMS = 4;

/*
 * Function to cancel composing an email. Ask for confirmation and links 
 * back.
 * no inputs
 * return N/A
 */ 
function cancel() {
    var ans = confirm("Are you sure you want to cancel?");
    if (ans == true) {
        localStorage.removeItem("fromWhere"); //Clean up side effect
        window.history.back();
    }
}

/*
 * Function to link back after sending an email. Required because we are 
 * allowing reply.
 * no inputs
 * return N/A
 */ 
function linkBackAfterSending() {
    try {
        var fromWhere = getFromWhereComposeWasClicked()
        linkBackToCorrectPage(fromWhere);
    } catch (e) {
        alert(e.name + "\n" + e.message);
    }
}

/*
 * Functions that gets fromWhere from local Storage and returns it
 * no inputs
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
 * fromWhere - the integer encoding from Where compose was clicked
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
