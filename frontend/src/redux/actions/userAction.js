import userActionType from "../reducers/user/userActionType";
import orderActionType from "../reducers/order/orderActionType";

import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: userActionType.USER_LOGIN_REQUEST });

    const config = {
      Headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({ type: userActionType.USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userActionType.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: userActionType.USER_LOGOUT });
  dispatch({ type: userActionType.USER_DETAILS_REQUEST });
  dispatch({ type: orderActionType.ORDER_LIST_MY_RESET });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: userActionType.USER_REGISTER_REQUEST });

    const config = {
      Headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    dispatch({
      type: userActionType.USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: userActionType.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userActionType.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userActionType.USER_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);
    console.log(data);

    dispatch({
      type: userActionType.USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: userActionType.USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userActionType.USER_UPDATE_PROFILE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);
    console.log(data);

    dispatch({
      type: userActionType.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: userActionType.USER_DETAILS_FAIL,
      payload: message,
    });
  }
};
