import React, { useState } from 'react';
import Modal from '../components/Modal';

const StairsToInfinity = ({ gameStore, onClose }) => {
    const { nextPlane, moveCardsToBottom } = gameStore;
    const onClick = () => {
        moveCardsToBottom([1]);
        if (onClose) onClose();
    }
    return (
        <Modal onClose={onClose}>
            <div className="container">
                <div className="game-img-wrapper">
                    <img className="game-plane" alt={nextPlane.name} src={nextPlane.path} />
                </div>
                <div className="game-panel">
                    <button onClick={onClick}>Move To Bottom</button>
                    <button onClick={onClose}>Keep on Top</button>
                </div>
            </div>
        </Modal>
    );
}

const InterplanarTunnel = ({ gameStore, onClose }) => {
    const { getNextPlanes, actionInterplanarTunnel, toNextCard } = gameStore;
    return (
        <Modal onClose={onClose}>
            <div className="subcontainer-column">
                {getNextPlanes(5).map((plane, idx) => (
                    <div className="subcontainer-row" key={plane.name}>
                        <div className="game-img-wrapper">
                            <img className="game-plane" alt={plane.name} src={plane.path} />
                        </div>
                        <button className="ml-1" onClick={() => {
                            actionInterplanarTunnel(idx + 1);
                            toNextCard();
                            onClose();
                        }}>Choose</button>
                    </div>
                ))}
            </div>
        </Modal>
    )
}

const PoolsOfBecoming = ({ gameStore, onClose }) => {
    const {getNextPlanes, moveCardsToBottom } = gameStore;
    const [planes, setPlanes] = useState(getNextPlanes(3));
    const onClick = idx => {
        moveCardsToBottom([1]);
        const p = [...planes];
        p.splice(idx,1);
        console.log(p);
        setPlanes(p);
    }

    if (planes.length === 0) {
        onClose();
        return null;
    }
    return (
        <Modal onClose={onClose}>
            <div className="subcontainer-column">
                {planes.map((plane, idx) => (
                    <div className="subcontainer-row" key={plane.name}>
                        <div className="game-img-wrapper">
                            <img className="game-plane" alt={plane.name} src={plane.path} />
                        </div>
                        <button className="ml-1" onClick={e => onClick(idx)}>Move to Bottom</button>
                    </div>
                ))}
            </div>
        </Modal>
    )
}

export { StairsToInfinity, InterplanarTunnel, PoolsOfBecoming };