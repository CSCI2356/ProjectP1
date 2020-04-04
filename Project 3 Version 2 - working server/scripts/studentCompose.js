

function prepareStudentCompose() {
    var reqJSON = createReqJSON(ADMIN_INBOX_KEY, STUDENT_SENT_ITEMS_KEY);
    $.post(SERVER_URL + '/checkIfEnoughSpace', reqJSON, checkIfEnoughSpace)
        .fail(errorFunction);
}

function createReqJSON(inboxKey, sentKey) {
    return {"inboxKey": inboxKey, "sentKey":sentKey}
}

function checkIfEnoughSpace(data) {
    var enoughInbox = data.enoughInbox;
    var enoughSent = data.enoughSent;
    if (enoughInbox && enoughSent) {
        loadStudentOptions();
    } else {
        if (!enoughInbox) alert("Recipient’s inbox is full.");
        if (!enoughSent) alert("Your sent items is full.");
        returnToPreviousScreen();
    }
}

function errorFunction(err) {
    alert("failed checking space");
}

/*
 * Array of the names to load in the menu.
 * They should be stored in local Storage or the server when we go into
 * next phase.
 */ 
const STUDENT_NAMES = ["student 1", 
                        "student 2", 
                        "student 3"];
const ADMIN_NAMES = ["Terence Goldsmith(Terence.GoldSmith@smu.ca)",
        "terry (terry@humanisticsystems.ca)", 
        "Charli (Charli@autismns.ca)",
        "Chrystal (Chrystal@austismns.ca)"];
const CC_NAMES = ADMIN_NAMES.concat(STUDENT_NAMES);

/*
 * Function that load all student options into the data lists.
 * It is the one the compose screen's body will call.
 * no inputs
 * returns N/A
 */ 
function loadStudentOptions() {
    loadStudentToOptions();
    loadStudentCcOptions();
}

/*
 * Function that load student To options into the data list.
 * no inputs
 * returns N/A
 */
function loadStudentToOptions() {
    var list = $("#adminNames");
    list.append(createOptionsString(ADMIN_NAMES));
}

/*
 * Function that load student Cc options into the data list.
 * no inputs
 * returns N/A
 */
function loadStudentCcOptions() {
    var list = $("#ccNames");
    list.append(createOptionsString(CC_NAMES));
}

/*
 * Given an array of options, the function creates the strings to be appended
 * to a data list and returns it.
 * array - an array of the options
 * returns the string containing the options in the proper format to be
 * appended
 */ 
function createOptionsString(array) {
    var result ="";
    for (var i = 0; i < array.length; i++) {
        result += '<option class="optionItem">'+ array[i] + '</option>';
    }
    return result;
}

/*
 * Function that displays a help message when the help button is clicked
 * in the student compose screen.
 * no inputs
 * returns N/A
 */ 
function helpStudentCompose() {
    alert("The purpose of this page is to compose an email and send it.");
}

