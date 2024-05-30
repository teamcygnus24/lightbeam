import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/pages/dashboardpage.css';

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

export function DashboardSideBarEditor({ project, slideInfo, setDisplayChange }) {
    const location = useLocation();
    const locationState = location.state || {};
    const [events, setEvents] = useState(locationState.events || ['Sprint meeting']);
    const [deadlines, setDeadlines] = useState(locationState.deadlines || ['Weekly reports']);
    const navigate = useNavigate();
    const [newText, setNewText] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();

        const state = { events, deadlines };

        if (e.target.name === "Save") {
            const updateSlide = await fetch(`/api/slide/${slideInfo.slideID}`, {
                method: "PUT",
                body: JSON.stringify({
                    text_01: newText
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const slideUpdate = await updateSlide.json();

            setDisplayChange(prev => !prev);
            console.log(slideUpdate)
        } else if (e.target.name === "Display") {
            navigate("/Display")
        }
    };

    return (
        <div className="settings-sidebar">
            <h2>Slide: {slideInfo.slideID} Template: {slideInfo.templateID}</h2>
            <div className="buttons">
                <form>
                    <h4>Change Slide Text</h4>
                    <input type="text" value={newText} onChange={(e) => setNewText(e.target.value)}/>
                    <button className="move-button" name="Save" type="button" onClick={handleUpdate}>Save Changes</button>
                    <button className="move-button" name="Display" type="button" onClick={handleUpdate}>Go To Display</button>
                </form>
            </div>
        </div>
    );
}