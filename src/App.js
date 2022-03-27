import Song from "./components/Song";
import data from "./single-sample";

console.log(data);
function App() {
  return (
    <div className="flex flex-col items-center p-5 bg-gray-800 space-y-5 overflow-auto">
      <h3 className="text-white text-xl">Create Playlist</h3> 
      {data.map((song) => {
        const { id, name, artists, album } = song;
        return (
          <Song
            key={id}
            image={album.images[0]?.url}
            title={name}
            album={artists[0]?.name}
          />
        );
      })}
    </div>
  );
}

export default App;
