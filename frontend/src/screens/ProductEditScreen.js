import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/ErrorAlerat";
// import FormContainer from "../components/FormContainer";

import axios from "axios";
import {
  listProductDetails,
  updateProduct,
} from "../redux/actions/productsActions";
import productActionType from "../redux/reducers/product/productActionType";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  // use useState hook
  const [name, setName] = useState("");

  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: productActionType.PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setImage(product.image);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, productId, history, successUpdate]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        brand,
        category,
        countInStock,
        image,
        description,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    try {
      const config = {
        "Content-Type": "multipart/form-data",
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go back
      </Link>
      <Container>
        <Row className='justify-contant-md-center'>
          <Col xs={12} md={6}>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    value={name}
                    placeholder='enter product name'
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='price'>
                  <Form.Label>price</Form.Label>
                  <Form.Control
                    type='number'
                    value={price}
                    placeholder='enter product price'
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='Image'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type='text'
                    value={image}
                    placeholder='enter Image url'
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <Form.File
                    id='image-file'
                    label='choose-File'
                    custom
                    onChange={uploadFileHandler}></Form.File>

                  {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId='Brand'>
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type='text'
                    value={brand}
                    placeholder='enter Brand name'
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId='countInStock'>
                  <Form.Label>CountInStock</Form.Label>
                  <Form.Control
                    type='number'
                    value={countInStock}
                    placeholder='enter product InStock'
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type='text'
                    value={category}
                    placeholder='enter category name'
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type='text'
                    value={description}
                    placeholder='enter description name'
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                <Button variant='primary' type='submit' onClick={submitHandler}>
                  update
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductEditScreen;
