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
import { createPlaylist, pushSongs } from "services/axios.service";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { clearSelectedSong } from "reducer/selectedSongSlice";

const Form = ({ close }: { close: () => void }) => {
  const token = useAppSelector((state) => state.token.value);
  const songUris = useAppSelector((state) => state.selectedSong.uri);
  const userData = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  const [playlistId, setPlaylistId] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [totalSong, setTotalsong] = useState(0);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  // run addSong function when playlistId is set
  useEffect(() => {
    // add songs to the playlist
    if (playlistId) {
      pushSongs(playlistId, songUris, token)
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setPlaylistId("");
          dispatch(clearSelectedSong());
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistId, onClose]);

  // get the form data
  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // handle form submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.title.length > 10) {
      createPlaylist(userData.id, form.title, form.description, token)
        .then((response) => {
          setPlaylistId(response.data.id);
          setTotalsong(songUris.length);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          onOpen();
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

  return (
    <>
      <Center>
        <Box w="full">
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
            You've added {totalSong} songs to your playlist!
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              onClick={() => {
                onClose();
                close();
              }}
              colorScheme="green"
            >
              Understand
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Form;
