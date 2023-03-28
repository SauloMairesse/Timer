import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

export function ToDo() {
    const navigate = useNavigate()
    const [data, setData] = useState()
    const [time, setTime] = useState({})
    const [active, setActive] = useState(false);
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const BASE_URL = process.env.REACT_APP_BASE_URL
        const promise = axios.get(`${BASE_URL}/task/1`)
        promise.then((res) => {
            setTasks(res.data)
            console.log('tasks : ', res.data)
        } )
        promise.catch( (e) => {
            console.log('erro catch post newTask :', e)
        })
    } , [])

    function handleForm(e) {
        setData({
            [e.target.name]: e.target.value,
            time: time
        })
        console.log('data :', data)
    }

    function submitNewTask(event) {
        event.preventDefault()

        const BASE_URL = process.env.REACT_APP_BASE_URL
        
        const promise = axios.post(`${BASE_URL}/newtask`, {
            name: data.name,
            time: `${data.time.mm}:${data.time.ss}`,
            userId: 1
        })
        promise.then( (res) => {
            console.log(res.data)
        } )
        promise.catch( (e) => {
            console.log('erro catch post newTask :', e)
        })
    }

    function Task(name, time) {
        return (
            <TaskHTML>
                <span> {name} </span>
                <span> {time} </span>
            </TaskHTML> )
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
                            name="name"
                            onChange={handleForm}
                            required />
                    <TimeSettings>
                        <button onClick={(event) => {
                                    event.preventDefault()
                                    setTime(time)
                                    setActive(!active)
                                    
                                    }}
                                style={{backgroundColor: !active ? '#2a6a5c' : 'red' }}>
                            time
                        </button> 
                        {(!time) ?
                                <></>
                            : 
                                <TimeSelection>
                                    <form>
                                        <input  placeholder="00"
                                                type="number"
                                                name="mm"
                                                required
                                                onChange={(e) => setTime({...time, mm: e.target.value})} />
                                        <input  placeholder="00"
                                                type="number"
                                                name="ss"
                                                required
                                                onChange={(e) => setTime({...time, ss: e.target.value})} />
                                    </form>
                                    <span>Set time you think you will spande </span>
                                </TimeSelection> 
                        } 
                    </TimeSettings>
                <AddTask    onClick={(event) => submitNewTask(event)} 
                            type="submit">Add Task</AddTask>
            </TaskForm>

            <TaskSection>
                {tasks.map((task) => Task(task.name, task.time))}
            </TaskSection>
        </ToDoHTML>)
}

const TaskSection = styled.section`
`
const TaskHTML = styled.div`
`

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
        margin-bottom: 5px;
    }
`
const TimeSettings = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    button{
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        width: 40px;
        height: 20px;
        border: none;
        border-radius: 5px;
        font-weight: 500;
        font-family: 'Roboto Condensed', sans-serif;
        margin-right: 7px;
    }
    span{
        font-family: 'Roboto Condensed', sans-serif;
        font-style: italic;
        font-size: 10px;
        color: #808080;
    }

`
const TimeSelection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    form {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    input {
        display: flex;
        text-align: center;
        width: 25px;
        height: 20px;
        margin-bottom: 0;
        margin-right: 3px;
    }
`
const AddTask = styled.button`
    border: none;
    border-radius: 5px;
    padding: 3px;
    font-family: 'Roboto Condensed', sans-serif;
    background-color: #2a6a5c;
    color: white;
`