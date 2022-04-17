import { Box, Button, Spacer, Flex, Image, Text } from "@chakra-ui/react";
import { songInterface } from "global/interfaces";

const Song = ({
  uri,
  image,
  title,
  album,
  selectState,
  isSelected,
}: songInterface) => {
  return (
    <>
      <Box bgColor="gray.700" borderRadius="md">
        <Flex align="center">
          <Box>
            <Flex align="center">
              <Image
                src={image}
                alt="Album"
                boxSize="100px"
                borderRadius="md"
              />
              <Box pl="3">
                <Text fontSize="xl" fontWeight="semibold">
                  {title}
                </Text>
                <Text color="gray.400">{album}</Text>
              </Box>
            </Flex>
          </Box>
          <Spacer />
          <Box pr="3">
            <Button
              colorScheme="green"
              onClick={() => {
                selectState(uri);
              }}
            >
              {isSelected ? "Select" : "Deselect"}
            </Button>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Song;
