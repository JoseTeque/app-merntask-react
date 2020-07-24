import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    // Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);

    const { formulario, errorformulario , mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;

    const [proyecto, guardarProyecto] = useState({
        nombre:''
    });

    const {nombre} = proyecto;

    const handleChange = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();

        //Validar el proyecto
        if(nombre.trim() === ''){
            mostrarError();
            return;
        };

        //Agregar al state
        agregarProyecto(proyecto);

        //Reiniciar el form
        guardarProyecto({
            nombre:''
        })

    }

    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick = {() => mostrarFormulario()}
            >
                Nuevo Proyecto
            </button>
            
            {formulario ?
                (
                    <form
                className="formulario-nuevo-proyecto"
               onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    className="input-text"
                    placeholder="Nombre Proyecto"
                    name="nombre"
                    onChange={handleChange}
                    value={nombre}
                />

                <input
                    type="submit"
                    className="btn btn-block btn-primario"
                    value="Agregar Proyecto"
                />
                
            </form>
                )
                : null
            
            }

            {errorformulario ? <p className="mensaje error">El nombre es obligatorio..</p> : null}
        </Fragment>
     );
}
 
export default NuevoProyecto;