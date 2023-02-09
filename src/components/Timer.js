import styled from "styled-components"
import { TfiTimer } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

export function TimerOption({func}){
    const navigate = useNavigate()
    return (
        <Cronometro onClick={() => navigate('/timer')}>
            <TfiTimer style={ {
                color: 'white',
                fontSize: '25px',
                marginRight: '20px'
            } } />
            <h1> 
                Cronometro
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
        font-family: 'Roboto Condensed', sans-serif;
        letter-spacing: 1px;
        color: white;
    }
`
const Text = styled.div`
`