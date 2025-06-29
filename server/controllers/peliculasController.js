import fs from "fs";
import path from "path";

const filePathPeliculas = path.resolve("server/data/peliculas.json");

const leerPeliculas = () => {
  try {
    const data = fs.readFileSync(filePathPeliculas, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const guardarPeliculas = (peliculas) => {
  fs.writeFileSync(filePathPeliculas, JSON.stringify(peliculas, null, 2));
};

export const getPeliculas = (req, res) => {
  const peliculas = leerPeliculas();
  res.json(peliculas);
};

export const agregarPelicula = (req, res) => {
  const { titulo, genero, duracion } = req.body;

  if (!titulo || !genero || !duracion) {
    return res.status(400).json({ success: false, message: "Datos incompletos" });
  }

  const peliculas = leerPeliculas();
  const nueva = {
    id: Date.now(),
    titulo,
    genero,
    duracion,
  };

  peliculas.push(nueva);
  guardarPeliculas(peliculas);
  res.json(peliculas);
};

export const eliminarPelicula = (req, res) => {
  const id = parseInt(req.params.id);
  let peliculas = leerPeliculas();
  peliculas = peliculas.filter((p) => p.id !== id);
  guardarPeliculas(peliculas);
  res.json(peliculas);
};
