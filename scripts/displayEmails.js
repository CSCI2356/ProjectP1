
/*
 * Mark Trickett (A00416603)
 * Humaid Muhammad Agowun (A00430163)
 * Diego Gardiner (A00423960)
 * JavaScript file for displaying emails (Project P1)
 */

/*
 * Our local storage JSON looks like:
 *
 * {emails : [email1, email2, email3]}
 *
 * Our email JSON looks like this: 
 * {
 *      conversationPartner : ""
 *      cc : ""
 *      subject : ""
 *      body : ""
 * }
 *
 *  One email Row looks like this in HTML:
 *  <div data-type="horizontal">
            <div class="btn emailRow" onclick="viewEmail(i , number)"> 
                <a class="btn email">email.conversationPartner</a>
                <a class="btn email">email.subject</a>
            </div>
            <a class="btn deleteKey" onclick="deleteEmail(number, i)">X</a>
    </div>
 */

//Constants for fromWhere
const FROM_STUDENT_INBOX = 1;
const FROM_STUDENT_SENT_ITEMS = 2;
const FROM_ADMIN_INBOX = 3;
const FROM_ADMIN_SENT_ITEMS = 4;

//Constants for key
const STUDENT_INBOX_KEY = "studentInbox";
const ADMIN_INBOX_KEY = "adminInbox";

const STUDENT_SENT_ITEMS_KEY = "studentSent";
const ADMIN_SENT_ITEMS_KEY = "adminSent";

// function that adds emails from respective key.
function addEmailsFromKey(key) {
    var divPointer = $("div.toDisplayEmails");
    if (localStorage.getItem(key) !== null) {
        var emails = JSON.parse(localStorage.getItem(key)).emails;

        var encoding = getCodeFromKey(key);
        var toDisplay = "";
        for (var i = 0; i < emails.length; i++) {
            toDisplay += createNewRow(i, encoding, emails[i]) + "<br><br>";
        }

        divPointer.append(toDisplay);
    }
}

//Function that creates new row and updates each row with content 
function createNewRow(i, encoding, email) {
    return '<div data-type="horizontal">'
            + '<div class="btn emailRow" '
                + 'onclick="viewEmail('+ i + ',\'' + encoding + '\')">' 
                + '<a class="btn email">' + email.conversationPartner + '</a>'
                + '<a class="btn email">' + email.subject + '</a>'
            + '</div>'
            + '<a class="btn deleteKey" ' 
            + 'onclick="deleteEmail(\'' + encoding  + '\',' +  i + ')">X</a>'
        + '</div>';
}

//function that returns code from corresponding key
function getCodeFromKey(key) {
    //Constants for key
    if (key == STUDENT_INBOX_KEY) return 1;
    if (key == ADMIN_INBOX_KEY) return 2;
    if (key == STUDENT_SENT_ITEMS_KEY) return 3;
    if (key == ADMIN_SENT_ITEMS_KEY) return 4;
}

//function that returns key from corresponding code
function getKeyFromEncoding(code) {
    if (code == 1) return STUDENT_INBOX_KEY;
    if (code == 2) return ADMIN_INBOX_KEY;
    if (code == 3) return STUDENT_SENT_ITEMS_KEY;
    if (code == 4) return ADMIN_SENT_ITEMS_KEY;
}

//function that deletes email
function deleteEmail(encoding, i) {
    var key = getKeyFromEncoding(encoding);
    var currentPageFromWhere = getFromWhere(key);
    var json = JSON.parse(localStorage.getItem(key));

    if (json.emails.length == 1) {
        localStorage.removeItem(key);
    } else {
        json.emails.splice(i, 1);
        localStorage.setItem(key, JSON.stringify(json));
    }

    reloadPage(currentPageFromWhere);
}

//function that reloads and updates page
function reloadPage(fromWhere) {
    if (fromWhere === FROM_ADMIN_INBOX) {
        window.location.href = "adminInbox.html";
    } else if (fromWhere === FROM_ADMIN_SENT_ITEMS) {
        window.location.href = "adminSentItems.html";
    } else if (fromWhere == FROM_STUDENT_INBOX) {
        window.location.href = "index.html";
    } else if (fromWhere == FROM_STUDENT_SENT_ITEMS) {
        window.location.href = "sentItems.html";
    }
}

//function that opens email
function viewEmail(i , encoding) {
    try {
        var key = getKeyFromEncoding(encoding);
        var email = JSON.parse(localStorage.getItem(key)).emails[i];
        var json = {"email": email, "fromWhere" : getFromWhere(key)};
        localStorage.setItem("emailToView", JSON.stringify(json));

        if (key == STUDENT_SENT_ITEMS_KEY) {
            window.location.href = "viewSent.html";
        } else if (key == ADMIN_SENT_ITEMS_KEY) {
            window.location.href = "viewSentAdmin.html";
        } else if (key == ADMIN_INBOX_KEY) {
            window.location.href = "viewInboxAdmin.html";
        } else if (key == STUDENT_INBOX_KEY) {
            window.location.href = "viewInbox.html";
        }
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}

//function that returns fromWhere depending on the key
function getFromWhere(key) {
    if (key == STUDENT_INBOX_KEY) {
        return FROM_STUDENT_INBOX;
    } else if (key == STUDENT_SENT_ITEMS_KEY) {
        return FROM_STUDENT_SENT_ITEMS;
    } else if (key == ADMIN_INBOX_KEY) {
        return FROM_ADMIN_INBOX;
    } else if (key == ADMIN_SENT_ITEMS_KEY) { 
        return FROM_ADMIN_SENT_ITEMS;
    } else {
        alert("AN ISSUE OCCURED IN getFromWhere().");
        return 0;
    }
}
