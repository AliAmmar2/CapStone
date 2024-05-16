import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect} from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCS5l6yN8PiUzyc3gvGyHA6je1yZO7XG5g",
  authDomain: "crwn-clothing-db-1d816.firebaseapp.com",
  projectId: "crwn-clothing-db-1d816",
  storageBucket: "crwn-clothing-db-1d816.appspot.com",
  messagingSenderId: "149570989007",
  appId: "1:149570989007:web:13743b6c6324e9660000ba"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {

        const userDocRef = doc(db, 'users', userAuth.uid);

        const userSnapshot = await getDoc(userDocRef);

        if (!userSnapshot.exists()) {
            const { displayName, email} = userAuth;
            const date = new Date();

            try{
                await setDoc(userDocRef, {
                    displayName,
                    email,
                    date
                })
            }catch(error){

            }
        } 

        return userDocRef;
}
