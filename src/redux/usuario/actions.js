export const DATOS_DE_USUARIO = 'DATOS_DE_USUARIO';


export const datos_de_usuario = (usuario) =>{
    return{
        type: DATOS_DE_USUARIO,
        payload: usuario
    }
}