import { render, screen } from "@testing-library/react";
import Song from "components/Song";

const renderSong = (
  <Song
    uri="testimage"
    image="testimage"
    title="Beatles"
    album="Jude"
    selectState={function (uri: string): void {
      throw new Error("Function not implemented.");
    }}
    isSelected={false}
  />
);

describe("Song", () => {
  test("Song Image Rendered", () => {
    render(renderSong);
    const songImage = screen.getByTestId("song-image");
    expect(songImage).toBeInTheDocument();
  });

  test("Song Title Rendered", () => {
    render(renderSong);
    const songTitle = screen.getByTestId("song-title");
    expect(songTitle).toHaveTextContent("Beatles");
  });

  test("Song Album Rendered", () => {
    render(renderSong);
    const songAlbum = screen.getByTestId("song-album");
    expect(songAlbum).toHaveTextContent("Jude");
  });

  test("Song Button Rendered", () => {
    render(renderSong);
    const songButton = screen.getByTestId("song-button");
    expect(songButton).toHaveTextContent("Select");
  });
});
