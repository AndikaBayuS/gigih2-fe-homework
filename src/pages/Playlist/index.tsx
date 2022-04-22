import { Box, SimpleGrid } from "@chakra-ui/react";
import PlaylistCard from "components/PlaylistCard";
import { playlistInterface } from "global/interfaces";
import { useAppSelector } from "hooks/hooks";
import { useEffect, useState } from "react";
import { retrieveUserPlaylist } from "services/axios.service";

const Playlist = () => {
  const token = useAppSelector((state) => state.token.value);
  const userId = useAppSelector((state) => state.user.data.id);
  const [userPlaylist, setUserPlaylist] = useState<playlistInterface[]>([]);

  useEffect(() => {
    retrieveUserPlaylist(userId, token)
      .then((res) => {
        setUserPlaylist(res.data.items);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(userPlaylist);
  return (
    <>
      <Box p={5}>
        <SimpleGrid columns={{ xs: 2, md: 4, lg: 5, xl: 6 }} spacing={5}>
          {userPlaylist.map((playlist: playlistInterface) => (
            <PlaylistCard
              key={playlist.id}
              title={playlist.name}
              albumImage={playlist.images[0]?.url}
              owner={playlist.owner.display_name}
              totalSong={playlist.tracks.total}
            />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Playlist;
