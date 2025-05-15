import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 
import { login } from "../auth";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form.email, form.password);
      toast.success("Login successful!");
      navigate("/navbar");
    } catch (err) {
      toast.error(err.message); 
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <p className="register-link">
        Don't have an account? <Link to="/register" className="register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
