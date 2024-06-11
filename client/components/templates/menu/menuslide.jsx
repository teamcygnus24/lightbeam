import long_food from '../../../resources/images/food.png'

const MenuSlide = ({ currentSlide }) => {

    return (
        <div className="slides-card-container">
            <div className='slides-card-box'>
                <div className="slides-card-content">
                    <h2>Today's menu</h2>
                    <div className="slides-card-spacer"></div>
                    <span className="slides-card-input"><h3>{currentSlide ? currentSlide.text_01 : "Add Text"}</h3></span>
                    <div className="slides-card-line"></div>
                    <span className="slides-card-input">{currentSlide ? currentSlide.text_02 : "Add Text"}</span>
                    <span className="slides-card-input">{currentSlide ? currentSlide.text_03 : "Add Text"}</span>
                    <span className="slides-card-input">{currentSlide ? currentSlide.text_04 : "Add Text"}</span>
                    <span className="slides-card-input"><h3>{currentSlide ? currentSlide.text_07 : "Add Text"}</h3></span>
                    <div className="slides-card-line"></div>
                    <span className="slides-card-input">{currentSlide ? currentSlide.text_08 : "Add Text"}</span>
                    <span className="slides-card-input">{currentSlide ? currentSlide.text_09 : "Add Text"}</span>
                </div>
            </div>
            <div className="slides-card-image-box">
                <img src={long_food} alt="food pic"/>
            </div>
        </div>
    )
}

export default MenuSlide;