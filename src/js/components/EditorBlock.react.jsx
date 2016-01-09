import React, {Component} from 'react';
import Utility from "../Utility";

export default class EditorBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.params) {
            var params = this.props.params, date = Utility.date(params.timestamp), size = "editor col-lg-" + this.props.size;

            setTimeout(function (p) {
                this.refs.editor.innerHTML = "";
                var editor = new JSONEditor(this.refs.editor);
                Utility.addClass("show", this.refs.editor_wrap);
                editor.set(p.data);
            }.bind(this, params), 50);
        } else {
            params = {};
            date = "";
        }
        return (<div className={size} ref="editor_wrap">
            <div className="editor__toolbar">
                <ul>
                    <li><i className="fa fa-bug"></i>{params.type}</li>
                    <li><i className="fa fa-clock-o"></i>{date.toString()}</li>
                </ul>
            </div>
            <div ref="editor" id={this.props.id}></div>
        </div>);
    }
}

EditorBlock.propTypes = {
    params: React.PropTypes.object,
    size: React.PropTypes.string,
    id: React.PropTypes.string
};

EditorBlock.defaultProps = {
    params: {},
    size: null,
    id: null
};