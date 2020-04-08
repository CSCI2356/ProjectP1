/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * fillTextBoxes.js: 
 * js file that is used by the viewInbox and viewSent screens.
 * It is used to fill the textboxes based on the required email.
 */

/*
 * Fills the Text Boxes of the screen based on the email to view.
 *
 * no inputs
 *
 * returns N/A
 */ 
function fillTextBoxes() {
    var name = JSON.parse(localStorage.getItem("emailToView")).collectionName;
    var index = JSON.parse(localStorage.getItem("emailToView")).index;
    getEmailJSONFromServer(
        createViewRequest(name, index)
    );
}

/*
 * Creates the JSON that is sent to the server as the request to view an
 * email that is for the post for '/viewEmail'
 *
 * name = the collection name
 * index = the index of the email in the collection
 *
 * returns N/A
 */ 
function createViewRequest(name, index) {
    return {"collectionName":name, "index":index};
}

/*
 * Function that gets an email from the server.
 * It will then set up the text boxes as per required.
 *
 * req = the request JSON
 *
 * returns N/A
 */ 
function getEmailJSONFromServer(req) {
    $.post(SERVER_URL + '/viewEmail', req, 
        useTheEmailToFillTextBoxes).fail(errorFunction);

    function useTheEmailToFillTextBoxes(data) {
        var email = data.email;
        $("#partnerTextBox").val(email.conversationPartner);
        $("#ccTextBox").val(email.cc);
        $("#subjectTextBox").val(email.subject);
        $("#composeTextBox").val(email.emailText);
    }

    function errorFunction (err) {
        alert("server error in viewing an email.");
    }
}
