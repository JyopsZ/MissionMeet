 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
 import { getFirestore, getDocs, doc, collection } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

import { User } from "../Model/User.js";
import { Org } from "../Model/Org.js";
import  { Event } from "../Model/Event.js";
import { Admin } from "../Model/Admin.js";

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
========================= EVENT FUNCTIONS =================================
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
      eventData.event_details,
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
========================= ADMIN FUNCTIONS =================================
*/
let adminsArray = [];

async function getAdmins() {  // READ: retrieve all data from admins collection

  adminsArray = [];

  const querySnapshot = await getDocs(collection(db, "Admins"));
  querySnapshot.forEach((doc) => {

    const  adminData = doc.data();
    const admin = new Admin(

      doc.id,
      adminData.name,
      adminData.email,
      adminData.password,
      adminData.contact_no,
      adminData.org_affiliation
    );

    adminsArray.push(admin);
  });

  console.log("Admins fetched successfully:", adminsArray);
  return adminsArray;
}


/*
========================= LOGIN FUNCTIONS =================================
*/
async function verifyLogin(email, password) {
  
  const adminResult = await verifyAdminLogin(email, password);
  if (adminResult.success) {
    return {
      
      success: true,
      userType: "admin",
      userID: adminResult.userID,
      name: adminResult.name,
      email: adminResult.email
    };
  }
  
  const userResult = await verifyUserLogin(email, password);
  if (userResult.success) {
    return {
      
      success: true,
      userType: "user",
      userID: userResult.userID,
      name: userResult.name,
      email: userResult.email
    };
  }
  
  return { 
    success: false, 
    message: "Invalid email or password. Please try again." 
  };
}

async function verifyAdminLogin(email, password) {
  
  const querySnapshot = await getDocs(collection(db, "Admins"));
  for (const doc of querySnapshot.docs) {
    const adminData = doc.data();
    if (adminData.email === email && adminData.password === password) {
      
      return {
        success: true,
        message: "Login successful",
        userType: "admin",
        userID: doc.id
      };
    }
  }
  
  return {
    success: false,
    message: "Invalid email or password. Please try again."
  };
}

async function verifyUserLogin(email, password) {

  const querySnapshot = await getDocs(collection(db, "Users"));
  for (const doc of querySnapshot.docs) {
    const userData = doc.data();
    if (userData.email === email && userData.password === password) {

      return {
        success: true,
        message: "Login successful",
        userType: "user",
        userID: doc.id
      };
    }
  }

  return {
    success: false,
    message: "Invalid email or password. Please try again."
  };
}


/*
========================= EXPORTS =================================
*/

// USER EXPORT
export { getUsers }; 

// ORG EXPORT
export { getOrgs };

// EVENT EXPORT
export { getEvents };

// ADMIN EXPORT
export { getAdmins };

export { verifyLogin };