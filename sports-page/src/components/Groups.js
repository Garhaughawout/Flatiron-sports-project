import React from "react";
import { useState, useEffect } from "react";
import Groupcard from "./groupcard";
import image1 from '../images/Basketball.jpg';
import image2 from '../images/Football.webp';
import image3 from '../images/Soccer.jpg';
import image4 from '../images/pickleball.jpg';
import image5 from '../images/Volleyball.jpg';
import '../Styles/groups.css';


export default function Groups({ user }) {
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


    useEffect(() => {
        fetch("http://localhost:5000/groups")
            .then((res) => res.json())
            .then((data) => {
                setGroups(data);
            });
    }, []);

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
    
    function renderGroups() {
        return groups.map((group) => {
            return <Groupcard 
            image={selectImage(group.sport)}
            timeBefore={timeBefore} 
            key={group.id} 
            sport={group.sport} 
            location={group.location}
            time={group.time}
            date={group.date}
            skill={group.skill_level}
            people={group.people_needed}
            user_id={group.user_id}
            />;
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (formInformation.sport === "" || formInformation.location === "" || formInformation.time === "" || formInformation.date === "" || formInformation.skill === "" || formInformation.people === "") {
            alert("Please fill out all the information.");
            return;
        }
        fetch("http://localhost:5000/group", {
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


    function editFormInformation(e) {
        setFormInformation({
            ...formInformation,
            user_id: user,
            [e.target.name]: e.target.value,
        });
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
        console.log(time);
    }

    if (groups.length === 0) {
        return <h1>Come back in a couple minutes. The Data needs to load to function.</h1>;
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
            <input className="group-form-submit" type="submit" value="Create Group" onClick={handleSubmit} />
        </form>
    </div>
    </div>

    )
}