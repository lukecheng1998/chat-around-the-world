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
app.post("/signup", signup);
app.post("/login", login);
exports.api = functions.https.onRequest(app);
