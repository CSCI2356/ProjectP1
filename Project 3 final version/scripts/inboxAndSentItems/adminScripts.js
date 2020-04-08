/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * js file that is used by the admin inbox, sent items and compose screen
 * which helps linking between the files.
 */

//Admin Inbox methods

/*
 * Function that links to the admin sent item screen
 * 
 * no inputs
 * 
 * returns N/A
 */ 
function linkAdminSent() {
    window.location.href = "adminSentItems.html";
}

/*
 * Function that links to the admin compose screen
 * Sets up in local storage a way to link back.
 * 
 * fWhere = a constant that says fromWhere compose was clicked.
 * 
 * returns N/A
 */
function linkAdminCompose(fWhere) {
    try {
        setUpLinkBackJSON(fWhere);;
        window.location.href = "adminCompose.html";
    } catch (e) {
        alert(e.name + "\n" + e.message)
    }
}

/*
 * Function that sets up JSON to link back from admin compose screen
 * 
 * fWhere = a constant that says fromWhere compose was clicked.
 * 
 * returns N/A
 */
function setUpLinkBackJSON(fWhere) {
    var json = {"fromWhere" : fWhere};
    if (DEBUG) {
        alert(json.fromWhere);
    }
    localStorage.setItem("fromWhere",JSON.stringify(json))
}

/*
 * Function that loads the email onto the admin inbox from the JSON.
 * 
 * no inputs
 * 
 * returns N/A
 */ 
function loadAdminInbox() {
    try {
        addInboxEmailsFromCollection(ADMIN_INBOX_NAME);
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}

/*Admin sent Items methods*/
/*
 * Function that links to the admin inbox screen
 * 
 * no inputs
 * 
 * returns N/A
 */ 
function linkAdminInbox() {
    window.location.href = "adminInbox.html";
}

/*
 * Function that loads the email onto the admin sent item from the JSON.
 * 
 * no inputs
 * 
 * returns N/A
 */ 
function loadAdminSent() {
    try {
        addSentEmailsFromCollection(ADMIN_SENT_ITEMS_NAME);
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}

/*
 * Function that displays a help message when the help button is clicked
 * in the admin inbox.
 * 
 * no inputs
 * 
 * returns N/A
 */ 
function helpAdminInbox() {
    alert("The purpose of this page is to know which emails the"
        + " admin received.");
}

/*
 * Function that displays a help message when the help button is clicked
 * in the admin sent items.
 * 
 * no inputs
 * 
 * returns N/A
 */ 
function helpAdminSent() {
    alert("The purpose of this page is to know which emails the"
        + " admin sent.");
}
