import React, { useState, useEffect } from "react";
import axios from "axios";

import { Row } from "react-bootstrap";
import Product from "../components/Product";

/*
//frontend product 
import products from "../products";
//add product global
*/
// const baseURL = "http://localhost:5000";
const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // console.log(`${baseURL}/api/products`);

    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
    /*
    axios.get(`${baseURL}/api/products`).then((response) => {
      setProducts(response.data);
    });
    */
  }, []);

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
