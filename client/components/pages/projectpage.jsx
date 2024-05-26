import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../resources/styles/project.module.css';

export function Projects() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1>Projects</h1>
            <button onClick={() => navigate('/')}>Back</button>
            <div className={styles.projects}>
                <div className={styles['project-card']}>
                    <div className={styles['project-header']} style={{ backgroundColor: '#20B2AA' }}>Project 1</div>
                    <div className={styles['project-footer']}>Lunch</div>
                </div>
                <div className={styles['project-card']}>
                    <div className={styles['project-header']} style={{ backgroundColor: '#800080' }}>Project 2</div>
                    <div className={styles['project-footer']}>Birthdays</div>
                </div>
                <div className={styles['project-card']}>
                    <div className={styles['project-header']} style={{ backgroundColor: '#1E90FF' }}>Project 3</div>
                    <div className={styles['project-footer']}>Events</div>
                </div>
                <div className={styles['project-card']}>
                    <div className={styles['project-header']} style={{ backgroundColor: '#00BFFF' }}>Project 4</div>
                    <div className={styles['project-footer']}>Wine-Lottery</div>
                </div>
            </div>
        </div>
    );
}