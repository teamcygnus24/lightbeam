import React, {createContext, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from "./view/login";
import { Home } from './view/home.jsx';
import { Projects } from './view/project.jsx';
import { Dashboard } from './view/dashboard.jsx';
import { Display } from './view/display.jsx';
import ProtectedRoutes from "./components/utility/protectedroutes.jsx";

/* Denne siden er basically "innholdsfortegnelsen til nettsiden"
Vi har lagt "Display" siden utenfor protected routes, da man ikke skal trenge
å logge seg på for å se denne siden. Men alt annet er beskyttet.
*/

export const AppContext = createContext();

export function Application() {

    //Login Verification
    const [validation, setValidation] = useState(false);

    //Display
    const [displayChange, setDisplayChange] = useState(false);

    //Project
    const [currentProject, setCurrentProject] = useState(null);
    const [projectUpdated, setProjectUpdated] = useState(false);

    //Template
    const [templates, setTemplates] = useState([]);

    //Slide
    const [slideID, setSlideID] = useState("");
    const [slides, setSlides] = useState([]);
    const [slideInfo, setSlideInfo] = useState({});
    const [slideSelected, setSlideSelected] = useState(false);
    const [displaySlide, setDisplaySlide] = useState({})

    return (
        <AppContext.Provider value={ {
            validation,
            setValidation,
            slideID,
            setSlideID,
            displayChange,
            setDisplayChange,
            currentProject,
            setCurrentProject,
            projectUpdated,
            setProjectUpdated,
            slideInfo,
            setSlideInfo,
            slideSelected,
            setSlideSelected,
            templates,
            setTemplates,
            slides,
            setSlides,
            displaySlide,
            setDisplaySlide
        } }>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                    <Route path="/display" element={<Display />} />
                </Routes>
            </Router>
        </AppContext.Provider>
    );
}
