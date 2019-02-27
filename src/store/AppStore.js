import { decorate, observable, configure, action } from "mobx";

export default class AppStore {
}

configure({ enforceActions: 'observed' });
