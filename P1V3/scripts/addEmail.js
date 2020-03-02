function addEmailsFromKey(key) {
    var divPointer = $("div.toDisplayEmails");
    if (localStorage.getItem(key) !== null) {
        var emails = JSON.parse(localStorage.getItem(key)).emails;

        var toDisplay = "";
        for (var i = 0; i < emails.length; i++) {
            toDisplay += createNewRow(i, key, emails[i]) + "<br><br>";
        }
        divPointer.append(toDisplay);
    }
}

function createNewRow(i, key, email) {
    return '<div data-type="horizontal">'
            + '<div class="btn emailRow" '
                + 'onclick="viewEmail('+ i + ',\'' + key + '\')">' 
                + '<a class="btn email">' + email.conversationPartner + '</a>'
                + '<a class="btn email">' + email.subject + '</a>'
            + '</div>'
            + '<a class="btn deleteKey" ' 
            + 'onclick="deleteEmail(\'' + key  + '\',' +  i + ')">X</a>'
        + '</div>';
}