/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * studentCompose.js:
 * js file that is used by the admin to load up the menu options after
 * checking that composing can be done.
 */

/*
 * Function read on loading the student compose screen.
 * Sets up the drop down menu or returns to previous page if 
 * cannot send an email.
 *
 * no inputs 
 * 
 * returns N/A
 */ 
function prepareStudentCompose() {
    var reqJSON = createTwoNamesReq(
        ADMIN_INBOX_NAME, 
        STUDENT_SENT_ITEMS_NAME
    );
    $.post(SERVER_URL + '/checkIfEnoughSpace', reqJSON, checkIfEnoughSpace)
        .fail(errorFunction);

    function checkIfEnoughSpace(data) {
        var enoughInbox = data.enoughInbox, enoughSent = data.enoughSent;

        if (DEBUG) {
            alert("check if space reached\nenoughInbox: " + enoughInbox
                + "\nenoughSent: " + enoughSent);
        }

        if (enoughInbox && enoughSent) {
            loadStudentOptions();
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
 * Function that load all student options into the data lists.
 * It is the one the compose screen's body will call.
 * 
 * no inputs
 * 
 * returns N/A
 */ 
function loadStudentOptions() {
    loadStudentToOptions();
    loadStudentCcOptions();
}

/*
 * Function that load student To options into the data list.
 * 
 * no inputs
 * 
 * returns N/A
 */
function loadStudentToOptions() {
    var list = $("#adminNames");
    list.append(createOptionsString(STUDENT_ADMIN_NAMES));
}

/*
 * Function that load student Cc options into the data list.
 * 
 * no inputs
 * 
 * returns N/A
 */
function loadStudentCcOptions() {
    var list = $("#ccNames");
    list.append(createOptionsString(STUDENT_CC_NAMES));
}
