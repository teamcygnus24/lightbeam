import React, { useState, useEffect } from 'react';
import '../styles/pages/dashboardpage.css';
import { DashboardContainer } from "../utility/dashboardcontainer";
import { Templates } from "../utility/templates";

export function Dashboard() {

    const [currentProject, setCurrentProject] = useState(null);
    const [projectUpdated, setProjectUpdated] = useState(false);

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
    }, [projectUpdated]);

    return (
        <div className="dashboard-body">
            {currentProject === null ? (<div></div>) :
                currentProject.slideCount > 0 ? (
                    //Passing fetched project data to the components
                    <DashboardContainer project={currentProject} />
                ) : (
                    //Passing the projectUpdated state setter, to trigger when a slide has been added and re-render
                    <Templates project={currentProject} setProjectUpdated={setProjectUpdated}/>
                )}
        </div>
    );
}