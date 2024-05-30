import React, { useState, useEffect } from 'react';

export function Editor() {
    const [state, setState] = useState({
        elements: [],
        image: { src: '', position: { x: 0, y: 0 }, scale: 1 },
        weather: null,
        location: '',
        weatherIcon: ''
    });

    useEffect(() => {
        const handleMessage = (event) => {
            console.log('Message received in Editor:', event.data); // Debugging log
            if (event.data) {
                setState(event.data);
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    const handleTextChange = (id, html) => {
        const updatedElements = state.elements.map(el => el.id === id ? { ...el, text: html } : el);
        const newState = {
            ...state,
            elements: updatedElements
        };
        setState(newState);

        // Send the updated state back to the parent component
        window.parent.postMessage(newState, '*');
    };

    const handleImagePositionChange = (newPosition) => {
        const newState = {
            ...state,
            image: {
                ...state.image,
                position: newPosition
            }
        };
        setState(newState);

        // Send the updated state back to the parent component
        window.parent.postMessage(newState, '*');
    };

    const { elements = [], image = { src: '', position: { x: 0, y: 0 }, scale: 1 }, weather, location, weatherIcon } = state;

    return (
        <div className="editor">
            {weather && (
                <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    <div>{location}</div>
                    <div>{weather}</div>
                    <img src={weatherIcon} alt="Weather Icon" />
                </div>
            )}
            {elements.map(el => (
                <div
                    key={el.id}
                    contentEditable
                    suppressContentEditableWarning
                    style={{
                        position: 'absolute',
                        left: `${el.position.x}px`,
                        top: `${el.position.y}px`,
                        border: '1px solid #000',
                        padding: '5px',
                        cursor: 'text',
                        whiteSpace: 'pre-wrap', // Preserve whitespace and new lines
                        overflowWrap: 'break-word' // Handle long words
                    }}
                    onBlur={(e) => handleTextChange(el.id, e.target.innerHTML)}
                    dangerouslySetInnerHTML={{ __html: el.text }}
                />
            ))}
            {image.src && (
                <div style={{
                    position: 'absolute',
                    left: `${image.position.x}px`,
                    top: `${image.position.y}px`,
                    transform: `scale(${image.scale})`
                }}>
                    <img src={image.src} alt="Uploaded" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                </div>
            )}
        </div>
    );
}
