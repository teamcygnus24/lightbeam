import long_food from '../../resources/images/food.png'

const MenuPreview = ({ slideInfo }) => {

    return (
        <div className="preview-slide-container">
            <div className='menu-box'>
                <div className="content">
                    <h2>Today's menu</h2>
                    <div className="spacer"></div>
                    <span className="input"><h3>{slideInfo.text_01 ? slideInfo.text_01 : "Title 1"}</h3></span>
                    <div className="line"></div>
                    <span className="input">{slideInfo.text_02 ? slideInfo.text_02 : "Alternative 1"}</span>
                    <span className="input">{slideInfo.text_03 ? slideInfo.text_03 : "Alternative 2"}</span>
                    <span className="input">{slideInfo.text_04 ? slideInfo.text_04 : "Alternative 3"}</span>
                    <span className="input"><h3>{slideInfo.text_07 ? slideInfo.text_07 : "Title 2"}</h3></span>
                    <div className="line"></div>
                    <span className="input">{slideInfo.text_08 ? slideInfo.text_08 : "Alternative 1"}</span>
                    <span className="input">{slideInfo.text_09 ? slideInfo.text_09 : "Alternative 2"}</span>
                </div>
            </div>
            <div className="image-box">
                <img src={long_food} alt="food pic"/>
            </div>
        </div>
    )
}

export default MenuPreview;