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
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setReservas(data);
    } catch (err) {
      console.error("Error al obtener reservas:", err);
    }
  };

  const cancelarReserva = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/reservas/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        fetchReservas();
      }
    } catch (err) {
      console.error("Error al cancelar reserva:", err);
    }
  };

  return (
    <div className="container mt-4">
      <Navbar />
      <h2 className="mb-4">Mis Reservas</h2>

      {reservas.length > 0 ? (
        <ul className="list-group">
          {reservas.map((reserva) => (
            <li
              key={reserva.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{reserva.titulo}</strong> - {reserva.cantidad_butacas} butacas
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => cancelarReserva(reserva.id)}
              >
                Cancelar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="alert alert-info">No realizaste ninguna reserva.</div>
      )}
    </div>
  );
}

export default Reservas;
