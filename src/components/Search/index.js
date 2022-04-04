const Search = ({ setSearchSong, getSong }) => {
  return (
    <div className="flex justify-center">
      <div className="mb-3 xl:w-96">
        <div className="flex w-full">
          <input
            type="search"
            className="flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal bg-white border border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearchSong(e.target.value)}
          />
          <button
            className="px-6 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-r focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-blue-700"
            type="button"
            onClick={getSong}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
