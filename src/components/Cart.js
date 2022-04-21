import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { removeFromCart } from "../actions/cartActions";
import { createOrder, clearOrder, fetchOrders } from "../actions/orderActions";
import ReactWhatsapp from "react-whatsapp";
import "../styles/Cart.css";
import "../styles/CartModal.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      address: "",
      showCheckout: false,
    };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      phone: this.state.phone,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };
    this.props.createOrder(order);
  };

  closeModal = () => {
    this.props.clearOrder();
  };
  render() {
    const { cartItems, order } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">El Carrito esta Vacio</div>
        ) : (
          <div className="cart cart-header">
            Tienes {cartItems.length} prductos en el carrito{" "}
          </div>
        )}

        {order && (
          <Modal
            isOpen={true}
            onRequestClose={this.closeModal}
            ariaHideApp={false}
          >
            <Zoom>
              <button
                className="close-modal-checkout"
                onClick={this.closeModal}
              >
                x
              </button>
              <div className="order-details">
                <h3 className="success-message">Tu orden fue enviada</h3>
                <h2>Orden {order._id}</h2>
                <ul className="list-ul-customer">
                  <li>
                    <div className="checkout-data">Nombre:</div>
                    <div className="checkout-data-order">{order.name}</div>
                  </li>
                  <li>
                    <div className="checkout-data">Phone:</div>
                    <div className="checkout-data-order">{order.phone}</div>
                  </li>
                  <li>
                    <div className="checkout-data">Dirección:</div>
                    <div className="checkout-data-order">{order.address}</div>
                  </li>
                  <li>
                    <div className="checkout-data">Fecha:</div>
                    <div className="checkout-data-order">{order.createdAt}</div>
                  </li>
                  <li>
                    <div className="checkout-total-price">Total:</div>
                    <div className="checkout-price">${order.total}</div>
                  </li>
                </ul>
                <ul className="list-ul-details">
                  <li>
                    <div className="checkout-product-list">
                      Productos en el Carrito:
                    </div>
                    <div>
                      {order.cartItems.map((x) => (
                        <div className="checkout-product-details">
                          {x.count} {" x "} {x.title}
                          {console.log(x)}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
                <ReactWhatsapp
                  className="button-send"
                  number="5492215927186"
                  message={`Hola, como estan?. Me gustaria hacerte el pedido de estos productos:\n${order.cartItems.map((x) => (x.count + " x " + x.title + "\n"))}\n Nombre: ${order.name}\n Telefono: ${order.phone}\n Direccion: ${order.address}\n Total: ${order.total}`}
                  onClick={this.closeModal}
                >
                  Confirmar Pedido por Whatsapp
                </ReactWhatsapp>
              </div>
            </Zoom>
          </Modal>
        )}
        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title}></img>
                    </div>
                    <div>
                      <div className="item-title">{item.title}</div>
                      <div className="quantity-container">
                        <div className="right">
                          ${item.price} x {item.count}{" "}
                        </div>
                        <div className="button-container-cart">
                          <button
                            className="button-delete"
                            onClick={() => this.props.removeFromCart(item)}
                          >
                            Eliminar todos
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div className="total-price">
                    <p className="total-price-title">Total: $ </p>
                    <p className="total-price-title">
                      {cartItems.reduce((a, c) => a + c.price * c.count, 0)}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      this.setState({ showCheckout: true });
                    }}
                    className="button-checkout"
                  >
                    Hacer Pedido
                  </button>
                </div>
              </div>
              {this.state.showCheckout && (
                <Fade right cascade>
                  <div className="cart">
                    <form onSubmit={this.createOrder}>
                      <ul className="form-container">
                        <li>
                          <label>Telefono</label>
                          <input
                            name="phone"
                            type="number"
                            required
                            onChange={this.handleInput}
                            placeholder="Introduce tu numero de telefono (solo numeros)"
                          ></input>
                        </li>
                        <li>
                          <label>Nombre</label>
                          <input
                            name="name"
                            type="text"
                            required
                            onChange={this.handleInput}
                            placeholder="Introduce tu nombre"
                          ></input>
                        </li>
                        <li>
                          <label>Dirección</label>
                          <input
                            name="address"
                            type="text"
                            required
                            onChange={this.handleInput}
                            placeholder="Introduce tu dirección"
                          ></input>
                        </li>
                        <li>
                          <button className="button-send" type="submit">
                            Chequear Pedido
                          </button>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Fade>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart, createOrder, clearOrder, fetchOrders }
)(Cart);
