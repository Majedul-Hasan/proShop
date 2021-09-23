import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//redux
/*
// this two are use on index.js
import { Provider } from "react-redux";
import store from "./redux/store";
// this two are use on index.js

*/

//components
import { Container } from "react-bootstrap";
import HeaderComponent from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  return (
    // <Provider store={store}>
    <Router>
      <HeaderComponent />
      <main className='py-3'>
        <Container>
          <Route path='/profile' component={ProfileScreen} />

          <Route path='/register' component={RegisterScreen} />

          <Route path='/login' component={LoginScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route exact path='/' component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
    // </Provider>
  );
}

export default App;
