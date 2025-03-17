import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const Receipt = ({ receiptData }) => {
  return (
    <Card>
      <Card.Body>
        <h5>Receipt</h5>
        <ListGroup>
          {receiptData.dishes.map((dish, index) => (
            <ListGroup.Item key={index}>
              <span>{dish.name}</span>
              <span style={{ float: 'right' }}>${dish.price}</span>
            </ListGroup.Item>
          ))}
          <ListGroup.Item>
            <span>Total:</span>
            <span style={{ float: 'right' }}>${receiptData.total}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span>Payment Method:</span>
            <span style={{ float: 'right' }}>{receiptData.paymentMethod}</span>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Receipt;