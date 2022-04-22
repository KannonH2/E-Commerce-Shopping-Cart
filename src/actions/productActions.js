import { FETCH_PRODUCTS } from "../types";
import {
  ORDER_PRODUCTS_BY_PRICE,
  FILTER_PRODUCTS_BY_TYPE,
} from "../types";

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("/products");
  const data = await res.json();
  console.log(data);
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

export const filterProducts = (products, name) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_TYPE,
    payload: {
      name: name,
      items:
        name === ""
          ? products
          : products.filter((x) => x.name.indexOf(name) >= 0),
    },
  });
};

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  const sortedProducts = filteredProducts.slice();
  if (sort === "latest") {
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }
  console.log(sortProducts);
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};
