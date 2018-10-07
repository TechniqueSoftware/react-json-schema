import { createElement } from 'react';
import DOM from 'react-dom-factories';

const componentMapCollection = new WeakMap();
const handlerMapCollection = new WeakMap();

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
      index += 1;
    });
    return Components;
  }

  createComponent(schema) {
    // eslint-disable-next-line no-unused-vars
    const { component, children, text, ...rest } = schema;
    const Component = this.resolveComponent(schema);
    const Children = typeof text !== 'undefined' ? text : this.resolveComponentChildren(schema);
    this.resolveHandlers(rest);
    return createElement(Component, rest, Children);
  }

  resolveHandlers(_schema) {
    const schema = _schema;
    const handlerMap = this.getHandlerMap();
    const handlers = [
      'onCopy', 'onCut', 'onPaste', 'onCompositionEnd', 'onCompositionStart', 'onCompositionUpdate', 'onKeyDown', 'onKeyPress', 'onKeyUp', 'onFocus', 'onBlur', 'onChange', 'onInput', 'onInvalid', 'onSubmit', 'onClick', 'onContextMenu', 'onDoubleClick', 'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit',
      'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onMouseDown', 'onMouseEnter', 'onMouseLeave',
      'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp', 'onPointerDown', 'onPointerMove', 'onPointerUp', 'onPointerCancel', 'onGotPointerCapture',
      'onLostPointerCapture', 'onPointerEnter', 'onPointerLeave', 'onPointerOver', 'onPointerOut', 'onSelect', 'onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart', 'onScroll', 'onWheel', 'onAbort', 'onCanPlay', 'onCanPlayThrough', 'onDurationChange', 'onEmptied', 'onEncrypted',
      'onEnded', 'onError', 'onLoadedData', 'onLoadedMetadata', 'onLoadStart', 'onPause', 'onPlay',
      'onPlaying', 'onProgress', 'onRateChange', 'onSeeked', 'onSeeking', 'onStalled', 'onSuspend',
      'onTimeUpdate', 'onVolumeChange', 'onWaiting', 'onLoad', 'onError', 'onAnimationStart', 'onAnimationEnd', 'onAnimationIteration', 'onTransitionEnd', 'onToggle'
    ].concat(schema['@handlers'] || []);
    const keys = Object.keys(schema).filter(prop => handlers.indexOf(prop) !== -1);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (typeof schema[key] === 'string') {
        schema[key] = handlerMap[schema[key]];
      }
    }
    if (schema['@handlers']) delete schema['@handlers'];
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

  getHandlerMap() {
    return handlerMapCollection.get(this);
  }
  setHandlerMap(handlerMap) {
    handlerMapCollection.set(this, handlerMap);
  }
}
