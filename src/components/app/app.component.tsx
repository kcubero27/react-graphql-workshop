import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <h2>Landing</h2>
                    </Route>
                    <Route path="/create">
                        <h2>Create</h2>
                    </Route>
                    <Route path="/post/:id">
                        <h2>Post profile</h2>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
