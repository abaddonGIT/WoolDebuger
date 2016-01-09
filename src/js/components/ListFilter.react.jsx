import React, {Component} from 'react';
import LocalStore from "../stores/LocalStore";

export default class ListFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: {},
            form: {
                type: ""
            }
        }
    }

    componentDidMount() {
        this._getItemsTypes();
    }

    /**
     * Get all types for debug list
     *
     * @private
     */
    _getItemsTypes() {
        var all = LocalStore.getAll(), ln = all.length, types = {};
        while (ln--) {
            let item = all[ln];
            types[item.type] ? "" : types[item.type] = item.type;
        }
        this.setState({types: types});
    }

    /**
     * Select debug type handler
     * @param e
     * @private
     */
    _selectTypeHandler(e) {
        var select = e.currentTarget, value = select.value;
        this.props.sortByTypeHandler(value);
    }

    render() {
        var tp = Object.keys(this.state.types);
        return (
            <div className="listFilter">
                <from action="#" className="from">
                    <div className="selectField">
                        <select onChange={this._selectTypeHandler.bind(this)}>
                            <option value="null">Выберите тип</option>
                            {tp.map(function(type) {
                                return <option key={type} value={type}>{type}</option>
                                })}
                        </select>
                    </div>
                </from>
            </div>
        );
    }
}

ListFilter.defaultProps = {
    sortByTypeHandler: function () {
    }
};

ListFilter.propTypes = {
    sortByTypeHandler: React.PropTypes.func
};