import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/pages/dashboardslidepreview.css';


export function DashboardSlides({ projectID }) {
    const navigate = useNavigate();
    const [slides, setSlides] = useState([]);

    const fetchSlidesFromProject = async () => {
        const projectSlides = await fetch("/api/slide/" + projectID)
        const slidesList = await projectSlides.json();

        if (projectSlides.ok) {
            console.log("Slides successfully fetches from project " + projectID + "\n" + slidesList);
            setSlides(slidesList)
        }
    }

    useEffect(() => {
        fetchSlidesFromProject();
    }, [])

    return (
        <div className="slides-main">
            <div className="slides-container">
                {slides.map((s, index) => (
                    <div className="slides-card"> Slide {projectID}</div>
                ))}
            </div>
        </div>
    );
}