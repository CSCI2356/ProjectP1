/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * js file that is used by the viewInbox and viewSent screens.
 */

/*
 * Fills the Text Boxes of the screen based on the email to view.
 *
 * no inputs
 *
 * returns N/A
 */ 
function fillTextBoxes() {
    var key = JSON.parse(localStorage.getItem("emailToView")).key;
    var index = JSON.parse(localStorage.getItem("emailToView")).index;
    getEmailJSONFromServer(createReqJSON(key, index))
}

function createReqJSON(key, index) {
    return {"key":key, "index":index};
}


function getEmailJSONFromServer(reqJSON) {
    $.post(SERVER_URL + '/viewEmail', reqJSON, 
        useTheEmailToFill).fail(errorFunction);

    function useTheEmailToFill(data) {
        var email = data.email;
        $("#partnerTextBox").val(email.conversationPartner);
        $("#ccTextBox").val(email.cc);
        $("#subjectTextBox").val(email.subject);
        $("#composeTextBox").val(email.emailText);
    }

    function errorFunction (err) {
    console.log(err.responseText);
}
}

/*
 * Function that is read on pressing BACK key in the viewSent screens.
 * no inputs
 * returns N/A
 */ 
function linkBackViewSent() {
    try {
        var fromWhere = JSON.parse(localStorage.getItem("emailToView")).fromWhere;
        //Link Back
        if (fromWhere == FROM_STUDENT_SENT_ITEMS) {
            window.location.href = "sentItems.html";
        } else if (fromWhere == FROM_ADMIN_SENT_ITEMS) {
            window.location.href = "adminSentItems.html";
        }
        localStorage.removeItem("emailToView"); //Removes side effects
    } catch (e) {
        alert(e.name + "\n" + e.message);
    }
}

/*
 * Function that is read when the reply button is clicked. Just links to the 
 * appropriate compose screen.
 * no inputs 
 * returns N/A
 */ 
function reply() {
    try {
        var fromWhere = JSON.parse(localStorage.getItem("emailToView")).fromWhere;
        if (fromWhere == FROM_ADMIN_INBOX) {
            linkAdminCompose(fromWhere);
        } else if (fromWhere == FROM_STUDENT_INBOX) {
            linkStudentCompose(fromWhere);
        }
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}

/* 
 * Links to the admin compose screen for a reply
 * no inputs
 * return N/A
 */ 
function linkAdminCompose(fWhere) {
    setUpLinkBackJSON(fWhere);;
    window.location.href = "adminCompose.html";
}

/* 
 * Links to the admin compose screen for a reply
 * no inputs
 * return N/A
 */ 
function linkStudentCompose(fWhere) {
    setUpLinkBackJSON(fWhere);
    window.location.href = "studentCompose.html";
}

/*
 * Stores fromWhere in local Storage to allow linking back after sending the reply.
 * no inputs.
 * returns N/A
 */ 
function setUpLinkBackJSON(fWhere) {
    var json = {"fromWhere" : fWhere};
    localStorage.setItem("fromWhere",JSON.stringify(json))
}

/*
 * Function that is read on pressing BACK key in the viewSent screens.
 * no inputs
 * returns N/A
 */ 
function linkBackViewInbox() {
    var fromWhere = JSON.parse(localStorage.getItem("emailToView")).fromWhere;
    if (fromWhere == FROM_STUDENT_INBOX) {
        window.location.href = "index.html";
    } else if (fromWhere == FROM_ADMIN_INBOX) {
        window.location.href = "adminInbox.html";
    }
    localStorage.removeItem("emailToView");
}

/*
 * Function that displays a help message when the help button is clicked
 * in the student view inbox screen.
 * no inputs
 * returns N/A
 */ 
function helpStudentViewInbox() {
    alert("The purpose of this page is to know the content of a received"
        + " email.");
}

/*
 * Function that displays a help message when the help button is clicked
 * in the student view sent screen.
 * no inputs
 * returns N/A
 */ 
function helpStudentViewSent() {
    alert("The purpose of this page is to know the content of a sent"
        + " email.");
}

/*
 * Function that displays a help message when the help button is clicked
 * in the admin view inbox screen.
 * no inputs
 * returns N/A
 */ 
function helpAdminViewInbox() {
    alert("The purpose of this page is to know the content of a received"
        + " email.");
}

/*
 * Function that displays a help message when the help button is clicked
 * in the admin view sent screen.
 * no inputs
 * returns N/A
 */ 
function helpAdminViewSent() {
    alert("The purpose of this page is to know the content of a sent"
        + " email.");
}
