'use client'; // 這樣才可以用 useState 等 Hook

import { useState } from 'react';

interface FormProps {
    type: 'signup' | 'signin';
}

const AuthForm: React.FC<FormProps> = ({ type }) => {
    // State for input values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    // State for error messages
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const inputRule = /^[A-Za-z0-9]{2,}$/;

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        if (name === 'username') setUsername(value);
        if (name === 'password') setPassword(value);

        validateInputs();
    };

    // Validate inputs for both signup and signin
    const validateInputs = () => {
        if (type === 'signup') {
            setUsernameError(username === '' ? '帳號不得空白' : !inputRule.test(username) ? '帳號只能包含英數字，且至少 2 個字元' : '');
            setPasswordError(password === '' ? '密碼不得空白' : !inputRule.test(password) ? '密碼只能包含英數字，且至少 2 個字元' : '');
        } else {
            setUsernameError(username === '' ? '帳號不得空白' : !inputRule.test(username) ? '帳號只能包含英數字，且至少 2 個字元' : '');
            setPasswordError(password === '' ? '密碼不得空白' : !inputRule.test(password) ? '密碼只能包含英數字，且至少 2 個字元' : '');
        }
    };

    const isFormValid =
        (type === 'signup' &&
            usernameError === '' &&
            passwordError === '') ||
        (type === 'signin' && usernameError === '' && passwordError === '');

    return (
        <form action={`/${type}`} method="post" id={`${type}_form`}>
            {type === 'signup' && (
                <div className="input-section">
                    <div className="input-style">
                        <label htmlFor="name">姓名</label>
                        <input
                            type="text"
                            name="name"
                            id="signup_name"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            )}
            <div className="input-section">
                <div className="input-style">
                    <label htmlFor="username">{type === 'signup' ? '帳號' : '帳號'}</label>
                    <input
                        type="text"
                        name="username"
                        id={`${type}_username`}
                        value={username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="error" id={`${type}_username_error`}>{usernameError}</div>
            </div>
            <div className="input-section">
                <div className="input-style">
                    <label htmlFor="password">{type === 'signup' ? '密碼' : '密碼'}</label>
                    <input
                        type="password"
                        name="password"
                        id={`${type}_password`}
                        value={password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="error" id={`${type}_password_error`}>{passwordError}</div>
            </div>
            <div className="input-style-submit">
                <input type="submit" value={type === 'signup' ? '註冊' : '登入'} id={`${type}_submit`} disabled={!isFormValid} />
            </div>
        </form>
    );
};

export default AuthForm;
