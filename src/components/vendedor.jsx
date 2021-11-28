import React from 'react';
import { Routes, Route } from "react-router-dom";
import styled from 'styled-components';
import Calzados from './vendedor/calzados'
import Selection from './select';
import MenuVendedor from './vendedor/menu';
import VentasVendedor from './vendedor/ventasVendedor';
import EditarPassword from './vendedor/editarPassword';
import img from '../images/logo.png';

const Vendedor = ({usuario}) =>{

    return(
        <Container>
        <Div3>
            <img src={img} alt="Global Sport" />
            <Div>Bienvenido {usuario.nombre}</Div>
            <Div2>Esta es la aplicación del vendedor</Div2>
        </Div3>
        <MenuVendedor/>
        <Routes>
            <Route path="/calzados" element={<Calzados vendedor={usuario.id}/>}/>
        </Routes>
        <Routes>
            <Route path="/ventas" element={<VentasVendedor id_vendedor={usuario.id}/>}/>
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
export default Vendedor;