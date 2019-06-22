import * as firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB1QrsH2Jq0ZXMFEXzB-sumJ8GGX1aZy7M",
  authDomain: "weng-se-697ba.firebaseapp.com",
  databaseURL: "https://weng-se-697ba.firebaseio.com",
  projectId: "weng-se-697ba",
  storageBucket: "weng-se-697ba.appspot.com",
  messagingSenderId: "542783485865",
  appId: "1:542783485865:web:d05bb4e34323f90a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

const database = firebase.database();

export {
  auth,
  database,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider,
  firebase
};