import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";

function Peliculas() {
  const [user, setUser] = useState(null);
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
        const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
        setUser(storedUser);
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

  const reservar = async (pelicula) => {
    try {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:5000/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...pelicula,
        }),
      });
      navigate("/reservas");
    } catch (err) {
      console.error("Error al registrar reserva:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Navbar />
      <h2>Cartelera</h2>
      <ul>
        {peliculas.map((peli) => (
          <li key={peli.id} style={{ marginBottom: "1rem" }}>
            <strong>{peli.titulo}</strong> ({peli.genero}) - {peli.duracion} min
            {user?.role === "user" && (
              <button onClick={() => reservar(peli)} style={{ marginLeft: "1rem" }}>
                Reservar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Peliculas;
