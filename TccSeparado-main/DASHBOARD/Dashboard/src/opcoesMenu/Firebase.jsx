// firebase.js
import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
   
        apiKey: "AIzaSyBJhcIa566OeP2A3EWlh6ldzXosq975Ny4",
        authDomain: "react-uplods.firebaseapp.com",
        projectId: "react-uplods",
        storageBucket: "react-uplods.appspot.com",
        messagingSenderId: "87788960120",
        appId: "1:87788960120:web:eb30e43dcece0223c1b08d",
        measurementId: "G-T5JPGX7KPZ"
      
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
