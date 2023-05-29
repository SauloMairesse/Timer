import { useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"

import { SlControlPlay, SlControlPause } from "react-icons/sl";
import { MdDownloadDone } from "react-icons/md";

import { CheckingTask } from "./CheckBoxTask.js";
import userContext from "../../contexts/userContext.js";

import { useNavigate } from "react-router-dom"
import React from "react";
import axios from "axios";

export function TimerComponent({ time }) {
    const mimAndSecond = time.split(':')
    const sumTime = Number(mimAndSecond[0] * 60) + Number(mimAndSecond[1])
    const [coundtDown, setCountDown] = useState(sumTime)
    const [checkTask, setCheckTask] = useState(false)
    const [play, setPlay] = useState(false)
    const [stop, setStop] = useState(false)
    const { workedTask, setWorkedTask } = useContext(userContext)
    const { lastTime, setLastTime }  = useContext(userContext)   
    const timeId = useRef() //The useRef Hook allows you to persist values between renders.

    const navigate = useNavigate();

    useEffect( () => {
        timeId.current = setInterval( () => {
            setCountDown(prev => prev - 1)
            console.log('tempo : ', Number.isInteger(timeId.current))
        }, 1000)
        return () => clearInterval(timeId.current)
    }, [play])

    useEffect(() => {
        if(coundtDown == 0 || stop) {
            clearInterval(timeId.current)
        }
    }, [coundtDown])

    function formatTime(time){
        let minutes = Math.floor(time / 60)
        let seconds = Math.floor(time - (minutes*60))

        if(minutes < 10) minutes = `0${minutes}`
        if (seconds < 10) seconds = `0${seconds}`
        
        return `${minutes} : ${seconds}`
    }

    function getCurrentTime() {
       const stringCurrentTime = document.getElementsByTagName("span")[0]
        if (stringCurrentTime) {
            const time = stringCurrentTime.innerText.replaceAll(' ', '')   
            setLastTime(time)
        }
    }

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
            })
            promise.catch( (e) => { console.log('erro catch put update task in home:', e) })
            return
        }
        setWorkedTask(false)
        setLastTime('')
    }

    return (
        <TimerComponentHTML>
            {(checkTask) ?
                <CheckTaskHTML>
                    <TextCheckTask>Is the task done ?</TextCheckTask>
                    <section>
                        <ConfirmButton onClick={() => {
                            requestDoneTime()
                            navigate('/')
                        }}>
                            Yes !
                        </ConfirmButton>
                        <NotButton onClick={() => {
                            setCheckTask(false)
                            setStop(false)
                            setPlay(!play)
                        }} > 
                            No...
                        </NotButton>
                    </section>
                </CheckTaskHTML>    
                    : 
                <>
                    <Clock>{formatTime(coundtDown)}</Clock>
                    <Buttons>
                        <SlControlPlay
                                onClick={() => {
                                    setPlay(!play)
                                    setStop(false)
                                }}
                                style={{
                                    fontSize: '25',
                                    color: 'white',
                                    margin: '5px'
                                }}/>
                        <SlControlPause 
                                onClick={() => { 
                                    setStop(true)
                                }}
                                style={{
                                    fontSize: '23',
                                    color: 'white',
                                    margin: '5px'
                                }}/>
                        <MdDownloadDone 
                                onClick={() => { 
                                    getCurrentTime()
                                    setStop(true)
                                    setCheckTask(true)
                                }}
                                style={{
                                    fontSize: '30',
                                    color: 'white',
                                    margin: '5px'
                                }}/>
                    </Buttons> 
                </>}
        </TimerComponentHTML>
        )
}

const TimerComponentHTML = styled.div`
    display: flex;
    flex-direction: column;
`
const Clock = styled.span`
    font-family: 'Orbitron', sans-serif;
    color: white;
    font-size: 30px;
    margin-bottom: 20px;
`       
const Buttons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

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
const NotButton = styled.button`
  border: none;
  border-radius: 10px;
  width: 80px;
  height: 25px;
  color: white;
  background: red;
  margin: 5px;
`
const TextCheckTask = styled.span`
    font-family: 'Roboto Condensed', sans-serif;
    color: white;
    font-size: 25px;
    margin-bottom: 50px;
`