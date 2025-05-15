import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import "./index.css";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Products from "./components/Products";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
           <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
        
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/navbar" element={<Navbar/>} />
          <Route  path="/home" element={<Home/>}    />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Products />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;