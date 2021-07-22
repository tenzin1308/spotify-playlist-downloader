import React from 'react'
import { useDataLayerValue } from './DataLayer';
import './Playlists.css'

function Playlists({ spotify, images, title, id }) {
    const [{ songs }, dispatch] = useDataLayerValue();
    
    const onClickHandler = () => {
        spotify.getPlaylist(id, { limit: 300 }).then((response) =>
            dispatch({
                type: "SET_SONGS",
                songs: response,
            })
        );
        
    }
    return (
        <div className="playLists" onClick={onClickHandler}>
            <div className="playLists__info">
                {console.log("songs =>",songs)}
                {images[0] !== undefined ? <img src={images[0].url} alt="" /> : <img src="https://th.bing.com/th/id/OIP.khK65de-Bgy68D6JheAk3QHaHa?pid=ImgDet&rs=1" alt="" />}
                
                <h1 >{title}</h1>
            </div>
        </div>
    )
}

export default Playlists
