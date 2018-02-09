/* global jasmine, beforeEach, describe, it, expect, fail, spyOn */
/* eslint max-len: 0 */

import React from 'react';
import ReactJsonSchema from '../lib/ReactJsonSchema';

let reactJsonSchema;
let schema;

export default describe('ReactJsonSchema', () => {
  class  Tester extends React.Component{ // eslint-disable-line
    render() {
      React.createElement('h1', null, 'Tester!!!!');
    }
  };

  beforeEach(() => {
    reactJsonSchema = new ReactJsonSchema();
    /* eslint-disable */
    schema = {
      "component": Tester,
      "someProp": "I'm a tester"
    };
    /* eslint-enable */
  });
  describe('when parsing schema', () => {
    it('should allow children to have a null value', () => {
      const component = reactJsonSchema.parseSchema({ component: 'input', children: null, value: 'test' });
      expect(React.isValidElement(<component />)).toBe(true);
    });

    it('should return an array of React elements when schema\'s root type is of type array.', () => {
      const actual = reactJsonSchema.parseSchema([schema]);
      expect(Array.isArray(actual)).toBe(true);
      const component = actual[0];
      expect(React.isValidElement(<component />)).toBe(true);
    });
    it('should return a root React element when the schema\'s root type is of type object.', () => {
      const actual = reactJsonSchema.parseSchema(schema);
      expect(actual === Object(actual)).toBe(true);
    });
  });
  describe('when parsing sub-schemas', () => {
    it('should return an empty array when no schemas are passed as an argument.', () => {
      const actual = reactJsonSchema.parseSubSchemas();
      expect(Array.isArray(actual)).toBe(true);
    });
    it('should return an array of React elements when valid schemas are passed as an argument.', () => {
      const subSchemas = [schema, schema];
      const actual = reactJsonSchema.parseSubSchemas(subSchemas);
      expect(!!actual.length).toBe(true);
      expect(actual[0] === Object(actual[0])).toBe(true);
    });
    it('should construct sub-schema React elements by parsing each sub-schema.', () => {
      const subSchemas = [schema, schema];
      spyOn(reactJsonSchema, 'parseSchema');
      reactJsonSchema.parseSubSchemas(subSchemas);
      expect(reactJsonSchema.parseSchema).toHaveBeenCalled();
    });
    it('should consume a key defined in the schema\'s keys for the current sub-schema based on the current sub-schema\'s index to meet React\'s key expectation of multiple React elements.', () => {
      const schemaClone = Object.assign({}, schema);
      const subSchemas = [schemaClone, schemaClone];
      for (const subSchema of subSchemas) { subSchema.key = Math.random(); }
      spyOn(reactJsonSchema, 'parseSchema');
      reactJsonSchema.parseSubSchemas(subSchemas);
      expect(reactJsonSchema.parseSchema).toHaveBeenCalledWith(subSchemas[0]);
      expect(reactJsonSchema.parseSchema).toHaveBeenCalledWith(subSchemas[1]);
    });
    it('should assign a key to the current sub-schema based on the current sub-schema\'s index to meet React\'s key expectation of multiple React elements.', () => {
      spyOn(reactJsonSchema, 'parseSchema');
      const schemaClone = Object.assign({}, schema);
      reactJsonSchema.parseSubSchemas([schemaClone]);
      schemaClone.key = 0;
      expect(reactJsonSchema.parseSchema).toHaveBeenCalledWith(schemaClone);
    });
  });
  describe('when creating components', () => {
    it('should throw an error when no schema is passed as an argument.', () => {
      spyOn(reactJsonSchema, 'resolveComponent');
      spyOn(reactJsonSchema, 'resolveComponentChildren');
      reactJsonSchema.resolveComponent.and.returnValue(null);
      reactJsonSchema.resolveComponentChildren.and.returnValue(null);
      expect(reactJsonSchema.createComponent).toThrowError();
    });
    it('should create a React element.', () => {
      const actual = reactJsonSchema.createComponent(schema);
      expect(React.isValidElement(<actual />)).toBe(true);
    });
    it('should resolve and pass props (schema key value pair not described by component or children) and child elements to React\'s create element functionality.', () => {
      const largeSchema = Object.assign({}, schema);
      largeSchema.children = [schema];
      spyOn(React, 'createElement');
      reactJsonSchema.createComponent(largeSchema);
      expect(React.createElement).toHaveBeenCalledWith(jasmine.any(Function), { someProp: schema.someProp }, jasmine.any(Array));
    });
  });
  describe('when resolving components (evaluating schema for mapping requirements)', () => {
    it('should throw an error when a schema element does not have a component attribute.', () => {
      expect(reactJsonSchema.resolveComponent).toThrowError();
    });
    it('should resolve components defined as strings against a component map.', () => {
      const stringSchema = { component: 'Tester' };
      reactJsonSchema.setComponentMap({ Tester });
      const actual = reactJsonSchema.resolveComponent(stringSchema);
      expect(React.isValidElement(<actual />)).toBe(true);
    });
    it('should resolve components defined as components without a component map.', () => {
      reactJsonSchema.setComponentMap({}); // a little unecessary, but to paint the picture
      const actual = reactJsonSchema.resolveComponent(schema);
      expect(React.isValidElement(<actual />)).toBe(true);
    });
    it('should resolve native HTML tags.', () => {
      spyOn(React, 'createElement');
      const stringSchema = { component: 'h1' };
      reactJsonSchema.parseSchema(stringSchema);
      expect(React.createElement).toHaveBeenCalledWith(stringSchema.component, jasmine.any(Object), undefined);
    });
  });
  describe('when resolving component children', () => {
    it('should resolve text before resolving child components.', () => {
      spyOn(React, 'createElement');
      spyOn(reactJsonSchema, 'resolveComponentChildren');
      const stringSchema = { component: 'h1', text: 'Hello World' };
      reactJsonSchema.parseSchema(stringSchema);
      expect(React.createElement).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Object), stringSchema.text);
      expect(reactJsonSchema.resolveComponentChildren).not.toHaveBeenCalled();
    });
    it('should return undefined if no child components are present.', () => {
      const actual = reactJsonSchema.resolveComponentChildren(schema);
      expect(typeof actual === 'undefined').toBe(true);
    });
    it('should return an array with child components if the children attribute is defined by valid sub-schemas.', () => {
      const largeSchema = Object.assign({}, schema);
      largeSchema.children = [schema];
      const actual = reactJsonSchema.resolveComponentChildren(largeSchema);
      expect(Array.isArray(actual)).toBe(true);
      expect(!!actual.length).toBe(true);
    });
  });
  describe('when multiple instances of ReactJsonSchema are created with different componentMaps', () => {
    it('getComponentMap() should return the appropriate value for each instance', () => {
      const reactJsonSchema1 = new ReactJsonSchema();
      const componentMap1 = { component1: Tester };
      reactJsonSchema1.setComponentMap(componentMap1);
      const reactJsonSchema2 = new ReactJsonSchema();
      const componentMap2 = { component2: Tester };
      reactJsonSchema2.setComponentMap(componentMap2);
      expect(reactJsonSchema1.getComponentMap()).toEqual(componentMap1);
      expect(reactJsonSchema2.getComponentMap()).toEqual(componentMap2);
    });
  });
});
