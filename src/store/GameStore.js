import { decorate, observable, configure, action, computed } from "mobx";
import { ALL_DECKS, SPECIAL_CARDS, CARD__CHAOTIC_AETHER, CARD__SPATIAL_MERGING, CARD__STAIRS_TO_INFINITY } from '../consts.js';
import { shuffle } from '../utils.js';
import cards from '../data/cards.json';
import sets from '../data/sets.json';

export default class GameStore {
    selectedDeckId = ALL_DECKS;
    selectedDeck = Object.keys(cards);

    get prevPlane() {
        return cards[this.selectedDeck[this.selectedDeck.length - 1]];
    }

    get currPlane() {
        return cards[this.selectedDeck[0]];
    }

    getNextPlanes = count => {
        const planes = [];
        for (let i = 1; i <= count && i < this.selectedDeck.length; i++ ) {
            planes.push(cards[this.selectedDeck[i]]);
        }
        return planes;
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

    moveCardToBottom = (idx = 0) => {
        if (idx >= this.selectedDeck.length) return false;
        this.selectedDeck.push(this.selectedDeck.splice(idx, 1)[0]);
        return true;
    }

    toNextCard = () => this.selectedDeck.push(this.selectedDeck.splice(0, 1)[0]);

    toPrevCard = () => this.selectedDeck.unshift(this.selectedDeck.splice(this.selectedDeck.length - 1, 1)[0]);
}

decorate(GameStore, {
    selectedDeckId: observable,
    selectedDeck: observable,
    prevPlane: computed,
    currPlane: computed,
    currStatus: computed,
    selectDeck: action,
    shuffleDeck: action,
    resetDeck: action,
    moveCardToBottom: action,
    toNextCard: action,
    toPrevCard: action
});

configure({ enforceActions: 'observed' });
