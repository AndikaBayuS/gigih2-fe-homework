import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Spacer,
  Text,
  Avatar,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import { useAppSelector } from "hooks/hooks";

const Navbar = () => {
  const userData = useAppSelector((state) => state.user.data);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box w="full" px={4} bgColor="whiteAlpha.100">
        <Flex alignItems="center" h={16}>
          <IconButton
            aria-label="Hamburger"
            icon={<HamburgerIcon />}
            onClick={() => {
              onOpen();
            }}
          />
          <Text fontSize="xl" fontWeight="bold" ml={4}>
            Creativy
          </Text>
          <Spacer ml="auto" />
          <Box bgColor="whiteAlpha.300" borderRadius="full">
            <Flex alignItems="center" pl={3}>
              <Text mr={2} fontWeight="semibold">
                {userData.display_name}
              </Text>
              <Avatar
                size="md"
                name={userData.display_name}
                src={userData.images[0]?.url}
              />
            </Flex>
          </Box>
        </Flex>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
