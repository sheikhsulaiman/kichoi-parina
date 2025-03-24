import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

// Firebase configuration
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
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const loginForm = document.getElementById("loginForm");
const logoutButton = document.getElementById("logoutButton");
const loginSection = document.getElementById("loginSection");
const messagesSection = document.getElementById("messagesSection");
const messagesDiv = document.getElementById("messages");
const loginError = document.getElementById("loginError");

// Login event
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      loginError.textContent = ""; // Clear error message
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      loginError.textContent = "Invalid email or password.";
    });
});

// Logout event
logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out.");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
});

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    loginSection.style.display = "none";
    messagesSection.style.display = "block";

    // Fetch messages from Firestore
    loadMessages();
  } else {
    // User is signed out
    loginSection.style.display = "block";
    messagesSection.style.display = "none";
  }
});

// Fetch and display messages from Firestore
async function loadMessages() {
  messagesDiv.innerHTML = ""; // Clear previous messages
  try {
    const querySnapshot = await getDocs(collection(db, "contacts"));
    querySnapshot.forEach((doc) => {
      const message = doc.data();

      // Create a card for each message
      const card = document.createElement("div");
      card.classList.add("message-card");

      const name = document.createElement("h3");
      name.textContent = `Name: ${message.name}`;

      const email = document.createElement("p");
      email.textContent = `Email: ${message.email}`;

      const messageContent = document.createElement("p");
      messageContent.textContent = `Message: ${message.message}`;

      const timestamp = document.createElement("small");
      timestamp.textContent = `Sent on: ${message.timestamp.toDate()}`;

      // Append elements to the card
      card.appendChild(name);
      card.appendChild(email);
      card.appendChild(messageContent);
      card.appendChild(timestamp);

      // Append the card to the messages container
      messagesDiv.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    messagesDiv.textContent = "Failed to load messages.";
  }
}
