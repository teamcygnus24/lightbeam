import '../../styles/templates/birthdaypreview.css'

const BirthdayPreview = ({ slideInfo }) => {

    // Image1: https://imagez.tmz.com/image/4f/4by3/2023/01/06/4f8d328dba6c4c67b00b0494970173d5_md.jpg
    // Image2: https://parade.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MjAzMzU3NzQxMzU4NTIzOTgz/happy-birthday-wishes-messages.jpg

    return (
        <div className="preview-birthday-container">
            <div className="preview-birthday-box">
                <h1 className="preview-birthday-title">{slideInfo?.text_01}</h1>
                <img alt="image/video" src={slideInfo?.text_02} className="preview-birthday-imagePerson"/>
                <img alt="image/video" src={slideInfo?.text_03} className="preview-birthday-imageAnnouncement"/>
                <p className="preview-birthday-desc">{slideInfo?.text_04}</p>
            </div>
        </div>
    )
}

export default BirthdayPreview;