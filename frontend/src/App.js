import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register'; 
import NavigationTab from './components/Main/NavigationTab';
import Home from './components/Home/Home';
import Upload from './components/Main/Upload';
import AllGames from './components/Main/AllGames'
import Favourites from './components/Main/Favourites'
import MyProfile from './components/Main/MyProfile';
import GamePage from './components/Main/GamePage';
import Landing from './components/Main/Landing';
import Play from './components/Main/Play';
import OtherProfile from './components/Main/OtherProfile';
import NotFound from './components/Main/NotFound';

function App() {
  return (
    <div className="App">
      <Router>
      {localStorage.getItem('Access-Token') && <Route path="/" component={NavigationTab} />}
        <Switch>
          <Route path="/allgames" component={AllGames} />
          <Route path="/play" component={Play} />
          <Route path="/404" component={NotFound} />
          <Route path="/profile/*" component={OtherProfile} />
          <Route path="/game/*" component={GamePage} />
            {localStorage.getItem('Access-Token') && <Route path="/home" component={Landing} />}
            {localStorage.getItem('Access-Token') && <Route path="/myprofile" component={MyProfile} />}
            {localStorage.getItem('Access-Token') && <Route path="/upload" component={Upload} />}
            {localStorage.getItem('Access-Token') && <Route path="/favourites" component={Favourites} />}
            {!localStorage.getItem('Access-Token') && <Route path="/login" component={Login} />}
            {!localStorage.getItem('Access-Token') && <Route path="/register" component={Register} />}
            {!localStorage.getItem('Access-Token') && <Route path="/" component={Home} />}
            
        </Switch>
      </Router>
    </div>
  );
}

export default App;
