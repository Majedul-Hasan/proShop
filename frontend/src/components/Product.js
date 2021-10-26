import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Ratings from "./Ratings";

const Product = ({ product }) => {
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  product.rating = addDecimals(Number(product.rating).toFixed(2));

  return (
    <Card className=' m-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img variant='top' src={product.image} />
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as='div' variant='top'>
              <strong>{product.name} </strong>
            </Card.Title>
          </Link>
          <Card.Text as='div'>
            <Ratings
              ratingValue={product.rating}
              // text={`from ${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as='h3'>
            <div className='my-3'>${product.price}</div>
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default Product;
