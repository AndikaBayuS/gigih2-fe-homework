import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { Box } from "@chakra-ui/react";
import CreatePlaylist from "./pages/CreatePlaylist";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useAppSelector } from "hooks/hooks";
import Navbar from "components/Navbar/index.";
import Playlist from "pages/Playlist";

function App() {
  const token = useAppSelector((state) => state.token.value);

  // here is the songs view
  return (
    <>
      <Box>
        {/* if token is empty, redirect to login*/}
        <Router>
          <Switch>
            <Route exact path="/">
              {!token ? <Login /> : <Redirect to="/create-playlist" />}
            </Route>
            <Route path="/create-playlist">
              <Navbar />
              {!token ? <Redirect exact to="/" /> : <CreatePlaylist />}
            </Route>
            <Route path="/user-playlist">
              <Playlist />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </Box>
    </>
  );
}

export default App;
