// Code to display the user's profile information
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Styles/Profile.css'; 
import Groupcard from '../Groups/groupcard';


const Profile = () => {
    const user = localStorage.getItem('uid');
    const [userDetails, setUserDetails] = useState({});
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetch(`https://flatiron-sports-project-api.onrender.com/user/${user}`, {
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
    }, [user]);

    useEffect(() => {
        axios.get(`https://flatiron-sports-project-api.onrender.com/groups`)
        .then(response => {
            setGroups(response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    function handleGroups() {
        for (let i = 0; i < groups.length; i++) {
            if (groups[i].user_id === user) {
                return (
                    console.log(groups[i])
                )
            }
        }
    }

    function handleLoading() {
        if (userDetails && groups) {
            return (
                <div className='profile-container'>
                    <div className='profile-card'>
                        <h2 className='profile-name'>{userDetails.first_name} {userDetails.last_name}</h2>
                        <p className='profile-email'>{userDetails.email}</p>
                    </div>
                    <div className='profile-usergroups-container'>
                        {/* <h3 className='profile-usergroups-title'>Your Groups</h3>
                        <ul className='profile-usergroups-list'>
                            {handleGroups()}
                        </ul> */}
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className='profile-container'>
                    <div className='profile-card'>
                        <h2 className='profile-name'>Loading...</h2>
                    </div>
                </div>
            )
        }
    }

  return (
    <div className="profile-container">
      {handleLoading()}
    </div>
  );
};

export default Profile;
