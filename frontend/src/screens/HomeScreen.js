import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productsActions";

import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import ErrorAlerat from "../components/ErrorAlerat";
import Loader from "../components/Loader";

import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

import Meta from "../components/Meta";

/*
//frontend product 
import products from "../products";
//add product global
*/
// const baseURL = "http://localhost:5000";

const HomeScreen = ({ match }) => {
  // const [products, setProducts] = useState([]);

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const prodList = useSelector((state) => state.productList);

  const { loading, error, products, pages, page } = prodList;
  const width = window.innerWidth >= 768;

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

    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber, width]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <>{width && <ProductCarousel />}</>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorAlerat variant='danger'>{error}</ErrorAlerat>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
              //  <h3>{product.name}</h3>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
