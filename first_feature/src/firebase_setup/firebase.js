// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBxZW4h3HfpSPgBraWDiRSYHB2otLkxnsQ",
//   authDomain: "final-year-project-3bd6e.firebaseapp.com",
//   projectId: "final-year-project-3bd6e",
//   storageBucket: "final-year-project-3bd6e.appspot.com",
//   messagingSenderId: "420600069439",
//   appId: "1:420600069439:web:5bbdc3e19dc301689c678a",
//   measurementId: "G-R8MKFVE24C"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBxZW4h3HfpSPgBraWDiRSYHB2otLkxnsQ",
  authDomain: "final-year-project-3bd6e.firebaseapp.com",
  projectId: "final-year-project-3bd6e",
  storageBucket: "final-year-project-3bd6e.appspot.com",
  messagingSenderId: "420600069439",
  appId: "1:420600069439:web:5bbdc3e19dc301689c678a",
  measurementId: "G-R8MKFVE24C"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)