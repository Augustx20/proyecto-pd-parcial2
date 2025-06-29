let peliculas = [
  { id: 1, titulo: 'Matrix', genero: 'Ciencia Ficción', duracion: 136 },
  { id: 2, titulo: 'El Padrino', genero: 'Drama', duracion: 175 },
  { id: 3, titulo: 'Interestelar', genero: 'Ciencia Ficción', duracion: 169 }
];

export const getPeliculas = (req, res) => {
  res.json(peliculas);
};

export const agregarPelicula = (req, res) => {
  const { titulo, genero, duracion } = req.body;
  const nueva = { id: Date.now(), titulo, genero, duracion };
  peliculas.push(nueva);
  res.json(peliculas);
};

export const eliminarPelicula = (req, res) => {
  const id = parseInt(req.params.id);
  peliculas = peliculas.filter(p => p.id !== id);
  res.json(peliculas);
};
