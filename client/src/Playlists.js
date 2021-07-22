import React, { useEffect, useState } from 'react'
import { useDataLayerValue } from './DataLayer';
import './Playlists.css'
import DownloadBar from './DownloadBar';

function Playlists({ spotify, images, title, id }) {
    const [{ songs }, dispatch] = useDataLayerValue();
    const [tracks, setTracks] = useState([]);
    const [artists, setArtists] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    
    const onClickHandler = (event) => {
        event.preventDefault();
        
        spotify.getPlaylist(id).then((response) =>
            dispatch({
                type: "SET_SONGS",
                songs: response.tracks.items,
            })
        );
        setIsSelected(true);
        
    }
    useEffect(() => {
        // console.log("songs from Playlists.js =>", songs)
        setTracks(songs.map((song) => song.track.name))
        // eslint-disable-next-line array-callback-return
        setArtists(songs.map((song) => song.track.artists.map((artist) => artist.name)))
        // songs.map((song) => song.track.artists.map((artist) => {
        //     setValues([...values, artist.name]);
        // }))
    }, [songs])
    
    return (
        <>
            <div className="playLists" onClick={onClickHandler}>
                <div className="playLists__info">
                    {/* {console.log("tracks => ", tracks)} */}
                    {/* {console.log("values => ", values)} */}
                    {/* {console.log("data => ", datas)} */}
                    {images[0] !== undefined ? <img src={images[0].url} alt="" /> : <img src="https://th.bing.com/th/id/OIP.khK65de-Bgy68D6JheAk3QHaHa?pid=ImgDet&rs=1" alt="" />}
                    
                    <h1 >{title}</h1>
                </div>
            </div>
            {isSelected && <DownloadBar tracks={tracks} artists={artists} />}
        </>
    )
}

export default Playlists



// {
//     closer: ["singer1", "singer2"],
//     dinero: [ "singer3" ]    
// }
