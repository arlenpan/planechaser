import React, { Component } from 'react';
import cards from './data/cards.json';

export default class App extends Component {
    shuffle = a => {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    render() {
        const cardsShuffled = this.shuffle(Object.values(cards));
        return (
            <div className="main-container">
                {cardsShuffled.map(c => (
                    <img src={process.env.PUBLIC_URL + c.path} />
                ))}
            </div>
        );
    }
}

