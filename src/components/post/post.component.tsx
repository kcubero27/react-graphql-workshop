import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Props } from "./post.type";

export class Post extends Component<Props> {
    render() {
        const { post } = this.props;

        return (
            <Card>
                <CardActionArea>
                    <CardMedia src={post.imageUrl} component="img" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {post.title}
                        </Typography>
                        <Typography component="p">{post.description.slice(0, 100)}...</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        <Link
                            className="bg-white ma3 box post flex flex-column no-underline br2"
                            to={`/post/${this.props.post.id}`}
                        >
                            Learn More
                        </Link>
                    </Button>
                </CardActions>
            </Card>
        );
    }
}
