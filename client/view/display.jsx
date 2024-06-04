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
Pr. 30.05.2024 så rendrer den kun 1 spesifikk slidedisplay.jsx.
Vi skal utvikle det slik at displaypage skal rendre alle slides i et prosjekt med status "aktiv"
Jokubas ordner dette.
============================================================================================
*/

export function Display() {
    const { displayProject, setDisplayProject } = useContext(AppContext)

    const [ws, setWs] = useState();
    const [projectName, setProjectName] = useState("");
    const [projectSlides, setProjectSlides] = useState([]);
    const [slideSwitch, setSlideSwitch] = useState(false);
    const [arrayIndex, setArrayIndex] = useState(0);
    const [prevProject, setPrevProject] = useState("");


    const currentSlide = projectSlides[arrayIndex] || {};

    const fetchProject = async () => {
            console.log("I was activated (fetchProject)")
            const getProject = await fetch(`/api/project/${displayProject}`)
            const newProject = await getProject.json();

            setProjectName(newProject.name)
    }

    const fetchProjectSlides = async () => {
        console.log("I was activated (fetchProjectSlides)")
        const getSlides = await fetch(`/api/slide/${displayProject}`)
        const newSlides = await getSlides.json();

        setProjectSlides(newSlides)
    }

    const slideRotation = async () => {
        if (prevProject !== displayProject) {

            setArrayIndex(0)
            setPrevProject(displayProject)
            await fetchProject()
            await fetchProjectSlides()
        }

        if (arrayIndex === (projectSlides.length - 1)) {
            setArrayIndex(0)
        } else {
            setArrayIndex(prev => prev + 1)
        }
        setSlideSwitch(prev => !prev)
    }

    useEffect(() => {
        const ws = new WebSocket("wss://lightbeam-smidig-dev-393006ce2df9.herokuapp.com/")
        ws.onmessage = (event) => {
            const serverResponse = JSON.parse(event.data)
            if (serverResponse.projectID !== null) {
                setDisplayProject(serverResponse.projectID)
            }
        }
        setWs(ws)
        setTimeout(slideRotation, 3000)
        console.log("Display Rendering Project: " + JSON.stringify(displayProject))
    }, [projectSlides, slideSwitch]);

    return (<div>
            <div className="menu-container">
                <div className='menu-box'>
                    <div>Project: {projectName}</div>
                    <div className="content">
                        <h2>Today's menu</h2>
                        <div className="spacer"></div>
                        <span className="input"><h3>{currentSlide.text_01}</h3></span>
                        <div className="line"></div>
                        <span className="input">{currentSlide.text_02}</span>
                        <span className="input">{currentSlide.text_03}</span>
                        <span className="input">{currentSlide.text_04}</span>
                        <span className="input"><h3>{currentSlide.text_07}</h3></span>
                        <div className="line"></div>
                        <span className="input">{currentSlide.text_08}</span>
                        <span className="input">{currentSlide.text_09}</span>
                    </div>
                </div>
                <div className="image-box">
                    <img src={long_food} alt=""/>
                </div>
            </div>
        </div>
    );
}
