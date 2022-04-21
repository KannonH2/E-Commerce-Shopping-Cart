import React, { Component } from "react";
import { connect } from "react-redux";
import { filterProducts, sortProducts } from "../actions/productActions";
import "../styles/Filter.css";

class Filter extends Component {
  render() {
    return !this.props.filteredProducts ? (
      <div>Loading...</div>
    ) : (
      <div className="filter">
        <div className="filter-result">
          {this.props.filteredProducts.length} Productos
        </div>
        <div className="filter-sort">
          Ordenar por{" "}
          <select
            className="filter-sort-select"
            value={this.props.sort}
            onChange={(e) =>
              this.props.sortProducts(
                this.props.filteredProducts,
                e.target.value
              )
            }
          >
            <option className="sort-option" value="latest">Ultimo</option>
            <option className="sort-option" value="lowest">Menor Precio</option>
            <option className="sort-option" value="highest">Mayor Precio</option>
          </select>
        </div>
        <div className="filter-size">
          Filtrar por{" "}
          <select
          className="filter-size-select"
            value={this.props.size}
            onChange={(e) =>
              this.props.filterProducts(this.props.products, e.target.value)
            }
          >
            <option value="">Todo</option>
            <option value="Burger">Burgers</option>
            <option value="Pizza">Pizzas</option>
            <option value="Sandwich">Sandwiches</option>
            <option value="Mila">Milanesas</option>
            <option value="drink">Bebidas</option>
          </select>
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  {
    filterProducts,
    sortProducts,
  }
)(Filter);
