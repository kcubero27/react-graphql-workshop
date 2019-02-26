import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { DETAIL_POST_QUERY } from "../../domains/post/graphql/detail-post.query";
import { DetailPostQuery } from "../../hocs/detail-post";
import { Props } from "./detail-page.type";

export class DetailPageBase extends Component<Props> {
    render() {
        return (
            <DetailPostQuery query={DETAIL_POST_QUERY} variables={{ id: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>;
                    }

                    if (!data) {
                        return null;
                    }

                    return (
                        <Grid item xs={4}>
                            <div>
                                <img width="100%" src={data.post.imageUrl} alt="" />
                            </div>

                            <Typography component="h2" variant="h1" gutterBottom>
                                {data.post.title}
                            </Typography>

                            <Typography variant="body1" gutterBottom>
                                {data.post.description}
                            </Typography>

                            <Typography variant="caption" gutterBottom>
                                {data.post.createdAt} · {data.post.updatedAt}
                            </Typography>
                        </Grid>
                    );
                }}
            </DetailPostQuery>
        );
    }
}

export const DetailPage = withRouter(DetailPageBase);
