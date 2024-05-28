import React, {useState} from 'react';
import useGlobalContext from "../hooks/useGlobalContext";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from "./pages/login";
import { Homepage } from './pages/homepage.jsx';
import { Projects } from './pages/projectpage.jsx';
import { Dashboard } from './pages/dashboardpage.jsx';
import { Display } from './pages/displaypage.jsx';
import ProtectedRoutes from "./utility/protectedroutes.jsx";

export const Context = React.createContext();

export function Application() {

    const [validation, setValidation] = useState(false);
    const [projects, setProjects] = useState([]);

    return (
        <useGlobalContext.Provider value ={ {projects ,setProjects} }>
            <Context.Provider value={ [validation, setValidation] }>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route element={<ProtectedRoutes />}>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/display" element={<Display/>} />
                        </Route>
                    </Routes>
                </Router>
            </Context.Provider>
        </useGlobalContext.Provider>
    );
}
