import React, { useState, useEffect } from "react";
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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


export default function Groups({ theme }) {
    const [groups, setGroups] = useState([]);
    const [timeBefore, setTimeBefore] = useState("");
    const user = localStorage.getItem('uid');
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
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Fetch user details from the backend on page load
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

    // Fetch groups from the backend on page load
    useEffect(() => {
        fetch("https://flatiron-sports-project-api.onrender.com/groups")
            .then((res) => res.json())
            .then((data) => {
                setGroups(data);
            });
    }, []);

    // Function to select the correct image based on the sport of the group
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

    // Function to handle the form submission and create a new group
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
            alert("Group Created!");
    }

    // Function to handle the time input and convert it to 12 hour format
    function handleTime(e) {
        const time = e.target.value;
        setTimeBefore(time);
        let [hours, minutes] = time.split(':');
        if (hours > 12) {
            hours = hours - 12;
            hours = hours < 10 ? "0" + hours : hours;
        }
        setFormInformation({
            ...formInformation,
            time: `${hours}:${minutes}`,
        });
    }

    // Function to edit the form information
    function editFormInformation(e) {
        setFormInformation({
            ...formInformation,
            user_id: user,
            [e.target.name]: e.target.value,
        });
    }

    // Function to render the groups
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
            <ThemeProvider theme={theme}>
                <Button onClick={handleOpen} variant="contained" style={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    width: "100%",
                    height: 50,
                    margin: "10px 0",
                    position: "sticky",
                    top: 1,
                    zIndex: 1,
                    marginTop: 10,
                    fontSize: 15,
                    fontWeight: "bold",
                    padding: 10,
                }}>
                    Create a Group
                </Button>
            </ThemeProvider>
            {renderGroups()}
        </div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box className="modal-box" sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: {
                    xs: '90%', // 90% of the screen width on extra-small devices
                    sm: 400,  // 400px width on small devices and up
                    md: 500,  // 500px width on medium devices and up
                    lg: 600,  // 600px width on large devices and up
                },
                bgcolor: 'background.paper',
                borderRadius: 5,
                border: '1px solid #000',
                boxShadow: 24,
                p: {
                    xs: 2,  // Smaller padding on extra-small devices
                    sm: 3,  // Default padding on small devices and up
                    md: 4,  // Increased padding on medium devices and up
                },
            }}>
                <h2 id="modal-title">Create a Group</h2>
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
            </Box>
        </Modal>
    </div>
    )
}