import { useEffect, useState } from "react";

const Reservas = () => {
  const [reserva, setReserva] = useState(null);

  useEffect(() => {
    const storedReserva = JSON.parse(localStorage.getItem("reserva"));
    setReserva(storedReserva);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Mis Reservas</h2>
      {reserva ? (
        <p>
          Reservaste la película: <strong>{reserva.titulo}</strong>
        </p>
      ) : (
        <p>No realizaste ninguna reserva.</p>
      )}
    </div>
  );
};

export default Reservas;