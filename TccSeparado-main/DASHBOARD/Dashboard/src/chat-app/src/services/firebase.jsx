import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqvW7BxMb7cUAsisU8PmC5_z6Wwb_MoHg",
  authDomain: "chat-app-tcc.firebaseapp.com",
  projectId: "chat-app-tcc",
  storageBucket: "chat-app-tcc.appspot.com",
  messagingSenderId: "551763215912",
  appId: "1:551763215912:web:472e233b16763ae197971d"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
