import { useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"

import { SlControlPlay, SlControlPause } from "react-icons/sl";
import { MdDownloadDone } from "react-icons/md";

import { CheckingTask } from "./CheckBoxTask.js";
import userContext from "../../contexts/userContext.js";

export function TimerComponent({ time }) {
    const mimAndSecond = time.split(':')
    const sumTime = Number(mimAndSecond[0] * 60) + Number(mimAndSecond[1])
    const [coundtDown, setCountDown] = useState(sumTime)
    
    const [checkTask, setCheckTask] = useState(false)
    const [play, setPlay] = useState(false)
    const [stop, setStop] = useState(false)

    const { workedTask, setWorkedTask } = useContext(userContext)
    const [lastTime, setLastTime] = useState('')
   
    const timeId = useRef() //The useRef Hook allows you to persist values between renders.

    useEffect( () => {
        timeId.current = setInterval( () => {
            setCountDown(prev =>  prev - 1)
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

        if(minutes <= 10) minutes = `0${minutes}`
        if (seconds <= 10) seconds = `0${seconds}`
        
        return `${minutes} : ${seconds}`
    }
    //noBUtton from checking Screen before finish task
    const noButton = () => {
        setCheckTask(false)
        setStop(false)
        setPlay(!play)
    }

    function getCurrentTime() {
       const stringCurrentTime = document.getElementsByTagName("span")[0]
        if (stringCurrentTime) {
            return stringCurrentTime.innerText.replaceAll(' ', '')   
        }
    }

    return (
        <TimerComponentHTML>
            {(checkTask) ?
                <CheckingTask   childToParent={noButton}/>
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
                                    setLastTime(getCurrentTime())
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