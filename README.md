# Initialise a project

## Requirements
Before starting this workshop, you need to have installed [NodeJS](https://nodejs.org/es/). It can be done by downloading the LTS version from their official web page or just using [Homebrew](https://brew.sh/index_es). However, we recommend you to install [nvm](https://github.com/creationix/nvm) so you can have multiple NodeJS versions in your computer. We also recommend you to have installed [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
  
## ReactJS
ReactJS basically is an open-source JavaScript library which is used for building user interfaces specifically for single page applications.
  
Initialise a new project with [create-react-app](https://github.com/facebook/create-react-app). In this way, you won't need any additional configuration to start a ReactJS project.

Run `npx create-react-app my-app --typescript` in your terminal and change _my-app_ for the name of your new directory.

### Why ReactJS is not a framework
The main big difference between those are that Angular is a framework while ReactJS is a library. Basically, if we create a new project with Angular, we will already have all the basic things such as the router, http... However, if we do it with ReactJS, we will need to install other libraries or implement our own things. For example, in case we need a router, we will have to install one (the most common one is react-router). Same happens for the http.
  
### React developer tools
[React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=es) is a Chrome extension that allows you to debug your application.

# Basic configuration

## Npm
A good practice in your project will be adding fixed versions. In this way, we can avoid having a missmatch of versions in our different environments. 
  
Create a new file called `.npmrc` and add the following configuration:
```
  save=true
  save-exact=true
```
  
- With [save-exact](https://docs.npmjs.com/misc/config#save-exact) dependencies saved to package.json using --save, --save-dev or --save-optional will be configured with an exact version rather than using npm’s default semver range operator.
- With [save](https://docs.npmjs.com/misc/config#save) every time we install a dependency it will be added automatically in the dependencies inside an existing package.json.
  
## Prettier
[Prettier](https://prettier.io/) is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.
  
Run `npm install --save-dev --save-exact prettier` in your terminal in order to install it.
  
Create a new file called `.pretierrc` in the root of your project and add the following configuration:
```
{
  "tabWidth": 4,
  "printWidth": 120
}
```
  
In order to be able to run it from the terminal, we should add the following to the package.json file:
```
{
  "scripts": {
    ...
    "prettier": "prettier --write --config ./.prettierrc './src/**/*.{ts,tsx,html,css}'",
  }
}
```
  
## TSLint
[TSLint](https://palantir.github.io/tslint/) is an extensible static analysis tool that checks TypeScript code for readability, maintainability, and functionality errors. It is widely supported across modern editors & build systems and can be customized with your own lint rules, configurations, and formatters.
  
We will install TSLint and two other plugins: 
- [tslint-react](https://github.com/palantir/tslint-react): adds more rules related to React and JSX.
- [tslint-config-prettier](https://github.com/prettier/tslint-config-prettier): disables all conflicting rules that can be problematic when using Prettier and TSLint.
  
Run `npm install --save-dev --save-exact tslint tslint-react tslint-config-prettier` in your terminal in order to install all of them.
  
Create a new file called tslint.json in the root of your project with the following content:
```
{
    "defaultSeverity": "warning",
    "extends": ["tslint:latest", "tslint-react", "tslint-config-prettier"],
    "jsRules": {},
    "rules": {
        "no-implicit-dependencies": false,
        "jsx-boolean-value": ["always", { "never": ["exact"] }],
        "jsx-no-lambda": ["always", { "never": ["onClick"] }],
        "object-literal-sort-keys": false,
        "no-shadowed-variable": false,
        "interface-name": false,
        "member-access": [false],
        "no-use-before-declare": false,
        "no-submodule-imports": false,
        "no-console": false
    }
}
```
  
Consider that _no-unused-variables_ rule is not supported anymore. Therefore, we need to configure this in the compiler. Adding the following in tsconfig.json:
```
  {
    "compilerOptions": {
      ...
      "noUnusedLocals": false
    }
  }
```
  
In order to be able to run it from the terminal, we should add the following to the package.json file:
```
{
  "scripts": {
    ...
    "tslint": "tslint './src/**/*.{ts,tsx,html,css}'",
    "tslint:fix": "npm run tslint -- -p ./tsconfig.json -c ./tslint.json --fix",
  }
}
```

## Git hook
[Git](https://git-scm.com) has a way to fire off custom scripts when certain important actions occur. The _pre-commit_ hook is run first, before you even type in a commit message.
 
Run `npm install --save-dev --save-exact lint-staged husky` in your terminal in order to install it.
   
We need to specify the commands we need to execute before the commit is really executed. We can add this inserting the following code inside package.json:
```
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{ts,tsx,html,css}": [
      "tslint -p ./tsconfig.json -c ./tslint.json --fix",
      "prettier --write",
      "git add"
    ]
  }
}
```
 
At this step, if we want to execute a commit, it will complain because of our _index.css_ file. This is because we are importing it without declaring a variable and TypeScript is not smart enough to know that it's used. To avoid this and be able to do a commit, we will need to run it with the _--no-verify_ option.

# Storybook  
[Storybook](https://storybook.js.org/) is a UI development environment and playground for UI components. The tool enables users to create components independently and showcase components interactively in an isolated development environment.

Run `npm install --save-dev --save-exact @storybook/react @types/storybook__react` in your terminal in order to install it.
  
Then add the following scripts in your package.json:
```
  {
    "scripts": {
      ...
      "storybook": "start-storybook -p 6006 -c .storybook",
      "build-storybook": "build-storybook"
    }
  }
```
   
## Setting up TypeScript to work with Storybook  
Run `npm install --save-dev --save-exact react-docgen-typescript-loader awesome-typescript-loader` in your terminal in order to install all the required dependencies.
  
We will need to create a new configuration directory only for storybook. Go to the root of the project and create a new directory called .storybook. Add a new file called webpack.config.js and add the following content:  
```
  const path = require("path");
  module.exports = storybookBaseConfig => {
    storybookBaseConfig.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("awesome-typescript-loader")
        },
        {
          loader: require.resolve("react-docgen-typescript-loader")
        }
      ]
    });
  
    storybookBaseConfig.resolve.extensions.push(".ts", ".tsx");
    return storybookBaseConfig;
  };
```
  
## Add main plugins
Instead of plugins, the extra features for Storybooks are called Addons.
  
There are a lot of [addons](https://storybook.js.org/addons/addon-gallery/) for Storybook.
  
We will install some basic ones:
- [Knobs](https://www.npmjs.com/package/@storybook/addon-knobs): it allows you to edit React props dynamically using the Storybook UI.
- [Actions](https://www.npmjs.com/package/@storybook/addon-actions): it displays data received by event handlers in Storybook. 
- [Options](https://www.npmjs.com/package/@storybook/addon-options): it allows you to edit Storybook configuration. 
- [JSX](https://github.com/storybooks/addon-jsx): it shows you the JSX of the story. It can be useful to see what props you set.
  
Run `npm install --save-dev --save-exact @storybook/addon-knobs @storybook/addon-actions @storybook/addon-options storybook-addon-jsx` in your terminal just to install the dependencies without types.
  
To install the types, we will need to run `npm install --save-dev --save-exact @types/storybook__addon-knobs @types/storybook__addon-actions @types/storybook-addon-jsx`. We don't need the types for the addop options because it already includes the types in the same repository.
  
Even though we have already installed the dependencies, we need to create a file called addons.js inside the .storybook directory to specify the addons that need to import our Storybook. _This file is order sensitive_, it means that the addon imported first will be the active one.
  
```
  import "@storybook/addon-knobs/register";
  import '@storybook/addon-actions/register';
  import '@storybook/addon-options/register';
  import 'storybook-addon-jsx/register';
```
  
## Load all the stories
Create a new file called config.js with the following content:
```
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
```

## Create first story
In order to check that everything went fine, we will create our first story. Create a new file inside src/components/test.story.tsx with the following content:
```
import { number } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

interface Props {
    children: any;
    fontSize?: number;
    fontFamily?: string;
    color?: string;
}

const Test = ({ fontSize = 16, fontFamily = "Arial", color = "red", children }: Props) => (
    <div style={{ color, fontFamily, fontSize: fontSize + "px" }}>{children}</div>
);

storiesOf("Test", module)
    .addWithJSX("Paris", () => {
        const fontSize = number("Font size", 45);
        return (
            <Test fontSize={fontSize} fontFamily="Roboto" color="#CAF200">
                Hello
            </Test>
        );
    })
    .addWithJSX("Orleans", () => <Test color="#236544">Hello</Test>);

storiesOf("Test 2", module).addWithJSX("Paris", () => <div color="#333">test</div>);
```

If we run now `npm run storybook`, a new tab will be opened in our browser with the URL _http://localhost:6006/_. 

# Project structure
There is no style guide for ReactJS.

```
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── apollo-client.ts
│   ├── components
│   │   └── component-1
│   │       ├── index.ts
│   │       ├── component-1.component.tsx
│   │       └── component-1.type.ts
│   ├── domains
│   │   └── post
│   │       ├── graphql
│   │       │   ├── query-1.query.ts
│   │       │   ├── mutation-1.mutation.ts
│   │       │   └── index.ts
│   │       └── index.ts
│   ├── global.d.ts
│   ├── hocs
│   │   └── hoc-1
│   │       ├── hoc-1.component.tsx
│   │       ├── hoc-1.type.ts
│   │       └── index.ts
│   ├── index.css
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── serviceWorker.ts
│   └── views
│       └── view-1
│           ├── index.ts
│           ├── view-1.component.tsx
│           └── view-1.type.ts
├── tsconfig.json
└── tslint.json
```

## Components
There are different ways of creating components. The most used one is called stateless and statefull components.

Functional Component or Stateless component:
- Functional component is like pure function in JavaScript.
- Functional component is also called as a stateless component.
- The functional component only receives props from parent component and return you JSX elements.
- The functional component doesn’t play with any lifecycle methods of React and doesn’t play with the component state.

Class component or statefull component:
- React class component is called as a stateful component.
- Stateful component plays with all life cycle methods of React.
- This component will modify state.

## Domains
This folder contains all the things related to a single entity. For example, we will see here interfaces, queries, mutations, services from an entity...

## HOCs
Components that enhance other components. In this workshop, we will place all the Query and Mutation components in this folder.

```
function withSubscription(WrappedComponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```

## Views
Each of the components that are the main ones in a route. 

# GraphQL
GraphQL is a syntax that describes how to ask for data, and is generally used to load data from a server to a client. GraphQL has three main characteristics:
- It lets the client specify exactly what data it needs.
- It makes it easier to aggregate data from multiple sources.
- It uses a type system to describe data.

## What makes different GraphQL from REST
- In REST, the endpoint you call is the identity of that object. In GraphQL, the identity is separate from how you fetch it.
- In REST, the shape and size of the resource is determined by the server. In GraphQL, the server declares what resources are available, and the client asks for what it needs at the time.
- In GraphQL, you can traverse from the entry point to related data, following relationships defined in the schema, in a single request. In REST, you have to call multiple endpoints to fetch related resources.

See more: https://blog.apollographql.com/graphql-vs-rest-5d425123e34b

## Queries and mutations
Queries let the user to retrieve data (an equivalent of a GET in REST). However, Mutations let the user to update, delete or create a new entity (equivalent of DELETE, POST and PUT in REST).

### Fields
Each of the things we request is called a field. A field can even have a sub-selection of fields like friends.
```
{
  hero {
    name
    # Queries can have comments!
    friends {
      name
    }
  }
}
```

### Arguments
Every field and nested object can get its own set of arguments:
```
{
  human(id: "1000") {
    name
    height
  }
}
```

### Aliases
They let you rename the result of a field to anything you want:
```
// Query
{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}

// Result
{
  "data": {
    "empireHero": {
      "name": "Luke Skywalker"
    },
    "jediHero": {
      "name": "R2-D2"
    }
  }
}
```

### Fragments
They allow us to repeat the same part of a query, mutation or subscription in multiple ones.
```
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```

## Subscription
They are a way to push data from the server to the clients that choose to listen to real time messages from the server. A common use case for subscriptions is notifying the client side about particular events, for example the creation of a new object, updated fields and so on.

# Graphcool
[Graphcool](https://www.graph.cool/) is an open-source backend development framework to develop and deploy production-ready GraphQL microservices.

There are more tools similar to Graphcool like [Prisma](https://www.prisma.io/).

## Create a server
_For the following steps, you will need to have an account in Graphcool._ 

Graphcool has included a CLI tool to build apps faster. We can install it globally or use it through npx: `npm install -g graphcool`.

### Create a local service definition
Run `graphcool init my-app` or using the short form `gfc init my-app` where _my-app_ is the name of the new application. It will create a new directory with the name _my-app_.

The project will look like:
```
.
├── graphcool.yml
├── package.json
├── src
│   ├── hello.graphql
│   └── hello.js
└── types.graphql
```

### Create a new entity Post
Go inside the project and edit types.graphql with the following content:
```
type User @model {
  id: ID! @isUnique
  name: String
  dateOfBirth: DateTime

  # Uncomment below - you can declare relations between models like this

  # posts: [Post!]! @relation(name: "UserPosts")
}


# Uncomment the model below as well

type Post @model {
   id: ID! @isUnique
   title: String!
   description: String!
   imageUrl: String!
   createdAt: DateTime!
   updatedAt: DateTime!
 }
```

### Deploy the app
Graphcool already has a command to deploy the current application in live.
Just use `graphcool deploy` inside the project.

# GraphQL Clients
There are two main clients in the market: [Apollo](https://www.apollographql.com/docs/react/) and [Relay](https://facebook.github.io/relay/docs/en/introduction-to-relay.html).

## Do we even need a client?
If you are using a simple application, you can just use fetch in your components like so:
```
fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({query: "{ hello }"})
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));
```

## Apollo Client Developer Tools
[Apollo Client Developer Tools](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm) is a Chrome extension that facilitates debugging your GraphQL Apollo application. 

Some features that allows:
- A built-in GraphiQL console that allows you to make queries against your GraphQL server using your app's network interface directly (no configuration necessary).
- A query watcher that shows you which queries are being watched by the current page, when those queries are loading, and what variables those queries are using.
- A mutation inspector that displays the mutations made to you apollo-client app data.
- A cache inspector that displays your client-side Redux store in an Apollo-Client-friendly way. You can explore the state of the store through a tree-like interface, and search through the store for specific field keys and values.

# Application
What we want to achieve with this application is showing a list of articles, going to the profile of one of them and be able to add new ones.

## Router
There are two main in order to handle the routing: [react-router](https://github.com/ReactTraining/react-router/tree/master/packages/react-router) and [react-router-dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom).

react-router provides the core routing functionality for React Router, but you might not want to install it directly. If you are writing an application that will run in the browser, you should instead install react-router-dom. Similarly, if you are writing a React Native application, you should instead install react-router-native. Both of those will install react-router as a dependency.

Run `npm install --save-dev --save-exact react-router-dom @types/react-router-dom` to install the library and the types.

### Create an entry point
We will place the app component inside the components folder and rename it to app.component.ts. The content will be:
```
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
```
We will as well remove the App.css and the logo because we will not use it anymore.

Our index.js will look like:
```
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { App } from "./components/app";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
```

## Error boundary
[Error Boundaries](https://reactjs.org/docs/error-boundaries.html) are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

They are ideal to catch all the errors and show them in an error tracking tool like [Sentry](https://sentry.io/welcome/).

### Create an error boundary component
Let's create a new component called error-boundary inside components folder. The content will look like this:
```
import React, { Component } from "react";
import { State } from "./error-boundary.type";

export class ErrorBoundary extends Component<{}, State> {
    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    readonly state = { hasError: false };

    componentDidCatch(error: Error, info: object) {
        // You can also log the error to an error reporting service
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}
```

error-boundary.type.ts will only contain the state interface:
```
export interface State {
  hasError: boolean;
}
```

A class component becomes an error boundary if it defines either (or both) of the lifecycle methods static getDerivedStateFromError() or componentDidCatch(). Use static getDerivedStateFromError() to render a fallback UI after an error has been thrown. Use componentDidCatch() to log error information.

Error boundaries work like a JavaScript catch {} block, but for components. Note that error boundaries only catch errors in the components below them in the tree. 

We will place it in the upper level of our application:
```
export class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <ErrorBoundary>
                    <Switch>
                        <Route exact path="/">
                            <LaunchError />
                        </Route>
                        <Route path="/create">
                            <h2>Create</h2>
                        </Route>
                        <Route path="/post/:id">
                            <h2>Post profile</h2>
                        </Route>
                    </Switch>
                </ErrorBoundary>
            </BrowserRouter>
        );
    }
}
```

Just to know that it works as expected, we can fake an error in our application. We can create a new component and throw an error before rendering it:
```
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Error } from "tslint/lib/error";
import { ErrorBoundary } from "../error-boundary";

const LaunchError = () => {
    throw new Error();
    return <p>Lorem ipsum.</p>;
};

export class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <ErrorBoundary>
                    <Switch>
                        <Route exact path="/">
                            <LaunchError />
                        </Route>
                        <Route path="/create">
                            <h2>Create</h2>
                        </Route>
                        <Route path="/post/:id">
                            <h2>Post profile</h2>
                        </Route>
                    </Switch>
                </ErrorBoundary>
            </BrowserRouter>
        );
    }
}
```

As we are in development mode, we will see a popup with the stacktrace of the error. Once the application uses the prod mode, this message won´t be shown.

# Material UI
[Material UI](https://material-ui.com/) is one of the most popular React UI framework.

## Installation 
We can install only the core components, however, we will add as well some icons: `npm install --save --save-exact @material-ui/core @material-ui/icons`.

Material UI uses Roboto Font therefore, we need somehow import it. The fatest way is going to public/index.html and add the following link:
```
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
```

## Create post component
Go to components folder and create a new component called post.

The post.component.tsx file will be:
```
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Props } from "./post.type";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

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
            <Typography component="p">
              {post.description.slice(0, 100)}...
            </Typography>
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
```

The post.story.tsx content:
```
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
```

## Apollo 
There are three different types of using Apollo inside the project:
- Typing the Component APIs:
```
interface Data {
  allPeople: {
    people: Array<{ name: string }>;
  };
};

interface Variables {
  first: number;
};

class AllPeopleQuery extends Query<Data, Variables> {}
```

- Typing the Higher Order Components:
```
import React from "react";
import gql from "graphql-tag";
import { ChildDataProps, graphql } from "react-apollo";

const HERO_QUERY = gql`
  query GetCharacter($episode: Episode!) {
    hero(episode: $episode) {
      name
      id
      friends {
        name
        id
        appearsIn
      }
    }
  }
`;

type Hero = {
  name: string;
  id: string;
  appearsIn: string[];
  friends: Hero[];
};

type Response = {
  hero: Hero;
};

type Variables = {
  episode: string;
};

type ChildProps = ChildDataProps<{}, Response, Variables>;

const withCharacter = graphql<{}, Response, Variables, ChildProps>(HERO_QUERY, {
  options: () => ({
    variables: { episode: "JEDI" }
  })
});

export default withCharacter(({ data: { loading, hero, error } }) => {
  if (loading) return <div>Loading</div>;
  if (error) return <h1>ERROR</h1>;
  return ...// actual component with data;
});
```

- React Apollo Hooks:
```
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

const GET_DOGS = gql`
  {
    dogs {
      id
      breed
    }
  }
`;

const Dogs = () => {
  const { data, error, loading } = useQuery(GET_DOGS);
  if (loading) {
    return <div>Loading...</div>;
  };
  if (error) {
    return <div>Error! {error.message}</div>;
  };

  return (
    <ul>
      {data.dogs.map(dog => (
        <li key={dog.id}>{dog.breed}</li>
      ))}
    </ul>
  );
};
```

See more: https://github.com/trojanowski/react-apollo-hooks and https://www.apollographql.com/docs/react/recipes/static-typing.html

### Installation
In Apollo documentation, they recommend using Apollo [Boost](https://www.apollographql.com/docs/react/essentials/get-started.html) because it contains all the libraries that you need to create your client. We will follow this way as well, but just keep in mind that they can be installed separately.

Run `npm install --save --save-exact apollo-boost react-apollo graphql` to install the dependencies.
- [apollo-boost](https://www.npmjs.com/package/apollo-boost): Package containing everything you need to set up Apollo Client
- [react-apollo](https://github.com/apollographql/react-apollo): View layer integration for React
- [graphql](https://www.npmjs.com/package/graphql): Also parses your GraphQL queries

### Create a client
The only thing you need to get started is the endpoint for your GraphQL server. If you don’t pass in uri directly, it defaults to the /graphql endpoint on the same host your app is served from.

Create a file called apollo-client.ts:
```
import ApolloClient from "apollo-boost";

export const apolloClient = new ApolloClient({
    uri: process.env.REACT_APP_API_ENDPOINT
});
```

We have added a [ReactJS custom variable](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables). Therefore, we will need to create a new file in the root of our project called .env:
```
REACT_APP_API_ENDPOINT = ""
```

If we go to [Graphcool Console](https://console.graph.cool/), we select the new project we have created and we press the endpoints button, we will obtain the simple API which we need to replace in the .env file.

To connect Apollo Client to React, you will need to use the ApolloProvider component exported from react-apollo. The ApolloProvider is similar to React’s context provider. Open your app component and add the following content:
```
import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { apolloClient } from "../../apollo-client";
import { ErrorBoundary } from "../error-boundary";

export class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <ErrorBoundary>
                    <ApolloProvider client={apolloClient}>
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
                    </ApolloProvider>
                </ErrorBoundary>
            </BrowserRouter>
        );
    }
}
```


## Components
### Query component
As an example we will do the detail-post. Inside domains/graphql we will create a file called detail-post.query.ts. We will be filtering by the id of the post. Therefore, we will pass a variable to the query:
```
import gql from "graphql-tag";

export const DETAIL_POST_QUERY = gql`
  query PostQuery($id: ID!) {
    post: Post(id: $id) {
      id
      title
      description
      imageUrl
      createdAt
      updatedAt
    }
  }
`;
```

The next step would be create the HOC component:
```
import Query from "react-apollo/Query";
import { Data, Variables } from "./detail-post.type";

export class DetailPostQuery extends Query<Data, Variables> {}
```

with their types:
```
import { Post } from "../../domains/post";

export interface Variables {
  id: string;
}

export interface Data {
  post: Post;
}
```

We will create a new component called detail-post and use the DetailPostQuery component in order to get the data. 
```
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
```

Apollo works the following way:
If we have enabled the cache it will go to the cache and look for the specific item. In case it's not there, it will execute a request. You can see this workflow in the Network tab inside Chrome or with the Apollo Client Developer Tools extension.

Finally, just replace the component inside app component for the real component:
```
<Route path="/post/:id">
  <DetailPage />
</Route>
```

### Mutation component
For mutations we will need exactly the same. A mutation passing the required variables to create a post entity:
```
import gql from "graphql-tag";

export const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $description: String!
    $title: String!
    $imageUrl: String!
  ) {
    createPost(description: $description, title: $title, imageUrl: $imageUrl) {
      id
      title
      description
      imageUrl
      createdAt
      updatedAt
    }
  }
`;
```

A HOC component with the types:
```
import Mutation from "react-apollo/Mutation";
import { Data, Variables } from "./create-post.type";

export class CreatePostMutation extends Mutation<Data, Variables> {}
```

```
import { Post } from "../../domains/post";

export interface Variables {
  title: string;
  description: string;
  imageUls: string;
}

export interface Data {
  createPost: Post;
}
```

And finally a component where we will use the HOC:
```
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
```

Mutations don't work the same way as queries. Mutations are only triggered when the function is invoqued. Another thing we should notice is that as we are using the cache from Apollo, our all-post query will be cached as well. In order to add this new post to the cached query, we should override the cache itself; this is why we are using `cache.writeQuery`.

There is a problem related to Apollo cache. readQuery crashes if there is nothing in the store. We need to manage this with a try catch until they fix it: https://github.com/apollographql/apollo-feature-requests/issues/1



# Code Splitting
[Code-Splitting](React.lazy) is a feature supported by bundlers like Webpack and Browserify (via factor-bundle) which can create multiple bundles that can be dynamically loaded at runtime.

The React.lazy function lets you render a dynamic import as a regular component.

By default, React.lazy doesn't support named imports. You can see more in this [discussion](https://github.com/reactjs/rfcs/pull/64). Therefore, we can use the `export default` in our components or do this once we try to import the component like this:
```
const DetailPageLazy = lazy(() => import("../../views/detail-page").then(module => ({ default: module.DetailPage })));
```

If the module containing the OtherComponent is not yet loaded by the time MyComponent renders, we must show some fallback content while we’re waiting for it to load - such as a loading indicator. This is done using the Suspense component:
```
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
```

To check how code splitting is used in the app, we can do this by going to the main route and try later to go the create or the detail page. If we inspect the network tab, we will see that a second bundle will be loaded.

## Other resources
GraphQL integration: https://www.onegraph.com/
O'Reilly: http://shop.oreilly.com/product/0636920137269.do

## Bibliography
https://onlineornot.com/blog/apollo-vs-relay-which-graphql-client-to-use-2019
