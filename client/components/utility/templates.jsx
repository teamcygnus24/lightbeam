import {useEffect, useState} from "react";


export function Templates() {

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
        <div>
            {templates.map((t, index) => (
                <div key={t._id}>{t.name}</div>
            ))}
        </div>
    )
}

