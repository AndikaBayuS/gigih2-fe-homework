import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import Navbar from "./index.";
import { store } from "store";

describe("Drawer Test", () => {
  test("Drawer button clicked", () => {
    const history = createMemoryHistory();
    history.push("/");
    render(
      <Provider store={store}>
        <Router history={history}>
          <Navbar />
        </Router>
      </Provider>
    );
    const drawerButton = screen.getByTestId("nav-button");
    userEvent.click(drawerButton);
    expect(screen.getByText("Basic Drawer")).toBeInTheDocument();
  });

  test("Drawer open and close", async () => {
    const history = createMemoryHistory();
    history.push("/");
    render(
      <Provider store={store}>
        <Router history={history}>
          <Navbar />
        </Router>
      </Provider>
    );
    const drawerButton = screen.getByTestId("nav-button");
    userEvent.click(drawerButton);
    expect(screen.getByText("Basic Drawer")).toBeInTheDocument();
    const closeButton = screen.getByTestId("close-button");
    userEvent.click(closeButton);
    await waitFor(() =>
      expect(screen.queryByText("Basic Drawer")).not.toBeInTheDocument()
    );
  });
});
