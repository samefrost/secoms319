import React from "react";
import ReactDOM from "react-dom/client";
import "bootsrap/dist/css/bootstrap.css";
import Shop from "./shop/Shop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Shop />
    </React.StrictMode>
);