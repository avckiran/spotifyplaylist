import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './styles/App.css';
import Landing from './Landing';
import User from './User';
import Playlist from '../components/playlists/Playlist';



class App extends Component {

    render() {
        return (
            <Router>
                <Route exact path='/' component={Landing} />
                <Switch>
                    <Route exact path='/me/:access_token' component={User} />
                    <Route exact path='/playlist/:playlist_id' component={Playlist} />
                </Switch>
            </Router>
        )
    }
}

export default App;