import React, {Component} from 'react';
import ListBooks from './ListBooks';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import NoMatchPage from './NoMatchPage'
import Search from './Search';

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <ListBooks />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route>
            <NoMatchPage />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
