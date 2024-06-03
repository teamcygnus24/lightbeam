import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/dashboardpage.css';
import {DashboardSlidePreview} from "./dashboardslidepreview";
import {DashboardSlides} from "./dashboardslides";
import {DashboardSideBarEditor} from "./dashboardsidebareditor";
import {DashboardSideBarProjectInfo} from "./dashboardsidebarprojectinfo";
import { AppContext } from "../application";

/*
============================================================================================
DASHBOARD CONTAINER
-----------------
Når brukeren har trykket seg inn på et prosjekt og trykket på en slide, så vil følgende skje:
1. Sidebar Editor containeren renderes på venstre side.
2. Slide Preview containeren renderes på høyre side.
Noen IF setninger for å sjekke om at ting funker.

Så denne siden er i teorien delt i "to".
============================================================================================
*/

export function DashboardContainer({ project, displayChange, setDisplayChange, setSlideID }) {
    const { slideID } = useContext(AppContext);

    const navigate = useNavigate();
    const [currentProject, setCurrentProject] = useState({});
    const [slideInfo, setSlideInfo] = useState({})
    const [slideSelected, setSlideSelected] = useState(false)

    const backToProjects = async (e) => {
        e.preventDefault();

        navigate("/projects")
    }

    const backToSlides = async (e) => {
        e.preventDefault();

        setSlideSelected(prev => !prev)
    }

    useEffect(() => {
        console.log("I rendered")
    }, [slideSelected, displayChange]);
    return (

        <div className="dashboard-container">
            <button className="back-button" onClick={backToProjects}>Back</button>
            {slideSelected === true ? <DashboardSideBarEditor backToSlides={backToSlides} project={ project } slideInfo={ slideInfo } setDisplayChange={ setDisplayChange }/>
                : <DashboardSideBarProjectInfo project={ project }/>}
            {slideSelected === true ? <DashboardSlidePreview displayChange={ displayChange }/>
                : <DashboardSlides projectID={ project._id } setSlideSelected={ setSlideSelected } setSlideInfo={ setSlideInfo } setSlideID={ setSlideID }/>}
        </div>
    );

    /* MÅ FLYTTE BACK KNAPP
    return (
        <div className="dashboard-container">
            {slideSelected === true ? <DashboardSideBarEditor project={ project } slideInfo={ slideInfo } setDisplayChange={ setDisplayChange }/> 
                : <DashboardSideBarProjectInfo project={ project }/>}

            {slideSelected === true ? <DashboardSlidePreview displayChange={ displayChange }/>
                : <DashboardSlides projectID={ project._id } setSlideSelected={ setSlideSelected } setSlideInfo={ setSlideInfo }/>}

            {slideSelected === true ? <button className="back-button" onClick={backToSLides}>Back</button>
                 :
                    <button className="back-button" onClick={backToProjects}>Back</button>}
            <footer className="footer">
                <p>by Team Cygnus</p>
            </footer>
        </div>
    );
    */
}