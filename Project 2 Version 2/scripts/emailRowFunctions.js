/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * js file that is used by the inbox and sent items screens.
 * It describes how to load the emails from the JSONs, how to 
 * delete an email and how we set up viewing an email.
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
 *      read : read/unread based on whether to bold.
 * }
 *
 *  One email Row looks like this in HTML:
 *  <div data-type="horizontal">
            <div class="btn emailRow" onclick="viewEmail(i , number)"> 
                <a class="btn {email.read}">email.conversationPartner</a>
                <a class="btn {email.read}">email.subject</a>
            </div>
            <a class="btn deleteKey" onclick="deleteEmail(number, i)">X</a>
    </div>
 */

//Constants for fromWhere. Required to set up viewing an email
const FROM_STUDENT_INBOX = 1;
const FROM_STUDENT_SENT_ITEMS = 2;
const FROM_ADMIN_INBOX = 3;
const FROM_ADMIN_SENT_ITEMS = 4;

//Constants for keys
const STUDENT_INBOX_KEY = "studentInbox";
const ADMIN_INBOX_KEY = "adminInbox";

const STUDENT_SENT_ITEMS_KEY = "studentSent";
const ADMIN_SENT_ITEMS_KEY = "adminSent";


/*
 * Function used to load emails onto the rows in the inbox and sent items
 * screens.
 * Notice that all exception handling is done by the calling functions.
 *
 * AN ENCODING IS USED SO THAT WE DON'T DISPLAY THE KEYS ONTO THE SCREEN.
 *
 * key - the key to get the appropriate JSON to look up the emails
 * returns N/A
 */ 
function addEmailsFromKey(key) {
    var divPointer = $("div.toDisplayEmails"); //All screens use the same name.
    if (localStorage.getItem(key) !== null) { 
        //There are emails to display.
        var emails = JSON.parse(localStorage.getItem(key)).emails;

        var encoding = getCodeFromKey(key);
        var toDisplay = "";
        for (var i = 0; i < emails.length; i++) {
            toDisplay += createNewRow(i, encoding, emails[i]) + "<br><br>";
        }

        divPointer.append(toDisplay);
    }
}

/*
 * Function that creates a row in the table.
 * It uses the encoding, the index and the email JSON to create a row
 * and the necessary methods it has to call for viewing and deleting.
 * i = the index of the row in the table.
 * encoding = the encoding for the key so we dont display it.
 * email = the JSON object as described at the start.
 *
 * returns a string representing one row.
 */ 
function createNewRow(i, encoding, email) {
    return '<div data-type="horizontal">'
            + '<div class="btn emailRow" '
                + 'onclick="viewEmail('+ i + ',' + encoding + ')">' 
                + '<a class="btn ' + email.read + '">' 
                + email.conversationPartner + '</a>'
                + '<a class="btn ' + email.read + '">' 
                + email.subject + '</a>'
            + '</div>'
            + '<a class="btn deleteKey" ' 
            + 'onclick="deleteEmail(\'' + encoding  + '\',' +  i + ')">X</a>'
        + '</div>';
}

/*
 * Function that takes a key and returns an encoding so that we don't 
 * print the key onto the screen.
 * key = the key whose encoding we wish to get.
 * returns an integer representing the encoding.
 */ 
function getCodeFromKey(key) {
    //Constants for key
    if (key == STUDENT_INBOX_KEY) return 1;
    if (key == ADMIN_INBOX_KEY) return 2;
    if (key == STUDENT_SENT_ITEMS_KEY) return 3;
    if (key == ADMIN_SENT_ITEMS_KEY) return 4;
}

/*
 * Function that takes an encoding and returns a key so that we don't 
 * print the key onto the screen.
 * code = the encoding whose key  we wish to get.
 * returns a string representing the key.
 */  
function getKeyFromEncoding(code) {
    if (code == 1) return STUDENT_INBOX_KEY;
    if (code == 2) return ADMIN_INBOX_KEY;
    if (code == 3) return STUDENT_SENT_ITEMS_KEY;
    if (code == 4) return ADMIN_SENT_ITEMS_KEY;
}

/*DELETING AN EMAIL*/

/*
 * Function that deletes an email. Is the function that is run on click.
 * encoding = encoding for the key.
 * i = the index of the email
 * returns N/A
 */ 
function deleteEmail(encoding, i) {
    try {
        var ans = confirm("Are you sure you want to delete this email?");
        if (ans == true) {
            var key = getKeyFromEncoding(encoding);
            var json = JSON.parse(localStorage.getItem(key));
            if (json.emails.length == 1) {
                localStorage.removeItem(key);
            } else {
                json.emails.splice(i, 1);
                localStorage.setItem(key, JSON.stringify(json));
            }
            reloadPage(key);
        }
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}

/*
 * After removing the email from the JSON, we reload the page. This is the
 * function that reloads the page based on the key used.
 * key = key to the local Storage JSON from which an email was deleted
 * returns N/A
 */ 
function reloadPage(key) {
    if (key === ADMIN_INBOX_KEY) {
        window.location.href = "adminInbox.html";
    } else if (key === ADMIN_SENT_ITEMS_KEY) {
        window.location.href = "adminSentItems.html";
    } else if (key == STUDENT_INBOX_KEY) {
        window.location.href = "index.html";
    } else if (key == STUDENT_SENT_ITEMS_KEY) {
        window.location.href = "sentItems.html";
    }
}

/*SETTING UP VIEWING AN EMAIL*/

/*
 * The function that is called when the user wants to view an email.
 * It takes the index and the encoding, sets up a JSON and just links to the 
 * appropriate page.
 *
 * i = the index of the email
 * encoding = the code for the key that is displayed on the screen.
 *
 * returns N/A
 */
function viewEmail(i , encoding) {
    try {
        var key = getKeyFromEncoding(encoding);
        var json = {"key": key, "index" : i, "fromWhere" : getFromWhere(key)};
        localStorage.setItem("emailToView", JSON.stringify(json));
        linkToCorrectViewPage(key);
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}

/*
 * Function that links to the student's or admin's viewInbox or viewSent page
 *
 * key = the key whose email the student wants to see.
 *
 * returns N/A
 */
function linkToCorrectViewPage(key) {
    if (key == STUDENT_SENT_ITEMS_KEY) {
        window.location.href = "viewSent.html";
    } else if (key == ADMIN_SENT_ITEMS_KEY) {
        window.location.href = "viewSentAdmin.html";
    } else if (key == ADMIN_INBOX_KEY) {
        window.location.href = "viewInboxAdmin.html";
    } else if (key == STUDENT_INBOX_KEY) {
        window.location.href = "viewInbox.html";
    }
}

/*
 * Function used to get the fromWhere for a key. this is required to allow
 * users to reply to an email.
 *
 * key = the key whose fromWhere the user wants to see.
 *
 * returns an integer representing the fromWhere.
 */ 
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
