import { Link, useNavigate } from "react-router-dom";
import { register } from "../auth";
import { useState } from "react";
import { toast } from "react-toastify"; 
function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Pass individual fields to the register function
try {
  
      await register(form.email, form.password, form.username);
    toast.success("Registration successful!");
    navigate("/");
} catch (error) {
  console.error("Error during registration:", error);
  toast.error("Registration failed. Please try again.");
  
}
  };

  return (
    <div className="form-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          required
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/" className="register">Login</Link>
      </p>
    </div>
  );
}

export default Register;