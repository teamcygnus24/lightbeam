import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/pages/dashboardpage.css';


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

        const updateSlide = await fetch(`/api/slide/${slideInfo.slideID}`, {
            method: "PUT",
            body: JSON.stringify({
                text: newText
                }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const slideUpdate = await updateSlide.json();

        setDisplayChange(prev => !prev);
        console.log(slideUpdate)

    };

    return (
        <div className="settings-sidebar">
            <h2>Slide: {slideInfo.slideID} Template: {slideInfo.templateID}</h2>
            <div className="buttons">
                <form onSubmit={handleUpdate}>
                    <h4>Change Slide Text</h4>
                    <input type="text" value={newText} onChange={(e) => setNewText(e.target.value)}/>
                    <button className="move-button">Create Display</button>
                </form>
            </div>
        </div>
    );
}