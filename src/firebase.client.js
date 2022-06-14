// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getStorage, ref as sref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmaP_6KFMBZvZL4Xg9iuqJZYxcv6fVzJg",
  authDomain: "web-test-firebase-7c3c8.firebaseapp.com",
  databaseURL: "https://web-test-firebase-7c3c8-default-rtdb.firebaseio.com",
  projectId: "web-test-firebase-7c3c8",
  storageBucket: "web-test-firebase-7c3c8.appspot.com",
  messagingSenderId: "719279644920",
  appId: "1:719279644920:web:6d35dcfbe49ad6a3075b0d",
  measurementId: "G-795HW2F3P4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getDatabase();
const auth = getAuth();

function fileUpload(file, type, callback, index) {
  const storageRef = sref(storage, "images/" + type + index + currentUserId() + ".jpg");
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (error) => {},
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        if (index) {
          callback(file, downloadURL);
        } else {
          callback(downloadURL);
        }
      });
    }
  );
}

function signUp(data) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        await set(ref(db, "users/" + user.uid), data);
        resolve({ status: 200 });
      })
      .catch((error) => {
        reject({ msg: error.message, code: error.code });
        console.error(error);
      });
  });
}

function currentUserId() {
  return auth.currentUser.uid;
}

function signout() {
  return signOut(auth);
}

function signIn(data) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        // Signed in
        const user = await get(child(ref(db), "users/" + userCredential.user.uid));
        // await set(ref(db, "users/" + user.uid), data);
        resolve(user.val());
      })
      .catch((error) => {
        reject({ msg: error.message, code: error.code });
        console.error(error);
      });
  });
}

function setData(node, data) {
  return new Promise((resolve, reject) => {
    set(ref(db, node + "/"), data)
      .then(() => {
        resolve({ status: 200 });
      })
      .catch((error) => {
        reject({ msg: error.message, code: error.code });
        console.error(error);
      });
  });
}

function setSingleData(node, nodeId, data) {
  return new Promise((resolve, reject) => {
    set(ref(db, node + "/" + nodeId), data)
      .then(() => {
        resolve({ status: 200 });
      })
      .catch((error) => {
        reject({ msg: error.message, code: error.code });
        console.error(error);
      });
  });
}

function getData(node) {
  return new Promise((resolve, reject) => {
    get(child(ref(db), node + "/"))
      .then((snapshot) => {
        const data = [];
        if (snapshot.exists()) {
          const keys = Object.keys(snapshot.val());
          for (let key of keys) {
            data.push({ ...snapshot.val()[key], key: key });
          }
          resolve(data);
        } else {
          resolve(data);
        }
      })
      .catch((error) => {
        reject({ msg: error.message, code: error.code });
        console.error(error);
      });
  });
}

function getSingleData(node, nodeId) {
  return new Promise((resolve, reject) => {
    get(child(ref(db), node + "/" + nodeId))
      .then((snapshot) => {
        const data = [];
        if (snapshot.exists()) {
          console.log(snapshot.val());
          resolve(data);
        } else {
          resolve(data);
        }
      })
      .catch((error) => {
        reject({ msg: error.message, code: error.code });
        console.error(error);
      });
  });
}

export {
  app,
  setData,
  getData,
  getSingleData,
  signUp,
  signIn,
  setSingleData,
  currentUserId,
  fileUpload,
  signout,
};
