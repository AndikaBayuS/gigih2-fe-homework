import { useSelector } from "react-redux";
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

function App() {
  const token = useSelector((state) => state.token.value);

  // here is the songs view
  return (
    <>
      <Box p="5">
        {/* if token is empty, redirect to login*/}
        <Router>
          <Switch>
            <Route exact path="/">
              {!token ? <Login /> : <Redirect to="/create-playlist" />}
            </Route>
            <Route path="/create-playlist">
              <CreatePlaylist />
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
