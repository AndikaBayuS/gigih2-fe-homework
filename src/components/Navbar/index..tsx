import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Spacer, Text, Avatar } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <>
      <Box w="full" px={4} bgColor="whiteAlpha.100">
        <Flex alignItems="center" h={16}>
          <HamburgerIcon />
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
    </>
  );
};

export default Navbar;
