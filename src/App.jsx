import { BrowserRouter, Routes, Route } from "react-router-dom";
import Peliculas from "./pages/Peliculas";
import Reservas from "./pages/Reservas";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/peliculas" element={<Peliculas />} />
        <Route path="/reservas" element={<Reservas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
