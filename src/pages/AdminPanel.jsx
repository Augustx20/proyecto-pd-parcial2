import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";

function AdminPanel() {
  const [peliculas, setPeliculas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedUser");
        navigate("/");
      } else {
        fetchPeliculas();
      }
    } else {
      navigate("/");
    }
  }, []);

  const fetchPeliculas = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/peliculas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPeliculas(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Navbar />
      <h2>Panel de Administrador</h2>
      <ul>
        {peliculas.map((peli) => (
          <li key={peli.id}>
            {peli.titulo} ({peli.genero}) - {peli.duracion} min
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
