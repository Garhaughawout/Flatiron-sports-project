import React from 'react'
import axios from 'axios'

export default function Logout() {
    
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
            localStorage.removeItem('uid');
            alert('Logged out successfully');
        } catch (error) {
            console.error(error);
    }
    }
    
    return (
        <div className="logout-form">
            <form method="post">
                <button onClick={handleLogout}>Logout</button>
            </form>
        </div>
    )
}