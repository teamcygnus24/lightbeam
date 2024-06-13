import '../../styles/templates/videopreview.css'

const VideoPreview = ({ slideInfo }) => {

    console.log(slideInfo?.text_01)

    return (
        <div className="preview-video-container">
            <div className="preview-video-box">
                <iframe className="preview-video-player" src={slideInfo?.text_01}></iframe>
            </div>
        </div>
    )
}

//<iframe width="560" height="315" src="https://www.youtube.com/embed/HlFIRYKJGYQ?si=czbwkPag2uJYOFVB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

export default VideoPreview;