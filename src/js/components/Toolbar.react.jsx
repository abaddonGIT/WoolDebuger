import React, {Component} from "react";
import ReactDOM from "react-dom";
import Utility from "../Utility";
import SockStore from "../stores/SockStore";
import LocalStore from "../stores/LocalStore";
import SockService from "../services/SockService";
import {History, Link, IndexLink} from "react-router";
import ReactMixin from 'react-mixin';

export default class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: 0,
            connect: false
        }
    }

    componentDidMount() {
        SockStore.bind("SOCKET_CHANGE", this._changeSocketState.bind(this));
        this.panel = document.querySelector("#leftSidebar");
        if (this.history.isActive("/")) Utility.addClass("list", this.panel);
        if (this.history.isActive("/settings")) Utility.addClass("settings", this.panel);
        if (this.history.isActive("/sockets")) Utility.addClass("sockets", this.panel);
    }

    /**
     * Reconnect socket net
     * @private
     */
    _reconnectHandler() {
        SockService.connect();
    }

    /**
     * Change status socket connection handler
     * @private
     */
    _changeSocketState() {
        if (SockStore.isConnect()) {
            this.setState({connect: true});
        } else {
            this.setState({connect: false});
        }
    }

    /**
     * Change ui column
     * @param e
     * @private
     */
    _changeColHandler(page, event) {
        var leftBar = this.panel;
        leftBar.className = "";
        Utility.addClass(page, leftBar).addClass("show", leftBar);
    }

    render() {
        var connectClass = "wifi " + (this.state.connect === true ? "connect" : "disconnect");

        return (
            <section id="toolbar" className="toolbar">
                <nav className="left">
                    <IndexLink to="/" activeClassName="active" onClick={this._changeColHandler.bind(this, "list")}>Список</IndexLink>
                    <Link to="/settings" activeClassName="active"
                          onClick={this._changeColHandler.bind(this, "settings")}>Настройки</Link>
                    <Link to="/sockets" activeClassName="active" onClick={this._changeColHandler.bind(this, "sockets")}>WebSockets</Link>
                </nav>
                <div className="right toolbar__notifications">
                    <ul>
                        <li className={connectClass}>
                            <a id="reconnect" onClick={this._reconnectHandler.bind(this)} title="Реконнект"><i
                                className="fa fa-refresh"></i></a>
                            <a title="Статус соединения"><i className="fa fa-wifi fa-2x"></i></a>
                        </li>
                    </ul>
                </div>
            </section>
        );
    }
}
Toolbar.propTypes = {
    history: React.PropTypes.object
};

ReactMixin.onClass(Toolbar, History);