import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

export function TimerComponent({time}){
    const formatTime = (time) => {
        let minutes = Math.floor(time / 60)
        let seconds = Math.floor(time - (minutes*60))

        if(minutes <= 10) minutes = `0${minutes}`
        if(seconds <= 10) seconds = `0${seconds}`
        return `${minutes} : ${seconds}`
    }

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
        <Clock>{formatTime(coundtDown)}</Clock>
        )
}

const Clock = styled.p`
    font-family: 'Orbitron', sans-serif;
    color: white;
    font-size: 30px;
`