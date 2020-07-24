import React, { useContext, useState, useEffect} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    // Obtener el state de Proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    
    // Obtener el state de tareas
    const tareasContext = useContext(tareaContext);
    const {
        tareaseleccionada, 
        errortarea, 
        agregarTarea, 
        validarTarea, 
        obtenerTareas,
        actualizarTarea,
        limpiarTarea } = tareasContext;

    useEffect(() => {
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada)
        }else{
            guardarTarea({
                nombreTarea:''
            })
        }
    }, [tareaseleccionada])

    // STATE DEL FORMULARIO
    const [tarea, guardarTarea] = useState({
        nombreTarea:''
    });

    const { nombreTarea } = tarea;

    //Sino hay proyecto seleccionado
    if(!proyecto) return null;
    const { _id } = proyecto;


    const handleSubmit = e =>{
        e.preventDefault();

        //validar
        if(nombreTarea.trim() === ''){
            validarTarea();
            return;
        }

        // revisar si es edicion o es nueva tarea
        if(tareaseleccionada === null){
            // agregar la nueva tarea
            tarea.proyecto = _id;
            agregarTarea(tarea);
        }else{
            actualizarTarea(tarea);
            limpiarTarea();
        }

        // Obtener y filtrar las tareas del proyecto
        obtenerTareas(_id)

        //reiniciar el form
        guardarTarea({
            nombreTarea:''
        })

       

    }

    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }
    
    return ( 
  
        <div className="formulario">
            <form 
                onSubmit={handleSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea.."
                        name="nombreTarea"
                        onChange = {handleChange}
                        value={nombreTarea}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}

                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
     );
}
 
export default FormTarea;