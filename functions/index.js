const admin = require("firebase-admin");
const functions = require("firebase-functions");
const app = require("express")();
const FBAuth = require("./util/fbAuth");
const cors = require("cors");
app.use(cors());
const { db } = require("./util/admin");
// Your web app's Firebase configuration

// const firebase = require('firebase');
// firebase.initializeApp(config);

const { signup, login } = require("./handlers/users");
const { getAllChats, sendAChat } = require("./handlers/chats")
app.post("/signup", signup);
app.post("/login", login);
app.post("/chats", FBAuth, sendAChat);
app.get("/chats", FBAuth, getAllChats);
exports.api = functions.https.onRequest(app);

exports.onchatDelete = functions.firestore
.document("/chats/{chatId}")
.onDelete((snapshot, context) => {
    const chatId = context.params.chatId;
    const batch = db.batch();
    return db.collection("chatId", "==", chatId)
})