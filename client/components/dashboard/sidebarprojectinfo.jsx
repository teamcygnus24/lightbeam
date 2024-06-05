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

    const { currentProject, setShowBackButton, removeSlideClicked, setRemoveSlideClicked } = useContext(AppContext)

    const [addSlideClicked, setAddSlideClicked] = useState(false);



    const handleWS = async () => {

        if (ws) {
            ws.send(JSON.stringify({projectID: currentProject._id, slideID: null, displayChange: null}))
        }
    }

    const toggleAddSlide = async ()=>{
        if (removeSlideClicked){
            setRemoveSlideClicked(false)
        }
        setAddSlideClicked(prev => !prev);
        setShowBackButton(false);
    }
    const toggleRemoveSlide = async ()=>{
        if (addSlideClicked){
            setAddSlideClicked(false)
        }
        setRemoveSlideClicked(prev => !prev);
    }


    useEffect(() => {
        const ws = new WebSocket("wss://lightbeam-smidig-dev-393006ce2df9.herokuapp.com/");
        ws.onmessage = (event) => {
            console.log(event.data)
        }
        setShowBackButton(true);
        setRemoveSlideClicked(false);
        setWs(ws)
    }, []);

    return (
        <div className="settings-sidebar">
            <h2>Project: {currentProject?.name}</h2>
            <h3>Slides: {currentProject?.slideCount}</h3>
            <div className="buttons">
            <button className="move-button" onClick={toggleAddSlide}>Add slide</button>
            {removeSlideClicked ? <button className="move-button" style={{background: "crimson"}} onClick={toggleRemoveSlide}>Remove slide</button> :
                <button className="move-button" onClick={toggleRemoveSlide}>Remove slide</button>}
                <button className="move-button" onClick={handleWS}>Set Active</button>
            <button className="move-button" onClick={() => navigate('/projects')}>Back</button>
            </div>
            {addSlideClicked && (<Templates/>)}

        </div>
    );
}

