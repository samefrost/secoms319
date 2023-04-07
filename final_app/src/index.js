import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css";
import {App} from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <header class="p-3 text-bg-dark">
  //       <div class="container">
  //         <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
  //           <a class="navbar-brand" href="home.html">
  //             <img src="images/image.png" alt="Sam & Kerwn's Online Music Store" width="125" height="100"/>
  //           </a>   
    
  //           <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
  //             <li><a href="home.html" class="nav-link px-2 text-secondary">Home</a></li>
  //             <li><a href="catalog.js" class="nav-link px-2 text-white">Catalog</a></li>
  //             <li><a href="about.html" class="nav-link px-2 text-white">About</a></li>
  //           </ul>
    
  //           <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
  //             <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search" />
  //           </form>
    
  //           <div class="text-end">
  //             <button type="button" class="btn btn-warning" onclick="window.location.href='cart.html'">View Cart</button>
  //           </div>
  //         </div>
  //       </div>
  //     </header>
      <React.StrictMode>
        <App />
      </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

