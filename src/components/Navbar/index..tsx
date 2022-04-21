import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Spacer,
  Text,
  Avatar,
  IconButton,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Link,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { useAppSelector } from "hooks/hooks";
import { Link as RouteLink } from "react-router-dom";

const Navbar = () => {
  const userData = useAppSelector((state) => state.user.data);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box w="full" px={4} bgColor={useColorModeValue("gray.100", "gray.700")}>
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
          <Button borderRadius="full" onClick={toggleColorMode} mr={3}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Box
            bgColor={useColorModeValue("gray.300", "gray.600")}
            borderRadius="full"
          >
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
            <Link as={RouteLink} to="/" style={{ textDecoration: "none" }}>
              <Box
                py={3}
                px={5}
                mb={3}
                w="full"
                borderRadius="md"
                bgColor={useColorModeValue("gray.100", "gray.600")}
              >
                Create Playlist
              </Box>
            </Link>
            <Link
              as={RouteLink}
              to="/user-playlist"
              style={{ textDecoration: "none" }}
            >
              <Box
                py={3}
                px={5}
                borderRadius="md"
                w="full"
                bgColor={useColorModeValue("gray.100", "gray.600")}
              >
                Playlist
              </Box>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
