import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { urlCalzados, urlTallas } from '../../url';
import img from '../../images/papelera.png'
import img2 from '../../images/editar.png'

const Calzados = () =>{

    const [lista, setLista] = useState([])
    const [form, setForm] = useState({})
    const [editar, setEditar] = useState(false)
    const [tallas, setTallas] = useState({
        id:'',
        talla: '',
        cantidad: ''
    })
    const [editTallas, setEditTallas] = useState(false)

    const obtenerCalzados = async () =>{
        await fetch(urlCalzados)
                .then(res=>res.json())
                .then(res=>setLista([...res]))
                .catch(res=>console.log(res))
    }
    const editarCalzado = (calzado) =>{
        setForm(calzado)
        setEditar(true)
        setEditTallas(false)
    }
    const editarTallas = (id) =>{
        setEditTallas(true)
        setEditar(false)
        setTallas({...tallas, id})
    }
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setForm({...form, [name]: value})
    }
    const handleChangeTallas = (e) =>{
        const {name, value} = e.target;
        setTallas({...tallas, [name]: value})
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        await fetch(urlCalzados, {
            method: 'PUT',
            body: JSON.stringify(form)
        })
        .then(res=>res.json())
        .then(res=>{
            if(res==='usuario creado') return 
            setEditar(false)
        })
        .catch(res=>console.log(res))
        await obtenerCalzados();
    }
    const handleSubmitTallas = async (e) =>{
        e.preventDefault();
        
        await fetch(urlTallas, {
            method: 'PUT',
            body: JSON.stringify(tallas)
        })
        .then(res=>res.json())
        .then(res=>{
            if(res==='talla no editada') return 
            setEditTallas(false)
        })
        .catch(res=>console.log(res))
        await obtenerCalzados();
    }
    useEffect(()=>{
        obtenerCalzados();
    },[])

    return(
        <ContainerPrincipal>
            {editar && <Container>
            <Form onSubmit={(e)=>handleSubmit(e)} autoComplete='off'>
                <FormGroup>
                    <label htmlFor="codigo">Codigo</label>
                    <input value={form.codigo} name="codigo" id="nombre"type="text" onChange={e=>handleChange(e)}/>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="nombre">Nombre</label>
                    <input value={form.nombre} name="nombre" id="nombre"type="text" onChange={e=>handleChange(e)}/>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="color">Color</label>
                    <input value={form.color} name="color" id="roll"type="text" onChange={e=>handleChange(e)}/>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="precio">Precio</label>
                    <input value={form.precio} name="precio" id="correo"type="text" onChange={e=>handleChange(e)}/>
                </FormGroup>
                <FormGroup>
                    <button>Guardar</button>
                </FormGroup>
            </Form>
        </Container>}
        {editTallas && <Container>
            <Form onSubmit={(e)=>handleSubmitTallas(e)} autoComplete='off'>
                <FormGroup>
                    <label htmlFor="talla">Talla</label>
                    <input value={tallas.talla} name="talla" id="nombre"type="text" onChange={e=>handleChangeTallas(e)}/>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input value={tallas.cantidad} name="cantidad" id="nombre"type="text" onChange={e=>handleChangeTallas(e)}/>
                </FormGroup>
                <FormGroup>
                    <button>Guardar</button>
                </FormGroup>
            </Form>
        </Container>}
            <Encabezado>
                <Codigo>Codigo</Codigo>
                <Nombre>Nombre</Nombre>
                <Color>Color</Color>
                <Precio>Precio</Precio>
            </Encabezado>
            {lista.map((item, index)=>{
                return(   
                    <div key={index}>
                        <Encabezado>
                            <Codigo2>{item.codigo}</Codigo2>
                            <Nombre2>{item.nombre}</Nombre2>
                            <Color2>{item.color}</Color2>
                            <Precio2>{item.precio} $</Precio2>
                            <Btn>
                                <Editar onClick={()=>editarCalzado(item)} ></Editar>
                                <Eliminar></Eliminar>
                            </Btn>
                        </Encabezado>
                        <div>
                            <Tallas>Tallas disponibles</Tallas>
                            <TallasContainer>

                            {item.tallas.map((talla, index)=>{
                                if(talla==='0') return
                                return(
                                    <div key={index}>{index + 1}</div>
                                    )
                                })}
                                
                                <Editar onClick={()=>editarTallas(item.id)} ></Editar>                        
                            </TallasContainer>
                        </div>
                        <hr />
                    </div>
                )
            })}
        </ContainerPrincipal>
    );
}
const ContainerPrincipal = styled.div`
        margin: 0 auto;
        max-width: 500px;
`;
const Container = styled.div`
        margin: 30px auto 0;
        max-width: 500px;
`;
const Form = styled.form`
  border: 1px solid gray;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 10px;
`;
const FormGroup = styled.div`
display: flex;
margin-bottom: 5px;
flex-direction: column;

& > label{
    font-size: 1.2rem;
    padding-bottom: 5px;
}
& > input{
    height: 25px;
    line-height: 25px;
    font-size: 1.2rem;
    outline: none;
}
& > button{
    padding: 10px;
    font-size: 1.2rem;
    max-width: 200px;
    border-radius: 10px;
    margin: 20px auto 0;
    background-color: transparent;
      color: #fff;
      border: 1px solid gray;
      cursor: pointer;
}
`;
const Encabezado = styled.div`
    display: flex;
    margin: 10px auto; 
    position: relative;
    @media(min-width: 380px){
        justify-content: center;
    }
`;
const Codigo = styled.div`
    width: 50px;
    text-align: center;

    @media(min-width: 800px){
        margin: 20px 0; 
        font-size: 1.3rem;
        font-weight: 700;
        width: 70px;
     }
`;
const Nombre = styled.div`
    width: 100px;
    text-align: center;

    @media(min-width: 800px){
        width: 200px;
        margin: 20px 0px; 
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
    width: 60px;
    @media(min-width: 800px){
        margin: 20px 0; 
        font-size: 1.3rem;
        font-weight: 700;
        width: 70px;
     }
`;
const Codigo2 = styled.div`
    width: 50px;
    text-align: center;

    @media(min-width: 800px){
        width: 70px;
     }
`;
const Nombre2 = styled.div`
    width: 100px;
    text-align: center;

    @media(min-width: 800px){
        width: 200px;
    }
`;
const Color2 = styled.div`
    width: 100px;
    text-align: center;
`;
const Precio2 = styled.div`
    width: 60px;
    text-align: center;
    @media(min-width: 800px){
        width: 70px;
    }
`;
const Tallas = styled.div`
text-align: center;
margin-top: 15px;
`;
const TallasContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    & > div{
        margin:10px;
    }


`;
const Btn = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: end;
    align-items: center;
    position: absolute;
    right: 0;
`;
const Eliminar = styled.div`
    height: 20px;
    Width: 20px;
    background-image: url(${img});
    background-size: cover;
    cursor: pointer;
`;
const Editar = styled.div`
height: 20px;
Width: 20px;
margin-right: 5px;
background-image: url(${img2});
    background-size: cover;
    cursor: pointer;
`;
export default Calzados;