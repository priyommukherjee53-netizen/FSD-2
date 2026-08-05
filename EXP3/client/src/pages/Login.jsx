import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const response = await loginUser(formData);

      login(response.data.user, response.data.token);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    }
  };

  return (
<div className="login-container">

<div className="login-card">

<h1>SecureAuth</h1>

<p className="subtitle">
JWT Authentication & Role Based Access Control
</p>

{error && <div className="error">{error}</div>}

<form onSubmit={handleSubmit}>

<div className="input-box">

<FaUser className="icon"/>

<input
type="text"
name="username"
placeholder="Username"
value={formData.username}
onChange={handleChange}
required
/>

</div>

<div className="input-box">

<FaLock className="icon"/>

<input
type={showPassword ? "text" : "password"}
name="password"
placeholder="Password"
value={formData.password}
onChange={handleChange}
required
/>

<span
className="eye"
onClick={() => setShowPassword(!showPassword)}
>

{showPassword ? <FaEyeSlash/> : <FaEye/>}

</span>

</div>

<button>

Login

</button>

</form>

<div className="demo-users">

<h3>Demo Accounts</h3>

<div className="account">

<strong>👑 Admin</strong>

<p>admin / admin123</p>

</div>

<div className="account">

<strong>✏ Editor</strong>

<p>editor / editor123</p>

</div>

<div className="account">

<strong>👁 Viewer</strong>

<p>viewer / viewer123</p>

</div>

</div>

</div>

</div>
);
  
};

export default Login;