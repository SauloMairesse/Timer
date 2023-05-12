import styled from "styled-components"
import { useNavigate } from "react-router-dom"

export function CheckingTask({childToParent}) {
    const navigate = useNavigate()
    

    return (
            <CheckTaskHTML>
                <TextCheckTask>Is the task done ?</TextCheckTask>
                    <section>
                <ConfirmButton onClick={() => {
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