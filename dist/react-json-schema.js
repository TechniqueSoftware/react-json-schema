'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

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
      if (Object.prototype.toString.call(schema) === '[object Array]') {
        elements = this.parseSubSchemas(schema);
      } else {
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
      var props = _extends({}, schema);
      delete props.component;
      delete props.children;
      delete props.text;

      var Component = this.resolveComponent(schema);
      var Children = typeof schema.text !== 'undefined' ? schema.text : this.resolveComponentChildren(schema);
      return (0, _react.createElement)(Component, props, Children);
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
      return schema.hasOwnProperty('children') ? this.parseSchema(schema.children) : [];
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
