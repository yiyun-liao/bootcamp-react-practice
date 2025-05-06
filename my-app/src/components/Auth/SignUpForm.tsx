'use client'
import { useState } from 'react';
import { useRouter } from 'next/router';
import Input from '../Input';
import Button from '../Button';
import { validateEmail,validatePassword,signUpCheck } from './auth-utils';


export default function SignUpForm({type}){
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [submitted, setSubmitted] = useState(true);
    // const [loinError, setLoginError] = useState('');

    const showEmailError = validateEmail(enteredEmail);
    const showPasswordError = validatePassword(enteredPassword);
    const formInvalid = !!showEmailError || !!showPasswordError;
    
    function handleSubmit(e: React.FormEvent){
        e.preventDefault();

        if (formInvalid) {
            setSubmitted(false);
            return;
        }
        
        if(!signUpCheck(enteredEmail, enteredPassword)){
            setSubmitted(true);
            console.log(type,'sign up success', '送出資料：', { email: enteredEmail, password: enteredPassword });
        }else{
            console.log('Sign up fail');
            alert('Sign up fail');
        }
    }


    return(
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 mb-6">
                <Input
                    label = 'Email'
                    type="email"
                    value={enteredEmail}
                    invalid={!submitted && !!showEmailError}
                    errorMessage={!submitted && showEmailError ? showEmailError : ''}
                    onChange={(e) => setEnteredEmail(e.target.value)}
                    />
                <Input
                    label = 'Password'
                    type="password"
                    value={enteredPassword}
                    invalid={!submitted && !!showPasswordError}
                    errorMessage={!submitted && showPasswordError ? showPasswordError : ''}
                    onChange={(e) => setEnteredPassword(e.target.value)}
                    />
            </ div>
            <div className="flex justify-end gap-2">
                <Button 
                    variant="solid" 
                    width='full' 
                    type="submit">
                        {type}
                </Button>
            </div>
        </form>
    )
}