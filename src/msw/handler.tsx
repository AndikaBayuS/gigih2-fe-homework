import { rest } from "msw";
import { songData } from "./mockSongData";

export const handler = [
  rest.get("https://api.spotify.com/v1/search:q:type", (req, res, ctx) => {
    const { q, type } = req.params;
    return res(ctx.status(200), ctx.json(songData));
  }),
];
