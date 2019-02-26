import { Grid } from "@material-ui/core";
import React, { Component, lazy, Suspense } from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { apolloClient } from "../../apollo-client";
import { ListPage } from "../../views/list-page";
import { ErrorBoundary } from "../error-boundary";

const CreatePageLazy = lazy(() => import("../../views/create-page").then(module => ({ default: module.CreatePage })));

const DetailPageLazy = lazy(() => import("../../views/detail-page").then(module => ({ default: module.DetailPage })));

export class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <ErrorBoundary>
                    <ApolloProvider client={apolloClient}>
                        <Grid container justify="center" alignItems="center" direction="column">
                            <Suspense fallback={<div>Loading...</div>}>
                                <Switch>
                                    <Route exact path="/">
                                        <ListPage />
                                    </Route>
                                    <Route path="/create">
                                        <CreatePageLazy />
                                    </Route>
                                    <Route path="/post/:id">
                                        <DetailPageLazy />
                                    </Route>
                                </Switch>
                            </Suspense>
                        </Grid>
                    </ApolloProvider>
                </ErrorBoundary>
            </BrowserRouter>
        );
    }
}
