import {
  Box,
  Button,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { searchInterface } from "global/interfaces";
import CreatePlaylistButton from "./CreatePlaylistButton";

const Search = ({ setSearchSong, getSong }: searchInterface) => {
  return (
    <>
      <Box
        display={{ base: "block", md: "flex" }}
        alignItems="center"
        justifyContent="center"
      >
        <Box mb={{ base: "3", md: "0" }} w={{ base: "full", md: "md" }}>
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
      </Box>
    </>
  );
};

export default Search;
