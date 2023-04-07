import './App.css';
import React, {useState} from "react";
import {Records} from "./catalog";
import { Genres } from './Genres';
import logo from "./images/image.png"
import "bootstrap/dist/css/bootstrap.css";

export function App(){
  const [RecordsGenre, setRecordsGenre] = useState(Records);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    const results = Records.filter((item) =>
      item.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecordsGenre(results);
  };
  return( 
    <div className="flex fixed flex-row">
      <div>
        {render_header()}
      </div>
    <div className="ml-5 p-10 xl:basis-4/5">
      {console.log("Before render :",Records.length,RecordsGenre.length)}
      {render_products(RecordsGenre)}
    </div>
  </div>
  )
}

const render_products = (RecordsGenre) => {
  return (
    <div className='container'>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 mt-5 mb-3">Products ({RecordsGenre.length})</h2>
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
                    <a href={product.href}>
                      {product.title}
                    </a>
                  </h3>
                  <p className="card-text">{product.genre}</p>
                </div>
                <p className="card-text text-end fw-bold">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


  const render_header = () => {
    return (
      <header class="p-3 text-bg-dark">
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a class="navbar-brand" href="home.html">
              <img src={logo} alt="Sam & Kerwn's Online Music Store" width="125" height="100"/>
            </a>   
    
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="home.html" class="nav-link px-2 text-secondary">Home</a></li>
              <li><a href="catalog.js" class="nav-link px-2 text-white">Catalog</a></li>
              <li><a href="about.html" class="nav-link px-2 text-white">About</a></li>
            </ul>
    
            <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
              <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search" />
            </form>
    
            <div class="text-end">
              <button type="button" class="btn btn-warning" onclick="window.location.href='cart.html'">View Cart</button>
            </div>
          </div>
        </div>
      </header>
    );
  }