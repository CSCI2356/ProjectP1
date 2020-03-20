/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * js file that is used by the viewInbox and viewSent screens.
 */

//Constants for fromWhere required for replying to an email
const FROM_STUDENT_INBOX = 1;
const FROM_STUDENT_SENT_ITEMS = 2;

const FROM_ADMIN_INBOX = 3;
const FROM_ADMIN_SENT_ITEMS = 4;

/*
 * Fills the Text Boxes of the screen based on the email to view.
 *
 * no inputs
 *
 * returns N/A
 */ 
function fillTextBoxes() {
    try {
        var email = getEmailToView();
        $("#partnerTextBox").val(email.conversationPartner);
        $("#ccTextBox").val(email.cc);
        $("#subjectTextBox").val(email.subject);
        $("#composeTextBox").val(email.emailText);
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}

/*
 * Function that looks at the email To View JSON to get which email it 
 * should fetch
 *
 * no inputs
 *
 * returns the appropriate email JSON.
 */ 
function getEmailToView() {
    //emailToView JSON set up by the viewEmail Function
    var key = JSON.parse(localStorage.getItem("emailToView")).key;
    var index = JSON.parse(localStorage.getItem("emailToView")).index;

    //Make email no longer bold
    var json = JSON.parse(localStorage.getItem(key));
    var emails = json.emails; 
    emails[index].read = "read"; 

    //Places the email back, NO LONGER BOLD
    localStorage.setItem(key, JSON.stringify(json));
    return emails[index]; //Returns the email JSON to be viewed.
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
