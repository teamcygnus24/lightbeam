import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/view/dashboard.css';
import {AppContext} from "../../application";

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
    const { slideInfo, displayChange, setDisplayChange, setSlideSelected, currentProject } = useContext(AppContext);

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
            const updateSlide = await fetch(`/api/slide/${slideInfo.slideID}`, {
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
            console.log("Data: " + slideInfo.slideID + " " + displayChange)
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
        const ws = new WebSocket("ws://localhost:3000/");
        ws.onmessage = (event) => {
            console.log(event.data)
        }
        setWs(ws)
    }, []);

    return (
        <div className="settings-sidebar">
            <h2>Slide: {slideInfo.slideID}</h2>
            <h2>Template: {slideInfo.templateID}</h2>
            <div className="buttons">
                <form>
                    <div className="type">Type 1:<input type="text" value={InputText_01} onChange={(e) => setInputText_01(e.target.value)} placeholder="Example: Food"/></div>
                    <div className="alternative">Alternative 1:<input type="text" value={InputText_02} onChange={(e) => setInputText_02(e.target.value)}/></div>
                    <div className="alternative">Alternative 2:<input type="text" value={InputText_03} onChange={(e) => setInputText_03(e.target.value)}/></div>
                    <div className="alternative">Alternative 3:<input type="text" value={InputText_04} onChange={(e) => setInputText_04(e.target.value)}/></div>
                    <div className="type">Type 2:<input type="text" value={InputText_07} onChange={(e) => setInputText_07(e.target.value)} placeholder="Example: Drinks"/></div>
                    <div className="alternative">Alternative 1:<input type="text" value={InputText_08} onChange={(e) => setInputText_08(e.target.value)}/></div>
                    <div className="alternative">Alternative 2:<input type="text" value={InputText_09} onChange={(e) => setInputText_09(e.target.value)}/></div>                    
                    <button className="move-button" name="Save" type="button" onClick={handleUpdate}>Save Changes</button>
                    <button className="move-button" name="Display" type="button" onClick={handleUpdate}>Go To Display</button>
                    <button className="move-button" name="Back" onClick={backToSlides}>Back</button>
                </form>
            </div>
        </div>
    );
}