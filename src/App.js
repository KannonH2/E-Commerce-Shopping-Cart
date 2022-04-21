import React from "react";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import store from "./store";
import { Provider } from "react-redux";
import Products from "./components/Products";
import Navbar from "./components/Navbar";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navbar />
        <div className="grid-container">
          <main>
            <div className="content">
              <div className="main">
                <Filter></Filter>
                <Products />
              </div>
              <div className="sidebar">
                <Cart />
              </div>
            </div>
          </main>
          <footer className="footer">
            <div className="footerText">
              <a className="title" href="/">
                Don Juan - La mejor tienda de productos de la región
              </a>
            </div>
            <div className="footerMedia">
              {/* <a href="https://www.facebook.com/" className="icons">
                <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="facebook" />
              </a> */}
              <a href="https://www.instagram.com/donjuanpizzeria" className="icons">
                <img src="https://img.icons8.com/color/48/000000/instagram-new.png" alt="Instagram" />
              </a>
            </div>
          </footer>
        </div>
      </Provider>
    );
  }
}

export default App;
