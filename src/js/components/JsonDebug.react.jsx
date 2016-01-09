import React, {Component} from "react";
import ReactDom from "react-dom";
import SockService from "../services/SockService";
import SockStore from "../stores/SockStore";
import LocalStore from "../stores/LocalStore";
import Utility from "../Utility";
import DebugList from "./DebugList.react.jsx";
import Toolbar from "./Toolbar.react.jsx";
import GlobalStore from "../stores/GlobalStore";

export default class JsonDebug extends Component {
    constructor(props) {
        super(props);
        this.state = this.getState();
    }

    /**
     * Return dynamic props
     *
     * @returns {{list: Array}}
     */
    getState() {
        return {
            list: []
        }
    }

    componentDidMount() {
        SockService.connect();
        SockStore.bind("SOCKET_CHANGE", this._changeSocketState.bind(this));
        SockStore.bind("SOCKET_MESSAGE", this._socketMessageHandler.bind(this));
        LocalStore.bind("UPDATE_STORE", this._storeUpdateHandler.bind(this));

        this.setState({list: LocalStore.getAll()});
    }

    componentWillUnmount() {
        SockStore.unbind("SOCKET_CHANGE SOCKET_MESSAGE");
        LocalStore.unbind("UPDATE_STORE");
    }

    /**
     * Update handler for storage
     * @private
     */
    _storeUpdateHandler() {
        this.setState({list: LocalStore.getAll()});
    }

    /**
     * Message handler for socket
     *
     * @param fromServer
     * @private
     */
    _socketMessageHandler(fromServer) {
        var data = fromServer[0];
        LocalStore.setItem(data);
        this.setState({list: LocalStore.getAll()});
        GlobalStore.trigger("NEW_DEBUG_INFO");
    }

    /**
     * Sort by type handler
     * @param type
     * @private
     */
    _sortByTypeHandler(type) {
        var list = LocalStore.getAll();
        if (type !== "null") {
            list = list.filter(function (item) {
                if(item.type === type) {
                    return true;
                }
            });
        }
        this.setState({list: list});
    }

    /**
     * Change socket connection status
     *
     * @private
     */
    _changeSocketState() {
        if (SockStore.isConnect()) {
            Utility.changeFavicon("../images/favicon_on.ico");
        } else {
            Utility.changeFavicon("../images/favicon_off.ico");
        }
    }

    render() {
        return (
            <div id="JsonDebug" className="JsonDebug">
                <Toolbar />
                <DebugList debugList={this.state.list} sortByTypeHandler={this._sortByTypeHandler.bind(this)}/>
                <div className="content">
                    {this.props.children}
                    <div className="clear"></div>
                </div>
            </div>
        );
    }
}