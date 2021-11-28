import React from 'react';
import { Routes, Route } from "react-router-dom";
import styled from 'styled-components';
import CrearUsuario from './administrador/crearUsuario';
import Calzados from './administrador/calzado';
import CrearCalzado from './administrador/crearcalzado';
import Menu from './administrador/menu';
import UsuariosLista from './administrador/usuarios';
import Ventas from './administrador/ventas';
import Selection from './select';
import EditarPassword from './vendedor/editarPassword';
import img from '../images/logo.png';

const Administrador = ({usuario}) =>{

    return(
        <Container>
            <Div3>
            <img src={img} alt="Global Sport" />
                <Div>Bienvenido {usuario.nombre}</Div>
                <Div2>Este es el menú administrativo</Div2>
            </Div3>
        <Menu/>
        <Routes>
            <Route path="/usuarios" element={<UsuariosLista/>}/>
        </Routes>
        <Routes>
            <Route path="/crearusuario" element={<CrearUsuario/>}/>
        </Routes>
        <Routes>
            <Route path="/calzados" element={<Calzados/>}/>
        </Routes>
        <Routes>
            <Route path="/crearcalzado" element={<CrearCalzado/>}/>
        </Routes>
        <Routes>
            <Route path="/ventas" element={<Ventas/>}/>
        </Routes>
        <Routes>
            <Route path="/password" element={<EditarPassword vendedor={usuario}/>}/>
        </Routes>
        <Routes>
            <Route path="/" element={<Selection/>}/>
        </Routes>
        </Container>
    );
}
const Container = styled.div`
    padding: 0 2%;

    @media(min-width: 800px){
        padding: 0 12%;
    }
`;
const Div = styled.div`
    font-size: 2rem;
    margin-top: 10px;
    text-align: center;
    
`;  
const Div2 = styled.div`
    font-size: 1.2rem;
    margin-top: 10px;
    text-align: center;
    @media(min-width: 800px){
        margin: 20px auto;
    }
`;  
const Div3 = styled.div`
    max-width: 500px;
    margin: 0 auto;
    img{
        display: none;
    }

    @media(min-width: 800px){
        position: relative;
        margin-bottom: 20px;
        img{
            display: block;
            width: 100px;
            position: absolute;
            transform: translate(-100%);
        }
    }
`;  
export default Administrador;