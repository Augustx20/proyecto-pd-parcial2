import { BrowserRouter, Routes, Route } from "react-router-dom";
import Peliculas from "./pages/Peliculas";
import Reservas from "./pages/Reservas";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import RutaPrivada from "./RutaPrivada";
import RutaAdmin from "./RutaAdmin";
import Register from "./pages/Register";
import SeleccionButacas from "./pages/SeleccionButacas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/peliculas" element={
          <RutaPrivada>
            <Peliculas />
          </RutaPrivada>
        } />
        <Route path="/reservas" element={
          <RutaPrivada>
            <Reservas />
          </RutaPrivada>
        } />
        <Route path="/adminpanel" element={
          <RutaAdmin>
            <AdminPanel />
          </RutaAdmin>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/seleccion-butacas/:id" element={
          <RutaPrivada>
            <SeleccionButacas />
          </RutaPrivada>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
