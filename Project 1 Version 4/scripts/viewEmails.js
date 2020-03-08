/*
 * Mark Trickett (A00416603)
 * Humaid Muhammad Agowun (A00430163)
 * Diego Gardiner (A00423960)
 * JavaScript file for displaying emails (Project P1)
 */

//Constants for fromWhere
const FROM_STUDENT_INBOX = 1;
const FROM_STUDENT_SENT_ITEMS = 2;

const FROM_ADMIN_INBOX = 3;
const FROM_ADMIN_SENT_ITEMS = 4;

//function that fills textboxes with content.
function fillTextBoxes() {
    try {
        var email = JSON.parse(localStorage.getItem("emailToView")).email;
        $("#partnerTextBox").val(email.conversationPartner);
        $("#ccTextBox").val(email.cc);
        $("#subjectTextBox").val(email.subject);
        $("#composeTextBox").val(email.emailText);
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}

// function that links user back to view sent page.
function linkBackViewSent() {
    var fromWhere = JSON.parse(localStorage.getItem("emailToView")).fromWhere;
    if (fromWhere == FROM_STUDENT_SENT_ITEMS) {
        window.location.href = "sentItems.html";
    } else if (fromWhere == FROM_ADMIN_SENT_ITEMS) {
        window.location.href = "adminSentItems.html";
    }
    localStorage.removeItem("emailToView");
}

//function that stores email text to local storage in JSON format
function reply() {
    var fromWhere = JSON.parse(localStorage.getItem("emailToView")).fromWhere;
    if (fromWhere == FROM_ADMIN_INBOX) {
        linkAdminCompose(fromWhere);
    } else if (fromWhere == FROM_STUDENT_INBOX) {
        linkStudentCompose(fromWhere);
    }
}

//function that links back to compose
function linkAdminCompose(fWhere) {
    try {
        setUpLinkBackJSON(fWhere);;
        window.location.href = "adminCompose.html";
    } catch (e) {
        alert(e.name + "\n" + e.message)
    }
}

// function that links Student to compose page
function linkStudentCompose(fWhere) {
    try {
        setUpLinkBackJSON(fWhere);
        window.location.href = "studentCompose.html";
    } catch (e) {
        alert(e.name + "\n" + e.message)
    }
}

// function that saves the previous page to local storage for retrieval
function setUpLinkBackJSON(fWhere) {
    var json = {"fromWhere" : fWhere};
    localStorage.setItem("fromWhere",JSON.stringify(json))
}

// function that links user back to inbox page.
function linkBackViewInbox() {
    var fromWhere = JSON.parse(localStorage.getItem("emailToView")).fromWhere;
    if (fromWhere == FROM_STUDENT_INBOX) {
        window.location.href = "index.html";
    } else if (fromWhere == FROM_ADMIN_INBOX) {
        window.location.href = "adminInbox.html";
    }
    localStorage.removeItem("emailToView");
}
