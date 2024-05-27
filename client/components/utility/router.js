import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from "../pages/login";
import { Homepage } from '../pages/homepage';
import { Projects } from '../pages/projectpage';
import { Dashboard } from '../pages/dashboardpage';
import { Display } from '../pages/displaypage';
import '../../resources/styles/styles.css';
import Protectedroutes from "./protectedroutes";
import ProtectedRoutes from "./protectedroutes";
import { Editor } from '../pages/editor';

export const Context = React.createContext();

export function AppRouter() {

    const [validation, setValidation] = useState(false);

    return (
        <Context.Provider value={[validation, setValidation]}>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                    <Route path="/display" element={<Display/>} />
                    <Route path="/editor" element={<Editor/>} />
                </Routes>
            </Router>
        </Context.Provider>
    );
}