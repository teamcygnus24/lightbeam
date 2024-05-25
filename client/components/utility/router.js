import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Homepage } from "../pages/homepage"
import { Projects } from '../pages/projectpage';
import '../../resources/styles/styles.css';

export function Router() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/projects" element={<Projects />} />
            </Routes>
        </Router>
    );
}
