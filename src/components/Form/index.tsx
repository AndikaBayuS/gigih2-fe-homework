import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Center,
  Button,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import {
  retrieveUserId,
  createPlaylist,
  pushSongs,
} from "services/axios.service";
import { songUrisInterface } from "global/interfaces";
import { useAppSelector } from "hooks/hooks";

const Form = ({ songUris }: songUrisInterface) => {
  const token = useAppSelector((state) => state.token.value);
  const [playlistId, setPlaylistId] = useState("");
  const [userId, setUserId] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  // run addSong function when playlistId is set
  useEffect(() => {
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

    if (playlistId) {
      addSongs();
    }
    getUserId();
  }, [playlistId, songUris, token]);

  // get the form data
  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // handle form submit
  const handleSubmit = (e: FormEvent) => {
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

  return (
    <>
      <Center>
        <Box w="sm">
          <form onSubmit={handleSubmit}>
            <FormControl mb="3">
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                type="text"
                placeholder="Title"
                id="title"
                name="title"
                value={form.title}
                onChange={handleForm}
              />
              <FormHelperText>Your playlist title</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="title">Description</FormLabel>
              <Input
                type="text"
                placeholder="Description"
                id="description"
                name="description"
                value={form.description}
                onChange={handleForm}
              />
              <FormHelperText>Your playlist description</FormHelperText>
            </FormControl>
            <Button
              mt="3"
              w="100%"
              id="submit"
              type="submit"
              colorScheme="green"
            >
              Create
            </Button>
          </form>
        </Box>
      </Center>
    </>
  );
};

export default Form;
