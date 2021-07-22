import axios from 'axios';
import React, { useState } from 'react'
import './DownloadBar.css';

function DownloadBar({ tracks, artists }) {

    const handleDownload = async() => {
        var keys = tracks;
        var values = artists;
        
        var result = {};
        keys.forEach((key, i) => result[key] = values[i]);
        console.log("results", result);
        console.log("type of results", typeof (result));
        // result = JSON.stringify(result)
        // console.log("type of results", typeof (result));

        var headers = { 
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
        };

        await axios.post("http://localhost:5000/Mr-Logger", result, {headers})
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });

    };

    
    // const handleDownload = async(result) => {
    //     await axios.post("", result)
    //         .then(function (response) {
    //             console.log(response);
    //         }).catch(function (error) {
    //             console.log(error);
    //         });
    // }


    const [downloadReady, setDownloadReady] = useState(false);
    const [downloading, setDownloading] = useState(false);
    return (
        <div className="download__bars" onClick={handleDownload}>
            <h1>Download Bar</h1>
        </div>
    )
}

export default DownloadBar
