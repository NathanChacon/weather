import './App.css'
import Home from './views/Home/Home'
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
