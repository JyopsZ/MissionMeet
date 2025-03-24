 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
 import { getFirestore, getDocs, doc, collection } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

import { User } from "../Model/User.js";

const firebaseConfig = {
  apiKey: "AIzaSyBzG830umF6WH_WM6JKuGTrWTkyr7XVQ0A",
  authDomain: "missionmeet.firebaseapp.com",
  databaseURL: "https://missionmeet-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "missionmeet",
  storageBucket: "missionmeet.firebasestorage.app",
  messagingSenderId: "717336079741",
  appId: "1:717336079741:web:16417042e32e7bc629f014",
  measurementId: "G-N0PP9D8CSX"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

let usersArray = [];

async function getUsers() {

  usersArray = [];

  const querySnapshot = await getDocs(collection(db, "Users"));
  querySnapshot.forEach((doc) => {

    console.log(`${doc.id} => ${doc.data()}`);
    const userData = doc.data();
    const user = new User(
      
      userData.userID,
      userData.name,
      userData.email,
      userData.password,
      userData.contact_no,
      userData.events_joined
    );

    usersArray.push(user);
  });

  console.log("Users fetched successfully:", usersArray);
  return usersArray;
}

export { getUsers };