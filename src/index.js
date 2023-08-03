import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import App from "./App";
import "./index.css";
import AuthContextProvider from "./context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
        <ToastContainer/>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
