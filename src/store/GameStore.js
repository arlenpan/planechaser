import { decorate, observable, configure, action, computed } from "mobx";
import { ALL_DECKS, SPECIAL_CARDS, CARD__CHAOTIC_AETHER, CARD__SPATIAL_MERGING } from '../consts.js';
import { shuffle } from '../utils.js';
import cards from '../data/cards.json';
import sets from '../data/sets.json';

export default class GameStore {
    selectedDeckId = ALL_DECKS;
    selectedDeck = Object.keys(cards);
    currPlaneIdx = 0;

    get prevPlane() {
        if (this.currPlaneIdx === 0) {
            return cards[this.selectedDeck[this.selectedDeck.length - 1]];
        } else {
            return cards[this.selectedDeck[this.currPlaneIdx - 1]];
        }
    }

    get currPlane() {
        return cards[this.selectedDeck[this.currPlaneIdx]];
    }

    get currStatus() {
        if (this.prevPlane.name === CARD__CHAOTIC_AETHER || this.currPlane.name === CARD__CHAOTIC_AETHER) {
            return CARD__CHAOTIC_AETHER;
        } else if (this.prevPlane.name === CARD__SPATIAL_MERGING) {
            return CARD__SPATIAL_MERGING;
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

    resetDeck = () => {
        this.selectDeck(this.selectedDeckId);
        this.currPlaneIdx = 0;
    }

    moveCardToBottom = () => {
        const cardId = this.selectedDeck[this.currPlaneIdx];
        this.selectedDeck.splice(this.currPlaneIdx, 1);
        this.selectedDeck.push(cardId);
    }

    toNextCard = () => {
        if (this.currPlaneIdx + 1 < this.selectedDeck.length) {
            this.currPlaneIdx++;
        } else {
            this.currPlaneIdx = 0;
        }
    }

    toPrevCard = () => {
        if (this.currPlaneIdx > 0) {
            this.currPlaneIdx--;
        } else {
            this.configure = this.selectedDeck.length - 1;
        }
    }
}

decorate(GameStore, {
    selectedDeckId: observable,
    selectedDeck: observable,
    currPlaneIdx: observable,
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
