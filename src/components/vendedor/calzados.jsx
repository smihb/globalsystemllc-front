import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { urlCalzados, urlFacturas, urlVentas } from '../../url';
import img from '../../images/papelera.png';

const Calzados = ({vendedor}) =>{
    const [calzado, setCalzado] = useState([])
    const [input, setInput] = useState('');
    const [vender, setVender] = useState(false)
    const [form, setForm] = useState({
        id_vendedor: vendedor,
        nombre: "",
        rif_ci: "",
        direccion: "",
        telefono: "",
        total: 0,
        bs_efectivo: "",
        usd_efectivo: "",
        debito: "",
        credito: "",
        descripcion: []
    })

    const lista1 = calzado.filter((cal)=>cal.nombre.includes(input));
    const lista2 = calzado.filter((cal)=>cal.codigo.includes(input));
    const lista3 = calzado.filter((cal)=>cal.color.includes(input));
    const listaCalzado = (input === '') ? calzado : [...lista1, ...lista2, ...lista3]

    const handleClickTalla =  (calzado, tallaSeleccionada, disponibilidad) =>{
        const producto = {
            id_calzado: calzado.id,
            talla: tallaSeleccionada,
            nombre: calzado.nombre,
            color: calzado.color,
            codigo: calzado.codigo,
            disponibilidad: disponibilidad,
            precio: calzado.precio,
            cantidad: 1,
            importe: calzado.precio
        }
        const total = (parseFloat(form.total) + parseFloat(calzado.precio)).toFixed(2)
        setVender(true)
        setForm({
            ...form,
            total: total,
            descripcion: [...form.descripcion, producto]
        })
    }
    const handleClickQuitarProducto = (index, importe) =>{
        
        const productos = form.descripcion; 
        const total = (form.total - importe).toFixed(2)
        productos.splice(index, 1)

        setForm({
            ...form,
            total,
            descripcion: [...productos]
        })
    }
    const handleChange =  (e) =>{

        let {name, value} = e.target
        
        setForm({...form, [name]: value})
    }
    const handleCantidadChange = (e, index) =>{
        const {value} = e.target;
        const calzados = form.descripcion
        const totalAcumulado = form.total
        const importeAnterior = calzados[index].importe
        const importe = (calzados[index].precio * value)

        calzados[index].cantidad = value
        calzados[index].importe = importe.toFixed(2)

        const total = (totalAcumulado - importeAnterior + importe).toFixed(2)

        setForm({
            ...form,
            total,
            descripcion:[...calzados]
        })
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();

        await fetch(urlFacturas, {
            method: 'POST',
            body: JSON.stringify(form)
        })
        .then(res=>res.json())
        .then(res=>{
            if(!res==='usuario creado') return 
            Cancelar();
        })
        .catch(res=>console.log(res))
        obtenerCalzados();
        Cancelar();
    }
    const Cancelar =  () =>{
        setVender(false)
        setForm({
            id_vendedor: vendedor,
            nombre: "",
            rif_ci: "",
            direccion: "",
            telefono: "",
            total: 0,
            bs_efectivo: "",
            usd_efectivo: "",
            debito: "",
            credito: "",
            descripcion: []
        })
    }
    const obtenerCalzados = async () =>{
        await fetch(urlCalzados)
                .then(res=>res.json())
                .then(res=>setCalzado([...res]))
                .catch(res=>console.log(res))
    }
    useEffect(()=>{
        obtenerCalzados();
    },[])
    return(
        <ContainerPrincipal>
            <Input value={input} onChange={(e)=>setInput(e.target.value)} type="text" placeholder="Buscar por código, nombre o color." />
            {vender && <Container>
            <Form onSubmit={(e)=>handleSubmit(e)} autoComplete='off'>
                <FormGroup>
                    <FormInput value={form.cliente} placeholder="Nombre o Razón Social" name="nombre" id="nombre"type="text" onChange={e=>handleChange(e)}/>
                    <FormInput value={form.rif_ci} placeholder="Cédula o RIF"  name="rif_ci" id="rif_ci"type="text" onChange={e=>handleChange(e)}/>
                    <FormInput value={form.telefono} placeholder="Teléfono"  name="telefono" id="telefono"type="text" onChange={e=>handleChange(e)}/>
                    <FormInput grid={"1 / -1"} value={form.direccion} placeholder="Dirección"  name="direccion" id="direccion"type="text" onChange={e=>handleChange(e)}/>
                    <label>Total a pagar: <b>{form.total} $</b></label>
                </FormGroup>
                <FacturaGroup>
                    <div>Formas de pago</div>
                </FacturaGroup>
                <FormGroup>
                <FormInput value={form.usd_efectivo} placeholder="Efectivo" name="usd_efectivo" id="usd_efectivo"type="text" onChange={e=>handleChange(e)}/>
                <FormInput value={form.debito} placeholder="Debito" name="debito" id="debito"type="text" onChange={e=>handleChange(e)}/>
                <FormInput value={form.credito} placeholder="Credito" name="credito" id="credito"type="text" onChange={e=>handleChange(e)}/>

                </FormGroup>   
                <FacturaGroup>
                    <div>Calzados</div>
                </FacturaGroup>
                <FacturaDescripcion>
                        <div>Código</div>
                        <div>Calzado</div>
                        <div>Color</div>
                        <div>Talla</div>
                        <div>Precio</div>
                        <div>Inventario</div>
                        <div>Cantidad</div>
                        <div>Importe</div>
                </FacturaDescripcion>
                {form.descripcion.map((des, index)=>{
                            return(
                                <FacturaDescripcion key={index}>
                                    <div>{des.codigo}</div>
                                    <div>{des.nombre}</div>
                                    <div>{des.color}</div>
                                    <div>{des.talla}</div>
                                    <div>{des.precio} $</div>
                                    <div>{des.disponibilidad}</div>
                                    <Cant value={des.cantidad} onChange={(e)=>handleCantidadChange(e, index)} name="cantidad" type="number" />
                                    <div>{des.importe} $</div>
                                    <QuitarCalzado onClick={()=>handleClickQuitarProducto(index, des.importe)}></QuitarCalzado>
                                </FacturaDescripcion>
                            )
                        })}
                <FormGroup>
                    <div>
                        <button>Facturar</button>
                        <Button onClick={()=>Cancelar()}>Cancelar</Button>
                    </div>
                </FormGroup>
            </Form>
        </Container>}
            <Encabezado>
                <Codigo>Codigo</Codigo>
                <Nombre>Nombre</Nombre>
                <Color>Color</Color>
                <Precio>Precio</Precio>
            </Encabezado>
            {listaCalzado.map((item, index)=>{
                return(   
                    <CalzadoC key={index}>
                        <Encabezado>
                            <Codigo2>{item.codigo}</Codigo2>
                            <Nombre2>{item.nombre}</Nombre2>
                            <Color2>{item.color}</Color2>
                            <Precio2><b>{item.precio}$</b></Precio2>
                        </Encabezado>
                        <div>
                            <Tallas>Tallas disponibles</Tallas>
                            <TallasContainer>

                            {item.tallas.map((talla, index)=>{
                                if(talla==='0') return
                                return(
                                    <TallaBoton key={index} onClick={()=>handleClickTalla(item, index+1, talla)}>{index + 1}</TallaBoton>
                                    )
                                })}                                
                            </TallasContainer>
                        </div>
                    </CalzadoC>
                )
            })}
        </ContainerPrincipal>
    );
}
const ContainerPrincipal = styled.div`
        margin: 0 auto;
`;
const CalzadoC = styled.div`
        border: 1px solid gray;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 500px;
        margin: 0 auto 10px;
`;
const Input = styled.input`
    display: block;
    margin: 25px auto;
    width: 350px;
    height: 30px;
    line-height: 30px;
    font-size: 1.2rem;
    outline: none;
`;
const Cant = styled.input`
    display: block;
    width: 40px;
    font-size: 1rem;
    outline: none;
`;
const QuitarCalzado = styled.div`
    width: 17px;
    height: ;
    background-image: url(${img});
    background-size: cover;
    cursor: pointer;
`;
const Container = styled.div`
        margin: 30px auto 0;
        max-width: 800px;
`;
const Form = styled.form`
  border: 1px solid gray;
  padding: 20px;
  margin: 0 auto;
  border-radius: 10px;
`;
const FormGroup = styled.div`
margin-bottom: 5px;
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-gap: 10px;

& > label{
    font-size: 1.5rem;
}
& > div{
    display: flex;
    grid-column: 1 / -1;
}
& div > button{
    padding: 10px;
    font-size: 1.2rem;
    max-width: 200px;
    border-radius: 10px;
    margin: 20px auto 0;
    border: 1px solid gray;
}
`;
const FormInput = styled.input`
    height: 25px;
    line-height: 25px;
    font-size: 1.2rem;
    outline: none;
    grid-column: ${props=>props.grid && '1 / -2'};
`;
const Button = styled.div`
    padding: 10px;
    font-size: 1.2rem;
    max-width: 200px;
    border-radius: 10px;
    margin: 20px auto 0; 
    border: 1px solid gray;
    background-color: rgba(255, 0, 0, 0.2);
`;
const FacturaGroup = styled.div`
    margin: 20px 0 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around; 
`;
const FacturaDescripcion = styled.div`
    margin: 5px 0; 

    display: grid;
        grid-template-columns: 1fr 3fr 1fr 1fr 1fr 1fr 1fr 1fr 20px;
        justify-items: center;
    & > div {
        margin: 5px 0;
    }
`;
const Encabezado = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px auto; 
`;
const Codigo = styled.div`
    margin-right: 10px;
    text-align: center;

    @media(min-width: 800px){
        margin: 20px 0; 
        font-size: 1.3rem;
        font-weight: 700;
     }
`;
const Nombre = styled.div`
    width: 100px;
    text-align: center;

    @media(min-width: 800px){
        width: 220px;
        margin: 20px 0; 
        font-size: 1.3rem;
        font-weight: 700;
    }
`;
const Color = styled.div`
    width: 100px;
    text-align: center;
    @media(min-width: 800px){
        margin: 20px 0; 
        font-size: 1.3rem;
        font-weight: 700;
     }
`;
const Precio = styled.div`
    text-align: center;
    @media(min-width: 800px){
        margin: 20px 0; 
        font-size: 1.3rem;
        font-weight: 700;
     }
`;
const Codigo2 = styled.div`
    margin-right: 10px;
    text-align: center;
`;
const Nombre2 = styled.div`
    width: 110px;
    text-align: center;

    @media(min-width: 800px){
        width: 220px;
    }
`;
const Color2 = styled.div`
    width: 100px;
    text-align: center;
`;
const Precio2 = styled.div`
    width: ;
    text-align: center;
    color: white;
`;
const Tallas = styled.div`
    text-align: center;
    margin-top: 15px;
`;
const TallaBoton = styled.div`
    cursor: pointer;
    border: 1px solid gray;
    padding: 5px;
    min-width: 30px;
    text-align: center;
    border-radius: 50%;
    background-color: rgba(0, 255, 0, 0.2);
`;
const TallasContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    & > div{
        margin:10px;
    }


`;

export default Calzados;