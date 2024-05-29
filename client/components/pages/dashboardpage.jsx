import React, { useState, useEffect } from 'react';
import '../styles/pages/dashboardpage.css';
import { DashboardContainer } from "../utility/dashboardcontainer";
import { Templates } from "../utility/templates";

export function Dashboard({ displayChange, setDisplayChange }) {

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
        //Dependency will re-render on projectUpdated state change
    }, [projectUpdated]);

    return (
        <div className="dashboard-body">
            {currentProject === null ? (<div></div>) : //If currentProject is not fetched yet, show loading state
                //Conditional render statement based on how many slides a project has
                currentProject.slideCount > 0 ? (
                    //Passing fetched project data to the components
                    <DashboardContainer project={currentProject} displayChange={ displayChange } setDisplayChange={ setDisplayChange }/>
                ) : (
                    //Passing the projectUpdated state setter, to trigger when a slide has been added and re-render
                    <Templates project={currentProject} setProjectUpdated={setProjectUpdated}/>
                )}
        </div>
    );
}