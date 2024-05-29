import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/pages/dashboardslidepreview.css';


export function DashboardSlidePreview() {
    const location = useLocation();
    const locationState = location.state || {};
    const [events, setEvents] = useState(locationState.events || ['Sprint meeting']);
    const [deadlines, setDeadlines] = useState(locationState.deadlines || ['Weekly reports']);
    const navigate = useNavigate();


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

    return (
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
    );
}