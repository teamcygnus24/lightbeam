import React, {useEffect, useState} from 'react';
import "../styles/pages/displaypage.css"
import {set} from "mongoose";

export function Display({ displayChange }) {
    const [slide, setSlide] = useState({})

    const fetchSlide = async () => {
        const getSlide = await fetch(`/api/slide/66571e98a993a8ee8e9c3f24&6655f10157e8816e5eedbd55`)
        const newSlide = await getSlide.json();

        setSlide(newSlide)
    }

    useEffect(() => {
        fetchSlide();
        console.log("Display Render")
    }, [displayChange]);

    return (
        <div className="preview">
            <div className="content">
                {slide.text}
            </div>
        </div>
    );
}
