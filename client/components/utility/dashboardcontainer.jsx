import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import kpmg_logo from '../../resources/images/kpmg_logo.png';
import '../styles/pages/dashboardpage.css';

export function DashboardContainer({ project }) {
    const location = useLocation();
    const locationState = location.state || {};
    const [events, setEvents] = useState(locationState.events || ['Sprint meeting']);
    const [deadlines, setDeadlines] = useState(locationState.deadlines || ['Weekly reports']);
    const [weather, setWeather] = useState(locationState.weather || null);
    const [loc, setLoc] = useState(locationState.location || '');
    const [weatherIcon, setWeatherIcon] = useState(locationState.weatherIcon || '');
    const [scale, setScale] = useState(locationState.scale || 1);
    const [position, setPosition] = useState(locationState.position || { x: 0, y: 0 });
    const [logo, setLogo] = useState(locationState.logo || kpmg_logo);
    const navigate = useNavigate();
    const [currentProject, setCurrentProject] = useState({});

    useEffect(() => {
        if (!locationState.weather) {
            fetchWeatherData();
        }
    }, []);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=59.93&lon=10.72&altitude=90');
            const data = await response.json();
            const weatherDetails = data.properties.timeseries[0].data.instant.details;
            const temperature = weatherDetails.air_temperature;
            const weatherCondition = data.properties.timeseries[0].data.next_1_hours.summary.symbol_code;

            setWeather(`Temperature: ${temperature}°C`);
            setLoc('Oslo, Norway');
            setWeatherIcon(getWeatherIconUrl(weatherCondition));
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const getWeatherIconUrl = (condition) => {
        return `https://raw.githubusercontent.com/metno/weathericons/89e3173756248b4696b9b10677b66c4ef435db53/weather/svg/${condition}.svg`;
    };

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

    const moveImage = (direction) => {
        const step = 20;
        switch (direction) {
            case 'up':
                setPosition((prev) => ({ ...prev, y: prev.y - step }));
                break;
            case 'down':
                setPosition((prev) => ({ ...prev, y: prev.y + step }));
                break;
            case 'left':
                setPosition((prev) => ({ ...prev, x: prev.x - step }));
                break;
            case 'right':
                setPosition((prev) => ({ ...prev, x: prev.x + step }));
                break;
            default:
                break;
        }
    };

    const handleUpdateClick = () => {
        const state = { weather, location: loc, weatherIcon, events, deadlines, scale, position, logo };
        navigate(`/display`, {
            state: state
        });
    };

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
