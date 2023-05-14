import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import userContext from "../../contexts/userContext.js";
import React, { useState, useEffect } from "react";
import axios from "axios";

export function CheckingTask({childToParent}) {
    const navigate = useNavigate()

    const [time, setTime] = React.useState({mm:Number(0), ss: Number(0)})
    const { workedTask, setWorkedTask } = React.useContext(userContext)
    const { lastTime, setLastTime } = React.useContext(userContext)
    const [ updateTime, setUpdateTime ] = React.useState(false)

    console.log('condições : ', workedTask, lastTime)

    function requestDoneTime() {
        if (workedTask.id && lastTime ) {
            const BASE_URL = process.env.REACT_APP_BASE_URL
            const userId = 1
            const newTaskUpdated = {
                id: workedTask.id,
                name: workedTask.name,
                time: workedTask.time,
                userId: userId,
                done: true,
                newTime: lastTime
            }
            const promise = axios.put(`${BASE_URL}/task/done/${workedTask.id}`, newTaskUpdated)
            promise.then((res) => {
                setWorkedTask(false)
                setLastTime('')
                console.log('TASK DONE :')
            })
            promise.catch( (e) => { console.log('erro catch put update task in home:', e) })
            return
        }
        setWorkedTask(false)
        setLastTime('')
}

    return (
            <CheckTaskHTML>
                <TextCheckTask>Is the task done ?</TextCheckTask>
                    <section>
                <ConfirmButton onClick={() => {
                    requestDoneTime()
                    navigate('/')
                }}>
                            Yes !
                        </ConfirmButton>
                        <ReturnToTaskButton onClick={() => {childToParent()}} > 
                            No... 
                        </ReturnToTaskButton>
                    </section>
                </CheckTaskHTML>         
    )
}

const CheckTaskHTML = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
`
const ConfirmButton = styled.button`
  border: none;
  border-radius: 10px;
  width: 80px;
  height: 25px;
  color: white;
  background: green;
  margin: 5px;
`
const ReturnToTaskButton = styled.button`
  border: none;
  border-radius: 10px;
  width: 80px;
  height: 25px;
  color: white;
  background: red;
  margin: 5px;
`
const TextCheckTask = styled.h1`
    font-family: 'Roboto Condensed', sans-serif;
    color: white;
    font-size: 25px;
    margin-bottom: 50px;
`