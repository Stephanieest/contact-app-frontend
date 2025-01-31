import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import AddContact from './pages/AddContact';
import Favourites from './pages/Favourites';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/landing">Home</Link></li>
            <li><Link to="/add">Add Contact</Link></li>
            <li><Link to="/favourites">Favourites</Link></li>
            <li><Link to="/contacts">Contacts</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/landing" exact component={LandingPage} />
          <Route path="/contacts" exact component={Home} />
          <Route path="/add" component={AddContact} />
          <Route path="/favourites" component={Favourites} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;