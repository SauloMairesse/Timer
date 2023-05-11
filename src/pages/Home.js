import React from "react";
import styled from "styled-components";
import { TimerOption } from "../components/homeFunction/TimerOption";
import { ToDoOption } from "../components/homeFunction/ToDoOption";
import userContext from "../contexts/userContext";
import { useEffect } from "react";
import axios from "axios";

export function Home() {
    const { workedTask, setWorkedTask } = React.useContext(userContext)
    const { lastTime, setLastTime } = React.useContext(userContext)
    console.log('objetos para envio :', workedTask, lastTime)

    useEffect(() => {
        if (workedTask.id && lastTime !== workedTask.time) {
            const BASE_URL = process.env.REACT_APP_BASE_URL
            const userId = 1
            const newTaskUpdated = {
                id: workedTask.id,
                name: workedTask.name,
                time: workedTask.time,
                userId: userId,
                newTime: lastTime
            }
            console.log('dados : ', BASE_URL, newTaskUpdated,)
            const promise = axios.put(`${BASE_URL}/task/time/${workedTask.id}`, newTaskUpdated)
            promise.then((res) => {
                console.log('response :', res)
                setWorkedTask(false)
                setLastTime('')
            } )
            promise.catch( (e) => {
                console.log('erro catch put update task in home:', e)
            })
         }
    } , [])

    return (
        <HomeBox>
            <header> HOME : </header>
            {console.log('lastTime, setLastTime : ', lastTime, workedTask)}
            <Functions>
                <TimerOption />
                <ToDoOption />
            </Functions>
        </HomeBox> )
}

const Functions = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    align-items: center;
    border-radius: 15px 15px 0 0;
    background-color: #bacfca;
    padding-top: 40px;
`
const HomeBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    header {
        display: flex;
        font-family: 'Roboto Condensed', sans-serif;
        color: white;
        font-size: 30px;
        background-color: #2a6a5c;
        justify-content: center;
        align-items: center;
        height: 200px;
        width: 100%;
    }
`
