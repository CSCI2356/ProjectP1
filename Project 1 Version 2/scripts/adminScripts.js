/*
 * author : Humaid Muhammad Agowun (A00430163)
 *
 * adminScripts.js
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

const FROM_ADMIN_INBOX = 3;
const FROM_ADMIN_SENT_ITEMS = 4;

//Constants for key
const STUDENT_INBOX_KEY = "studentInbox";
const ADMIN_INBOX_KEY = "adminInbox";

const STUDENT_SENT_ITEMS_KEY = "studentSent";
const ADMIN_SENT_ITEMS_KEY = "adminSent";

function linkAdminSent() {
    window.location.href = "adminSentItems.html";
}

function linkAdminCompose(fWhere) {
    try {
        setUpLinkBackJSON(fWhere);;
        window.location.href = "adminCompose.html";
    } catch (e) {
        alert(e.name + "\n" + e.message)
    }
}

function setUpLinkBackJSON(fWhere) {
    var json = {"fromWhere" : fWhere};
    localStorage.setItem("fromWhere",JSON.stringify(json))
}

function loadAdminInbox() {
    try {
        addEmailsFromKey(ADMIN_INBOX_KEY);
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

/*Admin sent Items methods*/
function linkAdminInbox() {
    window.location.href = "adminInbox.html";
}

function loadAdminSent() {
    try {
        addEmailsFromKey(ADMIN_SENT_ITEMS_KEY);
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}

/*Methods that appear as you display email rows*/

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
    if (fromWhere === FROM_ADMIN_INBOX) {
        window.location.href = "adminInbox.html";
    } else if (fromWhere === FROM_ADMIN_SENT_ITEMS) {
        window.location.href = "adminSentItems.html";
    }
}

function viewEmail(i , key) {
        var email = JSON.parse(localStorage.getItem(key)).emails[i];
        var json = {"email": email, "fromWhere" : getFromWhere(key)};
        localStorage.setItem("emailToView", JSON.stringify(json));

        if (key == ADMIN_SENT_ITEMS_KEY) {
            window.location.href = "viewSent.html";
        } else if (key == ADMIN_INBOX_KEY) {
            window.location.href = "viewInbox.html";
        } 
}

function getFromWhere(key) {
    if (key == ADMIN_INBOX_KEY) {
        return FROM_ADMIN_INBOX;
    } else if (key == ADMIN_SENT_ITEMS_KEY) { 
        return FROM_ADMIN_SENT_ITEMS;
    } else {
        alert("AN ISSUE OCCURED IN getFromWhere().");
        return 0;
    }
}
