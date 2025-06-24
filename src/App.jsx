import { BrowserRouter, Routes, Route } from "react-router-dom";
import Peliculas from "./pages/Peliculas";
import Reservas from "./pages/Reservas";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import RutaPrivada from "./RutaPrivada";
import RutaAdmin from "./RutaAdmin";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
