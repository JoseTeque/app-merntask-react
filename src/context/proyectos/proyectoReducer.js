import { FORMULARIO_PROYECTO, 
         LISTADO_PROYECTOS,
         AGREGAR_PROYECTOS,
         VALIDAR_FORMULARIO,
         PROYECTO_ACTUAL,
         ELIMINAR_PROYECTO,
         PROYECTO_ERROR
 } from '../../types/index';


export default (state, action) => {
    switch(action.type){
        case FORMULARIO_PROYECTO:
            return{
                ...state,
                formulario:true
            }
        case LISTADO_PROYECTOS:
            
            return{
                ...state,
                proyectos: action.payload
            }
        case AGREGAR_PROYECTOS:
            return{
                ...state,
                proyectos:[...state.proyectos, action.payload],
                formulario:false,
                errorformulario:false
            }
        case VALIDAR_FORMULARIO:
            return{
                ...state,
                errorformulario:true
            }
        case PROYECTO_ACTUAL:
            return{
                ...state,
                proyecto: state.proyectos.find(proyecto => proyecto._id === action.payload)
            }
        case ELIMINAR_PROYECTO:
            return{
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyecto:null
            }
        case PROYECTO_ERROR:
            return{
                ...state,
                mensaje: action.payload
            }
        default:
            return state;
    }
}