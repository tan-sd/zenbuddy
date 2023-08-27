// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, child } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_DATABASE_URL,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_ID,
    measurementId: process.env.VUE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp({ ...firebaseConfig });
// const analytics = getAnalytics(app);

const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

// login and signup functions
const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const signOutUser = () => {
    return signOut(auth);
};

const storeUserData = async (userId, username) => {
    const userRef = ref(database, "users/" + userId);

    try {
        set(userRef, {
            username: username,
        });
        console.log("User data stored successfully");
    } catch (error) {
        console.error("Error storing user data: ", error);
    }
};

const fetchUserName = () => {
    const user = auth.currentUser;
    const dbRef = ref(database);
    return get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
        return snapshot.val().username;
    });
};

const fetchUserID = () => {
    const user = auth.currentUser;
    if (user) {
        return user.uid;
    } else {
        return null;
    }
};

// CRUD functions 

const readJournalData = (userId) => {
    const dbRef = ref(database, "users/" + userId + "/journal");
    return get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        }
    }).catch((error) => {
        console.error(error);
    } );
    
};
export {
    auth,
    createUser,
    signInUser,
    signOutUser,
    storeUserData,
    fetchUserName,
    fetchUserID,
    readJournalData,
};
