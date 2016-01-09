/**
 * Created by Abaddon on 31.12.2015.
 */
"use strict";
import Dispatcher from "../dispatcher/Dispatcher";
import {ACTIONS_TYPES} from "../Constants";

export default {
    /**
     * Add new record to list
     *
     * @param item
     */
    add(item) {
        Dispatcher.dispatch({
            actionType: ACTIONS_TYPES.ADD_STORAGE,
            item: item
        });
    },
    /**
     * Remove element from storage
     * @param index
     */
    remove(index) {
        Dispatcher.dispatch({
            actionType: ACTIONS_TYPES.REMOVE_FROM_STORAGE,
            index: index
        });
    },

    /**
     * Hide debug panel
     */
    hidePanel() {
        Dispatcher.dispatch({
            actionType: ACTIONS_TYPES.HIDE_PANEL
        });
    },
    /**
     * Show debug panel
     */
    showPanel() {
        Dispatcher.dispatch({
            actionType: ACTIONS_TYPES.SHOW_PANEL
        });
    }
}