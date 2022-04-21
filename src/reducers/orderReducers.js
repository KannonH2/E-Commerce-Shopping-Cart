import { CREATE_ORDER, CLEAR_ORDER, GET_ORDERS } from "../types";

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return { order: action.payload };
    case CLEAR_ORDER:
      return { order: null };
    case GET_ORDERS:
      return { 
        orders: action.payload,
      };
    default:
      return state;
  }
};
export { orderReducer };