import { CREATE_ORDER, CLEAR_CART, CLEAR_ORDER, GET_ORDERS } from "../types";

export const createOrder = (order) => (dispatch) => {
  fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: CREATE_ORDER, payload: data });
      localStorage.clear("cartItems");
      dispatch({ type: CLEAR_CART });
    });
};
export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};

export const fetchOrders = () => async (dispatch) => {
  const res = await fetch("/api/orders");
  const data = await res.json();
  console.log(data);
  dispatch({ 
    type: GET_ORDERS,
    payload: data
   });
};
