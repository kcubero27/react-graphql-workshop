import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { apolloClient } from "../../apollo-client";
import { CreatePage } from "../../views/create-page";
import { DetailPage } from "../../views/detail-page";
import { ListPage } from "../../views/list-page";
import { ErrorBoundary } from "../error-boundary";

export class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <ErrorBoundary>
                    <ApolloProvider client={apolloClient}>
                        <Grid container justify="center" alignItems="center" direction="column">
                            <Switch>
                                <Route exact path="/">
                                    <ListPage />
                                </Route>
                                <Route path="/create">
                                    <CreatePage />
                                </Route>
                                <Route path="/post/:id">
                                    <DetailPage />
                                </Route>
                            </Switch>
                        </Grid>
                    </ApolloProvider>
                </ErrorBoundary>
            </BrowserRouter>
        );
    }
}
