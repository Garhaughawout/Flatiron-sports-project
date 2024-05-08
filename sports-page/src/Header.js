import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/header.css';

export default function Header() {
    return (
        <div className='header'>
            <div className='header-left'>
                <img className='header-image' src='https://t4.ftcdn.net/jpg/03/02/12/83/360_F_302128359_q6aCwgAvdYZBPF4XSwxXddLPE0h3Kor1.jpg' alt="sports"/>
                <h1 className='header-name'>Sports Page</h1>
            </div>
            <ul className='link-button-container'>
                <Link to='/' className='link-button'>Home</Link>
                <Link to='/about' className='link-button'>About</Link>
                <Link to='/groups' className='link-button'>Groups</Link>
            </ul>
        </div>
      );
} 