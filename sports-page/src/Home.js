import React from "react";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from './images/Basketball.jpg';
import image2 from './images/Football.webp';
import image3 from './images/Soccer.jpg';
import image4 from './images/pickleball.jpg';
import image5 from './images/Volleyball.jpg';
import './Styles/home.css';

export default function Home() {
    return (
        <div>
            <div className="image-carousel">
                <AliceCarousel autoPlay autoPlayInterval="4000" infinite disableButtonsControls>
                    <img src={image1} className="sliderimg" alt="sports"/>
                    <img src={image2} className="sliderimg" alt="sports"/>
                    <img src={image3} className="sliderimg" alt="sports"/>
                    <img src={image4} className="sliderimg" alt="sports"/>
                    <img src={image5} className="sliderimg" alt="sports"/>
                </AliceCarousel>
            </div>
        </div>
    );
}