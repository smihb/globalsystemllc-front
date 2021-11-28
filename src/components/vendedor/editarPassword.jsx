import React, { useState } from 'react';
import styled from 'styled-components';
import { urlUsuarios } from '../../url';

const EditarPassword = ({ vendedor }) =>{
    const [usuario, setUsuario] = useState(vendedor)
    const [mostrar, setMostrar] = useState(true)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(usuario.password==='')return console.log('ingresa contraseña')

        await fetch(urlUsuarios, {
            method: 'PUT',
            body: JSON.stringify(usuario)
        })
        .then(res=>res.json())
        .then(res=>{
            if(res==='no editada') return 
            setMostrar(false)
        })
        .catch(res=>console.log(res))



    }
    const handleChange = (e)=>{
        setUsuario({...usuario, password: e.target.value})
    }
    return(
        <Container>
            {mostrar && <Form onSubmit={(e)=>handleSubmit(e)} autoComplete='off'>
                <FormGroup>
                    <label htmlFor="password">Nueva Contraseña</label>
                    <input  name="password" id="password" type="text" onChange={e=>handleChange(e)}/>
                </FormGroup>
                <FormGroup>
                    <button>Guardar</button>
                </FormGroup>
            </Form>}
            {!mostrar && <H2>Contraseña Actualizada</H2> }
        </Container>
    );
}
const Container = styled.div`
    margin-top: 30px;
`;
const H2 = styled.h2`
    text-align: center;
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
`;
export default EditarPassword;