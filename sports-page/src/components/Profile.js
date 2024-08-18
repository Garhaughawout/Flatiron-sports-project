import { useState, useEffect } from 'react';


export default function Profile({user}) {
    const [userDetails, setUserDetails] = useState(null);


    useEffect(() => {
        fetch(`http://localhost:5000/user/${user}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setUserDetails(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);    
    
    const handleLoading = () => {
        if (userDetails) {
            return (
                <div>
                    <h2>Username: {userDetails['username']}</h2>
                    <h2>Email: {userDetails['email']}</h2>
                </div>
            )
        } else {
            return (
                <div>
                    <h2>Loading...</h2>
                </div>
            )
        }
    }

    
    return (
        <div>
        {handleLoading()}
        </div>
    )
}