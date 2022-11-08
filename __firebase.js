import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAYTGRmCJPIOGx-Pz_M30leTA9A4AoYiR8",
    authDomain: "clone-8dee6.firebaseapp.com",
    projectId: "clone-8dee6",
    storageBucket: "clone-8dee6.appspot.com",
    messagingSenderId: "166760123042",
    appId: "1:166760123042:web:2918120e42c0c1e618a5fb"
};

const app = initializeApp(firebaseConfig);
export const db = app.firestore();