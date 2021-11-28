

export const UPDATE_LOGIN_VALUES = 'UPDATE_LOGIN_VALUES';
export const BORRAR_CAMPOS = 'BORRAR_CAMPOS';

export const update_login_values = (input) =>{
    return{
        type: UPDATE_LOGIN_VALUES,
        payload: input
    }
}
export const borrar_campos = () =>{
    return{
        type: BORRAR_CAMPOS
    }
}