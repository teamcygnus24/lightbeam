import React, {useContext} from 'react';
import '../styles/view/dashboard.css';
import {AppContext} from "../../application";

/*
============================================================================================
PROJECT INFO
-----------------
Bare en info side. ikke noe spess.
============================================================================================
*/ 
export function Sidebarprojectinfo() {

    const { currentProject } = useContext(AppContext)


    return (
        <div className="settings-sidebar">
            <h2>Project: {currentProject.name}</h2>
            <h3>Slides: {currentProject.slideCount}</h3>
        </div>
    );
}