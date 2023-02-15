import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

import { SlControlPlay, SlControlPause } from "react-icons/sl";
import { MdDownloadDone } from "react-icons/md";

export function TimerComponent({time}){
    //format time
    function formatTime(time){
        let minutes = Math.floor(time / 60)
        let seconds = Math.floor(time - (minutes*60))
    
        if(minutes <= 10) minutes = `0${minutes}`
        if(seconds <= 10) seconds = `0${seconds}`
        
        return `${minutes} : ${seconds}`
    }
    
    const formatedTime = formatTime(time)

    const [checkTask, setCheckTask] = useState(false)
    const [coundtDown, setCountDown] = useState(time)
    const [play, setPlay] = useState(false)
    const [stop, setStop] = useState(false)
    const timeId = useRef()

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

    return (
        <TimerComponentHTML>
            {(checkTask) ?
                    <CheckTaskHTML>
                        <TextCheckTask>Is the task done ?</TextCheckTask>
                        <section>
                            <ConfirmButton> Yes ! </ConfirmButton>
                            <ReturnToTaskButton onClick={() => {
                                setCheckTask(false)
                                setStop(false) 
                                setPlay(!play)}} > 
                                No... 
                            </ReturnToTaskButton>
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
                                    setStop(true)
                                    setCheckTask(true)
                                }}
                                style={{
                                    fontSize: '30',
                                    color: 'white',
                                    margin: '5px'
                                }}/>
                        </Buttons> 
                    </>   }
        </TimerComponentHTML>
        )
}

const TimerComponentHTML = styled.div`
    display: flex;
    flex-direction: column;
`
const Clock = styled.p`
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