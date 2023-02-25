import React from 'react'
import MyVideo from '../resources/videos/mainPageVideo.mp4'
const MainPageVideo = () => {
    const videoStyle = {
        position: "fixed",
        display: "block",
        height: "35em",
        width: "30em",
        top:"85px",
        left:"980px"
    }

    return (
        <div className='video'>
            <video src={MyVideo} style={videoStyle} autoPlay loop muted />
        </div>
    )
}

export default MainPageVideo