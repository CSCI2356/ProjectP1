
/*
 * Mark Trickett (A00416603)
 * Humaid Muhammad Agowun (A00430163)
 * Diego Gardiner (A00423960)
 * JavaScript file for Student (Project P1)
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
            <div class="btn emailRow" onclick="viewEmail(i , number)"> 
                <a class="btn email">email.conversationPartner</a>
                <a class="btn email">email.subject</a>
            </div>
            <a class="btn deleteKey" onclick="deleteEmail(number, i)">X</a>
    </div>
 */ 


/*student Inbox/index methods*/
function linkStudentSent() {
    window.location.href = "sentItems.html";
}

// function that links admin compose page
function linkStudentCompose(fWhere) {
    try {
        setUpLinkBackJSON(fWhere);
        window.location.href = "studentCompose.html";
    } catch (e) {
        alert(e.name + "\n" + e.message)
    }
}

// function that returns user to previous back
function setUpLinkBackJSON(fWhere) {
    var json = {"fromWhere" : fWhere};
    localStorage.setItem("fromWhere", JSON.stringify(json))
}

// function that loads the admin inbox
function loadStudentInbox() {
    try {
        addEmailsFromKey(STUDENT_INBOX_KEY);
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}

/*Sent items methods*/
function linkInbox() {
    window.location.href = "index.html";
}

// function that loads the admin sent page
function loadStudentSent() {
    try {
        addEmailsFromKey(STUDENT_SENT_ITEMS_KEY);
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}

/*Methods that appear as you display email rows*/
// function that links back to correct page.
function linkBackToCorrectPage(fromWhere) {
    if (fromWhere === FROM_STUDENT_INBOX) {
        window.location.href = "index.html";
    } else if (fromWhere === FROM_STUDENT_SENT_ITEMS) {
        window.location.href = "sentItems.html";
    }
}
