/* global describe, it, expect */

import React from 'react';
import ReactJsonSchema from '../lib/ReactJsonSchema';

export default describe('ReactJsonSchema', () => {
  describe('when parsing schema', () => {
    const reactJsonSchema = new ReactJsonSchema();
    const Tester = React.createClass({
      render: () => {
        return React.createElement('h1', null, 'Tester!!!!');
      }
    });
    const schema = {
      'component': Tester,
      'someProp': 'I\'m a tester'
    };
    it('should ignore schema that does not contain a component.', () => {
      const actual = reactJsonSchema.parseSchema({});
      expect(actual === null).toBe(true);
    });
    describe('when the schema\'s root type is of type array', () => {
      const arraySchema = [schema];
      it('should return an array of React element(s).', () => {
        const actual = reactJsonSchema.parseSchema(arraySchema);
        expect(!!actual.length).toBe(true);
        expect(typeof actual[0] === 'object').toBe(true);
      });
    });
    describe('when the schema\'s root type is of type object', () => {
      it('should return a root React element.', () => {
        const actual = reactJsonSchema.parseSchema(schema);
        expect(typeof actual === 'object').toBe(true);
      });
    });
  });
});
