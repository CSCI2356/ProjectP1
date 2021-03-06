/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * js file that is used by the student inbox, sent items and compose screen
 * which helps linking between the files.
 */


/*student Inbox/index methods*/
/*
 * Function that links to the student sent item screen
 * no inputs
 * returns N/A
 */
function linkStudentSent() {
    window.location.href = "sentItems.html";
}

/*
 * Function that links to the student compose screen
 * fWhere = a constant that says fromWhere compose was clicked.
 * returns N/A
 */
function linkStudentCompose(fWhere) {
    try {
        setUpLinkBackJSON(fWhere);
        window.location.href = "studentCompose.html";
    } catch (e) {
        alert(e.name + "\n" + e.message)
    }
}

/*
 * Function that sets up JSON to link back from student compose screen
 * fWhere = a constant that says fromWhere compose was clicked.
 * returns N/A
 */
function setUpLinkBackJSON(fWhere) {
    var json = {"fromWhere" : fWhere};
    localStorage.setItem("fromWhere", JSON.stringify(json))
}

/*
 * Function that loads the email onto the student inbox from the JSON.
 * no inputs
 * returns N/A
 */ 
function loadStudentInbox() {
    try {
        addEmailsFromKey(STUDENT_INBOX_KEY);
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}

/*Sent items methods*/

/*
 * Function that links to the student inbox screen
 * no inputs
 * returns N/A
 */ 
function linkInbox() {
    window.location.href = "index.html";
}

/*
 * Function that loads the email onto the student sent item from the JSON.
 * no inputs
 * returns N/A
 */ 
function loadStudentSent() {
    try {
        addEmailsFromKey(STUDENT_SENT_ITEMS_KEY);
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}
