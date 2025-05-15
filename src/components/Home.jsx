import React, { useState, useEffect } from "react";
import {
  db,
  storage,
  collection,
  addDoc,
  ref,
  uploadBytes,
  getDownloadURL,
  getDocs,
} from "../firebase";
import { toast } from "react-toastify"; 
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [products, setProducts] = useState([]);
const[loading,setLoading]=useState(false)
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate=useNavigate()

  const handleImageUpload = async (image) => {
    if (!image) {
      console.error("No image selected.");
      return null;
    }

    const storageRef = ref(storage, `images/${image.name}`);

    try {
      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
setLoading(true);
    try {
      const imageUrl = await handleImageUpload(productImage);
      if (!imageUrl) return;
setLoading(false);
      const productData = {
        name: productName,
        price: productPrice,
        description: productDescription,
        image: imageUrl,
      };

      const docRef = await addDoc(collection(db, "products"), productData);
      console.log("Product added with ID: ", docRef.id);

      setProductName("");
      setProductPrice("");
      setProductDescription("");
      setProductImage(null);
     

       toast.success("Product added successfully!");

      fetchProducts();
      navigate("/products")
    } catch (error) {
    toast.error("Error adding product: " + error.message);
      console.error("Error adding product:", error);
    }
    finally{
      setLoading(false)
    }
  };

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    } catch (error) {
      toast.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
    <div className="header">
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
  <a href="/products">All Products</a>
  <a href="/" className="logout">Logout</a>
</div>
      </div>

    </div> 
      <div className="add-product" >
        <form onSubmit={handleAddProduct}>
          <h2 style={{textAlign:"center"}}>Add Product</h2>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
            required
          />
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Product Price"
            required
          />
          <input
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Product Description"
            required
          ></input>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProductImage(e.target.files[0])}
            required
          />
         <button type="submit" disabled={loading}>
  {loading ? (
    <>
      Adding...
      <span className="spinner"></span>
    </>
  ) : productImage ? (
    "Add Product"
  ) : (
    "Upload Image"
  )}
</button>

        </form>
      </div>

    </>
  );
};

export default Home;
