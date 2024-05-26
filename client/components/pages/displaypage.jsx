import React from 'react';
import { useLocation } from 'react-router-dom';

export function Display() {
    const location = useLocation();
    const state = location.state;

    if (!state) {
        return <div>No data available</div>;
    }

    const { weather, location: loc, weatherIcon, events, deadlines, scale, position, logo } = state;

    return (
        <div className="preview">
            <div className="weather">
                <img
                    src={logo}
                    alt="Logo"
                    style={{ transform: `scale(${scale})`, position: 'absolute', left: `${position.x}px`, top: `${position.y}px` }}
                />
                <div>
                    {loc && <div>{loc}</div>}
                    {weatherIcon && <img src={weatherIcon} alt="Weather Icon" />}
                    {weather ? weather : 'Loading weather data...'}
                </div>
            </div>
            <div className="content">
                <div className="events">
                    <h3>Events</h3>
                    {events.map((event, index) => (
                        <div key={index}>
                            {event}
                        </div>
                    ))}
                </div>
                <div className="deadlines">
                    <h3>Deadlines</h3>
                    {deadlines.map((deadline, index) => (
                        <div key={index}>
                            {deadline}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
