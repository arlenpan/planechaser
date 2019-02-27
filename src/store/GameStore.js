import { decorate, observable, configure, action } from "mobx";
import { ALL_DECKS } from '../consts.js';
import { shuffle } from '../utils.js';
import cards from '../data/cards.json';
import sets from '../data/sets.json';

export default class GameStore {
    selectedDeckId = ALL_DECKS;
    selectedDeck = Object.keys(cards);
    
    selectDeck = deckId => {
        this.selectedDeckId = deckId;
        if (deckId === ALL_DECKS) {
            this.selectedDeck = Object.keys(cards);
        } else {
            this.selectedDeck = sets[deckId].cards;
        }
    }

    shuffleDeck = () => {
        if (this.selectedDeck) {
            this.selectedDeck = shuffle(this.selectedDeck);
        }
    }

    moveToBottom = cardId => {
        const idx = this.selectedDeck.indexOf(cardId);
        if (idx !== -1) this.selectedDeck.splice(idx, 1);
        this.selectedDeck.push(cardId);
    }
}

decorate(GameStore, {
    selectedDeckId: observable,
    selectedDeck: observable,
    selectDeck: action,
    shuffleDeck: action,
    moveToBottom: action
});

configure({ enforceActions: 'observed' });
