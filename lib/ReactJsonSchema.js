import React from 'react';
import _ from 'lodash';

let _componentMap = null;

export default class ReactJsonSchema {

  parseSchema(schema) {
    let element = null;
    let elements = null;
    if (_.isArray(schema)) {
      elements = this.parseSubSchemas(schema);
    } else {
      element = this.createComponent(schema);
    }
    return element || elements;
  }

  parseSubSchemas(subSchemas) {
    const Components = [];
    _.forEach(subSchemas, (subSchema, index) => {
      subSchema.key = index;
      Components.push(this.parseSchema(subSchema));
    });
    return Components;
  }

  createComponent(schema) {
    let props = _.clone(schema);
    props = _.omit(props, ['component', 'children']);
    const Component = this.resolveComponent(schema);
    const Children = this.resolveComponentChildren(schema);
    return React.createElement(Component, props, Children);
  }

  resolveComponent(schema) {
    let Component = null;
    if (_.has(schema, 'component')) {
      if (_.isObject(schema.component)) {
        Component = schema.component;
      } else if (_.isString(schema.component)) {
        Component = _componentMap[schema.component];
      }
    } else {
      throw new Error('ReactJsonSchema could not resolve a component due to a missing component attribute in the schema.');
    }
    return Component;
  }

  resolveComponentChildren(schema) {
    return (_.has(schema, 'children')) ?
      this.parseSchema(schema.children) : [];
  }

  getComponentMap() {
    return _componentMap;
  }

  setComponentMap(componentMap) {
    _componentMap = componentMap;
  }
}
