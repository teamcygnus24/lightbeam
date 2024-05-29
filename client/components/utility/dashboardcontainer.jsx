import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/dashboardpage.css';
import {DashboardSlidePreview} from "./dashboardslidepreview";
import {DashboardSlides} from "./dashboardslides";
import {DashboardSideBarEditor} from "./dashboardsidebareditor";
import {DashboardSideBarProjectInfo} from "./dashboardsidebarprojectinfo";


export function DashboardContainer({ project }) {
    const navigate = useNavigate();
    const [currentProject, setCurrentProject] = useState({});
    const [slideInfo, setSlideInfo] = useState({})
    const [slideSelected, setSlideSelected] = useState(false)

    const handleCLick = async (e) => {
        e.preventDefault();

        navigate("/projects")
    }

    useEffect(() => {

    }, [slideSelected]);

    return (
        <div className="dashboard-container">
            {slideSelected === true ? <DashboardSideBarEditor project={ project } slideInfo={ slideInfo }/> : <DashboardSideBarProjectInfo project={ project }/>}
            {slideSelected === true ? <DashboardSlidePreview /> //If a slide is selected, show slide preview screen
                : <DashboardSlides projectID={ project._id }setSlideSelected={ setSlideSelected } setSlideInfo={ setSlideInfo }/>}
            <button className="back-button" onClick={handleCLick}>Back</button>
            <footer className="footer">
                <p>by Team Cygnus</p>
            </footer>
        </div>
    );
}