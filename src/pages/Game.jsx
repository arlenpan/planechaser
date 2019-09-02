import React from 'react';
import { Link } from 'react-router-dom';
import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';

import Modal from '../components/Modal';
import { StairsToInfinity, InterplanarTunnel, PoolsOfBecoming } from '../components/CustomModals';
import { rollDie } from '../utils.js';
import { CARD__CHAOTIC_AETHER, CARD__STAIRS_TO_INFINITY, CARD__INTERPLANAR_TUNNEL, CARD__POOLS_OF_BECOMING, CARD__SPATIAL_MERGING } from '../consts';
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

    toggleScryModal = open => this.setState({ showScryModal: open ? open : !this.state.showScryModal });

    renderDieModal = () => {
        const { dieResult } = this.state;
        const { currStatus } = this.props.gameStore;
        let text = dieResult;
        if (dieResult === 6) {
            text = 'PLANESWALK!';
        } else if (dieResult === 1 || currStatus === CARD__CHAOTIC_AETHER) {
            text = 'CHAOS!';
        }
        return (
            <Modal onClose={e => this.setState({ dieResult: null })}>
                <h3>{text}</h3>
            </Modal>
        );
    }

    renderScryModal = currStatus => {
        const { gameStore } = this.props;

        if (currStatus === CARD__STAIRS_TO_INFINITY) {
            return <StairsToInfinity gameStore={gameStore} onClose={e => this.toggleScryModal()} />
        }
        if (currStatus === CARD__INTERPLANAR_TUNNEL) {
            return <InterplanarTunnel gameStore={gameStore} onClose={e => this.toggleScryModal()} />
        }
        if (currStatus === CARD__POOLS_OF_BECOMING) {
            return <PoolsOfBecoming gameStore={gameStore} onClose={e => this.toggleScryModal()} />
        }

        return null;
    }

    renderStatusEffect = currStatus => {
        if (currStatus === CARD__CHAOTIC_AETHER) {
            return <span className="status">Each blank roll of the planar die is a CHAOS roll until a player planeswalks away from a plane.</span>
        }
    }

    renderStatusAction = currStatus => {
        if (currStatus === CARD__STAIRS_TO_INFINITY || 
            currStatus === CARD__INTERPLANAR_TUNNEL || 
            currStatus === CARD__POOLS_OF_BECOMING) {
            return <button className="btn-danger" onClick={this.toggleScryModal}>CHAOS</button>;
        }
        if (currStatus === CARD__SPATIAL_MERGING) {
            return <button className="btn-danger" onClick={this.toggleScryModal}>(in development)</button>;
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

                <div className="game-img-wrapper">
                    <img
                        className="game-plane"
                        alt={currPlane.id}
                        src={currPlane.path}
                    />
                </div>

                <div className="game-panel">
                    <Link to="/">Home</Link>
                    <button onClick={resetDeck}>Restart</button>
                    <button onClick={shuffleDeck}>Shuffle</button>
                    <button onClick={this.onRoll}>Roll Die</button>
                    <button onClick={toPrevCard}>Back</button>
                    <button className="btn-primary" onClick={toNextCard}>Planeswalk</button>
                    {this.renderStatusAction(currStatus)}
                </div>

                <div className="game-status">
                    {this.renderStatusEffect(currStatus)}
                </div>
            </div>
        );
    }
}

export default inject('gameStore', 'appStore')(observer(Game));
