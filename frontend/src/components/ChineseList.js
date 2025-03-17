import React, { useState } from 'react';
import { Card, Row, Col, Container, Badge, Button, Modal, ListGroup } from 'react-bootstrap';
import chineseImage1 from '../assets/images/chinese1.jpg';
import chineseImage2 from '../assets/images/chinese2.jpg';
import chinese1menu from '../assets/images/chinese1menu.jpg';
import Payment from './Payment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ChineseList = () => {
  const chineseRestaurants = [
    {
      name: 'Dragon House',
      location: 'Beijing, China',
      description: 'Traditional Chinese dishes served with elegance.',
      rating: 4.9,
      image: chineseImage1,
      menuImage: chinese1menu,
    },
    {
      name: 'Wok & Roll',
      location: 'Shanghai, China',
      description: 'Modern Chinese cuisine in a stylish setting.',
      rating: 4.6,
      image: chineseImage2,
      menuImage: chinese1menu,
    },
  ];

  const [showMenuModal, setShowMenuModal] = useState(false);
  const [selectedMenuImage, setSelectedMenuImage] = useState('');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [showPayment, setShowPayment] = useState(false); // New state variable to track whether to show the payment component
  const [quantity, setQuantity] = useState({});

  const dishes = [
    { name: 'Kung Pao Chicken', price: 15 },
    { name: 'Spring Rolls', price: 5 },
    { name: 'Fried Rice', price: 12 },
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
      {chineseRestaurants.map((chinese, index) => (
        <Card className="my-3 p-3 horizontal-card" key={index}>
          <Row className="align-items-center">
            <Col md={3}>
              <Card.Img
                src={chinese.image}
                alt={chinese.name}
                className="chinese-image"
              />
            </Col>
            <Col md={9}>
              <Card.Body>
                <Card.Title>{chinese.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {chinese.location}
                </Card.Subtitle>
                <Card.Text>{chinese.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <Badge pill variant="success">
                    Rating: {chinese.rating} ⭐
                  </Badge>
                  <div>
                    <Button variant="primary" className="mx-2" onClick={() => handleViewMenu(chinese.menuImage)}>
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

export default ChineseList