import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Center, Text, SimpleGrid } from "@chakra-ui/react";
import Song from "components/Song";
import Search from "components/Search";
import { retrieveSongs } from "services/axios.service";
import Form from "components/Form";
import { songDataInterface, selectedInterface } from "global/interfaces";

const CreatePlaylist = () => {
  const token = useSelector((state: any) => state.token.value);
  const [searchSong, setSearchSong] = useState("");
  const [songData, setSongData] = useState<songDataInterface[]>([]);
  const [selectedSongs, setSelectedSongs] = useState<
    selectedInterface["uri"][]
  >([]);
  const [combineSongs, setCombineSongs] = useState<songDataInterface[]>([]);

  // basically pass songData to combineSongs and add isSelected to combineSongs
  useEffect(() => {
    const handleCombineSongs = songData.map((song: songDataInterface) => ({
      ...song,
      isSelected: !selectedSongs.find((data) => data === song.uri),
    }));
    setCombineSongs(handleCombineSongs);
  }, [songData, selectedSongs]);

  // a function to get song data from spotify
  const getSong = () => {
    retrieveSongs(searchSong, token)
      .then((response) => {
        setSongData(response.data.tracks.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // a function to handle the select state of the song
  const handleSelect = (uri: string) => {
    const selected = selectedSongs.find((song) => song === uri);
    selected
      ? setSelectedSongs(selectedSongs.filter((song) => song !== uri))
      : setSelectedSongs([...selectedSongs, uri]);
  };

  return (
    <>
      <Center>
        <Text fontSize="2xl" fontWeight="semibold">
          Create Playlist
        </Text>
      </Center>

      <Search getSong={getSong} setSearchSong={setSearchSong} />
      <Form songUris={selectedSongs} />

      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="5" py="5">
        {combineSongs.map((song) => {
          const { uri, name, artists, album, isSelected } = song;
          return (
            <Song
              key={uri}
              uri={uri}
              image={album.images[0]?.url}
              title={name}
              album={artists[0]?.name}
              selectState={handleSelect}
              isSelected={isSelected}
            />
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default CreatePlaylist;
