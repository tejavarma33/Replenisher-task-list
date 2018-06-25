import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import './App.css';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';

class App extends Component {

    render() {
        return (
            <Router>
                <div className="app">
                    <Route exact path="/" component={Login}/>
                    <Route path="/dashboard" component={Dashboard}/>
                </div>
            </Router>
        );
    }
}

export default App;
