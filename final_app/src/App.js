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


  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    const results = Records.filter((item) =>
      item.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecordsGenre(results);
  };

  const handleViewCartClick = () => {
    setShowCart(true);
  };

  const handleBackToCatalogClick = () => {
    setShowCart(false);
  };

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
  
  const handleCheckout = () => {
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const address = document.getElementById('address').value;
      const city = document.getElementById('city').value;
      const state = document.getElementById('state').value;
      const zip = document.getElementById('zip').value;
      const cardName = document.getElementById('card-name').value;
      const cardNumber = document.getElementById('card-number').value;
      const expiration = document.getElementById('expiration').value;
      const cvv = document.getElementById('cvv').value;
    
      // Validate form data
      if (!name || !email || !address || !city || !state || !zip || !cardName || !cardNumber || !expiration || !cvv) {
        // Show alert if any field is empty
        const alertPlaceholder = document.getElementById('alert-placeholder');
        const alert = document.createElement('div');
        alert.classList.add('alert', 'alert-danger', 'fade', 'show');
        alert.setAttribute('role', 'alert');
        alert.innerHTML = 'Please fill out all fields.';
        alertPlaceholder.appendChild(alert);
        setTimeout(() => {
          alert.classList.remove('show');
        }, 3000);
        return;
      }
    
      // Show confirmation screen
      const checkoutScreen = document.getElementById('checkout-screen');
      checkoutScreen.innerHTML = `
        <h3 class="mb-3">Order Summary</h3>
        <ul class="list-group mb-3">
          ${cartItems.map((item) => `
            <li class="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 class="my-0">${item.title}</h6>
                <small class="text-muted">${item.description}</small>
              </div>
              <span class="text-muted">$${item.price.toFixed(2)}</span>
            </li>
          `).join('')}
          <li class="list-group-item d-flex justify-content-between">
            <span>Total (USD)</span>
            <strong>$${calculateTotal().toFixed(2)}</strong>
          </li>
        </ul>
        <h3 class="mb-3">Payment</h3>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="card-name" class="form-label">Name on card</label>
            <input type="text" class="form-control" id="card-name" required>
            <small class="text-muted">Full name as displayed on card</small>
            <div class="invalid-feedback">
              Name on card is required
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="card-number" class="form-label">Credit card number</label>
            <input type="text" class="form-control" id="card-number" required>
            <div class="invalid-feedback">
              Credit card number is required
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 mb-3">
            <label for="expiration" class="form-label">Expiration</label>
            <input type="text" class="form-control" id="expiration" required>
            <div class="invalid-feedback">
              Expiration date is required
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <label for="cvv" class="form-label">CVV</label>
            <input type="text" class="form-control" id="cvv" required>
            <div class="invalid-feedback">
            CVV is required
            </div>
            </div>
            </div>
            <hr class="my-4">
            <button class="w-100 btn btn-primary btn-lg" type="submit">Place Order</button>
            `;
            
    
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
                    View Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>
      <div className="ml-5 p-10 xl:basis-4/5">
        {showCart ? (
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
              <button
                className="btn btn-primary ms-3"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          )}
          <div className="d-flex justify-content-end mt-3">
            <h3 className="text-end">Total: ${calculateTotal().toFixed(2)}</h3>
          </div>
        </div>
        
        ) : (
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
        )}
      </div>
    </div>
  );
}