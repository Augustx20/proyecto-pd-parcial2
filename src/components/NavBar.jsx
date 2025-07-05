import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  const logout = () => {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow">
      <div className="container">
        <span className="navbar-brand">Reserva de Películas</span>

        {user && (
          <div className="d-flex align-items-center gap-3">
            {user.role === "user" && (
              <>
                <button className="btn btn-outline-primary" onClick={() => navigate("/peliculas")}>
                  Películas
                </button>
                <button className="btn btn-outline-primary" onClick={() => navigate("/reservas")}>
                  Mis Reservas
                </button>
              </>
            )}

            {user.role === "admin" && (
              <button className="btn btn-outline-primary" onClick={() => navigate("/adminpanel")}>
                Panel Admin
              </button>
            )}

            <span className="me-2 fw-bold">Hola, {user.username}</span>
            <button className="btn btn-danger btn-sm" onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
