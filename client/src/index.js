import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
<<<<<<< HEAD
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
=======
import { HashRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
const basename = process.env.NODE_ENV === "production" ? '/' : '/';

root.render(
  <React.StrictMode>
    <Router basename={basename}>
      <App />
    </Router>
>>>>>>> 9a4f9ed (final commit)
  </React.StrictMode>
);

reportWebVitals();
