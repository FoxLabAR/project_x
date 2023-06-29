import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA1xyBsJJSPeRRVgmhaU6AdiWCO36-cE0g",
  authDomain: "proyecto-x-2cfe1.firebaseapp.com",
  projectId: "proyecto-x-2cfe1",
  storageBucket: "proyecto-x-2cfe1.appspot.com",
  messagingSenderId: "49313811767",
  appId: "1:49313811767:web:f3da0768733b06effe9eb2"
};

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()

  export const auth = firebase.auth()
  export const currentUser = auth.currentUser
  export const UsuariosDB = db.collection('Usuarios');
