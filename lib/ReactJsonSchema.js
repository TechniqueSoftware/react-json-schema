import { createElement } from 'react';
import DOM from 'react-dom-factories';

const componentMapCollection = new WeakMap();

export default class ReactJsonSchema {
  parseSchema(schema) {
    let element = null;
    let elements = null;
    if (Array.isArray(schema)) {
      elements = this.parseSubSchemas(schema);
    } else if (schema) {
      element = this.createComponent(schema);
    }
    return element || elements;
  }

  parseSubSchemas(subSchemas = []) {
    const Components = [];
    let index = 0;
    Object.keys(subSchemas).forEach((key) => {
      const subSchema = subSchemas[key];
      subSchema.key = typeof subSchema.key !== 'undefined' ? subSchema.key : index;
      Components.push(this.parseSchema(subSchema));
      index += index;
    });
    return Components;
  }

  createComponent(schema) {
    // eslint-disable-next-line no-unused-vars
    const { component, children, text, ...rest } = schema;
    const Component = this.resolveComponent(schema);
    const Children = typeof text !== 'undefined' ? text : this.resolveComponentChildren(schema);
    return createElement(Component, rest, Children);
  }

  resolveComponent(schema) {
    const componentMap = this.getComponentMap();
    let Component = null;
    if (Object.prototype.hasOwnProperty.call(schema, 'component')) {
      if (schema.component === Object(schema.component)) {
        Component = schema.component;
      } else if (componentMap && componentMap[schema.component]) {
        Component = componentMap[schema.component];
      } else if (Object.prototype.hasOwnProperty.call(DOM, schema.component)) {
        Component = schema.component;
      }
    } else {
      throw new Error(`ReactJsonSchema could not resolve a component due to a missing component 
          attribute in the schema.`);
    }
    return Component;
  }

  resolveComponentChildren(schema) {
    return (Object.prototype.hasOwnProperty.call(schema, 'children')) ?
      this.parseSchema(schema.children) : undefined;
  }

  getComponentMap() {
    return componentMapCollection.get(this);
  }

  setComponentMap(componentMap) {
    componentMapCollection.set(this, componentMap);
  }
}
