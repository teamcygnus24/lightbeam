import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../resources/styles/styles.css';
import kpmg_logo from '../../resources/images/kpmg_logo.png';

export function Login() {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState("");
    const [message, setMessage] = useState("Skriv inn passordet for å komme deg videre");

    const loginPOST = async () => {

        try {
            const postCookies = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify({ validation }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if(postCookies.ok) {
                console.log("Login cookies posted");
            }

            if (!postCookies.ok) {
                console.log(
                    `Error posting login cookies ${postCookies.status} ${postCookies.statusText}`
                )
            }
        } catch (error) {
            console.log(`Error in loginPOST: ${error}`);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const adminFetch = await fetch(`/api/login/${password}`)
            const adminValidation = await adminFetch.json();

            if (!adminFetch.ok) {
                console.log(
                    `Something went wrong while validating ${adminFetch.status} ${adminFetch.statusText}`
                )
            }

            if (adminFetch.ok) {
                console.log(`Validation: ${JSON.stringify(adminValidation.validation)}`)

                if (adminValidation.validation === "successful") {
                    setValidation("successful")
                    await loginPOST()
                    setMessage(null)
                    navigate("/");
                }

                if (adminValidation.validation === "failed") {
                    setPassword("")
                    setMessage("Ugyldig passord, prøv igjen")
                }
            };

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
                        <p className="login-info">{message}</p>
                        <input className="login-input" placeholder="Passord" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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