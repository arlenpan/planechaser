import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';

import Home from './pages/Home';
import Game from './pages/Game';
import GameStore from './store/GameStore.js';
import AppStore from './store/AppStore.js';

const gameStore = new GameStore();
const appStore = new AppStore();

export default class App extends React.Component {
    render() {
        return (
            <Provider gameStore={gameStore} appStore={appStore}>
                <Router>
                    <div className="container main-container">
                        <Route path="/game" component={Game} />
                        <Route exact path="/" component={Home} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

