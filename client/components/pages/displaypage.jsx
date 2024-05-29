import React, {useEffect, useState} from 'react';
import "../styles/pages/displaypage.css"
import {set} from "mongoose";

export function Display({ displayChange }) {
    const [slide, setSlide] = useState({})

    const fetchSlide = async () => {
        const getSlide = await fetch(`/api/slide/665790ac9c5237fe18174f1a&sdfg`)
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
                {slide.text_01}
            </div>
        </div>
    );
}
