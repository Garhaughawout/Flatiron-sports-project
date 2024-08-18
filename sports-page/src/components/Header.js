import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/header.css';
import axios from 'axios';
import HamburgerMenu from './HamburgerMenu';

export default function Header({ user }) {

    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            await axios.delete("https://flatiron-sports-project-api.onrender.com/logout", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            localStorage.removeItem('access_token');
            alert('Logged out successfully');
            window.location.href = '/';
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='header'>
            <div className='header-left'>
                <img className='header-image' src='https://t4.ftcdn.net/jpg/03/02/12/83/360_F_302128359_q6aCwgAvdYZBPF4XSwxXddLPE0h3Kor1.jpg' alt="sports" />
                <h1 className='header-name'>Get Up</h1>
            </div>
            <ul className='link-button-container'>
                <Link to='/' className='link-button'>Home</Link>
                <Link to='/about' className='link-button'>About</Link>
                <Link to='/groups' className='link-button'>Groups</Link>
                <Link to='/profile' className='link-button'>Profile</Link>
                {user ? 
                <button onClick={handleLogout} className='link-button-logout'>Logout</button> : 
                <><Link to='/login' className='link-button'>Login</Link><Link to='/signup' className='link-button'>Signup</Link></>}
            </ul>
            <HamburgerMenu user={user} handleLogout={handleLogout} />
        </div>
    );
}