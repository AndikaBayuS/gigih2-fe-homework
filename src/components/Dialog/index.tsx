import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  useDisclosure,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { dialogInterface } from "global/interfaces";
import { useEffect, useRef } from "react";

const Dialog = ({ total, showConfirmation }: dialogInterface) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (showConfirmation) {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showConfirmation]);
  return (
    <>
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
            You've added {total} songs to your playlist!
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

export default Dialog;
