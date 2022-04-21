import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import "../styles/Products.css";
import "../styles/ModalDetails.css";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }
  componentDidMount() {
    this.props.fetchProducts();
  }
  openModal = (product) => {
    this.setState({ product });
  };
  closeModal = () => {
    this.setState({ product: null });
  };

  
  render() {
    const { product } = this.state;
    console.log(product);
    const handleClick = (e) => {
      e.preventDefault();
      this.closeModal();
      this.props.addToCart(product)
    };
    return (
      <div>
        <Fade bottom cascade>
          {!this.props.products ? (
            <div className="loading-products">Cargando...</div>
          ) : (
            <ul className="products">
              {this.props.products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <a
                      href={"#" + product._id}
                      onClick={() => this.openModal(product)}
                    >
                      <img src={product.image} alt={product.title}></img>
                      <p className="product-title">{product.title}</p>
                    </a>
                    <div className="product-price">
                      {formatCurrency(product.price)}
                    </div>
                    <div className="button-container"> 
                      <button
                        onClick={() => this.props.addToCart(product)}
                        className="button-primary"
                      >
                        Agregar al Carrito
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Fade>

        {product && (
          <Modal
            isOpen={true}
            onRequestClose={this.closeModal}
            ariaHideApp={false}
            className="modal-details"
          >
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="product-details">
                <img src={product.image} alt={product.title}></img>
                <div className="product-details-description">
                  <p className="product-modal-title">
                    <strong>{product.title}</strong>
                  </p>
                  <p className="product-description-modal">{product.description}</p>
                  <p className="product-sizes">
                    <p className="product-size-text">
                    Tamaños disponibles:{" "}
                    </p>
                    {product.availableSizes.map((x) => (
                      <span className="sizes-button-container-modal">
                        {" "}
                        <button className="button-sizes">{x}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price-modal">
                      {formatCurrency(product.price)}
                    </div>
                    <div className="button-addcart-container-modal"> 
                      <button
                        onClick={handleClick}
                        className="button-addcart-modal"
                      >
                        Agregar al Carrito
                      </button>
                    </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
export default connect(
  (state) => ({ products: state.products.filteredItems }),
  {
    fetchProducts,
    addToCart,
  }
)(Products);
