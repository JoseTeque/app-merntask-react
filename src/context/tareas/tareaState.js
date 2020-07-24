import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios';

import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types/index';

const TareaState = props => {
    const initialState = {
        tareasproyecto:[],
        errortarea:false,
        tareaseleccionada:null
    }

    // CREAR EL STATE Y EL DISPATCH
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    // OBTENER TAREAS
    const obtenerTareas= async proyecto => {
        try {
        const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}})
        dispatch({
            type: TAREAS_PROYECTO,
            payload: resultado.data.tareas
        })
        } catch (error) {
            
        }
    } 

    // AGREGAR TAREAS
    const agregarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload:resultado.data
            });

        } catch (error) {
            
        }
    }

    // VALIDA Y MUESTRA UN ERROR
    const validarTarea = () => {
        dispatch({
            type:VALIDAR_TAREA
        })
    }

    // ELIMINAR TAREA
    const eliminarTarea = async (tareaId, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${tareaId}`, {params: {proyecto}} )
            dispatch({
                type: ELIMINAR_TAREA,
                payload:tareaId
            })
        } catch (error) {
            
        }
    }

    // ACTUALIZAR TAREA
    const actualizarTarea = async tarea => {
       try {
        const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
 
        dispatch({
            type:ACTUALIZAR_TAREA,
            payload:resultado.data.tarea
        })

       } catch (error) {
           console.log(error.response);
       }
    }

    // EXTRAE UNA TAREA PARA EDICION
    const guardartareaActual = tarea =>{
        dispatch({
            type:TAREA_ACTUAL,
            payload:tarea
        })
    }

 

    // LIMPIAR TAREAS AL EDITAR
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }
    return(
        <TareaContext.Provider
            value={{
                tareasproyecto:state.tareasproyecto,
                errortarea:state.errortarea,
                tareaseleccionada:state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardartareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )

}

export default TareaState;