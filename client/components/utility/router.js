import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from "../pages/login";
import { Homepage } from '../pages/homepage';
import { Projects } from '../pages/projectpage';
import { Dashboard } from '../pages/dashboardpage';
import { Display } from '../pages/displaypage';
import '../../resources/styles/styles.css';

export function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Homepage />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/display" element={<Display/> } />
            </Routes>
        </Router>
    );
}
