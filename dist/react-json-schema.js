'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var componentMapCollection = new WeakMap();

var ReactJsonSchema = function () {
  function ReactJsonSchema() {
    _classCallCheck(this, ReactJsonSchema);
  }

  _createClass(ReactJsonSchema, [{
    key: 'parseSchema',
    value: function parseSchema(schema) {
      var element = null;
      var elements = null;
      if (Array.isArray(schema)) {
        elements = this.parseSubSchemas(schema);
      } else if (schema) {
        element = this.createComponent(schema);
      }
      return element || elements;
    }
  }, {
    key: 'parseSubSchemas',
    value: function parseSubSchemas() {
      var _this = this;

      var subSchemas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var Components = [];
      var index = 0;
      Object.keys(subSchemas).forEach(function (key) {
        var subSchema = subSchemas[key];
        subSchema.key = typeof subSchema.key !== 'undefined' ? subSchema.key : index;
        Components.push(_this.parseSchema(subSchema));
        index++;
      });
      return Components;
    }
  }, {
    key: 'createComponent',
    value: function createComponent(schema) {
      // eslint-disable-next-line no-unused-vars
      var component = schema.component,
          children = schema.children,
          text = schema.text,
          rest = _objectWithoutProperties(schema, ['component', 'children', 'text']);

      var Component = this.resolveComponent(schema);
      var Children = typeof text !== 'undefined' ? text : this.resolveComponentChildren(schema);
      return (0, _react.createElement)(Component, rest, Children);
    }
  }, {
    key: 'resolveComponent',
    value: function resolveComponent(schema) {
      var componentMap = this.getComponentMap();
      var Component = null;
      if (schema.hasOwnProperty('component')) {
        if (schema.component === Object(schema.component)) {
          Component = schema.component;
        } else if (componentMap && componentMap[schema.component]) {
          Component = componentMap[schema.component];
        } else if (_react.DOM.hasOwnProperty(schema.component)) {
          Component = schema.component;
        }
      } else {
        throw new Error('ReactJsonSchema could not resolve a component due to a missing component \n          attribute in the schema.');
      }
      return Component;
    }
  }, {
    key: 'resolveComponentChildren',
    value: function resolveComponentChildren(schema) {
      return schema.hasOwnProperty('children') ? this.parseSchema(schema.children) : undefined;
    }
  }, {
    key: 'getComponentMap',
    value: function getComponentMap() {
      return componentMapCollection.get(this);
    }
  }, {
    key: 'setComponentMap',
    value: function setComponentMap(componentMap) {
      componentMapCollection.set(this, componentMap);
    }
  }]);

  return ReactJsonSchema;
}();

exports.default = ReactJsonSchema;
