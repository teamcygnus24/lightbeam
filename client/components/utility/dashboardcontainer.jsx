import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/pages/dashboardpage.css';
import {DashboardSlidePreview} from "./dashboardslidepreview";
import {DashboardSlides} from "./dashboardslides";
import {DashboardSideBarEditor} from "./dashboardsidebareditor";
import {DashboardSideBarProjectInfo} from "./dashboardsidebarprojectinfo";


export function DashboardContainer({ project }) {
    const [currentProject, setCurrentProject] = useState({});
    const [slideSelected, setSlideSelected] = useState(false)

    useEffect(() => {

    }, [slideSelected]);

    return (
        <div className="dashboard-container">
            {slideSelected === true ? <DashboardSideBarEditor project={ project }/> : <DashboardSideBarProjectInfo project={ project }/>}
            {slideSelected === true ? <DashboardSlidePreview /> //If a slide is selected, show slide preview screen
                : <DashboardSlides projectID={ project._id } setSlideSelected={ setSlideSelected }/>}
            <button className="back-button" onClick={() => navigate('/projects')}>Back</button>
            <footer className="footer">
                <p>by Team Cygnus</p>
            </footer>
        </div>
    );
}