import { BrowserRouter, Routes, Route } from "react-router-dom";
import Peliculas from "./pages/Peliculas";
import Reservas from "./pages/Reservas";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/peliculas" element={<Peliculas />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
