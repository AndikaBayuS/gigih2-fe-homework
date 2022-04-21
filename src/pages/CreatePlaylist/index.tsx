import { useEffect, useState } from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import Song from "components/Song";
import Search from "components/Search";
import { retrieveSongs, retrieveTopSongs } from "services/axios.service";
import Form from "components/Form";
import { songDataInterface } from "global/interfaces";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { setSelectedSong } from "reducer/selectedSongSlice";

const CreatePlaylist = () => {
  const token = useAppSelector((state) => state.token.value);
  const selectedSongs = useAppSelector((state) => state.selectedSong.uri);
  const dispatch = useAppDispatch();

  const [searchSong, setSearchSong] = useState("");
  const [songData, setSongData] = useState<songDataInterface[]>([]);
  const [combineSongs, setCombineSongs] = useState<songDataInterface[]>([]);

  useEffect(() => {
    if (!searchSong) {
      retrieveTopSongs(token).then((response) => {
        setSongData(response.data.items);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // basically pass songData to combineSongs and add isSelected to combineSongs
  useEffect(() => {
    const handleCombineSongs = songData.map((song: songDataInterface) => ({
      ...song,
      isSelected: selectedSongs.find((data) => data === song.uri)
        ? true
        : false,
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
      ? dispatch(setSelectedSong(selectedSongs.filter((song) => song !== uri)))
      : dispatch(setSelectedSong([...selectedSongs, uri]));
  };

  return (
    <>
      <Box p={5}>
        <Search getSong={getSong} setSearchSong={setSearchSong} />
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="5" py="5">
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
      </Box>
    </>
  );
};

export default CreatePlaylist;
