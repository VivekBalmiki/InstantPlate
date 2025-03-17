import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddRestaurant({ show, handleClose }) {
  const [restaurantName, setRestaurantName] = useState('');
  const [location, setLocation] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage(false); // Reset success message
    const restaurantData = {
      name: restaurantName,
      category: cuisineType,
      location: location,
    };
    try {
      await axios.post('http://localhost:5000/api/addRestaurant', restaurantData)
      setSuccessMessage(true); // Update success message
      handleClose();
      toast.success('Restaurant added successfully!');
    } catch (error) {
      console.error(error);
      setErrorMessage('Adding Restaurant Failed');
      toast.error('Error adding restaurant!');
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Restaurant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formRestaurantName">
            <Form.Label>Restaurant Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter restaurant name" 
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter location" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCuisineType">
          <Form.Label>Cuisine Type</Form.Label>
            <Form.Control 
            as="select" 
            value={cuisineType} 
            onChange={(e) => setCuisineType(e.target.value)}
            required
            >
            <option value="">Select cuisine type</option>
            <option value="hotel">Hotel</option>
            <option value="dhaba">Dhaba</option>
            <option value="chinese">Chinese</option>
            <option value="cafe">Cafe</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Restaurant
          </Button>
          {successMessage && (
            <div className="alert alert-success mt-3">
              Thank you for adding your restaurant! Our team will connect with you soon.
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger mt-3">
              {errorMessage}
            </div>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
}