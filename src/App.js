import React, { Component } from 'react';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                Hello World! This is Planechaser.
                <img src={`${process.env.PUBLIC_URL}/planes/planechase-anthology-promo/tazeem.jpg`} />;
            </div>
        );
    }
}
