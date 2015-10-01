import React from 'react';
import ReactJsonSchema from '../lib/ReactJsonSchema';
import ContactForm from './components/ContactForm';
import StringField from './components/StringField';

const schema = {
  'component': 'ContactForm',
  'title': 'Tell us a little about yourself...',
  'children': [
    {
      'component': 'StringField',
      'label': 'What\'s your name',
      'help': 'It\'s okay, don\'t be shy :)'
    }
  ]
};

const componentMap = {
  'ContactForm': ContactForm,
  'StringField': StringField
};

const contactForm = new ReactJsonSchema();
contactForm.setComponentMap(componentMap);

React.render(contactForm.parseSchema(schema), document.getElementById('json-react-schema'));
