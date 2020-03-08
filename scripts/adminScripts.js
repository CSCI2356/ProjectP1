
/*
 * Mark Trickett (A00416603)
 * Humaid Muhammad Agowun (A00430163)
 * Diego Gardiner (A00423960)
 * JavaScript file for Admin (Project P1)
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

// function that links admin compose page
function linkAdminCompose(fWhere) {
    try {
        setUpLinkBackJSON(fWhere);;
        window.location.href = "adminCompose.html";
    } catch (e) {
        alert(e.name + "\n" + e.message)
    }
}

// function that returns user to previous back
function setUpLinkBackJSON(fWhere) {
    var json = {"fromWhere" : fWhere};
    localStorage.setItem("fromWhere",JSON.stringify(json))
}

// function that loads the admin inbox
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

// function that loads the admin sent page
function loadAdminSent() {
    try {
        addEmailsFromKey(ADMIN_SENT_ITEMS_KEY);
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}

/*Methods that appear as you display email rows*/
// function that links back to correct page.
function linkBackToCorrectPage(fromWhere) {
    if (fromWhere === FROM_ADMIN_INBOX) {
        window.location.href = "adminInbox.html";
    } else if (fromWhere === FROM_ADMIN_SENT_ITEMS) {
        window.location.href = "adminSentItems.html";
    }
}
