import React, { useState } from "react";
import axios from "axios";
import '../../Styles/signup.css';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');

    // Function to handle form submission and send data to the backend
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://flatiron-sports-project-api.onrender.com/signup', {
            username: username,
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name
        })
        .then(response => {
            console.log(response);
            window.location.href = '/login';
        })
        .catch(error => {
            console.log(error);
        });
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
                    name='first_name' 
                    placeholder='First Name' 
                    value={first_name} 
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input 
                    className="signup-form-input" 
                    type='text' 
                    name='last_name' 
                    placeholder='Last Name' 
                    value={last_name} 
                    onChange={(e) => setLastName(e.target.value)}
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