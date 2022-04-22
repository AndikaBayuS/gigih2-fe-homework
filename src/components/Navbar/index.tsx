import {
  ChevronDownIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
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
  DrawerCloseButton,
  Link,
  useColorModeValue,
  useColorMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { Link as RouteLink } from "react-router-dom";
import { removeToken } from "reducer/tokenSlice";

const Navbar = () => {
  const userData = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();
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
            data-testid="nav-button"
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
              <Menu>
                <MenuButton
                  as={Button}
                  borderRadius="full"
                  variant="ghost"
                  size="md"
                  px={0}
                >
                  <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      dispatch(removeToken());
                    }}
                  >
                    Log Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Box>
        </Flex>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton data-testid="close-button" />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
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
