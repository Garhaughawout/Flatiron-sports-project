import React from "react";
import "../Styles/Footer.css";


export default function Footer() {
    return (
        <div className='footer'>
                <h2 className='footer-header'>Contact Us</h2>
                <p className='footer-text'>123Email@gmail.com</p>
                <p className='footer-text'>{"(123)-456-789"}</p>
                <p className='footer-text'>1234 Street Name</p>
                <p className='footer-text'>City, State, Zip</p>
        </div>
    );

}