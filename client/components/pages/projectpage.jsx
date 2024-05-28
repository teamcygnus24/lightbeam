import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from "../../resources/styles/project.module.css";
import useGlobalContext from "../../hooks/useGlobalContext";



export function Projects() {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {

        const allProjects = await fetch("/api/project")
        const projectsList = await allProjects.json();

        setProjects(projectsList);
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Projects</h1>
            <button onClick={() => navigate('/')}>Back</button>
            <div className={styles.projects}>
                {projects.map((p, index) => (
                    <div className={styles['project-card']} onClick={() => navigate('/dashboard')}>
                        <div className={styles['project-header']} style={{backgroundColor: '#20B2AA'}}>
                            {p._id}
                        </div>
                        <div className={styles['project-footer']}>{p.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
