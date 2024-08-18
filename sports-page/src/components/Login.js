import React from "react";
import axios from "axios";
import { useState } from "react";
import "../Styles/login.css";

function Login( {onLogin, setAuth} ) {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [incorrectpassword, setIncorrectPassword] = useState(false);


    const handleLogin = async (event) => {
        event.preventDefault();

        try {
        const response = await axios.post("http://localhost:5000/login", {
            username,
            password,
        });
        localStorage.setItem("access_token", response.data[0].access_token);
        localStorage.setItem('uid', response.data[1]['uid']);
        setAuth(true);
        onLogin(response.data[1]['uid']);
        } catch (error) {
        console.error(error);
        setIncorrectPassword(true);
        }
    };
    

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div className="login-container">
            <form method="post" className="login-form-container">
            <h1 className="login-form-title">Log In</h1>
                <input
                    type="text"
                    id="username-input"
                    placeholder="Username"
                    name="username"
                    required
                    value={username}
                    onChange={handleUsernameChange}
                    className="login-form-input"
                />
                <input
                    type="password"
                    required
                    placeholder="Your Password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="login-form-input"
                />
            <button type="submit" className="login-submit-button" onClick={handleLogin}>
                Log In
            </button>
            {incorrectpassword && <p className="bad-entry-message">Incorrect username or password</p>}
            </form>
            
            
        </div>
    );

}

export default Login;