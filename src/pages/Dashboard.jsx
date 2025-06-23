import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedUser'))
    if (!storedUser) {
      navigate('/')
    } else {
      setUser(storedUser)
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('loggedUser')
    navigate('/')
  }

  if (!user) return null

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Bienvenido, {user.username} 👋</h2>
      <p>Rol: {user.role}</p>

      <nav style={{ marginTop: '1rem' }}>
        <Link to="/peliculas">Ver Cartelera</Link><br />
        {user.role === 'user' && <Link to="/reservas">Mis Reservas</Link>}<br />
        {user.role === 'admin' && <Link to="/admin">Panel Admin</Link>}<br />
      </nav>

      <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
        Cerrar sesión
      </button>
    </div>
  )
}

export default Dashboard
