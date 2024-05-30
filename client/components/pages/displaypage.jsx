import React, {useEffect, useState} from 'react';
import "../styles/pages/displaypage.css"
import {set} from "mongoose";
import kpmg_logo from '../../resources/images/kpmg_logo.png';
import long_food from '../../resources/images/food.png';
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
            <div className='menu-box'>
                <h2 className='menu-header'>Lunch Menu</h2>
                <div className='inside-menu'>
                <div className="content">
                    <div className="input">1: {slide.text_01}</div>
                    <div className="input">2: {slide.text_02}</div>
                    <div className="input">3: {slide.text_03}</div>
                    <div className="input">4: {slide.text_04}</div>
                    <div className="input">5: {slide.text_05}</div>
                    <div className="input">6: {slide.text_06}</div>
                    <div className="input">7: {slide.text_07}</div>
                    <div className="input">8: {slide.text_08}</div>
                    <div className="input">9: {slide.text_09}</div>
                    <div className="input">10: {slide.text_10}</div>
                </div>
                <div className='menu-img'>
                    <img src={long_food} alt="" />
                </div>
                </div>
            </div>
            <div className='img-box'>
                <div className='wheather'></div>
                <div className='image'>
                    <img src={kpmg_logo} alt="img" />
                </div>
            </div>
        </div>
    );
}
