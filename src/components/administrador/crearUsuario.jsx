import React, { useState } from 'react';
import styled from 'styled-components';
import { urlUsuarios } from '../../url';


const CrearUsuario = () =>{
    const [form, setForm] = useState({
        nombre: '',
        roll: 1,
        correo: '',
    })
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setForm({...form, [name]: value})
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        await fetch(urlUsuarios, {
            method: 'POST',
            body: JSON.stringify(form)
        })
        .then(res=>res.json())
        .then(res=>{
            if(!res==='usuario creado') return setForm({...form, correo: 'correo ya está registrado'})
            setForm({
                nombre: '',
            roll: '',
            correo: ''
            })
        })
        .catch(res=>console.log(res))

    }
    return(
        <Container>
            <Form onSubmit={(e)=>handleSubmit(e)} autoComplete='off'>
                <FormGroup>
                    <label htmlFor="nombre">Nombre</label>
                    <input value={form.nombre} name="nombre" id="nombre"type="text" onChange={e=>handleChange(e)}/>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="roll">Roll</label>
                    <select name="roll" id="roll" onChange={(e)=>handleChange(e)}>
                        <option value="1">Administrador</option>
                        <option value="2">Vendedor</option>
                    </select>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="correo">Correo</label>
                    <input value={form.correo} name="correo" id="correo"type="text" onChange={e=>handleChange(e)}/>
                </FormGroup>
                <FormGroup>
                    <button>Guardar</button>
                </FormGroup>
            </Form>
        </Container>
    );
}
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
    border-radius: 10px;
        background-color: transparent;
      color: #fff;
      cursor: pointer;
}
& > select{
    height: 25px;
    line-height: 25px;
    font-size: 1.2rem;
    outline: none;
    background-color: transparent;
    color: gray;
    cursor: pointer;
    text-shadow: 0 0 5px black:
}
`;
export default CrearUsuario;