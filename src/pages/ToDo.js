import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { BsArrowLeft } from "react-icons/bs";

export function ToDo() {
    const navigate = useNavigate()
    const [data, setData] = useState()
    const [time, setTime] = useState('')

    function handleForm(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        console.log('data :', data)
    }

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
            <TaskForm>
                    <input  placeholder = "What's the new task ? "
                            type="text"
                            name="task"
                            onChange={handleForm}/>

                    <TimeInput>
                        <button onClick={(event) => {
                                event.preventDefault()
                                setTime(!time)}}>
                            time
                        </button> 
                        {(time) ?
                            <>
                                <input  placeholder = "set Time to Task "
                                    type="time"
                                    name="time"
                                    onChange={handleForm} /> 
                                <span>Set time you think you will spande </span>
                            </> 
                            : 
                            <></>
                        } 
                    </TimeInput>
                <input type="submit" value="Submit" />
            </TaskForm>
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
        margin-bottom: 50px;
    }
`
const TaskForm = styled.form`
    display: flex;
    flex-direction: column;
    background-color:#bacfca;
    padding: 10px;
    border-radius: 10px;
    input {
        border: none;
        border-radius: 5px;
        height: 30px;
    }
`
const TimeInput = styled.div`
    display: flex;
    align-items: center;
    margin: 3px 0 15px 0;
    button{
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        width: 40px;
        height: 20px;
        border: none;
        border-radius: 5px;
        padding: 3px;
        background-color: #2a6a5c;
        font-weight: 500;
        margin-right: 10px;
        font-family: 'Roboto Condensed', sans-serif;
    }
    input {
        height: 20px;
        margin-right: 5px;
    }
    span{
        font-family: 'Roboto Condensed', sans-serif;
        font-style: italic;
        font-size: 10px;
        color: #808080;
    }

`