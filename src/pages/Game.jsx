import React from 'react';
import { Link } from 'react-router-dom';
import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';

import Modal from '../components/Modal';
import { rollDie } from '../utils.js';
import { CARD__CHAOTIC_AETHER } from '../consts';

class Game extends React.Component {
    state = {
        dieResult: 0
    };

    // set up triggered actions
    componentDidMount() {
        const { gameStore } = this.props;
        autorun(() => { console.log(gameStore.currPlane) });
    }

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
            currStatus,
            moveCardToBottom,
            resetDeck,
            shuffleDeck,
            toNextCard,
            toPrevCard
        } = gameStore;
        console.log(currStatus);
        return (
            <div className="container game-container">
                {dieResult > 0 &&
                    <Modal>
                        {dieResult === 1 && 'CHAOS!'}
                        {dieResult === 6 && 'PLANESWALK!'}
                        {dieResult !== 1 && dieResult !== 6 && dieResult}
                        <button onClick={() => this.setState({ dieResult: 0 })}>Close</button>
                    </Modal>
                }
                <div className="game-img">
                    <img
                        className="game-plane"
                        alt={currPlane.id}
                        src={currPlane.path}
                    />
                    {currStatus === CARD__CHAOTIC_AETHER && <span>
                        Each blank roll of the planar die is a CHAOS roll until a player planeswalks away from a plane.
                        </span>
                    }
                </div>
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
                    {currPlaneIdx + 1}/{selectedDeck.length}
                </div>
            </div>
        );
    }
}

export default inject('gameStore', 'appStore')(observer(Game));
