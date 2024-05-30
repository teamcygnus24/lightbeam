import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import kpmg_logo from '../../resources/images/kpmg_logo.png';
import '../../resources/styles/dashboard.css';

export function Dashboard() {
    const location = useLocation();
    const locationState = location.state || {};
    const [templateState, setTemplateState] = useState(locationState.templateState || {
        elements: [],
        image: { src: '', position: { x: 0, y: 0 }, scale: 1 },
        weather: null,
        location: '',
        weatherIcon: ''
    });
    const [showImageSettings, setShowImageSettings] = useState(!!templateState.image.src);
    const navigate = useNavigate();
    const iframeRef = useRef(null);

    useEffect(() => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow.postMessage(templateState, '*');
        }

        const handleEditorMessage = (event) => {
            if (event.data && event.data.elements) {
                setTemplateState(event.data);
            }
        };

        window.addEventListener('message', handleEditorMessage);

        return () => {
            window.removeEventListener('message', handleEditorMessage);
        };
    }, [templateState]);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=59.93&lon=10.72&altitude=90');
            const data = await response.json();
            const weatherDetails = data.properties.timeseries[0].data.instant.details;
            const temperature = weatherDetails.air_temperature;
            const weatherCondition = data.properties.timeseries[0].data.next_1_hours.summary.symbol_code;

            const newTemplateState = {
                ...templateState,
                weather: `Temperature: ${temperature}°C`,
                location: 'Oslo, Norway',
                weatherIcon: getWeatherIconUrl(weatherCondition),
                elements: [
                    { id: '1', text: 'Editable Text 1', position: { x: 100, y: 100 } },
                    { id: '2', text: 'Editable Text 2', position: { x: 500, y: 100 } }
                ]
            };
            setTemplateState(newTemplateState);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const getWeatherIconUrl = (condition) => {
        return `https://raw.githubusercontent.com/metno/weathericons/89e3173756248b4696b9b10677b66c4ef435db53/weather/svg/${condition}.svg`;
    };

    const handleTemplate1Click = () => {
        const newTemplateState = {
            elements: [
                { id: '1', text: 'Editable Text 1', position: { x: 100, y: 100 } },
                { id: '2', text: 'Editable Text 2', position: { x: 500, y: 100 } }
            ],
            image: { src: '', position: { x: 300, y: 300 }, scale: 1 }
        };
        setTemplateState(newTemplateState);
    };

    const handleTemplate2Click = async () => {
        await fetchWeatherData();
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newImage = { src: e.target.result, position: { x: 300, y: 300 }, scale: 1 };
                setTemplateState(prevState => ({
                    ...prevState,
                    image: newImage
                }));
                setShowImageSettings(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateClick = () => {
        navigate('/display', { state: templateState });
    };

    const moveImage = (direction) => {
        const step = 20;
        setTemplateState(prevState => {
            const newPos = { ...prevState.image.position };
            switch (direction) {
                case 'up':
                    newPos.y -= step;
                    break;
                case 'down':
                    newPos.y += step;
                    break;
                case 'left':
                    newPos.x -= step;
                    break;
                case 'right':
                    newPos.x += step;
                    break;
                default:
                    break;
            }
            const newState = {
                ...prevState,
                image: {
                    ...prevState.image,
                    position: newPos
                }
            };
            if (iframeRef.current) {
                iframeRef.current.contentWindow.postMessage(newState, '*');
            }
            return newState;
        });
    };

    const handleScaleChange = (e) => {
        const newScale = parseFloat(e.target.value);
        setTemplateState(prevState => {
            const newState = {
                ...prevState,
                image: {
                    ...prevState.image,
                    scale: newScale
                }
            };
            if (iframeRef.current) {
                iframeRef.current.contentWindow.postMessage(newState, '*');
            }
            return newState;
        });
    };

    return (
        <div className="dashboard-container">
            <div className="settings-sidebar">
                <h2>SETTINGS</h2>
                <div className="buttons">
                    <button className="move-button" onClick={handleTemplate1Click}>Template 1</button>
                    <button className="move-button" onClick={handleTemplate2Click}>Template 2</button>
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    {showImageSettings && (
                        <>
                            <div className="size-control">
                                <h3>Image Size</h3>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="3"
                                    step="0.1"
                                    value={templateState.image.scale}
                                    onChange={handleScaleChange}
                                />
                            </div>
                            <div className="move-buttons">
                                <h3>Move Image</h3>
                                <div className="button-group">
                                    <button className="move-button double-height" onClick={() => moveImage('left')}>Left</button>
                                    <div className="vertical-buttons">
                                        <button className="move-button" onClick={() => moveImage('up')}>Up</button>
                                        <button className="move-button" onClick={() => moveImage('down')}>Down</button>
                                    </div>
                                    <button className="move-button double-height" onClick={() => moveImage('right')}>Right</button>
                                </div>
                            </div>
                        </>
                    )}
                    <button className="move-button" onClick={handleUpdateClick}>Update</button>
                </div>
            </div>
            <div className="preview">
                <div className="aspect-ratio-box">
                    <div className="aspect-ratio-inner">
                        <iframe
                            ref={iframeRef}
                            src="/editor"
                            title="Editor Preview"
                        />
                    </div>
                </div>
                <img className="stretch-background" src="/path/to/your/background-image.jpg" alt="Background" />
            </div>
        </div>
    );
}
