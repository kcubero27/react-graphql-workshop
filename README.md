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

### What makes different GraphQL from REST
- In REST, the endpoint you call is the identity of that object. In GraphQL, the identity is separate from how you fetch it.
- In REST, the shape and size of the resource is determined by the server. In GraphQL, the server declares what resources are available, and the client asks for what it needs at the time.
- In GraphQL, you can traverse from the entry point to related data, following relationships defined in the schema, in a single request. In REST, you have to call multiple endpoints to fetch related resources.

![graphql workflow](https://cdn-images-1.medium.com/max/3568/1*_fQh0zWBlDG1OJ-FbMnWcw.png)

See more: https://blog.apollographql.com/graphql-vs-rest-5d425123e34b

### Queries and mutations
Queries let the user to retrieve data (an equivalent of a GET in REST). However, Mutations let the user to update, delete or create a new entity (equivalent of DELETE, POST and PUT in REST).

#### Fields
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

#### Arguments
Every field and nested object can get its own set of arguments:
```
{
  human(id: "1000") {
    name
    height
  }
}
```

#### Aliases
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

#### Fragments
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

### Subscription
They are a way to push data from the server to the clients that choose to listen to real time messages from the server. A common use case for subscriptions is notifying the client side about particular events, for example the creation of a new object, updated fields and so on.

// TODO: show different ways of adding the query: HOC or Component


## Start to create a server using GraphQL
// TODO: What is GraphCool. There are other tools like Prisma

`npm install -g graphcool`

# Create a local service definition in a new directory called `server`
graphcool init graphcool-post-server

cd graphcool-post-server

We edit the types.graphql
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

Let's deploy our app using `graphcool deploy`.


## GraphQL Clients
There are two main clients in the market: [Apollo](https://www.apollographql.com/docs/react/) and [Relay](https://facebook.github.io/relay/docs/en/introduction-to-relay.html).

### Do we even need a client?
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

### Apollo Client Developer Tools
https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm

1. A built-in GraphiQL console that allows you to make queries against your GraphQL server using your app's network interface directly (no configuration necessary).

2. A query watcher that shows you which queries are being watched by the current page, when those queries are loading, and what variables those queries are using.

3. A mutation inspector that displays the mutations made to you apollo-client app data.

4. A cache inspector that displays your client-side Redux store in an Apollo-Client-friendly way. You can explore the state of the store through a tree-like interface, and search through the store for specific field keys and values.

## Develop

Route:

React.lazy() and Suspense
https://reactjs.org/docs/code-splitting.html


## Other resources
GraphQL integration: https://www.onegraph.com/
O'Reilly: http://shop.oreilly.com/product/0636920137269.do

// TODO: add suspense

## Bibliography
https://onlineornot.com/blog/apollo-vs-relay-which-graphql-client-to-use-2019
