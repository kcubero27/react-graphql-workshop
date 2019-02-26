import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Post } from "./post.component";

storiesOf("Post", module)
    .addDecorator(story => <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>)
    .addWithJSX("Paris", () => {
        const id = text("Id", "1234ASD");
        const title = text("Title", "Lorem ipsum.");
        const description = text(
            "Description",
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, nostrum."
        );
        const imageUrl = text(
            "Image URL",
            "https://media.giphy.com/media/cfuL5gqFDreXxkWQ4o/giphy-downsized-large.gif"
        );

        return <Post post={{ id, title, description, imageUrl }} />;
    });
