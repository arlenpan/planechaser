import { decorate, observable, configure, action, computed } from "mobx";
import { ALL_DECKS } from './consts.js';
import { shuffle } from './utils.js';
import cards from './data/cards.json';
import sets from './data/sets.json';

export default class Store {
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
}

decorate(Store, {
    selectedDeckId: observable,
    selectedDeck: observable,
    selectDeck: action,
    shuffleDeck: action
});

configure({ enforceActions: 'observed' });
