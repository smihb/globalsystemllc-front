import React from 'react';
import styled from 'styled-components';

const Selection = () =>{
    return(
        <>
        <Container>
            <Div>Selecciona una opción en el menú</Div>
        </Container>
        </>
    );
}
const Container = styled.div`
    min-height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Div = styled.div`
    font-size: 2rem;
    text-align: center;
`;
export default Selection;