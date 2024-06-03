import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/dashboardslidepreview.css';
import {AppContext} from "../application";

/*
============================================================================================
SLIDES
-----------------
Denne siden rendrer alle slides tilknyttet prosjektet man har trykket seg inn i.
Her kjøres det en API Fetch inne i MongoDB når man går videre med et prosjekt.
For alle slides med Prosjektets ID tilknyttet, renderes det følgende slides.
Ved å trykke på spesifikk slide, så vil slideID følge med til editoren, hvor man redigerer
sliden som man har trykket på.
============================================================================================
*/

const templateCodes = {
    Template1: undefined,
    Template2: undefined,
    Template3: undefined,
    Template4: undefined,
    Template5: undefined
}


export function DashboardSlides({ projectID, setSlideSelected, setSlideInfo  }) {
    const { slideID, setSlideID } = useContext(AppContext)

    const navigate = useNavigate();
    const [slides, setSlides] = useState([]);
    const [templates, setTemplates] = useState(templateCodes);

    const fetchSlidesFromProject = async () => {
        const projectSlides = await fetch("/api/slide/" + projectID)
        const slidesList = await projectSlides.json();

        if (projectSlides.ok) {
            console.log("Slides successfully fetches from project " + projectID + "\n" + slidesList);
            setSlides(slidesList)
        }
    }

    const fetchAllTemplates = async () => {
        const getTemplates = await fetch("/api/template")
        const templateArray = await getTemplates.json();

        setTemplates({
            Template1: templateArray[0]._id,
            Template2: templateArray[1]._id,
            Template3: templateArray[2]._id,
            Template4: templateArray[3]._id,
            Template5: templateArray[4]._id
        })

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
        fetchAllTemplates();
        fetchSlidesFromProject();
    }, [])

    return (
        <div className="slides-main">
            <div className="slides-container">
                {slides.map((s, index) => (
                    <div key={s._id} className="slides-card" id={s._id} data-template={s.templateID} onClick={handleClick}> Slide: Today's menu {projectID}</div>
                ))}
            </div>
            <div>{slideID}</div>
        </div>
    );
}