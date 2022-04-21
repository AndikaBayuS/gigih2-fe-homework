import {
  Box,
  Button,
  Center,
  InputGroup,
  Input,
  InputRightElement,
  Flex,
} from "@chakra-ui/react";
import { searchInterface } from "global/interfaces";
import CreatePlaylistButton from "./CreatePlaylistButton";

const Search = ({ setSearchSong, getSong }: searchInterface) => {
  return (
    <>
      <Center>
        <Flex alignItems="center">
          <Box w="md">
            <InputGroup>
              <Input
                type="text"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearchSong(e.target.value)}
              />
              <InputRightElement width="4.5rem" pr="2">
                <Button
                  size="sm"
                  type="button"
                  onClick={getSong}
                  colorScheme="green"
                >
                  Search
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
          <CreatePlaylistButton />
        </Flex>
      </Center>
    </>
  );
};

export default Search;
