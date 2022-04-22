import { render, screen } from "@testing-library/react";
import Song from "components/Song";
import { songData } from "msw/mockSongData";

describe("Search", () => {
  test("MSW Spotify Search API", () => {
    render(
      <Song
        uri={songData[0]?.uri}
        image={songData[0]?.album?.images[0]?.url}
        title={songData[0]?.name}
        album={songData[0]?.album?.name}
        selectState={() => {}}
        isSelected={false}
      />
    );
    const checkData = screen.getByTestId("song-title");
    expect(checkData).toHaveTextContent("Lover Boy");
  });
});
