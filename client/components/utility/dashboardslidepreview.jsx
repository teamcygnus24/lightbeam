import React, {useEffect, useState} from 'react';
import '../styles/pages/dashboardslidepreview.css';


export function DashboardSlidePreview({ displayChange }) {
    const [iframeKey, setIframeKey] = useState(0);

    useEffect(() => {
        setIframeKey(iframeKey + 1)
    }, [displayChange]);

    return (
        <div className="preview">
                <iframe
                    key={iframeKey}
                    src="http://localhost:1234/display" // Replace with the actual URL
                    title="Embedded Page"
                    width="100%"
                    height="60%"
                />
        </div>
    );
}