import Firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/auth'


const config = {
    apiKey: "AIzaSyCbAzMj1d0F898eonTuTQH6jqQ5mp1fMlY",
    authDomain: "instagram-yt-ce667.firebaseapp.com",
    projectId: "instagram-yt-ce667",
    storageBucket: "instagram-yt-ce667.appspot.com",
    messagingSenderId: "657915636774",
    appId: "1:657915636774:web:bf1cf03eccc66524320ae7"
};
  
const firebase = Firebase.initializeApp(config);
const {FieldValue} = Firebase.firestore


export { firebase, FieldValue }