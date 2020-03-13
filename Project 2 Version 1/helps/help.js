
var BODY_MESSAGE = "<br>" 
    + "<p>1) How should you greet the person you are emailing?<p>"
    + "<br><br>"
    + "<p>2) Do you need any questions?<p>"
    + "<br><br>"
    + "<p>3) Does the person you are emailing need to know any " 
    + "information about you?<p>";

var CC_MESSAGE = "<br>"
    + "<p>Is there anyone you need to copy on this email?<p>"
    + "<br>";

var FROM_MESSAGE = "<br>"
    + "<p>Who sent you this email?<p>";

var SUBJECT_MESSAGE = "<br>"
     + "<p>1) What is this email about?<p>"
     + "<br><br>"
     + "<p>2) Why are you sending this email?<p>";

var TO_MESSAGE = "<br>"
    + "<p>1) Who do you need to send an email to?<p>"
    + "<br><br>"
    + "<p>2) How many people do you need to send this email to?<p>";

function changeMessage(varName) {
    ;
}

function loadHelpBody() {
    $("body.emailBody").append(BODY_MESSAGE);
}

function loadHelpCc() {
    $("body.emailCc").append(CC_MESSAGE);
}

function loadHelpFrom() {
    $("body.emailFrom").html(FROM_MESSAGE);
}

function loadHelpSubject() {
    $("body.emailSubject").html(SUBJECT_MESSAGE);
}

function loadHelpTo() {
    $("body.emailTo").html(TO_MESSAGE);
}


/*Linkinf from Main Help directory*/
function linkHelpTo() {
    window.location.href = "helpTo.html";
} 

function linkHelpFrom() {
    window.location.href = "helpFrom.html";
} 

function linkHelpCc() {
    window.location.href = "helpCc.html";
} 

function linkHelpSubject() {
    window.location.href = "helpSubject.html";
} 

function linkHelpBody() {
    window.location.href = "helpBody.html";
} 
