/**
 * Created by Abaddon on 30.12.2015.
 */
"use strict";
import BaseStore from "./BaseStore";
import {ACTIONS_TYPES} from "../Constants";

class SockStore extends BaseStore {
    constructor() {
        super();
        this._connect = null;
        this._connectionId = null;
        this.subscribe(() => this._registerToActions.bind(this));
    }

    /**
     * Socket actions handler
     *
     * @param action
     * @private
     */
    _registerToActions(action) {
        switch (action.actionType) {
            case ACTIONS_TYPES.SOCK_CONNECT:
                this.connect = action.socket;
                this.trigger("SOCKET_CHANGE");
                break;
            case ACTIONS_TYPES.SOCK_DISCONNECT:
                if (!this.connect) return;
                this.connect.close();
                this.connect = null;
                this.trigger("SOCKET_CHANGE");
                break;
            case ACTIONS_TYPES.SOCK_MESSAGE:
                var message = action.message, timestamp = action.timestamp;
                try {
                    var fromServer = JSON.parse(message);
                    fromServer.timestamp = timestamp;
                    this.trigger("SOCKET_MESSAGE", fromServer);
                } catch (e) {
                    console.error("Ошибка при парсере ответа с сервера!");
                }
                break;
        }
    }

    /**
     * Return connection status
     *
     * @returns {boolean}
     */
    isConnect() {
        return !!this.connect;
    }

    /**
     * Return current connection
     */
    get connect() {
        return this._connect;
    }

    /**
     * Set connection object
     *
     * @param value
     */
    set connect(value) {
        this._connect = value;
    }

    /**
     * Set connection id
     *
     * @param id
     */
    set connectionId(value) {
        this._connectionId = value;
    }

    /**
     * Get connection id
     */
    get connectionId() {
        return this._connectionId;
    }

}

export default new SockStore();