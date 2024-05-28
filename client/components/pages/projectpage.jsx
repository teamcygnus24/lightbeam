import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/project.css';

export function Projects() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        const allProjects = await fetch("/api/project");
        const projectsList = await allProjects.json();
        setProjects(projectsList);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="container">
            <h1>Projects</h1>
            <button className="back-button" onClick={() => navigate('/')}>Back</button>
            <div className="projects">
                {projects.map((p, index) => (
                    <div key={index} className="project-card" onClick={() => navigate('/dashboard')}>
                        <div className="project-header">
                            {p._id}
                        </div>
                        <div className="project-footer">{p.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
