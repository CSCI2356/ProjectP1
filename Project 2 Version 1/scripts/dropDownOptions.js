
const STUDENT_NAMES = ["student 1", "student 2", "student 3"];
const ADMIN_NAMES = ["Terence Goldsmith(Terence.GoldSmith@smu.ca)", 
        "terry (terry@humanisticsystems.ca)", "Charli (Charli@autismns.ca)",
        "Chrystal (Chrystal@austismns.ca)"];
const CC_NAMES = ADMIN_NAMES.concat(STUDENT_NAMES);

function loadAdminOptions() {
    loadAdminToOptions();
    loadAdminFromOptions();
    loadAdminCcOptions();
}

function loadAdminToOptions() {
    var list = $("#studentNames");
    list.append(createOptionsString(STUDENT_NAMES));
}

function loadAdminFromOptions() {
    var list = $("#adminNames");
    list.append(createOptionsString(ADMIN_NAMES));
}

function loadAdminCcOptions() {
    var list = $("#ccNames");
    list.append(createOptionsString(CC_NAMES));
}

function loadStudentOptions() {
    loadStudentToOptions();
    loadStudentCcOptions();
}

function loadStudentToOptions() {
    var list = $("#adminNames");
    list.append(createOptionsString(ADMIN_NAMES));
}

function loadStudentCcOptions() {
    var list = $("#ccNames");
    list.append(createOptionsString(CC_NAMES));
}

function createOptionsString(array) {
    var result ="";
    for (var i = 0; i < array.length; i++) {
        result += '<option>'+ array[i] + '</option>';
    }
    return result;
}
