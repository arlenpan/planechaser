import React from 'react';

export default class Modal extends React.Component {
    render() {
        const { children, header, onClose } = this.props;
        return (
            <div className="modal">
                <div className="modal-content">
                    <button className="modal-close" onClick={onClose}>
                        X
                    </button>
                    {children}
                </div>
            </div>
        );
    }
}