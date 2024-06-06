import { useEffect } from 'react';
import { auth } from '../../utilities/firebase/firebase.utils'
import './Sign-In.styles.scss'
import { getRedirectResult } from 'firebase/auth'
import SignUp from '../../components/Sign-Up/Sign-Up.component';
import SignInForm from '../../components/Sign-in-form/Sign-in-form.component';

const SignIn = () =>{

    useEffect( () =>{
        const createUser = async () => {
        const response = await getRedirectResult(auth);
        // if (response){
        //     const userDocRef = await createUserDocumentFromAuth(response.user)
        // }
    }
    createUser();
},[])

    // const logGoogleUserPopUp = async () =>{
    //     const {user} = await signInWithGooglePopup();
    //     const userDocRef = await createUserDocumentFromAuth(user);
    // }


    return(
        <div className='container'>
            {/* <button onClick={logGoogleUserPopUp}>Sign in with google</button> */}
            <SignInForm/>
            <SignUp/>
        </div>
        
    )
}

export default SignIn