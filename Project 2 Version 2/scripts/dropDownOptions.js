/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * js file that is used by the compose screens to load the drop down menu.
 */

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
 * Function that load all admin options.
 * It is the one the compose screen's body will call.
 * no inputs
 * returns N/A
 */ 
function loadAdminOptions() {
    loadAdminToOptions();
    loadAdminFromOptions();
    loadAdminCcOptions();
}

/*
 * Function that load admin To options into the data list.
 * no inputs
 * returns N/A
 */ 
function loadAdminToOptions() {
    var list = $("#studentNames");
    list.append(createOptionsString(STUDENT_NAMES));
}

/*
 * Function that load admin From options into the data list.
 * no inputs
 * returns N/A
 */ 
function loadAdminFromOptions() {
    var list = $("#adminNames");
    list.append(createOptionsString(ADMIN_NAMES));
}

/*
 * Function that load admin Cc options into the data list.
 * no inputs
 * returns N/A
 */
function loadAdminCcOptions() {
    var list = $("#ccNames");
    list.append(createOptionsString(CC_NAMES));
}


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
