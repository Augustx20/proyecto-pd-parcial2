import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Peliculas() {
    const [user, setUser] = useState(null);
    const [Peliculas, setPeliculas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('loggedUser'));
        setUser(storedUser);

        const storedPeliculas = JSON.parse(localStorage.getItem('peliculas')) || [];
        setPeliculas(storedPeliculas);
    }, []);

    const reservar = (pelicula) => {
        localStorage.setItem('reserva', JSON.stringify(pelicula));
        navigate('/reservas');
    }

    const eliminar = (id) => {
        if (confirm('Estas seguro que queres eliminar esta pelicula?')) {
            const nuevasPeliculas = Peliculas.filter(p => p.id !== id);
            setPeliculas(nuevasPeliculas);
            localStorage.setItem('peliculas', JSON.stringify(nuevasPeliculas));
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