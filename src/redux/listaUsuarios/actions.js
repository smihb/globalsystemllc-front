
export const LISTA_USUARIOS = 'LISTA_USUARIOS';

export const lista_usuarios = (lista)=>{
    return{
        type: LISTA_USUARIOS,
        payload: lista
    }
}