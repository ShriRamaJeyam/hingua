import React from "react";
import WhatsAppContactless from './WhatsAppContactless/Application';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

export default function App(props) {
    return (
        <Router>
            <Switch>
                <Route path="/wa-messenger">
                    <WhatsAppContactless />
                </Route>
                <Route path="/">
                    <Redirect to="/wa-messenger" />
                </Route>
            </Switch>
        </Router>
    );
}