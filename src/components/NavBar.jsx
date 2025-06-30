// Navbar.jsx con logout funcional
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  const logout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/");
  };

  return (
    <nav style={{ padding: "1rem", backgroundColor: "#eee", marginBottom: "2rem" }}>
      {user && (
        <>
          <span style={{ marginRight: "1rem" }}>Bienvenido, {user.username}</span>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
