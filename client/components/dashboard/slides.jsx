import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/view/dashboardslidepreview.css';
import {AppContext} from "../../application";

/*
============================================================================================
SLIDES
-----------------
Denne siden rendrer alle slides tilknyttet prosjektet man har trykket seg inn i.
Her kjøres det en API Fetch inne i MongoDB når man går videre med et prosjekt.
For alle slides med Prosjektets ID tilknyttet, renderes det følgende slides.
Ved å trykke på spesifikk slidedisplay.jsx, så vil slideID følge med til editoren, hvor man redigerer
sliden som man har trykket på.
============================================================================================
*/


export function Slides() {
    const { setSlideID, currentProject, setSlideSelected, setSlideInfo, slides, setSlides } = useContext(AppContext)


    const fetchSlidesFromProject = async () => {
        const projectSlides = await fetch("/api/slide/" + currentProject._id)
        const slidesList = await projectSlides.json();

        if (projectSlides.ok) {
            console.log("Slides successfully fetches from project " + currentProject._id + "\n" + slidesList);
            setSlides(slidesList)
        }
    }

    const handleClick = async (e) => {

        const slideInfo = {
            slideID: e.currentTarget.id,
            templateID: e.currentTarget.dataset.template
        }

        setSlideInfo(slideInfo)
        console.log("Slide ID Click " + e.currentTarget.id)
        setSlideID(e.currentTarget.id)
        setSlideSelected(prev => !prev);

    }

    useEffect(() => {
        fetchSlidesFromProject();
    }, [currentProject])

    return (
        <div className="slides-main">
            <div className="slides-container">
                {slides ? slides.map((s, index) => (
                    <div key={s._id} className="slides-card" id={s._id} data-template={s.templateID} onClick={handleClick}> Slide: Today's menu {currentProject._id}</div>
                )) : <h1>Loading</h1>}
            </div>
        </div>
    );
}