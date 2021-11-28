import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { urlFacturas } from '../../url';

const Ventas = () =>{
    const [facturas, setFacturas] = useState([]);
    const [input, setInput] = useState('');

    const listaFacturas = facturas.filter((res)=>res.vendedor.includes(input));

    

    const obtenerFacturas = async () =>{
        await fetch(urlFacturas)
                .then(res=>res.json())
                .then(res=>setFacturas([...res]))
                .catch(res=>console.log(res))
    }
    useEffect(()=>{
        obtenerFacturas()
    }, [])
    return(
        <Container>
            <Input value={input} onChange={(e)=>setInput(e.target.value)} type="text" placeholder="Filtrar por Vendedor" />

            <hr />
            {listaFacturas.length > 0 && listaFacturas.map((item, index)=>{

                return(
                <>
                    <Factura key={index}>
                        <FacturaGroup>
                            <div>Factura N°: {item.id}</div>
                            <div>Fecha: {item.fecha}</div>
                            <div>Vendedor: {item.vendedor}</div>
                            <div>Total: {item.total} $</div>
                        </FacturaGroup>
                        <FacturaGroup>
                            <div>Cliente: {item.nombre}</div>
                            <div>CI / RIF: {item.rif_ci}</div>
                            <div>Telefono: {item.telefono}</div>
                            <div>Direccion: {item.direccion}</div>
                        </FacturaGroup>
                        <FacturaGroup>
                            <div>Forma de pago:</div>
                            <div>Efectivo {item.forma_de_pago[0].usd_efectivo} $</div>
                            <div>Débito {item.forma_de_pago[0].debito} $</div>
                            <div>Crédito {item.forma_de_pago[0].credito} $</div>
                        </FacturaGroup>
                        <FacturaGroup>
                            <div>Descripción</div>
                        </FacturaGroup>
                        <FacturaDescripcion>
                            <div>Código</div>
                            <div>Calzado</div>
                            <div>Color</div>
                            <div>Talla</div>
                            <div>Precio</div>
                            <div>Cantidad</div>
                            <div>Importe</div>
                        </FacturaDescripcion>
                        {item.descripcion.map((des, index)=>{
                            return(
                                <FacturaDescripcion key={index}>
                                    <div>{des.codigo}</div>
                                    <div>{des.calzado}</div>
                                    <div>{des.color}</div>
                                    <div>{des.talla}</div>
                                    <div>{des.precio} $</div>
                                    <div>{des.cantidad}</div>
                                    <div>{des.importe} $</div>
                                </FacturaDescripcion>
                            )
                        })}
                    </Factura>
                    <hr />
                </>
                )
            })}
        </Container>
    );
}
const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;
const Input = styled.input`
    display: block;
    margin: 25px auto;
    width: 340px;
    height: 30px;
    line-height: 30px;
    font-size: 1.2rem;
    outline: none;
`;
const Factura = styled.div`
    margin: 40px 0;

    @media(min-width: 800px){
        
    }
`;
const FacturaGroup = styled.div`
    margin: 15px 0; 
    & > div {
        margin: 5px 0;
    }

    @media(min-width: 0px){
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        
    }
`;
const FacturaDescripcion = styled.div`
    margin: 5px 0; 
    & > div {
        margin: 0px 0;
    }

    @media(min-width: 0px){
        display: grid;
        grid-template-columns: 1fr 3fr 1fr 1fr 1fr 1fr 1fr;
        justify-items: center;
    }
`;

export default Ventas;