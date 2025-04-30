// src/pages/Login.jsx
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { AuthContext } from "../context/authContext";
import "../styles/login.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    setError("");
    try {
      const res = await axios.post("/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("admin", JSON.stringify(res.data.user));
      login(res.data.user, res.data.token);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <PageWrapper>
      <div className="login-container reveal fade-up">
        <img
          src="/images/f1-car-image.png"
          alt="F1 Logo"
          className="login-logo"
        />
        <h2 className="login-title">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}

          <button type="submit">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </PageWrapper>
  );
};

export default Login;
