import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Basics/Header';
import image1 from '../../images/Basketball.jpg';
import image2 from '../../images/Football.webp';
import image3 from '../../images/Soccer.jpg';
import image4 from '../../images/pickleball.jpg';
import image5 from '../../images/Volleyball.jpg';
import '../../Styles/Grouppage.css';

export default function GroupPage({user}) {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [groupPlayers, setGroupPlayers] = useState(null);
    const [joined, setJoined] = useState(false);
    const [image, setImage] = useState(null);

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
        axios.get(`https://flatiron-sports-project-api.onrender.com/user/${user}`, 
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

    function handlePlayers() {
        if (group.people_list) {
            return (
                <ul className='group-page-players-list'>
                    {group.people_list.split(',').map((player) => {
                        return (
                            <li className='group-page-players-list-item'>{player}</li>
                        )
                    })}
                </ul>
            )
        }
    }

    function handleJoin() {
        if (joined == false) {
            axios.post(`https://flatiron-sports-project-api.onrender.com/group/${id}`, {
                people_list: userDetails.first_name + ' ' + userDetails.last_name
            })
            .then(response => {
                setJoined(true);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        else {
            axios.post(`https://flatiron-sports-project-api.onrender.com/group/${id}`, {
                data: {
                    people_list: userDetails.first_name + ' ' + userDetails.last_name
                }
            })
            .then(response => {
                setJoined(false);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        
    }

    function handleJoinButton() {
        if (group.people_list) {
            if (group.people_list.split(',').includes(userDetails.first_name + ' ' + userDetails.last_name)) {
                return (
                    <button onClick={handleJoin}>Leave</button>
                )
            } else {
                return (
                    <button onClick={handleJoin}>Join</button>
                )
            }
        }
    }

    function selectImage(sport) {
        if (sport === "Basketball") {
            return image1;
        } else if (sport === "Football") {
            return image2;
        } else if (sport === "Soccer") {
            return image3;
        } else if (sport === "Pickleball") {
            return image4;
        } else if (sport === "Volleyball") {
            return image5;
        }
    }

    function playersListLength() {
        if (group.people_list) {

            return group.people_list.split(',').length;
        }
    }

    useEffect(() => {
        if (group) {
            setImage(selectImage(group.sport));
        }
    }, [group]);

    function handleLoading() {
        if (userDetails) {
            return (
                <div className='group-page-container'> 
                    <div className='group-page-section'>
                        <img className='group-page-image' src={image} alt='sport' />
                    </div>
                    <div className='group-page-section'>
                        <h1 className='group-page-header'>{group.sport}</h1>
                        <p className='group-page-text'><span className='group-page-text-title'>Owner:</span> {userDetails.username}</p>
                        <p className='group-page-text'><span className='group-page-text-title'>Address:</span> {group.location}</p>
                        <p className='group-page-text'><span className='group-page-text-title'>Time:</span> {group.time}</p>
                        <p className='group-page-text'><span className='group-page-text-title'>Date:</span> {group.date}</p>
                        <p className='group-page-text'><span className='group-page-text-title'>Skill Level:</span> {group.skill_level}</p>
                        <p className='group-page-text'><span className='group-page-text-title'>People needed:</span> {playersListLength}</p>
                        <div className='group-page-players-section'>
                            <h2 className='group-page-players-header'>Players</h2>
                            {handlePlayers()}
                        </div>
                        <div className='group-page-join-button'>
                            {handleJoinButton()}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='group-page-loading-'>
                    <h2 className='group-page-loading-message'>Loading...</h2>
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