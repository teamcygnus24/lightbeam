import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import kpmg_logo  from '../../resources/images/kpmg_logo.png';
import '../styles/pages/project.css';

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
            <h1>Projects</h1>
            <div className="projects">
                {projects.map((p, index) => (
                    <div key={index} className="project-card" onClick={handleClick} id={p._id}>
                        <div className="project-header">
                            {p._id}
                        </div>
                        <div className="project-footer">{p.name}</div>
                    </div>
                ))}
            </div>
            <button className="back-button" onClick={() => navigate('/')}>Back</button>
            <footer className="footer">
                <p>by Team Cygnus</p>
            </footer>
        </div>
    );
}
