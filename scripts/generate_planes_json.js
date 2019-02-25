const fs = require('fs');
const uuid = require('uuid/v4');

const getCards = (path, target) => {
    const cards = {};
    const pathName = `${path}/${target}`;
    const deckNames = fs.readdirSync(pathName);
    for (const dIdx in deckNames) {
        const deckName = deckNames[dIdx];
        if (deckName.startsWith('planechase')) {
            const deckPath = `${pathName}/${deckName}`;
            const cardNames = fs.readdirSync(deckPath);
            for (const cIdx in cardNames) {
                const cardName = cardNames[cIdx];
                const filePath = `${target}/${deckName}/${cardName}`;
                cards[uuid()] = createCard(cardName, deckName, filePath);
            }
        }
    }
    return cards;
}

const createCard = (cardName, deckName, path) => ({
        name: cardName,
        nameFormatted: cleanName(cardName, false),
        set: deckName,
        setFormatted: cleanName(deckName, true),
        path
});

const cleanName = (name, isDeck) => {
    let newName = name;
    newName = newName.replace(/_/g, ' ');
    newName = toTitleCase(newName);

    if (!isDeck) {
        newName = newName.replace('.jpg', '');
    } else {
        const arr = newName.split(' ');
        arr[0] = arr[0] + ':';
        newName = arr.join(' ');
    }

    return newName;
}

const toTitleCase = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

const getSets = cards => {
    const sets = {};
    for (const id in cards) {
        const card = cards[id];
        if (!sets[card.set]) {
            sets[card.set] = {};
        }
        sets[card.set][id] = true;
    }

    return sets;
}

const writeToFile = (obj, path) => {
    fs.writeFile(path, JSON.stringify(obj), err => {
        if (err) throw err;
    });
}

// EXECUTE

const cards = getCards('./public', '/planes');
const sets = getSets(cards);
writeToFile(cards, './src/data/cards.json');
writeToFile(sets, './src/data/sets.json');
