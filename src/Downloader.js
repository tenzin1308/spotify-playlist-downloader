import React from 'react'
import './Downloader.css'
import { useDataLayerValue } from './DataLayer'
import Playlists from './Playlists';


function Downloader({ spotify }) {
    const [{ playlists }, dispatch] = useDataLayerValue();


    return (
        <div className="downloader" >
            <h4 className="downloader__header">
                Select the Playlist you would like to download.
            </h4>
            <br />
            {playlists?.items?.map((playlist) => (
                <Playlists title={playlist.name} />

            ))}
        </div>
    )
}

export default Downloader
