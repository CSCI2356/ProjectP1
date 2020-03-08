
/*
 * Mark Trickett (A00416603)
 * Humaid Muhammad Agowun (A00430163)
 * Diego Gardiner (A00423960)
 * JavaScript file for showing help windows (Project P1)
 */

//constant specifications of each window
const SPECS = "width=600, height=300, top=300, left=500";

/*Show help methods (all below with explanation in name)*/
function showHelpForTo() {
    window.open("./helps/helpTo.html", "MsgWindow" ,SPECS);
}

function showHelpForFrom() {
    window.open("./helps/helpFrom.html", "MsgWindow" ,SPECS);
}

function showHelpForCc() {
    window.open("./helps/helpCc.html", "MsgWindow" ,SPECS);
}

function showHelpForSubject() {
    window.open("./helps/helpSubject.html", "MsgWindow" ,SPECS);
}

function showHelpForBody() {
    window.open("./helps/helpBody.html", "MsgWindow" ,SPECS);
}
