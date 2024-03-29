import styled from "styled-components"
import { FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function ToDoOption({func}){
    const navigate = useNavigate()

    return (
        <ToDoList onClick={() => navigate('/todo')}>
            <FaTasks style={ {
                color: 'white',
                fontSize: '25px',
                marginRight: '20px'
            } } />
            <h1> 
                ToDo List
            </h1>
        </ToDoList>)
} 

const ToDoList = styled.div`
    display: flex;
    width: 250px;
    height: 70px;
    align-items: center;
    background-color: #2a6a5c;
    border-radius: 15px;
    padding: 10px 25px 10px 25px;
    margin: 10px;
    h1{
        font-family: 'Roboto Condensed', sans-serif;
        letter-spacing: 1px;
        color: #f1f1f1;
    }
`