import React, { useState } from 'react';
import { Card, Row, Col, Container, Badge, Button, Modal, ListGroup } from 'react-bootstrap';
import hotelImage1 from '../assets/images/hotel1.jpg';
import hotelImage2 from '../assets/images/hotel2.jpg';
import hotel1menu from '../assets/images/hotel1menu.jpg';
import Payment from './Payment';
import Receipt from './Receipt';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const HotelList = () => {
  const hotels = [
    {
      name: 'Hotel Paradise',
      location: 'New York, USA',
      description: 'A luxurious hotel with scenic city views.',
      rating: 4.8,
      image: hotelImage1,
      menuImage: hotel1menu,
    },
    {
      name: 'Ocean Breeze Resort',
      location: 'Malibu, California',
      description: 'Relax by the beach with world-class amenities.',
      rating: 4.5,
      image: hotelImage2,
      menuImage: hotel1menu,
    },
  ];

  const dishes = [
    { name: 'Pasta', price: 10 },
    { name: 'Burger', price: 8 },
    { name: 'Pizza', price: 12 },
    { name: 'Salad', price: 7 },
  ];

  const [showMenuModal, setShowMenuModal] = useState(false);
  const [selectedMenuImage, setSelectedMenuImage] = useState('');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [quantity, setQuantity] = useState({});
  const [receiptData, setReceiptData] = useState({});
  const [showReceipt, setShowReceipt] = useState(false);

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

  const handleViewMenu = (menuImage) => {
    setSelectedMenuImage(menuImage);
    setShowMenuModal(true);
  };

  const handleOrder = () => {
    setShowOrderModal(true);
  };

  const handlePaymentSuccess = (receiptData) => {
    toast.success('Payment successful!');
    setShowOrderModal(false);
    setShowPayment(false);
    setSelectedDishes([]);
    setReceiptData(receiptData);
    setShowReceipt(true);
  };

  return (
    <Container style={{ marginTop: '70px' }}>
      {hotels.map((hotel, index) => (
        <Card className="my-3 p-3 horizontal-card" key={index}>
          <Row className="align-items-center">
            <Col md={3}>
              <Card.Img src={hotel.image} alt={hotel.name} className="hotel-image" />
            </Col>
            <Col md={9}>
              <Card.Body>
                <Card.Title>{hotel.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{hotel.location}</Card.Subtitle>
                <Card.Text>{hotel.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <Badge pill variant="success">
                    Rating: {hotel.rating} ⭐
                  </Badge>
                  <div>
                    <Button variant="primary" className="mx-2" onClick={() => handleViewMenu(hotel.menuImage)}>
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
          <Modal.Title>
            Menu
            </Modal.Title>
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

      {/* Receipt Modal */}
      <Modal show={showReceipt} onHide={() => setShowReceipt(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Receipt receiptData={receiptData} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default HotelList;