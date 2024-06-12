import '../../styles/templates/birthday.css'

const Birthday = ({ currentSlide }) => {

    return (
        <div className="display-birthday-container">
            <div className="display-birthday-box">
                <h1 className="display-birthday-title">{currentSlide?.text_01}</h1>
                <img alt="image/video" src={currentSlide?.text_02} className="display-birthday-imagePerson"/>
                <img alt="image/video" src={currentSlide?.text_03} className="display-birthday-imageAnnouncement"/>
                <h3 className="display-birthday-desc">{currentSlide?.text_04}</h3>
            </div>
        </div>
    )
}

export default Birthday;