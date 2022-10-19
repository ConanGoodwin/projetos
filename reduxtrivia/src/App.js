import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@creativebulma/bulma-tooltip/dist/bulma-tooltip.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/settings';
import FeedBack from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        {/* <p>SUA VEZ</p> */}
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/game" component={ Game } />
          <Route exact path="/settings" component={ Settings } />
          <Route exact path="/feedback" component={ FeedBack } />
          <Route exact path="/ranking" component={ Ranking } />
        </Switch>
      </header>
    </div>
  );
}
