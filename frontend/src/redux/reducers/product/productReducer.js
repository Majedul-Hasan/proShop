import productActionType from "./productActionType";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case productActionType.PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case productActionType.PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case productActionType.PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const productDetailReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case productActionType.PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case productActionType.PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case productActionType.PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
