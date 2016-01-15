/**
 * Created by Abaddon on 31.12.2015.
 */
"use strict";
import BaseStore from "./BaseStore";
import {ACTIONS_TYPES, STORAGE, STORAGE_SETTINGS} from "../Constants";
import Utility from "../Utility";
import merge from "object-assign";
import GlobalStore from "./GlobalStore";

class LocalStore extends BaseStore {
    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this.list = this.getAll();
    }

    _registerToActions(action) {
        switch (action.actionType) {
            case ACTIONS_TYPES.REMOVE_FROM_STORAGE:
                this.removeItem(action.index);
                this.trigger("UPDATE_STORE");
                break;
            case ACTIONS_TYPES.CLEAR_DEBUG_LIST:
                this._clearList();
                this.trigger("UPDATE_STORE");
                break;
        }
    }

    /**
     * Save application settings
     * @param value {{url: string}}
     */
    set settings(value) {
        this._settings = value;
        try {
            localStorage.setItem("debug_settings", JSON.stringify(this._settings));
        } catch (e) {

        }
    }

    /**
     * Get application settings
     * @returns {{url: string}}
     */
    get settings() {
        var set = localStorage.getItem("debug_settings");
        if (set === undefined || set === null) {
            return {url: ""};
        } else {
            return JSON.parse(set);
        }
    }

    /**
     * Return setting field by name
     * @param name
     * @returns {*}
     */
    getSettingsField(name) {
        var settings = this.settings;
        return settings[name] !== undefined ? settings[name] : null;
    }

    /**
     * Set panel state
     * @param value
     */
    set panel(value) {
        this._panel = value;
        localStorage.setItem("debugPanel", value);
    }

    /**
     * Return panel state
     * @returns {*}
     */
    get panel() {
        var p = localStorage.getItem("debugPanel");
        if (p === undefined || p === null) {
            p = true;
        }
        this._panel = p;
        return this._panel;
    }

    /**
     * Add new debug element to storage
     *
     * @param item
     */
    setItem(item) {
        var store = this.getAll();
        item.date = Utility.getDate();

        if (store.length < STORAGE_SETTINGS.LIST_LIMIT) {
            store.push(item);
        } else {
            var delItem = store.shift();
            GlobalStore.trigger("SELECT_ITEM_FROM_LIST", delItem.timestamp, false);
            store.push(item);
        }
        try {
            localStorage.setItem(STORAGE.TAG, JSON.stringify(store));
        } catch (e) {
            console.error("При попытке записи нового значения произошла ошибка!");
        }
        this.list = this.getAll();
    }

    /**
     * Update item in storage
     * @param timestamp
     * @param obj
     */
    updateItem(timestamp, obj) {
        var all = this.list, ln = all.length;
        for (let i = 0; i < ln; i++) {
            let item = all[i];
            if (item.timestamp == timestamp) {
                merge(all[i], obj);
            }
        }
        this.saveToStore();
    }

    /**
     * Clear debug list
     * @private
     */
    _clearList() {
        localStorage.setItem(STORAGE.TAG, []);
    }

    /**
     * Remove debug item from store
     *
     * @param index
     */
    removeItem(timestamp) {
        var newList = [], ln = this.list.length;
        for (let i = 0; i < ln; i++) {
            let item = this.list[i];
            if (item.timestamp != timestamp) {
                newList.push(this.list[i]);
            }
        }
        this.list = newList;
        this.saveToStore();
    }

    /**
     * Save current list to store
     */
    saveToStore() {
        localStorage.setItem(STORAGE.TAG, JSON.stringify(this.list));
    }

    /**
     * Return all datas from localStorage
     *
     * @returns {*}
     */
    getAll() {
        var str = localStorage.getItem(STORAGE.TAG), json;
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
        var all = this.list, ln = all.length;
        while (ln--) {
            let item = all[ln];
            if (item.timestamp == id) {
                return item;
            }
        }
        return null;
    }

    /**
     * get last debug info from storage
     * @returns {*}
     */
    getLast() {
        var all = this.getAll(), ln = all.length;
        if (ln) {
            return all[ln - 1];
        } else {
            return null;
        }
    }

    /**
     * Set debug list
     *
     * @param value
     */
    set list(value) {
        this._list = value;
    }

    /**
     * Get debug list
     */
    get list() {
        return this._list;
    }
}

export default new LocalStore();