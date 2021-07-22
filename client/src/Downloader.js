import React from 'react'
import './Downloader.css'
import { useDataLayerValue } from './DataLayer'
import Playlists from './Playlists';


function Downloader({ spotify }) {
    const [{ playlists }] = useDataLayerValue();


    return (
        <div className="downloader" >
            <h1 className="downloader__header">
                Select the Playlist you would like to download.
            </h1>
            <br />
            {playlists?.items?.map((playlist, index) => (
                <Playlists spotify={spotify} images={playlist.images} title={playlist.name} id={playlist.id} key={index}/>

            ))}
        </div>
    )
}

export default Downloader
