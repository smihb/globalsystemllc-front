import { LISTA_USUARIOS } from "./actions";

const initialState = {
    lista: []
}

export const Usuarios = (state=initialState, action)=>{
    switch (action.type) {
        case LISTA_USUARIOS:
            return{
                ...state,
                lista: action.payload
            }
        default: return state;
    }
}