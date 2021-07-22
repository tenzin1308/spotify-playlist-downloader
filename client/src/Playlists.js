import React, { useEffect, useState, useRef } from 'react'
import { useDataLayerValue } from './DataLayer';
import './Playlists.css'

function Playlists({ spotify, images, title, id }) {
    const [{ songs }, dispatch] = useDataLayerValue();
    const [tracks, setTracks] = useState([]);
    const [artists, setArtists] = useState([]);

    const previousValues = useRef({ tracks, artists });
    
    const onClickHandler = () => {
        spotify.getPlaylist(id, { limit: 300 }).then((response) =>
            dispatch({
                type: "SET_SONGS",
                songs: response.tracks.items,
            })
        );
        
    }
    useEffect(() => {
        // console.log("songs from Playlists.js =>", songs[0])
        setTracks([songs.map((song) => song.track.name)])
        // eslint-disable-next-line array-callback-return
        setArtists([songs.map((song) => song.track.artists.map((artist) => artist.name)) ])
        // songs.map((song) => song.track.artists.map((artist) => {
        //     setValues([...values, artist.name]);
        // }))
    }, [songs])

    useEffect(() => {
        if (
            previousValues.current.keys !== tracks &&
            previousValues.current.values !== artists
        ) {
            //your logic here
            tracks.map((track, index) => {
                // callBackendAPI(track, artists[index]);
                console.log("track = ", track);
                console.log("artist = ", artists[index]);

            })
            previousValues.current = { tracks, artists };
        }
    });

    const callBackendAPI = async (tracks, artists) => {
        const response = await fetch('/start_download');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message) 
        }
        return body;
    };
    
    return (
        <div className="playLists" onClick={onClickHandler}>
            <div className="playLists__info">
                {console.log("tracks => ", tracks)}
                {/* {console.log("values => ", values)} */}
                {/* {console.log("data => ", datas)} */}
                {images[0] !== undefined ? <img src={images[0].url} alt="" /> : <img src="https://th.bing.com/th/id/OIP.khK65de-Bgy68D6JheAk3QHaHa?pid=ImgDet&rs=1" alt="" />}
                
                <h1 >{title}</h1>
            </div>
        </div>
    )
}

export default Playlists


// [
//     {
//         "closer": ["singer1", "singer2"],
//         "dinero" : [ "singer3" ]    
//     }
// ]