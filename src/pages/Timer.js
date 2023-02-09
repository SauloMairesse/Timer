import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { TimerComponent } from "../components/CDTimer/counterDownTimer";

export function TimerPage() {
    const navigate = useNavigate()

    return (
        <TimerHTML>
            <header>
                <BsArrowLeft style={ {
                    display: 'flex',
                    color: 'white',
                    fontSize: '30',
                    position: 'fixed',
                    left: '20px'
                } }/>
                <p>Countdown Timer</p>
            </header>

            <main>
                <TimerComponent time={60*14}/> 
            </main>
            
        </TimerHTML>)
}

const TimerHTML = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 30px;
    header {
        font-family: 'Roboto Condensed', sans-serif;
        color: white;
        font-size: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    main {
        display: flex;
        justify-content: center;
        margin-top: 30vh;
        height: 100%;
    }  
`