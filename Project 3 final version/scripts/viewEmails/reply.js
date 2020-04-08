/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * reply.js:
 * js file that is used by the viewInbox screens.
 * It is used when the reply button is clicked.
 */

/*
 * Function that is read when the reply button is clicked. Just links to the 
 * appropriate compose screen.
 *
 * no inputs 
 *
 * returns N/A
 */ 
function reply() {
    try {
        var fromWhere = JSON.parse(
                localStorage.getItem("emailToView")
        ).fromWhere;
        changeWindowRefForReply(fromWhere);
    } catch(e) {
        alert(e.name + "\n" + e.message);
    }
}

/*
 * Function that changes the screen to a compose screen for a reply.
 * 
 * fromWhere = integer denoting fromWhere the email was viewed.
 *
 * returns N/A
 */ 
function changeWindowRefForReply(fromWhere) {
    if (fromWhere == FROM_ADMIN_INBOX) {
        setUpLinkBackJSON(fromWhere);;
        window.location.href = "adminCompose.html";
    } else if (fromWhere == FROM_STUDENT_INBOX) {
        setUpLinkBackJSON(fromWhere);
        window.location.href = "studentCompose.html";
    }
}

/*
 * Stores fromWhere in local Storage to allow linking back after 
 * sending the reply.
 *
 * no inputs.
 *
 * returns N/A
 */ 
function setUpLinkBackJSON(fWhere) {
    var json = {"fromWhere" : fWhere};
    localStorage.setItem("fromWhere",JSON.stringify(json))
}
