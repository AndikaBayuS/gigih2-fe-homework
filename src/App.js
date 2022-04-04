import { useEffect, useState } from "react";
import axios from "axios";
import Song from "./components/Song";
import url from "./helper/spotify";
import CreatePlaylist from "./components/CreatePlaylist";
import Search from "./components/Search";

function App() {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [searchSong, setSearchSong] = useState("");
  const [songData, setSongData] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [combineSongs, setCombineSongs] = useState([]);

  // get the token from the url
  useEffect(() => {
    const queryString = new URL(window.location.href.replace("#", "?"))
      .searchParams;
    const accessToken = queryString.get("access_token");
    const getUserId = () => {
      axios
        .get(`https://api.spotify.com/v1/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setUserId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserId();
    setToken(accessToken);
  }, []);

  // basically pass songData to combineSongs and add isSelected to combineSongs
  useEffect(() => {
    const handleCombineTracks = songData.map((song) => ({
      ...song,
      isSelected: selectedSongs.find((data) => data === song.uri),
    }));
    setCombineSongs(handleCombineTracks);
  }, [songData, selectedSongs]);

  // a function to get song data from spotify
  const getSong = async () => {
    await axios
      .get(
        `https://api.spotify.com/v1/search?q=${searchSong}&type=track&access_token=${token}`
      )
      .then((response) => {
        setSongData(response.data.tracks.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // a function to handle the select state of the song
  const handleSelect = (uri) => {
    const selected = selectedSongs.find((song) => song === uri);
    selected
      ? setSelectedSongs(selectedSongs.filter((song) => song !== uri))
      : setSelectedSongs([...selectedSongs, uri]);
  };

  // here is the songs view
  return (
    <div className="p-5 bg-gray-900 h-screen space-y-5 overflow-auto">
      <div className="text-center">
        <h2 className="text-white text-3xl mb-5 font-semibold">
          Create Playlist
        </h2>
        <a
          href={url}
          className="py-2 px-4 bg-blue-600 rounded text-white font-medium uppercase hover:bg-blue-700 text-xs leading-tight"
        >
          Login
        </a>
      </div>
      {/* if token is empty, hide the view*/}
      {!token ? (
        ""
      ) : (
        <div>
          <Search getSong={getSong} setSearchSong={setSearchSong} />
          <CreatePlaylist
            token={token}
            userId={userId}
            songUris={selectedSongs}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {combineSongs.map((song) => {
              const { uri, name, artists, album, isSelected } = song;
              return (
                <Song
                  key={uri}
                  uri={uri}
                  image={album.images[0]?.url}
                  title={name}
                  album={artists[0]?.name}
                  selectState={handleSelect}
                  isSelected={isSelected}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
