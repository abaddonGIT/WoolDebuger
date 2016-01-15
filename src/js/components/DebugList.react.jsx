"use strict";
import React, {Component} from "react";
import CreateFragment from "react-addons-create-fragment";
import StorageActions from "../actions/StorageActions";
import LocalStore from "../stores/LocalStore";
import SettingsFrom from "./Settings.react.jsx";
import Utility from "../Utility";
import GlobalStore from "../stores/GlobalStore";
import ListFilter from "./ListFilter.react.jsx";
import SocketsConnection from "./SocketsConnection.react.jsx";

export default class DebugList extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * Delete item from list handler
     *
     * @param e
     * @private
     */
    _deleteItemHandler(e) {
        var elem = e.currentTarget;
        if (elem) {
            var timestamp = elem.getAttribute("data-id");
            StorageActions.remove(timestamp);
            GlobalStore.trigger("SELECT_ITEM_FROM_LIST", timestamp, false);
        }
        e.stopPropagation();
        e.preventDefault();
    }

    /**
     * Toggle list panel
     * @private
     */
    _togglePanelHandler(e) {
        var button = e.currentTarget, panel = this.refs.panel;

        if (button) {
            if (LocalStore.panel === "true") {
                LocalStore.panel = false;
            } else {
                LocalStore.panel = true;
            }
            panel.classList.toggle("show");
        }
        e.stopPropagation();
        e.preventDefault();
    }

    /**
     * Init component handler
     */
    componentDidMount() {
        var panel = this.refs.panel;
        if (LocalStore.panel === "true") {
            Utility.addClass("show", panel);
        } else {
            Utility.removeClass("show", panel);
        }
    }

    /**
     * Item change state item in list
     * @param e
     * @private
     */
    _selectFromList(e) {
        var input = e.currentTarget;
        LocalStore.updateItem(input.value, {checked: input.checked});
        GlobalStore.trigger("SELECT_ITEM_FROM_LIST", input.value, input.checked);
    }

    /**
     * Clear debug history from storage
     * @param e
     * @private
     */
    _clearDebugList(e) {
        StorageActions.clear();
        e.preventDefault();
        e.stopPropagation();
    }

    render() {
        var list = this.props.debugList, listRows = {}, ln = list.length;

        if (ln) {
            while (ln--) {
                let item = list[ln], id = "item_" + ln;
                listRows["id_" + ln] =
                    <li key={item.timestamp}><input type="checkbox" name="debug_item" defaultChecked={item.checked}
                                                    onChange={this._selectFromList.bind(this)}
                                                    id={id} value={item.timestamp}/><label
                        htmlFor={id}>{item.type} <span className="date">({item.date})</span></label>
                        <div data-id={item.timestamp} className="delete" onClick={this._deleteItemHandler.bind(this)}
                             title="Удалить из хранилища"><i
                            className="fa fa-times fa-2x"></i></div>
                    </li>;
            }
        } else {
            listRows["id"] = <li className="empty">Список пуст</li>;
        }

        return (
            <aside id="leftSidebar" className="show" ref="panel">
                <div className="rotate">
                    <div id="list" className="col col--one">
                        <button onClick={this._clearDebugList.bind(this)} className="btn btn--cube save clearHistory">
                            Очистить историю
                        </button>
                        <ListFilter sortByTypeHandler={this.props.sortByTypeHandler.bind(this)}/>
                        <ul ref="debugList">
                            {CreateFragment(listRows)}
                        </ul>
                    </div>
                    <div id="settings" className="col col--two">
                        <SettingsFrom />
                    </div>
                    <div id="sockets" className="col col--three">
                        <SocketsConnection />
                    </div>
                </div>
                <button onClick={this._togglePanelHandler.bind(this)}
                        className="leftBar__button btn btn--round"></button>
            </aside>
        );
    }
}

DebugList.defaultProps = {
    debugList: []
};

DebugList.contextTypes = {
    debugList: React.PropTypes.array
};