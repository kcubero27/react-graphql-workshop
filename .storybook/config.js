import { configure, addDecorator, setAddon } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import JSXAddon from "storybook-addon-jsx";
import { withOptions } from "@storybook/addon-options/src/preview";

// Set JSX as global
setAddon(JSXAddon);

// Load all the stories inside components folder
const req = require.context("../src/components", true, /\.story\.tsx$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

// Add knobs addon as default
addDecorator(withKnobs);

addDecorator(
    withOptions({
        name: "React GraphQL Workshop"
    })
);

configure(loadStories, module);
