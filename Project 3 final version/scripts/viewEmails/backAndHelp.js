/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * backAndHelp.js
 * js file that is used by the viewInbox and viewSent screens.
 * It is used for the back and help buttons.
 */

/*
 * Function that is read on pressing BACK key in the viewSent screens.
 *
 * no inputs
 *
 * returns N/A
 */ 
function linkBackViewSent() {
    try {
        var fromWhere = JSON.parse(
                localStorage.getItem("emailToView")
            ).fromWhere;
        if (DEBUG) {
            alert("BACKING. fromWhere: " + fromWhere);
        }
        changeWindowRefForBacking(fromWhere);
        localStorage.removeItem("emailToView"); //Removes side effects
    } catch (e) {
        alert(e.name + "\n" + e.message);
    }
}

/*
 * Function that changes the page the user sees.
 *
 * fromWhere = an integer representing fromWhere the email was clicked
 *
 * returns N/A
 */ 
function changeWindowRefForBacking(fromWhere) {
    if (fromWhere == FROM_STUDENT_SENT_ITEMS) {
        window.location.href = "sentItems.html";
    } else if (fromWhere == FROM_ADMIN_SENT_ITEMS) {
        window.location.href = "adminSentItems.html";
    } else if (fromWhere == FROM_STUDENT_INBOX) {
        window.location.href = "index.html";
    } else if (fromWhere == FROM_ADMIN_INBOX) {
        window.location.href = "adminInbox.html";
    }
}

/*
 * Function that is read on pressing BACK key in the viewInbox screens.
 *
 * no inputs.
 *
 * returns N/A.
 */ 
function linkBackViewInbox() {
    try {
        var fromWhere = JSON.parse(
                localStorage.getItem("emailToView")
            ).fromWhere;
        if (DEBUG) {
            alert("BACKING. fromWhere: " + fromWhere);
        }
        changeWindowRefForBacking(fromWhere);
        localStorage.removeItem("emailToView");
    } catch (e) {
        alert(e.name + "\n" + e.message);
    }
}


/*
 * Function that displays a help message when the help button is clicked
 * in the student view inbox screen.
 * 
 * no inputs
 * 
 * returns N/A
 */ 
function helpStudentViewInbox() {
    alert("The purpose of this page is to know the content of a received"
        + " email.");
}

/*
 * Function that displays a help message when the help button is clicked
 * in the student view sent screen.
 * 
 * no inputs
 * 
 * returns N/A
 */ 
function helpStudentViewSent() {
    alert("The purpose of this page is to know the content of a sent"
        + " email.");
}

/*
 * Function that displays a help message when the help button is clicked
 * in the admin view inbox screen.
 * 
 * no inputs
 * 
 * returns N/A
 */ 
function helpAdminViewInbox() {
    alert("The purpose of this page is to know the content of a received"
        + " email.");
}

/*
 * Function that displays a help message when the help button is clicked
 * in the admin view sent screen.
 * 
 * no inputs
 * 
 * returns N/A
 */ 
function helpAdminViewSent() {
    alert("The purpose of this page is to know the content of a sent"
        + " email.");
}
