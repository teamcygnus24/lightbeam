import long_food from '../../resources/images/food.png'

const Menu = ({ currentSlide }) => {

    return (
        <div className="menu-container">
            <div className='menu-box'>
                <div className="content">
                    <h2>Today's menu</h2>
                    <div className="spacer"></div>
                    <span className="input"><h3>{currentSlide?.text_01}</h3></span>
                    <div className="line"></div>
                    <span className="input">{currentSlide?.text_02}</span>
                    <span className="input">{currentSlide?.text_03}</span>
                    <span className="input">{currentSlide?.text_04}</span>
                    <span className="input"><h3>{currentSlide?.text_07}</h3></span>
                    <div className="line"></div>
                    <span className="input">{currentSlide?.text_08}</span>
                    <span className="input">{currentSlide?.text_09}</span>
                </div>
            </div>
            <div className="image-box">
                <img src={long_food} alt="food pic"/>
            </div>
        </div>
    )
}

export default Menu;