import { Box, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { playlistCardInterface } from "global/interfaces";

const PlaylistCard = ({
  title,
  albumImage,
  owner,
  totalSong,
}: playlistCardInterface) => {
  return (
    <>
      <Box
        bgColor={useColorModeValue("gray.100", "gray.700")}
        maxW="300px"
        p={5}
        borderRadius="md"
      >
        <Image src={albumImage} borderRadius="md" mb={3} />
        <Box>
          <Text fontWeight="semibold" fontSize="2xl">
            {title}
          </Text>
          <Text color={useColorModeValue("gray.500", "gray.400")}>
            By {owner}, {totalSong} songs
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default PlaylistCard;
