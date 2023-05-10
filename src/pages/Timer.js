import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { TimerComponent } from "../components/Clock/counterDownTimer";
import userContext from "../contexts/userContext";

export function TimerPage() {
    const navigate = useNavigate()
    const [time, setTime] = React.useState({mm:Number(0), ss: Number(0)})
    const { workedTask, setWorkedTask } = React.useContext(userContext)

    function timeObj(timeString) {
        console.log('time string :', timeString)
        const mm = workedTask.time.slice(3)
        const ss = workedTask.time.slice(3, 6)
        const somatorio = Number(mm * 60) + Number(ss)
        console.log('somatorio :', somatorio)
        return (somatorio)
    }

    return (
        <TimerHTML>
            <header>
                <BsArrowLeft onClick={() => {
                    setWorkedTask(false)
                    navigate('/')
                }} 
                                style={ {
                                    display: 'flex',
                                    color: 'white',
                                    fontSize: '30',
                                    position: 'fixed',
                                    left: '20px'
                                } } />
                <p>Countdown Timer</p>
            </header>

                {(!workedTask) ?
                    <TimerSettingDiv>    
                        <TimeForm>
                            <label>
                                mm
                            <input  placeholder="00"
                                    type="number"
                                    name="mm"
                                    onChange={(e) => setTime({ ...time, mm: e.target.value })
                                    } />
                            </label>
                            <label>
                                ss
                                <input  placeholder="00"
                                        type="number"
                                        name="ss"
                                    onChange={(e) => setTime({ ...time, ss: e.target.value })
                                    } />
                            </label>
                        </TimeForm>
                        
                        <StartTimer onClick={() => setWorkedTask({ time: `${time.mm}:${time.ss}` })}>
                            Start
                        </StartTimer>
                    </TimerSettingDiv>
                    :
                    <TaskTimerDiv>
                        {(!workedTask.title) ? <></> : <h1>{workedTask.title}</h1> }
                        <TimerComponent time={timeObj(workedTask)} /> 
                    </TaskTimerDiv>
                }
            
        </TimerHTML>)
}

const TimerHTML = styled.div`
    display: block;
    flex-direction: column;
    width: 100%;
    height: 100%;
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
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 30vh;
    }  
`
const TimeForm = styled.form`
    display: flex;
    padding: 15px;
    border-radius: 10px;
    label {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 5px;
        font-family: 'Roboto Condensed', sans-serif;
        color: white;
    }
    input {
        display: flex;
        text-align: center;
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 10px;
        font-family: 'Roboto Condensed', sans-serif;
        font-size: 18px;
        margin-top: 2px;
        ::-webkit-outer-spin-button,
        ::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
    }
`
const StartTimer = styled.button`
    display: flex;
    width: 85px;
    height: 25px;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #2a6a5c;
    border: none;
    border-radius: 15px;
    background-color: white;
`
const TimerSettingDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30vh;
`
const TaskTimerDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30vh;
    h1 {
        display: flex;
        position: absolute;
        top: 25%;
        font-family: 'Orbitron', sans-serif;
        color: white;
        font-weight: BOLD;
        letter-spacing: 2px;
        font-size: 20px;
    }    
`