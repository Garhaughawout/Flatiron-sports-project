import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Basics/Header';

export default function GroupPage({user}) {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [groupPlayers, setGroupPlayers] = useState(null);
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/group/${id}`)
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

    function handlePlayers() {
        if (group.people_list) {
            return (
                <ul className=''>
                    {group.people_list.split(',').map((player) => {
                        return (
                            <li className='player-name'>{player}</li>
                        )
                    })}
                </ul>
            )
        }
    }

    function handleJoin() {
        if (joined == false) {
            
            axios.post(`http://localhost:5000/group/${id}`, {
                people_list: userDetails.first_name + ' ' + userDetails.last_name
            })
            .then(response => {
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        else {
            axios.post(`http://localhost:5000/group/${id}`, {
                data: {
                    people_list: userDetails.first_name + ' ' + userDetails.last_name
                }
            })
            .then(response => {
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
                        {handlePlayers()}
                    </div>
                    <div>
                        {handleJoinButton()}
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