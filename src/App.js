import { useEffect } from 'react';
import SpotifyWebApi from "spotify-web-api-js";
import './App.css';
import { useDataLayerValue } from './DataLayer';
import Login from './Login';
import { getTokenFromUrl } from './spotify';

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    // Set token
    const hash = getTokenFromUrl();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      spotify.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token,
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
      <Login />

    </div>
  );
}

export default App;
