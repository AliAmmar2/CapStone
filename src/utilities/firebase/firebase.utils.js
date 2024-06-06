import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect,signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCS5l6yN8PiUzyc3gvGyHA6je1yZO7XG5g",
  authDomain: "crwn-clothing-db-1d816.firebaseapp.com",
  projectId: "crwn-clothing-db-1d816",
  storageBucket: "crwn-clothing-db-1d816.appspot.com",
  messagingSenderId: "149570989007",
  appId: "1:149570989007:web:13743b6c6324e9660000ba"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
//const facebookProvider = new FacebookAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object)
    });
    
    await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc,docSnapshshot) => {
        const {title, items} = docSnapshshot.data();
        acc[ title.toLowerCase() ] = items;
        return acc;
    }, {});

    return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {} ) => {

        const userDocRef = doc(db, 'users', userAuth.uid);

        const userSnapshot = await getDoc(userDocRef);

        if (!userSnapshot.exists()) {
            const { displayName, email} = userAuth;
            const date = new Date();

            try{
                await setDoc(userDocRef, {
                    displayName,
                    email,
                    date,
                    ...additionalInfo
                })
            }catch(error){
                console.log("error: ",error);
            }
        } 

        return userDocRef;
}

export const createAuthWithEmailAndPassword = async (email, password) => {
    if ( !email || !password ) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if ( !email || !password ) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const SignOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback);
}
