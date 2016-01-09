/**
 * Created by Abaddon on 30.12.2015.
 */
"use strict";
import Dispatcher from "../dispatcher/Dispatcher";
import {ACTIONS_TYPES} from "../Constants";

export default {
    /**
     * Connect action command
     *
     * @param socket
     */
    connect(socket) {
        Dispatcher.dispatch({
            actionType: ACTIONS_TYPES.SOCK_CONNECT,
            socket: socket
        });
    },
    /**
     * Disconnect action command
     */
    disconnect() {
        Dispatcher.dispatch({
            actionType: ACTIONS_TYPES.SOCK_CONNECT
        });
    },
    /**
     * Receiving message from seerver command
     *
     * @param fromServer
     */
    message(fromServer, timestamp) {
        Dispatcher.dispatch({
            actionType: ACTIONS_TYPES.SOCK_MESSAGE,
            message: fromServer,
            timestamp: timestamp
        });
    }
}