import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Basics/Header';

export default function GroupPage({user}) {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        axios.get(`https://flatiron-sports-project-api.onrender.com/group/${id}`)
        .then(response => {
            setGroup(response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:5000/user/${user}`, 
        { headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        } }
        )

        .then(response => {
            setUserDetails(response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [user]);

    function handleLoading() {
        if (userDetails) {
            return (
                <div> 
                    <div>
                        <h1>{group.sport}</h1>
                        <p>{userDetails.username}</p>
                        <p>{group.location}</p>
                        <p>{group.time}</p>
                        <p>{group.date}</p>
                        <p>{group.skill_level}</p>
                        <p>{group.people_needed}</p>
                    </div>
                    <div>
                        <h2>Players</h2>
                    </div>
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