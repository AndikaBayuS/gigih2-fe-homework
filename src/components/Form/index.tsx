import { ChangeEvent, FormEvent, useEffect, useState, useRef } from "react";
import {
  Center,
  Button,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import {
  retrieveUserId,
  createPlaylist,
  pushSongs,
} from "services/axios.service";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { clearSelectedSong } from "reducer/selectedSongSlice";

const Form = () => {
  const token = useAppSelector((state) => state.token.value);
  const songUris = useAppSelector((state) => state.selectedSong.uri);
  const dispatch = useAppDispatch();

  const [playlistId, setPlaylistId] = useState("");
  const [userId, setUserId] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

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
    const addSongs = async () => {
      await pushSongs(playlistId, songUris, token).catch((error) => {
        console.log(error);
      });
    };

    if (playlistId) {
      addSongs();
    }
    getUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songUris]);

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
          onOpen();
        })
        .catch((error) => {
          console.log(error);
        });
      setForm({ title: "", description: "" });
    } else {
      // if the title is less than 10 characters
      toast({
        title: "Error",
        description: "Title should have more than 10 words!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  console.log(songUris);
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

      {/* alert dialog */}
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onClose}
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Yay, You Successfully Created A Playlist!!
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            You've added {songUris.length} songs to your playlist!
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose} colorScheme="green">
              Understand
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Form;
