// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE3WmwZYr_QAgr0BGgko6UEKbBPjYU9rc",
  authDomain: "cyp-image-safe.firebaseapp.com",
  databaseURL: "https://cyp-image-safe-default-rtdb.firebaseio.com",
  projectId: "cyp-image-safe",
  storageBucket: "cyp-image-safe.appspot.com",
  messagingSenderId: "28489268963",
  appId: "1:28489268963:web:74aaf744f34a0aa03e8fd6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectDb = getDatabase(app);

export { projectDb };
