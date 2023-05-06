import "./App.css";
import React, { useState, useEffect } from "react";
import logo from "./images/image.png";
import kerwnShaw from "./images/Kerwn_Shaw.JPG";
import samFrost from "./images/Sam_Frost.JPG";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Container, Nav, Table, Form, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

export function App() {
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);
  const [viewer2, setViewer2] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [viewer3, setViewer3] = useState(false);
  const [viewer4, setViewer4] = useState(false);
  const [viewer5, setViewer5] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCVV] = useState("");
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [addressValid, setAddressValid] = useState(false);
  const [cityValid, setCityValid] = useState(false);
  const [stateValid, setStateValid] = useState(false);
  const [zipValid, setZipValid] = useState(false);
  const [cardNumberValid, setCardNumberValid] = useState(false);
  const [expirationValid, setExpirationValid] = useState(false);
  const [cvvValid, setCVVValid] = useState(false);
  const [nameClassName, setNameClassName] = useState("");
  const [emailClassName, setEmailClassName] = useState("");
  const [addressClassName, setAddressClassName] = useState("");
  const [cityClassName, setCityClassName] = useState("");
  const [stateClassName, setStateClassName] = useState("");
  const [zipClassName, setZipClassName] = useState("");
  const [cardNumberClassName, setCardNumberClassName] = useState("");
  const [expirationClassName, setExpirationClassName] = useState("");
  const [cvvClassName, setCVVClassName] = useState("");
  const [homeViewer, setHomeViewer] = useState(false);
  const [aboutViewer, setAboutViewer] = useState(false);

  useEffect(() => {
    goHome();
  }, []);
  function getAllProducts() {
    fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
    setViewer1(true);
    setViewer2(false);
    setViewer3(false);
    setViewer4(false);
    setViewer5(false);
    setHomeViewer(false);
    setAboutViewer(false);
  }

  const showAllItems = product.map((el) => (
    <div key={el._id} className="col-md-4 mb-5">
      <div className="card h-100">
        <img className="card-img-top" src={el.src} alt="" />
        <div className="card-body">
          <h5 className="card-title">{el.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{el.artist}</h6>
          <p className="card-text">{el.description}</p>
          <p className="card-text">{`Price: $${el.price}`}</p>
        </div>
        <small className="text-muted">
          {[...Array(Math.round(el.rating.rate))].map((star, index) => {
            return <FaStar key={index} />;
          })}
          ({el.rating.rate})
        </small>
        <span className="text-muted ml-2">{`(${el.rating.count} ratings)`}</span>
        <button className="btn btn-warning" onClick={() => addToCart(el)}>
          Add to Cart
        </button>
      </div>
    </div>
  ));

  function searchProducts(event) {
    event.preventDefault();
    const searchTerm = document.getElementById("searchInput").value;
    fetch("http://localhost:4000/search/" + searchTerm)
      .then((response) => response.json())
      .then((products) => {
        setProduct(products);
        setViewer1(false);
        setViewer2(true);
        setViewer3(false);
        setViewer4(false);
        setViewer5(false);
        setHomeViewer(false);
        setAboutViewer(false);
      })
      .catch((error) => {
        console.error("Error searching for products:", error);
      });
  }

  function addToCart(item) {
    fetch("http://localhost:4000/addToCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...item,
        catalog: "cart_items", // add catalog field
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Item added to cart!");
          setCartItems([...cartItems, item]);
        } else {
          console.error("Failed to add item to cart:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
      });
  }

  function viewCart() {
    fetch("http://localhost:4000/cart")
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data);
        setViewer1(false);
        setViewer2(false);
        setViewer3(true);
        setViewer4(false);
        setViewer5(false);
        setHomeViewer(false);
        setAboutViewer(false);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }

  const seeCartItems = cartItems.map((item) => (
    <tr key={item._id} id={`cart-item-${item._id}`}>
      <td>{item.title}</td>
      <td>${item.price}</td>
      <td>
        {" "}
        <div className="quantity-field">
          <button
            className="quantity-btn minus"
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
          >
            -
          </button>
          <span className="quantity-value">{item.quantity}</span>
          <button
            className="quantity-btn plus"
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </td>
      <td>
        <button
          className="btn btn-warning"
          onClick={() => deleteOneProduct(item._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/deleteItem", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deleteid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete a product completed : ", deleteid);
        console.log(data);

        // Remove the corresponding HTML element from the DOM
        const itemToDelete = document.getElementById(`cart-item-${deleteid}`);
        if (itemToDelete) {
          itemToDelete.remove();
        }
      })
      .catch((error) => console.log(error));
  }

  function updateQuantity(itemId, newQuantity) {
    fetch(`http://localhost:4000/${itemId}/update-quantity`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: newQuantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Find the item in the cartItems array and update its quantity
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) => {
            if (item._id === itemId) {
              return { ...item, quantity: newQuantity };
            }
            return item;
          })
        );
      })
      .catch((error) => console.log(error));
  }

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.07;

  const total = tax + subtotal;

  function handleCheckout() {
    setViewer3(false);
    setViewer4(true);
  }

  const handleSubmitCheckout = (event) => {
    event.preventDefault();

    const name = event.target.elements.name.value;
    if (name.trim() === "") {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
    const email = event.target.elements.email.value;
    if (/^\S+@\S+\.\S+$/.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    const address = event.target.elements.address.value;
    if (address.trim() === "") {
      setAddressValid(false);
    } else {
      setAddressValid(true);
    }
    const city = event.target.elements.city.value;
    if (city.trim() === "") {
      setCityValid(false);
    } else {
      setCityValid(true);
    }
    const state = event.target.elements.state.value;
    if (state.trim() === "") {
      setStateValid(false);
    } else {
      setStateValid(true);
    }
    const zip = event.target.elements.zip.value;
    if (/^\d{5}$/.test(zip)) {
      setZipValid(true);
    } else {
      setZipValid(false);
    }
    const cardNumber = event.target.elements.cardNumber.value;
    if (cardNumber.trim() !== "") {
      setCardNumberValid(true);
    } else {
      setCardNumberValid(false);
    }
    const expiration = event.target.elements.expiration.value;
    if (expiration.trim() !== "") {
      setExpirationValid(true);
    } else {
      setExpirationValid(false);
    }

    const cvv = event.target.elements.cvv.value;
    if (cvv.trim() !== "") {
      setCVVValid(true);
    } else {
      setCVVValid(false);
    }
    if (
      nameValid &&
      emailValid &&
      addressValid &&
      cityValid &&
      stateValid &&
      zipValid &&
      cardNumberValid &&
      expirationValid &&
      cvvValid
    ) {
      setViewer5(true);
      setViewer4(false);
    } else {
      setNameClassName(nameValid ? "" : "border-danger");
      setEmailClassName(emailValid ? "" : "border-danger");
      setAddressClassName(addressValid ? "" : "border-danger");
      setCityClassName(cityValid ? "" : "border-danger");
      setStateClassName(stateValid ? "" : "border-danger");
      setZipClassName(zipValid ? "" : "border-danger");
      setCardNumberClassName(cardNumberValid ? "" : "border-danger");
      setExpirationClassName(expirationValid ? "" : "border-danger");
      setCVVClassName(cvvValid ? "" : "border-danger");
    }
  };

  function goHome() {
    setViewer1(false);
    setViewer2(false);
    setViewer3(false);
    setViewer4(false);
    setViewer5(false);
    setHomeViewer(true);
    setAboutViewer(false);
  }

  function goAbout() {
    setViewer1(false);
    setViewer2(false);
    setViewer3(false);
    setViewer4(false);
    setViewer5(false);
    setHomeViewer(false);
    setAboutViewer(true);
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={logo}
              alt="Sam & Kerwn's Online Music Store"
              width="125"
              height="100"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" onClick={() => goHome()}>
                Home
              </Nav.Link>
              <Nav.Link href="#catalog" onClick={() => getAllProducts()}>
                Catalog
              </Nav.Link>
              <Nav.Link href="#about" onClick={() => goAbout()}>
                About
              </Nav.Link>
            </Nav>
            <form className="d-flex" onChange={(e) => searchProducts(e)}>
              <input
                type="search"
                className="form-control me-2"
                placeholder="Search"
                aria-label="Search"
                id="searchInput"
              />
            </form>
            <Nav>
              <Nav.Link href="#cart" onClick={() => viewCart()}>
                View Cart
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container">
        {viewer1 &&
          !viewer2 &&
          !viewer3 &&
          !viewer4 &&
          !viewer5 &&
          !homeViewer &&
          !aboutViewer && (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {showAllItems}
            </div>
          )}
        {!viewer1 &&
          viewer2 &&
          !viewer3 &&
          !viewer4 &&
          !viewer5 &&
          !homeViewer &&
          !aboutViewer && (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {showAllItems}
            </div>
          )}
        {!viewer1 &&
          !viewer2 &&
          viewer3 &&
          !viewer4 &&
          !viewer5 &&
          !homeViewer &&
          !aboutViewer && (
            <>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>{seeCartItems}</tbody>
              </Table>
              <section>
                <h2>Order Summary</h2>
                <table>
                  <tr>
                    <th>Subtotal:</th>
                    <td>${subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <th>Tax:</th>
                    <td>${tax.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <th>Total:</th>
                    <td>${total.toFixed(2)}</td>
                  </tr>
                </table>
              </section>
              <button
                className="btn btn-warning"
                onClick={() => handleCheckout()}
              >
                Check Out
              </button>
            </>
          )}
        {!viewer1 &&
          !viewer2 &&
          !viewer3 &&
          viewer4 &&
          !viewer5 &&
          !homeViewer &&
          !aboutViewer && (
            <Container>
              <Form onSubmit={handleSubmitCheckout}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    className={nameClassName}
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    className={emailClassName}
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    className={addressClassName}
                    type="text"
                    placeholder="Enter your address"
                    name="address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    className={cityClassName}
                    type="text"
                    placeholder="Enter your city"
                    name="city"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    className={stateClassName}
                    type="text"
                    placeholder="Enter your state"
                    name="state"
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formZip">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    className={zipClassName}
                    type="text"
                    placeholder="Enter your zip code"
                    name="zip"
                    value={zip}
                    onChange={(event) => setZip(event.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formCardNunber">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    className={cardNumberClassName}
                    type="text"
                    placeholder="XXXX XXXX XXXX XXXX"
                    name="cardNumber"
                    value={cardNumber}
                    onChange={(event) => setCardNumber(event.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formExpiration">
                  <Form.Label>Expiration</Form.Label>
                  <Form.Control
                    className={expirationClassName}
                    type="text"
                    placeholder="MM/YYYY"
                    name="expiration"
                    value={expiration}
                    onChange={(event) => setExpiration(event.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formCVV">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    className={cvvClassName}
                    type="text"
                    placeholder="XXX"
                    name="cvv"
                    value={cvv}
                    onChange={(event) => setCVV(event.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Container>
          )}
        {!viewer1 &&
          !viewer2 &&
          !viewer3 &&
          !viewer4 &&
          viewer5 &&
          !homeViewer &&
          !aboutViewer && (
            <div>
              <h4 className="fw-bold">Thank you for your order, {name}!</h4>
              <h5 className="text-muted">
                Keep an eye out for your reciept and tracking information sent
                to {email}.
              </h5>
              <button
                className="btn btn-warning"
                onClick={() => getAllProducts()}
              >
                Return to Catalog
              </button>
            </div>
          )}
        {!viewer1 &&
          !viewer2 &&
          !viewer3 &&
          !viewer4 &&
          !viewer5 &&
          homeViewer &&
          !aboutViewer && (
            <div style={{ background: "black" }}>
              <h1 style={{ color: "white", textAlign: "center" }}>
                Welcome to
              </h1>
              <img
                src={logo}
                alt="Sam & Kerwn's Online Music Store"
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "50%",
                }}
              />
            </div>
          )}
        {!viewer1 &&
          !viewer2 &&
          !viewer3 &&
          !viewer4 &&
          !viewer5 &&
          !homeViewer &&
          aboutViewer && (
            <>
              {" "}
              <div>
                <h1>About Website Creators, Founders, & Salesmen</h1>
                <h2>SE/ComS319 Construction of User Interfaces, Spring 2023</h2>
                <h3>3/13/2023</h3>
              </div>
              <div style={{ marginTop: "5%" }}>
                <img
                  src={samFrost}
                  alt="Sam Frost"
                  style={{
                    height: "250px",
                    width: "200px",
                    marginRight: "1%",
                    marginTop: "1%",
                    float: "left",
                  }}
                />
                <h3>Sam Frost</h3>
                <p style={{ textAlign: "left", maxWidth: "50%" }}>
                  Greetings all, I'm Sam Frost. I'm in my junior year at Iowa
                  State, and am completing this assignment for SE 319. I'm a
                  huge fan of music, and I'm very happy that I'm able to combine
                  two of my interests in this website. Happy listening! <br />
                  <strong>My Contact Info:</strong>
                  <br />
                  <a href="mailto:frost2@iastate.edu">
                    frost2@iastate.edu
                  </a>{" "}
                  <br />
                  <a href="tel:+15154210293">(515) 421-0293</a>
                </p>
                <img
                  src={kerwnShaw}
                  alt="Kerwn Shaw"
                  style={{
                    height: "250px",
                    width: "200px",
                    marginLeft: "1%",
                    float: "right",
                  }}
                />
                <h3 style={{ textAlign: "right" }}>Kerwn Shaw</h3>
                <p
                  style={{
                    textAlign: "right",
                    maxWidth: "50%",
                    float: "right",
                  }}
                >
                  Hello, my name is Kerwn Shaw! I am creating this project as a
                  junior at Iowa State University for the Computer
                  Science/Software Engineering 319 Class. I have always been
                  passionate about music records and am finally glad to start
                  pursuing selling these! <br />
                  <strong>My Contact Info:</strong>
                  <br />
                  <a href="mailto:kcshaw@iastate.edu">
                    kcshaw@iastate.edu
                  </a>{" "}
                  <br />
                  <a href="tel:+16413444325">(641) 344-4325</a>
                </p>
              </div>
            </>
          )}
      </div>
    </div>
  );
}
