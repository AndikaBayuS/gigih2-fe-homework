const Song = ({ uri, image, title, album, selectState, isSelected }) => {
  return (
    <div className="flex flex-row justify-between items-center rounded shadow-lg bg-neutral-800">
      <div className="flex items-center">
        <img className="rounded-l w-20" src={image} alt="Album" />
        <div className="p-2">
          <h5 className="text-white text-xl font-medium">{title}</h5>
          <p className="text-gray-300 text-base">{album}</p>
        </div>
      </div>
      <button
        className="inline-block px-6 py-2.5 mr-3 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg"
        onClick={() => {
          selectState(uri);
        }}
      >
        {isSelected ? "DESELECT" : "SELECT"}
      </button>
    </div>
  );
};

export default Song;
