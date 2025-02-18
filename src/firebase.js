// Import the necessary functions from Firebase SDK v9
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Updated imports for authentication
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCOrsEDMgFmw8nZDlywI0yNqfJoi-SF1cU",
  authDomain: "eccom-fcec3.firebaseapp.com",
  projectId: "eccom-fcec3",
  storageBucket: "eccom-fcec3.firebasestorage.app",
  messagingSenderId: "333798214343",
  appId: "1:333798214343:web:36fd482f4e52277e21cce2",
  measurementId: "G-4FBQYYH8EG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Analytics
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, googleAuthProvider };

/**
 * Deploy to Firebase Hosting
 * 
 * firebase login => You can deploy now or later. To deploy now, open a terminal window, then navigate to or create a root directory for your web app.
Sign in to Google

 * firebase init => Initiate your project
Run this command from your app's root directory:

 * firebase deploy => When you're ready, deploy your web app
Put your static files (e.g., HTML, CSS, JS) in your app's deploy directory (the default is "public"). Then, run this command from your app's root directory:


 */