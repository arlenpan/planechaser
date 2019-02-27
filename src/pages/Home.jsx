import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import sets from '../data/sets.json';
import { ALL_DECKS } from '../consts.js';

class Home extends React.Component {
    onSelectDeck = e => this.props.gameStore.selectDeck(e.target.value);

    render() {
        const { gameStore } = this.props;
        const deckNames = Object.keys(sets);

        return (
            <div>
                <Link to="/game">Start Game</Link>
                <select value={gameStore.selectedDeckId} onChange={this.onSelectDeck}>
                    <option value={ALL_DECKS}>All Decks</option>
                    {deckNames.map(key => <option value={key} key={key}>{sets[key].nameFormatted}</option>)}
                </select>
                {/* <Link to="/createDeck">Create New Deck</Link> */}
            </div>
        );
    }
}

export default inject('gameStore')(observer(Home));