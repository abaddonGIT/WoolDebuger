import React, {Component} from 'react';
import ConnectBlock from "./ConnectBlock.react.jsx";
import ConnectStore from "../stores/ConnectStore";



export default class WebSockets extends Component {
    constructor() {
        super();
        this.state = {
            connects: []
        }
    }

    componentDidMount() {
        ConnectStore.bind("REMOVE_CONNECT ADD_CONNECT UPDATE_CONNECT", this._changeConnectHandler.bind(this));
        this.setState({connects: ConnectStore.getAll()});
    }

    componentWillUnmount() {
        ConnectStore.unbind("REMOVE_CONNECT ADD_CONNECT UPDATE_CONNECT");
    }

    /**
     * Add new connection handler
     * @param params
     * @private
     */
    _changeConnectHandler() {
        this.setState({connects: ConnectStore.getAll()});
    }

    render() {
        var connects = this.state.connects;

        return (
            <div className="connects__list">
                {connects.length ?  connects.map(function (item) {
                    return <ConnectBlock key={item.id} item={item}/>
                    }) : <h2>Пока список соединений пуст.</h2>}
            </div>
        );
    }
}