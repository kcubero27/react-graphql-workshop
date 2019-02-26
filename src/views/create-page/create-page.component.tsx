import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import React, { ChangeEvent, Component, FormEvent } from "react";
import { Redirect } from "react-router";
import { Post } from "../../domains/post";
import { ALL_POSTS_QUERY } from "../../domains/post/graphql";
import { CREATE_POST_MUTATION } from "../../domains/post/graphql/create-post.mutation";
import { CreatePostMutation } from "../../hocs/create-post";
import { KeyState, State } from "./create-page.type";

export class CreatePage extends Component<{}, State> {
    state: Readonly<State> = {
        title: "",
        description: "",
        imageUrl: ""
    };

    handleSubmit = (e: FormEvent, createPost: any) => {
        e.preventDefault();
        createPost({ variables: this.state });
    };

    handleChange = (field: string) => (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ [field]: event.target.value } as KeyState);
    };

    render() {
        return (
            <CreatePostMutation
                mutation={CREATE_POST_MUTATION}
                update={(cache, { data, errors }) => {
                    if (data && (!errors || (errors && !errors.length))) {
                        try {
                            const cacheData = cache.readQuery<{ allPosts: Post[] }>({
                                query: ALL_POSTS_QUERY
                            });

                            const allPosts = cacheData
                                ? cacheData.allPosts.concat([data.createPost])
                                : [data.createPost];

                            cache.writeQuery({
                                query: ALL_POSTS_QUERY,
                                data: {
                                    allPosts
                                }
                            });
                        } catch (e) {
                            // As cache.readQuery throws an exception when is empty, we need to handle this in the view
                        }
                    }
                }}
            >
                {(createPost, { data }) => {
                    if (data) {
                        return <Redirect to="/" />;
                    }

                    return (
                        <Grid item xs={4}>
                            <form onSubmit={e => this.handleSubmit(e, createPost)}>
                                <div>
                                    <TextField
                                        id="standard-name"
                                        label="Title"
                                        value={this.state.title}
                                        onChange={this.handleChange("title")}
                                        margin="normal"
                                    />
                                </div>

                                <div>
                                    <TextField
                                        id="standard-name"
                                        label="Description"
                                        value={this.state.description}
                                        onChange={this.handleChange("description")}
                                        margin="normal"
                                        multiline={true}
                                    />
                                </div>

                                <div>
                                    <TextField
                                        id="standard-name"
                                        label="Image URL"
                                        value={this.state.imageUrl}
                                        onChange={this.handleChange("imageUrl")}
                                        margin="normal"
                                    />
                                </div>

                                <br />
                                <Button type="submit" variant="contained">
                                    Save
                                </Button>
                            </form>
                        </Grid>
                    );
                }}
            </CreatePostMutation>
        );
    }
}
