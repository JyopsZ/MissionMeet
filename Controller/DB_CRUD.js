 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
 import { getFirestore, getDocs, doc, collection, setDoc, arrayUnion, updateDoc, getDoc, arrayRemove } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

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

  const q = await getDocs(collection(db, "Orgs"));
  q.forEach((doc) => {

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

  const q = await getDocs(collection(db, "Events"));
  q.forEach((doc) => {

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

  const q = await getDocs(collection(db, "Users"));
  q.forEach((doc) => {

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

  const q = await getDocs(collection(db, "Admins"));
  q.forEach((doc) => {

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
  
  const q = await getDocs(collection(db, "Admins"));
  for (const doc of q.docs) {
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

  const q = await getDocs(collection(db, "Users"));
  for (const doc of q.docs) {
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
========================= SIGNUP FUNCTIONS =================================
*/
async function userSignup (name, contact, email, password) {

  const q = await getDocs(collection(db, "Users"));
  for (const doc of q.docs) {
    const userData = doc.data();
    if (userData.email === email) { // Check if email already exists

      return {
        success: false,
        message: "Email already exists. Please try again."
      };
    }
  }

  let userID = "U00001"; // Default user ID, sets it to this value if none exist
  let highestID = 0;

  for (const doc of q.docs) {

    const docID = doc.id;
    const numeric = parseInt(docID.substring(1));

    if (numeric > highestID) {
      highestID = numeric;
    }
  }
  
  const newNumeric = highestID + 1;
  userID = "U" + newNumeric.toString().padStart(5, "0");

  await setDoc(doc(db, "Users", userID), {

    name: name,
    email: email,
    password: password,
    contact_no: contact,
    events_joined: []
  });

  return {
    
    success: true,
    message: "Signup successful",
    userID: userID
  };
  
}


async function adminSignup (name, contact, email, password) {

  const q = await getDocs(collection(db, "Admins"));
  for (const doc of q.docs) {
    const userData = doc.data();
    if (userData.email === email) { // Check if email already exists

      return {
        success: false,
        message: "Email already exists. Please try again."
      };
    }
  }

  let adminID = "A00001"; // Default admin ID, sets it to this value if none exist
  let highestID = 0;

  for (const doc of q.docs) {

    const docID = doc.id;
    const numeric = parseInt(docID.substring(1));

    if (numeric > highestID) {
      highestID = numeric;
    }
  }
  
  const newNumeric = highestID + 1;
  adminID = "A" + newNumeric.toString().padStart(5, "0");

  await setDoc(doc(db, "Admins", adminID), {

    name: name,
    email: email,
    password: password,
    contact_no: contact,
    events_joined: []
  });

  return {
    
    success: true,
    message: "Signup successful",
    adminID: adminID
  };
  
}

// JOIN EVENT
async function joinEvent(userID, eventID) {
  try {
    const userRef = doc(db, "Users", userID);
    const eventRef = doc(db, "Events", eventID);

    // Get user document
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      console.error("User document not found:", userID);
      return { success: false, message: "User not found." };
    }

    // Get event document
    const eventDoc = await getDoc(eventRef);
    if (!eventDoc.exists()) {
      console.error("Event document not found:", eventID);
      return { success: false, message: "Event not found." };
    }

    const userData = userDoc.data();
    const eventData = eventDoc.data();

    // Check if user already joined the event
    if (userData.events_joined?.includes(eventID)) {
      return { success: false, message: "You have already joined this event!" };
    }

    // Check if event already contains this user
    if (eventData.members_joined?.includes(userID)) {
      return { success: false, message: "You are already part of this event!" };
    }

    // Proceed with join
    await updateDoc(userRef, {
      events_joined: arrayUnion(eventID),
    });

if (!eventData.members_joined) {
  await updateDoc(eventRef, {
    members_joined: [],
  });
}

await updateDoc(eventRef, {
  members_joined: arrayUnion(userID),
});

    return { success: true, message: "You have successfully joined the event!" };

  } catch (error) {
    console.error("Error joining event:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

// DELETE EVENT
async function cancelEvent(userID, eventID) {
  try {
      const userRef = doc(db, "Users", userID);
      const eventRef = doc(db, "Events", eventID);

      await updateDoc(userRef, {
          events_joined: arrayRemove(eventID)
      });

      await updateDoc(eventRef, {
          members_joined: arrayRemove(userID)
      });

      return { success: true, message: "Successfully cancelled participation in the event." };
  } catch (error) {
      console.error("Error cancelling event:", error);
      return { success: false, message: "An error occurred while cancelling the event." };
  }
}

// DONATION FUNCTION
async function submitDonation(userID, amount) {
  try {
    const donationsRef = collection(db, "Donations");
    const snapshot = await getDocs(donationsRef);

    // Generate Donation ID
    let donationID = "D00001";
    let highestID = 0;

    snapshot.forEach((doc) => {
      const id = doc.id;
      const numeric = parseInt(id.substring(1));
      if (numeric > highestID) highestID = numeric;
    });

    donationID = "D" + String(highestID + 1).padStart(5, "0");

    // Human-readable timestamp
    const now = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    };
    const formattedDate = now.toLocaleString("en-US", options);

    // Create donation
    await setDoc(doc(db, "Donations", donationID), {
      user_id: userID,
      amount_donated: parseFloat(amount),
      timestamp: formattedDate
    });

    return { success: true, message: "Donation recorded successfully." };

  } catch (error) {
    console.error("Error processing donation:", error);
    return { success: false, message: "Failed to record donation." };
  }
}


/*
========================= EXPORTS =================================
*/
// EXPORT
export { submitDonation };

// JOIN EVENT EXPORT
export { joinEvent };

// DEELETE EVENT EXPORT
export { cancelEvent };

// USER EXPORT
export { getUsers }; 

// ORG EXPORT
export { getOrgs };

// EVENT EXPORT
export { getEvents };

// ADMIN EXPORT
export { getAdmins };

export { verifyLogin };
export { userSignup };
export { adminSignup };