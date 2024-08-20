import React, { useState } from "react";
import '../../Styles/signup.css';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://flatiron-sports-project-api.onrender.com/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <div className="signup-container">
            <form className='signup-form-container' method='POST'>
                <h1 className="signup-form-title">Sign Up</h1>
                <input 
                    className="signup-form-input" 
                    type='text' 
                    name='username' 
                    placeholder='Username' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    className="signup-form-input"
                    type='text' 
                    name='email' 
                    placeholder='Email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    className="signup-form-input" 
                    type='password' 
                    name='password' 
                    placeholder='Password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button 
                    className="signup-form-button" 
                    type='submit' 
                    onClick={handleSubmit}>Sign Up
                </button>
            </form>
        </div>
    );
}