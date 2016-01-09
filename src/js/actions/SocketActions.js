/**
 * Created by Abaddon on 09.01.2016.
 */
"use strict";
import Dispatcher from "../dispatcher/Dispatcher";
import {ACTIONS_TYPES} from "../Constants";

export default {
    remove: (id) => {
        Dispatcher.dispatch({
            actionType: ACTIONS_TYPES.REMOVE_CONNECT,
            id: id
        });
    },
    add: (item) => {
        Dispatcher.dispatch({
            actionType: ACTIONS_TYPES.ADD_CONNECT,
            item: item
        });
    },
    update: (id, fields) => {
        Dispatcher.dispatch({
            actionType: ACTIONS_TYPES.UPDATE_CONNECT,
            id: id,
            fields: fields
        });
    }
}