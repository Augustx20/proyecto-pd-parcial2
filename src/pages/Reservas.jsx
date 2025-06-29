import { useEffect, useState } from "react";

function Reservas() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (storedUser) {
      fetchReservas(storedUser);
    }
  }, []);

  const fetchReservas = async (usuario) => {
    try {
      const response = await fetch("http://localhost:5000/api/reservas");
      const data = await response.json();
      const reservasFiltradas = data.filter(res => res.username === usuario.username);
      setReservas(reservasFiltradas);
    } catch (err) {
      console.error("Error al obtener reservas:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
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
