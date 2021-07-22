import React, { useEffect, useState, useRef } from 'react'
import { useDataLayerValue } from './DataLayer';
import axios from 'axios';
import './Playlists.css'

function Playlists({ spotify, images, title, id }) {
    const [{ songs }, dispatch] = useDataLayerValue();
    const [tracks, setTracks] = useState([]);
    const [artists, setArtists] = useState([]);

    const previousValues = useRef({ tracks, artists });
    
    const onClickHandler = () => {
        spotify.getPlaylist(id).then((response) =>
            dispatch({
                type: "SET_SONGS",
                songs: response.tracks.items,
            })
        );
        
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

    useEffect(() => {
        if (
            previousValues.current.keys !== tracks &&
            previousValues.current.values !== artists
        ) {
            //your logic here
            // tracks.forEach((track,index) => console.log("track => ", track, index));
            // artists.forEach(artist => (console.log("artist => ", artist[i])));
            // for (var i = 0; i < Object.keys(songs).length; i++){
            //     let _artist = artists[0][i]
            //     let _song = tracks[0][i]
                
            //     let address = `http://localhost:5000/start_download?song=` + _song + `&artists=` + _artist
            //     address = address.replace(/ /g, '+').replace('(','+').replace('!','+').replace(/\,/g,'+').replace(/\./g,'+').replace(')','+').replace("'",'+').replace(/\$/g,'+');
            //     console.log(address)
            //     callBackendAPI(address);
            // }
            console.log("tracks",tracks);
            console.log("artists",artists);
            
            var keys = tracks;
            var values = artists;
            
            var result = {};
            keys.forEach((key, i) => result[key] = values[i]);
            console.log("results",result);
            // console.log("len of artists = ", Object.keys(songs).length);
            // artists.map((artist, index) => {
            //     console.log("artist = ", artist);
            // } )
            previousValues.current = { tracks, artists };
        }
    });

    const callBackendAPI = async (tracks, artists, url) => {
        
        let formData = new FormData();    //formdata object

        formData.append('tracks', tracks);   //append the values with key, value pair
        formData.append('artists', artists);

        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post(url, formData, config)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });


        // await axios.get(address)
        //     .then((req, res) => {
        //         console.log("req => ", req.data);
        //     }).catch(err => {
        //         console.error("error => ", err);
        //     });

        // if (response.status !== 200) {
        //     throw Error(body.message) 
        // }
        // console.log(body);
    };
    
    return (
        <div className="playLists" onClick={onClickHandler}>
            <div className="playLists__info">
                {/* {console.log("tracks => ", tracks)} */}
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