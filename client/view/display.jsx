import React, {useContext, useEffect, useState} from 'react';
import "../components/styles/view/display.css"
import long_food from '../resources/images/food.png';
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

export function Display() {
    const { displayChange, setDisplayChange, slideID, setSlideID, displaySlide, setDisplaySlide, slideSelected } = useContext(AppContext)

    const [ws, setWs] = useState();

    const fetchSlide = async () => {
        const getSlide = await fetch(`/api/slide/${slideID}&1`)
        const newSlide = await getSlide.json();

        setDisplaySlide(newSlide)
    }

    useEffect(() => {
        const ws = new WebSocket("wss://lightbeam-smidig-dev-393006ce2df9.herokuapp.com/")
        ws.onmessage = (event) => {
            const newSlide = JSON.parse(event.data)
            setSlideID(newSlide.slideID)
            setDisplayChange(newSlide.displayChange)
            console.log(newSlide.slideID)
        }
        setWs(ws)
        fetchSlide();
        console.log("Display Rendering Slide: " + slideID)
    }, [displayChange, slideID, slideSelected]);

    return (<div>
        <div className="menu-container">
            <div className='menu-box'>
                <div className="content">
                    <h2>Today's menu</h2>
                    <div className="spacer"></div>
                    <span className="input"><h3>{displaySlide.text_01}</h3></span>
                    <div className="line"></div>
                    <span className="input">{displaySlide.text_02}</span>
                    <span className="input">{displaySlide.text_03}</span>
                    <span className="input">{displaySlide.text_04}</span>
                    <span className="input"><h3>{displaySlide.text_07}</h3></span>
                    <div className="line"></div>
                    <span className="input">{displaySlide.text_08}</span>
                    <span className="input">{displaySlide.text_09}</span>
                </div>
            </div>
            <div className="image-box">
            <img src={long_food} alt="" />
            </div>
        </div>
    </div>
    );
}
