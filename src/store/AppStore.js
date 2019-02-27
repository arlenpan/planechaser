import { decorate, observable, configure, action } from "mobx";

export default class AppStore {
    modalOpen = false

    toggleModal = setting => this.modalOpen = (setting) ? !!setting : !this.modalOpen;
}

decorate(AppStore, {
    modalOpen: observable,
    toggleModal: action
});

configure({ enforceActions: 'observed' });
