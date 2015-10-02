# react-json-schema

## !! Still in Development !!

This library builds a React node from JSON by mapping JSON definitions to React components you expose. The interest behind making this library is to allow non-programmers whip up a view using JSON, which can be easily be stored and retrieved in a database. Use it as you'd like. (JSX not required)

### Documentation

1. Define your schema in JSON
1. If your JSON is a string (from a request, etc.), map your components to expose them to a react-json-schema instance
1. Parse the schema with react-json-schema to get a root React node

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

### Contribution and Code of Conduct

Please use a linter that recognizes eslint rules

To run the demo
* have webpack and webpack-dev-server globally installed
* `npm install`
* `npm start`
* The app will be served at http://localhost:8080

To run tests
* have webpack, webpack-dev-server and jasmine globally installed
* `npm install`
* `npm test`
* Jasmine's test report will output in /spec/index.html

### Roadmap

* Support custom keys for children
* Support native html tags as components, with the option to customize
