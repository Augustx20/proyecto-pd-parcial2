import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const response = await fetch("http://localhost:5000/api/peliculas");
      const data = await response.json();
      setPeliculas(data);
    } catch (err) {
      console.error(err);
    }
  };

  const reservar = async (pelicula) => {
    try {
      await fetch("http://localhost:5000/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...pelicula,
          username: user?.username,
        }),
      });
      navigate("/reservas");
    } catch (err) {
      console.error("Error al registrar reserva:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
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