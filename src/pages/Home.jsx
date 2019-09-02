import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import sets from '../data/sets.json';
import { ALL_DECKS } from '../consts.js';

class Home extends React.Component {
    onSelectDeck = e => {
        const { gameStore } = this.props;
        const deck = e.target.value;
        gameStore.selectDeck(deck);
    }

    render() {
        const { gameStore } = this.props;
        const deckNames = Object.keys(sets);

        return (
            <div className="container home-container">
                <div className="subcontainer">
                    {gameStore.currPlaneIdx > 0 && <Link to="/game">Return To Game</Link>}
                    <h1>planechaser</h1>
                    <Link to="/game" onClick={gameStore.resetDeck}>
                        <button className="button-main">NEW GAME</button>
                    </Link>
                    <select value={gameStore.selectedDeckId} onChange={this.onSelectDeck}>
                        <option value={ALL_DECKS}>All Decks</option>
                        {deckNames.map(key => <option value={key} key={key}>{sets[key].nameFormatted}</option>)}
                    </select>
                    {/* <Link to="/createDeck">Create New Deck</Link> */}
                </div>
            </div>
        );
    }
}

export default inject('gameStore')(observer(Home));