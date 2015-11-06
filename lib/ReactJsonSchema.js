import { createElement } from 'react';
import ReactDOM from '../node_modules/react/lib/ReactDOM';
import { isFunction, isArray, forEach, omit, clone, has, isObject, isString } from 'lodash';

let _componentMap = null;

export default class ReactJsonSchema {

  constructor() {
    console.log(ReactDOM);
  }

  parseSchema(schema) {
    let element = null;
    let elements = null;
    if (isArray(schema)) {
      elements = this.parseSubSchemas(schema);
    } else {
      element = this.createComponent(schema);
    }
    return element || elements;
  }

  parseSubSchemas(subSchemas) {
    const Components = [];
    forEach(subSchemas, (subSchema, index) => {
      subSchema.key = index;
      Components.push(this.parseSchema(subSchema));
    });
    return Components;
  }

  createComponent(schema) {
    let props = clone(schema);
    props = omit(props, ['component', 'children']);
    const Component = this.resolveComponent(schema);
    const Children = props.text || this.resolveComponentChildren(schema);
    return createElement(Component, props, Children);
  }

  resolveComponent(schema) {
    let Component = null;
    if (has(schema, 'component')) {
      if (isObject(schema.component)) {
        Component = schema.component;
      } else if (_componentMap && _componentMap[schema.component]) {
        Component = _componentMap[schema.component];
      } else if (has(ReactDOM, schema.component)) {
        Component = schema.component;
      }
    }  else {
      throw new Error('ReactJsonSchema could not resolve a component due to a missing component attribute in the schema.');
    }
    return Component;
  }

  resolveComponentChildren(schema) {
    return (has(schema, 'children')) ?
      this.parseSchema(schema.children) : [];
  }

  getComponentMap() {
    return _componentMap;
  }

  setComponentMap(componentMap) {
    _componentMap = componentMap;
  }
}
