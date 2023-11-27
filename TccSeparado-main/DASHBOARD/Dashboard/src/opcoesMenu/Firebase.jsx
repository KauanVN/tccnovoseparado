import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
   
        apiKey: "AIzaSyBJhcIa566OeP2A3EWlh6ldzXosq975Ny4",
        authDomain: "react-uplods.firebaseapp.com",
        projectId: "react-uplods",
        storageBucket: "react-uplods.appspot.com",
        messagingSenderId: "87788960120",
        appId: "1:87788960120:web:eb30e43dcece0223c1b08d",
        measurementId: "G-T5JPGX7KPZ"
      
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export { storage };