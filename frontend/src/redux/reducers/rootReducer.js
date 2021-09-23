import { combineReducers } from "redux";

import {
  productListReducer,
  productDetailReducer,
} from "./product/productReducer";
import { cartReducer } from "./cart/cartReducer";

import { userLoginReducer, userRegisterReducer } from "./user/userReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

export default rootReducer;
