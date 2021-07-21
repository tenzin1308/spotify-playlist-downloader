import React from 'react'
import './Playlists.css'

function Playlists({images, title, id}) {
    return (
        <div className="playLists">
            <div className="playLists__info">
                {images[0] !== undefined ? <img src={images[0].url} alt="" /> : <img src="https://th.bing.com/th/id/OIP.khK65de-Bgy68D6JheAk3QHaHa?pid=ImgDet&rs=1" alt="" />}
                {/* {images !== undefined ? <img src={`${images[0].url}`} width="640" height="640" alt="" /> : null} */}
                <h1>{title}</h1>
            </div>
        </div>
    )
}

export default Playlists
