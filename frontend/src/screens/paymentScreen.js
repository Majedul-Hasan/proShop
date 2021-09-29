import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { savePaymentMethod } from "../redux/actions/cartAction";

import CheckOutSteps from "../components/CheckOutSteps";

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("payPal");

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <Container>
      <CheckOutSteps stap1 stap2 stap3 />
      <Row className='justify-contant-md-center'>
        <Col xs={12} md={6}>
          <h2>payment Method</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='paymentmethod'>
              <Form.Label as='legend'>Select method</Form.Label>

              <Col>
                <Form.Check
                  type='radio'
                  label='payPal or Credit Card'
                  id='payPal'
                  name='paymentMethod'
                  value='PayPal'
                  checked
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }></Form.Check>

                {/* <Form.Check
                  type='radio'
                  label='payPal or Credit Card'
                  id='Stripe'
                  name='paymentMethod'
                  value='Stripe'
                  onChange={(e) =>
                  //   setPaymentMethod(e.target.value)
                  }></Form.Check> */}
              </Col>
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

export default PaymentScreen;
