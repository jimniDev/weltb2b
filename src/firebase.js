import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC93GMOA7-HpJyYldbvCUkYL7ShwyMtA1U",
    authDomain: "weltb2bdashboard.firebaseapp.com",
    databaseURL: "https://weltb2bdashboard.firebaseio.com",
    projectId: "weltb2bdashboard",
    storageBucket: "weltb2bdashboard.appspot.com",
    messagingSenderId: "663359024163",
    appId: "1:663359024163:web:1297f6d2f9e3dfd64a9596",
    measurementId: "G-VXPM7KBN5R"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export {firestore};