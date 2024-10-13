import React, { useEffect, useState } from "react";
import { authorizeUrl } from "./spotifyAuth";
function SpotifyShit() {
  const CLIENT_ID = "da23bdf5b4334272a1dc8e48abb73409";
  const CLIENT_SECRET = "cfc99605c4324f83a2e5759931e707ec";
  const REDIRECT_URI = "http://localhost:3000";

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [songs, setSongs] = useState([]);
  const [playlistLink, setPlaylistLink] = useState("");
  const code = new URLSearchParams(window.location.search).get("code");
  // Component to display each song with a remove button
  const DisplaySongList = ({ songName, index }) => {
    const removeSong = () => {
      // Update the songlist immutably by filtering out the removed song
      setSongs((prevList) => prevList.filter((_, i) => i !== index));
    };

    return (
      <div className="musicWrapper">
        <button onClick={removeSong}>Remove Song</button>
        <p className="musicTitle">{songName}</p>
      </div>
    );
  };
  useEffect(() => {
    if (code && !token) {
      fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        },
        body: `grant_type=authorization_code&code=${encodeURIComponent(code)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setToken(data.access_token);
            localStorage.setItem("token", data.access_token);
            window.history.replaceState({}, document.title, "/");
          }
        })
        .catch((error) => console.error("Error fetching access token:", error));
    }
  }, [code, token]);

  const handleFetchPlaylist = () => {
    const playlistId = playlistLink.split("playlist/")[1].split("?")[0];
    if (token && playlistId) {
      fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => setSongs(data.items.map((item) => item.track.name)))
        .catch((error) => console.error("Error fetching playlist:", error));
    }
  };

  return (
    <div>
      {token ? (
        <>
          <h2>Playlist Songs</h2>
          <input
            type="text"
            placeholder="Enter Spotify Playlist Link"
            value={playlistLink}
            onChange={(e) => setPlaylistLink(e.target.value)}
          />
          <button onClick={handleFetchPlaylist}>Fetch Playlist</button>
          <ul>
            {songs.map((song, i) => (
              <DisplaySongList key={"song" + i} songName={song} index={i} />
            ))}
          </ul>
        </>
      ) : (
        <a href={authorizeUrl}>Login to Spotify</a>
      )}
    </div>
  );
}

export default SpotifyShit;
