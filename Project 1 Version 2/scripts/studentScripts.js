/*
 * author : Humaid Muhammad Agowun (A00430163)
 * 
 * scripts.js :
 */

/*
 * Important comments:
 *
 * Our email JSON looks like this: 
 * {
 *      conversationPartner : ""
 *      cc : ""
 *      subject : ""
 *      body : ""
 * }
 *
 * One email Row looks like this in HTML:
 *  <div data-type="horizontal">
            <div class="btn emailRow" onclick="viewEmail(i , 'key')"> 
                <a class="btn email">email.conversationPartner</a>
                <a class="btn email">email.subject</a>
            </div>
            <a class="btn deleteKey" onclick="deleteEmail('key', i)">X</a>
    </div>
 */ 


/*CONSTANTS*/
const FROM_STUDENT_INBOX = 1;
const FROM_STUDENT_SENT_ITEMS = 2;


//Constants for key
const STUDENT_INBOX_KEY = "studentInbox";
const ADMIN_INBOX_KEY = "adminInbox";

const STUDENT_SENT_ITEMS_KEY = "studentSent";
const ADMIN_SENT_ITEMS_KEY = "adminSent";


/*student Inbox/index methods*/
function linkStudentSent() {
    window.location.href = "sentItems.html";
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
    localStorage.setItem("fromWhere", JSON.stringify(json))
}

function loadStudentInbox() {
    try {
        addEmailsFromKey(STUDENT_INBOX_KEY);
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}

function addEmailsFromKey(key) {
    var divPointer = $("div.toDisplayEmails");
    if (localStorage.getItem(key) !== null) {
        var emails = JSON.parse(localStorage.getItem(key)).emails;

        var toDisplay = "";
        for (var i = 0; i < emails.length; i++) {
            toDisplay += createNewRow(i, key, emails[i]) + "<br><br>";
        }
        divPointer.append(toDisplay);
    }
}

function createNewRow(i, key, email) {
    return '<div data-type="horizontal">'
            + '<div class="btn emailRow" '
                + 'onclick="viewEmail('+ i + ',\'' + key + '\')">' 
                + '<a class="btn email">' + email.conversationPartner + '</a>'
                + '<a class="btn email">' + email.subject + '</a>'
            + '</div>'
            + '<a class="btn deleteKey" ' 
            + 'onclick="deleteEmail(\'' + key  + '\',' +  i + ')">X</a>'
        + '</div>';
}

/*Sent items methods*/
function linkInbox() {
    window.location.href = "index.html";
}

function loadStudentSent() {
    try {
        addEmailsFromKey(STUDENT_SENT_ITEMS_KEY);
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}


/*The following methods will be added to the page as we load in emails*/
function deleteEmail(key, i) {
    var fromWhere = getFromWhere(key);
    var json = JSON.parse(localStorage.getItem(key));

    if (json.emails.length == 1) {
        localStorage.removeItem(key);
    } else {
        json.emails.splice(i, 1);
        localStorage.setItem(key, JSON.stringify(json));
    }

    linkBackToCorrectPage(fromWhere);
}

function linkBackToCorrectPage(fromWhere) {
    if (fromWhere === FROM_STUDENT_INBOX) {
        window.location.href = "index.html";
    } else if (fromWhere === FROM_STUDENT_SENT_ITEMS) {
        window.location.href = "sentItems.html";
    }
}

function viewEmail(i , key) {
        var email = JSON.parse(localStorage.getItem(key)).emails[i];
        var json = {"email": email, "fromWhere" : getFromWhere(key)};
        localStorage.setItem("emailToView", JSON.stringify(json)); 

        if (key == STUDENT_SENT_ITEMS_KEY) {
            window.location.href = "viewSent.html";
        } else if (key == STUDENT_INBOX_KEY) {
            window.location.href = "viewInbox.html";
        } 
}

function getFromWhere(key) {
    if (key == STUDENT_INBOX_KEY) {
        return FROM_STUDENT_INBOX;
    } else if (key == STUDENT_SENT_ITEMS_KEY) {
        return FROM_STUDENT_SENT_ITEMS;
    }
}
