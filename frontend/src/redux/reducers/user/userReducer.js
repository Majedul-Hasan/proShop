import userActionType from "./userActionType";

export const userLoginReducer = (state = [], action) => {
  switch (action.type) {
    case userActionType.USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case userActionType.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case userActionType.USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case userActionType.USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = [], action) => {
  switch (action.type) {
    case userActionType.USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case userActionType.USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case userActionType.USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
