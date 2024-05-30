import React, {useState} from 'react';
import useGlobalContext from "../hooks/useGlobalContext";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from "./pages/login";
import { Homepage } from './pages/homepage.jsx';
import { Projects } from './pages/projectpage.jsx';
import { Dashboard } from './pages/dashboardpage.jsx';
import { Display } from './pages/displaypage.jsx';
import ProtectedRoutes from "./utility/protectedroutes.jsx";

/* Denne siden er basically "innholdsfortegnelsen til nettsiden"
Vi har lagt "Display" siden utenfor protected routes, da man ikke skal trenge
å logge seg på for å se denne siden. Men alt annet er beskyttet.
*/

export const Context = React.createContext();

export function Application() {

    const [validation, setValidation] = useState(false);
    const [projects, setProjects] = useState([]);
    const [displayChange, setDisplayChange] = useState(false)

    return (
        <useGlobalContext.Provider value ={ {projects ,setProjects} }>
            <Context.Provider value={ [validation, setValidation] }>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route element={<ProtectedRoutes />}>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/dashboard" element={<Dashboard displayChange={ displayChange } setDisplayChange={ setDisplayChange }/>} />
                        </Route>
                        <Route path="/display" element={<Display displayChange={ displayChange }/>} />
                    </Routes>
                </Router>
            </Context.Provider>
        </useGlobalContext.Provider>
    );
}
