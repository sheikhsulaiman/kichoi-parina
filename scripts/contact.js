// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
// Add SDKs for Firebase products that you want to use
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClbVKTM6nru7K1rhUVAX8jEuvy0BYZBYg",
  authDomain: "kichoi-parina.firebaseapp.com",
  projectId: "kichoi-parina",
  storageBucket: "kichoi-parina.firebasestorage.app",
  messagingSenderId: "697410106039",
  appId: "1:697410106039:web:84a1d5819d72b5734a9332",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle form submission
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  console.log("Form submitted");
  e.preventDefault(); // Prevent page reload

  // Collect form data

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    // Add data to Firestore
    await addDoc(collection(db, "contacts"), {
      name: name,
      email: email,
      message: message,
      timestamp: new Date(),
    });

    alert("Your message has been sent!");
    // Optionally, clear the form
    document.getElementById("contactForm").reset();
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("There was an error sending your message. Please try again.");
  }
});
