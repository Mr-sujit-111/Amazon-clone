import { initializeApp } from "firebase/app";
import { collection, collectionGroup, doc, getDoc, getDocs, getFirestore, query } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const q = query(collectionGroup(db, "users"));
export const stripeOrders = await getDocs(q);

export const fireStoredata = stripeOrders.docs.map((doc) => {
    return ({ ...doc.data(), id: doc.id })
})


