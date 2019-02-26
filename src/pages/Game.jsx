import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import cards from '../data/cards.json';
import { rollDie } from '../utils.js';
 
class Game extends React.Component {
    state = {
        dieResult: 0,
        currPlaneIdx: 0
    };

    onRoll = () => {
        this.setState({ dieResult: rollDie() });
    }

    onShuffle = () => {
        const { store } = this.props;
        store.shuffleDeck();
        this.setState({ currPlaneIdx: 0 });
    }

    toNextPlane = () => {
        const { store } = this.props;
        const { currPlaneIdx } = this.state;
        const maxPlanes = store.selectedDeck.length;
        if (currPlaneIdx + 1 < maxPlanes) {
            this.setState({ currPlaneIdx: currPlaneIdx + 1 });
        } else {
            this.setState({ currPlaneIdx: 0 });
        }
    }

    render() {
        const { store } = this.props;
        const { dieResult, currPlaneIdx } = this.state;
        const currPlane = cards[store.selectedDeck[currPlaneIdx]];

        return (
            <div>
                <Link to="/">Back To Home</Link>
                <button onClick={this.onShuffle}>Shuffle</button>
                <button onClick={this.onRoll}>Roll Die</button>
                <button onClick={this.toNextPlane}>Planeswalk</button>
                <p>{dieResult}</p>
                <p>{currPlane.nameFormatted}</p>
                <img alt={currPlane} src={currPlane.path} />
                <p>{store.selectedDeckId}</p>
                <p>{store.selectedDeck.map(id => cards[id].nameFormatted + ' ')}</p>
            </div>
        );
    }
}

export default inject('store')(observer(Game));