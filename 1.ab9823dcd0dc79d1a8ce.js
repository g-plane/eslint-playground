(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],Array(573).concat([
/* 573 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const has = __webpack_require__(574);

const allRules = {
  'boolean-prop-naming': __webpack_require__(577),
  'button-has-type': __webpack_require__(588),
  'default-props-match-prop-types': __webpack_require__(618),
  'destructuring-assignment': __webpack_require__(619),
  'display-name': __webpack_require__(620),
  'forbid-component-props': __webpack_require__(621),
  'forbid-dom-props': __webpack_require__(622),
  'forbid-elements': __webpack_require__(623),
  'forbid-foreign-prop-types': __webpack_require__(624),
  'forbid-prop-types': __webpack_require__(625),
  'jsx-boolean-value': __webpack_require__(626),
  'jsx-child-element-spacing': __webpack_require__(627),
  'jsx-closing-bracket-location': __webpack_require__(628),
  'jsx-closing-tag-location': __webpack_require__(629),
  'jsx-curly-spacing': __webpack_require__(630),
  'jsx-equals-spacing': __webpack_require__(631),
  'jsx-filename-extension': __webpack_require__(632),
  'jsx-first-prop-new-line': __webpack_require__(633),
  'jsx-handler-names': __webpack_require__(634),
  'jsx-indent': __webpack_require__(635),
  'jsx-indent-props': __webpack_require__(636),
  'jsx-key': __webpack_require__(637),
  'jsx-max-depth': __webpack_require__(639),
  'jsx-max-props-per-line': __webpack_require__(640),
  'jsx-no-bind': __webpack_require__(641),
  'jsx-no-comment-textnodes': __webpack_require__(645),
  'jsx-no-duplicate-props': __webpack_require__(646),
  'jsx-no-literals': __webpack_require__(647),
  'jsx-no-target-blank': __webpack_require__(648),
  'jsx-one-expression-per-line': __webpack_require__(649),
  'jsx-no-undef': __webpack_require__(650),
  'jsx-curly-brace-presence': __webpack_require__(651),
  'jsx-pascal-case': __webpack_require__(652),
  'jsx-props-no-multi-spaces': __webpack_require__(653),
  'jsx-sort-default-props': __webpack_require__(654),
  'jsx-sort-props': __webpack_require__(655),
  'jsx-space-before-closing': __webpack_require__(656),
  'jsx-tag-spacing': __webpack_require__(658),
  'jsx-uses-react': __webpack_require__(659),
  'jsx-uses-vars': __webpack_require__(660),
  'jsx-wrap-multilines': __webpack_require__(661),
  'no-access-state-in-setstate': __webpack_require__(662),
  'no-array-index-key': __webpack_require__(663),
  'no-children-prop': __webpack_require__(664),
  'no-danger': __webpack_require__(665),
  'no-danger-with-children': __webpack_require__(666),
  'no-deprecated': __webpack_require__(667),
  'no-did-mount-set-state': __webpack_require__(668),
  'no-did-update-set-state': __webpack_require__(670),
  'no-direct-mutation-state': __webpack_require__(671),
  'no-find-dom-node': __webpack_require__(672),
  'no-is-mounted': __webpack_require__(673),
  'no-multi-comp': __webpack_require__(674),
  'no-set-state': __webpack_require__(675),
  'no-string-refs': __webpack_require__(676),
  'no-redundant-should-component-update': __webpack_require__(677),
  'no-render-return-value': __webpack_require__(678),
  'no-this-in-sfc': __webpack_require__(679),
  'no-typos': __webpack_require__(680),
  'no-unescaped-entities': __webpack_require__(684),
  'no-unknown-property': __webpack_require__(685),
  'no-unsafe': __webpack_require__(686),
  'no-unused-prop-types': __webpack_require__(687),
  'no-unused-state': __webpack_require__(688),
  'no-will-update-set-state': __webpack_require__(689),
  'prefer-es6-class': __webpack_require__(690),
  'prefer-stateless-function': __webpack_require__(691),
  'prop-types': __webpack_require__(692),
  'react-in-jsx-scope': __webpack_require__(693),
  'require-default-props': __webpack_require__(694),
  'require-optimization': __webpack_require__(695),
  'require-render-return': __webpack_require__(696),
  'self-closing-comp': __webpack_require__(697),
  'sort-comp': __webpack_require__(698),
  'sort-prop-types': __webpack_require__(724),
  'style-prop-object': __webpack_require__(725),
  'void-dom-elements-no-children': __webpack_require__(726)
};

function filterRules(rules, predicate) {
  const result = {};
  for (const key in rules) {
    if (has(rules, key) && predicate(rules[key])) {
      result[key] = rules[key];
    }
  }
  return result;
}

function configureAsError(rules) {
  const result = {};
  for (const key in rules) {
    if (!has(rules, key)) {
      continue;
    }
    result[`react/${key}`] = 2;
  }
  return result;
}

const activeRules = filterRules(allRules, rule => !rule.meta.deprecated);
const activeRulesConfig = configureAsError(activeRules);

const deprecatedRules = filterRules(allRules, rule => rule.meta.deprecated);

module.exports = {
  deprecatedRules: deprecatedRules,
  rules: allRules,
  configs: {
    recommended: {
      plugins: [
        'react'
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        'react/display-name': 2,
        'react/jsx-key': 2,
        'react/jsx-no-comment-textnodes': 2,
        'react/jsx-no-duplicate-props': 2,
        'react/jsx-no-target-blank': 2,
        'react/jsx-no-undef': 2,
        'react/jsx-uses-react': 2,
        'react/jsx-uses-vars': 2,
        'react/no-children-prop': 2,
        'react/no-danger-with-children': 2,
        'react/no-deprecated': 2,
        'react/no-direct-mutation-state': 2,
        'react/no-find-dom-node': 2,
        'react/no-is-mounted': 2,
        'react/no-render-return-value': 2,
        'react/no-string-refs': 2,
        'react/no-unescaped-entities': 2,
        'react/no-unknown-property': 2,
        'react/no-unsafe': 0,
        'react/prop-types': 2,
        'react/react-in-jsx-scope': 2,
        'react/require-render-return': 2
      }
    },
    all: {
      plugins: [
        'react'
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: activeRulesConfig
    }
  }
};


/***/ }),
/* 574 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(575);

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),
/* 575 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(576);

module.exports = Function.prototype.bind || implementation;


/***/ }),
/* 576 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),
/* 577 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforces consistent naming for boolean props
 * @author Ev Haus
 */


const has = __webpack_require__(574);
const Components = __webpack_require__(578);
const propsUtil = __webpack_require__(584);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      category: 'Stylistic Issues',
      description: 'Enforces consistent naming for boolean props',
      recommended: false,
      url: docsUrl('boolean-prop-naming')
    },

    schema: [{
      additionalProperties: false,
      properties: {
        propTypeNames: {
          items: {
            type: 'string'
          },
          minItems: 1,
          type: 'array',
          uniqueItems: true
        },
        rule: {
          default: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
          minLength: 1,
          type: 'string'
        },
        message: {
          minLength: 1,
          type: 'string'
        }
      },
      type: 'object'
    }]
  },

  create: Components.detect((context, components, utils) => {
    const sourceCode = context.getSourceCode();
    const config = context.options[0] || {};
    const rule = config.rule ? new RegExp(config.rule) : null;
    const propTypeNames = config.propTypeNames || ['bool'];
    const propWrapperFunctions = new Set(context.settings.propWrapperFunctions || []);

    // Remembers all Flowtype object definitions
    const objectTypeAnnotations = new Map();

    /**
     * Returns the prop key to ensure we handle the following cases:
     * propTypes: {
     *   full: React.PropTypes.bool,
     *   short: PropTypes.bool,
     *   direct: bool,
     *   required: PropTypes.bool.isRequired
     * }
     * @param {Object} node The node we're getting the name of
     */
    function getPropKey(node) {
      // Check for `ExperimentalSpreadProperty` (ESLint 3/4) and `SpreadElement` (ESLint 5)
      // so we can skip validation of those fields.
      // Otherwise it will look for `node.value.property` which doesn't exist and breaks ESLint.
      if (node.type === 'ExperimentalSpreadProperty' || node.type === 'SpreadElement') {
        return null;
      }
      if (node.value.property) {
        const name = node.value.property.name;
        if (name === 'isRequired') {
          if (node.value.object && node.value.object.property) {
            return node.value.object.property.name;
          }
          return null;
        }
        return name;
      }
      if (node.value.type === 'Identifier') {
        return node.value.name;
      }
      return null;
    }

    /**
	 * Returns the name of the given node (prop)
	 * @param {Object} node The node we're getting the name of
	 */
    function getPropName(node) {
      // Due to this bug https://github.com/babel/babel-eslint/issues/307
      // we can't get the name of the Flow object key name. So we have
      // to hack around it for now.
      if (node.type === 'ObjectTypeProperty') {
        return sourceCode.getFirstToken(node).value;
      }

      return node.key.name;
    }

    /**
     * Checks and mark props with invalid naming
     * @param {Object} node The component node we're testing
     * @param {Array} proptypes A list of Property object (for each proptype defined)
     */
    function validatePropNaming(node, proptypes) {
      const component = components.get(node) || node;
      const invalidProps = component.invalidProps || [];

      (proptypes || []).forEach(prop => {
        const propKey = getPropKey(prop);
        const flowCheck = (
          prop.type === 'ObjectTypeProperty' &&
          prop.value.type === 'BooleanTypeAnnotation' &&
          rule.test(getPropName(prop)) === false
        );
        const regularCheck = (
          propKey &&
          propTypeNames.indexOf(propKey) >= 0 &&
          rule.test(getPropName(prop)) === false
        );

        if (flowCheck || regularCheck) {
          invalidProps.push(prop);
        }
      });

      components.set(node, {
        invalidProps: invalidProps
      });
    }

    /**
     * Reports invalid prop naming
     * @param {Object} component The component to process
     */
    function reportInvalidNaming(component) {
      component.invalidProps.forEach(propNode => {
        const propName = getPropName(propNode);
        context.report({
          node: propNode,
          message: config.message || 'Prop name ({{ propName }}) doesn\'t match rule ({{ pattern }})',
          data: {
            component: propName,
            propName: propName,
            pattern: config.rule
          }
        });
      });
    }

    function checkPropWrapperArguments(node, args) {
      if (!node || !Array.isArray(args)) {
        return;
      }
      args.filter(arg => arg.type === 'ObjectExpression').forEach(object => validatePropNaming(node, object.properties));
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      ClassProperty: function(node) {
        if (!rule || !propsUtil.isPropTypesDeclaration(node)) {
          return;
        }
        if (node.value && node.value.type === 'CallExpression' && propWrapperFunctions.has(sourceCode.getText(node.value.callee))) {
          checkPropWrapperArguments(node, node.value.arguments);
        }
        if (node.value && node.value.properties) {
          validatePropNaming(node, node.value.properties);
        }
        if (node.typeAnnotation && node.typeAnnotation.typeAnnotation) {
          validatePropNaming(node, node.typeAnnotation.typeAnnotation.properties);
        }
      },

      MemberExpression: function(node) {
        if (!rule || !propsUtil.isPropTypesDeclaration(node)) {
          return;
        }
        const component = utils.getRelatedComponent(node);
        if (!component || !node.parent.right) {
          return;
        }
        const right = node.parent.right;
        if (right.type === 'CallExpression' && propWrapperFunctions.has(sourceCode.getText(right.callee))) {
          checkPropWrapperArguments(component.node, right.arguments);
          return;
        }
        validatePropNaming(component.node, node.parent.right.properties);
      },

      ObjectExpression: function(node) {
        if (!rule) {
          return;
        }

        // Search for the proptypes declaration
        node.properties.forEach(property => {
          if (!propsUtil.isPropTypesDeclaration(property)) {
            return;
          }
          validatePropNaming(node, property.value.properties);
        });
      },

      TypeAlias: function(node) {
        // Cache all ObjectType annotations, we will check them at the end
        if (node.right.type === 'ObjectTypeAnnotation') {
          objectTypeAnnotations.set(node.id.name, node.right);
        }
      },

      'Program:exit': function() {
        if (!rule) {
          return;
        }

        const list = components.list();
        Object.keys(list).forEach(component => {
          // If this is a functional component that uses a global type, check it
          if (
            list[component].node.type === 'FunctionDeclaration' &&
            list[component].node.params &&
            list[component].node.params.length &&
            list[component].node.params[0].typeAnnotation
          ) {
            const typeNode = list[component].node.params[0].typeAnnotation;
            const annotation = typeNode.typeAnnotation;

            let propType;
            if (annotation.type === 'GenericTypeAnnotation') {
              propType = objectTypeAnnotations.get(annotation.id.name);
            } else if (annotation.type === 'ObjectTypeAnnotation') {
              propType = annotation;
            }
            if (propType) {
              validatePropNaming(list[component].node, propType.properties);
            }
          }

          if (!has(list, component) || (list[component].invalidProps || []).length) {
            reportInvalidNaming(list[component]);
          }
        });

        // Reset cache
        objectTypeAnnotations.clear();
      }
    };
  })
};


/***/ }),
/* 578 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Utility class and functions for React components detection
 * @author Yannick Croissant
 */


const has = __webpack_require__(574);
const util = __webpack_require__(27);
const doctrine = __webpack_require__(437);
const variableUtil = __webpack_require__(579);
const pragmaUtil = __webpack_require__(580);
const astUtil = __webpack_require__(581);
const propTypes = __webpack_require__(582);

function getId(node) {
  return node && node.range.join(':');
}

function usedPropTypesAreEquivalent(propA, propB) {
  if (propA.name === propB.name) {
    if (!propA.allNames && !propB.allNames) {
      return true;
    } else if (Array.isArray(propA.allNames) && Array.isArray(propB.allNames) && propA.allNames.join('') === propB.allNames.join('')) {
      return true;
    }
    return false;
  }
  return false;
}

function mergeUsedPropTypes(propsList, newPropsList) {
  const propsToAdd = [];
  newPropsList.forEach(newProp => {
    const newPropisAlreadyInTheList = propsList.some(prop => usedPropTypesAreEquivalent(prop, newProp));
    if (!newPropisAlreadyInTheList) {
      propsToAdd.push(newProp);
    }
  });
  return propsList.concat(propsToAdd);
}

/**
 * Components
 */
class Components {
  constructor() {
    this._list = {};
  }

  /**
   * Add a node to the components list, or update it if it's already in the list
   *
   * @param {ASTNode} node The AST node being added.
   * @param {Number} confidence Confidence in the component detection (0=banned, 1=maybe, 2=yes)
   * @returns {Object} Added component object
   */
  add(node, confidence) {
    const id = getId(node);
    if (this._list[id]) {
      if (confidence === 0 || this._list[id].confidence === 0) {
        this._list[id].confidence = 0;
      } else {
        this._list[id].confidence = Math.max(this._list[id].confidence, confidence);
      }
      return this._list[id];
    }
    this._list[id] = {
      node: node,
      confidence: confidence
    };
    return this._list[id];
  }

  /**
   * Find a component in the list using its node
   *
   * @param {ASTNode} node The AST node being searched.
   * @returns {Object} Component object, undefined if the component is not found or has confidence value of 0.
   */
  get(node) {
    const id = getId(node);
    if (this._list[id] && this._list[id].confidence >= 1) {
      return this._list[id];
    }
    return null;
  }

  /**
   * Update a component in the list
   *
   * @param {ASTNode} node The AST node being updated.
   * @param {Object} props Additional properties to add to the component.
   */
  set(node, props) {
    while (node && !this._list[getId(node)]) {
      node = node.parent;
    }
    if (!node) {
      return;
    }
    const id = getId(node);
    let copyUsedPropTypes;
    if (this._list[id]) {
      // usedPropTypes is an array. _extend replaces existing array with a new one which caused issue #1309.
      // preserving original array so it can be merged later on.
      copyUsedPropTypes = this._list[id].usedPropTypes && this._list[id].usedPropTypes.slice();
    }
    this._list[id] = util._extend(this._list[id], props);
    if (this._list[id] && props.usedPropTypes) {
      this._list[id].usedPropTypes = mergeUsedPropTypes(copyUsedPropTypes || [], props.usedPropTypes);
    }
  }

  /**
   * Return the components list
   * Components for which we are not confident are not returned
   *
   * @returns {Object} Components list
   */
  list() {
    const list = {};
    const usedPropTypes = {};

    // Find props used in components for which we are not confident
    for (const i in this._list) {
      if (!has(this._list, i) || this._list[i].confidence >= 2) {
        continue;
      }
      let component = null;
      let node = null;
      node = this._list[i].node;
      while (!component && node.parent) {
        node = node.parent;
        // Stop moving up if we reach a decorator
        if (node.type === 'Decorator') {
          break;
        }
        component = this.get(node);
      }
      if (component) {
        const newUsedProps = (this._list[i].usedPropTypes || []).filter(propType => !propType.node || propType.node.kind !== 'init');

        const componentId = getId(component.node);
        usedPropTypes[componentId] = (usedPropTypes[componentId] || []).concat(newUsedProps);
      }
    }

    // Assign used props in not confident components to the parent component
    for (const j in this._list) {
      if (!has(this._list, j) || this._list[j].confidence < 2) {
        continue;
      }
      const id = getId(this._list[j].node);
      list[j] = this._list[j];
      if (usedPropTypes[id]) {
        list[j].usedPropTypes = (list[j].usedPropTypes || []).concat(usedPropTypes[id]);
      }
    }
    return list;
  }

  /**
   * Return the length of the components list
   * Components for which we are not confident are not counted
   *
   * @returns {Number} Components list length
   */
  length() {
    let length = 0;
    for (const i in this._list) {
      if (!has(this._list, i) || this._list[i].confidence < 2) {
        continue;
      }
      length++;
    }
    return length;
  }
}

function componentRule(rule, context) {
  const createClass = pragmaUtil.getCreateClassFromContext(context);
  const pragma = pragmaUtil.getFromContext(context);
  const sourceCode = context.getSourceCode();
  const components = new Components();

  // Utilities for component detection
  const utils = {

    /**
     * Check if the node is a React ES5 component
     *
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if the node is a React ES5 component, false if not
     */
    isES5Component: function(node) {
      if (!node.parent) {
        return false;
      }
      return new RegExp(`^(${pragma}\\.)?${createClass}$`).test(sourceCode.getText(node.parent.callee));
    },

    /**
     * Check if the node is a React ES6 component
     *
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if the node is a React ES6 component, false if not
     */
    isES6Component: function(node) {
      if (utils.isExplicitComponent(node)) {
        return true;
      }

      if (!node.superClass) {
        return false;
      }
      return new RegExp(`^(${pragma}\\.)?(Pure)?Component$`).test(sourceCode.getText(node.superClass));
    },

    /**
     * Check if the node is explicitly declared as a descendant of a React Component
     *
     * @param {ASTNode} node The AST node being checked (can be a ReturnStatement or an ArrowFunctionExpression).
     * @returns {Boolean} True if the node is explicitly declared as a descendant of a React Component, false if not
     */
    isExplicitComponent: function(node) {
      let comment;
      // Sometimes the passed node may not have been parsed yet by eslint, and this function call crashes.
      // Can be removed when eslint sets "parent" property for all nodes on initial AST traversal: https://github.com/eslint/eslint-scope/issues/27
      // eslint-disable-next-line no-warning-comments
      // FIXME: Remove try/catch when https://github.com/eslint/eslint-scope/issues/27 is implemented.
      try {
        comment = sourceCode.getJSDocComment(node);
      } catch (e) {
        comment = null;
      }

      if (comment === null) {
        return false;
      }

      const commentAst = doctrine.parse(comment.value, {
        unwrap: true,
        tags: ['extends', 'augments']
      });

      const relevantTags = commentAst.tags.filter(tag => tag.name === 'React.Component' || tag.name === 'React.PureComponent');

      return relevantTags.length > 0;
    },

    /**
     * Checks to see if our component extends React.PureComponent
     *
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if node extends React.PureComponent, false if not
     */
    isPureComponent: function (node) {
      if (node.superClass) {
        return new RegExp(`^(${pragma}\\.)?PureComponent$`).test(sourceCode.getText(node.superClass));
      }
      return false;
    },

    /**
     * Check if createElement is destructured from React import
     *
     * @returns {Boolean} True if createElement is destructured from React
     */
    hasDestructuredReactCreateElement: function() {
      const variables = variableUtil.variablesInScope(context);
      const variable = variableUtil.getVariable(variables, 'createElement');
      if (variable) {
        const map = variable.scope.set;
        if (map.has('React')) {
          return true;
        }
      }
      return false;
    },

    /**
     * Checks to see if node is called within React.createElement
     *
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if React.createElement called
     */
    isReactCreateElement: function(node) {
      const calledOnReact = (
        node &&
        node.callee &&
        node.callee.object &&
        node.callee.object.name === 'React' &&
        node.callee.property &&
        node.callee.property.name === 'createElement'
      );

      const calledDirectly = (
        node &&
        node.callee &&
        node.callee.name === 'createElement'
      );

      if (this.hasDestructuredReactCreateElement()) {
        return calledDirectly || calledOnReact;
      }
      return calledOnReact;
    },

    getReturnPropertyAndNode(ASTnode) {
      let property;
      let node = ASTnode;
      switch (node.type) {
        case 'ReturnStatement':
          property = 'argument';
          break;
        case 'ArrowFunctionExpression':
          property = 'body';
          if (node[property] && node[property].type === 'BlockStatement') {
            node = utils.findReturnStatement(node);
            property = 'argument';
          }
          break;
        default:
          node = utils.findReturnStatement(node);
          property = 'argument';
      }
      return {
        node: node,
        property: property
      };
    },

    /**
     * Check if the node is returning JSX
     *
     * @param {ASTNode} ASTnode The AST node being checked
     * @param {Boolean} strict If true, in a ternary condition the node must return JSX in both cases
     * @returns {Boolean} True if the node is returning JSX, false if not
     */
    isReturningJSX: function(ASTnode, strict) {
      const nodeAndProperty = utils.getReturnPropertyAndNode(ASTnode);
      const node = nodeAndProperty.node;
      const property = nodeAndProperty.property;

      if (!node) {
        return false;
      }

      const returnsConditionalJSXConsequent =
        node[property] &&
        node[property].type === 'ConditionalExpression' &&
        node[property].consequent.type === 'JSXElement'
      ;
      const returnsConditionalJSXAlternate =
        node[property] &&
        node[property].type === 'ConditionalExpression' &&
        node[property].alternate.type === 'JSXElement'
      ;
      const returnsConditionalJSX =
        strict ?
          (returnsConditionalJSXConsequent && returnsConditionalJSXAlternate) :
          (returnsConditionalJSXConsequent || returnsConditionalJSXAlternate);

      const returnsJSX =
        node[property] &&
        node[property].type === 'JSXElement'
      ;
      const returnsReactCreateElement = this.isReactCreateElement(node[property]);

      return Boolean(
        returnsConditionalJSX ||
        returnsJSX ||
        returnsReactCreateElement
      );
    },

    /**
     * Check if the node is returning null
     *
     * @param {ASTNode} ASTnode The AST node being checked
     * @returns {Boolean} True if the node is returning null, false if not
     */
    isReturningNull(ASTnode) {
      const nodeAndProperty = utils.getReturnPropertyAndNode(ASTnode);
      const property = nodeAndProperty.property;
      const node = nodeAndProperty.node;

      if (!node) {
        return false;
      }

      return node[property] && node[property].value === null;
    },

    /**
     * Check if the node is returning JSX or null
     *
     * @param {ASTNode} ASTnode The AST node being checked
     * @param {Boolean} strict If true, in a ternary condition the node must return JSX in both cases
     * @returns {Boolean} True if the node is returning JSX or null, false if not
     */
    isReturningJSXOrNull(ASTNode, strict) {
      return utils.isReturningJSX(ASTNode, strict) || utils.isReturningNull(ASTNode);
    },

    /**
     * Find a return statment in the current node
     *
     * @param {ASTNode} ASTnode The AST node being checked
     */
    findReturnStatement: astUtil.findReturnStatement,

    /**
     * Get the parent component node from the current scope
     *
     * @returns {ASTNode} component node, null if we are not in a component
     */
    getParentComponent: function() {
      return (
        utils.getParentES6Component() ||
        utils.getParentES5Component() ||
        utils.getParentStatelessComponent()
      );
    },

    /**
     * Get the parent ES5 component node from the current scope
     *
     * @returns {ASTNode} component node, null if we are not in a component
     */
    getParentES5Component: function() {
      let scope = context.getScope();
      while (scope) {
        const node = scope.block && scope.block.parent && scope.block.parent.parent;
        if (node && utils.isES5Component(node)) {
          return node;
        }
        scope = scope.upper;
      }
      return null;
    },

    /**
     * Get the parent ES6 component node from the current scope
     *
     * @returns {ASTNode} component node, null if we are not in a component
     */
    getParentES6Component: function() {
      let scope = context.getScope();
      while (scope && scope.type !== 'class') {
        scope = scope.upper;
      }
      const node = scope && scope.block;
      if (!node || !utils.isES6Component(node)) {
        return null;
      }
      return node;
    },

    /**
     * Get the parent stateless component node from the current scope
     *
     * @returns {ASTNode} component node, null if we are not in a component
     */
    getParentStatelessComponent: function() {
      let scope = context.getScope();
      while (scope) {
        const node = scope.block;
        const isClass = node.type === 'ClassExpression';
        const isFunction = /Function/.test(node.type); // Functions
        const isMethod = node.parent && node.parent.type === 'MethodDefinition'; // Classes methods
        const isArgument = node.parent && node.parent.type === 'CallExpression'; // Arguments (callback, etc.)
        // Attribute Expressions inside JSX Elements (<button onClick={() => props.handleClick()}></button>)
        const isJSXExpressionContainer = node.parent && node.parent.type === 'JSXExpressionContainer';
        // Stop moving up if we reach a class or an argument (like a callback)
        if (isClass || isArgument) {
          return null;
        }
        // Return the node if it is a function that is not a class method and is not inside a JSX Element
        if (isFunction && !isMethod && !isJSXExpressionContainer && utils.isReturningJSXOrNull(node)) {
          return node;
        }
        scope = scope.upper;
      }
      return null;
    },

    /**
     * Get the related component from a node
     *
     * @param {ASTNode} node The AST node being checked (must be a MemberExpression).
     * @returns {ASTNode} component node, null if we cannot find the component
     */
    getRelatedComponent: function(node) {
      let i;
      let j;
      let k;
      let l;
      let componentNode;
      // Get the component path
      const componentPath = [];
      while (node) {
        if (node.property && node.property.type === 'Identifier') {
          componentPath.push(node.property.name);
        }
        if (node.object && node.object.type === 'Identifier') {
          componentPath.push(node.object.name);
        }
        node = node.object;
      }
      componentPath.reverse();
      const componentName = componentPath.slice(0, componentPath.length - 1).join('.');

      // Find the variable in the current scope
      const variableName = componentPath.shift();
      if (!variableName) {
        return null;
      }
      let variableInScope;
      const variables = variableUtil.variablesInScope(context);
      for (i = 0, j = variables.length; i < j; i++) {
        if (variables[i].name === variableName) {
          variableInScope = variables[i];
          break;
        }
      }
      if (!variableInScope) {
        return null;
      }

      // Try to find the component using variable references
      const refs = variableInScope.references;
      let refId;
      for (i = 0, j = refs.length; i < j; i++) {
        refId = refs[i].identifier;
        if (refId.parent && refId.parent.type === 'MemberExpression') {
          refId = refId.parent;
        }
        if (sourceCode.getText(refId) !== componentName) {
          continue;
        }
        if (refId.type === 'MemberExpression') {
          componentNode = refId.parent.right;
        } else if (refId.parent && refId.parent.type === 'VariableDeclarator') {
          componentNode = refId.parent.init;
        }
        break;
      }

      if (componentNode) {
        // Return the component
        return components.add(componentNode, 1);
      }

      // Try to find the component using variable declarations
      let defInScope;
      const defs = variableInScope.defs;
      for (i = 0, j = defs.length; i < j; i++) {
        if (defs[i].type === 'ClassName' || defs[i].type === 'FunctionName' || defs[i].type === 'Variable') {
          defInScope = defs[i];
          break;
        }
      }
      if (!defInScope || !defInScope.node) {
        return null;
      }
      componentNode = defInScope.node.init || defInScope.node;

      // Traverse the node properties to the component declaration
      for (i = 0, j = componentPath.length; i < j; i++) {
        if (!componentNode.properties) {
          continue;
        }
        for (k = 0, l = componentNode.properties.length; k < l; k++) {
          if (componentNode.properties[k].key && componentNode.properties[k].key.name === componentPath[i]) {
            componentNode = componentNode.properties[k];
            break;
          }
        }
        if (!componentNode || !componentNode.value) {
          return null;
        }
        componentNode = componentNode.value;
      }

      // Return the component
      return components.add(componentNode, 1);
    }
  };

  // Component detection instructions
  const detectionInstructions = {
    ClassExpression: function(node) {
      if (!utils.isES6Component(node)) {
        return;
      }
      components.add(node, 2);
    },

    ClassDeclaration: function(node) {
      if (!utils.isES6Component(node)) {
        return;
      }
      components.add(node, 2);
    },

    ClassProperty: function(node) {
      node = utils.getParentComponent();
      if (!node) {
        return;
      }
      components.add(node, 2);
    },

    ObjectExpression: function(node) {
      if (!utils.isES5Component(node)) {
        return;
      }
      components.add(node, 2);
    },

    FunctionExpression: function(node) {
      if (node.async) {
        components.add(node, 0);
        return;
      }
      const component = utils.getParentComponent();
      if (
        !component ||
        (component.parent && component.parent.type === 'JSXExpressionContainer')
      ) {
        // Ban the node if we cannot find a parent component
        components.add(node, 0);
        return;
      }
      components.add(component, 1);
    },

    FunctionDeclaration: function(node) {
      if (node.async) {
        components.add(node, 0);
        return;
      }
      node = utils.getParentComponent();
      if (!node) {
        return;
      }
      components.add(node, 1);
    },

    ArrowFunctionExpression: function(node) {
      if (node.async) {
        components.add(node, 0);
        return;
      }
      const component = utils.getParentComponent();
      if (
        !component ||
        (component.parent && component.parent.type === 'JSXExpressionContainer')
      ) {
        // Ban the node if we cannot find a parent component
        components.add(node, 0);
        return;
      }
      if (component.expression && utils.isReturningJSX(component)) {
        components.add(component, 2);
      } else {
        components.add(component, 1);
      }
    },

    ThisExpression: function(node) {
      const component = utils.getParentComponent();
      if (!component || !/Function/.test(component.type) || !node.parent.property) {
        return;
      }
      // Ban functions accessing a property on a ThisExpression
      components.add(node, 0);
    },

    ReturnStatement: function(node) {
      if (!utils.isReturningJSX(node)) {
        return;
      }
      node = utils.getParentComponent();
      if (!node) {
        const scope = context.getScope();
        components.add(scope.block, 1);
        return;
      }
      components.add(node, 2);
    }
  };

  // Update the provided rule instructions to add the component detection
  const ruleInstructions = rule(context, components, utils);
  const updatedRuleInstructions = util._extend({}, ruleInstructions);
  const propTypesInstructions = propTypes(context, components, utils);
  const allKeys = new Set(Object.keys(detectionInstructions).concat(Object.keys(propTypesInstructions)));
  allKeys.forEach(instruction => {
    updatedRuleInstructions[instruction] = function(node) {
      if (instruction in detectionInstructions) {
        detectionInstructions[instruction](node);
      }
      if (instruction in propTypesInstructions) {
        propTypesInstructions[instruction](node);
      }
      return ruleInstructions[instruction] ? ruleInstructions[instruction](node) : void 0;
    };
  });

  // Return the updated rule instructions
  return updatedRuleInstructions;
}

module.exports = Object.assign(Components, {
  detect(rule) {
    return componentRule.bind(this, rule);
  }
});


/***/ }),
/* 579 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Utility functions for React components detection
 * @author Yannick Croissant
 */


/**
 * Search a particular variable in a list
 * @param {Array} variables The variables list.
 * @param {Array} name The name of the variable to search.
 * @returns {Boolean} True if the variable was found, false if not.
 */
function findVariable(variables, name) {
  return variables.some(variable => variable.name === name);
}

/**
 * Find and return a particular variable in a list
 * @param {Array} variables The variables list.
 * @param {Array} name The name of the variable to search.
 * @returns {Object} Variable if the variable was found, null if not.
 */
function getVariable(variables, name) {
  return variables.find(variable => variable.name === name);
}

/**
 * List all variable in a given scope
 *
 * Contain a patch for babel-eslint to avoid https://github.com/babel/babel-eslint/issues/21
 *
 * @param {Object} context The current rule context.
 * @returns {Array} The variables list
 */
function variablesInScope(context) {
  let scope = context.getScope();
  let variables = scope.variables;

  while (scope.type !== 'global') {
    scope = scope.upper;
    variables = scope.variables.concat(variables);
  }
  if (scope.childScopes.length) {
    variables = scope.childScopes[0].variables.concat(variables);
    if (scope.childScopes[0].childScopes.length) {
      variables = scope.childScopes[0].childScopes[0].variables.concat(variables);
    }
  }
  variables.reverse();

  return variables;
}

/**
 * Find a variable by name in the current scope.
 * @param {Object} context The current rule context.
 * @param  {string} name Name of the variable to look for.
 * @returns {ASTNode|null} Return null if the variable could not be found, ASTNode otherwise.
 */
function findVariableByName(context, name) {
  const variable = getVariable(variablesInScope(context), name);

  if (!variable || !variable.defs[0] || !variable.defs[0].node) {
    return null;
  }

  if (variable.defs[0].node.type === 'TypeAlias') {
    return variable.defs[0].node.right;
  }

  return variable.defs[0].node.init;
}

module.exports = {
  findVariable: findVariable,
  findVariableByName: findVariableByName,
  getVariable: getVariable,
  variablesInScope: variablesInScope
};


/***/ }),
/* 580 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Utility functions for React pragma configuration
 * @author Yannick Croissant
 */


const JSX_ANNOTATION_REGEX = /^\*\s*@jsx\s+([^\s]+)/;
// Does not check for reserved keywords or unicode characters
const JS_IDENTIFIER_REGEX = /^[_$a-zA-Z][_$a-zA-Z0-9]*$/;


function getCreateClassFromContext(context) {
  let pragma = 'createReactClass';
  // .eslintrc shared settings (http://eslint.org/docs/user-guide/configuring#adding-shared-settings)
  if (context.settings.react && context.settings.react.createClass) {
    pragma = context.settings.react.createClass;
  }
  if (!JS_IDENTIFIER_REGEX.test(pragma)) {
    throw new Error(`createClass pragma ${pragma} is not a valid function name`);
  }
  return pragma;
}

function getFromContext(context) {
  let pragma = 'React';

  const sourceCode = context.getSourceCode();
  const pragmaNode = sourceCode.getAllComments().find(node => JSX_ANNOTATION_REGEX.test(node.value));

  if (pragmaNode) {
    const matches = JSX_ANNOTATION_REGEX.exec(pragmaNode.value);
    pragma = matches[1].split('.')[0];
  // .eslintrc shared settings (http://eslint.org/docs/user-guide/configuring#adding-shared-settings)
  } else if (context.settings.react && context.settings.react.pragma) {
    pragma = context.settings.react.pragma;
  }

  if (!JS_IDENTIFIER_REGEX.test(pragma)) {
    throw new Error(`React pragma ${pragma} is not a valid identifier`);
  }
  return pragma;
}

module.exports = {
  getCreateClassFromContext: getCreateClassFromContext,
  getFromContext: getFromContext
};


/***/ }),
/* 581 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Utility functions for AST
 */


/**
 * Find a return statment in the current node
 *
 * @param {ASTNode} ASTnode The AST node being checked
 */
function findReturnStatement(node) {
  if (
    (!node.value || !node.value.body || !node.value.body.body) &&
    (!node.body || !node.body.body)
  ) {
    return false;
  }

  const bodyNodes = (node.value ? node.value.body.body : node.body.body);

  let i = bodyNodes.length - 1;
  for (; i >= 0; i--) {
    if (bodyNodes[i].type === 'ReturnStatement') {
      return bodyNodes[i];
    }
  }
  return false;
}

/**
 * Get node with property's name
 * @param {Object} node - Property.
 * @returns {Object} Property name node.
 */
function getPropertyNameNode(node) {
  if (node.key || ['MethodDefinition', 'Property'].indexOf(node.type) !== -1) {
    return node.key;
  } else if (node.type === 'MemberExpression') {
    return node.property;
  }
  return null;
}

/**
 * Get properties name
 * @param {Object} node - Property.
 * @returns {String} Property name.
 */
function getPropertyName(node) {
  const nameNode = getPropertyNameNode(node);
  return nameNode ? nameNode.name : '';
}

/**
 * Get properties for a given AST node
 * @param {ASTNode} node The AST node being checked.
 * @returns {Array} Properties array.
 */
function getComponentProperties(node) {
  switch (node.type) {
    case 'ClassDeclaration':
    case 'ClassExpression':
      return node.body.body;
    case 'ObjectExpression':
      return node.properties;
    default:
      return [];
  }
}

/**
 * Checks if the node is the first in its line, excluding whitespace.
 * @param {Object} context The node to check
 * @param {ASTNode} node The node to check
 * @return {Boolean} true if it's the first node in its line
 */
function isNodeFirstInLine(context, node) {
  const sourceCode = context.getSourceCode();
  let token = node;
  let lines;
  do {
    token = sourceCode.getTokenBefore(token);
    lines = token.type === 'JSXText'
      ? token.value.split('\n')
      : null;
  } while (
    token.type === 'JSXText' &&
        /^\s*$/.test(lines[lines.length - 1])
  );

  const startLine = node.loc.start.line;
  const endLine = token ? token.loc.end.line : -1;
  return startLine !== endLine;
}

/**
 * Checks if the node is a function or arrow function expression.
 * @param {Object} context The node to check
 * @return {Boolean} true if it's a function-like expression
 */
function isFunctionLikeExpression(node) {
  return node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression';
}

module.exports = {
  findReturnStatement: findReturnStatement,
  getPropertyName: getPropertyName,
  getPropertyNameNode: getPropertyNameNode,
  getComponentProperties: getComponentProperties,
  isNodeFirstInLine: isNodeFirstInLine,
  isFunctionLikeExpression: isFunctionLikeExpression
};


/***/ }),
/* 582 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Common propTypes detection functionality.
 */


const annotations = __webpack_require__(583);
const propsUtil = __webpack_require__(584);
const variableUtil = __webpack_require__(579);
const versionUtil = __webpack_require__(585);

/**
 * Checks if we are declaring a props as a generic type in a flow-annotated class.
 *
 * @param {ASTNode} node  the AST node being checked.
 * @returns {Boolean} True if the node is a class with generic prop types, false if not.
 */
function isSuperTypeParameterPropsDeclaration(node) {
  if (node && (node.type === 'ClassDeclaration' || node.type === 'ClassExpression')) {
    if (node.superTypeParameters && node.superTypeParameters.params.length > 0) {
      return true;
    }
  }
  return false;
}

/**
 * Removes quotes from around an identifier.
 * @param {string} the identifier to strip
 */
function stripQuotes(string) {
  return string.replace(/^\'|\'$/g, '');
}

/**
 * Retrieve the name of a key node
 * @param {ASTNode} node The AST node with the key.
 * @return {string} the name of the key
 */
function getKeyValue(context, node) {
  if (node.type === 'ObjectTypeProperty') {
    const tokens = context.getFirstTokens(node, 2);
    return (tokens[0].value === '+' || tokens[0].value === '-'
      ? tokens[1].value
      : stripQuotes(tokens[0].value)
    );
  }
  const key = node.key || node.argument;
  return key.type === 'Identifier' ? key.name : key.value;
}

/**
 * Iterates through a properties node, like a customized forEach.
 * @param {Object[]} properties Array of properties to iterate.
 * @param {Function} fn Function to call on each property, receives property key
    and property value. (key, value) => void
 */
function iterateProperties(context, properties, fn) {
  if (properties && properties.length && typeof fn === 'function') {
    for (let i = 0, j = properties.length; i < j; i++) {
      const node = properties[i];
      const key = getKeyValue(context, node);

      const value = node.value;
      fn(key, value);
    }
  }
}

module.exports = function propTypesInstructions(context, components, utils) {
  // Used to track the type annotations in scope.
  // Necessary because babel's scopes do not track type annotations.
  let stack = null;

  const classExpressions = [];
  const defaults = {customValidators: []};
  const configuration = Object.assign({}, defaults, context.options[0] || {});
  const customValidators = configuration.customValidators;
  const sourceCode = context.getSourceCode();
  const propWrapperFunctions = new Set(context.settings.propWrapperFunctions);

  /**
   * Returns the full scope.
   * @returns {Object} The whole scope.
   */
  function typeScope() {
    return stack[stack.length - 1];
  }

  /**
   * Gets a node from the scope.
   * @param {string} key The name of the identifier to access.
   * @returns {ASTNode} The ASTNode associated with the given identifier.
   */
  function getInTypeScope(key) {
    return stack[stack.length - 1][key];
  }

  /**
   * Sets the new value in the scope.
   * @param {string} key The name of the identifier to access
   * @param {ASTNode} value The new value for the identifier.
   * @returns {ASTNode} The ASTNode associated with the given identifier.
   */
  function setInTypeScope(key, value) {
    stack[stack.length - 1][key] = value;
    return value;
  }

  /**
   * Checks if prop should be validated by plugin-react-proptypes
   * @param {String} validator Name of validator to check.
   * @returns {Boolean} True if validator should be checked by custom validator.
   */
  function hasCustomValidator(validator) {
    return customValidators.indexOf(validator) !== -1;
  }

  /* eslint-disable no-use-before-define */
  const typeDeclarationBuilders = {
    GenericTypeAnnotation: function(annotation, parentName, seen) {
      if (getInTypeScope(annotation.id.name)) {
        return buildTypeAnnotationDeclarationTypes(getInTypeScope(annotation.id.name), parentName, seen);
      }
      return {};
    },

    ObjectTypeAnnotation: function(annotation, parentName, seen) {
      let containsObjectTypeSpread = false;
      const shapeTypeDefinition = {
        type: 'shape',
        children: {}
      };
      iterateProperties(context, annotation.properties, (childKey, childValue) => {
        const fullName = [parentName, childKey].join('.');
        if (!childKey && !childValue) {
          containsObjectTypeSpread = true;
        } else {
          const types = buildTypeAnnotationDeclarationTypes(childValue, fullName, seen);
          types.fullName = fullName;
          types.name = childKey;
          types.node = childValue;
          shapeTypeDefinition.children[childKey] = types;
        }
      });

      // nested object type spread means we need to ignore/accept everything in this object
      if (containsObjectTypeSpread) {
        return {};
      }
      return shapeTypeDefinition;
    },

    UnionTypeAnnotation: function(annotation, parentName, seen) {
      const unionTypeDefinition = {
        type: 'union',
        children: []
      };
      for (let i = 0, j = annotation.types.length; i < j; i++) {
        const type = buildTypeAnnotationDeclarationTypes(annotation.types[i], parentName, seen);
        // keep only complex type
        if (type.type) {
          if (type.children === true) {
            // every child is accepted for one type, abort type analysis
            unionTypeDefinition.children = true;
            return unionTypeDefinition;
          }
        }

        unionTypeDefinition.children.push(type);
      }
      if (unionTypeDefinition.children.length === 0) {
        // no complex type found, simply accept everything
        return {};
      }
      return unionTypeDefinition;
    },

    ArrayTypeAnnotation: function(annotation, parentName, seen) {
      const fullName = [parentName, '*'].join('.');
      const child = buildTypeAnnotationDeclarationTypes(annotation.elementType, fullName, seen);
      child.fullName = fullName;
      child.name = '__ANY_KEY__';
      child.node = annotation;
      return {
        type: 'object',
        children: {
          __ANY_KEY__: child
        }
      };
    }
  };
  /* eslint-enable no-use-before-define */

  /**
   * Resolve the type annotation for a given node.
   * Flow annotations are sometimes wrapped in outer `TypeAnnotation`
   * and `NullableTypeAnnotation` nodes which obscure the annotation we're
   * interested in.
   * This method also resolves type aliases where possible.
   *
   * @param {ASTNode} node The annotation or a node containing the type annotation.
   * @returns {ASTNode} The resolved type annotation for the node.
   */
  function resolveTypeAnnotation(node) {
    let annotation = node.typeAnnotation || node;
    while (annotation && (annotation.type === 'TypeAnnotation' || annotation.type === 'NullableTypeAnnotation')) {
      annotation = annotation.typeAnnotation;
    }
    if (annotation.type === 'GenericTypeAnnotation' && getInTypeScope(annotation.id.name)) {
      return getInTypeScope(annotation.id.name);
    }
    return annotation;
  }

  /**
   * Creates the representation of the React props type annotation for the component.
   * The representation is used to verify nested used properties.
   * @param {ASTNode} annotation Type annotation for the props class property.
   * @return {Object} The representation of the declaration, empty object means
   *    the property is declared without the need for further analysis.
   */
  function buildTypeAnnotationDeclarationTypes(annotation, parentName, seen) {
    if (typeof seen === 'undefined') {
      // Keeps track of annotations we've already seen to
      // prevent problems with recursive types.
      seen = new Set();
    }
    if (seen.has(annotation)) {
      // This must be a recursive type annotation, so just accept anything.
      return {};
    }
    seen.add(annotation);

    if (annotation.type in typeDeclarationBuilders) {
      return typeDeclarationBuilders[annotation.type](annotation, parentName, seen);
    }
    return {};
  }

  /**
   * Marks all props found inside ObjectTypeAnnotaiton as declared.
   *
   * Modifies the declaredProperties object
   * @param {ASTNode} propTypes
   * @param {Object} declaredPropTypes
   * @returns {Boolean} True if propTypes should be ignored (e.g. when a type can't be resolved, when it is imported)
   */
  function declarePropTypesForObjectTypeAnnotation(propTypes, declaredPropTypes) {
    let ignorePropsValidation = false;

    iterateProperties(context, propTypes.properties, (key, value) => {
      if (!value) {
        ignorePropsValidation = true;
        return;
      }

      const types = buildTypeAnnotationDeclarationTypes(value, key);
      types.fullName = key;
      types.name = key;
      types.node = value;
      declaredPropTypes[key] = types;
    });

    return ignorePropsValidation;
  }

  /**
   * Marks all props found inside IntersectionTypeAnnotation as declared.
   * Since InterSectionTypeAnnotations can be nested, this handles recursively.
   *
   * Modifies the declaredPropTypes object
   * @param {ASTNode} propTypes
   * @param {Object} declaredPropTypes
   * @returns {Boolean} True if propTypes should be ignored (e.g. when a type can't be resolved, when it is imported)
   */
  function declarePropTypesForIntersectionTypeAnnotation(propTypes, declaredPropTypes) {
    return propTypes.types.some(annotation => {
      if (annotation.type === 'ObjectTypeAnnotation') {
        return declarePropTypesForObjectTypeAnnotation(annotation, declaredPropTypes);
      }

      if (annotation.type === 'UnionTypeAnnotation') {
        return true;
      }

      // Type can't be resolved
      if (!annotation.id) {
        return true;
      }

      const typeNode = getInTypeScope(annotation.id.name);

      if (!typeNode) {
        return true;
      } else if (typeNode.type === 'IntersectionTypeAnnotation') {
        return declarePropTypesForIntersectionTypeAnnotation(typeNode, declaredPropTypes);
      }

      return declarePropTypesForObjectTypeAnnotation(typeNode, declaredPropTypes);
    });
  }

  /**
   * Creates the representation of the React propTypes for the component.
   * The representation is used to verify nested used properties.
   * @param {ASTNode} value Node of the PropTypes for the desired property
   * @return {Object} The representation of the declaration, empty object means
   *    the property is declared without the need for further analysis.
   */
  function buildReactDeclarationTypes(value, parentName) {
    if (
      value &&
      value.callee &&
      value.callee.object &&
      hasCustomValidator(value.callee.object.name)
    ) {
      return {};
    }

    if (
      value &&
      value.type === 'MemberExpression' &&
      value.property &&
      value.property.name &&
      value.property.name === 'isRequired'
    ) {
      value = value.object;
    }

    // Verify PropTypes that are functions
    if (
      value &&
      value.type === 'CallExpression' &&
      value.callee &&
      value.callee.property &&
      value.callee.property.name &&
      value.arguments &&
      value.arguments.length > 0
    ) {
      const callName = value.callee.property.name;
      const argument = value.arguments[0];
      switch (callName) {
        case 'shape':
          if (argument.type !== 'ObjectExpression') {
            // Invalid proptype or cannot analyse statically
            return {};
          }
          const shapeTypeDefinition = {
            type: 'shape',
            children: {}
          };
          iterateProperties(context, argument.properties, (childKey, childValue) => {
            const fullName = [parentName, childKey].join('.');
            const types = buildReactDeclarationTypes(childValue, fullName);
            types.fullName = fullName;
            types.name = childKey;
            types.node = childValue;
            shapeTypeDefinition.children[childKey] = types;
          });
          return shapeTypeDefinition;
        case 'arrayOf':
        case 'objectOf':
          const fullName = [parentName, '*'].join('.');
          const child = buildReactDeclarationTypes(argument, fullName);
          child.fullName = fullName;
          child.name = '__ANY_KEY__';
          child.node = argument;
          return {
            type: 'object',
            children: {
              __ANY_KEY__: child
            }
          };
        case 'oneOfType':
          if (
            !argument.elements ||
            !argument.elements.length
          ) {
            // Invalid proptype or cannot analyse statically
            return {};
          }
          const unionTypeDefinition = {
            type: 'union',
            children: []
          };
          for (let i = 0, j = argument.elements.length; i < j; i++) {
            const type = buildReactDeclarationTypes(argument.elements[i], parentName);
            // keep only complex type
            if (type.type) {
              if (type.children === true) {
                // every child is accepted for one type, abort type analysis
                unionTypeDefinition.children = true;
                return unionTypeDefinition;
              }
            }

            unionTypeDefinition.children.push(type);
          }
          if (unionTypeDefinition.length === 0) {
            // no complex type found, simply accept everything
            return {};
          }
          return unionTypeDefinition;
        case 'instanceOf':
          return {
            type: 'instance',
            // Accept all children because we can't know what type they are
            children: true
          };
        case 'oneOf':
        default:
          return {};
      }
    }
    // Unknown property or accepts everything (any, object, ...)
    return {};
  }


  /**
   * Mark a prop type as declared
   * @param {ASTNode} node The AST node being checked.
   * @param {propTypes} node The AST node containing the proptypes
   */
  function markPropTypesAsDeclared(node, propTypes) {
    let componentNode = node;
    while (componentNode && !components.get(componentNode)) {
      componentNode = componentNode.parent;
    }
    const component = components.get(componentNode);
    const declaredPropTypes = component && component.declaredPropTypes || {};
    let ignorePropsValidation = component && component.ignorePropsValidation || false;
    switch (propTypes && propTypes.type) {
      case 'ObjectTypeAnnotation':
        ignorePropsValidation = declarePropTypesForObjectTypeAnnotation(propTypes, declaredPropTypes);
        break;
      case 'ObjectExpression':
        iterateProperties(context, propTypes.properties, (key, value) => {
          if (!value) {
            ignorePropsValidation = true;
            return;
          }
          const types = buildReactDeclarationTypes(value, key);
          types.fullName = key;
          types.name = key;
          types.node = value;
          declaredPropTypes[key] = types;
        });
        break;
      case 'MemberExpression':
        let curDeclaredPropTypes = declaredPropTypes;
        // Walk the list of properties, until we reach the assignment
        // ie: ClassX.propTypes.a.b.c = ...
        while (
          propTypes &&
          propTypes.parent &&
          propTypes.parent.type !== 'AssignmentExpression' &&
          propTypes.property &&
          curDeclaredPropTypes
        ) {
          const propName = propTypes.property.name;
          if (propName in curDeclaredPropTypes) {
            curDeclaredPropTypes = curDeclaredPropTypes[propName].children;
            propTypes = propTypes.parent;
          } else {
            // This will crash at runtime because we haven't seen this key before
            // stop this and do not declare it
            propTypes = null;
          }
        }
        if (propTypes && propTypes.parent && propTypes.property) {
          if (!(propTypes === propTypes.parent.left && propTypes.parent.left.object)) {
            ignorePropsValidation = true;
            break;
          }
          const parentProp = context.getSource(propTypes.parent.left.object).replace(/^.*\.propTypes\./, '');
          const types = buildReactDeclarationTypes(
            propTypes.parent.right,
            parentProp
          );

          types.name = propTypes.property.name;
          types.fullName = [parentProp, propTypes.property.name].join('.');
          types.node = propTypes.property;
          curDeclaredPropTypes[propTypes.property.name] = types;
        } else {
          let isUsedInPropTypes = false;
          let n = propTypes;
          while (n) {
            if (n.type === 'AssignmentExpression' && propsUtil.isPropTypesDeclaration(n.left) ||
              (n.type === 'ClassProperty' || n.type === 'Property') && propsUtil.isPropTypesDeclaration(n)) {
              // Found a propType used inside of another propType. This is not considered usage, we'll still validate
              // this component.
              isUsedInPropTypes = true;
              break;
            }
            n = n.parent;
          }
          if (!isUsedInPropTypes) {
            ignorePropsValidation = true;
          }
        }
        break;
      case 'Identifier':
        const variablesInScope = variableUtil.variablesInScope(context);
        for (let i = 0, j = variablesInScope.length; i < j; i++) {
          if (variablesInScope[i].name !== propTypes.name) {
            continue;
          }
          const defInScope = variablesInScope[i].defs[variablesInScope[i].defs.length - 1];
          markPropTypesAsDeclared(node, defInScope.node && defInScope.node.init);
          return;
        }
        ignorePropsValidation = true;
        break;
      case 'CallExpression':
        if (
          propWrapperFunctions.has(sourceCode.getText(propTypes.callee)) &&
          propTypes.arguments && propTypes.arguments[0]
        ) {
          markPropTypesAsDeclared(node, propTypes.arguments[0]);
          return;
        }
        break;
      case 'IntersectionTypeAnnotation':
        ignorePropsValidation = declarePropTypesForIntersectionTypeAnnotation(propTypes, declaredPropTypes);
        break;
      case null:
        break;
      default:
        ignorePropsValidation = true;
        break;
    }

    components.set(node, {
      declaredPropTypes: declaredPropTypes,
      ignorePropsValidation: ignorePropsValidation
    });
  }

  /**
   * @param {ASTNode} node We expect either an ArrowFunctionExpression,
   *   FunctionDeclaration, or FunctionExpression
   */
  function markAnnotatedFunctionArgumentsAsDeclared(node) {
    if (!node.params || !node.params.length || !annotations.isAnnotatedFunctionPropsDeclaration(node, context)) {
      return;
    }
    markPropTypesAsDeclared(node, resolveTypeAnnotation(node.params[0]));
  }

  /**
   * Resolve the type annotation for a given class declaration node with superTypeParameters.
   *
   * @param {ASTNode} node The annotation or a node containing the type annotation.
   * @returns {ASTNode} The resolved type annotation for the node.
   */
  function resolveSuperParameterPropsType(node) {
    let propsParameterPosition;
    try {
      // Flow <=0.52 had 3 required TypedParameters of which the second one is the Props.
      // Flow >=0.53 has 2 optional TypedParameters of which the first one is the Props.
      propsParameterPosition = versionUtil.testFlowVersion(context, '0.53.0') ? 0 : 1;
    } catch (e) {
      // In case there is no flow version defined, we can safely assume that when there are 3 Props we are dealing with version <= 0.52
      propsParameterPosition = node.superTypeParameters.params.length <= 2 ? 0 : 1;
    }

    let annotation = node.superTypeParameters.params[propsParameterPosition];
    while (annotation && (annotation.type === 'TypeAnnotation' || annotation.type === 'NullableTypeAnnotation')) {
      annotation = annotation.typeAnnotation;
    }

    if (annotation.type === 'GenericTypeAnnotation' && getInTypeScope(annotation.id.name)) {
      return getInTypeScope(annotation.id.name);
    }
    return annotation;
  }

  /**
   * Checks if we are declaring a `props` class property with a flow type annotation.
   * @param {ASTNode} node The AST node being checked.
   * @returns {Boolean} True if the node is a type annotated props declaration, false if not.
   */
  function isAnnotatedClassPropsDeclaration(node) {
    if (node && node.type === 'ClassProperty') {
      const tokens = context.getFirstTokens(node, 2);
      if (
        node.typeAnnotation && (
          tokens[0].value === 'props' ||
          (tokens[1] && tokens[1].value === 'props')
        )
      ) {
        return true;
      }
    }
    return false;
  }

  return {
    ClassExpression: function(node) {
      // TypeParameterDeclaration need to be added to typeScope in order to handle ClassExpressions.
      // This visitor is executed before TypeParameterDeclaration are scoped, therefore we postpone
      // processing class expressions until when the program exists.
      classExpressions.push(node);
    },

    ClassDeclaration: function(node) {
      if (isSuperTypeParameterPropsDeclaration(node)) {
        markPropTypesAsDeclared(node, resolveSuperParameterPropsType(node));
      }
    },

    ClassProperty: function(node) {
      if (isAnnotatedClassPropsDeclaration(node)) {
        markPropTypesAsDeclared(node, resolveTypeAnnotation(node));
      } else if (propsUtil.isPropTypesDeclaration(node)) {
        markPropTypesAsDeclared(node, node.value);
      }
    },

    ObjectExpression: function(node) {
      // Search for the proptypes declaration
      node.properties.forEach(property => {
        if (!propsUtil.isPropTypesDeclaration(property)) {
          return;
        }
        markPropTypesAsDeclared(node, property.value);
      });
    },

    FunctionExpression: function(node) {
      if (node.parent.type !== 'MethodDefinition') {
        markAnnotatedFunctionArgumentsAsDeclared(node);
      }
    },

    FunctionDeclaration: markAnnotatedFunctionArgumentsAsDeclared,

    ArrowFunctionExpression: markAnnotatedFunctionArgumentsAsDeclared,

    MemberExpression: function(node) {
      if (propsUtil.isPropTypesDeclaration(node)) {
        const component = utils.getRelatedComponent(node);
        if (!component) {
          return;
        }
        markPropTypesAsDeclared(component.node, node.parent.right || node.parent);
      }
    },

    MethodDefinition: function(node) {
      if (!node.static || node.kind !== 'get' || !propsUtil.isPropTypesDeclaration(node)) {
        return;
      }

      let i = node.value.body.body.length - 1;
      for (; i >= 0; i--) {
        if (node.value.body.body[i].type === 'ReturnStatement') {
          break;
        }
      }

      if (i >= 0) {
        markPropTypesAsDeclared(node, node.value.body.body[i].argument);
      }
    },

    JSXSpreadAttribute: function(node) {
      const component = components.get(utils.getParentComponent());
      components.set(component ? component.node : node, {
        ignorePropsValidation: true
      });
    },

    TypeAlias: function(node) {
      setInTypeScope(node.id.name, node.right);
    },

    TypeParameterDeclaration: function(node) {
      const identifier = node.params[0];

      if (identifier.typeAnnotation) {
        setInTypeScope(identifier.name, identifier.typeAnnotation.typeAnnotation);
      }
    },

    Program: function() {
      stack = [{}];
    },

    BlockStatement: function () {
      stack.push(Object.create(typeScope()));
    },

    'BlockStatement:exit': function () {
      stack.pop();
    },

    'Program:exit': function() {
      classExpressions.forEach(node => {
        if (isSuperTypeParameterPropsDeclaration(node)) {
          markPropTypesAsDeclared(node, resolveSuperParameterPropsType(node));
        }
      });
    }
  };
};


/***/ }),
/* 583 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Utility functions for type annotation detection.
 * @author Yannick Croissant
 * @author Vitor Balocco
 */


/**
 * Checks if we are declaring a `props` argument with a flow type annotation.
 * @param {ASTNode} node The AST node being checked.
 * @returns {Boolean} True if the node is a type annotated props declaration, false if not.
 */
function isAnnotatedFunctionPropsDeclaration(node, context) {
  if (!node || !node.params || !node.params.length) {
    return false;
  }

  const tokens = context.getFirstTokens(node.params[0], 2);
  const isAnnotated = node.params[0].typeAnnotation;
  const isDestructuredProps = node.params[0].type === 'ObjectPattern';
  const isProps = tokens[0].value === 'props' || (tokens[1] && tokens[1].value === 'props');

  return (isAnnotated && (isDestructuredProps || isProps));
}

module.exports = {
  isAnnotatedFunctionPropsDeclaration: isAnnotatedFunctionPropsDeclaration
};


/***/ }),
/* 584 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Utility functions for props
 */


const astUtil = __webpack_require__(581);

/**
 * Checks if the Identifier node passed in looks like a propTypes declaration.
 * @param {ASTNode} node The node to check. Must be an Identifier node.
 * @returns {Boolean} `true` if the node is a propTypes declaration, `false` if not
 */
function isPropTypesDeclaration(node) {
  if (node && node.type === 'ClassProperty') {
    // Flow support
    if (node.typeAnnotation && node.key.name === 'props') {
      return true;
    }
  }
  return astUtil.getPropertyName(node) === 'propTypes';
}

/**
 * Checks if the node passed in looks like a contextTypes declaration.
 * @param {ASTNode} node The node to check.
 * @returns {Boolean} `true` if the node is a contextTypes declaration, `false` if not
 */
function isContextTypesDeclaration(node) {
  if (node && node.type === 'ClassProperty') {
    // Flow support
    if (node.typeAnnotation && node.key.name === 'context') {
      return true;
    }
  }
  return astUtil.getPropertyName(node) === 'contextTypes';
}

/**
 * Checks if the node passed in looks like a childContextTypes declaration.
 * @param {ASTNode} node The node to check.
 * @returns {Boolean} `true` if the node is a childContextTypes declaration, `false` if not
 */
function isChildContextTypesDeclaration(node) {
  return astUtil.getPropertyName(node) === 'childContextTypes';
}

/**
 * Checks if the Identifier node passed in looks like a defaultProps declaration.
 * @param {ASTNode} node The node to check. Must be an Identifier node.
 * @returns {Boolean} `true` if the node is a defaultProps declaration, `false` if not
 */
function isDefaultPropsDeclaration(node) {
  const propName = astUtil.getPropertyName(node);
  return (propName === 'defaultProps' || propName === 'getDefaultProps');
}

/**
 * Checks if the PropTypes MemberExpression node passed in declares a required propType.
 * @param {ASTNode} propTypeExpression node to check. Must be a `PropTypes` MemberExpression.
 * @returns {Boolean} `true` if this PropType is required, `false` if not.
 */
function isRequiredPropType(propTypeExpression) {
  return propTypeExpression.type === 'MemberExpression' && propTypeExpression.property.name === 'isRequired';
}

module.exports = {
  isPropTypesDeclaration: isPropTypesDeclaration,
  isContextTypesDeclaration: isContextTypesDeclaration,
  isChildContextTypesDeclaration: isChildContextTypesDeclaration,
  isDefaultPropsDeclaration: isDefaultPropsDeclaration,
  isRequiredPropType: isRequiredPropType
};


/***/ }),
/* 585 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Utility functions for React and Flow version configuration
 * @author Yannick Croissant
 */


const log = __webpack_require__(586);

let warnedForMissingVersion = false;

function getReactVersionFromContext(context) {
  let confVer = '999.999.999';
  // .eslintrc shared settings (http://eslint.org/docs/user-guide/configuring#adding-shared-settings)
  if (context.settings.react && context.settings.react.version) {
    confVer = context.settings.react.version;
  } else if (!warnedForMissingVersion) {
    log('Warning: React version not specified in eslint-plugin-react settings. ' +
      'See https://github.com/yannickcr/eslint-plugin-react#configuration.');
    warnedForMissingVersion = true;
  }
  confVer = /^[0-9]+\.[0-9]+$/.test(confVer) ? `${confVer}.0` : confVer;
  return confVer.split('.').map(part => Number(part));
}

function getFlowVersionFromContext(context) {
  let confVer = '999.999.999';
  // .eslintrc shared settings (http://eslint.org/docs/user-guide/configuring#adding-shared-settings)
  if (context.settings.react && context.settings.react.flowVersion) {
    confVer = context.settings.react.flowVersion;
  } else {
    throw 'Could not retrieve flowVersion from settings';
  }
  confVer = /^[0-9]+\.[0-9]+$/.test(confVer) ? `${confVer}.0` : confVer;
  return confVer.split('.').map(part => Number(part));
}

function test(context, methodVer, confVer) {
  methodVer = String(methodVer || '').split('.').map(part => Number(part));
  const higherMajor = methodVer[0] < confVer[0];
  const higherMinor = methodVer[0] === confVer[0] && methodVer[1] < confVer[1];
  const higherOrEqualPatch = methodVer[0] === confVer[0] && methodVer[1] === confVer[1] && methodVer[2] <= confVer[2];

  return higherMajor || higherMinor || higherOrEqualPatch;
}

function testReactVersion(context, methodVer) {
  return test(context, methodVer, getReactVersionFromContext(context));
}

function testFlowVersion(context, methodVer) {
  return test(context, methodVer, getFlowVersionFromContext(context));
}

module.exports = {
  testReactVersion,
  testFlowVersion
};


/***/ }),
/* 586 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

/**
 * Logs out a message if there is no format option set.
 * @param {String} message - Message to log.
 */
function log(message) {
  if (!/\=-(f|-format)=/.test(process.argv.join('='))) {
    // eslint-disable-next-line no-console
    console.log(message);
  }
}

module.exports = log;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(20)))

/***/ }),
/* 587 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function docsUrl(ruleName) {
  return `https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules/${ruleName}.md`;
}

module.exports = docsUrl;


/***/ }),
/* 588 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Forbid "button" element without an explicit "type" attribute
 * @author Filipp Riabchun
 */


const getProp = __webpack_require__(589);
const getLiteralPropValue = __webpack_require__(617);
const docsUrl = __webpack_require__(587);
const pragmaUtil = __webpack_require__(580);

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

function isCreateElement(node, context) {
  const pragma = pragmaUtil.getFromContext(context);
  return node.callee
    && node.callee.type === 'MemberExpression'
    && node.callee.property.name === 'createElement'
    && node.callee.object
    && node.callee.object.name === pragma
    && node.arguments.length > 0;
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const optionDefaults = {
  button: true,
  submit: true,
  reset: true
};

module.exports = {
  meta: {
    docs: {
      description: 'Forbid "button" element without an explicit "type" attribute',
      category: 'Possible Errors',
      recommended: false,
      url: docsUrl('button-has-type')
    },
    schema: [{
      type: 'object',
      properties: {
        button: {
          default: optionDefaults.button,
          type: 'boolean'
        },
        submit: {
          default: optionDefaults.submit,
          type: 'boolean'
        },
        reset: {
          default: optionDefaults.reset,
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: function(context) {
    const configuration = Object.assign({}, optionDefaults, context.options[0]);

    function reportMissing(node) {
      context.report({
        node: node,
        message: 'Missing an explicit type attribute for button'
      });
    }

    function checkValue(node, value, quoteFn) {
      const q = quoteFn || (x => `"${x}"`);
      if (!(value in configuration)) {
        context.report({
          node: node,
          message: `${q(value)} is an invalid value for button type attribute`
        });
      } else if (!configuration[value]) {
        context.report({
          node: node,
          message: `${q(value)} is a forbidden value for button type attribute`
        });
      }
    }

    return {
      JSXElement: function(node) {
        if (node.openingElement.name.name !== 'button') {
          return;
        }

        const typeProp = getProp(node.openingElement.attributes, 'type');

        if (!typeProp) {
          reportMissing(node);
          return;
        }

        const propValue = getLiteralPropValue(typeProp);
        if (!propValue && typeProp.value && typeProp.value.expression) {
          checkValue(node, typeProp.value.expression.name, x => `\`${x}\``);
        } else {
          checkValue(node, propValue);
        }
      },
      CallExpression: function(node) {
        if (!isCreateElement(node, context)) {
          return;
        }

        if (node.arguments[0].type !== 'Literal' || node.arguments[0].value !== 'button') {
          return;
        }

        if (!node.arguments[1] || node.arguments[1].type !== 'ObjectExpression') {
          reportMissing(node);
          return;
        }

        const props = node.arguments[1].properties;
        const typeProp = props.find(prop => prop.key && prop.key.name === 'type');

        if (!typeProp || typeProp.value.type !== 'Literal') {
          reportMissing(node);
          return;
        }

        checkValue(node, typeProp.value.value);
      }
    };
  }
};


/***/ }),
/* 589 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(590).getProp; // eslint-disable-line import/no-unresolved


/***/ }),
/* 590 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hasProp = __webpack_require__(591);

var _hasProp2 = _interopRequireDefault(_hasProp);

var _elementType = __webpack_require__(593);

var _elementType2 = _interopRequireDefault(_elementType);

var _eventHandlers = __webpack_require__(594);

var _eventHandlers2 = _interopRequireDefault(_eventHandlers);

var _getProp = __webpack_require__(595);

var _getProp2 = _interopRequireDefault(_getProp);

var _getPropValue = __webpack_require__(596);

var _getPropValue2 = _interopRequireDefault(_getPropValue);

var _propName = __webpack_require__(592);

var _propName2 = _interopRequireDefault(_propName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  hasProp: _hasProp2.default,
  hasAnyProp: _hasProp.hasAnyProp,
  hasEveryProp: _hasProp.hasEveryProp,
  elementType: _elementType2.default,
  eventHandlers: _eventHandlers2.default,
  eventHandlersByType: _eventHandlers.eventHandlersByType,
  getProp: _getProp2.default,
  getPropValue: _getPropValue2.default,
  getLiteralPropValue: _getPropValue.getLiteralPropValue,
  propName: _propName2.default
};

/***/ }),
/* 591 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasProp;
exports.hasAnyProp = hasAnyProp;
exports.hasEveryProp = hasEveryProp;

var _propName = __webpack_require__(592);

var _propName2 = _interopRequireDefault(_propName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_OPTIONS = {
  spreadStrict: true,
  ignoreCase: true
};

/**
 * Returns boolean indicating whether an prop exists on the props
 * property of a JSX element node.
 */
function hasProp() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_OPTIONS;

  var propToCheck = options.ignoreCase ? prop.toUpperCase() : prop;

  return props.some(function (attribute) {
    // If the props contain a spread prop, then refer to strict param.
    if (attribute.type === 'JSXSpreadAttribute') {
      return !options.spreadStrict;
    }

    var currentProp = options.ignoreCase ? (0, _propName2.default)(attribute).toUpperCase() : (0, _propName2.default)(attribute);

    return propToCheck === currentProp;
  });
}

/**
 * Given the props on a node and a list of props to check, this returns a boolean
 * indicating if any of them exist on the node.
 */
function hasAnyProp() {
  var nodeProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_OPTIONS;

  var propsToCheck = typeof props === 'string' ? props.split(' ') : props;

  return propsToCheck.some(function (prop) {
    return hasProp(nodeProps, prop, options);
  });
}

/**
 * Given the props on a node and a list of props to check, this returns a boolean
 * indicating if all of them exist on the node
 */
function hasEveryProp() {
  var nodeProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_OPTIONS;

  var propsToCheck = typeof props === 'string' ? props.split(' ') : props;

  return propsToCheck.every(function (prop) {
    return hasProp(nodeProps, prop, options);
  });
}

/***/ }),
/* 592 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = propName;
/**
 * Returns the name of the prop given the JSXAttribute object.
 */
function propName() {
  var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!prop.type || prop.type !== 'JSXAttribute') {
    throw new Error('The prop must be a JSXAttribute collected by the AST parser.');
  }

  if (prop.name.type === 'JSXNamespacedName') {
    return prop.name.namespace.name + ':' + prop.name.name.name;
  }

  return prop.name.name;
}

/***/ }),
/* 593 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = elementType;
function resolveMemberExpressions() {
  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var property = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (object.type === 'JSXMemberExpression') {
    return resolveMemberExpressions(object.object, object.property) + '.' + property.name;
  }

  return object.name + '.' + property.name;
}

/**
 * Returns the tagName associated with a JSXElement.
 */
function elementType() {
  var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var name = node.name;


  if (!name) {
    throw new Error('The argument provided is not a JSXElement node.');
  }

  if (name.type === 'JSXMemberExpression') {
    var _name$object = name.object,
        object = _name$object === undefined ? {} : _name$object,
        _name$property = name.property,
        property = _name$property === undefined ? {} : _name$property;

    return resolveMemberExpressions(object, property);
  } else if (name.type === 'JSXNamespacedName') {
    return name.namespace.name + ':' + name.name.name;
  }

  return node.name.name;
}

/***/ }),
/* 594 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Common event handlers for JSX element event binding.
 */

var eventHandlersByType = {
  clipboard: ['onCopy', 'onCut', 'onPaste'],
  composition: ['onCompositionEnd', 'onCompositionStart', 'onCompositionUpdate'],
  keyboard: ['onKeyDown', 'onKeyPress', 'onKeyUp'],
  focus: ['onFocus', 'onBlur'],
  form: ['onChange', 'onInput', 'onSubmit'],
  mouse: ['onClick', 'onContextMenu', 'onDblClick', 'onDoubleClick', 'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp'],
  selection: ['onSelect'],
  touch: ['onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart'],
  ui: ['onScroll'],
  wheel: ['onWheel'],
  media: ['onAbort', 'onCanPlay', 'onCanPlayThrough', 'onDurationChange', 'onEmptied', 'onEncrypted', 'onEnded', 'onError', 'onLoadedData', 'onLoadedMetadata', 'onLoadStart', 'onPause', 'onPlay', 'onPlaying', 'onProgress', 'onRateChange', 'onSeeked', 'onSeeking', 'onStalled', 'onSuspend', 'onTimeUpdate', 'onVolumeChange', 'onWaiting'],
  image: ['onLoad', 'onError'],
  animation: ['onAnimationStart', 'onAnimationEnd', 'onAnimationIteration'],
  transition: ['onTransitionEnd']
};

var eventHandlers = Object.keys(eventHandlersByType).reduce(function (accumulator, type) {
  return accumulator.concat(eventHandlersByType[type]);
}, []);

exports.default = eventHandlers;
exports.eventHandlersByType = eventHandlersByType;

/***/ }),
/* 595 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getProp;

var _propName = __webpack_require__(592);

var _propName2 = _interopRequireDefault(_propName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_OPTIONS = {
  ignoreCase: true
};

/**
 * Returns the JSXAttribute itself or undefined, indicating the prop
 * is not present on the JSXOpeningElement.
 *
 */
function getProp() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_OPTIONS;

  var propToFind = options.ignoreCase ? prop.toUpperCase() : prop;

  return props.find(function (attribute) {
    // If the props contain a spread prop, then skip.
    if (attribute.type === 'JSXSpreadAttribute') {
      return false;
    }

    var currentProp = options.ignoreCase ? (0, _propName2.default)(attribute).toUpperCase() : (0, _propName2.default)(attribute);

    return propToFind === currentProp;
  });
}

/***/ }),
/* 596 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPropValue;
exports.getLiteralPropValue = getLiteralPropValue;

var _values = __webpack_require__(597);

var _values2 = _interopRequireDefault(_values);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extractValue = function extractValue(attribute, extractor) {
  if (attribute && attribute.type === 'JSXAttribute') {
    if (attribute.value === null) {
      // Null valued attributes imply truthiness.
      // For example: <div aria-hidden />
      // See: https://facebook.github.io/react/docs/jsx-in-depth.html#boolean-attributes
      return true;
    }

    return extractor(attribute.value);
  }

  return undefined;
};

/**
 * Returns the value of a given attribute.
 * Different types of attributes have their associated
 * values in different properties on the object.
 *
 * This function should return the most *closely* associated
 * value with the intention of the JSX.
 *
 * @param attribute - The JSXAttribute collected by AST parser.
 */
function getPropValue(attribute) {
  return extractValue(attribute, _values2.default);
}

/**
 * Returns the value of a given attribute.
 * Different types of attributes have their associated
 * values in different properties on the object.
 *
 * This function should return a value only if we can extract
 * a literal value from its attribute (i.e. values that have generic
 * types in JavaScript - strings, numbers, booleans, etc.)
 *
 * @param attribute - The JSXAttribute collected by AST parser.
 */
function getLiteralPropValue(attribute) {
  return extractValue(attribute, _values.getLiteralValue);
}

/***/ }),
/* 597 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getValue;
exports.getLiteralValue = getLiteralValue;

var _Literal = __webpack_require__(598);

var _Literal2 = _interopRequireDefault(_Literal);

var _JSXElement = __webpack_require__(599);

var _JSXElement2 = _interopRequireDefault(_JSXElement);

var _expressions = __webpack_require__(600);

var _expressions2 = _interopRequireDefault(_expressions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Composition map of types to their extractor functions.
var TYPES = {
  Literal: _Literal2.default,
  JSXElement: _JSXElement2.default,
  JSXExpressionContainer: _expressions2.default
};

// Composition map of types to their extractor functions to handle literals.
var LITERAL_TYPES = Object.assign({}, TYPES, {
  JSXElement: function JSXElement() {
    return null;
  },
  JSXExpressionContainer: _expressions.extractLiteral
});

/**
 * This function maps an AST value node
 * to its correct extractor function for its
 * given type.
 *
 * This will map correctly for *all* possible types.
 *
 * @param value - AST Value object on a JSX Attribute.
 */
function getValue(value) {
  return TYPES[value.type](value);
}

/**
 * This function maps an AST value node
 * to its correct extractor function for its
 * given type.
 *
 * This will map correctly for *some* possible types that map to literals.
 *
 * @param value - AST Value object on a JSX Attribute.
 */
function getLiteralValue(value) {
  return LITERAL_TYPES[value.type](value);
}

/***/ }),
/* 598 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromLiteral;
/**
 * Extractor function for a Literal type value node.
 *
 * @param - value - AST Value object with type `Literal`
 * @returns { String|Boolean } - The extracted value converted to correct type.
 */
function extractValueFromLiteral(value) {
  var extractedValue = value.value;


  var normalizedStringValue = typeof extractedValue === 'string' && extractedValue.toLowerCase();
  if (normalizedStringValue === 'true') {
    return true;
  } else if (normalizedStringValue === 'false') {
    return false;
  }

  return extractedValue;
}

/***/ }),
/* 599 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromJSXElement;
/**
 * Extractor function for a JSXElement type value node.
 *
 * Returns self-closing element with correct name.
 */
function extractValueFromJSXElement(value) {
  return "<" + value.openingElement.name.name + " />";
}

/***/ }),
/* 600 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extract;
exports.extractLiteral = extractLiteral;

var _Literal = __webpack_require__(598);

var _Literal2 = _interopRequireDefault(_Literal);

var _JSXElement = __webpack_require__(599);

var _JSXElement2 = _interopRequireDefault(_JSXElement);

var _Identifier = __webpack_require__(601);

var _Identifier2 = _interopRequireDefault(_Identifier);

var _TaggedTemplateExpression = __webpack_require__(602);

var _TaggedTemplateExpression2 = _interopRequireDefault(_TaggedTemplateExpression);

var _TemplateLiteral = __webpack_require__(603);

var _TemplateLiteral2 = _interopRequireDefault(_TemplateLiteral);

var _FunctionExpression = __webpack_require__(604);

var _FunctionExpression2 = _interopRequireDefault(_FunctionExpression);

var _LogicalExpression = __webpack_require__(605);

var _LogicalExpression2 = _interopRequireDefault(_LogicalExpression);

var _MemberExpression = __webpack_require__(606);

var _MemberExpression2 = _interopRequireDefault(_MemberExpression);

var _CallExpression = __webpack_require__(607);

var _CallExpression2 = _interopRequireDefault(_CallExpression);

var _UnaryExpression = __webpack_require__(608);

var _UnaryExpression2 = _interopRequireDefault(_UnaryExpression);

var _ThisExpression = __webpack_require__(609);

var _ThisExpression2 = _interopRequireDefault(_ThisExpression);

var _ConditionalExpression = __webpack_require__(610);

var _ConditionalExpression2 = _interopRequireDefault(_ConditionalExpression);

var _BinaryExpression = __webpack_require__(611);

var _BinaryExpression2 = _interopRequireDefault(_BinaryExpression);

var _ObjectExpression = __webpack_require__(612);

var _ObjectExpression2 = _interopRequireDefault(_ObjectExpression);

var _NewExpression = __webpack_require__(613);

var _NewExpression2 = _interopRequireDefault(_NewExpression);

var _UpdateExpression = __webpack_require__(614);

var _UpdateExpression2 = _interopRequireDefault(_UpdateExpression);

var _ArrayExpression = __webpack_require__(615);

var _ArrayExpression2 = _interopRequireDefault(_ArrayExpression);

var _BindExpression = __webpack_require__(616);

var _BindExpression2 = _interopRequireDefault(_BindExpression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Composition map of types to their extractor functions.
var TYPES = {
  Identifier: _Identifier2.default,
  Literal: _Literal2.default,
  JSXElement: _JSXElement2.default,
  TaggedTemplateExpression: _TaggedTemplateExpression2.default,
  TemplateLiteral: _TemplateLiteral2.default,
  ArrowFunctionExpression: _FunctionExpression2.default,
  FunctionExpression: _FunctionExpression2.default,
  LogicalExpression: _LogicalExpression2.default,
  MemberExpression: _MemberExpression2.default,
  CallExpression: _CallExpression2.default,
  UnaryExpression: _UnaryExpression2.default,
  ThisExpression: _ThisExpression2.default,
  ConditionalExpression: _ConditionalExpression2.default,
  BinaryExpression: _BinaryExpression2.default,
  ObjectExpression: _ObjectExpression2.default,
  NewExpression: _NewExpression2.default,
  UpdateExpression: _UpdateExpression2.default,
  ArrayExpression: _ArrayExpression2.default,
  BindExpression: _BindExpression2.default
};

var noop = function noop() {
  return null;
};

// Composition map of types to their extractor functions to handle literals.
var LITERAL_TYPES = Object.assign({}, TYPES, {
  Literal: function Literal(value) {
    var extractedVal = TYPES.Literal.call(undefined, value);
    var isNull = extractedVal === null;
    // This will be convention for attributes that have null
    // value explicitly defined (<div prop={null} /> maps to 'null').
    return isNull ? 'null' : extractedVal;
  },
  Identifier: function Identifier(value) {
    var isUndefined = TYPES.Identifier.call(undefined, value) === undefined;
    return isUndefined ? undefined : null;
  },
  JSXElement: noop,
  ArrowFunctionExpression: noop,
  FunctionExpression: noop,
  LogicalExpression: noop,
  MemberExpression: noop,
  CallExpression: noop,
  UnaryExpression: function UnaryExpression(value) {
    var extractedVal = TYPES.UnaryExpression.call(undefined, value);
    return extractedVal === undefined ? null : extractedVal;
  },
  UpdateExpression: function UpdateExpression(value) {
    var extractedVal = TYPES.UpdateExpression.call(undefined, value);
    return extractedVal === undefined ? null : extractedVal;
  },
  ThisExpression: noop,
  ConditionalExpression: noop,
  BinaryExpression: noop,
  ObjectExpression: noop,
  NewExpression: noop,
  ArrayExpression: function ArrayExpression(value) {
    var extractedVal = TYPES.ArrayExpression.call(undefined, value);
    return extractedVal.filter(function (val) {
      return val !== null;
    });
  },
  BindExpression: noop
});

var errorMessage = function errorMessage(expression) {
  return 'The prop value with an expression type of ' + expression + ' could not be resolved.\n  Please file issue to get this fixed immediately.';
};

/**
 * This function maps an AST value node
 * to its correct extractor function for its
 * given type.
 *
 * This will map correctly for *all* possible expression types.
 *
 * @param - value - AST Value object with type `JSXExpressionContainer`
 * @returns The extracted value.
 */
function extract(value) {
  // Value will not have the expression property when we recurse.
  // The type for expression on ArrowFunctionExpression is a boolean.
  var expression = void 0;
  if (typeof value.expression !== 'boolean' && value.expression) {
    expression = value.expression;
  } else {
    expression = value;
  }
  var _expression = expression,
      type = _expression.type;


  if (TYPES[type] === undefined) {
    throw new Error(errorMessage(type));
  }

  return TYPES[type](expression);
}

/**
 * This function maps an AST value node
 * to its correct extractor function for its
 * given type.
 *
 * This will map correctly for *some* possible types that map to literals.
 *
 * @param - value - AST Value object with type `JSXExpressionContainer`
 * @returns The extracted value.
 */
function extractLiteral(value) {
  // Value will not have the expression property when we recurse.
  var expression = value.expression || value;
  var type = expression.type;


  if (LITERAL_TYPES[type] === undefined) {
    throw new Error(errorMessage(type));
  }

  return LITERAL_TYPES[type](expression);
}

/***/ }),
/* 601 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromIdentifier;
var JS_RESERVED = {
  Array: Array,
  Date: Date,
  Infinity: Infinity,
  Math: Math,
  Number: Number,
  Object: Object,
  String: String,
  undefined: undefined
};

/**
 * Extractor function for a Identifier type value node.
 * An Identifier is usually a reference to a variable.
 * Just return variable name to determine its existence.
 *
 * @param - value - AST Value object with type `Identifier`
 * @returns - The extracted value converted to correct type.
 */
function extractValueFromIdentifier(value) {
  var name = value.name;


  if (Object.hasOwnProperty.call(JS_RESERVED, name)) {
    return JS_RESERVED[name];
  }

  return name;
}

/***/ }),
/* 602 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromTaggedTemplateExpression;

var _TemplateLiteral = __webpack_require__(603);

var _TemplateLiteral2 = _interopRequireDefault(_TemplateLiteral);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the string value of a tagged template literal object.
 * Redirects the bulk of the work to `TemplateLiteral`.
 */
function extractValueFromTaggedTemplateExpression(value) {
  return (0, _TemplateLiteral2.default)(value.quasi);
}

/***/ }),
/* 603 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromTemplateLiteral;
/**
 * Returns the string value of a template literal object.
 * Tries to build it as best as it can based on the passed
 * prop. For instance `This is a ${prop}` will return 'This is a {prop}'.
 *
 * If the template literal builds to undefined (`${undefined}`), then
 * this should return "".
 */
function extractValueFromTemplateLiteral(value) {
  var quasis = value.quasis,
      expressions = value.expressions;

  var partitions = quasis.concat(expressions);

  return partitions.sort(function (a, b) {
    return a.start - b.start;
  }).reduce(function (raw, part) {
    var type = part.type;

    if (type === 'TemplateElement') {
      return raw + part.value.raw;
    } else if (type === 'Identifier') {
      return part.name === 'undefined' ? raw : raw + '{' + part.name + '}';
    } else if (type.indexOf('Expression') > -1) {
      return raw + '{' + type + '}';
    }

    return raw;
  }, '');
}

/***/ }),
/* 604 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromFunctionExpression;
/**
 * Extractor function for a FunctionExpression type value node.
 * Statically, we can't execute the given function, so just return a function
 * to indicate that the value is present.
 *
 * @param - value - AST Value object with type `FunctionExpression`
 * @returns - The extracted value converted to correct type.
 */
function extractValueFromFunctionExpression(value) {
  return function () {
    return value;
  };
}

/***/ }),
/* 605 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromLogicalExpression;

var _index = __webpack_require__(600);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Extractor function for a LogicalExpression type value node.
 * A logical expression is `a && b` or `a || b`, so we evaluate both sides
 * and return the extracted value of the expression.
 *
 * @param - value - AST Value object with type `LogicalExpression`
 * @returns - The extracted value converted to correct type.
 */
function extractValueFromLogicalExpression(value) {
  var operator = value.operator,
      left = value.left,
      right = value.right;

  var leftVal = (0, _index2.default)(left);
  var rightVal = (0, _index2.default)(right);

  return operator === '&&' ? leftVal && rightVal : leftVal || rightVal;
}

/***/ }),
/* 606 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromMemberExpression;

var _index = __webpack_require__(600);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Extractor function for a MemberExpression type value node.
 * A member expression is accessing a property on an object `obj.property`.
 *
 * @param - value - AST Value object with type `MemberExpression`
 * @returns - The extracted value converted to correct type
 *  and maintaing `obj.property` convention.
 */
function extractValueFromMemberExpression(value) {
  return (0, _index2.default)(value.object) + '.' + (0, _index2.default)(value.property);
}

/***/ }),
/* 607 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromCallExpression;

var _index = __webpack_require__(600);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Extractor function for a CallExpression type value node.
 * A call expression looks like `bar()`
 * This will return `bar` as the value to indicate its existence,
 * since we can not execute the function bar in a static environment.
 *
 * @param - value - AST Value object with type `CallExpression`
 * @returns - The extracted value converted to correct type.
 */
function extractValueFromCallExpression(value) {
  return (0, _index2.default)(value.callee);
}

/***/ }),
/* 608 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromUnaryExpression;

var _index = __webpack_require__(600);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Extractor function for a UnaryExpression type value node.
 * A unary expression is an expression with a unary operator.
 * For example, !"foobar" will evaluate to false, so this will return false.
 *
 * @param - value - AST Value object with type `UnaryExpression`
 * @returns - The extracted value converted to correct type.
 */
function extractValueFromUnaryExpression(value) {
  var operator = value.operator,
      argument = value.argument;


  switch (operator) {
    case '-':
      return -(0, _index2.default)(argument);
    case '+':
      return +(0, _index2.default)(argument); // eslint-disable-line no-implicit-coercion
    case '!':
      return !(0, _index2.default)(argument);
    case '~':
      return ~(0, _index2.default)(argument); // eslint-disable-line no-bitwise
    case 'delete':
      // I believe delete statements evaluate to true.
      return true;
    case 'typeof':
    case 'void':
    default:
      return undefined;
  }
}

/***/ }),
/* 609 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromThisExpression;
/**
 * Extractor function for a ThisExpression type value node.
 * A this expression is using `this` as an identifier.
 *
 * @returns - 'this' as a string.
 */
function extractValueFromThisExpression() {
  return 'this';
}

/***/ }),
/* 610 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromConditionalExpression;

var _index = __webpack_require__(600);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Extractor function for a ConditionalExpression type value node.
 *
 * @param - value - AST Value object with type `ConditionalExpression`
 * @returns - The extracted value converted to correct type.
 */
function extractValueFromConditionalExpression(value) {
  var test = value.test,
      alternate = value.alternate,
      consequent = value.consequent;


  return (0, _index2.default)(test) ? (0, _index2.default)(consequent) : (0, _index2.default)(alternate);
}

/***/ }),
/* 611 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromBinaryExpression;

var _index = __webpack_require__(600);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Extractor function for a BinaryExpression type value node.
 * A binary expression has a left and right side separated by an operator
 * such as `a + b`.
 *
 * @param - value - AST Value object with type `BinaryExpression`
 * @returns - The extracted value converted to correct type.
 */
function extractValueFromBinaryExpression(value) {
  var operator = value.operator,
      left = value.left,
      right = value.right;

  var leftVal = (0, _index2.default)(left);
  var rightVal = (0, _index2.default)(right);

  switch (operator) {
    case '==':
      return leftVal == rightVal; // eslint-disable-line
    case '!=':
      return leftVal != rightVal; // eslint-disable-line
    case '===':
      return leftVal === rightVal;
    case '!==':
      return leftVal !== rightVal;
    case '<':
      return leftVal < rightVal;
    case '<=':
      return leftVal <= rightVal;
    case '>':
      return leftVal > rightVal;
    case '>=':
      return leftVal >= rightVal;
    case '<<':
      return leftVal << rightVal; // eslint-disable-line no-bitwise
    case '>>':
      return leftVal >> rightVal; // eslint-disable-line no-bitwise
    case '>>>':
      return leftVal >>> rightVal; // eslint-disable-line no-bitwise
    case '+':
      return leftVal + rightVal;
    case '-':
      return leftVal - rightVal;
    case '*':
      return leftVal * rightVal;
    case '/':
      return leftVal / rightVal;
    case '%':
      return leftVal % rightVal;
    case '|':
      return leftVal | rightVal; // eslint-disable-line no-bitwise
    case '^':
      return leftVal ^ rightVal; // eslint-disable-line no-bitwise
    case '&':
      return leftVal & rightVal; // eslint-disable-line no-bitwise
    case 'in':
      try {
        return leftVal in rightVal;
      } catch (err) {
        return false;
      }
    case 'instanceof':
      if (typeof rightVal !== 'function') {
        return false;
      }
      return leftVal instanceof rightVal;
    default:
      return undefined;
  }
}

/***/ }),
/* 612 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromObjectExpression;

var _index = __webpack_require__(600);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Extractor function for an ObjectExpression type value node.
 * An object expression is using {}.
 *
 * @returns - a representation of the object
 */
function extractValueFromObjectExpression(value) {
  return value.properties.reduce(function (obj, property) {
    var object = Object.assign({}, obj);
    object[(0, _index2.default)(property.key)] = (0, _index2.default)(property.value);
    return object;
  }, {});
}

/***/ }),
/* 613 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromNewExpression;
/**
 * Extractor function for a NewExpression type value node.
 * A new expression instantiates an object with `new` keyword.
 *
 * @returns - an empty object.
 */
function extractValueFromNewExpression() {
  return new Object(); // eslint-disable-line
}

/***/ }),
/* 614 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromUpdateExpression;

var _index = __webpack_require__(600);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Extractor function for an UpdateExpression type value node.
 * An update expression is an expression with an update operator.
 * For example, foo++ will evaluate to foo + 1.
 *
 * @param - value - AST Value object with type `UpdateExpression`
 * @returns - The extracted value converted to correct type.
 */
function extractValueFromUpdateExpression(value) {
  var operator = value.operator,
      argument = value.argument,
      prefix = value.prefix;


  var val = (0, _index2.default)(argument);

  switch (operator) {
    case '++':
      return prefix ? ++val : val++; // eslint-disable-line no-plusplus
    case '--':
      return prefix ? --val : val--; // eslint-disable-line no-plusplus
    default:
      return undefined;
  }
}

/***/ }),
/* 615 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromArrayExpression;

var _index = __webpack_require__(600);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Extractor function for an ArrayExpression type value node.
 * An array expression is an expression with [] syntax.
 *
 * @returns - An array of the extracted elements.
 */
function extractValueFromArrayExpression(value) {
  return value.elements.map(function (element) {
    return (0, _index2.default)(element);
  });
}

/***/ }),
/* 616 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromBindExpression;

var _index = __webpack_require__(600);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Extractor function for a BindExpression type value node.
 * A bind expression looks like `::this.foo`
 * This will return `this.foo.bind(this)` as the value to indicate its existence,
 * since we can not execute the function this.foo.bind(this) in a static environment.
 *
 * @param - value - AST Value object with type `BindExpression`
 * @returns - The extracted value converted to correct type.
 */
function extractValueFromBindExpression(value) {
  // console.log(value);
  var callee = (0, _index2.default)(value.callee);

  // If value.object === null, the callee must be a MemberExpression.
  // https://github.com/babel/babylon/blob/master/ast/spec.md#bindexpression
  var object = value.object === null ? (0, _index2.default)(value.callee.object) : (0, _index2.default)(value.object);

  if (value.object && value.object.property) {
    return object + '.' + callee + '.bind(' + object + ')';
  }

  return callee + '.bind(' + object + ')';
}

/***/ }),
/* 617 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(590).getLiteralPropValue; // eslint-disable-line import/no-unresolved


/***/ }),
/* 618 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileOverview Enforce all defaultProps are defined in propTypes
 * @author Vitor Balocco
 * @author Roy Sutton
 */


const has = __webpack_require__(574);
const Components = __webpack_require__(578);
const variableUtil = __webpack_require__(579);
const annotations = __webpack_require__(583);
const astUtil = __webpack_require__(581);
const propsUtil = __webpack_require__(584);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce all defaultProps are defined and not "required" in propTypes.',
      category: 'Best Practices',
      url: docsUrl('default-props-match-prop-types')
    },

    schema: [{
      type: 'object',
      properties: {
        allowRequiredDefaults: {
          default: false,
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components, utils) => {
    const configuration = context.options[0] || {};
    const allowRequiredDefaults = configuration.allowRequiredDefaults || false;
    const propWrapperFunctions = new Set(context.settings.propWrapperFunctions || []);
    // Used to track the type annotations in scope.
    // Necessary because babel's scopes do not track type annotations.
    let stack = null;

    /**
     * Try to resolve the node passed in to a variable in the current scope. If the node passed in is not
     * an Identifier, then the node is simply returned.
     * @param   {ASTNode} node The node to resolve.
     * @returns {ASTNode|null} Return null if the value could not be resolved, ASTNode otherwise.
     */
    function resolveNodeValue(node) {
      if (node.type === 'Identifier') {
        return variableUtil.findVariableByName(context, node.name);
      }
      if (
        node.type === 'CallExpression' &&
        propWrapperFunctions.has(node.callee.name) &&
        node.arguments && node.arguments[0]
      ) {
        return resolveNodeValue(node.arguments[0]);
      }
      return node;
    }

    /**
     * Helper for accessing the current scope in the stack.
     * @param {string} key The name of the identifier to access. If omitted, returns the full scope.
     * @param {ASTNode} value If provided sets the new value for the identifier.
     * @returns {Object|ASTNode} Either the whole scope or the ASTNode associated with the given identifier.
     */
    function typeScope(key, value) {
      if (arguments.length === 0) {
        return stack[stack.length - 1];
      } else if (arguments.length === 1) {
        return stack[stack.length - 1][key];
      }
      stack[stack.length - 1][key] = value;
      return value;
    }

    /**
     * Tries to find the definition of a GenericTypeAnnotation in the current scope.
     * @param  {ASTNode}      node The node GenericTypeAnnotation node to resolve.
     * @return {ASTNode|null}      Return null if definition cannot be found, ASTNode otherwise.
     */
    function resolveGenericTypeAnnotation(node) {
      if (node.type !== 'GenericTypeAnnotation' || node.id.type !== 'Identifier') {
        return null;
      }

      return variableUtil.findVariableByName(context, node.id.name) || typeScope(node.id.name);
    }

    function resolveUnionTypeAnnotation(node) {
      // Go through all the union and resolve any generic types.
      return node.types.map(annotation => {
        if (annotation.type === 'GenericTypeAnnotation') {
          return resolveGenericTypeAnnotation(annotation);
        }

        return annotation;
      });
    }

    /**
     * Extracts a PropType from an ObjectExpression node.
     * @param   {ASTNode} objectExpression ObjectExpression node.
     * @returns {Object[]}        Array of PropType object representations, to be consumed by `addPropTypesToComponent`.
     */
    function getPropTypesFromObjectExpression(objectExpression) {
      const props = objectExpression.properties.filter(property => property.type !== 'ExperimentalSpreadProperty' && property.type !== 'SpreadElement');

      return props.map(property => ({
        name: property.key.name,
        isRequired: propsUtil.isRequiredPropType(property.value),
        node: property
      }));
    }

    /**
     * Handles Props defined in IntersectionTypeAnnotation nodes
     * e.g. type Props = PropsA & PropsB
     * @param   {ASTNode} intersectionTypeAnnotation ObjectExpression node.
     * @returns {Object[]}
     */
    function getPropertiesFromIntersectionTypeAnnotationNode(annotation) {
      return annotation.types.reduce((properties, type) => {
        annotation = resolveGenericTypeAnnotation(type);

        if (annotation && annotation.id) {
          annotation = variableUtil.findVariableByName(context, annotation.id.name);
        }

        if (!annotation || !annotation.properties) {
          return properties;
        }

        return properties.concat(annotation.properties);
      }, []);
    }

    /**
     * Extracts a PropType from a TypeAnnotation node.
     * @param   {ASTNode} node TypeAnnotation node.
     * @returns {Object[]}     Array of PropType object representations, to be consumed by `addPropTypesToComponent`.
     */
    function getPropTypesFromTypeAnnotation(node) {
      let properties = [];

      switch (node.typeAnnotation.type) {
        case 'GenericTypeAnnotation':
          let annotation = resolveGenericTypeAnnotation(node.typeAnnotation);

          if (annotation && annotation.type === 'IntersectionTypeAnnotation') {
            properties = getPropertiesFromIntersectionTypeAnnotationNode(annotation);
          } else {
            if (annotation && annotation.id) {
              annotation = variableUtil.findVariableByName(context, annotation.id.name);
            }

            properties = annotation ? (annotation.properties || []) : [];
          }

          break;

        case 'UnionTypeAnnotation':
          const union = resolveUnionTypeAnnotation(node.typeAnnotation);
          properties = union.reduce((acc, curr) => {
            if (!curr) {
              return acc;
            }

            return acc.concat(curr.properties);
          }, []);
          break;

        case 'ObjectTypeAnnotation':
          properties = node.typeAnnotation.properties;
          break;

        default:
          properties = [];
          break;
      }

      const props = properties.filter(property => property.type === 'ObjectTypeProperty');

      return props.map(property => {
        // the `key` property is not present in ObjectTypeProperty nodes, so we need to get the key name manually.
        const tokens = context.getFirstTokens(property, 1);
        const name = tokens[0].value;

        return {
          name: name,
          isRequired: !property.optional,
          node: property
        };
      });
    }

    /**
     * Extracts a DefaultProp from an ObjectExpression node.
     * @param   {ASTNode} objectExpression ObjectExpression node.
     * @returns {Object|string}            Object representation of a defaultProp, to be consumed by
     *                                     `addDefaultPropsToComponent`, or string "unresolved", if the defaultProps
     *                                     from this ObjectExpression can't be resolved.
     */
    function getDefaultPropsFromObjectExpression(objectExpression) {
      const hasSpread = objectExpression.properties.find(property => property.type === 'ExperimentalSpreadProperty' || property.type === 'SpreadElement');

      if (hasSpread) {
        return 'unresolved';
      }

      return objectExpression.properties.map(defaultProp => ({
        name: defaultProp.key.name,
        node: defaultProp
      }));
    }

    /**
     * Marks a component's DefaultProps declaration as "unresolved". A component's DefaultProps is
     * marked as "unresolved" if we cannot safely infer the values of its defaultProps declarations
     * without risking false negatives.
     * @param   {Object} component The component to mark.
     * @returns {void}
     */
    function markDefaultPropsAsUnresolved(component) {
      components.set(component.node, {
        defaultProps: 'unresolved'
      });
    }

    /**
     * Adds propTypes to the component passed in.
     * @param   {ASTNode}  component The component to add the propTypes to.
     * @param   {Object[]} propTypes propTypes to add to the component.
     * @returns {void}
     */
    function addPropTypesToComponent(component, propTypes) {
      const props = component.propTypes || [];

      components.set(component.node, {
        propTypes: props.concat(propTypes)
      });
    }

    /**
     * Adds defaultProps to the component passed in.
     * @param   {ASTNode}         component    The component to add the defaultProps to.
     * @param   {String[]|String} defaultProps defaultProps to add to the component or the string "unresolved"
     *                                         if this component has defaultProps that can't be resolved.
     * @returns {void}
     */
    function addDefaultPropsToComponent(component, defaultProps) {
      // Early return if this component's defaultProps is already marked as "unresolved".
      if (component.defaultProps === 'unresolved') {
        return;
      }

      if (defaultProps === 'unresolved') {
        markDefaultPropsAsUnresolved(component);
        return;
      }

      const defaults = component.defaultProps || [];

      components.set(component.node, {
        defaultProps: defaults.concat(defaultProps)
      });
    }

    /**
     * Tries to find a props type annotation in a stateless component.
     * @param  {ASTNode} node The AST node to look for a props type annotation.
     * @return {void}
     */
    function handleStatelessComponent(node) {
      if (!node.params || !node.params.length || !annotations.isAnnotatedFunctionPropsDeclaration(node, context)) {
        return;
      }

      // find component this props annotation belongs to
      const component = components.get(utils.getParentStatelessComponent());
      if (!component) {
        return;
      }

      addPropTypesToComponent(component, getPropTypesFromTypeAnnotation(node.params[0].typeAnnotation, context));
    }

    function handlePropTypeAnnotationClassProperty(node) {
      // find component this props annotation belongs to
      const component = components.get(utils.getParentES6Component());
      if (!component) {
        return;
      }
      addPropTypesToComponent(component, getPropTypesFromTypeAnnotation(node.typeAnnotation, context));
    }

    function isPropTypeAnnotation(node) {
      return (astUtil.getPropertyName(node) === 'props' && !!node.typeAnnotation);
    }

    function propFromName(propTypes, name) {
      return propTypes.find(prop => prop.name === name);
    }

    /**
     * Reports all defaultProps passed in that don't have an appropriate propTypes counterpart.
     * @param  {Object[]} propTypes    Array of propTypes to check.
     * @param  {Object}   defaultProps Object of defaultProps to check. Keys are the props names.
     * @return {void}
     */
    function reportInvalidDefaultProps(propTypes, defaultProps) {
      // If this defaultProps is "unresolved" or the propTypes is undefined, then we should ignore
      // this component and not report any errors for it, to avoid false-positives with e.g.
      // external defaultProps/propTypes declarations or spread operators.
      if (defaultProps === 'unresolved' || !propTypes) {
        return;
      }

      defaultProps.forEach(defaultProp => {
        const prop = propFromName(propTypes, defaultProp.name);

        if (prop && (allowRequiredDefaults || !prop.isRequired)) {
          return;
        }

        if (prop) {
          context.report(
            defaultProp.node,
            'defaultProp "{{name}}" defined for isRequired propType.',
            {name: defaultProp.name}
          );
        } else {
          context.report(
            defaultProp.node,
            'defaultProp "{{name}}" has no corresponding propTypes declaration.',
            {name: defaultProp.name}
          );
        }
      });
    }

    // --------------------------------------------------------------------------
    // Public API
    // --------------------------------------------------------------------------

    return {
      MemberExpression: function(node) {
        const isPropType = propsUtil.isPropTypesDeclaration(node);
        const isDefaultProp = propsUtil.isDefaultPropsDeclaration(node);

        if (!isPropType && !isDefaultProp) {
          return;
        }

        // find component this propTypes/defaultProps belongs to
        const component = utils.getRelatedComponent(node);
        if (!component) {
          return;
        }

        // e.g.:
        // MyComponent.propTypes = {
        //   foo: React.PropTypes.string.isRequired,
        //   bar: React.PropTypes.string
        // };
        //
        // or:
        //
        // MyComponent.propTypes = myPropTypes;
        if (node.parent.type === 'AssignmentExpression') {
          const expression = resolveNodeValue(node.parent.right);
          if (!expression || expression.type !== 'ObjectExpression') {
            // If a value can't be found, we mark the defaultProps declaration as "unresolved", because
            // we should ignore this component and not report any errors for it, to avoid false-positives
            // with e.g. external defaultProps declarations.
            if (isDefaultProp) {
              markDefaultPropsAsUnresolved(component);
            }

            return;
          }

          if (isPropType) {
            addPropTypesToComponent(component, getPropTypesFromObjectExpression(expression));
          } else {
            addDefaultPropsToComponent(component, getDefaultPropsFromObjectExpression(expression));
          }

          return;
        }

        // e.g.:
        // MyComponent.propTypes.baz = React.PropTypes.string;
        if (node.parent.type === 'MemberExpression' && node.parent.parent &&
          node.parent.parent.type === 'AssignmentExpression') {
          if (isPropType) {
            addPropTypesToComponent(component, [{
              name: node.parent.property.name,
              isRequired: propsUtil.isRequiredPropType(node.parent.parent.right),
              node: node.parent.parent
            }]);
          } else {
            addDefaultPropsToComponent(component, [{
              name: node.parent.property.name,
              node: node.parent.parent
            }]);
          }

          return;
        }
      },

      // e.g.:
      // class Hello extends React.Component {
      //   static get propTypes() {
      //     return {
      //       name: React.PropTypes.string
      //     };
      //   }
      //   static get defaultProps() {
      //     return {
      //       name: 'Dean'
      //     };
      //   }
      //   render() {
      //     return <div>Hello {this.props.name}</div>;
      //   }
      // }
      MethodDefinition: function(node) {
        if (!node.static || node.kind !== 'get') {
          return;
        }

        const isPropType = propsUtil.isPropTypesDeclaration(node);
        const isDefaultProp = propsUtil.isDefaultPropsDeclaration(node);

        if (!isPropType && !isDefaultProp) {
          return;
        }

        // find component this propTypes/defaultProps belongs to
        const component = components.get(utils.getParentES6Component());
        if (!component) {
          return;
        }

        const returnStatement = utils.findReturnStatement(node);
        if (!returnStatement) {
          return;
        }

        const expression = resolveNodeValue(returnStatement.argument);
        if (!expression || expression.type !== 'ObjectExpression') {
          return;
        }

        if (isPropType) {
          addPropTypesToComponent(component, getPropTypesFromObjectExpression(expression));
        } else {
          addDefaultPropsToComponent(component, getDefaultPropsFromObjectExpression(expression));
        }
      },

      // e.g.:
      // class Greeting extends React.Component {
      //   render() {
      //     return (
      //       <h1>Hello, {this.props.foo} {this.props.bar}</h1>
      //     );
      //   }
      //   static propTypes = {
      //     foo: React.PropTypes.string,
      //     bar: React.PropTypes.string.isRequired
      //   };
      // }
      ClassProperty: function(node) {
        if (isPropTypeAnnotation(node)) {
          handlePropTypeAnnotationClassProperty(node);
          return;
        }

        if (!node.static) {
          return;
        }

        if (!node.value) {
          return;
        }

        const propName = astUtil.getPropertyName(node);
        const isPropType = propName === 'propTypes';
        const isDefaultProp = propName === 'defaultProps' || propName === 'getDefaultProps';

        if (!isPropType && !isDefaultProp) {
          return;
        }

        // find component this propTypes/defaultProps belongs to
        const component = components.get(utils.getParentES6Component());
        if (!component) {
          return;
        }

        const expression = resolveNodeValue(node.value);
        if (!expression || expression.type !== 'ObjectExpression') {
          return;
        }

        if (isPropType) {
          addPropTypesToComponent(component, getPropTypesFromObjectExpression(expression));
        } else {
          addDefaultPropsToComponent(component, getDefaultPropsFromObjectExpression(expression));
        }
      },

      // e.g.:
      // React.createClass({
      //   render: function() {
      //     return <div>{this.props.foo}</div>;
      //   },
      //   propTypes: {
      //     foo: React.PropTypes.string.isRequired,
      //   },
      //   getDefaultProps: function() {
      //     return {
      //       foo: 'default'
      //     };
      //   }
      // });
      ObjectExpression: function(node) {
        // find component this propTypes/defaultProps belongs to
        const component = utils.isES5Component(node) && components.get(node);
        if (!component) {
          return;
        }

        // Search for the proptypes declaration
        node.properties.forEach(property => {
          if (property.type === 'ExperimentalSpreadProperty' || property.type === 'SpreadElement') {
            return;
          }

          const isPropType = propsUtil.isPropTypesDeclaration(property);
          const isDefaultProp = propsUtil.isDefaultPropsDeclaration(property);

          if (!isPropType && !isDefaultProp) {
            return;
          }

          if (isPropType && property.value.type === 'ObjectExpression') {
            addPropTypesToComponent(component, getPropTypesFromObjectExpression(property.value));
            return;
          }

          if (isDefaultProp && property.value.type === 'FunctionExpression') {
            const returnStatement = utils.findReturnStatement(property);
            if (!returnStatement || returnStatement.argument.type !== 'ObjectExpression') {
              return;
            }

            addDefaultPropsToComponent(component, getDefaultPropsFromObjectExpression(returnStatement.argument));
          }
        });
      },

      TypeAlias: function(node) {
        typeScope(node.id.name, node.right);
      },

      Program: function() {
        stack = [{}];
      },

      BlockStatement: function () {
        stack.push(Object.create(typeScope()));
      },

      'BlockStatement:exit': function () {
        stack.pop();
      },

      // Check for type annotations in stateless components
      FunctionDeclaration: handleStatelessComponent,
      ArrowFunctionExpression: handleStatelessComponent,
      FunctionExpression: handleStatelessComponent,

      'Program:exit': function() {
        stack = null;
        const list = components.list();

        for (const component in list) {
          if (!has(list, component)) {
            continue;
          }

          // If no defaultProps could be found, we don't report anything.
          if (!list[component].defaultProps) {
            return;
          }

          reportInvalidDefaultProps(
            list[component].propTypes,
            list[component].defaultProps || {}
          );
        }
      }
    };
  })
};


/***/ }),
/* 619 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce consistent usage of destructuring assignment of props, state, and context.
 **/


const Components = __webpack_require__(578);
const docsUrl = __webpack_require__(587);

const DEFAULT_OPTION = 'always';

module.exports = {
  meta: {
    docs: {
      description: 'Enforce consistent usage of destructuring assignment of props, state, and context',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('destructuring-assignment')
    },
    schema: [{
      type: 'string',
      enum: [
        'always',
        'never'
      ]
    }, {
      type: 'object',
      properties: {
        ignoreClassFields: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components, utils) => {
    const configuration = context.options[0] || DEFAULT_OPTION;
    const ignoreClassFields = context.options[1] && context.options[1].ignoreClassFields === true || false;

    /**
    * Checks if a prop is being assigned a value props.bar = 'bar'
    * @param {ASTNode} node The AST node being checked.
    * @returns {Boolean}
    */

    function isAssignmentToProp(node) {
      return (
        node.parent &&
        node.parent.type === 'AssignmentExpression' &&
        node.parent.left === node
      );
    }
    /**
     * @param {ASTNode} node We expect either an ArrowFunctionExpression,
     *   FunctionDeclaration, or FunctionExpression
     */
    function handleStatelessComponent(node) {
      const destructuringProps = node.params && node.params[0] && node.params[0].type === 'ObjectPattern';
      const destructuringContext = node.params && node.params[1] && node.params[1].type === 'ObjectPattern';

      if (destructuringProps && components.get(node) && configuration === 'never') {
        context.report({
          node: node,
          message: 'Must never use destructuring props assignment in SFC argument'
        });
      } else if (destructuringContext && components.get(node) && configuration === 'never') {
        context.report({
          node: node,
          message: 'Must never use destructuring context assignment in SFC argument'
        });
      }
    }

    function handleSFCUsage(node) {
      // props.aProp || context.aProp
      const isPropUsed = (node.object.name === 'props' || node.object.name === 'context') && !isAssignmentToProp(node);
      if (isPropUsed && configuration === 'always') {
        context.report({
          node: node,
          message: `Must use destructuring ${node.object.name} assignment`
        });
      }
    }

    function handleClassUsage(node) {
      // this.props.Aprop || this.context.aProp || this.state.aState
      const isPropUsed = (
        node.object.type === 'MemberExpression' && node.object.object.type === 'ThisExpression' &&
        (node.object.property.name === 'props' || node.object.property.name === 'context' || node.object.property.name === 'state') &&
        !isAssignmentToProp(node)
      );

      if (
        isPropUsed && configuration === 'always' &&
        !(ignoreClassFields && node.parent.type === 'ClassProperty')
      ) {
        context.report({
          node: node,
          message: `Must use destructuring ${node.object.property.name} assignment`
        });
      }
    }

    return {

      FunctionDeclaration: handleStatelessComponent,

      ArrowFunctionExpression: handleStatelessComponent,

      FunctionExpression: handleStatelessComponent,

      MemberExpression: function(node) {
        const SFCComponent = components.get(context.getScope(node).block);
        const classComponent = utils.getParentComponent(node);
        if (SFCComponent) {
          handleSFCUsage(node);
        }
        if (classComponent) {
          handleClassUsage(node, classComponent);
        }
      },

      VariableDeclarator: function(node) {
        const classComponent = utils.getParentComponent(node);
        const SFCComponent = components.get(context.getScope(node).block);

        const destructuring = (node.init && node.id && node.id.type === 'ObjectPattern');
        // let {foo} = props;
        const destructuringSFC = destructuring && (node.init.name === 'props' || node.init.name === 'context');
        // let {foo} = this.props;
        const destructuringClass = destructuring && node.init.object && node.init.object.type === 'ThisExpression' && (
          node.init.property.name === 'props' || node.init.property.name === 'context' || node.init.property.name === 'state'
        );

        if (SFCComponent && destructuringSFC && configuration === 'never') {
          context.report({
            node: node,
            message: `Must never use destructuring ${node.init.name} assignment`
          });
        }

        if (
          classComponent && destructuringClass && configuration === 'never' &&
          !(ignoreClassFields && node.parent.type === 'ClassProperty')
        ) {
          context.report({
            node: node,
            message: `Must never use destructuring ${node.init.property.name} assignment`
          });
        }
      }
    };
  })
};


/***/ }),
/* 620 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent missing displayName in a React component definition
 * @author Yannick Croissant
 */


const has = __webpack_require__(574);
const Components = __webpack_require__(578);
const astUtil = __webpack_require__(581);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent missing displayName in a React component definition',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('display-name')
    },

    schema: [{
      type: 'object',
      properties: {
        ignoreTranspilerName: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components, utils) => {
    const config = context.options[0] || {};
    const ignoreTranspilerName = config.ignoreTranspilerName || false;

    const MISSING_MESSAGE = 'Component definition is missing display name';

    /**
     * Checks if we are declaring a display name
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if we are declaring a display name, false if not.
     */
    function isDisplayNameDeclaration(node) {
      switch (node.type) {
        case 'ClassProperty':
          return node.key && node.key.name === 'displayName';
        case 'Identifier':
          return node.name === 'displayName';
        case 'Literal':
          return node.value === 'displayName';
        default:
          return false;
      }
    }

    /**
     * Mark a prop type as declared
     * @param {ASTNode} node The AST node being checked.
     */
    function markDisplayNameAsDeclared(node) {
      components.set(node, {
        hasDisplayName: true
      });
    }

    /**
     * Reports missing display name for a given component
     * @param {Object} component The component to process
     */
    function reportMissingDisplayName(component) {
      context.report({
        node: component.node,
        message: MISSING_MESSAGE,
        data: {
          component: component.name
        }
      });
    }

    /**
     * Checks if the component have a name set by the transpiler
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if component has a name, false if not.
     */
    function hasTranspilerName(node) {
      const namedObjectAssignment = (
        node.type === 'ObjectExpression' &&
        node.parent &&
        node.parent.parent &&
        node.parent.parent.type === 'AssignmentExpression' &&
        (
          !node.parent.parent.left.object ||
          node.parent.parent.left.object.name !== 'module' ||
          node.parent.parent.left.property.name !== 'exports'
        )
      );
      const namedObjectDeclaration = (
        node.type === 'ObjectExpression' &&
        node.parent &&
        node.parent.parent &&
        node.parent.parent.type === 'VariableDeclarator'
      );
      const namedClass = (
        (node.type === 'ClassDeclaration' || node.type === 'ClassExpression') &&
        node.id &&
        node.id.name
      );

      const namedFunctionDeclaration = (
        (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') &&
        node.id &&
        node.id.name
      );

      const namedFunctionExpression = (
        astUtil.isFunctionLikeExpression(node) &&
        node.parent &&
        (node.parent.type === 'VariableDeclarator' || node.parent.method === true) &&
        (!node.parent.parent || !utils.isES5Component(node.parent.parent))
      );

      if (
        namedObjectAssignment || namedObjectDeclaration ||
        namedClass ||
        namedFunctionDeclaration || namedFunctionExpression
      ) {
        return true;
      }
      return false;
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {

      ClassProperty: function(node) {
        if (!isDisplayNameDeclaration(node)) {
          return;
        }
        markDisplayNameAsDeclared(node);
      },

      MemberExpression: function(node) {
        if (!isDisplayNameDeclaration(node.property)) {
          return;
        }
        const component = utils.getRelatedComponent(node);
        if (!component) {
          return;
        }
        markDisplayNameAsDeclared(component.node);
      },

      FunctionExpression: function(node) {
        if (ignoreTranspilerName || !hasTranspilerName(node)) {
          return;
        }
        markDisplayNameAsDeclared(node);
      },

      FunctionDeclaration: function(node) {
        if (ignoreTranspilerName || !hasTranspilerName(node)) {
          return;
        }
        markDisplayNameAsDeclared(node);
      },

      ArrowFunctionExpression: function(node) {
        if (ignoreTranspilerName || !hasTranspilerName(node)) {
          return;
        }
        markDisplayNameAsDeclared(node);
      },

      MethodDefinition: function(node) {
        if (!isDisplayNameDeclaration(node.key)) {
          return;
        }
        markDisplayNameAsDeclared(node);
      },

      ClassExpression: function(node) {
        if (ignoreTranspilerName || !hasTranspilerName(node)) {
          return;
        }
        markDisplayNameAsDeclared(node);
      },

      ClassDeclaration: function(node) {
        if (ignoreTranspilerName || !hasTranspilerName(node)) {
          return;
        }
        markDisplayNameAsDeclared(node);
      },

      ObjectExpression: function(node) {
        if (ignoreTranspilerName || !hasTranspilerName(node)) {
          // Search for the displayName declaration
          node.properties.forEach(property => {
            if (!property.key || !isDisplayNameDeclaration(property.key)) {
              return;
            }
            markDisplayNameAsDeclared(node);
          });
          return;
        }
        markDisplayNameAsDeclared(node);
      },

      'Program:exit': function() {
        const list = components.list();
        // Report missing display name for all components
        for (const component in list) {
          if (!has(list, component) || list[component].hasDisplayName) {
            continue;
          }
          reportMissingDisplayName(list[component]);
        }
      }
    };
  })
};


/***/ }),
/* 621 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Forbid certain props on components
 * @author Joe Lencioni
 */


const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DEFAULTS = ['className', 'style'];

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Forbid certain props on components',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('forbid-component-props')
    },

    schema: [{
      type: 'object',
      properties: {
        forbid: {
          type: 'array',
          items: {
            oneOf: [{
              type: 'string'
            }, {
              type: 'object',
              properties: {
                propName: {
                  type: 'string'
                },
                allowedFor: {
                  type: 'array',
                  uniqueItems: true,
                  items: {
                    type: 'string'
                  }
                }
              }
            }]
          }
        }
      }
    }]
  },

  create: function(context) {
    const configuration = context.options[0] || {};
    const forbid = new Map((configuration.forbid || DEFAULTS).map(value => {
      const propName = typeof value === 'string' ? value : value.propName;
      const whitelist = typeof value === 'string' ? [] : (value.allowedFor || []);
      return [propName, whitelist];
    }));

    function isForbidden(prop, tagName) {
      const whitelist = forbid.get(prop);
      // if the tagName is undefined (`<this.something>`), we assume it's a forbidden element
      return typeof whitelist !== 'undefined' && (typeof tagName === 'undefined' || whitelist.indexOf(tagName) === -1);
    }

    return {
      JSXAttribute: function(node) {
        const tag = node.parent.name.name;
        if (tag && tag[0] !== tag[0].toUpperCase()) {
          // This is a DOM node, not a Component, so exit.
          return;
        }

        const prop = node.name.name;

        if (!isForbidden(prop, tag)) {
          return;
        }

        context.report({
          node: node,
          message: `Prop \`${prop}\` is forbidden on Components`
        });
      }
    };
  }
};


/***/ }),
/* 622 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Forbid certain props on DOM Nodes
 * @author David Vázquez
 */


const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DEFAULTS = [];

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Forbid certain props on DOM Nodes',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('forbid-dom-props')
    },

    schema: [{
      type: 'object',
      properties: {
        forbid: {
          type: 'array',
          items: {
            type: 'string',
            minLength: 1
          },
          uniqueItems: true
        }
      },
      additionalProperties: false
    }]
  },

  create: function(context) {
    function isForbidden(prop) {
      const configuration = context.options[0] || {};

      const forbid = configuration.forbid || DEFAULTS;
      return forbid.indexOf(prop) >= 0;
    }

    return {
      JSXAttribute: function(node) {
        const tag = node.parent.name.name;
        if (!(tag && tag[0] !== tag[0].toUpperCase())) {
          // This is a Component, not  a DOM node, so exit.
          return;
        }

        const prop = node.name.name;

        if (!isForbidden(prop)) {
          return;
        }

        context.report({
          node: node,
          message: `Prop \`${prop}\` is forbidden on DOM Nodes`
        });
      }
    };
  }
};


/***/ }),
/* 623 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Forbid certain elements
 * @author Kenneth Chung
 */


const has = __webpack_require__(574);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Forbid certain elements',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('forbid-elements')
    },

    schema: [{
      type: 'object',
      properties: {
        forbid: {
          type: 'array',
          items: {
            anyOf: [
              {type: 'string'},
              {
                type: 'object',
                properties: {
                  element: {type: 'string'},
                  message: {type: 'string'}
                },
                required: ['element'],
                additionalProperties: false
              }
            ]
          }
        }
      },
      additionalProperties: false
    }]
  },

  create: function(context) {
    const sourceCode = context.getSourceCode();
    const configuration = context.options[0] || {};
    const forbidConfiguration = configuration.forbid || [];

    const indexedForbidConfigs = {};

    forbidConfiguration.forEach(item => {
      if (typeof item === 'string') {
        indexedForbidConfigs[item] = {element: item};
      } else {
        indexedForbidConfigs[item.element] = item;
      }
    });

    function errorMessageForElement(name) {
      const message = `<${name}> is forbidden`;
      const additionalMessage = indexedForbidConfigs[name].message;

      if (additionalMessage) {
        return `${message}, ${additionalMessage}`;
      }

      return message;
    }

    function isValidCreateElement(node) {
      return node.callee
        && node.callee.type === 'MemberExpression'
        && node.callee.object.name === 'React'
        && node.callee.property.name === 'createElement'
        && node.arguments.length > 0;
    }

    function reportIfForbidden(element, node) {
      if (has(indexedForbidConfigs, element)) {
        context.report({
          node: node,
          message: errorMessageForElement(element)
        });
      }
    }

    return {
      JSXOpeningElement: function(node) {
        reportIfForbidden(sourceCode.getText(node.name), node.name);
      },

      CallExpression: function(node) {
        if (!isValidCreateElement(node)) {
          return;
        }

        const argument = node.arguments[0];
        const argType = argument.type;

        if (argType === 'Identifier' && /^[A-Z_]/.test(argument.name)) {
          reportIfForbidden(argument.name, argument);
        } else if (argType === 'Literal' && /^[a-z][^\.]*$/.test(argument.value)) {
          reportIfForbidden(argument.value, argument);
        } else if (argType === 'MemberExpression') {
          reportIfForbidden(sourceCode.getText(argument), argument);
        }
      }
    };
  }
};


/***/ }),
/* 624 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Forbid using another component's propTypes
 * @author Ian Christian Myers
 */


const docsUrl = __webpack_require__(587);

module.exports = {
  meta: {
    docs: {
      description: 'Forbid using another component\'s propTypes',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('forbid-foreign-prop-types')
    },

    schema: [
      {
        type: 'object',
        properties: {
          allowInPropTypes: {
            type: 'boolean'
          }
        },
        additionalProperties: false
      }
    ]
  },

  create: function(context) {
    const config = context.options[0] || {};
    const allowInPropTypes = config.allowInPropTypes || false;

    // --------------------------------------------------------------------------
    // Helpers
    // --------------------------------------------------------------------------

    function isLeftSideOfAssignment(node) {
      return node.parent.type === 'AssignmentExpression' && node.parent.left === node;
    }

    function findParentAssignmentExpression(node) {
      let parent = node.parent;

      while (parent && parent.type !== 'Program') {
        if (parent.type === 'AssignmentExpression') {
          return parent;
        }
        parent = parent.parent;
      }
      return null;
    }

    function isAllowedAssignment(node) {
      if (!allowInPropTypes) {
        return false;
      }

      const assignmentExpression = findParentAssignmentExpression(node);

      if (
        assignmentExpression &&
        assignmentExpression.left &&
        assignmentExpression.left.property &&
        assignmentExpression.left.property.name === 'propTypes'
      ) {
        return true;
      }
      return false;
    }

    return {
      MemberExpression: function(node) {
        if (
          node.property &&
          (
            !node.computed &&
            node.property.type === 'Identifier' &&
            node.property.name === 'propTypes' &&
            !isLeftSideOfAssignment(node) &&
            !isAllowedAssignment(node)
          ) || (
            (node.property.type === 'Literal' || node.property.type === 'JSXText') &&
            node.property.value === 'propTypes' &&
            !isLeftSideOfAssignment(node) &&
            !isAllowedAssignment(node)
          )
        ) {
          context.report({
            node: node.property,
            message: 'Using propTypes from another component is not safe because they may be removed in production builds'
          });
        }
      },

      ObjectPattern: function(node) {
        const propTypesNode = node.properties.find(property => property.type === 'Property' && property.key.name === 'propTypes');

        if (propTypesNode) {
          context.report({
            node: propTypesNode,
            message: 'Using propTypes from another component is not safe because they may be removed in production builds'
          });
        }
      }
    };
  }
};


/***/ }),
/* 625 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Forbid certain propTypes
 */


const variableUtil = __webpack_require__(579);
const propsUtil = __webpack_require__(584);
const astUtil = __webpack_require__(581);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DEFAULTS = ['any', 'array', 'object'];

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Forbid certain propTypes',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('forbid-prop-types')
    },

    schema: [{
      type: 'object',
      properties: {
        forbid: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        checkContextTypes: {
          type: 'boolean'
        },
        checkChildContextTypes: {
          type: 'boolean'
        }
      },
      additionalProperties: true
    }]
  },

  create: function(context) {
    const propWrapperFunctions = new Set(context.settings.propWrapperFunctions || []);
    const configuration = context.options[0] || {};
    const checkContextTypes = configuration.checkContextTypes || false;
    const checkChildContextTypes = configuration.checkChildContextTypes || false;

    function isForbidden(type) {
      const forbid = configuration.forbid || DEFAULTS;
      return forbid.indexOf(type) >= 0;
    }

    function shouldCheckContextTypes(node) {
      if (checkContextTypes && propsUtil.isContextTypesDeclaration(node)) {
        return true;
      }
      return false;
    }

    function shouldCheckChildContextTypes(node) {
      if (checkChildContextTypes && propsUtil.isChildContextTypesDeclaration(node)) {
        return true;
      }
      return false;
    }

    /**
     * Checks if propTypes declarations are forbidden
     * @param {Array} declarations The array of AST nodes being checked.
     * @returns {void}
     */
    function checkProperties(declarations) {
      declarations.forEach(declaration => {
        if (declaration.type !== 'Property') {
          return;
        }
        let target;
        let value = declaration.value;
        if (
          value.type === 'MemberExpression' &&
          value.property &&
          value.property.name &&
          value.property.name === 'isRequired'
        ) {
          value = value.object;
        }
        if (
          value.type === 'CallExpression' &&
          value.callee.type === 'MemberExpression'
        ) {
          value = value.callee;
        }
        if (value.property) {
          target = value.property.name;
        } else if (value.type === 'Identifier') {
          target = value.name;
        }
        if (isForbidden(target)) {
          context.report({
            node: declaration,
            message: `Prop type \`${target}\` is forbidden`
          });
        }
      });
    }

    function checkNode(node) {
      switch (node && node.type) {
        case 'ObjectExpression':
          checkProperties(node.properties);
          break;
        case 'Identifier':
          const propTypesObject = variableUtil.findVariableByName(context, node.name);
          if (propTypesObject && propTypesObject.properties) {
            checkProperties(propTypesObject.properties);
          }
          break;
        case 'CallExpression':
          const innerNode = node.arguments && node.arguments[0];
          if (propWrapperFunctions.has(node.callee.name) && innerNode) {
            checkNode(innerNode);
          }
          break;
        default:
          break;
      }
    }

    return {
      ClassProperty: function(node) {
        if (
          !propsUtil.isPropTypesDeclaration(node) &&
          !shouldCheckContextTypes(node) &&
          !shouldCheckChildContextTypes(node)
        ) {
          return;
        }
        checkNode(node.value);
      },

      MemberExpression: function(node) {
        if (
          !propsUtil.isPropTypesDeclaration(node) &&
          !shouldCheckContextTypes(node) &&
          !shouldCheckChildContextTypes(node)
        ) {
          return;
        }

        checkNode(node.parent.right);
      },

      MethodDefinition: function(node) {
        if (
          !propsUtil.isPropTypesDeclaration(node) &&
          !shouldCheckContextTypes(node) &&
          !shouldCheckChildContextTypes(node)
        ) {
          return;
        }

        const returnStatement = astUtil.findReturnStatement(node);

        if (returnStatement && returnStatement.argument) {
          checkNode(returnStatement.argument);
        }
      },

      ObjectExpression: function(node) {
        node.properties.forEach(property => {
          if (!property.key) {
            return;
          }

          if (
            !propsUtil.isPropTypesDeclaration(property) &&
            !shouldCheckContextTypes(property) &&
            !shouldCheckChildContextTypes(property)
          ) {
            return;
          }
          if (property.value.type === 'ObjectExpression') {
            checkProperties(property.value.properties);
          }
        });
      }

    };
  }
};


/***/ }),
/* 626 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce boolean attributes notation in JSX
 * @author Yannick Croissant
 */


const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const exceptionsSchema = {
  type: 'array',
  items: {type: 'string', minLength: 1},
  uniqueItems: true
};

const ALWAYS = 'always';
const NEVER = 'never';

const errorData = new WeakMap();
function getErrorData(exceptions) {
  if (!errorData.has(exceptions)) {
    const exceptionProps = Array.from(exceptions, name => `\`${name}\``).join(', ');
    const exceptionsMessage = exceptions.size > 0 ? ` for the following props: ${exceptionProps}` : '';
    errorData.set(exceptions, {exceptionsMessage: exceptionsMessage});
  }
  return errorData.get(exceptions);
}

function isAlways(configuration, exceptions, propName) {
  const isException = exceptions.has(propName);
  if (configuration === ALWAYS) {
    return !isException;
  }
  return isException;
}

function isNever(configuration, exceptions, propName) {
  const isException = exceptions.has(propName);
  if (configuration === NEVER) {
    return !isException;
  }
  return isException;
}

module.exports = {
  meta: {
    docs: {
      description: 'Enforce boolean attributes notation in JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-boolean-value')
    },
    fixable: 'code',

    schema: {
      anyOf: [{
        type: 'array',
        items: [{enum: [ALWAYS, NEVER]}],
        additionalItems: false
      }, {
        type: 'array',
        items: [{
          enum: [ALWAYS]
        }, {
          type: 'object',
          additionalProperties: false,
          properties: {
            [NEVER]: exceptionsSchema
          }
        }],
        additionalItems: false
      }, {
        type: 'array',
        items: [{
          enum: [NEVER]
        }, {
          type: 'object',
          additionalProperties: false,
          properties: {
            [ALWAYS]: exceptionsSchema
          }
        }],
        additionalItems: false
      }]
    }
  },

  create(context) {
    const configuration = context.options[0] || NEVER;
    const configObject = context.options[1] || {};
    const exceptions = new Set((configuration === ALWAYS ? configObject[NEVER] : configObject[ALWAYS]) || []);

    const NEVER_MESSAGE = 'Value must be omitted for boolean attributes{{exceptionsMessage}}';
    const ALWAYS_MESSAGE = 'Value must be set for boolean attributes{{exceptionsMessage}}';

    return {
      JSXAttribute(node) {
        const propName = node.name && node.name.name;
        const value = node.value;

        if (isAlways(configuration, exceptions, propName) && value === null) {
          const data = getErrorData(exceptions);
          context.report({
            node: node,
            message: ALWAYS_MESSAGE,
            data: data,
            fix(fixer) {
              return fixer.insertTextAfter(node, '={true}');
            }
          });
        }
        if (isNever(configuration, exceptions, propName) && value && value.type === 'JSXExpressionContainer' && value.expression.value === true) {
          const data = getErrorData(exceptions);
          context.report({
            node: node,
            message: NEVER_MESSAGE,
            data: data,
            fix(fixer) {
              return fixer.removeRange([node.name.range[1], value.range[1]]);
            }
          });
        }
      }
    };
  }
};


/***/ }),
/* 627 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const docsUrl = __webpack_require__(587);

// This list is taken from https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements
const INLINE_ELEMENTS = new Set([
  'a',
  'abbr',
  'acronym',
  'b',
  'bdo',
  'big',
  'br',
  'button',
  'cite',
  'code',
  'dfn',
  'em',
  'i',
  'img',
  'input',
  'kbd',
  'label',
  'map',
  'object',
  'q',
  'samp',
  'script',
  'select',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'textarea',
  'tt',
  'var'
]);

module.exports = {
  meta: {
    docs: {
      description: 'Ensures inline tags are not rendered without spaces between them',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-child-element-spacing')
    },
    fixable: false,
    schema: [
      {
        type: 'object',
        properties: {},
        default: {},
        additionalProperties: false
      }
    ]
  },
  create: function (context) {
    const elementName = node => (
      node.openingElement &&
      node.openingElement.name &&
      node.openingElement.name.type === 'JSXIdentifier' &&
      node.openingElement.name.name
    );

    const isInlineElement = node => (
      node.type === 'JSXElement' &&
      INLINE_ELEMENTS.has(elementName(node))
    );

    const TEXT_FOLLOWING_ELEMENT_PATTERN = /^\s*\n\s*\S/;
    const TEXT_PRECEDING_ELEMENT_PATTERN = /\S\s*\n\s*$/;

    return {
      JSXElement: function(node) {
        let lastChild = null;
        let child = null;
        (node.children.concat([null])).forEach(nextChild => {
          if (
            (lastChild || nextChild) &&
            (!lastChild || isInlineElement(lastChild)) &&
            (child && (child.type === 'Literal' || child.type === 'JSXText')) &&
            (!nextChild || isInlineElement(nextChild)) &&
            true
          ) {
            if (lastChild && child.value.match(TEXT_FOLLOWING_ELEMENT_PATTERN)) {
              context.report({
                node: lastChild,
                loc: lastChild.loc.end,
                message: `Ambiguous spacing after previous element ${elementName(lastChild)}`
              });
            } else if (nextChild && child.value.match(TEXT_PRECEDING_ELEMENT_PATTERN)) {
              context.report({
                node: nextChild,
                loc: nextChild.loc.start,
                message: `Ambiguous spacing before next element ${elementName(nextChild)}`
              });
            }
          }
          lastChild = child;
          child = nextChild;
        });
      }
    };
  }
};


/***/ }),
/* 628 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Validate closing bracket location in JSX
 * @author Yannick Croissant
 */


const has = __webpack_require__(574);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'Validate closing bracket location in JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-closing-bracket-location')
    },
    fixable: 'code',

    schema: [{
      oneOf: [
        {
          enum: ['after-props', 'props-aligned', 'tag-aligned', 'line-aligned']
        },
        {
          type: 'object',
          properties: {
            location: {
              enum: ['after-props', 'props-aligned', 'tag-aligned', 'line-aligned']
            }
          },
          additionalProperties: false
        }, {
          type: 'object',
          properties: {
            nonEmpty: {
              enum: ['after-props', 'props-aligned', 'tag-aligned', 'line-aligned', false]
            },
            selfClosing: {
              enum: ['after-props', 'props-aligned', 'tag-aligned', 'line-aligned', false]
            }
          },
          additionalProperties: false
        }
      ]
    }]
  },

  create: function(context) {
    const MESSAGE = 'The closing bracket must be {{location}}{{details}}';
    const MESSAGE_LOCATION = {
      'after-props': 'placed after the last prop',
      'after-tag': 'placed after the opening tag',
      'props-aligned': 'aligned with the last prop',
      'tag-aligned': 'aligned with the opening tag',
      'line-aligned': 'aligned with the line containing the opening tag'
    };
    const DEFAULT_LOCATION = 'tag-aligned';

    const sourceCode = context.getSourceCode();
    const config = context.options[0];
    const options = {
      nonEmpty: DEFAULT_LOCATION,
      selfClosing: DEFAULT_LOCATION
    };

    if (typeof config === 'string') {
      // simple shorthand [1, 'something']
      options.nonEmpty = config;
      options.selfClosing = config;
    } else if (typeof config === 'object') {
      // [1, {location: 'something'}] (back-compat)
      if (has(config, 'location')) {
        options.nonEmpty = config.location;
        options.selfClosing = config.location;
      }
      // [1, {nonEmpty: 'something'}]
      if (has(config, 'nonEmpty')) {
        options.nonEmpty = config.nonEmpty;
      }
      // [1, {selfClosing: 'something'}]
      if (has(config, 'selfClosing')) {
        options.selfClosing = config.selfClosing;
      }
    }

    /**
     * Get expected location for the closing bracket
     * @param {Object} tokens Locations of the opening bracket, closing bracket and last prop
     * @return {String} Expected location for the closing bracket
     */
    function getExpectedLocation(tokens) {
      let location;
      // Is always after the opening tag if there is no props
      if (typeof tokens.lastProp === 'undefined') {
        location = 'after-tag';
      // Is always after the last prop if this one is on the same line as the opening bracket
      } else if (tokens.opening.line === tokens.lastProp.lastLine) {
        location = 'after-props';
      // Else use configuration dependent on selfClosing property
      } else {
        location = tokens.selfClosing ? options.selfClosing : options.nonEmpty;
      }
      return location;
    }

    /**
     * Get the correct 0-indexed column for the closing bracket, given the
     * expected location.
     * @param {Object} tokens Locations of the opening bracket, closing bracket and last prop
     * @param {String} expectedLocation Expected location for the closing bracket
     * @return {?Number} The correct column for the closing bracket, or null
     */
    function getCorrectColumn(tokens, expectedLocation) {
      switch (expectedLocation) {
        case 'props-aligned':
          return tokens.lastProp.column;
        case 'tag-aligned':
          return tokens.opening.column;
        case 'line-aligned':
          return tokens.openingStartOfLine.column;
        default:
          return null;
      }
    }

    /**
     * Check if the closing bracket is correctly located
     * @param {Object} tokens Locations of the opening bracket, closing bracket and last prop
     * @param {String} expectedLocation Expected location for the closing bracket
     * @return {Boolean} True if the closing bracket is correctly located, false if not
     */
    function hasCorrectLocation(tokens, expectedLocation) {
      switch (expectedLocation) {
        case 'after-tag':
          return tokens.tag.line === tokens.closing.line;
        case 'after-props':
          return tokens.lastProp.lastLine === tokens.closing.line;
        case 'props-aligned':
        case 'tag-aligned':
        case 'line-aligned':
          const correctColumn = getCorrectColumn(tokens, expectedLocation);
          return correctColumn === tokens.closing.column;
        default:
          return true;
      }
    }

    /**
     * Get the characters used for indentation on the line to be matched
     * @param {Object} tokens Locations of the opening bracket, closing bracket and last prop
     * @param {String} expectedLocation Expected location for the closing bracket
     * @param {Number} correctColumn Expected column for the closing bracket
     * @return {String} The characters used for indentation
     */
    function getIndentation(tokens, expectedLocation, correctColumn) {
      let indentation, spaces = [];
      switch (expectedLocation) {
        case 'props-aligned':
          indentation = /^\s*/.exec(sourceCode.lines[tokens.lastProp.firstLine - 1])[0];
          break;
        case 'tag-aligned':
        case 'line-aligned':
          indentation = /^\s*/.exec(sourceCode.lines[tokens.opening.line - 1])[0];
          break;
        default:
          indentation = '';
      }
      if (indentation.length + 1 < correctColumn) {
        // Non-whitespace characters were included in the column offset
        spaces = new Array(+correctColumn + 1 - indentation.length);
      }
      return indentation + spaces.join(' ');
    }

    /**
     * Get the locations of the opening bracket, closing bracket, last prop, and
     * start of opening line.
     * @param {ASTNode} node The node to check
     * @return {Object} Locations of the opening bracket, closing bracket, last
     * prop and start of opening line.
     */
    function getTokensLocations(node) {
      const opening = sourceCode.getFirstToken(node).loc.start;
      const closing = sourceCode.getLastTokens(node, node.selfClosing ? 2 : 1)[0].loc.start;
      const tag = sourceCode.getFirstToken(node.name).loc.start;
      let lastProp;
      if (node.attributes.length) {
        lastProp = node.attributes[node.attributes.length - 1];
        lastProp = {
          column: sourceCode.getFirstToken(lastProp).loc.start.column,
          firstLine: sourceCode.getFirstToken(lastProp).loc.start.line,
          lastLine: sourceCode.getLastToken(lastProp).loc.end.line
        };
      }
      const openingLine = sourceCode.lines[opening.line - 1];
      const openingStartOfLine = {
        column: /^\s*/.exec(openingLine)[0].length,
        line: opening.line
      };
      return {
        tag: tag,
        opening: opening,
        closing: closing,
        lastProp: lastProp,
        selfClosing: node.selfClosing,
        openingStartOfLine: openingStartOfLine
      };
    }

    /**
     * Get an unique ID for a given JSXOpeningElement
     *
     * @param {ASTNode} node The AST node being checked.
     * @returns {String} Unique ID (based on its range)
     */
    function getOpeningElementId(node) {
      return node.range.join(':');
    }

    const lastAttributeNode = {};

    return {
      JSXAttribute: function(node) {
        lastAttributeNode[getOpeningElementId(node.parent)] = node;
      },

      JSXSpreadAttribute: function(node) {
        lastAttributeNode[getOpeningElementId(node.parent)] = node;
      },

      'JSXOpeningElement:exit': function(node) {
        const attributeNode = lastAttributeNode[getOpeningElementId(node)];
        const cachedLastAttributeEndPos = attributeNode ? attributeNode.range[1] : null;
        let expectedNextLine;
        const tokens = getTokensLocations(node);
        const expectedLocation = getExpectedLocation(tokens);

        if (hasCorrectLocation(tokens, expectedLocation)) {
          return;
        }

        const data = {location: MESSAGE_LOCATION[expectedLocation], details: ''};
        const correctColumn = getCorrectColumn(tokens, expectedLocation);

        if (correctColumn !== null) {
          expectedNextLine = tokens.lastProp &&
            (tokens.lastProp.lastLine === tokens.closing.line);
          data.details = ` (expected column ${correctColumn + 1}${expectedNextLine ? ' on the next line)' : ')'}`;
        }

        context.report({
          node: node,
          loc: tokens.closing,
          message: MESSAGE,
          data: data,
          fix: function(fixer) {
            const closingTag = tokens.selfClosing ? '/>' : '>';
            switch (expectedLocation) {
              case 'after-tag':
                if (cachedLastAttributeEndPos) {
                  return fixer.replaceTextRange([cachedLastAttributeEndPos, node.range[1]],
                    (expectedNextLine ? '\n' : '') + closingTag);
                }
                return fixer.replaceTextRange([node.name.range[1], node.range[1]],
                  (expectedNextLine ? '\n' : ' ') + closingTag);
              case 'after-props':
                return fixer.replaceTextRange([cachedLastAttributeEndPos, node.range[1]],
                  (expectedNextLine ? '\n' : '') + closingTag);
              case 'props-aligned':
              case 'tag-aligned':
              case 'line-aligned':
                return fixer.replaceTextRange([cachedLastAttributeEndPos, node.range[1]],
                  `\n${getIndentation(tokens, expectedLocation, correctColumn)}${closingTag}`);
              default:
                return true;
            }
          }
        });
      }
    };
  }
};


/***/ }),
/* 629 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Validate closing tag location in JSX
 * @author Ross Solomon
 */


const astUtil = __webpack_require__(581);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'Validate closing tag location for multiline JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-closing-tag-location')
    },
    fixable: 'whitespace'
  },

  create: function(context) {
    return {
      JSXClosingElement: function(node) {
        if (!node.parent) {
          return;
        }

        const opening = node.parent.openingElement;
        if (opening.loc.start.line === node.loc.start.line) {
          return;
        }

        if (opening.loc.start.column === node.loc.start.column) {
          return;
        }

        let message;
        if (!astUtil.isNodeFirstInLine(context, node)) {
          message = 'Closing tag of a multiline JSX expression must be on its own line.';
        } else {
          message = 'Expected closing tag to match indentation of opening.';
        }

        context.report({
          node: node,
          loc: node.loc,
          message,
          fix: function(fixer) {
            const indent = Array(opening.loc.start.column + 1).join(' ');
            if (astUtil.isNodeFirstInLine(context, node)) {
              return fixer.replaceTextRange(
                [node.range[0] - node.loc.start.column, node.range[0]],
                indent
              );
            }

            return fixer.insertTextBefore(node, `\n${indent}`);
          }
        });
      }
    };
  }
};


/***/ }),
/* 630 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce or disallow spaces inside of curly braces in JSX attributes.
 * @author Jamund Ferguson
 * @author Brandyn Bennett
 * @author Michael Ficarra
 * @author Vignesh Anand
 * @author Jamund Ferguson
 * @author Yannick Croissant
 * @author Erik Wendel
 */


const has = __webpack_require__(574);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const SPACING = {
  always: 'always',
  never: 'never'
};
const SPACING_VALUES = [SPACING.always, SPACING.never];

module.exports = {
  meta: {
    docs: {
      description: 'Enforce or disallow spaces inside of curly braces in JSX attributes',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-curly-spacing')
    },
    fixable: 'code',

    schema: {
      definitions: {
        basicConfig: {
          type: 'object',
          properties: {
            when: {
              enum: SPACING_VALUES
            },
            allowMultiline: {
              type: 'boolean'
            },
            spacing: {
              type: 'object',
              properties: {
                objectLiterals: {
                  enum: SPACING_VALUES
                }
              }
            }
          }
        },
        basicConfigOrBoolean: {
          oneOf: [{
            $ref: '#/definitions/basicConfig'
          }, {
            type: 'boolean'
          }]
        }
      },
      type: 'array',
      items: [{
        oneOf: [{
          allOf: [{
            $ref: '#/definitions/basicConfig'
          }, {
            type: 'object',
            properties: {
              attributes: {
                $ref: '#/definitions/basicConfigOrBoolean'
              },
              children: {
                $ref: '#/definitions/basicConfigOrBoolean'
              }
            }
          }]
        }, {
          enum: SPACING_VALUES
        }]
      }, {
        type: 'object',
        properties: {
          allowMultiline: {
            type: 'boolean'
          },
          spacing: {
            type: 'object',
            properties: {
              objectLiterals: {
                enum: SPACING_VALUES
              }
            }
          }
        },
        additionalProperties: false
      }]
    }
  },

  create: function(context) {
    function normalizeConfig(configOrTrue, defaults, lastPass) {
      const config = configOrTrue === true ? {} : configOrTrue;
      const when = config.when || defaults.when;
      const allowMultiline = has(config, 'allowMultiline') ? config.allowMultiline : defaults.allowMultiline;
      const spacing = config.spacing || {};
      let objectLiteralSpaces = spacing.objectLiterals || defaults.objectLiteralSpaces;
      if (lastPass) {
        // On the final pass assign the values that should be derived from others if they are still undefined
        objectLiteralSpaces = objectLiteralSpaces || when;
      }

      return {
        when,
        allowMultiline,
        objectLiteralSpaces
      };
    }

    const DEFAULT_WHEN = SPACING.never;
    const DEFAULT_ALLOW_MULTILINE = true;
    const DEFAULT_ATTRIBUTES = true;
    const DEFAULT_CHILDREN = false;

    const sourceCode = context.getSourceCode();
    let originalConfig = context.options[0] || {};
    if (SPACING_VALUES.indexOf(originalConfig) !== -1) {
      originalConfig = Object.assign({when: context.options[0]}, context.options[1]);
    }
    const defaultConfig = normalizeConfig(originalConfig, {
      when: DEFAULT_WHEN,
      allowMultiline: DEFAULT_ALLOW_MULTILINE
    });
    const attributes = has(originalConfig, 'attributes') ? originalConfig.attributes : DEFAULT_ATTRIBUTES;
    const attributesConfig = attributes ? normalizeConfig(attributes, defaultConfig, true) : null;
    const children = has(originalConfig, 'children') ? originalConfig.children : DEFAULT_CHILDREN;
    const childrenConfig = children ? normalizeConfig(children, defaultConfig, true) : null;

    // --------------------------------------------------------------------------
    // Helpers
    // --------------------------------------------------------------------------

    /**
     * Determines whether two adjacent tokens have a newline between them.
     * @param {Object} left - The left token object.
     * @param {Object} right - The right token object.
     * @returns {boolean} Whether or not there is a newline between the tokens.
     */
    function isMultiline(left, right) {
      return left.loc.end.line !== right.loc.start.line;
    }

    /**
     * Trims text of whitespace between two ranges
     * @param {Fixer} fixer - the eslint fixer object
     * @param {Location} fromLoc - the start location
     * @param {Location} toLoc - the end location
     * @param {string} mode - either 'start' or 'end'
     * @param {string=} spacing - a spacing value that will optionally add a space to the removed text
     * @returns {Object|*|{range, text}}
     */
    function fixByTrimmingWhitespace(fixer, fromLoc, toLoc, mode, spacing) {
      let replacementText = sourceCode.text.slice(fromLoc, toLoc);
      if (mode === 'start') {
        replacementText = replacementText.replace(/^\s+/gm, '');
      } else {
        replacementText = replacementText.replace(/\s+$/gm, '');
      }
      if (spacing === SPACING.always) {
        if (mode === 'start') {
          replacementText += ' ';
        } else {
          replacementText = ` ${replacementText}`;
        }
      }
      return fixer.replaceTextRange([fromLoc, toLoc], replacementText);
    }

    /**
    * Reports that there shouldn't be a newline after the first token
    * @param {ASTNode} node - The node to report in the event of an error.
    * @param {Token} token - The token to use for the report.
    * @returns {void}
    */
    function reportNoBeginningNewline(node, token, spacing) {
      context.report({
        node: node,
        loc: token.loc.start,
        message: `There should be no newline after '${token.value}'`,
        fix: function(fixer) {
          const nextToken = sourceCode.getTokenAfter(token);
          return fixByTrimmingWhitespace(fixer, token.range[1], nextToken.range[0], 'start', spacing);
        }
      });
    }

    /**
    * Reports that there shouldn't be a newline before the last token
    * @param {ASTNode} node - The node to report in the event of an error.
    * @param {Token} token - The token to use for the report.
    * @returns {void}
    */
    function reportNoEndingNewline(node, token, spacing) {
      context.report({
        node: node,
        loc: token.loc.start,
        message: `There should be no newline before '${token.value}'`,
        fix: function(fixer) {
          const previousToken = sourceCode.getTokenBefore(token);
          return fixByTrimmingWhitespace(fixer, previousToken.range[1], token.range[0], 'end', spacing);
        }
      });
    }

    /**
    * Reports that there shouldn't be a space after the first token
    * @param {ASTNode} node - The node to report in the event of an error.
    * @param {Token} token - The token to use for the report.
    * @returns {void}
    */
    function reportNoBeginningSpace(node, token) {
      context.report({
        node: node,
        loc: token.loc.start,
        message: `There should be no space after '${token.value}'`,
        fix: function(fixer) {
          const nextToken = sourceCode.getTokenAfter(token);
          let nextComment;

          // ESLint >=4.x
          if (sourceCode.getCommentsAfter) {
            nextComment = sourceCode.getCommentsAfter(token);
          // ESLint 3.x
          } else {
            const potentialComment = sourceCode.getTokenAfter(token, {includeComments: true});
            nextComment = nextToken === potentialComment ? [] : [potentialComment];
          }

          // Take comments into consideration to narrow the fix range to what is actually affected. (See #1414)
          if (nextComment.length > 0) {
            return fixByTrimmingWhitespace(fixer, token.range[1], Math.min(nextToken.range[0], nextComment[0].start), 'start');
          }

          return fixByTrimmingWhitespace(fixer, token.range[1], nextToken.range[0], 'start');
        }
      });
    }

    /**
    * Reports that there shouldn't be a space before the last token
    * @param {ASTNode} node - The node to report in the event of an error.
    * @param {Token} token - The token to use for the report.
    * @returns {void}
    */
    function reportNoEndingSpace(node, token) {
      context.report({
        node: node,
        loc: token.loc.start,
        message: `There should be no space before '${token.value}'`,
        fix: function(fixer) {
          const previousToken = sourceCode.getTokenBefore(token);
          let previousComment;

          // ESLint >=4.x
          if (sourceCode.getCommentsBefore) {
            previousComment = sourceCode.getCommentsBefore(token);
          // ESLint 3.x
          } else {
            const potentialComment = sourceCode.getTokenBefore(token, {includeComments: true});
            previousComment = previousToken === potentialComment ? [] : [potentialComment];
          }

          // Take comments into consideration to narrow the fix range to what is actually affected. (See #1414)
          if (previousComment.length > 0) {
            return fixByTrimmingWhitespace(fixer, Math.max(previousToken.range[1], previousComment[0].end), token.range[0], 'end');
          }

          return fixByTrimmingWhitespace(fixer, previousToken.range[1], token.range[0], 'end');
        }
      });
    }

    /**
    * Reports that there should be a space after the first token
    * @param {ASTNode} node - The node to report in the event of an error.
    * @param {Token} token - The token to use for the report.
    * @returns {void}
    */
    function reportRequiredBeginningSpace(node, token) {
      context.report({
        node: node,
        loc: token.loc.start,
        message: `A space is required after '${token.value}'`,
        fix: function(fixer) {
          return fixer.insertTextAfter(token, ' ');
        }
      });
    }

    /**
    * Reports that there should be a space before the last token
    * @param {ASTNode} node - The node to report in the event of an error.
    * @param {Token} token - The token to use for the report.
    * @returns {void}
    */
    function reportRequiredEndingSpace(node, token) {
      context.report({
        node: node,
        loc: token.loc.start,
        message: `A space is required before '${token.value}'`,
        fix: function(fixer) {
          return fixer.insertTextBefore(token, ' ');
        }
      });
    }

    /**
     * Determines if spacing in curly braces is valid.
     * @param {ASTNode} node The AST node to check.
     * @returns {void}
     */
    function validateBraceSpacing(node) {
      let config;
      switch (node.parent.type) {
        case 'JSXAttribute':
        case 'JSXOpeningElement':
          config = attributesConfig;
          break;

        case 'JSXElement':
          config = childrenConfig;
          break;

        default:
          return;
      }
      if (config === null) {
        return;
      }

      const first = context.getFirstToken(node);
      const last = sourceCode.getLastToken(node);
      let second = context.getTokenAfter(first, {includeComments: true});
      let penultimate = sourceCode.getTokenBefore(last, {includeComments: true});

      if (!second) {
        second = context.getTokenAfter(first);
        const leadingComments = sourceCode.getNodeByRangeIndex(second.range[0]).leadingComments;
        second = leadingComments ? leadingComments[0] : second;
      }
      if (!penultimate) {
        penultimate = sourceCode.getTokenBefore(last);
        const trailingComments = sourceCode.getNodeByRangeIndex(penultimate.range[0]).trailingComments;
        penultimate = trailingComments ? trailingComments[trailingComments.length - 1] : penultimate;
      }

      const isObjectLiteral = first.value === second.value;
      const spacing = isObjectLiteral ? config.objectLiteralSpaces : config.when;
      if (spacing === SPACING.always) {
        if (!sourceCode.isSpaceBetweenTokens(first, second)) {
          reportRequiredBeginningSpace(node, first);
        } else if (!config.allowMultiline && isMultiline(first, second)) {
          reportNoBeginningNewline(node, first, spacing);
        }
        if (!sourceCode.isSpaceBetweenTokens(penultimate, last)) {
          reportRequiredEndingSpace(node, last);
        } else if (!config.allowMultiline && isMultiline(penultimate, last)) {
          reportNoEndingNewline(node, last, spacing);
        }
      } else if (spacing === SPACING.never) {
        if (isMultiline(first, second)) {
          if (!config.allowMultiline) {
            reportNoBeginningNewline(node, first, spacing);
          }
        } else if (sourceCode.isSpaceBetweenTokens(first, second)) {
          reportNoBeginningSpace(node, first);
        }
        if (isMultiline(penultimate, last)) {
          if (!config.allowMultiline) {
            reportNoEndingNewline(node, last, spacing);
          }
        } else if (sourceCode.isSpaceBetweenTokens(penultimate, last)) {
          reportNoEndingSpace(node, last);
        }
      }
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      JSXExpressionContainer: validateBraceSpacing,
      JSXSpreadAttribute: validateBraceSpacing
    };
  }
};


/***/ }),
/* 631 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Disallow or enforce spaces around equal signs in JSX attributes.
 * @author ryym
 */


const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Disallow or enforce spaces around equal signs in JSX attributes',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-equals-spacing')
    },
    fixable: 'code',

    schema: [{
      enum: ['always', 'never']
    }]
  },

  create: function(context) {
    const config = context.options[0];
    const sourceCode = context.getSourceCode();

    /**
     * Determines a given attribute node has an equal sign.
     * @param {ASTNode} attrNode - The attribute node.
     * @returns {boolean} Whether or not the attriute node has an equal sign.
     */
    function hasEqual(attrNode) {
      return attrNode.type !== 'JSXSpreadAttribute' && attrNode.value !== null;
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      JSXOpeningElement: function(node) {
        node.attributes.forEach(attrNode => {
          if (!hasEqual(attrNode)) {
            return;
          }

          const equalToken = sourceCode.getTokenAfter(attrNode.name);
          const spacedBefore = sourceCode.isSpaceBetweenTokens(attrNode.name, equalToken);
          const spacedAfter = sourceCode.isSpaceBetweenTokens(equalToken, attrNode.value);

          switch (config) {
            default:
            case 'never':
              if (spacedBefore) {
                context.report({
                  node: attrNode,
                  loc: equalToken.loc.start,
                  message: 'There should be no space before \'=\'',
                  fix: function(fixer) {
                    return fixer.removeRange([attrNode.name.range[1], equalToken.range[0]]);
                  }
                });
              }
              if (spacedAfter) {
                context.report({
                  node: attrNode,
                  loc: equalToken.loc.start,
                  message: 'There should be no space after \'=\'',
                  fix: function(fixer) {
                    return fixer.removeRange([equalToken.range[1], attrNode.value.range[0]]);
                  }
                });
              }
              break;
            case 'always':
              if (!spacedBefore) {
                context.report({
                  node: attrNode,
                  loc: equalToken.loc.start,
                  message: 'A space is required before \'=\'',
                  fix: function(fixer) {
                    return fixer.insertTextBefore(equalToken, ' ');
                  }
                });
              }
              if (!spacedAfter) {
                context.report({
                  node: attrNode,
                  loc: equalToken.loc.start,
                  message: 'A space is required after \'=\'',
                  fix: function(fixer) {
                    return fixer.insertTextAfter(equalToken, ' ');
                  }
                });
              }
              break;
          }
        });
      }
    };
  }
};


/***/ }),
/* 632 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Restrict file extensions that may contain JSX
 * @author Joe Lencioni
 */


const path = __webpack_require__(84);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DEFAULTS = {
  extensions: ['.jsx']
};

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Restrict file extensions that may contain JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-filename-extension')
    },

    schema: [{
      type: 'object',
      properties: {
        extensions: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      },
      additionalProperties: false
    }]
  },

  create: function(context) {
    function getExtensionsConfig() {
      return context.options[0] && context.options[0].extensions || DEFAULTS.extensions;
    }

    let invalidExtension;
    let invalidNode;

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      JSXElement: function(node) {
        const filename = context.getFilename();
        if (filename === '<text>') {
          return;
        }

        if (invalidNode) {
          return;
        }

        const allowedExtensions = getExtensionsConfig();
        const isAllowedExtension = allowedExtensions.some(extension => filename.slice(-extension.length) === extension);

        if (isAllowedExtension) {
          return;
        }

        invalidNode = node;
        invalidExtension = path.extname(filename);
      },

      'Program:exit': function() {
        if (!invalidNode) {
          return;
        }

        context.report({
          node: invalidNode,
          message: `JSX not allowed in files with extension '${invalidExtension}'`
        });
      }
    };
  }
};


/***/ }),
/* 633 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Ensure proper position of the first property in JSX
 * @author Joachim Seminck
 */


const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Ensure proper position of the first property in JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-first-prop-new-line')
    },
    fixable: 'code',

    schema: [{
      enum: ['always', 'never', 'multiline', 'multiline-multiprop']
    }]
  },

  create: function (context) {
    const configuration = context.options[0] || 'multiline-multiprop';

    function isMultilineJSX(jsxNode) {
      return jsxNode.loc.start.line < jsxNode.loc.end.line;
    }

    return {
      JSXOpeningElement: function (node) {
        if (
          (configuration === 'multiline' && isMultilineJSX(node)) ||
          (configuration === 'multiline-multiprop' && isMultilineJSX(node) && node.attributes.length > 1) ||
          (configuration === 'always')
        ) {
          node.attributes.some(decl => {
            if (decl.loc.start.line === node.loc.start.line) {
              context.report({
                node: decl,
                message: 'Property should be placed on a new line',
                fix: function(fixer) {
                  return fixer.replaceTextRange([node.name.end, decl.range[0]], '\n');
                }
              });
            }
            return true;
          });
        } else if (configuration === 'never' && node.attributes.length > 0) {
          const firstNode = node.attributes[0];
          if (node.loc.start.line < firstNode.loc.start.line) {
            context.report({
              node: firstNode,
              message: 'Property should be placed on the same line as the component declaration',
              fix: function(fixer) {
                return fixer.replaceTextRange([node.name.end, firstNode.range[0]], ' ');
              }
            });
            return;
          }
        }
        return;
      }
    };
  }
};


/***/ }),
/* 634 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce event handler naming conventions in JSX
 * @author Jake Marsh
 */


const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce event handler naming conventions in JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-handler-names')
    },

    schema: [{
      type: 'object',
      properties: {
        eventHandlerPrefix: {
          type: 'string'
        },
        eventHandlerPropPrefix: {
          type: 'string'
        }
      },
      additionalProperties: false
    }]
  },

  create: function(context) {
    const sourceCode = context.getSourceCode();
    const configuration = context.options[0] || {};
    const eventHandlerPrefix = configuration.eventHandlerPrefix || 'handle';
    const eventHandlerPropPrefix = configuration.eventHandlerPropPrefix || 'on';

    const EVENT_HANDLER_REGEX = new RegExp(`^((props\\.${eventHandlerPropPrefix})|((.*\\.)?${eventHandlerPrefix}))[A-Z].*$`);
    const PROP_EVENT_HANDLER_REGEX = new RegExp(`^(${eventHandlerPropPrefix}[A-Z].*|ref)$`);

    return {
      JSXAttribute: function(node) {
        if (!node.value || !node.value.expression || !node.value.expression.object) {
          return;
        }

        const propKey = typeof node.name === 'object' ? node.name.name : node.name;
        const propValue = sourceCode.getText(node.value.expression).replace(/^this\.|.*::/, '');

        if (propKey === 'ref') {
          return;
        }

        const propIsEventHandler = PROP_EVENT_HANDLER_REGEX.test(propKey);
        const propFnIsNamedCorrectly = EVENT_HANDLER_REGEX.test(propValue);

        if (propIsEventHandler && !propFnIsNamedCorrectly) {
          context.report({
            node: node,
            message: `Handler function for ${propKey} prop key must begin with '${eventHandlerPrefix}'`
          });
        } else if (propFnIsNamedCorrectly && !propIsEventHandler) {
          context.report({
            node: node,
            message: `Prop key for ${propValue} must begin with '${eventHandlerPropPrefix}'`
          });
        }
      }
    };
  }
};


/***/ }),
/* 635 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Validate JSX indentation
 * @author Yannick Croissant

 * This rule has been ported and modified from eslint and nodeca.
 * @author Vitaly Puzrin
 * @author Gyandeep Singh
 * @copyright 2015 Vitaly Puzrin. All rights reserved.
 * @copyright 2015 Gyandeep Singh. All rights reserved.
 Copyright (C) 2014 by Vitaly Puzrin

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the 'Software'), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */


const astUtil = __webpack_require__(581);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'Validate JSX indentation',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-indent')
    },
    fixable: 'whitespace',
    schema: [{
      oneOf: [{
        enum: ['tab']
      }, {
        type: 'integer'
      }]
    }]
  },

  create: function(context) {
    const MESSAGE = 'Expected indentation of {{needed}} {{type}} {{characters}} but found {{gotten}}.';

    const extraColumnStart = 0;
    let indentType = 'space';
    let indentSize = 4;

    const sourceCode = context.getSourceCode();

    if (context.options.length) {
      if (context.options[0] === 'tab') {
        indentSize = 1;
        indentType = 'tab';
      } else if (typeof context.options[0] === 'number') {
        indentSize = context.options[0];
        indentType = 'space';
      }
    }

    const indentChar = indentType === 'space' ? ' ' : '\t';

    /**
     * Responsible for fixing the indentation issue fix
     * @param {ASTNode} node Node violating the indent rule
     * @param {Number} needed Expected indentation character count
     * @returns {Function} function to be executed by the fixer
     * @private
     */
    function getFixerFunction(node, needed) {
      return function(fixer) {
        const indent = Array(needed + 1).join(indentChar);
        return fixer.replaceTextRange(
          [node.range[0] - node.loc.start.column, node.range[0]],
          indent
        );
      };
    }

    /**
     * Reports a given indent violation and properly pluralizes the message
     * @param {ASTNode} node Node violating the indent rule
     * @param {Number} needed Expected indentation character count
     * @param {Number} gotten Indentation character count in the actual node/code
     * @param {Object} loc Error line and column location
     */
    function report(node, needed, gotten, loc) {
      const msgContext = {
        needed: needed,
        type: indentType,
        characters: needed === 1 ? 'character' : 'characters',
        gotten: gotten
      };

      if (loc) {
        context.report({
          node: node,
          loc: loc,
          message: MESSAGE,
          data: msgContext,
          fix: getFixerFunction(node, needed)
        });
      } else {
        context.report({
          node: node,
          message: MESSAGE,
          data: msgContext,
          fix: getFixerFunction(node, needed)
        });
      }
    }

    /**
     * Get node indent
     * @param {ASTNode} node Node to examine
     * @param {Boolean} byLastLine get indent of node's last line
     * @param {Boolean} excludeCommas skip comma on start of line
     * @return {Number} Indent
     */
    function getNodeIndent(node, byLastLine, excludeCommas) {
      byLastLine = byLastLine || false;
      excludeCommas = excludeCommas || false;

      let src = sourceCode.getText(node, node.loc.start.column + extraColumnStart);
      const lines = src.split('\n');
      if (byLastLine) {
        src = lines[lines.length - 1];
      } else {
        src = lines[0];
      }

      const skip = excludeCommas ? ',' : '';

      let regExp;
      if (indentType === 'space') {
        regExp = new RegExp(`^[ ${skip}]+`);
      } else {
        regExp = new RegExp(`^[\t${skip}]+`);
      }

      const indent = regExp.exec(src);
      return indent ? indent[0].length : 0;
    }

    /**
     * Check if the node is the right member of a logical expression
     * @param {ASTNode} node The node to check
     * @return {Boolean} true if its the case, false if not
     */
    function isRightInLogicalExp(node) {
      return (
        node.parent &&
        node.parent.parent &&
        node.parent.parent.type === 'LogicalExpression' &&
        node.parent.parent.right === node.parent
      );
    }

    /**
     * Check if the node is the alternate member of a conditional expression
     * @param {ASTNode} node The node to check
     * @return {Boolean} true if its the case, false if not
     */
    function isAlternateInConditionalExp(node) {
      return (
        node.parent &&
        node.parent.parent &&
        node.parent.parent.type === 'ConditionalExpression' &&
        node.parent.parent.alternate === node.parent &&
        sourceCode.getTokenBefore(node).value !== '('
      );
    }

    /**
     * Check indent for nodes list
     * @param {ASTNode} node The node to check
     * @param {Number} indent needed indent
     * @param {Boolean} excludeCommas skip comma on start of line
     */
    function checkNodesIndent(node, indent, excludeCommas) {
      const nodeIndent = getNodeIndent(node, false, excludeCommas);
      const isCorrectRightInLogicalExp = isRightInLogicalExp(node) && (nodeIndent - indent) === indentSize;
      const isCorrectAlternateInCondExp = isAlternateInConditionalExp(node) && (nodeIndent - indent) === 0;
      if (
        nodeIndent !== indent &&
        astUtil.isNodeFirstInLine(context, node) &&
        !isCorrectRightInLogicalExp &&
        !isCorrectAlternateInCondExp
      ) {
        report(node, indent, nodeIndent);
      }
    }

    return {
      JSXOpeningElement: function(node) {
        let prevToken = sourceCode.getTokenBefore(node);
        if (!prevToken) {
          return;
        }
        // Use the parent in a list or an array
        if (prevToken.type === 'JSXText' || prevToken.type === 'Punctuator' && prevToken.value === ',') {
          prevToken = sourceCode.getNodeByRangeIndex(prevToken.range[0]);
          prevToken = prevToken.type === 'Literal' || prevToken.type === 'JSXText' ? prevToken.parent : prevToken;
        // Use the first non-punctuator token in a conditional expression
        } else if (prevToken.type === 'Punctuator' && prevToken.value === ':') {
          do {
            prevToken = sourceCode.getTokenBefore(prevToken);
          } while (prevToken.type === 'Punctuator');
          prevToken = sourceCode.getNodeByRangeIndex(prevToken.range[0]);
          while (prevToken.parent && prevToken.parent.type !== 'ConditionalExpression') {
            prevToken = prevToken.parent;
          }
        }
        prevToken = prevToken.type === 'JSXExpressionContainer' ? prevToken.expression : prevToken;

        const parentElementIndent = getNodeIndent(prevToken);
        const indent = (
          prevToken.loc.start.line === node.loc.start.line ||
          isRightInLogicalExp(node) ||
          isAlternateInConditionalExp(node)
        ) ? 0 : indentSize;
        checkNodesIndent(node, parentElementIndent + indent);
      },
      JSXClosingElement: function(node) {
        if (!node.parent) {
          return;
        }
        const peerElementIndent = getNodeIndent(node.parent.openingElement);
        checkNodesIndent(node, peerElementIndent);
      },
      JSXExpressionContainer: function(node) {
        if (!node.parent) {
          return;
        }
        const parentNodeIndent = getNodeIndent(node.parent);
        checkNodesIndent(node, parentNodeIndent + indentSize);
      }
    };
  }
};


/***/ }),
/* 636 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Validate props indentation in JSX
 * @author Yannick Croissant

 * This rule has been ported and modified from eslint and nodeca.
 * @author Vitaly Puzrin
 * @author Gyandeep Singh
 * @copyright 2015 Vitaly Puzrin. All rights reserved.
 * @copyright 2015 Gyandeep Singh. All rights reserved.
 Copyright (C) 2014 by Vitaly Puzrin

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the 'Software'), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */


const astUtil = __webpack_require__(581);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'Validate props indentation in JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-indent-props')
    },
    fixable: 'code',

    schema: [{
      oneOf: [{
        enum: ['tab', 'first']
      }, {
        type: 'integer'
      }]
    }]
  },

  create: function(context) {
    const MESSAGE = 'Expected indentation of {{needed}} {{type}} {{characters}} but found {{gotten}}.';

    const extraColumnStart = 0;
    let indentType = 'space';
    let indentSize = 4;

    const sourceCode = context.getSourceCode();

    if (context.options.length) {
      if (context.options[0] === 'first') {
        indentSize = 'first';
        indentType = 'space';
      } else if (context.options[0] === 'tab') {
        indentSize = 1;
        indentType = 'tab';
      } else if (typeof context.options[0] === 'number') {
        indentSize = context.options[0];
        indentType = 'space';
      }
    }

    /**
     * Reports a given indent violation and properly pluralizes the message
     * @param {ASTNode} node Node violating the indent rule
     * @param {Number} needed Expected indentation character count
     * @param {Number} gotten Indentation character count in the actual node/code
     */
    function report(node, needed, gotten) {
      const msgContext = {
        needed: needed,
        type: indentType,
        characters: needed === 1 ? 'character' : 'characters',
        gotten: gotten
      };

      context.report({
        node: node,
        message: MESSAGE,
        data: msgContext,
        fix: function(fixer) {
          return fixer.replaceTextRange([node.range[0] - node.loc.start.column, node.range[0]],
            Array(needed + 1).join(indentType === 'space' ? ' ' : '\t'));
        }
      });
    }

    /**
     * Get node indent
     * @param {ASTNode} node Node to examine
     * @return {Number} Indent
     */
    function getNodeIndent(node) {
      let src = sourceCode.getText(node, node.loc.start.column + extraColumnStart);
      const lines = src.split('\n');
      src = lines[0];

      let regExp;
      if (indentType === 'space') {
        regExp = /^[ ]+/;
      } else {
        regExp = /^[\t]+/;
      }

      const indent = regExp.exec(src);
      return indent ? indent[0].length : 0;
    }

    /**
     * Check indent for nodes list
     * @param {ASTNode[]} nodes list of node objects
     * @param {Number} indent needed indent
     * @param {Boolean} excludeCommas skip comma on start of line
     */
    function checkNodesIndent(nodes, indent) {
      nodes.forEach(node => {
        const nodeIndent = getNodeIndent(node);
        if (
          node.type !== 'ArrayExpression' && node.type !== 'ObjectExpression' &&
          nodeIndent !== indent && astUtil.isNodeFirstInLine(context, node)
        ) {
          report(node, indent, nodeIndent);
        }
      });
    }

    return {
      JSXOpeningElement: function(node) {
        if (!node.attributes.length) {
          return;
        }
        let propIndent;
        if (indentSize === 'first') {
          const firstPropNode = node.attributes[0];
          propIndent = firstPropNode.loc.start.column;
        } else {
          const elementIndent = getNodeIndent(node);
          propIndent = elementIndent + indentSize;
        }
        checkNodesIndent(node.attributes, propIndent);
      }
    };
  }
};


/***/ }),
/* 637 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Report missing `key` props in iterators/collection literals.
 * @author Ben Mosher
 */


const hasProp = __webpack_require__(638);
const docsUrl = __webpack_require__(587);


// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Report missing `key` props in iterators/collection literals',
      category: 'Possible Errors',
      recommended: true,
      url: docsUrl('jsx-key')
    },
    schema: []
  },

  create: function(context) {
    function checkIteratorElement(node) {
      if (node.type === 'JSXElement' && !hasProp(node.openingElement.attributes, 'key')) {
        context.report({
          node: node,
          message: 'Missing "key" prop for element in iterator'
        });
      }
    }

    function getReturnStatement(body) {
      return body.filter(item => item.type === 'ReturnStatement')[0];
    }

    return {
      JSXElement: function(node) {
        if (hasProp(node.openingElement.attributes, 'key')) {
          return;
        }

        if (node.parent.type === 'ArrayExpression') {
          context.report({
            node: node,
            message: 'Missing "key" prop for element in array'
          });
        }
      },

      // Array.prototype.map
      CallExpression: function (node) {
        if (node.callee && node.callee.type !== 'MemberExpression') {
          return;
        }

        if (node.callee && node.callee.property && node.callee.property.name !== 'map') {
          return;
        }

        const fn = node.arguments[0];
        const isFn = fn && fn.type === 'FunctionExpression';
        const isArrFn = fn && fn.type === 'ArrowFunctionExpression';

        if (isArrFn && fn.body.type === 'JSXElement') {
          checkIteratorElement(fn.body);
        }

        if (isFn || isArrFn) {
          if (fn.body.type === 'BlockStatement') {
            const returnStatement = getReturnStatement(fn.body.body);
            if (returnStatement && returnStatement.argument) {
              checkIteratorElement(returnStatement.argument);
            }
          }
        }
      }
    };
  }
};


/***/ }),
/* 638 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(590).hasProp; // eslint-disable-line import/no-unresolved


/***/ }),
/* 639 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Validate JSX maximum depth
 * @author Chris<wfsr@foxmail.com>
 */


const has = __webpack_require__(574);
const variableUtil = __webpack_require__(579);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'Validate JSX maximum depth',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-max-depth')
    },
    schema: [
      {
        type: 'object',
        properties: {
          max: {
            type: 'integer',
            minimum: 0
          }
        },
        additionalProperties: false
      }
    ]
  },
  create: function(context) {
    const MESSAGE = 'Expected the depth of nested jsx elements to be <= {{needed}}, but found {{found}}.';
    const DEFAULT_DEPTH = 2;

    const option = context.options[0] || {};
    const maxDepth = has(option, 'max') ? option.max : DEFAULT_DEPTH;

    function isJSXElement(node) {
      return node.type === 'JSXElement';
    }

    function isExpression(node) {
      return node.type === 'JSXExpressionContainer';
    }

    function hasJSX(node) {
      return isJSXElement(node) || isExpression(node) && isJSXElement(node.expression);
    }

    function isLeaf(node) {
      const children = node.children;

      return !children.length || !children.some(hasJSX);
    }

    function getDepth(node) {
      let count = 0;

      while (isJSXElement(node.parent) || isExpression(node.parent)) {
        node = node.parent;
        if (isJSXElement(node)) {
          count++;
        }
      }

      return count;
    }


    function report(node, depth) {
      context.report({
        node: node,
        message: MESSAGE,
        data: {
          found: depth,
          needed: maxDepth
        }
      });
    }

    function findJSXElement(variables, name) {
      function find(refs) {
        let i = refs.length;

        while (--i >= 0) {
          if (has(refs[i], 'writeExpr')) {
            const writeExpr = refs[i].writeExpr;

            return isJSXElement(writeExpr)
              && writeExpr
              || writeExpr.type === 'Identifier'
              && findJSXElement(variables, writeExpr.name);
          }
        }

        return null;
      }

      const variable = variableUtil.getVariable(variables, name);
      return variable && variable.references && find(variable.references);
    }

    function checkDescendant(baseDepth, children) {
      children.forEach(node => {
        if (!hasJSX(node)) {
          return;
        }

        baseDepth++;
        if (baseDepth > maxDepth) {
          report(node, baseDepth);
        } else if (!isLeaf(node)) {
          checkDescendant(baseDepth, node.children);
        }
      });
    }

    return {
      JSXElement: function(node) {
        if (!isLeaf(node)) {
          return;
        }

        const depth = getDepth(node);
        if (depth > maxDepth) {
          report(node, depth);
        }
      },
      JSXExpressionContainer: function(node) {
        if (node.expression.type !== 'Identifier') {
          return;
        }

        const variables = variableUtil.variablesInScope(context);
        const element = findJSXElement(variables, node.expression.name);

        if (element) {
          const baseDepth = getDepth(node);
          checkDescendant(baseDepth, element.children);
        }
      }
    };
  }
};


/***/ }),
/* 640 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Limit maximum of props on a single line in JSX
 * @author Yannick Croissant
 */



const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Limit maximum of props on a single line in JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-max-props-per-line')
    },
    fixable: 'code',
    schema: [{
      type: 'object',
      properties: {
        maximum: {
          type: 'integer',
          minimum: 1
        },
        when: {
          type: 'string',
          enum: ['always', 'multiline']
        }
      }
    }]
  },

  create: function (context) {
    const sourceCode = context.getSourceCode();
    const configuration = context.options[0] || {};
    const maximum = configuration.maximum || 1;
    const when = configuration.when || 'always';

    function getPropName(propNode) {
      if (propNode.type === 'JSXSpreadAttribute') {
        return sourceCode.getText(propNode.argument);
      }
      return propNode.name.name;
    }

    function generateFixFunction(line, max) {
      const output = [];
      const front = line[0].range[0];
      const back = line[line.length - 1].range[1];
      for (let i = 0; i < line.length; i += max) {
        const nodes = line.slice(i, i + max);
        output.push(nodes.reduce((prev, curr) => {
          if (prev === '') {
            return sourceCode.getText(curr);
          }
          return `${prev} ${sourceCode.getText(curr)}`;
        }, ''));
      }
      const code = output.join('\n');
      return function(fixer) {
        return fixer.replaceTextRange([front, back], code);
      };
    }

    return {
      JSXOpeningElement: function (node) {
        if (!node.attributes.length) {
          return;
        }

        if (when === 'multiline' && node.loc.start.line === node.loc.end.line) {
          return;
        }

        const firstProp = node.attributes[0];
        const linePartitionedProps = [[firstProp]];

        node.attributes.reduce((last, decl) => {
          if (last.loc.end.line === decl.loc.start.line) {
            linePartitionedProps[linePartitionedProps.length - 1].push(decl);
          } else {
            linePartitionedProps.push([decl]);
          }
          return decl;
        });

        linePartitionedProps.forEach(propsInLine => {
          if (propsInLine.length > maximum) {
            const name = getPropName(propsInLine[maximum]);
            context.report({
              node: propsInLine[maximum],
              message: `Prop \`${name}\` must be placed on a new line`,
              fix: generateFixFunction(propsInLine, maximum)
            });
          }
        });
      }
    };
  }
};


/***/ }),
/* 641 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevents usage of Function.prototype.bind and arrow functions
 *               in React component props.
 * @author Daniel Lo Nigro <dan.cx>
 * @author Jacky Ho
 */


const propName = __webpack_require__(642);
const Components = __webpack_require__(578);
const docsUrl = __webpack_require__(587);
const jsxUtil = __webpack_require__(643);

// -----------------------------------------------------------------------------
// Rule Definition
// -----------------------------------------------------------------------------

const violationMessageStore = {
  bindCall: 'JSX props should not use .bind()',
  arrowFunc: 'JSX props should not use arrow functions',
  bindExpression: 'JSX props should not use ::',
  func: 'JSX props should not use functions'
};

module.exports = {
  meta: {
    docs: {
      description: 'Prevents usage of Function.prototype.bind and arrow functions in React component props',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('jsx-no-bind')
    },

    schema: [{
      type: 'object',
      properties: {
        allowArrowFunctions: {
          default: false,
          type: 'boolean'
        },
        allowBind: {
          default: false,
          type: 'boolean'
        },
        allowFunctions: {
          default: false,
          type: 'boolean'
        },
        ignoreRefs: {
          default: false,
          type: 'boolean'
        },
        ignoreDOMComponents: {
          default: false,
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect(context => {
    const configuration = context.options[0] || {};

    // Keep track of all the variable names pointing to a bind call,
    // bind expression or an arrow function in different block statements
    const blockVariableNameSets = {};

    function setBlockVariableNameSet(blockStart) {
      blockVariableNameSets[blockStart] = {
        arrowFunc: new Set(),
        bindCall: new Set(),
        bindExpression: new Set(),
        func: new Set()
      };
    }

    function getNodeViolationType(node) {
      const nodeType = node.type;

      if (
        !configuration.allowBind &&
        nodeType === 'CallExpression' &&
        node.callee.type === 'MemberExpression' &&
        node.callee.property.type === 'Identifier' &&
        node.callee.property.name === 'bind'
      ) {
        return 'bindCall';
      } else if (
        nodeType === 'ConditionalExpression'
      ) {
        return getNodeViolationType(node.test) ||
               getNodeViolationType(node.consequent) ||
               getNodeViolationType(node.alternate);
      } else if (
        !configuration.allowArrowFunctions &&
        nodeType === 'ArrowFunctionExpression'
      ) {
        return 'arrowFunc';
      } else if (
        !configuration.allowFunctions &&
        nodeType === 'FunctionExpression'
      ) {
        return 'func';
      } else if (
        !configuration.allowBind &&
        nodeType === 'BindExpression'
      ) {
        return 'bindExpression';
      }

      return null;
    }

    function addVariableNameToSet(violationType, variableName, blockStart) {
      blockVariableNameSets[blockStart][violationType].add(variableName);
    }

    function getBlockStatementAncestors(node) {
      return context.getAncestors(node).reverse().filter(
        ancestor => ancestor.type === 'BlockStatement'
      );
    }

    function reportVariableViolation(node, name, blockStart) {
      const blockSets = blockVariableNameSets[blockStart];
      const violationTypes = Object.keys(blockSets);

      return violationTypes.find(type => {
        if (blockSets[type].has(name)) {
          context.report({node: node, message: violationMessageStore[type]});
          return true;
        }

        return false;
      });
    }

    function findVariableViolation(node, name) {
      getBlockStatementAncestors(node).find(
        block => reportVariableViolation(node, name, block.start)
      );
    }

    return {
      BlockStatement(node) {
        setBlockVariableNameSet(node.start);
      },

      VariableDeclarator(node) {
        if (!node.init) {
          return;
        }
        const blockAncestors = getBlockStatementAncestors(node);
        const variableViolationType = getNodeViolationType(node.init);

        if (
          blockAncestors.length > 0 &&
          variableViolationType &&
          node.parent.kind === 'const' // only support const right now
        ) {
          addVariableNameToSet(
            variableViolationType, node.id.name, blockAncestors[0].start
          );
        }
      },

      JSXAttribute: function (node) {
        const isRef = configuration.ignoreRefs && propName(node) === 'ref';
        if (isRef || !node.value || !node.value.expression) {
          return;
        }
        const isDOMComponent = jsxUtil.isDOMComponent(node.parent);
        if (configuration.ignoreDOMComponents && isDOMComponent) {
          return;
        }
        const valueNode = node.value.expression;
        const valueNodeType = valueNode.type;
        const nodeViolationType = getNodeViolationType(valueNode);

        if (valueNodeType === 'Identifier') {
          findVariableViolation(node, valueNode.name);
        } else if (nodeViolationType) {
          context.report({
            node: node, message: violationMessageStore[nodeViolationType]
          });
        }
      }
    };
  })
};


/***/ }),
/* 642 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(590).propName; // eslint-disable-line import/no-unresolved


/***/ }),
/* 643 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Utility functions for JSX
 */


const elementType = __webpack_require__(644);

const COMPAT_TAG_REGEX = /^[a-z]|\-/;

/**
 * Checks if a node represents a DOM element.
 * @param {String} node - JSXOpeningElement to check.
 * @returns {boolean} Whether or not the node corresponds to a DOM element.
 */
function isDOMComponent(node) {
  let name = elementType(node);

  // Get namespace if the type is JSXNamespacedName or JSXMemberExpression
  if (name.indexOf(':') > -1) {
    name = name.slice(0, name.indexOf(':'));
  } else if (name.indexOf('.') > -1) {
    name = name.slice(0, name.indexOf('.'));
  }

  return COMPAT_TAG_REGEX.test(name);
}

module.exports = {
  isDOMComponent: isDOMComponent
};


/***/ }),
/* 644 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(590).elementType;  // eslint-disable-line import/no-unresolved


/***/ }),
/* 645 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Comments inside children section of tag should be placed inside braces.
 * @author Ben Vinegar
 */


const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Comments inside children section of tag should be placed inside braces',
      category: 'Possible Errors',
      recommended: true,
      url: docsUrl('jsx-no-comment-textnodes')
    },

    schema: [{
      type: 'object',
      properties: {},
      additionalProperties: false
    }]
  },

  create: function(context) {
    function reportLiteralNode(node) {
      context.report(node, 'Comments inside children section of tag should be placed inside braces');
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      Literal: function(node) {
        const sourceCode = context.getSourceCode();
        // since babel-eslint has the wrong node.raw, we'll get the source text
        const rawValue = sourceCode.getText(node);
        if (/^\s*\/(\/|\*)/m.test(rawValue)) {
          // inside component, e.g. <div>literal</div>
          if (node.parent.type !== 'JSXAttribute' &&
              node.parent.type !== 'JSXExpressionContainer' &&
              node.parent.type.indexOf('JSX') !== -1) {
            reportLiteralNode(node);
          }
        }
      }
    };
  }
};


/***/ }),
/* 646 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce no duplicate props
 * @author Markus Ånöstam
 */



const has = __webpack_require__(574);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce no duplicate props',
      category: 'Possible Errors',
      recommended: true,
      url: docsUrl('jsx-no-duplicate-props')
    },

    schema: [{
      type: 'object',
      properties: {
        ignoreCase: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: function (context) {
    const configuration = context.options[0] || {};
    const ignoreCase = configuration.ignoreCase || false;

    return {
      JSXOpeningElement: function (node) {
        const props = {};

        node.attributes.forEach(decl => {
          if (decl.type === 'JSXSpreadAttribute') {
            return;
          }

          let name = decl.name.name;

          if (typeof name !== 'string') {
            return;
          }

          if (ignoreCase) {
            name = name.toLowerCase();
          }

          if (has(props, name)) {
            context.report({
              node: decl,
              message: 'No duplicate props allowed'
            });
          } else {
            props[name] = 1;
          }
        });
      }
    };
  }
};


/***/ }),
/* 647 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent using string literals in React component definition
 * @author Caleb Morris
 * @author David Buchan-Swanson
 */


const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent using string literals in React component definition',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-no-literals')
    },

    schema: [{
      type: 'object',
      properties: {
        noStrings: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: function(context) {
    const isNoStrings = context.options[0] ? context.options[0].noStrings : false;

    const message = isNoStrings ?
      'Strings not allowed in JSX files' :
      'Missing JSX expression container around literal string';

    function reportLiteralNode(node) {
      context.report({
        node: node,
        message: message
      });
    }

    function getParentIgnoringBinaryExpressions(node) {
      let current = node;
      while (current.parent.type === 'BinaryExpression') {
        current = current.parent;
      }
      return current.parent;
    }

    function getValidation(node) {
      const parent = getParentIgnoringBinaryExpressions(node);
      const standard = !/^[\s]+$/.test(node.value) &&
          typeof node.value === 'string' &&
          parent.type.indexOf('JSX') !== -1 &&
          parent.type !== 'JSXAttribute';
      if (isNoStrings) {
        return standard;
      }
      return standard && parent.type !== 'JSXExpressionContainer';
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {

      Literal: function(node) {
        if (getValidation(node)) {
          reportLiteralNode(node);
        }
      },

      JSXText: function(node) {
        if (getValidation(node)) {
          reportLiteralNode(node);
        }
      },

      TemplateLiteral: function(node) {
        const parent = getParentIgnoringBinaryExpressions(node);
        if (isNoStrings && parent.type === 'JSXExpressionContainer') {
          reportLiteralNode(node);
        }
      }

    };
  }
};


/***/ }),
/* 648 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Forbid target='_blank' attribute
 * @author Kevin Miller
 */


const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

function isTargetBlank(attr) {
  return attr.name.name === 'target' &&
    attr.value.type === 'Literal' &&
    attr.value.value.toLowerCase() === '_blank';
}

function hasExternalLink(element) {
  return element.attributes.some(attr => attr.name &&
      attr.name.name === 'href' &&
      attr.value.type === 'Literal' &&
      /^(?:\w+:|\/\/)/.test(attr.value.value));
}

function hasDynamicLink(element) {
  return element.attributes.some(attr => attr.name &&
    attr.name.name === 'href' &&
    attr.value.type === 'JSXExpressionContainer');
}

function hasSecureRel(element) {
  return element.attributes.find(attr => {
    if (attr.type === 'JSXAttribute' && attr.name.name === 'rel') {
      const tags = attr.value && attr.value.type === 'Literal' && attr.value.value.toLowerCase().split(' ');
      return tags && (tags.indexOf('noopener') >= 0 && tags.indexOf('noreferrer') >= 0);
    }
    return false;
  });
}

module.exports = {
  meta: {
    docs: {
      description: 'Forbid target="_blank" attribute without rel="noopener noreferrer"',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('jsx-no-target-blank')
    },
    schema: [{
      type: 'object',
      properties: {
        enforceDynamicLinks: {
          enum: ['always', 'never']
        }
      },
      additionalProperties: false
    }]
  },

  create: function(context) {
    const configuration = context.options[0] || {};
    const enforceDynamicLinks = configuration.enforceDynamicLinks || 'always';

    return {
      JSXAttribute: function(node) {
        if (node.parent.name.name !== 'a' || !isTargetBlank(node) || hasSecureRel(node.parent)) {
          return;
        }

        if (hasExternalLink(node.parent) || (enforceDynamicLinks === 'always' && hasDynamicLink(node.parent))) {
          context.report(node, 'Using target="_blank" without rel="noopener noreferrer" ' +
          'is a security risk: see https://mathiasbynens.github.io/rel-noopener');
        }
      }
    };
  }
};


/***/ }),
/* 649 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Limit to one expression per line in JSX
 * @author Mark Ivan Allen <Vydia.com>
 */



const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const optionDefaults = {
  allow: 'none'
};

module.exports = {
  meta: {
    docs: {
      description: 'Limit to one expression per line in JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-one-expression-per-line')
    },
    fixable: 'whitespace',
    schema: [
      {
        type: 'object',
        properties: {
          allow: {
            enum: ['none', 'literal', 'single-child']
          }
        },
        default: optionDefaults,
        additionalProperties: false
      }
    ]
  },

  create: function (context) {
    const options = Object.assign({}, optionDefaults, context.options[0]);
    const sourceCode = context.getSourceCode();

    function nodeKey (node) {
      return `${node.loc.start.line},${node.loc.start.column}`;
    }

    function nodeDescriptor (n) {
      return n.openingElement ? n.openingElement.name.name : sourceCode.getText(n).replace(/\n/g, '');
    }

    return {
      JSXElement: function (node) {
        const children = node.children;

        if (!children || !children.length) {
          return;
        }

        const openingElement = node.openingElement;
        const closingElement = node.closingElement;
        const openingElementStartLine = openingElement.loc.start.line;
        const openingElementEndLine = openingElement.loc.end.line;
        const closingElementStartLine = closingElement.loc.start.line;
        const closingElementEndLine = closingElement.loc.end.line;

        if (children.length === 1) {
          const child = children[0];
          if (
            openingElementStartLine === openingElementEndLine &&
            openingElementEndLine === closingElementStartLine &&
            closingElementStartLine === closingElementEndLine &&
            closingElementEndLine === child.loc.start.line &&
            child.loc.start.line === child.loc.end.line
          ) {
            if (
              options.allow === 'single-child' ||
              options.allow === 'literal' && (child.type === 'Literal' || child.type === 'JSXText')
            ) {
              return;
            }
          }
        }

        const childrenGroupedByLine = {};
        const fixDetailsByNode = {};

        children.forEach(child => {
          let countNewLinesBeforeContent = 0;
          let countNewLinesAfterContent = 0;

          if (child.type === 'Literal' || child.type === 'JSXText') {
            if (/^\s*$/.test(child.raw)) {
              return;
            }

            countNewLinesBeforeContent = (child.raw.match(/^ *\n/g) || []).length;
            countNewLinesAfterContent = (child.raw.match(/\n *$/g) || []).length;
          }

          const startLine = child.loc.start.line + countNewLinesBeforeContent;
          const endLine = child.loc.end.line - countNewLinesAfterContent;

          if (startLine === endLine) {
            if (!childrenGroupedByLine[startLine]) {
              childrenGroupedByLine[startLine] = [];
            }
            childrenGroupedByLine[startLine].push(child);
          } else {
            if (!childrenGroupedByLine[startLine]) {
              childrenGroupedByLine[startLine] = [];
            }
            childrenGroupedByLine[startLine].push(child);
            if (!childrenGroupedByLine[endLine]) {
              childrenGroupedByLine[endLine] = [];
            }
            childrenGroupedByLine[endLine].push(child);
          }
        });

        Object.keys(childrenGroupedByLine).forEach(_line => {
          const line = parseInt(_line, 10);
          const firstIndex = 0;
          const lastIndex = childrenGroupedByLine[line].length - 1;

          childrenGroupedByLine[line].forEach((child, i) => {
            let prevChild;
            let nextChild;

            if (i === firstIndex) {
              if (line === openingElementEndLine) {
                prevChild = openingElement;
              }
            } else {
              prevChild = childrenGroupedByLine[line][i - 1];
            }

            if (i === lastIndex) {
              if (line === closingElementStartLine) {
                nextChild = closingElement;
              }
            } else {
              // We don't need to append a trailing because the next child will prepend a leading.
              // nextChild = childrenGroupedByLine[line][i + 1];
            }

            function spaceBetweenPrev () {
              return ((prevChild.type === 'Literal' || prevChild.type === 'JSXText') && / $/.test(prevChild.raw)) ||
                ((child.type === 'Literal' || child.type === 'JSXText') && /^ /.test(child.raw)) ||
                sourceCode.isSpaceBetweenTokens(prevChild, child);
            }

            function spaceBetweenNext () {
              return ((nextChild.type === 'Literal' || nextChild.type === 'JSXText') && /^ /.test(nextChild.raw)) ||
                ((child.type === 'Literal' || child.type === 'JSXText') && / $/.test(child.raw)) ||
                sourceCode.isSpaceBetweenTokens(child, nextChild);
            }

            if (!prevChild && !nextChild) {
              return;
            }

            const source = sourceCode.getText(child);
            const leadingSpace = !!(prevChild && spaceBetweenPrev());
            const trailingSpace = !!(nextChild && spaceBetweenNext());
            const leadingNewLine = !!prevChild;
            const trailingNewLine = !!nextChild;

            const key = nodeKey(child);

            if (!fixDetailsByNode[key]) {
              fixDetailsByNode[key] = {
                node: child,
                source: source,
                descriptor: nodeDescriptor(child)
              };
            }

            if (leadingSpace) {
              fixDetailsByNode[key].leadingSpace = true;
            }
            if (leadingNewLine) {
              fixDetailsByNode[key].leadingNewLine = true;
            }
            if (trailingNewLine) {
              fixDetailsByNode[key].trailingNewLine = true;
            }
            if (trailingSpace) {
              fixDetailsByNode[key].trailingSpace = true;
            }
          });
        });

        Object.keys(fixDetailsByNode).forEach(key => {
          const details = fixDetailsByNode[key];

          const nodeToReport = details.node;
          const descriptor = details.descriptor;
          const source = details.source.replace(/(^ +| +(?=\n)*$)/g, '');

          const leadingSpaceString = details.leadingSpace ? '\n{\' \'}' : '';
          const trailingSpaceString = details.trailingSpace ? '{\' \'}\n' : '';
          const leadingNewLineString = details.leadingNewLine ? '\n' : '';
          const trailingNewLineString = details.trailingNewLine ? '\n' : '';

          const replaceText = `${leadingSpaceString}${leadingNewLineString}${source}${trailingNewLineString}${trailingSpaceString}`;

          context.report({
            node: nodeToReport,
            message: `\`${descriptor}\` must be placed on a new line`,
            fix: function (fixer) {
              return fixer.replaceText(nodeToReport, replaceText);
            }
          });
        });
      }
    };
  }
};


/***/ }),
/* 650 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Disallow undeclared variables in JSX
 * @author Yannick Croissant
 */



const docsUrl = __webpack_require__(587);
const jsxUtil = __webpack_require__(643);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Disallow undeclared variables in JSX',
      category: 'Possible Errors',
      recommended: true,
      url: docsUrl('jsx-no-undef')
    },
    schema: [{
      type: 'object',
      properties: {
        allowGlobals: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: function(context) {
    const config = context.options[0] || {};
    const allowGlobals = config.allowGlobals || false;

    /**
     * Compare an identifier with the variables declared in the scope
     * @param {ASTNode} node - Identifier or JSXIdentifier node
     * @returns {void}
     */
    function checkIdentifierInJSX(node) {
      let scope = context.getScope();
      const sourceCode = context.getSourceCode();
      const sourceType = sourceCode.ast.sourceType;
      let variables = scope.variables;
      let scopeType = 'global';
      let i;
      let len;

      // Ignore 'this' keyword (also maked as JSXIdentifier when used in JSX)
      if (node.name === 'this') {
        return;
      }

      if (!allowGlobals && sourceType === 'module') {
        scopeType = 'module';
      }

      while (scope.type !== scopeType) {
        scope = scope.upper;
        variables = scope.variables.concat(variables);
      }
      if (scope.childScopes.length) {
        variables = scope.childScopes[0].variables.concat(variables);
        // Temporary fix for babel-eslint
        if (scope.childScopes[0].childScopes.length) {
          variables = scope.childScopes[0].childScopes[0].variables.concat(variables);
        }
      }

      for (i = 0, len = variables.length; i < len; i++) {
        if (variables[i].name === node.name) {
          return;
        }
      }

      context.report({
        node: node,
        message: `'${node.name}' is not defined.`
      });
    }

    return {
      JSXOpeningElement: function(node) {
        switch (node.name.type) {
          case 'JSXIdentifier':
            if (jsxUtil.isDOMComponent(node)) {
              return;
            }
            node = node.name;
            break;
          case 'JSXMemberExpression':
            node = node.name;
            do {
              node = node.object;
            } while (node && node.type !== 'JSXIdentifier');
            break;
          case 'JSXNamespacedName':
            node = node.name.namespace;
            break;
          default:
            break;
        }
        checkIdentifierInJSX(node);
      }
    };
  }
};


/***/ }),
/* 651 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce curly braces or disallow unnecessary curly brace in JSX
 * @author Jacky Ho
 * @author Simon Lydell
 */


const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const OPTION_ALWAYS = 'always';
const OPTION_NEVER = 'never';
const OPTION_IGNORE = 'ignore';

const OPTION_VALUES = [
  OPTION_ALWAYS,
  OPTION_NEVER,
  OPTION_IGNORE
];
const DEFAULT_CONFIG = {props: OPTION_NEVER, children: OPTION_NEVER};

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description:
        'Disallow unnecessary JSX expressions when literals alone are sufficient ' +
          'or enfore JSX expressions on literals in JSX children or attributes',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-curly-brace-presence')
    },
    fixable: 'code',

    schema: [
      {
        oneOf: [
          {
            type: 'object',
            properties: {
              props: {enum: OPTION_VALUES, default: DEFAULT_CONFIG.props},
              children: {enum: OPTION_VALUES, default: DEFAULT_CONFIG.children}
            },
            additionalProperties: false
          },
          {
            enum: OPTION_VALUES
          }
        ]
      }
    ]
  },

  create: function(context) {
    const ruleOptions = context.options[0];
    const userConfig = typeof ruleOptions === 'string' ?
      {props: ruleOptions, children: ruleOptions} :
      Object.assign({}, DEFAULT_CONFIG, ruleOptions);

    function containsLineTerminators(rawStringValue) {
      return /[\n\r\u2028\u2029]/.test(rawStringValue);
    }

    function containsBackslash(rawStringValue) {
      return rawStringValue.includes('\\');
    }

    function containsHTMLEntity(rawStringValue) {
      return /&[A-Za-z\d#]+;/.test(rawStringValue);
    }

    function containsDisallowedJSXTextChars(rawStringValue) {
      return /[{<>}]/.test(rawStringValue);
    }

    function containsQuoteCharacters(value) {
      return /['"]/.test(value);
    }

    function escapeDoubleQuotes(rawStringValue) {
      return rawStringValue.replace(/\\"/g, '"').replace(/"/g, '\\"');
    }

    function escapeBackslashes(rawStringValue) {
      return rawStringValue.replace(/\\/g, '\\\\');
    }

    function needToEscapeCharacterForJSX(raw) {
      return (
        containsBackslash(raw) ||
        containsHTMLEntity(raw) ||
        containsDisallowedJSXTextChars(raw)
      );
    }

    function containsWhitespaceExpression(child) {
      if (child.type === 'JSXExpressionContainer') {
        const value = child.expression.value;
        return value ? !(/\S/.test(value)) : false;
      }
      return false;
    }

    /**
     * Report and fix an unnecessary curly brace violation on a node
     * @param {ASTNode} node - The AST node with an unnecessary JSX expression
     */
    function reportUnnecessaryCurly(JSXExpressionNode) {
      context.report({
        node: JSXExpressionNode,
        message: 'Curly braces are unnecessary here.',
        fix: function(fixer) {
          const expression = JSXExpressionNode.expression;
          const expressionType = expression.type;
          const parentType = JSXExpressionNode.parent.type;

          let textToReplace;
          if (parentType === 'JSXAttribute') {
            textToReplace = `"${expressionType === 'TemplateLiteral' ?
              expression.quasis[0].value.raw :
              expression.raw.substring(1, expression.raw.length - 1)
            }"`;
          } else {
            textToReplace = expressionType === 'TemplateLiteral' ?
              expression.quasis[0].value.cooked : expression.value;
          }

          return fixer.replaceText(JSXExpressionNode, textToReplace);
        }
      });
    }

    function reportMissingCurly(literalNode) {
      context.report({
        node: literalNode,
        message: 'Need to wrap this literal in a JSX expression.',
        fix: function(fixer) {
          // If a HTML entity name is found, bail out because it can be fixed
          // by either using the real character or the unicode equivalent.
          // If it contains any line terminator character, bail out as well.
          if (
            containsHTMLEntity(literalNode.raw) ||
            containsLineTerminators(literalNode.raw)
          ) {
            return null;
          }

          const expression = literalNode.parent.type === 'JSXAttribute' ?
            `{"${escapeDoubleQuotes(escapeBackslashes(
              literalNode.raw.substring(1, literalNode.raw.length - 1)
            ))}"}` :
            `{${JSON.stringify(literalNode.value)}}`;

          return fixer.replaceText(literalNode, expression);
        }
      });
    }

    // Bail out if there is any character that needs to be escaped in JSX
    // because escaping decreases readiblity and the original code may be more
    // readible anyway or intentional for other specific reasons
    function lintUnnecessaryCurly(JSXExpressionNode) {
      const expression = JSXExpressionNode.expression;
      const expressionType = expression.type;
      const parentType = JSXExpressionNode.parent.type;

      if (
        (expressionType === 'Literal' || expressionType === 'JSXText') &&
          typeof expression.value === 'string' &&
          !needToEscapeCharacterForJSX(expression.raw) && (
          parentType === 'JSXElement' ||
          !containsQuoteCharacters(expression.value)
        )
      ) {
        reportUnnecessaryCurly(JSXExpressionNode);
      } else if (
        expressionType === 'TemplateLiteral' &&
          expression.expressions.length === 0 &&
          !needToEscapeCharacterForJSX(expression.quasis[0].value.raw) && (
          parentType === 'JSXElement' ||
          !containsQuoteCharacters(expression.quasis[0].value.cooked)
        )
      ) {
        reportUnnecessaryCurly(JSXExpressionNode);
      }
    }

    function areRuleConditionsSatisfied(parentType, config, ruleCondition) {
      return (
        parentType === 'JSXAttribute' &&
          typeof config.props === 'string' &&
          config.props === ruleCondition
      ) || (
        parentType === 'JSXElement' &&
          typeof config.children === 'string' &&
          config.children === ruleCondition
      );
    }

    function shouldCheckForUnnecessaryCurly(parent, config) {
      const parentType = parent.type;

      // If there are more than one JSX child, there is no need to check for
      // unnecessary curly braces.
      if (parentType === 'JSXElement' && parent.children.length !== 1) {
        return false;
      }

      if (
        parent.children
        && parent.children.length === 1
        && containsWhitespaceExpression(parent.children[0])
      ) {
        return false;
      }

      return areRuleConditionsSatisfied(parentType, config, OPTION_NEVER);
    }

    function shouldCheckForMissingCurly(parent, config) {
      if (
        parent.children
        && parent.children.length === 1
        && containsWhitespaceExpression(parent.children[0])
      ) {
        return false;
      }

      return areRuleConditionsSatisfied(parent.type, config, OPTION_ALWAYS);
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      JSXExpressionContainer: node => {
        if (shouldCheckForUnnecessaryCurly(node.parent, userConfig)) {
          lintUnnecessaryCurly(node);
        }
      },

      'Literal, JSXText': node => {
        if (shouldCheckForMissingCurly(node.parent, userConfig)) {
          reportMissingCurly(node);
        }
      }
    };
  }
};


/***/ }),
/* 652 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce PascalCase for user-defined JSX components
 * @author Jake Marsh
 */



const elementType = __webpack_require__(644);
const docsUrl = __webpack_require__(587);
const jsxUtil = __webpack_require__(643);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const PASCAL_CASE_REGEX = /^([A-Z0-9]|[A-Z0-9]+[a-z0-9]+(?:[A-Z0-9]+[a-z0-9]*)*)$/;
const ALL_CAPS_TAG_REGEX = /^[A-Z0-9]+$/;

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce PascalCase for user-defined JSX components',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-pascal-case')
    },

    schema: [{
      type: 'object',
      properties: {
        allowAllCaps: {
          type: 'boolean'
        },
        ignore: {
          type: 'array'
        }
      },
      additionalProperties: false
    }]
  },

  create: function(context) {
    const configuration = context.options[0] || {};
    const allowAllCaps = configuration.allowAllCaps || false;
    const ignore = configuration.ignore || [];

    return {
      JSXOpeningElement: function(node) {
        let name = elementType(node);

        // Get namespace if the type is JSXNamespacedName or JSXMemberExpression
        if (name.indexOf(':') > -1) {
          name = name.substring(0, name.indexOf(':'));
        } else if (name.indexOf('.') > -1) {
          name = name.substring(0, name.indexOf('.'));
        }

        const isPascalCase = PASCAL_CASE_REGEX.test(name);
        const isCompatTag = jsxUtil.isDOMComponent(node);
        const isAllowedAllCaps = allowAllCaps && ALL_CAPS_TAG_REGEX.test(name);
        const isIgnored = ignore.indexOf(name) !== -1;

        if (!isPascalCase && !isCompatTag && !isAllowedAllCaps && !isIgnored) {
          context.report({
            node: node,
            message: `Imported JSX component ${name} must be in PascalCase`
          });
        }
      }
    };
  }
};


/***/ }),
/* 653 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Disallow multiple spaces between inline JSX props
 * @author Adrian Moennich
 */



const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Disallow multiple spaces between inline JSX props',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-props-no-multi-spaces')
    },
    fixable: 'code',
    schema: []
  },

  create: function (context) {
    const sourceCode = context.getSourceCode();

    function getPropName(propNode) {
      switch (propNode.type) {
        case 'JSXSpreadAttribute':
          return sourceCode.getText(propNode.argument);
        case 'JSXIdentifier':
          return propNode.name;
        case 'JSXMemberExpression':
          return `${getPropName(propNode.object)}.${propNode.property.name}`;
        default:
          return propNode.name.name;
      }
    }

    function checkSpacing(prev, node) {
      if (prev.loc.end.line !== node.loc.end.line) {
        return;
      }
      const between = sourceCode.text.slice(prev.range[1], node.range[0]);
      if (between !== ' ') {
        context.report({
          node: node,
          message: `Expected only one space between "${getPropName(prev)}" and "${getPropName(node)}"`,
          fix: function(fixer) {
            return fixer.replaceTextRange([prev.range[1], node.range[0]], ' ');
          }
        });
      }
    }

    return {
      JSXOpeningElement: function (node) {
        node.attributes.reduce((prev, prop) => {
          checkSpacing(prev, prop);
          return prop;
        }, node.name);
      }
    };
  }
};


/***/ }),
/* 654 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce default props alphabetical sorting
 * @author Vladimir Kattsov
 */


const variableUtil = __webpack_require__(579);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce default props alphabetical sorting',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-sort-default-props')
    },

    schema: [{
      type: 'object',
      properties: {
        ignoreCase: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: function(context) {
    const sourceCode = context.getSourceCode();
    const configuration = context.options[0] || {};
    const ignoreCase = configuration.ignoreCase || false;
    const propWrapperFunctions = new Set(context.settings.propWrapperFunctions || []);

    /**
     * Get properties name
     * @param {Object} node - Property.
     * @returns {String} Property name.
     */
    function getPropertyName(node) {
      if (node.key || ['MethodDefinition', 'Property'].indexOf(node.type) !== -1) {
        return node.key.name;
      } else if (node.type === 'MemberExpression') {
        return node.property.name;
      // Special case for class properties
      // (babel-eslint@5 does not expose property name so we have to rely on tokens)
      } else if (node.type === 'ClassProperty') {
        const tokens = context.getFirstTokens(node, 2);
        return tokens[1] && tokens[1].type === 'Identifier' ? tokens[1].value : tokens[0].value;
      }
      return '';
    }

    /**
     * Checks if the Identifier node passed in looks like a defaultProps declaration.
     * @param   {ASTNode}  node The node to check. Must be an Identifier node.
     * @returns {Boolean}       `true` if the node is a defaultProps declaration, `false` if not
     */
    function isDefaultPropsDeclaration(node) {
      const propName = getPropertyName(node);
      return (propName === 'defaultProps' || propName === 'getDefaultProps');
    }

    function getKey(node) {
      return sourceCode.getText(node.key || node.argument);
    }

    /**
     * Find a variable by name in the current scope.
     * @param  {string} name Name of the variable to look for.
     * @returns {ASTNode|null} Return null if the variable could not be found, ASTNode otherwise.
     */
    function findVariableByName(name) {
      const variable = variableUtil.variablesInScope(context).find(item => item.name === name);

      if (!variable || !variable.defs[0] || !variable.defs[0].node) {
        return null;
      }

      if (variable.defs[0].node.type === 'TypeAlias') {
        return variable.defs[0].node.right;
      }

      return variable.defs[0].node.init;
    }

    /**
     * Checks if defaultProps declarations are sorted
     * @param {Array} declarations The array of AST nodes being checked.
     * @returns {void}
     */
    function checkSorted(declarations) {
      declarations.reduce((prev, curr, idx, decls) => {
        if (/SpreadProperty$/.test(curr.type)) {
          return decls[idx + 1];
        }

        let prevPropName = getKey(prev);
        let currentPropName = getKey(curr);

        if (ignoreCase) {
          prevPropName = prevPropName.toLowerCase();
          currentPropName = currentPropName.toLowerCase();
        }

        if (currentPropName < prevPropName) {
          context.report({
            node: curr,
            message: 'Default prop types declarations should be sorted alphabetically'
          });

          return prev;
        }

        return curr;
      }, declarations[0]);
    }

    function checkNode(node) {
      switch (node && node.type) {
        case 'ObjectExpression':
          checkSorted(node.properties);
          break;
        case 'Identifier':
          const propTypesObject = findVariableByName(node.name);
          if (propTypesObject && propTypesObject.properties) {
            checkSorted(propTypesObject.properties);
          }
          break;
        case 'CallExpression':
          const innerNode = node.arguments && node.arguments[0];
          if (propWrapperFunctions.has(node.callee.name) && innerNode) {
            checkNode(innerNode);
          }
          break;
        default:
          break;
      }
    }

    // --------------------------------------------------------------------------
    // Public API
    // --------------------------------------------------------------------------

    return {
      ClassProperty: function(node) {
        if (!isDefaultPropsDeclaration(node)) {
          return;
        }

        checkNode(node.value);
      },

      MemberExpression: function(node) {
        if (!isDefaultPropsDeclaration(node)) {
          return;
        }

        checkNode(node.parent.right);
      }
    };
  }
};


/***/ }),
/* 655 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce props alphabetical sorting
 * @author Ilya Volodin, Yannick Croissant
 */


const propName = __webpack_require__(642);
const docsUrl = __webpack_require__(587);
const jsxUtil = __webpack_require__(643);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

function isCallbackPropName(name) {
  return /^on[A-Z]/.test(name);
}

const RESERVED_PROPS_LIST = [
  'children',
  'dangerouslySetInnerHTML',
  'key',
  'ref'
];

function isReservedPropName(name, list) {
  return list.indexOf(name) >= 0;
}

function propNameCompare(a, b, options) {
  if (options.ignoreCase) {
    a = a.toLowerCase();
    b = b.toLowerCase();
  }
  if (options.reservedFirst) {
    const aIsReserved = isReservedPropName(a, options.reservedList);
    const bIsReserved = isReservedPropName(b, options.reservedList);
    if ((aIsReserved && bIsReserved) || (!aIsReserved && !bIsReserved)) {
      return a.localeCompare(b);
    } else if (aIsReserved && !bIsReserved) {
      return -1;
    }
    return 1;
  }
  return a.localeCompare(b);
}

/**
 * Create an array of arrays where each subarray is composed of attributes
 * that are considered sortable.
 * @param {Array<JSXSpreadAttribute|JSXAttribute>} attributes
 * @return {Array<Array<JSXAttribute>}
 */
function getGroupsOfSortableAttributes(attributes) {
  const sortableAttributeGroups = [];
  let groupCount = 0;
  for (let i = 0; i < attributes.length; i++) {
    const lastAttr = attributes[i - 1];
    // If we have no groups or if the last attribute was JSXSpreadAttribute
    // then we start a new group. Append attributes to the group until we
    // come across another JSXSpreadAttribute or exhaust the array.
    if (
      !lastAttr ||
      (lastAttr.type === 'JSXSpreadAttribute' &&
        attributes[i].type !== 'JSXSpreadAttribute')
    ) {
      groupCount++;
      sortableAttributeGroups[groupCount - 1] = [];
    }
    if (attributes[i].type !== 'JSXSpreadAttribute') {
      sortableAttributeGroups[groupCount - 1].push(attributes[i]);
    }
  }
  return sortableAttributeGroups;
}

const generateFixerFunction = (node, context, reservedList) => {
  const sourceCode = context.getSourceCode();
  const attributes = node.attributes.slice(0);
  const configuration = context.options[0] || {};
  const ignoreCase = configuration.ignoreCase || false;
  const reservedFirst = configuration.reservedFirst || false;

  // Sort props according to the context. Only supports ignoreCase.
  // Since we cannot safely move JSXSpreadAttribute (due to potential variable overrides),
  // we only consider groups of sortable attributes.
  const sortableAttributeGroups = getGroupsOfSortableAttributes(attributes);
  const sortedAttributeGroups = sortableAttributeGroups.slice(0).map(group =>
    group.slice(0).sort((a, b) =>
      propNameCompare(propName(a), propName(b), {ignoreCase, reservedFirst, reservedList})
    )
  );

  return function(fixer) {
    const fixers = [];
    let source = sourceCode.getText();

    // Replace each unsorted attribute with the sorted one.
    sortableAttributeGroups.forEach((sortableGroup, ii) => {
      sortableGroup.forEach((attr, jj) => {
        const sortedAttr = sortedAttributeGroups[ii][jj];
        const sortedAttrText = sourceCode.getText(sortedAttr);
        fixers.push({
          range: [attr.range[0], attr.range[1]],
          text: sortedAttrText
        });
      });
    });

    fixers.sort((a, b) => a.range[0] < b.range[0]);

    const rangeStart = fixers[fixers.length - 1].range[0];
    const rangeEnd = fixers[0].range[1];

    fixers.forEach(fix => {
      source = `${source.substr(0, fix.range[0])}${fix.text}${source.substr(fix.range[1])}`;
    });

    return fixer.replaceTextRange([rangeStart, rangeEnd], source.substr(rangeStart, rangeEnd - rangeStart));
  };
};

/**
 * Checks if the `reservedFirst` option is valid
 * @param {Object} context The context of the rule
 * @param {Boolean|Array<String>} reservedFirst The `reservedFirst` option
 * @return {?Function} If an error is detected, a function to generate the error message, otherwise, `undefined`
 */
// eslint-disable-next-line consistent-return
function validateReservedFirstConfig(context, reservedFirst) {
  if (reservedFirst) {
    if (Array.isArray(reservedFirst)) {
      // Only allow a subset of reserved words in customized lists
      // eslint-disable-next-line consistent-return
      const nonReservedWords = reservedFirst.filter(word => {
        if (!isReservedPropName(word, RESERVED_PROPS_LIST)) {
          return true;
        }
      });

      if (reservedFirst.length === 0) {
        return function(decl) {
          context.report({
            node: decl,
            message: 'A customized reserved first list must not be empty'
          });
        };
      } else if (nonReservedWords.length > 0) {
        return function(decl) {
          context.report({
            node: decl,
            message: 'A customized reserved first list must only contain a subset of React reserved props.' +
              ' Remove: {{ nonReservedWords }}',
            data: {
              nonReservedWords: nonReservedWords.toString()
            }
          });
        };
      }
    }
  }
}

module.exports = {
  meta: {
    docs: {
      description: 'Enforce props alphabetical sorting',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-sort-props')
    },
    fixable: 'code',
    schema: [{
      type: 'object',
      properties: {
        // Whether callbacks (prefixed with "on") should be listed at the very end,
        // after all other props. Supersedes shorthandLast.
        callbacksLast: {
          type: 'boolean'
        },
        // Whether shorthand properties (without a value) should be listed first
        shorthandFirst: {
          type: 'boolean'
        },
        // Whether shorthand properties (without a value) should be listed last
        shorthandLast: {
          type: 'boolean'
        },
        ignoreCase: {
          type: 'boolean'
        },
        // Whether alphabetical sorting should be enforced
        noSortAlphabetically: {
          type: 'boolean'
        },
        reservedFirst: {
          type: ['array', 'boolean']
        }
      },
      additionalProperties: false
    }]
  },

  create: function(context) {
    const configuration = context.options[0] || {};
    const ignoreCase = configuration.ignoreCase || false;
    const callbacksLast = configuration.callbacksLast || false;
    const shorthandFirst = configuration.shorthandFirst || false;
    const shorthandLast = configuration.shorthandLast || false;
    const noSortAlphabetically = configuration.noSortAlphabetically || false;
    const reservedFirst = configuration.reservedFirst || false;
    const reservedFirstError = validateReservedFirstConfig(context, reservedFirst);
    let reservedList = Array.isArray(reservedFirst) ? reservedFirst : RESERVED_PROPS_LIST;

    return {
      JSXOpeningElement: function(node) {
        // `dangerouslySetInnerHTML` is only "reserved" on DOM components
        if (reservedFirst && !jsxUtil.isDOMComponent(node)) {
          reservedList = reservedList.filter(prop => prop !== 'dangerouslySetInnerHTML');
        }

        node.attributes.reduce((memo, decl, idx, attrs) => {
          if (decl.type === 'JSXSpreadAttribute') {
            return attrs[idx + 1];
          }

          let previousPropName = propName(memo);
          let currentPropName = propName(decl);
          const previousValue = memo.value;
          const currentValue = decl.value;
          const previousIsCallback = isCallbackPropName(previousPropName);
          const currentIsCallback = isCallbackPropName(currentPropName);

          if (ignoreCase) {
            previousPropName = previousPropName.toLowerCase();
            currentPropName = currentPropName.toLowerCase();
          }

          if (reservedFirst) {
            if (reservedFirstError) {
              reservedFirstError(decl);
              return memo;
            }

            const previousIsReserved = isReservedPropName(previousPropName, reservedList);
            const currentIsReserved = isReservedPropName(currentPropName, reservedList);

            if (previousIsReserved && !currentIsReserved) {
              return decl;
            }
            if (!previousIsReserved && currentIsReserved) {
              context.report({
                node: decl,
                message: 'Reserved props must be listed before all other props',
                fix: generateFixerFunction(node, context, reservedList)
              });
              return memo;
            }
          }

          if (callbacksLast) {
            if (!previousIsCallback && currentIsCallback) {
              // Entering the callback prop section
              return decl;
            }
            if (previousIsCallback && !currentIsCallback) {
              // Encountered a non-callback prop after a callback prop
              context.report({
                node: memo,
                message: 'Callbacks must be listed after all other props'
              });
              return memo;
            }
          }

          if (shorthandFirst) {
            if (currentValue && !previousValue) {
              return decl;
            }
            if (!currentValue && previousValue) {
              context.report({
                node: memo,
                message: 'Shorthand props must be listed before all other props'
              });
              return memo;
            }
          }

          if (shorthandLast) {
            if (!currentValue && previousValue) {
              return decl;
            }
            if (currentValue && !previousValue) {
              context.report({
                node: memo,
                message: 'Shorthand props must be listed after all other props'
              });
              return memo;
            }
          }

          if (!noSortAlphabetically && currentPropName < previousPropName) {
            context.report({
              node: decl,
              message: 'Props should be sorted alphabetically',
              fix: generateFixerFunction(node, context, reservedList)
            });
            return memo;
          }

          return decl;
        }, node.attributes[0]);
      }
    };
  }
};


/***/ }),
/* 656 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Validate spacing before closing bracket in JSX.
 * @author ryym
 * @deprecated
 */


const getTokenBeforeClosingBracket = __webpack_require__(657);
const docsUrl = __webpack_require__(587);
const log = __webpack_require__(586);

let isWarnedForDeprecation = false;

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    deprecated: true,
    docs: {
      description: 'Validate spacing before closing bracket in JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-space-before-closing')
    },
    fixable: 'code',

    schema: [{
      enum: ['always', 'never']
    }]
  },

  create: function(context) {
    const configuration = context.options[0] || 'always';
    const sourceCode = context.getSourceCode();

    const NEVER_MESSAGE = 'A space is forbidden before closing bracket';
    const ALWAYS_MESSAGE = 'A space is required before closing bracket';

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      JSXOpeningElement: function(node) {
        if (!node.selfClosing) {
          return;
        }

        const leftToken = getTokenBeforeClosingBracket(node);
        const closingSlash = sourceCode.getTokenAfter(leftToken);

        if (leftToken.loc.end.line !== closingSlash.loc.start.line) {
          return;
        }

        if (configuration === 'always' && !sourceCode.isSpaceBetweenTokens(leftToken, closingSlash)) {
          context.report({
            loc: closingSlash.loc.start,
            message: ALWAYS_MESSAGE,
            fix: function(fixer) {
              return fixer.insertTextBefore(closingSlash, ' ');
            }
          });
        } else if (configuration === 'never' && sourceCode.isSpaceBetweenTokens(leftToken, closingSlash)) {
          context.report({
            loc: closingSlash.loc.start,
            message: NEVER_MESSAGE,
            fix: function(fixer) {
              const previousToken = sourceCode.getTokenBefore(closingSlash);
              return fixer.removeRange([previousToken.range[1], closingSlash.range[0]]);
            }
          });
        }
      },

      Program: function() {
        if (isWarnedForDeprecation) {
          return;
        }

        log('The react/jsx-space-before-closing rule is deprecated. ' +
            'Please use the react/jsx-tag-spacing rule with the ' +
            '"beforeSelfClosing" option instead.');
        isWarnedForDeprecation = true;
      }
    };
  }
};


/***/ }),
/* 657 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Find the token before the closing bracket.
 * @param {ASTNode} node - The JSX element node.
 * @returns {Token} The token before the closing bracket.
 */
function getTokenBeforeClosingBracket(node) {
  const attributes = node.attributes;
  if (attributes.length === 0) {
    return node.name;
  }
  return attributes[attributes.length - 1];
}

module.exports = getTokenBeforeClosingBracket;


/***/ }),
/* 658 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Validates whitespace in and around the JSX opening and closing brackets
 * @author Diogo Franco (Kovensky)
 */


const getTokenBeforeClosingBracket = __webpack_require__(657);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Validators
// ------------------------------------------------------------------------------

function validateClosingSlash(context, node, option) {
  const sourceCode = context.getSourceCode();

  const SELF_CLOSING_NEVER_MESSAGE = 'Whitespace is forbidden between `/` and `>`; write `/>`';
  const SELF_CLOSING_ALWAYS_MESSAGE = 'Whitespace is required between `/` and `>`; write `/ >`';
  const NEVER_MESSAGE = 'Whitespace is forbidden between `<` and `/`; write `</`';
  const ALWAYS_MESSAGE = 'Whitespace is required between `<` and `/`; write `< /`';

  let adjacent;

  if (node.selfClosing) {
    const lastTokens = sourceCode.getLastTokens(node, 2);

    adjacent = !sourceCode.isSpaceBetweenTokens(lastTokens[0], lastTokens[1]);

    if (option === 'never') {
      if (!adjacent) {
        context.report({
          node: node,
          loc: {
            start: lastTokens[0].loc.start,
            end: lastTokens[1].loc.end
          },
          message: SELF_CLOSING_NEVER_MESSAGE,
          fix: function(fixer) {
            return fixer.removeRange([lastTokens[0].range[1], lastTokens[1].range[0]]);
          }
        });
      }
    } else if (option === 'always' && adjacent) {
      context.report({
        node: node,
        loc: {
          start: lastTokens[0].loc.start,
          end: lastTokens[1].loc.end
        },
        message: SELF_CLOSING_ALWAYS_MESSAGE,
        fix: function(fixer) {
          return fixer.insertTextBefore(lastTokens[1], ' ');
        }
      });
    }
  } else {
    const firstTokens = sourceCode.getFirstTokens(node, 2);

    adjacent = !sourceCode.isSpaceBetweenTokens(firstTokens[0], firstTokens[1]);

    if (option === 'never') {
      if (!adjacent) {
        context.report({
          node: node,
          loc: {
            start: firstTokens[0].loc.start,
            end: firstTokens[1].loc.end
          },
          message: NEVER_MESSAGE,
          fix: function(fixer) {
            return fixer.removeRange([firstTokens[0].range[1], firstTokens[1].range[0]]);
          }
        });
      }
    } else if (option === 'always' && adjacent) {
      context.report({
        node: node,
        loc: {
          start: firstTokens[0].loc.start,
          end: firstTokens[1].loc.end
        },
        message: ALWAYS_MESSAGE,
        fix: function(fixer) {
          return fixer.insertTextBefore(firstTokens[1], ' ');
        }
      });
    }
  }
}

function validateBeforeSelfClosing(context, node, option) {
  const sourceCode = context.getSourceCode();

  const NEVER_MESSAGE = 'A space is forbidden before closing bracket';
  const ALWAYS_MESSAGE = 'A space is required before closing bracket';

  const leftToken = getTokenBeforeClosingBracket(node);
  const closingSlash = sourceCode.getTokenAfter(leftToken);

  if (leftToken.loc.end.line !== closingSlash.loc.start.line) {
    return;
  }

  if (option === 'always' && !sourceCode.isSpaceBetweenTokens(leftToken, closingSlash)) {
    context.report({
      node: node,
      loc: closingSlash.loc.start,
      message: ALWAYS_MESSAGE,
      fix: function(fixer) {
        return fixer.insertTextBefore(closingSlash, ' ');
      }
    });
  } else if (option === 'never' && sourceCode.isSpaceBetweenTokens(leftToken, closingSlash)) {
    context.report({
      node: node,
      loc: closingSlash.loc.start,
      message: NEVER_MESSAGE,
      fix: function(fixer) {
        const previousToken = sourceCode.getTokenBefore(closingSlash);
        return fixer.removeRange([previousToken.range[1], closingSlash.range[0]]);
      }
    });
  }
}

function validateAfterOpening(context, node, option) {
  const sourceCode = context.getSourceCode();

  const NEVER_MESSAGE = 'A space is forbidden after opening bracket';
  const ALWAYS_MESSAGE = 'A space is required after opening bracket';

  const openingToken = sourceCode.getTokenBefore(node.name);

  if (option === 'allow-multiline') {
    if (openingToken.loc.start.line !== node.name.loc.start.line) {
      return;
    }
  }

  const adjacent = !sourceCode.isSpaceBetweenTokens(openingToken, node.name);

  if (option === 'never' || option === 'allow-multiline') {
    if (!adjacent) {
      context.report({
        node: node,
        loc: {
          start: openingToken.loc.start,
          end: node.name.loc.start
        },
        message: NEVER_MESSAGE,
        fix: function(fixer) {
          return fixer.removeRange([openingToken.range[1], node.name.range[0]]);
        }
      });
    }
  } else if (option === 'always' && adjacent) {
    context.report({
      node: node,
      loc: {
        start: openingToken.loc.start,
        end: node.name.loc.start
      },
      message: ALWAYS_MESSAGE,
      fix: function(fixer) {
        return fixer.insertTextBefore(node.name, ' ');
      }
    });
  }
}

function validateBeforeClosing(context, node, option) {
  // Don't enforce this rule for self closing tags
  if (!node.selfClosing) {
    const sourceCode = context.getSourceCode();

    const NEVER_MESSAGE = 'A space is forbidden before closing bracket';
    const ALWAYS_MESSAGE = 'Whitespace is required before closing bracket';

    const lastTokens = sourceCode.getLastTokens(node, 2);
    const closingToken = lastTokens[1];
    const leftToken = lastTokens[0];

    if (leftToken.loc.start.line !== closingToken.loc.start.line) {
      return;
    }

    const adjacent = !sourceCode.isSpaceBetweenTokens(leftToken, closingToken);

    if (option === 'never' && !adjacent) {
      context.report({
        node: node,
        loc: {
          start: leftToken.loc.end,
          end: closingToken.loc.start
        },
        message: NEVER_MESSAGE,
        fix: function(fixer) {
          return fixer.removeRange([leftToken.range[1], closingToken.range[0]]);
        }
      });
    } else if (option === 'always' && adjacent) {
      context.report({
        node: node,
        loc: {
          start: leftToken.loc.end,
          end: closingToken.loc.start
        },
        message: ALWAYS_MESSAGE,
        fix: function(fixer) {
          return fixer.insertTextBefore(closingToken, ' ');
        }
      });
    }
  }
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const optionDefaults = {
  closingSlash: 'never',
  beforeSelfClosing: 'always',
  afterOpening: 'never',
  beforeClosing: 'allow'
};

module.exports = {
  meta: {
    docs: {
      description: 'Validate whitespace in and around the JSX opening and closing brackets',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-tag-spacing')
    },
    fixable: 'whitespace',
    schema: [
      {
        type: 'object',
        properties: {
          closingSlash: {
            enum: ['always', 'never', 'allow']
          },
          beforeSelfClosing: {
            enum: ['always', 'never', 'allow']
          },
          afterOpening: {
            enum: ['always', 'allow-multiline', 'never', 'allow']
          },
          beforeClosing: {
            enum: ['always', 'never', 'allow']
          }
        },
        default: optionDefaults,
        additionalProperties: false
      }
    ]
  },
  create: function (context) {
    const options = Object.assign({}, optionDefaults, context.options[0]);

    return {
      JSXOpeningElement: function (node) {
        if (options.closingSlash !== 'allow' && node.selfClosing) {
          validateClosingSlash(context, node, options.closingSlash);
        }
        if (options.afterOpening !== 'allow') {
          validateAfterOpening(context, node, options.afterOpening);
        }
        if (options.beforeSelfClosing !== 'allow' && node.selfClosing) {
          validateBeforeSelfClosing(context, node, options.beforeSelfClosing);
        }
        if (options.beforeClosing !== 'allow') {
          validateBeforeClosing(context, node, options.beforeClosing);
        }
      },
      JSXClosingElement: function (node) {
        if (options.afterOpening !== 'allow') {
          validateAfterOpening(context, node, options.afterOpening);
        }
        if (options.closingSlash !== 'allow') {
          validateClosingSlash(context, node, options.closingSlash);
        }
        if (options.beforeClosing !== 'allow') {
          validateBeforeClosing(context, node, options.beforeClosing);
        }
      }
    };
  }
};


/***/ }),
/* 659 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent React to be marked as unused
 * @author Glen Mailer
 */


const pragmaUtil = __webpack_require__(580);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent React to be marked as unused',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('jsx-uses-react')
    },
    schema: []
  },

  create: function(context) {
    const pragma = pragmaUtil.getFromContext(context);

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {

      JSXOpeningElement: function() {
        context.markVariableAsUsed(pragma);
      }

    };
  }
};


/***/ }),
/* 660 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent variables used in JSX to be marked as unused
 * @author Yannick Croissant
 */


const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent variables used in JSX to be marked as unused',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('jsx-uses-vars')
    },
    schema: []
  },

  create: function(context) {
    return {
      JSXOpeningElement: function(node) {
        let name;
        if (node.name.namespace && node.name.namespace.name) {
          // <Foo:Bar>
          name = node.name.namespace.name;
        } else if (node.name.name) {
          // <Foo>
          name = node.name.name;
        } else if (node.name.object) {
          // <Foo...Bar>
          let parent = node.name.object;
          while (parent.object) {
            parent = parent.object;
          }
          name = parent.name;
        } else {
          return;
        }

        context.markVariableAsUsed(name);
      }

    };
  }
};


/***/ }),
/* 661 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent missing parentheses around multilines JSX
 * @author Yannick Croissant
 */


const has = __webpack_require__(574);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DEFAULTS = {
  declaration: 'parens',
  assignment: 'parens',
  return: 'parens',
  arrow: 'parens',
  condition: 'ignore',
  logical: 'ignore',
  prop: 'ignore'
};

const MISSING_PARENS = 'Missing parentheses around multilines JSX';
const PARENS_NEW_LINES = 'Parentheses around JSX should be on separate lines';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent missing parentheses around multilines JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-wrap-multilines')
    },
    fixable: 'code',

    schema: [{
      type: 'object',
      // true/false are for backwards compatibility
      properties: {
        declaration: {
          enum: [true, false, 'ignore', 'parens', 'parens-new-line']
        },
        assignment: {
          enum: [true, false, 'ignore', 'parens', 'parens-new-line']
        },
        return: {
          enum: [true, false, 'ignore', 'parens', 'parens-new-line']
        },
        arrow: {
          enum: [true, false, 'ignore', 'parens', 'parens-new-line']
        },
        condition: {
          enum: [true, false, 'ignore', 'parens', 'parens-new-line']
        },
        logical: {
          enum: [true, false, 'ignore', 'parens', 'parens-new-line']
        },
        prop: {
          enum: [true, false, 'ignore', 'parens', 'parens-new-line']
        }
      },
      additionalProperties: false
    }]
  },

  create: function(context) {
    const sourceCode = context.getSourceCode();

    function getOption(type) {
      const userOptions = context.options[0] || {};
      if (has(userOptions, type)) {
        return userOptions[type];
      }
      return DEFAULTS[type];
    }

    function isEnabled(type) {
      const option = getOption(type);
      return option && option !== 'ignore';
    }

    function isParenthesised(node) {
      const previousToken = sourceCode.getTokenBefore(node);
      const nextToken = sourceCode.getTokenAfter(node);

      return previousToken && nextToken &&
        previousToken.value === '(' && previousToken.range[1] <= node.range[0] &&
        nextToken.value === ')' && nextToken.range[0] >= node.range[1];
    }

    function needsNewLines(node) {
      const previousToken = sourceCode.getTokenBefore(node);
      const nextToken = sourceCode.getTokenAfter(node);

      return isParenthesised(node) &&
        previousToken.loc.end.line === node.loc.start.line &&
        node.loc.end.line === nextToken.loc.end.line;
    }

    function isMultilines(node) {
      return node.loc.start.line !== node.loc.end.line;
    }

    function report(node, message, fix) {
      context.report({
        node,
        message,
        fix
      });
    }

    function trimTokenBeforeNewline(node, tokenBefore) {
      // if the token before the jsx is a bracket or curly brace
      // we don't want a space between the opening parentheses and the multiline jsx
      const isBracket = tokenBefore.value === '{' || tokenBefore.value === '[';
      return `${tokenBefore.value.trim()}${isBracket ? '' : ' '}`;
    }

    function check(node, type) {
      if (!node || node.type !== 'JSXElement') {
        return;
      }

      const option = getOption(type);

      if ((option === true || option === 'parens') && !isParenthesised(node) && isMultilines(node)) {
        report(node, MISSING_PARENS, fixer => fixer.replaceText(node, `(${sourceCode.getText(node)})`));
      }

      if (option === 'parens-new-line' && isMultilines(node)) {
        if (!isParenthesised(node)) {
          const tokenBefore = sourceCode.getTokenBefore(node, {includeComments: true});
          const tokenAfter = sourceCode.getTokenAfter(node, {includeComments: true});
          if (tokenBefore.loc.end.line < node.loc.start.line) {
            // Strip newline after operator if parens newline is specified
            report(
              node,
              MISSING_PARENS,
              fixer => fixer.replaceTextRange(
                [tokenBefore.range[0], tokenAfter.range[0]],
                `${trimTokenBeforeNewline(node, tokenBefore)}(\n${sourceCode.getText(node)}\n)`
              )
            );
          } else {
            report(node, MISSING_PARENS, fixer => fixer.replaceText(node, `(\n${sourceCode.getText(node)}\n)`));
          }
        } else if (needsNewLines(node)) {
          report(node, PARENS_NEW_LINES, fixer => fixer.replaceText(node, `\n${sourceCode.getText(node)}\n`));
        }
      }
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {

      VariableDeclarator: function(node) {
        const type = 'declaration';
        if (!isEnabled(type)) {
          return;
        }
        if (!isEnabled('condition') && node.init && node.init.type === 'ConditionalExpression') {
          check(node.init.consequent, type);
          check(node.init.alternate, type);
          return;
        }
        check(node.init, type);
      },

      AssignmentExpression: function(node) {
        const type = 'assignment';
        if (!isEnabled(type)) {
          return;
        }
        if (!isEnabled('condition') && node.right.type === 'ConditionalExpression') {
          check(node.right.consequent, type);
          check(node.right.alternate, type);
          return;
        }
        check(node.right, type);
      },

      ReturnStatement: function(node) {
        const type = 'return';
        if (isEnabled(type)) {
          check(node.argument, type);
        }
      },

      'ArrowFunctionExpression:exit': function(node) {
        const arrowBody = node.body;
        const type = 'arrow';

        if (isEnabled(type) && arrowBody.type !== 'BlockStatement') {
          check(arrowBody, type);
        }
      },

      ConditionalExpression: function(node) {
        const type = 'condition';
        if (isEnabled(type)) {
          check(node.consequent, type);
          check(node.alternate, type);
        }
      },

      LogicalExpression: function(node) {
        const type = 'logical';
        if (isEnabled(type)) {
          check(node.right, type);
        }
      },

      JSXAttribute: function(node) {
        const type = 'prop';
        if (isEnabled(type) && node.value && node.value.type === 'JSXExpressionContainer') {
          check(node.value.expression, type);
        }
      }
    };
  }
};


/***/ }),
/* 662 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of this.state within setState
 * @author Rolf Erik Lekang, Jørgen Aaberg
 */



const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Reports when this.state is accessed within setState',
      category: 'Possible Errors',
      recommended: false,
      url: docsUrl('no-access-state-in-setstate')
    }
  },

  create: function(context) {
    function isSetStateCall(node) {
      return node.type === 'CallExpression' &&
        node.callee.property &&
        node.callee.property.name === 'setState' &&
        node.callee.object.type === 'ThisExpression';
    }

    function isFirstArgumentInSetStateCall(current, node) {
      if (!isSetStateCall(current)) {
        return false;
      }
      while (node && node.parent !== current) {
        node = node.parent;
      }
      return current.arguments[0] === node;
    }

    // The methods array contains all methods or functions that are using this.state
    // or that are calling another method or function using this.state
    const methods = [];
    // The vars array contains all variables that contains this.state
    const vars = [];
    return {
      CallExpression(node) {
        // Appends all the methods that are calling another
        // method containing this.state to the methods array
        methods.map(method => {
          if (node.callee.name === method.methodName) {
            let current = node.parent;
            while (current.type !== 'Program') {
              if (current.type === 'MethodDefinition') {
                methods.push({
                  methodName: current.key.name,
                  node: method.node
                });
                break;
              }
              current = current.parent;
            }
          }
        });

        // Finding all CallExpressions that is inside a setState
        // to further check if they contains this.state
        let current = node.parent;
        while (current.type !== 'Program') {
          if (isFirstArgumentInSetStateCall(current, node)) {
            const methodName = node.callee.name;
            methods.map(method => {
              if (method.methodName === methodName) {
                context.report(
                  method.node,
                  'Use callback in setState when referencing the previous state.'
                );
              }
            });

            break;
          }
          current = current.parent;
        }
      },

      MemberExpression(node) {
        if (
          node.property.name === 'state' &&
          node.object.type === 'ThisExpression'
        ) {
          let current = node;
          while (current.type !== 'Program') {
            // Reporting if this.state is directly within this.setState
            if (isFirstArgumentInSetStateCall(current, node)) {
              context.report(
                node,
                'Use callback in setState when referencing the previous state.'
              );
              break;
            }

            // Storing all functions and methods that contains this.state
            if (current.type === 'MethodDefinition') {
              methods.push({
                methodName: current.key.name,
                node: node
              });
              break;
            } else if (current.type === 'FunctionExpression' && current.parent.key) {
              methods.push({
                methodName: current.parent.key.name,
                node: node
              });
              break;
            }

            // Storing all variables containg this.state
            if (current.type === 'VariableDeclarator') {
              vars.push({
                node: node,
                scope: context.getScope(),
                variableName: current.id.name
              });
              break;
            }

            current = current.parent;
          }
        }
      },

      Identifier(node) {
        // Checks if the identifier is a variable within an object
        let current = node;
        while (current.parent.type === 'BinaryExpression') {
          current = current.parent;
        }
        if (
          current.parent.value === current ||
          current.parent.object === current
        ) {
          while (current.type !== 'Program') {
            if (isFirstArgumentInSetStateCall(current, node)) {
              vars
                .filter(v => v.scope === context.getScope() && v.variableName === node.name)
                .map(v => context.report(
                  v.node,
                  'Use callback in setState when referencing the previous state.'
                ));
            }
            current = current.parent;
          }
        }
      },

      ObjectPattern(node) {
        const isDerivedFromThis = node.parent.init && node.parent.init.type === 'ThisExpression';
        node.properties.forEach(property => {
          if (property && property.key && property.key.name === 'state' && isDerivedFromThis) {
            vars.push({
              node: property.key,
              scope: context.getScope(),
              variableName: property.key.name
            });
          }
        });
      }
    };
  }
};


/***/ }),
/* 663 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of Array index in keys
 * @author Joe Lencioni
 */


const has = __webpack_require__(574);
const astUtil = __webpack_require__(581);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of Array index in keys',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('no-array-index-key')
    },

    schema: []
  },

  create: function(context) {
    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------
    const indexParamNames = [];
    const iteratorFunctionsToIndexParamPosition = {
      every: 1,
      filter: 1,
      find: 1,
      findIndex: 1,
      forEach: 1,
      map: 1,
      reduce: 2,
      reduceRight: 2,
      some: 1
    };
    const ERROR_MESSAGE = 'Do not use Array index in keys';

    function isArrayIndex(node) {
      return node.type === 'Identifier'
        && indexParamNames.indexOf(node.name) !== -1;
    }

    function getMapIndexParamName(node) {
      const callee = node.callee;
      if (callee.type !== 'MemberExpression') {
        return null;
      }
      if (callee.property.type !== 'Identifier') {
        return null;
      }
      if (!has(iteratorFunctionsToIndexParamPosition, callee.property.name)) {
        return null;
      }

      const firstArg = node.arguments[0];
      if (!firstArg) {
        return null;
      }

      if (!astUtil.isFunctionLikeExpression(firstArg)) {
        return null;
      }

      const params = firstArg.params;

      const indexParamPosition = iteratorFunctionsToIndexParamPosition[callee.property.name];
      if (params.length < indexParamPosition + 1) {
        return null;
      }

      return params[indexParamPosition].name;
    }

    function getIdentifiersFromBinaryExpression(side) {
      if (side.type === 'Identifier') {
        return side;
      }

      if (side.type === 'BinaryExpression') {
        // recurse
        const left = getIdentifiersFromBinaryExpression(side.left);
        const right = getIdentifiersFromBinaryExpression(side.right);
        return [].concat(left, right).filter(Boolean);
      }

      return null;
    }

    function checkPropValue(node) {
      if (isArrayIndex(node)) {
        // key={bar}
        context.report({
          node: node,
          message: ERROR_MESSAGE
        });
        return;
      }

      if (node.type === 'TemplateLiteral') {
        // key={`foo-${bar}`}
        node.expressions.filter(isArrayIndex).forEach(() => {
          context.report({node: node, message: ERROR_MESSAGE});
        });

        return;
      }

      if (node.type === 'BinaryExpression') {
        // key={'foo' + bar}
        const identifiers = getIdentifiersFromBinaryExpression(node);

        identifiers.filter(isArrayIndex).forEach(() => {
          context.report({node: node, message: ERROR_MESSAGE});
        });

        return;
      }
    }

    return {
      CallExpression: function(node) {
        if (
          node.callee
          && node.callee.type === 'MemberExpression'
          && ['createElement', 'cloneElement'].indexOf(node.callee.property.name) !== -1
          && node.arguments.length > 1
        ) {
          // React.createElement
          if (!indexParamNames.length) {
            return;
          }

          const props = node.arguments[1];

          if (props.type !== 'ObjectExpression') {
            return;
          }

          props.properties.forEach(prop => {
            if (!prop.key || prop.key.name !== 'key') {
              // { ...foo }
              // { foo: bar }
              return;
            }

            checkPropValue(prop.value);
          });

          return;
        }

        const mapIndexParamName = getMapIndexParamName(node);
        if (!mapIndexParamName) {
          return;
        }

        indexParamNames.push(mapIndexParamName);
      },

      JSXAttribute: function(node) {
        if (node.name.name !== 'key') {
          // foo={bar}
          return;
        }

        if (!indexParamNames.length) {
          // Not inside a call expression that we think has an index param.
          return;
        }

        const value = node.value;
        if (!value || value.type !== 'JSXExpressionContainer') {
          // key='foo' or just simply 'key'
          return;
        }

        checkPropValue(value.expression);
      },

      'CallExpression:exit': function(node) {
        const mapIndexParamName = getMapIndexParamName(node);
        if (!mapIndexParamName) {
          return;
        }

        indexParamNames.pop();
      }
    };
  }
};


/***/ }),
/* 664 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent passing of children as props
 * @author Benjamin Stepp
 */


const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Checks if the node is a createElement call with a props literal.
 * @param {ASTNode} node - The AST node being checked.
 * @returns {Boolean} - True if node is a createElement call with a props
 * object literal, False if not.
*/
function isCreateElementWithProps(node) {
  return node.callee
    && node.callee.type === 'MemberExpression'
    && node.callee.property.name === 'createElement'
    && node.arguments.length > 1
    && node.arguments[1].type === 'ObjectExpression';
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent passing of children as props.',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('no-children-prop')
    },
    schema: []
  },
  create: function(context) {
    return {
      JSXAttribute: function(node) {
        if (node.name.name !== 'children') {
          return;
        }

        context.report({
          node: node,
          message: 'Do not pass children as props. Instead, nest children between the opening and closing tags.'
        });
      },
      CallExpression: function(node) {
        if (!isCreateElementWithProps(node)) {
          return;
        }

        const props = node.arguments[1].properties;
        const childrenProp = props.find(prop => prop.key && prop.key.name === 'children');

        if (childrenProp) {
          context.report({
            node: node,
            message: 'Do not pass children as props. Instead, pass them as additional arguments to React.createElement.'
          });
        }
      }
    };
  }
};


/***/ }),
/* 665 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of dangerous JSX props
 * @author Scott Andrews
 */


const docsUrl = __webpack_require__(587);
const jsxUtil = __webpack_require__(643);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DANGEROUS_MESSAGE = 'Dangerous property \'{{name}}\' found';

const DANGEROUS_PROPERTY_NAMES = [
  'dangerouslySetInnerHTML'
];

const DANGEROUS_PROPERTIES = DANGEROUS_PROPERTY_NAMES.reduce((props, prop) => {
  props[prop] = prop;
  return props;
}, Object.create(null));

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Checks if a JSX attribute is dangerous.
 * @param {String} name - Name of the attribute to check.
 * @returns {boolean} Whether or not the attribute is dnagerous.
 */
function isDangerous(name) {
  return name in DANGEROUS_PROPERTIES;
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of dangerous JSX props',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('no-danger')
    },
    schema: []
  },

  create: function(context) {
    return {

      JSXAttribute: function(node) {
        if (jsxUtil.isDOMComponent(node.parent) && isDangerous(node.name.name)) {
          context.report({
            node: node,
            message: DANGEROUS_MESSAGE,
            data: {
              name: node.name.name
            }
          });
        }
      }

    };
  }
};


/***/ }),
/* 666 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Report when a DOM element is using both children and dangerouslySetInnerHTML
 * @author David Petersen
 */


const variableUtil = __webpack_require__(579);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'Report when a DOM element is using both children and dangerouslySetInnerHTML',
      category: '',
      recommended: true,
      url: docsUrl('no-danger-with-children')
    },
    schema: [] // no options
  },
  create: function(context) {
    function findSpreadVariable(name) {
      return variableUtil.variablesInScope(context).find(item => item.name === name);
    }
    /**
     * Takes a ObjectExpression and returns the value of the prop if it has it
     * @param {object} node - ObjectExpression node
     * @param {string} propName - name of the prop to look for
     */
    function findObjectProp(node, propName, seenProps) {
      if (!node.properties) {
        return false;
      }
      return node.properties.find(prop => {
        if (prop.type === 'Property') {
          return prop.key.name === propName;
        } else if (prop.type === 'ExperimentalSpreadProperty' || prop.type === 'SpreadElement') {
          const variable = findSpreadVariable(prop.argument.name);
          if (variable && variable.defs.length && variable.defs[0].node.init) {
            if (seenProps.indexOf(prop.argument.name) > -1) {
              return false;
            }
            const newSeenProps = seenProps.concat(prop.argument.name || []);
            return findObjectProp(variable.defs[0].node.init, propName, newSeenProps);
          }
        }
        return false;
      });
    }

    /**
     * Takes a JSXElement and returns the value of the prop if it has it
     * @param {object} node - JSXElement node
     * @param {string} propName - name of the prop to look for
     */
    function findJsxProp(node, propName) {
      const attributes = node.openingElement.attributes;
      return attributes.find(attribute => {
        if (attribute.type === 'JSXSpreadAttribute') {
          const variable = findSpreadVariable(attribute.argument.name);
          if (variable && variable.defs.length && variable.defs[0].node.init) {
            return findObjectProp(variable.defs[0].node.init, propName, []);
          }
        }
        return attribute.name && attribute.name.name === propName;
      });
    }

    /**
     * Checks to see if a node is a line break
     * @param {ASTNode} node The AST node being checked
     * @returns {Boolean} True if node is a line break, false if not
     */
    function isLineBreak(node) {
      const isLiteral = node.type === 'Literal' || node.type === 'JSXText';
      const isMultiline = node.loc.start.line !== node.loc.end.line;
      const isWhiteSpaces = /^\s*$/.test(node.value);

      return isLiteral && isMultiline && isWhiteSpaces;
    }

    return {
      JSXElement: function (node) {
        let hasChildren = false;

        if (node.children.length && !isLineBreak(node.children[0])) {
          hasChildren = true;
        } else if (findJsxProp(node, 'children')) {
          hasChildren = true;
        }

        if (
          node.openingElement.attributes
          && hasChildren
          && findJsxProp(node, 'dangerouslySetInnerHTML')
        ) {
          context.report(node, 'Only set one of `children` or `props.dangerouslySetInnerHTML`');
        }
      },
      CallExpression: function (node) {
        if (
          node.callee
          && node.callee.type === 'MemberExpression'
          && node.callee.property.name === 'createElement'
          && node.arguments.length > 1
        ) {
          let hasChildren = false;

          let props = node.arguments[1];

          if (props.type === 'Identifier') {
            const variable = variableUtil.variablesInScope(context).find(item => item.name === props.name);
            if (variable && variable.defs.length && variable.defs[0].node.init) {
              props = variable.defs[0].node.init;
            }
          }

          const dangerously = findObjectProp(props, 'dangerouslySetInnerHTML', []);

          if (node.arguments.length === 2) {
            if (findObjectProp(props, 'children', [])) {
              hasChildren = true;
            }
          } else {
            hasChildren = true;
          }

          if (dangerously && hasChildren) {
            context.report(node, 'Only set one of `children` or `props.dangerouslySetInnerHTML`');
          }
        }
      }
    };
  }
};


/***/ }),
/* 667 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of deprecated methods
 * @author Yannick Croissant
 * @author Scott Feeney
 * @author Sergei Startsev
 */


const has = __webpack_require__(574);

const Components = __webpack_require__(578);
const astUtil = __webpack_require__(581);
const docsUrl = __webpack_require__(587);
const pragmaUtil = __webpack_require__(580);
const versionUtil = __webpack_require__(585);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const MODULES = {
  react: ['React'],
  'react-addons-perf': ['ReactPerf', 'Perf']
};

const DEPRECATED_MESSAGE = '{{oldMethod}} is deprecated since React {{version}}{{newMethod}}{{refs}}';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of deprecated methods',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('no-deprecated')
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => {
    const sourceCode = context.getSourceCode();
    const pragma = pragmaUtil.getFromContext(context);

    function getDeprecated() {
      const deprecated = {};
      // 0.12.0
      deprecated[`${pragma}.renderComponent`] = ['0.12.0', `${pragma}.render`];
      deprecated[`${pragma}.renderComponentToString`] = ['0.12.0', `${pragma}.renderToString`];
      deprecated[`${pragma}.renderComponentToStaticMarkup`] = ['0.12.0', `${pragma}.renderToStaticMarkup`];
      deprecated[`${pragma}.isValidComponent`] = ['0.12.0', `${pragma}.isValidElement`];
      deprecated[`${pragma}.PropTypes.component`] = ['0.12.0', `${pragma}.PropTypes.element`];
      deprecated[`${pragma}.PropTypes.renderable`] = ['0.12.0', `${pragma}.PropTypes.node`];
      deprecated[`${pragma}.isValidClass`] = ['0.12.0'];
      deprecated['this.transferPropsTo'] = ['0.12.0', 'spread operator ({...})'];
      // 0.13.0
      deprecated[`${pragma}.addons.classSet`] = ['0.13.0', 'the npm module classnames'];
      deprecated[`${pragma}.addons.cloneWithProps`] = ['0.13.0', `${pragma}.cloneElement`];
      // 0.14.0
      deprecated[`${pragma}.render`] = ['0.14.0', 'ReactDOM.render'];
      deprecated[`${pragma}.unmountComponentAtNode`] = ['0.14.0', 'ReactDOM.unmountComponentAtNode'];
      deprecated[`${pragma}.findDOMNode`] = ['0.14.0', 'ReactDOM.findDOMNode'];
      deprecated[`${pragma}.renderToString`] = ['0.14.0', 'ReactDOMServer.renderToString'];
      deprecated[`${pragma}.renderToStaticMarkup`] = ['0.14.0', 'ReactDOMServer.renderToStaticMarkup'];
      // 15.0.0
      deprecated[`${pragma}.addons.LinkedStateMixin`] = ['15.0.0'];
      deprecated['ReactPerf.printDOM'] = ['15.0.0', 'ReactPerf.printOperations'];
      deprecated['Perf.printDOM'] = ['15.0.0', 'Perf.printOperations'];
      deprecated['ReactPerf.getMeasurementsSummaryMap'] = ['15.0.0', 'ReactPerf.getWasted'];
      deprecated['Perf.getMeasurementsSummaryMap'] = ['15.0.0', 'Perf.getWasted'];
      // 15.5.0
      deprecated[`${pragma}.createClass`] = ['15.5.0', 'the npm module create-react-class'];
      deprecated[`${pragma}.addons.TestUtils`] = ['15.5.0', 'ReactDOM.TestUtils'];
      deprecated[`${pragma}.PropTypes`] = ['15.5.0', 'the npm module prop-types'];
      // 15.6.0
      deprecated[`${pragma}.DOM`] = ['15.6.0', 'the npm module react-dom-factories'];
      // 16.3.0
      deprecated.componentWillMount = [
        '16.3.0',
        'UNSAFE_componentWillMount',
        'https://reactjs.org/docs/react-component.html#unsafe_componentwillmount'
      ];
      deprecated.componentWillReceiveProps = [
        '16.3.0',
        'UNSAFE_componentWillReceiveProps',
        'https://reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops'
      ];
      deprecated.componentWillUpdate = [
        '16.3.0',
        'UNSAFE_componentWillUpdate',
        'https://reactjs.org/docs/react-component.html#unsafe_componentwillupdate'
      ];
      return deprecated;
    }

    function isDeprecated(method) {
      const deprecated = getDeprecated();

      return (
        deprecated &&
        deprecated[method] &&
        deprecated[method][0] &&
        versionUtil.testReactVersion(context, deprecated[method][0])
      );
    }

    function checkDeprecation(node, methodName, methodNode) {
      if (!isDeprecated(methodName)) {
        return;
      }
      const deprecated = getDeprecated();
      const version = deprecated[methodName][0];
      const newMethod = deprecated[methodName][1];
      const refs = deprecated[methodName][2];
      context.report({
        node: methodNode || node,
        message: DEPRECATED_MESSAGE,
        data: {
          oldMethod: methodName,
          version,
          newMethod: newMethod ? `, use ${newMethod} instead` : '',
          refs: refs ? `, see ${refs}` : ''
        }
      });
    }

    function getReactModuleName(node) {
      let moduleName = false;
      if (!node.init) {
        return moduleName;
      }
      for (const module in MODULES) {
        if (!has(MODULES, module)) {
          continue;
        }
        moduleName = MODULES[module].find(name => name === node.init.name);
        if (moduleName) {
          break;
        }
      }
      return moduleName;
    }

    /**
     * Returns life cycle methods if available
     * @param {ASTNode} node The AST node being checked.
     * @returns {Array} The array of methods.
     */
    function getLifeCycleMethods(node) {
      const properties = astUtil.getComponentProperties(node);
      return properties.map(property => ({
        name: astUtil.getPropertyName(property),
        node: astUtil.getPropertyNameNode(property)
      }));
    }

    /**
     * Checks life cycle methods
     * @param {ASTNode} node The AST node being checked.
     */
    function checkLifeCycleMethods(node) {
      if (utils.isES5Component(node) || utils.isES6Component(node)) {
        const methods = getLifeCycleMethods(node);
        methods.forEach(method => checkDeprecation(node, method.name, method.node));
      }
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {

      MemberExpression: function(node) {
        checkDeprecation(node, sourceCode.getText(node));
      },

      ImportDeclaration: function(node) {
        const isReactImport = typeof MODULES[node.source.value] !== 'undefined';
        if (!isReactImport) {
          return;
        }
        node.specifiers.forEach(specifier => {
          if (!specifier.imported) {
            return;
          }
          checkDeprecation(node, `${MODULES[node.source.value][0]}.${specifier.imported.name}`);
        });
      },

      VariableDeclarator: function(node) {
        const reactModuleName = getReactModuleName(node);
        const isRequire = node.init && node.init.callee && node.init.callee.name === 'require';
        const isReactRequire = node.init
          && node.init.arguments
          && node.init.arguments.length
          && typeof MODULES[node.init.arguments[0].value] !== 'undefined';
        const isDestructuring = node.id && node.id.type === 'ObjectPattern';

        if (
          !(isDestructuring && reactModuleName) &&
          !(isDestructuring && isRequire && isReactRequire)
        ) {
          return;
        }
        node.id.properties.forEach(property => {
          checkDeprecation(node, `${reactModuleName || pragma}.${property.key.name}`);
        });
      },

      ClassDeclaration: checkLifeCycleMethods,
      ClassExpression: checkLifeCycleMethods,
      ObjectExpression: checkLifeCycleMethods
    };
  })
};


/***/ }),
/* 668 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of setState in componentDidMount
 * @author Yannick Croissant
 */


const makeNoMethodSetStateRule = __webpack_require__(669);

module.exports = makeNoMethodSetStateRule('componentDidMount');


/***/ }),
/* 669 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of setState in lifecycle methods
 * @author Yannick Croissant
 */


const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

function makeNoMethodSetStateRule(methodName, shouldCheckUnsafeCb) {
  return {
    meta: {
      docs: {
        description: `Prevent usage of setState in ${methodName}`,
        category: 'Best Practices',
        recommended: false,
        url: docsUrl(methodName)
      },

      schema: [{
        enum: ['disallow-in-func']
      }]
    },

    create: function(context) {
      const mode = context.options[0] || 'allow-in-func';

      function nameMatches(name) {
        if (name === methodName) {
          return true;
        }

        if (typeof shouldCheckUnsafeCb === 'function' && shouldCheckUnsafeCb(context)) {
          return name === `UNSAFE_${methodName}`;
        }

        return false;
      }

      // --------------------------------------------------------------------------
      // Public
      // --------------------------------------------------------------------------

      return {

        CallExpression: function(node) {
          const callee = node.callee;
          if (
            callee.type !== 'MemberExpression' ||
            callee.object.type !== 'ThisExpression' ||
            callee.property.name !== 'setState'
          ) {
            return;
          }
          const ancestors = context.getAncestors(callee).reverse();
          let depth = 0;
          for (let i = 0, j = ancestors.length; i < j; i++) {
            const ancestor = ancestors[i];
            if (/Function(Expression|Declaration)$/.test(ancestor.type)) {
              depth++;
            }
            if (
              (ancestor.type !== 'Property' && ancestor.type !== 'MethodDefinition') ||
              !nameMatches(ancestor.key.name) ||
              (mode !== 'disallow-in-func' && depth > 1)
            ) {
              continue;
            }
            context.report({
              node: callee,
              message: `Do not use setState in ${ancestor.key.name}`
            });
            break;
          }
        }
      };
    }
  };
}

module.exports = makeNoMethodSetStateRule;


/***/ }),
/* 670 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of setState in componentDidUpdate
 * @author Yannick Croissant
 */


const makeNoMethodSetStateRule = __webpack_require__(669);

module.exports = makeNoMethodSetStateRule('componentDidUpdate');


/***/ }),
/* 671 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent direct mutation of this.state
 * @author David Petersen
 * @author Nicolas Fernandez <@burabure>
 */


const Components = __webpack_require__(578);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent direct mutation of this.state',
      category: 'Possible Errors',
      recommended: true,
      url: docsUrl('no-direct-mutation-state')
    }
  },

  create: Components.detect((context, components, utils) => {
    /**
     * Checks if the component is valid
     * @param {Object} component The component to process
     * @returns {Boolean} True if the component is valid, false if not.
     */
    function isValid(component) {
      return Boolean(component && !component.mutateSetState);
    }

    /**
     * Reports undeclared proptypes for a given component
     * @param {Object} component The component to process
     */
    function reportMutations(component) {
      let mutation;
      for (let i = 0, j = component.mutations.length; i < j; i++) {
        mutation = component.mutations[i];
        context.report({
          node: mutation,
          message: 'Do not mutate state directly. Use setState().'
        });
      }
    }

    /**
     * Walks throughs the MemberExpression to the top-most property.
     * @param {Object} node The node to process
     * @returns {Object} The outer-most MemberExpression
     */
    function getOuterMemberExpression(node) {
      while (node.object && node.object.property) {
        node = node.object;
      }
      return node;
    }

    /**
     * Determine if this MemberExpression is for `this.state`
     * @param {Object} node The node to process
     * @returns {Boolean}
     */
    function isStateMemberExpression(node) {
      return node.object.type === 'ThisExpression' && node.property.name === 'state';
    }

    /**
     * Determine if we should currently ignore assignments in this component.
     * @param {?Object} component The component to process
     * @returns {Boolean} True if we should skip assignment checks.
     */
    function shouldIgnoreComponent(component) {
      return !component || (component.inConstructor && !component.inCallExpression);
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------
    return {
      MethodDefinition(node) {
        if (node.kind === 'constructor') {
          components.set(node, {
            inConstructor: true
          });
        }
      },

      CallExpression: function(node) {
        components.set(node, {
          inCallExpression: true
        });
      },

      AssignmentExpression(node) {
        const component = components.get(utils.getParentComponent());
        if (shouldIgnoreComponent(component) || !node.left || !node.left.object) {
          return;
        }
        const item = getOuterMemberExpression(node.left);
        if (isStateMemberExpression(item)) {
          const mutations = (component && component.mutations) || [];
          mutations.push(node.left.object);
          components.set(node, {
            mutateSetState: true,
            mutations
          });
        }
      },

      UpdateExpression(node) {
        const component = components.get(utils.getParentComponent());
        if (shouldIgnoreComponent(component) || node.argument.type !== 'MemberExpression') {
          return;
        }
        const item = getOuterMemberExpression(node.argument);
        if (isStateMemberExpression(item)) {
          const mutations = (component && component.mutations) || [];
          mutations.push(item);
          components.set(node, {
            mutateSetState: true,
            mutations
          });
        }
      },

      'CallExpression:exit': function(node) {
        components.set(node, {
          inCallExpression: false
        });
      },

      'MethodDefinition:exit': function (node) {
        if (node.kind === 'constructor') {
          components.set(node, {
            inConstructor: false
          });
        }
      },

      'Program:exit': function () {
        const list = components.list();

        Object.keys(list).forEach(key => {
          if (!isValid(list[key])) {
            reportMutations(list[key]);
          }
        });
      }
    };
  })
};


/***/ }),
/* 672 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of findDOMNode
 * @author Yannick Croissant
 */


const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of findDOMNode',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('no-find-dom-node')
    },
    schema: []
  },

  create: function(context) {
    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {

      CallExpression: function(node) {
        const callee = node.callee;

        const isfindDOMNode =
          (callee.name === 'findDOMNode') ||
          (callee.property && callee.property.name === 'findDOMNode')
        ;

        if (!isfindDOMNode) {
          return;
        }

        context.report({
          node: callee,
          message: 'Do not use findDOMNode'
        });
      }
    };
  }
};


/***/ }),
/* 673 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of isMounted
 * @author Joe Lencioni
 */


const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of isMounted',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('no-is-mounted')
    },
    schema: []
  },

  create: function(context) {
    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {

      CallExpression: function(node) {
        const callee = node.callee;
        if (callee.type !== 'MemberExpression') {
          return;
        }
        if (callee.object.type !== 'ThisExpression' || callee.property.name !== 'isMounted') {
          return;
        }
        const ancestors = context.getAncestors(callee);
        for (let i = 0, j = ancestors.length; i < j; i++) {
          if (ancestors[i].type === 'Property' || ancestors[i].type === 'MethodDefinition') {
            context.report({
              node: callee,
              message: 'Do not use isMounted'
            });
            break;
          }
        }
      }
    };
  }
};


/***/ }),
/* 674 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent multiple component definition per file
 * @author Yannick Croissant
 */


const has = __webpack_require__(574);
const Components = __webpack_require__(578);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent multiple component definition per file',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('no-multi-comp')
    },

    schema: [{
      type: 'object',
      properties: {
        ignoreStateless: {
          default: false,
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components) => {
    const configuration = context.options[0] || {};
    const ignoreStateless = configuration.ignoreStateless || false;

    const MULTI_COMP_MESSAGE = 'Declare only one React component per file';

    /**
     * Checks if the component is ignored
     * @param {Object} component The component being checked.
     * @returns {Boolean} True if the component is ignored, false if not.
     */
    function isIgnored(component) {
      return ignoreStateless && /Function/.test(component.node.type);
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      'Program:exit': function() {
        if (components.length() <= 1) {
          return;
        }

        const list = components.list();
        let i = 0;

        for (const component in list) {
          if (!has(list, component) || isIgnored(list[component]) || ++i === 1) {
            continue;
          }
          context.report({
            node: list[component].node,
            message: MULTI_COMP_MESSAGE
          });
        }
      }
    };
  })
};


/***/ }),
/* 675 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of setState
 * @author Mark Dalgleish
 */


const has = __webpack_require__(574);
const Components = __webpack_require__(578);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of setState',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('no-set-state')
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => {
    /**
     * Checks if the component is valid
     * @param {Object} component The component to process
     * @returns {Boolean} True if the component is valid, false if not.
     */
    function isValid(component) {
      return Boolean(component && !component.useSetState);
    }

    /**
     * Reports usages of setState for a given component
     * @param {Object} component The component to process
     */
    function reportSetStateUsages(component) {
      let setStateUsage;
      for (let i = 0, j = component.setStateUsages.length; i < j; i++) {
        setStateUsage = component.setStateUsages[i];
        context.report({
          node: setStateUsage,
          message: 'Do not use setState'
        });
      }
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {

      CallExpression: function(node) {
        const callee = node.callee;
        if (
          callee.type !== 'MemberExpression' ||
          callee.object.type !== 'ThisExpression' ||
          callee.property.name !== 'setState'
        ) {
          return;
        }
        const component = components.get(utils.getParentComponent());
        const setStateUsages = component && component.setStateUsages || [];
        setStateUsages.push(callee);
        components.set(node, {
          useSetState: true,
          setStateUsages: setStateUsages
        });
      },

      'Program:exit': function() {
        const list = components.list();
        for (const component in list) {
          if (!has(list, component) || isValid(list[component])) {
            continue;
          }
          reportSetStateUsages(list[component]);
        }
      }
    };
  })
};


/***/ }),
/* 676 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent string definitions for references and prevent referencing this.refs
 * @author Tom Hastjarjanto
 */


const Components = __webpack_require__(578);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent string definitions for references and prevent referencing this.refs',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('no-string-refs')
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => {
    /**
     * Checks if we are using refs
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if we are using refs, false if not.
     */
    function isRefsUsage(node) {
      return Boolean(
        (
          utils.getParentES6Component() ||
          utils.getParentES5Component()
        ) &&
        node.object.type === 'ThisExpression' &&
        node.property.name === 'refs'
      );
    }

    /**
     * Checks if we are using a ref attribute
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if we are using a ref attribute, false if not.
     */
    function isRefAttribute(node) {
      return Boolean(
        node.type === 'JSXAttribute' &&
        node.name &&
        node.name.name === 'ref'
      );
    }

    /**
     * Checks if a node contains a string value
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if the node contains a string value, false if not.
     */
    function containsStringLiteral(node) {
      return Boolean(
        node.value &&
        node.value.type === 'Literal' &&
        typeof node.value.value === 'string'
      );
    }

    /**
     * Checks if a node contains a string value within a jsx expression
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if the node contains a string value within a jsx expression, false if not.
     */
    function containsStringExpressionContainer(node) {
      return Boolean(
        node.value &&
        node.value.type === 'JSXExpressionContainer' &&
        node.value.expression &&
        node.value.expression.type === 'Literal' &&
        typeof node.value.expression.value === 'string'
      );
    }

    return {
      MemberExpression: function(node) {
        if (isRefsUsage(node)) {
          context.report({
            node: node,
            message: 'Using this.refs is deprecated.'
          });
        }
      },
      JSXAttribute: function(node) {
        if (
          isRefAttribute(node) &&
          (containsStringLiteral(node) || containsStringExpressionContainer(node))
        ) {
          context.report({
            node: node,
            message: 'Using string literals in ref attributes is deprecated.'
          });
        }
      }
    };
  })
};


/***/ }),
/* 677 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Flag shouldComponentUpdate when extending PureComponent
 */


const Components = __webpack_require__(578);
const astUtil = __webpack_require__(581);
const docsUrl = __webpack_require__(587);

function errorMessage(node) {
  return `${node} does not need shouldComponentUpdate when extending React.PureComponent.`;
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Flag shouldComponentUpdate when extending PureComponent',
      category: 'Possible Errors',
      recommended: false,
      url: docsUrl('no-redundant-should-component-update')
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => {
    /**
     * Checks for shouldComponentUpdate property
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} Whether or not the property exists.
     */
    function hasShouldComponentUpdate(node) {
      const properties = astUtil.getComponentProperties(node);
      return properties.some(property => {
        const name = astUtil.getPropertyName(property);
        return name === 'shouldComponentUpdate';
      });
    }

    /**
     * Get name of node if available
     * @param {ASTNode} node The AST node being checked.
     * @return {String} The name of the node
     */
    function getNodeName(node) {
      if (node.id) {
        return node.id.name;
      } else if (node.parent && node.parent.id) {
        return node.parent.id.name;
      }
      return '';
    }

    /**
     * Checks for violation of rule
     * @param {ASTNode} node The AST node being checked.
     */
    function checkForViolation(node) {
      if (utils.isPureComponent(node)) {
        const hasScu = hasShouldComponentUpdate(node);
        if (hasScu) {
          const className = getNodeName(node);
          context.report({
            node: node,
            message: errorMessage(className)
          });
        }
      }
    }

    return {
      ClassDeclaration: checkForViolation,
      ClassExpression: checkForViolation
    };
  })
};


/***/ }),
/* 678 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of the return value of React.render
 * @author Dustan Kasten
 */


const versionUtil = __webpack_require__(585);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of the return value of React.render',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('no-render-return-value')
    },
    schema: []
  },

  create: function(context) {
    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {

      CallExpression: function(node) {
        const callee = node.callee;
        const parent = node.parent;
        if (callee.type !== 'MemberExpression') {
          return;
        }

        let calleeObjectName = /^ReactDOM$/;
        if (versionUtil.testReactVersion(context, '15.0.0')) {
          calleeObjectName = /^ReactDOM$/;
        } else if (versionUtil.testReactVersion(context, '0.14.0')) {
          calleeObjectName = /^React(DOM)?$/;
        } else if (versionUtil.testReactVersion(context, '0.13.0')) {
          calleeObjectName = /^React$/;
        }

        if (
          callee.object.type !== 'Identifier' ||
          !calleeObjectName.test(callee.object.name) ||
          callee.property.name !== 'render'
        ) {
          return;
        }

        if (
          parent.type === 'VariableDeclarator' ||
          parent.type === 'Property' ||
          parent.type === 'ReturnStatement' ||
          parent.type === 'ArrowFunctionExpression'
        ) {
          context.report({
            node: callee,
            message: `Do not depend on the return value from ${callee.object.name}.render`
          });
        }
      }
    };
  }
};


/***/ }),
/* 679 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Report "this" being used in stateless functional components.
 */


const Components = __webpack_require__(578);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const ERROR_MESSAGE = 'Stateless functional components should not use this';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Report "this" being used in stateless components',
      category: 'Possible Errors',
      recommended: false,
      url: docsUrl('no-this-in-sfc')
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => ({
    MemberExpression(node) {
      const component = components.get(utils.getParentStatelessComponent());
      if (!component) {
        return;
      }
      if (node.object.type === 'ThisExpression') {
        context.report({
          node: node,
          message: ERROR_MESSAGE
        });
      }
    }
  }))
};


/***/ }),
/* 680 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent common casing typos
 */


const Components = __webpack_require__(578);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const STATIC_CLASS_PROPERTIES = ['propTypes', 'contextTypes', 'childContextTypes', 'defaultProps'];
const LIFECYCLE_METHODS = [
  'getDerivedStateFromProps',
  'componentWillMount',
  'UNSAFE_componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'UNSAFE_componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'UNSAFE_componentWillUpdate',
  'getSnapshotBeforeUpdate',
  'componentDidUpdate',
  'componentDidCatch',
  'componentWillUnmount',
  'render'
];

const PROP_TYPES = Object.keys(__webpack_require__(681));

module.exports = {
  meta: {
    docs: {
      description: 'Prevent common typos',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('no-typos')
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => {
    let propTypesPackageName = null;
    let reactPackageName = null;

    function checkValidPropTypeQualifier(node) {
      if (node.name !== 'isRequired') {
        context.report({
          node: node,
          message: `Typo in prop type chain qualifier: ${node.name}`
        });
      }
    }

    function checkValidPropType(node) {
      if (node.name && !PROP_TYPES.some(propTypeName => propTypeName === node.name)) {
        context.report({
          node: node,
          message: `Typo in declared prop type: ${node.name}`
        });
      }
    }

    function isPropTypesPackage(node) {
      return (
        node.type === 'Identifier' &&
        node.name === propTypesPackageName
      ) || (
        node.type === 'MemberExpression' &&
        node.property.name === 'PropTypes' &&
        node.object.name === reactPackageName
      );
    }

    /* eslint-disable no-use-before-define */

    function checkValidCallExpression(node) {
      const callee = node.callee;
      if (callee.type === 'MemberExpression' && callee.property.name === 'shape') {
        checkValidPropObject(node.arguments[0]);
      } else if (callee.type === 'MemberExpression' && callee.property.name === 'oneOfType') {
        const args = node.arguments[0];
        if (args && args.type === 'ArrayExpression') {
          args.elements.forEach(el => {
            checkValidProp(el);
          });
        }
      }
    }

    function checkValidProp(node) {
      if ((!propTypesPackageName && !reactPackageName) || !node) {
        return;
      }

      if (node.type === 'MemberExpression') {
        if (
          node.object.type === 'MemberExpression' &&
          isPropTypesPackage(node.object.object)
        ) { // PropTypes.myProp.isRequired
          checkValidPropType(node.object.property);
          checkValidPropTypeQualifier(node.property);
        } else if (
          isPropTypesPackage(node.object) &&
          node.property.name !== 'isRequired'
        ) { // PropTypes.myProp
          checkValidPropType(node.property);
        } else if (node.object.type === 'CallExpression') {
          checkValidPropTypeQualifier(node.property);
          checkValidCallExpression(node.object);
        }
      } else if (node.type === 'CallExpression') {
        checkValidCallExpression(node);
      }
    }

    /* eslint-enable no-use-before-define */

    function checkValidPropObject (node) {
      if (node && node.type === 'ObjectExpression') {
        node.properties.forEach(prop => checkValidProp(prop.value));
      }
    }

    function reportErrorIfClassPropertyCasingTypo(node, propertyName) {
      if (propertyName === 'propTypes' || propertyName === 'contextTypes' || propertyName === 'childContextTypes') {
        checkValidPropObject(node);
      }
      STATIC_CLASS_PROPERTIES.forEach(CLASS_PROP => {
        if (propertyName && CLASS_PROP.toLowerCase() === propertyName.toLowerCase() && CLASS_PROP !== propertyName) {
          context.report({
            node: node,
            message: 'Typo in static class property declaration'
          });
        }
      });
    }

    function reportErrorIfLifecycleMethodCasingTypo(node) {
      LIFECYCLE_METHODS.forEach(method => {
        if (method.toLowerCase() === node.key.name.toLowerCase() && method !== node.key.name) {
          context.report({
            node: node,
            message: 'Typo in component lifecycle method declaration'
          });
        }
      });
    }

    return {
      ImportDeclaration: function(node) {
        if (node.source && node.source.value === 'prop-types') { // import PropType from "prop-types"
          propTypesPackageName = node.specifiers[0].local.name;
        } else if (node.source && node.source.value === 'react') { // import { PropTypes } from "react"
          if (node.specifiers.length > 0) {
            reactPackageName = node.specifiers[0].local.name; // guard against accidental anonymous `import "react"`
          }
          if (node.specifiers.length >= 1) {
            const propTypesSpecifier = node.specifiers.find(specifier => (
              specifier.imported && specifier.imported.name === 'PropTypes'
            ));
            if (propTypesSpecifier) {
              propTypesPackageName = propTypesSpecifier.local.name;
            }
          }
        }
      },

      ClassProperty: function(node) {
        if (!node.static || !utils.isES6Component(node.parent.parent)) {
          return;
        }

        const tokens = context.getFirstTokens(node, 2);
        const propertyName = tokens[1].value;
        reportErrorIfClassPropertyCasingTypo(node.value, propertyName);
      },

      MemberExpression: function(node) {
        const propertyName = node.property.name;

        if (
          !propertyName ||
          STATIC_CLASS_PROPERTIES.map(prop => prop.toLocaleLowerCase()).indexOf(propertyName.toLowerCase()) === -1
        ) {
          return;
        }

        const relatedComponent = utils.getRelatedComponent(node);

        if (
          relatedComponent &&
          (utils.isES6Component(relatedComponent.node) || utils.isReturningJSX(relatedComponent.node)) &&
          (node.parent && node.parent.type === 'AssignmentExpression' && node.parent.right)
        ) {
          reportErrorIfClassPropertyCasingTypo(node.parent.right, propertyName);
        }
      },

      MethodDefinition: function (node) {
        if (!utils.isES6Component(node.parent.parent)) {
          return;
        }

        reportErrorIfLifecycleMethodCasingTypo(node);
      }
    };
  })
};


/***/ }),
/* 681 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, isValidElement, REACT_ELEMENT_TYPE; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(682)();
}


/***/ }),
/* 682 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(683);

function emptyFunction() {}

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 683 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 684 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview HTML special characters should be escaped.
 * @author Patrick Hayes
 */


const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

// NOTE: '<' and '{' are also problematic characters, but they do not need
// to be included here because it is a syntax error when these characters are
// included accidentally.
const DEFAULTS = ['>', '"', '\'', '}'];

module.exports = {
  meta: {
    docs: {
      description: 'Detect unescaped HTML entities, which might represent malformed tags',
      category: 'Possible Errors',
      recommended: true,
      url: docsUrl('no-unescaped-entities')
    },
    schema: [{
      type: 'object',
      properties: {
        forbid: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      },
      additionalProperties: false
    }]
  },

  create: function(context) {
    function reportInvalidEntity(node) {
      const configuration = context.options[0] || {};
      const entities = configuration.forbid || DEFAULTS;

      // HTML entites are already escaped in node.value (as well as node.raw),
      // so pull the raw text from context.getSourceCode()
      for (let i = node.loc.start.line; i <= node.loc.end.line; i++) {
        let rawLine = context.getSourceCode().lines[i - 1];
        let start = 0;
        let end = rawLine.length;
        if (i === node.loc.start.line) {
          start = node.loc.start.column;
        }
        if (i === node.loc.end.line) {
          end = node.loc.end.column;
        }
        rawLine = rawLine.substring(start, end);
        for (let j = 0; j < entities.length; j++) {
          for (let index = 0; index < rawLine.length; index++) {
            const c = rawLine[index];
            if (c === entities[j]) {
              context.report({
                loc: {line: i, column: start + index},
                message: 'HTML entities must be escaped.',
                node: node
              });
            }
          }
        }
      }
    }

    return {
      'Literal, JSXText': function(node) {
        if (node.parent.type === 'JSXElement') {
          reportInvalidEntity(node);
        }
      }
    };
  }
};


/***/ }),
/* 685 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of unknown DOM property
 * @author Yannick Croissant
 */


const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DEFAULTS = {
  ignore: []
};

const UNKNOWN_MESSAGE = 'Unknown property \'{{name}}\' found, use \'{{standardName}}\' instead';
const WRONG_TAG_MESSAGE = 'Invalid property \'{{name}}\' found on tag \'{{tagName}}\', but it is only allowed on: {{allowedTags}}';

const DOM_ATTRIBUTE_NAMES = {
  'accept-charset': 'acceptCharset',
  class: 'className',
  for: 'htmlFor',
  'http-equiv': 'httpEquiv',
  crossorigin: 'crossOrigin'
};

const ATTRIBUTE_TAGS_MAP = {
  crossOrigin: ['script', 'img', 'video', 'audio', 'link']
};

const SVGDOM_ATTRIBUTE_NAMES = {
  'accent-height': 'accentHeight',
  'alignment-baseline': 'alignmentBaseline',
  'arabic-form': 'arabicForm',
  'baseline-shift': 'baselineShift',
  'cap-height': 'capHeight',
  'clip-path': 'clipPath',
  'clip-rule': 'clipRule',
  'color-interpolation': 'colorInterpolation',
  'color-interpolation-filters': 'colorInterpolationFilters',
  'color-profile': 'colorProfile',
  'color-rendering': 'colorRendering',
  'dominant-baseline': 'dominantBaseline',
  'enable-background': 'enableBackground',
  'fill-opacity': 'fillOpacity',
  'fill-rule': 'fillRule',
  'flood-color': 'floodColor',
  'flood-opacity': 'floodOpacity',
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-size-adjust': 'fontSizeAdjust',
  'font-stretch': 'fontStretch',
  'font-style': 'fontStyle',
  'font-variant': 'fontVariant',
  'font-weight': 'fontWeight',
  'glyph-name': 'glyphName',
  'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
  'glyph-orientation-vertical': 'glyphOrientationVertical',
  'horiz-adv-x': 'horizAdvX',
  'horiz-origin-x': 'horizOriginX',
  'image-rendering': 'imageRendering',
  'letter-spacing': 'letterSpacing',
  'lighting-color': 'lightingColor',
  'marker-end': 'markerEnd',
  'marker-mid': 'markerMid',
  'marker-start': 'markerStart',
  'overline-position': 'overlinePosition',
  'overline-thickness': 'overlineThickness',
  'paint-order': 'paintOrder',
  'panose-1': 'panose1',
  'pointer-events': 'pointerEvents',
  'rendering-intent': 'renderingIntent',
  'shape-rendering': 'shapeRendering',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'strikethrough-position': 'strikethroughPosition',
  'strikethrough-thickness': 'strikethroughThickness',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-miterlimit': 'strokeMiterlimit',
  'stroke-opacity': 'strokeOpacity',
  'stroke-width': 'strokeWidth',
  'text-anchor': 'textAnchor',
  'text-decoration': 'textDecoration',
  'text-rendering': 'textRendering',
  'underline-position': 'underlinePosition',
  'underline-thickness': 'underlineThickness',
  'unicode-bidi': 'unicodeBidi',
  'unicode-range': 'unicodeRange',
  'units-per-em': 'unitsPerEm',
  'v-alphabetic': 'vAlphabetic',
  'v-hanging': 'vHanging',
  'v-ideographic': 'vIdeographic',
  'v-mathematical': 'vMathematical',
  'vector-effect': 'vectorEffect',
  'vert-adv-y': 'vertAdvY',
  'vert-origin-x': 'vertOriginX',
  'vert-origin-y': 'vertOriginY',
  'word-spacing': 'wordSpacing',
  'writing-mode': 'writingMode',
  'x-height': 'xHeight',
  'xlink:actuate': 'xlinkActuate',
  'xlink:arcrole': 'xlinkArcrole',
  'xlink:href': 'xlinkHref',
  'xlink:role': 'xlinkRole',
  'xlink:show': 'xlinkShow',
  'xlink:title': 'xlinkTitle',
  'xlink:type': 'xlinkType',
  'xml:base': 'xmlBase',
  'xml:lang': 'xmlLang',
  'xml:space': 'xmlSpace'
};

const DOM_PROPERTY_NAMES = [
  // Standard
  'acceptCharset', 'accessKey', 'allowFullScreen', 'allowTransparency', 'autoComplete', 'autoFocus', 'autoPlay',
  'cellPadding', 'cellSpacing', 'classID', 'className', 'colSpan', 'contentEditable', 'contextMenu',
  'dateTime', 'encType', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget',
  'frameBorder', 'hrefLang', 'htmlFor', 'httpEquiv', 'inputMode', 'keyParams', 'keyType', 'marginHeight', 'marginWidth',
  'maxLength', 'mediaGroup', 'minLength', 'noValidate', 'onAnimationEnd', 'onAnimationIteration', 'onAnimationStart',
  'onBlur', 'onChange', 'onClick', 'onContextMenu', 'onCopy', 'onCompositionEnd', 'onCompositionStart',
  'onCompositionUpdate', 'onCut', 'onDoubleClick', 'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave',
  'onError', 'onFocus', 'onInput', 'onKeyDown', 'onKeyPress', 'onKeyUp', 'onLoad', 'onWheel', 'onDragOver',
  'onDragStart', 'onDrop', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver',
  'onMouseUp', 'onPaste', 'onScroll', 'onSelect', 'onSubmit', 'onTransitionEnd', 'radioGroup', 'readOnly', 'rowSpan',
  'spellCheck', 'srcDoc', 'srcLang', 'srcSet', 'tabIndex', 'useMap',
  // Non standard
  'autoCapitalize', 'autoCorrect',
  'autoSave',
  'itemProp', 'itemScope', 'itemType', 'itemRef', 'itemID'
];

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Checks if a node matches the JSX tag convention.
 * @param {Object} node - JSX element being tested.
 * @returns {boolean} Whether or not the node name match the JSX tag convention.
 */
const tagConvention = /^[a-z][^-]*$/;
function isTagName(node) {
  if (tagConvention.test(node.parent.name.name)) {
    // http://www.w3.org/TR/custom-elements/#type-extension-semantics
    return !node.parent.attributes.some(attrNode => (
      attrNode.type === 'JSXAttribute' &&
        attrNode.name.type === 'JSXIdentifier' &&
        attrNode.name.name === 'is'
    ));
  }
  return false;
}

/**
 * Extracts the tag name for the JSXAttribute
 * @param {Object} node - JSXAttribute being tested.
 * @returns {String} tag name
 */
function getTagName(node) {
  if (node && node.parent && node.parent.name && node.parent.name) {
    return node.parent.name.name;
  }
  return null;
}

/**
 * Get the standard name of the attribute.
 * @param {String} name - Name of the attribute.
 * @returns {String} The standard name of the attribute.
 */
function getStandardName(name) {
  if (DOM_ATTRIBUTE_NAMES[name]) {
    return DOM_ATTRIBUTE_NAMES[name];
  }
  if (SVGDOM_ATTRIBUTE_NAMES[name]) {
    return SVGDOM_ATTRIBUTE_NAMES[name];
  }
  let i;
  const found = DOM_PROPERTY_NAMES.some((element, index) => {
    i = index;
    return element.toLowerCase() === name;
  });
  return found ? DOM_PROPERTY_NAMES[i] : null;
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of unknown DOM property',
      category: 'Possible Errors',
      recommended: true,
      url: docsUrl('no-unknown-property')
    },
    fixable: 'code',

    schema: [{
      type: 'object',
      properties: {
        ignore: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      },
      additionalProperties: false
    }]
  },

  create: function(context) {
    function getIgnoreConfig() {
      return context.options[0] && context.options[0].ignore || DEFAULTS.ignore;
    }

    const sourceCode = context.getSourceCode();

    return {

      JSXAttribute: function(node) {
        const ignoreNames = getIgnoreConfig();
        const name = sourceCode.getText(node.name);
        if (ignoreNames.indexOf(name) >= 0) {
          return;
        }

        const tagName = getTagName(node);
        const allowedTags = ATTRIBUTE_TAGS_MAP[name];
        if (tagName && allowedTags && /[^A-Z]/.test(tagName.charAt(0)) && allowedTags.indexOf(tagName) === -1) {
          context.report({
            node: node,
            message: WRONG_TAG_MESSAGE,
            data: {
              name: name,
              tagName: tagName,
              allowedTags: allowedTags.join(', ')
            }
          });
        }

        const standardName = getStandardName(name);
        if (!isTagName(node) || !standardName) {
          return;
        }
        context.report({
          node: node,
          message: UNKNOWN_MESSAGE,
          data: {
            name: name,
            standardName: standardName
          },
          fix: function(fixer) {
            return fixer.replaceText(node.name, standardName);
          }
        });
      }
    };
  }
};


/***/ }),
/* 686 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of UNSAFE_ methods
 * @author Sergei Startsev
 */



const Components = __webpack_require__(578);
const astUtil = __webpack_require__(581);
const docsUrl = __webpack_require__(587);
const versionUtil = __webpack_require__(585);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of UNSAFE_ methods',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('no-unsafe')
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => {
    const isApplicable = versionUtil.testReactVersion(context, '16.3.0');
    if (!isApplicable) {
      return {};
    }

    /**
     * Returns a list of unsafe methods
     * @returns {Array} A list of unsafe methods
     */
    function getUnsafeMethods() {
      return [
        'UNSAFE_componentWillMount',
        'UNSAFE_componentWillReceiveProps',
        'UNSAFE_componentWillUpdate'
      ];
    }

    /**
     * Checks if a passed method is unsafe
     * @param {string} method Life cycle method
     * @returns {boolean} Returns true for unsafe methods, otherwise returns false
     */
    function isUnsafe(method) {
      const unsafeMethods = getUnsafeMethods();
      return unsafeMethods.indexOf(method) !== -1;
    }

    /**
     * Reports the error for an unsafe method
     * @param {ASTNode} node The AST node being checked
     * @param {string} method Life cycle method
     */
    function checkUnsafe(node, method) {
      if (!isUnsafe(method)) {
        return;
      }

      context.report({
        node: node,
        message: `${method} is unsafe for use in async rendering, see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html`
      });
    }

    /**
     * Returns life cycle methods if available
     * @param {ASTNode} node The AST node being checked.
     * @returns {Array} The array of methods.
     */
    function getLifeCycleMethods(node) {
      const properties = astUtil.getComponentProperties(node);
      return properties.map(property => astUtil.getPropertyName(property));
    }

    /**
     * Checks life cycle methods
     * @param {ASTNode} node The AST node being checked.
     */
    function checkLifeCycleMethods(node) {
      if (utils.isES5Component(node) || utils.isES6Component(node)) {
        const methods = getLifeCycleMethods(node);
        methods.forEach(method => checkUnsafe(node, method));
      }
    }

    return {
      ClassDeclaration: checkLifeCycleMethods,
      ClassExpression: checkLifeCycleMethods,
      ObjectExpression: checkLifeCycleMethods
    };
  })
};


/***/ }),
/* 687 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent definitions of unused prop types
 * @author Evgueni Naverniouk
 */


// As for exceptions for props.children or props.className (and alike) look at
// https://github.com/yannickcr/eslint-plugin-react/issues/7

const has = __webpack_require__(574);
const Components = __webpack_require__(578);
const astUtil = __webpack_require__(581);
const versionUtil = __webpack_require__(585);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DIRECT_PROPS_REGEX = /^props\s*(\.|\[)/;
const DIRECT_NEXT_PROPS_REGEX = /^nextProps\s*(\.|\[)/;
const DIRECT_PREV_PROPS_REGEX = /^prevProps\s*(\.|\[)/;
const LIFE_CYCLE_METHODS = ['componentWillReceiveProps', 'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate'];
const ASYNC_SAFE_LIFE_CYCLE_METHODS = ['getDerivedStateFromProps', 'getSnapshotBeforeUpdate', 'UNSAFE_componentWillReceiveProps', 'UNSAFE_componentWillUpdate'];

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent definitions of unused prop types',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('no-unused-prop-types')
    },

    schema: [{
      type: 'object',
      properties: {
        customValidators: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        skipShapeProps: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components, utils) => {
    const sourceCode = context.getSourceCode();
    const checkAsyncSafeLifeCycles = versionUtil.testReactVersion(context, '16.3.0');
    const defaults = {skipShapeProps: true, customValidators: []};
    const configuration = Object.assign({}, defaults, context.options[0] || {});
    const UNUSED_MESSAGE = '\'{{name}}\' PropType is defined but prop is never used';

    /**
     * Check if we are in a lifecycle method
     * @return {boolean} true if we are in a class constructor, false if not
     **/
    function inLifeCycleMethod() {
      let scope = context.getScope();
      while (scope) {
        if (scope.block && scope.block.parent && scope.block.parent.key) {
          const name = scope.block.parent.key.name;

          if (LIFE_CYCLE_METHODS.indexOf(name) >= 0) {
            return true;
          } else if (checkAsyncSafeLifeCycles && ASYNC_SAFE_LIFE_CYCLE_METHODS.indexOf(name) >= 0) {
            return true;
          }
        }
        scope = scope.upper;
      }
      return false;
    }

    /**
     * Check if the current node is in a setState updater method
     * @return {boolean} true if we are in a setState updater, false if not
     */
    function inSetStateUpdater() {
      let scope = context.getScope();
      while (scope) {
        if (
          scope.block && scope.block.parent
          && scope.block.parent.type === 'CallExpression'
          && scope.block.parent.callee.property
          && scope.block.parent.callee.property.name === 'setState'
          // Make sure we are in the updater not the callback
          && scope.block.parent.arguments[0].start === scope.block.start
        ) {
          return true;
        }
        scope = scope.upper;
      }
      return false;
    }

    function isPropArgumentInSetStateUpdater(node) {
      let scope = context.getScope();
      while (scope) {
        if (
          scope.block && scope.block.parent
          && scope.block.parent.type === 'CallExpression'
          && scope.block.parent.callee.property
          && scope.block.parent.callee.property.name === 'setState'
          // Make sure we are in the updater not the callback
          && scope.block.parent.arguments[0].start === scope.block.start
          && scope.block.parent.arguments[0].params
          && scope.block.parent.arguments[0].params.length > 1
        ) {
          return scope.block.parent.arguments[0].params[1].name === node.object.name;
        }
        scope = scope.upper;
      }
      return false;
    }

    /**
     * Checks if we are using a prop
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if we are using a prop, false if not.
     */
    function isPropTypesUsage(node) {
      const isClassUsage = (
        (utils.getParentES6Component() || utils.getParentES5Component()) &&
        ((node.object.type === 'ThisExpression' && node.property.name === 'props')
        || isPropArgumentInSetStateUpdater(node))
      );
      const isStatelessFunctionUsage = node.object.name === 'props';
      return isClassUsage || isStatelessFunctionUsage || inLifeCycleMethod();
    }

    /**
     * Checks if the component must be validated
     * @param {Object} component The component to process
     * @returns {Boolean} True if the component must be validated, false if not.
     */
    function mustBeValidated(component) {
      return Boolean(
        component &&
        !component.ignorePropsValidation
      );
    }

    /**
     * Returns true if the given node is a React Component lifecycle method
     * @param {ASTNode} node The AST node being checked.
     * @return {Boolean} True if the node is a lifecycle method
     */
    function isNodeALifeCycleMethod(node) {
      const nodeKeyName = (node.key || {}).name;

      if (node.kind === 'constructor') {
        return true;
      } else if (LIFE_CYCLE_METHODS.indexOf(nodeKeyName) >= 0) {
        return true;
      } else if (checkAsyncSafeLifeCycles && ASYNC_SAFE_LIFE_CYCLE_METHODS.indexOf(nodeKeyName) >= 0) {
        return true;
      }

      return false;
    }

    /**
     * Returns true if the given node is inside a React Component lifecycle
     * method.
     * @param {ASTNode} node The AST node being checked.
     * @return {Boolean} True if the node is inside a lifecycle method
     */
    function isInLifeCycleMethod(node) {
      if ((node.type === 'MethodDefinition' || node.type === 'Property') && isNodeALifeCycleMethod(node)) {
        return true;
      }

      if (node.parent) {
        return isInLifeCycleMethod(node.parent);
      }

      return false;
    }

    /**
     * Checks if a prop init name matches common naming patterns
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if the prop name matches
     */
    function isPropAttributeName (node) {
      return (
        node.init.name === 'props' ||
        node.init.name === 'nextProps' ||
        node.init.name === 'prevProps'
      );
    }

    /**
     * Checks if a prop is used
     * @param {ASTNode} node The AST node being checked.
     * @param {Object} prop Declared prop object
     * @returns {Boolean} True if the prop is used, false if not.
     */
    function isPropUsed(node, prop) {
      const usedPropTypes = node.usedPropTypes || [];
      for (let i = 0, l = usedPropTypes.length; i < l; i++) {
        const usedProp = usedPropTypes[i];
        if (
          prop.type === 'shape' ||
          prop.name === '__ANY_KEY__' ||
          usedProp.name === prop.name
        ) {
          return true;
        }
      }

      return false;
    }

    /**
     * Checks if the prop has spread operator.
     * @param {ASTNode} node The AST node being marked.
     * @returns {Boolean} True if the prop has spread operator, false if not.
     */
    function hasSpreadOperator(node) {
      const tokens = sourceCode.getTokens(node);
      return tokens.length && tokens[0].value === '...';
    }

    /**
     * Removes quotes from around an identifier.
     * @param {string} the identifier to strip
     */
    function stripQuotes(string) {
      return string.replace(/^\'|\'$/g, '');
    }

    /**
     * Retrieve the name of a key node
     * @param {ASTNode} node The AST node with the key.
     * @return {string} the name of the key
     */
    function getKeyValue(node) {
      if (node.type === 'ObjectTypeProperty') {
        const tokens = context.getFirstTokens(node, 2);
        return (tokens[0].value === '+' || tokens[0].value === '-'
          ? tokens[1].value
          : stripQuotes(tokens[0].value)
        );
      }
      const key = node.key || node.argument;
      return key.type === 'Identifier' ? key.name : key.value;
    }

    /**
     * Check if we are in a class constructor
     * @return {boolean} true if we are in a class constructor, false if not
     */
    function inConstructor() {
      let scope = context.getScope();
      while (scope) {
        if (scope.block && scope.block.parent && scope.block.parent.kind === 'constructor') {
          return true;
        }
        scope = scope.upper;
      }
      return false;
    }

    /**
     * Retrieve the name of a property node
     * @param {ASTNode} node The AST node with the property.
     * @return {string} the name of the property or undefined if not found
     */
    function getPropertyName(node) {
      const isDirectProp = DIRECT_PROPS_REGEX.test(sourceCode.getText(node));
      const isDirectNextProp = DIRECT_NEXT_PROPS_REGEX.test(sourceCode.getText(node));
      const isDirectPrevProp = DIRECT_PREV_PROPS_REGEX.test(sourceCode.getText(node));
      const isDirectSetStateProp = isPropArgumentInSetStateUpdater(node);
      const isInClassComponent = utils.getParentES6Component() || utils.getParentES5Component();
      const isNotInConstructor = !inConstructor(node);
      const isNotInLifeCycleMethod = !inLifeCycleMethod();
      const isNotInSetStateUpdater = !inSetStateUpdater();
      if ((isDirectProp || isDirectNextProp || isDirectPrevProp || isDirectSetStateProp)
        && isInClassComponent
        && isNotInConstructor
        && isNotInLifeCycleMethod
        && isNotInSetStateUpdater
      ) {
        return void 0;
      }
      if (!isDirectProp && !isDirectNextProp && !isDirectPrevProp && !isDirectSetStateProp) {
        node = node.parent;
      }
      const property = node.property;
      if (property) {
        switch (property.type) {
          case 'Identifier':
            if (node.computed) {
              return '__COMPUTED_PROP__';
            }
            return property.name;
          case 'MemberExpression':
            return void 0;
          case 'Literal':
            // Accept computed properties that are literal strings
            if (typeof property.value === 'string') {
              return property.value;
            }
            // falls through
          default:
            if (node.computed) {
              return '__COMPUTED_PROP__';
            }
            break;
        }
      }
      return void 0;
    }

    /**
     * Mark a prop type as used
     * @param {ASTNode} node The AST node being marked.
     */
    function markPropTypesAsUsed(node, parentNames) {
      parentNames = parentNames || [];
      let type;
      let name;
      let allNames;
      let properties;
      switch (node.type) {
        case 'MemberExpression':
          name = getPropertyName(node);
          if (name) {
            allNames = parentNames.concat(name);
            if (node.parent.type === 'MemberExpression') {
              markPropTypesAsUsed(node.parent, allNames);
            }
            // Do not mark computed props as used.
            type = name !== '__COMPUTED_PROP__' ? 'direct' : null;
          } else if (
            node.parent.id &&
            node.parent.id.properties &&
            node.parent.id.properties.length &&
            getKeyValue(node.parent.id.properties[0])
          ) {
            type = 'destructuring';
            properties = node.parent.id.properties;
          }
          break;
        case 'ArrowFunctionExpression':
        case 'FunctionDeclaration':
        case 'FunctionExpression':
          if (node.params.length === 0) {
            break;
          }
          type = 'destructuring';
          properties = node.params[0].properties;
          if (inSetStateUpdater()) {
            properties = node.params[1].properties;
          }
          break;
        case 'VariableDeclarator':
          for (let i = 0, j = node.id.properties.length; i < j; i++) {
            // let {props: {firstname}} = this
            const thisDestructuring = (
              node.id.properties[i].key && (
                (node.id.properties[i].key.name === 'props' || node.id.properties[i].key.value === 'props') &&
                node.id.properties[i].value.type === 'ObjectPattern'
              )
            );
            // let {firstname} = props
            const genericDestructuring = isPropAttributeName(node) && (
              utils.getParentStatelessComponent() ||
              isInLifeCycleMethod(node)
            );

            if (thisDestructuring) {
              properties = node.id.properties[i].value.properties;
            } else if (genericDestructuring) {
              properties = node.id.properties;
            } else {
              continue;
            }
            type = 'destructuring';
            break;
          }
          break;
        default:
          throw new Error(`${node.type} ASTNodes are not handled by markPropTypesAsUsed`);
      }

      const component = components.get(utils.getParentComponent());
      const usedPropTypes = component && component.usedPropTypes || [];
      let ignorePropsValidation = component && component.ignorePropsValidation || false;

      switch (type) {
        case 'direct':
          // Ignore Object methods
          if (Object.prototype[name]) {
            break;
          }

          usedPropTypes.push({
            name: name,
            allNames: allNames
          });
          break;
        case 'destructuring':
          for (let k = 0, l = (properties || []).length; k < l; k++) {
            if (hasSpreadOperator(properties[k]) || properties[k].computed) {
              ignorePropsValidation = true;
              break;
            }
            const propName = getKeyValue(properties[k]);

            let currentNode = node;
            allNames = [];
            while (currentNode.property && currentNode.property.name !== 'props') {
              allNames.unshift(currentNode.property.name);
              currentNode = currentNode.object;
            }
            allNames.push(propName);

            if (propName) {
              usedPropTypes.push({
                allNames: allNames,
                name: propName
              });
            }
          }
          break;
        default:
          break;
      }

      components.set(component ? component.node : node, {
        usedPropTypes: usedPropTypes,
        ignorePropsValidation: ignorePropsValidation
      });
    }

    /**
     * Used to recursively loop through each declared prop type
     * @param {Object} component The component to process
     * @param {Array} props List of props to validate
     */
    function reportUnusedPropType (component, props) {
      // Skip props that check instances
      if (props === true) {
        return;
      }

      Object.keys(props || {}).forEach(key => {
        const prop = props[key];
        // Skip props that check instances
        if (prop === true) {
          return;
        }

        if (prop.type === 'shape' && configuration.skipShapeProps) {
          return;
        }

        if (prop.node && !isPropUsed(component, prop)) {
          context.report(
            prop.node,
            UNUSED_MESSAGE, {
              name: prop.fullName
            }
          );
        }

        if (prop.children) {
          reportUnusedPropType(component, prop.children);
        }
      });
    }

    /**
     * Reports unused proptypes for a given component
     * @param {Object} component The component to process
     */
    function reportUnusedPropTypes(component) {
      reportUnusedPropType(component, component.declaredPropTypes);
    }

    /**
     * @param {ASTNode} node We expect either an ArrowFunctionExpression,
     *   FunctionDeclaration, or FunctionExpression
     */
    function markDestructuredFunctionArgumentsAsUsed(node) {
      const destructuring = node.params && node.params[0] && node.params[0].type === 'ObjectPattern';
      if (destructuring && components.get(node)) {
        markPropTypesAsUsed(node);
      }
    }

    function handleSetStateUpdater(node) {
      if (!node.params || node.params.length < 2 || !inSetStateUpdater()) {
        return;
      }
      markPropTypesAsUsed(node);
    }

    /**
     * Handle both stateless functions and setState updater functions.
     * @param {ASTNode} node We expect either an ArrowFunctionExpression,
     *   FunctionDeclaration, or FunctionExpression
     */
    function handleFunctionLikeExpressions(node) {
      handleSetStateUpdater(node);
      markDestructuredFunctionArgumentsAsUsed(node);
    }

    function handleCustomValidators(component) {
      const propTypes = component.declaredPropTypes;
      if (!propTypes) {
        return;
      }

      Object.keys(propTypes).forEach(key => {
        const node = propTypes[key].node;

        if (astUtil.isFunctionLikeExpression(node)) {
          markPropTypesAsUsed(node);
        }
      });
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      VariableDeclarator: function(node) {
        const destructuring = node.init && node.id && node.id.type === 'ObjectPattern';
        // let {props: {firstname}} = this
        const thisDestructuring = destructuring && node.init.type === 'ThisExpression';
        // let {firstname} = props
        const statelessDestructuring = destructuring && isPropAttributeName(node) && (
          utils.getParentStatelessComponent() ||
          isInLifeCycleMethod(node)
        );

        if (!thisDestructuring && !statelessDestructuring) {
          return;
        }
        markPropTypesAsUsed(node);
      },

      FunctionDeclaration: handleFunctionLikeExpressions,

      ArrowFunctionExpression: handleFunctionLikeExpressions,

      FunctionExpression: handleFunctionLikeExpressions,

      MemberExpression: function(node) {
        if (isPropTypesUsage(node)) {
          markPropTypesAsUsed(node);
        }
      },

      ObjectPattern: function(node) {
        // If the object pattern is a destructured props object in a lifecycle
        // method -- mark it for used props.
        if (isNodeALifeCycleMethod(node.parent.parent)) {
          node.properties.forEach((property, i) => {
            if (i === 0) {
              markPropTypesAsUsed(node.parent);
            }
          });
        }
      },

      'Program:exit': function() {
        const list = components.list();
        // Report undeclared proptypes for all classes
        for (const component in list) {
          if (!has(list, component) || !mustBeValidated(list[component])) {
            continue;
          }
          handleCustomValidators(list[component]);
          reportUnusedPropTypes(list[component]);
        }
      }
    };
  })
};


/***/ }),
/* 688 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview  Attempts to discover all state fields in a React component and
 * warn if any of them are never read.
 *
 * State field definitions are collected from `this.state = {}` assignments in
 * the constructor, objects passed to `this.setState()`, and `state = {}` class
 * property assignments.
 */



const Components = __webpack_require__(578);
const docsUrl = __webpack_require__(587);

// Descend through all wrapping TypeCastExpressions and return the expression
// that was cast.
function uncast(node) {
  while (node.type === 'TypeCastExpression') {
    node = node.expression;
  }
  return node;
}

// Return the name of an identifier or the string value of a literal. Useful
// anywhere that a literal may be used as a key (e.g., member expressions,
// method definitions, ObjectExpression property keys).
function getName(node) {
  node = uncast(node);
  const type = node.type;

  if (type === 'Identifier') {
    return node.name;
  } else if (type === 'Literal') {
    return String(node.value);
  } else if (type === 'TemplateLiteral' && node.expressions.length === 0) {
    return node.quasis[0].value.raw;
  }
  return null;
}

function isThisExpression(node) {
  return uncast(node).type === 'ThisExpression';
}

function getInitialClassInfo() {
  return {
    // Set of nodes where state fields were defined.
    stateFields: new Set(),

    // Set of names of state fields that we've seen used.
    usedStateFields: new Set(),

    // Names of local variables that may be pointing to this.state. To
    // track this properly, we would need to keep track of all locals,
    // shadowing, assignments, etc. To keep things simple, we only
    // maintain one set of aliases per method and accept that it will
    // produce some false negatives.
    aliases: null
  };
}

module.exports = {
  meta: {
    docs: {
      description: 'Prevent definition of unused state fields',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('no-unused-state')
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => {
    // Non-null when we are inside a React component ClassDeclaration and we have
    // not yet encountered any use of this.state which we have chosen not to
    // analyze. If we encounter any such usage (like this.state being spread as
    // JSX attributes), then this is again set to null.
    let classInfo = null;

    // Returns true if the given node is possibly a reference to `this.state`, `prevState` or `nextState`.
    function isStateReference(node) {
      node = uncast(node);

      const isDirectStateReference =
        node.type === 'MemberExpression' &&
        isThisExpression(node.object) &&
        node.property.name === 'state';

      const isAliasedStateReference =
        node.type === 'Identifier' &&
        classInfo.aliases &&
        classInfo.aliases.has(node.name);

      const isPrevStateReference =
        node.type === 'Identifier' &&
        node.name === 'prevState';

      const isNextStateReference =
        node.type === 'Identifier' &&
        node.name === 'nextState';

      return isDirectStateReference || isAliasedStateReference || isPrevStateReference || isNextStateReference;
    }

    // Takes an ObjectExpression node and adds all named Property nodes to the
    // current set of state fields.
    function addStateFields(node) {
      for (const prop of node.properties) {
        const key = prop.key;

        if (
          prop.type === 'Property' &&
          (key.type === 'Literal' ||
          (key.type === 'TemplateLiteral' && key.expressions.length === 0) ||
          (prop.computed === false && key.type === 'Identifier')) &&
          getName(prop.key) !== null
        ) {
          classInfo.stateFields.add(prop);
        }
      }
    }

    // Adds the name of the given node as a used state field if the node is an
    // Identifier or a Literal. Other node types are ignored.
    function addUsedStateField(node) {
      const name = getName(node);
      if (name) {
        classInfo.usedStateFields.add(name);
      }
    }

    // Records used state fields and new aliases for an ObjectPattern which
    // destructures `this.state`.
    function handleStateDestructuring(node) {
      for (const prop of node.properties) {
        if (prop.type === 'Property') {
          addUsedStateField(prop.key);
        } else if (
          (prop.type === 'ExperimentalRestProperty' || prop.type === 'RestElement') &&
          classInfo.aliases
        ) {
          classInfo.aliases.add(getName(prop.argument));
        }
      }
    }

    // Used to record used state fields and new aliases for both
    // AssignmentExpressions and VariableDeclarators.
    function handleAssignment(left, right) {
      switch (left.type) {
        case 'Identifier':
          if (isStateReference(right) && classInfo.aliases) {
            classInfo.aliases.add(left.name);
          }
          break;
        case 'ObjectPattern':
          if (isStateReference(right)) {
            handleStateDestructuring(left);
          } else if (isThisExpression(right) && classInfo.aliases) {
            for (const prop of left.properties) {
              if (prop.type === 'Property' && getName(prop.key) === 'state') {
                const name = getName(prop.value);
                if (name) {
                  classInfo.aliases.add(name);
                } else if (prop.value.type === 'ObjectPattern') {
                  handleStateDestructuring(prop.value);
                }
              }
            }
          }
          break;
        default:
        // pass
      }
    }

    function reportUnusedFields() {
      // Report all unused state fields.
      for (const node of classInfo.stateFields) {
        const name = getName(node.key);
        if (!classInfo.usedStateFields.has(name)) {
          context.report(node, `Unused state field: '${name}'`);
        }
      }
    }

    return {
      ClassDeclaration(node) {
        if (utils.isES6Component(node)) {
          classInfo = getInitialClassInfo();
        }
      },

      ObjectExpression(node) {
        if (utils.isES5Component(node)) {
          classInfo = getInitialClassInfo();
        }
      },

      'ObjectExpression:exit'(node) {
        if (!classInfo) {
          return;
        }

        if (utils.isES5Component(node)) {
          reportUnusedFields();
          classInfo = null;
        }
      },

      'ClassDeclaration:exit'() {
        if (!classInfo) {
          return;
        }
        reportUnusedFields();
        classInfo = null;
      },

      CallExpression(node) {
        if (!classInfo) {
          return;
        }
        // If we're looking at a `this.setState({})` invocation, record all the
        // properties as state fields.
        if (
          node.callee.type === 'MemberExpression' &&
          isThisExpression(node.callee.object) &&
          getName(node.callee.property) === 'setState' &&
          node.arguments.length > 0 &&
          node.arguments[0].type === 'ObjectExpression'
        ) {
          addStateFields(node.arguments[0]);
        }
      },

      ClassProperty(node) {
        if (!classInfo) {
          return;
        }
        // If we see state being assigned as a class property using an object
        // expression, record all the fields of that object as state fields.
        if (
          getName(node.key) === 'state' &&
          !node.static &&
          node.value &&
          node.value.type === 'ObjectExpression'
        ) {
          addStateFields(node.value);
        }

        if (
          !node.static &&
          node.value &&
          node.value.type === 'ArrowFunctionExpression'
        ) {
          // Create a new set for this.state aliases local to this method.
          classInfo.aliases = new Set();
        }
      },

      'ClassProperty:exit'(node) {
        if (
          classInfo &&
          !node.static &&
          node.value &&
          node.value.type === 'ArrowFunctionExpression'
        ) {
          // Forget our set of local aliases.
          classInfo.aliases = null;
        }
      },

      MethodDefinition() {
        if (!classInfo) {
          return;
        }
        // Create a new set for this.state aliases local to this method.
        classInfo.aliases = new Set();
      },

      'MethodDefinition:exit'() {
        if (!classInfo) {
          return;
        }
        // Forget our set of local aliases.
        classInfo.aliases = null;
      },

      FunctionExpression(node) {
        if (!classInfo) {
          return;
        }

        const parent = node.parent;
        if (!utils.isES5Component(parent.parent)) {
          return;
        }

        if (parent.key.name === 'getInitialState') {
          const body = node.body.body;
          const lastBodyNode = body[body.length - 1];

          if (
            lastBodyNode.type === 'ReturnStatement' &&
            lastBodyNode.argument.type === 'ObjectExpression'
          ) {
            addStateFields(lastBodyNode.argument);
          }
        } else {
          // Create a new set for this.state aliases local to this method.
          classInfo.aliases = new Set();
        }
      },

      AssignmentExpression(node) {
        if (!classInfo) {
          return;
        }
        // Check for assignments like `this.state = {}`
        if (
          node.left.type === 'MemberExpression' &&
          isThisExpression(node.left.object) &&
          getName(node.left.property) === 'state' &&
          node.right.type === 'ObjectExpression'
        ) {
          // Find the nearest function expression containing this assignment.
          let fn = node;
          while (fn.type !== 'FunctionExpression' && fn.parent) {
            fn = fn.parent;
          }
          // If the nearest containing function is the constructor, then we want
          // to record all the assigned properties as state fields.
          if (
            fn.parent &&
            fn.parent.type === 'MethodDefinition' &&
            fn.parent.kind === 'constructor'
          ) {
            addStateFields(node.right);
          }
        } else {
          // Check for assignments like `alias = this.state` and record the alias.
          handleAssignment(node.left, node.right);
        }
      },

      VariableDeclarator(node) {
        if (!classInfo || !node.init) {
          return;
        }
        handleAssignment(node.id, node.init);
      },

      MemberExpression(node) {
        if (!classInfo) {
          return;
        }
        if (isStateReference(node.object)) {
          // If we see this.state[foo] access, give up.
          if (node.computed && node.property.type !== 'Literal') {
            classInfo = null;
            return;
          }
          // Otherwise, record that we saw this property being accessed.
          addUsedStateField(node.property);
        // If we see a `this.state` access in a CallExpression, give up.
        } else if (isStateReference(node) && node.parent.type === 'CallExpression') {
          classInfo = null;
        }
      },

      JSXSpreadAttribute(node) {
        if (classInfo && isStateReference(node.argument)) {
          classInfo = null;
        }
      },

      'ExperimentalSpreadProperty, SpreadElement'(node) {
        if (classInfo && isStateReference(node.argument)) {
          classInfo = null;
        }
      }
    };
  })
};


/***/ }),
/* 689 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of setState in componentWillUpdate
 * @author Yannick Croissant
 */


const makeNoMethodSetStateRule = __webpack_require__(669);
const versionUtil = __webpack_require__(585);

module.exports = makeNoMethodSetStateRule(
  'componentWillUpdate',
  context => versionUtil.testReactVersion(context, '16.3.0')
);


/***/ }),
/* 690 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce ES5 or ES6 class for React Components
 * @author Dan Hamilton
 */


const Components = __webpack_require__(578);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce ES5 or ES6 class for React Components',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('prefer-es6-class')
    },

    schema: [{
      enum: ['always', 'never']
    }]
  },

  create: Components.detect((context, components, utils) => {
    const configuration = context.options[0] || 'always';

    return {
      ObjectExpression: function(node) {
        if (utils.isES5Component(node) && configuration === 'always') {
          context.report({
            node: node,
            message: 'Component should use es6 class instead of createClass'
          });
        }
      },
      ClassDeclaration: function(node) {
        if (utils.isES6Component(node) && configuration === 'never') {
          context.report({
            node: node,
            message: 'Component should use createClass instead of es6 class'
          });
        }
      }
    };
  })
};


/***/ }),
/* 691 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce stateless components to be written as a pure function
 * @author Yannick Croissant
 * @author Alberto Rodríguez
 * @copyright 2015 Alberto Rodríguez. All rights reserved.
 */


const has = __webpack_require__(574);
const Components = __webpack_require__(578);
const versionUtil = __webpack_require__(585);
const astUtil = __webpack_require__(581);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce stateless components to be written as a pure function',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('prefer-stateless-function')
    },
    schema: [{
      type: 'object',
      properties: {
        ignorePureComponents: {
          default: false,
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components, utils) => {
    const configuration = context.options[0] || {};
    const ignorePureComponents = configuration.ignorePureComponents || false;

    const sourceCode = context.getSourceCode();

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    /**
     * Checks whether a given array of statements is a single call of `super`.
     * @see ESLint no-useless-constructor rule
     * @param {ASTNode[]} body - An array of statements to check.
     * @returns {boolean} `true` if the body is a single call of `super`.
     */
    function isSingleSuperCall(body) {
      return (
        body.length === 1 &&
        body[0].type === 'ExpressionStatement' &&
        body[0].expression.type === 'CallExpression' &&
        body[0].expression.callee.type === 'Super'
      );
    }

    /**
     * Checks whether a given node is a pattern which doesn't have any side effects.
     * Default parameters and Destructuring parameters can have side effects.
     * @see ESLint no-useless-constructor rule
     * @param {ASTNode} node - A pattern node.
     * @returns {boolean} `true` if the node doesn't have any side effects.
     */
    function isSimple(node) {
      return node.type === 'Identifier' || node.type === 'RestElement';
    }

    /**
     * Checks whether a given array of expressions is `...arguments` or not.
     * `super(...arguments)` passes all arguments through.
     * @see ESLint no-useless-constructor rule
     * @param {ASTNode[]} superArgs - An array of expressions to check.
     * @returns {boolean} `true` if the superArgs is `...arguments`.
     */
    function isSpreadArguments(superArgs) {
      return (
        superArgs.length === 1 &&
        superArgs[0].type === 'SpreadElement' &&
        superArgs[0].argument.type === 'Identifier' &&
        superArgs[0].argument.name === 'arguments'
      );
    }

    /**
     * Checks whether given 2 nodes are identifiers which have the same name or not.
     * @see ESLint no-useless-constructor rule
     * @param {ASTNode} ctorParam - A node to check.
     * @param {ASTNode} superArg - A node to check.
     * @returns {boolean} `true` if the nodes are identifiers which have the same
     *      name.
     */
    function isValidIdentifierPair(ctorParam, superArg) {
      return (
        ctorParam.type === 'Identifier' &&
        superArg.type === 'Identifier' &&
        ctorParam.name === superArg.name
      );
    }

    /**
     * Checks whether given 2 nodes are a rest/spread pair which has the same values.
     * @see ESLint no-useless-constructor rule
     * @param {ASTNode} ctorParam - A node to check.
     * @param {ASTNode} superArg - A node to check.
     * @returns {boolean} `true` if the nodes are a rest/spread pair which has the
     *      same values.
     */
    function isValidRestSpreadPair(ctorParam, superArg) {
      return (
        ctorParam.type === 'RestElement' &&
        superArg.type === 'SpreadElement' &&
        isValidIdentifierPair(ctorParam.argument, superArg.argument)
      );
    }

    /**
     * Checks whether given 2 nodes have the same value or not.
     * @see ESLint no-useless-constructor rule
     * @param {ASTNode} ctorParam - A node to check.
     * @param {ASTNode} superArg - A node to check.
     * @returns {boolean} `true` if the nodes have the same value or not.
     */
    function isValidPair(ctorParam, superArg) {
      return (
        isValidIdentifierPair(ctorParam, superArg) ||
        isValidRestSpreadPair(ctorParam, superArg)
      );
    }

    /**
     * Checks whether the parameters of a constructor and the arguments of `super()`
     * have the same values or not.
     * @see ESLint no-useless-constructor rule
     * @param {ASTNode} ctorParams - The parameters of a constructor to check.
     * @param {ASTNode} superArgs - The arguments of `super()` to check.
     * @returns {boolean} `true` if those have the same values.
     */
    function isPassingThrough(ctorParams, superArgs) {
      if (ctorParams.length !== superArgs.length) {
        return false;
      }

      for (let i = 0; i < ctorParams.length; ++i) {
        if (!isValidPair(ctorParams[i], superArgs[i])) {
          return false;
        }
      }

      return true;
    }

    /**
     * Checks whether the constructor body is a redundant super call.
     * @see ESLint no-useless-constructor rule
     * @param {Array} body - constructor body content.
     * @param {Array} ctorParams - The params to check against super call.
     * @returns {boolean} true if the construtor body is redundant
     */
    function isRedundantSuperCall(body, ctorParams) {
      return (
        isSingleSuperCall(body) &&
        ctorParams.every(isSimple) &&
        (
          isSpreadArguments(body[0].expression.arguments) ||
          isPassingThrough(ctorParams, body[0].expression.arguments)
        )
      );
    }

    /**
     * Check if a given AST node have any other properties the ones available in stateless components
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if the node has at least one other property, false if not.
     */
    function hasOtherProperties(node) {
      const properties = astUtil.getComponentProperties(node);
      return properties.some(property => {
        const name = astUtil.getPropertyName(property);
        const isDisplayName = name === 'displayName';
        const isPropTypes = name === 'propTypes' || name === 'props' && property.typeAnnotation;
        const contextTypes = name === 'contextTypes';
        const defaultProps = name === 'defaultProps';
        const isUselessConstructor =
          property.kind === 'constructor' &&
          isRedundantSuperCall(property.value.body.body, property.value.params)
        ;
        const isRender = name === 'render';
        return !isDisplayName && !isPropTypes && !contextTypes && !defaultProps && !isUselessConstructor && !isRender;
      });
    }

    /**
     * Mark component as pure as declared
     * @param {ASTNode} node The AST node being checked.
     */
    const markSCUAsDeclared = function (node) {
      components.set(node, {
        hasSCU: true
      });
    };

    /**
     * Mark childContextTypes as declared
     * @param {ASTNode} node The AST node being checked.
     */
    const markChildContextTypesAsDeclared = function (node) {
      components.set(node, {
        hasChildContextTypes: true
      });
    };

    /**
     * Mark a setState as used
     * @param {ASTNode} node The AST node being checked.
     */
    function markThisAsUsed(node) {
      components.set(node, {
        useThis: true
      });
    }

    /**
     * Mark a props or context as used
     * @param {ASTNode} node The AST node being checked.
     */
    function markPropsOrContextAsUsed(node) {
      components.set(node, {
        usePropsOrContext: true
      });
    }

    /**
     * Mark a ref as used
     * @param {ASTNode} node The AST node being checked.
     */
    function markRefAsUsed(node) {
      components.set(node, {
        useRef: true
      });
    }

    /**
     * Mark return as invalid
     * @param {ASTNode} node The AST node being checked.
     */
    function markReturnAsInvalid(node) {
      components.set(node, {
        invalidReturn: true
      });
    }

    /**
     * Mark a ClassDeclaration as having used decorators
     * @param {ASTNode} node The AST node being checked.
     */
    function markDecoratorsAsUsed(node) {
      components.set(node, {
        useDecorators: true
      });
    }

    function visitClass(node) {
      if (ignorePureComponents && utils.isPureComponent(node)) {
        markSCUAsDeclared(node);
      }

      if (node.decorators && node.decorators.length) {
        markDecoratorsAsUsed(node);
      }
    }

    return {
      ClassDeclaration: visitClass,
      ClassExpression: visitClass,

      // Mark `this` destructuring as a usage of `this`
      VariableDeclarator: function(node) {
        // Ignore destructuring on other than `this`
        if (!node.id || node.id.type !== 'ObjectPattern' || !node.init || node.init.type !== 'ThisExpression') {
          return;
        }
        // Ignore `props` and `context`
        const useThis = node.id.properties.some(property => {
          const name = astUtil.getPropertyName(property);
          return name !== 'props' && name !== 'context';
        });
        if (!useThis) {
          markPropsOrContextAsUsed(node);
          return;
        }
        markThisAsUsed(node);
      },

      // Mark `this` usage
      MemberExpression: function(node) {
        if (node.object.type !== 'ThisExpression') {
          if (node.property && node.property.name === 'childContextTypes') {
            const component = utils.getRelatedComponent(node);
            if (!component) {
              return;
            }
            markChildContextTypesAsDeclared(component.node);
            return;
          }
          return;
        // Ignore calls to `this.props` and `this.context`
        } else if (
          (node.property.name || node.property.value) === 'props' ||
          (node.property.name || node.property.value) === 'context'
        ) {
          markPropsOrContextAsUsed(node);
          return;
        }
        markThisAsUsed(node);
      },

      // Mark `ref` usage
      JSXAttribute: function(node) {
        const name = sourceCode.getText(node.name);
        if (name !== 'ref') {
          return;
        }
        markRefAsUsed(node);
      },

      // Mark `render` that do not return some JSX
      ReturnStatement: function(node) {
        let blockNode;
        let scope = context.getScope();
        while (scope) {
          blockNode = scope.block && scope.block.parent;
          if (blockNode && (blockNode.type === 'MethodDefinition' || blockNode.type === 'Property')) {
            break;
          }
          scope = scope.upper;
        }
        const isRender = blockNode && blockNode.key && blockNode.key.name === 'render';
        const allowNull = versionUtil.testReactVersion(context, '15.0.0'); // Stateless components can return null since React 15
        const isReturningJSX = utils.isReturningJSX(node, !allowNull);
        const isReturningNull = node.argument && (node.argument.value === null || node.argument.value === false);
        if (
          !isRender ||
          (allowNull && (isReturningJSX || isReturningNull)) ||
          (!allowNull && isReturningJSX)
        ) {
          return;
        }
        markReturnAsInvalid(node);
      },

      'Program:exit': function() {
        const list = components.list();
        for (const component in list) {
          if (
            !has(list, component) ||
            hasOtherProperties(list[component].node) ||
            list[component].useThis ||
            list[component].useRef ||
            list[component].invalidReturn ||
            list[component].hasChildContextTypes ||
            list[component].useDecorators ||
            (!utils.isES5Component(list[component].node) && !utils.isES6Component(list[component].node))
          ) {
            continue;
          }

          if (list[component].hasSCU && list[component].usePropsOrContext) {
            continue;
          }
          context.report({
            node: list[component].node,
            message: 'Component should be written as a pure function'
          });
        }
      }
    };
  })
};


/***/ }),
/* 692 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent missing props validation in a React component definition
 * @author Yannick Croissant
 */


// As for exceptions for props.children or props.className (and alike) look at
// https://github.com/yannickcr/eslint-plugin-react/issues/7

const has = __webpack_require__(574);
const Components = __webpack_require__(578);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const PROPS_REGEX = /^(props|nextProps)$/;
const DIRECT_PROPS_REGEX = /^(props|nextProps)\s*(\.|\[)/;

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent missing props validation in a React component definition',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('prop-types')
    },

    schema: [{
      type: 'object',
      properties: {
        ignore: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        customValidators: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        skipUndeclared: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components, utils) => {
    const sourceCode = context.getSourceCode();
    const configuration = context.options[0] || {};
    const ignored = configuration.ignore || [];
    const skipUndeclared = configuration.skipUndeclared || false;

    const MISSING_MESSAGE = '\'{{name}}\' is missing in props validation';

    /**
     * Check if we are in a class constructor
     * @return {boolean} true if we are in a class constructor, false if not
     */
    function inConstructor() {
      let scope = context.getScope();
      while (scope) {
        if (scope.block && scope.block.parent && scope.block.parent.kind === 'constructor') {
          return true;
        }
        scope = scope.upper;
      }
      return false;
    }

    /**
     * Check if we are in a class constructor
     * @return {boolean} true if we are in a class constructor, false if not
     */
    function inComponentWillReceiveProps() {
      let scope = context.getScope();
      while (scope) {
        if (
          scope.block && scope.block.parent &&
          scope.block.parent.key && scope.block.parent.key.name === 'componentWillReceiveProps'
        ) {
          return true;
        }
        scope = scope.upper;
      }
      return false;
    }

    /**
     * Check if we are in a class constructor
     * @return {boolean} true if we are in a class constructor, false if not
     */
    function inShouldComponentUpdate() {
      let scope = context.getScope();
      while (scope) {
        if (
          scope.block && scope.block.parent &&
          scope.block.parent.key && scope.block.parent.key.name === 'shouldComponentUpdate'
        ) {
          return true;
        }
        scope = scope.upper;
      }
      return false;
    }

    /**
    * Checks if a prop is being assigned a value props.bar = 'bar'
    * @param {ASTNode} node The AST node being checked.
    * @returns {Boolean}
    */

    function isAssignmentToProp(node) {
      return (
        node.parent &&
        node.parent.type === 'AssignmentExpression' &&
        node.parent.left === node
      );
    }

    /**
     * Checks if we are using a prop
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if we are using a prop, false if not.
     */
    function isPropTypesUsage(node) {
      const isClassUsage = (
        (utils.getParentES6Component() || utils.getParentES5Component()) &&
        node.object.type === 'ThisExpression' && node.property.name === 'props'
      );
      const isStatelessFunctionUsage = node.object.name === 'props' && !isAssignmentToProp(node);
      const isNextPropsUsage = node.object.name === 'nextProps' && (inComponentWillReceiveProps() || inShouldComponentUpdate());
      return isClassUsage || isStatelessFunctionUsage || isNextPropsUsage;
    }

    /**
     * Checks if the prop is ignored
     * @param {String} name Name of the prop to check.
     * @returns {Boolean} True if the prop is ignored, false if not.
     */
    function isIgnored(name) {
      return ignored.indexOf(name) !== -1;
    }

    /**
     * Checks if the component must be validated
     * @param {Object} component The component to process
     * @returns {Boolean} True if the component must be validated, false if not.
     */
    function mustBeValidated(component) {
      const isSkippedByConfig = skipUndeclared && typeof component.declaredPropTypes === 'undefined';
      return Boolean(
        component &&
        component.usedPropTypes &&
        !component.ignorePropsValidation &&
        !isSkippedByConfig
      );
    }

    /**
     * Internal: Checks if the prop is declared
     * @param {Object} declaredPropTypes Description of propTypes declared in the current component
     * @param {String[]} keyList Dot separated name of the prop to check.
     * @returns {Boolean} True if the prop is declared, false if not.
     */
    function _isDeclaredInComponent(declaredPropTypes, keyList) {
      for (let i = 0, j = keyList.length; i < j; i++) {
        const key = keyList[i];
        const propType = (
          declaredPropTypes && (
            // Check if this key is declared
            (declaredPropTypes[key] || // If not, check if this type accepts any key
            declaredPropTypes.__ANY_KEY__)
          )
        );

        if (!propType) {
          // If it's a computed property, we can't make any further analysis, but is valid
          return key === '__COMPUTED_PROP__';
        }
        if (typeof propType === 'object' && !propType.type) {
          return true;
        }
        // Consider every children as declared
        if (propType.children === true) {
          return true;
        }
        if (propType.acceptedProperties) {
          return key in propType.acceptedProperties;
        }
        if (propType.type === 'union') {
          // If we fall in this case, we know there is at least one complex type in the union
          if (i + 1 >= j) {
            // this is the last key, accept everything
            return true;
          }
          // non trivial, check all of them
          const unionTypes = propType.children;
          const unionPropType = {};
          for (let k = 0, z = unionTypes.length; k < z; k++) {
            unionPropType[key] = unionTypes[k];
            const isValid = _isDeclaredInComponent(
              unionPropType,
              keyList.slice(i)
            );
            if (isValid) {
              return true;
            }
          }

          // every possible union were invalid
          return false;
        }
        declaredPropTypes = propType.children;
      }
      return true;
    }

    /**
     * Checks if the prop is declared
     * @param {ASTNode} node The AST node being checked.
     * @param {String[]} names List of names of the prop to check.
     * @returns {Boolean} True if the prop is declared, false if not.
     */
    function isDeclaredInComponent(node, names) {
      while (node) {
        const component = components.get(node);

        const isDeclared =
          component && component.confidence === 2 &&
          _isDeclaredInComponent(component.declaredPropTypes || {}, names)
        ;
        if (isDeclared) {
          return true;
        }
        node = node.parent;
      }
      return false;
    }

    /**
     * Checks if the prop has spread operator.
     * @param {ASTNode} node The AST node being marked.
     * @returns {Boolean} True if the prop has spread operator, false if not.
     */
    function hasSpreadOperator(node) {
      const tokens = sourceCode.getTokens(node);
      return tokens.length && tokens[0].value === '...';
    }

    /**
     * Removes quotes from around an identifier.
     * @param {string} the identifier to strip
     */
    function stripQuotes(string) {
      return string.replace(/^\'|\'$/g, '');
    }

    /**
     * Retrieve the name of a key node
     * @param {ASTNode} node The AST node with the key.
     * @return {string} the name of the key
     */
    function getKeyValue(node) {
      if (node.type === 'ObjectTypeProperty') {
        const tokens = context.getFirstTokens(node, 2);
        return (tokens[0].value === '+' || tokens[0].value === '-'
          ? tokens[1].value
          : stripQuotes(tokens[0].value)
        );
      }
      const key = node.key || node.argument;
      return key.type === 'Identifier' ? key.name : key.value;
    }

    /**
     * Retrieve the name of a property node
     * @param {ASTNode} node The AST node with the property.
     * @return {string} the name of the property or undefined if not found
     */
    function getPropertyName(node) {
      const isDirectProp = DIRECT_PROPS_REGEX.test(sourceCode.getText(node));
      const isInClassComponent = utils.getParentES6Component() || utils.getParentES5Component();
      const isNotInConstructor = !inConstructor();
      const isNotInComponentWillReceiveProps = !inComponentWillReceiveProps();
      const isNotInShouldComponentUpdate = !inShouldComponentUpdate();
      if (isDirectProp && isInClassComponent && isNotInConstructor && isNotInComponentWillReceiveProps
        && isNotInShouldComponentUpdate) {
        return void 0;
      }
      if (!isDirectProp) {
        node = node.parent;
      }
      const property = node.property;
      if (property) {
        switch (property.type) {
          case 'Identifier':
            if (node.computed) {
              return '__COMPUTED_PROP__';
            }
            return property.name;
          case 'MemberExpression':
            return void 0;
          case 'Literal':
            // Accept computed properties that are literal strings
            if (typeof property.value === 'string') {
              return property.value;
            }
            // falls through
          default:
            if (node.computed) {
              return '__COMPUTED_PROP__';
            }
            break;
        }
      }
      return void 0;
    }

    /**
     * Mark a prop type as used
     * @param {ASTNode} node The AST node being marked.
     */
    function markPropTypesAsUsed(node, parentNames) {
      parentNames = parentNames || [];
      let type;
      let name;
      let allNames;
      let properties;
      switch (node.type) {
        case 'MemberExpression':
          name = getPropertyName(node);
          if (name) {
            allNames = parentNames.concat(name);
            if (node.parent.type === 'MemberExpression') {
              markPropTypesAsUsed(node.parent, allNames);
            }
            // Do not mark computed props as used.
            type = name !== '__COMPUTED_PROP__' ? 'direct' : null;
          } else if (
            node.parent.id &&
            node.parent.id.properties &&
            node.parent.id.properties.length &&
            getKeyValue(node.parent.id.properties[0])
          ) {
            type = 'destructuring';
            properties = node.parent.id.properties;
          }
          break;
        case 'ArrowFunctionExpression':
        case 'FunctionDeclaration':
        case 'FunctionExpression':
          type = 'destructuring';
          properties = node.params[0].properties;
          break;
        case 'MethodDefinition':
          const destructuring = node.value && node.value.params && node.value.params[0] && node.value.params[0].type === 'ObjectPattern';
          if (destructuring) {
            type = 'destructuring';
            properties = node.value.params[0].properties;
            break;
          } else {
            return;
          }
        case 'VariableDeclarator':
          for (let i = 0, j = node.id.properties.length; i < j; i++) {
            // let {props: {firstname}} = this
            const thisDestructuring = (
              !hasSpreadOperator(node.id.properties[i]) &&
              (PROPS_REGEX.test(node.id.properties[i].key.name) || PROPS_REGEX.test(node.id.properties[i].key.value)) &&
              node.id.properties[i].value.type === 'ObjectPattern'
            );
            // let {firstname} = props
            const directDestructuring =
              PROPS_REGEX.test(node.init.name) &&
              (utils.getParentStatelessComponent() || inConstructor() || inComponentWillReceiveProps())
            ;

            if (thisDestructuring) {
              properties = node.id.properties[i].value.properties;
            } else if (directDestructuring) {
              properties = node.id.properties;
            } else {
              continue;
            }
            type = 'destructuring';
            break;
          }
          break;
        default:
          throw new Error(`${node.type} ASTNodes are not handled by markPropTypesAsUsed`);
      }

      const component = components.get(utils.getParentComponent());
      const usedPropTypes = (component && component.usedPropTypes || []).slice();

      switch (type) {
        case 'direct':
          // Ignore Object methods
          if (Object.prototype[name]) {
            break;
          }

          const isDirectProp = DIRECT_PROPS_REGEX.test(sourceCode.getText(node));

          usedPropTypes.push({
            name: name,
            allNames: allNames,
            node: (
              !isDirectProp && !inConstructor() && !inComponentWillReceiveProps() ?
                node.parent.property :
                node.property
            )
          });
          break;
        case 'destructuring':
          for (let k = 0, l = properties.length; k < l; k++) {
            if (hasSpreadOperator(properties[k]) || properties[k].computed) {
              continue;
            }
            const propName = getKeyValue(properties[k]);

            let currentNode = node;
            allNames = [];
            while (currentNode.property && !PROPS_REGEX.test(currentNode.property.name)) {
              allNames.unshift(currentNode.property.name);
              currentNode = currentNode.object;
            }
            allNames.push(propName);

            if (propName) {
              usedPropTypes.push({
                name: propName,
                allNames: allNames,
                node: properties[k]
              });
            }
          }
          break;
        default:
          break;
      }

      components.set(node, {
        usedPropTypes: usedPropTypes
      });
    }

    /**
     * Reports undeclared proptypes for a given component
     * @param {Object} component The component to process
     */
    function reportUndeclaredPropTypes(component) {
      let allNames;
      for (let i = 0, j = component.usedPropTypes.length; i < j; i++) {
        allNames = component.usedPropTypes[i].allNames;
        if (
          isIgnored(allNames[0]) ||
          isDeclaredInComponent(component.node, allNames)
        ) {
          continue;
        }
        context.report(
          component.usedPropTypes[i].node,
          MISSING_MESSAGE, {
            name: allNames.join('.').replace(/\.__COMPUTED_PROP__/g, '[]')
          }
        );
      }
    }

    /**
     * @param {ASTNode} node We expect either an ArrowFunctionExpression,
     *   FunctionDeclaration, or FunctionExpression
     */
    function markDestructuredFunctionArgumentsAsUsed(node) {
      const destructuring = node.params && node.params[0] && node.params[0].type === 'ObjectPattern';
      if (destructuring && components.get(node)) {
        markPropTypesAsUsed(node);
      }
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      VariableDeclarator: function(node) {
        const destructuring = node.init && node.id && node.id.type === 'ObjectPattern';
        // let {props: {firstname}} = this
        const thisDestructuring = destructuring && node.init.type === 'ThisExpression';
        // let {firstname} = props
        const directDestructuring =
          destructuring &&
          PROPS_REGEX.test(node.init.name) &&
          (utils.getParentStatelessComponent() || inConstructor() || inComponentWillReceiveProps())
        ;

        if (!thisDestructuring && !directDestructuring) {
          return;
        }
        markPropTypesAsUsed(node);
      },

      FunctionDeclaration: markDestructuredFunctionArgumentsAsUsed,

      ArrowFunctionExpression: markDestructuredFunctionArgumentsAsUsed,

      FunctionExpression: function(node) {
        if (node.parent.type === 'MethodDefinition') {
          return;
        }
        markDestructuredFunctionArgumentsAsUsed(node);
      },

      MemberExpression: function(node) {
        if (isPropTypesUsage(node)) {
          markPropTypesAsUsed(node);
        }
      },

      MethodDefinition: function(node) {
        const destructuring = node.value && node.value.params && node.value.params[0] && node.value.params[0].type === 'ObjectPattern';
        if (node.key.name === 'componentWillReceiveProps' && destructuring) {
          markPropTypesAsUsed(node);
        }

        if (node.key.name === 'shouldComponentUpdate' && destructuring) {
          markPropTypesAsUsed(node);
        }
      },

      'Program:exit': function() {
        const list = components.list();
        // Report undeclared proptypes for all classes
        for (const component in list) {
          if (!has(list, component) || !mustBeValidated(list[component])) {
            continue;
          }
          reportUndeclaredPropTypes(list[component]);
        }
      }
    };
  })
};


/***/ }),
/* 693 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent missing React when using JSX
 * @author Glen Mailer
 */


const variableUtil = __webpack_require__(579);
const pragmaUtil = __webpack_require__(580);
const docsUrl = __webpack_require__(587);

// -----------------------------------------------------------------------------
// Rule Definition
// -----------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent missing React when using JSX',
      category: 'Possible Errors',
      recommended: true,
      url: docsUrl('react-in-jsx-scope')
    },
    schema: []
  },

  create: function(context) {
    const pragma = pragmaUtil.getFromContext(context);
    const NOT_DEFINED_MESSAGE = '\'{{name}}\' must be in scope when using JSX';

    function checkIfReactIsInScope(node) {
      const variables = variableUtil.variablesInScope(context);
      if (variableUtil.findVariable(variables, pragma)) {
        return;
      }
      context.report({
        node: node,
        message: NOT_DEFINED_MESSAGE,
        data: {
          name: pragma
        }
      });
    }

    return {
      JSXOpeningElement: checkIfReactIsInScope,
      JSXOpeningFragment: checkIfReactIsInScope
    };
  }
};


/***/ }),
/* 694 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileOverview Enforce a defaultProps definition for every prop that is not a required prop.
 * @author Vitor Balocco
 */


const has = __webpack_require__(574);
const Components = __webpack_require__(578);
const variableUtil = __webpack_require__(579);
const annotations = __webpack_require__(583);
const astUtil = __webpack_require__(581);
const propsUtil = __webpack_require__(584);
const docsUrl = __webpack_require__(587);

const QUOTES_REGEX = /^["']|["']$/g;

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce a defaultProps definition for every prop that is not a required prop.',
      category: 'Best Practices',
      url: docsUrl('require-default-props')
    },

    schema: [{
      type: 'object',
      properties: {
        forbidDefaultForRequired: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components, utils) => {
    const sourceCode = context.getSourceCode();
    const propWrapperFunctions = new Set(context.settings.propWrapperFunctions || []);
    const configuration = context.options[0] || {};
    const forbidDefaultForRequired = configuration.forbidDefaultForRequired || false;
    // Used to track the type annotations in scope.
    // Necessary because babel's scopes do not track type annotations.
    let stack = null;

    /**
     * Try to resolve the node passed in to a variable in the current scope. If the node passed in is not
     * an Identifier, then the node is simply returned.
     * @param   {ASTNode} node The node to resolve.
     * @returns {ASTNode|null} Return null if the value could not be resolved, ASTNode otherwise.
     */
    function resolveNodeValue(node) {
      if (node.type === 'Identifier') {
        return variableUtil.findVariableByName(context, node.name);
      }
      if (
        node.type === 'CallExpression' &&
        propWrapperFunctions.has(node.callee.name) &&
        node.arguments && node.arguments[0]
      ) {
        return resolveNodeValue(node.arguments[0]);
      }

      return node;
    }

    /**
     * Helper for accessing the current scope in the stack.
     * @param {string} key The name of the identifier to access. If omitted, returns the full scope.
     * @param {ASTNode} value If provided sets the new value for the identifier.
     * @returns {Object|ASTNode} Either the whole scope or the ASTNode associated with the given identifier.
     */
    function typeScope(key, value) {
      if (arguments.length === 0) {
        return stack[stack.length - 1];
      } else if (arguments.length === 1) {
        return stack[stack.length - 1][key];
      }
      stack[stack.length - 1][key] = value;
      return value;
    }

    /**
     * Tries to find the definition of a GenericTypeAnnotation in the current scope.
     * @param  {ASTNode}      node The node GenericTypeAnnotation node to resolve.
     * @return {ASTNode|null}      Return null if definition cannot be found, ASTNode otherwise.
     */
    function resolveGenericTypeAnnotation(node) {
      if (node.type !== 'GenericTypeAnnotation' || node.id.type !== 'Identifier') {
        return null;
      }

      return variableUtil.findVariableByName(context, node.id.name) || typeScope(node.id.name);
    }

    function resolveUnionTypeAnnotation(node) {
      // Go through all the union and resolve any generic types.
      return node.types.map(annotation => {
        if (annotation.type === 'GenericTypeAnnotation') {
          return resolveGenericTypeAnnotation(annotation);
        }

        return annotation;
      });
    }

    /**
     * Extracts a PropType from an ObjectExpression node.
     * @param   {ASTNode} objectExpression ObjectExpression node.
     * @returns {Object[]}        Array of PropType object representations, to be consumed by `addPropTypesToComponent`.
     */
    function getPropTypesFromObjectExpression(objectExpression) {
      const props = objectExpression.properties.filter(property => property.type !== 'ExperimentalSpreadProperty' && property.type !== 'SpreadElement');

      return props.map(property => ({
        name: sourceCode.getText(property.key).replace(QUOTES_REGEX, ''),
        isRequired: propsUtil.isRequiredPropType(property.value),
        node: property
      }));
    }

    /**
     * Extracts a PropType from a TypeAnnotation node.
     * @param   {ASTNode} node TypeAnnotation node.
     * @returns {Object[]}     Array of PropType object representations, to be consumed by `addPropTypesToComponent`.
     */
    function getPropTypesFromTypeAnnotation(node) {
      let properties;

      switch (node.typeAnnotation.type) {
        case 'GenericTypeAnnotation':
          let annotation = resolveGenericTypeAnnotation(node.typeAnnotation);

          if (annotation && annotation.id) {
            annotation = variableUtil.findVariableByName(context, annotation.id.name);
          }

          properties = annotation ? (annotation.properties || []) : [];
          break;

        case 'UnionTypeAnnotation':
          const union = resolveUnionTypeAnnotation(node.typeAnnotation);
          properties = union.reduce((acc, curr) => {
            if (!curr) {
              return acc;
            }

            return acc.concat(curr.properties);
          }, []);
          break;

        case 'ObjectTypeAnnotation':
          properties = node.typeAnnotation.properties;
          break;

        default:
          properties = [];
          break;
      }

      const props = properties.filter(property => property.type === 'ObjectTypeProperty');

      return props.map(property => {
        // the `key` property is not present in ObjectTypeProperty nodes, so we need to get the key name manually.
        const tokens = context.getFirstTokens(property, 1);
        const name = tokens[0].value;

        return {
          name: name,
          isRequired: !property.optional,
          node: property
        };
      });
    }

    /**
     * Extracts a DefaultProp from an ObjectExpression node.
     * @param   {ASTNode} objectExpression ObjectExpression node.
     * @returns {Object|string}            Object representation of a defaultProp, to be consumed by
     *                                     `addDefaultPropsToComponent`, or string "unresolved", if the defaultProps
     *                                     from this ObjectExpression can't be resolved.
     */
    function getDefaultPropsFromObjectExpression(objectExpression) {
      const hasSpread = objectExpression.properties.find(property => property.type === 'ExperimentalSpreadProperty' || property.type === 'SpreadElement');

      if (hasSpread) {
        return 'unresolved';
      }

      return objectExpression.properties.map(property => sourceCode.getText(property.key).replace(QUOTES_REGEX, ''));
    }

    /**
     * Marks a component's DefaultProps declaration as "unresolved". A component's DefaultProps is
     * marked as "unresolved" if we cannot safely infer the values of its defaultProps declarations
     * without risking false negatives.
     * @param   {Object} component The component to mark.
     * @returns {void}
     */
    function markDefaultPropsAsUnresolved(component) {
      components.set(component.node, {
        defaultProps: 'unresolved'
      });
    }

    /**
     * Adds propTypes to the component passed in.
     * @param   {ASTNode}  component The component to add the propTypes to.
     * @param   {Object[]} propTypes propTypes to add to the component.
     * @returns {void}
     */
    function addPropTypesToComponent(component, propTypes) {
      const props = component.propTypes || [];

      components.set(component.node, {
        propTypes: props.concat(propTypes)
      });
    }

    /**
     * Adds defaultProps to the component passed in.
     * @param   {ASTNode}         component    The component to add the defaultProps to.
     * @param   {String[]|String} defaultProps defaultProps to add to the component or the string "unresolved"
     *                                         if this component has defaultProps that can't be resolved.
     * @returns {void}
     */
    function addDefaultPropsToComponent(component, defaultProps) {
      // Early return if this component's defaultProps is already marked as "unresolved".
      if (component.defaultProps === 'unresolved') {
        return;
      }

      if (defaultProps === 'unresolved') {
        markDefaultPropsAsUnresolved(component);
        return;
      }

      const defaults = component.defaultProps || {};

      defaultProps.forEach(defaultProp => {
        defaults[defaultProp] = true;
      });

      components.set(component.node, {
        defaultProps: defaults
      });
    }

    /**
     * Tries to find a props type annotation in a stateless component.
     * @param  {ASTNode} node The AST node to look for a props type annotation.
     * @return {void}
     */
    function handleStatelessComponent(node) {
      if (!node.params || !node.params.length || !annotations.isAnnotatedFunctionPropsDeclaration(node, context)) {
        return;
      }

      // find component this props annotation belongs to
      const component = components.get(utils.getParentStatelessComponent());
      if (!component) {
        return;
      }

      addPropTypesToComponent(component, getPropTypesFromTypeAnnotation(node.params[0].typeAnnotation, context));
    }

    function handlePropTypeAnnotationClassProperty(node) {
      // find component this props annotation belongs to
      const component = components.get(utils.getParentES6Component());
      if (!component) {
        return;
      }

      addPropTypesToComponent(component, getPropTypesFromTypeAnnotation(node.typeAnnotation, context));
    }

    function isPropTypeAnnotation(node) {
      return (astUtil.getPropertyName(node) === 'props' && !!node.typeAnnotation);
    }

    /**
     * Reports all propTypes passed in that don't have a defaultProp counterpart.
     * @param  {Object[]} propTypes    List of propTypes to check.
     * @param  {Object}   defaultProps Object of defaultProps to check. Keys are the props names.
     * @return {void}
     */
    function reportPropTypesWithoutDefault(propTypes, defaultProps) {
      // If this defaultProps is "unresolved", then we should ignore this component and not report
      // any errors for it, to avoid false-positives with e.g. external defaultProps declarations or spread operators.
      if (defaultProps === 'unresolved') {
        return;
      }

      propTypes.forEach(prop => {
        if (prop.isRequired) {
          if (forbidDefaultForRequired && defaultProps[prop.name]) {
            context.report(
              prop.node,
              'propType "{{name}}" is required and should not have a defaultProp declaration.',
              {name: prop.name}
            );
          }
          return;
        }

        if (defaultProps[prop.name]) {
          return;
        }

        context.report(
          prop.node,
          'propType "{{name}}" is not required, but has no corresponding defaultProp declaration.',
          {name: prop.name}
        );
      });
    }

    /**
     * Extracts a PropType from a TypeAnnotation contained in generic node.
     * @param   {ASTNode} node TypeAnnotation node.
     * @returns {Object[]}     Array of PropType object representations, to be consumed by `addPropTypesToComponent`.
     */
    function getPropTypesFromGeneric(node) {
      let annotation = resolveGenericTypeAnnotation(node);

      if (annotation && annotation.id) {
        annotation = variableUtil.findVariableByName(context, annotation.id.name);
      }

      const properties = annotation ? (annotation.properties || []) : [];

      const props = properties.filter(property => property.type === 'ObjectTypeProperty');

      return props.map(property => {
        // the `key` property is not present in ObjectTypeProperty nodes, so we need to get the key name manually.
        const tokens = context.getFirstTokens(property, 1);
        const name = tokens[0].value;

        return {
          name: name,
          isRequired: !property.optional,
          node: property
        };
      });
    }

    function hasPropTypesAsGeneric(node) {
      return node && node.parent && node.parent.type === 'ClassDeclaration';
    }

    function handlePropTypesAsGeneric(node) {
      const component = components.get(utils.getParentES6Component());
      if (!component) {
        return;
      }

      if (node.params[0]) {
        addPropTypesToComponent(component, getPropTypesFromGeneric(node.params[0], context));
      }
    }

    // --------------------------------------------------------------------------
    // Public API
    // --------------------------------------------------------------------------

    return {
      MemberExpression: function(node) {
        const isPropType = propsUtil.isPropTypesDeclaration(node);
        const isDefaultProp = propsUtil.isDefaultPropsDeclaration(node);

        if (!isPropType && !isDefaultProp) {
          return;
        }

        // find component this propTypes/defaultProps belongs to
        const component = utils.getRelatedComponent(node);
        if (!component) {
          return;
        }

        // e.g.:
        // MyComponent.propTypes = {
        //   foo: PropTypes.string.isRequired,
        //   bar: PropTypes.string
        // };
        //
        // or:
        //
        // MyComponent.propTypes = myPropTypes;
        if (node.parent.type === 'AssignmentExpression') {
          const expression = resolveNodeValue(node.parent.right);
          if (!expression || expression.type !== 'ObjectExpression') {
            // If a value can't be found, we mark the defaultProps declaration as "unresolved", because
            // we should ignore this component and not report any errors for it, to avoid false-positives
            // with e.g. external defaultProps declarations.
            if (isDefaultProp) {
              markDefaultPropsAsUnresolved(component);
            }

            return;
          }

          if (isPropType) {
            addPropTypesToComponent(component, getPropTypesFromObjectExpression(expression));
          } else {
            addDefaultPropsToComponent(component, getDefaultPropsFromObjectExpression(expression));
          }

          return;
        }

        // e.g.:
        // MyComponent.propTypes.baz = PropTypes.string;
        if (node.parent.type === 'MemberExpression' && node.parent.parent.type === 'AssignmentExpression') {
          if (isPropType) {
            addPropTypesToComponent(component, [{
              name: node.parent.property.name,
              isRequired: propsUtil.isRequiredPropType(node.parent.parent.right),
              node: node.parent.parent
            }]);
          } else {
            addDefaultPropsToComponent(component, [node.parent.property.name]);
          }

          return;
        }
      },

      // e.g.:
      // class Hello extends React.Component {
      //   static get propTypes() {
      //     return {
      //       name: PropTypes.string
      //     };
      //   }
      //   static get defaultProps() {
      //     return {
      //       name: 'Dean'
      //     };
      //   }
      //   render() {
      //     return <div>Hello {this.props.name}</div>;
      //   }
      // }
      MethodDefinition: function(node) {
        if (!node.static || node.kind !== 'get') {
          return;
        }

        const isPropType = propsUtil.isPropTypesDeclaration(node);
        const isDefaultProp = propsUtil.isDefaultPropsDeclaration(node);

        if (!isPropType && !isDefaultProp) {
          return;
        }

        // find component this propTypes/defaultProps belongs to
        const component = components.get(utils.getParentES6Component());
        if (!component) {
          return;
        }

        const returnStatement = utils.findReturnStatement(node);
        if (!returnStatement) {
          return;
        }

        const expression = resolveNodeValue(returnStatement.argument);
        if (!expression || expression.type !== 'ObjectExpression') {
          return;
        }

        if (isPropType) {
          addPropTypesToComponent(component, getPropTypesFromObjectExpression(expression));
        } else {
          addDefaultPropsToComponent(component, getDefaultPropsFromObjectExpression(expression));
        }
      },

      // e.g.:
      // class Greeting extends React.Component {
      //   render() {
      //     return (
      //       <h1>Hello, {this.props.foo} {this.props.bar}</h1>
      //     );
      //   }
      //   static propTypes = {
      //     foo: PropTypes.string,
      //     bar: PropTypes.string.isRequired
      //   };
      // }
      ClassProperty: function(node) {
        if (isPropTypeAnnotation(node)) {
          handlePropTypeAnnotationClassProperty(node);
          return;
        }

        if (!node.static) {
          return;
        }

        if (!node.value) {
          return;
        }

        const isPropType = astUtil.getPropertyName(node) === 'propTypes';
        const isDefaultProp = astUtil.getPropertyName(node) === 'defaultProps' || astUtil.getPropertyName(node) === 'getDefaultProps';

        if (!isPropType && !isDefaultProp) {
          return;
        }

        // find component this propTypes/defaultProps belongs to
        const component = components.get(utils.getParentES6Component());
        if (!component) {
          return;
        }

        const expression = resolveNodeValue(node.value);
        if (!expression || expression.type !== 'ObjectExpression') {
          return;
        }

        if (isPropType) {
          addPropTypesToComponent(component, getPropTypesFromObjectExpression(expression));
        } else {
          addDefaultPropsToComponent(component, getDefaultPropsFromObjectExpression(expression));
        }
      },

      // e.g.:
      // createReactClass({
      //   render: function() {
      //     return <div>{this.props.foo}</div>;
      //   },
      //   propTypes: {
      //     foo: PropTypes.string.isRequired,
      //   },
      //   getDefaultProps: function() {
      //     return {
      //       foo: 'default'
      //     };
      //   }
      // });
      ObjectExpression: function(node) {
        // find component this propTypes/defaultProps belongs to
        const component = utils.isES5Component(node) && components.get(node);
        if (!component) {
          return;
        }

        // Search for the proptypes declaration
        node.properties.forEach(property => {
          if (property.type === 'ExperimentalSpreadProperty' || property.type === 'SpreadElement') {
            return;
          }

          const isPropType = propsUtil.isPropTypesDeclaration(property);
          const isDefaultProp = propsUtil.isDefaultPropsDeclaration(property);

          if (!isPropType && !isDefaultProp) {
            return;
          }

          if (isPropType && property.value.type === 'ObjectExpression') {
            addPropTypesToComponent(component, getPropTypesFromObjectExpression(property.value));
            return;
          }

          if (isDefaultProp && property.value.type === 'FunctionExpression') {
            const returnStatement = utils.findReturnStatement(property);
            if (!returnStatement || returnStatement.argument.type !== 'ObjectExpression') {
              return;
            }

            addDefaultPropsToComponent(component, getDefaultPropsFromObjectExpression(returnStatement.argument));
          }
        });
      },

      TypeAlias: function(node) {
        typeScope(node.id.name, node.right);
      },

      Program: function() {
        stack = [{}];
      },

      BlockStatement: function () {
        stack.push(Object.create(typeScope()));
      },

      'BlockStatement:exit': function () {
        stack.pop();
      },

      // e.g.:
      // type HelloProps = {
      //   foo?: string
      // };
      // class Hello extends React.Component<HelloProps> {
      //   static defaultProps = {
      //     foo: 'default'
      //   }
      //   render() {
      //     return <div>{this.props.foo}</div>;
      //   }
      // };
      TypeParameterInstantiation: function(node) {
        if (hasPropTypesAsGeneric(node)) {
          handlePropTypesAsGeneric(node);
          return;
        }
      },

      // Check for type annotations in stateless components
      FunctionDeclaration: handleStatelessComponent,
      ArrowFunctionExpression: handleStatelessComponent,
      FunctionExpression: handleStatelessComponent,

      'Program:exit': function() {
        stack = null;
        const list = components.list();

        for (const component in list) {
          if (!has(list, component)) {
            continue;
          }

          // If no propTypes could be found, we don't report anything.
          if (!list[component].propTypes) {
            continue;
          }

          reportPropTypesWithoutDefault(
            list[component].propTypes,
            list[component].defaultProps || {}
          );
        }
      }
    };
  })
};


/***/ }),
/* 695 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce React components to have a shouldComponentUpdate method
 * @author Evgueni Naverniouk
 */


const has = __webpack_require__(574);
const Components = __webpack_require__(578);
const docsUrl = __webpack_require__(587);

module.exports = {
  meta: {
    docs: {
      description: 'Enforce React components to have a shouldComponentUpdate method',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('require-optimization')
    },

    schema: [{
      type: 'object',
      properties: {
        allowDecorators: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components, utils) => {
    const MISSING_MESSAGE = 'Component is not optimized. Please add a shouldComponentUpdate method.';
    const configuration = context.options[0] || {};
    const allowDecorators = configuration.allowDecorators || [];

    /**
     * Checks to see if our component is decorated by PureRenderMixin via reactMixin
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if node is decorated with a PureRenderMixin, false if not.
     */
    const hasPureRenderDecorator = function (node) {
      if (node.decorators && node.decorators.length) {
        for (let i = 0, l = node.decorators.length; i < l; i++) {
          if (
            node.decorators[i].expression &&
            node.decorators[i].expression.callee &&
            node.decorators[i].expression.callee.object &&
            node.decorators[i].expression.callee.object.name === 'reactMixin' &&
            node.decorators[i].expression.callee.property &&
            node.decorators[i].expression.callee.property.name === 'decorate' &&
            node.decorators[i].expression.arguments &&
            node.decorators[i].expression.arguments.length &&
            node.decorators[i].expression.arguments[0].name === 'PureRenderMixin'
          ) {
            return true;
          }
        }
      }

      return false;
    };

    /**
     * Checks to see if our component is custom decorated
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if node is decorated name with a custom decorated, false if not.
     */
    const hasCustomDecorator = function (node) {
      const allowLength = allowDecorators.length;

      if (allowLength && node.decorators && node.decorators.length) {
        for (let i = 0; i < allowLength; i++) {
          for (let j = 0, l = node.decorators.length; j < l; j++) {
            if (
              node.decorators[j].expression &&
              node.decorators[j].expression.name === allowDecorators[i]
            ) {
              return true;
            }
          }
        }
      }

      return false;
    };

    /**
     * Checks if we are declaring a shouldComponentUpdate method
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if we are declaring a shouldComponentUpdate method, false if not.
     */
    const isSCUDeclarеd = function (node) {
      return Boolean(
        node &&
        node.name === 'shouldComponentUpdate'
      );
    };

    /**
     * Checks if we are declaring a PureRenderMixin mixin
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if we are declaring a PureRenderMixin method, false if not.
     */
    const isPureRenderDeclared = function (node) {
      let hasPR = false;
      if (node.value && node.value.elements) {
        for (let i = 0, l = node.value.elements.length; i < l; i++) {
          if (node.value.elements[i] && node.value.elements[i].name === 'PureRenderMixin') {
            hasPR = true;
            break;
          }
        }
      }

      return Boolean(
        node &&
        node.key.name === 'mixins' &&
        hasPR
      );
    };

    /**
     * Mark shouldComponentUpdate as declared
     * @param {ASTNode} node The AST node being checked.
     */
    const markSCUAsDeclared = function (node) {
      components.set(node, {
        hasSCU: true
      });
    };

    /**
     * Reports missing optimization for a given component
     * @param {Object} component The component to process
     */
    const reportMissingOptimization = function (component) {
      context.report({
        node: component.node,
        message: MISSING_MESSAGE,
        data: {
          component: component.name
        }
      });
    };

    /**
     * Checks if we are declaring function in class
     * @returns {Boolean} True if we are declaring function in class, false if not.
     */
    const isFunctionInClass = function () {
      let blockNode;
      let scope = context.getScope();
      while (scope) {
        blockNode = scope.block;
        if (blockNode && blockNode.type === 'ClassDeclaration') {
          return true;
        }
        scope = scope.upper;
      }

      return false;
    };

    return {
      ArrowFunctionExpression: function (node) {
        // Stateless Functional Components cannot be optimized (yet)
        markSCUAsDeclared(node);
      },

      ClassDeclaration: function (node) {
        if (!(hasPureRenderDecorator(node) || hasCustomDecorator(node) || utils.isPureComponent(node))) {
          return;
        }
        markSCUAsDeclared(node);
      },

      FunctionDeclaration: function (node) {
        // Skip if the function is declared in the class
        if (isFunctionInClass()) {
          return;
        }
        // Stateless Functional Components cannot be optimized (yet)
        markSCUAsDeclared(node);
      },

      FunctionExpression: function (node) {
        // Skip if the function is declared in the class
        if (isFunctionInClass()) {
          return;
        }
        // Stateless Functional Components cannot be optimized (yet)
        markSCUAsDeclared(node);
      },

      MethodDefinition: function (node) {
        if (!isSCUDeclarеd(node.key)) {
          return;
        }
        markSCUAsDeclared(node);
      },

      ObjectExpression: function (node) {
        // Search for the shouldComponentUpdate declaration
        for (let i = 0, l = node.properties.length; i < l; i++) {
          if (
            !node.properties[i].key || (
              !isSCUDeclarеd(node.properties[i].key) &&
              !isPureRenderDeclared(node.properties[i])
            )
          ) {
            continue;
          }
          markSCUAsDeclared(node);
        }
      },

      'Program:exit': function () {
        const list = components.list();

        // Report missing shouldComponentUpdate for all components
        for (const component in list) {
          if (!has(list, component) || list[component].hasSCU) {
            continue;
          }
          reportMissingOptimization(list[component]);
        }
      }
    };
  })
};


/***/ }),
/* 696 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce ES5 or ES6 class for returning value in render function.
 * @author Mark Orel
 */


const has = __webpack_require__(574);
const Components = __webpack_require__(578);
const astUtil = __webpack_require__(581);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce ES5 or ES6 class for returning value in render function',
      category: 'Possible Errors',
      recommended: true,
      url: docsUrl('require-render-return')
    },
    schema: [{}]
  },

  create: Components.detect((context, components, utils) => {
    /**
     * Mark a return statement as present
     * @param {ASTNode} node The AST node being checked.
     */
    function markReturnStatementPresent(node) {
      components.set(node, {
        hasReturnStatement: true
      });
    }

    /**
     * Check if a given AST node has a render method
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if there is a render method, false if not
     */
    function hasRenderMethod(node) {
      const properties = astUtil.getComponentProperties(node);
      for (let i = 0, j = properties.length; i < j; i++) {
        if (astUtil.getPropertyName(properties[i]) !== 'render' || !properties[i].value) {
          continue;
        }
        return astUtil.isFunctionLikeExpression(properties[i].value);
      }
      return false;
    }

    return {
      ReturnStatement: function(node) {
        const ancestors = context.getAncestors(node).reverse();
        let depth = 0;
        for (let i = 0, j = ancestors.length; i < j; i++) {
          if (/Function(Expression|Declaration)$/.test(ancestors[i].type)) {
            depth++;
          }
          if (
            !/(MethodDefinition|(Class)?Property)$/.test(ancestors[i].type) ||
            astUtil.getPropertyName(ancestors[i]) !== 'render' ||
            depth > 1
          ) {
            continue;
          }
          markReturnStatementPresent(node);
        }
      },

      ArrowFunctionExpression: function(node) {
        if (node.expression === false || astUtil.getPropertyName(node.parent) !== 'render') {
          return;
        }
        markReturnStatementPresent(node);
      },

      'Program:exit': function() {
        const list = components.list();
        for (const component in list) {
          if (
            !has(list, component) ||
            !hasRenderMethod(list[component].node) ||
            list[component].hasReturnStatement ||
            (!utils.isES5Component(list[component].node) && !utils.isES6Component(list[component].node))
          ) {
            continue;
          }
          context.report({
            node: list[component].node,
            message: 'Your render method should have return statement'
          });
        }
      }
    };
  })
};


/***/ }),
/* 697 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent extra closing tags for components without children
 * @author Yannick Croissant
 */


const docsUrl = __webpack_require__(587);
const jsxUtil = __webpack_require__(643);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const optionDefaults = {component: true, html: true};

module.exports = {
  meta: {
    docs: {
      description: 'Prevent extra closing tags for components without children',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('self-closing-comp')
    },
    fixable: 'code',

    schema: [{
      type: 'object',
      properties: {
        component: {
          default: optionDefaults.component,
          type: 'boolean'
        },
        html: {
          default: optionDefaults.html,
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: function(context) {
    function isComponent(node) {
      return node.name && node.name.type === 'JSXIdentifier' && !jsxUtil.isDOMComponent(node);
    }

    function hasChildren(node) {
      const childrens = node.parent.children;
      if (
        !childrens.length ||
        (childrens.length === 1 && (childrens[0].type === 'Literal' || childrens[0].type === 'JSXText') && !childrens[0].value.replace(/(?!\xA0)\s/g, ''))
      ) {
        return false;
      }
      return true;
    }

    function isShouldBeSelfClosed(node) {
      const configuration = Object.assign({}, optionDefaults, context.options[0]);
      return (
        configuration.component && isComponent(node) ||
        configuration.html && jsxUtil.isDOMComponent(node)
      ) && !node.selfClosing && !hasChildren(node);
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {

      JSXOpeningElement: function(node) {
        if (!isShouldBeSelfClosed(node)) {
          return;
        }
        context.report({
          node: node,
          message: 'Empty components are self-closing',
          fix: function(fixer) {
            // Represents the last character of the JSXOpeningElement, the '>' character
            const openingElementEnding = node.range[1] - 1;
            // Represents the last character of the JSXClosingElement, the '>' character
            const closingElementEnding = node.parent.closingElement.range[1];

            // Replace />.*<\/.*>/ with '/>'
            const range = [openingElementEnding, closingElementEnding];
            return fixer.replaceTextRange(range, ' />');
          }
        });
      }
    };
  }
};


/***/ }),
/* 698 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce component methods order
 * @author Yannick Croissant
 */


const has = __webpack_require__(574);
const util = __webpack_require__(27);

const Components = __webpack_require__(578);
const arrayIncludes = __webpack_require__(699);
const astUtil = __webpack_require__(581);
const docsUrl = __webpack_require__(587);

const defaultConfig = {
  order: [
    'static-methods',
    'lifecycle',
    'everything-else',
    'render'
  ],
  groups: {
    lifecycle: [
      'displayName',
      'propTypes',
      'contextTypes',
      'childContextTypes',
      'mixins',
      'statics',
      'defaultProps',
      'constructor',
      'getDefaultProps',
      'state',
      'getInitialState',
      'getChildContext',
      'getDerivedStateFromProps',
      'componentWillMount',
      'UNSAFE_componentWillMount',
      'componentDidMount',
      'componentWillReceiveProps',
      'UNSAFE_componentWillReceiveProps',
      'shouldComponentUpdate',
      'componentWillUpdate',
      'UNSAFE_componentWillUpdate',
      'getSnapshotBeforeUpdate',
      'componentDidUpdate',
      'componentDidCatch',
      'componentWillUnmount'
    ]
  }
};

/**
 * Get the methods order from the default config and the user config
 * @param {Object} userConfig The user configuration.
 * @returns {Array} Methods order
 */
function getMethodsOrder(userConfig) {
  userConfig = userConfig || {};

  const groups = util._extend(defaultConfig.groups, userConfig.groups);
  const order = userConfig.order || defaultConfig.order;

  let config = [];
  let entry;
  for (let i = 0, j = order.length; i < j; i++) {
    entry = order[i];
    if (has(groups, entry)) {
      config = config.concat(groups[entry]);
    } else {
      config.push(entry);
    }
  }

  return config;
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce component methods order',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('sort-comp')
    },

    schema: [{
      type: 'object',
      properties: {
        order: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        groups: {
          type: 'object',
          patternProperties: {
            '^.*$': {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components) => {
    const errors = {};

    const MISPOSITION_MESSAGE = '{{propA}} should be placed {{position}} {{propB}}';

    const methodsOrder = getMethodsOrder(context.options[0]);

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    const regExpRegExp = /\/(.*)\/([g|y|i|m]*)/;

    /**
     * Get indexes of the matching patterns in methods order configuration
     * @param {Object} method - Method metadata.
     * @returns {Array} The matching patterns indexes. Return [Infinity] if there is no match.
     */
    function getRefPropIndexes(method) {
      const methodGroupIndexes = [];

      methodsOrder.forEach((currentGroup, groupIndex) => {
        if (currentGroup === 'getters') {
          if (method.getter) {
            methodGroupIndexes.push(groupIndex);
          }
        } else if (currentGroup === 'setters') {
          if (method.setter) {
            methodGroupIndexes.push(groupIndex);
          }
        } else if (currentGroup === 'type-annotations') {
          if (method.typeAnnotation) {
            methodGroupIndexes.push(groupIndex);
          }
        } else if (currentGroup === 'static-methods') {
          if (method.static) {
            methodGroupIndexes.push(groupIndex);
          }
        } else if (currentGroup === 'instance-variables') {
          if (method.instanceVariable) {
            methodGroupIndexes.push(groupIndex);
          }
        } else if (currentGroup === 'instance-methods') {
          if (method.instanceMethod) {
            methodGroupIndexes.push(groupIndex);
          }
        } else if (arrayIncludes([
          'displayName',
          'propTypes',
          'contextTypes',
          'childContextTypes',
          'mixins',
          'statics',
          'defaultProps',
          'constructor',
          'getDefaultProps',
          'state',
          'getInitialState',
          'getChildContext',
          'getDerivedStateFromProps',
          'componentWillMount',
          'UNSAFE_componentWillMount',
          'componentDidMount',
          'componentWillReceiveProps',
          'UNSAFE_componentWillReceiveProps',
          'shouldComponentUpdate',
          'componentWillUpdate',
          'UNSAFE_componentWillUpdate',
          'getSnapshotBeforeUpdate',
          'componentDidUpdate',
          'componentDidCatch',
          'componentWillUnmount',
          'render'
        ], currentGroup)) {
          if (currentGroup === method.name) {
            methodGroupIndexes.push(groupIndex);
          }
        } else {
          // Is the group a regex?
          const isRegExp = currentGroup.match(regExpRegExp);
          if (isRegExp) {
            const isMatching = new RegExp(isRegExp[1], isRegExp[2]).test(method.name);
            if (isMatching) {
              methodGroupIndexes.push(groupIndex);
            }
          } else if (currentGroup === method.name) {
            methodGroupIndexes.push(groupIndex);
          }
        }
      });

      // No matching pattern, return 'everything-else' index
      if (methodGroupIndexes.length === 0) {
        const everythingElseIndex = methodsOrder.indexOf('everything-else');

        if (everythingElseIndex !== -1) {
          methodGroupIndexes.push(everythingElseIndex);
        } else {
          // No matching pattern and no 'everything-else' group
          methodGroupIndexes.push(Infinity);
        }
      }

      return methodGroupIndexes;
    }

    /**
     * Get properties name
     * @param {Object} node - Property.
     * @returns {String} Property name.
     */
    function getPropertyName(node) {
      if (node.kind === 'get') {
        return 'getter functions';
      }

      if (node.kind === 'set') {
        return 'setter functions';
      }

      return astUtil.getPropertyName(node);
    }

    /**
     * Store a new error in the error list
     * @param {Object} propA - Mispositioned property.
     * @param {Object} propB - Reference property.
     */
    function storeError(propA, propB) {
      // Initialize the error object if needed
      if (!errors[propA.index]) {
        errors[propA.index] = {
          node: propA.node,
          score: 0,
          closest: {
            distance: Infinity,
            ref: {
              node: null,
              index: 0
            }
          }
        };
      }
      // Increment the prop score
      errors[propA.index].score++;
      // Stop here if we already have pushed another node at this position
      if (getPropertyName(errors[propA.index].node) !== getPropertyName(propA.node)) {
        return;
      }
      // Stop here if we already have a closer reference
      if (Math.abs(propA.index - propB.index) > errors[propA.index].closest.distance) {
        return;
      }
      // Update the closest reference
      errors[propA.index].closest.distance = Math.abs(propA.index - propB.index);
      errors[propA.index].closest.ref.node = propB.node;
      errors[propA.index].closest.ref.index = propB.index;
    }

    /**
     * Dedupe errors, only keep the ones with the highest score and delete the others
     */
    function dedupeErrors() {
      for (const i in errors) {
        if (!has(errors, i)) {
          continue;
        }
        const index = errors[i].closest.ref.index;
        if (!errors[index]) {
          continue;
        }
        if (errors[i].score > errors[index].score) {
          delete errors[index];
        } else {
          delete errors[i];
        }
      }
    }

    /**
     * Report errors
     */
    function reportErrors() {
      dedupeErrors();

      let nodeA;
      let nodeB;
      let indexA;
      let indexB;
      for (const i in errors) {
        if (!has(errors, i)) {
          continue;
        }

        nodeA = errors[i].node;
        nodeB = errors[i].closest.ref.node;
        indexA = i;
        indexB = errors[i].closest.ref.index;

        context.report({
          node: nodeA,
          message: MISPOSITION_MESSAGE,
          data: {
            propA: getPropertyName(nodeA),
            propB: getPropertyName(nodeB),
            position: indexA < indexB ? 'before' : 'after'
          }
        });
      }
    }

    /**
     * Compare two properties and find out if they are in the right order
     * @param {Array} propertiesInfos Array containing all the properties metadata.
     * @param {Object} propA First property name and metadata
     * @param {Object} propB Second property name.
     * @returns {Object} Object containing a correct true/false flag and the correct indexes for the two properties.
     */
    function comparePropsOrder(propertiesInfos, propA, propB) {
      let i;
      let j;
      let k;
      let l;
      let refIndexA;
      let refIndexB;

      // Get references indexes (the correct position) for given properties
      const refIndexesA = getRefPropIndexes(propA);
      const refIndexesB = getRefPropIndexes(propB);

      // Get current indexes for given properties
      const classIndexA = propertiesInfos.indexOf(propA);
      const classIndexB = propertiesInfos.indexOf(propB);

      // Loop around the references indexes for the 1st property
      for (i = 0, j = refIndexesA.length; i < j; i++) {
        refIndexA = refIndexesA[i];

        // Loop around the properties for the 2nd property (for comparison)
        for (k = 0, l = refIndexesB.length; k < l; k++) {
          refIndexB = refIndexesB[k];

          if (
            // Comparing the same properties
            refIndexA === refIndexB ||
            // 1st property is placed before the 2nd one in reference and in current component
            refIndexA < refIndexB && classIndexA < classIndexB ||
            // 1st property is placed after the 2nd one in reference and in current component
            refIndexA > refIndexB && classIndexA > classIndexB
          ) {
            return {
              correct: true,
              indexA: classIndexA,
              indexB: classIndexB
            };
          }
        }
      }

      // We did not find any correct match between reference and current component
      return {
        correct: false,
        indexA: refIndexA,
        indexB: refIndexB
      };
    }

    /**
     * Check properties order from a properties list and store the eventual errors
     * @param {Array} properties Array containing all the properties.
     */
    function checkPropsOrder(properties) {
      const propertiesInfos = properties.map(node => ({
        name: getPropertyName(node),
        getter: node.kind === 'get',
        setter: node.kind === 'set',
        static: node.static,
        instanceVariable: !node.static &&
          node.type === 'ClassProperty' &&
          node.value &&
          !astUtil.isFunctionLikeExpression(node.value),
        instanceMethod: !node.static &&
          node.type === 'ClassProperty' &&
          node.value &&
          (astUtil.isFunctionLikeExpression(node.value)),
        typeAnnotation: !!node.typeAnnotation && node.value === null
      }));

      let i;
      let j;
      let k;
      let l;
      let propA;
      let propB;
      let order;

      // Loop around the properties
      for (i = 0, j = propertiesInfos.length; i < j; i++) {
        propA = propertiesInfos[i];

        // Loop around the properties a second time (for comparison)
        for (k = 0, l = propertiesInfos.length; k < l; k++) {
          if (i === k) {
            continue;
          }

          propB = propertiesInfos[k];

          // Compare the properties order
          order = comparePropsOrder(propertiesInfos, propA, propB);

          // Continue to next comparison is order is correct
          if (order.correct === true) {
            continue;
          }

          // Store an error if the order is incorrect
          storeError({
            node: properties[i],
            index: order.indexA
          }, {
            node: properties[k],
            index: order.indexB
          });
        }
      }
    }

    return {
      'Program:exit': function() {
        const list = components.list();
        for (const component in list) {
          if (!has(list, component)) {
            continue;
          }
          const properties = astUtil.getComponentProperties(list[component].node);
          checkPropsOrder(properties);
        }

        reportErrors();
      }
    };
  }),

  defaultConfig
};


/***/ }),
/* 699 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(700);
var ES = __webpack_require__(704);

var implementation = __webpack_require__(721);
var getPolyfill = __webpack_require__(722);
var polyfill = getPolyfill();
var shim = __webpack_require__(723);

var slice = Array.prototype.slice;

/* eslint-disable no-unused-vars */
var boundIncludesShim = function includes(array, searchElement) {
/* eslint-enable no-unused-vars */
	ES.RequireObjectCoercible(array);
	return polyfill.apply(array, slice.call(arguments, 1));
};
define(boundIncludesShim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundIncludesShim;


/***/ }),
/* 700 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(701);
var foreach = __webpack_require__(703);
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

var toStr = Object.prototype.toString;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		Object.defineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = props.concat(Object.getOwnPropertySymbols(map));
	}
	foreach(props, function (name) {
		defineProperty(object, name, map[name], predicates[name]);
	});
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),
/* 701 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = __webpack_require__(702);
var isEnumerable = Object.prototype.propertyIsEnumerable;
var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var excludedKeys = {
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
	$outerHeight: true,
	$outerWidth: true,
	$pageXOffset: true,
	$pageYOffset: true,
	$parent: true,
	$scrollLeft: true,
	$scrollTop: true,
	$scrollX: true,
	$scrollY: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),
/* 702 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),
/* 703 */
/***/ (function(module, exports) {


var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};



/***/ }),
/* 704 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(705);


/***/ }),
/* 705 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = __webpack_require__(706);
var toPrimitive = __webpack_require__(707);

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';
var SymbolIterator = hasSymbols ? Symbol.iterator : null;

var $isNaN = __webpack_require__(712);
var $isFinite = __webpack_require__(713);
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

var assign = __webpack_require__(714);
var sign = __webpack_require__(715);
var mod = __webpack_require__(716);
var isPrimitive = __webpack_require__(717);
var parseInteger = parseInt;
var bind = __webpack_require__(575);
var arraySlice = bind.call(Function.call, Array.prototype.slice);
var strSlice = bind.call(Function.call, String.prototype.slice);
var isBinary = bind.call(Function.call, RegExp.prototype.test, /^0b[01]+$/i);
var isOctal = bind.call(Function.call, RegExp.prototype.test, /^0o[0-7]+$/i);
var regexExec = bind.call(Function.call, RegExp.prototype.exec);
var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex = new RegExp('[' + nonWS + ']', 'g');
var hasNonWS = bind.call(Function.call, RegExp.prototype.test, nonWSregex);
var invalidHexLiteral = /^[-+]0x[0-9a-f]+$/i;
var isInvalidHexLiteral = bind.call(Function.call, RegExp.prototype.test, invalidHexLiteral);

// whitespace from: http://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
var replace = bind.call(Function.call, String.prototype.replace);
var trim = function (value) {
	return replace(value, trimRegex, '');
};

var ES5 = __webpack_require__(718);

var hasRegExpMatcher = __webpack_require__(720);

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-abstract-operations
var ES6 = assign(assign({}, ES5), {

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-call-f-v-args
	Call: function Call(F, V) {
		var args = arguments.length > 2 ? arguments[2] : [];
		if (!this.IsCallable(F)) {
			throw new TypeError(F + ' is not a function');
		}
		return F.apply(V, args);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toprimitive
	ToPrimitive: toPrimitive,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toboolean
	// ToBoolean: ES5.ToBoolean,

	// http://www.ecma-international.org/ecma-262/6.0/#sec-tonumber
	ToNumber: function ToNumber(argument) {
		var value = isPrimitive(argument) ? argument : toPrimitive(argument, Number);
		if (typeof value === 'symbol') {
			throw new TypeError('Cannot convert a Symbol value to a number');
		}
		if (typeof value === 'string') {
			if (isBinary(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 2));
			} else if (isOctal(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 8));
			} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
				return NaN;
			} else {
				var trimmed = trim(value);
				if (trimmed !== value) {
					return this.ToNumber(trimmed);
				}
			}
		}
		return Number(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tointeger
	// ToInteger: ES5.ToNumber,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint32
	// ToInt32: ES5.ToInt32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint32
	// ToUint32: ES5.ToUint32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint16
	ToInt16: function ToInt16(argument) {
		var int16bit = this.ToUint16(argument);
		return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint16
	// ToUint16: ES5.ToUint16,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint8
	ToInt8: function ToInt8(argument) {
		var int8bit = this.ToUint8(argument);
		return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8
	ToUint8: function ToUint8(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x100);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8clamp
	ToUint8Clamp: function ToUint8Clamp(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number <= 0) { return 0; }
		if (number >= 0xFF) { return 0xFF; }
		var f = Math.floor(argument);
		if (f + 0.5 < number) { return f + 1; }
		if (number < f + 0.5) { return f; }
		if (f % 2 !== 0) { return f + 1; }
		return f;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tostring
	ToString: function ToString(argument) {
		if (typeof argument === 'symbol') {
			throw new TypeError('Cannot convert a Symbol value to a string');
		}
		return String(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toobject
	ToObject: function ToObject(value) {
		this.RequireObjectCoercible(value);
		return Object(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
	ToPropertyKey: function ToPropertyKey(argument) {
		var key = this.ToPrimitive(argument, String);
		return typeof key === 'symbol' ? key : this.ToString(key);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	ToLength: function ToLength(argument) {
		var len = this.ToInteger(argument);
		if (len <= 0) { return 0; } // includes converting -0 to +0
		if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
		return len;
	},

	// http://www.ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring
	CanonicalNumericIndexString: function CanonicalNumericIndexString(argument) {
		if (toStr.call(argument) !== '[object String]') {
			throw new TypeError('must be a string');
		}
		if (argument === '-0') { return -0; }
		var n = this.ToNumber(argument);
		if (this.SameValue(this.ToString(n), argument)) { return n; }
		return void 0;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-requireobjectcoercible
	RequireObjectCoercible: ES5.CheckObjectCoercible,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
	IsArray: Array.isArray || function IsArray(argument) {
		return toStr.call(argument) === '[object Array]';
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-iscallable
	// IsCallable: ES5.IsCallable,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
	IsConstructor: function IsConstructor(argument) {
		return typeof argument === 'function' && !!argument.prototype; // unfortunately there's no way to truly check this without try/catch `new argument`
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isextensible-o
	IsExtensible: function IsExtensible(obj) {
		if (!Object.preventExtensions) { return true; }
		if (isPrimitive(obj)) {
			return false;
		}
		return Object.isExtensible(obj);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isinteger
	IsInteger: function IsInteger(argument) {
		if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
			return false;
		}
		var abs = Math.abs(argument);
		return Math.floor(abs) === abs;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ispropertykey
	IsPropertyKey: function IsPropertyKey(argument) {
		return typeof argument === 'string' || typeof argument === 'symbol';
	},

	// http://www.ecma-international.org/ecma-262/6.0/#sec-isregexp
	IsRegExp: function IsRegExp(argument) {
		if (!argument || typeof argument !== 'object') {
			return false;
		}
		if (hasSymbols) {
			var isRegExp = argument[Symbol.match];
			if (typeof isRegExp !== 'undefined') {
				return ES5.ToBoolean(isRegExp);
			}
		}
		return hasRegExpMatcher(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevalue
	// SameValue: ES5.SameValue,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero
	SameValueZero: function SameValueZero(x, y) {
		return (x === y) || ($isNaN(x) && $isNaN(y));
	},

	/**
	 * 7.3.2 GetV (V, P)
	 * 1. Assert: IsPropertyKey(P) is true.
	 * 2. Let O be ToObject(V).
	 * 3. ReturnIfAbrupt(O).
	 * 4. Return O.[[Get]](P, V).
	 */
	GetV: function GetV(V, P) {
		// 7.3.2.1
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}

		// 7.3.2.2-3
		var O = this.ToObject(V);

		// 7.3.2.4
		return O[P];
	},

	/**
	 * 7.3.9 - http://www.ecma-international.org/ecma-262/6.0/#sec-getmethod
	 * 1. Assert: IsPropertyKey(P) is true.
	 * 2. Let func be GetV(O, P).
	 * 3. ReturnIfAbrupt(func).
	 * 4. If func is either undefined or null, return undefined.
	 * 5. If IsCallable(func) is false, throw a TypeError exception.
	 * 6. Return func.
	 */
	GetMethod: function GetMethod(O, P) {
		// 7.3.9.1
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}

		// 7.3.9.2
		var func = this.GetV(O, P);

		// 7.3.9.4
		if (func == null) {
			return void 0;
		}

		// 7.3.9.5
		if (!this.IsCallable(func)) {
			throw new TypeError(P + 'is not a function');
		}

		// 7.3.9.6
		return func;
	},

	/**
	 * 7.3.1 Get (O, P) - http://www.ecma-international.org/ecma-262/6.0/#sec-get-o-p
	 * 1. Assert: Type(O) is Object.
	 * 2. Assert: IsPropertyKey(P) is true.
	 * 3. Return O.[[Get]](P, O).
	 */
	Get: function Get(O, P) {
		// 7.3.1.1
		if (this.Type(O) !== 'Object') {
			throw new TypeError('Assertion failed: Type(O) is not Object');
		}
		// 7.3.1.2
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		// 7.3.1.3
		return O[P];
	},

	Type: function Type(x) {
		if (typeof x === 'symbol') {
			return 'Symbol';
		}
		return ES5.Type(x);
	},

	// http://www.ecma-international.org/ecma-262/6.0/#sec-speciesconstructor
	SpeciesConstructor: function SpeciesConstructor(O, defaultConstructor) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('Assertion failed: Type(O) is not Object');
		}
		var C = O.constructor;
		if (typeof C === 'undefined') {
			return defaultConstructor;
		}
		if (this.Type(C) !== 'Object') {
			throw new TypeError('O.constructor is not an Object');
		}
		var S = hasSymbols && Symbol.species ? C[Symbol.species] : void 0;
		if (S == null) {
			return defaultConstructor;
		}
		if (this.IsConstructor(S)) {
			return S;
		}
		throw new TypeError('no constructor found');
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor
	CompletePropertyDescriptor: function CompletePropertyDescriptor(Desc) {
		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (this.IsGenericDescriptor(Desc) || this.IsDataDescriptor(Desc)) {
			if (!has(Desc, '[[Value]]')) {
				Desc['[[Value]]'] = void 0;
			}
			if (!has(Desc, '[[Writable]]')) {
				Desc['[[Writable]]'] = false;
			}
		} else {
			if (!has(Desc, '[[Get]]')) {
				Desc['[[Get]]'] = void 0;
			}
			if (!has(Desc, '[[Set]]')) {
				Desc['[[Set]]'] = void 0;
			}
		}
		if (!has(Desc, '[[Enumerable]]')) {
			Desc['[[Enumerable]]'] = false;
		}
		if (!has(Desc, '[[Configurable]]')) {
			Desc['[[Configurable]]'] = false;
		}
		return Desc;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw
	Set: function Set(O, P, V, Throw) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('P must be a Property Key');
		}
		if (this.Type(Throw) !== 'Boolean') {
			throw new TypeError('Throw must be a Boolean');
		}
		if (Throw) {
			O[P] = V;
			return true;
		} else {
			try {
				O[P] = V;
			} catch (e) {
				return false;
			}
		}
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-hasownproperty
	HasOwnProperty: function HasOwnProperty(O, P) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('P must be a Property Key');
		}
		return has(O, P);
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-hasproperty
	HasProperty: function HasProperty(O, P) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('P must be a Property Key');
		}
		return P in O;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable
	IsConcatSpreadable: function IsConcatSpreadable(O) {
		if (this.Type(O) !== 'Object') {
			return false;
		}
		if (hasSymbols && typeof Symbol.isConcatSpreadable === 'symbol') {
			var spreadable = this.Get(O, Symbol.isConcatSpreadable);
			if (typeof spreadable !== 'undefined') {
				return this.ToBoolean(spreadable);
			}
		}
		return this.IsArray(O);
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-invoke
	Invoke: function Invoke(O, P) {
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('P must be a Property Key');
		}
		var argumentsList = arraySlice(arguments, 2);
		var func = this.GetV(O, P);
		return this.Call(func, O, argumentsList);
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-getiterator
	GetIterator: function GetIterator(obj, method) {
		if (!hasSymbols) {
			throw new SyntaxError('ES.GetIterator depends on native iterator support.');
		}

		var actualMethod = method;
		if (arguments.length < 2) {
			actualMethod = this.GetMethod(obj, SymbolIterator);
		}
		var iterator = this.Call(actualMethod, obj);
		if (this.Type(iterator) !== 'Object') {
			throw new TypeError('iterator must return an object');
		}

		return iterator;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-iteratornext
	IteratorNext: function IteratorNext(iterator, value) {
		var result = this.Invoke(iterator, 'next', arguments.length < 2 ? [] : [value]);
		if (this.Type(result) !== 'Object') {
			throw new TypeError('iterator next must return an object');
		}
		return result;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-iteratorcomplete
	IteratorComplete: function IteratorComplete(iterResult) {
		if (this.Type(iterResult) !== 'Object') {
			throw new TypeError('Assertion failed: Type(iterResult) is not Object');
		}
		return this.ToBoolean(this.Get(iterResult, 'done'));
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-iteratorvalue
	IteratorValue: function IteratorValue(iterResult) {
		if (this.Type(iterResult) !== 'Object') {
			throw new TypeError('Assertion failed: Type(iterResult) is not Object');
		}
		return this.Get(iterResult, 'value');
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-iteratorstep
	IteratorStep: function IteratorStep(iterator) {
		var result = this.IteratorNext(iterator);
		var done = this.IteratorComplete(result);
		return done === true ? false : result;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-iteratorclose
	IteratorClose: function IteratorClose(iterator, completion) {
		if (this.Type(iterator) !== 'Object') {
			throw new TypeError('Assertion failed: Type(iterator) is not Object');
		}
		if (!this.IsCallable(completion)) {
			throw new TypeError('Assertion failed: completion is not a thunk for a Completion Record');
		}
		var completionThunk = completion;

		var iteratorReturn = this.GetMethod(iterator, 'return');

		if (typeof iteratorReturn === 'undefined') {
			return completionThunk();
		}

		var completionRecord;
		try {
			var innerResult = this.Call(iteratorReturn, iterator, []);
		} catch (e) {
			// if we hit here, then "e" is the innerResult completion that needs re-throwing

			// if the completion is of type "throw", this will throw.
			completionRecord = completionThunk();
			completionThunk = null; // ensure it's not called twice.

			// if not, then return the innerResult completion
			throw e;
		}
		completionRecord = completionThunk(); // if innerResult worked, then throw if the completion does
		completionThunk = null; // ensure it's not called twice.

		if (this.Type(innerResult) !== 'Object') {
			throw new TypeError('iterator .return must return an object');
		}

		return completionRecord;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject
	CreateIterResultObject: function CreateIterResultObject(value, done) {
		if (this.Type(done) !== 'Boolean') {
			throw new TypeError('Assertion failed: Type(done) is not Boolean');
		}
		return {
			value: value,
			done: done
		};
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-regexpexec
	RegExpExec: function RegExpExec(R, S) {
		if (this.Type(R) !== 'Object') {
			throw new TypeError('R must be an Object');
		}
		if (this.Type(S) !== 'String') {
			throw new TypeError('S must be a String');
		}
		var exec = this.Get(R, 'exec');
		if (this.IsCallable(exec)) {
			var result = this.Call(exec, R, [S]);
			if (result === null || this.Type(result) === 'Object') {
				return result;
			}
			throw new TypeError('"exec" method must return `null` or an Object');
		}
		return regexExec(R, S);
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate
	ArraySpeciesCreate: function ArraySpeciesCreate(originalArray, length) {
		if (!this.IsInteger(length) || length < 0) {
			throw new TypeError('Assertion failed: length must be an integer >= 0');
		}
		var len = length === 0 ? 0 : length;
		var C;
		var isArray = this.IsArray(originalArray);
		if (isArray) {
			C = this.Get(originalArray, 'constructor');
			// TODO: figure out how to make a cross-realm normal Array, a same-realm Array
			// if (this.IsConstructor(C)) {
			// 	if C is another realm's Array, C = undefined
			// 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
			// }
			if (this.Type(C) === 'Object' && hasSymbols && Symbol.species) {
				C = this.Get(C, Symbol.species);
				if (C === null) {
					C = void 0;
				}
			}
		}
		if (typeof C === 'undefined') {
			return Array(len);
		}
		if (!this.IsConstructor(C)) {
			throw new TypeError('C must be a constructor');
		}
		return new C(len); // this.Construct(C, len);
	},

	CreateDataProperty: function CreateDataProperty(O, P, V) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('Assertion failed: Type(O) is not Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		var oldDesc = Object.getOwnPropertyDescriptor(O, P);
		var extensible = oldDesc || (typeof Object.isExtensible !== 'function' || Object.isExtensible(O));
		var immutable = oldDesc && (!oldDesc.writable || !oldDesc.configurable);
		if (immutable || !extensible) {
			return false;
		}
		var newDesc = {
			configurable: true,
			enumerable: true,
			value: V,
			writable: true
		};
		Object.defineProperty(O, P, newDesc);
		return true;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow
	CreateDataPropertyOrThrow: function CreateDataPropertyOrThrow(O, P, V) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('Assertion failed: Type(O) is not Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		var success = this.CreateDataProperty(O, P, V);
		if (!success) {
			throw new TypeError('unable to create data property');
		}
		return success;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-advancestringindex
	AdvanceStringIndex: function AdvanceStringIndex(S, index, unicode) {
		if (this.Type(S) !== 'String') {
			throw new TypeError('Assertion failed: Type(S) is not String');
		}
		if (!this.IsInteger(index)) {
			throw new TypeError('Assertion failed: length must be an integer >= 0 and <= (2**53 - 1)');
		}
		if (index < 0 || index > MAX_SAFE_INTEGER) {
			throw new RangeError('Assertion failed: length must be an integer >= 0 and <= (2**53 - 1)');
		}
		if (this.Type(unicode) !== 'Boolean') {
			throw new TypeError('Assertion failed: Type(unicode) is not Boolean');
		}
		if (!unicode) {
			return index + 1;
		}
		var length = S.length;
		if ((index + 1) >= length) {
			return index + 1;
		}
		var first = S.charCodeAt(index);
		if (first < 0xD800 || first > 0xDBFF) {
			return index + 1;
		}
		var second = S.charCodeAt(index + 1);
		if (second < 0xDC00 || second > 0xDFFF) {
			return index + 1;
		}
		return index + 2;
	}
});

delete ES6.CheckObjectCoercible; // renamed in ES6 to RequireObjectCoercible

module.exports = ES6;


/***/ }),
/* 706 */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(575);

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),
/* 707 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var isPrimitive = __webpack_require__(708);
var isCallable = __webpack_require__(709);
var isDate = __webpack_require__(710);
var isSymbol = __webpack_require__(711);

var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
	if (typeof O === 'undefined' || O === null) {
		throw new TypeError('Cannot call method on ' + O);
	}
	if (typeof hint !== 'string' || (hint !== 'number' && hint !== 'string')) {
		throw new TypeError('hint must be "string" or "number"');
	}
	var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
	var method, result, i;
	for (i = 0; i < methodNames.length; ++i) {
		method = O[methodNames[i]];
		if (isCallable(method)) {
			result = method.call(O);
			if (isPrimitive(result)) {
				return result;
			}
		}
	}
	throw new TypeError('No default value');
};

var GetMethod = function GetMethod(O, P) {
	var func = O[P];
	if (func !== null && typeof func !== 'undefined') {
		if (!isCallable(func)) {
			throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
		}
		return func;
	}
};

// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	var hint = 'default';
	if (arguments.length > 1) {
		if (PreferredType === String) {
			hint = 'string';
		} else if (PreferredType === Number) {
			hint = 'number';
		}
	}

	var exoticToPrim;
	if (hasSymbols) {
		if (Symbol.toPrimitive) {
			exoticToPrim = GetMethod(input, Symbol.toPrimitive);
		} else if (isSymbol(input)) {
			exoticToPrim = Symbol.prototype.valueOf;
		}
	}
	if (typeof exoticToPrim !== 'undefined') {
		var result = exoticToPrim.call(input, hint);
		if (isPrimitive(result)) {
			return result;
		}
		throw new TypeError('unable to convert exotic object to primitive');
	}
	if (hint === 'default' && (isDate(input) || isSymbol(input))) {
		hint = 'string';
	}
	return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
};


/***/ }),
/* 708 */
/***/ (function(module, exports) {

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};


/***/ }),
/* 709 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class /;
var isES6ClassFn = function isES6ClassFn(value) {
	try {
		var fnStr = fnToStr.call(value);
		var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
		var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
		var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
		return constructorRegex.test(spaceStripped);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionObject(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};


/***/ }),
/* 710 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateObject(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) { return false; }
	return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};


/***/ }),
/* 711 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') { return false; }
		return symStringRegex.test(symToStr.call(value));
	};
	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') { return true; }
		if (toStr.call(value) !== '[object Symbol]') { return false; }
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {
	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false;
	};
}


/***/ }),
/* 712 */
/***/ (function(module, exports) {

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};


/***/ }),
/* 713 */
/***/ (function(module, exports) {

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };


/***/ }),
/* 714 */
/***/ (function(module, exports) {

var has = Object.prototype.hasOwnProperty;
module.exports = function assign(target, source) {
	if (Object.assign) {
		return Object.assign(target, source);
	}
	for (var key in source) {
		if (has.call(source, key)) {
			target[key] = source[key];
		}
	}
	return target;
};


/***/ }),
/* 715 */
/***/ (function(module, exports) {

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};


/***/ }),
/* 716 */
/***/ (function(module, exports) {

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};


/***/ }),
/* 717 */
/***/ (function(module, exports) {

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};


/***/ }),
/* 718 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $isNaN = __webpack_require__(712);
var $isFinite = __webpack_require__(713);

var sign = __webpack_require__(715);
var mod = __webpack_require__(716);

var IsCallable = __webpack_require__(709);
var toPrimitive = __webpack_require__(719);

var has = __webpack_require__(706);

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return !!value;
	},
	ToNumber: function ToNumber(value) {
		return Number(value);
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
		return $isNaN(x) && $isNaN(y);
	},

	// http://www.ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
		if (x === null) {
			return 'Null';
		}
		if (typeof x === 'undefined') {
			return 'Undefined';
		}
		if (typeof x === 'function' || typeof x === 'object') {
			return 'Object';
		}
		if (typeof x === 'number') {
			return 'Number';
		}
		if (typeof x === 'boolean') {
			return 'Boolean';
		}
		if (typeof x === 'string') {
			return 'String';
		}
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
		if (this.Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};
		// jscs:disable
		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}
		// jscs:enable
		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.1
	IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
			return false;
		}

		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.2
	IsDataDescriptor: function IsDataDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
			return false;
		}

		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.3
	IsGenericDescriptor: function IsGenericDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
			return true;
		}

		return false;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.4
	FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return Desc;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (this.IsDataDescriptor(Desc)) {
			return {
				value: Desc['[[Value]]'],
				writable: !!Desc['[[Writable]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else if (this.IsAccessorDescriptor(Desc)) {
			return {
				get: Desc['[[Get]]'],
				set: Desc['[[Set]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else {
			throw new TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
		}
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.5
	ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
		if (this.Type(Obj) !== 'Object') {
			throw new TypeError('ToPropertyDescriptor requires an object');
		}

		var desc = {};
		if (has(Obj, 'enumerable')) {
			desc['[[Enumerable]]'] = this.ToBoolean(Obj.enumerable);
		}
		if (has(Obj, 'configurable')) {
			desc['[[Configurable]]'] = this.ToBoolean(Obj.configurable);
		}
		if (has(Obj, 'value')) {
			desc['[[Value]]'] = Obj.value;
		}
		if (has(Obj, 'writable')) {
			desc['[[Writable]]'] = this.ToBoolean(Obj.writable);
		}
		if (has(Obj, 'get')) {
			var getter = Obj.get;
			if (typeof getter !== 'undefined' && !this.IsCallable(getter)) {
				throw new TypeError('getter must be a function');
			}
			desc['[[Get]]'] = getter;
		}
		if (has(Obj, 'set')) {
			var setter = Obj.set;
			if (typeof setter !== 'undefined' && !this.IsCallable(setter)) {
				throw new TypeError('setter must be a function');
			}
			desc['[[Set]]'] = setter;
		}

		if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
			throw new TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
		}
		return desc;
	}
};

module.exports = ES5;


/***/ }),
/* 719 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

var isPrimitive = __webpack_require__(708);

var isCallable = __webpack_require__(709);

// https://es5.github.io/#x8.12
var ES5internalSlots = {
	'[[DefaultValue]]': function (O, hint) {
		var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// https://es5.github.io/#x9
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
};


/***/ }),
/* 720 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = __webpack_require__(706);
var regexExec = RegExp.prototype.exec;
var gOPD = Object.getOwnPropertyDescriptor;

var tryRegexExecCall = function tryRegexExec(value) {
	try {
		var lastIndex = value.lastIndex;
		value.lastIndex = 0;

		regexExec.call(value);
		return true;
	} catch (e) {
		return false;
	} finally {
		value.lastIndex = lastIndex;
	}
};
var toStr = Object.prototype.toString;
var regexClass = '[object RegExp]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isRegex(value) {
	if (!value || typeof value !== 'object') {
		return false;
	}
	if (!hasToStringTag) {
		return toStr.call(value) === regexClass;
	}

	var descriptor = gOPD(value, 'lastIndex');
	var hasLastIndexDataProperty = descriptor && has(descriptor, 'value');
	if (!hasLastIndexDataProperty) {
		return false;
	}

	return tryRegexExecCall(value);
};


/***/ }),
/* 721 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var ES = __webpack_require__(704);
var $isNaN = Number.isNaN || function isNaN(a) {
	return a !== a;
};
var $isFinite = Number.isFinite || function isFinite(n) {
	return typeof n === 'number' && global.isFinite(n);
};
var indexOf = Array.prototype.indexOf;

module.exports = function includes(searchElement) {
	var fromIndex = arguments.length > 1 ? ES.ToInteger(arguments[1]) : 0;
	if (indexOf && !$isNaN(searchElement) && $isFinite(fromIndex) && typeof searchElement !== 'undefined') {
		return indexOf.apply(this, arguments) > -1;
	}

	var O = ES.ToObject(this);
	var length = ES.ToLength(O.length);
	if (length === 0) {
		return false;
	}
	var k = fromIndex >= 0 ? fromIndex : Math.max(0, length + fromIndex);
	while (k < length) {
		if (ES.SameValueZero(searchElement, O[k])) {
			return true;
		}
		k += 1;
	}
	return false;
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(4)))

/***/ }),
/* 722 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(721);

module.exports = function getPolyfill() {
	return Array.prototype.includes || implementation;
};


/***/ }),
/* 723 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(700);
var getPolyfill = __webpack_require__(722);

module.exports = function shimArrayPrototypeIncludes() {
	var polyfill = getPolyfill();
	define(
		Array.prototype,
		{ includes: polyfill },
		{ includes: function () { return Array.prototype.includes !== polyfill; } }
	);
	return polyfill;
};


/***/ }),
/* 724 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce propTypes declarations alphabetical sorting
 */


const variableUtil = __webpack_require__(579);
const propsUtil = __webpack_require__(584);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce propTypes declarations alphabetical sorting',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('sort-prop-types')
    },

    fixable: 'code',

    schema: [{
      type: 'object',
      properties: {
        requiredFirst: {
          type: 'boolean'
        },
        callbacksLast: {
          type: 'boolean'
        },
        ignoreCase: {
          type: 'boolean'
        },
        // Whether alphabetical sorting should be enforced
        noSortAlphabetically: {
          type: 'boolean'
        },
        sortShapeProp: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: function(context) {
    const sourceCode = context.getSourceCode();
    const configuration = context.options[0] || {};
    const requiredFirst = configuration.requiredFirst || false;
    const callbacksLast = configuration.callbacksLast || false;
    const ignoreCase = configuration.ignoreCase || false;
    const noSortAlphabetically = configuration.noSortAlphabetically || false;
    const sortShapeProp = configuration.sortShapeProp || false;
    const propWrapperFunctions = new Set(context.settings.propWrapperFunctions || []);

    function getKey(node) {
      return sourceCode.getText(node.key || node.argument);
    }

    function getValueName(node) {
      return node.type === 'Property' && node.value.property && node.value.property.name;
    }

    function isCallbackPropName(propName) {
      return /^on[A-Z]/.test(propName);
    }

    function isRequiredProp(node) {
      return getValueName(node) === 'isRequired';
    }

    function isShapeProp(node) {
      return Boolean(
        node && node.callee && node.callee.property && node.callee.property.name === 'shape'
      );
    }

    function getShapeProperties (node) {
      return node.arguments && node.arguments[0] && node.arguments[0].properties;
    }

    function sorter(a, b) {
      let aKey = getKey(a);
      let bKey = getKey(b);
      if (requiredFirst) {
        if (isRequiredProp(a) && !isRequiredProp(b)) {
          return -1;
        }
        if (!isRequiredProp(a) && isRequiredProp(b)) {
          return 1;
        }
      }

      if (callbacksLast) {
        if (isCallbackPropName(aKey) && !isCallbackPropName(bKey)) {
          return 1;
        }
        if (!isCallbackPropName(aKey) && isCallbackPropName(bKey)) {
          return -1;
        }
      }

      if (ignoreCase) {
        aKey = aKey.toLowerCase();
        bKey = bKey.toLowerCase();
      }

      if (aKey < bKey) {
        return -1;
      }
      if (aKey > bKey) {
        return 1;
      }
      return 0;
    }


    /**
     * Checks if propTypes declarations are sorted
     * @param {Array} declarations The array of AST nodes being checked.
     * @returns {void}
     */
    function checkSorted(declarations) {
      // Declarations will be `undefined` if the `shape` is not a literal. For
      // example, if it is a propType imported from another file.
      if (!declarations) {
        return;
      }

      function fix(fixer) {
        function sortInSource(allNodes, source) {
          const originalSource = source;
          const nodeGroups = allNodes.reduce((acc, curr) => {
            if (curr.type === 'ExperimentalSpreadProperty' || curr.type === 'SpreadElement') {
              acc.push([]);
            } else {
              acc[acc.length - 1].push(curr);
            }
            return acc;
          }, [[]]);

          nodeGroups.forEach(nodes => {
            const sortedAttributes = nodes.slice().sort(sorter);

            for (let i = nodes.length - 1; i >= 0; i--) {
              const sortedAttr = sortedAttributes[i];
              const attr = nodes[i];
              let sortedAttrText = sourceCode.getText(sortedAttr);
              if (sortShapeProp && isShapeProp(sortedAttr.value)) {
                const shape = getShapeProperties(sortedAttr.value);
                if (shape) {
                  const attrSource = sortInSource(
                    shape,
                    originalSource
                  );
                  sortedAttrText = attrSource.slice(sortedAttr.range[0], sortedAttr.range[1]);
                }
              }
              source = `${source.slice(0, attr.range[0])}${sortedAttrText}${source.slice(attr.range[1])}`;
            }
          });
          return source;
        }

        const source = sortInSource(declarations, context.getSourceCode().getText());

        const rangeStart = declarations[0].range[0];
        const rangeEnd = declarations[declarations.length - 1].range[1];
        return fixer.replaceTextRange([rangeStart, rangeEnd], source.slice(rangeStart, rangeEnd));
      }

      declarations.reduce((prev, curr, idx, decls) => {
        if (curr.type === 'ExperimentalSpreadProperty' || curr.type === 'SpreadElement') {
          return decls[idx + 1];
        }

        let prevPropName = getKey(prev);
        let currentPropName = getKey(curr);
        const previousIsRequired = isRequiredProp(prev);
        const currentIsRequired = isRequiredProp(curr);
        const previousIsCallback = isCallbackPropName(prevPropName);
        const currentIsCallback = isCallbackPropName(currentPropName);

        if (ignoreCase) {
          prevPropName = prevPropName.toLowerCase();
          currentPropName = currentPropName.toLowerCase();
        }

        if (requiredFirst) {
          if (previousIsRequired && !currentIsRequired) {
            // Transition between required and non-required. Don't compare for alphabetical.
            return curr;
          }
          if (!previousIsRequired && currentIsRequired) {
            // Encountered a non-required prop after a required prop
            context.report({
              node: curr,
              message: 'Required prop types must be listed before all other prop types',
              fix
            });
            return curr;
          }
        }

        if (callbacksLast) {
          if (!previousIsCallback && currentIsCallback) {
            // Entering the callback prop section
            return curr;
          }
          if (previousIsCallback && !currentIsCallback) {
            // Encountered a non-callback prop after a callback prop
            context.report({
              node: prev,
              message: 'Callback prop types must be listed after all other prop types',
              fix
            });
            return prev;
          }
        }

        if (!noSortAlphabetically && currentPropName < prevPropName) {
          context.report({
            node: curr,
            message: 'Prop types declarations should be sorted alphabetically',
            fix
          });
          return prev;
        }

        return curr;
      }, declarations[0]);
    }

    function checkNode(node) {
      switch (node && node.type) {
        case 'ObjectExpression':
          checkSorted(node.properties);
          break;
        case 'Identifier':
          const propTypesObject = variableUtil.findVariableByName(context, node.name);
          if (propTypesObject && propTypesObject.properties) {
            checkSorted(propTypesObject.properties);
          }
          break;
        case 'CallExpression':
          const innerNode = node.arguments && node.arguments[0];
          if (propWrapperFunctions.has(node.callee.name) && innerNode) {
            checkNode(innerNode);
          }
          break;
        default:
          break;
      }
    }

    return {
      CallExpression: function(node) {
        if (!sortShapeProp || !isShapeProp(node) || !(node.arguments && node.arguments[0])) {
          return;
        }
        checkSorted(node.arguments[0].properties);
      },

      ClassProperty: function(node) {
        if (!propsUtil.isPropTypesDeclaration(node)) {
          return;
        }
        checkNode(node.value);
      },

      MemberExpression: function(node) {
        if (!propsUtil.isPropTypesDeclaration(node)) {
          return;
        }

        checkNode(node.parent.right);
      },

      ObjectExpression: function(node) {
        node.properties.forEach(property => {
          if (!property.key) {
            return;
          }

          if (!propsUtil.isPropTypesDeclaration(property)) {
            return;
          }
          if (property.value.type === 'ObjectExpression') {
            checkSorted(property.value.properties);
          }
        });
      }

    };
  }
};


/***/ }),
/* 725 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce style prop value is an object
 * @author David Petersen
 */


const variableUtil = __webpack_require__(579);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce style prop value is an object',
      category: '',
      recommended: false,
      url: docsUrl('style-prop-object')
    },
    schema: []
  },

  create: function(context) {
    /**
     * @param {object} node An Identifier node
     */
    function isNonNullaryLiteral(expression) {
      return expression.type === 'Literal' && expression.value !== null;
    }

    /**
     * @param {object} node A Identifier node
     */
    function checkIdentifiers(node) {
      const variable = variableUtil.variablesInScope(context).find(item => item.name === node.name);

      if (!variable || !variable.defs[0] || !variable.defs[0].node.init) {
        return;
      }

      if (isNonNullaryLiteral(variable.defs[0].node.init)) {
        context.report(node, 'Style prop value must be an object');
      }
    }

    return {
      CallExpression: function(node) {
        if (
          node.callee
          && node.callee.type === 'MemberExpression'
          && node.callee.property.name === 'createElement'
          && node.arguments.length > 1
        ) {
          if (node.arguments[1].type === 'ObjectExpression') {
            const style = node.arguments[1].properties.find(property => property.key && property.key.name === 'style' && !property.computed);
            if (style) {
              if (style.value.type === 'Identifier') {
                checkIdentifiers(style.value);
              } else if (isNonNullaryLiteral(style.value)) {
                context.report(style.value, 'Style prop value must be an object');
              }
            }
          }
        }
      },

      JSXAttribute: function(node) {
        if (!node.value || node.name.name !== 'style') {
          return;
        }

        if (node.value.type !== 'JSXExpressionContainer' || isNonNullaryLiteral(node.value.expression)) {
          context.report(node, 'Style prop value must be an object');
        } else if (node.value.expression.type === 'Identifier') {
          checkIdentifiers(node.value.expression);
        }
      }
    };
  }
};


/***/ }),
/* 726 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent void elements (e.g. <img />, <br />) from receiving
 *   children
 * @author Joe Lencioni
 */


const has = __webpack_require__(574);

const Components = __webpack_require__(578);
const docsUrl = __webpack_require__(587);

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

// Using an object here to avoid array scan. We should switch to Set once
// support is good enough.
const VOID_DOM_ELEMENTS = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  menuitem: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};

function isVoidDOMElement(elementName) {
  return has(VOID_DOM_ELEMENTS, elementName);
}

function errorMessage(elementName) {
  return `Void DOM element <${elementName} /> cannot receive children.`;
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent passing of children to void DOM elements (e.g. <br />).',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('void-dom-elements-no-children')
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => ({
    JSXElement: function(node) {
      const elementName = node.openingElement.name.name;

      if (!isVoidDOMElement(elementName)) {
        // e.g. <div />
        return;
      }

      if (node.children.length > 0) {
        // e.g. <br>Foo</br>
        context.report({
          node: node,
          message: errorMessage(elementName)
        });
      }

      const attributes = node.openingElement.attributes;

      const hasChildrenAttributeOrDanger = attributes.some(attribute => {
        if (!attribute.name) {
          return false;
        }

        return attribute.name.name === 'children' || attribute.name.name === 'dangerouslySetInnerHTML';
      });

      if (hasChildrenAttributeOrDanger) {
        // e.g. <br children="Foo" />
        context.report({
          node: node,
          message: errorMessage(elementName)
        });
      }
    },

    CallExpression: function(node) {
      if (node.callee.type !== 'MemberExpression' && node.callee.type !== 'Identifier') {
        return;
      }

      if (!utils.isReactCreateElement(node)) {
        return;
      }

      const args = node.arguments;

      if (args.length < 1) {
        // React.createElement() should not crash linter
        return;
      }

      const elementName = args[0].value;

      if (!isVoidDOMElement(elementName)) {
        // e.g. React.createElement('div');
        return;
      }

      if (args.length < 2 || args[1].type !== 'ObjectExpression') {
        return;
      }

      const firstChild = args[2];
      if (firstChild) {
        // e.g. React.createElement('br', undefined, 'Foo')
        context.report({
          node: node,
          message: errorMessage(elementName)
        });
      }

      const props = args[1].properties;

      const hasChildrenPropOrDanger = props.some(prop => {
        if (!prop.key) {
          return false;
        }

        return prop.key.name === 'children' || prop.key.name === 'dangerouslySetInnerHTML';
      });

      if (hasChildrenPropOrDanger) {
        // e.g. React.createElement('br', { children: 'Foo' })
        context.report({
          node: node,
          message: errorMessage(elementName)
        });
      }
    }
  }))
};


/***/ })
])]);