import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const peliculasMock = [
  { id: 1, titulo: 'Matrix', genero: 'Ciencia Ficción', duracion: 136 },
  { id: 2, titulo: 'El Padrino', genero: 'Drama', duracion: 175 },
  { id: 3, titulo: 'Interestelar', genero: 'Ciencia Ficción', duracion: 169 }
]

function Peliculas() {
    const [user, setUser] = useState(null);
    const [Peliculas, setPeliculas] = useState(peliculasMock);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('loggedUser'));
        setUser(storedUser);
    }, []);

    const reservar = (pelicula) => {
        localStorage.setItem('reserva', JSON.stringify(pelicula));
        navigate('/reservas');
    }

    const eliminar = (id) => {
        if (confirm('Estas seguro que queres eliminar esta pelicula?')) {
            setPeliculas(Peliculas.filter(p => p.id !== id));
        }
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Cartelera</h2>
            <ul>
                {Peliculas.map((peli) => (
                    <li key={peli.id} style={{ marginBottom: '1rem' }}>
                        <strong>{peli.titulo}</strong> ({peli.genero}) - {peli.duracion} min

                        {user?.role === 'user' && (
                            <button onClick={() => reservar(peli)} style={{ marginLeft: '1rem' }}>
                                Reservar
                            </button>
                        )}

                        {user?.role === 'admin' && (
                            <>
                                <button onClick={() => eliminar(peli.id)} style={{ marginLeft: '1rem' }}>
                                    Eliminar
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Peliculas;