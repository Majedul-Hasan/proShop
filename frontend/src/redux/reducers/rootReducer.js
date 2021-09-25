import { combineReducers } from "redux";

import {
  productListReducer,
  productDetailReducer,
} from "./product/productReducer";
import { cartReducer } from "./cart/cartReducer";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./user/userReducer";
import { orderCreateReducer } from "./order/orderReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
});

export default rootReducer;
