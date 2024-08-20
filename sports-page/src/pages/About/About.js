import React from 'react';
import '../../Styles/about.css';
import { Link } from 'react-router-dom';


export default function About() {
    
    const boldstyle = {
        fontWeight: 'bold',
    }
    
    return (
        <div className='about-container'>
            <div className='about-header'>
                <h1>Get Up</h1>
            </div>
            <div className='about-information'>
                <h3>Welcome to Get up</h3>
                <p>Get Up is a sports site that connects you with other players in your area. You can create groups, join groups, and schedule games with other players. Get Up is the perfect app for anyone who loves to play sports but doesn't have a team to play with. Sign up today and start playing!</p>
                <br></br>
                <h3>Our Mission</h3>
                <p>Our mission is simple: to provide a platform where people can easily find others who share their enthusiasm for sports and form communities centered around their favorite activities. We understand that finding like-minded individuals to play sports with can sometimes be challenging, which is why we've created a space where you can connect with others who are just as eager to hit the field, court, or rink as you are.</p>
                <br></br>
                <h3>Why Choose Us?</h3>
                <ul>
                    <li className='aboutpage-list'><span style={boldstyle}>Community Focus:</span> We're more than just a platform for organizing sports activities. We're a community of individuals who share a common love for sports and the camaraderie it brings.</li>
                    <li className='aboutpage-list'><span style={boldstyle}>Diverse Sports Offering:</span> Diverse Sports Offerings: Whether you're into basketball, soccer, pickleball, or something entirely different, you'll find a place for your favorite sport here. Our platform caters to a wide range of interests and skill levels.</li>
                    <li className='aboutpage-list'><span style={boldstyle}>Easy to Use:</span> Our user-friendly interface makes it simple to create or join sports events, connect with other players, and manage your activities—all in one convenient location.</li>
                    <li className='aboutpage-list'><span style={boldstyle}>Safety and Security:</span> Your safety is our top priority. We take measures to ensure that our platform is a safe and welcoming environment for all members of our community.</li>
                </ul>
                <br></br>
                <h3>Get Involved</h3>
                <p>Ready to join the fun? Creating an account on Get Up is quick and easy. Simply sign up, create your profile, and start browsing upcoming events in your area. Whether you're looking to join a pickup game, organize a tournament, or simply meet new friends who share your passion for sports, you'll find everything you need right here. </p>
                <br></br>
                <h3>Get Up and Get Active!</h3>
                <p>Don't miss out on the opportunity to be part of our vibrant sports community. Join Get Up today and take the first step toward discovering new friendships, exploring exciting sports activities, and making memories that will last a lifetime.</p>
            </div>
            <div className="aboutpage-buttons">
                <button className="homepage-button"><Link to="/groups" className="homepage-link">Find Groups</Link></button>
            </div>
        </div>
    );
}