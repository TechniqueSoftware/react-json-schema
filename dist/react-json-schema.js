'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _componentMap = null;

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
      } else {
        element = this.createComponent(schema);
      }
      return element || elements;
    }
  }, {
    key: 'parseSubSchemas',
    value: function parseSubSchemas() {
      var subSchemas = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      var Components = [];
      var index = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = subSchemas[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var subSchema = _step.value;

          subSchema.key = typeof subSchema.key !== 'undefined' ? subSchema.key : index;
          Components.push(this.parseSchema(subSchema));
          index++;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return Components;
    }
  }, {
    key: 'createComponent',
    value: function createComponent(schema) {
      var component = schema.component;
      var children = schema.children;
      var text = schema.text;

      var rest = _objectWithoutProperties(schema, ['component', 'children', 'text']);

      var Component = this.resolveComponent(schema);
      var Children = typeof text !== 'undefined' ? text : this.resolveComponentChildren(schema);
      return (0, _react.createElement)(Component, rest, Children);
    }
  }, {
    key: 'resolveComponent',
    value: function resolveComponent(schema) {
      var Component = null;
      if (schema.hasOwnProperty('component')) {
        if (schema.component === Object(schema.component)) {
          Component = schema.component;
        } else if (_componentMap && _componentMap[schema.component]) {
          Component = _componentMap[schema.component];
        } else if (_react.DOM.hasOwnProperty(schema.component)) {
          Component = schema.component;
        }
      } else {
        throw new Error('ReactJsonSchema could not resolve a component due to a missing component attribute in the schema.');
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
      return _componentMap;
    }
  }, {
    key: 'setComponentMap',
    value: function setComponentMap(componentMap) {
      _componentMap = componentMap;
    }
  }]);

  return ReactJsonSchema;
}();

exports.default = ReactJsonSchema;
