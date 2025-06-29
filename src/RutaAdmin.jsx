// src/RutaAdmin.jsx
import { Navigate } from "react-router-dom";

const RutaAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  return user && user.role === "admin" ? children : <Navigate to="/" />;
};

export default RutaAdmin;
