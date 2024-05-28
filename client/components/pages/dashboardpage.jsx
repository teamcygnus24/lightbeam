import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/pages/dashboardpage.css';
import {DashboardContainer} from "../utility/dashboardcontainer";

export function Dashboard() {

    const navigate = useNavigate();
    const [currentProject, setCurrentProject] = useState({});

    const fetchProject = async () => {
        try {
            const project = await fetch("/api/project/" + window.sessionStorage.getItem("projectID"))
            const projectInfo = await project.json();

            if (!project.ok) {
                console.log(`Error when fetching current project info`)
            }

            if (project.ok) {
                setCurrentProject(projectInfo)
            }

        } catch (error) {
            console.log("Error in fetchProject: \n" + error)
        }
    }

    useEffect(() => {

        fetchProject();
    }, []);

    return (
        <DashboardContainer project={currentProject}/>
    );
}