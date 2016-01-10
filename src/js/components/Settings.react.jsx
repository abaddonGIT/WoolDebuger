import React, {Component} from "react";
import LocalStore from "../stores/LocalStore";
import Utility from "../Utility";
import merge from "object-assign";
import SockService from "../services/SockService";

export default class SettionsFrom extends Component {
    constructor() {
        super();
        this.state = {
            form: {
                url: ""
            }
        }
    }

    componentDidMount() {
        this.setState({form: LocalStore.settings});
    }

    /**
     * Change field value handler
     * @param e
     * @private
     */
    _changeFieldHandler(e) {
        var elem = e.currentTarget, value = elem.value, old = this.state.form, last = {};
        last[elem.name] = value;
        this.setState({form: merge(old, last)});
    }

    /**
     * Save setting handler
     *
     * @param e
     * @private
     */
    _saveHandler(e) {
        var form = this.state.form;

        if (!Utility.isEmpty(form.url)) {
            LocalStore.settings = form;
        }

        Utility.success("Настройки успешно применены!");
        SockService.connect();
        e.preventDefault();
        e.stopPropagation();
    }

    render() {
        var value = this.state.form.url;
        return (
            <div className="settingsForm">
                <from action="#" className="from">
                    <div className="inputField">
                        <span className="labelPlace">&nbsp;</span>
                        <input type="text" onChange={this._changeFieldHandler.bind(this)} value={value} id="url"
                               name="url"
                               className={this.state.form.url ? "set" : "empty"}/>
                        <label htmlFor="url">URL для соединения</label>
                    </div>
                    <div className="tright">
                        <button className="btn btn--cube save" onClick={this._saveHandler.bind(this)}>Сохранить</button>
                    </div>
                </from>
            </div>
        );
    }
}