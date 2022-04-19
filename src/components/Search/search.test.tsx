import { render, screen } from "@testing-library/react";
import Song from "components/Song";

describe("Search", () => {
  test("MSW Spotify Search API", () => {
    render(
      <Song
        uri={""}
        image={""}
        title={""}
        album={""}
        selectState={function (uri: string): void {
          throw new Error("Function not implemented.");
        }}
        isSelected={false}
      />
    );
    const checkData = screen.findByText("Lover Boy");
    expect(checkData).toBeInTheDocument;
  });
});
