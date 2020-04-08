/*
 * Humaid Muhammad Agowun (A00430163) 
 * Mark Trickett (A00416603) 
 * Diego Gardiner (A00423960)
 * 
 * displayEmailHelper.js:
 * js file that is used by the inbox and sent items screens.
 * It contain several helper methods for the displayEmails.js
 * Also has the functions to the change names into encoding and back.
 */


/*
 * Function that creates the hoverable two buttons that represents the
 * email's conversation partner and subject
 * 
 * i = the index of the email
 * encoding = an encoding for the key
 * email = the json representing a sent email
 *
 * return a string for the two email buttons.
 */ 
function createEmailTwoButtons(i, encoding, email) {
    return  '<div class="btn emailRow" '
                + 'onclick="viewEmail('+ i + ',' + encoding + ')">' 
                + '<a class="btn ' + email.read + '">' 
                + email.conversationPartner + '</a>'
                + '<a class="btn ' + email.read + '">' 
                + email.subject + '</a>'
            + '</div>';
}

/*
 * Function that create a delete key.
 *
 * encoding = an encoding for the key.
 * i = the index of the email in the JSON
 *
 * returns the string for the properly formed delete key.
 */ 
function createDeleteKey(encoding, i) {
    return '<a class="btn deleteKey" ' 
            + 'onclick="deleteEmail(\'' + encoding  + '\',' +  i 
        + ')">X</a>';
} 

/*
 * Function that create a checkbox and ticks it based on whether the 
 * email is urgent.
 * 
 * urgency = an email's urgency
 * i = the index of the email in the JSON
 * 
 * returns the string for the properly ticked checkbox
 */ 
function createCheckBox(urgency, i, encoding) {
    if (urgency == "urgent") {
        return '<input type="checkbox" class="myCheckBox" '
        + 'onclick=clickCheckBox(' + i + ',' + encoding + ') checked>';
    } else {
        return '<input type="checkbox" class="myCheckBox" '
        + 'onclick=clickCheckBox(' + i + ',' + encoding + ')>';
    }
}

/*
 * Function that takes a name and returns an encoding so that we don't 
 * print the name onto the screen.
 *
 * name = the collection name whose encoding we wish to get.
 *
 * returns an integer representing the encoding.
 */ 
function getCodeFromName(name) {
    if (name == STUDENT_INBOX_NAME) return 1;
    if (name == ADMIN_INBOX_NAME) return 2;
    if (name == STUDENT_SENT_ITEMS_NAME) return 3;
    if (name == ADMIN_SENT_ITEMS_NAME) return 4;
}

/*
 * Function that takes an encoding and returns a name so that we don't 
 * print the name onto the screen.
 *
 * name = the encoding whose name we wish to get.
 *
 * returns a string representing the name.
 */  
function getNameFromEncoding(code) {
    if (code == 1) return STUDENT_INBOX_NAME;
    if (code == 2) return ADMIN_INBOX_NAME;
    if (code == 3) return STUDENT_SENT_ITEMS_NAME;
    if (code == 4) return ADMIN_SENT_ITEMS_NAME;
}

/*
 * Function that create the request for the deletion and urgency server logic.
 *
 * name = the collection name
 * i = the index of the email
 *
 * return a JSON that is used as a request for posts.
 */ 
function createNameIndexReq(name, i) {
    return {"collectionName":name, "index":i};
}
