import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../resources/styles/styles.css';
import kpmg_logo from '../../resources/images/kpmg_logo.png';

export function Login() {
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()

        try {

            navigate("/")

        } catch (error) {
            console.log(`Error in loginPost ${error}`)
        }
    }

    return (
        <div className="container">
            <header className="header">
                <img src={kpmg_logo} alt="KPMG Logo" className="logo" />
                <h1 className="title">LIGHTBEAM</h1>
            </header>
            <main className="main-content">

                <div className="login-div">
                    <form action="" className="login-form" onSubmit={handleLogin}>
                        <h4 className="login-header">Logg inn</h4>
                        <p className="login-info">Skriv inn passordet for å komme deg videre</p>
                        <input className="login-input" placeholder="Passord" type="password"/>
                        <button className="login-btn">Logg inn</button>
                    </form>
                    <p className="login-trademark">SMIDIG PRO202 <b>SPRING 2024</b></p>
                </div>
            </main>
            <footer className="footer">
                <p>by Team Cygnus</p>
            </footer>
        </div>
    );
}