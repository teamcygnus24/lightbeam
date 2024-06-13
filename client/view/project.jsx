import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import kpmg_logo  from '../resources/images/kpmg_logo.png';
import '../components/styles/view/project.css';

export function Projects() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        const allProjects = await fetch("/api/project");
        const projectsList = await allProjects.json();
        setProjects(projectsList);
    };

    const handleClick = async (e) => {
        e.preventDefault()

        window.sessionStorage.setItem("projectID", e.currentTarget.id)
        navigate("/dashboard")
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="container">
            <img src={kpmg_logo} alt="KPMG Logo" className="corner-logo" />
            <h1>Projects</h1>
            <div className="projects">
                {projects.map((p, index) => (
                    <div key={index} className="project-card" onClick={handleClick} id={p._id}>
                        <div className="project-header">
                        </div>
                        <div className="project-body">{p.name}</div>
                    </div>
                ))}
            </div>
            <button className="back-button-project" onClick={() => navigate('/')}>Back</button>
            <footer className="footer">
            </footer>
        </div>
    );
}
