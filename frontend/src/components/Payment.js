import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Payment = ({ dishes, total, onSuccess }) => {
  const handlePayment = () => {
    // simulate payment processing
    setTimeout(() => {
      onSuccess({ dishes, total, paymentMethod: 'Credit Card' });
    }, 2000);
  };

  return (
    <Card>
      <Card.Body>
        <h5>Payment</h5>
        <p>Total: ${total}</p>
        <Button variant="primary" onClick={handlePayment}>
          Pay with Credit Card
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Payment;