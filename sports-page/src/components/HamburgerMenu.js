import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/HamburgerMenu.css';

function HamburgerMenu({ user, handleLogout }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='hamburger-menu'>
            <button className='hamburger-icon' onClick={toggleMenu}>
                ☰
            </button>
            {isOpen && (
                <div className='hamburger-links'>
                    <Link to='/' className='hamburger-link' onClick={toggleMenu}>Home</Link>
                    <Link to='/about' className='hamburger-link' onClick={toggleMenu}>About</Link>
                    <Link to='/groups' className='hamburger-link' onClick={toggleMenu}>Groups</Link>
                    <Link to='/profile' className='hamburger-link' onClick={toggleMenu}>Profile</Link>
                    {user ? 
                    <button onClick={handleLogout} className='hamburger-link-button'>Logout</button> : 
                    <>
                        <Link to='/login' className='hamburger-link' onClick={toggleMenu}>Login</Link>
                        <Link to='/signup' className='hamburger-link' onClick={toggleMenu}>Signup</Link>
                    </>
                    }
                </div>
            )}
        </div>
    );
}

export default HamburgerMenu;
