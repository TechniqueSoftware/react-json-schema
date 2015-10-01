import React from 'react';
import _ from 'lodash';

let _componentMap = null;

export default class ReactJsonSchema {

  parseSchema(schema) {
    if (_.isArray(schema)) {
      const Components = [];
      _.forEach(schema, (subSchema, index) => {
        subSchema.key = index;
        Components.push(this.parseSchema(subSchema));
      });
      return Components;
    } else {
      if (schema.hasOwnProperty('component')) {
        let props = _.clone(schema);
        props = _.omit(props, ['component', 'children']);
        const Component = _componentMap[schema.component];
        const Children = (schema.hasOwnProperty('children') && _.isArray(schema.children) && schema.children.length) ?
          this.parseSchema(schema.children) : null;
        return React.createElement(Component, props, Children);
      }
      return null;
    }
  }

  getComponentMap() {
    return _componentMap;
  }

  setComponentMap(componentMap) {
    _componentMap = componentMap;
  }
}
