/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * composingHelperMethods.js:
 * js file that is used by both composing screen that contains the 
 * the drop down menu options and short helper methods used by
 * the composing screens.
 */

/*
 * Array of the names to load in the drop down menu.
 * They should be stored in local Storage or the server when we go into
 * next phase.
 */ 
const ADMIN_STUDENT_NAMES = ["student 1", "student 2", "student 3"];
const ADMIN_ADMIN_NAMES = ["Terence Goldsmith(Terence.GoldSmith@smu.ca)",
        "terry (terry@humanisticsystems.ca)", 
        "Charli (Charli@autismns.ca)",
        "Chrystal (Chrystal@austismns.ca)"];
const ADMIN_CC_NAMES = ADMIN_ADMIN_NAMES.concat(ADMIN_STUDENT_NAMES);

/*
 * Array of the names to load in the drop down menu for the students.
 * They should be stored in local Storage or the server when we go into
 * next phase.
 */ 
const STUDENT_STUDENT_NAMES = ["student 1", 
                        "student 2", 
                        "student 3"];
const STUDENT_ADMIN_NAMES = ["Terence Goldsmith(Terence.GoldSmith@smu.ca)",
        "terry (terry@humanisticsystems.ca)", 
        "Charli (Charli@autismns.ca)",
        "Chrystal (Chrystal@austismns.ca)"];
const STUDENT_CC_NAMES = STUDENT_ADMIN_NAMES.concat(STUDENT_STUDENT_NAMES);

/*
 * Given an array of options, the function creates the strings to be appended
 * to a data list and returns it.
 * 
 * array = an array of the options
 * 
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
 * Function to create the request for checking if enough space.
 *
 * inboxName = the name of the inbox collection
 * sentName = the name of the sent collection
 *
 * returns a JSON containing the two names
 */ 
function createTwoNamesReq(inboxName, sentName) {    
    return {"inboxName" : inboxName, "sentName" : sentName};
}

/*
 * Function that displays a help message when the help button is clicked
 * in the admin compose screen.
 * 
 * no inputs
 * 
 * returns N/A
 */ 
function helpAdminCompose() {
    alert("The purpose of this page is to compose an email and send it.");
}

/*
 * Function that displays a help message when the help button is clicked
 * in the student compose screen.
 * 
 * no inputs
 * 
 * returns N/A
 */ 
function helpStudentCompose() {
    alert("The purpose of this page is to compose an email and send it.");
}
