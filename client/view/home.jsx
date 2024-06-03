import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/styles/view/home.css';
import kpmg_logo from '../resources/images/kpmg_logo.png';

/*
============================================================================================
HOME PAGE
-----------------
Dette er siden brukeren lander på etter at han har autentifisert.
Formålet og innhold skal diskuteres til neste sprint.
============================================================================================
*/ 

export function Home() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <header className="header">
                <img src={kpmg_logo} alt="KPMG Logo" className="logo" />
                <h1 className="title">LIGHTBEAM</h1>
            </header>
            <div><h3>
                Real-time collaboration without hassle: Work in an editor in real-time,
                </h3>
                <h3>
                making great changes in a super effective way, from wherever you are.
                </h3>
            </div>
            <main className="main-content">
                <button className="projects-btn" onClick={() => navigate('/projects')}>Go to Projects</button>
            </main>
            <footer className="footer">
                <p>by Team Cygnus</p>
            </footer>
        </div>
    );
}
