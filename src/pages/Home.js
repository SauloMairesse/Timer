import { useNavigate } from "react-router-dom";
import React from "react";
import userContext from "../contexts/userContext";

export function Home() {
    const navigate = useNavigate()

    const {user, setUser} = React.useContext(userContext)

    return ( <>
        
        </>)
}