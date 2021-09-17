import axios from "axios";

import productActionType from "../reducers/product/productActionType";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: productActionType.PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/products");

    dispatch({
      type: productActionType.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: productActionType.PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.massage
          ? error.response.data.massage
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: productActionType.PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: productActionType.PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: productActionType.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.massage
          ? error.response.data.massage
          : error.message,
    });
  }
};
