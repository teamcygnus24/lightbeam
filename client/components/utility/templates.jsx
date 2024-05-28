import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/pages/templates.css"


export function Templates() {

    const navigate = useNavigate();
    const [templates, setTemplates] = useState([])

    const fetchTemplates = async () => {
        const getAllTemplates = await fetch("/api/template")
        const listTemplates = await getAllTemplates.json();

        setTemplates(listTemplates)

    }

    useEffect(() => {
        fetchTemplates();
    }, []);

    return(
        <div className="template-main">
            <h1>Velg en tema</h1>
            <div className="template-container">
                {templates.map((t, index) => (
                    <div key={t._id} className="template-card">{t.name}</div>
                ))}
            </div>
            <button className="template-btn" onClick={() => {
                navigate("/projects")
                }}>Back
            </button>
        </div>
    )
}

