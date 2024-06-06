import { useState, useEffect } from "react";
import {auth,
        signInWithGoogleRedirect,
        signInAuthWithEmailAndPassword

} from '../../utilities/firebase/firebase.utils';
import { getRedirectResult } from 'firebase/auth';
import './Sign-in-form.styles.scss';
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const SignInForm = () =>{
    const defaultFormFields = {
        email: '',
        password: '',
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const onChangeHandler = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await signInAuthWithEmailAndPassword(email, password);
            console.log(response);
            setFormFields(defaultFormFields);
        }catch(error){
            if(error.code === 'auth/wrong-password'){
                alert('Wrong Password');
            }
        }
    }

    useEffect( () =>{
        const SignInWithGoogle = async () => {
        await getRedirectResult(auth);
        // if (response){
        //     await createUserDocumentFromAuth(response.user)
        // }
    }
    SignInWithGoogle();
},[])


    return(
    <div className="sign-in-container">
    <h3>Already have an account?</h3>

    <form onSubmit={handleSubmit}>
        <FormInput 
            label='Email'
            name='email'
            type='email'
            value={email}
            onChange={onChangeHandler}
            required
            
        />
        <FormInput 
            label='Password'
            name='password'
            type='password'
            value={password}
            onChange={onChangeHandler}
            required
            
        />
        <div className="buttons-container">
            <Button type="submit">Sign In</Button>
            <Button type="button" button_type='google' onClick={signInWithGoogleRedirect} >Google Sign-in</Button>
        </div>
        
        
    </form>
    
    </div>
    )
}

export default SignInForm;