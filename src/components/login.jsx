import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { borrar_campos, update_login_values } from "../redux/login/actions";
import { datos_de_usuario } from "../redux/usuario/actions";
import { urlLogin } from "../url";
import img from '../images/logo.png'

const Loggin = () => {
    const formValues = useSelector(store=>store.formState)
    const dispatch = useDispatch();


    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        const usuario = await fetch(urlLogin, {
            method: 'POST',
            body: JSON.stringify(formValues)
        }).then(res=>res.json()).catch(error=>console.log(error))
        if(!usuario) return dispatch(borrar_campos());
        dispatch(datos_de_usuario(usuario));
        dispatch(borrar_campos());

    }
    const handleChange = (input) =>{
        const {name, value} = input
        dispatch(update_login_values({[name]: value}))
    }

  return (
    <Container>
      <Contenido>
        <ContImg>
          <Img src={img} alt="Global sport" />
        </ContImg>
        <H1>Bienvenidos a Global Systems llc</H1>
        <Form autoComplete='off' onSubmit={(e)=>handleSubmit(e)}>
          <Span>Iniciar Sesión</Span>
          <FormGroup>
            <label htmlFor="correo">Correo</label>
            <input type="text" name="correo" id="correo" value={formValues.correo}  onChange={(e)=>handleChange(e.target)}/>
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" id="password" value={formValues.password}  onChange={(e)=>handleChange(e.target)}/>
          </FormGroup>
          <FormGroup>
            <button>Iniciar Sesión</button>
          </FormGroup>
        </Form>
      </Contenido>
    </Container>
  );
};
const Container = styled.div`
  min-height: 100vh;
  padding: 0 2%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Contenido = styled.div`
  
`;
const ContImg = styled.div`
  width: 150px;
  margin: 0 auto;
`;
const Img = styled.img`
  width: 100%;
`;
const H1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  text-align: center;
  margin: 50px auto;

 text-transform: uppercase;
`;
const Form = styled.form`
  border: 1px solid gray;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 10px;
`;
const Span = styled.span`
  font-size: 1.5rem;
  display: block;
  padding: 0 0px 10px;
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
      cursor: pointer;
      background-color: transparent;
      color: #fff;
      border: 1px solid gray;
  }
`;
export default Loggin;
