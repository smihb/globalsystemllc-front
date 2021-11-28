import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import formState from "./login/reducer";
import usuario from "./usuario/reducer";
import {Usuarios} from "./listaUsuarios/reducer";


const rootReducer = combineReducers({
    formState,
    usuario, 
    Usuarios
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

