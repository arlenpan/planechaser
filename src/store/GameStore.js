import { decorate, observable, configure, action, computed } from "mobx";
import { ALL_DECKS, SPECIAL_CARDS, CARD__CHAOTIC_AETHER, CARD__SPATIAL_MERGING, CARD__STAIRS_TO_INFINITY } from '../consts.js';
import { shuffle } from '../utils.js';
import cards from '../data/cards.json';
import sets from '../data/sets.json';

export default class GameStore {
    // OBSERVABLES
    selectedDeckId = ALL_DECKS;
    selectedDeck = Object.keys(cards);

    // COMPUTES
    get prevPlane() {
        // bottom of the deck is last card
        if (this.selectedDeck.length === 0) return null;
        return cards[this.selectedDeck[this.selectedDeck.length - 1]];
    }
    get currPlane() {
        // top of the deck is current card
        return cards[this.selectedDeck[0]];
    }
    get nextPlane() {
        return cards[this.selectedDeck[1]];
    }

    get currStatus() {
        if (SPECIAL_CARDS.indexOf(this.currPlane.name) !== -1) {
            return this.currPlane.name;
        } else if (this.prevPlane.name === CARD__CHAOTIC_AETHER || this.prevPlane === CARD__SPATIAL_MERGING) {
            return this.prevPlane.name;
        } else {
            return null;
        }
    }
    
    // ACTIONS
    selectDeck = deckId => {
        this.selectedDeckId = deckId;
        if (deckId === ALL_DECKS) {
            this.selectedDeck = Object.keys(cards);
        } else {
            this.selectedDeck = sets[deckId].cards;
        }
    }

    shuffleDeck = () => this.selectedDeck = shuffle(this.selectedDeck);

    resetDeck = () => this.selectDeck(this.selectedDeckId);

    getNextPlanes = count => {
        const planes = [];
        for (let i = 1; i <= count && i < this.selectedDeck.length; i++ ) {
            planes.push(cards[this.selectedDeck[i]]);
        }
        return planes;
    }

    moveCardsToBottom = (idxArr, shuffleCards = false) => {
        idxArr = idxArr.sort();
        let toPush = [];
        let spliceArr = [];
        this.selectedDeck.forEach((id, idx) => {
            if (idxArr.indexOf(idx) !== -1) {
                toPush.push(id);
            } else {
                spliceArr.push(id);
            }
        });
        if (shuffleCards) toPush = shuffle(toPush);
        this.selectedDeck = spliceArr.concat(toPush);
    }

    toNextCard = () => this.selectedDeck.push(this.selectedDeck.splice(0, 1)[0]);

    toPrevCard = () => this.selectedDeck.unshift(this.selectedDeck.splice(this.selectedDeck.length - 1, 1)[0]);

    actionInterplanarTunnel = idx => {
        let toPush = [];
        for (let i = 1; i <= 5 && i < this.selectedDeck.length; i++) {
            if (i === idx) continue;
            toPush.push(i);
        }
        this.moveCardsToBottom(toPush, true);
    }
}

const observables = {
    selectedDeckId: observable,
    selectedDeck: observable,
};

const computes = {
    prevPlane: computed,
    currPlane: computed,
    nextPlane: computed,
    currStatus: computed
};

const actions = {
    selectDeck: action,
    shuffleDeck: action,
    resetDeck: action,
    moveCardsToBottom: action,
    toNextCard: action,
    toPrevCard: action,
    actionInterplanarTunnel: action
};

decorate(GameStore, Object.assign({}, observables, computes, actions));
configure({ enforceActions: 'observed' });
