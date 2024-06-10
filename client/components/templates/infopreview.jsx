const InfoPreview = ({ slideInfo }) => {

    return (
        <div className="preview-slide-container">
            <div className="preview-slide-box">
                {slideInfo._id}: Info Slide
            </div>
        </div>
    )
}

export default InfoPreview;