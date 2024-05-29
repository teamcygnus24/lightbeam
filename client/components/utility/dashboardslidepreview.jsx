import React from 'react';
import '../styles/pages/dashboardslidepreview.css';


export function DashboardSlidePreview() {

    return (
        <div className="preview">
                <iframe
                    src="http://localhost:1234/display" // Replace with the actual URL
                    title="Embedded Page"
                    width="100%"
                    height="60%"
                />
        </div>
    );
}