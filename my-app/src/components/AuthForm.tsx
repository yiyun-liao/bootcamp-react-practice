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
    const [submitted, setSubmitted] = useState(false);

    function handleInputChange(identifier:string, value:string) {
      if (identifier === 'email') {
        setEnteredEmail(value);
      } else {
        setEnteredPassword(value);
      }
    }

    function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        setSubmitted(true);
    }

    const emailNotValid = submitted && !enteredEmail.includes('@');
    const passwordNotValid = submitted && enteredPassword.trim().length < 6;

    return(
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 mb-6">
                <Input
                    label = 'Email'
                    invalid={emailNotValid}
                    type="email"
                    onChange={(event) => handleInputChange('email', event.target.value)}
                    />
                <Input
                    label = 'Password'
                    invalid={passwordNotValid} 
                    type="password"
                    onChange={(event) => handleInputChange('password', event.target.value)}
                    />
            </ div>
            <div className="flex justify-end gap-2">
                <Button 
                    variant="solid" 
                    width='full' 
                    type="submit"
                    children={type}
                    />
            </div>
        </form>
    )
}