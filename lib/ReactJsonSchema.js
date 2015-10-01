import React from 'react';
import _ from 'lodash';

let _componentMap = null;

export default class ReactJsonSchema {

  parseSchema(schema) {
    let element = null;
    let elements = null;
    if (_.isArray(schema)) {
      elements = this.parseSubSchemas(schema);
    } else if (_.has(schema, 'component')) {
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
    if (_.isObject(schema.component)) {
      Component = schema.component;
    } else if (_.isString(schema.component)) {
      Component = _componentMap[schema.component];
    }
    return Component;
  }

  resolveComponentChildren(schema) {
    return (_.has(schema, 'children')) ?
      this.parseSchema(schema.children) : null;
  }

  getComponentMap() {
    return _componentMap;
  }

  setComponentMap(componentMap) {
    _componentMap = componentMap;
  }
}
