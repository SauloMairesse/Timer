import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { SlControlPlay } from "react-icons/sl";
import userContext from "../contexts/userContext";

export function ToDo() {
    const {taskTime, setTaskTime} = React.useContext(userContext)
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: '',
        mm: parseInt("00"),
        ss: parseInt("00")
    })
    const [tasks, setTasks] = useState([])
    const [recall, setRecall] = useState(true)

    useEffect(() => {
        const BASE_URL = process.env.REACT_APP_BASE_URL
        const promise = axios.get(`${BASE_URL}/task/1`)
        promise.then((res) => {
            setTasks(res.data)
        } )
        promise.catch( (e) => {
            console.log('erro catch post newTask :', e)
        })
    } , [recall])

    function handleForm(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        console.log('data :', data)
    }

    function submitNewTask(event) {
        const BASE_URL = process.env.REACT_APP_BASE_URL
        const newTask = {
            name: data.name,
            time: `${data.mm}:${data.ss}`,
            userId: 1
        }

        const promise = axios.post(`${BASE_URL}/newtask`, newTask)
        promise.then((res) => {
            console.log(`resposta postagem : `, res)
            const btn = document.getElementById('btn')
            console.log('btn :', btn)
            btn.addEventListener('click', function handleClick() {
                console.log('cliquei no botao')
                const inputs = document.querySelectorAll('name, mm, ss');
                inputs.forEach(input => { input.value = ''});
            } )
        })
        promise.catch( (e) => {
            console.log('erro catch post newTask :', e)
        })
    }

    function Task(name, time) {
        return (
            <TaskHTML>
                <div>
                    <h1> {name} </h1>
                    <h2> {time} </h2>
                </div>
                <SlControlPlay 
                    onClick={() => {
                        setTaskTime({mm: Number(time.slice(0,2)), ss: Number(time.slice(3))})
                        navigate('/timer')
                    }}
                    style={{
                        justifyContent: 'center',
                        fontSize: '20',
                        color: 'white',
                        margin: '5px'
                    }}/>
            </TaskHTML> )
    }

    return (
        <ToDoHTML>
            <header>
                <BsArrowLeft onClick={() => {
                        setTaskTime(false)
                        navigate('/')
                    }
                } 
                                style={ {
                                    display: 'flex',
                                    color: 'white',
                                    fontSize: '30',
                                    position: 'fixed',
                                    left: '20px'
                                } }/>
                <p>To Do List</p>
            </header>      

            <TaskForm   onSubmit={ (event) => {
                        event.preventDefault()
                        setRecall(!recall)
                        submitNewTask(event)
                        event.target.reset()
                        event.target.querySelector('input[name=name]').focus()
                } }>
                <input  placeholder = "What's the new task ? "
                        type="text"
                        name="name"
                        onChange={handleForm}
                        required
                        id="name" />
                <span>Set time you think you will spande </span>
                <div>
                    <input  placeholder="00"
                            type="number"
                            name="mm"
                            required
                            onChange={handleForm} />
                    <input  placeholder="00"
                            type="number"
                            name="ss"
                            required
                            onChange={ handleForm } />
                </div>

                <ButtonAddTask type="submit"
                                id="btn">
                    Add Task
                </ButtonAddTask>
            </TaskForm>

            <TaskSection>
                {tasks.map((task) => Task(task.name, task.time))}
            </TaskSection>
        </ToDoHTML>)
}

const TaskSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
`

const TaskHTML = styled.div`
    display: flex;
    justify-content: space-between;
    width: 300px;
    height: 50px;
    margin: 5px;
    padding: 5px 10px 5px 5px;
    border: solid #bacfca 3px;
    border-radius: 10px;
    font-family: 'Roboto Condensed', sans-serif;
    color: white;
    h1 {
        width: 230px;
        border-bottom: solid #bacfca 1px;;
        margin-bottom: 2px;
    }
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
    width: 300px;
    flex-direction: column;
    background-color:#bacfca;
    padding: 10px;
    border-radius: 10px;
    span { 
        font-family: 'Roboto Condensed', sans-serif;
        color: #346b5c;
        font-size: 15px;
        margin-bottom: 5px;
    }
    input {
        border: none;
        border-radius: 5px;
        height: 30px;
        margin-bottom: 5px;
    }
    div {
        display: flex;
        input {
            width: 50px;
            margin-right: 10px;
        }
    }
`
const ButtonAddTask = styled.button`
    border: none;
    border-radius: 5px;
    padding: 3px;
    font-family: 'Roboto Condensed', sans-serif;
    background-color: #2a6a5c;
    color: white;
`
