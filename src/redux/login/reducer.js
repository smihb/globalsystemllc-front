import { BORRAR_CAMPOS, UPDATE_LOGIN_VALUES } from "./actions";

const initialState = {
    correo: "",
    password: ""
}
const formState = (state=initialState, action) =>{
    switch (action.type) {
        case UPDATE_LOGIN_VALUES: {
            return{
                ...state,
                ...action.payload
            }
        }
        case BORRAR_CAMPOS: {
            return{
                correo: "",
                password: ""
            }
        }
        default: 
            return state;
    }
}
export default formState;