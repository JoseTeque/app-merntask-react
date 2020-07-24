import React, {useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {
    // Obtener el state de Proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // Obtener el state de tareas
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas,actualizarTarea, guardartareaActual} = tareasContext;

    // EXTRAYEBDO ID DEL PROYECTO
    const {_id} = proyecto;

    // ELIMINAR TAREA
    const tareaeliminar = idtarea => {
        eliminarTarea(idtarea,_id);
        obtenerTareas(_id);
    }

    // cambiar el estado de la tarea
    const cambiarEstado = tarea => {
        if(tarea.estado) {
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    }

    // GUARDAR LA TAREA ACTUAL
    const seleccionaTarea = tarea => {
        guardartareaActual(tarea);
    }

    return ( 
       <li className="tarea sombra">
          <p> {tarea.nombreTarea} </p>

          <div className="estado">
                {tarea.estado 
                    ?
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={() => cambiarEstado(tarea)}
                            >
                                Completo
                            </button>
                        )
                    :

                    (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={() => cambiarEstado(tarea)}
                            >
                                Incompleto
                            </button>
                        )
                }
          </div>

          <div className="acciones">

                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionaTarea(tarea)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareaeliminar(tarea._id)}
                >
                    Eliminar
                </button>

          </div>
       </li>
     );
}
 
export default Tarea;