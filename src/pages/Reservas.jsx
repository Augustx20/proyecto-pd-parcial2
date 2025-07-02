import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Reservas() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/reservas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setReservas(data);
    } catch (err) {
      console.error("Error al obtener reservas:", err);
    }
  };

  const cancelarReserva = async (reservaId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/reservas/${reservaId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchReservas();
      }
    } catch (err) {
      console.error("Error al cancelar reserva:", err);
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
              {reserva.titulo} - Butacas reservadas: {reserva.cantidad_butacas}
              <button
                onClick={() => cancelarReserva(reserva.id)}
                style={{ marginLeft: "1rem" }}
              >
                Cancelar
              </button>
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
