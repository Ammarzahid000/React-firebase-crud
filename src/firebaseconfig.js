// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB9bYPc-cq_9-4cDK_l63Z_WuqpU2UmikE",
    authDomain: "request-app-80107.firebaseapp.com",
    projectId: "request-app-80107",
    storageBucket: "request-app-80107.appspot.com",
    messagingSenderId: "853046568895",
    appId: "1:853046568895:web:2f1f134f6c6f8f66b9a30a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
