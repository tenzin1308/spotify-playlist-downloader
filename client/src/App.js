import React, { useState, useEffect } from 'react'
import SpotifyWebApi from "spotify-web-api-js"
import './App.css'
import { useDataLayerValue } from './DataLayer'
import Downloader from './Downloader'
import Login from './Login'
import { getTokenFromUrl } from './spotify'

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useDataLayerValue();
  const [other_user, setOtherUser] = useState ("d3miwarrior");

  useEffect(() => {
    // Set token
    const hash = getTokenFromUrl();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {

      // console.log(_token);
      
      spotify.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });

      spotify.getUserPlaylists(other_user)
        .then(function (data) {
          // dispatch({
          //   type: "SET_OTHER_USER_PLAYLISTS",
          //   other_user,
          // });
          console.log('Retrieved playlists', data);
        },function(err) {
          console.log('Something went wrong on App.js file !!!', err);
        });
      
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });
      spotify.getPlaylist("2ILLL6Ep7x6ahuHoSHvptu").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );
    }
  }, [token, dispatch]);
  
  return (
    <div className="app">
      {!token && <Login />}
      {token && <Downloader spotify={spotify} />}

    </div>
  );
}

export default App;
