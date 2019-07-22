import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './styles/App.css';
import Landing from './Landing';



class App extends Component {

    render() {
        return (
            <Router>
                <Route exact path='/' component={Landing} />
            </Router>
        )
    }
}

export default App;