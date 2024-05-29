import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/pages/dashboardpage.css';
import {DashboardSlidePreview} from "./dashboardslidepreview";
import {DashboardSlides} from "./dashboardslides";


export function DashboardContainer({ project }) {
    const location = useLocation();
    const locationState = location.state || {};
    const [events, setEvents] = useState(locationState.events || ['Sprint meeting']);
    const [deadlines, setDeadlines] = useState(locationState.deadlines || ['Weekly reports']);
    const navigate = useNavigate();
    const [currentProject, setCurrentProject] = useState({});

    const handleUpdateClick = () => {
        const state = { events, deadlines };
        navigate(`/display`, {
            state: state
        });
    };

    return (
        <div className="dashboard-container">
            <div className="settings-sidebar">
                <h2>Settings {project.name} Slides: {project.slideCount}</h2>
                <div>
                    <h3>Events</h3>
                    <ul>
                        {events.map((event, index) => (
                            <li key={index}>{event}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>Deadlines</h3>
                    <ul>
                        {deadlines.map((deadline, index) => (
                            <li key={index}>{deadline}</li>
                        ))}
                    </ul>
                </div>
                <div className="buttons">
                    <button className="move-button" onClick={handleUpdateClick}>Update</button>
                    <button className="move-button" onClick={handleUpdateClick}>Open Display</button>
                </div>
            </div>
            <DashboardSlides projectID={ project._id }/>
        </div>
    );
}