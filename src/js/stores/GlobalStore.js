/**
 * Created by Abaddon on 06.01.2016.
 */
import BaseStore from "./BaseStore";
import {ACTIONS_TYPES} from "../Constants";

class GlobalStore extends BaseStore {
    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
    }

    _registerToActions(action) {

    }
}

export default new GlobalStore();