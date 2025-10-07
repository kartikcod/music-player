import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);

  // 1. Get token from backend
  useEffect(() => {
    axios.get("http://localhost:5000/token")
      .then(res => setToken(res.data.access_token))
      .catch(err => console.log(err));
  }, []);

  // 2. Search tracks (example: 'Imagine Dragons')
  const searchTracks = async () => {
    if (!token) return;
    const res = await axios.get(
      "https://api.spotify.com/v1/search",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          q: "Imagine Dragons",
          type: "track",
          limit: 10
        }
      }
    );
    setTracks(res.data.tracks.items);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Spotify Music App</h1>
      <button onClick={searchTracks} style={{ padding: "10px 20px", margin: "20px 0" }}>
        Search Tracks
      </button>

      <div>
        {tracks.map(track => (
          <div key={track.id} style={{ marginBottom: 20 }}>
            <img src={track.album.images[0].url} alt="" width={100} />
            <div>
              <strong>{track.name}</strong> by {track.artists.map(a => a.name).join(", ")}
            </div>
            <audio controls src={track.preview_url}></audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
