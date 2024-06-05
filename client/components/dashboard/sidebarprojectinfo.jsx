import React, {useContext, useEffect, useState} from 'react';
import '../styles/view/dashboard.css';
import {AppContext} from "../../application";
import { useNavigate } from 'react-router-dom';

/*
============================================================================================
PROJECT INFO
-----------------
Bare en info side. ikke noe spess.
============================================================================================
*/ 
export function Sidebarprojectinfo() {

    const [ws, setWs] = useState();

    const navigate = useNavigate();

    const { currentProject } = useContext(AppContext)

    const [addSlideButton, checkedAddSlideButton] = useState();

    const handleWS = async () => {

        if (ws) {
            ws.send(JSON.stringify({projectID: currentProject._id, slideID: null, displayChange: null}))
        }
    }

    const toggleAddSlide= async () =>{

    }

    useEffect(() => {
        const ws = new WebSocket("wss://lightbeam-smidig-dev-393006ce2df9.herokuapp.com/");
        ws.onmessage = (event) => {
            console.log(event.data)
        }
        setWs(ws)
    }, []);

    return (
        <div className="settings-sidebar">
            <h2>Project: {currentProject.name}</h2>
            <h3>Slides: {currentProject.slideCount}</h3>
            <button className="move-button">Add slide</button>
            <button className="move-button">Remove slide</button>
            <button className="move-button" onClick={handleWS}>Set Active</button>
            <button className="move-button" onClick={()=> navigate('/projects')}>Back</button>
        </div>
    );
}