# react-json-schema

`npm install react-json-schema`

Construct React elements from JSON by mapping JSON definitions to React components. Use react-json-schema for data-driven layouts, or as an abstraction layer for React components and props.

Render anywhere (as long as it's DOM)! Since react-json-schema does not perform any rendering, the method in which you want to render is up to you. For example, you can use ReactDOMServer.render, ReactDOM.renderToString, etc. if you'd like. This also means JSX is not a dependency for react-json-schema.

[Quick Documentation and Examples](http://techniquesoftware.github.io/react-json-schema/)

### Full Documentation

* [Schema](#schema)
* [Dynamic Children and Keys](#dynamic-children-and-keys)
* [Component Mapping](#component-mapping)
* [Complete Example](#complete-example)

#### Schema

The primary resource needed is a defined schema in JSON or a JavaScript object literal. It's recommended that schema attributes mainly define React component props. The parser explicitly handles the following attributes:
- **component**: _MUST_ exist and be defined by a string or React component (must be a string if describing a native HTML tag)
- **children**: _MAY_ exist to define sub-components
- **text**: _MAY_ exist to as a string to define inner HTML text (overrides children)
- **key**: _MAY_ exist to define a key for dynamic children

Example JSON schema
```js
const schema = {
  "component": "CommentList",
  "children": [
    {
      "component": "Comment",
      "author": "Pete Hunt",
      "children": "This is one comment"
    },
    {
      "component": "Comment",
      "author": "Jordan Walke",
      "children": "This is *another* comment"
    },
    {
      "component": "a",
      "href": "#help",
      "text": "I need help"
    }
  ]
};
```

Example JS literal
```js
...
  {
    "component": Comment,
    "author": "Pete Hunt",
    "children": "This is one comment"
  },
...
```

##### Dynamic Children and Keys

When arrays of components exist (like children), react-json-schema will resolve a key for the element, which follows the rules for [dynamic children](https://facebook.github.io/react/docs/multiple-components.html#dynamic-children). It will either use a custom key if defined, or resolve a numeric key based on the array index.

Example of defining child keys
```js
...
  {
    "component": "Comment",
    "key": "0ab19f8e", // defined key
    "author": "Pete Hunt",
    "children": "This is one comment"
  },
...
```

#### Component Mapping

React components need to be exposed to the react-json-schema so that the parser can create React elements. If the schema contains object literals with component references, the schema is exposing the React components and no additional configuration is needed. If the schema does not contain references to components, the components can be exposed via `setComponentMap`.

Example for exposing non-exposed components (ES6)
```js
/* es6 object literal shorthand: { ContactForm } == { ContactForm: ContactForm } */
contactForm.setComponentMap({ ContactForm, StringField });
```

#### Parsing

Use `parseSchema` to render React elements. It returns the root node. Note that if your schema's root is an array, you'll have to wrap the schema in an element.

Example (ES6)
```js
ReactDOM.render(contactForm.parseSchema(schema),
  document.getElementById('contact-form'));
```

#### Complete Example

```js
import ReactDOM from 'react-dom';
import ReactJsonSchema from 'react-json-schema';

import FormStore from 'FormStore';
import CommentList from 'CommentList';
import Comment from 'Comment';

// For this example, let's pretend I already have data and am ignorant of actions
const schema = FormStore.getFormSchema();
const view = new ReactJsonSchema();

view.setComponentMap({ CommentList, Comment });

ReactDOM.render(view.parseSchema(schema),
  document.getElementById('content'));
```

### Demo an Example Codebase

To run the demo
* `cd demo && npm install`
* `npm start`
* The app will be served at http://localhost:8080

### Contribution and Code of Conduct

If you'd like to ask a question, raise a concern, or contribute, please follow our [contribution guidelines](CONTRIBUTE.md).

### Alternatives

* [react-jsonschema-form](https://github.com/mozilla-services/react-jsonschema-form): A React component for building Web forms from JSON Schema. This library further abstracts React components, making it easier to build forms. Also, it comes with components. React-json-schema is a lighter alternative that allows the use of any components.

### Roadmap

* Playground on our public site for discoverability
* Possibility of react-native-json-schema
