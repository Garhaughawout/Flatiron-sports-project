import React from "react";
import { useState, useEffect } from "react";
import Groupcard from "./groupcard";
import image1 from '../../images/Basketball.jpg';
import image2 from '../../images/Football.webp';
import image3 from '../../images/Soccer.jpg';
import image4 from '../../images/pickleball.jpg';
import image5 from '../../images/Volleyball.jpg';
import '../../Styles/groups.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import { ThemeProvider } from "@mui/material";
import { Stack } from "@mui/material";



export default function Groups({ user, theme }) {
    const [groups, setGroups] = useState([]);
    const [timeBefore, setTimeBefore] = useState("");
    const [formInformation, setFormInformation] = useState({
        sport: "",
        location: "",
        time: "",
        date: "",
        skill: "",
        people: "",
        user_id: user,
    });
    const [userDetails, setUserDetails] = useState(null);

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

    useEffect(() => {
        fetch("https://flatiron-sports-project-api.onrender.com/groups")
            .then((res) => res.json())
            .then((data) => {
                setGroups(data);
            });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        if (formInformation.sport === "" || formInformation.location === "" || formInformation.time === "" || formInformation.date === "" || formInformation.skill === "" || formInformation.people === "") {
            alert("Please fill out all the information.");
            return;
        }
        fetch('https://flatiron-sports-project-api.onrender.com/group', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formInformation),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setGroups([...groups, data]);
            });
            window.location.reload();
            alert("Group Created!");
    }


    function handleTime(e) {
        var time = e.target.value;
        setTimeBefore(time);
        var timeArray = time.split(':');
        var hours = timeArray[0];
        var minutes = timeArray[1];
        if (hours > 12) {
            hours = hours - 12;
            if (hours >= 10) {
            time = hours + ":" + minutes;
            } else {
            time = "0" + hours + ":" + minutes;
            }
        } else if (hours === 12) {
            time = hours + ":" + minutes;
        } else {
            time = hours + ":" + minutes;
        }
        setFormInformation({
            ...formInformation,
            time: time,
        });
    }

    function editFormInformation(e) {
        setFormInformation({
            ...formInformation,
            user_id: user,
            [e.target.name]: e.target.value,
        });
    }

    function renderGroups() {
        if (groups.length === 0) {
            return <h2>No groups available</h2>;
        }
        return groups.map((group) => {
            return <Groupcard 
            image={selectImage(group.sport)}
            timeBefore={timeBefore} 
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

    return (
    <div className="container">
        <div className="groups-container">
            {renderGroups()}
        </div>
        <div className="group-form-container">
        <h2>Create a Group</h2>
        <form className="group-form">
            <label className="group-form-input">
                Sport:
                <select name="sport" value={formInformation.sport} onChange={editFormInformation} className="input-button">
                    <option value="">Select a sport</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Football">Football</option>
                    <option value="Soccer">Soccer</option>
                    <option value="Pickleball">Pickleball</option>
                    <option value="Volleyball">Volleyball</option>
                </select>
            </label>
            <label className="group-form-input">
                Location:
                <input type="text" name="location" value={formInformation.location} onChange={editFormInformation} className="input-button" placeholder="Enter the location..." />
            </label>
            <label className="group-form-input">
                Time:
                <input type="time" name="time" value={formInformation.time} onChange={handleTime} className="input-button" placeholder="Enter the time playing..." />
            </label>
            <label className="group-form-input">
                Date:
                <input type="date" name="date" value={formInformation.date} onChange={editFormInformation} className="input-button" placeholder="Enter the date playing..." />
            </label>
            <label className="group-form-input">
                Skill Level:
                <select name="skill" value={formInformation.skill} onChange={editFormInformation} className="input-button">
                    <option value="">Select a skill level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </label>
            <label className="group-form-input">
                People Needed:
                <input type="number" name="people" value={formInformation.people} onChange={editFormInformation} className="input-button" placeholder="Enter the people needed..." />
            </label>
            <ThemeProvider theme={theme}>
                <Stack direction="row" spacing={2}>
                <Button onClick={handleSubmit} variant="contained">Create Group</Button>
                </Stack>
            </ThemeProvider>
        </form>
    </div>
    </div>

    )
}