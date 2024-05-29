import React from 'react';
import '../styles/pages/dashboardpage.css';


export function DashboardSideBarProjectInfo({ project }) {

    return (
        <div className="settings-sidebar">
            <h2>Project: {project.name}</h2>
            <h3>Slides: {project.slideCount}</h3>
        </div>
    );
}