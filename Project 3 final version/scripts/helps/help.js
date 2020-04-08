/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * help.js: 
 * js file that is used by the help screens to load the messages.
 */

/*
 * Below are the variables for each message.
 * They should be loaded onto the server at some point and fetched.
 * For now we are using constants.
 */
const BODY_MESSAGE = "<br>" 
    + "<p>1) How should you greet the person you are emailing?<p>"
    + "<br><br>"
    + "<p>2) Do you need any questions?<p>"
    + "<br><br>"
    + "<p>3) Does the person you are emailing need to know any " 
    + "information about you?<p>";

const CC_MESSAGE = "<br>"
    + "<p>Is there anyone you need to copy on this email?<p>"
    + "<br>";

const FROM_MESSAGE = "<br>"
    + "<p>Who sent you this email?<p>";

const SUBJECT_MESSAGE = "<br>"
     + "<p>1) What is this email about?<p>"
     + "<br><br>"
     + "<p>2) Why are you sending this email?<p>";

const TO_MESSAGE = "<br>"
    + "<p>1) Who do you need to send an email to?<p>"
    + "<br><br>"
    + "<p>2) How many people do you need to send this email to?<p>";

/*
 * Function that loads the body message onto helpBody's HTML.
 * 
 * no inputs 
 * 
 * returns N/A
 */
function loadHelpBody() {
    $("body.emailBody").append(BODY_MESSAGE);
}

/*
 * Function that loads the Cc message onto helpCc's HTML.
 * 
 * no inputs 
 * 
 * returns N/A
 */
function loadHelpCc() {
    $("body.emailCc").append(CC_MESSAGE);
}

/*
 * Function that loads the From message onto helpFrom's HTML.
 * 
 * no inputs 
 * 
 * returns N/A
 */
function loadHelpFrom() {
    $("body.emailFrom").html(FROM_MESSAGE);
}

/*
 * Function that loads the body message onto helpSubject's HTML.
 * 
 * no inputs 
 * 
 * returns N/A
 */
function loadHelpSubject() {
    $("body.emailSubject").html(SUBJECT_MESSAGE);
}

/*
 * Function that loads the body message onto helpTo's HTML.
 * 
 * no inputs 
 * 
 * returns N/A
 */
function loadHelpTo() {
    $("body.emailTo").html(TO_MESSAGE);
} 
