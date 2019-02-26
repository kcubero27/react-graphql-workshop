import Fab from "@material-ui/core/Fab/Fab";
import Grid from "@material-ui/core/Grid/Grid";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import withStyles from "@material-ui/core/styles/withStyles";
import { Add } from "@material-ui/icons";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Post } from "../../components/post";
import { ALL_POSTS_QUERY } from "../../domains/post/graphql";
import { AllPostsQuery } from "../../hocs/all-posts";
import { Props } from "./list-page.type";

const styles = (theme: Theme) => ({
    button: {
        margin: theme.spacing.unit
    },
    extendedIcon: {
        marginRight: theme.spacing.unit
    }
});

class ListPageBase extends Component<Props> {
    render() {
        return (
            <AllPostsQuery query={ALL_POSTS_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <p>Loading from {process.env.REACT_APP_GRAPHQL_ENDPOINT}</p>;
                    }

                    if (!data) {
                        return null;
                    }

                    return (
                        <Fragment>
                            <Link to="/create">
                                <Fab color="primary" aria-label="Add" className={this.props.classes!.button}>
                                    <Add />
                                </Fab>
                            </Link>

                            {data.allPosts &&
                                data.allPosts.map(post => (
                                    <Fragment key={post.id}>
                                        <Grid item xs={4}>
                                            <Post post={post} />
                                        </Grid>
                                        <br />
                                    </Fragment>
                                ))}
                        </Fragment>
                    );
                }}
            </AllPostsQuery>
        );
    }
}

export const ListPage = withStyles(styles)(ListPageBase);
