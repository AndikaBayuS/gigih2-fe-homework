import { useEffect, useState } from "react";
import { createPlaylist, pushSongs } from "../../services/axios.service";

const CreatePlaylist = ({ token, userId, songUris }) => {
  const [playlistId, setPlaylistId] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  // run addSong function when playlistId is set
  useEffect(() => {
    if (playlistId) {
      addSongs();
    }
  }, [playlistId]);

  // get the form data
  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.title.length > 10) {
      await createPlaylist(userId, form.title, form.description)
        .then((response) => {
          setPlaylistId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
      setForm({ title: "", description: "" });
      alert("Successfully created playlist");
    } else {
      alert("Title must be more than 10 characters");
    }
  };

  // add songs to the playlist
  const addSongs = async () => {
    pushSongs(playlistId, songUris)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96 bg-gray-800 p-5 rounded">
          <div className="flex-col w-full mb-4">
            <label htmlFor="title" className="text-white text-md font-medium">
              Title
            </label>
            <input
              type="text"
              className="min-w-0 w-full px-3 py-1.5 text-base font-normal bg-white border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Title"
              name="title"
              value={form.title}
              onChange={handleForm}
            />
          </div>
          <div className="flex-col w-full mb-4">
            <label htmlFor="title" className="text-white text-md font-medium">
              Description
            </label>
            <input
              type="text"
              className="min-w-0 w-full px-3 py-1.5 text-base font-normal bg-white border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Description"
              name="description"
              value={form.des}
              onChange={handleForm}
            />
          </div>
          <div>
            <button
              id="submit"
              type="submit"
              className="py-2 px-4 bg-blue-600 rounded text-white font-medium uppercase hover:bg-blue-700 text-xs leading-tight"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePlaylist;
