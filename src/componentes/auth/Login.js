import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AutContext from '../../context/autenticacion/authContext';
import alertaContext from '../../context/alertas/alertaContext';

const Login = (props) => {

    // extraer los valores del context alerta
    const alertasContext = useContext(alertaContext);
    const { alerta, mostrarAlerta } = alertasContext;

     // extraer los valores del context auth
    const authContext = useContext(AutContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    // STATE DE USUARIO
    const [usuario, guardarUsuario] = useState({
        email:'',
        password:''
    });

    useEffect(() => {

        if(autenticado){
            props.history.push('./proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
           
        }
         //eslint-disable-next-line
    }, [mensaje, autenticado, props.history])

    // extraer los datos

    const {email, password} = usuario;

    const handleOnchange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    };

    // Cuando el usuario quiere iniciar sesion
    const handleSubmit = e => {
        e.preventDefault();

        // validar que no haya campos vacios
        if(email.trim() ==="" || password.trim()=== "") {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            
            return;
        }
        

        // pasarlo al action
        iniciarSesion(usuario);
    }

    return ( 
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            onChange={handleOnchange}
                            value={email}
                        />
                    </div>  
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu password"
                            onChange={handleOnchange}
                            value={password}
                        />
                    </div>  
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">Obtener Cuenta</Link>
            </div>
        </div>
     );
}
 
export default Login;