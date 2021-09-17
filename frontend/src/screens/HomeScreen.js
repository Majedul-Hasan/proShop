import React, { useEffect } from "react";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productsActions";

import { Row } from "react-bootstrap";
import Product from "../components/Product";
import ErrorAlerat from "../components/ErrorAlerat";
import Loader from "../components/Loader";

/*
//frontend product 
import products from "../products";
//add product global
*/
// const baseURL = "http://localhost:5000";
const HomeScreen = () => {
  // const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const prodList = useSelector((state) => state.productList);

  const { loading, error, products } = prodList;

  useEffect(() => {
    /*
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
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorAlerat variant='danger'>{error}</ErrorAlerat>
      ) : (
        <Row sm={1} md={2} lg={3} xl={4}>
          {products.map((product) => (
            //  <h3>{product.name}</h3>
            <Product product={product} />
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
