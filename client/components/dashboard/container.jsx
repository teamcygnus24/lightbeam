import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/view/dashboard.css';
import {Slidepreview} from "./slidepreview";
import {Slides} from "./slides";
import {Sidebareditor} from "./sidebareditor";
import {Sidebarprojectinfo} from "./sidebarprojectinfo";
import { AppContext } from "../../application";

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

export function Container() {
    const { displayChange, slideSelected } = useContext(AppContext);

    const navigate = useNavigate();

    const backToProjects = async (e) => {
        e.preventDefault();

        navigate("/projects")
    }

    useEffect(() => {
        console.log("I rendered")
    }, [slideSelected, displayChange]);
    return (

        <div className="dashboard-container">
            <button className="back-button" onClick={backToProjects}>Back</button>
            {slideSelected === true ? <Sidebareditor />
                : <Sidebarprojectinfo />}
            {slideSelected === true ? <Slidepreview />
                : <Slides />}
        </div>
    );

    /* MÅ FLYTTE BACK KNAPP
    return (
        <div className="dashboard-container">
            {slideSelected === true ? <Sidebareditor project={ project } slideInfo={ slideInfo } setDisplayChange={ setDisplayChange }/>
                : <Sidebarprojectinfo project={ project }/>}

            {slideSelected === true ? <Slidepreview displayChange={ displayChange }/>
                : <Slides projectID={ project._id } setSlideSelected={ setSlideSelected } setSlideInfo={ setSlideInfo }/>}

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