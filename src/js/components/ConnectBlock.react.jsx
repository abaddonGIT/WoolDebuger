import React, {Component} from 'react';
import SocketActions from "../actions/SocketActions";
import ConnectStore from "../stores/ConnectStore";
import Utility from "../Utility";

export default class ConnectBlock extends Component {
    constructor(props) {
        super(props);
        this.editor = null;
        this.response = null;
        this.socket = null;

        this.state = {
            open: false
        };
    }

    componentDidMount() {
        this.editor = new JSONEditor(this.refs.request, {mode: "code", change: this._changeRequestText.bind(this)});
        this.response = new JSONEditor(this.refs.response);
    }

    /**
     * Change text in code editor handler
     * @private
     */
    _changeRequestText() {
        if (this.editor) {
            var item = this.props.item, text = this.editor.getText();
            try {
                let json = JSON.parse(text);
                ConnectStore.updateItem(item.id, {request: json});
            } catch (e) {

            }
        }
    }

    /**
     * Change connection name handler
     * @param id
     * @param e
     * @private
     */
    _changeFieldHandler(id, e) {
        var value = e.currentTarget.value;
        SocketActions.update(id, {url: value});
    }

    /**
     * Delete connection handler
     * @param e
     * @param id
     * @private
     */
    _deleteConnectHandler(id, e) {
        SocketActions.remove(id);
        this.socket.close();
        this.socket = null;
        e.preventDefault();
        e.stopPropagation();
    }

    /**
     * Open new connection to socket
     * @private
     */
    _openConnectHandler(e) {
        var item = this.props.item;

        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }

        this.socket = new SockJS(item.url, {
            debug: false
        });

        this.socket.onopen = this._connectionHandler.bind(this);
        this.socket.onclose = this._closeConnectionHandler.bind(this);
        this.socket.onmessage = this._messageHandler.bind(this);

        e.preventDefault();
        e.stopPropagation();
    }

    /**
     * Connection open handler
     * @private
     */
    _connectionHandler(e) {
        this.setState({open: true});
    }

    /**
     * Connection is closed handler
     * @private
     */
    _closeConnectionHandler() {
        this.setState({open: false});
        Utility.error("Соединение зазорвано!");
    }

    /**
     * On message handler
     * @param e
     * @private
     */
    _messageHandler(e) {
        if (this.response) {
            this.response.set(JSON.parse(e.data));
        }
    }

    /**
     * Send message to server
     * @param e
     * @private
     */
    _sendMessageHandler(e) {
        if (this.editor) {
            var code = this.editor.getText();
            this.socket.send(code);
        }
        e.preventDefault();
        e.stopPropagation();
    }

    render() {
        var item = this.props.item;

        setTimeout(function (p) {
            if (this.editor) {
                this.editor.set(p.request);
            }
        }.bind(this, item), 50);

        return (
            <div className="col-lg-6 socket">
                <ul className="socket__toolbar">
                    <li>
                        <i className="fa fa-close fa-2x socket__close"
                           onClick={this._deleteConnectHandler.bind(this, item.id)}></i>
                    </li>
                </ul>
                <form className="from">
                    <div className="inputField">
                        <span className="labelPlace">&nbsp;</span>
                        <input onChange={this._changeFieldHandler.bind(this, item.id)} type="text"
                               value={item.url} id={item.id}
                               className={item.url ? "set" : "empty"}/>
                        <label htmlFor={item.id}>URL для соединения</label>
                    </div>
                    <button className={this.state.open ? "btn btn--cube left open" : "btn btn--cube left"}
                            onClick={this._openConnectHandler.bind(this)}>
                        {this.state.open ? "Соединение установлено" : "Открыть соединение"}
                    </button>
                    <button className="btn btn--cube right" disabled={this.state.open ? false : true}
                            onClick={this._sendMessageHandler.bind(this)}>Сделать запрос
                    </button>
                    <div className="clear"></div>
                    <div className="areaField">
                        <label>Параметры запроса:</label>
                        <div ref="request" className="areaField__editor"></div>
                    </div>
                    <div className="areaField">
                        <label>Ответ:</label>
                        <div ref="response" className="areaField__editor"></div>
                    </div>
                </form>
            </div>
        );
    }
}