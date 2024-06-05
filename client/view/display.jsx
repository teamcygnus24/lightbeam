import React, {useContext, useEffect, useState} from 'react';
import "../components/styles/view/display.css"
import { AppContext } from "../application";
import Menu from "../components/templates/menu";
import MenuSlide from "../components/templates/menuslide";
import InfoSlide from "../components/templates/infoslide";
import EventSlide from "../components/templates/eventslide";
import BirthdaySlide from "../components/templates/birthdayslide";
import MeetingRoomSlide from "../components/templates/meetingroomslide";
import MeetingRoom from "../components/templates/meetingroom";
import Birthday from "../components/templates/birthday";
import Info from "../components/templates/info";
import EventDisplay from "../components/templates/event";

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

            setArrayIndex(0)
            setPrevProject(displayProject)
            console.log("This shouldnt run when updating other projects that are not active")
            await fetchProject();
            await fetchProjectSlides();
        }

        if (prevProject === displayProject && slideChange !== haveSlidesChanged) {

            setArrayIndex(0)
            setHaveSlidesChanged(slideChange)
            console.log("This shouldnt run when updating other projects that are not active")
            await fetchProjectSlides();
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
        };
    }, [slideSwitch]);

    const templateComponents = {
        "665625763da2eb37ed00af98": Menu,
        "6656257b3da2eb37ed00af9a": Info,
        "6656257e3da2eb37ed00af9c": EventDisplay,
        "665625813da2eb37ed00af9e": Birthday,
        "66562773d3c067b2433f976e": MeetingRoom
    }

    const TemplateComponent = templateComponents[currentSlide?.templateID]


    return (
        <div>
            {TemplateComponent ? <TemplateComponent currentSlide={ currentSlide }/> : <div>Loading</div>}
        </div>
    );
}
