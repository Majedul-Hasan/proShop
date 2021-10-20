import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKyeword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form className='d-flex' onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKyeword(e.target.value)}
        placeholder='Search Product ...'
        className='mr-nm-2 ml-sm-5'></Form.Control>
      <Button type='submit' variant='outline-success'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
