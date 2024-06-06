import { useState } from "react";
import { createAuthWithEmailAndPassword, createUserDocumentFromAuth } from "../../utilities/firebase/firebase.utils";
import './Sign-Up.styles.scss';
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const SignUp = () =>{
    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmedPassword: ''
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmedPassword } = formFields;

    const onChangeHandler = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmedPassword){
            alert('Passwords do not match.');
            return;
        }
        try{
            const { user } = await createAuthWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            setFormFields(defaultFormFields);
        }catch(error){
                if(error.code ==='auth/email-already-in-use'){
                    alert("Email already in use.");
                }else if(error.code === 'auth/weak-password'){
                    alert('Choose a stronger password.');
                }
            
        }
    }

    return(
    <div className="sign-up-container">
    <h3>Sign up with Email and Password</h3>

    <form onSubmit={handleSubmit}>
        <FormInput 
            label='Display Name'
            name='displayName'
            type='text'
            value={displayName}
            onChange={onChangeHandler}
            required
        />
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
        <FormInput 
        label = 'Confirm Password:'
            name='confirmedPassword'
            type='password'
            value={confirmedPassword}
            onChange={onChangeHandler}
            required
        />
        <Button type="submit">Create Account</Button>
    </form>
    </div>
    )
}

export default SignUp;