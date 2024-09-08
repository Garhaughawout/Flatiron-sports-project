import React from "react";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from '../../images/Basketball.jpg';
import image2 from '../../images/Football.webp';
import image3 from '../../images/Soccer.jpg';
import image4 from '../../images/pickleball.jpg';
import image5 from '../../images/Volleyball.jpg';
import '../../Styles/home.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ThemeProvider, Stack } from "@mui/material";
import { Navigate } from "react-router-dom";


export default function Home({ theme }) {
    
    return (
        <div>
            <div className="image-carousel">
                <AliceCarousel autoPlay autoPlayInterval="3000" infinite disableDotsControls>
                    <img src={image1} className="sliderimg" alt="sports"/>
                    <img src={image2} className="sliderimg" alt="sports"/>
                    <img src={image3} className="sliderimg" alt="sports"/>
                    <img src={image4} className="sliderimg" alt="sports"/>
                    <img src={image5} className="sliderimg" alt="sports"/>
                </AliceCarousel>
            </div>
            <div className="home-content">
                <h1>Are you ready to GET UP and play!</h1>
                <p>Get Up is a sports site that connects you with other players in your area. You can create groups, join groups, and schedule games with other players. Get Up is the perfect app for anyone who loves to play sports but doesn't have a team to play with. Sign up today and start playing!</p>
            </div>
            <div className="homepage-buttons">
                <ThemeProvider theme={theme}>
                    <Stack direction="row" spacing={2}>
                        <Link to="/about" style={{textDecoration: 'none'}}>
                            <Button variant="contained">Learn More</Button>
                        </Link>
                        <Link to="/groups" style={{textDecoration: 'none'}}>
                            <Button variant="contained">Find Groups</Button>
                        </Link>
                    </Stack>
                </ThemeProvider>
            </div>
        </div>
    );
}