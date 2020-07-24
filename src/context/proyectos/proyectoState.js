import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';

import proyectoReducer from './proyectoReducer';
import proyectoContext from './proyectoContext';

import { FORMULARIO_PROYECTO, 
         LISTADO_PROYECTOS,
         AGREGAR_PROYECTOS,
         VALIDAR_FORMULARIO,
         PROYECTO_ACTUAL,
         ELIMINAR_PROYECTO,
         PROYECTO_ERROR
        } from '../../types/index';


const ProyectoState = props => {

    const initialState = {
        proyectos : [ ],
        formulario: false,
        errorformulario:false,
        proyecto:null,
        mensaje:null
    }

    //Dispath para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    //  Serie de funciones para el CRUD

    const mostrarFormulario = () => {
        dispatch({
            type:FORMULARIO_PROYECTO
        })
    }

    // OBTENER PROYECTOS
    const obtenerProyectos = async() => {

        try {
            const respuesta = await clienteAxios.get('/api/proyectos');

            dispatch({
                type: LISTADO_PROYECTOS,
                payload: respuesta.data
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
        
    }

    // AGREGAR PROYECTOS
    const agregarProyecto = async proyecto => {
        try {
            
            const respuesta = await clienteAxios.post('/api/proyectos', proyecto);
            // INSERTAR EL PROYECTO
            dispatch({
                type: AGREGAR_PROYECTOS,
                payload: respuesta.data
            })

        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }

        
    }

    // MOSTRAR ERROR
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    // Selecciona el proyecto que el usuario dio click
    const proyectoActual =  proyectoId => {
        dispatch({
            type:PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    // ELIMINAR PROYECTO
    const eliminarProyecto = async proyectoId => {
        
        try {
            const respuesta = await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
            console.log(respuesta);

        dispatch({
            type:ELIMINAR_PROYECTO,
            payload: respuesta.data
        })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }


    return(
        <proyectoContext.Provider
            value={{
                proyectos:state.proyectos,
                formulario: state.formulario,
                errorformulario:state.errorformulario,
                proyecto: state.proyecto,
                mensaje:state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;