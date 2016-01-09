/**
 * Created by Abaddon on 05.01.2016.
 */
import React, {Component} from 'react';
import LocalStore from "../stores/LocalStore";
import GlobalStore from "../stores/GlobalStore";
import CreateFragment from "react-addons-create-fragment";
import EditorBlock from "./EditorBlock.react.jsx";

export default class Editors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {},
            mainBlock: {}
        };
    }

    componentDidMount() {
        //set main editor
        this._setDefEditors();
        GlobalStore.bind("NEW_DEBUG_INFO", this._updateMainEditor.bind(this));
        GlobalStore.bind("SELECT_ITEM_FROM_LIST", this._selectHandler.bind(this));
    }

    componentWillUnmount() {
        GlobalStore.unbind("NEW_DEBUG_INFO SELECT_ITEM_FROM_LIST");
    }

    /**
     * Set main editor for page
     * @private
     */
    _setDefEditors() {
        var last = LocalStore.getLast(), all = LocalStore.getAll(), ln = all.length, selected = {};
        for (let i = 0; i < ln; i++) {
            let item = all[i];
            if (item.checked) {
                selected[item.timestamp] = item;
            }
        }
        this.setState({mainBlock: last, selected: selected});
    }

    /**
     * Update main editor content then new debug info by send
     * @private
     */
    _updateMainEditor() {
        this.setState({mainBlock: LocalStore.getLast()});
    }

    /**
     * Select item from debug list
     * @param e
     * @param id
     * @private
     */
    _selectHandler(params) {
        var id = params[0], state = params[1], selected = this.state.selected;

        if (state === true) {
            if (!selected[id]) selected[id] = LocalStore.getById(id);
        } else {
            if (selected[id]) delete selected[id];
        }
        this.setState({mainBlock: LocalStore.getLast(), selected: selected});
    }

    render() {
        var editors = {}, selected = this.state.selected;

        for (let id in selected) {
            let item = selected[id];
            editors["edit_" + id] = <EditorBlock params={item} size="6" id={id}/>;
        }

        return (
            <div id="editors">
                <EditorBlock params={this.state.mainBlock} size="12" id="last"/>
                <div className="clear"></div>
                <hr />
                <div className="select__editors">
                    {CreateFragment(editors)}
                    <div className="clear"></div>
                </div>
            </div>
        );
    }
}
