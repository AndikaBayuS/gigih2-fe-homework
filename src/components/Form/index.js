import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  retrieveUserId,
  createPlaylist,
  pushSongs,
} from "../../services/axios.service";

const Form = ({ songUris }) => {
  const token = useSelector((state) => state.token.value);
  const [playlistId, setPlaylistId] = useState("");
  const [userId, setUserId] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  // run addSong function when playlistId is set
  useEffect(() => {
    if (playlistId) {
      addSongs();
    }
    getUserId();
  }, [playlistId]);

  // get the form data
  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // a function to get the user id
  const getUserId = () => {
    retrieveUserId(token)
      .then((response) => {
        setUserId(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.title.length > 10) {
      createPlaylist(userId, form.title, form.description, token)
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
  const addSongs = () => {
    pushSongs(playlistId, songUris, token)
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
        <div className="mb-3 xl:w-96 bg-neutral-800 p-5 rounded-lg">
          <div className="flex-col w-full mb-4">
            <label htmlFor="title" className="text-white text-md font-medium">
              Title
            </label>
            <input
              type="text"
              className="min-w-0 w-full px-3 py-1.5 text-base font-normal bg-white border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
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
              className="min-w-0 w-full px-3 py-1.5 text-base font-normal bg-white border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={handleForm}
            />
          </div>
          <div>
            <button
              id="submit"
              type="submit"
              className="py-2 px-4 bg-green-600 rounded text-white font-medium uppercase hover:bg-green-700 text-xs leading-tight"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
