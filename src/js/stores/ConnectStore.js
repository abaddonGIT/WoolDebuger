/**
 * Created by Abaddon on 08.01.2016.
 */
"use strict";
import BaseStore from "./BaseStore";
import {ACTIONS_TYPES, STORAGE} from "../Constants";
import Utility from "../Utility";
import merge from "object-assign";
import GlobalStore from "./GlobalStore";

class ConnectStore extends BaseStore {
    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this.connects = this.getAll();
    }

    _registerToActions(action) {
        switch(action.actionType) {
            case ACTIONS_TYPES.REMOVE_CONNECT:
                this.removeItem(action.id);
                this.trigger("REMOVE_CONNECT");
                GlobalStore.trigger("REMOVE_CONNECT");
                break;
            case ACTIONS_TYPES.ADD_CONNECT:
                this.setItem(action.item);
                this.trigger("ADD_CONNECT");
                break;
            case ACTIONS_TYPES.UPDATE_CONNECT:
                this.updateItem(action.id, action.fields);
                this.trigger("UPDATE_CONNECT");
                GlobalStore.trigger("UPDATE_CONNECT");
                break;
        }
    }

    /**
     * Set connections list
     * @param value
     */
    set connects(value) {
        this._connects = value;
    }

    /**
     * Return connect list
     * @returns {*}
     */
    get connects() {
        return this._connects;
    }

    /**
     * Sec new connection item
     * @param item
     */
    setItem(item) {
        var store = this.getAll();
        store.push(item);
        try {
            localStorage.setItem(STORAGE.SOCKET_TAG, JSON.stringify(store));
        } catch (e) {
            console.error("При попытке записи нового значения произошла ошибка!");
        }
        this.connects = store;
    }

    /**
     * Update item fields by id
     * @param id
     * @param fields
     */
    updateItem(id, fields) {
        var store = this.connects, ln = store.length;
        for (let i = 0; i < ln; i++) {
            let item = store[i];
            if (item.id == id) {
                merge(store[i], fields);
            }
        }
        this.saveToStore();
    }

    /**
     * Return all datas from localStorage
     *
     * @returns {*}
     */
    getAll() {
        var str = localStorage.getItem(STORAGE.SOCKET_TAG), json;
        if (str === undefined || !str) {
            json = [];
        } else {
            try {
                json = JSON.parse(str);
            } catch (e) {
                json = [];
                console.error("Ошибка при попытке извлечь данные из хранилища!");
            }
        }
        return json;
    }

    /**
     * Return data from storage by id
     * @param id
     * @returns {*}
     */
    getById(id) {
        var all = this.connects, ln = all.length;
        while (ln--) {
            let item = all[ln];
            if (item.id == id) {
                return item;
            }
        }
        return null;
    }

    /**
     * Remove connect item from storage
     * @param timestamp
     */
    removeItem(id) {
        var newList = [], ln = this.connects.length;
        for (let i = 0; i < ln; i++) {
            let item = this.connects[i];
            if (item.id != id) {
                newList.push(this.connects[i]);
            }
        }
        this.connects = newList;
        this.saveToStore();
    }

    /**
     * Save connection to storage
     */
    saveToStore() {
        localStorage.setItem(STORAGE.SOCKET_TAG, JSON.stringify(this.connects));
    }
}

export default new ConnectStore();