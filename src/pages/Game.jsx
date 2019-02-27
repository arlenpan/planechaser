import React from 'react';
import { Link } from 'react-router-dom';
import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';

import Modal from '../components/Modal';
import { rollDie } from '../utils.js';
import { CARD__CHAOTIC_AETHER, CARD__STAIRS_TO_INFINITY } from '../consts';

class Game extends React.Component {
    state = {
        dieResult: null,
        showScryModal: false
    };

    // set up triggered actions
    componentDidMount() {
        const { gameStore } = this.props;
        console.log(gameStore.selectedDeck.length);
        autorun(() => { console.log(gameStore.currPlane) });
    }

    onRoll = () => this.setState({ dieResult: rollDie() });

    renderDieModal = () => {
        const { dieResult } = this.state;
        return (
            <Modal>
                {dieResult === 1 && 'CHAOS!'}
                {dieResult === 6 && 'PLANESWALK!'}
                {dieResult !== 1 && dieResult !== 6 && dieResult}
                <button onClick={() => this.setState({ dieResult: null })}>Close</button>
            </Modal>
        );
    }

    toggleScryModal = open => this.setState({ showScryModal: open ? open : !this.state.showScryModal });

    renderScryModal = currStatus => {
        const { getNextPlanes, moveCardToBottom } = this.props.gameStore;
        const nextPlanes = getNextPlanes(5);
        return (
            <Modal>
                {currStatus === CARD__STAIRS_TO_INFINITY &&
                    <div>
                        <img className="game-plane" alt={nextPlanes[0].name} src={nextPlanes[0].path} />
                        <button onClick={() => {
                            moveCardToBottom(1);
                            this.setState({ showScryModal: false });
                        }}>Move To Bottom</button>
                        <button onClick={() => this.setState({ showScryModal: false })}>Close</button>
                    </div>
                }
            </Modal>
        );
    }

    renderStatusEffect = currStatus => {
        if (currStatus === CARD__CHAOTIC_AETHER) {
            return <span>Each blank roll of the planar die is a CHAOS roll until a player planeswalks away from a plane.</span>
        }
        if (currStatus === CARD__STAIRS_TO_INFINITY) {
            return <button onClick={this.toggleScryModal}>CHAOS Roll Effect</button>;
        }
    }

    render() {
        const { gameStore, appStore } = this.props;
        const { dieResult, showScryModal } = this.state;
        const {
            currPlane,
            currStatus,
            resetDeck,
            shuffleDeck,
            toNextCard,
            toPrevCard
        } = gameStore;

        return (
            <div className="container game-container">
                {dieResult && this.renderDieModal()}
                {showScryModal && this.renderScryModal(currStatus)}

                <div className="game-img">
                    <img
                        className="game-plane"
                        alt={currPlane.id}
                        src={currPlane.path}
                    />
                    {this.renderStatusEffect(currStatus)}
                </div>

                <div className="game-panel">
                    <Link to="/">Back To Home</Link>
                    <button onClick={resetDeck}>Restart</button>
                    <button onClick={shuffleDeck}>Shuffle</button>
                    <button onClick={this.onRoll}>Roll Die</button>
                    <button onClick={toPrevCard}>Back</button>
                    <button onClick={toNextCard}>Planeswalk</button>
                </div>

            </div>
        );
    }
}

export default inject('gameStore', 'appStore')(observer(Game));
