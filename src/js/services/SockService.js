/**
 * Created by Abaddon on 30.12.2015.
 */
import SockStore from "../stores/SockStore";
import SockActions from "../actions/SockActions";
import LocalStore from "../stores/LocalStore";

class SockService {
    constructor() {

    }

    _delay(fn) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            fn.call(this);
        }.bind(this), 5000);
    }

    /**
     * Create new web socket connection
     */
    connect() {
        var url = LocalStore.getSettingsField("url");
        if (!url) {
            return;
        }

        if (SockStore.connect) {
            this.disconnect();
        }

        var socket = new SockJS(url, {
            debug: false
        });

        socket.onopen = this._connectionHandler;
        socket.onclose = this._closeHandler.bind(this);
        socket.onmessage = this._messageHandler.bind(this);
    }

    /**
     * On message handler
     *
     * @param e
     * @private
     */
    _messageHandler(e) {
        SockActions.message(e.data, e.timeStamp);
    }

    /**
     * Disconnect and delete web socket connection
     */
    disconnect() {
        SockService.reconnect = false;
        SockActions.disconnect();
    }

    /**
     * Socket connect handler
     *
     * @private
     */
    _connectionHandler() {
        SockActions.connect(this);
        SockService.tryCount = 0;
    }

    /**
     * Socket abort connection
     *
     * @private
     */
    _closeHandler() {
        SockActions.disconnect();
        if (SockService.reconnect && (SockService.tryCount < 5)) {
            SockService.tryCount++;
            this._delay(this.connect);
        } else {
            SockService.tryCount = 0;
            SockStore.trigger("SERVER_NOT_ALLOWED");
        }
    }
}

SockService.tryCount = 0;
SockService.reconnect = true;

export default new SockService();