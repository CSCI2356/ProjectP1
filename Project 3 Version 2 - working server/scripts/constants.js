//constants for the maximum number of emails
const MAX_NUM_EMAILS = 10;

//constant to connect to server.
const PORT = 3115;
const SERVER_URL = "http://140.184.230.209:" + PORT;

//Constants for fromWhere. Required to set up viewing an email
const FROM_STUDENT_INBOX = 1;
const FROM_STUDENT_SENT_ITEMS = 2;
const FROM_ADMIN_INBOX = 3;
const FROM_ADMIN_SENT_ITEMS = 4;

//Constants for keys
const STUDENT_INBOX_KEY = "studentInbox";
const ADMIN_INBOX_KEY = "adminInbox";

const STUDENT_SENT_ITEMS_KEY = "studentSent";
const ADMIN_SENT_ITEMS_KEY = "adminSent";

//Constants for student Email. THE STUDENT dont have a FROM!!!
const STUDENT_EMAIL = "student";
