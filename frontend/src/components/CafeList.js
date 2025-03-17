import React, { useState } from 'react';
import { Card, Row, Col, Container, Badge, Button, Modal, ListGroup } from 'react-bootstrap';
import cafeImage1 from '../assets/images/cafe1.jpg';
import cafeImage2 from '../assets/images/cafe2.jpg';
import cafe1menu from '../assets/images/cafe1menu.jpg';
import Payment from './Payment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const CafeList = () => {
  const cafes = [
    {
      name: 'Central Perk',
      location: 'Los Angeles, USA',
      description: 'Cozy cafe with a variety of coffee and pastries.',
      rating: 4.8,
      image: cafeImage1,
      menuImage: cafe1menu,
    },
    {
      name: 'Blue Bottle Cafe',
      location: 'San Francisco, USA',
      description: 'A modern cafe serving specialty coffee.',
      rating: 4.6,
      image: cafeImage2,
      menuImage: cafe1menu,
    },
  ];

  const [showMenuModal, setShowMenuModal] = useState(false);
  const [selectedMenuImage, setSelectedMenuImage] = useState('');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [showPayment, setShowPayment] = useState(false); // New state variable to track whether to show the payment component
  const [quantity, setQuantity] = useState({});

  const dishes = [
    { name: 'Cappuccino', price: 5 },
    { name: 'Croissant', price: 3 },
    { name: 'Latte', price: 6 },
  ];

  const handleViewMenu = (menuImage) => {
    setSelectedMenuImage(menuImage);
    setShowMenuModal(true);
  };

  const handleOrder = () => {
    setShowOrderModal(true);
  };

  const handleAddDish = (dish) => {
    setSelectedDishes((prevDishes) => [...prevDishes, dish]);
    setQuantity((prevQuantity) => ({ ...prevQuantity, [dish.name]: (prevQuantity[dish.name] || 0) + 1 }));
    setShowPayment(true);
  };

  const handleRemoveDish = (dish) => {
    setSelectedDishes((prevDishes) => prevDishes.filter((d) => d !== dish));
    setQuantity((prevQuantity) => ({ ...prevQuantity, [dish.name]: (prevQuantity[dish.name] || 0) - 1 }));
    if (selectedDishes.length === 1) {
      setShowPayment(false);
    }
  };

  const getQuantity = (dish) => {
    return quantity[dish.name] || 0;
  };

  const handlePaymentSuccess = () => {
    setShowOrderModal(false);
    setShowPayment(false);
    setSelectedDishes([]);
  };

  return (
    <Container style={{ marginTop: '70px' }}>
      {cafes.map((cafe, index) => (
        <Card className="my-3 p-3 horizontal-card" key={index}>
          <Row className="align-items-center">
            <Col md={3}>
              <Card.Img
                src={cafe.image}
                alt={cafe.name}
                className="cafe-image"
              />
            </Col>
            <Col md={9}>
              <Card.Body>
                <Card.Title>{cafe.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {cafe.location}
                </Card.Subtitle>
                <Card.Text>{cafe.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <Badge pill variant="success">
                    Rating: {cafe.rating} ⭐
                  </Badge>
                  <div>
                    <Button variant="primary" className="mx-2" onClick={() => handleViewMenu(cafe.menuImage)}>
                      View Menu
                    </Button>
                    <Button variant="warning" onClick={handleOrder}>
                      Order
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}

      {/* View Menu Modal */}
      <Modal show={showMenuModal} onHide={() => setShowMenuModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedMenuImage} alt="Menu" style={{ width: '100%' }} />
        </Modal.Body>
      </Modal>

{/* Order Modal */}
<Modal show={showOrderModal} onHide={() => setShowOrderModal(false)} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Order Dishes</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <ListGroup>
  {dishes.map((dish, index) => (
    <ListGroup.Item key={index}>
      <div className="d-flex justify-content-between align-items-center">
        <span style={{ flex: 1 }}>{dish.name}</span>
        <span style={{ flex: 1, textAlign: 'center' }}>${dish.price}</span>
        {selectedDishes.includes(dish) ? (
          <div className="d-flex align-items-center">
            <Button variant="danger" onClick={() => handleRemoveDish(dish)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
            <span> x {getQuantity(dish)}</span>
            <Button variant="success" onClick={() => handleAddDish(dish)}>+</Button>
          </div>
        ) : (
          <Button variant="primary" onClick={() => handleAddDish(dish)}>Add</Button>
        )}
      </div>
    </ListGroup.Item>
  ))}
</ListGroup>
    <div className="d-flex justify-content-between align-items-center mt-3">
      <span>Total:</span>
      <span>${selectedDishes.reduce((acc, dish) => acc + dish.price, 0)}</span>
    </div>
    {showPayment && (
      <Payment
        dishes={selectedDishes}
        total={selectedDishes.reduce((acc, dish) => acc + dish.price, 0)}
        onSuccess={handlePaymentSuccess}
      />
    )}
  </Modal.Body>
</Modal>
</Container>
  );
};

export default CafeList;