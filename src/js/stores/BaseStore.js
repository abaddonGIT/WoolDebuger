/**
 * Created by Abaddon on 30.12.2015.
 */
import WoolEvent from "woolevent";
import Dispatcher from "../dispatcher/Dispatcher";

export default class BaseStore extends WoolEvent {
    constructor() {
        super();
    }

    /**
     * Subscribe to dispatcher
     * @param {function} actionSubscribe
     */
    subscribe(actionSubscribe) {
        this._dispatchToken = Dispatcher.register(actionSubscribe());
    }

    /**
     * Return dispatcher token
     * @returns {BaseStore._dispatchToken|*}
     */
    get dispatchToken() {
        return this._dispatchToken;
    }
}