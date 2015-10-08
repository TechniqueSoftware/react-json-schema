'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _componentMap = null;

var ReactJsonSchema = (function () {
  function ReactJsonSchema() {
    _classCallCheck(this, ReactJsonSchema);
  }

  _createClass(ReactJsonSchema, [{
    key: 'parseSchema',
    value: function parseSchema(schema) {
      var element = null;
      var elements = null;
      if (_lodash2['default'].isArray(schema)) {
        elements = this.parseSubSchemas(schema);
      } else {
        element = this.createComponent(schema);
      }
      return element || elements;
    }
  }, {
    key: 'parseSubSchemas',
    value: function parseSubSchemas(subSchemas) {
      var _this = this;

      var Components = [];
      _lodash2['default'].forEach(subSchemas, function (subSchema, index) {
        subSchema.key = index;
        Components.push(_this.parseSchema(subSchema));
      });
      return Components;
    }
  }, {
    key: 'createComponent',
    value: function createComponent(schema) {
      var props = _lodash2['default'].clone(schema);
      props = _lodash2['default'].omit(props, ['component', 'children']);
      var Component = this.resolveComponent(schema);
      var Children = this.resolveComponentChildren(schema);
      return _react2['default'].createElement(Component, props, Children);
    }
  }, {
    key: 'resolveComponent',
    value: function resolveComponent(schema) {
      var Component = null;
      if (_lodash2['default'].has(schema, 'component')) {
        if (_lodash2['default'].isObject(schema.component)) {
          Component = schema.component;
        } else if (_lodash2['default'].isString(schema.component)) {
          Component = _componentMap[schema.component];
        }
      } else {
        throw new Error('ReactJsonSchema could not resolve a component due to a missing component attribute in the schema.');
      }
      return Component;
    }
  }, {
    key: 'resolveComponentChildren',
    value: function resolveComponentChildren(schema) {
      return _lodash2['default'].has(schema, 'children') ? this.parseSchema(schema.children) : [];
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
})();

exports['default'] = ReactJsonSchema;
module.exports = exports['default'];
