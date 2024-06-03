import React, {useContext, useEffect, useState} from 'react';
import "../styles/pages/displaypage.css"
import long_food from '../../resources/images/food.png';
import { useNavigate } from "react-router-dom";
import {AppContext} from "../application";
/*
============================================================================================
DISPLAY PAGE
-----------------
Dette er siden som skal legges i fullskjerm modus hos kunden på TV'en.
Den henter data fra databasen og styles med en CSS.
Pr. 30.05.2024 så rendrer den kun 1 spesifikk slide.
Vi skal utvikle det slik at displaypage skal rendre alle slides i et prosjekt med status "aktiv"
Jokubas ordner dette.
============================================================================================
*/

export function Display({ displayChange }) {
    const [slideID, setSlideID] = useState("665790ac9c5237fe18174f1a")
    const [ws, setWs] = useState();
    const [serverResponse, setServerResponse] = useState(null)

    const [slide, setSlide] = useState({})

    const fetchSlide = async () => {
        const getSlide = await fetch(`/api/slide/${slideID}&1`)
        const newSlide = await getSlide.json();

        setSlide(newSlide)
    }

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3000")
        ws.onmessage = (event) => {
            const newSlide = JSON.parse(event.data)
            setSlideID(newSlide.channelMsg)
            console.log(newSlide.channelMsg)
        }
        setWs(ws)
        fetchSlide();
        console.log("Display Rendering Slide: " + slideID)
    }, [slideID]);

    return (<div>
            <div className="menu-container">
            <div className='menu-box'>
                <div className="content">
                    <h2>Today's menu</h2>
                    <div className="spacer"></div>
                    <span className="input"><h3>{slide.text_01}</h3></span>
                    <div className="line"></div>
                    <span className="input">{slide.text_02}</span>
                    <span className="input">{slide.text_03}</span>
                    <span className="input">{slide.text_04}</span>
                    <span className="input"><h3>{slide.text_07}</h3></span>
                    <div className="line"></div>
                    <span className="input">{slide.text_08}</span>
                    <span className="input">{slide.text_09}</span>
                </div>
            </div>
            <div className="image-box">
                <img src={long_food} alt="" />
            </div>
        </div>
            <div>{serverResponse ? serverResponse.channelMsg : ""}</div>
        </div>
    );
}
