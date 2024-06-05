import React, {useContext, useEffect, useState} from 'react';
import '../styles/view/dashboardslidepreview.css';
import {AppContext} from "../../application";

/*
============================================================================================
SLIDE PREVIEW inne i EDITOREN
-----------------
Dette er preview'en som er i dashboard containeren.
Denne siden er en "EMBEDDING" av /display siden. Ingen css påvirkning og kode.
Denne har basically bare limt inn display siden i en boks, slik at vi kan se den faktiske siden.
Denne preview'en refreshes for hver gang en bruker kjører en update i sidebar editoren.
Knappene i sidebar editoren trigger en displayChange, som refresher denne preview'en.
============================================================================================
*/  

export function Slidepreview() {
    const { slideID, displayChange } = useContext(AppContext);

    const [iframeKey, setIframeKey] = useState(0);

    useEffect(() => {
        setIframeKey(iframeKey + 1)
    }, [displayChange, slideID]);

    return (
                <iframe
                    key={iframeKey}
                    src="https://lightbeam-smidig-dev-393006ce2df9.herokuapp.com/display" // Replace with the actual URL
                    title="Embedded Page"
                    id="frame"
                />
    );
}