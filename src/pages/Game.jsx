import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Modal from '../components/Modal';
import cards from '../data/cards.json';
import { rollDie } from '../utils.js';
 
class Game extends React.Component {
    state = {
        dieResult: 0,
        currPlaneIdx: 0
    };

    onRestart = () => {
        const { gameStore } = this.props;
        gameStore.selectDeck(gameStore.selectedDeckId);
        this.setState({ currPlaneIdx: 0 });
    }

    onRoll = () => {
        this.setState({ dieResult: rollDie() });
    }

    onShuffle = () => {
        const { gameStore } = this.props;
        gameStore.shuffleDeck();
        this.setState({ currPlaneIdx: 0 });
    }

    toNextPlane = () => {
        const { gameStore } = this.props;
        const { currPlaneIdx } = this.state;
        if (currPlaneIdx + 1 < gameStore.selectedDeck.length) {
            this.setState({ currPlaneIdx: currPlaneIdx + 1 });
        } else {
            this.setState({ currPlaneIdx: 0 });
        }
    }

    toPrevPlane = () => {
        const { gameStore } = this.props;
        const { currPlaneIdx } = this.state;
        if (currPlaneIdx > 0) {
            this.setState({ currPlaneIdx: currPlaneIdx - 1 });
        } else {
            this.setState({ currPlaneIdx: gameStore.selectedDeck.length - 1 });
        }
    }

    moveToBottom = () => {
        const { gameStore } = this.props;
        const { currPlaneIdx } = this.state;
        const cardId = gameStore.selectedDeck[currPlaneIdx];
        gameStore.moveToBottom(cardId);
    }

    render() {
        const { gameStore, appStore } = this.props;
        const { dieResult, currPlaneIdx } = this.state;
        const currPlane = cards[gameStore.selectedDeck[currPlaneIdx]];

        return (
            <div className="game-container">
                {/* {currPlane.name} */}
                {/* <Modal>
                    Test
                </Modal> */}
                <img className="game-plane" alt={currPlane} src={currPlane.path} />
                <div className="game-panel">
                    <Link to="/">Back To Home</Link>
                    <button onClick={this.moveToBottom}>Move To Bottom</button>
                    <button onClick={this.onRestart}>Restart</button>
                    <button onClick={this.onShuffle}>Shuffle</button>
                    <button onClick={this.onRoll}>Roll Die</button>
                    <button onClick={this.toPrevPlane}>Back</button>
                    <button onClick={this.toNextPlane}>Planeswalk</button>
                    <button onClick={() => appStore.toggleModal()}>Toggle</button>
                    {dieResult}
                </div>
                {/* {gameStore.selectedDeck.map(id => cards[id].name + ' ')} */}
            </div>
        );
    }
}

export default inject('gameStore', 'appStore')(observer(Game));