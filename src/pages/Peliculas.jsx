import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Peliculas() {
  const [user, setUser] = useState(null);
  const [peliculas, setPeliculas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
    setUser(storedUser);
    fetchPeliculas();
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

  const irSeleccionButacas = (peliculaId) => {
    navigate(`/seleccion-butacas/${peliculaId}`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Navbar />
      <h2>Cartelera</h2>
      <ul>
        {peliculas.map((peli) => (
          <li key={peli.id} style={{ marginBottom: "1rem" }}>
            <strong>{peli.titulo}</strong> ({peli.genero}) - {peli.duracion} min

            {peli.disponible === 0 ? (
              <span style={{ color: "red", marginLeft: "1rem" }}>No disponible</span>
            ) : (
              user?.role === "user" && (
                <button
                  onClick={() => irSeleccionButacas(peli.id)}
                  style={{ marginLeft: "1rem" }}
                >
                  Reservar
                </button>
              )
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Peliculas;
