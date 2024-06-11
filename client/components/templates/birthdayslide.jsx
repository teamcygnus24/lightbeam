const BirthdaySlide = ({ currentSlide }) => {

    return (
        <div className="thumbnail-container">
            <div className="slides-slide-box">
                <h1 className="slides-birthday-title">{currentSlide ? currentSlide.text_01 : "Insert Birthday Title"}</h1>
                {currentSlide ? <img alt="image" src={currentSlide.text_02} className="imagePerson"/> : <div className="imagePerson">Insert Image</div>}
                {currentSlide ? <img alt="image" src={currentSlide.text_03} className="imageAnnouncement"/> : <div className="imageAnnouncement">Insert Image 2</div>}
                <p className="slides-birthday-desc">{currentSlide ? currentSlide.text_04 : "Insert Description"}</p>
            </div>
        </div>
    )
}

export default BirthdaySlide;