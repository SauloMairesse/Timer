import styled from "styled-components"
import { FaTasks } from "react-icons/fa";

export function ToDoOption({func}){
    
    return (
        <Cronometro>
            <FaTasks style={ {
                color: 'white',
                fontSize: '25px',
                marginRight: '20px'
            } } />
            <h1> 
                ToDo List
            </h1>
        </Cronometro>)
} 

const Cronometro = styled.div`
    display: flex;
    width: 250px;
    height: 70px;
    align-items: center;
    background-color: #2a6a5c;
    border-radius: 15px;
    padding: 10px 25px 10px 25px;
    margin: 10px;
    h1{
        font-family: 'Fredoka One';
        letter-spacing: 1px;
        color: #f1f1f1;
    }
`
const Text = styled.div`
`