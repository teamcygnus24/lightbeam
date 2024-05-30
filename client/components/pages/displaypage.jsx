import React, {useEffect, useState} from 'react';
import "../styles/pages/displaypage.css"
import {set} from "mongoose";

/*
============================================================================================
DISPLAY PAGE
-----------------
Dette er siden som skal legges i fullskjerm modus hos kunden på TV'en.
Den henter data fra databasen og styles med en CSS.
Pr. 30.05.2024 så rendrer den kun 1 spesifikk slide.
Vi skal utvikle det slik at displaypage skal rendre alle slides i et prosjekt med status "aktiv"
Jokubas ordner dette.
============================================================================================
*/ 

export function Display({ displayChange }) {
    const [slide, setSlide] = useState({})

    const fetchSlide = async () => {
        const getSlide = await fetch(`/api/slide/665790ac9c5237fe18174f1a&sdfg`)
        const newSlide = await getSlide.json();

        setSlide(newSlide)
    }

    useEffect(() => {
        fetchSlide();
        console.log("Display Render")
    }, [displayChange]);

    return (
        <div className="preview">
            <div className="content">
                <div><p>Text 1:</p>{slide.text_01}</div>
                <div><p>Text 2:</p> {slide.text_02}</div>
                <div><p>Text 3:</p> {slide.text_03}</div>
                <div><p>Text 4:</p> {slide.text_04}</div>
                <div><p>Text 5:</p> {slide.text_05}</div>
                <div><p>Text 6:</p> {slide.text_06}</div>
                <div><p>Text 7:</p> {slide.text_07}</div>
                <div><p>Text 8:</p> {slide.text_08}</div>
                <div><p>Text 9:</p> {slide.text_09}</div>
                <div><p>Text 10:</p> {slide.text_10}</div>
            </div>
        </div>
    );
}
