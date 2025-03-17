import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const AboutUs = () => {
    return (
        <Container fluid className="p-5">
            {/* Header Section */}
            <header className="text-center mb-5">
                <h1 className="display-4">InstantPlate</h1>
                <p className="lead">Savor the Moment, One Plate at a Time</p>
            </header>

            {/* Introduction Section */}
            <section className="mb-5">
                <h2>Who We Are</h2>
                <p>
                    At InstantPlate, we’re passionate about food and dedicated to providing an exceptional dining experience. 
                    Our platform bridges the gap between you and your favorite dishes, whether you’re enjoying a meal at our partner restaurants or picking up a takeout order. 
                    We make sure your food is prepared with the utmost care, so you can savor every bite.
                </p>
                <h3>Our Mission</h3>
                <p>
                    Our mission is to transform your dining experience by offering a seamless food ordering service that blends convenience with culinary excellence. 
                    We strive to ensure that every meal is delightful and every order is met with speed and precision.
                </p>
            </section>

            {/* Our Story Section */}
            <section className="mb-5">
                <h2>Our Story</h2>
                <p>
                    The idea for InstantPlate came from a love for fine dining and the realization that waiting for food can sometimes diminish the joy of eating. 
                    Our founders envisioned a platform that would not only provide high-quality meals but also make the ordering process smooth and hassle-free. 
                    Since our launch, we have been committed to bringing this vision to life by partnering with top restaurants and continually enhancing our services.
                </p>
                <h3>Founders</h3>
                <p>
                    InstantPlate was founded by a team of food lovers and tech enthusiasts who saw an opportunity to innovate in the dining industry. 
                    Together, they created a platform that combines the best of technology with a genuine passion for food.
                </p>
            </section>

            {/* Our Values Section */}
            <section className="mb-5">
                <h2>Our Values</h2>
                <Row>
                    <Col md={4}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title><i className="fas fa-utensils"></i> Customer Focus</Card.Title>
                                <Card.Text>
                                    We believe that every customer deserves a memorable dining experience. Our platform is designed to cater to your needs and preferences, ensuring that your food arrives exactly how you like it.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title><i className="fa-solid fa-medal"></i> Quality</Card.Title>
                                <Card.Text>
                                    Quality is at the heart of what we do. We work with renowned restaurants and chefs to bring you dishes made from the finest ingredients, prepared with precision and care.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title><i className="fas fa-lightbulb"></i> Innovation</Card.Title>
                                <Card.Text>
                                    We are constantly seeking new ways to enhance your dining experience. Our platform integrates cutting-edge technology to streamline the ordering process and keep you updated on your meal status.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </section>

            {/* Our Vision Section */}
            <section className="mb-5">
                <h2>Our Vision</h2>
                <p>
                    Looking ahead, we aim to expand our network of partner restaurants and introduce innovative features that enhance convenience and enjoyment. 
                    Our goal is to become your go-to platform for both in-store and takeout dining, ensuring that every meal is a celebration of great food and service.
                </p>
            </section>

            {/* Call to Action Section */}
            <section className="text-center mb-5">
                <h2>Join Us</h2>
                <p>
                    Experience the future of dining with InstantPlate. Sign up today to start ordering, follow us on social media for the latest updates, and connect with us for any inquiries or feedback. We’re here to serve you!
                </p>
                <Button variant="primary" href="/signup">Sign Up Now</Button>
            </section>

            {/* Footer Section */}
            <footer className="text-center mt-5">
                <p>
                    <strong>Contact Information:</strong><br />
                    123 Food Lane, Culinary City, FL 12345<br />
                    Phone: (123) XXX-XXXX | Email: support@instantplate.com
                </p>
                <p>
                    <a href="/page1" className="mx-2">Facebook</a>
                    <a href="/page1" className="mx-2">Twitter</a>
                    <a href="/page1" className="mx-2">Instagram</a>
                    <a href="/page1" className="mx-2">LinkedIn</a>
                </p>
            </footer>
        </Container>
    );
};

export default AboutUs;