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
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setPeliculas(data);
    } catch (err) {
      console.error("Error al obtener películas:", err);
    }
  };

  const reservar = (peliculaId) => {
    navigate(`/butacas/${peliculaId}`);
  };

  return (
    <div className="container mt-4">
      <Navbar />
      <h2 className="mb-4">Cartelera</h2>

      {peliculas.length > 0 ? (
        <div className="row">
          {peliculas.map((peli) => (
            <div className="col-md-4 mb-4" key={peli.id}>
              <div className="card h-100 shadow">
                <div className="card-body">
                  <h5 className="card-title">{peli.titulo}</h5>
                  <p className="card-text">
                    <strong>Género:</strong> {peli.genero}<br />
                    <strong>Duración:</strong> {peli.duracion} min<br />
                    <strong>Estado:</strong>{" "}
                    {peli.disponible ? (
                      <span className="text-success">Disponible</span>
                    ) : (
                      <span className="text-danger">No disponible</span>
                    )}
                  </p>

                  {user?.role === "user" && peli.disponible && (
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => reservar(peli.id)}
                    >
                      Reservar
                    </button>
                  )}

                  {user?.role === "user" && !peli.disponible && (
                    <button className="btn btn-secondary w-100" disabled>
                      No disponible
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">No hay películas disponibles.</div>
      )}
    </div>
  );
}

export default Peliculas;
