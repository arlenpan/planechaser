import React from 'react';
import { Link } from 'react-router-dom';
import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';

import Modal from '../components/Modal';
import { rollDie } from '../utils.js';
import { CARD__CHAOTIC_AETHER, CARD__STAIRS_TO_INFINITY, CARD__INTERPLANAR_TUNNEL, CARD__POOLS_OF_BECOMING } from '../consts';
import cards from '../data/cards.json';

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
        const { getNextPlanes, moveCardsToBottom, actionInterplanarTunnel } = this.props.gameStore;
        const nextPlanes = getNextPlanes(5);
        return (
            <Modal>
                {currStatus === CARD__STAIRS_TO_INFINITY &&
                    <div>
                        <img className="game-plane" alt={nextPlanes[0].name} src={nextPlanes[0].path} />
                        <button onClick={() => {
                            moveCardsToBottom([1]);
                            this.setState({ showScryModal: false });
                        }}>Move To Bottom</button>
                        <button onClick={() => this.setState({ showScryModal: false })}>Close</button>
                    </div>
                }

                {currStatus === CARD__INTERPLANAR_TUNNEL &&
                    <div>
                        {nextPlanes.map((plane, idx) => (
                            <div>
                                <img className="game-plane--small" alt={plane.name} src={plane.path} />
                                <button onClick={() => {
                                    actionInterplanarTunnel(idx + 1);
                                    this.setState({ showScryModal: false });
                                }}>Choose</button>
                            </div>
                        ))}
                    </div>
                }

                {currStatus === CARD__POOLS_OF_BECOMING && 
                    <div>
                        {nextPlanes.map((plane, idx) => {
                            if (idx > 2) return null;
                            return <img className="game-plane--small" alt={plane.name} src={plane.path} />
                        })}
                        <button onClick={() => {
                            moveCardsToBottom([1,2,3]);
                            this.setState({ showScryModal: false });
                        }}>Resolve</button>
                    </div>
                }
            </Modal>
        );
    }

    renderStatusEffect = currStatus => {
        if (currStatus === CARD__CHAOTIC_AETHER) {
            return <span>Each blank roll of the planar die is a CHAOS roll until a player planeswalks away from a plane.</span>
        } else if (currStatus === CARD__STAIRS_TO_INFINITY) {
            return <button onClick={this.toggleScryModal}>CHAOS Roll Effect</button>;
        } else if (currStatus === CARD__INTERPLANAR_TUNNEL) {
            return <button onClick={this.toggleScryModal}>Resolve Encounter</button>;
        } else if (currStatus === CARD__POOLS_OF_BECOMING) {
            return <button onClick={this.toggleScryModal}>Resolve Encounter</button>;
        }
    }

    render() {
        const { gameStore, appStore } = this.props;
        const { dieResult, showScryModal } = this.state;
        const {
            selectedDeck,
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

                    {/* {selectedDeck.map(id => cards[id].name + '    ')}; */}
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
