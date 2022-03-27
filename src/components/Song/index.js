const Song = ({ image, title, album }) => {
  return (
    <div className="flex flex-row items-center rounded-md shadow-lg bg-white p-3">
      <header className="">
        <img
          className="rounded-md h-32 w-32"
          src={image}
          alt="Album"
        />
      </header>
      <div className="p-5">
        <h5 className="text-gray-900 text-xl font-medium mb-2">{title}</h5>
        <p className="text-gray-700 text-base mb-4">{album}</p>
      </div>
      <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg">
        Select
      </button>
    </div>
  );
};

export default Song;
