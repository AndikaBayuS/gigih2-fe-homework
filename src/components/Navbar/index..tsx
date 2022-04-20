import { useState } from "react";
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

const Navbar = () => {
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
              <Text mr={2}>Dan Abrahmov</Text>
              <Avatar
                size="md"
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
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
