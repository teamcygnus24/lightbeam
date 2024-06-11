import React, {useState, useEffect, useContext} from 'react';
import '../styles/view/dashboardslidepreview.css';
import {AppContext} from "../../application";
import MenuSlide from "../templates/menuslide";
import InfoSlide from "../templates/infoslide";
import {Templates} from "./templates";
import BirthdaySlide from "../templates/birthdayslide";

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
    const { setSlideID, currentProject, setSlideSelected, setSlideInfo, slides, setSlides, removeSlideClicked, addSlideClicked } = useContext(AppContext)

    const [loading, setLoading] = useState(false)

    const templateComponents = {
        "665625763da2eb37ed00af98": MenuSlide,
        "6656257b3da2eb37ed00af9a": InfoSlide,
        "665625813da2eb37ed00af9e": BirthdaySlide
    }

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

        const slideInfo = slides.find(slide => slide._id === e.currentTarget.id)
        console.log(slideInfo)


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
                {addSlideClicked ? <Templates />: (loading ? <div>Loading</div> : (removeSlideClicked ? slides.map((s) => {
                    const SlideComponent = templateComponents[s.templateID];
                    return (
                    <div key={s._id} className="remove-slides-card" id={s._id} data-template={s.templateID} onClick={handleRemoveSlide}>
                        <SlideComponent currentSlide={ s }/>
                    </div>
                )}) : slides.map((s) => {
                    const SlideComponent = templateComponents[s.templateID];
                    return (
                    <div key={s._id} className="slides-card" id={s._id} data-template={s.templateID}
                         onClick={handleClick}>
                        <SlideComponent currentSlide={ s }/>
                    </div>
                )})))}
            </div>
        </div>
    );
}