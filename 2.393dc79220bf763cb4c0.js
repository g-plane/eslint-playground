(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ 727:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update it's content execute "npm run update"
 */


module.exports = {
  rules: {
    'attribute-hyphenation': __webpack_require__(728),
    'attributes-order': __webpack_require__(889),
    'comment-directive': __webpack_require__(890),
    'component-name-in-template-casing': __webpack_require__(891),
    'html-closing-bracket-newline': __webpack_require__(892),
    'html-closing-bracket-spacing': __webpack_require__(893),
    'html-end-tags': __webpack_require__(894),
    'html-indent': __webpack_require__(895),
    'html-quotes': __webpack_require__(897),
    'html-self-closing': __webpack_require__(898),
    'jsx-uses-vars': __webpack_require__(899),
    'max-attributes-per-line': __webpack_require__(900),
    'multiline-html-element-content-newline': __webpack_require__(901),
    'mustache-interpolation-spacing': __webpack_require__(902),
    'name-property-casing': __webpack_require__(903),
    'no-async-in-computed-properties': __webpack_require__(904),
    'no-confusing-v-for-v-if': __webpack_require__(905),
    'no-dupe-keys': __webpack_require__(906),
    'no-duplicate-attributes': __webpack_require__(907),
    'no-multi-spaces': __webpack_require__(908),
    'no-parsing-error': __webpack_require__(909),
    'no-reserved-keys': __webpack_require__(910),
    'no-shared-component-data': __webpack_require__(912),
    'no-side-effects-in-computed-properties': __webpack_require__(913),
    'no-spaces-around-equal-signs-in-attribute': __webpack_require__(914),
    'no-template-key': __webpack_require__(915),
    'no-template-shadow': __webpack_require__(916),
    'no-textarea-mustache': __webpack_require__(917),
    'no-unused-components': __webpack_require__(918),
    'no-unused-vars': __webpack_require__(919),
    'no-use-v-if-with-v-for': __webpack_require__(920),
    'no-v-html': __webpack_require__(921),
    'order-in-components': __webpack_require__(922),
    'prop-name-casing': __webpack_require__(923),
    'require-component-is': __webpack_require__(924),
    'require-default-prop': __webpack_require__(925),
    'require-prop-type-constructor': __webpack_require__(926),
    'require-prop-types': __webpack_require__(927),
    'require-render-return': __webpack_require__(928),
    'require-v-for-key': __webpack_require__(929),
    'require-valid-default-prop': __webpack_require__(930),
    'return-in-computed-property': __webpack_require__(931),
    'script-indent': __webpack_require__(932),
    'singleline-html-element-content-newline': __webpack_require__(933),
    'this-in-template': __webpack_require__(934),
    'v-bind-style': __webpack_require__(936),
    'v-on-style': __webpack_require__(937),
    'valid-template-root': __webpack_require__(938),
    'valid-v-bind': __webpack_require__(939),
    'valid-v-cloak': __webpack_require__(940),
    'valid-v-else-if': __webpack_require__(941),
    'valid-v-else': __webpack_require__(942),
    'valid-v-for': __webpack_require__(943),
    'valid-v-html': __webpack_require__(944),
    'valid-v-if': __webpack_require__(945),
    'valid-v-model': __webpack_require__(946),
    'valid-v-on': __webpack_require__(947),
    'valid-v-once': __webpack_require__(948),
    'valid-v-pre': __webpack_require__(949),
    'valid-v-show': __webpack_require__(950),
    'valid-v-text': __webpack_require__(951)
  },
  configs: {
    'base': __webpack_require__(952),
    'essential': __webpack_require__(953),
    'strongly-recommended': __webpack_require__(954),
    'recommended': __webpack_require__(955)
  },
  processors: {
    '.vue': __webpack_require__(956)
  }
}


/***/ }),

/***/ 728:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Define a style for the props casing in templates.
 * @author Armano
 */


const utils = __webpack_require__(729)
const casing = __webpack_require__(888)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce attribute naming style on custom components in template',
      category: 'strongly-recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/attribute-hyphenation.md'
    },
    fixable: 'code',
    schema: [
      {
        enum: ['always', 'never']
      },
      {
        type: 'object',
        properties: {
          'ignore': {
            type: 'array',
            items: {
              allOf: [
                { type: 'string' },
                { not: { type: 'string', pattern: ':exit$' }},
                { not: { type: 'string', pattern: '^\\s*$' }}
              ]
            },
            uniqueItems: true,
            additionalItems: false
          }
        },
        additionalProperties: false
      }
    ]
  },

  create (context) {
    const sourceCode = context.getSourceCode()
    const option = context.options[0]
    const optionsPayload = context.options[1]
    const useHyphenated = option !== 'never'
    let ignoredAttributes = ['data-', 'aria-', 'slot-scope']

    if (optionsPayload && optionsPayload.ignore) {
      ignoredAttributes = ignoredAttributes.concat(optionsPayload.ignore)
    }

    const caseConverter = casing.getConverter(useHyphenated ? 'kebab-case' : 'camelCase')

    function reportIssue (node, name) {
      const text = sourceCode.getText(node.key)

      context.report({
        node: node.key,
        loc: node.loc,
        message: useHyphenated ? "Attribute '{{text}}' must be hyphenated." : "Attribute '{{text}}' can't be hyphenated.",
        data: {
          text
        },
        fix: fixer => fixer.replaceText(node.key, text.replace(name, caseConverter(name)))
      })
    }

    function isIgnoredAttribute (value) {
      const isIgnored = ignoredAttributes.some(function (attr) {
        return value.indexOf(attr) !== -1
      })

      if (isIgnored) {
        return true
      }

      return useHyphenated ? value.toLowerCase() === value : !/-/.test(value)
    }

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return utils.defineTemplateBodyVisitor(context, {
      VAttribute (node) {
        if (!utils.isCustomComponent(node.parent.parent)) return

        const name = !node.directive ? node.key.rawName : node.key.name === 'bind' ? node.key.raw.argument : false
        if (!name || isIgnoredAttribute(name)) return

        reportIssue(node, name)
      }
    })
  }
}


/***/ }),

/***/ 729:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

const HTML_ELEMENT_NAMES = new Set(__webpack_require__(730))
const VOID_ELEMENT_NAMES = new Set(__webpack_require__(731))
const assert = __webpack_require__(26)
const vueEslintParser = __webpack_require__(732)

// ------------------------------------------------------------------------------
// Exports
// ------------------------------------------------------------------------------

module.exports = {
  /**
   * Register the given visitor to parser services.
   * If the parser service of `vue-eslint-parser` was not found,
   * this generates a warning.
   *
   * @param {RuleContext} context The rule context to use parser services.
   * @param {Object} templateBodyVisitor The visitor to traverse the template body.
   * @param {Object} [scriptVisitor] The visitor to traverse the script.
   * @returns {Object} The merged visitor.
   */
  defineTemplateBodyVisitor (context, templateBodyVisitor, scriptVisitor) {
    if (context.parserServices.defineTemplateBodyVisitor == null) {
      context.report({
        loc: { line: 1, column: 0 },
        message: 'Use the latest vue-eslint-parser. See also https://github.com/vuejs/eslint-plugin-vue#what-is-the-use-the-latest-vue-eslint-parser-error'
      })
      return {}
    }
    return context.parserServices.defineTemplateBodyVisitor(templateBodyVisitor, scriptVisitor)
  },

  /**
   * Check whether the given node is the root element or not.
   * @param {ASTNode} node The element node to check.
   * @returns {boolean} `true` if the node is the root element.
   */
  isRootElement (node) {
    assert(node && node.type === 'VElement')

    return (
      node.parent.type === 'VDocumentFragment' ||
      node.parent.parent.type === 'VDocumentFragment'
    )
  },

  /**
   * Get the previous sibling element of the given element.
   * @param {ASTNode} node The element node to get the previous sibling element.
   * @returns {ASTNode|null} The previous sibling element.
   */
  prevSibling (node) {
    assert(node && node.type === 'VElement')
    let prevElement = null

    for (const siblingNode of (node.parent && node.parent.children) || []) {
      if (siblingNode === node) {
        return prevElement
      }
      if (siblingNode.type === 'VElement') {
        prevElement = siblingNode
      }
    }

    return null
  },

  /**
   * Finds attribute in the given start tag
   * @param {ASTNode} node The start tag node to check.
   * @param {string} name The attribute name to check.
   * @param {string} [value] The attribute value to check.
   * @returns {ASTNode} attribute node
   */
  findAttribute (node, name, value) {
    assert(node && node.type === 'VElement')
    return node.startTag.attributes.find(attr => (
      !attr.directive &&
      attr.key.name === name &&
      (
        value === undefined ||
        (attr.value != null && attr.value.value === value)
      )
    ))
  },

  /**
   * Check whether the given start tag has specific directive.
   * @param {ASTNode} node The start tag node to check.
   * @param {string} name The attribute name to check.
   * @param {string} [value] The attribute value to check.
   * @returns {boolean} `true` if the start tag has the attribute.
   */
  hasAttribute (node, name, value) {
    assert(node && node.type === 'VElement')
    return Boolean(this.findAttribute(node, name, value))
  },

  /**
   * Finds directive in the given start tag
   * @param {ASTNode} node The start tag node to check.
   * @param {string} name The directive name to check.
   * @param {string} [argument] The directive argument to check.
   * @returns {ASTNode} directive node
   */
  findDirective (node, name, argument) {
    assert(node && node.type === 'VElement')
    return node.startTag.attributes.find(a =>
      a.directive &&
      a.key.name === name &&
      (argument === undefined || a.key.argument === argument)
    )
  },

  /**
   * Check whether the given start tag has specific directive.
   * @param {ASTNode} node The start tag node to check.
   * @param {string} name The directive name to check.
   * @param {string} [argument] The directive argument to check.
   * @returns {boolean} `true` if the start tag has the directive.
   */
  hasDirective (node, name, argument) {
    assert(node && node.type === 'VElement')
    return Boolean(this.findDirective(node, name, argument))
  },

  /**
   * Check whether the given attribute has their attribute value.
   * @param {ASTNode} node The attribute node to check.
   * @returns {boolean} `true` if the attribute has their value.
   */
  hasAttributeValue (node) {
    assert(node && node.type === 'VAttribute')
    return (
      node.value != null &&
      (node.value.expression != null || node.value.syntaxError != null)
    )
  },

  /**
   * Get the attribute which has the given name.
   * @param {ASTNode} node The start tag node to check.
   * @param {string} name The attribute name to check.
   * @param {string} [value] The attribute value to check.
   * @returns {ASTNode} The found attribute.
   */
  getAttribute (node, name, value) {
    assert(node && node.type === 'VElement')
    return node.startTag.attributes.find(a =>
      !a.directive &&
      a.key.name === name &&
      (
        value === undefined ||
        (a.value != null && a.value.value === value)
      )
    )
  },

  /**
   * Get the directive which has the given name.
   * @param {ASTNode} node The start tag node to check.
   * @param {string} name The directive name to check.
   * @param {string} [argument] The directive argument to check.
   * @returns {ASTNode} The found directive.
   */
  getDirective (node, name, argument) {
    assert(node && node.type === 'VElement')
    return node.startTag.attributes.find(a =>
      a.directive &&
      a.key.name === name &&
      (argument === undefined || a.key.argument === argument)
    )
  },

  /**
   * Returns the list of all registered components
   * @param {ASTNode} componentObject
   * @returns {Array} Array of ASTNodes
   */
  getRegisteredComponents (componentObject) {
    const componentsNode = componentObject.properties
      .find(p =>
        p.type === 'Property' &&
        p.key.type === 'Identifier' &&
        p.key.name === 'components' &&
        p.value.type === 'ObjectExpression'
      )

    if (!componentsNode) { return [] }

    return componentsNode.value.properties
      .filter(p => p.type === 'Property')
      .map(node => ({
        node,
        name: this.getStaticPropertyName(node.key)
      }))
  },

  /**
   * Check whether the previous sibling element has `if` or `else-if` directive.
   * @param {ASTNode} node The element node to check.
   * @returns {boolean} `true` if the previous sibling element has `if` or `else-if` directive.
   */
  prevElementHasIf (node) {
    assert(node && node.type === 'VElement')

    const prev = this.prevSibling(node)
    return (
      prev != null &&
      prev.startTag.attributes.some(a =>
        a.directive &&
        (a.key.name === 'if' || a.key.name === 'else-if')
      )
    )
  },

  /**
   * Check whether the given node is a custom component or not.
   * @param {ASTNode} node The start tag node to check.
   * @returns {boolean} `true` if the node is a custom component.
   */
  isCustomComponent (node) {
    assert(node && node.type === 'VElement')

    return (
      (this.isHtmlElementNode(node) && !this.isHtmlWellKnownElementName(node.name)) ||
      this.hasAttribute(node, 'is') ||
      this.hasDirective(node, 'bind', 'is')
    )
  },

  /**
   * Check whether the given node is a HTML element or not.
   * @param {ASTNode} node The node to check.
   * @returns {boolean} `true` if the node is a HTML element.
   */
  isHtmlElementNode (node) {
    assert(node && node.type === 'VElement')

    return node.namespace === vueEslintParser.AST.NS.HTML
  },

  /**
   * Check whether the given node is a SVG element or not.
   * @param {ASTNode} node The node to check.
   * @returns {boolean} `true` if the name is a SVG element.
   */
  isSvgElementNode (node) {
    assert(node && node.type === 'VElement')

    return node.namespace === vueEslintParser.AST.NS.SVG
  },

  /**
   * Check whether the given name is a MathML element or not.
   * @param {ASTNode} name The node to check.
   * @returns {boolean} `true` if the node is a MathML element.
   */
  isMathMLElementNode (node) {
    assert(node && node.type === 'VElement')

    return node.namespace === vueEslintParser.AST.NS.MathML
  },

  /**
   * Check whether the given name is an well-known element or not.
   * @param {string} name The name to check.
   * @returns {boolean} `true` if the name is an well-known element name.
   */
  isHtmlWellKnownElementName (name) {
    assert(typeof name === 'string')

    return HTML_ELEMENT_NAMES.has(name.toLowerCase())
  },

  /**
   * Check whether the given name is a void element name or not.
   * @param {string} name The name to check.
   * @returns {boolean} `true` if the name is a void element name.
   */
  isHtmlVoidElementName (name) {
    assert(typeof name === 'string')

    return VOID_ELEMENT_NAMES.has(name.toLowerCase())
  },

  /**
   * Parse member expression node to get array with all of its parts
   * @param {ASTNode} MemberExpression
   * @returns {Array}
   */
  parseMemberExpression (node) {
    const members = []
    let memberExpression

    if (node.type === 'MemberExpression') {
      memberExpression = node

      while (memberExpression.type === 'MemberExpression') {
        if (memberExpression.property.type === 'Identifier') {
          members.push(memberExpression.property.name)
        }
        memberExpression = memberExpression.object
      }

      if (memberExpression.type === 'ThisExpression') {
        members.push('this')
      } else if (memberExpression.type === 'Identifier') {
        members.push(memberExpression.name)
      }
    }

    return members.reverse()
  },

  /**
   * Gets the property name of a given node.
   * @param {ASTNode} node - The node to get.
   * @return {string|null} The property name if static. Otherwise, null.
   */
  getStaticPropertyName (node) {
    let prop
    switch (node && node.type) {
      case 'Property':
      case 'MethodDefinition':
        prop = node.key
        break
      case 'MemberExpression':
        prop = node.property
        break
      case 'Literal':
      case 'TemplateLiteral':
      case 'Identifier':
        prop = node
        break
      // no default
    }

    switch (prop && prop.type) {
      case 'Literal':
        return String(prop.value)
      case 'TemplateLiteral':
        if (prop.expressions.length === 0 && prop.quasis.length === 1) {
          return prop.quasis[0].value.cooked
        }
        break
      case 'Identifier':
        if (!node.computed) {
          return prop.name
        }
        break
      // no default
    }

    return null
  },

  /**
   * Get all computed properties by looking at all component's properties
   * @param {ObjectExpression} Object with component definition
   * @return {Array} Array of computed properties in format: [{key: String, value: ASTNode}]
   */
  getComputedProperties (componentObject) {
    const computedPropertiesNode = componentObject.properties
      .find(p =>
        p.type === 'Property' &&
        p.key.type === 'Identifier' &&
        p.key.name === 'computed' &&
        p.value.type === 'ObjectExpression'
      )

    if (!computedPropertiesNode) { return [] }

    return computedPropertiesNode.value.properties
      .filter(cp => cp.type === 'Property')
      .map(cp => {
        const key = cp.key.name
        let value

        if (cp.value.type === 'FunctionExpression') {
          value = cp.value.body
        } else if (cp.value.type === 'ObjectExpression') {
          value = cp.value.properties
            .filter(p =>
              p.type === 'Property' &&
              p.key.type === 'Identifier' &&
              p.key.name === 'get' &&
              p.value.type === 'FunctionExpression'
            )
            .map(p => p.value.body)[0]
        }

        return { key, value }
      })
  },

  /**
   * Check whether the given node is a Vue component based
   * on the filename and default export type
   * export default {} in .vue || .jsx
   * @param {ASTNode} node Node to check
   * @param {string} path File name with extension
   * @returns {boolean}
   */
  isVueComponentFile (node, path) {
    const isVueFile = path.endsWith('.vue') || path.endsWith('.jsx')
    return isVueFile &&
      node.type === 'ExportDefaultDeclaration' &&
      node.declaration.type === 'ObjectExpression'
  },

  /**
   * Check whether given node is Vue component
   * Vue.component('xxx', {}) || component('xxx', {})
   * @param {ASTNode} node Node to check
   * @returns {boolean}
   */
  isVueComponent (node) {
    const callee = node.callee

    const isFullVueComponent = node.type === 'CallExpression' &&
      callee.type === 'MemberExpression' &&
      callee.object.type === 'Identifier' &&
      callee.object.name === 'Vue' &&
      callee.property.type === 'Identifier' &&
      ['component', 'mixin', 'extend'].indexOf(callee.property.name) > -1 &&
      node.arguments.length >= 1 &&
      node.arguments.slice(-1)[0].type === 'ObjectExpression'

    const isDestructedVueComponent = node.type === 'CallExpression' &&
      callee.type === 'Identifier' &&
      callee.name === 'component' &&
      node.arguments.length >= 1 &&
      node.arguments.slice(-1)[0].type === 'ObjectExpression'

    return isFullVueComponent || isDestructedVueComponent
  },

  /**
   * Check whether given node is new Vue instance
   * new Vue({})
   * @param {ASTNode} node Node to check
   * @returns {boolean}
   */
  isVueInstance (node) {
    const callee = node.callee
    return node.type === 'NewExpression' &&
      callee.type === 'Identifier' &&
      callee.name === 'Vue' &&
      node.arguments.length &&
      node.arguments[0].type === 'ObjectExpression'
  },

  /**
   * Check if current file is a Vue instance or component and call callback
   * @param {RuleContext} context The ESLint rule context object.
   * @param {Function} cb Callback function
   */
  executeOnVue (context, cb) {
    return Object.assign(
      this.executeOnVueComponent(context, cb),
      this.executeOnVueInstance(context, cb)
    )
  },

  /**
   * Check if current file is a Vue instance (new Vue) and call callback
   * @param {RuleContext} context The ESLint rule context object.
   * @param {Function} cb Callback function
   */
  executeOnVueInstance (context, cb) {
    const _this = this

    return {
      'NewExpression:exit' (node) {
        // new Vue({})
        if (!_this.isVueInstance(node)) return
        cb(node.arguments[0])
      }
    }
  },

  /**
   * Check if current file is a Vue component and call callback
   * @param {RuleContext} context The ESLint rule context object.
   * @param {Function} cb Callback function
   */
  executeOnVueComponent (context, cb) {
    const filePath = context.getFilename()
    const sourceCode = context.getSourceCode()
    const _this = this
    const componentComments = sourceCode.getAllComments().filter(comment => /@vue\/component/g.test(comment.value))
    const foundNodes = []

    const isDuplicateNode = (node) => {
      if (foundNodes.some(el => el.loc.start.line === node.loc.start.line)) return true
      foundNodes.push(node)
      return false
    }

    return {
      'ObjectExpression:exit' (node) {
        if (!componentComments.some(el => el.loc.end.line === node.loc.start.line - 1) || isDuplicateNode(node)) return
        cb(node)
      },
      'ExportDefaultDeclaration:exit' (node) {
        // export default {} in .vue || .jsx
        if (!_this.isVueComponentFile(node, filePath) || isDuplicateNode(node.declaration)) return
        cb(node.declaration)
      },
      'CallExpression:exit' (node) {
        // Vue.component('xxx', {}) || component('xxx', {})
        if (!_this.isVueComponent(node) || isDuplicateNode(node.arguments.slice(-1)[0])) return
        cb(node.arguments.slice(-1)[0])
      }
    }
  },

  /**
   * Return generator with all properties
   * @param {ASTNode} node Node to check
   * @param {string} groupName Name of parent group
   */
  * iterateProperties (node, groups) {
    const nodes = node.properties.filter(p => p.type === 'Property' && groups.has(this.getStaticPropertyName(p.key)))
    for (const item of nodes) {
      const name = this.getStaticPropertyName(item.key)
      if (!name) continue

      if (item.value.type === 'ArrayExpression') {
        yield * this.iterateArrayExpression(item.value, name)
      } else if (item.value.type === 'ObjectExpression') {
        yield * this.iterateObjectExpression(item.value, name)
      } else if (item.value.type === 'FunctionExpression') {
        yield * this.iterateFunctionExpression(item.value, name)
      }
    }
  },

  /**
   * Return generator with all elements inside ArrayExpression
   * @param {ASTNode} node Node to check
   * @param {string} groupName Name of parent group
   */
  * iterateArrayExpression (node, groupName) {
    assert(node.type === 'ArrayExpression')
    for (const item of node.elements) {
      const name = this.getStaticPropertyName(item)
      if (name) {
        const obj = { name, groupName, node: item }
        yield obj
      }
    }
  },

  /**
   * Return generator with all elements inside ObjectExpression
   * @param {ASTNode} node Node to check
   * @param {string} groupName Name of parent group
   */
  * iterateObjectExpression (node, groupName) {
    assert(node.type === 'ObjectExpression')
    for (const item of node.properties) {
      const name = this.getStaticPropertyName(item)
      if (name) {
        const obj = { name, groupName, node: item.key }
        yield obj
      }
    }
  },

  /**
   * Return generator with all elements inside FunctionExpression
   * @param {ASTNode} node Node to check
   * @param {string} groupName Name of parent group
   */
  * iterateFunctionExpression (node, groupName) {
    assert(node.type === 'FunctionExpression')
    if (node.body.type === 'BlockStatement') {
      for (const item of node.body.body) {
        if (item.type === 'ReturnStatement' && item.argument && item.argument.type === 'ObjectExpression') {
          yield * this.iterateObjectExpression(item.argument, groupName)
        }
      }
    }
  },

  /**
   * Find all functions which do not always return values
   * @param {boolean} treatUndefinedAsUnspecified
   * @param {Function} cb Callback function
   */
  executeOnFunctionsWithoutReturn (treatUndefinedAsUnspecified, cb) {
    let funcInfo = {
      funcInfo: null,
      codePath: null,
      hasReturn: false,
      hasReturnValue: false,
      node: null
    }

    function isValidReturn () {
      if (!funcInfo.hasReturn) {
        return false
      }
      return !treatUndefinedAsUnspecified || funcInfo.hasReturnValue
    }

    return {
      onCodePathStart (codePath, node) {
        funcInfo = {
          codePath,
          funcInfo: funcInfo,
          hasReturn: false,
          hasReturnValue: false,
          node
        }
      },
      onCodePathEnd () {
        funcInfo = funcInfo.funcInfo
      },
      ReturnStatement (node) {
        funcInfo.hasReturn = true
        funcInfo.hasReturnValue = Boolean(node.argument)
      },
      'ArrowFunctionExpression:exit' (node) {
        if (!isValidReturn() && !node.expression) {
          cb(funcInfo.node)
        }
      },
      'FunctionExpression:exit' (node) {
        if (!isValidReturn()) {
          cb(funcInfo.node)
        }
      }
    }
  },

  /**
   * Check whether the component is declared in a single line or not.
   * @param {ASTNode} node
   * @returns {boolean}
   */
  isSingleLine (node) {
    return node.loc.start.line === node.loc.end.line
  },

  /**
   * Check whether the templateBody of the program has invalid EOF or not.
   * @param {Program} node The program node to check.
   * @returns {boolean} `true` if it has invalid EOF.
   */
  hasInvalidEOF (node) {
    const body = node.templateBody
    if (body == null || body.errors == null) {
      return
    }
    return body.errors.some(error => typeof error.code === 'string' && error.code.startsWith('eof-'))
  },

  /**
   * Parse CallExpression or MemberExpression to get simplified version without arguments
   *
   * @param  {Object} node The node to parse (MemberExpression | CallExpression)
   * @return {String} eg. 'this.asd.qwe().map().filter().test.reduce()'
   */
  parseMemberOrCallExpression (node) {
    const parsedCallee = []
    let n = node
    let isFunc

    while (n.type === 'MemberExpression' || n.type === 'CallExpression') {
      if (n.type === 'CallExpression') {
        n = n.callee
        isFunc = true
      } else {
        if (n.computed) {
          parsedCallee.push('[]')
        } else if (n.property.type === 'Identifier') {
          parsedCallee.push(n.property.name + (isFunc ? '()' : ''))
        }
        isFunc = false
        n = n.object
      }
    }

    if (n.type === 'Identifier') {
      parsedCallee.push(n.name)
    }

    if (n.type === 'ThisExpression') {
      parsedCallee.push('this')
    }

    return parsedCallee.reverse().join('.').replace(/\.\[/g, '[')
  }
}


/***/ }),

/***/ 730:
/***/ (function(module) {

module.exports = ["html","body","base","head","link","meta","style","title","address","article","aside","footer","header","h1","h2","h3","h4","h5","h6","hgroup","nav","section","div","dd","dl","dt","figcaption","figure","hr","img","li","main","ol","p","pre","ul","a","b","abbr","bdi","bdo","br","cite","code","data","dfn","em","i","kbd","mark","q","rp","rt","rtc","ruby","s","samp","small","span","strong","sub","sup","time","u","var","wbr","area","audio","map","track","video","embed","object","param","source","canvas","script","noscript","del","ins","caption","col","colgroup","table","thead","tbody","tfoot","td","th","tr","button","datalist","fieldset","form","input","label","legend","meter","optgroup","option","output","progress","select","textarea","details","dialog","menu","menuitem","summary","content","element","shadow","template","slot","blockquote","iframe","noframes","picture"];

/***/ }),

/***/ 731:
/***/ (function(module) {

module.exports = ["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr"];

/***/ }),

/***/ 888:
/***/ (function(module, exports, __webpack_require__) {

const assert = __webpack_require__(26)

const invalidChars = /[^a-zA-Z0-9:]+/g

/**
 * Convert text to kebab-case
 * @param {string} str Text to be converted
 * @return {string}
 */
function kebabCase (str) {
  return str
    .replace(/([a-z])([A-Z])/g, match => match[0] + '-' + match[1])
    .replace(invalidChars, '-')
    .toLowerCase()
}

/**
 * Convert text to snake_case
 * @param {string} str Text to be converted
 * @return {string}
 */
function snakeCase (str) {
  return str
    .replace(/([a-z])([A-Z])/g, match => match[0] + '_' + match[1])
    .replace(invalidChars, '_')
    .toLowerCase()
}

/**
 * Convert text to camelCase
 * @param {string} str Text to be converted
 * @return {string} Converted string
 */
function camelCase (str) {
  return str
    .replace(/_/g, (_, index) => index === 0 ? _ : '-')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
      index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    )
    .replace(invalidChars, '')
}

/**
 * Convert text to PascalCase
 * @param {string} str Text to be converted
 * @return {string} Converted string
 */
function pascalCase (str) {
  return str
    .replace(/_/g, (_, index) => index === 0 ? _ : '-')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => letter.toUpperCase())
    .replace(invalidChars, '')
}

const convertersMap = {
  'kebab-case': kebabCase,
  'snake_case': snakeCase,
  'camelCase': camelCase,
  'PascalCase': pascalCase
}

module.exports = {
  allowedCaseOptions: [
    'camelCase',
    'kebab-case',
    'PascalCase'
  ],

  /**
   * Return case converter
   * @param {string} name type of converter to return ('camelCase', 'kebab-case', 'PascalCase')
   * @return {kebabCase|camelCase|pascalCase}
   */
  getConverter (name) {
    assert(typeof name === 'string')

    return convertersMap[name] || pascalCase
  },

  camelCase,
  pascalCase,
  kebabCase,
  snakeCase
}


/***/ }),

/***/ 889:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview enforce ordering of attributes
 * @author Erin Depew
 */

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

function getAttributeType (name, isDirective) {
  if (isDirective) {
    if (name === 'for') {
      return 'LIST_RENDERING'
    } else if (name === 'if' || name === 'else-if' || name === 'else' || name === 'show' || name === 'cloak') {
      return 'CONDITIONALS'
    } else if (name === 'pre' || name === 'once') {
      return 'RENDER_MODIFIERS'
    } else if (name === 'model') {
      return 'TWO_WAY_BINDING'
    } else if (name === 'on') {
      return 'EVENTS'
    } else if (name === 'html' || name === 'text') {
      return 'CONTENT'
    } else {
      return 'OTHER_DIRECTIVES'
    }
  } else {
    if (name === 'is') {
      return 'DEFINITION'
    } else if (name === 'id') {
      return 'GLOBAL'
    } else if (name === 'ref' || name === 'key' || name === 'slot' || name === 'slot-scope') {
      return 'UNIQUE'
    } else {
      return 'OTHER_ATTR'
    }
  }
}
function getPosition (attribute, attributePosition) {
  const attributeType = attribute.directive && attribute.key.name === 'bind'
    ? getAttributeType(attribute.key.argument, false)
    : getAttributeType(attribute.key.name, attribute.directive)
  return attributePosition.hasOwnProperty(attributeType) ? attributePosition[attributeType] : -1
}

function create (context) {
  const sourceCode = context.getSourceCode()
  let attributeOrder = ['DEFINITION', 'LIST_RENDERING', 'CONDITIONALS', 'RENDER_MODIFIERS', 'GLOBAL', 'UNIQUE', 'TWO_WAY_BINDING', 'OTHER_DIRECTIVES', 'OTHER_ATTR', 'EVENTS', 'CONTENT']
  if (context.options[0] && context.options[0].order) {
    attributeOrder = context.options[0].order
  }
  const attributePosition = {}
  attributeOrder.forEach((item, i) => {
    if (item instanceof Array) {
      item.forEach((attr) => {
        attributePosition[attr] = i
      })
    } else attributePosition[item] = i
  })
  let currentPosition
  let previousNode

  function reportIssue (node, previousNode) {
    const currentNode = sourceCode.getText(node.key)
    const prevNode = sourceCode.getText(previousNode.key)
    context.report({
      node: node.key,
      loc: node.loc,
      message: `Attribute "${currentNode}" should go before "${prevNode}".`,
      data: {
        currentNode
      },

      fix (fixer) {
        const attributes = node.parent.attributes
        const shiftAttrs = attributes.slice(attributes.indexOf(previousNode), attributes.indexOf(node) + 1)

        // If we can upgrade requirements to `eslint@>4.1.0`, this code can be replaced by:
        // return shiftAttrs.map((attr, i) => {
        //   const text = attr === previousNode ? sourceCode.getText(node) : sourceCode.getText(shiftAttrs[i - 1])
        //   return fixer.replaceText(attr, text)
        // })
        const replaceDataList = shiftAttrs.map((attr, i) => {
          const text = attr === previousNode ? sourceCode.getText(node) : sourceCode.getText(shiftAttrs[i - 1])
          return {
            range: attr.range,
            text
          }
        })
        const replaceRange = [previousNode.range[0], node.range[1]]
        let text = sourceCode.text.slice(replaceRange[0], replaceRange[1])
        replaceDataList.reverse().forEach((data) => {
          const textRange = data.range.map(r => r - replaceRange[0])
          text = text.slice(0, textRange[0]) + data.text + text.slice(textRange[1], text.length)
        })
        return fixer.replaceTextRange(replaceRange, text)
      }
    })
  }

  return utils.defineTemplateBodyVisitor(context, {
    'VStartTag' () {
      currentPosition = -1
      previousNode = null
    },
    'VAttribute' (node) {
      if ((currentPosition === -1) || (currentPosition <= getPosition(node, attributePosition))) {
        currentPosition = getPosition(node, attributePosition)
        previousNode = node
      } else {
        reportIssue(node, previousNode)
      }
    }
  })
}

module.exports = {
  meta: {
    docs: {
      description: 'enforce order of attributes',
      category: 'recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/attributes-order.md'
    },
    fixable: 'code',
    schema: {
      type: 'array',
      properties: {
        order: {
          items: {
            type: 'string'
          },
          maxItems: 10,
          minItems: 10
        }
      }
    }
  },
  create
}


/***/ }),

/***/ 890:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 */
/* eslint-disable eslint-plugin/report-message-format, consistent-docs-description */



// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const COMMENT_DIRECTIVE_B = /^\s*(eslint-(?:en|dis)able)(?:\s+(\S|\S[\s\S]*\S))?\s*$/
const COMMENT_DIRECTIVE_L = /^\s*(eslint-disable(?:-next)?-line)(?:\s+(\S|\S[\s\S]*\S))?\s*$/

/**
 * Parse a given comment.
 * @param {RegExp} pattern The RegExp pattern to parse.
 * @param {string} comment The comment value to parse.
 * @returns {({type:string,rules:string[]})|null} The parsing result.
 */
function parse (pattern, comment) {
  const match = pattern.exec(comment)
  if (match == null) {
    return null
  }

  const type = match[1]
  const rules = (match[2] || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)

  return { type, rules }
}

/**
 * Enable rules.
 * @param {RuleContext} context The rule context.
 * @param {{line:number,column:number}} loc The location information to enable.
 * @param {string} group The group to enable.
 * @param {string[]} rules The rule IDs to enable.
 * @returns {void}
 */
function enable (context, loc, group, rules) {
  if (rules.length === 0) {
    context.report({ loc, message: '++ {{group}}', data: { group }})
  } else {
    context.report({ loc, message: '+ {{group}} {{rules}}', data: { group, rules: rules.join(' ') }})
  }
}

/**
 * Disable rules.
 * @param {RuleContext} context The rule context.
 * @param {{line:number,column:number}} loc The location information to disable.
 * @param {string} group The group to disable.
 * @param {string[]} rules The rule IDs to disable.
 * @returns {void}
 */
function disable (context, loc, group, rules) {
  if (rules.length === 0) {
    context.report({ loc, message: '-- {{group}}', data: { group }})
  } else {
    context.report({ loc, message: '- {{group}} {{rules}}', data: { group, rules: rules.join(' ') }})
  }
}

/**
 * Process a given comment token.
 * If the comment is `eslint-disable` or `eslint-enable` then it reports the comment.
 * @param {RuleContext} context The rule context.
 * @param {Token} comment The comment token to process.
 * @returns {void}
 */
function processBlock (context, comment) {
  const parsed = parse(COMMENT_DIRECTIVE_B, comment.value)
  if (parsed != null) {
    if (parsed.type === 'eslint-disable') {
      disable(context, comment.loc.start, 'block', parsed.rules)
    } else {
      enable(context, comment.loc.start, 'block', parsed.rules)
    }
  }
}

/**
 * Process a given comment token.
 * If the comment is `eslint-disable-line` or `eslint-disable-next-line` then it reports the comment.
 * @param {RuleContext} context The rule context.
 * @param {Token} comment The comment token to process.
 * @returns {void}
 */
function processLine (context, comment) {
  const parsed = parse(COMMENT_DIRECTIVE_L, comment.value)
  if (parsed != null && comment.loc.start.line === comment.loc.end.line) {
    const line = comment.loc.start.line + (parsed.type === 'eslint-disable-line' ? 0 : 1)
    const column = -1
    disable(context, { line, column }, 'line', parsed.rules)
    enable(context, { line: line + 1, column }, 'line', parsed.rules)
  }
}

// -----------------------------------------------------------------------------
// Rule Definition
// -----------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'support comment-directives in `<template>`',
      category: 'base',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/comment-directive.md'
    },
    schema: []
  },

  create (context) {
    return {
      Program (node) {
        if (!node.templateBody) {
          return
        }

        // Send directives to the post-process.
        for (const comment of node.templateBody.comments) {
          processBlock(context, comment)
          processLine(context, comment)
        }

        // Send a clear mark to the post-process.
        context.report({
          loc: node.templateBody.loc.end,
          message: 'clear'
        })
      }
    }
  }
}


/***/ }),

/***/ 891:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Yosuke Ota
 * issue https://github.com/vuejs/eslint-plugin-vue/issues/250
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)
const casing = __webpack_require__(888)

const allowedCaseOptions = ['PascalCase', 'kebab-case']
const defaultCase = 'PascalCase'

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce specific casing for the component naming style in template',
      category: undefined, // strongly-recommended
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/component-name-in-template-casing.md'
    },
    fixable: 'code',
    schema: [
      {
        enum: allowedCaseOptions
      },
      {
        type: 'object',
        properties: {
          ignores: {
            type: 'array',
            items: { type: 'string' },
            uniqueItems: true,
            additionalItems: false
          }
        },
        additionalProperties: false
      }
    ]
  },

  create (context) {
    const caseOption = context.options[0]
    const options = context.options[1] || {}
    const caseType = allowedCaseOptions.indexOf(caseOption) !== -1 ? caseOption : defaultCase
    const ignores = options.ignores || []
    const tokens = context.parserServices.getTemplateBodyTokenStore && context.parserServices.getTemplateBodyTokenStore()
    const sourceCode = context.getSourceCode()

    let hasInvalidEOF = false

    return utils.defineTemplateBodyVisitor(context, {
      'VElement' (node) {
        if (hasInvalidEOF) {
          return
        }

        if (!utils.isCustomComponent(node)) {
          return
        }

        const name = node.rawName
        if (ignores.indexOf(name) >= 0) {
          return
        }
        const casingName = casing.getConverter(caseType)(name)
        if (casingName !== name) {
          const startTag = node.startTag
          const open = tokens.getFirstToken(startTag)

          context.report({
            node: open,
            loc: open.loc,
            message: 'Component name "{{name}}" is not {{caseType}}.',
            data: {
              name,
              caseType
            },
            fix: fixer => {
              const endTag = node.endTag
              if (!endTag) {
                return fixer.replaceText(open, `<${casingName}`)
              }
              const endTagOpen = tokens.getFirstToken(endTag)
              // If we can upgrade requirements to `eslint@>4.1.0`, this code can be replaced by:
              // return [
              //   fixer.replaceText(open, `<${casingName}`),
              //   fixer.replaceText(endTagOpen, `</${casingName}`)
              // ]
              const code = `<${casingName}${sourceCode.text.slice(open.range[1], endTagOpen.range[0])}</${casingName}`
              return fixer.replaceTextRange([open.range[0], endTagOpen.range[1]], code)
            }
          })
        }
      }
    }, {
      Program (node) {
        hasInvalidEOF = utils.hasInvalidEOF(node)
      }
    })
  }
}


/***/ }),

/***/ 892:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

function getPhrase (lineBreaks) {
  switch (lineBreaks) {
    case 0: return 'no line breaks'
    case 1: return '1 line break'
    default: return `${lineBreaks} line breaks`
  }
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "require or disallow a line break before tag's closing brackets",
      category: 'strongly-recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/html-closing-bracket-newline.md'
    },
    fixable: 'whitespace',
    schema: [{
      type: 'object',
      properties: {
        'singleline': { enum: ['always', 'never'] },
        'multiline': { enum: ['always', 'never'] }
      },
      additionalProperties: false
    }]
  },

  create (context) {
    const options = Object.assign({}, {
      singleline: 'never',
      multiline: 'always'
    }, context.options[0] || {})
    const template = context.parserServices.getTemplateBodyTokenStore && context.parserServices.getTemplateBodyTokenStore()

    return utils.defineTemplateBodyVisitor(context, {
      'VStartTag, VEndTag' (node) {
        const closingBracketToken = template.getLastToken(node)
        if (closingBracketToken.type !== 'HTMLSelfClosingTagClose' && closingBracketToken.type !== 'HTMLTagClose') {
          return
        }

        const prevToken = template.getTokenBefore(closingBracketToken)
        const type = (node.loc.start.line === prevToken.loc.end.line) ? 'singleline' : 'multiline'
        const expectedLineBreaks = (options[type] === 'always') ? 1 : 0
        const actualLineBreaks = (closingBracketToken.loc.start.line - prevToken.loc.end.line)

        if (actualLineBreaks !== expectedLineBreaks) {
          context.report({
            node,
            loc: {
              start: prevToken.loc.end,
              end: closingBracketToken.loc.start
            },
            message: 'Expected {{expected}} before closing bracket, but {{actual}} found.',
            data: {
              expected: getPhrase(expectedLineBreaks),
              actual: getPhrase(actualLineBreaks)
            },
            fix (fixer) {
              const range = [prevToken.range[1], closingBracketToken.range[0]]
              const text = '\n'.repeat(expectedLineBreaks)
              return fixer.replaceTextRange(range, text)
            }
          })
        }
      }
    })
  }
}


/***/ }),

/***/ 893:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 */



// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const utils = __webpack_require__(729)

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/**
 * Normalize options.
 * @param {{startTag?:"always"|"never",endTag?:"always"|"never",selfClosingTag?:"always"|"never"}} options The options user configured.
 * @param {TokenStore} tokens The token store of template body.
 * @returns {{startTag:"always"|"never",endTag:"always"|"never",selfClosingTag:"always"|"never"}} The normalized options.
 */
function parseOptions (options, tokens) {
  return Object.assign({
    startTag: 'never',
    endTag: 'never',
    selfClosingTag: 'always',

    detectType (node) {
      const openType = tokens.getFirstToken(node).type
      const closeType = tokens.getLastToken(node).type

      if (openType === 'HTMLEndTagOpen' && closeType === 'HTMLTagClose') {
        return this.endTag
      }
      if (openType === 'HTMLTagOpen' && closeType === 'HTMLTagClose') {
        return this.startTag
      }
      if (openType === 'HTMLTagOpen' && closeType === 'HTMLSelfClosingTagClose') {
        return this.selfClosingTag
      }
      return null
    }
  }, options)
}

// -----------------------------------------------------------------------------
// Rule Definition
// -----------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'require or disallow a space before tag\'s closing brackets',
      category: 'strongly-recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/html-closing-bracket-spacing.md'
    },
    schema: [{
      type: 'object',
      properties: {
        startTag: { enum: ['always', 'never'] },
        endTag: { enum: ['always', 'never'] },
        selfClosingTag: { enum: ['always', 'never'] }
      },
      additionalProperties: false
    }],
    fixable: 'whitespace'
  },

  create (context) {
    const sourceCode = context.getSourceCode()
    const tokens =
      context.parserServices.getTemplateBodyTokenStore &&
      context.parserServices.getTemplateBodyTokenStore()
    const options = parseOptions(context.options[0], tokens)

    return utils.defineTemplateBodyVisitor(context, {
      'VStartTag, VEndTag' (node) {
        const type = options.detectType(node)
        const lastToken = tokens.getLastToken(node)
        const prevToken = tokens.getLastToken(node, 1)

        // Skip if EOF exists in the tag or linebreak exists before `>`.
        if (type == null || prevToken == null || prevToken.loc.end.line !== lastToken.loc.start.line) {
          return
        }

        // Check and report.
        const hasSpace = (prevToken.range[1] !== lastToken.range[0])
        if (type === 'always' && !hasSpace) {
          context.report({
            node,
            loc: lastToken.loc,
            message: "Expected a space before '{{bracket}}', but not found.",
            data: { bracket: sourceCode.getText(lastToken) },
            fix: (fixer) => fixer.insertTextBefore(lastToken, ' ')
          })
        } else if (type === 'never' && hasSpace) {
          context.report({
            node,
            loc: {
              start: prevToken.loc.end,
              end: lastToken.loc.end
            },
            message: "Expected no space before '{{bracket}}', but found.",
            data: { bracket: sourceCode.getText(lastToken) },
            fix: (fixer) => fixer.removeRange([prevToken.range[1], lastToken.range[0]])
          })
        }
      }
    })
  }
}


/***/ }),

/***/ 894:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce end tag style',
      category: 'strongly-recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/html-end-tags.md'
    },
    fixable: 'code',
    schema: []
  },

  create (context) {
    let hasInvalidEOF = false

    return utils.defineTemplateBodyVisitor(context, {
      VElement (node) {
        if (hasInvalidEOF) {
          return
        }

        const name = node.name
        const isVoid = utils.isHtmlVoidElementName(name)
        const isSelfClosing = node.startTag.selfClosing
        const hasEndTag = node.endTag != null

        if (!isVoid && !hasEndTag && !isSelfClosing) {
          context.report({
            node: node.startTag,
            loc: node.startTag.loc,
            message: "'<{{name}}>' should have end tag.",
            data: { name },
            fix: (fixer) => fixer.insertTextAfter(node, `</${name}>`)
          })
        }
      }
    }, {
      Program (node) {
        hasInvalidEOF = utils.hasInvalidEOF(node)
      }
    })
  }
}


/***/ }),

/***/ 895:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const indentCommon = __webpack_require__(896)
const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  create (context) {
    const tokenStore =
      context.parserServices.getTemplateBodyTokenStore &&
      context.parserServices.getTemplateBodyTokenStore()
    const visitor = indentCommon.defineVisitor(context, tokenStore, { baseIndent: 1 })

    return utils.defineTemplateBodyVisitor(context, visitor)
  },
  meta: {
    docs: {
      description: 'enforce consistent indentation in `<template>`',
      category: 'strongly-recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/html-indent.md'
    },
    fixable: 'whitespace',
    schema: [
      {
        anyOf: [
          { type: 'integer', minimum: 1 },
          { enum: ['tab'] }
        ]
      },
      {
        type: 'object',
        properties: {
          'attribute': { type: 'integer', minimum: 0 },
          'closeBracket': { type: 'integer', minimum: 0 },
          'switchCase': { type: 'integer', minimum: 0 },
          'alignAttributesVertically': { type: 'boolean' },
          'ignores': {
            type: 'array',
            items: {
              allOf: [
                { type: 'string' },
                { not: { type: 'string', pattern: ':exit$' }},
                { not: { type: 'string', pattern: '^\\s*$' }}
              ]
            },
            uniqueItems: true,
            additionalItems: false
          }
        },
        additionalProperties: false
      }
    ]
  }
}


/***/ }),

/***/ 896:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const assert = __webpack_require__(26)

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

const KNOWN_NODES = new Set(['ArrayExpression', 'ArrayPattern', 'ArrowFunctionExpression', 'AssignmentExpression', 'AssignmentPattern', 'AwaitExpression', 'BinaryExpression', 'BlockStatement', 'BreakStatement', 'CallExpression', 'CatchClause', 'ClassBody', 'ClassDeclaration', 'ClassExpression', 'ConditionalExpression', 'ContinueStatement', 'DebuggerStatement', 'DoWhileStatement', 'EmptyStatement', 'ExperimentalRestProperty', 'ExperimentalSpreadProperty', 'ExportAllDeclaration', 'ExportDefaultDeclaration', 'ExportNamedDeclaration', 'ExportSpecifier', 'ExpressionStatement', 'ForInStatement', 'ForOfStatement', 'ForStatement', 'FunctionDeclaration', 'FunctionExpression', 'Identifier', 'IfStatement', 'ImportDeclaration', 'ImportDefaultSpecifier', 'ImportNamespaceSpecifier', 'ImportSpecifier', 'LabeledStatement', 'Literal', 'LogicalExpression', 'MemberExpression', 'MetaProperty', 'MethodDefinition', 'NewExpression', 'ObjectExpression', 'ObjectPattern', 'Program', 'Property', 'RestElement', 'ReturnStatement', 'SequenceExpression', 'SpreadElement', 'Super', 'SwitchCase', 'SwitchStatement', 'TaggedTemplateExpression', 'TemplateElement', 'TemplateLiteral', 'ThisExpression', 'ThrowStatement', 'TryStatement', 'UnaryExpression', 'UpdateExpression', 'VariableDeclaration', 'VariableDeclarator', 'WhileStatement', 'WithStatement', 'YieldExpression', 'VAttribute', 'VDirectiveKey', 'VDocumentFragment', 'VElement', 'VEndTag', 'VExpressionContainer', 'VForExpression', 'VIdentifier', 'VLiteral', 'VOnExpression', 'VSlotScopeExpression', 'VStartTag', 'VText'])
const LT_CHAR = /[\r\n\u2028\u2029]/
const LINES = /[^\r\n\u2028\u2029]+(?:$|\r\n|[\r\n\u2028\u2029])/g
const BLOCK_COMMENT_PREFIX = /^\s*\*/
const TRIVIAL_PUNCTUATOR = /^[(){}[\],;]$/

/**
 * Normalize options.
 * @param {number|"tab"|undefined} type The type of indentation.
 * @param {Object} options Other options.
 * @param {Object} defaultOptions The default value of options.
 * @returns {{indentChar:" "|"\t",indentSize:number,baseIndent:number,attribute:number,closeBracket:number,switchCase:number,alignAttributesVertically:boolean,ignores:string[]}} Normalized options.
 */
function parseOptions (type, options, defaultOptions) {
  const ret = Object.assign({
    indentChar: ' ',
    indentSize: 2,
    baseIndent: 0,
    attribute: 1,
    closeBracket: 0,
    switchCase: 0,
    alignAttributesVertically: true,
    ignores: []
  }, defaultOptions)

  if (Number.isSafeInteger(type)) {
    ret.indentSize = type
  } else if (type === 'tab') {
    ret.indentChar = '\t'
    ret.indentSize = 1
  }

  if (Number.isSafeInteger(options.baseIndent)) {
    ret.baseIndent = options.baseIndent
  }
  if (Number.isSafeInteger(options.attribute)) {
    ret.attribute = options.attribute
  }
  if (Number.isSafeInteger(options.closeBracket)) {
    ret.closeBracket = options.closeBracket
  }
  if (Number.isSafeInteger(options.switchCase)) {
    ret.switchCase = options.switchCase
  }

  if (options.alignAttributesVertically != null) {
    ret.alignAttributesVertically = options.alignAttributesVertically
  }
  if (options.ignores != null) {
    ret.ignores = options.ignores
  }

  return ret
}

/**
 * Check whether the given token is an arrow.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the token is an arrow.
 */
function isArrow (token) {
  return token != null && token.type === 'Punctuator' && token.value === '=>'
}

/**
 * Check whether the given token is a left parenthesis.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the token is a left parenthesis.
 */
function isLeftParen (token) {
  return token != null && token.type === 'Punctuator' && token.value === '('
}

/**
 * Check whether the given token is a left parenthesis.
 * @param {Token} token The token to check.
 * @returns {boolean} `false` if the token is a left parenthesis.
 */
function isNotLeftParen (token) {
  return token != null && (token.type !== 'Punctuator' || token.value !== '(')
}

/**
 * Check whether the given token is a right parenthesis.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the token is a right parenthesis.
 */
function isRightParen (token) {
  return token != null && token.type === 'Punctuator' && token.value === ')'
}

/**
 * Check whether the given token is a right parenthesis.
 * @param {Token} token The token to check.
 * @returns {boolean} `false` if the token is a right parenthesis.
 */
function isNotRightParen (token) {
  return token != null && (token.type !== 'Punctuator' || token.value !== ')')
}

/**
 * Check whether the given token is a left brace.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the token is a left brace.
 */
function isLeftBrace (token) {
  return token != null && token.type === 'Punctuator' && token.value === '{'
}

/**
 * Check whether the given token is a right brace.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the token is a right brace.
 */
function isRightBrace (token) {
  return token != null && token.type === 'Punctuator' && token.value === '}'
}

/**
 * Check whether the given token is a left bracket.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the token is a left bracket.
 */
function isLeftBracket (token) {
  return token != null && token.type === 'Punctuator' && token.value === '['
}

/**
 * Check whether the given token is a right bracket.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the token is a right bracket.
 */
function isRightBracket (token) {
  return token != null && token.type === 'Punctuator' && token.value === ']'
}

/**
 * Check whether the given token is a semicolon.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the token is a semicolon.
 */
function isSemicolon (token) {
  return token != null && token.type === 'Punctuator' && token.value === ';'
}

/**
 * Check whether the given token is a comma.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the token is a comma.
 */
function isComma (token) {
  return token != null && token.type === 'Punctuator' && token.value === ','
}

/**
 * Check whether the given token is a whitespace.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the token is a whitespace.
 */
function isNotWhitespace (token) {
  return token != null && token.type !== 'HTMLWhitespace'
}

/**
 * Check whether the given token is a comment.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the token is a comment.
 */
function isComment (token) {
  return token != null && (token.type === 'Block' || token.type === 'Line' || token.type === 'Shebang' || token.type.endsWith('Comment'))
}

/**
 * Check whether the given token is a comment.
 * @param {Token} token The token to check.
 * @returns {boolean} `false` if the token is a comment.
 */
function isNotComment (token) {
  return token != null && token.type !== 'Block' && token.type !== 'Line' && token.type !== 'Shebang' && !token.type.endsWith('Comment')
}

/**
 * Get the last element.
 * @param {Array} xs The array to get the last element.
 * @returns {any|undefined} The last element or undefined.
 */
function last (xs) {
  return xs.length === 0 ? undefined : xs[xs.length - 1]
}

/**
 * Check whether the node is at the beginning of line.
 * @param {Node} node The node to check.
 * @param {number} index The index of the node in the nodes.
 * @param {Node[]} nodes The array of nodes.
 * @returns {boolean} `true` if the node is at the beginning of line.
 */
function isBeginningOfLine (node, index, nodes) {
  if (node != null) {
    for (let i = index - 1; i >= 0; --i) {
      const prevNode = nodes[i]
      if (prevNode == null) {
        continue
      }

      return node.loc.start.line !== prevNode.loc.end.line
    }
  }
  return false
}

/**
 * Check whether a given token is a closing token which triggers unindent.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the token is a closing token.
 */
function isClosingToken (token) {
  return token != null && (
    token.type === 'HTMLEndTagOpen' ||
    token.type === 'VExpressionEnd' ||
    (
      token.type === 'Punctuator' &&
      (
        token.value === ')' ||
        token.value === '}' ||
        token.value === ']'
      )
    )
  )
}

/**
 * Check whether a given token is trivial or not.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the token is trivial.
 */
function isTrivialToken (token) {
  return token != null && (
    (token.type === 'Punctuator' && TRIVIAL_PUNCTUATOR.test(token.value)) ||
    token.type === 'HTMLTagOpen' ||
    token.type === 'HTMLEndTagOpen' ||
    token.type === 'HTMLTagClose' ||
    token.type === 'HTMLSelfClosingTagClose'
  )
}

/**
 * Creates AST event handlers for html-indent.
 *
 * @param {RuleContext} context The rule context.
 * @param {TokenStore} tokenStore The token store object to get tokens.
 * @param {Object} defaultOptions The default value of options.
 * @returns {object} AST event handlers.
 */
module.exports.defineVisitor = function create (context, tokenStore, defaultOptions) {
  if (!context.getFilename().endsWith('.vue')) return {}

  const options = parseOptions(context.options[0], context.options[1] || {}, defaultOptions)
  const sourceCode = context.getSourceCode()
  const offsets = new Map()

  /**
   * Set offset to the given tokens.
   * @param {Token|Token[]} token The token to set.
   * @param {number} offset The offset of the tokens.
   * @param {Token} baseToken The token of the base offset.
   * @param {boolean} [trivial=false] The flag for trivial tokens.
   * @returns {void}
   */
  function setOffset (token, offset, baseToken) {
    assert(baseToken != null, "'baseToken' should not be null or undefined.")

    if (Array.isArray(token)) {
      for (const t of token) {
        offsets.set(t, {
          baseToken,
          offset,
          baseline: false,
          expectedIndent: undefined
        })
      }
    } else {
      offsets.set(token, {
        baseToken,
        offset,
        baseline: false,
        expectedIndent: undefined
      })
    }
  }

  /**
   * Set baseline flag to the given token.
   * @param {Token} token The token to set.
   * @returns {void}
   */
  function setBaseline (token, hardTabAdditional) {
    const offsetInfo = offsets.get(token)
    if (offsetInfo != null) {
      offsetInfo.baseline = true
    }
  }

  /**
   * Get the first and last tokens of the given node.
   * If the node is parenthesized, this gets the outermost parentheses.
   * @param {Node} node The node to get.
   * @param {number} [borderOffset] The least offset of the first token. Defailt is 0. This value is used to prevent false positive in the following case: `(a) => {}` The parentheses are enclosing the whole parameter part rather than the first parameter, but this offset parameter is needed to distinguish.
   * @returns {{firstToken:Token,lastToken:Token}} The gotten tokens.
   */
  function getFirstAndLastTokens (node, borderOffset) {
    borderOffset |= 0

    let firstToken = tokenStore.getFirstToken(node)
    let lastToken = tokenStore.getLastToken(node)

    // Get the outermost left parenthesis if it's parenthesized.
    let t, u
    while ((t = tokenStore.getTokenBefore(firstToken)) != null && (u = tokenStore.getTokenAfter(lastToken)) != null && isLeftParen(t) && isRightParen(u) && t.range[0] >= borderOffset) {
      firstToken = t
      lastToken = u
    }

    return { firstToken, lastToken }
  }

  /**
   * Process the given node list.
   * The first node is offsetted from the given left token.
   * Rest nodes are adjusted to the first node.
   * @param {Node[]} nodeList The node to process.
   * @param {Node|null} leftToken The left parenthesis token.
   * @param {Node|null} rightToken The right parenthesis token.
   * @param {number} offset The offset to set.
   * @param {Node} [alignVertically=true] The flag to align vertically. If `false`, this doesn't align vertically even if the first node is not at beginning of line.
   * @returns {void}
   */
  function processNodeList (nodeList, leftToken, rightToken, offset, alignVertically) {
    let t

    if (nodeList.length >= 1) {
      let lastToken = leftToken
      const alignTokens = []

      for (let i = 0; i < nodeList.length; ++i) {
        const node = nodeList[i]
        if (node == null) {
          // Holes of an array.
          continue
        }
        const elementTokens = getFirstAndLastTokens(node, lastToken != null ? lastToken.range[1] : 0)

        // Collect related tokens.
        // Commas between this and the previous, and the first token of this node.
        if (lastToken != null) {
          t = lastToken
          while ((t = tokenStore.getTokenAfter(t)) != null && t.range[1] <= elementTokens.firstToken.range[0]) {
            alignTokens.push(t)
          }
        }
        alignTokens.push(elementTokens.firstToken)

        // Save the last token to find tokens between the next token.
        lastToken = elementTokens.lastToken
      }

      // Check trailing commas.
      if (rightToken != null && lastToken != null) {
        t = lastToken
        while ((t = tokenStore.getTokenAfter(t)) != null && t.range[1] <= rightToken.range[0]) {
          alignTokens.push(t)
        }
      }

      // Set offsets.
      const baseToken = alignTokens.shift()
      if (baseToken != null) {
        // Set offset to the first token.
        if (leftToken != null) {
          setOffset(baseToken, offset, leftToken)
        }

        // Set baseline.
        if (nodeList.some(isBeginningOfLine)) {
          setBaseline(baseToken)
        }

        if (alignVertically === false) {
          // Align tokens relatively to the left token.
          setOffset(alignTokens, offset, leftToken)
        } else {
          // Align the rest tokens to the first token.
          setOffset(alignTokens, 0, baseToken)
        }
      }
    }

    if (rightToken != null) {
      setOffset(rightToken, 0, leftToken)
    }
  }

  /**
   * Process the given node as body.
   * The body node maybe a block statement or an expression node.
   * @param {Node} node The body node to process.
   * @param {Token} baseToken The base token.
   * @returns {void}
   */
  function processMaybeBlock (node, baseToken) {
    const firstToken = getFirstAndLastTokens(node).firstToken
    setOffset(firstToken, isLeftBrace(firstToken) ? 0 : 1, baseToken)
  }

  /**
   * Collect prefix tokens of the given property.
   * The prefix includes `async`, `get`, `set`, `static`, and `*`.
   * @param {Property|MethodDefinition} node The property node to collect prefix tokens.
   */
  function getPrefixTokens (node) {
    const prefixes = []

    let token = tokenStore.getFirstToken(node)
    while (token != null && token.range[1] <= node.key.range[0]) {
      prefixes.push(token)
      token = tokenStore.getTokenAfter(token)
    }
    while (isLeftParen(last(prefixes)) || isLeftBracket(last(prefixes))) {
      prefixes.pop()
    }

    return prefixes
  }

  /**
   * Find the head of chaining nodes.
   * @param {Node} node The start node to find the head.
   * @returns {Token} The head token of the chain.
   */
  function getChainHeadToken (node) {
    const type = node.type
    while (node.parent.type === type) {
      node = node.parent
    }
    return tokenStore.getFirstToken(node)
  }

  /**
   * Check whether a given token is the first token of:
   *
   * - ExpressionStatement
   * - VExpressionContainer
   * - A parameter of CallExpression/NewExpression
   * - An element of ArrayExpression
   * - An expression of SequenceExpression
   *
   * @param {Token} token The token to check.
   * @param {Node} belongingNode The node that the token is belonging to.
   * @returns {boolean} `true` if the token is the first token of an element.
   */
  function isBeginningOfElement (token, belongingNode) {
    let node = belongingNode

    while (node != null) {
      const parent = node.parent
      const t = parent && parent.type
      if (t != null && (t.endsWith('Statement') || t.endsWith('Declaration'))) {
        return parent.range[0] === token.range[0]
      }
      if (t === 'VExpressionContainer') {
        return node.range[0] === token.range[0]
      }
      if (t === 'CallExpression' || t === 'NewExpression') {
        const openParen = tokenStore.getTokenAfter(parent.callee, isNotRightParen)
        return parent.arguments.some(param =>
          getFirstAndLastTokens(param, openParen.range[1]).firstToken.range[0] === token.range[0]
        )
      }
      if (t === 'ArrayExpression') {
        return parent.elements.some(element =>
          element != null &&
          getFirstAndLastTokens(element).firstToken.range[0] === token.range[0]
        )
      }
      if (t === 'SequenceExpression') {
        return parent.expressions.some(expr =>
          getFirstAndLastTokens(expr).firstToken.range[0] === token.range[0]
        )
      }

      node = parent
    }

    return false
  }

  /**
   * Set the base indentation to a given top-level AST node.
   * @param {Node} node The node to set.
   * @param {number} expectedIndent The number of expected indent.
   * @returns {void}
   */
  function processTopLevelNode (node, expectedIndent) {
    const token = tokenStore.getFirstToken(node)
    const offsetInfo = offsets.get(token)
    if (offsetInfo != null) {
      offsetInfo.expectedIndent = expectedIndent
    } else {
      offsets.set(token, { baseToken: null, offset: 0, baseline: false, expectedIndent })
    }
  }

  /**
   * Ignore all tokens of the given node.
   * @param {Node} node The node to ignore.
   * @returns {void}
   */
  function ignore (node) {
    for (const token of tokenStore.getTokens(node)) {
      offsets.delete(token)
    }
  }

  /**
   * Define functions to ignore nodes into the given visitor.
   * @param {Object} visitor The visitor to define functions to ignore nodes.
   * @returns {Object} The visitor.
   */
  function processIgnores (visitor) {
    for (const ignorePattern of options.ignores) {
      const key = `${ignorePattern}:exit`

      if (visitor.hasOwnProperty(key)) {
        const handler = visitor[key]
        visitor[key] = function (node) {
          const ret = handler.apply(this, arguments)
          ignore(node)
          return ret
        }
      } else {
        visitor[key] = ignore
      }
    }

    return visitor
  }

  /**
   * Calculate correct indentation of the line of the given tokens.
   * @param {Token[]} tokens Tokens which are on the same line.
   * @returns {number} Correct indentation. If it failed to calculate then `Number.MAX_SAFE_INTEGER`.
   */
  function getExpectedIndent (tokens) {
    const trivial = isTrivialToken(tokens[0])
    let expectedIndent = Number.MAX_SAFE_INTEGER

    for (let i = 0; i < tokens.length; ++i) {
      const token = tokens[i]
      const offsetInfo = offsets.get(token)

      // If the first token is not trivial then ignore trivial following tokens.
      if (offsetInfo != null && (trivial || !isTrivialToken(token))) {
        if (offsetInfo.expectedIndent != null) {
          expectedIndent = Math.min(expectedIndent, offsetInfo.expectedIndent)
        } else {
          const baseOffsetInfo = offsets.get(offsetInfo.baseToken)
          if (baseOffsetInfo != null && baseOffsetInfo.expectedIndent != null && (i === 0 || !baseOffsetInfo.baseline)) {
            expectedIndent = Math.min(expectedIndent, baseOffsetInfo.expectedIndent + offsetInfo.offset * options.indentSize)
            if (baseOffsetInfo.baseline) {
              break
            }
          }
        }
      }
    }

    return expectedIndent
  }

  /**
   * Get the text of the indentation part of the line which the given token is on.
   * @param {Token} firstToken The first token on a line.
   * @returns {string} The text of indentation part.
   */
  function getIndentText (firstToken) {
    const text = sourceCode.text
    let i = firstToken.range[0] - 1

    while (i >= 0 && !LT_CHAR.test(text[i])) {
      i -= 1
    }

    return text.slice(i + 1, firstToken.range[0])
  }

  /**
   * Define the function which fixes the problem.
   * @param {Token} token The token to fix.
   * @param {number} actualIndent The number of actual indentaion.
   * @param {number} expectedIndent The number of expected indentation.
   * @returns {Function} The defined function.
   */
  function defineFix (token, actualIndent, expectedIndent) {
    if (token.type === 'Block' && token.loc.start.line !== token.loc.end.line) {
      // Fix indentation in multiline block comments.
      const lines = sourceCode.getText(token).match(LINES)
      const firstLine = lines.shift()
      if (lines.every(l => BLOCK_COMMENT_PREFIX.test(l))) {
        return fixer => {
          const range = [token.range[0] - actualIndent, token.range[1]]
          const indent = options.indentChar.repeat(expectedIndent)

          return fixer.replaceTextRange(
            range,
            `${indent}${firstLine}${lines.map(l => l.replace(BLOCK_COMMENT_PREFIX, `${indent} *`)).join('')}`
          )
        }
      }
    }

    return fixer => {
      const range = [token.range[0] - actualIndent, token.range[0]]
      const indent = options.indentChar.repeat(expectedIndent)
      return fixer.replaceTextRange(range, indent)
    }
  }

  /**
   * Validate the given token with the pre-calculated expected indentation.
   * @param {Token} token The token to validate.
   * @param {number} expectedIndent The expected indentation.
   * @param {number|undefined} optionalExpectedIndent The optional expected indentation.
   * @returns {void}
   */
  function validateCore (token, expectedIndent, optionalExpectedIndent) {
    const line = token.loc.start.line
    const indentText = getIndentText(token)

    // If there is no line terminator after the `<script>` start tag,
    // `indentText` contains non-whitespace characters.
    // In that case, do nothing in order to prevent removing the `<script>` tag.
    if (indentText.trim() !== '') {
      return
    }

    const actualIndent = token.loc.start.column
    const unit = (options.indentChar === '\t' ? 'tab' : 'space')

    for (let i = 0; i < indentText.length; ++i) {
      if (indentText[i] !== options.indentChar) {
        context.report({
          loc: {
            start: { line, column: i },
            end: { line, column: i + 1 }
          },
          message: 'Expected {{expected}} character, but found {{actual}} character.',
          data: {
            expected: JSON.stringify(options.indentChar),
            actual: JSON.stringify(indentText[i])
          },
          fix: defineFix(token, actualIndent, expectedIndent)
        })
        return
      }
    }

    if (actualIndent !== expectedIndent && (optionalExpectedIndent === undefined || actualIndent !== optionalExpectedIndent)) {
      context.report({
        loc: {
          start: { line, column: 0 },
          end: { line, column: actualIndent }
        },
        message: 'Expected indentation of {{expectedIndent}} {{unit}}{{expectedIndentPlural}} but found {{actualIndent}} {{unit}}{{actualIndentPlural}}.',
        data: {
          expectedIndent,
          actualIndent,
          unit,
          expectedIndentPlural: (expectedIndent === 1) ? '' : 's',
          actualIndentPlural: (actualIndent === 1) ? '' : 's'
        },
        fix: defineFix(token, actualIndent, expectedIndent)
      })
    }
  }

  /**
   * Get the expected indent of comments.
   * @param {Token|null} nextToken The next token of comments.
   * @param {number|undefined} nextExpectedIndent The expected indent of the next token.
   * @param {number|undefined} lastExpectedIndent The expected indent of the last token.
   * @returns {{primary:number|undefined,secondary:number|undefined}}
   */
  function getCommentExpectedIndents (nextToken, nextExpectedIndent, lastExpectedIndent) {
    if (typeof lastExpectedIndent === 'number' && isClosingToken(nextToken)) {
      if (nextExpectedIndent === lastExpectedIndent) {
        // For solo comment. E.g.,
        // <div>
        //    <!-- comment -->
        // </div>
        return {
          primary: nextExpectedIndent + options.indentSize,
          secondary: undefined
        }
      }

      // For last comment. E.g.,
      // <div>
      //    <div></div>
      //    <!-- comment -->
      // </div>
      return { primary: lastExpectedIndent, secondary: nextExpectedIndent }
    }

    // Adjust to next normally. E.g.,
    // <div>
    //    <!-- comment -->
    //    <div></div>
    // </div>
    return { primary: nextExpectedIndent, secondary: undefined }
  }

  /**
   * Validate indentation of the line that the given tokens are on.
   * @param {Token[]} tokens The tokens on the same line to validate.
   * @param {Token[]} comments The comments which are on the immediately previous lines of the tokens.
   * @param {Token|null} lastToken The last validated token. Comments can adjust to the token.
   * @returns {void}
   */
  function validate (tokens, comments, lastToken) {
    // Calculate and save expected indentation.
    const firstToken = tokens[0]
    const actualIndent = firstToken.loc.start.column
    const expectedIndent = getExpectedIndent(tokens)
    if (expectedIndent === Number.MAX_SAFE_INTEGER) {
      return
    }

    // Debug log
    // console.log('line', firstToken.loc.start.line, '=', { actualIndent, expectedIndent }, 'from:')
    // for (const token of tokens) {
    //   const offsetInfo = offsets.get(token)
    //   if (offsetInfo == null) {
    //     console.log('    ', JSON.stringify(sourceCode.getText(token)), 'is unknown.')
    //   } else if (offsetInfo.expectedIndent != null) {
    //     console.log('    ', JSON.stringify(sourceCode.getText(token)), 'is fixed at', offsetInfo.expectedIndent, '.')
    //   } else {
    //     const baseOffsetInfo = offsets.get(offsetInfo.baseToken)
    //     console.log('    ', JSON.stringify(sourceCode.getText(token)), 'is', offsetInfo.offset, 'offset from ', JSON.stringify(sourceCode.getText(offsetInfo.baseToken)), '( line:', offsetInfo.baseToken && offsetInfo.baseToken.loc.start.line, ', indent:', baseOffsetInfo && baseOffsetInfo.expectedIndent, ', baseline:', baseOffsetInfo && baseOffsetInfo.baseline, ')')
    //   }
    // }

    // Save.
    const baseline = new Set()
    for (const token of tokens) {
      const offsetInfo = offsets.get(token)
      if (offsetInfo != null) {
        if (offsetInfo.baseline) {
          // This is a baseline token, so the expected indent is the column of this token.
          if (options.indentChar === ' ') {
            offsetInfo.expectedIndent = Math.max(0, token.loc.start.column + expectedIndent - actualIndent)
          } else {
            // In hard-tabs mode, it cannot align tokens strictly, so use one additional offset.
            // But the additional offset isn't needed if it's at the beginning of the line.
            offsetInfo.expectedIndent = expectedIndent + (token === tokens[0] ? 0 : 1)
          }
          baseline.add(token)
        } else if (baseline.has(offsetInfo.baseToken)) {
          // The base token is a baseline token on this line, so inherit it.
          offsetInfo.expectedIndent = offsets.get(offsetInfo.baseToken).expectedIndent
          baseline.add(token)
        } else {
          // Otherwise, set the expected indent of this line.
          offsetInfo.expectedIndent = expectedIndent
        }
      }
    }

    // Calculate the expected indents for comments.
    // It allows the same indent level with the previous line.
    const lastOffsetInfo = offsets.get(lastToken)
    const lastExpectedIndent = lastOffsetInfo && lastOffsetInfo.expectedIndent
    const commentExpectedIndents = getCommentExpectedIndents(firstToken, expectedIndent, lastExpectedIndent)

    // Validate.
    for (const comment of comments) {
      validateCore(comment, commentExpectedIndents.primary, commentExpectedIndents.secondary)
    }
    validateCore(firstToken, expectedIndent)
  }

  // ------------------------------------------------------------------------------
  // Main
  // ------------------------------------------------------------------------------

  return processIgnores({
    VAttribute (node) {
      const keyToken = tokenStore.getFirstToken(node)
      const eqToken = tokenStore.getFirstToken(node, 1)

      if (eqToken != null) {
        setOffset(eqToken, 1, keyToken)

        const valueToken = tokenStore.getFirstToken(node, 2)
        if (valueToken != null) {
          setOffset(valueToken, 1, keyToken)
        }
      }
    },

    VElement (node) {
      const startTagToken = tokenStore.getFirstToken(node)
      const endTagToken = node.endTag && tokenStore.getFirstToken(node.endTag)

      if (node.name !== 'pre') {
        const childTokens = node.children.map(n => tokenStore.getFirstToken(n))
        setOffset(childTokens, 1, startTagToken)
      }
      setOffset(endTagToken, 0, startTagToken)
    },

    VEndTag (node) {
      const openToken = tokenStore.getFirstToken(node)
      const closeToken = tokenStore.getLastToken(node)

      if (closeToken.type.endsWith('TagClose')) {
        setOffset(closeToken, options.closeBracket, openToken)
      }
    },

    VExpressionContainer (node) {
      if (node.expression != null && node.range[0] !== node.expression.range[0]) {
        const startQuoteToken = tokenStore.getFirstToken(node)
        const endQuoteToken = tokenStore.getLastToken(node)
        const childToken = tokenStore.getTokenAfter(startQuoteToken)

        setOffset(childToken, 1, startQuoteToken)
        setOffset(endQuoteToken, 0, startQuoteToken)
      }
    },

    VForExpression (node) {
      const firstToken = tokenStore.getFirstToken(node)
      const lastOfLeft = last(node.left) || firstToken
      const inToken = tokenStore.getTokenAfter(lastOfLeft, isNotRightParen)
      const rightToken = tokenStore.getFirstToken(node.right)

      if (isLeftParen(firstToken)) {
        const rightToken = tokenStore.getTokenAfter(lastOfLeft, isRightParen)
        processNodeList(node.left, firstToken, rightToken, 1)
      }
      setOffset(inToken, 1, firstToken)
      setOffset(rightToken, 1, inToken)
    },

    VOnExpression (node) {
      processNodeList(node.body, null, null, 0)
    },

    VStartTag (node) {
      const openToken = tokenStore.getFirstToken(node)
      const closeToken = tokenStore.getLastToken(node)

      processNodeList(
        node.attributes,
        openToken,
        null,
        options.attribute,
        options.alignAttributesVertically
      )
      if (closeToken != null && closeToken.type.endsWith('TagClose')) {
        setOffset(closeToken, options.closeBracket, openToken)
      }
    },

    VText (node) {
      const tokens = tokenStore.getTokens(node, isNotWhitespace)
      const firstTokenInfo = offsets.get(tokenStore.getFirstToken(node))

      for (const token of tokens) {
        offsets.set(token, firstTokenInfo)
      }
    },

    'ArrayExpression, ArrayPattern' (node) {
      processNodeList(node.elements, tokenStore.getFirstToken(node), tokenStore.getLastToken(node), 1)
    },

    ArrowFunctionExpression (node) {
      const firstToken = tokenStore.getFirstToken(node)
      const secondToken = tokenStore.getTokenAfter(firstToken)
      const leftToken = node.async ? secondToken : firstToken
      const arrowToken = tokenStore.getTokenBefore(node.body, isArrow)

      if (node.async) {
        setOffset(secondToken, 1, firstToken)
      }
      if (isLeftParen(leftToken)) {
        const rightToken = tokenStore.getTokenAfter(last(node.params) || leftToken, isRightParen)
        processNodeList(node.params, leftToken, rightToken, 1)
      }

      setOffset(arrowToken, 1, firstToken)
      processMaybeBlock(node.body, firstToken)
    },

    'AssignmentExpression, AssignmentPattern, BinaryExpression, LogicalExpression' (node) {
      const leftToken = getChainHeadToken(node)
      const opToken = tokenStore.getTokenAfter(node.left, isNotRightParen)
      const rightToken = tokenStore.getTokenAfter(opToken)
      const prevToken = tokenStore.getTokenBefore(leftToken)
      const shouldIndent = (
        prevToken == null ||
        prevToken.loc.end.line === leftToken.loc.start.line ||
        isBeginningOfElement(leftToken, node)
      )

      setOffset([opToken, rightToken], shouldIndent ? 1 : 0, leftToken)
    },

    'AwaitExpression, RestElement, SpreadElement, UnaryExpression' (node) {
      const firstToken = tokenStore.getFirstToken(node)
      const nextToken = tokenStore.getTokenAfter(firstToken)

      setOffset(nextToken, 1, firstToken)
    },

    'BlockStatement, ClassBody' (node) {
      processNodeList(node.body, tokenStore.getFirstToken(node), tokenStore.getLastToken(node), 1)
    },

    'BreakStatement, ContinueStatement, ReturnStatement, ThrowStatement' (node) {
      if (node.argument != null || node.label != null) {
        const firstToken = tokenStore.getFirstToken(node)
        const nextToken = tokenStore.getTokenAfter(firstToken)

        setOffset(nextToken, 1, firstToken)
      }
    },

    CallExpression (node) {
      const firstToken = tokenStore.getFirstToken(node)
      const rightToken = tokenStore.getLastToken(node)
      const leftToken = tokenStore.getTokenAfter(node.callee, isLeftParen)

      setOffset(leftToken, 1, firstToken)
      processNodeList(node.arguments, leftToken, rightToken, 1)
    },

    CatchClause (node) {
      const firstToken = tokenStore.getFirstToken(node)
      const bodyToken = tokenStore.getFirstToken(node.body)

      if (node.param != null) {
        const leftToken = tokenStore.getTokenAfter(firstToken)
        const rightToken = tokenStore.getTokenAfter(node.param)

        setOffset(leftToken, 1, firstToken)
        processNodeList([node.param], leftToken, rightToken, 1)
      }
      setOffset(bodyToken, 0, firstToken)
    },

    'ClassDeclaration, ClassExpression' (node) {
      const firstToken = tokenStore.getFirstToken(node)
      const bodyToken = tokenStore.getFirstToken(node.body)

      if (node.id != null) {
        setOffset(tokenStore.getFirstToken(node.id), 1, firstToken)
      }
      if (node.superClass != null) {
        const extendsToken = tokenStore.getTokenAfter(node.id || firstToken)
        const superClassToken = tokenStore.getTokenAfter(extendsToken)
        setOffset(extendsToken, 1, firstToken)
        setOffset(superClassToken, 1, extendsToken)
      }
      setOffset(bodyToken, 0, firstToken)
    },

    ConditionalExpression (node) {
      const firstToken = tokenStore.getFirstToken(node)
      const questionToken = tokenStore.getTokenAfter(node.test, isNotRightParen)
      const consequentToken = tokenStore.getTokenAfter(questionToken)
      const colonToken = tokenStore.getTokenAfter(node.consequent, isNotRightParen)
      const alternateToken = tokenStore.getTokenAfter(colonToken)
      const isFlat = (node.test.loc.end.line === node.consequent.loc.start.line)

      if (isFlat) {
        setOffset([questionToken, consequentToken, colonToken, alternateToken], 0, firstToken)
      } else {
        setOffset([questionToken, colonToken], 1, firstToken)
        setOffset([consequentToken, alternateToken], 1, questionToken)
      }
    },

    DoWhileStatement (node) {
      const doToken = tokenStore.getFirstToken(node)
      const whileToken = tokenStore.getTokenAfter(node.body, isNotRightParen)
      const leftToken = tokenStore.getTokenAfter(whileToken)
      const testToken = tokenStore.getTokenAfter(leftToken)
      const lastToken = tokenStore.getLastToken(node)
      const rightToken = isSemicolon(lastToken) ? tokenStore.getTokenBefore(lastToken) : lastToken

      processMaybeBlock(node.body, doToken)
      setOffset(whileToken, 0, doToken)
      setOffset(leftToken, 1, whileToken)
      setOffset(testToken, 1, leftToken)
      setOffset(rightToken, 0, leftToken)
    },

    ExportAllDeclaration (node) {
      const tokens = tokenStore.getTokens(node)
      const firstToken = tokens.shift()
      if (isSemicolon(last(tokens))) {
        tokens.pop()
      }
      setOffset(tokens, 1, firstToken)
    },

    ExportDefaultDeclaration (node) {
      const exportToken = tokenStore.getFirstToken(node)
      const defaultToken = tokenStore.getFirstToken(node, 1)
      const declarationToken = getFirstAndLastTokens(node.declaration).firstToken
      setOffset([defaultToken, declarationToken], 1, exportToken)
    },

    ExportNamedDeclaration (node) {
      const exportToken = tokenStore.getFirstToken(node)
      if (node.declaration) {
        // export var foo = 1;
        const declarationToken = tokenStore.getFirstToken(node, 1)
        setOffset(declarationToken, 1, exportToken)
      } else {
        // export {foo, bar}; or export {foo, bar} from "mod";
        const leftParenToken = tokenStore.getFirstToken(node, 1)
        const rightParenToken = tokenStore.getLastToken(node, isRightBrace)
        setOffset(leftParenToken, 0, exportToken)
        processNodeList(node.specifiers, leftParenToken, rightParenToken, 1)

        const maybeFromToken = tokenStore.getTokenAfter(rightParenToken)
        if (maybeFromToken != null && sourceCode.getText(maybeFromToken) === 'from') {
          const fromToken = maybeFromToken
          const nameToken = tokenStore.getTokenAfter(fromToken)
          setOffset([fromToken, nameToken], 1, exportToken)
        }
      }
    },

    ExportSpecifier (node) {
      const tokens = tokenStore.getTokens(node)
      const firstToken = tokens.shift()
      setOffset(tokens, 1, firstToken)
    },

    'ForInStatement, ForOfStatement' (node) {
      const forToken = tokenStore.getFirstToken(node)
      const leftParenToken = tokenStore.getTokenAfter(forToken)
      const leftToken = tokenStore.getTokenAfter(leftParenToken)
      const inToken = tokenStore.getTokenAfter(leftToken, isNotRightParen)
      const rightToken = tokenStore.getTokenAfter(inToken)
      const rightParenToken = tokenStore.getTokenBefore(node.body, isNotLeftParen)

      setOffset(leftParenToken, 1, forToken)
      setOffset(leftToken, 1, leftParenToken)
      setOffset(inToken, 1, leftToken)
      setOffset(rightToken, 1, leftToken)
      setOffset(rightParenToken, 0, leftParenToken)
      processMaybeBlock(node.body, forToken)
    },

    ForStatement (node) {
      const forToken = tokenStore.getFirstToken(node)
      const leftParenToken = tokenStore.getTokenAfter(forToken)
      const rightParenToken = tokenStore.getTokenBefore(node.body, isNotLeftParen)

      setOffset(leftParenToken, 1, forToken)
      processNodeList([node.init, node.test, node.update], leftParenToken, rightParenToken, 1)
      setOffset(rightParenToken, 0, leftParenToken)
      processMaybeBlock(node.body, forToken)
    },

    'FunctionDeclaration, FunctionExpression' (node) {
      const firstToken = tokenStore.getFirstToken(node)
      if (isLeftParen(firstToken)) {
        // Methods.
        const leftToken = firstToken
        const rightToken = tokenStore.getTokenAfter(last(node.params) || leftToken, isRightParen)
        const bodyToken = tokenStore.getFirstToken(node.body)

        processNodeList(node.params, leftToken, rightToken, 1)
        setOffset(bodyToken, 0, tokenStore.getFirstToken(node.parent))
      } else {
        // Normal functions.
        const functionToken = node.async ? tokenStore.getTokenAfter(firstToken) : firstToken
        const starToken = node.generator ? tokenStore.getTokenAfter(functionToken) : null
        const idToken = node.id && tokenStore.getFirstToken(node.id)
        const leftToken = tokenStore.getTokenAfter(idToken || starToken || functionToken)
        const rightToken = tokenStore.getTokenAfter(last(node.params) || leftToken, isRightParen)
        const bodyToken = tokenStore.getFirstToken(node.body)

        if (node.async) {
          setOffset(functionToken, 0, firstToken)
        }
        if (node.generator) {
          setOffset(starToken, 1, firstToken)
        }
        if (node.id != null) {
          setOffset(idToken, 1, firstToken)
        }
        setOffset(leftToken, 1, firstToken)
        processNodeList(node.params, leftToken, rightToken, 1)
        setOffset(bodyToken, 0, firstToken)
      }
    },

    IfStatement (node) {
      const ifToken = tokenStore.getFirstToken(node)
      const ifLeftParenToken = tokenStore.getTokenAfter(ifToken)
      const ifRightParenToken = tokenStore.getTokenBefore(node.consequent, isRightParen)

      setOffset(ifLeftParenToken, 1, ifToken)
      setOffset(ifRightParenToken, 0, ifLeftParenToken)
      processMaybeBlock(node.consequent, ifToken)

      if (node.alternate != null) {
        const elseToken = tokenStore.getTokenAfter(node.consequent, isNotRightParen)

        setOffset(elseToken, 0, ifToken)
        processMaybeBlock(node.alternate, elseToken)
      }
    },

    ImportDeclaration (node) {
      const firstSpecifier = node.specifiers[0]
      const secondSpecifier = node.specifiers[1]
      const importToken = tokenStore.getFirstToken(node)
      const hasSemi = tokenStore.getLastToken(node).value === ';'
      const tokens = [] // tokens to one indent

      if (!firstSpecifier) {
        // There are 2 patterns:
        //     import "foo"
        //     import {} from "foo"
        const secondToken = tokenStore.getFirstToken(node, 1)
        if (isLeftBrace(secondToken)) {
          setOffset(
            [secondToken, tokenStore.getTokenAfter(secondToken)],
            0,
            importToken
          )
          tokens.push(
            tokenStore.getLastToken(node, hasSemi ? 2 : 1), // from
            tokenStore.getLastToken(node, hasSemi ? 1 : 0) // "foo"
          )
        } else {
          tokens.push(tokenStore.getLastToken(node, hasSemi ? 1 : 0))
        }
      } else if (firstSpecifier.type === 'ImportDefaultSpecifier') {
        if (secondSpecifier && secondSpecifier.type === 'ImportNamespaceSpecifier') {
          // There is a pattern:
          //     import Foo, * as foo from "foo"
          tokens.push(
            tokenStore.getFirstToken(firstSpecifier), // Foo
            tokenStore.getTokenAfter(firstSpecifier), // comma
            tokenStore.getFirstToken(secondSpecifier), // *
            tokenStore.getLastToken(node, hasSemi ? 2 : 1), // from
            tokenStore.getLastToken(node, hasSemi ? 1 : 0) // "foo"
          )
        } else {
          // There are 3 patterns:
          //     import Foo from "foo"
          //     import Foo, {} from "foo"
          //     import Foo, {a} from "foo"
          const idToken = tokenStore.getFirstToken(firstSpecifier)
          const nextToken = tokenStore.getTokenAfter(firstSpecifier)
          if (isComma(nextToken)) {
            const leftBrace = tokenStore.getTokenAfter(nextToken)
            const rightBrace = tokenStore.getLastToken(node, hasSemi ? 3 : 2)
            setOffset([idToken, nextToken], 1, importToken)
            setOffset(leftBrace, 0, idToken)
            processNodeList(node.specifiers.slice(1), leftBrace, rightBrace, 1)
            tokens.push(
              tokenStore.getLastToken(node, hasSemi ? 2 : 1), // from
              tokenStore.getLastToken(node, hasSemi ? 1 : 0) // "foo"
            )
          } else {
            tokens.push(
              idToken,
              nextToken, // from
              tokenStore.getTokenAfter(nextToken) // "foo"
            )
          }
        }
      } else if (firstSpecifier.type === 'ImportNamespaceSpecifier') {
        // There is a pattern:
        //     import * as foo from "foo"
        tokens.push(
          tokenStore.getFirstToken(firstSpecifier), // *
          tokenStore.getLastToken(node, hasSemi ? 2 : 1), // from
          tokenStore.getLastToken(node, hasSemi ? 1 : 0) // "foo"
        )
      } else {
        // There is a pattern:
        //     import {a} from "foo"
        const leftBrace = tokenStore.getFirstToken(node, 1)
        const rightBrace = tokenStore.getLastToken(node, hasSemi ? 3 : 2)
        setOffset(leftBrace, 0, importToken)
        processNodeList(node.specifiers, leftBrace, rightBrace, 1)
        tokens.push(
          tokenStore.getLastToken(node, hasSemi ? 2 : 1), // from
          tokenStore.getLastToken(node, hasSemi ? 1 : 0) // "foo"
        )
      }

      setOffset(tokens, 1, importToken)
    },

    ImportSpecifier (node) {
      if (node.local.range[0] !== node.imported.range[0]) {
        const tokens = tokenStore.getTokens(node)
        const firstToken = tokens.shift()
        setOffset(tokens, 1, firstToken)
      }
    },

    ImportNamespaceSpecifier (node) {
      const tokens = tokenStore.getTokens(node)
      const firstToken = tokens.shift()
      setOffset(tokens, 1, firstToken)
    },

    LabeledStatement (node) {
      const labelToken = tokenStore.getFirstToken(node)
      const colonToken = tokenStore.getTokenAfter(labelToken)
      const bodyToken = tokenStore.getTokenAfter(colonToken)

      setOffset([colonToken, bodyToken], 1, labelToken)
    },

    'MemberExpression, MetaProperty' (node) {
      const objectToken = tokenStore.getFirstToken(node)
      if (node.computed) {
        const leftBracketToken = tokenStore.getTokenBefore(node.property, isLeftBracket)
        const propertyToken = tokenStore.getTokenAfter(leftBracketToken)
        const rightBracketToken = tokenStore.getTokenAfter(node.property, isRightBracket)

        setOffset(leftBracketToken, 1, objectToken)
        setOffset(propertyToken, 1, leftBracketToken)
        setOffset(rightBracketToken, 0, leftBracketToken)
      } else {
        const dotToken = tokenStore.getTokenBefore(node.property)
        const propertyToken = tokenStore.getTokenAfter(dotToken)

        setOffset([dotToken, propertyToken], 1, objectToken)
      }
    },

    'MethodDefinition, Property' (node) {
      const isMethod = (node.type === 'MethodDefinition' || node.method === true)
      const prefixTokens = getPrefixTokens(node)
      const hasPrefix = prefixTokens.length >= 1

      for (let i = 1; i < prefixTokens.length; ++i) {
        setOffset(prefixTokens[i], 0, prefixTokens[i - 1])
      }

      let lastKeyToken = null
      if (node.computed) {
        const keyLeftToken = tokenStore.getFirstToken(node, isLeftBracket)
        const keyToken = tokenStore.getTokenAfter(keyLeftToken)
        const keyRightToken = lastKeyToken = tokenStore.getTokenAfter(node.key, isRightBracket)

        if (hasPrefix) {
          setOffset(keyLeftToken, 0, last(prefixTokens))
        }
        setOffset(keyToken, 1, keyLeftToken)
        setOffset(keyRightToken, 0, keyLeftToken)
      } else {
        const idToken = lastKeyToken = tokenStore.getFirstToken(node.key)

        if (hasPrefix) {
          setOffset(idToken, 0, last(prefixTokens))
        }
      }

      if (isMethod) {
        const leftParenToken = tokenStore.getTokenAfter(lastKeyToken)

        setOffset(leftParenToken, 1, lastKeyToken)
      } else if (!node.shorthand) {
        const colonToken = tokenStore.getTokenAfter(lastKeyToken)
        const valueToken = tokenStore.getTokenAfter(colonToken)

        setOffset([colonToken, valueToken], 1, lastKeyToken)
      }
    },

    NewExpression (node) {
      const newToken = tokenStore.getFirstToken(node)
      const calleeToken = tokenStore.getTokenAfter(newToken)
      const rightToken = tokenStore.getLastToken(node)
      const leftToken = isRightParen(rightToken)
        ? tokenStore.getFirstTokenBetween(node.callee, rightToken, isLeftParen)
        : null

      setOffset(calleeToken, 1, newToken)
      if (leftToken != null) {
        setOffset(leftToken, 1, calleeToken)
        processNodeList(node.arguments, leftToken, rightToken, 1)
      }
    },

    'ObjectExpression, ObjectPattern' (node) {
      processNodeList(node.properties, tokenStore.getFirstToken(node), tokenStore.getLastToken(node), 1)
    },

    SequenceExpression (node) {
      processNodeList(node.expressions, null, null, 0)
    },

    SwitchCase (node) {
      const caseToken = tokenStore.getFirstToken(node)

      if (node.test != null) {
        const testToken = tokenStore.getTokenAfter(caseToken)
        const colonToken = tokenStore.getTokenAfter(node.test, isNotRightParen)

        setOffset([testToken, colonToken], 1, caseToken)
      } else {
        const colonToken = tokenStore.getTokenAfter(caseToken)

        setOffset(colonToken, 1, caseToken)
      }

      if (node.consequent.length === 1 && node.consequent[0].type === 'BlockStatement') {
        setOffset(tokenStore.getFirstToken(node.consequent[0]), 0, caseToken)
      } else if (node.consequent.length >= 1) {
        setOffset(tokenStore.getFirstToken(node.consequent[0]), 1, caseToken)
        processNodeList(node.consequent, null, null, 0)
      }
    },

    SwitchStatement (node) {
      const switchToken = tokenStore.getFirstToken(node)
      const leftParenToken = tokenStore.getTokenAfter(switchToken)
      const discriminantToken = tokenStore.getTokenAfter(leftParenToken)
      const leftBraceToken = tokenStore.getTokenAfter(node.discriminant, isLeftBrace)
      const rightParenToken = tokenStore.getTokenBefore(leftBraceToken)
      const rightBraceToken = tokenStore.getLastToken(node)

      setOffset(leftParenToken, 1, switchToken)
      setOffset(discriminantToken, 1, leftParenToken)
      setOffset(rightParenToken, 0, leftParenToken)
      setOffset(leftBraceToken, 0, switchToken)
      processNodeList(node.cases, leftBraceToken, rightBraceToken, options.switchCase)
    },

    TaggedTemplateExpression (node) {
      const tagTokens = getFirstAndLastTokens(node.tag, node.range[0])
      const quasiToken = tokenStore.getTokenAfter(tagTokens.lastToken)

      setOffset(quasiToken, 1, tagTokens.firstToken)
    },

    TemplateLiteral (node) {
      const firstToken = tokenStore.getFirstToken(node)
      const quasiTokens = node.quasis.slice(1).map(n => tokenStore.getFirstToken(n))
      const expressionToken = node.quasis.slice(0, -1).map(n => tokenStore.getTokenAfter(n))

      setOffset(quasiTokens, 0, firstToken)
      setOffset(expressionToken, 1, firstToken)
    },

    TryStatement (node) {
      const tryToken = tokenStore.getFirstToken(node)
      const tryBlockToken = tokenStore.getFirstToken(node.block)

      setOffset(tryBlockToken, 0, tryToken)

      if (node.handler != null) {
        const catchToken = tokenStore.getFirstToken(node.handler)

        setOffset(catchToken, 0, tryToken)
      }

      if (node.finalizer != null) {
        const finallyToken = tokenStore.getTokenBefore(node.finalizer)
        const finallyBlockToken = tokenStore.getFirstToken(node.finalizer)

        setOffset([finallyToken, finallyBlockToken], 0, tryToken)
      }
    },

    UpdateExpression (node) {
      const firstToken = tokenStore.getFirstToken(node)
      const nextToken = tokenStore.getTokenAfter(firstToken)

      setOffset(nextToken, 1, firstToken)
    },

    VariableDeclaration (node) {
      processNodeList(node.declarations, tokenStore.getFirstToken(node), null, 1)
    },

    VariableDeclarator (node) {
      if (node.init != null) {
        const idToken = tokenStore.getFirstToken(node)
        const eqToken = tokenStore.getTokenAfter(node.id)
        const initToken = tokenStore.getTokenAfter(eqToken)

        setOffset([eqToken, initToken], 1, idToken)
      }
    },

    'WhileStatement, WithStatement' (node) {
      const firstToken = tokenStore.getFirstToken(node)
      const leftParenToken = tokenStore.getTokenAfter(firstToken)
      const rightParenToken = tokenStore.getTokenBefore(node.body, isRightParen)

      setOffset(leftParenToken, 1, firstToken)
      setOffset(rightParenToken, 0, leftParenToken)
      processMaybeBlock(node.body, firstToken)
    },

    YieldExpression (node) {
      if (node.argument != null) {
        const yieldToken = tokenStore.getFirstToken(node)

        setOffset(tokenStore.getTokenAfter(yieldToken), 1, yieldToken)
        if (node.delegate) {
          setOffset(tokenStore.getTokenAfter(yieldToken, 1), 1, yieldToken)
        }
      }
    },

    // Process semicolons.
    ':statement' (node) {
      const firstToken = tokenStore.getFirstToken(node)
      const lastToken = tokenStore.getLastToken(node)
      if (isSemicolon(lastToken) && firstToken !== lastToken) {
        setOffset(lastToken, 0, firstToken)
      }

      // Set to the semicolon of the previous token for semicolon-free style.
      // E.g.,
      //   foo
      //   ;[1,2,3].forEach(f)
      const info = offsets.get(firstToken)
      const prevToken = tokenStore.getTokenBefore(firstToken)
      if (info != null && isSemicolon(prevToken) && prevToken.loc.end.line === firstToken.loc.start.line) {
        offsets.set(prevToken, info)
      }
    },

    // Process parentheses.
    // `:expression` does not match with MetaProperty and TemplateLiteral as a bug: https://github.com/estools/esquery/pull/59
    ':expression, MetaProperty, TemplateLiteral' (node) {
      let leftToken = tokenStore.getTokenBefore(node)
      let rightToken = tokenStore.getTokenAfter(node)
      let firstToken = tokenStore.getFirstToken(node)

      while (isLeftParen(leftToken) && isRightParen(rightToken)) {
        setOffset(firstToken, 1, leftToken)
        setOffset(rightToken, 0, leftToken)

        firstToken = leftToken
        leftToken = tokenStore.getTokenBefore(leftToken)
        rightToken = tokenStore.getTokenAfter(rightToken)
      }
    },

    // Ignore tokens of unknown nodes.
    '*:exit' (node) {
      if (!KNOWN_NODES.has(node.type)) {
        ignore(node)
      }
    },

    // Top-level process.
    Program (node) {
      const firstToken = node.tokens[0]
      const isScriptTag = (
        firstToken != null &&
        firstToken.type === 'Punctuator' &&
        firstToken.value === '<script>'
      )
      const baseIndent =
        isScriptTag ? (options.indentSize * options.baseIndent) : 0

      for (const statement of node.body) {
        processTopLevelNode(statement, baseIndent)
      }
    },
    "VElement[parent.type!='VElement']" (node) {
      processTopLevelNode(node, 0)
    },

    // Do validation.
    ":matches(Program, VElement[parent.type!='VElement']):exit" (node) {
      let comments = []
      let tokensOnSameLine = []
      let isBesideMultilineToken = false
      let lastValidatedToken = null

      // Validate indentation of tokens.
      for (const token of tokenStore.getTokens(node, { includeComments: true, filter: isNotWhitespace })) {
        if (tokensOnSameLine.length === 0 || tokensOnSameLine[0].loc.start.line === token.loc.start.line) {
          // This is on the same line (or the first token).
          tokensOnSameLine.push(token)
        } else if (tokensOnSameLine.every(isComment)) {
          // New line is detected, but the all tokens of the previous line are comment.
          // Comment lines are adjusted to the next code line.
          comments.push(tokensOnSameLine[0])
          isBesideMultilineToken = last(tokensOnSameLine).loc.end.line === token.loc.start.line
          tokensOnSameLine = [token]
        } else {
          // New line is detected, so validate the tokens.
          if (!isBesideMultilineToken) {
            validate(tokensOnSameLine, comments, lastValidatedToken)
            lastValidatedToken = tokensOnSameLine[0]
          }
          isBesideMultilineToken = last(tokensOnSameLine).loc.end.line === token.loc.start.line
          tokensOnSameLine = [token]
          comments = []
        }
      }
      if (tokensOnSameLine.length >= 1 && tokensOnSameLine.some(isNotComment)) {
        validate(tokensOnSameLine, comments, lastValidatedToken)
      }
    }
  })
}


/***/ }),

/***/ 897:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce quotes style of HTML attributes',
      category: 'recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/html-quotes.md'
    },
    fixable: 'code',
    schema: [
      { enum: ['double', 'single'] }
    ]
  },

  create (context) {
    const sourceCode = context.getSourceCode()
    const double = context.options[0] !== 'single'
    const quoteChar = double ? '"' : "'"
    const quoteName = double ? 'double quotes' : 'single quotes'
    const quotePattern = double ? /"/g : /'/g
    const quoteEscaped = double ? '&quot;' : '&apos;'
    let hasInvalidEOF

    return utils.defineTemplateBodyVisitor(context, {
      'VAttribute[value!=null]' (node) {
        if (hasInvalidEOF) {
          return
        }

        const text = sourceCode.getText(node.value)
        const firstChar = text[0]

        if (firstChar !== quoteChar) {
          context.report({
            node: node.value,
            loc: node.value.loc,
            message: 'Expected to be enclosed by {{kind}}.',
            data: { kind: quoteName },
            fix (fixer) {
              const contentText = (firstChar === "'" || firstChar === '"') ? text.slice(1, -1) : text
              const replacement = quoteChar + contentText.replace(quotePattern, quoteEscaped) + quoteChar
              return fixer.replaceText(node.value, replacement)
            }
          })
        }
      }
    }, {
      Program (node) {
        hasInvalidEOF = utils.hasInvalidEOF(node)
      }
    })
  }
}


/***/ }),

/***/ 898:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * These strings wil be displayed in error messages.
 */
const ELEMENT_TYPE = Object.freeze({
  NORMAL: 'HTML elements',
  VOID: 'HTML void elements',
  COMPONENT: 'Vue.js custom components',
  SVG: 'SVG elements',
  MATH: 'MathML elements'
})

/**
 * Normalize the given options.
 * @param {Object|undefined} options The raw options object.
 * @returns {Object} Normalized options.
 */
function parseOptions (options) {
  return {
    [ELEMENT_TYPE.NORMAL]: (options && options.html && options.html.normal) || 'always',
    [ELEMENT_TYPE.VOID]: (options && options.html && options.html.void) || 'never',
    [ELEMENT_TYPE.COMPONENT]: (options && options.html && options.html.component) || 'always',
    [ELEMENT_TYPE.SVG]: (options && options.svg) || 'always',
    [ELEMENT_TYPE.MATH]: (options && options.math) || 'always'
  }
}

/**
 * Get the elementType of the given element.
 * @param {VElement} node The element node to get.
 * @returns {string} The elementType of the element.
 */
function getElementType (node) {
  if (utils.isCustomComponent(node)) {
    return ELEMENT_TYPE.COMPONENT
  }
  if (utils.isHtmlElementNode(node)) {
    if (utils.isHtmlVoidElementName(node.name)) {
      return ELEMENT_TYPE.VOID
    }
    return ELEMENT_TYPE.NORMAL
  }
  if (utils.isSvgElementNode(node)) {
    return ELEMENT_TYPE.SVG
  }
  if (utils.isMathMLElementNode(node)) {
    return ELEMENT_TYPE.MATH
  }
  return 'unknown elements'
}

/**
 * Check whether the given element is empty or not.
 * This ignores whitespaces, doesn't ignore comments.
 * @param {VElement} node The element node to check.
 * @param {SourceCode} sourceCode The source code object of the current context.
 * @returns {boolean} `true` if the element is empty.
 */
function isEmpty (node, sourceCode) {
  const start = node.startTag.range[1]
  const end = (node.endTag != null) ? node.endTag.range[0] : node.range[1]

  return sourceCode.text.slice(start, end).trim() === ''
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce self-closing style',
      category: 'strongly-recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.2/docs/rules/html-self-closing.md'
    },
    fixable: 'code',
    schema: {
      definitions: {
        optionValue: {
          enum: ['always', 'never', 'any']
        }
      },
      type: 'array',
      items: [{
        type: 'object',
        properties: {
          html: {
            type: 'object',
            properties: {
              normal: { $ref: '#/definitions/optionValue' },
              void: { $ref: '#/definitions/optionValue' },
              component: { $ref: '#/definitions/optionValue' }
            },
            additionalProperties: false
          },
          svg: { $ref: '#/definitions/optionValue' },
          math: { $ref: '#/definitions/optionValue' }
        },
        additionalProperties: false
      }],
      maxItems: 1
    }
  },

  create (context) {
    const sourceCode = context.getSourceCode()
    const options = parseOptions(context.options[0])
    let hasInvalidEOF = false

    return utils.defineTemplateBodyVisitor(context, {
      'VElement' (node) {
        if (hasInvalidEOF) {
          return
        }

        const elementType = getElementType(node)
        const mode = options[elementType]

        if (mode === 'always' && !node.startTag.selfClosing && isEmpty(node, sourceCode)) {
          context.report({
            node,
            loc: node.loc,
            message: 'Require self-closing on {{elementType}} (<{{name}}>).',
            data: { elementType, name: node.rawName },
            fix: (fixer) => {
              const tokens = context.parserServices.getTemplateBodyTokenStore()
              const close = tokens.getLastToken(node.startTag)
              if (close.type !== 'HTMLTagClose') {
                return null
              }
              return fixer.replaceTextRange([close.range[0], node.range[1]], '/>')
            }
          })
        }

        if (mode === 'never' && node.startTag.selfClosing) {
          context.report({
            node,
            loc: node.loc,
            message: 'Disallow self-closing on {{elementType}} (<{{name}}/>).',
            data: { elementType, name: node.rawName },
            fix: (fixer) => {
              const tokens = context.parserServices.getTemplateBodyTokenStore()
              const close = tokens.getLastToken(node.startTag)
              if (close.type !== 'HTMLSelfClosingTagClose') {
                return null
              }
              if (elementType === ELEMENT_TYPE.VOID) {
                return fixer.replaceText(close, '>')
              }
              return fixer.replaceText(close, `></${node.rawName}>`)
            }
          })
        }
      }
    }, {
      Program (node) {
        hasInvalidEOF = utils.hasInvalidEOF(node)
      }
    })
  }
}


/***/ }),

/***/ 899:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// the following rule is based on yannickcr/eslint-plugin-react

/**
The MIT License (MIT)

Copyright (c) 2014 Yannick Croissant

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

/**
 * @fileoverview Prevent variables used in JSX to be marked as unused
 * @author Yannick Croissant
 */


// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'prevent variables used in JSX to be marked as unused', // eslint-disable-line consistent-docs-description
      category: 'base',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/jsx-uses-vars.md'
    },
    schema: []
  },

  create (context) {
    return {
      JSXOpeningElement (node) {
        let name
        if (node.name.name) {
          // <Foo>
          name = node.name.name
        } else if (node.name.object) {
          // <Foo...Bar>
          let parent = node.name.object
          while (parent.object) {
            parent = parent.object
          }
          name = parent.name
        } else {
          return
        }

        context.markVariableAsUsed(name)
      }
    }
  }
}


/***/ }),

/***/ 900:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Define the number of attributes allows per line
 * @author Filipa Lacerda
 */


// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
const utils = __webpack_require__(729)

module.exports = {
  meta: {
    docs: {
      description: 'enforce the maximum number of attributes per line',
      category: 'strongly-recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/max-attributes-per-line.md'
    },
    fixable: 'whitespace', // or "code" or "whitespace"
    schema: [
      {
        type: 'object',
        properties: {
          singleline: {
            anyOf: [
              {
                type: 'number',
                minimum: 1
              },
              {
                type: 'object',
                properties: {
                  max: {
                    type: 'number',
                    minimum: 1
                  }
                },
                additionalProperties: false
              }
            ]
          },
          multiline: {
            anyOf: [
              {
                type: 'number',
                minimum: 1
              },
              {
                type: 'object',
                properties: {
                  max: {
                    type: 'number',
                    minimum: 1
                  },
                  allowFirstLine: {
                    type: 'boolean'
                  }
                },
                additionalProperties: false
              }
            ]
          }
        }
      }
    ]
  },

  create: function (context) {
    const configuration = parseOptions(context.options[0])
    const multilineMaximum = configuration.multiline
    const singlelinemMaximum = configuration.singleline
    const canHaveFirstLine = configuration.allowFirstLine

    return utils.defineTemplateBodyVisitor(context, {
      'VStartTag' (node) {
        const numberOfAttributes = node.attributes.length

        if (!numberOfAttributes) return

        if (utils.isSingleLine(node) && numberOfAttributes > singlelinemMaximum) {
          showErrors(node.attributes.slice(singlelinemMaximum), node)
        }

        if (!utils.isSingleLine(node)) {
          if (!canHaveFirstLine && node.attributes[0].loc.start.line === node.loc.start.line) {
            showErrors([node.attributes[0]], node)
          }

          groupAttrsByLine(node.attributes)
            .filter(attrs => attrs.length > multilineMaximum)
            .forEach(attrs => showErrors(attrs.splice(multilineMaximum), node))
        }
      }
    })

    // ----------------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------------
    function parseOptions (options) {
      const defaults = {
        singleline: 1,
        multiline: 1,
        allowFirstLine: false
      }

      if (options) {
        if (typeof options.singleline === 'number') {
          defaults.singleline = options.singleline
        } else if (options.singleline && options.singleline.max) {
          defaults.singleline = options.singleline.max
        }

        if (options.multiline) {
          if (typeof options.multiline === 'number') {
            defaults.multiline = options.multiline
          } else if (typeof options.multiline === 'object') {
            if (options.multiline.max) {
              defaults.multiline = options.multiline.max
            }

            if (options.multiline.allowFirstLine) {
              defaults.allowFirstLine = options.multiline.allowFirstLine
            }
          }
        }
      }

      return defaults
    }

    function showErrors (attributes, node) {
      attributes.forEach((prop, i) => {
        context.report({
          node: prop,
          loc: prop.loc,
          message: 'Attribute "{{propName}}" should be on a new line.',
          data: {
            propName: prop.key.name
          },
          fix: i === 0 ? (fixer) => fixer.insertTextBefore(prop, '\n') : undefined
        })
      })
    }

    function groupAttrsByLine (attributes) {
      const propsPerLine = [[attributes[0]]]

      attributes.reduce((previous, current) => {
        if (previous.loc.end.line === current.loc.start.line) {
          propsPerLine[propsPerLine.length - 1].push(current)
        } else {
          propsPerLine.push([current])
        }
        return current
      })

      return propsPerLine
    }
  }
}


/***/ }),

/***/ 901:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

function isMultilineElement (element) {
  return element.loc.start.line < element.endTag.loc.start.line
}

function parseOptions (options) {
  return Object.assign({
    'ignores': ['pre', 'textarea']
  }, options)
}

function getPhrase (lineBreaks) {
  switch (lineBreaks) {
    case 0: return 'no'
    default: return `${lineBreaks}`
  }
}
/**
 * Check whether the given element is empty or not.
 * This ignores whitespaces, doesn't ignore comments.
 * @param {VElement} node The element node to check.
 * @param {SourceCode} sourceCode The source code object of the current context.
 * @returns {boolean} `true` if the element is empty.
 */
function isEmpty (node, sourceCode) {
  const start = node.startTag.range[1]
  const end = node.endTag.range[0]
  return sourceCode.text.slice(start, end).trim() === ''
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'require a line break before and after the contents of a multiline element',
      category: undefined,
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/multiline-html-element-content-newline.md'
    },
    fixable: 'whitespace',
    schema: [{
      type: 'object',
      properties: {
        'ignores': {
          type: 'array',
          items: { type: 'string' },
          uniqueItems: true,
          additionalItems: false
        }
      },
      additionalProperties: false
    }],
    messages: {
      unexpectedAfterClosingBracket: 'Expected 1 line break after opening tag (`<{{name}}>`), but {{actual}} line breaks found.',
      unexpectedBeforeOpeningBracket: 'Expected 1 line break before closing tag (`</{{name}}>`), but {{actual}} line breaks found.'
    }
  },

  create (context) {
    const ignores = parseOptions(context.options[0]).ignores
    const template = context.parserServices.getTemplateBodyTokenStore && context.parserServices.getTemplateBodyTokenStore()
    const sourceCode = context.getSourceCode()

    let inIgnoreElement

    return utils.defineTemplateBodyVisitor(context, {
      'VElement' (node) {
        if (inIgnoreElement) {
          return
        }
        if (ignores.indexOf(node.name) >= 0) {
          // ignore element name
          inIgnoreElement = node
          return
        }
        if (node.startTag.selfClosing || !node.endTag) {
          // self closing
          return
        }

        if (!isMultilineElement(node)) {
          return
        }

        const getTokenOption = { includeComments: true, filter: (token) => token.type !== 'HTMLWhitespace' }
        const contentFirst = template.getTokenAfter(node.startTag, getTokenOption)
        const contentLast = template.getTokenBefore(node.endTag, getTokenOption)

        const beforeLineBreaks = contentFirst.loc.start.line - node.startTag.loc.end.line
        const afterLineBreaks = node.endTag.loc.start.line - contentLast.loc.end.line
        if (beforeLineBreaks !== 1) {
          context.report({
            node: template.getLastToken(node.startTag),
            loc: {
              start: node.startTag.loc.end,
              end: contentFirst.loc.start
            },
            messageId: 'unexpectedAfterClosingBracket',
            data: {
              name: node.name,
              actual: getPhrase(beforeLineBreaks)
            },
            fix (fixer) {
              const range = [node.startTag.range[1], contentFirst.range[0]]
              return fixer.replaceTextRange(range, '\n')
            }
          })
        }

        if (isEmpty(node, sourceCode)) {
          return
        }

        if (afterLineBreaks !== 1) {
          context.report({
            node: template.getFirstToken(node.endTag),
            loc: {
              start: contentLast.loc.end,
              end: node.endTag.loc.start
            },
            messageId: 'unexpectedBeforeOpeningBracket',
            data: {
              name: node.name,
              actual: getPhrase(afterLineBreaks)
            },
            fix (fixer) {
              const range = [contentLast.range[1], node.endTag.range[0]]
              return fixer.replaceTextRange(range, '\n')
            }
          })
        }
      },
      'VElement:exit' (node) {
        if (inIgnoreElement === node) {
          inIgnoreElement = null
        }
      }
    })
  }
}


/***/ }),

/***/ 902:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview enforce unified spacing in mustache interpolations.
 * @author Armano
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce unified spacing in mustache interpolations',
      category: 'strongly-recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/mustache-interpolation-spacing.md'
    },
    fixable: 'whitespace',
    schema: [
      {
        enum: ['always', 'never']
      }
    ]
  },

  create (context) {
    const options = context.options[0] || 'always'
    const template =
      context.parserServices.getTemplateBodyTokenStore &&
      context.parserServices.getTemplateBodyTokenStore()

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return utils.defineTemplateBodyVisitor(context, {
      'VExpressionContainer[expression!=null]' (node) {
        const openBrace = template.getFirstToken(node)
        const closeBrace = template.getLastToken(node)

        if (
          !openBrace ||
          !closeBrace ||
          openBrace.type !== 'VExpressionStart' ||
          closeBrace.type !== 'VExpressionEnd'
        ) {
          return
        }

        const firstToken = template.getTokenAfter(openBrace, { includeComments: true })
        const lastToken = template.getTokenBefore(closeBrace, { includeComments: true })

        if (options === 'always') {
          if (openBrace.range[1] === firstToken.range[0]) {
            context.report({
              node: openBrace,
              message: "Expected 1 space after '{{', but not found.",
              fix: (fixer) => fixer.insertTextAfter(openBrace, ' ')
            })
          }
          if (closeBrace.range[0] === lastToken.range[1]) {
            context.report({
              node: closeBrace,
              message: "Expected 1 space before '}}', but not found.",
              fix: (fixer) => fixer.insertTextBefore(closeBrace, ' ')
            })
          }
        } else {
          if (openBrace.range[1] !== firstToken.range[0]) {
            context.report({
              loc: {
                start: openBrace.loc.start,
                end: firstToken.loc.start
              },
              message: "Expected no space after '{{', but found.",
              fix: (fixer) => fixer.removeRange([openBrace.range[1], firstToken.range[0]])
            })
          }
          if (closeBrace.range[0] !== lastToken.range[1]) {
            context.report({
              loc: {
                start: lastToken.loc.end,
                end: closeBrace.loc.end
              },
              message: "Expected no space before '}}', but found.",
              fix: (fixer) => fixer.removeRange([lastToken.range[1], closeBrace.range[0]])
            })
          }
        }
      }
    })
  }
}


/***/ }),

/***/ 903:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Requires specific casing for the name property in Vue components
 * @author Armano
 */


const utils = __webpack_require__(729)
const casing = __webpack_require__(888)
const allowedCaseOptions = ['PascalCase', 'kebab-case']

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce specific casing for the name property in Vue components',
      category: 'strongly-recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/name-property-casing.md'
    },
    fixable: 'code', // or "code" or "whitespace"
    schema: [
      {
        enum: allowedCaseOptions
      }
    ]
  },

  create (context) {
    const options = context.options[0]
    const caseType = allowedCaseOptions.indexOf(options) !== -1 ? options : 'PascalCase'

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return utils.executeOnVue(context, (obj) => {
      const node = obj.properties
        .find(item => (
          item.type === 'Property' &&
          item.key.name === 'name' &&
          item.value.type === 'Literal'
        ))

      if (!node) return

      const value = casing.getConverter(caseType)(node.value.value)
      if (value !== node.value.value) {
        context.report({
          node: node.value,
          message: 'Property name "{{value}}" is not {{caseType}}.',
          data: {
            value: node.value.value,
            caseType: caseType
          },
          fix: fixer => fixer.replaceText(node.value, node.value.raw.replace(node.value.value, value))
        })
      }
    })
  }
}


/***/ }),

/***/ 904:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check if there are no asynchronous actions inside computed properties.
 * @author Armano
 */


const utils = __webpack_require__(729)

const PROMISE_FUNCTIONS = [
  'then',
  'catch',
  'finally'
]

const PROMISE_METHODS = [
  'all',
  'race',
  'reject',
  'resolve'
]

const TIMED_FUNCTIONS = [
  'setTimeout',
  'setInterval',
  'setImmediate',
  'requestAnimationFrame'
]

function isTimedFunction (node) {
  return (
    node.type === 'CallExpression' &&
    node.callee.type === 'Identifier' &&
    TIMED_FUNCTIONS.indexOf(node.callee.name) !== -1
  ) || (
    node.type === 'CallExpression' &&
    node.callee.type === 'MemberExpression' &&
    node.callee.object.type === 'Identifier' &&
    node.callee.object.name === 'window' && (
      TIMED_FUNCTIONS.indexOf(node.callee.property.name) !== -1
    )
  ) && node.arguments.length
}

function isPromise (node) {
  if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression') {
    return ( // hello.PROMISE_FUNCTION()
      node.callee.property.type === 'Identifier' &&
      PROMISE_FUNCTIONS.indexOf(node.callee.property.name) !== -1
    ) || ( // Promise.PROMISE_METHOD()
      node.callee.object.type === 'Identifier' &&
      node.callee.object.name === 'Promise' &&
      PROMISE_METHODS.indexOf(node.callee.property.name) !== -1
    )
  }
  return false
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'disallow asynchronous actions in computed properties',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/no-async-in-computed-properties.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    const forbiddenNodes = []

    const expressionTypes = {
      promise: 'asynchronous action',
      await: 'await operator',
      async: 'async function declaration',
      new: 'Promise object',
      timed: 'timed function'
    }

    function onFunctionEnter (node) {
      if (node.async) {
        forbiddenNodes.push({
          node: node,
          type: 'async'
        })
      }
    }

    return Object.assign({},
      {
        FunctionDeclaration: onFunctionEnter,

        FunctionExpression: onFunctionEnter,

        ArrowFunctionExpression: onFunctionEnter,

        NewExpression (node) {
          if (node.callee.name === 'Promise') {
            forbiddenNodes.push({
              node: node,
              type: 'new'
            })
          }
        },

        CallExpression (node) {
          if (isPromise(node)) {
            forbiddenNodes.push({
              node: node,
              type: 'promise'
            })
          }
          if (isTimedFunction(node)) {
            forbiddenNodes.push({
              node: node,
              type: 'timed'
            })
          }
        },

        AwaitExpression (node) {
          forbiddenNodes.push({
            node: node,
            type: 'await'
          })
        }
      },
      utils.executeOnVue(context, (obj) => {
        const computedProperties = utils.getComputedProperties(obj)

        computedProperties.forEach(cp => {
          forbiddenNodes.forEach(el => {
            if (
              cp.value &&
              el.node.loc.start.line >= cp.value.loc.start.line &&
              el.node.loc.end.line <= cp.value.loc.end.line
            ) {
              context.report({
                node: el.node,
                message: 'Unexpected {{expressionName}} in "{{propertyName}}" computed property.',
                data: {
                  expressionName: expressionTypes[el.type],
                  propertyName: cp.key
                }
              })
            }
          })
        })
      })
    )
  }
}


/***/ }),

/***/ 905:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Check whether the given `v-if` node is using the variable which is defined by the `v-for` directive.
 * @param {ASTNode} vIf The `v-if` attribute node to check.
 * @returns {boolean} `true` if the `v-if` is using the variable which is defined by the `v-for` directive.
 */
function isUsingIterationVar (vIf) {
  const element = vIf.parent.parent
  return vIf.value.references.some(reference =>
    element.variables.some(variable =>
      variable.id.name === reference.id.name &&
      variable.kind === 'v-for'
    )
  )
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'disallow confusing `v-for` and `v-if` on the same element',
      category: 'recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/no-confusing-v-for-v-if.md',
      replacedBy: ['no-use-v-if-with-v-for']
    },
    deprecated: true,
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='if']" (node) {
        const element = node.parent.parent

        if (utils.hasDirective(element, 'for') && !isUsingIterationVar(node)) {
          context.report({
            node,
            loc: node.loc,
            message: "This 'v-if' should be moved to the wrapper element."
          })
        }
      }
    })
  }
}


/***/ }),

/***/ 906:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevents duplication of field names.
 * @author Armano
 */


const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const GROUP_NAMES = ['props', 'computed', 'data', 'methods']

module.exports = {
  meta: {
    docs: {
      description: 'disallow duplication of field names',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/no-dupe-keys.md'
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      {
        type: 'object',
        properties: {
          groups: {
            type: 'array'
          }
        },
        additionalProperties: false
      }
    ]
  },

  create (context) {
    const options = context.options[0] || {}
    const groups = new Set(GROUP_NAMES.concat(options.groups || []))

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return utils.executeOnVue(context, (obj) => {
      const usedNames = []
      const properties = utils.iterateProperties(obj, groups)

      for (const o of properties) {
        if (usedNames.indexOf(o.name) !== -1) {
          context.report({
            node: o.node,
            message: "Duplicated key '{{name}}'.",
            data: {
              name: o.name
            }
          })
        }

        usedNames.push(o.name)
      }
    })
  }
}


/***/ }),

/***/ 907:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Get the name of the given attribute node.
 * @param {ASTNode} attribute The attribute node to get.
 * @returns {string} The name of the attribute.
 */
function getName (attribute) {
  if (!attribute.directive) {
    return attribute.key.name
  }
  if (attribute.key.name === 'bind') {
    return attribute.key.argument || null
  }
  return null
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'disallow duplication of attributes',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/no-duplicate-attributes.md'
    },
    fixable: null,

    schema: [
      {
        type: 'object',
        properties: {
          allowCoexistClass: {
            type: 'boolean'
          },
          allowCoexistStyle: {
            type: 'boolean'
          }
        }
      }
    ]
  },

  create (context) {
    const options = context.options[0] || {}
    const allowCoexistStyle = options.allowCoexistStyle !== false
    const allowCoexistClass = options.allowCoexistClass !== false

    const directiveNames = new Set()
    const attributeNames = new Set()

    function isDuplicate (name, isDirective) {
      if ((allowCoexistStyle && name === 'style') || (allowCoexistClass && name === 'class')) {
        return isDirective ? directiveNames.has(name) : attributeNames.has(name)
      }
      return directiveNames.has(name) || attributeNames.has(name)
    }

    return utils.defineTemplateBodyVisitor(context, {
      'VStartTag' () {
        directiveNames.clear()
        attributeNames.clear()
      },
      'VAttribute' (node) {
        const name = getName(node)
        if (name == null) {
          return
        }

        if (isDuplicate(name, node.directive)) {
          context.report({
            node,
            loc: node.loc,
            message: "Duplicate attribute '{{name}}'.",
            data: { name }
          })
        }

        if (node.directive) {
          directiveNames.add(name)
        } else {
          attributeNames.add(name)
        }
      }
    })
  }
}


/***/ }),

/***/ 908:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview This rule warns about the usage of extra whitespaces between attributes
 * @author Armano
 */


// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'disallow multiple spaces',
      category: 'strongly-recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/no-multi-spaces.md'
    },
    fixable: 'whitespace', // or "code" or "whitespace"
    schema: []
  },

  /**
   * @param {RuleContext} context - The rule context.
   * @returns {Object} AST event handlers.
   */
  create (context) {
    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return {
      Program (node) {
        if (context.parserServices.getTemplateBodyTokenStore == null) {
          context.report({
            loc: { line: 1, column: 0 },
            message: 'Use the latest vue-eslint-parser. See also https://github.com/vuejs/eslint-plugin-vue#what-is-the-use-the-latest-vue-eslint-parser-error.'
          })
          return
        }
        if (!node.templateBody) {
          return
        }
        const sourceCode = context.getSourceCode()
        const tokenStore = context.parserServices.getTemplateBodyTokenStore()
        const tokens = tokenStore.getTokens(node.templateBody, { includeComments: true })

        let prevToken = tokens.shift()
        for (const token of tokens) {
          const spaces = token.range[0] - prevToken.range[1]
          if (spaces > 1 && token.loc.start.line === prevToken.loc.start.line) {
            context.report({
              node: token,
              loc: {
                start: prevToken.loc.end,
                end: token.loc.start
              },
              message: "Multiple spaces found before '{{displayValue}}'.",
              fix: (fixer) => fixer.replaceTextRange([prevToken.range[1], token.range[0]], ' '),
              data: {
                displayValue: sourceCode.getText(token)
              }
            })
          }
          prevToken = token
        }
      }
    }
  }
}


/***/ }),

/***/ 909:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

// https://html.spec.whatwg.org/multipage/parsing.html#parse-errors
const DEFAULT_OPTIONS = Object.freeze(Object.assign(Object.create(null), {
  'abrupt-closing-of-empty-comment': true,
  'absence-of-digits-in-numeric-character-reference': true,
  'cdata-in-html-content': true,
  'character-reference-outside-unicode-range': true,
  'control-character-in-input-stream': true,
  'control-character-reference': true,
  'eof-before-tag-name': true,
  'eof-in-cdata': true,
  'eof-in-comment': true,
  'eof-in-tag': true,
  'incorrectly-closed-comment': true,
  'incorrectly-opened-comment': true,
  'invalid-first-character-of-tag-name': true,
  'missing-attribute-value': true,
  'missing-end-tag-name': true,
  'missing-semicolon-after-character-reference': true,
  'missing-whitespace-between-attributes': true,
  'nested-comment': true,
  'noncharacter-character-reference': true,
  'noncharacter-in-input-stream': true,
  'null-character-reference': true,
  'surrogate-character-reference': true,
  'surrogate-in-input-stream': true,
  'unexpected-character-in-attribute-name': true,
  'unexpected-character-in-unquoted-attribute-value': true,
  'unexpected-equals-sign-before-attribute-name': true,
  'unexpected-null-character': true,
  'unexpected-question-mark-instead-of-tag-name': true,
  'unexpected-solidus-in-tag': true,
  'unknown-named-character-reference': true,
  'end-tag-with-attributes': true,
  'duplicate-attribute': true,
  'end-tag-with-trailing-solidus': true,
  'non-void-html-element-start-tag-with-trailing-solidus': false,
  'x-invalid-end-tag': true,
  'x-invalid-namespace': true
}))

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'disallow parsing errors in `<template>`',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/no-parsing-error.md'
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: Object.keys(DEFAULT_OPTIONS).reduce((ret, code) => {
          ret[code] = { type: 'boolean' }
          return ret
        }, {}),
        additionalProperties: false
      }
    ]
  },

  create (context) {
    const options = Object.assign({}, DEFAULT_OPTIONS, context.options[0] || {})

    return {
      Program (program) {
        const node = program.templateBody
        if (node == null || node.errors == null) {
          return
        }

        for (const error of node.errors) {
          if (error.code && !options[error.code]) {
            continue
          }

          context.report({
            node,
            loc: { line: error.lineNumber, column: error.column },
            message: 'Parsing error: {{message}}.',
            data: {
              message: error.message.endsWith('.')
                ? error.message.slice(0, -1)
                : error.message
            }
          })
        }
      }
    }
  }
}


/***/ }),

/***/ 910:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent overwrite reserved keys
 * @author Armano
 */


const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const RESERVED_KEYS = __webpack_require__(911)
const GROUP_NAMES = ['props', 'computed', 'data', 'methods']

module.exports = {
  meta: {
    docs: {
      description: 'disallow overwriting reserved keys',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/no-reserved-keys.md'
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          reserved: {
            type: 'array'
          },
          groups: {
            type: 'array'
          }
        },
        additionalProperties: false
      }
    ]
  },

  create (context) {
    const options = context.options[0] || {}
    const reservedKeys = new Set(RESERVED_KEYS.concat(options.reserved || []))
    const groups = new Set(GROUP_NAMES.concat(options.groups || []))

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return utils.executeOnVue(context, (obj) => {
      const properties = utils.iterateProperties(obj, groups)
      for (const o of properties) {
        if (o.groupName === 'data' && o.name[0] === '_') {
          context.report({
            node: o.node,
            message: "Keys starting with with '_' are reserved in '{{name}}' group.",
            data: {
              name: o.name
            }
          })
        } else if (reservedKeys.has(o.name)) {
          context.report({
            node: o.node,
            message: "Key '{{name}}' is reserved.",
            data: {
              name: o.name
            }
          })
        }
      }
    })
  }
}


/***/ }),

/***/ 911:
/***/ (function(module) {

module.exports = ["$data","$props","$el","$options","$parent","$root","$children","$slots","$scopedSlots","$refs","$isServer","$attrs","$listeners","$watch","$set","$delete","$on","$once","$off","$emit","$mount","$forceUpdate","$nextTick","$destroy"];

/***/ }),

/***/ 912:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforces component's data property to be a function.
 * @author Armano
 */


const utils = __webpack_require__(729)

function isOpenParen (token) {
  return token.type === 'Punctuator' && token.value === '('
}

function isCloseParen (token) {
  return token.type === 'Punctuator' && token.value === ')'
}

function getFirstAndLastTokens (node, sourceCode) {
  let first = sourceCode.getFirstToken(node)
  let last = sourceCode.getLastToken(node)

  // If the value enclosed by parentheses, update the 'first' and 'last' by the parentheses.
  while (true) {
    const prev = sourceCode.getTokenBefore(first)
    const next = sourceCode.getTokenAfter(last)
    if (isOpenParen(prev) && isCloseParen(next)) {
      first = prev
      last = next
    } else {
      return { first, last }
    }
  }
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "enforce component's data property to be a function",
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/no-shared-component-data.md'
    },
    fixable: 'code',
    schema: []
  },

  create (context) {
    const sourceCode = context.getSourceCode()

    return utils.executeOnVueComponent(context, (obj) => {
      obj.properties
        .filter(p =>
          p.type === 'Property' &&
          p.key.type === 'Identifier' &&
          p.key.name === 'data' &&
          p.value.type !== 'FunctionExpression' &&
          p.value.type !== 'ArrowFunctionExpression' &&
          p.value.type !== 'Identifier'
        )
        .forEach(p => {
          context.report({
            node: p,
            message: '`data` property in component must be a function.',
            fix (fixer) {
              const tokens = getFirstAndLastTokens(p.value, sourceCode)

              // If we can upgrade requirements to `eslint@>4.1.0`, this code can be replaced by:
              //     return [
              //       fixer.insertTextBefore(tokens.first, 'function() {\nreturn '),
              //       fixer.insertTextAfter(tokens.last, ';\n}')
              //     ]
              // See: https://eslint.org/blog/2017/06/eslint-v4.1.0-released#applying-multiple-autofixes-simultaneously
              const range = [tokens.first.range[0], tokens.last.range[1]]
              const valueText = sourceCode.text.slice(range[0], range[1])
              const replacement = `function() {\nreturn ${valueText};\n}`
              return fixer.replaceTextRange(range, replacement)
            }
          })
        })
    })
  }
}


/***/ }),

/***/ 913:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Don't introduce side effects in computed properties
 * @author Michał Sajnóg
 */


const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'disallow side effects in computed properties',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/no-side-effects-in-computed-properties.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    const forbiddenNodes = []

    return Object.assign({},
      {
        // this.xxx <=|+=|-=>
        'AssignmentExpression' (node) {
          if (node.left.type !== 'MemberExpression') return
          if (utils.parseMemberExpression(node.left)[0] === 'this') {
            forbiddenNodes.push(node)
          }
        },
        // this.xxx <++|-->
        'UpdateExpression > MemberExpression' (node) {
          if (utils.parseMemberExpression(node)[0] === 'this') {
            forbiddenNodes.push(node)
          }
        },
        // this.xxx.func()
        'CallExpression' (node) {
          const code = utils.parseMemberOrCallExpression(node)
          const MUTATION_REGEX = /(this.)((?!(concat|slice|map|filter)\().)[^\)]*((push|pop|shift|unshift|reverse|splice|sort|copyWithin|fill)\()/g

          if (MUTATION_REGEX.test(code)) {
            forbiddenNodes.push(node)
          }
        }
      },
      utils.executeOnVue(context, (obj) => {
        const computedProperties = utils.getComputedProperties(obj)

        computedProperties.forEach(cp => {
          forbiddenNodes.forEach(node => {
            if (
              cp.value &&
              node.loc.start.line >= cp.value.loc.start.line &&
              node.loc.end.line <= cp.value.loc.end.line
            ) {
              context.report({
                node: node,
                message: 'Unexpected side effect in "{{key}}" computed property.',
                data: { key: cp.key }
              })
            }
          })
        })
      })
    )
  }
}


/***/ }),

/***/ 914:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Yosuke Ota
 * issue https://github.com/vuejs/eslint-plugin-vue/issues/460
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'disallow spaces around equal signs in attribute',
      category: undefined,
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/no-spaces-around-equal-signs-in-attribute.md'
    },
    fixable: 'whitespace',
    schema: []
  },

  create (context) {
    const sourceCode = context.getSourceCode()
    return utils.defineTemplateBodyVisitor(context, {
      'VAttribute' (node) {
        if (!node.value) {
          return
        }
        const range = [node.key.range[1], node.value.range[0]]
        const eqText = sourceCode.text.slice(range[0], range[1])
        const expect = eqText.trim()

        if (eqText !== expect) {
          context.report({
            node: node.key,
            loc: {
              start: node.key.loc.end,
              end: node.value.loc.start
            },
            message: 'Unexpected spaces found around equal signs.',
            data: {},
            fix: fixer => fixer.replaceTextRange(range, expect)
          })
        }
      }
    })
  }
}


/***/ }),

/***/ 915:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'disallow `key` attribute on `<template>`',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/no-template-key.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='template']" (node) {
        if (utils.hasAttribute(node, 'key') || utils.hasDirective(node, 'bind', 'key')) {
          context.report({
            node: node,
            loc: node.loc,
            message: "'<template>' cannot be keyed. Place the key on real elements instead."
          })
        }
      }
    })
  }
}


/***/ }),

/***/ 916:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Disallow variable declarations from shadowing variables declared in the outer scope.
 * @author Armano
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const GROUP_NAMES = ['props', 'computed', 'data', 'methods']

module.exports = {
  meta: {
    docs: {
      description: 'disallow variable declarations from shadowing variables declared in the outer scope',
      category: 'strongly-recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/no-template-shadow.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    const jsVars = new Set()
    let scope = {
      parent: null,
      nodes: []
    }

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return utils.defineTemplateBodyVisitor(context, {
      VElement (node) {
        scope = {
          parent: scope,
          nodes: scope.nodes.slice() // make copy
        }
        if (node.variables) {
          for (const variable of node.variables) {
            const varNode = variable.id
            const name = varNode.name
            if (scope.nodes.some(node => node.name === name) || jsVars.has(name)) {
              context.report({
                node: varNode,
                loc: varNode.loc,
                message: "Variable '{{name}}' is already declared in the upper scope.",
                data: {
                  name
                }
              })
            } else {
              scope.nodes.push(varNode)
            }
          }
        }
      },
      'VElement:exit' (node) {
        scope = scope.parent
      }
    }, utils.executeOnVue(context, (obj) => {
      const properties = Array.from(utils.iterateProperties(obj, new Set(GROUP_NAMES)))
      for (const node of properties) {
        jsVars.add(node.name)
      }
    }))
  }
}


/***/ }),

/***/ 917:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'disallow mustaches in `<textarea>`',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/no-textarea-mustache.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='textarea'] VExpressionContainer" (node) {
        if (node.parent.type !== 'VElement') {
          return
        }

        context.report({
          node,
          loc: node.loc,
          message: "Unexpected mustache. Use 'v-model' instead."
        })
      }
    })
  }
}


/***/ }),

/***/ 918:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Report used components
 * @author Michał Sajnóg
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)
const casing = __webpack_require__(888)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'disallow registering components that are not used inside templates',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/no-unused-components.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    const usedComponents = []
    let registeredComponents = []
    let templateLocation

    return utils.defineTemplateBodyVisitor(context, {
      VElement (node) {
        if (!utils.isCustomComponent(node)) return
        let usedComponentName

        if (utils.hasAttribute(node, 'is')) {
          usedComponentName = utils.findAttribute(node, 'is').value.value
        } else if (utils.hasDirective(node, 'bind', 'is')) {
          const directiveNode = utils.findDirective(node, 'bind', 'is')
          if (
            directiveNode.value.type === 'VExpressionContainer' &&
            directiveNode.value.expression.type === 'Literal'
          ) {
            usedComponentName = directiveNode.value.expression.value
          }
        } else {
          usedComponentName = node.rawName
        }

        if (usedComponentName) {
          usedComponents.push(usedComponentName)
        }
      },
      "VElement[name='template']" (rootNode) {
        templateLocation = templateLocation || rootNode.loc.start
      },
      "VElement[name='template']:exit" (rootNode) {
        if (rootNode.loc.start !== templateLocation) return

        registeredComponents
          .filter(({ name }) => {
            // If the component name is PascalCase
            // it can be used in varoious of ways inside template,
            // like "theComponent", "The-component" etc.
            // but except snake_case
            if (casing.pascalCase(name) === name) {
              return !usedComponents.some(n => {
                return n.indexOf('_') === -1 && name === casing.pascalCase(n)
              })
            } else {
              // In any other case the used component name must exactly match
              // the registered name
              return usedComponents.indexOf(name) === -1
            }
          })
          .forEach(({ node, name }) => context.report({
            node,
            message: 'The "{{name}}" component has been registered but not used.',
            data: {
              name
            }
          }))
      }
    }, utils.executeOnVue(context, (obj) => {
      registeredComponents = utils.getRegisteredComponents(obj)
    }))
  }
}


/***/ }),

/***/ 919:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview disallow unused variable definitions of v-for directives or scope attributes.
 * @author 薛定谔的猫<hh_2013@foxmail.com>
 */


const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'disallow unused variable definitions of v-for directives or scope attributes',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/no-unused-vars.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      VElement (node) {
        const variables = node.variables

        for (
          let i = variables.length - 1;
          i >= 0 && !variables[i].references.length;
          i--
        ) {
          const variable = variables[i]
          context.report({
            node: variable.id,
            loc: variable.id.loc,
            message: `'{{name}}' is defined but never used.`,
            data: variable.id
          })
        }
      }
    })
  }
}


/***/ }),

/***/ 920:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Yosuke Ota
 *
 * issue        https://github.com/vuejs/eslint-plugin-vue/issues/403
 * Style guide: https://vuejs.org/v2/style-guide/#Avoid-v-if-with-v-for-essential
 *
 * I implemented it with reference to `no-confusing-v-for-v-if`
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Check whether the given `v-if` node is using the variable which is defined by the `v-for` directive.
 * @param {ASTNode} vIf The `v-if` attribute node to check.
 * @returns {boolean} `true` if the `v-if` is using the variable which is defined by the `v-for` directive.
 */
function isUsingIterationVar (vIf) {
  return !!getVForUsingIterationVar(vIf)
}

function getVForUsingIterationVar (vIf) {
  const element = vIf.parent.parent
  for (var i = 0; i < vIf.value.references.length; i++) {
    const reference = vIf.value.references[i]

    const targetVFor = element.variables.find(variable =>
      variable.id.name === reference.id.name &&
      variable.kind === 'v-for'
    )
    if (targetVFor) {
      return targetVFor.id.parent
    }
  }
  return undefined
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'disallow use v-if on the same element as v-for',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/no-use-v-if-with-v-for.md'
    },
    fixable: null,
    schema: [{
      type: 'object',
      properties: {
        allowUsingIterationVar: {
          type: 'boolean'
        }
      }
    }]
  },

  create (context) {
    const options = context.options[0] || {}
    const allowUsingIterationVar = options.allowUsingIterationVar === true // default false
    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='if']" (node) {
        const element = node.parent.parent

        if (utils.hasDirective(element, 'for')) {
          if (isUsingIterationVar(node)) {
            if (!allowUsingIterationVar) {
              const vFor = getVForUsingIterationVar(node)
              context.report({
                node,
                loc: node.loc,
                message: "The '{{iteratorName}}' variable inside 'v-for' directive should be replaced with a computed property that returns filtered array instead. You should not mix 'v-for' with 'v-if'.",
                data: {
                  iteratorName: vFor.right.name
                }
              })
            }
          } else {
            context.report({
              node,
              loc: node.loc,
              message: "This 'v-if' should be moved to the wrapper element."
            })
          }
        }
      }
    })
  }
}


/***/ }),

/***/ 921:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Restrict or warn use of v-html to prevent XSS attack
 * @author Nathan Zeplowitz
 */

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definitionutilu
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'disallow use of v-html to prevent XSS attack',
      category: 'recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/no-v-html.md'
    },
    fixable: null,
    schema: []
  },
  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='html']" (node) {
        context.report({
          node,
          loc: node.loc,
          message: "'v-html' directive can lead to XSS attack."
        })
      }
    })
  }
}


/***/ }),

/***/ 922:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Keep order of properties in components
 * @author Michał Sajnóg
 */


const utils = __webpack_require__(729)
const Traverser = __webpack_require__(160)

const defaultOrder = [
  'el',
  'name',
  'parent',
  'functional',
  ['delimiters', 'comments'],
  ['components', 'directives', 'filters'],
  'extends',
  'mixins',
  'inheritAttrs',
  'model',
  ['props', 'propsData'],
  'data',
  'computed',
  'watch',
  'LIFECYCLE_HOOKS',
  'methods',
  ['template', 'render'],
  'renderError'
]

const groups = {
  LIFECYCLE_HOOKS: [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'activated',
    'deactivated',
    'beforeDestroy',
    'destroyed'
  ]
}

function getOrderMap (order) {
  const orderMap = new Map()

  order.forEach((property, i) => {
    if (Array.isArray(property)) {
      property.forEach(p => orderMap.set(p, i))
    } else {
      orderMap.set(property, i)
    }
  })

  return orderMap
}

function isComma (node) {
  return node.type === 'Punctuator' && node.value === ','
}

const ARITHMETIC_OPERATORS = ['+', '-', '*', '/', '%', '**']
const BITWISE_OPERATORS = ['&', '|', '^', '~', '<<', '>>', '>>>']
const COMPARISON_OPERATORS = ['==', '!=', '===', '!==', '>', '>=', '<', '<=']
const RELATIONAL_OPERATORS = ['in', 'instanceof']
const ALL_BINARY_OPERATORS = [].concat(
  ARITHMETIC_OPERATORS,
  BITWISE_OPERATORS,
  COMPARISON_OPERATORS,
  RELATIONAL_OPERATORS
)
const LOGICAL_OPERATORS = ['&&', '||']

/*
 * Result `true` if the node is sure that there are no side effects
 *
 * Currently known side effects types
 *
 * node.type === 'CallExpression'
 * node.type === 'NewExpression'
 * node.type === 'UpdateExpression'
 * node.type === 'AssignmentExpression'
 * node.type === 'TaggedTemplateExpression'
 * node.type === 'UnaryExpression' && node.operator === 'delete'
 *
 * @param  {ASTNode} node target node
 * @param  {Object} visitorKeys sourceCode.visitorKey
 * @returns {Boolean} no side effects
 */
function isNotSideEffectsNode (node, visitorKeys) {
  let result = true
  new Traverser().traverse(node, {
    visitorKeys,
    enter (node, parent) {
      if (
        node.type === 'FunctionExpression' ||
        node.type === 'Identifier' ||
        node.type === 'Literal' ||
        // es2015
        node.type === 'ArrowFunctionExpression' ||
        node.type === 'TemplateElement'
      ) {
        // no side effects node
        this.skip()
      } else if (
        node.type !== 'Property' &&
        node.type !== 'ObjectExpression' &&
        node.type !== 'ArrayExpression' &&
        (node.type !== 'UnaryExpression' || ['!', '~', '+', '-', 'typeof'].indexOf(node.operator) < 0) &&
        (node.type !== 'BinaryExpression' || ALL_BINARY_OPERATORS.indexOf(node.operator) < 0) &&
        (node.type !== 'LogicalExpression' || LOGICAL_OPERATORS.indexOf(node.operator) < 0) &&
        node.type !== 'MemberExpression' &&
        node.type !== 'ConditionalExpression' &&
        // es2015
        node.type !== 'SpreadElement' &&
        node.type !== 'TemplateLiteral'
      ) {
        // Can not be sure that a node has no side effects
        result = false
        this.break()
      }
    }
  })
  return result
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce order of properties in components',
      category: 'recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/order-in-components.md'
    },
    fixable: 'code', // null or "code" or "whitespace"
    schema: [
      {
        type: 'object',
        properties: {
          order: {
            type: 'array'
          }
        },
        additionalProperties: false
      }
    ]
  },

  create (context) {
    const options = context.options[0] || {}
    const order = options.order || defaultOrder
    const extendedOrder = order.map(property => groups[property] || property)
    const orderMap = getOrderMap(extendedOrder)
    const sourceCode = context.getSourceCode()

    function checkOrder (propertiesNodes, orderMap) {
      const properties = propertiesNodes
        .filter(property => property.type === 'Property')
        .map(property => property.key)

      properties.forEach((property, i) => {
        const propertiesAbove = properties.slice(0, i)
        const unorderedProperties = propertiesAbove
          .filter(p => orderMap.get(p.name) > orderMap.get(property.name))
          .sort((p1, p2) => orderMap.get(p1.name) > orderMap.get(p2.name))

        const firstUnorderedProperty = unorderedProperties[0]

        if (firstUnorderedProperty) {
          const line = firstUnorderedProperty.loc.start.line
          context.report({
            node: property,
            message: `The "{{name}}" property should be above the "{{firstUnorderedPropertyName}}" property on line {{line}}.`,
            data: {
              name: property.name,
              firstUnorderedPropertyName: firstUnorderedProperty.name,
              line
            },
            fix (fixer) {
              const propertyNode = property.parent
              const firstUnorderedPropertyNode = firstUnorderedProperty.parent
              const hasSideEffectsPossibility = propertiesNodes
                .slice(
                  propertiesNodes.indexOf(firstUnorderedPropertyNode),
                  propertiesNodes.indexOf(propertyNode) + 1
                )
                .some((property) => !isNotSideEffectsNode(property, sourceCode.visitorKeys))
              if (hasSideEffectsPossibility) {
                return undefined
              }
              const comma = sourceCode.getTokenAfter(propertyNode)
              const hasAfterComma = isComma(comma)

              const codeStart = sourceCode.getTokenBefore(propertyNode).range[1] // to include comments
              const codeEnd = hasAfterComma ? comma.range[1] : propertyNode.range[1]

              const propertyCode = sourceCode.text.slice(codeStart, codeEnd) + (hasAfterComma ? '' : ',')
              const insertTarget = sourceCode.getTokenBefore(firstUnorderedPropertyNode)
              // If we can upgrade requirements to `eslint@>4.1.0`, this code can be replaced by:
              // return [
              //   fixer.removeRange([codeStart, codeEnd]),
              //   fixer.insertTextAfter(insertTarget, propertyCode)
              // ]
              const insertStart = insertTarget.range[1]
              const newCode = propertyCode + sourceCode.text.slice(insertStart, codeStart)
              return fixer.replaceTextRange([insertStart, codeEnd], newCode)
            }
          })
        }
      })
    }

    return utils.executeOnVue(context, (obj) => {
      checkOrder(obj.properties, orderMap)
    })
  }
}


/***/ }),

/***/ 923:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Requires specific casing for the Prop name in Vue components
 * @author Yu Kimura
 */


const utils = __webpack_require__(729)
const casing = __webpack_require__(888)
const allowedCaseOptions = ['camelCase', 'snake_case']

function canFixPropertyName (node, originalName) {
  // Can not fix of computed property names & shorthand
  if (node.computed || node.shorthand) {
    return false
  }
  const key = node.key
  // Can not fix of unknown types
  if (key.type !== 'Literal' && key.type !== 'Identifier') {
    return false
  }
  // Can fix of ASCII printable characters
  return originalName.match(/[ -~]+/)
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

function create (context) {
  const options = context.options[0]
  const caseType = allowedCaseOptions.indexOf(options) !== -1 ? options : 'camelCase'
  const converter = casing.getConverter(caseType)

  // ----------------------------------------------------------------------
  // Public
  // ----------------------------------------------------------------------

  return utils.executeOnVue(context, (obj) => {
    const node = obj.properties.find(p =>
      p.type === 'Property' &&
      p.key.type === 'Identifier' &&
      p.key.name === 'props' &&
      (p.value.type === 'ObjectExpression' || p.value.type === 'ArrayExpression')
    )

    if (!node) return

    const items = node.value.type === 'ObjectExpression' ? node.value.properties : node.value.elements
    for (const item of items) {
      if (item.type !== 'Property') {
        return
      }
      if (item.computed) {
        if (item.key.type !== 'Literal') {
          // TemplateLiteral | Identifier(variable) | Expression(s)
          return
        }
        if (typeof item.key.value !== 'string') {
          // (boolean | null | number | RegExp) Literal
          return
        }
      }

      const propName = item.key.type === 'Literal' ? item.key.value : item.key.name
      const convertedName = converter(propName)
      if (convertedName !== propName) {
        context.report({
          node: item,
          message: 'Prop "{{name}}" is not in {{caseType}}.',
          data: {
            name: propName,
            caseType: caseType
          },
          fix: canFixPropertyName(item, propName) ? fixer => {
            return item.key.type === 'Literal'
              ? fixer.replaceText(item.key, item.key.raw.replace(item.key.value, convertedName))
              : fixer.replaceText(item.key, convertedName)
          } : undefined
        })
      }
    }
  })
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce specific casing for the Prop name in Vue components',
      category: 'strongly-recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/prop-name-casing.md'
    },
    fixable: 'code',  // null or "code" or "whitespace"
    schema: [
      {
        enum: allowedCaseOptions
      }
    ]
  },
  create
}


/***/ }),

/***/ 924:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'require `v-bind:is` of `<component>` elements',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/require-component-is.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='component']" (node) {
        if (!utils.hasDirective(node, 'bind', 'is')) {
          context.report({
            node,
            loc: node.loc,
            message: "Expected '<component>' elements to have 'v-bind:is' attribute."
          })
        }
      }
    })
  }
}


/***/ }),

/***/ 925:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Require default value for props
 * @author Michał Sajnóg <msajnog93@gmail.com> (http://github.com/michalsnik)
 */


const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'require default value for props',
      category: 'strongly-recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/require-default-prop.md'
    },
    fixable: null, // or "code" or "whitespace"
    schema: []
  },

  create: function (context) {
    // ----------------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------------

    /**
     * Checks if the passed prop is required
     * @param {Property} prop - Property AST node for a single prop
     * @return {boolean}
     */
    function propIsRequired (prop) {
      const propRequiredNode = prop.value.properties
        .find(p =>
          p.type === 'Property' &&
          p.key.name === 'required' &&
          p.value.type === 'Literal' &&
          p.value.value === true
        )

      return Boolean(propRequiredNode)
    }

    /**
     * Checks if the passed prop has a default value
     * @param {Property} prop - Property AST node for a single prop
     * @return {boolean}
     */
    function propHasDefault (prop) {
      const propDefaultNode = prop.value.properties
        .find(p =>
          p.key &&
          (p.key.name === 'default' || p.key.value === 'default')
        )

      return Boolean(propDefaultNode)
    }

    /**
     * Finds all props that don't have a default value set
     * @param {Property} propsNode - Vue component's "props" node
     * @return {Array} Array of props without "default" value
     */
    function findPropsWithoutDefaultValue (propsNode) {
      return propsNode.value.properties
        .filter(prop => prop.type === 'Property')
        .filter(prop => {
          if (prop.value.type !== 'ObjectExpression') {
            return true
          }

          return !propIsRequired(prop) && !propHasDefault(prop)
        })
    }

    /**
     * Detects whether given value node is a Boolean type
     * @param {Node} value
     * @return {Boolean}
     */
    function isValueNodeOfBooleanType (value) {
      return (
        value.type === 'Identifier' &&
        value.name === 'Boolean'
      ) || (
        value.type === 'ArrayExpression' &&
        value.elements.length === 1 &&
        value.elements[0].type === 'Identifier' &&
        value.elements[0].name === 'Boolean'
      )
    }

    /**
     * Detects whether given prop node is a Boolean
     * @param {Node} prop
     * @return {Boolean}
     */
    function isBooleanProp (prop) {
      const value = prop.value

      return isValueNodeOfBooleanType(value) || (
        value.type === 'ObjectExpression' &&
        value.properties.find(p =>
          p.key.type === 'Identifier' &&
          p.key.name === 'type' &&
          isValueNodeOfBooleanType(p.value)
        )
      )
    }

    /**
     * Excludes purely Boolean props from the Array
     * @param {Array} props - Array with props
     * @return {Array}
     */
    function excludeBooleanProps (props) {
      return props.filter(prop => !isBooleanProp(prop))
    }

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return utils.executeOnVue(context, (obj) => {
      const propsNode = obj.properties
        .find(p =>
          p.type === 'Property' &&
          p.key.type === 'Identifier' &&
          p.key.name === 'props' &&
          p.value.type === 'ObjectExpression'
        )

      if (!propsNode) return

      const propsWithoutDefault = findPropsWithoutDefaultValue(propsNode)
      const propsToReport = excludeBooleanProps(propsWithoutDefault)

      propsToReport.forEach(prop => {
        context.report({
          node: prop,
          message: `Prop '{{propName}}' requires default value to be set.`,
          data: {
            propName: prop.key.name
          }
        })
      })
    })
  }
}


/***/ }),

/***/ 926:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview require prop type to be a constructor
 * @author Michał Sajnóg
 */


const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const message = 'The "{{name}}" property should be a constructor.'

const forbiddenTypes = [
  'Literal',
  'TemplateLiteral',
  'BinaryExpression',
  'UpdateExpression'
]

const isForbiddenType = nodeType => forbiddenTypes.indexOf(nodeType) > -1

module.exports = {
  meta: {
    docs: {
      description: 'require prop type to be a constructor',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/require-prop-type-constructor.md'
    },
    fixable: 'code',  // or "code" or "whitespace"
    schema: []
  },

  create (context) {
    const fix = node => fixer => {
      if (node.type === 'Literal') {
        return fixer.replaceText(node, node.value)
      } else if (
        node.type === 'TemplateLiteral' &&
        node.expressions.length === 0 &&
        node.quasis.length === 1
      ) {
        return fixer.replaceText(node, node.quasis[0].value.cooked)
      }
    }

    const checkPropertyNode = (p) => {
      if (isForbiddenType(p.value.type)) {
        context.report({
          node: p.value,
          message,
          data: {
            name: utils.getStaticPropertyName(p.key)
          },
          fix: fix(p.value)
        })
      } else if (p.value.type === 'ArrayExpression') {
        p.value.elements
          .filter(prop => isForbiddenType(prop.type))
          .forEach(prop => context.report({
            node: prop,
            message,
            data: {
              name: utils.getStaticPropertyName(p.key)
            },
            fix: fix(prop)
          }))
      }
    }

    return utils.executeOnVueComponent(context, (obj) => {
      const node = obj.properties.find(p =>
        p.type === 'Property' &&
        p.key.type === 'Identifier' &&
        p.key.name === 'props' &&
        p.value.type === 'ObjectExpression'
      )

      if (!node) return

      node.value.properties.forEach(p => {
        if (isForbiddenType(p.value.type) || p.value.type === 'ArrayExpression') {
          checkPropertyNode(p)
        } else if (p.value.type === 'ObjectExpression') {
          const typeProperty = p.value.properties.find(prop =>
            prop.type === 'Property' &&
            prop.key.name === 'type'
          )

          if (!typeProperty) return

          checkPropertyNode(typeProperty)
        }
      })
    })
  }
}


/***/ }),

/***/ 927:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prop definitions should be detailed
 * @author Armano
 */


const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'require type definitions in props',
      category: 'strongly-recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/require-prop-types.md'
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create (context) {
    // ----------------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------------

    function objectHasType (node) {
      const typeProperty = node.properties
        .find(p =>
          utils.getStaticPropertyName(p.key) === 'type' &&
          (
            p.value.type !== 'ArrayExpression' ||
            p.value.elements.length > 0
          )
        )
      const validatorProperty = node.properties
        .find(p => utils.getStaticPropertyName(p.key) === 'validator')
      return Boolean(typeProperty || validatorProperty)
    }

    function checkProperties (items) {
      for (const cp of items) {
        if (cp.type !== 'Property') {
          return
        }
        let hasType = true
        if (cp.value.type === 'ObjectExpression') { // foo: {
          hasType = objectHasType(cp.value)
        } else if (cp.value.type === 'ArrayExpression') { // foo: [
          hasType = cp.value.elements.length > 0
        } else if (cp.value.type === 'FunctionExpression' || cp.value.type === 'ArrowFunctionExpression') {
          hasType = false
        }
        if (!hasType) {
          context.report({
            node: cp,
            message: 'Prop "{{name}}" should define at least its type.',
            data: {
              name: cp.key.name
            }
          })
        }
      }
    }

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return utils.executeOnVue(context, (obj) => {
      const node = obj.properties
        .find(p =>
          p.type === 'Property' &&
          p.key.type === 'Identifier' &&
          p.key.name === 'props'
        )

      if (!node) return

      if (node.value.type === 'ObjectExpression') {
        checkProperties(node.value.properties)
      }

      if (node.value.type === 'ArrayExpression') {
        context.report({
          node,
          message: 'Props should at least define their types.'
        })
      }
    })
  }
}


/***/ }),

/***/ 928:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforces render function to always return value.
 * @author Armano
 */


const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce render function to always return value',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/require-render-return.md'
    },
    fixable: null, // or "code" or "whitespace"
    schema: []
  },

  create (context) {
    const forbiddenNodes = []

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return Object.assign({},
      utils.executeOnFunctionsWithoutReturn(true, node => {
        forbiddenNodes.push(node)
      }),
      utils.executeOnVue(context, obj => {
        const node = obj.properties.find(item => item.type === 'Property' &&
          utils.getStaticPropertyName(item) === 'render' &&
          (item.value.type === 'ArrowFunctionExpression' || item.value.type === 'FunctionExpression')
        )
        if (!node) return

        forbiddenNodes.forEach(el => {
          if (node.value === el) {
            context.report({
              node: node.key,
              message: 'Expected to return a value in render function.'
            })
          }
        })
      })
    )
  }
}


/***/ }),

/***/ 929:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'require `v-bind:key` with `v-for` directives',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/require-v-for-key.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    /**
     * Check the given element about `v-bind:key` attributes.
     * @param {ASTNode} element The element node to check.
     */
    function checkKey (element) {
      if (element.name === 'template' || element.name === 'slot') {
        for (const child of element.children) {
          if (child.type === 'VElement') {
            checkKey(child)
          }
        }
      } else if (!utils.isCustomComponent(element) && !utils.hasDirective(element, 'bind', 'key')) {
        context.report({
          node: element.startTag,
          loc: element.startTag.loc,
          message: "Elements in iteration expect to have 'v-bind:key' directives."
        })
      }
    }

    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='for']" (node) {
        checkKey(node.parent.parent)
      }
    })
  }
}


/***/ }),

/***/ 930:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforces props default values to be valid.
 * @author Armano
 */

const utils = __webpack_require__(729)

const NATIVE_TYPES = new Set([
  'String',
  'Number',
  'Boolean',
  'Function',
  'Object',
  'Array',
  'Symbol'
])

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce props default values to be valid',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/require-valid-default-prop.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    // ----------------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------------

    function isPropertyIdentifier (node) {
      return node.type === 'Property' && node.key.type === 'Identifier'
    }

    function getPropertyNode (obj, name) {
      return obj.properties.find(p =>
        isPropertyIdentifier(p) &&
        p.key.name === name
      )
    }

    function getTypes (node) {
      if (node.type === 'Identifier') {
        return [node.name]
      } else if (node.type === 'ArrayExpression') {
        return node.elements
          .filter(item => item.type === 'Identifier')
          .map(item => item.name)
      }
      return []
    }

    function ucFirst (text) {
      return text[0].toUpperCase() + text.slice(1)
    }

    function getValueType (node) {
      if (node.type === 'CallExpression') { // Symbol(), Number() ...
        if (node.callee.type === 'Identifier' && NATIVE_TYPES.has(node.callee.name)) {
          return node.callee.name
        }
      } else if (node.type === 'TemplateLiteral') { // String
        return 'String'
      } else if (node.type === 'Literal') { // String, Boolean, Number
        if (node.value === null) return null
        const type = ucFirst(typeof node.value)
        if (NATIVE_TYPES.has(type)) {
          return type
        }
      } else if (node.type === 'ArrayExpression') { // Array
        return 'Array'
      } else if (node.type === 'ObjectExpression') { // Object
        return 'Object'
      }
      // FunctionExpression, ArrowFunctionExpression
      return null
    }

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return utils.executeOnVue(context, obj => {
      const props = obj.properties.find(p =>
        isPropertyIdentifier(p) &&
        p.key.name === 'props' &&
        p.value.type === 'ObjectExpression'
      )
      if (!props) return

      const properties = props.value.properties.filter(p =>
        isPropertyIdentifier(p) &&
        p.value.type === 'ObjectExpression'
      )

      for (const prop of properties) {
        const type = getPropertyNode(prop.value, 'type')
        if (!type) continue

        const typeNames = new Set(getTypes(type.value)
          .map(item => item === 'Object' || item === 'Array' ? 'Function' : item) // Object and Array require function
          .filter(item => NATIVE_TYPES.has(item)))

        // There is no native types detected
        if (typeNames.size === 0) continue

        const def = getPropertyNode(prop.value, 'default')
        if (!def) continue

        const defType = getValueType(def.value)
        if (!defType || typeNames.has(defType)) continue

        context.report({
          node: def,
          message: "Type of the default value for '{{name}}' prop must be a {{types}}.",
          data: {
            name: prop.key.name,
            types: Array.from(typeNames).join(' or ').toLowerCase()
          }
        })
      }
    })
  }
}


/***/ }),

/***/ 931:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforces that a return statement is present in computed property (return-in-computed-property)
 * @author Armano
 */


const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce that a return statement is present in computed property',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/return-in-computed-property.md'
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      {
        type: 'object',
        properties: {
          treatUndefinedAsUnspecified: {
            type: 'boolean'
          }
        },
        additionalProperties: false
      }
    ]
  },

  create (context) {
    const options = context.options[0] || {}
    const treatUndefinedAsUnspecified = !(options.treatUndefinedAsUnspecified === false)

    const forbiddenNodes = []

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return Object.assign({},
      utils.executeOnFunctionsWithoutReturn(treatUndefinedAsUnspecified, node => {
        forbiddenNodes.push(node)
      }),
      utils.executeOnVue(context, properties => {
        const computedProperties = utils.getComputedProperties(properties)

        computedProperties.forEach(cp => {
          forbiddenNodes.forEach(el => {
            if (cp.value && cp.value.parent === el) {
              context.report({
                node: el,
                message: 'Expected to return a value in "{{name}}" computed property.',
                data: {
                  name: cp.key
                }
              })
            }
          })
        })
      })
    )
  }
}


/***/ }),

/***/ 932:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const indentCommon = __webpack_require__(896)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce consistent indentation in `<script>`',
      category: undefined,
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/script-indent.md'
    },
    fixable: 'whitespace',
    schema: [
      {
        anyOf: [
          { type: 'integer', minimum: 1 },
          { enum: ['tab'] }
        ]
      },
      {
        type: 'object',
        properties: {
          'baseIndent': { type: 'integer', minimum: 0 },
          'switchCase': { type: 'integer', minimum: 0 },
          'ignores': {
            type: 'array',
            items: {
              allOf: [
                { type: 'string' },
                { not: { type: 'string', pattern: ':exit$' }},
                { not: { type: 'string', pattern: '^\\s*$' }}
              ]
            },
            uniqueItems: true,
            additionalItems: false
          }
        },
        additionalProperties: false
      }
    ]
  },
  create (context) {
    return indentCommon.defineVisitor(context, context.getSourceCode(), {})
  }
}


/***/ }),

/***/ 933:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

function isSinglelineElement (element) {
  return element.loc.start.line === element.endTag.loc.start.line
}

function parseOptions (options) {
  return Object.assign({
    'ignores': ['pre', 'textarea'],
    'ignoreWhenNoAttributes': true
  }, options)
}

/**
 * Check whether the given element is empty or not.
 * This ignores whitespaces, doesn't ignore comments.
 * @param {VElement} node The element node to check.
 * @param {SourceCode} sourceCode The source code object of the current context.
 * @returns {boolean} `true` if the element is empty.
 */
function isEmpty (node, sourceCode) {
  const start = node.startTag.range[1]
  const end = node.endTag.range[0]
  return sourceCode.text.slice(start, end).trim() === ''
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'require a line break before and after the contents of a singleline element',
      category: undefined,
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/singleline-html-element-content-newline.md'
    },
    fixable: 'whitespace',
    schema: [{
      type: 'object',
      properties: {
        'ignoreWhenNoAttributes': {
          type: 'boolean'
        },
        'ignores': {
          type: 'array',
          items: { type: 'string' },
          uniqueItems: true,
          additionalItems: false
        }
      },
      additionalProperties: false
    }],
    messages: {
      unexpectedAfterClosingBracket: 'Expected 1 line break after opening tag (`<{{name}}>`), but no line breaks found.',
      unexpectedBeforeOpeningBracket: 'Expected 1 line break before closing tag (`</{{name}}>`), but no line breaks found.'
    }
  },

  create (context) {
    const options = parseOptions(context.options[0])
    const ignores = options.ignores
    const ignoreWhenNoAttributes = options.ignoreWhenNoAttributes
    const template = context.parserServices.getTemplateBodyTokenStore && context.parserServices.getTemplateBodyTokenStore()
    const sourceCode = context.getSourceCode()

    let inIgnoreElement

    return utils.defineTemplateBodyVisitor(context, {
      'VElement' (node) {
        if (inIgnoreElement) {
          return
        }
        if (ignores.indexOf(node.name) >= 0) {
          // ignore element name
          inIgnoreElement = node
          return
        }
        if (node.startTag.selfClosing || !node.endTag) {
          // self closing
          return
        }

        if (!isSinglelineElement(node)) {
          return
        }
        if (ignoreWhenNoAttributes && node.startTag.attributes.length === 0) {
          return
        }

        const getTokenOption = { includeComments: true, filter: (token) => token.type !== 'HTMLWhitespace' }
        const contentFirst = template.getTokenAfter(node.startTag, getTokenOption)
        const contentLast = template.getTokenBefore(node.endTag, getTokenOption)

        context.report({
          node: template.getLastToken(node.startTag),
          loc: {
            start: node.startTag.loc.end,
            end: contentFirst.loc.start
          },
          messageId: 'unexpectedAfterClosingBracket',
          data: {
            name: node.name
          },
          fix (fixer) {
            const range = [node.startTag.range[1], contentFirst.range[0]]
            return fixer.replaceTextRange(range, '\n')
          }
        })

        if (isEmpty(node, sourceCode)) {
          return
        }

        context.report({
          node: template.getFirstToken(node.endTag),
          loc: {
            start: contentLast.loc.end,
            end: node.endTag.loc.start
          },
          messageId: 'unexpectedBeforeOpeningBracket',
          data: {
            name: node.name
          },
          fix (fixer) {
            const range = [contentLast.range[1], node.endTag.range[0]]
            return fixer.replaceTextRange(range, '\n')
          }
        })
      },
      'VElement:exit' (node) {
        if (inIgnoreElement === node) {
          inIgnoreElement = null
        }
      }
    })
  }
}


/***/ }),

/***/ 934:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview enforce usage of `this` in template.
 * @author Armano
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)
const RESERVED_NAMES = new Set(__webpack_require__(935))

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce usage of `this` in template',
      category: 'recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/this-in-template.md'
    },
    fixable: null,
    schema: [
      {
        enum: ['always', 'never']
      }
    ]
  },

  /**
   * Creates AST event handlers for this-in-template.
   *
   * @param {RuleContext} context - The rule context.
   * @returns {Object} AST event handlers.
   */
  create (context) {
    const options = context.options[0] !== 'always' ? 'never' : 'always'
    let scope = {
      parent: null,
      nodes: []
    }

    return utils.defineTemplateBodyVisitor(context, Object.assign({
      VElement (node) {
        scope = {
          parent: scope,
          nodes: scope.nodes.slice() // make copy
        }
        if (node.variables) {
          for (const variable of node.variables) {
            const varNode = variable.id
            const name = varNode.name
            if (!scope.nodes.some(node => node.name === name)) { // Prevent adding duplicates
              scope.nodes.push(varNode)
            }
          }
        }
      },
      'VElement:exit' (node) {
        scope = scope.parent
      }
    }, options === 'never'
      ? {
        'VExpressionContainer MemberExpression > ThisExpression' (node) {
          const propertyName = utils.getStaticPropertyName(node.parent.property)
          if (!propertyName ||
            scope.nodes.some(el => el.name === propertyName) ||
            RESERVED_NAMES.has(propertyName) || // this.class | this['class']
            /^[0-9].*$|[^a-zA-Z0-9_]/.test(propertyName) // this['0aaaa'] | this['foo-bar bas']
          ) {
            return
          }

          context.report({
            node,
            loc: node.loc,
            message: "Unexpected usage of 'this'."
          })
        }
      }
      : {
        'VExpressionContainer' (node) {
          if (node.references) {
            for (const reference of node.references) {
              if (!scope.nodes.some(el => el.name === reference.id.name)) {
                context.report({
                  node: reference.id,
                  loc: reference.id.loc,
                  message: "Expected 'this'."
                })
              }
            }
          }
        }
      }
    ))
  }
}


/***/ }),

/***/ 935:
/***/ (function(module) {

module.exports = ["abstract","arguments","await","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete","do","double","else","enum","eval","export","extends","false","final","finally","float","for","function","goto","if","implements","import","in","instanceof","int","interface","let","long","native","new","null","package","private","protected","public","return","short","static","super","switch","synchronized","this","throw","throws","transient","true","try","typeof","var","void","volatile","while","with","yield"];

/***/ }),

/***/ 936:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce `v-bind` directive style',
      category: 'strongly-recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/v-bind-style.md'
    },
    fixable: 'code',
    schema: [
      { enum: ['shorthand', 'longform'] }
    ]
  },

  create (context) {
    const shorthand = context.options[0] !== 'longform'

    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='bind'][key.argument!=null]" (node) {
        if (node.key.shorthand === shorthand) {
          return
        }

        context.report({
          node,
          loc: node.loc,
          message: shorthand
            ? "Unexpected 'v-bind' before ':'."
            : "Expected 'v-bind' before ':'.",
          fix: (fixer) => shorthand
            ? fixer.removeRange([node.range[0], node.range[0] + 6])
            : fixer.insertTextBefore(node, 'v-bind')
        })
      }
    })
  }
}


/***/ }),

/***/ 937:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce `v-on` directive style',
      category: 'strongly-recommended',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/v-on-style.md'
    },
    fixable: 'code',
    schema: [
      { enum: ['shorthand', 'longform'] }
    ]
  },

  create (context) {
    const shorthand = context.options[0] !== 'longform'

    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='on'][key.argument!=null]" (node) {
        if (node.key.shorthand === shorthand) {
          return
        }

        const pos = node.range[0]
        context.report({
          node,
          loc: node.loc,
          message: shorthand
            ? "Expected '@' instead of 'v-on:'."
            : "Expected 'v-on:' instead of '@'.",
          fix: (fixer) => shorthand
            ? fixer.replaceTextRange([pos, pos + 5], '@')
            : fixer.replaceTextRange([pos, pos + 1], 'v-on:')
        })
      }
    })
  }
}


/***/ }),

/***/ 938:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce valid template root',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/valid-template-root.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    const sourceCode = context.getSourceCode()

    return {
      Program (program) {
        const element = program.templateBody
        if (element == null) {
          return
        }

        const hasSrc = utils.hasAttribute(element, 'src')
        const rootElements = []
        let extraText = null
        let extraElement = null
        let vIf = false
        for (const child of element.children) {
          if (child.type === 'VElement') {
            if (rootElements.length === 0 && !hasSrc) {
              rootElements.push(child)
              vIf = utils.hasDirective(child, 'if')
            } else if (vIf && utils.hasDirective(child, 'else-if')) {
              rootElements.push(child)
            } else if (vIf && utils.hasDirective(child, 'else')) {
              rootElements.push(child)
              vIf = false
            } else {
              extraElement = child
            }
          } else if (sourceCode.getText(child).trim() !== '') {
            extraText = child
          }
        }

        if (hasSrc && (extraText != null || extraElement != null)) {
          context.report({
            node: extraText || extraElement,
            loc: (extraText || extraElement).loc,
            message: "The template root with 'src' attribute is required to be empty."
          })
        } else if (extraText != null) {
          context.report({
            node: extraText,
            loc: extraText.loc,
            message: 'The template root requires an element rather than texts.'
          })
        } else if (extraElement != null) {
          context.report({
            node: extraElement,
            loc: extraElement.loc,
            message: 'The template root requires exactly one element.'
          })
        } else if (rootElements.length === 0 && !hasSrc) {
          context.report({
            node: element,
            loc: element.loc,
            message: 'The template root requires exactly one element.'
          })
        } else {
          for (const element of rootElements) {
            const tag = element.startTag
            const name = element.name

            if (name === 'template' || name === 'slot') {
              context.report({
                node: tag,
                loc: tag.loc,
                message: "The template root disallows '<{{name}}>' elements.",
                data: { name }
              })
            }
            if (utils.hasDirective(element, 'for')) {
              context.report({
                node: tag,
                loc: tag.loc,
                message: "The template root disallows 'v-for' directives."
              })
            }
          }
        }
      }
    }
  }
}


/***/ }),

/***/ 939:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

const VALID_MODIFIERS = new Set(['prop', 'camel', 'sync'])

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce valid `v-bind` directives',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/valid-v-bind.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='bind']" (node) {
        for (const modifier of node.key.modifiers) {
          if (!VALID_MODIFIERS.has(modifier)) {
            context.report({
              node,
              loc: node.key.loc,
              message: "'v-bind' directives don't support the modifier '{{name}}'.",
              data: { name: modifier }
            })
          }
        }

        if (!utils.hasAttributeValue(node)) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-bind' directives require an attribute value."
          })
        }
      }
    })
  }
}


/***/ }),

/***/ 940:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce valid `v-cloak` directives',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/valid-v-cloak.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='cloak']" (node) {
        if (node.key.argument) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-cloak' directives require no argument."
          })
        }
        if (node.key.modifiers.length > 0) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-cloak' directives require no modifier."
          })
        }
        if (node.value) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-cloak' directives require no attribute value."
          })
        }
      }
    })
  }
}


/***/ }),

/***/ 941:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce valid `v-else-if` directives',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/valid-v-else-if.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='else-if']" (node) {
        const element = node.parent.parent

        if (!utils.prevElementHasIf(element)) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-else-if' directives require being preceded by the element which has a 'v-if' or 'v-else-if' directive."
          })
        }
        if (utils.hasDirective(element, 'if')) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-else-if' and 'v-if' directives can't exist on the same element."
          })
        }
        if (utils.hasDirective(element, 'else')) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-else-if' and 'v-else' directives can't exist on the same element."
          })
        }
        if (node.key.argument) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-else-if' directives require no argument."
          })
        }
        if (node.key.modifiers.length > 0) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-else-if' directives require no modifier."
          })
        }
        if (!utils.hasAttributeValue(node)) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-else-if' directives require that attribute value."
          })
        }
      }
    })
  }
}


/***/ }),

/***/ 942:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce valid `v-else` directives',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/valid-v-else.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='else']" (node) {
        const element = node.parent.parent

        if (!utils.prevElementHasIf(element)) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-else' directives require being preceded by the element which has a 'v-if' or 'v-else' directive."
          })
        }
        if (utils.hasDirective(element, 'if')) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-else' and 'v-if' directives can't exist on the same element. You may want 'v-else-if' directives."
          })
        }
        if (utils.hasDirective(element, 'else-if')) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-else' and 'v-else-if' directives can't exist on the same element."
          })
        }
        if (node.key.argument) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-else' directives require no argument."
          })
        }
        if (node.key.modifiers.length > 0) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-else' directives require no modifier."
          })
        }
        if (utils.hasAttributeValue(node)) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-else' directives require no attribute value."
          })
        }
      }
    })
  }
}


/***/ }),

/***/ 943:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Check whether the given attribute is using the variables which are defined by `v-for` directives.
 * @param {ASTNode} vFor The attribute node of `v-for` to check.
 * @param {ASTNode} vBindKey The attribute node of `v-bind:key` to check.
 * @returns {boolean} `true` if the node is using the variables which are defined by `v-for` directives.
 */
function isUsingIterationVar (vFor, vBindKey) {
  if (vBindKey.value == null) {
    return false
  }
  const references = vBindKey.value.references
  const variables = vFor.parent.parent.variables
  return references.some(reference =>
    variables.some(variable =>
      variable.id.name === reference.id.name &&
            variable.kind === 'v-for'
    )
  )
}

/**
 * Check the child element in tempalte v-for about `v-bind:key` attributes.
 * @param {RuleContext} context The rule context to report.
 * @param {ASTNode} vFor The attribute node of `v-for` to check.
 * @param {ASTNode} child The child node to check.
 */
function checkChildKey (context, vFor, child) {
  const childFor = utils.getDirective(child, 'for')
  // if child has v-for, check if parent iterator is used in v-for
  if (childFor != null) {
    const childForRefs = childFor.value.references
    const variables = vFor.parent.parent.variables
    const usedInFor = childForRefs.some(cref =>
      variables.some(variable =>
        cref.id.name === variable.id.name &&
        variable.kind === 'v-for'
      )
    )
    // if parent iterator is used, skip other checks
    // iterator usage will be checked later by child v-for
    if (usedInFor) {
      return
    }
  }
  // otherwise, check if parent iterator is directly used in child's key
  checkKey(context, vFor, child)
}

/**
 * Check the given element about `v-bind:key` attributes.
 * @param {RuleContext} context The rule context to report.
 * @param {ASTNode} vFor The attribute node of `v-for` to check.
 * @param {ASTNode} element The element node to check.
 */
function checkKey (context, vFor, element) {
  if (element.name === 'template') {
    for (const child of element.children) {
      if (child.type === 'VElement') {
        checkChildKey(context, vFor, child)
      }
    }
    return
  }

  const vBindKey = utils.getDirective(element, 'bind', 'key')

  if (utils.isCustomComponent(element) && vBindKey == null) {
    context.report({
      node: element.startTag,
      loc: element.startTag.loc,
      message: "Custom elements in iteration require 'v-bind:key' directives."
    })
  }
  if (vBindKey != null && !isUsingIterationVar(vFor, vBindKey)) {
    context.report({
      node: vBindKey,
      loc: vBindKey.loc,
      message: "Expected 'v-bind:key' directive to use the variables which are defined by the 'v-for' directive."
    })
  }
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce valid `v-for` directives',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/valid-v-for.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    const sourceCode = context.getSourceCode()

    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='for']" (node) {
        const element = node.parent.parent

        checkKey(context, node, element)

        if (node.key.argument) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-for' directives require no argument."
          })
        }
        if (node.key.modifiers.length > 0) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-for' directives require no modifier."
          })
        }
        if (!utils.hasAttributeValue(node)) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-for' directives require that attribute value."
          })
          return
        }

        const expr = node.value.expression
        if (expr == null) {
          return
        }
        if (expr.type !== 'VForExpression') {
          context.report({
            node: node.value,
            loc: node.value.loc,
            message: "'v-for' directives require the special syntax '<alias> in <expression>'."
          })
          return
        }

        const lhs = expr.left
        const value = lhs[0]
        const key = lhs[1]
        const index = lhs[2]

        if (value === null) {
          context.report({
            node: value || expr,
            loc: value && value.loc,
            message: "Invalid alias ''."
          })
        }
        if (key !== undefined && (!key || key.type !== 'Identifier')) {
          context.report({
            node: key || expr,
            loc: key && key.loc,
            message: "Invalid alias '{{text}}'.",
            data: { text: key ? sourceCode.getText(key) : '' }
          })
        }
        if (index !== undefined && (!index || index.type !== 'Identifier')) {
          context.report({
            node: index || expr,
            loc: index && index.loc,
            message: "Invalid alias '{{text}}'.",
            data: { text: index ? sourceCode.getText(index) : '' }
          })
        }
      }
    })
  }
}


/***/ }),

/***/ 944:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce valid `v-html` directives',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/valid-v-html.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='html']" (node) {
        if (node.key.argument) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-html' directives require no argument."
          })
        }
        if (node.key.modifiers.length > 0) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-html' directives require no modifier."
          })
        }
        if (!utils.hasAttributeValue(node)) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-html' directives require that attribute value."
          })
        }
      }
    })
  }
}


/***/ }),

/***/ 945:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce valid `v-if` directives',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/valid-v-if.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='if']" (node) {
        const element = node.parent.parent

        if (utils.hasDirective(element, 'else')) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-if' and 'v-else' directives can't exist on the same element. You may want 'v-else-if' directives."
          })
        }
        if (utils.hasDirective(element, 'else-if')) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-if' and 'v-else-if' directives can't exist on the same element."
          })
        }
        if (node.key.argument) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-if' directives require no argument."
          })
        }
        if (node.key.modifiers.length > 0) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-if' directives require no modifier."
          })
        }
        if (!utils.hasAttributeValue(node)) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-if' directives require that attribute value."
          })
        }
      }
    })
  }
}


/***/ }),

/***/ 946:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

const VALID_MODIFIERS = new Set(['lazy', 'number', 'trim'])

/**
 * Check whether the given node is valid or not.
 * @param {ASTNode} node The element node to check.
 * @returns {boolean} `true` if the node is valid.
 */
function isValidElement (node) {
  const name = node.name
  return (
    name === 'input' ||
    name === 'select' ||
    name === 'textarea' ||
    (
      name !== 'keep-alive' &&
      name !== 'slot' &&
      name !== 'transition' &&
      name !== 'transition-group' &&
      utils.isCustomComponent(node)
    )
  )
}

/**
 * Check whether the given node can be LHS.
 * @param {ASTNode} node The node to check.
 * @returns {boolean} `true` if the node can be LHS.
 */
function isLhs (node) {
  return node != null && (
    node.type === 'Identifier' ||
    node.type === 'MemberExpression'
  )
}

/**
 * Get the variable by names.
 * @param {string} name The variable name to find.
 * @param {ASTNode} leafNode The node to look up.
 * @returns {Variable|null} The found variable or null.
 */
function getVariable (name, leafNode) {
  let node = leafNode

  while (node != null) {
    const variables = node.variables
    const variable = variables && variables.find(v => v.id.name === name)

    if (variable != null) {
      return variable
    }

    node = node.parent
  }

  return null
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce valid `v-model` directives',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/valid-v-model.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='model']" (node) {
        const element = node.parent.parent
        const name = element.name

        if (!isValidElement(element)) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-model' directives aren't supported on <{{name}}> elements.",
            data: { name }
          })
        }

        if (name === 'input' && utils.hasAttribute(element, 'type', 'file')) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-model' directives don't support 'file' input type."
          })
        }

        if (node.key.argument) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-model' directives require no argument."
          })
        }

        for (const modifier of node.key.modifiers) {
          if (!VALID_MODIFIERS.has(modifier)) {
            context.report({
              node,
              loc: node.loc,
              message: "'v-model' directives don't support the modifier '{{name}}'.",
              data: { name: modifier }
            })
          }
        }
        if (!utils.hasAttributeValue(node)) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-model' directives require that attribute value."
          })
        }
        if (node.value) {
          if (!isLhs(node.value.expression)) {
            context.report({
              node,
              loc: node.loc,
              message: "'v-model' directives require the attribute value which is valid as LHS."
            })
          }

          for (const reference of node.value.references) {
            const id = reference.id
            if (id.parent.type === 'MemberExpression' || id.parent.type === 'BinaryExpression') {
              continue
            }

            const variable = getVariable(id.name, element)
            if (variable != null) {
              context.report({
                node,
                loc: node.loc,
                message: "'v-model' directives cannot update the iteration variable 'x' itself."
              })
            }
          }
        }
      }
    })
  }
}


/***/ }),

/***/ 947:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

const VALID_MODIFIERS = new Set([
  'stop', 'prevent', 'capture', 'self', 'ctrl', 'shift', 'alt', 'meta',
  'native', 'once', 'left', 'right', 'middle', 'passive', 'esc', 'tab',
  'enter', 'space', 'up', 'left', 'right', 'down', 'delete', 'exact'
])
const VERB_MODIFIERS = new Set([
  'stop', 'prevent'
])
// https://www.w3.org/TR/uievents-key/
const KEY_ALIASES = new Set([
  'unidentified', 'alt', 'alt-graph', 'caps-lock', 'control', 'fn', 'fn-lock',
  'meta', 'num-lock', 'scroll-lock', 'shift', 'symbol', 'symbol-lock', 'hyper',
  'super', 'enter', 'tab', 'arrow-down', 'arrow-left', 'arrow-right',
  'arrow-up', 'end', 'home', 'page-down', 'page-up', 'backspace', 'clear',
  'copy', 'cr-sel', 'cut', 'delete', 'erase-eof', 'ex-sel', 'insert', 'paste',
  'redo', 'undo', 'accept', 'again', 'attn', 'cancel', 'context-menu', 'escape',
  'execute', 'find', 'help', 'pause', 'select', 'zoom-in', 'zoom-out',
  'brightness-down', 'brightness-up', 'eject', 'log-off', 'power',
  'print-screen', 'hibernate', 'standby', 'wake-up', 'all-candidates',
  'alphanumeric', 'code-input', 'compose', 'convert', 'dead', 'final-mode',
  'group-first', 'group-last', 'group-next', 'group-previous', 'mode-change',
  'next-candidate', 'non-convert', 'previous-candidate', 'process',
  'single-candidate', 'hangul-mode', 'hanja-mode', 'junja-mode', 'eisu',
  'hankaku', 'hiragana', 'hiragana-katakana', 'kana-mode', 'kanji-mode',
  'katakana', 'romaji', 'zenkaku', 'zenkaku-hankaku', 'f1', 'f2', 'f3', 'f4',
  'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12', 'soft1', 'soft2', 'soft3',
  'soft4', 'channel-down', 'channel-up', 'close', 'mail-forward', 'mail-reply',
  'mail-send', 'media-close', 'media-fast-forward', 'media-pause',
  'media-play-pause', 'media-record', 'media-rewind', 'media-stop',
  'media-track-next', 'media-track-previous', 'new', 'open', 'print', 'save',
  'spell-check', 'key11', 'key12', 'audio-balance-left', 'audio-balance-right',
  'audio-bass-boost-down', 'audio-bass-boost-toggle', 'audio-bass-boost-up',
  'audio-fader-front', 'audio-fader-rear', 'audio-surround-mode-next',
  'audio-treble-down', 'audio-treble-up', 'audio-volume-down',
  'audio-volume-up', 'audio-volume-mute', 'microphone-toggle',
  'microphone-volume-down', 'microphone-volume-up', 'microphone-volume-mute',
  'speech-correction-list', 'speech-input-toggle', 'launch-application1',
  'launch-application2', 'launch-calendar', 'launch-contacts', 'launch-mail',
  'launch-media-player', 'launch-music-player', 'launch-phone',
  'launch-screen-saver', 'launch-spreadsheet', 'launch-web-browser',
  'launch-web-cam', 'launch-word-processor', 'browser-back',
  'browser-favorites', 'browser-forward', 'browser-home', 'browser-refresh',
  'browser-search', 'browser-stop', 'app-switch', 'call', 'camera',
  'camera-focus', 'end-call', 'go-back', 'go-home', 'headset-hook',
  'last-number-redial', 'notification', 'manner-mode', 'voice-dial', 't-v',
  't-v3-d-mode', 't-v-antenna-cable', 't-v-audio-description',
  't-v-audio-description-mix-down', 't-v-audio-description-mix-up',
  't-v-contents-menu', 't-v-data-service', 't-v-input', 't-v-input-component1',
  't-v-input-component2', 't-v-input-composite1', 't-v-input-composite2',
  't-v-input-h-d-m-i1', 't-v-input-h-d-m-i2', 't-v-input-h-d-m-i3',
  't-v-input-h-d-m-i4', 't-v-input-v-g-a1', 't-v-media-context', 't-v-network',
  't-v-number-entry', 't-v-power', 't-v-radio-service', 't-v-satellite',
  't-v-satellite-b-s', 't-v-satellite-c-s', 't-v-satellite-toggle',
  't-v-terrestrial-analog', 't-v-terrestrial-digital', 't-v-timer',
  'a-v-r-input', 'a-v-r-power', 'color-f0-red', 'color-f1-green',
  'color-f2-yellow', 'color-f3-blue', 'color-f4-grey', 'color-f5-brown',
  'closed-caption-toggle', 'dimmer', 'display-swap', 'd-v-r', 'exit',
  'favorite-clear0', 'favorite-clear1', 'favorite-clear2', 'favorite-clear3',
  'favorite-recall0', 'favorite-recall1', 'favorite-recall2',
  'favorite-recall3', 'favorite-store0', 'favorite-store1', 'favorite-store2',
  'favorite-store3', 'guide', 'guide-next-day', 'guide-previous-day', 'info',
  'instant-replay', 'link', 'list-program', 'live-content', 'lock',
  'media-apps', 'media-last', 'media-skip-backward', 'media-skip-forward',
  'media-step-backward', 'media-step-forward', 'media-top-menu', 'navigate-in',
  'navigate-next', 'navigate-out', 'navigate-previous', 'next-favorite-channel',
  'next-user-profile', 'on-demand', 'pairing', 'pin-p-down', 'pin-p-move',
  'pin-p-toggle', 'pin-p-up', 'play-speed-down', 'play-speed-reset',
  'play-speed-up', 'random-toggle', 'rc-low-battery', 'record-speed-next',
  'rf-bypass', 'scan-channels-toggle', 'screen-mode-next', 'settings',
  'split-screen-toggle', 's-t-b-input', 's-t-b-power', 'subtitle', 'teletext',
  'video-mode-next', 'wink', 'zoom-toggle', 'audio-volume-down',
  'audio-volume-up', 'audio-volume-mute', 'browser-back', 'browser-forward',
  'channel-down', 'channel-up', 'context-menu', 'eject', 'end', 'enter', 'home',
  'media-fast-forward', 'media-play', 'media-play-pause', 'media-record',
  'media-rewind', 'media-stop', 'media-next-track', 'media-pause',
  'media-previous-track', 'power', 'unidentified'
])

function isValidModifier (modifier) {
  return (
    // built-in aliases
    VALID_MODIFIERS.has(modifier) ||
    // keyCode
    Number.isInteger(parseInt(modifier, 10)) ||
    // keyAlias (an Unicode character)
    Array.from(modifier).length === 1 ||
    // keyAlias (special keys)
    KEY_ALIASES.has(modifier)
  )
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce valid `v-on` directives',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/valid-v-on.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='on']" (node) {
        for (const modifier of node.key.modifiers) {
          if (!isValidModifier(modifier)) {
            context.report({
              node,
              loc: node.loc,
              message: "'v-on' directives don't support the modifier '{{modifier}}'.",
              data: { modifier }
            })
          }
        }
        if (!utils.hasAttributeValue(node) && !node.key.modifiers.some(VERB_MODIFIERS.has, VERB_MODIFIERS)) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-on' directives require that attribute value or verb modifiers."
          })
        }
      }
    })
  }
}


/***/ }),

/***/ 948:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce valid `v-once` directives',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/valid-v-once.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='once']" (node) {
        if (node.key.argument) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-once' directives require no argument."
          })
        }
        if (node.key.modifiers.length > 0) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-once' directives require no modifier."
          })
        }
        if (node.value) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-once' directives require no attribute value."
          })
        }
      }
    })
  }
}


/***/ }),

/***/ 949:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce valid `v-pre` directives',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/valid-v-pre.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='pre']" (node) {
        if (node.key.argument) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-pre' directives require no argument."
          })
        }
        if (node.key.modifiers.length > 0) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-pre' directives require no modifier."
          })
        }
        if (node.value) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-pre' directives require no attribute value."
          })
        }
      }
    })
  }
}


/***/ }),

/***/ 950:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce valid `v-show` directives',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/valid-v-show.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='show']" (node) {
        if (node.key.argument) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-show' directives require no argument."
          })
        }
        if (node.key.modifiers.length > 0) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-show' directives require no modifier."
          })
        }
        if (!utils.hasAttributeValue(node)) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-show' directives require that attribute value."
          })
        }
      }
    })
  }
}


/***/ }),

/***/ 951:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = __webpack_require__(729)

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce valid `v-text` directives',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0-beta.3/docs/rules/valid-v-text.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='text']" (node) {
        if (node.key.argument) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-text' directives require no argument."
          })
        }
        if (node.key.modifiers.length > 0) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-text' directives require no modifier."
          })
        }
        if (!utils.hasAttributeValue(node)) {
          context.report({
            node,
            loc: node.loc,
            message: "'v-text' directives require that attribute value."
          })
        }
      }
    })
  }
}


/***/ }),

/***/ 952:
/***/ (function(module, exports, __webpack_require__) {

/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update it's content execute "npm run update"
 */
module.exports = {
  parser: /*require.resolve*/(732),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    es6: true
  },
  plugins: [
    'vue'
  ],
  rules: {
    'vue/comment-directive': 'error',
    'vue/jsx-uses-vars': 'error'
  }
}


/***/ }),

/***/ 953:
/***/ (function(module, exports, __webpack_require__) {

/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update it's content execute "npm run update"
 */
module.exports = {
  extends: /*require.resolve*/(952),
  rules: {
    'vue/no-async-in-computed-properties': 'error',
    'vue/no-dupe-keys': 'error',
    'vue/no-duplicate-attributes': 'error',
    'vue/no-parsing-error': 'error',
    'vue/no-reserved-keys': 'error',
    'vue/no-shared-component-data': 'error',
    'vue/no-side-effects-in-computed-properties': 'error',
    'vue/no-template-key': 'error',
    'vue/no-textarea-mustache': 'error',
    'vue/no-unused-components': 'error',
    'vue/no-unused-vars': 'error',
    'vue/no-use-v-if-with-v-for': 'error',
    'vue/require-component-is': 'error',
    'vue/require-prop-type-constructor': 'error',
    'vue/require-render-return': 'error',
    'vue/require-v-for-key': 'error',
    'vue/require-valid-default-prop': 'error',
    'vue/return-in-computed-property': 'error',
    'vue/valid-template-root': 'error',
    'vue/valid-v-bind': 'error',
    'vue/valid-v-cloak': 'error',
    'vue/valid-v-else-if': 'error',
    'vue/valid-v-else': 'error',
    'vue/valid-v-for': 'error',
    'vue/valid-v-html': 'error',
    'vue/valid-v-if': 'error',
    'vue/valid-v-model': 'error',
    'vue/valid-v-on': 'error',
    'vue/valid-v-once': 'error',
    'vue/valid-v-pre': 'error',
    'vue/valid-v-show': 'error',
    'vue/valid-v-text': 'error'
  }
}


/***/ }),

/***/ 954:
/***/ (function(module, exports, __webpack_require__) {

/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update it's content execute "npm run update"
 */
module.exports = {
  extends: /*require.resolve*/(953),
  rules: {
    'vue/attribute-hyphenation': 'error',
    'vue/html-closing-bracket-newline': 'error',
    'vue/html-closing-bracket-spacing': 'error',
    'vue/html-end-tags': 'error',
    'vue/html-indent': 'error',
    'vue/html-self-closing': 'error',
    'vue/max-attributes-per-line': 'error',
    'vue/mustache-interpolation-spacing': 'error',
    'vue/name-property-casing': 'error',
    'vue/no-multi-spaces': 'error',
    'vue/no-template-shadow': 'error',
    'vue/prop-name-casing': 'error',
    'vue/require-default-prop': 'error',
    'vue/require-prop-types': 'error',
    'vue/v-bind-style': 'error',
    'vue/v-on-style': 'error'
  }
}


/***/ }),

/***/ 955:
/***/ (function(module, exports, __webpack_require__) {

/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update it's content execute "npm run update"
 */
module.exports = {
  extends: /*require.resolve*/(954),
  rules: {
    'vue/attributes-order': 'error',
    'vue/html-quotes': 'error',
    'vue/no-v-html': 'error',
    'vue/order-in-components': 'error',
    'vue/this-in-template': 'error'
  }
}


/***/ }),

/***/ 956:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 */


module.exports = {
  preprocess (code) {
    return [code]
  },

  postprocess (messages) {
    const state = {
      block: {
        disableAll: false,
        disableRules: new Set()
      },
      line: {
        disableAll: false,
        disableRules: new Set()
      }
    }

    // Filter messages which are in disabled area.
    return messages[0].filter(message => {
      if (message.ruleId === 'vue/comment-directive') {
        const rules = message.message.split(' ')
        const type = rules.shift()
        const group = rules.shift()
        switch (type) {
          case '--':
            state[group].disableAll = true
            break
          case '++':
            state[group].disableAll = false
            break
          case '-':
            for (const rule of rules) {
              state[group].disableRules.add(rule)
            }
            break
          case '+':
            for (const rule of rules) {
              state[group].disableRules.delete(rule)
            }
            break
          case 'clear':
            state.block.disableAll = false
            state.block.disableRules.clear()
            state.line.disableAll = false
            state.line.disableRules.clear()
            break
        }
        return false
      } else {
        return !(
          state.block.disableAll ||
          state.line.disableAll ||
          state.block.disableRules.has(message.ruleId) ||
          state.line.disableRules.has(message.ruleId)
        )
      }
    })
  },

  supportsAutofix: true
}


/***/ })

}]);