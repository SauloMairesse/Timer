import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { TimerComponent } from "../components/CDTimer/counterDownTimer";

export function ToDo() {
    const navigate = useNavigate()

    return (
        <ToDoHTML>
            <header>
                <BsArrowLeft    onClick={() => navigate('/')} 
                                style={ {
                                    display: 'flex',
                                    color: 'white',
                                    fontSize: '30',
                                    position: 'fixed',
                                    left: '20px'
                                } }/>
                <p>To Do List</p>
            </header>

        </ToDoHTML>)
}

const ToDoHTML = styled.div`
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