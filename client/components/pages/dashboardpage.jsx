import React, { useState, useEffect } from 'react';
import '../styles/pages/dashboardpage.css';
import { DashboardContainer } from "../utility/dashboardcontainer";
import { Templates } from "../utility/templates";

export function Dashboard() {

    const [currentProject, setCurrentProject] = useState({});
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
            {currentProject ? (
                currentProject.slideCount > 0 ? (
                    //Passing fetched project data to the components
                    <DashboardContainer project={currentProject} />
                ) : (
                    <Templates project={currentProject} setProjectUpdated={setProjectUpdated}/>
                )
            ) : (
                <div>Error loading project</div>
            )}
        </div>
    );
}