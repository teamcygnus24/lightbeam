import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/pages/dashboardpage.css';


export function DashboardContainer({ project }) {
    const location = useLocation();
    const locationState = location.state || {};
    const [events, setEvents] = useState(locationState.events || ['Sprint meeting']);
    const [deadlines, setDeadlines] = useState(locationState.deadlines || ['Weekly reports']);
    const navigate = useNavigate();
    const [currentProject, setCurrentProject] = useState({});


    const handleEventChange = (index, event) => {
        const newEvents = [...events];
        newEvents[index] = event.target.innerText;
        setEvents(newEvents);
    };

    const handleDeadlineChange = (index, event) => {
        const newDeadlines = [...deadlines];
        newDeadlines[index] = event.target.innerText;
        setDeadlines(newDeadlines);
    };

    const handleUpdateClick = () => {
        const state = { events, deadlines };
        navigate(`/display`, {
            state: state
        });
    };

    return (
        <div className="dashboard-container">
            <div className="settings-sidebar">
                <h2>Settings {project.name} {project.slideCount}</h2>
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
            <div className="preview">
                <div className="content">
                    <div className="events">
                        <h3>Events</h3>
                        {events.map((event, index) => (
                            <div
                                key={index}
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleEventChange(index, e)}
                            >
                                {event}
                            </div>
                        ))}
                    </div>
                    <div className="deadlines">
                        <h3>Deadlines</h3>
                        {deadlines.map((deadline, index) => (
                            <div
                                key={index}
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleDeadlineChange(index, e)}
                            >
                                {deadline}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}