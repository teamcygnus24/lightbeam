import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/view/dashboardslidepreview.css';
import {AppContext} from "../../application";
import Menu from "../templates/menu";
import long_food from "../../resources/images/food.png";
import MenuSlide from "../templates/menuslide";

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
    const { setSlideID, currentProject, setSlideSelected, setSlideInfo, slides, setSlides, removeSlideClicked } = useContext(AppContext)

    const [loading, setLoading] = useState(false)


    const fetchSlidesFromProject = async () => {
        setLoading(true)
        const projectSlides = await fetch("/api/slide/" + currentProject._id)
        const slidesList = await projectSlides.json();

        if (projectSlides.ok) {
            console.log("Slides successfully fetches from project " + currentProject._id + "\n" + slidesList);
            setSlides(slidesList)
        }
        setLoading(false)
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

    const handleRemoveSlide = async (e) => {
        try {
            const deleteSlide = await fetch(`/api/slide/${e.currentTarget.id}`, {
                method: "DELETE"
            });
            const slideDeleted = deleteSlide.json();

            if (deleteSlide.ok) {
                await fetchSlidesFromProject()
                console.log(`Slide ${slideDeleted} deleted successfully`);

            } else {
                console.log(`Failed to delete slide ${e.currentTarget.id}`);
            }

        } catch (error) {
            console.log("Error in function handleRemoveSlide " + error);
        }
    }

    useEffect(() => {
        fetchSlidesFromProject();
    }, [currentProject])


    return (
        <div className="slides-main">
            {removeSlideClicked ? <h1 style={{color: "crimson"}}>Removing slides</h1> : <h1>Selecting slides</h1>}
            <div className="slides-container">
                {loading ? <div>Loading</div> : (removeSlideClicked ? slides.map((s, index) => (
                    <div key={s._id} className="remove-slides-card" id={s._id} data-template={s.templateID} onClick={handleRemoveSlide}>
                        <MenuSlide currentSlide={ s }/>
                    </div>
                )) : slides.map((s, index) => (
                    <div key={s._id} className="slides-card" id={s._id} data-template={s.templateID}
                         onClick={handleClick}>
                        <MenuSlide currentSlide={ s }/>
                    </div>
                    )))}
            </div>
        </div>
    );
}