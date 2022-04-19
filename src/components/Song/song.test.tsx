import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
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

// Maybe i'm overdoing this ~~
describe("Song", () => {
  test("Song Image Rendered", () => {
    render(renderSong);
    const songImage = screen.findByTestId("song-image");
    expect(songImage).toBeInTheDocument;
  });

  test("Song Title Rendered", async () => {
    render(renderSong);
    const songTitle = screen.findByTestId("song-title");
    expect((await songTitle).textContent).toBe("Beatles");
  });

  test("Song Album Rendered", async () => {
    render(renderSong);
    const songAlbum = screen.findByTestId("song-album");
    expect((await songAlbum).textContent).toBe("Jude");
  });

  test("Song Button Rendered", async () => {
    render(renderSong);
    const songButton = screen.findByTestId("song-button");
    expect((await songButton).textContent).toBe("Select");
  });
});
