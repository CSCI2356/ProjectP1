/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * adminCompose.js:
 * js file that is used by the admin to load up the menu options after
 * checking that composing can be done.
 */

/*
 * Function read on loading the admin compose screen.
 * Sets up the drop down menu or returns to previous page if 
 * cannot send an email.
 *
 * no inputs 
 * 
 * returns N/A
 */ 
function prepareAdminCompose() {
    var reqJSON = createTwoNamesReq(
            STUDENT_INBOX_NAME, 
            ADMIN_SENT_ITEMS_NAME
    );
    $.post(SERVER_URL + '/checkIfEnoughSpace', reqJSON, 
        checkIfEnoughSpace).fail(errorFunction);

    function checkIfEnoughSpace(data) {
        var enoughInbox = data.enoughInbox, enoughSent = data.enoughSent;
        if (DEBUG) {
            alert("check if space reached\nenoughInbox: " + enoughInbox
                + "\nenoughSent: " + enoughSent);
        }
        
        if (enoughInbox && enoughSent) {
            loadAdminOptions();
        } else {
            alertAndReturn(enoughInbox, enoughSent);
        }
    }

    function alertAndReturn(enoughInbox, enoughSent) {
        if (!enoughInbox) {
            alert("Recipient’s inbox is full.");
        } else if (!enoughSent) {
            alert("Your sent items is full.");
        }
        returnToPreviousScreen();
    }

    function errorFunction(err) {
        alert("server error in checking space");
    }
}

/*
 * Function that load all admin options.
 * It is the one the compose screen's body will call.
 * 
 * no inputs
 * 
 * returns N/A
 */ 
function loadAdminOptions() {
    if (DEBUG) {
        alert("loading admin options.");
    }
    loadAdminToOptions();
    loadAdminFromOptions();
    loadAdminCcOptions();
}

/*
 * Function that load admin To options into the data list.
 * 
 * no inputs
 * 
 * returns N/A
 */ 
function loadAdminToOptions() {
    var list = $("#studentNames");
    list.append(createOptionsString(ADMIN_STUDENT_NAMES));
}

/*
 * Function that load admin From options into the data list.
 * 
 * no inputs
 * 
 * returns N/A
 */ 
function loadAdminFromOptions() {
    var list = $("#adminNames");
    list.append(createOptionsString(ADMIN_ADMIN_NAMES));
}

/*
 * Function that load admin Cc options into the data list.
 * 
 * no inputs
 * 
 * returns N/A
 */
function loadAdminCcOptions() {
    var list = $("#ccNames");
    list.append(createOptionsString(ADMIN_CC_NAMES));
}
