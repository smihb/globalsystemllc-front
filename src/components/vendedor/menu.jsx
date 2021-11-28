import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { datos_de_usuario } from '../../redux/usuario/actions';

const MenuVendedor = () =>{
    const dispatch = useDispatch();
    
    const salir = () =>{
        dispatch(datos_de_usuario({}))
    }
    
    return(
        <Nav>
            <Ul>
                <li>
                    <Slink to="/calzados">Calzados</Slink>
                </li>
                <li>
                    <Slink to="/ventas">Ventas</Slink>
                </li>
                <li>
                    <Slink to="/password">Actualizar Contraseña</Slink>
                </li>
                <li onClick={()=>salir()}>
                    <Slink to="/">Salir</Slink>
                </li>
            </Ul>
        </Nav>
    );
}
const Nav = styled.nav`

`;
const Ul = styled.ul`
    display: flex; 
    flex-wrap: wrap;
    list-style: none;
    justify-content: center;
    align-items: center;
`;
const Slink = styled(Link)`
    color: #FFFF00;
    font-size: 1.5rem;
    display: block;
    margin: 5px;
    padding: 5px;
    border: 1px solid gray;
    text-align: center;
    border-radius: 10px;

`;
export default MenuVendedor;