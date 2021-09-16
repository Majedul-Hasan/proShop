import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Ratings from "../components/Ratings";
import axios from "axios";
// import products from "../products";

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});
  // const product = products.find((p) => p._id === match.params.id);
  useEffect(() => {
    // console.log(`${baseURL}/api/products`);

    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setProduct(data);
    };
    fetchProduct();
    /*
    axios.get(`${baseURL}/api/products`).then((response) => {
      setProducts(response.data);
    });
    */
  }, [match]);

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Ratings
                ratingValue={product.rating}
                text={`${product.numReviews}
                reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>price</Col>
                  <Col>
                    <strong>$ {product.price} </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    {product.countInStock >= 1 ? "in stock" : "out of stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn w-100'
                  type='button'
                  disabled={product.countInStock === 0}>
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
