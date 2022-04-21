import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Form from "components/Form";
import { useAppSelector } from "hooks/hooks";

const CreatePlaylistButton = () => {
  const songUris = useAppSelector((state) => state.selectedSong.uri);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        ml={{ base: "0", md: "3" }}
        w={{ base: "100%", md: "auto" }}
        colorScheme="green"
        size="sm"
        isDisabled={songUris.length < 1 ? true : false}
        onClick={onOpen}
      >
        Create Playlist
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl">Create Playlist</ModalHeader>
          <ModalBody>
            <Text mb="3" fontSize="md">
              Done selecting your song ? Let's create your playlist !
            </Text>
            <Form close={onClose} />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePlaylistButton;
