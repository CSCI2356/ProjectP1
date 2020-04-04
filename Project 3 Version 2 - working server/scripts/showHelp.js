/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * js file that is used by both the compose screens to display help for the
 * labels.
 */

//The size and starting location of the new window to be created.
const SPECS = "width=600, height=300, top=300, left=500";

/*Show help methods*/
/*
 * Function that opens the helpTo.html in a small window.
 * The html files deal with loading the messages.
 * no inputs 
 * returns N/A
 */ 
function showHelpForTo() {
    window.open("./helps/helpTo.html", "MsgWindow", SPECS);
}

/*
 * Function that opens the helpFrom.html in a small window.
 * The html files deal with loading the messages.
 * no inputs 
 * returns N/A
 */ 
function showHelpForFrom() {
    window.open("./helps/helpFrom.html", "MsgWindow", SPECS);
}

/*
 * Function that opens the helpCc.html in a small window.
 * The html files deal with loading the messages.
 * no inputs 
 * returns N/A
 */ 
function showHelpForCc() {
    window.open("./helps/helpCc.html", "MsgWindow", SPECS);
}

/*
 * Function that opens the helpSubject.html in a small window.
 * The html files deal with loading the messages.
 * no inputs 
 * returns N/A
 */ 
function showHelpForSubject() {
    window.open("./helps/helpSubject.html", "MsgWindow", SPECS);
}

/*
 * Function that opens the helpBody.html in a small window.
 * The html files deal with loading the messages.
 * no inputs 
 * returns N/A
 */ 
function showHelpForBody() {
    window.open("./helps/helpBody.html", "MsgWindow", SPECS);
}
