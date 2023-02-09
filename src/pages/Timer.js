import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { TimerComponent } from "../components/CDTimer/counterDownTimer";

export function TimerPage() {
    const navigate = useNavigate()

    return (
        <TimerHTML>
            <BsArrowLeft style={ {
                display: 'flex',
                color: 'white',
                fontSize: '25'
            } }/> 

            <main>
                <TimerComponent time={60*14} /> 
            </main>
            
        </TimerHTML>)
}

const TimerHTML = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 30px;
    main {
        display: flex;
        justify-content: center;
        margin-top: 30vh;
        height: 100%;
    }  
`