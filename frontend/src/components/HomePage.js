import React from 'react';
import { Carousel, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import { FaHotel } from 'react-icons/fa';
import { GiNoodles, GiFireBowl } from 'react-icons/gi';
import { CiCoffeeCup } from "react-icons/ci";


// import Navbar from './Navbar';


import slide1 from '../assets/images/1slide.jpg';
import slide2 from '../assets/images/2slide.jpg';
import slide3 from '../assets/images/3slide.jpg';
import hotelImg from '../assets/images/hotel.jpg';
import dhabaImg from '../assets/images/dhaba.jpg';
import chineseImg from '../assets/images/chinese.jpg';
import cafeImg from '../assets/images/cafe.jpg';
import '../App.css';

const HomePage = () => {
    const navigate = useNavigate(); // Use navigate instead of history

    const cardsData = [
        {
            img: hotelImg,
            name: 'Hotel',
            location: 'City Center',
            icon: <FaHotel size={50} color="" />,
            link: '/hotel'  // Link to the specific hotel page
        },
        {
            img: dhabaImg,
            name: 'Dhaba',
            location: 'Highway 47',
            icon: <GiFireBowl size={50} color="" />,
            link: '/dhaba'  // Link to the specific hotel page
        },
        {
            img: chineseImg,
            name: 'Chinese',
            location: 'Downtown',
            icon: <GiNoodles size={50} color="" />,
            link: '/chinese'  // Link to the specific hotel page
        },
        {
            img: cafeImg,
            name: 'Cafe',
            location: 'Uptown',
            icon: <CiCoffeeCup size={50} color="#2c3e50" />,
            link: '/cafe'  // Link to the specific hotel page
        }
    ];

    const handleExploreClick = (link) => {
        navigate(link); // Use navigate instead of history.push
    };

    return (
        <div className="mainDiv">
            {/* { <Navbar title="InstantPlate" />} */}
            {/* Carousel Section */}
            <Carousel fade={true} interval={3000} controls={false}>
                <Carousel.Item>
                    <img className="d-block w-100" src={slide1} alt="First slide" />
                    <Carousel.Caption style={{ fontSize: '24px', fontFamily: 'Arial' }}>
                        <h3 style={{ fontSize: '50px', fontFamily: 'Arial' }}>Delicious Meals Delivered</h3>
                        <p style={{ fontSize: '20px', fontFamily: 'Arial' }}>Savor the best dishes from top restaurants.</p>
                    </Carousel.Caption>
                </Carousel.Item>
    
                <Carousel.Item>
                    <img className="d-block w-100" src={slide2} alt="Second slide" />
                    <Carousel.Caption style={{ fontSize: '24px', fontFamily: 'Arial' }}>
                        <h3 style={{ fontSize: '50px', fontFamily: 'Arial' }}>Ready for You</h3>
                        <p style={{ fontSize: '20px', fontFamily: 'Arial' }}>Your food is prepared fresh, just for you.</p>
                    </Carousel.Caption>
                </Carousel.Item>
    
                <Carousel.Item>
                    <img className="d-block w-100" src={slide3} alt="Third slide" />
                    <Carousel.Caption style={{ fontSize: '24px', fontFamily: 'Arial' }}>
                        <h3 style={{ fontSize: '50px', fontFamily: 'Arial' }}>Treat Yourself</h3>
                        <p style={{ fontSize: '20px', fontFamily: 'Arial' }}>Indulge in mouth-watering desserts and more.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            
            <div className="choose-your-craving">
                <h1>Choose Your Craving !!!</h1>
            </div>
    
            {/* Cards Section */}
            <div className="cards-container">
                {cardsData.map((card, index) => (
                    <Card className="card-item" key={index}>
                        <div className="card-icon">{card.icon}</div>
                        <div className="card-img-container">
                            <img src={card.img} alt={card.name} className="card-img" />
                        </div>
                        <Card.Body>
                            <Card.Title style={{ fontSize: '24px', fontFamily: 'Arial' }}>{card.name}</Card.Title>
                            <Card.Text style={{ fontSize: '18px', fontFamily: 'Arial' }}>{card.location}</Card.Text>
                            <Button variant="primary" onClick={() => handleExploreClick(card.link)}>
                                Explore
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default HomePage;