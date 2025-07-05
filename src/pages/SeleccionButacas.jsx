import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function SeleccionButacas() {
  const { id } = useParams();
  const [butacas, setButacas] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchButacas();
  }, []);

  const fetchButacas = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/butacas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setButacas(data);
    } catch (err) {
      console.error("Error al obtener butacas:", err);
    }
  };

  const toggleButaca = (butacaId) => {
    if (seleccionadas.includes(butacaId)) {
      setSeleccionadas(seleccionadas.filter((id) => id !== butacaId));
    } else {
      setSeleccionadas([...seleccionadas, butacaId]);
    }
  };

  const confirmarReserva = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/butacas/reservar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          butacas: seleccionadas,
          peliculaId: id,
        }),
      });

      if (response.ok) {
        navigate("/reservas");
      } else {
        console.error("Error al confirmar reserva");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="container mt-4">
      <Navbar />
      <h2 className="mb-4">Selecciona tus Butacas</h2>

      <div className="d-flex flex-wrap mb-3" style={{ maxWidth: "400px" }}>
        {butacas.map((butaca) => (
          <div
            key={butaca.id}
            className={`border d-flex align-items-center justify-content-center m-1`}
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: butaca.ocupada
                ? "#dc3545" // rojo ocupado
                : seleccionadas.includes(butaca.id)
                ? "#198754" // verde seleccionada
                : "#f8f9fa", // gris claro disponible
              color: "#000",
              cursor: butaca.ocupada ? "not-allowed" : "pointer",
            }}
            onClick={() => !butaca.ocupada && toggleButaca(butaca.id)}
          >
            {butaca.numero_butaca}
          </div>
        ))}
      </div>

      <p>Butacas seleccionadas: <strong>{seleccionadas.length}</strong></p>

      <button className="btn btn-primary" onClick={confirmarReserva} disabled={seleccionadas.length === 0}>
        Confirmar Reserva
      </button>
    </div>
  );
}

export default SeleccionButacas;
