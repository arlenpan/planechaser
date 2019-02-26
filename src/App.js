import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';

import Home from './pages/Home';
import Game from './pages/Game';
import Store from './Store.js';

const store = new Store();

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="main-container">
                        <Route path="/game" component={Game} />
                        <Route exact path="/" component={Home} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

