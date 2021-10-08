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
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./user/userReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
} from "./order/orderReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,

  cart: cartReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
});

export default rootReducer;
