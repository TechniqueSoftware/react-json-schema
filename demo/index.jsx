import React from 'react';
import ContactForm from './components/ContactForm';
import StringField from './components/StringField';
import CheckboxField from './components/CheckboxField';

// If a package dependency: import ReactJsonSchema from 'react-json-schema';
import ReactJsonSchema from '../dist/react-json-schema';

const schema = {
  'component': 'ContactForm',
  'title': 'Tell us a little about yourself, we\'d appreciate it',
  'children': [
    {
      'component': 'StringField',
      'label': 'What\'s your name',
      'help': 'It\'s okay, don\'t be shy :)'
    },
    {
      'component': 'CheckboxField',
      'checkboxes': [
        {
          'label': 'I\'m already checked!',
          'defaultChecked': true
        },
        {
          'label': 'Here\'s another'
        }
      ]
    }
  ]
};

const componentMap = { ContactForm, StringField, CheckboxField };
const contactForm = new ReactJsonSchema();
contactForm.setComponentMap(componentMap);

React.render(contactForm.parseSchema(schema), document.getElementById('json-react-schema'));
