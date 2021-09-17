import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";

//redux
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../redux/actions/productsActions";

import Ratings from "../components/Ratings";
import Loader from "../components/Loader";
import ErrorAlerat from "../components/ErrorAlerat";

// import axios from "axios";
// import products from "../products";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);

  const { product, error, loading } = productDetail;

  // const { image, name, rating, numReviews } = product;

  // const [product, setProduct] = useState({});
  // const product = product.find((p) => p._id === match.params.id);
  useEffect(() => {
    /*
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
    dispatch(listProductDetails(match.params.id));
  }, [match, dispatch]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  // const product = {};

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorAlerat variant='danger'>{error}</ErrorAlerat>
      ) : (
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
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
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

                {product.countInStock >= 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option value={x + 1} key={product._id + x}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
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
      )}
    </>
  );
};

export default ProductScreen;
