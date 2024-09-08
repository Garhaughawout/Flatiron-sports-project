// Code to display the user's profile information
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import image1 from '../../images/Basketball.jpg';
import image2 from '../../images/Football.webp';
import image3 from '../../images/Soccer.jpg';
import image4 from '../../images/pickleball.jpg';
import image5 from '../../images/Volleyball.jpg';
import '../../Styles/Profile.css'; 
import Groupcard from '../Groups/groupcard';


export default function Profile({theme}) {
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

    function selectImage(sport) {
        switch(sport) {
            case "Basketball": return image1;
            case "Football": return image2;
            case "Soccer": return image3;
            case "Pickleball": return image4;
            case "Volleyball": return image5;
            default: return null;
        }
    }


    function handleGroups() {
        return groups.map((group) => {
            return <Groupcard 
            image={selectImage(group.sport)}
            timeBefore={group.time}
            key={group.id}
            id={group.id}
            people_list={group.people_list} 
            sport={group.sport} 
            location={group.location}
            time={group.time}
            date={group.date}
            skill={group.skill_level}
            people={group.people_needed}
            user={group.user_id}
            userDetails={userDetails}
            theme={theme}
            />;
        });
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
                        <h3 className='profile-usergroups-title'>Your Groups</h3>
                        <ul className='profile-usergroups-list'>
                            {handleGroups()}
                        </ul>
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
