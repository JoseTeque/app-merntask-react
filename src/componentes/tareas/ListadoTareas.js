import React, {Fragment, useContext} from 'react';
import Tarea from '../tareas/Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoTareas = () => {

    // Obtener el state de Proyectos
    const proyectosContext = useContext(proyectoContext);
    const {proyecto , eliminarProyecto} = proyectosContext;

    // Obtener el state de Tareas
    const tareasContext = useContext(tareaContext);
    const {tareasproyecto} = tareasContext;

    //Sino hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>
    
    const { _id, nombre} = proyecto;

    return ( 
        <Fragment>
            <h2>Proyecto: {nombre}</h2>
            <ul className="listado-tareas">
                {tareasproyecto.length === 0 
                    ?
                    (<li className="tarea"><p>No hay tareas</p></li>)
                    :
                    <TransitionGroup>
                        {tareasproyecto.map(tarea => (
                        <CSSTransition
                            key={tarea._id}
                            timeout={200}
                            classNames='tarea'
                        >
                        <Tarea 
                            tarea = {tarea}
                        />
                        </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
                
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => eliminarProyecto(_id)}
            >
                Eliminar Proyecto &times;
            </button>
        </Fragment>
     );
}
 
export default ListadoTareas;