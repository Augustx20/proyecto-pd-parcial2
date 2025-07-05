-- Crear base de datos
CREATE DATABASE IF NOT EXISTS sistema_reservas;
USE sistema_reservas;

-- Tabla de usuarios
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') NOT NULL
);

-- Tabla de películas
CREATE TABLE peliculas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  genero VARCHAR(50) NOT NULL,
  duracion INT NOT NULL,
  disponible BOOLEAN DEFAULT 1
);

-- Tabla de butacas
CREATE TABLE butacas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pelicula_id INT NOT NULL,
  numero_butaca INT NOT NULL,
  ocupada BOOLEAN DEFAULT 0,
  FOREIGN KEY (pelicula_id) REFERENCES peliculas(id) ON DELETE CASCADE
);

-- Tabla de reservas
CREATE TABLE reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  pelicula_id INT NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (pelicula_id) REFERENCES peliculas(id) ON DELETE CASCADE
);

-- Tabla intermedia para registrar qué butacas corresponden a cada reserva
CREATE TABLE reserva_butacas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reserva_id INT NOT NULL,
  butaca_id INT NOT NULL,
  FOREIGN KEY (reserva_id) REFERENCES reservas(id) ON DELETE CASCADE,
  FOREIGN KEY (butaca_id) REFERENCES butacas(id) ON DELETE CASCADE
);
