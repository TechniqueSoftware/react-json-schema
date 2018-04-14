(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom-factories"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom-factories"], factory);
	else if(typeof exports === 'object')
		exports["ReactJsonSchema"] = factory(require("react"), require("react-dom-factories"));
	else
		root["ReactJsonSchema"] = factory(root["React"], root["DOM"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _reactDomFactories = __webpack_require__(2);

var _reactDomFactories2 = _interopRequireDefault(_reactDomFactories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        index += 1;
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
      if (Object.prototype.hasOwnProperty.call(schema, 'component')) {
        if (schema.component === Object(schema.component)) {
          Component = schema.component;
        } else if (componentMap && componentMap[schema.component]) {
          Component = componentMap[schema.component];
        } else if (Object.prototype.hasOwnProperty.call(_reactDomFactories2.default, schema.component)) {
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
      return Object.prototype.hasOwnProperty.call(schema, 'children') ? this.parseSchema(schema.children) : undefined;
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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ })
/******/ ]);
});