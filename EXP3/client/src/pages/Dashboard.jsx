import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "../styles/dashboard.css";

const Dashboard = () => {

  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {

    logout();

    navigate("/");

  };

  return (

    <div className="dashboard">

      <h1>Dashboard</h1>

      <h2>Welcome {user?.username}</h2>

      <h3>Role : {user?.role}</h3>

      <button onClick={handleLogout}>

        Logout

      </button>

    </div>

  );

};

export default Dashboard;