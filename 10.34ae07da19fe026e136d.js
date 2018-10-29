(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ 1027:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  rules: {
    'param-names': __webpack_require__(1028),
    'no-return-wrap': __webpack_require__(1030),
    'always-return': __webpack_require__(1033),
    'catch-or-return': __webpack_require__(1034),
    'prefer-await-to-callbacks': __webpack_require__(1035),
    'prefer-await-to-then': __webpack_require__(1036),
    'no-native': __webpack_require__(1037),
    'no-callback-in-promise': __webpack_require__(1038),
    'no-promise-in-callback': __webpack_require__(1043),
    'no-nesting': __webpack_require__(1045),
    'avoid-new': __webpack_require__(1046),
    'no-new-statics': __webpack_require__(1047),
    'no-return-in-finally': __webpack_require__(1048),
    'valid-params': __webpack_require__(1049)
  },
  rulesConfig: {
    'param-names': 1,
    'always-return': 1,
    'no-return-wrap': 1,
    'no-native': 0,
    'catch-or-return': 1
  },
  configs: {
    recommended: {
      rules: {
        'promise/always-return': 'error',
        'promise/no-return-wrap': 'error',
        'promise/param-names': 'error',
        'promise/catch-or-return': 'error',
        'promise/no-native': 'off',
        'promise/no-nesting': 'warn',
        'promise/no-promise-in-callback': 'warn',
        'promise/no-callback-in-promise': 'warn',
        'promise/avoid-new': 'warn',
        'promise/no-new-statics': 'error',
        'promise/no-return-in-finally': 'warn',
        'promise/valid-params': 'warn'
      }
    }
  }
}


/***/ }),

/***/ 1028:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const getDocsUrl = __webpack_require__(1029)

module.exports = {
  meta: {
    docs: {
      url: getDocsUrl('param-names')
    },
    fixable: 'code'
  },
  create(context) {
    return {
      NewExpression(node) {
        if (node.callee.name === 'Promise' && node.arguments.length === 1) {
          const params = node.arguments[0].params

          if (!params || !params.length) {
            return
          }

          if (
            params[0].name !== 'resolve' ||
            (params[1] && params[1].name !== 'reject')
          ) {
            context.report({
              node,
              message:
                'Promise constructor parameters must be named resolve, reject',
              fix(fixer) {
                return [
                  fixer.replaceText(params[0], 'resolve'),
                  params[1] && fixer.replaceText(params[1], 'reject')
                ].filter(Boolean)
              }
            })
          }
        }
      }
    }
  }
}


/***/ }),

/***/ 1029:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const pkg = __webpack_require__(561)

const REPO_URL = 'https://github.com/xjamundx/eslint-plugin-promise'

/**
 * Generates the URL to documentation for the given rule name. It uses the
 * package version to build the link to a tagged version of the
 * documentation file.
 *
 * @param {string} ruleName - Name of the eslint rule
 * @returns {string} URL to the documentation for the given rule
 */
function getDocsUrl(ruleName) {
  return `${REPO_URL}/tree/v${pkg.version}/docs/rules/${ruleName}.md`
}

module.exports = getDocsUrl


/***/ }),

/***/ 1030:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Rule: no-return-wrap function
 * Prevents uneccessary wrapping of results in Promise.resolve
 * or Promise.reject as the Promise will do that for us
 */



const getDocsUrl = __webpack_require__(1029)
const isPromise = __webpack_require__(1031)
const rejectMessage = 'Expected throw instead of Promise.reject'
const resolveMessage = 'Avoid wrapping return values in Promise.resolve'

function isInPromise(context) {
  const expression = context.getAncestors().filter(function(node) {
    return node.type === 'ExpressionStatement'
  })[0]
  return expression && expression.expression && isPromise(expression.expression)
}

module.exports = {
  meta: {
    docs: {
      url: getDocsUrl('no-return-wrap')
    }
  },
  create: function(context) {
    const options = context.options[0] || {}
    const allowReject = options.allowReject

    return {
      ReturnStatement: function(node) {
        if (isInPromise(context)) {
          if (node.argument) {
            if (node.argument.type === 'CallExpression') {
              if (node.argument.callee.type === 'MemberExpression') {
                if (node.argument.callee.object.name === 'Promise') {
                  if (node.argument.callee.property.name === 'resolve') {
                    context.report({ node, message: resolveMessage })
                  } else if (
                    !allowReject &&
                    node.argument.callee.property.name === 'reject'
                  ) {
                    context.report({ node, message: rejectMessage })
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}


/***/ }),

/***/ 1031:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Library: isPromise
 * Makes sure that an Expression node is part of a promise.
 */


const PROMISE_STATICS = __webpack_require__(1032)

function isPromise(expression) {
  return (
    // hello.then()
    (expression.type === 'CallExpression' &&
      expression.callee.type === 'MemberExpression' &&
      expression.callee.property.name === 'then') ||
    // hello.catch()
    (expression.type === 'CallExpression' &&
      expression.callee.type === 'MemberExpression' &&
      expression.callee.property.name === 'catch') ||
    // hello.finally()
    (expression.type === 'CallExpression' &&
      expression.callee.type === 'MemberExpression' &&
      expression.callee.property.name === 'finally') ||
    // somePromise.ANYTHING()
    (expression.type === 'CallExpression' &&
      expression.callee.type === 'MemberExpression' &&
      isPromise(expression.callee.object)) ||
    // Promise.STATIC_METHOD()
    (expression.type === 'CallExpression' &&
      expression.callee.type === 'MemberExpression' &&
      expression.callee.object.type === 'Identifier' &&
      expression.callee.object.name === 'Promise' &&
      PROMISE_STATICS.indexOf(expression.callee.property.name) !== -1)
  )
}

module.exports = isPromise


/***/ }),

/***/ 1032:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ['all', 'race', 'reject', 'resolve']


/***/ }),

/***/ 1033:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const getDocsUrl = __webpack_require__(1029)

function isFunctionWithBlockStatement(node) {
  if (node.type === 'FunctionExpression') {
    return true
  }
  if (node.type === 'ArrowFunctionExpression') {
    return node.body.type === 'BlockStatement'
  }
  return false
}

function isThenCallExpression(node) {
  return (
    node.type === 'CallExpression' &&
    node.callee.type === 'MemberExpression' &&
    node.callee.property.name === 'then'
  )
}

function isFirstArgument(node) {
  return (
    node.parent && node.parent.arguments && node.parent.arguments[0] === node
  )
}

function isInlineThenFunctionExpression(node) {
  return (
    isFunctionWithBlockStatement(node) &&
    isThenCallExpression(node.parent) &&
    isFirstArgument(node)
  )
}

function hasParentReturnStatement(node) {
  if (node && node.parent && node.parent.type) {
    // if the parent is a then, and we haven't returned anything, fail
    if (isThenCallExpression(node.parent)) {
      return false
    }

    if (node.parent.type === 'ReturnStatement') {
      return true
    }
    return hasParentReturnStatement(node.parent)
  }

  return false
}

function peek(arr) {
  return arr[arr.length - 1]
}

module.exports = {
  meta: {
    docs: {
      url: getDocsUrl('always-return')
    }
  },
  create: function(context) {
    // funcInfoStack is a stack representing the stack of currently executing
    //   functions
    // funcInfoStack[i].branchIDStack is a stack representing the currently
    //   executing branches ("codePathSegment"s) within the given function
    // funcInfoStack[i].branchInfoMap is an object representing information
    //   about all branches within the given function
    // funcInfoStack[i].branchInfoMap[j].good is a boolean representing whether
    //   the given branch explictly `return`s or `throw`s. It starts as `false`
    //   for every branch and is updated to `true` if a `return` or `throw`
    //   statement is found
    // funcInfoStack[i].branchInfoMap[j].loc is a eslint SourceLocation object
    //   for the given branch
    // example:
    //   funcInfoStack = [ { branchIDStack: [ 's1_1' ],
    //       branchInfoMap:
    //        { s1_1:
    //           { good: false,
    //             loc: <loc> } } },
    //     { branchIDStack: ['s2_1', 's2_4'],
    //       branchInfoMap:
    //        { s2_1:
    //           { good: false,
    //             loc: <loc> },
    //          s2_2:
    //           { good: true,
    //             loc: <loc> },
    //          s2_4:
    //           { good: false,
    //             loc: <loc> } } } ]
    const funcInfoStack = []

    function markCurrentBranchAsGood() {
      const funcInfo = peek(funcInfoStack)
      const currentBranchID = peek(funcInfo.branchIDStack)
      if (funcInfo.branchInfoMap[currentBranchID]) {
        funcInfo.branchInfoMap[currentBranchID].good = true
      }
      // else unreachable code
    }

    return {
      ReturnStatement: markCurrentBranchAsGood,
      ThrowStatement: markCurrentBranchAsGood,

      onCodePathSegmentStart: function(segment, node) {
        const funcInfo = peek(funcInfoStack)
        funcInfo.branchIDStack.push(segment.id)
        funcInfo.branchInfoMap[segment.id] = { good: false, node: node }
      },

      onCodePathSegmentEnd: function(segment, node) {
        const funcInfo = peek(funcInfoStack)
        funcInfo.branchIDStack.pop()
      },

      onCodePathStart: function(path, node) {
        funcInfoStack.push({
          branchIDStack: [],
          branchInfoMap: {}
        })
      },

      onCodePathEnd: function(path, node) {
        const funcInfo = funcInfoStack.pop()

        if (!isInlineThenFunctionExpression(node)) {
          return
        }

        path.finalSegments.forEach(segment => {
          const id = segment.id
          const branch = funcInfo.branchInfoMap[id]
          if (!branch.good) {
            if (hasParentReturnStatement(branch.node)) {
              return
            }

            // check shortcircuit syntax like `x && x()` and `y || x()``
            const prevSegments = segment.prevSegments
            for (let ii = prevSegments.length - 1; ii >= 0; --ii) {
              const prevSegment = prevSegments[ii]
              if (funcInfo.branchInfoMap[prevSegment.id].good) return
            }

            context.report({
              message: 'Each then() should return a value or throw',
              node: branch.node
            })
          }
        })
      }
    }
  }
}


/***/ }),

/***/ 1034:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Rule: catch-or-return
 * Ensures that promises either include a catch() handler
 * or are returned (to be handled upstream)
 */



const getDocsUrl = __webpack_require__(1029)
const isPromise = __webpack_require__(1031)

module.exports = {
  meta: {
    docs: {
      url: getDocsUrl('catch-or-return')
    }
  },
  create: function(context) {
    const options = context.options[0] || {}
    const allowThen = options.allowThen
    let terminationMethod = options.terminationMethod || 'catch'

    if (typeof terminationMethod === 'string') {
      terminationMethod = [terminationMethod]
    }

    return {
      ExpressionStatement: function(node) {
        if (!isPromise(node.expression)) {
          return
        }

        // somePromise.then(a, b)
        if (
          allowThen &&
          node.expression.type === 'CallExpression' &&
          node.expression.callee.type === 'MemberExpression' &&
          node.expression.callee.property.name === 'then' &&
          node.expression.arguments.length === 2
        ) {
          return
        }

        // somePromise.catch()
        if (
          node.expression.type === 'CallExpression' &&
          node.expression.callee.type === 'MemberExpression' &&
          terminationMethod.indexOf(node.expression.callee.property.name) !== -1
        ) {
          return
        }

        // somePromise['catch']()
        if (
          node.expression.type === 'CallExpression' &&
          node.expression.callee.type === 'MemberExpression' &&
          node.expression.callee.property.type === 'Literal' &&
          node.expression.callee.property.value === 'catch'
        ) {
          return
        }

        context.report({
          node,
          message: 'Expected {{ terminationMethod }}() or return',
          data: { terminationMethod }
        })
      }
    }
  }
}


/***/ }),

/***/ 1035:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Rule: prefer-await-to-callbacks
 * Discourage using then() and instead use async/await.
 */



const getDocsUrl = __webpack_require__(1029)

const errorMessage = 'Avoid callbacks. Prefer Async/Await.'

module.exports = {
  meta: {
    docs: {
      url: getDocsUrl('prefer-await-to-callbacks')
    }
  },
  create: function(context) {
    function checkLastParamsForCallback(node) {
      const len = node.params.length - 1
      const lastParam = node.params[len]
      if (
        lastParam &&
        (lastParam.name === 'callback' || lastParam.name === 'cb')
      ) {
        context.report({ node: lastParam, message: errorMessage })
      }
    }
    function isInsideYieldOrAwait() {
      return context.getAncestors().some(function(parent) {
        return (
          parent.type === 'AwaitExpression' || parent.type === 'YieldExpression'
        )
      })
    }
    return {
      CallExpression: function(node) {
        // callbacks aren't allowed
        if (node.callee.name === 'cb' || node.callee.name === 'callback') {
          context.report({ node, message: errorMessage })
          return
        }

        // thennables aren't allowed either
        const args = node.arguments
        const num = args.length - 1
        const arg = num > -1 && node.arguments && node.arguments[num]
        if (
          (arg && arg.type === 'FunctionExpression') ||
          arg.type === 'ArrowFunctionExpression'
        ) {
          if (arg.params && arg.params[0] && arg.params[0].name === 'err') {
            if (!isInsideYieldOrAwait()) {
              context.report({ node: arg, message: errorMessage })
            }
          }
        }
      },
      FunctionDeclaration: checkLastParamsForCallback,
      FunctionExpression: checkLastParamsForCallback,
      ArrowFunctionExpression: checkLastParamsForCallback
    }
  }
}


/***/ }),

/***/ 1036:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Rule: prefer-await-to-then
 * Discourage using then() and instead use async/await.
 */



const getDocsUrl = __webpack_require__(1029)

module.exports = {
  meta: {
    docs: {
      url: getDocsUrl('prefer-await-to-then')
    }
  },
  create: function(context) {
    return {
      MemberExpression: function(node) {
        // you can then() if you are inside of a yield or await
        if (
          context.getAncestors().some(function(parent) {
            return (
              parent.type === 'AwaitExpression' ||
              parent.type === 'YieldExpression'
            )
          })
        ) {
          return
        }

        // if you're a then expression then you're probably a promise
        if (node.property && node.property.name === 'then') {
          context.report({
            node: node.property,
            message: 'Prefer await to then().'
          })
        }
      }
    }
  }
}


/***/ }),

/***/ 1037:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Borrowed from here:
// https://github.com/colonyamerican/eslint-plugin-cah/issues/3



const getDocsUrl = __webpack_require__(1029)

function isDeclared(scope, ref) {
  return scope.variables.some(function(variable) {
    if (variable.name !== ref.identifier.name) {
      return false
    }

    if (!variable.defs || !variable.defs.length) {
      return false
    }

    return true
  })
}

module.exports = {
  meta: {
    docs: {
      url: getDocsUrl('no-native')
    }
  },
  create: function(context) {
    const MESSAGE = '"{{name}}" is not defined.'

    /**
     * Checks for and reports reassigned constants
     *
     * @param {Scope} scope - an escope Scope object
     * @returns {void}
     * @private
     */
    return {
      'Program:exit': function() {
        const scope = context.getScope()

        scope.implicit.left.forEach(function(ref) {
          if (ref.identifier.name !== 'Promise') {
            return
          }

          if (!isDeclared(scope, ref)) {
            context.report({
              node: ref.identifier,
              message: MESSAGE,
              data: { name: ref.identifier.name }
            })
          }
        })
      }
    }
  }
}


/***/ }),

/***/ 1038:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Rule: no-callback-in-promise
 * Avoid calling back inside of a promise
 */



const getDocsUrl = __webpack_require__(1029)
const hasPromiseCallback = __webpack_require__(1039)
const isInsidePromise = __webpack_require__(1040)
const isCallback = __webpack_require__(1041)

module.exports = {
  meta: {
    docs: {
      url: getDocsUrl('no-callback-in-promise')
    }
  },
  create: function(context) {
    return {
      CallExpression: function(node) {
        const options = context.options[0] || {}
        const exceptions = options.exceptions || []
        if (!isCallback(node, exceptions)) {
          // in general we send you packing if you're not a callback
          // but we also need to watch out for whatever.then(cb)
          if (hasPromiseCallback(node)) {
            const name =
              node.arguments && node.arguments[0] && node.arguments[0].name
            if (
              name === 'callback' ||
              name === 'cb' ||
              name === 'next' ||
              name === 'done'
            ) {
              context.report({
                node: node.arguments[0],
                message: 'Avoid calling back inside of a promise.'
              })
            }
          }
          return
        }
        if (context.getAncestors().some(isInsidePromise)) {
          context.report({
            node,
            message: 'Avoid calling back inside of a promise.'
          })
        }
      }
    }
  }
}


/***/ }),

/***/ 1039:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Library: Has Promis eCallback
 * Makes sure that an Expression node is part of a promise
 * with callback functions (like then() or catch())
 */



function hasPromiseCallback(node) {
  if (node.type !== 'CallExpression') return
  if (node.callee.type !== 'MemberExpression') return
  const propertyName = node.callee.property.name
  return propertyName === 'then' || propertyName === 'catch'
}

module.exports = hasPromiseCallback


/***/ }),

/***/ 1040:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isInsidePromise(node) {
  const isFunctionExpression =
    node.type === 'FunctionExpression' ||
    node.type === 'ArrowFunctionExpression'
  const parent = node.parent || {}
  const callee = parent.callee || {}
  const name = (callee.property && callee.property.name) || ''
  const parentIsPromise = name === 'then' || name === 'catch'
  const isInCB = isFunctionExpression && parentIsPromise
  return isInCB
}

module.exports = isInsidePromise


/***/ }),

/***/ 1041:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const isNamedCallback = __webpack_require__(1042)

function isCallingBack(node, exceptions) {
  const isCallExpression = node.type === 'CallExpression'
  const callee = node.callee || {}
  const nameIsCallback = isNamedCallback(callee.name, exceptions)
  const isCB = isCallExpression && nameIsCallback
  return isCB
}

module.exports = isCallingBack


/***/ }),

/***/ 1042:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let callbacks = ['done', 'cb', 'callback', 'next']

module.exports = function isNamedCallback(potentialCallbackName, exceptions) {
  for (let i = 0; i < exceptions.length; i++) {
    callbacks = callbacks.filter(function(item) {
      return item !== exceptions[i]
    })
  }
  return callbacks.some(function(trueCallbackName) {
    return potentialCallbackName === trueCallbackName
  })
}


/***/ }),

/***/ 1043:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Rule: no-promise-in-callback
 * Discourage using promises inside of callbacks.
 */



const getDocsUrl = __webpack_require__(1029)
const isPromise = __webpack_require__(1031)
const isInsideCallback = __webpack_require__(1044)

module.exports = {
  meta: {
    docs: {
      url: getDocsUrl('no-promise-in-callback')
    }
  },
  create: function(context) {
    return {
      CallExpression: function(node) {
        if (!isPromise(node)) return

        // if i'm returning the promise, it's probably not really a callback
        // function, and I should be okay....
        if (node.parent.type === 'ReturnStatement') return

        // what about if the parent is an ArrowFunctionExpression
        // would that imply an implicit return?

        if (context.getAncestors().some(isInsideCallback)) {
          context.report({
            node: node.callee,
            message: 'Avoid using promises inside of callbacks.'
          })
        }
      }
    }
  }
}


/***/ }),

/***/ 1044:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const isInsidePromise = __webpack_require__(1040)

function isInsideCallback(node) {
  const isCallExpression =
    node.type === 'FunctionExpression' ||
    node.type === 'ArrowFunctionExpression' ||
    node.type === 'FunctionDeclaration' // this may be controversial

  // it's totally fine to use promises inside promises
  if (isInsidePromise(node)) return

  const name = node.params && node.params[0] && node.params[0].name
  const firstArgIsError = name === 'err' || name === 'error'
  const isInACallback = isCallExpression && firstArgIsError
  return isInACallback
}

module.exports = isInsideCallback


/***/ }),

/***/ 1045:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Rule: no-nesting
 * Avoid nesting your promises.
 */



const getDocsUrl = __webpack_require__(1029)
const hasPromiseCallback = __webpack_require__(1039)
const isInsidePromise = __webpack_require__(1040)

module.exports = {
  meta: {
    docs: {
      url: getDocsUrl('no-nesting')
    }
  },
  create: function(context) {
    return {
      CallExpression: function(node) {
        if (!hasPromiseCallback(node)) return
        if (context.getAncestors().some(isInsidePromise)) {
          context.report({ node, message: 'Avoid nesting promises.' })
        }
      }
    }
  }
}


/***/ }),

/***/ 1046:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Rule: avoid-new
 * Avoid creating new promises outside of utility libraries.
 */



const getDocsUrl = __webpack_require__(1029)

module.exports = {
  meta: {
    docs: {
      url: getDocsUrl('avoid-new')
    }
  },
  create: function(context) {
    return {
      NewExpression: function(node) {
        if (node.callee.name === 'Promise') {
          context.report({ node, message: 'Avoid creating new promises.' })
        }
      }
    }
  }
}


/***/ }),

/***/ 1047:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const PROMISE_STATICS = __webpack_require__(1032)
const getDocsUrl = __webpack_require__(1029)

module.exports = {
  meta: {
    docs: {
      url: getDocsUrl('no-new-statics')
    }
  },
  create(context) {
    return {
      NewExpression(node) {
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.name === 'Promise' &&
          PROMISE_STATICS.indexOf(node.callee.property.name) > -1
        ) {
          context.report({
            node,
            message: "Avoid calling 'new' on 'Promise.{{ name }}()'",
            data: { name: node.callee.property.name }
          })
        }
      }
    }
  }
}


/***/ }),

/***/ 1048:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const getDocsUrl = __webpack_require__(1029)
const isPromise = __webpack_require__(1031)

module.exports = {
  meta: {
    docs: {
      url: getDocsUrl('no-return-in-finally')
    }
  },
  create: function(context) {
    return {
      CallExpression: function(node) {
        if (isPromise(node)) {
          if (
            node.callee &&
            node.callee.property &&
            node.callee.property.name === 'finally'
          ) {
            if (
              node.arguments &&
              node.arguments[0] &&
              node.arguments[0].body &&
              node.arguments[0].body.body
            ) {
              if (
                node.arguments[0].body.body.some(function(statement) {
                  return statement.type === 'ReturnStatement'
                })
              ) {
                context.report({
                  node: node.callee.property,
                  message: 'No return in finally'
                })
              }
            }
          }
        }
      }
    }
  }
}


/***/ }),

/***/ 1049:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const getDocsUrl = __webpack_require__(1029)
const isPromise = __webpack_require__(1031)

module.exports = {
  meta: {
    docs: {
      description:
        'Ensures the proper number of arguments are passed to Promise functions',
      url: getDocsUrl('valid-params')
    }
  },
  create(context) {
    return {
      CallExpression(node) {
        if (!isPromise(node)) {
          return
        }

        const name = node.callee.property.name
        const numArgs = node.arguments.length

        switch (name) {
          case 'resolve':
          case 'reject':
            if (numArgs > 1) {
              context.report({
                node,
                message:
                  'Promise.{{ name }}() requires 0 or 1 arguments, but received {{ numArgs }}',
                data: { name, numArgs }
              })
            }
            break
          case 'then':
            if (numArgs < 1 || numArgs > 2) {
              context.report({
                node,
                message:
                  'Promise.{{ name }}() requires 1 or 2 arguments, but received {{ numArgs }}',
                data: { name, numArgs }
              })
            }
            break
          case 'race':
          case 'all':
          case 'catch':
          case 'finally':
            if (numArgs !== 1) {
              context.report({
                node,
                message:
                  'Promise.{{ name }}() requires 1 argument, but received {{ numArgs }}',
                data: { name, numArgs }
              })
            }
            break
          default:
            break
        }
      }
    }
  }
}


/***/ })

}]);