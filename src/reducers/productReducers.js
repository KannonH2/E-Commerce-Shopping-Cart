import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
  FILTER_PRODUCTS_BY_TYPE,
} from "../types";

export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case FILTER_PRODUCTS_BY_SIZE:
      return {
        ...state,
        size: action.payload.size,
        filteredItems: action.payload.items,
      };
      case FILTER_PRODUCTS_BY_TYPE:
      return {
        ...state,
        name: action.payload.name,
        filteredItems: action.payload.items,
      };
    case ORDER_PRODUCTS_BY_PRICE:
      return {
        ...state,
        sort: action.payload.sort,
        filteredItems: action.payload.items,
      };
    case FETCH_PRODUCTS:
      return { items: action.payload, filteredItems: action.payload };
    default:
      return state;
  }
};
