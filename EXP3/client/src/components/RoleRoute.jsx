import { Navigate } from "react-router-dom";

const RoleRoute = ({ children, role }) => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.role !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RoleRoute;