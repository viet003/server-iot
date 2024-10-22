const firebase = require('firebase/app');
 
require('firebase/firestore');  

const firebaseConfig = {
  apiKey: "AIzaSyB0BZI-ESKBs2RlT7hbCpbDfWMM7Zu08fc",
  authDomain: "iotserverdb.firebaseapp.com",
  projectId: "iotserverdb",
  storageBucket: "iotserverdb.appspot.com",
  messagingSenderId: "920362230740",
  appId: "1:920362230740:web:971ba6193b64918c056c41",
  measurementId: "G-QKY5DMCG81"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); 

module.exports = { firebase, db };
