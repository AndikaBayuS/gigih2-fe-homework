import {
  Box,
  Button,
  Center,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";

const Search = ({ setSearchSong, getSong }) => {
  return (
    <>
      <Center>
        <Box w="sm">
          <InputGroup mb="3">
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
      </Center>
    </>
  );
};

export default Search;
