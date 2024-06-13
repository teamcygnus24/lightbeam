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
            </header>
            <div><h3>
                Welcome! Watch our short onboarding video to get you started:
                </h3>
                <br></br>
            </div>
            <div>
           </div>
            <main className="main-content">
                <button className="projects-btn" onClick={() => navigate('/projects')}>Go to Projects</button>
            </main>
            <footer className="footer">
            </footer>
        </div>
    );
}
