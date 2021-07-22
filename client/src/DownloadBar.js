import axios from 'axios';
import React, { useState } from 'react'
import './DownloadBar.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import GetAppIcon from '@material-ui/icons/GetApp';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

function DownloadBar({ tracks, artists }) {
    const [downloaded, setDownloaded] = useState(false);
    const [downloading, setDownloading] = useState(false);


    const handleDownload = async () => {
        setDownloading(true);
        var keys = tracks;
        var values = artists;
        
        var result = {};
        keys.forEach((key, i) => result[key] = values[i]);

        var headers = { 
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
        };

        await axios.post("http://localhost:5000/Mr-Logger", result, {headers})
            .then(function (response) {
                setDownloading(false);
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        
        setDownloaded(true);

    };


    return (
        <div className="download__bar" onClick={() => { handleDownload() }}>
            <div className="left__child">
                <h1>Download Bar</h1>
            </div>
            <div className="right__child">
                {!downloading && !downloaded ? <GetAppIcon /> : downloading ? <CircularProgress color="secondary" /> : <CheckCircleOutlineIcon color="primary"s/>}
            </div>

        </div>
    )
}

export default DownloadBar
