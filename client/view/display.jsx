import React, {useContext, useEffect, useState} from 'react';
import "../components/styles/view/display.css"
import { AppContext } from "../application";
import Menu from "../components/templates/menu/menu";
import Birthday from "../components/templates/birthday/birthday";

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
    const [haveSlidesChanged, setHaveSlidesChanged] = useState(false)
    const [slideChange, setSlideChange] = useState(false);

    const [updatedProjectID, setUpdatedProjectID] = useState("")

    const currentSlide = projectSlides[arrayIndex] || {};

    const handleClick = () => {
        setProjectName(prev => prev + "Big Ballz")
    }

    const fetchProject = async () => {

        if (!displayProject) {
            console.log("displayProject is undefined or null")
            return;
        }

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

            setArrayIndex(-1)
            setPrevProject(displayProject)
            console.log("This shouldnt run when updating other projects that are not active")
            await fetchProject();
            await fetchProjectSlides();
        }

        if (prevProject === displayProject && slideChange !== haveSlidesChanged) {

            setArrayIndex(-1)
            setHaveSlidesChanged(slideChange)
            console.log("This shouldnt run when updating other projects that are not active")
            await fetchProjectSlides();
        }

        if (arrayIndex === (projectSlides.length - 1)) {
            setArrayIndex(-1)
        } else {
            setArrayIndex(prev => prev + 1)
        }
        setSlideSwitch(prev => !prev)
    }

    useEffect(() => {
        const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET)
        ws.onmessage = (event) => {
            const serverResponse = JSON.parse(event.data)
            console.log(`displayProject: ${displayProject}, projectUpdated: ${serverResponse.projectUpdated}`)
            if (serverResponse.projectID !== null && serverResponse.projectID !== undefined) {
                setDisplayProject(serverResponse.projectID)
                console.log(`ProjectID Recieved: ${serverResponse.projectID}`)
            }
            if (serverResponse.slideChange !== null && serverResponse.projectUpdated === displayProject){
                setSlideChange(prev => !prev)
                console.log(`Project Updated: ${serverResponse.projectUpdated}`)
            }
        }
        setWs(ws)
        const i = setInterval(() => {
            slideRotation();
        }, 3000)

        console.log("Display Rendering Project: " + JSON.stringify(displayProject))
        return () => {
            console.log("Clearing Interval")
            clearInterval(i)
            ws.close();
        };
    }, [slideSwitch, slideChange]);

    const templateComponents = {
        "665625763da2eb37ed00af98": Menu,
        "665625813da2eb37ed00af9e": Birthday
    }

    const TemplateComponent = templateComponents[currentSlide?.templateID]


    return (
        <div>
            {displayProject ? (TemplateComponent ? <TemplateComponent currentSlide={ currentSlide }/> : <div className='loading-display'>Loading</div>) : <div className='inactive-display'>Waiting for Input</div>}
        </div>
    );
}
