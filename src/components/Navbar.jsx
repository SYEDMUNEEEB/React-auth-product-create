import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className='navbar'>
        <div className='logo'>
          <a className="store">My Store</a>
        </div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
     <div className={`mobile-links${menuOpen ? " open" : ""}`}>
  <a href="/home">Products</a>
  <a href="/" className="logout">Logout</a>
</div>
      </div>

      <div className="container">
        <div className="content">
          <h1>Welcome to My Store</h1>
          <p>Your one-stop shop for all your needs.
            Click on the Products link to view our offerings.
            If you want to add a product, please click on the Add Product button.
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;