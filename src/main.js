import { createApp } from 'vue'
import App from './App.vue'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUEz4fjPmfPPQEK2ejoQHuFQwO_8XXs3U",
  authDomain: "zenbuddy-c83a0.firebaseapp.com",
  projectId: "zenbuddy-c83a0",
  storageBucket: "zenbuddy-c83a0.appspot.com",
  messagingSenderId: "76251326790",
  appId: "1:76251326790:web:9437e08df1518db8aa9d47",
  measurementId: "G-VY3NHHRML2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createApp(App).mount('#app')
