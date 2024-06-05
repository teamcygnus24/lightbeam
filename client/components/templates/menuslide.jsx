import long_food from '../../resources/images/food.png'
import React from "react";

const MenuSlide = ({ currentSlide }) => {

    return (
        <div className="slides-card-container">
            <div className='slides-card-box'>
                <div className="slides-card-content">
                    <h2>Today's menu</h2>
                    <div className="slides-card-spacer"></div>
                    <span className="slides-card-input"><h3>{currentSlide?.text_01}</h3></span>
                    <div className="slides-card-line"></div>
                    <span className="slides-card-input">{currentSlide?.text_02}</span>
                    <span className="slides-card-input">{currentSlide?.text_03}</span>
                    <span className="slides-card-input">{currentSlide?.text_04}</span>
                    <span className="slides-card-input"><h3>{currentSlide?.text_07}</h3></span>
                    <div className="slides-card-line"></div>
                    <span className="slides-card-input">{currentSlide?.text_08}</span>
                    <span className="slides-card-input">{currentSlide?.text_09}</span>
                </div>
            </div>
            <div className="slides-card-image-box">
                <img src={long_food} alt="food pic"/>
            </div>
        </div>
    )
}

export default MenuSlide;