import fs from "fs";
import path from "path";

const filePath = path.resolve("server/data/reservas.json");

const leerReservas = () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
    } catch {
    return [];
  }
};

const guardarReservas = (reservas) => {
  fs.writeFileSync(filePath, JSON.stringify(reservas, null, 2));
};

export const registrarReserva = (req, res) => {
  const { id, titulo, genero, duracion, username } = req.body;

  if (!id || !titulo || !username) {
    return res.status(400).json({ success: false, message: "Datos incompletos" });
  }

  const reservas = leerReservas();
  reservas.push({ id, titulo, genero, duracion, username });
  guardarReservas(reservas);

  res.json({ success: true, reservas });
};

export const listarReservas = (req, res) => {
  const reservas = leerReservas();
  res.json(reservas);
};
