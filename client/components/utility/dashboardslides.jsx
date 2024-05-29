import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/pages/dashboardslidepreview.css';


export function DashboardSlides({ projectID, setSlideSelected, setSlideInfo  }) {
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

    const handleClick = async (e) => {
        e.preventDefault();

        const slideInfo = {
            slideID: e.currentTarget.id,
            templateID: e.currentTarget.dataset.template
        }

        setSlideInfo(slideInfo)
        setSlideSelected(prev => !prev);
    }

    useEffect(() => {
        fetchSlidesFromProject();
    }, [])

    return (
        <div className="slides-main">
            <div className="slides-container">
                {slides.map((s, index) => (
                    <div className="slides-card" id={s._id} data-template={s.templateID} onClick={handleClick}> Slide {projectID}</div>
                ))}
            </div>
        </div>
    );
}