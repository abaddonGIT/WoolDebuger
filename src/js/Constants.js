/**
 * Created by Abaddon on 30.12.2015.
 */
import keymirror from "keymirror";

const ACTIONS_TYPES = keymirror({
    SOCK_CONNECT: null,
    SOCK_DISCONNECT: null,
    SOCK_MESSAGE: null,
    ADD_STORAGE: null,
    REMOVE_FROM_STORAGE: null,
    HIDE_PANEL: null,
    SHOW_PANEL: null,
    NEW_DEBUG_INFO: null,
    SELECT_ITEM_FROM_LIST: null,
    REMOVE_CONNECT: null,
    ADD_CONNECT: null,
    UPDATE_CONNECT: null
});

const STORAGE = keymirror({
    TAG: "JSON_DEBUG",
    SOCKET_TAG: "CONNECTION_LIST"
});

export {ACTIONS_TYPES, STORAGE};