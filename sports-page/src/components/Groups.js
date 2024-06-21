import React from "react";
import { useState, useEffect } from "react";
import Groupcard from "./groupcard";
import image1 from '../images/Basketball.jpg';
import image2 from '../images/Football.webp';
import image3 from '../images/Soccer.jpg';
import image4 from '../images/pickleball.jpg';
import image5 from '../images/Volleyball.jpg';
import '../Styles/groups.css';


export default function Groups() {
    const [groups, setGroups] = useState([]);
    const [formInformation, setFormInformation] = useState({
        sport: "",
        location: "",
        time: "",
        date: "",
        skill: "",
        people: "",
    })


    useEffect(() => {
        fetch("https://sports-data.onrender.com/listings")
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
            key={group.id} 
            sport={group.sport} 
            location={group.location}
            time={group.time}
            date={group.date}
            skill={group.skill}
            people={group.people}
            />;
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(!formInformation.sport || !formInformation.location || !formInformation.time || !formInformation.date || !formInformation.skill || !formInformation.people) {
            alert("Please fill out all fields");
        }
        else {
        
        fetch("https://sports-data.onrender.com/listings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formInformation),
        })
        .then((res) => res.json())
        .then((data) => {
            setGroups([...groups, data]);
        });
        }
    }

    function editFormInformation(e) {
        setFormInformation({
            ...formInformation,
            [e.target.name]: e.target.value,
        });
    }

    if (groups.length === 0) {
        return <h1>Come back in a couple minutes. The Data needs to load to function.</h1>;
    } 
    
    else  
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
                <input type="text" name="sport" value={formInformation.sport} onChange={editFormInformation} className="input-button" placeholder="Enter the desired sport..." />
            </label>
            <label className="group-form-input">
                Location:
                <input type="text" name="location" value={formInformation.location} onChange={editFormInformation} className="input-button" placeholder="Enter the location..." />
            </label>
            <label className="group-form-input">
                Time:
                <input type="text" name="time" value={formInformation.time} onChange={editFormInformation} className="input-button" placeholder="Enter the time playing..." />
            </label>
            <label className="group-form-input">
                Date:
                <input type="text" name="date" value={formInformation.date} onChange={editFormInformation} className="input-button" placeholder="Enter the date playing..." />
            </label>
            <label className="group-form-input">
                Skill Level:
                <input type="text" name="skill" value={formInformation.skill} onChange={editFormInformation} className="input-button" placeholder="Enter the skill level..." />
            </label>
            <label className="group-form-input">
                People Needed:
                <input type="text" name="people" value={formInformation.people} onChange={editFormInformation} className="input-button" placeholder="Enter the people needed..." />
            </label>
            <input className="group-form-submit" type="submit" value="Create Group" onClick={handleSubmit} />
        </form>
    </div>
</div>

    )
}