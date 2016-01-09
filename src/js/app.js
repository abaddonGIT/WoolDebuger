import React from "react";
import ReactDom from "react-dom";
import Router, {Route, IndexRoute, browserHistory} from 'react-router';
import Editors from "./components/Editors.react.jsx";
import WebSockets from "./components/WebSockets.react.jsx";
import JsonDebug from "./components/JsonDebug.react.jsx";
import Toolbar from "./components/Toolbar.react.jsx";

(function (w, d) {
    var routes = (
        <Route path="/" component={JsonDebug}>
            <IndexRoute component={Editors}/>
            <Route path="/settings" component={Editors} />
            <Route path="/sockets" component={WebSockets} />
        </Route>
    );
    ReactDom.render(
        <Router history={browserHistory}>{routes}</Router>, d.querySelector("#wrapper"));
}(window, document));