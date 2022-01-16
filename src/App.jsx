import React from "react";
import WhatsAppContactless from './WhatsAppContactless/Application';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import HomePage from "./Homepage";
import AstroHomePage from "./Astro";
import NaligaiHelper from "./Astro/NaaligaiHelper";

export default function App(props) {
    return (
        <Router>
            <Switch>
                <Route path="/wa-messenger">
                    <WhatsAppContactless />
                </Route>
                <Route path="/astro/naaligai-helper">
                    <NaligaiHelper />
                </Route>
                <Route path="/astro">
                    <AstroHomePage />
                </Route>
                <Route path="/">
                    <HomePage />
                </Route>

            </Switch>
        </Router>
    );
}