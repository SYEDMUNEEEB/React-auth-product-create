import { useState,useEffect } from "react";
import { db, collection, getDocs } from "../firebase";
const Products = () => {
    const [products, setProducts] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
     const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productList);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
   
    <>
    <div className="top-header">
         <div className='navbar'>
        <div className='logo'>
          <a className="store" href="/navbar">My Store</a>
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
    </div>
      <div className="products" style={{ padding: "20px" }}>
        <h2 style={{textAlign:"center"}}>Products</h2>
       <div className="product-lisst">
         <ul>
          {products.map((product) => (
            <li key={product.id} style={{ marginBottom: "30px" }}>
                <img
                src={product.image}
                alt={product.name}
              
             className="product-image" />
              <p><strong>Name:</strong>   {product.name}</p>
              <p><strong>Price:</strong> {product.price}</p>
              <p><strong>Description:</strong> {product.description}</p>
            
            </li>
          ))}
        </ul>
       </div>
      </div>
    </>
  )
}

export default Products