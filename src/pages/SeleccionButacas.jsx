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
        butacas: seleccionadas,  // Esta es tu lista correcta de IDs
        peliculaId: id,          // El id de la película viene de useParams()
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
    <div style={{ padding: "2rem" }}>
      <Navbar />
      <h2>Selecciona tus Butacas</h2>

      <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "300px" }}>
        {butacas.map((butaca) => (
          <div
            key={butaca.id}
            onClick={() => !butaca.ocupada && toggleButaca(butaca.id)}
            style={{
              width: "40px",
              height: "40px",
              margin: "5px",
              backgroundColor: butaca.ocupada
                ? "red"
                : seleccionadas.includes(butaca.id)
                ? "green"
                : "lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: butaca.ocupada ? "not-allowed" : "pointer",
              border: "1px solid black",
            }}
          >
            {butaca.numero_butaca}
          </div>
        ))}
      </div>

      <p style={{ marginTop: "1rem" }}>
        Butacas seleccionadas: {seleccionadas.length}
      </p>

      <button onClick={confirmarReserva} style={{ marginTop: "1rem" }}>
        Confirmar Reserva
      </button>
    </div>
  );
}

export default SeleccionButacas;
