import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/view/dashboard.css';
import {AppContext} from "../../application";
import Menu from "../templates/menu";
import Info from "../templates/info";
import Birthday from "../templates/birthday";

/*
============================================================================================
SIDEBAR EDITOR
-----------------
Dette er editor delen av DASHBOARD CONTAINER.
Her legges det opp Input fields hvor brukeren sender data inn. Denne dataen lagres i MongoDB.
Ved trykk av buttons, så vil funksjonen "setDisplayChange" trigges.
Denne funksjonen trigger useEffect i Slidepreview, som refresher Preview'en.
I bunn og grunn så får den preview'en til å laste inn på nytt igjen, med nyeste data.
(Hence hvorfor du ser 1 millisekund flimring når man gjør en update). 
(DETTE GÅR FINT! Brukeren får en feeling av at noe skjer.)
============================================================================================
*/

export function Sidebareditor() {
    const { slideInfo, setSlideInfo, displayChange, setDisplayChange, setSlideSelected, currentProject } = useContext(AppContext);

    const navigate = useNavigate();
    const [ws, setWs] = useState();

    //States
    const [slideUpdate, setSlideUpdate] = useState(false);

    // Inputs
    const [InputText_01, setInputText_01] = useState("");
    const [InputText_02, setInputText_02] = useState("");
    const [InputText_03, setInputText_03] = useState("");
    const [InputText_04, setInputText_04] = useState("");
    const [InputText_05, setInputText_05] = useState("");
    const [InputText_06, setInputText_06] = useState("");
    const [InputText_07, setInputText_07] = useState("");
    const [InputText_08, setInputText_08] = useState("");
    const [InputText_09, setInputText_09] = useState("");
    const [InputText_10, setInputText_10] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (e.target.name === "Save") {
            const updateSlide = await fetch(`/api/slide/${slideInfo._id}`, {
                method: "PUT",
                body: JSON.stringify({
                    text_01: InputText_01,
                    text_02: InputText_02,
                    text_03: InputText_03,
                    text_04: InputText_04,
                    text_05: InputText_05,
                    text_06: InputText_06,
                    text_07: InputText_07,
                    text_08: InputText_08,
                    text_09: InputText_09,
                    text_10: InputText_10

                }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const slideUpdate = await updateSlide.json();
            setDisplayChange(prev => !prev)
            setSlideUpdate(prev => !prev)
            await handleWS("Hi", currentProject._id)
            console.log("Data: " + slideInfo._id + " " + displayChange)
        } else if (e.target.name === "Display") {
            navigate("/Display")
        }
    };

    const backToSlides = async (e) => {
        e.preventDefault();

        setSlideSelected(prev => !prev)
    }

    const handleWS = async (event, event2) => {
        ws.send(JSON.stringify( { slideChange: event, projectUpdated: event2 } ));
    }

    useEffect(() => {
        const ws = new WebSocket("wss://lightbeam-smidig-dev-393006ce2df9.herokuapp.com/");
        ws.onmessage = (event) => {
            console.log(event.data)
        }
        setWs(ws)
    }, []);

    const templateComponents = {
        "665625763da2eb37ed00af98": Menu,
        "6656257b3da2eb37ed00af9a": Info,
        "665625813da2eb37ed00af9e": Birthday
    }

    const TemplateComponent = templateComponents[currentSlide?.templateID]


    return (
        <div className="settings-sidebar">
            <h2>Slide: {slideInfo._id}</h2>
            <h2>Template: {slideInfo.templateID}</h2>

        </div>
    );
}