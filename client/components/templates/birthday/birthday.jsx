import '../../styles/templates/birthdaypreview.css'

const Birthday = ({ currentSlide }) => {

    return (
        <div className="display-slide-container">
            <div className="preview-slide-box">
                <h1 className="birthday-title">{currentSlide?.text_01}</h1>
                <img alt="image/video" src={currentSlide?.text_02} className="imagePerson"/>
                <img alt="image/video" src={currentSlide?.text_03} className="imageAnnouncement"/>
                <h3 className="birthday-desc">{currentSlide?.text_04}</h3>
            </div>
        </div>
    )
}

export default Birthday;