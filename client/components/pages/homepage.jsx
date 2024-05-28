import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/styles.css';
import kpmg_logo from '../../resources/images/kpmg_logo.png';

export function Homepage() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <header className="header">
                <img src={kpmg_logo} alt="KPMG Logo" className="logo" />
                <h1 className="title">LIGHTBEAM</h1>
            </header>
            <main className="main-content">
                <button onClick={() => navigate('/projects')}>Go to Projects</button>
            </main>
            <footer className="footer">
                <p>by Team Cygnus</p>
            </footer>
        </div>
    );
}
