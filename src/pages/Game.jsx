import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Modal from '../components/Modal';
import { rollDie } from '../utils.js';

class Game extends React.Component {
    state = {
        dieResult: 0
    };

    onRoll = () => {
        this.setState({ dieResult: rollDie() });
    };

    render() {
        const { gameStore, appStore } = this.props;
        const { dieResult } = this.state;
        const {
            selectedDeck,
            currPlaneIdx,
            currPlane,
            moveCardToBottom,
            resetDeck,
            shuffleDeck,
            toNextCard,
            toPrevCard
        } = gameStore;
        console.log(currPlane);
        return (
            <div className="container game-container">
                <img
                    className="game-plane"
                    alt={currPlane.id}
                    src={currPlane.path}
                />
                <div className="game-panel">
                    <Link to="/">Back To Home</Link>
                    <button onClick={moveCardToBottom}>Move To Bottom</button>
                    <button onClick={resetDeck}>Restart</button>
                    <button onClick={shuffleDeck}>Shuffle</button>
                    <button onClick={this.onRoll}>Roll Die</button>
                    <button onClick={toPrevCard}>Back</button>
                    <button onClick={toNextCard}>Planeswalk</button>
                    <button onClick={() => appStore.toggleModal()}>
                        Toggle
                    </button>
                    {dieResult} {currPlaneIdx + 1}/{selectedDeck.length}
                </div>
            </div>
        );
    }
}

export default inject('gameStore', 'appStore')(observer(Game));
