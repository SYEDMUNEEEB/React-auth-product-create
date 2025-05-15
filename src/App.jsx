import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import "./index.css";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
           <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
        
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route  path="/home" element={<Home/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;