import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/dashboardpage.css';
import {DashboardSlidePreview} from "./dashboardslidepreview";
import {DashboardSlides} from "./dashboardslides";
import {DashboardSideBarEditor} from "./dashboardsidebareditor";
import {DashboardSideBarProjectInfo} from "./dashboardsidebarprojectinfo";


export function DashboardContainer({ project, displayChange, setDisplayChange}) {
    const navigate = useNavigate();
    const [currentProject, setCurrentProject] = useState({});
    const [slideInfo, setSlideInfo] = useState({})
    const [slideSelected, setSlideSelected] = useState(false)

    const backToProjects = async (e) => {
        e.preventDefault();

        navigate("/projects")
    }

    const backToSLides = async (e) => {
        e.preventDefault();

        setSlideSelected(prev => !prev)
    }

    useEffect(() => {
        console.log("I rendered")
    }, [slideSelected, displayChange]);

    return (
        <div className="dashboard-container">
            {slideSelected === true ? <DashboardSideBarEditor project={ project } slideInfo={ slideInfo } setDisplayChange={ setDisplayChange }/> : <DashboardSideBarProjectInfo project={ project }/>}
            {slideSelected === true ? <DashboardSlidePreview displayChange={ displayChange }/> //If a slide is selected, show slide preview screen
                : <DashboardSlides projectID={ project._id } setSlideSelected={ setSlideSelected } setSlideInfo={ setSlideInfo }/>}
            {slideSelected === true ? <button className="back-button" onClick={backToSLides}>Back</button>
                 :
                    <button className="back-button" onClick={backToProjects}>Back</button>}
            <footer className="footer">
                <p>by Team Cygnus</p>
            </footer>
        </div>
    );
}