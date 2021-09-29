import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { saveShippingAddress } from "../redux/actions/cartAction";

import CheckOutSteps from "../components/CheckOutSteps";

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };
  return (
    <Container>
      <CheckOutSteps stap1 stap2 />
      <Row className='justify-contant-md-center'>
        <Col xs={12} md={6}>
          <h2>Shipping</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Your address'
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='City name'
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='postalCode'>
              <Form.Label>PostalCode</Form.Label>
              <Form.Control
                type='text'
                placeholder='postalCode name'
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='country'>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type='text'
                placeholder='country name'
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit' onClick={submitHandler}>
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingScreen;
