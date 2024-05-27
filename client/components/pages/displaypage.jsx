import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../resources/styles/dashboard.css';

export function Display() {
    const location = useLocation();
    const state = location.state || {};

    const { elements = [], image = { src: '', position: { x: 0, y: 0 }, scale: 1 } } = state;

    return (
        <div className="preview">
            <div className="aspect-ratio-box">
                <div className="aspect-ratio-inner display-content">
                    {elements.map(el => (
                        <div
                            key={el.id}
                            style={{
                                position: 'absolute',
                                left: `${el.position.x}px`,
                                top: `${el.position.y}px`,
                                border: '1px solid #000',
                                padding: '5px'
                            }}
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
            </div>
            <img className="stretch-background" src="/path/to/your/background-image.jpg" alt="Background" />
        </div>
    );
}
