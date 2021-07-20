import React from 'react'
import './Playlists.css'

function Playlists({title, href}) {
    return (
        <div className="playLists">
            <div className="playLists__info">
                <h1>{title}</h1>
            </div>
        </div>
    )
}

export default Playlists
