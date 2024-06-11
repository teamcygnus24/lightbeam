import React, {useContext} from 'react';
import '../styles/view/dashboard.css';
import {AppContext} from "../../application";
import EditorMenu from "./sidebar/editormenu.jsx";
import EditorInfo from "./sidebar/editorinfo.jsx";
import EditorBirthday from "./sidebar/editorbirthday.jsx";

/*
============================================================================================
SIDEBAR EDITOR
-----------------
Dette er editor delen av DASHBOARD CONTAINER.
Her legges det opp Input fields hvor brukeren sender data inn. Denne dataen lagres i MongoDB.
Ved trykk av buttons, så vil funksjonen "setDisplayChange" trigges.
Denne funksjonen trigger useEffect i Slidepreview, som refresher Preview'en.
I bunn og grunn så får den preview'en til å laste inn på nytt igjen, med nyeste data.
(Hence hvorfor du ser 1 millisekund flimring når man gjør en update). 
(DETTE GÅR FINT! Brukeren får en feeling av at noe skjer.)
============================================================================================
*/

export function Sidebareditor() {
    const { slideInfo } = useContext(AppContext);

    const templateComponents = {
        "665625763da2eb37ed00af98": EditorMenu,
        "6656257b3da2eb37ed00af9a": EditorInfo,
        "665625813da2eb37ed00af9e": EditorBirthday
    }

    const TemplateComponent = templateComponents[slideInfo?.templateID]


    return (
        <div className="settings-sidebar">
            <h2>Slide: {slideInfo._id}</h2>
            <h2>Template: {slideInfo.templateID}</h2>
            <TemplateComponent />
        </div>
    );
}