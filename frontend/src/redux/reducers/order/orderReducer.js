import orderActionType from "./orderActionType";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case orderActionType.ORDER_CREATE_REQUEST:
      return {
        loading: true,
        
      };

    case orderActionType.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case orderActionType.ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
