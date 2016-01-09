"use strict";
import React, {Component} from "react";
import ConnectStore from "../stores/ConnectStore";
import GlobalStore from "../stores/GlobalStore";
import SocketActions from "../actions/SocketActions";

export default class SocketsConnection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connects: []
        }
    }

    componentDidMount() {
        GlobalStore.bind("REMOVE_CONNECT UPDATE_CONNECT", this._updateListHandler.bind(this));
        this.setState({connects: ConnectStore.getAll()});
    }

    componentWillUnmount() {
        GlobalStore.unbind("REMOVE_CONNECT UPDATE_CONNECT");
    }

    /**
     * Update list handler
     * @private
     */
    _updateListHandler() {
        this.setState({connects: ConnectStore.getAll()});
    }

    /**
     * Add new connection handler
     * @private
     */
    _addConnectionHandler(e) {
        var date = new Date(), newConnect = {
            id: date.getTime(),
            url: "",
            request: {},
            response: {},
            connect: false
        };
        SocketActions.add(newConnect);
        this.setState({connects: ConnectStore.getAll()});

        e.preventDefault();
        e.stopPropagation();
    }

    /**
     * Change connect handler
     * @param e
     * @param id
     * @private
     */
    _changeFieldHandler(id, e) {
        var value = e.currentTarget.value;
        SocketActions.update(id, {url: value});
        this.setState({connects: ConnectStore.getAll()});
    }

    render() {
        var connects = this.state.connects;
        return (
            <div className="socketsList">
                <from className="from">
                    <div className="roundField">
                        <label htmlFor="addConnect">Добавить соединение</label>
                        <button className="btn btn--round btn--add" id="addConnect"
                                onClick={this._addConnectionHandler.bind(this)}></button>
                    </div>
                </from>
                <div className="connects__list">
                    <from className="from">
                        <ul>
                            {connects.map(function (value) {
                                return <li key={value.id}>
                                    <div className="inputField">
                                        <span className="labelPlace">&nbsp;</span>
                                        <input onChange={this._changeFieldHandler.bind(this, value.id)} type="text"
                                               value={value.url} id={value.id}
                                               className={value.url ? "set" : "empty"}/>
                                        <label htmlFor={value.id}>URL для соединения</label>
                                    </div>
                                </li>
                                }.bind(this))}
                        </ul>
                    </from>
                </div>
            </div>
        );
    }
}