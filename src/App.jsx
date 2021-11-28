import React from 'react';
import { useSelector } from 'react-redux';
import Administrador from './components/administrador';
import Loggin from './components/login';
import Vendedor from './components/vendedor';
import { BrowserRouter as Router } from "react-router-dom";

const App = () =>{
  const usuario = useSelector(store=>store.usuario)
    return(
        <Router>
          {!usuario.roll ? <Loggin /> : 
            usuario.roll==='administrador' ? <Administrador usuario={usuario}/> :
            usuario.roll==='vendedor' ? <Vendedor usuario={usuario}/> :
            <Loggin />}
        </Router>
    );
}
export default App;
