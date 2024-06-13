import '../../styles/templates/video.css'

const Video = ({ currentSlide }) => {

    const videoLink = `${currentSlide?.text_01}?autoplay=1`
    console.log(videoLink)

    return (
        <div className="display-video-container">
            <div className='display-video-box'>
                <iframe
                className="display-video-player"
                src={videoLink}
                allow="autoplay; encrypted-media"
                allowFullScreen
                >
                </iframe>
            </div>
        </div>
    )
}

export default Video;