import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";

function Reservas() {
  const [reservas, setReservas] = useState([]);
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
        if (storedUser) {
          fetchReservas(storedUser);
        }
      }
    } else {
      navigate("/");
    }
  }, []);

  const fetchReservas = async (usuario) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/reservas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const reservasFiltradas = data.filter((res) => res.username === usuario.username);
      setReservas(reservasFiltradas);
    } catch (err) {
      console.error("Error al obtener reservas:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Navbar />
      <h2>Mis Reservas</h2>
      {reservas.length > 0 ? (
        <ul>
          {reservas.map((reserva) => (
            <li key={reserva.id}>
              {reserva.titulo} ({reserva.genero}) - {reserva.duracion} min
            </li>
          ))}
        </ul>
      ) : (
        <p>No realizaste ninguna reserva.</p>
      )}
    </div>
  );
}

export default Reservas;
