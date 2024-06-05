import React, {useContext, useEffect, useState} from 'react';
import '../styles/view/dashboard.css';
import {AppContext} from "../../application";
import { useNavigate } from 'react-router-dom';
import {Templates} from "./templates";
import {Slides} from "./slides";

/*
============================================================================================
PROJECT INFO
-----------------
Bare en info side. ikke noe spess.
============================================================================================
*/

/*{removeSlideClicked && <DashboardContainer project={project}/>}*/
export function Sidebarprojectinfo() {

    const [ws, setWs] = useState();

    const navigate = useNavigate();

    const { currentProject, setShowBackButton } = useContext(AppContext)

    const [addSlideClicked, setAddSlideChecked] = useState(false);

    const [removeSlideClicked, setRemoveSideClicked] = useState(false);


    const handleWS = async () => {

        if (ws) {
            ws.send(JSON.stringify({projectID: currentProject._id, slideID: null, displayChange: null}))
        }
    }

    const toggleAddSlide = async ()=>{
        if (removeSlideClicked){
            setRemoveSideClicked(false)
        }
        setAddSlideChecked(prevState => !prevState);
        setShowBackButton(false);
    }
    const toggleRemoveSlide = async ()=>{
        if (addSlideClicked){
            setAddSlideChecked(false)
        }
        setRemoveSideClicked(prevState => !prevState);

    }


    useEffect(() => {
        const ws = new WebSocket("wss://lightbeam-smidig-dev-393006ce2df9.herokuapp.com/");
        ws.onmessage = (event) => {
            console.log(event.data)
        }
        setShowBackButton(true);
        setWs(ws)
    }, []);

    return (
        <div className="settings-sidebar">
            <h2>Project: {currentProject?.name}</h2>
            <h3>Slides: {currentProject?.slideCount}</h3>
            <div className="buttons">
            <button className="move-button" onClick={toggleAddSlide}>Add slide</button>
            <button className="move-button" onClick={toggleRemoveSlide}>Remove slide</button>
            <button className="move-button" onClick={handleWS}>Set Active</button>
            <button className="move-button" onClick={() => navigate('/projects')}>Back</button>
            </div>
            {removeSlideClicked && (<Slides/>)}
            {addSlideClicked && (<Templates/>)}

        </div>
    );
}

