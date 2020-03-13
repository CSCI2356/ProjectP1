
/*
 * author: Humaid Muhammad Agowun (A00430163)
 *
 * viewEmails.js :
 * script for viewSent and viewInbox
 */ 


const FROM_STUDENT_INBOX = 1;
const FROM_STUDENT_SENT_ITEMS = 2;

const FROM_ADMIN_INBOX = 3;
const FROM_ADMIN_SENT_ITEMS = 4;


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

function getEmailToView() {
    var key = JSON.parse(localStorage.getItem("emailToView")).key;
    var index = JSON.parse(localStorage.getItem("emailToView")).index;

    //Make email no longer bold
    var json = JSON.parse(localStorage.getItem(key));
    var emails = json.emails; 
    emails[index].read = "read"; 

    localStorage.setItem(key, JSON.stringify(json));

    return emails[index];
}

function linkBackViewSent() {
    var fromWhere = JSON.parse(localStorage.getItem("emailToView")).fromWhere;
    if (fromWhere == FROM_STUDENT_SENT_ITEMS) {
        window.location.href = "sentItems.html";
    } else if (fromWhere == FROM_ADMIN_SENT_ITEMS) {
        window.location.href = "adminSentItems.html";
    }
    localStorage.removeItem("emailToView");
}

function reply() {
    var fromWhere = JSON.parse(localStorage.getItem("emailToView")).fromWhere;
    if (fromWhere == FROM_ADMIN_INBOX) {
        linkAdminCompose(fromWhere);
    } else if (fromWhere == FROM_STUDENT_INBOX) {
        linkStudentCompose(fromWhere);
    }
}

function linkAdminCompose(fWhere) {
    try {
        setUpLinkBackJSON(fWhere);;
        window.location.href = "adminCompose.html";
    } catch (e) {
        alert(e.name + "\n" + e.message)
    }
}

function linkStudentCompose(fWhere) {
    try {
        setUpLinkBackJSON(fWhere);
        window.location.href = "studentCompose.html";
    } catch (e) {
        alert(e.name + "\n" + e.message)
    }
}

function setUpLinkBackJSON(fWhere) {
    var json = {"fromWhere" : fWhere};
    localStorage.setItem("fromWhere",JSON.stringify(json))
}

function linkBackViewInbox() {
    var fromWhere = JSON.parse(localStorage.getItem("emailToView")).fromWhere;
    if (fromWhere == FROM_STUDENT_INBOX) {
        window.location.href = "index.html";
    } else if (fromWhere == FROM_ADMIN_INBOX) {
        window.location.href = "adminInbox.html";
    }
    localStorage.removeItem("emailToView");
}
