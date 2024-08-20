import React, { useEffect } from "react";
import { useState } from "react";
import '../../Styles/groupcard.css';
import Button from '@mui/material/Button';
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import { Stack } from "@mui/material";


export default function Groupcard({image, sport, location, time, date, skill, people, timeBefore, theme}) {
    const [finalTime, setFinalTime] = useState("");

    useEffect(() => {
        if (parseInt(timeBefore.split(":")[0]) > 12) {
            setFinalTime(time + ' ' + "PM");
            return
        } else {
            setFinalTime(time + ' ' + "AM");
            return
        }  
    }, []);

    return (
        <div className="card-container">
            <div className="card-image-container">
                <img className="card-image" src={image}></img>
            </div>
            <div className="card-content">
                <h2>{sport}</h2>
                <p><span className="card-bold">Location:</span> {location}</p>
                <p><span className="card-bold">Time:</span> {finalTime}</p>
                <p><span className="card-bold">Date:</span> {date}</p>
                <p><span className="card-bold">Skill Level:</span> {skill}</p>
                <p><span className="card-bold">People Needed:</span> {people}</p>
            </div>
            <div className="groupcard-buttons-container">
                <ThemeProvider theme={theme}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained">View</Button>
                    </Stack>
                </ThemeProvider>
            </div>
        </div>
    )
}