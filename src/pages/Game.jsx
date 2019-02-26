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

    onRestart = () => {
        const { store } = this.props;
        store.selectDeck(store.selectedDeckId);
        this.setState({ currPlaneIdx: 0 });
    }

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
        if (currPlaneIdx + 1 < store.selectedDeck.length) {
            this.setState({ currPlaneIdx: currPlaneIdx + 1 });
        } else {
            this.setState({ currPlaneIdx: 0 });
        }
    }

    toPrevPlane = () => {
        const { store } = this.props;
        const { currPlaneIdx } = this.state;
        if (currPlaneIdx > 0) {
            this.setState({ currPlaneIdx: currPlaneIdx - 1 });
        } else {
            this.setState({ currPlaneIdx: store.selectedDeck.length - 1 });
        }
    }

    moveToBottom = () => {
        const { store } = this.props;
        const { currPlaneIdx } = this.state;
        const cardId = store.selectedDeck[currPlaneIdx];
        store.moveToBottom(cardId);
    }

    render() {
        const { store } = this.props;
        const { dieResult, currPlaneIdx } = this.state;
        const currPlane = cards[store.selectedDeck[currPlaneIdx]];

        return (
            <div className="game-container">
                {/* {currPlane.name} */}
                <img className="game-plane" alt={currPlane} src={currPlane.path} />
                <div className="game-panel">
                    <Link to="/">Back To Home</Link>
                    <button onClick={this.moveToBottom}>Move To Bottom</button>
                    <button onClick={this.onRestart}>Restart</button>
                    <button onClick={this.onShuffle}>Shuffle</button>
                    <button onClick={this.onRoll}>Roll Die</button>
                    <button onClick={this.toPrevPlane}>Back</button>
                    <button onClick={this.toNextPlane}>Planeswalk</button>
                    {dieResult}
                </div>
                {/* {store.selectedDeck.map(id => cards[id].name + ' ')} */}
            </div>
        );
    }
}

export default inject('store')(observer(Game));