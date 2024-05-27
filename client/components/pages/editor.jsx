import React, { useState, useEffect } from 'react';

export function Editor() {
    const [state, setState] = useState({
        elements: [],
        image: { src: '', position: { x: 0, y: 0 }, scale: 1 }
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

    const handleTextChange = (id, text) => {
        const updatedElements = state.elements.map(el => el.id === id ? { ...el, text } : el);
        setState(prevState => ({
            ...prevState,
            elements: updatedElements
        }));

        // Send the updated state back to the parent component
        window.parent.postMessage({ ...state, elements: updatedElements }, '*');
    };

    const { elements = [], image = { src: '', position: { x: 0, y: 0 }, scale: 1 } } = state;

    return (
        <div className="editor">
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
                        cursor: 'text'
                    }}
                    onBlur={(e) => handleTextChange(el.id, e.target.innerText)}
                >
                    {el.text}
                </div>
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
