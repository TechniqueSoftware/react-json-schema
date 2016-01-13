# react-json-schema

`npm install react-json-schema`

This library constructs React elements from JSON by mapping JSON definitions to React components that you expose.

JSX is not a dependency for react-json-schema.

For a quick reference, you can jump to the [full example](#putting-it-all-together).

For 0.3.0+, you must use React 0.14.0+. You may use 0.2.0 for older versions.

### Documentation

#### Schema

The primary resource needed is a defined schema in JSON or a JavaScript object literal. It's recommended that schema attributes mainly define React component props. The parser explicitly handles the following attributes:
- **component**: _MUST_ exist and be defined by a string or React component (must be a string if describing a native HTML tag)
- **children**: _MAY_ exist to define sub-components
- **text**: _MAY_ exist to as a string to define inner HTML text (overrides children)

Example JSON schema (ES6)
```js
const schema = {
  "component": "ContactForm",
  "title": "Tell us a little about yourself...",
  "children": [
    {
      "component": "StringField",
      "label": "What's your name?"
    },
    {
      "component": "a",
      "href": "#faq",
      "text": "I'm not sure why I'm filling this out"
    }
  ]
}
```

Example JS literal (ES6)
```js
const schema = {
  "component": ContactForm,
  "title": "Tell us a little about yourself...",
  "children": [
    {
      "component": StringField,
      "label": "What's your name?"
    },
    {
      "component": "a",
      "href": "#faq",
      "text": "I'm not sure why I'm filling this out"
    }
  ]
}
```

##### Dynamic Children and Keys

When arrays of components exist (like children), react-json-schema will resolve a key for the element based on the array index, which follows the rules for [dynamic children](https://facebook.github.io/react/docs/multiple-components.html#dynamic-children). Custom keys cannot be defined at this time.

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

##### Rendering

Also note react-json-schema does not perform any rendering, so the method in which you want to render is up to you. For example, you can use ReactDOMServer.render, ReactDOM.renderToString, etc. if you'd like.

#### Putting it All Together

```js
import ReactDOM from 'react-dom';
import ReactJsonSchema from 'react-json-schema';

import FormStore from './stores/FormStore';
import ContactForm from './components/ContactForm';
import StringField from './components/StringField';

// For this example, let's pretend I already have data and am ignorant of actions
const schema = FormStore.getFormSchema();
const componentMap = { ContactForm, StringField }

const contactForm = new ReactJsonSchema();
contactForm.setComponentMap(componentMap);

ReactDOM.render(contactForm.parseSchema(schema),
  document.getElementById('contact-form'));
```

### Try the Demo

To run the demo
* `npm install`
* `npm run demo`
* The app will be served at http://localhost:8080

### Contribution and Code of Conduct

Please use a linter that recognizes eslint rules
* `npm install`
* `npm test` (Jasmine's test report will output in /spec/index.html)
* `npm run build`

### Roadmap

* Support custom keys for children
