import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",  // usuario por defecto de XAMPP
  password: "",  // contraseña vacía por defecto
  database: "proyecto_sistemapeliculas",  // nombre de la base de datos
  port: 3307,  // puerto por defecto de MySQL
});

connection.connect((err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err);
  } else {
    console.log("Conexión a MySQL exitosa");
  }
});

export default connection;
