
const FROM_STUDENT_INBOX = 1;
const FROM_STUDENT_SENT_ITEMS = 2;
const FROM_ADMIN_INBOX = 3;
const FROM_ADMIN_SENT_ITEMS = 4;

function cancel() {
    var ans = confirm("Are you sure you want to cancel?");
    if (ans == true) {
        localStorage.removeItem("fromWhere");
        window.history.back();
    }
}

function linkBackAfterSending() {
    try {
        var fromWhere = getFromWhereComposeWasClicked()
        linkBackToCorrectPage(fromWhere);
    } catch (e) {
        alert(e.name + "\n" + e.message);
    }
}

function getFromWhereComposeWasClicked() {
    var fWhere = JSON.parse(localStorage.getItem("fromWhere")).fromWhere;
    localStorage.removeItem("fromWhere");
    return fWhere;
}

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

