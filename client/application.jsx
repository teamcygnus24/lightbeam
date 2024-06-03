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

    const [validation, setValidation] = useState(false);
    const [displayChange, setDisplayChange] = useState(false)
    const [slideID, setSlideID] = useState("665790ac9c5237fe18174f1a")

    return (
        <AppContext.Provider value={ { validation, setValidation, slideID, setSlideID } }>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/dashboard" element={<Dashboard displayChange={ displayChange } setDisplayChange={ setDisplayChange }/>} />
                    </Route>
                    <Route path="/display" element={<Display displayChange={ displayChange }/>} />
                </Routes>
            </Router>
        </AppContext.Provider>
    );
}
