import Firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/auth'


const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDERID,
    appId: process.env.FIREBASE_APP_ID
};
  
const firebase = Firebase.initializeApp(config);
const {FieldValue} = Firebase.firestore

export { firebase, FieldValue }