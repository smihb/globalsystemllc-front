import { DATOS_DE_USUARIO } from "./actions";

const initialState = {}

const usuario = (state=initialState, action) =>{
    switch (action.type) {
        case DATOS_DE_USUARIO: {
            return{
                ...action.payload
            }
        }
        default: 
            return state;
    }
}
export default usuario;