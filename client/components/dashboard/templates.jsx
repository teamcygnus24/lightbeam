import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/view/templates.css"
import {AppContext} from "../../application";

/*
============================================================================================
TEMPLATES
-----------------
Denne siden rendres når prosjektet ikke har noe slides eksisterende.
Dette gir brukeren mulighet for å velge templates som ligger i MongoDB
når brukeren velger en template, så vil en slidedisplay.jsx bli opprettet med den spesifikke template.
Dette gir oss mulighet til å videreutvikle layout og innhold, spesifikk til denne templaten.
============================================================================================
*/ 

export function Templates() {

    const { setProjectUpdated, templates, setTemplates, currentProject, showBackButton } = useContext(AppContext)

    const navigate = useNavigate();


    const fetchTemplates = async () => {
        const getAllTemplates = await fetch("/api/template")
        const listTemplates = await getAllTemplates.json();

        setTemplates(listTemplates)
    }

    const handleAddSlide = async (e) => {
        e.preventDefault();
        try {
            const postSlide = await fetch("/api/slide", {
                method: "POST",
                body: JSON.stringify({
                    projectID: currentProject._id,
                    templateID: e.currentTarget.id
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const createSlide = await postSlide.json();

            if (postSlide.ok) {
                console.log("Slide created!\n" + createSlide)

                const updateProject = await fetch("/api/project/" + currentProject._id, {
                    method: "PUT",
                    body: JSON.stringify({
                        slideCount: currentProject.slideCount + 1
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (updateProject.ok) {
                    console.log("Project updated successfully!\n" + updateProject)
                    setProjectUpdated(prev => !prev);
                }
            }

        } catch (error) {
            console.log("Error in function handleClick " + error);
        }
    }



    useEffect( () => {
        fetchTemplates();
    }, []);

    return(
        <div className="template-main">
            <h1>Templates:</h1>
            <div className="template-container">
                {templates.map((t, index) => (
                    <div key={t._id} id={t._id} className="template-card" onClick={handleAddSlide}>{t.name}</div>
                ))}
            </div>
            {showBackButton &&  <button className="template-btn" onClick={()=>navigate("/projects")}>back</button>}

        </div>
    )
}

