// src/RutaPrivada.jsx
import { Navigate } from "react-router-dom";

const RutaPrivada = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  return user ? children : <Navigate to="/" />;
};

export default RutaPrivada;
