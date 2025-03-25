 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
 import { getFirestore, getDocs, doc, collection } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

import { User } from "../Model/User.js";
import { Org } from "../Model/Org.js";

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

/*
========================= ORG FUNCTIONS =================================
*/
let orgsArray = [];

async function getOrgs() {  // READ: retrieve all data from orgs collection

  orgsArray = [];

  const querySnapshot = await getDocs(collection(db, "Orgs"));
  querySnapshot.forEach((doc) => {

    const orgData = doc.data();
    const org = new Org(

      doc.id,
      orgData.org_name,
      orgData.org_description,
      orgData.org_address,
      orgData.org_email,
      orgData.org_contact,
      orgData.org_logo,
      orgData.admins,
      orgData.events
    );

    orgsArray.push(org);
  });

  console.log("Orgs fetched successfully:", orgsArray);
  return orgsArray;
}

/*
========================= ORG FUNCTIONS =================================
*/
let eventsArray = [];

async function getEvents() {  // READ: retrieve all data from events collection

  eventsArray = [];

  const querySnapshot = await getDocs(collection(db, "Events"));
  querySnapshot.forEach((doc) => {

    const eventData = doc.data();
    const event = new Event(

      doc.id,
      eventData.event_name,
      eventData.event_etails,
      eventData.event_date,
      eventData.image,
      eventData.members_joined
    );

    eventsArray.push(event);
  });

  console.log("Events fetched successfully:", eventsArray);
  return eventsArray;
}


/*
========================= USER FUNCTIONS =================================
*/
let usersArray = [];

async function getUsers() {  // READ: retrieve all data from users collection

  usersArray = [];

  const querySnapshot = await getDocs(collection(db, "Users"));
  querySnapshot.forEach((doc) => {

    //console.log(`${doc.id} => ${doc.data()}`);
    const userData = doc.data();
    const user = new User(
      
      doc.id,
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


/*
========================= EXPORTS =================================
*/

// USER EXPORT
export { getUsers }; 

// ORG EXPORT
export { getOrgs };