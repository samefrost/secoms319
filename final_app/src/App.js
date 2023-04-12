import './App.css';
import React, {useState} from "react";
import {Records} from "./catalog";
import { Genres } from './Genres';
import logo from "./images/image.png"
import "bootstrap/dist/css/bootstrap.css";

export function App(){
  const [RecordsGenre, setRecordsGenre] = useState(Records);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSubmission, setShowSubmission] = useState(false);


  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    const results = Records.filter((item) =>
      item.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecordsGenre(results);
  };

  const handleViewCartClick = () => {
    setShowSubmission(false);
    setShowCheckout(false);
    setShowCart(true);
  };

  const handleBackToCatalogClick = () => {
    setShowSubmission(false);
    setShowCheckout(false);
    setShowCart(false);
  };

  const handleCheckoutClick = () => {
    setShowSubmission(false);
    setShowCart(false);
    setShowCheckout(true);
  }

  const handleSubmitClick = () => {
    setShowSubmission(true);
    setShowCart(false);
    setShowCheckout(false);
  }

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    console.log(`Added ${product.title} to cart!`);
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = newQuantity;
    setCartItems(updatedCartItems);
  };

  const removeItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].price * cartItems[i].quantity;
    }
    return total;
  };
  

  return( 
    <div className="flex fixed flex-row">
      <div>
        <header className="p-3 text-bg-dark">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a className="navbar-brand" href="home.html">
                <img
                  src={logo}
                  alt="Sam & Kerwn's Online Music Store"
                  width="125"
                  height="100"
                />
              </a>
              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li>
                  <a href="home.html" className="nav-link px-2 text-secondary">
                    Home
                  </a>
                </li>
                <li>
                  <a href="catalog.js" className="nav-link px-2 text-white">
                    Catalog
                  </a>
                </li>
                <li>
                  <a href="about.html" className="nav-link px-2 text-white">
                    About
                  </a>
                </li>
              </ul>
              <form
                className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
                role="search"
              >
                <input
                  type="search"
                  className="form-control form-control-dark text-bg-dark"
                  placeholder="Search..."
                  aria-label="Search"
                  onChange={handleInputChange}
                  value={searchTerm}
                />
              </form>

              <div className="text-end">
                {showCart ? (
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={handleBackToCatalogClick}
                  >
                    Back to Catalog
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={handleViewCartClick}
                  >
                    View Cart ({cartItems.length})
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>
      <div className="ml-5 p-10 xl:basis-4/5">
        {showCart && !showCheckout && !showSubmission && (
          <div className="container">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 mt-5 mb-3">
            Cart
          </h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              <ul className="list-group">
                {cartItems.map((item, index) => (
                <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img
                      alt={item.title}
                      src={item.image}
                      className="me-3"
                      style={{ maxWidth: "100px" }}
                    />
                    <div>
                      <h5>{item.title}</h5>
                      <p>${item.price}</p>
                        <div className="d-flex align-items-center">
                          <label htmlFor={`quantity_${index}`} className="me-2">
                            Quantity:
                          </label>
                          <input
                            type="number"
                            id={`quantity_${index}`}
                            min="1"
                            defaultValue={item.quantity}
                            onChange={(e) =>
                              updateQuantity(index, parseInt(e.target.value))
                            }
                            className="form-control w-25"
                          />
                        </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="fw-bold me-3">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
                ))}
              </ul>
              <div className="mt-3 d-flex justify-content-end">
                <h5 className="me-3">Total:</h5>
                <h5>${calculateTotal().toFixed(2)}</h5>
              </div>
            </div>
          )}
          <div className="d-flex justify-content-end mt-3">
            <h3 className="text-end">Total: ${calculateTotal().toFixed(2)}</h3>
            <button
              className="btn btn-primary me-3"
              onClick={handleCheckoutClick}
            >
              Checkout
            </button>
          </div>
        </div>
        
        )}
        {showCheckout && !showCart && !showSubmission &&(  <div>
    <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 mt-5 mb-3">
      Checkout
    </h2>
    <form>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <textarea
          className="form-control"
          id="address"
          rows="3"
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="cardNumber" className="form-label">
          Credit Card Number
        </label>
        <input
          type="text"
          className="form-control"
          id="cardNumber"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="expiration" className="form-label">
          Expiration Date
        </label>
        <input
          type="text"
          className="form-control"
          id="expiration"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cvv" className="form-label">
          CVV
        </label>
        <input
          type="text"
          className="form-control"
          id="cvv"
          required
        />
      </div>
      <div className="d-grid gap-2">
        <button
          type="submit"
          className="btn btn-primary"
          onClick ={() => handleSubmitClick()}
        >
          Submit Order
        </button>
      </div>
    </form>
  </div>)}
      {!showCart && !showCheckout && !showSubmission &&(
          <div className="container">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 mt-5 mb-3">
              Products ({RecordsGenre.length})
            </h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {/* Loop Products */}
              {RecordsGenre.map((product, index) => (
                <div key={index} className="col">
                  <div className="card shadow-lg h-100">
                    <div className="card-img-top bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden">
                      <img
                        alt="Product"
                        src={product.image}
                        className="w-100 h-100 object-center object-cover"
                      />
                    </div>
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h3 className="card-title">
                          <a href={product.href}>{product.title}</a>
                        </h3>
                        <p className="card-text">{product.genre}</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="card-text fw-bold">${product.price}</p>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
      {!showCart && !showCheckout && showSubmission &&(
        <div>
          <h1>Order Confirmation</h1>
          <p>Thank you for your order! Your order has been submitted and is being processed.</p>
        </div>
      )}
      </div>
    </div>
  );
}