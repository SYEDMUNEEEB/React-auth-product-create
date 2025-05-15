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

const Home = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [products, setProducts] = useState([]);

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

    try {
      const imageUrl = await handleImageUpload(productImage);
      if (!imageUrl) return;

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
    } catch (error) {
      toast.error("Error adding product: ", error);
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
          <button type="submit">Add Product</button>
        </form>
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
  );
};

export default Home;
