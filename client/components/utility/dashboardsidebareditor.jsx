import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/pages/dashboardpage.css';
import {DashboardContainer} from "./dashboardcontainer";
import {Templates} from "./templates";

/*
============================================================================================
SIDEBAR EDITOR
-----------------
Dette er editor delen av DASHBOARD CONTAINER.
Her legges det opp Input fields hvor brukeren sender data inn. Denne dataen lagres i MongoDB.
Ved trykk av buttons, så vil funksjonen "setDisplayChange" trigges.
Denne funksjonen trigger useEffect i DashboardSlidePreview, som refresher Preview'en.
I bunn og grunn så får den preview'en til å laste inn på nytt igjen, med nyeste data.
(Hence hvorfor du ser 1 millisekund flimring når man gjør en update). 
(DETTE GÅR FINT! Brukeren får en feeling av at noe skjer.)
============================================================================================
*/

export function DashboardSideBarEditor({ slideInfo, setDisplayChange, backToSlides }) {
    const navigate = useNavigate();
    const [ws, setWs] = useState();

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
    const [channelMsg, setChannelMsg] = useState("");

    const [serverData, setServerData] = useState("")
    const [serverResponse, setServerResponse] = useState(null)

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
            await handleWS(slideInfo.slideID)

            setDisplayChange(prev => !prev);
            console.log(slideUpdate)
        } else if (e.target.name === "Display") {
            navigate("/Display")
        }
    };

    const handleWS = async (sID) => {

        ws.send(JSON.stringify({ channelMsg: sID }))
    }

    useEffect(() => {
        const ws = new WebSocket("wss://https://lightbeam-smidig-dev-393006ce2df9.herokuapp.com/");
        ws.onmessage = (event) => {
            setServerResponse(JSON.parse(event.data))
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
            <input type="text" placeholder="Channel Message" value={channelMsg} onChange={(e) => setChannelMsg(e.target.value)}/>
            <button onClick={handleWS}>Send Channel Message</button>
            <div>{serverResponse ? serverResponse.channelMsg : ""}</div>
        </div>
    );
}