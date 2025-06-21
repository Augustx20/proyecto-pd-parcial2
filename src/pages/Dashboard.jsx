import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [user,setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        const storedUser = JSON.parse(localStorage.getItem('loggeUser'))
        if(!storedUser){
            navigate('/login')
        }else{
            setUser(storedUser)
        }
    },[navigate])

    const handleLogout = () =>{
        localStorage.removeItem('loggedUser')
        navigate('/login')
    }
    if(!user) return null
    
    return(
        <div style={{padding:'2rem'}}>
            <h2>Bienvenido, {user.username}</h2>
            <p>Rol,{user.role}</p>
            {user.role === 'admin'&&(
                <div>
                    <h3>Panel de administrador</h3>
                    <p>Aqui podrias gestionar usuarios, contenido, etc.</p>
                </div>
            )}

            {user.role === 'user'&&(
                <div>
                    <h3>Panel de usuario</h3>
                    <p>Aqui podrias ver informacion personal, reservas, etc.</p>
                </div>
            )}

                <button onClick={handleLogout}>Cerrar Sesion</button>
        </div>
    )
}