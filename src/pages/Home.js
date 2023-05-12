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

    return (
        <HomeBox>
            <header> HOME : </header>
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
