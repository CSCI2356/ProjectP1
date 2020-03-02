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

//Admin Inbox methods
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

function linkBackToCorrectPage(fromWhere) {
    if (fromWhere === FROM_ADMIN_INBOX) {
        window.location.href = "adminInbox.html";
    } else if (fromWhere === FROM_ADMIN_SENT_ITEMS) {
        window.location.href = "adminSentItems.html";
    }
}
