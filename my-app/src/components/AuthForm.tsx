'use client'
import { useState } from 'react';
import Input from './Input';
import Button from './Button';

interface FormProps {
    type: 'signup' | 'signin';
}

export default function AuthForm({type}:FormProps){
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [submitted, setSubmitted] = useState(true);
    

    const emailEmpty = enteredEmail.trim() === '';
    const emailInvalid = !enteredEmail.includes('@');
    const passwordEmpty = enteredPassword.trim() === '';
    const passwordInvalid = enteredPassword.length < 6;

    const showEmailError = !submitted && (emailEmpty || emailInvalid);
    const showPasswordError = !submitted && (passwordEmpty || passwordInvalid);

    const emailErrorMessage = emailEmpty ? '帳號不得空白' :
        emailInvalid ? '帳號不正確' : '';

    const passwordErrorMessage = passwordEmpty ? '密碼不得空白' :
        passwordInvalid ? '密碼不得少於六個字元' : '';

    const formInvalid = emailEmpty || emailInvalid || passwordEmpty || passwordInvalid;
    
    function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        if (!formInvalid) {
            setSubmitted(true);
            console.log(type, '送出資料：', { email: enteredEmail, password: enteredPassword });
        }else{
            setSubmitted(false);
        }
    }


    return(
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 mb-6">
                <Input
                    label = 'Email'
                    invalid={showEmailError}
                    type="email"
                    value={enteredEmail}
                    errorMessage={showEmailError ? emailErrorMessage : ''}
                    onChange={(e) => setEnteredEmail(e.target.value)}
                    />
                <Input
                    label = 'Password'
                    invalid={showPasswordError} 
                    type="password"
                    value={enteredPassword}
                    errorMessage={showPasswordError ? passwordErrorMessage : ''}
                    onChange={(e) => setEnteredPassword(e.target.value)}
                    />
            </ div>
            <div className="flex justify-end gap-2">
                <Button variant="solid" width='full' type="submit">{type}</Button>
            </div>
        </form>
    )
}