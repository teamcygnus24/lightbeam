import '../../styles/templates/video.css';
import React, { useEffect, useRef } from 'react';

const Video = ({ currentSlide, onDurationReady }) => {
    const playerRef = useRef(null);

    useEffect(() => {
        const loadYoutubeIframeAPI = () => {
            if (!window.YT) {
                const scriptTag = document.createElement('script');
                scriptTag.src = "https://www.youtube.com/iframe_api";
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);

                window.onYouTubeIframeAPIReady = () => {
                    initializeYouTubePlayer();
                };
            } else {
                initializeYouTubePlayer();
            }
        };

        const initializeYouTubePlayer = () => {
            if (window.YT && window.YT.Player) {
                playerRef.current = new window.YT.Player('youtube-player', {
                    videoId: currentSlide?.text_01.split('v=')[1], // Extract the video ID from the URL
                    events: {
                        'onReady': (event) => {
                            const duration = event.target.getDuration();
                            console.log(`Video duration: ${duration} seconds`);
                            onDurationReady(duration);
                        }
                    }
                });
            }
        };

        loadYoutubeIframeAPI();

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, [currentSlide, onDurationReady]);

    const videoLink = `${currentSlide?.text_01}?autoplay=1&controls=0&modestbranding=1`;

    return (
        <div className="display-video-container">
            <div className='display-video-box'>
                <iframe
                    id="youtube-player"
                    className="display-video-player"
                    src={videoLink}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                />
            </div>
        </div>
    );
}

export default Video;
