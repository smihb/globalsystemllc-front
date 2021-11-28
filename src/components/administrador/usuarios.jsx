import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { lista_usuarios } from '../../redux/listaUsuarios/actions';
import { urlUsuarios } from '../../url';
import img from '../../images/papelera.png'
import img2 from '../../images/editar.png'

const UsuariosLista = () =>{
    const usuarios = useSelector(store=>store.Usuarios)
    const dispatch = useDispatch();

    const [editar, setEditar] = useState(false);
    const [form, setForm] = useState({
            id: '',
            nombre: '',
            id_roll: '',
            roll: '',
            correo: '',
            password: '' 
    });

    const lista = usuarios.lista;

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setForm({...form, [name]: value})
    }
    const handleSubmit = async (e) =>{
        console.log('enviar',form)
        e.preventDefault();
        await fetch(urlUsuarios, {
            method: 'PUT',
            body: JSON.stringify(form)
        })
        .then(res=>res.json())
        .then(res=>{
            setForm({
                id: '',
            nombre: '',
            roll: '',
            correo: '',
            password: ''
            })
        })
        fetch(urlUsuarios)
            .then(res=>res.json())
            .then(res=>{
                dispatch(lista_usuarios(res))
            })
            setEditar(false)

    }
    const eliminarUsuario = async (id) =>{
        await fetch(urlUsuarios + '?id=' + id, {
            method: 'DELETE'
        })
            .then(res=>res.json())
            .then(res=>console.log(res))
            .catch(res=>console.log(res))

            fetch(urlUsuarios)
            .then(res=>res.json())
            .then(res=>{
                dispatch(lista_usuarios(res))
                console.log(res)
            })
    }
    const editarUsuario =(usuario)=>{
        setForm({...usuario, id_roll:1})
        setEditar(true)
    }

    useEffect(()=>{
        fetch(urlUsuarios)
            .then(res=>res.json())
            .then(res=>{
                dispatch(lista_usuarios(res))
            })
            .catch(e=>console.log(e))
    },[])


    return(
        <Container>
            <UContEn>
                <NombreE>Nombre</NombreE>
                <RollE>Roll</RollE>
            </UContEn>
            <UContEn>
                {editar && <form onSubmit={(e)=>handleSubmit(e)}>
                        <input value={form.nombre} name="nombre" type="text" onChange={e=>handleChange(e)}/>
                        <select name="id_roll" id="roll" onChange={(e)=>handleChange(e)} >
                        <option value="1">Administrador</option>
                        <option value="2">Vendedor</option>
                    </select>
                        <button>Guardar</button>
                    </form> }
            </UContEn>
            {lista.map((item, index)=>{
                return(
                    <UCont key={index}>
                        <Nombre>{item.nombre}</Nombre>
                        <Roll>{item.roll}</Roll>
                        <Btn>
                            <Editar onClick={(e)=>editarUsuario(item)}></Editar>
                            <Eliminar onClick={(e)=>eliminarUsuario(item.id)}></Eliminar>
                        </Btn>
                    </UCont>
                )
            })}
        </Container>
    );
}
const Container = styled.div`
        margin: 30px auto 0;
        max-width: 500px;
`;
const UContEn = styled.div`
    display: flex;

    & form {
        
        margin: 10px auto;
    }
    & form > input {
        max-width: 130px;
        margin-right: 5px;
    }
    & form > button {
        padding: 1px 5px;
        border-radius: 10px;
        background-color: transparent;
      color: #fff;
      cursor: pointer;
      border: 1px solid gray;
    }
    & form > select {
        max-width: 130px;
        margin-right: 5px;
        background-color: transparent;
      color: gray;
      cursor: pointer;
      outline: none;
    }

    @media(min-width: 800px){

    & form {
        
        margin: 20px auto;
    }

        & form > input {
            display: inline-block;
            max-width: 200px;
            height: 25px;
            font-size: 1.2rem;
            width: 300px;
            
        }
        & form > select {
            max-width: 300px;
            margin-right: 5px;
            font-size: 1.2rem;
            background-color: transparent;
          color: gray;
          cursor: pointer;
          outline: none;
        }
        & form > button {
            padding: 1px 5px;
            border-radius: 10px;
            background-color: transparent;
          color: #fff;
          border: 1px solid gray;
          font-size: 1.2rem;
        }
    }
    
`;
const UCont = styled.div`
    display: flex;
`;
const NombreE = styled.div`
    width: 120px;
    font-size: 1.5rem;
    overflow: hidden;
`;
const RollE = styled.div`
    font-size: 1.5rem;
`;
const Nombre = styled.div`
    width: 130px;
    overflow: hidden;
    margin: 10px 0;
    font-size: 1.2rem;
`;
const Roll = styled.div`
    margin: 10px 0;
    font-size: 1.3rem;
`;
const Btn = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: end;
    align-items: center;
    
`;
const Eliminar = styled.div`
    height: 30px;
    Width: 30px;
    background-image: url(${img});
    background-size: cover;
    cursor: pointer;
`;
const Editar = styled.div`
height: 30px;
Width: 30px;
margin-right: 10px;
background-image: url(${img2});
    background-size: cover;
    cursor: pointer;
`;


export default UsuariosLista;