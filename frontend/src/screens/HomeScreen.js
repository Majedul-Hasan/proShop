import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

import products from "../products";

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row sm={12} md={6} lg={4} xl={3}>
        {products.map((product) => (
          //  <h3>{product.name}</h3>
          <Product product={product} />
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
