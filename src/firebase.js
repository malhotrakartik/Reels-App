import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"

firebase.initializeApp({
    apiKey: "AIzaSyAlId8Fv-2DRxey3eAUTvp2rsCOSMtk6po",
    authDomain: "reels-ce4dc.firebaseapp.com",
    projectId: "reels-ce4dc",
    storageBucket: "reels-ce4dc.appspot.com",
    messagingSenderId: "887703232486",
    appId: "1:887703232486:web:5ac7e15e6c90f383388027",
    measurementId: "G-XERZH0M85D"
  });

  export const auth = firebase.auth();         //for authentication
  export const firestore = firebase.firestore();          //for storing data,collections vgerh isse hi bnti hai
  export const database ={
    users:firestore.collection('users'),
    getCurrentTimeStamp : firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();        //for storing physical data like images videos etc
// export default firebase
