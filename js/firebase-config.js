import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDJr6Qg8ppmXvLlwvG7NAggTWP-8EpPmkI",
  authDomain: "anonymous-vent.firebaseapp.com",
  projectId: "anonymous-vent",
  storageBucket: "anonymous-vent.firebasestorage.app",
  messagingSenderId: "868971144302",
  appId: "1:868971144302:web:1b7b2f37cd7885fd86b27f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
