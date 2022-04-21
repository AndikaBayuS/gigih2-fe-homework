import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const retrieveSongs = (searchSong: string, token: string) => {
  return instance.get(`/search`, {
    params: {
      q: searchSong,
      type: "track",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const retrieveTopSongs = (token: string) => {
  return instance.get(`me/top/tracks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const retrieveUserId = (token: string) => {
  return instance.get(`/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createPlaylist = (
  userId: string,
  title: string,
  description: string,
  token: string
) => {
  return instance.post(
    `/users/${userId}/playlists`,
    {
      name: title,
      description: description,
      public: false,
      collaborative: false,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const pushSongs = (playlistId: string, songUris: string[], token: string) => {
  return instance.post(
    `/playlists/${playlistId}/tracks`,
    {
      uris: [...songUris],
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export {
  retrieveSongs,
  retrieveTopSongs,
  retrieveUserId,
  createPlaylist,
  pushSongs,
};
