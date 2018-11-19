(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ 1000:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context, report) {
  var sourceCode = context.getSourceCode();

  return function (typeCastExpression) {
    report({
      colon: sourceCode.getFirstToken(typeCastExpression.typeAnnotation),
      node: typeCastExpression,
      type: 'type cast'
    });
  };
};

module.exports = exports['default'];

/***/ }),

/***/ 1001:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(963);

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = __webpack_require__(965);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (context, report, typeForMessage) {
  var sourceCode = context.getSourceCode();

  var getColon = function getColon(node, typeAnnotation) {
    if (node.type === 'FunctionTypeParam') {
      return sourceCode.getFirstToken(node, node.optional ? 2 : 1);
    } else {
      return sourceCode.getFirstToken(typeAnnotation);
    }
  };

  return function (node) {
    var typeAnnotation = _lodash2.default.get(node, 'typeAnnotation') || _lodash2.default.get(node, 'left.typeAnnotation');

    if (typeAnnotation) {
      report({
        colon: getColon(node, typeAnnotation),
        name: (0, _utilities.quoteName)((0, _utilities.getParameterName)(node, context)),
        node,
        type: typeForMessage + ' type annotation'
      });
    }
  };
};

module.exports = exports['default'];

/***/ }),

/***/ 1002:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(963);

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = __webpack_require__(965);

var _evaluateTypical = __webpack_require__(1001);

var _evaluateTypical2 = _interopRequireDefault(_evaluateTypical);

var _evaluateReturnType = __webpack_require__(1003);

var _evaluateReturnType2 = _interopRequireDefault(_evaluateReturnType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _utilities.iterateFunctionNodes)(function (context, report) {
  var checkParam = (0, _evaluateTypical2.default)(context, report, 'parameter');
  var checkReturnType = (0, _evaluateReturnType2.default)(context, report);

  return function (functionNode) {
    _lodash2.default.forEach(functionNode.params, checkParam);
    checkReturnType(functionNode);
  };
});
module.exports = exports['default'];

/***/ }),

/***/ 1003:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context, report) {
  var sourceCode = context.getSourceCode();

  return function (functionNode) {
    // skip FunctionTypeAnnotation, possibly another rule as it's an arrow, not a colon?
    // (foo: number) => string
    //              ^^^^
    if (functionNode.returnType && functionNode.type !== 'FunctionTypeAnnotation') {
      report({
        colon: sourceCode.getFirstToken(functionNode.returnType),
        node: functionNode,
        type: 'return type'
      });
    }
  };
};

module.exports = exports['default'];

/***/ }),

/***/ 1004:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(963);

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = __webpack_require__(965);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (context, report) {
  var sourceCode = context.getSourceCode();

  return function (node) {
    var declarations = _lodash2.default.get(node, 'declarations', []);

    _lodash2.default.forEach(declarations, function (leaf) {
      var typeAnnotation = _lodash2.default.get(leaf, 'id.typeAnnotation');

      if (typeAnnotation) {
        report({
          colon: sourceCode.getFirstToken(typeAnnotation),
          name: (0, _utilities.quoteName)((0, _utilities.getParameterName)(leaf, context)),
          node: leaf,
          type: node.kind + ' type annotation'
        });
      }
    });
  };
};

module.exports = exports['default'];

/***/ }),

/***/ 1005:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utilities = __webpack_require__(965);

var schema = [{
  enum: ['always', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var never = (context.options[0] || 'never') === 'never';

  return {
    GenericTypeAnnotation(node) {
      var types = node.typeParameters;

      // Promise<foo>
      // ^^^^^^^^^^^^ GenericTypeAnnotation (with typeParameters)
      //         ^^^  GenericTypeAnnotation (without typeParameters)
      if (!types) {
        return;
      }

      var spaceBefore = types.start - node.id.end;

      if (never && spaceBefore) {
        context.report({
          data: { name: node.id.name },
          fix: _utilities.spacingFixers.stripSpacesAfter(node.id, spaceBefore),
          message: 'There must be no space before "{{name}}" generic type annotation bracket',
          node
        });
      }

      if (!never && !spaceBefore) {
        context.report({
          data: { name: node.id.name },
          fix: _utilities.spacingFixers.addSpaceAfter(node.id),
          message: 'There must be a space before "{{name}}" generic type annotation bracket',
          node
        });
      }

      if (!never && spaceBefore > 1) {
        context.report({
          data: { name: node.id.name },
          fix: _utilities.spacingFixers.stripSpacesAfter(node.id, spaceBefore - 1),
          message: 'There must be one space before "{{name}}" generic type annotation bracket',
          node
        });
      }
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 1006:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeColonSpacing = __webpack_require__(996);

var _typeColonSpacing2 = _interopRequireDefault(_typeColonSpacing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [{
  enum: ['always', 'never'],
  type: 'string'
}];

var create = function create(context) {
  return (0, _typeColonSpacing2.default)('before', context, {
    always: context.options[0] === 'always'
  });
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 1007:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var schema = [{
  type: 'string'
}];

var create = function create(context) {
  var pattern = new RegExp(context.options[0] || '^([A-Z][a-z0-9]*)+Type$');

  return {
    TypeAlias(typeAliasNode) {
      var typeIdentifierName = typeAliasNode.id.name;

      if (!pattern.test(typeIdentifierName)) {
        context.report(typeAliasNode, 'Type identifier \'{{name}}\' does not match pattern \'{{pattern}}\'.', {
          name: typeIdentifierName,
          pattern: pattern.toString()
        });
      }
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 1008:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var schema = [{
  enum: ['declaration', 'identifier'],
  type: 'string'
}];

var create = function create(context) {
  if (context.options[0] === 'declaration') {
    return {
      ImportDeclaration(node) {
        if (node.importKind !== 'type') {
          node.specifiers.forEach(function (specifier) {
            if (specifier.importKind === 'type') {
              context.report({
                message: 'Unexpected type import',
                node
              });
            }
          });
        }
      }
    };
  } else {
    // Default to 'identifier'
    return {
      ImportDeclaration(node) {
        if (node.importKind === 'type') {
          context.report({
            fix(fixer) {
              var imports = node.specifiers.map(function (specifier) {
                if (specifier.type === 'ImportDefaultSpecifier') {
                  return 'type default as ' + specifier.local.name;
                } else if (specifier.imported.name === specifier.local.name) {
                  return 'type ' + specifier.local.name;
                } else {
                  return 'type ' + specifier.imported.name + ' as ' + specifier.local.name;
                }
              });
              var source = node.source.value;

              return fixer.replaceText(node, 'import {' + imports.join(', ') + '} from \'' + source + '\';');
            },
            message: 'Unexpected "import type"',
            node
          });
        }
      }
    };
  }
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 1009:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utilities = __webpack_require__(965);

var schema = [{
  enum: ['always', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var sourceCode = context.getSourceCode();

  var always = (context.options[0] || 'always') === 'always';

  var check = function check(node) {
    node.types.forEach(function (type, index) {
      if (index + 1 === node.types.length) {
        return;
      }

      var separator = (0, _utilities.getTokenAfterParens)(sourceCode, type);
      var endOfType = sourceCode.getTokenBefore(separator);
      var nextType = sourceCode.getTokenAfter(separator);

      var spaceBefore = separator.start - endOfType.end;
      var spaceAfter = nextType.start - separator.end;

      var data = { type: node.type === 'UnionTypeAnnotation' ? 'union' : 'intersection' };

      if (always) {
        if (!spaceBefore) {
          context.report({
            data,
            fix: _utilities.spacingFixers.addSpaceAfter(endOfType),
            message: 'There must be a space before {{type}} type annotation separator',
            node
          });
        }

        if (!spaceAfter) {
          context.report({
            data,
            fix: _utilities.spacingFixers.addSpaceAfter(separator),
            message: 'There must be a space after {{type}} type annotation separator',
            node
          });
        }
      } else {
        if (spaceBefore) {
          context.report({
            data,
            fix: _utilities.spacingFixers.stripSpacesAfter(endOfType, spaceBefore),
            message: 'There must be no space before {{type}} type annotation separator',
            node
          });
        }

        if (spaceAfter) {
          context.report({
            data,
            fix: _utilities.spacingFixers.stripSpacesAfter(separator, spaceAfter),
            message: 'There must be no space after {{type}} type annotation separator',
            node
          });
        }
      }
    });
  };

  return {
    IntersectionTypeAnnotation: check,
    UnionTypeAnnotation: check
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 1010:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var schema = [];

var create = function create(context) {
  var markTypeAsUsed = function markTypeAsUsed(node) {
    context.markVariableAsUsed(node.id.name);
  };

  return {
    DeclareClass: markTypeAsUsed,
    DeclareFunction: markTypeAsUsed,
    DeclareModule: markTypeAsUsed,
    DeclareVariable: markTypeAsUsed,
    GenericTypeAnnotation(node) {
      var typeId = void 0;
      var scope = void 0;
      var variable = void 0;

      if (node.id.type === 'Identifier') {
        typeId = node.id;
      } else if (node.id.type === 'QualifiedTypeIdentifier') {
        typeId = node.id;
        do {
          typeId = typeId.qualification;
        } while (typeId.qualification);
      }

      for (scope = context.getScope(); scope; scope = scope.upper) {
        variable = scope.set.get(typeId.name);
        if (variable && variable.defs.length) {
          context.markVariableAsUsed(typeId.name);
          break;
        }
      }
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 1011:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(963);

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = __webpack_require__(965);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [];

var create = (0, _utilities.iterateFunctionNodes)(function (context) {
  return function (functionNode) {
    _lodash2.default.forEach(functionNode.params, function (identifierNode) {
      var nodeType = _lodash2.default.get(identifierNode, 'type');
      var isAssignmentPattern = nodeType === 'AssignmentPattern';
      var hasTypeAnnotation = Boolean(_lodash2.default.get(identifierNode, 'typeAnnotation'));
      var leftAnnotated = Boolean(_lodash2.default.get(identifierNode, 'left.typeAnnotation'));

      if (isAssignmentPattern && hasTypeAnnotation && !leftAnnotated) {
        context.report({
          data: {
            name: (0, _utilities.quoteName)((0, _utilities.getParameterName)(identifierNode, context))
          },
          message: '{{name}}parameter type annotation must be placed on left-hand side of assignment.',
          node: identifierNode
        });
      }
    });
  };
});

exports.default = {
  create,
  meta: {
    deprecated: true
  },
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 954:
/***/ (function(module, exports, __webpack_require__) {

module.exports = ({rules: {'flowtype/array-style-complex-type': __webpack_require__(955),'flowtype/array-style-simple-type': __webpack_require__(959),'flowtype/boolean-style': __webpack_require__(960),'flowtype/define-flow-type': __webpack_require__(961),'flowtype/delimiter-dangle': __webpack_require__(962),'flowtype/generic-spacing': __webpack_require__(964),'flowtype/newline-after-flow-annotation': __webpack_require__(976),'flowtype/no-dupe-keys': __webpack_require__(977),'flowtype/no-existential-type': __webpack_require__(978),'flowtype/no-flow-fix-me-comments': __webpack_require__(979),'flowtype/no-mutable-array': __webpack_require__(980),'flowtype/no-primitive-constructor-types': __webpack_require__(981),'flowtype/no-types-missing-file-annotation': __webpack_require__(982),'flowtype/no-unused-expressions': __webpack_require__(983),'flowtype/no-weak-types': __webpack_require__(984),'flowtype/object-type-delimiter': __webpack_require__(985),'flowtype/require-compound-type-alias': __webpack_require__(986),'flowtype/require-exact-type': __webpack_require__(987),'flowtype/require-parameter-type': __webpack_require__(988),'flowtype/require-return-type': __webpack_require__(989),'flowtype/require-types-at-top': __webpack_require__(990),'flowtype/require-valid-file-annotation': __webpack_require__(991),'flowtype/require-variable-type': __webpack_require__(992),'flowtype/semi': __webpack_require__(993),'flowtype/sort-keys': __webpack_require__(994),'flowtype/space-after-type-colon': __webpack_require__(995),'flowtype/space-before-generic-bracket': __webpack_require__(1005),'flowtype/space-before-type-colon': __webpack_require__(1006),'flowtype/type-id-match': __webpack_require__(1007),'flowtype/type-import-style': __webpack_require__(1008),'flowtype/union-intersection-spacing': __webpack_require__(1009),'flowtype/use-flow-type': __webpack_require__(1010),'flowtype/valid-syntax': __webpack_require__(1011)}})

/***/ }),

/***/ 955:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _arrayStyle = __webpack_require__(956);

var _arrayStyle2 = _interopRequireDefault(_arrayStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _arrayStyle2.default)('verbose', false);
module.exports = exports['default'];

/***/ }),

/***/ 956:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isSimpleType = __webpack_require__(957);

var _isSimpleType2 = _interopRequireDefault(_isSimpleType);

var _needWrap = __webpack_require__(958);

var _needWrap2 = _interopRequireDefault(_needWrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [{
  enum: ['verbose', 'shorthand'],
  type: 'string'
}];

var inlineType = function inlineType(type) {
  var inlined = type.replace(/\s+/g, ' ');

  if (inlined.length <= 50) {
    return inlined;
  } else {
    return 'Type';
  }
};

exports.default = function (defaultConfig, simpleType) {
  var create = function create(context) {
    var verbose = (context.options[0] || defaultConfig) === 'verbose';

    return {
      // shorthand
      ArrayTypeAnnotation(node) {
        var rawElementType = context.getSourceCode().getText(node.elementType);
        var inlinedType = inlineType(rawElementType);
        var wrappedInlinedType = (0, _needWrap2.default)(node.elementType) ? '(' + inlinedType + ')' : inlinedType;

        if ((0, _isSimpleType2.default)(node.elementType) === simpleType && verbose) {
          context.report({
            data: {
              type: inlinedType,
              wrappedType: wrappedInlinedType
            },
            fix(fixer) {
              return fixer.replaceText(node, 'Array<' + rawElementType + '>');
            },
            message: 'Use "Array<{{ type }}>", not "{{ wrappedType }}[]"',
            node
          });
        }
      },

      // verbose
      GenericTypeAnnotation(node) {
        if (node.id.name === 'Array') {
          if (node.typeParameters.params.length === 1) {
            var elementTypeNode = node.typeParameters.params[0];
            var rawElementType = context.getSourceCode().getText(elementTypeNode);
            var inlinedType = inlineType(rawElementType);
            var wrappedInlinedType = (0, _needWrap2.default)(elementTypeNode) ? '(' + inlinedType + ')' : inlinedType;

            if ((0, _isSimpleType2.default)(elementTypeNode) === simpleType && !verbose) {
              context.report({
                data: {
                  type: inlinedType,
                  wrappedType: wrappedInlinedType
                },
                fix(fixer) {
                  if ((0, _needWrap2.default)(elementTypeNode)) {
                    return fixer.replaceText(node, '(' + rawElementType + ')[]');
                  } else {
                    return fixer.replaceText(node, rawElementType + '[]');
                  }
                },
                message: 'Use "{{ wrappedType }}[]", not "Array<{{ type }}>"',
                node
              });
            }
          }
        }
      }
    };
  };

  return {
    create,
    schema
  };
};

module.exports = exports['default'];

/***/ }),

/***/ 957:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Types considered simple:
 *
 *  - primitive types
 *  - literal types
 *  - mixed and any types
 *  - generic types (such as Date, Promise<string>, $Keys<T>, etc.)
 *  - array type written in shorthand notation
 *
 * Types not considered simple:
 *
 *  - maybe type
 *  - function type
 *  - object type
 *  - tuple type
 *  - union and intersection types
 *
 * Reminder: if you change these semantics, don't forget to modify documentation of `array-style-...` rules
 */

var simpleTypePatterns = [/^(?:Any|Array|Boolean|Generic|Mixed|Number|String|Void)TypeAnnotation$/, /.+LiteralTypeAnnotation$/];

exports.default = function (node) {
  return simpleTypePatterns.some(function (pattern) {
    return pattern.test(node.type);
  });
};

module.exports = exports["default"];

/***/ }),

/***/ 958:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isSimpleType = __webpack_require__(957);

var _isSimpleType2 = _interopRequireDefault(_isSimpleType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var complexTypesWithoutWrap = ['TupleTypeAnnotation', 'ObjectTypeAnnotation'];

exports.default = function (node) {
  return !(0, _isSimpleType2.default)(node) && complexTypesWithoutWrap.indexOf(node.type) === -1;
};

module.exports = exports['default'];

/***/ }),

/***/ 959:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _arrayStyle = __webpack_require__(956);

var _arrayStyle2 = _interopRequireDefault(_arrayStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _arrayStyle2.default)('verbose', true);
module.exports = exports['default'];

/***/ }),

/***/ 960:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var schema = [{
  enum: ['bool', 'boolean'],
  type: 'string'
}];

var create = function create(context) {
  var longForm = (context.options[0] || 'boolean') === 'boolean';

  return {
    BooleanTypeAnnotation(node) {
      var diff = node.end - node.start;

      if (longForm && diff === 4) {
        context.report({
          fix(fixer) {
            return fixer.replaceText(node, 'boolean');
          },
          message: 'Use "boolean", not "bool"',
          node
        });
      }

      if (!longForm && diff !== 4) {
        context.report({
          fix(fixer) {
            return fixer.replaceText(node, 'bool');
          },
          message: 'Use "bool", not "boolean"',
          node
        });
      }
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 961:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var schema = [];

var create = function create(context) {
  var globalScope = void 0;

  // do nearly the same thing that eslint does for config globals
  // https://github.com/eslint/eslint/blob/v2.0.0/lib/eslint.js#L118-L194
  var makeDefined = function makeDefined(ident) {
    var ii = void 0;

    // start from the right since we're going to remove items from the array
    for (ii = globalScope.through.length - 1; ii >= 0; ii--) {
      var ref = globalScope.through[ii];

      if (ref.identifier.name === ident.name) {
        // use "__defineGeneric" since we don't have a reference to "escope.Variable"
        // eslint-disable-next-line no-underscore-dangle
        globalScope.__defineGeneric(ident.name, globalScope.set, globalScope.variables);
        var variable = globalScope.set.get(ident.name);

        variable.writeable = false;

        // "through" contains all references whose definition cannot be found
        // so we need to update references and remove the ones that were added
        globalScope.through.splice(ii, 1);
        ref.resolved = variable;
        variable.references.push(ref);
      }
    }
  };

  return {
    ClassImplements(node) {
      makeDefined(node.id);
    },
    DeclareInterface(node) {
      makeDefined(node.id);
    },
    DeclareTypeAlias(node) {
      makeDefined(node.id);
    },
    GenericTypeAnnotation(node) {
      if (node.id.type === 'Identifier') {
        makeDefined(node.id);
      } else if (node.id.type === 'QualifiedTypeIdentifier') {
        var qid = void 0;

        qid = node.id;
        do {
          qid = qid.qualification;
        } while (qid.qualification);

        makeDefined(qid);
      }
    },

    // Can be removed once https://github.com/babel/babel-eslint/pull/696 is published
    OpaqueType(node) {
      if (node.id.type === 'Identifier') {
        makeDefined(node.id);
      }
    },
    Program() {
      globalScope = context.getScope();
    },
    TypeParameterDeclaration(node) {
      node.params.forEach(function (param) {
        makeDefined(param);
      });
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 962:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _lodash = __webpack_require__(963);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [{
  enum: ['always', 'always-multiline', 'only-multiline', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var option = context.options[0] || 'never';
  var sourceCode = context.getSourceCode();

  var reporter = function reporter(node, message, fix) {
    return function () {
      context.report({
        fix,
        message,
        node
      });
    };
  };

  var makeReporters = function makeReporters(node, tokenToFix) {
    return {
      dangle: reporter(node, 'Unexpected trailing delimiter', function (fixer) {
        return fixer.replaceText(tokenToFix, '');
      }),
      noDangle: reporter(node, 'Missing trailing delimiter', function (fixer) {
        return fixer.insertTextAfter(tokenToFix, ',');
      })
    };
  };

  var evaluate = function evaluate(node, lastChildNode) {
    if (!lastChildNode) {
      return;
    }

    var _sourceCode$getLastTo = sourceCode.getLastTokens(node, 2),
        _sourceCode$getLastTo2 = _slicedToArray(_sourceCode$getLastTo, 2),
        penultimateToken = _sourceCode$getLastTo2[0],
        lastToken = _sourceCode$getLastTo2[1];

    var isDangling = [';', ','].indexOf(penultimateToken.value) > -1;
    var isMultiLine = penultimateToken.loc.start.line !== lastToken.loc.start.line;

    var report = makeReporters(lastChildNode, penultimateToken);

    if (option === 'always' && !isDangling) {
      report.noDangle();

      return;
    }

    if (option === 'never' && isDangling) {
      report.dangle();

      return;
    }

    if (option === 'always-multiline' && !isDangling && isMultiLine) {
      report.noDangle();

      return;
    }

    if (option === 'always-multiline' && isDangling && !isMultiLine) {
      report.dangle();

      return;
    }

    if (option === 'only-multiline' && isDangling && !isMultiLine) {
      report.dangle();
    }
  };

  // required for reporting the correct position
  var getLast = function getLast(property, indexer) {
    if (!property) {
      return indexer;
    }

    if (!indexer) {
      return property;
    }

    if (property.loc.end.line > indexer.loc.end.line) {
      return property;
    }

    if (indexer.loc.end.line > property.loc.end.line) {
      return indexer;
    }

    if (property.loc.end.column > indexer.loc.end.column) {
      return property;
    }

    return indexer;
  };

  return {
    ObjectTypeAnnotation(node) {
      evaluate(node, getLast(_lodash2.default.last(node.properties), _lodash2.default.last(node.indexers)));
    },

    TupleTypeAnnotation(node) {
      evaluate(node, _lodash2.default.last(node.types));
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 964:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _utilities = __webpack_require__(965);

var schema = [{
  enum: ['always', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var sourceCode = context.getSourceCode();

  var never = (context.options[0] || 'never') === 'never';

  return {
    GenericTypeAnnotation(node) {
      var types = node.typeParameters;

      // Promise<foo>
      // ^^^^^^^^^^^^ GenericTypeAnnotation (with typeParameters)
      //         ^^^  GenericTypeAnnotation (without typeParameters)
      if (!types) {
        return;
      }

      var _sourceCode$getFirstT = sourceCode.getFirstTokens(types, 2),
          _sourceCode$getFirstT2 = _slicedToArray(_sourceCode$getFirstT, 2),
          opener = _sourceCode$getFirstT2[0],
          firstInnerToken = _sourceCode$getFirstT2[1];

      var _sourceCode$getLastTo = sourceCode.getLastTokens(types, 2),
          _sourceCode$getLastTo2 = _slicedToArray(_sourceCode$getLastTo, 2),
          lastInnerToken = _sourceCode$getLastTo2[0],
          closer = _sourceCode$getLastTo2[1];

      var spacesBefore = firstInnerToken.start - opener.end;
      var spacesAfter = closer.start - lastInnerToken.end;

      if (never) {
        if (spacesBefore) {
          context.report({
            data: { name: node.id.name },
            fix: _utilities.spacingFixers.stripSpacesAfter(opener, spacesBefore),
            message: 'There must be no space at start of "{{name}}" generic type annotation',
            node: types
          });
        }

        if (spacesAfter) {
          context.report({
            data: { name: node.id.name },
            fix: _utilities.spacingFixers.stripSpacesAfter(lastInnerToken, spacesAfter),
            message: 'There must be no space at end of "{{name}}" generic type annotation',
            node: types
          });
        }
      } else {
        if (spacesBefore > 1) {
          context.report({
            data: { name: node.id.name },
            fix: _utilities.spacingFixers.stripSpacesAfter(opener, spacesBefore - 1),
            message: 'There must be one space at start of "{{name}}" generic type annotation',
            node: types
          });
        } else if (spacesBefore === 0) {
          context.report({
            data: { name: node.id.name },
            fix: _utilities.spacingFixers.addSpaceAfter(opener),
            message: 'There must be a space at start of "{{name}}" generic type annotation',
            node: types
          });
        }

        if (spacesAfter > 1) {
          context.report({
            data: { name: node.id.name },
            fix: _utilities.spacingFixers.stripSpacesAfter(lastInnerToken, spacesAfter - 1),
            message: 'There must be one space at end of "{{name}}" generic type annotation',
            node: types
          });
        } else if (spacesAfter === 0) {
          context.report({
            data: { name: node.id.name },
            fix: _utilities.spacingFixers.addSpaceAfter(lastInnerToken),
            message: 'There must be a space at end of "{{name}}" generic type annotation',
            node: types
          });
        }
      }
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 965:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spacingFixers = exports.quoteName = exports.iterateFunctionNodes = exports.isFlowFileAnnotation = exports.isFlowFile = exports.getTokenBeforeParens = exports.getTokenAfterParens = exports.getParameterName = exports.fuzzyStringMatch = exports.checkFlowFileAnnotation = undefined;

var _checkFlowFileAnnotation = __webpack_require__(966);

Object.defineProperty(exports, 'checkFlowFileAnnotation', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_checkFlowFileAnnotation).default;
  }
});

var _fuzzyStringMatch = __webpack_require__(969);

Object.defineProperty(exports, 'fuzzyStringMatch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_fuzzyStringMatch).default;
  }
});

var _getParameterName = __webpack_require__(970);

Object.defineProperty(exports, 'getParameterName', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getParameterName).default;
  }
});

var _getTokenAfterParens = __webpack_require__(971);

Object.defineProperty(exports, 'getTokenAfterParens', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getTokenAfterParens).default;
  }
});

var _getTokenBeforeParens = __webpack_require__(972);

Object.defineProperty(exports, 'getTokenBeforeParens', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getTokenBeforeParens).default;
  }
});

var _isFlowFile = __webpack_require__(967);

Object.defineProperty(exports, 'isFlowFile', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isFlowFile).default;
  }
});

var _isFlowFileAnnotation = __webpack_require__(968);

Object.defineProperty(exports, 'isFlowFileAnnotation', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isFlowFileAnnotation).default;
  }
});

var _iterateFunctionNodes = __webpack_require__(973);

Object.defineProperty(exports, 'iterateFunctionNodes', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_iterateFunctionNodes).default;
  }
});

var _quoteName = __webpack_require__(974);

Object.defineProperty(exports, 'quoteName', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_quoteName).default;
  }
});

var _spacingFixers = __webpack_require__(975);

var spacingFixers = _interopRequireWildcard(_spacingFixers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.spacingFixers = spacingFixers;

/***/ }),

/***/ 966:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(963);

var _lodash2 = _interopRequireDefault(_lodash);

var _isFlowFile = __webpack_require__(967);

var _isFlowFile2 = _interopRequireDefault(_isFlowFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (cb, context) {
  var checkThisFile = !_lodash2.default.get(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') || (0, _isFlowFile2.default)(context);

  if (!checkThisFile) {
    return function () {};
  }

  return cb(context);
};

module.exports = exports['default'];

/***/ }),

/***/ 967:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFlowFileAnnotation = __webpack_require__(968);

var _isFlowFileAnnotation2 = _interopRequireDefault(_isFlowFileAnnotation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable flowtype/require-valid-file-annotation */
/**
 * Checks whether a file has an @flow or @noflow annotation.
 * @param context
 * @param [strict] - By default, the function returns true if the file starts with @flow but not if it
 * starts by @noflow. When the strict flag is set to false, the function returns true if the flag has @noflow also.
 */
/* eslint-enable flowtype/require-valid-file-annotation */
exports.default = function (context) {
  var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var comments = context.getAllComments();

  if (!comments.length) {
    return false;
  }

  return comments.some(function (comment) {
    return (0, _isFlowFileAnnotation2.default)(comment.value) && !(strict && /no/.test(comment.value));
  });
};

module.exports = exports['default'];

/***/ }),

/***/ 968:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(963);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FLOW_MATCHER = /^@(?:no)?flow$/;

exports.default = function (comment) {
  // eslint-disable-next-line flowtype/require-valid-file-annotation
  // The flow parser splits comments with the following regex to look for the @flow flag.
  // See https://github.com/facebook/flow/blob/a96249b93541f2f7bfebd8d62085bf7a75de02f2/src/parsing/docblock.ml#L39
  return _lodash2.default.some(comment.split(/[ \t\r\n\\*/]+/), function (commentPart) {
    return FLOW_MATCHER.test(commentPart);
  });
};

module.exports = exports['default'];

/***/ }),

/***/ 969:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(963);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Creates an array of letter pairs from a given array
// origin: https://github.com/d3/d3-array/blob/master/src/pairs.js
var arrayPairs = function arrayPairs(array) {
  var ii = 0;
  var length = array.length - 1;
  var letter = array[0];
  var pairs = new Array(length < 0 ? 0 : length);

  while (ii < length) {
    pairs[ii] = [letter, letter = array[++ii]];
  }

  return pairs;
};
/* eslint-enable */

exports.default = function (needle, haystack) {
  var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;

  // Based on http://stackoverflow.com/a/23305385

  var stringSimilarity = function stringSimilarity(str1, str2) {
    if (str1.length > 0 && str2.length > 0) {
      var pairs1 = arrayPairs(str1);
      var pairs2 = arrayPairs(str2);
      var unionLen = pairs1.length + pairs2.length;
      var hitCount = void 0;

      hitCount = 0;

      _lodash2.default.forIn(pairs1, function (val1) {
        _lodash2.default.forIn(pairs2, function (val2) {
          if (_lodash2.default.isEqual(val1, val2)) {
            hitCount++;
          }
        });
      });

      if (hitCount > 0) {
        return 2.0 * hitCount / unionLen;
      }
    }

    return 0.0;
  };

  return stringSimilarity(needle, haystack) >= Number(weight);
};

module.exports = exports['default'];

/***/ }),

/***/ 970:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(963);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (identifierNode, context) {
  if (_lodash2.default.has(identifierNode, 'name')) {
    return identifierNode.name;
  }

  if (_lodash2.default.has(identifierNode, 'left.name')) {
    return identifierNode.left.name;
  }

  if (_lodash2.default.has(identifierNode, 'key.name')) {
    return identifierNode.key.name;
  }

  if (identifierNode.type === 'RestElement') {
    return identifierNode.argument.name;
  }

  if (identifierNode.type === 'ObjectTypeProperty') {
    var tokenIndex = void 0;

    tokenIndex = 0;

    if (identifierNode.static) {
      tokenIndex++;
    }

    if (identifierNode.variance) {
      tokenIndex++;
    }

    return context.getSourceCode().getFirstToken(identifierNode, tokenIndex).value;
  }

  if (identifierNode.type === 'FunctionTypeParam') {
    return context.getSourceCode().getFirstToken(identifierNode).value;
  }

  if (identifierNode.type === 'ObjectPattern' || identifierNode.type === 'ArrayPattern') {
    var text = context.getSourceCode().getText(identifierNode);

    if (identifierNode.typeAnnotation) {
      return text.replace(context.getSourceCode().getText(identifierNode.typeAnnotation), '').trim();
    } else {
      return text;
    }
  }
  if (_lodash2.default.get(identifierNode, 'left.type') === 'ObjectPattern') {
    return context.getSourceCode().getText(identifierNode.left);
  }

  return null;
};

module.exports = exports['default'];

/***/ }),

/***/ 971:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getTokenAfterParens = function getTokenAfterParens(sourceCode, node) {
  var token = void 0;

  token = sourceCode.getTokenAfter(node);

  while (token.type === 'Punctuator' && token.value === ')') {
    token = sourceCode.getTokenAfter(token);
  }

  return token;
};

exports.default = getTokenAfterParens;
module.exports = exports['default'];

/***/ }),

/***/ 972:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getTokenBeforeParens = function getTokenBeforeParens(sourceCode, node) {
  var token = void 0;

  token = sourceCode.getTokenBefore(node);

  while (token.type === 'Punctuator' && token.value === '(') {
    token = sourceCode.getTokenBefore(token);
  }

  return token;
};

exports.default = getTokenBeforeParens;
module.exports = exports['default'];

/***/ }),

/***/ 973:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (iterator) {
  return function (context) {
    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    var nodeIterator = iterator.apply(undefined, [context].concat(rest));

    return {
      ArrowFunctionExpression: nodeIterator,
      FunctionDeclaration: nodeIterator,
      FunctionExpression: nodeIterator,
      FunctionTypeAnnotation: nodeIterator
    };
  };
};

module.exports = exports["default"];

/***/ }),

/***/ 974:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (name) {
  return name ? '"' + name + '" ' : '';
};

module.exports = exports['default'];

/***/ }),

/***/ 975:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var stripSpacesBefore = exports.stripSpacesBefore = function stripSpacesBefore(node, spaces) {
  return function (fixer) {
    return fixer.removeRange([node.start - spaces, node.start]);
  };
};

var stripSpacesAfter = exports.stripSpacesAfter = function stripSpacesAfter(node, spaces) {
  return function (fixer) {
    return fixer.removeRange([node.end, node.end + spaces]);
  };
};

var addSpaceBefore = exports.addSpaceBefore = function addSpaceBefore(node) {
  return function (fixer) {
    return fixer.insertTextBefore(node, ' ');
  };
};

var addSpaceAfter = exports.addSpaceAfter = function addSpaceAfter(node) {
  return function (fixer) {
    return fixer.insertTextAfter(node, ' ');
  };
};

var replaceWithSpaceBefore = exports.replaceWithSpaceBefore = function replaceWithSpaceBefore(node, spaces) {
  return function (fixer) {
    return fixer.replaceTextRange([node.start - spaces, node.start], ' ');
  };
};

var replaceWithSpaceAfter = exports.replaceWithSpaceAfter = function replaceWithSpaceAfter(node, spaces) {
  return function (fixer) {
    return fixer.replaceTextRange([node.end, node.end + spaces], ' ');
  };
};

var stripSpaces = exports.stripSpaces = function stripSpaces(direction, node, spaces) {
  if (direction === 'before') {
    return stripSpacesBefore(node, spaces);
  } else {
    return stripSpacesAfter(node, spaces);
  }
};

var addSpace = exports.addSpace = function addSpace(direction, node) {
  if (direction === 'before') {
    return addSpaceBefore(node);
  } else {
    return addSpaceAfter(node);
  }
};

var replaceWithSpace = exports.replaceWithSpace = function replaceWithSpace(direction, node, spaces) {
  if (direction === 'before') {
    return replaceWithSpaceBefore(node, spaces);
  } else {
    return replaceWithSpaceAfter(node, spaces);
  }
};

/***/ }),

/***/ 976:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(963);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var looksLikeFlowFileAnnotation = function looksLikeFlowFileAnnotation(comment) {
  return (/@(?:no)?flo/i.test(comment)
  );
};

var schema = [{
  enum: ['always', 'always-windows', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var mode = context.options[0];
  var never = mode === 'never';

  var newline = mode === 'always-windows' ? '\r\n' : '\n';

  return {
    Program(node) {
      var sourceCode = context.getSourceCode();

      var potentialFlowFileAnnotation = _lodash2.default.find(context.getAllComments(), function (comment) {
        return looksLikeFlowFileAnnotation(comment.value);
      });

      if (potentialFlowFileAnnotation) {
        var line = potentialFlowFileAnnotation.loc.end.line;
        var nextLineIsEmpty = sourceCode.lines[line] === '';

        if (!never && !nextLineIsEmpty) {
          context.report({
            fix: function fix(fixer) {
              return fixer.insertTextAfter(potentialFlowFileAnnotation, newline);
            },
            message: 'Expected newline after flow annotation',
            node
          });
        }

        if (never && nextLineIsEmpty) {
          context.report({
            fix: function fix(fixer) {
              var lineBreak = sourceCode.text[potentialFlowFileAnnotation.end];

              return fixer.replaceTextRange([potentialFlowFileAnnotation.end, potentialFlowFileAnnotation.end + (lineBreak === '\r' ? 2 : 1)], '');
            },
            message: 'Expected no newline after flow annotation',
            node
          });
        }
      }
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 977:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(963);

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = __webpack_require__(965);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [];

var create = function create(context) {
  var report = function report(node) {
    context.report({
      loc: node.loc,
      message: 'Duplicate property.',
      node
    });
  };

  var analizeElement = function analizeElement(element) {
    var type = element.type;

    var value = void 0;

    switch (type) {
      case 'GenericTypeAnnotation':
        value = element.id.name;
        break;
      case 'ObjectTypeAnnotation':
        // eslint-disable-next-line no-use-before-define
        value = builObjectStructure(element.properties);
        break;
      case 'TupleTypeAnnotation':
        // eslint-disable-next-line no-use-before-define
        value = buildArrayStructure(element.types);
        break;
      default:
        value = element.value;
        break;
    }

    return {
      type,
      value
    };
  };

  var buildArrayStructure = function buildArrayStructure(elements) {
    return _lodash2.default.map(elements, function (element) {
      return analizeElement(element);
    });
  };

  var builObjectStructure = function builObjectStructure(properties) {
    return _lodash2.default.map(properties, function (property) {
      var element = analizeElement(property.value);

      return Object.assign(element, {
        name: (0, _utilities.getParameterName)(property, context)
      });
    });
  };

  var checkForDuplicates = function checkForDuplicates(node) {
    var haystack = [];

    // filter out complex object types, like ObjectTypeSpreadProperty
    var identifierNodes = _lodash2.default.filter(node.properties, { type: 'ObjectTypeProperty' });

    _lodash2.default.forEach(identifierNodes, function (identifierNode) {
      var needle = { name: (0, _utilities.getParameterName)(identifierNode, context) };

      if (identifierNode.value.type === 'FunctionTypeAnnotation') {
        needle.args = _lodash2.default.map(identifierNode.value.params, function (param) {
          return analizeElement(param.typeAnnotation);
        });
      }

      var match = _lodash2.default.some(haystack, function (existingNeedle) {
        return _lodash2.default.isEqual(existingNeedle, needle);
      });

      if (match) {
        report(identifierNode);
      } else {
        haystack.push(needle);
      }
    });
  };

  return {
    ObjectTypeAnnotation: checkForDuplicates
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 978:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Support both node types for existential type
// https://github.com/babel/babylon/issues/319
var reporter = function reporter(context) {
  return function (node) {
    context.report({
      message: 'Unexpected use of existential type (*).',
      node
    });
  };
};

var create = function create(context) {
  return {
    ExistentialTypeParam: reporter(context),
    ExistsTypeAnnotation: reporter(context)
  };
};

exports.default = {
  create
};
module.exports = exports['default'];

/***/ }),

/***/ 979:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var schema = [{
  type: 'string'
}];

var message = '$FlowFixMe is treated as `any` and should be fixed.';

var isIdentifier = function isIdentifier(node, name) {
  return node && node.type === 'Identifier' && node.name.match(name);
};

var create = function create(context) {
  var allowedPattern = context.options[0] ? new RegExp(context.options[0]) : null;
  var extraMessage = allowedPattern ? ' Fix it or match `' + allowedPattern.toString() + '`.' : '';

  var passesExtraRegex = function passesExtraRegex(value) {
    if (!allowedPattern) {
      return false;
    }

    return value.match(allowedPattern);
  };

  var handleComment = function handleComment(comment) {
    var value = comment.value.trim();

    if (value.match(/\$FlowFixMe/) && !passesExtraRegex(value)) {
      context.report(comment, message + extraMessage);
    }
  };

  return {
    GenericTypeAnnotation(node) {
      if (isIdentifier(node.id, /\$FlowFixMe/)) {
        context.report({
          message,
          node: node.id
        });
      }
    },

    Program() {
      context.getSourceCode().getAllComments().filter(function (comment) {
        return comment.type === 'Block' || comment.type === 'Line';
      }).forEach(handleComment);
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 980:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(963);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [];

// const x = [];
var isEmptyArrayLiteral = function isEmptyArrayLiteral(node) {
  return _lodash2.default.get(node, 'init.type') === 'ArrayExpression' && _lodash2.default.get(node, 'init.elements.length') === 0;
};

// const x = new Array(); const y = Array();
var isEmptyArrayInstance = function isEmptyArrayInstance(node) {
  if (_lodash2.default.get(node, 'init.type') === 'NewExpression' || _lodash2.default.get(node, 'init.type') === 'CallExpression') {
    return _lodash2.default.get(node, 'init.callee.name') === 'Array' && _lodash2.default.get(node, 'init.arguments.length') === 0;
  } else {
    return false;
  }
};

var isAnnotationOfEmptyArrayInit = function isAnnotationOfEmptyArrayInit(node) {
  if (_lodash2.default.has(node, 'parent.parent.parent')) {
    var parent = _lodash2.default.get(node, 'parent.parent.parent');
    var isVariableDeclaration = _lodash2.default.get(parent, 'type') === 'VariableDeclarator';

    return isVariableDeclaration && (isEmptyArrayLiteral(parent) || isEmptyArrayInstance(parent));
  } else {
    return false;
  }
};

var create = function create(context) {
  return {
    ArrayTypeAnnotation(node) {
      if (!isAnnotationOfEmptyArrayInit(node)) {
        context.report({
          fix(fixer) {
            var rawElementType = context.getSourceCode().getText(node.elementType);

            return fixer.replaceText(node, '$ReadOnlyArray<' + rawElementType + '>');
          },
          message: 'Use "$ReadOnlyArray" instead of array shorthand notation',
          node
        });
      }
    },
    GenericTypeAnnotation(node) {
      if (node.id.name === 'Array' && !isAnnotationOfEmptyArrayInit(node)) {
        context.report({
          fix(fixer) {
            return fixer.replaceText(node.id, '$ReadOnlyArray');
          },
          message: 'Use "$ReadOnlyArray" instead of "Array"',
          node
        });
      }
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 981:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(963);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [];

var create = function create(context) {
  var regex = /^(Boolean|Number|String)$/;

  return {
    GenericTypeAnnotation: function GenericTypeAnnotation(node) {
      var name = _lodash2.default.get(node, 'id.name');

      if (regex.test(name)) {
        context.report({
          data: {
            name
          },
          loc: node.loc,
          message: 'Unexpected use of {{name}} constructor type.',
          node
        });
      }
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 982:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utilities = __webpack_require__(965);

/**
 * Disallows the use for flow types without a valid file annotation.
 * Only checks files without a valid flow annotation.
 */

var schema = [];

var create = function create(context) {
  // Skip flow files
  if ((0, _utilities.isFlowFile)(context, false)) {
    return {};
  }

  var reporter = function reporter(node, type) {
    context.report({
      data: { type },
      message: 'Type {{type}} require valid Flow declaration.',
      node
    });
  };

  return {
    ExportNamedDeclaration(node) {
      if (node.exportKind === 'type') {
        reporter(node, 'exports');
      }
    },
    ImportDeclaration(node) {
      if (node.importKind === 'type') {
        reporter(node, 'imports');
      }
      if (node.importKind === 'value' && node.specifiers.some(function (specifier) {
        return specifier.importKind === 'type';
      })) {
        reporter(node, 'imports');
      }
    },
    TypeAlias(node) {
      reporter(node, 'aliases');
    },
    TypeAnnotation(node) {
      reporter(node, 'annotations');
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 983:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _noUnusedExpressions = __webpack_require__(368);

var _noUnusedExpressions2 = _interopRequireDefault(_noUnusedExpressions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var meta = _noUnusedExpressions2.default.meta; // A wrapper around ESLint's core rule no-unused-expressions, additionally ignores type cast
// expressions.

var create = function create(context) {
  var coreChecks = _noUnusedExpressions2.default.create(context);

  return {
    ExpressionStatement(node) {
      if (node.expression.type !== 'TypeCastExpression') {
        coreChecks.ExpressionStatement(node);
      }
    }
  };
};

exports.default = {
  create,
  meta
};
module.exports = exports['default'];

/***/ }),

/***/ 984:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(963);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [{
  additionalProperties: false,
  properties: {
    any: {
      type: 'boolean'
    },
    Function: {
      type: 'boolean'
    },
    Object: {
      type: 'boolean'
    }
  },
  type: 'object'
}];

var reportWeakType = function reportWeakType(context, weakType) {
  return function (node) {
    context.report({
      data: { weakType },
      message: 'Unexpected use of weak type "{{weakType}}"',
      node
    });
  };
};

var genericTypeEvaluator = function genericTypeEvaluator(context, _ref) {
  var checkFunction = _ref.checkFunction,
      checkObject = _ref.checkObject;

  return function (node) {
    var name = _lodash2.default.get(node, 'id.name');

    if (checkFunction && name === 'Function' || checkObject && name === 'Object') {
      reportWeakType(context, name)(node);
    }
  };
};

var create = function create(context) {
  var checkAny = _lodash2.default.get(context, 'options[0].any', true) === true;
  var checkFunction = _lodash2.default.get(context, 'options[0].Function', true) === true;
  var checkObject = _lodash2.default.get(context, 'options[0].Object', true) === true;

  var checks = {};

  if (checkAny) {
    checks.AnyTypeAnnotation = reportWeakType(context, 'any');
  }

  if (checkFunction || checkObject) {
    checks.GenericTypeAnnotation = genericTypeEvaluator(context, {
      checkFunction,
      checkObject
    });
  }

  return checks;
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 985:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// ported from babel/flow-object-type; original author: Nat Mote
// https://github.com/babel/eslint-plugin-babel/blob/c0a49d25a97feb12c1d07073a0b37317359a5fe5/rules/flow-object-type.js

var SEMICOLON = {
  char: ';',
  name: 'semicolon'
};

var COMMA = {
  char: ',',
  name: 'comma'
};

var create = function create(context) {
  var GOOD = void 0;
  var BAD = void 0;

  if (!context.options[0] || context.options[0] === COMMA.name) {
    GOOD = COMMA;
    BAD = SEMICOLON;
  } else {
    GOOD = SEMICOLON;
    BAD = COMMA;
  }

  var requireProperPunctuation = function requireProperPunctuation(node) {
    var sourceCode = context.getSourceCode();
    var tokens = sourceCode.getTokens(node);
    var lastToken = void 0;

    lastToken = tokens[tokens.length - 1];
    if (lastToken.type !== 'Punctuator' || !(lastToken.value === SEMICOLON.char || lastToken.value === COMMA.char)) {
      var parentTokens = sourceCode.getTokens(node.parent);

      lastToken = parentTokens[parentTokens.indexOf(lastToken) + 1];
    }

    if (lastToken.type === 'Punctuator') {
      if (lastToken.value === BAD.char) {
        context.report({
          fix(fixer) {
            return fixer.replaceText(lastToken, GOOD.char);
          },
          message: 'Prefer ' + GOOD.name + 's to ' + BAD.name + 's in object and class types',
          node: lastToken
        });
      }
    }
  };

  return {
    ObjectTypeCallProperty: requireProperPunctuation,
    ObjectTypeIndexer: requireProperPunctuation,
    ObjectTypeProperty: requireProperPunctuation
  };
};

var schema = [{
  enum: ['semicolon', 'comma'],
  type: 'string'
}];

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 986:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var schema = [{
  enum: ['always', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var always = (context.options[0] || 'always') === 'always';

  if (always) {
    return {
      IntersectionTypeAnnotation(node) {
        if (node.parent.type !== 'TypeAlias') {
          context.report({
            message: 'All intersection types must be declared with named type alias.',
            node
          });
        }
      },
      UnionTypeAnnotation(node) {
        if (node.parent.type !== 'TypeAlias') {
          context.report({
            message: 'All union types must be declared with named type alias.',
            node
          });
        }
      }
    };
  } else {
    return {};
  }
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 987:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var schema = [{
  enum: ['always', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var always = (context.options[0] || 'always') === 'always';

  return {
    TypeAlias(node) {
      var name = node.id.name,
          _node$right = node.right,
          type = _node$right.type,
          exact = _node$right.exact,
          indexers = _node$right.indexers;


      if (type === 'ObjectTypeAnnotation') {
        if (always && !exact && indexers.length === 0) {
          context.report({
            data: { name },
            message: 'Type identifier \'{{name}}\' must be exact.',
            node
          });
        }

        if (!always && exact) {
          context.report({
            data: { name },
            message: 'Type identifier \'{{name}}\' must not be exact.',
            node
          });
        }
      }
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 988:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(963);

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = __webpack_require__(965);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [{
  additionalProperties: false,
  properties: {
    excludeArrowFunctions: {
      enum: [false, true, 'expressionsOnly']
    },
    excludeParameterMatch: {
      type: 'string'
    }
  },
  type: 'object'
}];

var create = (0, _utilities.iterateFunctionNodes)(function (context) {
  var skipArrows = _lodash2.default.get(context, 'options[0].excludeArrowFunctions');
  var excludeParameterMatch = new RegExp(_lodash2.default.get(context, 'options[0].excludeParameterMatch', 'a^'));

  return function (functionNode) {
    _lodash2.default.forEach(functionNode.params, function (identifierNode) {
      var parameterName = (0, _utilities.getParameterName)(identifierNode, context);

      if (excludeParameterMatch.test(parameterName)) {
        return;
      }

      var typeAnnotation = _lodash2.default.get(identifierNode, 'typeAnnotation') || _lodash2.default.get(identifierNode, 'left.typeAnnotation');

      var isArrow = functionNode.type === 'ArrowFunctionExpression';
      var isArrowFunctionExpression = functionNode.expression;

      if (skipArrows === 'expressionsOnly' && isArrowFunctionExpression || skipArrows === true && isArrow) {
        return;
      }

      if (!typeAnnotation) {
        context.report({
          data: {
            name: (0, _utilities.quoteName)(parameterName)
          },
          message: 'Missing {{name}}parameter type annotation.',
          node: identifierNode
        });
      }
    });
  };
});

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 989:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(963);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [{
  enum: ['always'],
  type: 'string'
}, {
  additionalProperties: false,
  properties: {
    annotateUndefined: {
      enum: ['always', 'never'],
      type: 'string'
    },
    excludeArrowFunctions: {
      enum: [false, true, 'expressionsOnly']
    },
    excludeMatching: {
      items: {
        type: 'string'
      },
      type: 'array'
    },
    includeOnlyMatching: {
      items: {
        type: 'string'
      },
      type: 'array'
    }
  },
  type: 'object'
}];

var create = function create(context) {
  var annotateReturn = (_lodash2.default.get(context, 'options[0]') || 'always') === 'always';
  var annotateUndefined = (_lodash2.default.get(context, 'options[1].annotateUndefined') || 'never') === 'always';
  var skipArrows = _lodash2.default.get(context, 'options[1].excludeArrowFunctions') || false;

  var makeRegExp = function makeRegExp(str) {
    return new RegExp(str);
  };

  var excludeMatching = _lodash2.default.get(context, 'options[1].excludeMatching', []).map(makeRegExp);
  var includeOnlyMatching = _lodash2.default.get(context, 'options[1].includeOnlyMatching', []).map(makeRegExp);

  var targetNodes = [];

  var registerFunction = function registerFunction(functionNode) {
    targetNodes.push({
      functionNode
    });
  };

  var isUndefinedReturnType = function isUndefinedReturnType(returnNode) {
    return returnNode.argument === null || returnNode.argument.name === 'undefined' || returnNode.argument.operator === 'void';
  };

  var getIsReturnTypeAnnotationUndefined = function getIsReturnTypeAnnotationUndefined(targetNode) {
    var isReturnTypeAnnotationLiteralUndefined = _lodash2.default.get(targetNode, 'functionNode.returnType.typeAnnotation.id.name') === 'undefined' && _lodash2.default.get(targetNode, 'functionNode.returnType.typeAnnotation.type') === 'GenericTypeAnnotation';
    var isReturnTypeAnnotationVoid = _lodash2.default.get(targetNode, 'functionNode.returnType.typeAnnotation.type') === 'VoidTypeAnnotation';

    return isReturnTypeAnnotationLiteralUndefined || isReturnTypeAnnotationVoid;
  };

  var shouldFilterNode = function shouldFilterNode(functionNode) {
    var isArrow = functionNode.type === 'ArrowFunctionExpression';
    var isMethod = functionNode.parent && functionNode.parent.type === 'MethodDefinition';
    var isProperty = functionNode.parent && functionNode.parent.type === 'ClassProperty';
    var selector = void 0;

    if (isMethod || isProperty) {
      selector = 'parent.key.name';
    } else if (isArrow) {
      selector = 'parent.id.name';
    } else {
      selector = 'id.name';
    }
    var identifierName = _lodash2.default.get(functionNode, selector);

    var checkRegExp = function checkRegExp(regex) {
      return regex.test(identifierName);
    };

    if (excludeMatching.length && _lodash2.default.some(excludeMatching, checkRegExp)) {
      return true;
    }

    if (includeOnlyMatching.length && !_lodash2.default.some(includeOnlyMatching, checkRegExp)) {
      return true;
    }

    return false;
  };

  var evaluateFunction = function evaluateFunction(functionNode) {
    var targetNode = targetNodes.pop();

    if (functionNode !== targetNode.functionNode) {
      throw new Error('Mismatch.');
    }

    var isArrow = functionNode.type === 'ArrowFunctionExpression';
    var isArrowFunctionExpression = functionNode.expression;
    var hasImplicitReturnType = functionNode.async || functionNode.generator;
    var isFunctionReturnUndefined = !isArrowFunctionExpression && !hasImplicitReturnType && (!targetNode.returnStatementNode || isUndefinedReturnType(targetNode.returnStatementNode));
    var isReturnTypeAnnotationUndefined = getIsReturnTypeAnnotationUndefined(targetNode);

    if (skipArrows === 'expressionsOnly' && isArrowFunctionExpression || skipArrows === true && isArrow) {
      return;
    }
    if (shouldFilterNode(functionNode)) {
      return;
    }
    if (isFunctionReturnUndefined && isReturnTypeAnnotationUndefined && !annotateUndefined) {
      context.report(functionNode, 'Must not annotate undefined return type.');
    } else if (isFunctionReturnUndefined && !isReturnTypeAnnotationUndefined && annotateUndefined) {
      context.report(functionNode, 'Must annotate undefined return type.');
    } else if (!isFunctionReturnUndefined && !isReturnTypeAnnotationUndefined && annotateReturn && !functionNode.returnType) {
      context.report(functionNode, 'Missing return type annotation.');
    }
  };

  var evaluateNoise = function evaluateNoise() {
    targetNodes.pop();
  };

  return {
    ArrowFunctionExpression: registerFunction,
    'ArrowFunctionExpression:exit': evaluateFunction,
    ClassDeclaration: registerFunction,
    'ClassDeclaration:exit': evaluateNoise,
    ClassExpression: registerFunction,
    'ClassExpression:exit': evaluateNoise,
    FunctionDeclaration: registerFunction,
    'FunctionDeclaration:exit': evaluateFunction,
    FunctionExpression: registerFunction,
    'FunctionExpression:exit': evaluateFunction,
    ReturnStatement: function ReturnStatement(node) {
      if (targetNodes.length) {
        targetNodes[targetNodes.length - 1].returnStatementNode = node;
      }
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 990:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(963);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [{
  enum: ['always', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var always = (context.options[0] || 'always') === 'always';

  if (always) {
    var sourceCode = context.getSourceCode();

    // nodes representing type and import declarations
    var ignoredNodes = [
    // import ...
    function (node) {
      return node.type === 'ImportDeclaration';
    },

    // export type Foo = ...
    // export opaque type Foo = ...
    // export type Foo from ...
    // export opaque type Foo from ...
    function (node) {
      return node.type === 'ExportNamedDeclaration' && node.exportKind === 'type';
    },

    // type Foo = ...
    function (node) {
      return node.type === 'TypeAlias';
    },

    // opaque type Foo = ...
    function (node) {
      return node.type === 'OpaqueType';
    }];

    var isIgnoredNode = function isIgnoredNode(node) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = ignoredNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var predicate = _step.value;

          if (predicate(node)) {
            return true;
          }
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

      return false;
    };

    var regularCodeStartRange = void 0;

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = sourceCode.ast.body[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var node = _step2.value;

        if (!isIgnoredNode(node)) {
          regularCodeStartRange = node.range;
          break;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    if (!_lodash2.default.isArray(regularCodeStartRange)) {
      // a source with only ignored nodes
      return {};
    }

    return {
      'TypeAlias, OpaqueType'(node) {
        if (node.range[0] > regularCodeStartRange[0]) {
          context.report({
            message: 'All type declaration should be at the top of the file, after any import declarations.',
            node
          });
        }
      }
    };
  } else {
    return {};
  }
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 991:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(963);

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = __webpack_require__(965);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
  annotationStyle: 'none'
};

var looksLikeFlowFileAnnotation = function looksLikeFlowFileAnnotation(comment) {
  return (/@(?:no)?flo/i.test(comment)
  );
};

var isValidAnnotationStyle = function isValidAnnotationStyle(node, style) {
  if (style === 'none') {
    return true;
  }

  return style === node.type.toLowerCase();
};

var checkAnnotationSpelling = function checkAnnotationSpelling(comment) {
  return (/@[a-z]+\b/.test(comment) && (0, _utilities.fuzzyStringMatch)(comment.replace(/no/i, ''), '@flow', 0.20)
  );
};

var schema = [{
  enum: ['always', 'never'],
  type: 'string'
}, {
  additionalProperties: false,
  properties: {
    annotationStyle: {
      enum: ['none', 'line', 'block'],
      type: 'string'
    }
  },
  type: 'object'
}];

var create = function create(context) {
  var always = context.options[0] === 'always';
  var style = _lodash2.default.get(context, 'options[1].annotationStyle', defaults.annotationStyle);

  return {
    Program(node) {
      var firstToken = node.tokens[0];

      var addAnnotation = function addAnnotation() {
        return function (fixer) {
          var annotation = ['line', 'none'].includes(style) ? '// @flow\n' : '/* @flow */\n';

          return fixer.replaceTextRange([node.start, node.start], annotation);
        };
      };

      var potentialFlowFileAnnotation = _lodash2.default.find(context.getAllComments(), function (comment) {
        return looksLikeFlowFileAnnotation(comment.value);
      });

      if (potentialFlowFileAnnotation) {
        if (firstToken && firstToken.start < potentialFlowFileAnnotation.start) {
          context.report(potentialFlowFileAnnotation, 'Flow file annotation not at the top of the file.');
        }

        if ((0, _utilities.isFlowFileAnnotation)(potentialFlowFileAnnotation.value.trim())) {
          if (!isValidAnnotationStyle(potentialFlowFileAnnotation, style)) {
            var str = style === 'line' ? '`// ' + potentialFlowFileAnnotation.value.trim() + '`' : '`/* ' + potentialFlowFileAnnotation.value.trim() + ' */`';

            context.report(potentialFlowFileAnnotation, 'Flow file annotation style must be ' + str);
          }
        } else if (checkAnnotationSpelling(potentialFlowFileAnnotation.value.trim())) {
          context.report(potentialFlowFileAnnotation, 'Misspelled or malformed Flow file annotation.');
        } else {
          context.report(potentialFlowFileAnnotation, 'Malformed Flow file annotation.');
        }
      } else if (always) {
        context.report({
          fix: addAnnotation(),
          message: 'Flow file annotation is missing.',
          node
        });
      }
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 992:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(963);

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = __webpack_require__(965);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [{
  additionalProperties: false,
  properties: {
    excludeVariableMatch: {
      type: 'string'
    },
    excludeVariableTypes: {
      additionalProperties: false,
      properties: {
        const: {
          type: 'boolean'
        },
        let: {
          type: 'boolean'
        },
        var: {
          type: 'boolean'
        }
      },
      type: 'object'
    }
  },
  type: 'object'
}];

var create = function create(context) {
  var checkThisFile = !_lodash2.default.get(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') || (0, _utilities.isFlowFile)(context);

  if (!checkThisFile) {
    return function () {};
  }

  var excludeVariableMatch = new RegExp(_lodash2.default.get(context, 'options[0].excludeVariableMatch', 'a^'));
  var excludeVariableTypes = _lodash2.default.get(context, 'options[0].excludeVariableTypes', {});

  return {
    VariableDeclaration: function VariableDeclaration(variableDeclaration) {
      var variableType = _lodash2.default.get(variableDeclaration, 'kind');

      if (_lodash2.default.get(excludeVariableTypes, variableType)) {
        return;
      }

      _lodash2.default.forEach(variableDeclaration.declarations, function (variableDeclarator) {
        var identifierNode = _lodash2.default.get(variableDeclarator, 'id');
        var identifierName = _lodash2.default.get(identifierNode, 'name');

        if (excludeVariableMatch.test(identifierName)) {
          return;
        }

        var typeAnnotation = _lodash2.default.get(identifierNode, 'typeAnnotation');

        if (!typeAnnotation) {
          context.report({
            data: {
              name: (0, _utilities.quoteName)(identifierName)
            },
            message: 'Missing {{name}}variable type annotation.',
            node: identifierNode
          });
        }
      });
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 993:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var schema = [{
  enum: ['always', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var never = (context.options[0] || 'always') === 'never';
  var sourceCode = context.getSourceCode();

  var report = function report(node, missing) {
    var lastToken = sourceCode.getLastToken(node);
    var fix = void 0;
    var message = void 0;
    var loc = lastToken.loc;


    if (missing) {
      message = 'Missing semicolon.';
      loc = loc.end;
      fix = function fix(fixer) {
        return fixer.insertTextAfter(lastToken, ';');
      };
    } else {
      message = 'Extra semicolon.';
      loc = loc.start;
      fix = function fix(fixer) {
        return fixer.remove(lastToken);
      };
    }

    context.report({
      fix,
      loc,
      message,
      node
    });
  };

  var isSemicolon = function isSemicolon(token) {
    return token.type === 'Punctuator' && token.value === ';';
  };

  var checkForSemicolon = function checkForSemicolon(node) {
    var lastToken = sourceCode.getLastToken(node);
    var isLastTokenSemicolon = isSemicolon(lastToken);

    if (never && isLastTokenSemicolon) {
      report(node, false);
    }

    if (!never && !isLastTokenSemicolon) {
      report(node, true);
    }
  };

  return {
    OpaqueType: checkForSemicolon,
    TypeAlias: checkForSemicolon
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 994:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(963);

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = __webpack_require__(965);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
  caseSensitive: true,
  natural: false
};

var schema = [{
  enum: ['asc', 'desc'],
  type: 'string'
}, {
  additionalProperties: false,
  properties: {
    caseSensitive: {
      type: 'boolean'
    },
    natural: {
      type: 'boolean'
    }
  },
  type: 'object'
}];

/**
 * Functions to compare the order of two strings
 *
 * Based on a similar function from eslint's sort-keys rule.
 * https://github.com/eslint/eslint/blob/master/lib/rules/sort-keys.js
 *
 * @private
 */
var isValidOrders = {
  asc(str1, str2) {
    return str1 <= str2;
  },
  ascI(str1, str2) {
    return str1.toLowerCase() <= str2.toLowerCase();
  },
  ascIN(str1, str2) {
    return isValidOrders.naturalCompare(str1.toLowerCase(), str2.toLowerCase()) <= 0;
  },
  ascN(str1, str2) {
    return isValidOrders.naturalCompare(str1, str2) <= 0;
  },
  desc(str1, str2) {
    return isValidOrders.asc(str2, str1);
  },
  descI(str1, str2) {
    return isValidOrders.ascI(str2, str1);
  },
  descIN(str1, str2) {
    return isValidOrders.ascIN(str2, str1);
  },
  descN(str1, str2) {
    return isValidOrders.ascN(str2, str1);
  },
  naturalCompare(str1, str2) {
    return str1.localeCompare(str2, 'en-US', { numeric: true });
  }
};

var variances = {
  minus: '-',
  plus: '+'
};

var getVariance = function getVariance(node) {
  if (_lodash2.default.isString(node.variance)) {
    return variances[node.variance] || '';
  } else if (_lodash2.default.get(node, 'variance.type') === 'Variance') {
    return variances[node.variance.kind] || '';
  } else {
    return '';
  }
};

var generateOrderedList = function generateOrderedList(context, sort, properties) {
  return properties.map(function (property) {
    var name = (0, _utilities.getParameterName)(property, context);
    var value = void 0;

    if (property.type === 'ObjectTypeSpreadProperty') {
      return ['...' + property.argument.id.name];
    } else if (property.value.type === 'ObjectTypeAnnotation') {
      // eslint-disable-next-line no-use-before-define
      value = generateFix(property.value, context, sort);
    } else {
      value = context.getSourceCode().getText(property.value);
    }

    return [name, getVariance(property) + name + (property.optional ? '?' : ''), value];
  }).sort(function (first, second) {
    return sort(first[0], second[0]) ? -1 : 1;
  }).map(function (item) {
    if (item.length === 1) {
      return item[0];
    }

    return item[1] + ': ' + item[2];
  });
};

var generateFix = function generateFix(node, context, sort) {
  // this could be done much more cleanly in ESLint >=4
  // as we can apply multiple fixes. That also means we can
  // maintain code style in a much nicer way
  var nodeText = void 0;
  var newTypes = generateOrderedList(context, sort, node.properties);
  var source = context.getSourceCode(node);

  var originalSubstring = source.getText(node);

  nodeText = originalSubstring;

  node.properties.forEach(function (property, index) {
    var subString = source.getText(property);
    var addComma = subString[subString.length - 1] === ',';

    nodeText = nodeText.replace(subString, '$' + index + (addComma ? ',' : ''));
  });

  newTypes.forEach(function (item, index) {
    nodeText = nodeText.replace('$' + index, item);
  });

  return nodeText;
};

var create = function create(context) {
  var order = _lodash2.default.get(context, ['options', 0], 'asc');

  var _$get = _lodash2.default.get(context, ['options', 1], defaults),
      natural = _$get.natural,
      caseSensitive = _$get.caseSensitive;

  var insensitive = caseSensitive === false;

  var prev = void 0;
  var checkKeyOrder = function checkKeyOrder(node) {
    prev = null;

    _lodash2.default.forEach(node.properties, function (identifierNode) {
      var current = (0, _utilities.getParameterName)(identifierNode, context);
      var last = prev;

      // keep track of the last token
      prev = current || last;

      if (!last || !current) {
        return;
      }

      var isValidOrder = isValidOrders[order + (insensitive ? 'I' : '') + (natural ? 'N' : '')];

      if (isValidOrder(last, current) === false) {
        context.report({
          data: {
            current,
            insensitive: insensitive ? 'insensitive ' : '',
            last,
            natural: natural ? 'natural ' : '',
            order
          },
          fix(fixer) {
            var nodeText = generateFix(node, context, isValidOrder);

            return fixer.replaceText(node, nodeText);
          },
          loc: identifierNode.loc,
          message: 'Expected type annotations to be in {{natural}}{{insensitive}}{{order}}ending order. "{{current}}" should be before "{{last}}".',
          node: identifierNode
        });
      }
    });
  };

  return {
    ObjectTypeAnnotation: checkKeyOrder
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 995:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(963);

var _lodash2 = _interopRequireDefault(_lodash);

var _typeColonSpacing = __webpack_require__(996);

var _typeColonSpacing2 = _interopRequireDefault(_typeColonSpacing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [{
  enum: ['always', 'never'],
  type: 'string'
}, {
  additionalProperties: false,
  properties: {
    allowLineBreak: {
      type: 'boolean'
    }
  },
  type: 'object'
}];

var create = function create(context) {
  return (0, _typeColonSpacing2.default)('after', context, {
    allowLineBreak: _lodash2.default.get(context, ['options', '1', 'allowLineBreak'], false),
    always: _lodash2.default.get(context, ['options', '0'], 'always') === 'always'
  });
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];

/***/ }),

/***/ 996:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reporter = __webpack_require__(997);

var _reporter2 = _interopRequireDefault(_reporter);

var _evaluateObjectTypeIndexer = __webpack_require__(998);

var _evaluateObjectTypeIndexer2 = _interopRequireDefault(_evaluateObjectTypeIndexer);

var _evaluateObjectTypeProperty = __webpack_require__(999);

var _evaluateObjectTypeProperty2 = _interopRequireDefault(_evaluateObjectTypeProperty);

var _evaluateTypeCastExpression = __webpack_require__(1000);

var _evaluateTypeCastExpression2 = _interopRequireDefault(_evaluateTypeCastExpression);

var _evaluateTypical = __webpack_require__(1001);

var _evaluateTypical2 = _interopRequireDefault(_evaluateTypical);

var _evaluateFunctions = __webpack_require__(1002);

var _evaluateFunctions2 = _interopRequireDefault(_evaluateFunctions);

var _evaluateVariables = __webpack_require__(1004);

var _evaluateVariables2 = _interopRequireDefault(_evaluateVariables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (direction, context, options) {
  var report = (0, _reporter2.default)(direction, context, options);

  return _extends({}, (0, _evaluateFunctions2.default)(context, report), {
    ClassProperty: (0, _evaluateTypical2.default)(context, report, 'class property'),
    ObjectTypeIndexer: (0, _evaluateObjectTypeIndexer2.default)(context, report),
    ObjectTypeProperty: (0, _evaluateObjectTypeProperty2.default)(context, report),
    TypeCastExpression: (0, _evaluateTypeCastExpression2.default)(context, report),
    VariableDeclaration: (0, _evaluateVariables2.default)(context, report)
  });
};

module.exports = exports['default'];

/***/ }),

/***/ 997:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utilities = __webpack_require__(965);

var hasLineBreak = function hasLineBreak(direction, colon, context) {
  var sourceCode = context.getSourceCode();

  if (direction === 'before') {
    return colon.loc.start.line !== sourceCode.getTokenBefore(colon).loc.end.line;
  } else {
    return sourceCode.getTokenAfter(colon).loc.start.line !== colon.loc.end.line;
  }
};

var getSpaces = function getSpaces(direction, colon, context) {
  var sourceCode = context.getSourceCode();

  if (direction === 'before') {
    return colon.start - sourceCode.getTokenBefore(colon).end;
  } else {
    return sourceCode.getTokenAfter(colon).start - colon.end;
  }
};

exports.default = function (direction, context, _ref) {
  var always = _ref.always,
      allowLineBreak = _ref.allowLineBreak;

  return function (_ref2) {
    var colon = _ref2.colon,
        node = _ref2.node,
        _ref2$name = _ref2.name,
        name = _ref2$name === undefined ? '' : _ref2$name,
        _ref2$type = _ref2.type,
        type = _ref2$type === undefined ? 'type annotation' : _ref2$type;

    var lineBreak = void 0;
    var spaces = void 0;

    // Support optional names
    // type X = { [string]: a }
    // type X = string => string
    if (!colon || colon.value !== ':') {
      return;
    }

    var data = {
      direction,
      name,
      type
    };

    if (hasLineBreak(direction, colon, context)) {
      if (allowLineBreak) {
        spaces = 1;
      } else {
        lineBreak = true;
        spaces = getSpaces(direction, colon, context);
      }
    } else {
      spaces = getSpaces(direction, colon, context);
    }

    if (always && lineBreak) {
      context.report({
        data,
        fix: _utilities.spacingFixers.replaceWithSpace(direction, colon, spaces),
        message: 'There must not be a line break {{direction}} {{name}}{{type}} colon.',
        node
      });
    } else if (always && spaces > 1) {
      context.report({
        data,
        fix: _utilities.spacingFixers.stripSpaces(direction, colon, spaces - 1),
        message: 'There must be 1 space {{direction}} {{name}}{{type}} colon.',
        node
      });
    } else if (always && spaces === 0) {
      context.report({
        data,
        fix: _utilities.spacingFixers.addSpace(direction, colon),
        message: 'There must be a space {{direction}} {{name}}{{type}} colon.',
        node
      });
    } else if (!always && spaces > 0) {
      context.report({
        data,
        fix: _utilities.spacingFixers.stripSpaces(direction, colon, spaces),
        message: 'There must be no space {{direction}} {{name}}{{type}} colon.',
        node
      });
    }
  };
};

module.exports = exports['default'];

/***/ }),

/***/ 998:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utilities = __webpack_require__(965);

exports.default = function (context, report) {
  var sourceCode = context.getSourceCode();

  return function (objectTypeIndexer) {
    // type X = { [a: b]: c }
    //              ^
    report({
      colon: (0, _utilities.getTokenBeforeParens)(sourceCode, objectTypeIndexer.key),
      node: objectTypeIndexer
    });

    // type X = { [a: b]: c }
    //                  ^
    report({
      colon: sourceCode.getTokenAfter((0, _utilities.getTokenAfterParens)(sourceCode, objectTypeIndexer.key)),
      node: objectTypeIndexer
    });
  };
};

module.exports = exports['default'];

/***/ }),

/***/ 999:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utilities = __webpack_require__(965);

var getColon = function getColon(context, objectTypeProperty) {
  // eslint-disable-next-line init-declarations
  var tokenIndex = 1;

  if (objectTypeProperty.optional) {
    tokenIndex++;
  }

  if (objectTypeProperty.static) {
    tokenIndex++;
  }

  if (objectTypeProperty.variance) {
    tokenIndex++;
  }

  return context.getSourceCode().getFirstToken(objectTypeProperty, tokenIndex);
};

// 1) type X = { foo(): A; }
// 2) type X = { foo: () => A; }
// the above have identical ASTs (save for their ranges)
// case 1 doesn't have a type annotation colon and should be ignored
var isShortPropertyFunction = function isShortPropertyFunction(objectTypeProperty) {
  return objectTypeProperty.value.type === 'FunctionTypeAnnotation' && objectTypeProperty.start === objectTypeProperty.value.start;
};

exports.default = function (context, report) {
  return function (objectTypeProperty) {
    if (isShortPropertyFunction(objectTypeProperty)) {
      // potential difference: not checked in before
      return;
    }

    report({
      colon: getColon(context, objectTypeProperty),
      name: (0, _utilities.quoteName)((0, _utilities.getParameterName)(objectTypeProperty, context)),
      node: objectTypeProperty
    });
  };
};

module.exports = exports['default'];

/***/ })

}]);