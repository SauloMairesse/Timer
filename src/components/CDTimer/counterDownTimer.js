import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

import { formatTime } from "./functions/time";

import { SlControlPlay,SlControlPause } from "react-icons/sl";
import { MdDownloadDone } from "react-icons/md";

export function TimerComponent({time}){
    const formatedTime = formatTime(time)

    const [coundtDown, setCountDown] = useState(time)
    const timeId = useRef()

    useEffect( () => {
        timeId.current = setInterval( () => {
            setCountDown(prev =>  prev - 1)
        }, 1000)
        return () => clearInterval(timeId.current)
    }, [])
    useEffect(() => {
        if(coundtDown == 0) {
            clearInterval(timeId.current)
        }
    }, [coundtDown])

    return (
        <TimerComponentHTML>
            <Clock>{formatTime(coundtDown)}</Clock>
            <Buttons>
               <SlControlPlay style={{
                    fontSize: '25',
                    color: 'white',
                    margin: '5px'
               }}/>
               <SlControlPause style={{
                    fontSize: '23',
                    color: 'white',
                    margin: '5px'
               }}/>
               <MdDownloadDone style={{
                    fontSize: '30',
                    color: 'white',
                    margin: '5px'
               }}/>
            </Buttons> 
        </TimerComponentHTML>
        )
}

const TimerComponentHTML = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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