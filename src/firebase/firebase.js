// ./Fire.js

import * as firebase from "firebase"
import "firebase/firestore"
import "firebase/functions"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCMuKHwjIwb60LkUq07WnIydwhXf7AReZQ",
    authDomain: "sway-8c668.firebaseapp.com",
    databaseURL: "https://sway-8c668.firebaseio.com",
    projectId: "sway-8c668",
    storageBucket: "sway-8c668.appspot.com",
    messagingSenderId: "988674434039"
});

const firestore = firebaseApp.firestore()
const auth = firebaseApp.auth()
const functions = firebaseApp.functions()
const storage = firebaseApp.storage()

// firestore.settings({ timestampsInSnapshots: true })
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)



export { firestore, auth, functions, storage }

