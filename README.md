# react-json-schema

This library builds React elements from JSON by mapping JSON definitions to React components that you expose. The interest behind making this library is to allow non-programmers whip up a view using JSON, which can be stored and retrieved in a database. Use it as you'd like. (JSX not required)

### Documentation

The first thing you'll need to do is define your schema in JSON (or a JavaScript object literal). When doing so, there are two things to note:
- A **component** key _must_ exist and be defined by a string or React Component
- A **children** key _may_ exist to define sub-components

Next, we have to make sure that react-json-schema can create elements from component definitions. If a schema's **component** is defined by an string, you will need to expose the components included in the schema to react-json-schema. This can be done by calling `setComponentMap` with an object that has keys that match the strings in your schema, to the components are to be resolved by these strings.

Finally, you'll need to call `parseSchema` to create elements from your schema. Now you have React elements at your disposal!

Example (taken from /demo/index.jsx)
```js
const schema = {
  "component": "ContactForm",
  "title": "Tell us a little about yourself...",
  "children": [
    {
      "component": "StringField",
      "label": "What's your name",
      "help": "It's okay, don't be shy :)"
    }
  ]
}

/* es6 object literal shorthand */
const componentMap = { ContactForm, StringField }
const contactForm = new ReactJsonSchema();
contactForm.setComponentMap(componentMap);

React.render(contactForm.parseSchema(schema),
  document.getElementById('json-react-schema'));
```

### Try the Demo

To run the demo
* have webpack and webpack-dev-server globally installed
* `npm install`
* `npm run demo`
* The app will be served at http://localhost:8080

### Contribution and Code of Conduct

Please use a linter that recognizes eslint rules

* have webpack, webpack-dev-server and jasmine globally installed
* `npm install`
* `npm test` (Jasmine's test report will output in /spec/index.html)
* `npm run build`

### Roadmap

* Support custom keys for children
* Support native html tags as components, with the option to add custom tag definitions
* Drop lodash dependency?
