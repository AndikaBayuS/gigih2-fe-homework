import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import CreatePlaylist from "./pages/CreatePlaylist";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  const token = useSelector((state) => state.token.value);

  // here is the songs view
  return (
    <div className="p-5 bg-neutral-900 h-screen space-y-5 overflow-auto">
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
    </div>
  );
}

export default App;
