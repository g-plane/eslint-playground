(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ 1012:
/***/ (function(module, exports, __webpack_require__) {

module.exports = ({rules: {'typescript/adjacent-overload-signatures': __webpack_require__(1013),'typescript/class-name-casing': __webpack_require__(1014),'typescript/explicit-function-return-type': __webpack_require__(1016),'typescript/explicit-member-accessibility': __webpack_require__(1017),'typescript/generic-type-naming': __webpack_require__(1018),'typescript/interface-name-prefix': __webpack_require__(1019),'typescript/member-delimiter-style': __webpack_require__(1020),'typescript/member-naming': __webpack_require__(1021),'typescript/member-ordering': __webpack_require__(1022),'typescript/no-angle-bracket-type-assertion': __webpack_require__(1023),'typescript/no-array-constructor': __webpack_require__(1024),'typescript/no-empty-interface': __webpack_require__(1025),'typescript/no-explicit-any': __webpack_require__(1026),'typescript/no-inferrable-types': __webpack_require__(1027),'typescript/no-namespace': __webpack_require__(1028),'typescript/no-non-null-assertion': __webpack_require__(1029),'typescript/no-parameter-properties': __webpack_require__(1030),'typescript/no-triple-slash-reference': __webpack_require__(1031),'typescript/no-type-alias': __webpack_require__(1032),'typescript/no-unused-vars': __webpack_require__(1033),'typescript/no-use-before-define': __webpack_require__(1034),'typescript/no-var-requires': __webpack_require__(1035),'typescript/prefer-namespace-keyword': __webpack_require__(1036),'typescript/type-annotation-spacing': __webpack_require__(1037)}})

/***/ }),

/***/ 1013:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforces member overloads to be consecutive.
 * @author Patricio Trevino
 */


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Require that member overloads be consecutive",
            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/adjacent-overload-signatures.md"
        },
        schema: []
    },

    create(context) {
        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Gets the name of the member being processed.
         * @param {ASTNode} member the member being processed.
         * @returns {string} the name of the member or null if it's a member not relevant to the rule.
         * @private
         */
        function getMemberName(member) {
            if (!member) return null;

            switch (member.type) {
                case "ExportDefaultDeclaration":
                case "ExportNamedDeclaration": {
                    // export statements (e.g. export { a };)
                    // have no declarations, so ignore them
                    return member.declaration
                        ? getMemberName(member.declaration)
                        : null;
                }
                case "DeclareFunction":
                case "FunctionDeclaration":
                case "TSNamespaceFunctionDeclaration":
                case "TSEmptyBodyFunctionDeclaration":
                case "TSEmptyBodyDeclareFunction": {
                    return member.id && member.id.name;
                }
                case "TSMethodSignature": {
                    return (
                        (member.key && (member.key.name || member.key.value)) ||
                        (member.name && (member.name.name || member.name.value))
                    );
                }
                case "TSCallSignature": {
                    return "call";
                }
                case "TSConstructSignature": {
                    return "new";
                }
                case "MethodDefinition": {
                    return member.key.name || member.key.value;
                }
                default: {
                    return null;
                }
            }
        }

        /**
         * Check the body for overload methods.
         * @param {ASTNode} node the body to be inspected.
         * @returns {void}
         * @private
         */
        function checkBodyForOverloadMethods(node) {
            const members = node.body || node.members;

            if (members) {
                let name;
                let index;
                let lastName;
                const seen = [];

                members.forEach(member => {
                    name = getMemberName(member);

                    index = seen.indexOf(name);
                    if (index > -1 && lastName !== name) {
                        context.report({
                            node: member,
                            message: `All '${name}' signatures should be adjacent`
                        });
                    } else if (name && index === -1) {
                        seen.push(name);
                    }

                    lastName = name;
                });
            }
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            TSModuleBlock: checkBodyForOverloadMethods,
            TSTypeLiteral: checkBodyForOverloadMethods,
            TSInterfaceBody: checkBodyForOverloadMethods,
            ClassBody: checkBodyForOverloadMethods,
            Program: checkBodyForOverloadMethods
        };
    }
};


/***/ }),

/***/ 1014:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforces PascalCased class and interface names.
 * @author Jed Fox
 */


const util = __webpack_require__(1015);

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Require PascalCased class and interface names",
            extraDescription: [util.tslintRule("class-name")],
            category: "Best Practices",
            recommended: true,
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/class-name-casing.md"
        }
    },

    create(context) {
        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Determine if the identifier name is PascalCased
         * @param   {string}  name The identifier name
         * @returns {boolean}      Is the name PascalCased?
         */
        function isPascalCase(name) {
            return /^[A-Z][0-9A-Za-z]*$/.test(name);
        }

        /**
         * Report a class declaration as invalid
         * @param   {Node} decl              The declaration
         * @param   {Node} [id=classDecl.id] The name of the declaration
         * @returns {undefined}
         */
        function report(decl, id) {
            id = id || decl.id;

            let friendlyName;

            switch (decl.type) {
                case "ClassDeclaration":
                case "ClassExpression":
                    friendlyName = "Class";
                    break;
                case "TSInterfaceDeclaration":
                    friendlyName = "Interface";
                    break;
                default:
                    friendlyName = decl.type;
            }

            context.report({
                node: id,
                message: `${friendlyName} '${id.name}' must be PascalCased`
            });
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            "ClassDeclaration, TSInterfaceDeclaration"(node) {
                // class expressions (i.e. export default class {}) are OK
                if (node.id && !isPascalCase(node.id.name)) {
                    report(node);
                }
            },
            VariableDeclarator(node) {
                if (node.init && node.init.type === "ClassExpression") {
                    const id = node.id;

                    if (node.init.id && !isPascalCase(node.init.id.name)) {
                        report(node.init);
                    } else if (id && !isPascalCase(id.name)) {
                        report(node.init, id);
                    }
                }
            }
        };
    }
};


/***/ }),

/***/ 1015:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.tslintRule = name => `\`${name}\` from TSLint`;

/**
 * Check if the context file name is *.ts or *.tsx
 * @param {string} fileName The context file name
 * @returns {boolean} `true` if the file name ends in *.ts or *.tsx
 * @private
 */
exports.isTypescript = fileName => /\.tsx?$/.test(fileName);


/***/ }),

/***/ 1016:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforces explicit return type for functions
 * @author Scott O'Hara
 */


const util = __webpack_require__(1015);

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description:
                "Require explicit return types on functions and class methods",

            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/explicit-function-return-type.md"
        },
        schema: [
            {
                type: "object",
                properties: {
                    allowExpressions: {
                        type: "boolean"
                    }
                },
                additionalProperties: false
            }
        ]
    },

    create(context) {
        const options = context.options[0] || {};

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Checks if the parent of a function expression is a constructor.
         * @param {ASTNode} parent The parent of a function expression node
         * @returns {boolean} `true` if the parent is a constructor
         * @private
         */
        function isConstructor(parent) {
            return (
                parent.type === "MethodDefinition" &&
                parent.kind === "constructor"
            );
        }

        /**
         * Checks if the parent of a function expression is a setter.
         * @param {ASTNode} parent The parent of a function expression node
         * @returns {boolean} `true` if the parent is a setter
         * @private
         */
        function isSetter(parent) {
            return parent.type === "MethodDefinition" && parent.kind === "set";
        }

        /**
         * Checks if a function declaration/expression has a return type.
         * @param {ASTNode} node The node representing a function.
         * @returns {void}
         * @private
         */
        function checkFunctionReturnType(node) {
            if (
                options.allowExpressions &&
                node.type !== "FunctionDeclaration" &&
                node.parent.type !== "VariableDeclarator"
            ) {
                return;
            }

            if (
                !node.returnType &&
                !isConstructor(node.parent) &&
                !isSetter(node.parent) &&
                util.isTypescript(context.getFilename())
            ) {
                context.report({
                    node,
                    message: `Missing return type on function.`
                });
            }
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            FunctionDeclaration: checkFunctionReturnType,
            FunctionExpression: checkFunctionReturnType,
            ArrowFunctionExpression: checkFunctionReturnType
        };
    }
};


/***/ }),

/***/ 1017:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforces explicit accessibility modifier for class members
 * @author Danny Fritz
 */


const util = __webpack_require__(1015);

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description:
                "Require explicit accessibility modifiers on class properties and methods",
            extraDescription: [util.tslintRule("member-access")],
            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/explicit-member-accessibility.md"
        },
        schema: []
    },

    create(context) {
        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Checks if a method declaration has an accessibility modifier.
         * @param {ASTNode} methodDefinition The node representing a MethodDefinition.
         * @returns {void}
         * @private
         */
        function checkMethodAccessibilityModifier(methodDefinition) {
            if (
                !methodDefinition.accessibility &&
                util.isTypescript(context.getFilename())
            ) {
                context.report({
                    node: methodDefinition,
                    message: `Missing accessibility modifier on method definition ${
                        methodDefinition.key.name
                    }.`
                });
            }
        }

        /**
         * Checks if property has an accessibility modifier.
         * @param {ASTNode} classProperty The node representing a ClassProperty.
         * @returns {void}
         * @private
         */
        function checkPropertyAccessibilityModifier(classProperty) {
            if (
                !classProperty.accessibility &&
                util.isTypescript(context.getFilename())
            ) {
                context.report({
                    node: classProperty,
                    message: `Missing accessibility modifier on class property ${
                        classProperty.key.name
                    }.`
                });
            }
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            ClassProperty: checkPropertyAccessibilityModifier,
            MethodDefinition: checkMethodAccessibilityModifier
        };
    }
};


/***/ }),

/***/ 1018:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforces naming of generic type variables.
 */


/**
 *
 * @param {any} context ESLint context
 * @param {string} rule Option
 * @returns {Function} Node's visitor function
 */
function createTypeParameterChecker(context, rule) {
    const regex = new RegExp(rule);

    return function checkTypeParameters(pnode) {
        const params = pnode.typeParameters && pnode.typeParameters.params;

        if (!Array.isArray(params) || params.length === 0) {
            return;
        }
        params.forEach(node => {
            const type = node.type;

            if (type === "TSTypeParameter" || type === "TypeParameter") {
                const name = node.name;

                if (name && !regex.test(name)) {
                    const data = { name, rule };

                    context.report({
                        node,
                        message:
                            "Type parameter {{name}} does not match rule {{rule}}",
                        data
                    });
                }
            }
        });
    };
}

module.exports = {
    meta: {
        docs: {
            description: "Enforces naming of generic type variables",
            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/generic-type-naming.md"
        }
    },

    create(context) {
        const rule = context.options[0];

        if (!rule) {
            return {};
        }

        const checkTypeParameters = createTypeParameterChecker(context, rule);

        return {
            VariableDeclarator: checkTypeParameters,
            ClassDeclaration: checkTypeParameters,
            InterfaceDeclaration: checkTypeParameters,
            TSInterfaceDeclaration: checkTypeParameters,
            FunctionDeclaration: checkTypeParameters,
            TSCallSignature: checkTypeParameters,
            CallSignature: checkTypeParameters
        };
    }
};


/***/ }),

/***/ 1019:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforces interface names are prefixed with "I".
 * @author Danny Fritz
 */


const util = __webpack_require__(1015);

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Require that interface names be prefixed with `I`",
            extraDescription: [util.tslintRule("interface-name")],
            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/interface-name-prefix.md"
        },
        schema: [
            {
                enum: ["never", "always"]
            }
        ]
    },

    create(context) {
        const never = context.options[0] !== "always";

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Checks if a string is prefixed with "I".
         * @param {string} name The string to check
         * @returns {boolean} true if it is prefixed with "I"
         * @private
         */
        function isPrefixedWithI(name) {
            if (typeof name !== "string") {
                return false;
            }

            return /^I[A-Z]/.test(name);
        }

        /**
         * Checks if interface is prefixed with "I".
         * @param {ASTNode} interfaceNode The node representing an Interface.
         * @returns {void}
         * @private
         */
        function checkInterfacePrefix(interfaceNode) {
            if (never) {
                if (isPrefixedWithI(interfaceNode.id.name)) {
                    context.report({
                        node: interfaceNode.id,
                        message: 'Interface name must not be prefixed with "I"'
                    });
                }
            } else {
                if (!isPrefixedWithI(interfaceNode.id.name)) {
                    context.report({
                        node: interfaceNode.id,
                        message: 'Interface name must be prefixed with "I"'
                    });
                }
            }
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            TSInterfaceDeclaration: checkInterfacePrefix
        };
    }
};


/***/ }),

/***/ 1020:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforces a member delimiter style in interfaces and type literals.
 * @author Patricio Trevino
 */


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const definition = {
    type: "object",
    properties: {
        delimiter: { enum: ["none", "semi", "comma"] },
        requireLast: { type: "boolean" },
        ignoreSingleLine: { type: "boolean" }
    },
    additionalProperties: false
};

module.exports = {
    meta: {
        docs: {
            description:
                "Require a specific member delimiter style for interfaces and type literals",
            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/member-delimiter-style.md"
        },
        fixable: "code",
        schema: [
            {
                type: "object",
                properties: {
                    delimiter: { enum: ["none", "semi", "comma"] },
                    requireLast: { type: "boolean" },
                    ignoreSingleLine: { type: "boolean" },
                    overrides: {
                        type: "object",
                        properties: {
                            interface: definition,
                            typeLiteral: definition
                        },
                        additionalProperties: false
                    }
                },
                additionalProperties: false
            }
        ]
    },

    create(context) {
        const sourceCode = context.getSourceCode();
        const options = context.options[0] || {};

        const overrides = options.overrides || {};
        const defaults = {
            delimiter: "semi",
            requireLast: true,
            ignoreSingleLine: true
        };

        const interfaceOptions = Object.assign(
            {},
            defaults,
            options,
            overrides.interface
        );
        const typeLiteralOptions = Object.assign(
            {},
            defaults,
            options,
            overrides.typeLiteral
        );

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Check the last token in the given member.
         * @param {ASTNode} member the member to be evaluated.
         * @param {Object} opts the options to be validated.
         * @param {boolean} isLast a flag indicating `member` is the last in the
         *                         interface or type literal.
         * @param {boolean} isSameLine a flag indicating the interface or type
         *                             literal was declared in a single line.
         * @returns {void}
         * @private
         */
        function checkLastToken(member, opts, isLast, isSameLine) {
            let message;
            let missingDelimiter = false;
            const lastToken = sourceCode.getLastToken(member, {
                includeComments: false
            });

            if (lastToken.value === ";" && opts.delimiter !== "semi") {
                message =
                    opts.delimiter === "comma"
                        ? "Expected a comma."
                        : "Unexpected separator (;).";
            } else if (lastToken.value === "," && opts.delimiter !== "comma") {
                message =
                    opts.delimiter === "semi"
                        ? "Expected a semicolon."
                        : "Unexpected separator (,).";
            } else if (
                lastToken.value !== ";" &&
                lastToken.value !== "," &&
                opts.delimiter !== "none"
            ) {
                let canOmit = isLast;

                if (canOmit) {
                    canOmit =
                        !opts.requireLast ||
                        (isSameLine && opts.ignoreSingleLine);
                }

                if (!canOmit) {
                    missingDelimiter = true;
                    message =
                        opts.delimiter === "semi"
                            ? "Expected a semicolon."
                            : "Expected a comma.";
                }
            }

            if (message) {
                context.report({
                    node: lastToken,
                    loc: {
                        start: {
                            line: lastToken.loc.end.line,
                            column: lastToken.loc.end.column
                        },
                        end: {
                            line: lastToken.loc.end.line,
                            column: lastToken.loc.end.column
                        }
                    },
                    message,
                    fix(fixer) {
                        let token;

                        if (opts.delimiter === "semi") {
                            token = ";";
                        } else if (opts.delimiter === "comma") {
                            token = ",";
                        } else {
                            // remove the unneeded token
                            return fixer.remove(lastToken);
                        }

                        if (missingDelimiter) {
                            // add the missing delimiter
                            return fixer.insertTextAfter(lastToken, token);
                        } else if (isLast && !opts.requireLast) {
                            return fixer.remove(lastToken);
                        }

                        // correct the current delimiter
                        return fixer.replaceText(lastToken, token);
                    }
                });
            }
        }

        /**
         * Check the member separator being used matches the delimiter.
         * @param {ASTNode} node the node to be evaluated.
         * @returns {void}
         * @private
         */
        function checkMemberSeparatorStyle(node) {
            const isSingleLine = node.loc.start.line === node.loc.end.line;
            const isInterface = node.type === "TSInterfaceBody";
            const members = isInterface ? node.body : node.members;

            members.forEach((member, index) => {
                checkLastToken(
                    member,
                    isInterface ? interfaceOptions : typeLiteralOptions,
                    index === members.length - 1,
                    isSingleLine
                );
            });
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            TSInterfaceBody: checkMemberSeparatorStyle,
            TSTypeLiteral: checkMemberSeparatorStyle
        };
    }
};


/***/ }),

/***/ 1021:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforces naming conventions for class members by visibility.
 * @author Ian MacLeod
 */


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description:
                "Enforces naming conventions for class members by visibility.",
            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/member-naming.md"
        },
        schema: [
            {
                type: "object",
                properties: {
                    public: { type: "string" },
                    protected: { type: "string" },
                    private: { type: "string" }
                },
                additionalProperties: false
            }
        ]
    },

    create(context) {
        const config = context.options[0] || {};
        const conventions = {};

        for (const accessibility of Object.getOwnPropertyNames(config)) {
            conventions[accessibility] = new RegExp(config[accessibility]);
        }

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Check that the property name matches the convention for its
         * accessibility.
         * @param {ASTNode} node the named node to evaluate.
         * @returns {void}
         * @private
         */
        function validateName(node) {
            const name = node.key.name;
            const accessibility = node.accessibility || "public";
            const convention = conventions[accessibility];

            if (!convention || convention.test(name)) return;

            context.report({
                node: node.key,
                message:
                    "{{accessibility}} property {{name}} should match {{convention}}",
                data: { accessibility, name, convention }
            });
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            MethodDefinition: validateName,
            ClassProperty: validateName
        };
    }
};


/***/ }),

/***/ 1022:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforces a standard member declaration order.
 * @author Patricio Trevino
 */


const util = __webpack_require__(1015);

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const schemaOptions = ["field", "method", "constructor"].reduce(
    (options, type) => {
        options.push(type);

        ["public", "protected", "private"].forEach(accessibility => {
            options.push(`${accessibility}-${type}`);
            if (type !== "constructor") {
                ["static", "instance"].forEach(scope => {
                    if (options.indexOf(`${scope}-${type}`) === -1) {
                        options.push(`${scope}-${type}`);
                    }
                    options.push(`${accessibility}-${scope}-${type}`);
                });
            }
        });

        return options;
    },
    []
);

module.exports = {
    meta: {
        docs: {
            description: "Require a consistent member declaration order",
            extraDescription: [util.tslintRule("member-ordering")],
            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/member-ordering.md"
        },
        schema: [
            {
                type: "object",
                properties: {
                    default: {
                        oneOf: [
                            {
                                enum: ["never"]
                            },
                            {
                                type: "array",
                                items: {
                                    enum: schemaOptions
                                }
                            }
                        ]
                    },
                    classes: {
                        oneOf: [
                            {
                                enum: ["never"]
                            },
                            {
                                type: "array",
                                items: {
                                    enum: schemaOptions
                                }
                            }
                        ]
                    },
                    classExpressions: {
                        oneOf: [
                            {
                                enum: ["never"]
                            },
                            {
                                type: "array",
                                items: {
                                    enum: schemaOptions
                                }
                            }
                        ]
                    },
                    interfaces: {
                        oneOf: [
                            {
                                enum: ["never"]
                            },
                            {
                                type: "array",
                                items: {
                                    enum: ["field", "method", "constructor"]
                                }
                            }
                        ]
                    },
                    typeLiterals: {
                        oneOf: [
                            {
                                enum: ["never"]
                            },
                            {
                                type: "array",
                                items: {
                                    enum: ["field", "method", "constructor"]
                                }
                            }
                        ]
                    }
                },
                additionalProperties: false
            }
        ]
    },

    create(context) {
        const options = context.options[0] || {};

        const functionExpressions = [
            "FunctionExpression",
            "ArrowFunctionExpression"
        ];
        const defaultOrder = [
            "public-static-field",
            "protected-static-field",
            "private-static-field",

            "public-instance-field",
            "protected-instance-field",
            "private-instance-field",

            "public-field",
            "protected-field",
            "private-field",

            "static-field",
            "instance-field",

            "field",

            "constructor",

            "public-static-method",
            "protected-static-method",
            "private-static-method",

            "public-instance-method",
            "protected-instance-method",
            "private-instance-method",

            "public-method",
            "protected-method",
            "private-method",

            "static-method",
            "instance-method",

            "method"
        ];

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Determines if `node` should be processed as a method instead of a field.
         * @param {ASTNode} node the node to be inspected.
         * @returns {boolean} `true` if node should be processed as a method; `false` for fields.
         * @private
         */
        function shouldBeProcessedAsMethod(node) {
            // check for bound methods in ClassProperty nodes.
            return (
                node.value && functionExpressions.indexOf(node.value.type) > -1
            );
        }

        /**
         * Gets the node type.
         * @param {ASTNode} node the node to be evaluated.
         * @returns {string|null} the type of the node.
         * @private
         */
        function getNodeType(node) {
            switch (node.type) {
                case "MethodDefinition":
                    return node.kind;
                case "TSMethodSignature":
                    return "method";
                case "TSConstructSignature":
                    return "constructor";
                case "ClassProperty":
                case "TSPropertySignature":
                    return shouldBeProcessedAsMethod(node) ? "method" : "field";
                default:
                    return null;
            }
        }

        /**
         * Gets the member name based on the member type.
         * @param {ASTNode} node the node to be evaluated.
         * @returns {string|null} the name of the member.
         * @private
         */
        function getMemberName(node) {
            switch (node.type) {
                case "ClassProperty":
                case "MethodDefinition":
                    return node.kind === "constructor"
                        ? "constructor"
                        : node.key.name;
                case "TSPropertySignature":
                case "TSMethodSignature":
                    return node.key.name;
                case "TSConstructSignature":
                    return "new";
                default:
                    return null;
            }
        }

        /**
         * Gets the calculated rank using the provided method definition.
         * The algorithm is as follows:
         * - Get the rank based on the accessibility-scope-type name, e.g. public-instance-field
         * - If there is no order for accessibility-scope-type, then strip out the accessibility.
         * - If there is no order for scope-type, then strip out the scope.
         * - If there is no order for type, then return -1
         * @param {Array} names the valid names to be validated.
         * @param {Array} order the current order to be validated.
         * @returns {number} the rank of the method definition in the given order.
         * @private
         */
        function getRankOrder(names, order) {
            let rank = -1;
            const stack = names.slice();

            while (stack.length > 0 && rank === -1) {
                rank = order.indexOf(stack.shift());
            }

            return rank;
        }

        /**
         * Gets the rank of the node given the order.
         * @param {ASTNode} node the node to be evaluated.
         * @param {Array} order the current order to be validated.
         * @param {boolean} supportsModifiers a flag indicating whether the type supports modifiers or not.
         * @returns {number} the rank of the node.
         * @private
         */
        function getRank(node, order, supportsModifiers) {
            const type = getNodeType(node);
            const scope = node.static ? "static" : "instance";
            const accessibility = node.accessibility || "public";

            const names = [];

            if (supportsModifiers) {
                if (type !== "constructor") {
                    names.push(`${accessibility}-${scope}-${type}`);
                    names.push(`${scope}-${type}`);
                }
                names.push(`${accessibility}-${type}`);
            }

            names.push(type);

            return getRankOrder(names, order);
        }

        /**
         * Gets the lowest possible rank higher than target.
         * e.g. given the following order:
         *   ...
         *   public-static-method
         *   protected-static-method
         *   private-static-method
         *   public-instance-method
         *   protected-instance-method
         *   private-instance-method
         *   ...
         * and considering that a public-instance-method has already been declared, so ranks contains
         * public-instance-method, then the lowest possible rank for public-static-method is
         * public-instance-method.
         * @param {Array} ranks the existing ranks in the object.
         * @param {number} target the target rank.
         * @param {Array} order the current order to be validated.
         * @returns {string} the name of the lowest possible rank without dashes (-).
         * @private
         */
        function getLowestRank(ranks, target, order) {
            let lowest = ranks[ranks.length - 1];

            ranks.forEach(rank => {
                if (rank > target) {
                    lowest = Math.min(lowest, rank);
                }
            });

            return order[lowest].replace(/-/g, " ");
        }

        /**
         * Validates each member rank.
         * @param {Array} members the members to be validated.
         * @param {(Array|string)} order the current order to be validated.
         * @param {boolean} supportsModifiers a flag indicating whether the type supports modifiers or not.
         * @returns {void}
         * @private
         */
        function validateMembers(members, order, supportsModifiers) {
            if (members && order !== "never") {
                const previousRanks = [];

                members.forEach(member => {
                    const rank = getRank(member, order, supportsModifiers);

                    if (rank !== -1) {
                        if (rank < previousRanks[previousRanks.length - 1]) {
                            context.report({
                                node: member,
                                message:
                                    "Member {{name}} should be declared before all {{rank}} definitions.",
                                data: {
                                    name: getMemberName(member),
                                    rank: getLowestRank(
                                        previousRanks,
                                        rank,
                                        order
                                    )
                                }
                            });
                        } else {
                            previousRanks.push(rank);
                        }
                    }
                });
            }
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            ClassDeclaration(node) {
                validateMembers(
                    node.body.body,
                    options.classes || options.default || defaultOrder,
                    true
                );
            },
            ClassExpression(node) {
                validateMembers(
                    node.body.body,
                    options.classExpressions || options.default || defaultOrder,
                    true
                );
            },
            TSInterfaceDeclaration(node) {
                validateMembers(
                    node.body.body,
                    options.interfaces || options.default || defaultOrder,
                    false
                );
            },
            TSTypeLiteral(node) {
                validateMembers(
                    node.members,
                    options.typeLiterals || options.default || defaultOrder,
                    false
                );
            }
        };
    }
};


/***/ }),

/***/ 1023:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforces the use of `as Type` assertions instead of `<Type>` assertions.
 * @author Patricio Trevino
 */


const util = __webpack_require__(1015);

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description:
                "Enforces the use of `as Type` assertions instead of `<Type>` assertions",
            extraDescription: [
                util.tslintRule("no-angle-bracket-type-assertion")
            ],
            category: "Style",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/no-angle-bracket-type-assertion.md"
        },
        schema: []
    },

    create(context) {
        const sourceCode = context.getSourceCode();

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            TSTypeAssertionExpression(node) {
                context.report({
                    node,
                    message:
                        "Prefer 'as {{cast}}' instead of '<{{cast}}>' when doing type assertions",
                    data: {
                        cast: sourceCode.getText(
                            node.typeAnnotation.typeAnnotation
                        )
                    }
                });
            }
        };
    }
};


/***/ }),

/***/ 1024:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Disallow generic `Array` constructors
 * @author Jed Fox
 * @author Matt DuVall <http://www.mattduvall.com/>
 */


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Disallow generic `Array` constructors",
            category: "Stylistic Issues",
            recommended: false,
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/no-array-constructor.md"
        },
        fixable: "code",
        schema: []
    },

    create(context) {
        /**
         * Disallow construction of dense arrays using the Array constructor
         * @param {ASTNode} node node to evaluate
         * @returns {void}
         * @private
         */
        function check(node) {
            if (
                node.arguments.length !== 1 &&
                node.callee.type === "Identifier" &&
                node.callee.name === "Array" &&
                !node.typeParameters
            ) {
                context.report({
                    node,
                    message: "The array literal notation [] is preferrable.",
                    fix(fixer) {
                        if (node.arguments.length === 0) {
                            return fixer.replaceText(node, "[]");
                        }
                        const fullText = context.getSourceCode().getText(node);
                        const preambleLength =
                            node.callee.range[1] - node.range[0];

                        return fixer.replaceText(
                            node,
                            `[${fullText.slice(preambleLength + 1, -1)}]`
                        );
                    }
                });
            }
        }

        return {
            CallExpression: check,
            NewExpression: check
        };
    }
};


/***/ }),

/***/ 1025:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Disallows the declaration of empty interfaces.
 * @author Patricio Trevino
 */


const util = __webpack_require__(1015);

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Disallow the declaration of empty interfaces",
            extraDescription: [util.tslintRule("no-empty-interface")],
            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/no-empty-interface.md"
        },
        schema: []
    },

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    create(context) {
        return {
            TSInterfaceDeclaration(node) {
                const heritage = node.heritage.length;

                if (node.body.body.length === 0 && heritage < 2) {
                    context.report({
                        node: node.id,
                        message:
                            heritage === 0
                                ? "An empty interface is equivalent to `{}`"
                                : "An interface declaring no members is equivalent to its supertype."
                    });
                }
            }
        };
    }
};


/***/ }),

/***/ 1026:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforces the any type is not used.
 * @author Danny Fritz
 * @author Patricio Trevino
 */


const util = __webpack_require__(1015);

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Disallow usage of the `any` type",
            extraDescription: [util.tslintRule("no-any")],
            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/no-explicit-any.md"
        },
        schema: []
    },

    create(context) {
        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Checks if the node has a type annotation of type any.
         * @param {ASTNode} node The node being validated.
         * @returns {void}
         * @private
         */
        function checkGenericNodeForAnnotation(node) {
            if (node.type === "TSAnyKeyword") {
                context.report({
                    node,
                    message: "Unexpected any. Specify a different type."
                });
            } else if (node.type === "TSArrayType") {
                checkGenericNodeForAnnotation(node.elementType);
            } else if (
                node.type === "TSUnionType" ||
                node.type === "TSIntersectionType"
            ) {
                node.types.forEach(type => {
                    checkGenericNodeForAnnotation(type);
                });
            } else if (node.type === "TSTypeReference") {
                if (node.typeParameters) {
                    // handles generics
                    node.typeParameters.params.forEach(param => {
                        checkGenericNodeForAnnotation(param);
                    });
                } else if (node.typeName) {
                    // handles non generics
                    checkGenericNodeForAnnotation(node.typeName);
                }
            } else if (node.type === "GenericTypeAnnotation") {
                if (node.typeParameters) {
                    node.typeParameters.params.forEach(param => {
                        checkGenericNodeForAnnotation(param);
                    });
                } else {
                    checkGenericNodeForAnnotation(node.id);
                }
            }
        }

        /**
         * Checks if a function node used the any type
         * @param {ASTNode} node The node representing a function.
         * @returns {void}
         * @private
         */
        function checkFunctionReturnTypeForAnnotation(node) {
            if (node.returnType) {
                checkGenericNodeForAnnotation(node.returnType.typeAnnotation);
            }
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            Identifier(node) {
                if (node.typeAnnotation) {
                    checkGenericNodeForAnnotation(
                        node.typeAnnotation.typeAnnotation
                    );
                }
            },
            TSTypeAnnotation(node) {
                if (node.typeAnnotation) {
                    checkGenericNodeForAnnotation(node.typeAnnotation);
                }
            },
            FunctionDeclaration: checkFunctionReturnTypeForAnnotation,
            FunctionExpression: checkFunctionReturnTypeForAnnotation,
            ArrowFunctionExpression: checkFunctionReturnTypeForAnnotation
        };
    }
};


/***/ }),

/***/ 1027:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Disallows explicit type declarations for inferrable types
 * @author James Garbutt <https://github.com/43081j>
 */



const util = __webpack_require__(1015);

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description:
                "Disallows explicit type declarations for variables or parameters initialized to a number, string, or boolean.",
            extraDescription: [util.tslintRule("no-inferrable-types")],
            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/no-inferrable-types.md"
        },
        fixable: "code",
        schema: [
            {
                type: "object",
                properties: {
                    ignoreParameters: {
                        type: "boolean"
                    },
                    ignoreProperties: {
                        type: "boolean"
                    }
                },
                additionalProperties: false
            }
        ]
    },

    create(context) {
        const ignoreParameters = context.options[0]
            ? context.options[0].ignoreParameters
            : false;
        const ignoreProperties = context.options[0]
            ? context.options[0].ignoreProperties
            : false;

        /**
         * Returns whether a node has an inferrable value or not
         * @param {ASTNode} node the node to check
         * @param {ASTNode} init the initializer
         * @returns {boolean} whether the node has an inferrable type
         */
        function isInferrable(node, init) {
            if (node.type !== "TSTypeAnnotation" || !node.typeAnnotation) {
                return false;
            }

            if (!init) {
                return false;
            }

            const annotation = node.typeAnnotation;

            if (annotation.type === "TSStringKeyword") {
                return (
                    (init.type === "Literal" &&
                        typeof init.value === "string") ||
                    (init.type === "TemplateElement" &&
                        (!init.expressions || init.expressions.length === 0))
                );
            }

            if (annotation.type === "TSBooleanKeyword") {
                return init.type === "Literal";
            }

            if (annotation.type === "TSNumberKeyword") {
                // Infinity is special
                if (
                    (init.type === "UnaryExpression" &&
                        init.operator === "-" &&
                        init.argument.type === "Identifier" &&
                        init.argument.name === "Infinity") ||
                    (init.type === "Identifier" && init.name === "Infinity")
                ) {
                    return true;
                }

                return (
                    init.type === "Literal" && typeof init.value === "number"
                );
            }

            return false;
        }

        /**
         * Reports an inferrable type declaration, if any
         * @param {ASTNode} node the node being visited
         * @param {ASTNode} typeNode the type annotation node
         * @param {ASTNode} initNode the initializer node
         * @returns {void}
         */
        function reportInferrableType(node, typeNode, initNode) {
            if (!typeNode || !initNode || !typeNode.typeAnnotation) {
                return;
            }

            if (!isInferrable(typeNode, initNode)) {
                return;
            }

            const typeMap = {
                TSBooleanKeyword: "boolean",
                TSNumberKeyword: "number",
                TSStringKeyword: "string"
            };

            const type = typeMap[typeNode.typeAnnotation.type];

            context.report({
                node,
                message: `Type ${type} trivially inferred from a ${type} literal, remove type annotation`,
                fix: fixer => fixer.remove(typeNode)
            });
        }

        /**
         * Visits variables
         * @param {ASTNode} node the node to be visited
         * @returns {void}
         */
        function inferrableVariableVisitor(node) {
            if (!node.id) {
                return;
            }
            reportInferrableType(node, node.id.typeAnnotation, node.init);
        }

        /**
         * Visits parameters
         * @param {ASTNode} node the node to be visited
         * @returns {void}
         */
        function inferrableParameterVisitor(node) {
            if (ignoreParameters || !node.params) {
                return;
            }
            node.params
                .filter(
                    param =>
                        param.type === "AssignmentPattern" &&
                        param.left &&
                        param.right
                )
                .forEach(param => {
                    reportInferrableType(
                        param,
                        param.left.typeAnnotation,
                        param.right
                    );
                });
        }

        /**
         * Visits properties
         * @param {ASTNode} node the node to be visited
         * @returns {void}
         */
        function inferrablePropertyVisitor(node) {
            // We ignore `readonly` because of Microsoft/TypeScript#14416
            // Essentially a readonly property without a type
            // will result in its value being the type, leading to
            // compile errors if the type is stripped.
            if (ignoreProperties || node.readonly) {
                return;
            }
            reportInferrableType(node, node.typeAnnotation, node.value);
        }

        return {
            VariableDeclarator: inferrableVariableVisitor,
            FunctionExpression: inferrableParameterVisitor,
            FunctionDeclaration: inferrableParameterVisitor,
            ArrowFunctionExpression: inferrableParameterVisitor,
            ClassProperty: inferrablePropertyVisitor
        };
    }
};


/***/ }),

/***/ 1028:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Disallows the use of custom TypeScript modules and namespaces.
 * @author Patricio Trevino
 */


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description:
                "Disallow the use of custom TypeScript modules and namespaces",
            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/no-namespace.md"
        },
        schema: [
            {
                type: "object",
                properties: {
                    allowDeclarations: {
                        type: "boolean"
                    },
                    allowDefinitionFiles: {
                        type: "boolean"
                    }
                },
                additionalProperties: false
            }
        ]
    },

    create(context) {
        const allowDeclarations = context.options[0]
            ? context.options[0].allowDeclarations
            : false;
        const allowDefinitionFiles = context.options[0]
            ? context.options[0].allowDefinitionFiles
            : false;

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Determines if node is a TypeScript module declaration (instead of a namespace/module).
         * @param {ASTNode} node the node to be evaluated.
         * @returns {boolean} true when node is an external declaration.
         * @private
         */
        function isTypeScriptModuleDeclaration(node) {
            return node.id && node.id.type === "Literal";
        }

        /**
         * Determines if node is a module/namespace declaration.
         * @param {ASTNode} node the node to be evaluated.
         * @returns {boolean} true when dealing with declarations.
         * @private
         */
        function isDeclaration(node) {
            return (
                node.declare === true && !isTypeScriptModuleDeclaration(node)
            );
        }

        /**
         * Determines if node is part of a declaration file (d.ts).
         * @returns {boolean} true when dealing with declaration files.
         * @private
         */
        function isDefinitionFile() {
            const filename = context.getFilename();

            return filename
                ? filename.slice(-5).toLowerCase() === ".d.ts"
                : false;
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            TSModuleDeclaration(node) {
                if (
                    isTypeScriptModuleDeclaration(node) ||
                    (allowDefinitionFiles && isDefinitionFile()) ||
                    (allowDeclarations && isDeclaration(node))
                ) {
                    return;
                }

                context.report({
                    node,
                    message:
                        "ES2015 module syntax is preferred over custom TypeScript modules and namespaces"
                });
            }
        };
    }
};


/***/ }),

/***/ 1029:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Disallows non-null assertions using the `!` postfix operator.
 * @author Macklin Underdown
 */


const util = __webpack_require__(1015);

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description:
                "Disallows non-null assertions using the `!` postfix operator",
            extraDescription: [util.tslintRule("no-non-null-assertion")],
            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/no-non-null-assertion.md"
        },
        schema: []
    },
    create(context) {
        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            TSNonNullExpression(node) {
                context.report({
                    node,
                    message: "Forbidden non-null assertion"
                });
            }
        };
    }
};


/***/ }),

/***/ 1030:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Disallows parameter properties in class constructors.
 * @author Patricio Trevino
 */


const util = __webpack_require__(1015);

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description:
                "Disallow the use of parameter properties in class constructors.",
            extraDescription: [util.tslintRule("no-parameter-properties")],
            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/no-parameter-properties.md"
        },
        schema: [
            {
                type: "object",
                properties: {
                    allows: {
                        type: "array",
                        items: {
                            enum: [
                                "readonly",
                                "private",
                                "protected",
                                "public",
                                "private readonly",
                                "protected readonly",
                                "public readonly"
                            ]
                        },
                        minItems: 1
                    }
                },
                additionalProperties: false
            }
        ]
    },

    create(context) {
        const options = context.options[0] || {};
        const allows = options.allows || [];

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Gets the modifiers of `node`.
         * @param {ASTNode} node the node to be inspected.
         * @returns {string} the modifiers of node
         * @private
         */
        function getModifiers(node) {
            const modifiers = [];

            modifiers.push(node.accessibility);
            if (node.readonly || node.isReadonly) {
                modifiers.push("readonly");
            }

            return modifiers.filter(Boolean).join(" ");
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            TSParameterProperty(node) {
                const modifiers = getModifiers(node);

                if (allows.indexOf(modifiers) === -1) {
                    context.report({
                        node,
                        message:
                            "Property {{parameter}} cannot be declared in the constructor",
                        data: {
                            parameter: node.parameter.name
                        }
                    });
                }
            }
        };
    }
};


/***/ }),

/***/ 1031:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforces triple slash references are not used.
 * @author Danny Fritz
 */


const util = __webpack_require__(1015);

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: 'Disallow `/// <reference path="" />` comments',
            extraDescription: [util.tslintRule("no-reference")],
            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/no-triple-slash-reference.md"
        },
        schema: []
    },

    create(context) {
        const referenceRegExp = /^\/\s*<reference/;
        const sourceCode = context.getSourceCode();

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Checks if property has an accessibility modifier.
         * @param {ASTNode} program The node representing a Program.
         * @returns {void}
         * @private
         */
        function checkTripleSlashReference(program) {
            const commentsBefore = sourceCode.getCommentsBefore(program);

            commentsBefore.forEach(comment => {
                if (comment.type !== "Line") {
                    return;
                }
                if (referenceRegExp.test(comment.value)) {
                    context.report({
                        node: comment,
                        message: "Do not use a triple slash reference"
                    });
                }
            });
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            Program: checkTripleSlashReference
        };
    }
};


/***/ }),

/***/ 1032:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Disallows the use of type aliases.
 * @author Patricio Trevino
 */


const util = __webpack_require__(1015);

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Disallow the use of type aliases",
            extraDescription: [util.tslintRule("interface-over-type-literal")],
            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/no-type-alias.md"
        },
        schema: [
            {
                type: "object",
                properties: {
                    allowAliases: {
                        enum: [
                            true,
                            false,
                            "always",
                            "never",
                            "in-unions",
                            "in-intersections",
                            "in-unions-and-intersections"
                        ]
                    },
                    allowCallbacks: {
                        enum: [true, false, "always", "never"]
                    },
                    allowLiterals: {
                        enum: [
                            true,
                            false,
                            "always",
                            "never",
                            "in-unions",
                            "in-intersections",
                            "in-unions-and-intersections"
                        ]
                    },
                    allowMappedTypes: {
                        enum: [
                            true,
                            false,
                            "always",
                            "never",
                            "in-unions",
                            "in-intersections",
                            "in-unions-and-intersections"
                        ]
                    }
                },
                additionalProperties: false
            }
        ]
    },

    create(context) {
        const options = context.options[0];

        const allowAliases = (options && options.allowAliases) || "never";
        const allowCallbacks = (options && options.allowCallbacks) || "never";
        const allowLiterals = (options && options.allowLiterals) || "never";
        const allowMappedTypes =
            (options && options.allowMappedTypes) || "never";

        const unions = [
            true,
            "always",
            "in-unions",
            "in-unions-and-intersections"
        ];
        const intersections = [
            true,
            "always",
            "in-intersections",
            "in-unions-and-intersections"
        ];
        const compositions = [
            "in-unions",
            "in-intersections",
            "in-unions-and-intersections"
        ];
        const aliasTypes = ["TSLastTypeNode", "TSArrayType", "TSTypeReference"];

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Determines if the given node is a union or an intersection.
         * @param {TSNode} node the node to be evaluated.
         * @returns {boolean} true when node if a union or intersection.
         * @private
         */
        function isComposition(node) {
            return (
                node &&
                (node.type === "TSUnionType" ||
                    node.type === "TSIntersectionType")
            );
        }

        /**
         * Determines if the composition type is supported by the allowed flags.
         * @param {boolean} isTopLevel a flag indicating this is the top level node.
         * @param {string} compositionType the composition type (either TSUnionType or TSIntersectionType)
         * @param {string} allowed the currently allowed flags.
         * @returns {boolean} true if the composition type supported by the allowed flags.
         * @private
         */
        function isSupportedComposition(isTopLevel, compositionType, allowed) {
            return (
                compositions.indexOf(allowed) === -1 ||
                (!isTopLevel &&
                    ((compositionType === "TSUnionType" &&
                        unions.indexOf(allowed) > -1) ||
                        (compositionType === "TSIntersectionType" &&
                            intersections.indexOf(allowed) > -1)))
            );
        }

        /**
         * Determines if the given node is an alias type (keywords, arrays, type references and constants).
         * @param {TSNode} node the node to be evaluated.
         * @returns {boolean} true when the node is an alias type.
         * @private
         */
        function isAlias(node) {
            return (
                node &&
                (/Keyword$/.test(node.type) ||
                    aliasTypes.indexOf(node.type) > -1)
            );
        }

        /**
         * Determines if the given node is a callback type.
         * @param {TSNode} node the node to be evaluated.
         * @returns {boolean} true when the node is a callback type.
         * @private
         */
        function isCallback(node) {
            return node && node.type === "TSFunctionType";
        }

        /**
         * Determines if the given node is a literal type (objects).
         * @param {TSNode} node the node to be evaluated.
         * @returns {boolean} true when the node is a literal type (object).
         * @private
         */
        function isLiteral(node) {
            return node && node.type === "TSTypeLiteral";
        }

        /**
         * Determines if the given node is a mapped type.
         * @param {TSNode} node the node to be evaluated.
         * @returns {boolean} true when the node is a mapped type.
         * @private
         */
        function isMappedType(node) {
            return node && node.type === "TSMappedType";
        }

        /**
         * Gets the message to be displayed based on the node type and whether the node is a top level declaration.
         * @param {string} compositionType the type of composition this alias is part of (undefined if not
         *                                  part of a composition)
         * @param {boolean} isRoot a flag indicating we are dealing with the top level declaration.
         * @param {string} type the kind of type alias being validated.
         * @returns {string} the message to be displayed.
         * @private
         */
        function getMessage(compositionType, isRoot, type) {
            if (isRoot) {
                return type
                    ? `Type ${type} are not allowed`
                    : "Type aliases are not allowed";
            }

            return compositionType === "TSUnionType"
                ? `${type[0].toUpperCase()}${type.substring(
                      1
                  )} in union types are not allowed`
                : `${type[0].toUpperCase()}${type.substring(
                      1
                  )} in intersection types are not allowed`;
        }

        /**
         * Validates the node looking for aliases, callbacks and literals.
         * @param {TSNode} node the node to be validated.
         * @param {boolean} isTopLevel a flag indicating this is the top level node.
         * @param {boolean} compositionType the type of composition this alias is part of (undefined if not
         *                                  part of a composition)
         * @returns {void}
         * @private
         */
        function validateTypeAliases(node, isTopLevel, compositionType) {
            if (isAlias(node)) {
                if (
                    allowAliases === "never" ||
                    !isSupportedComposition(
                        isTopLevel,
                        compositionType,
                        allowAliases
                    )
                ) {
                    context.report({
                        node,
                        message: getMessage(
                            compositionType,
                            isTopLevel,
                            "aliases"
                        )
                    });
                }
            } else if (isCallback(node)) {
                if (allowCallbacks === "never") {
                    context.report({
                        node,
                        message: getMessage(
                            compositionType,
                            isTopLevel,
                            "callbacks"
                        )
                    });
                }
            } else if (isLiteral(node)) {
                if (
                    allowLiterals === "never" ||
                    !isSupportedComposition(
                        isTopLevel,
                        compositionType,
                        allowLiterals
                    )
                ) {
                    context.report({
                        node,
                        message: getMessage(
                            compositionType,
                            isTopLevel,
                            "literals"
                        )
                    });
                }
            } else if (isMappedType(node)) {
                if (
                    allowMappedTypes === "never" ||
                    !isSupportedComposition(
                        isTopLevel,
                        compositionType,
                        allowMappedTypes
                    )
                ) {
                    context.report({
                        node,
                        message: getMessage(
                            compositionType,
                            isTopLevel,
                            "mapped types"
                        )
                    });
                }
            } else {
                context.report({
                    node,
                    message: getMessage(compositionType, isTopLevel)
                });
            }
        }

        /**
         * Validates compositions (unions and/or intersections).
         * @param {TSNode} node the node to be validated.
         * @returns {void}
         * @private
         */
        function validateCompositions(node) {
            node.types.forEach(type => {
                if (isComposition(type)) {
                    validateCompositions(type);
                } else {
                    validateTypeAliases(type, false, node.type);
                }
            });
        }

        /**
         * Validates the node looking for compositions, aliases, callbacks and literals.
         * @param {TSNode} node the node to be validated.
         * @param {boolean} isTopLevel a flag indicating this is the top level node.
         * @returns {void}
         * @private
         */
        function validateNode(node, isTopLevel) {
            if (isComposition(node)) {
                validateCompositions(node);
            } else {
                validateTypeAliases(node, isTopLevel);
            }
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            VariableDeclaration(node) {
                if (node.kind === "type") {
                    validateNode(node.declarations[0].init, true);
                }
            }
        };
    }
};


/***/ }),

/***/ 1033:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent TypeScript-specific variables being falsely marked as unused
 * @author James Henry
 */


/**
 * Record that a particular variable has been used in code
 *
 * @param {Object} context The current rule context.
 * @param {string} name The name of the variable to mark as used.
 * @returns {boolean} True if the variable was found and marked as used, false if not.
 */
function markVariableAsUsed(context, name) {
    let scope = context.getScope();
    let variables;
    let i;
    let len;
    let found = false;

    // Special Node.js scope means we need to start one level deeper
    if (scope.type === "global") {
        while (scope.childScopes.length) {
            scope = scope.childScopes[0];
        }
    }

    do {
        variables = scope.variables;
        for (i = 0, len = variables.length; i < len; i++) {
            if (variables[i].name === name) {
                variables[i].eslintUsed = true;
                found = true;
            }
        }
        scope = scope.upper;
    } while (scope);

    return found;
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description:
                "Prevent TypeScript-specific constructs from being erroneously flagged as unused",
            category: "TypeScript",
            recommended: true,
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/no-unused-vars.md"
        },
        schema: []
    },

    create(context) {
        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Checks the given node type annotation and marks it as used.
         * @param {ASTNode} node the relevant AST node.
         * @returns {void}
         * @private
         */
        function markTypeAnnotationAsUsed(node) {
            const annotation = node.typeAnnotation || node;

            switch (annotation.type) {
                case "Identifier": {
                    markVariableAsUsed(context, annotation.name);
                    break;
                }
                case "TSArrayType": {
                    markTypeAnnotationAsUsed(annotation.elementType);
                    break;
                }
                case "TSQualifiedName": {
                    markTypeAnnotationAsUsed(annotation.left);
                    markTypeAnnotationAsUsed(annotation.right);
                    break;
                }
                case "TSTypeReference": {
                    if (annotation.typeName.type === "TSArrayType") {
                        markTypeAnnotationAsUsed(
                            annotation.typeName.elementType
                        );
                    } else if (annotation.typeName.type === "TSQualifiedName") {
                        markTypeAnnotationAsUsed(annotation.typeName);
                    } else {
                        markVariableAsUsed(context, annotation.typeName.name);
                        if (
                            annotation.typeParameters &&
                            annotation.typeParameters.params
                        ) {
                            annotation.typeParameters.params.forEach(param => {
                                markTypeAnnotationAsUsed(param);
                            });
                        }
                    }

                    break;
                }
                case "TSTypeLiteral": {
                    annotation.members.forEach(member => {
                        if (member.typeAnnotation) {
                            markTypeAnnotationAsUsed(member.typeAnnotation);
                        }
                    });

                    break;
                }
                case "TSUnionType":
                case "TSIntersectionType":
                    annotation.types.forEach(type => {
                        markTypeAnnotationAsUsed(type);
                    });

                    break;

                case "TSTypeParameter": {
                    markTypeAnnotationAsUsed(annotation.constraint);
                    break;
                }
                case "TSMappedType": {
                    markTypeAnnotationAsUsed(annotation.typeAnnotation);
                    markTypeAnnotationAsUsed(annotation.typeParameter);
                    break;
                }
                default:
                    break;
            }
        }

        /**
         * Checks the given decorator and marks it as used.
         * @param {ASTNode} node The relevant AST node.
         * @returns {void}
         * @private
         */
        function markDecoratorAsUsed(node) {
            /**
             * Decorator
             */
            if (node.name) {
                markVariableAsUsed(context, node.name);
                return;
            }

            if (node.expression && node.expression.name) {
                markVariableAsUsed(context, node.expression.name);
                return;
            }

            /**
             * Decorator Factory
             */
            if (node.callee && node.callee.name) {
                markVariableAsUsed(context, node.callee.name);
            }

            if (
                node.expression &&
                node.expression.callee &&
                node.expression.callee.name
            ) {
                markVariableAsUsed(context, node.expression.callee.name);
            }
        }

        /**
         * Checks the given interface and marks it as used.
         * Generic arguments are also included in the check.
         * @param {ASTNode} node The relevant AST node.
         * @returns {void}
         * @private
         */
        function markImplementedInterfaceAsUsed(node) {
            if (!node || !node.id || !node.id.name) {
                return;
            }
            markVariableAsUsed(context, node.id.name);

            if (!node.typeParameters || !node.typeParameters.params) {
                return;
            }
            node.typeParameters.params.forEach(markTypeAnnotationAsUsed);
        }

        /**
         * Checks the given class has a super class and marks it as used.
         * Generic arguments are also included in the check.
         * @param {ASTNode} node The relevant AST node.
         * @returns {void}
         * @private
         */
        function markSuperClassAsUsed(node) {
            if (!node.superClass) {
                return;
            }
            markVariableAsUsed(context, node.superClass.name);

            if (!node.superTypeParameters || !node.superTypeParameters.params) {
                return;
            }
            node.superTypeParameters.params.forEach(markTypeAnnotationAsUsed);
        }

        /**
         * Checks the given interface and marks it as used.
         * Generic arguments are also included in the check.
         * This is used when interfaces are extending other interfaces.
         * @param {ASTNode} node the relevant AST node.
         * @returns {void}
         * @private
         */
        function markExtendedInterfaceAsUsed(node) {
            if (!node || !node.id || !node.id.name) {
                return;
            }
            markVariableAsUsed(context, node.id.name);

            if (!node.typeParameters || !node.typeParameters.params) {
                return;
            }
            node.typeParameters.params.forEach(markTypeAnnotationAsUsed);
        }

        /**
         * Checks the given function return type and marks it as used.
         * @param {ASTNode} node the relevant AST node.
         * @returns {void}
         * @private
         */
        function markFunctionReturnTypeAsUsed(node) {
            if (node.returnType) {
                markTypeAnnotationAsUsed(node.returnType);
            }
        }

        /**
         * Checks the given class and marks super classes, interfaces and decoratores as used.
         * @param {ASTNode} node the relevant AST node.
         * @returns {void}
         * @private
         */
        function markClassOptionsAsUsed(node) {
            markSuperClassAsUsed(node);
            if (node.implements) {
                node.implements.forEach(markImplementedInterfaceAsUsed);
            }
            if (node.decorators) {
                node.decorators.forEach(markDecoratorAsUsed);
            }
            if (node.typeParameters && node.typeParameters.params) {
                node.typeParameters.params.forEach(markTypeAnnotationAsUsed);
            }
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            Identifier(node) {
                if (node.typeAnnotation) {
                    markTypeAnnotationAsUsed(node.typeAnnotation);
                }

                if (node.decorators) {
                    node.decorators.forEach(markDecoratorAsUsed);
                }
            },

            TSTypeAnnotation(node) {
                if (node.typeAnnotation) {
                    markTypeAnnotationAsUsed(node.typeAnnotation);
                }
            },

            FunctionDeclaration: markFunctionReturnTypeAsUsed,
            FunctionExpression: markFunctionReturnTypeAsUsed,
            ArrowFunctionExpression: markFunctionReturnTypeAsUsed,

            CallExpression(node) {
                if (node.typeParameters && node.typeParameters.params) {
                    node.typeParameters.params.forEach(
                        markTypeAnnotationAsUsed
                    );
                }
            },

            Decorator: markDecoratorAsUsed,
            TSInterfaceHeritage: markExtendedInterfaceAsUsed,

            ClassDeclaration: markClassOptionsAsUsed,
            ClassExpression: markClassOptionsAsUsed,

            ObjectPattern(node) {
                if (node.typeAnnotation) {
                    markTypeAnnotationAsUsed(node.typeAnnotation);
                }
            },

            MethodDefinition(node) {
                if (node.decorators) {
                    node.decorators.forEach(markDecoratorAsUsed);
                }
            }
        };
    }
};


/***/ }),

/***/ 1034:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Rule to flag use of variables before they are defined
 * @copyright ESLint
 * @see https://github.com/eslint/eslint/blob/a113cd3/lib/rules/no-use-before-define.js
 * @author Ilya Volodin
 * @author Jed Fox
 */



//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const SENTINEL_TYPE = /^(?:(?:Function|Class)(?:Declaration|Expression)|ArrowFunctionExpression|CatchClause|ImportDeclaration|ExportNamedDeclaration)$/;
const FOR_IN_OF_TYPE = /^For(?:In|Of)Statement$/;

/**
 * Parses a given value as options.
 *
 * @param {any} options - A value to parse.
 * @returns {Object} The parsed options.
 */
function parseOptions(options) {
    let functions = true;
    let classes = true;
    let variables = true;
    let typedefs = true;

    if (typeof options === "string") {
        functions = options !== "nofunc";
    } else if (typeof options === "object" && options !== null) {
        functions = options.functions !== false;
        classes = options.classes !== false;
        variables = options.variables !== false;
        typedefs = options.typedefs !== false;
    }

    return { functions, classes, variables, typedefs };
}

/**
 * Checks whether or not a given variable is a function declaration.
 *
 * @param {eslint-scope.Variable} variable - A variable to check.
 * @returns {boolean} `true` if the variable is a function declaration.
 */
function isFunction(variable) {
    return variable.defs[0].type === "FunctionName";
}

/**
 * Checks whether or not a given variable is a class declaration in an upper function scope.
 *
 * @param {eslint-scope.Variable} variable - A variable to check.
 * @param {eslint-scope.Reference} reference - A reference to check.
 * @returns {boolean} `true` if the variable is a class declaration.
 */
function isOuterClass(variable, reference) {
    return (
        variable.defs[0].type === "ClassName" &&
        variable.scope.variableScope !== reference.from.variableScope
    );
}

/**
 * Checks whether or not a given variable is a variable declaration in an upper function scope.
 * @param {eslint-scope.Variable} variable - A variable to check.
 * @param {eslint-scope.Reference} reference - A reference to check.
 * @returns {boolean} `true` if the variable is a variable declaration.
 */
function isOuterVariable(variable, reference) {
    return (
        variable.defs[0].type === "Variable" &&
        variable.scope.variableScope !== reference.from.variableScope
    );
}

/**
 * Checks whether or not a given variable is a type declaration.
 * @param {eslint-scope.Variable} variable - A type to check.
 * @returns {boolean} `true` if the variable is a type.
 */
function isType(variable) {
    return (
        variable.defs[0].type === "Variable" &&
        variable.defs[0].parent.kind === "type"
    );
}

/**
 * Checks whether or not a given location is inside of the range of a given node.
 *
 * @param {ASTNode} node - An node to check.
 * @param {number} location - A location to check.
 * @returns {boolean} `true` if the location is inside of the range of the node.
 */
function isInRange(node, location) {
    return node && node.range[0] <= location && location <= node.range[1];
}

/**
 * Checks whether or not a given reference is inside of the initializers of a given variable.
 *
 * This returns `true` in the following cases:
 *
 *     var a = a
 *     var [a = a] = list
 *     var {a = a} = obj
 *     for (var a in a) {}
 *     for (var a of a) {}
 *
 * @param {Variable} variable - A variable to check.
 * @param {Reference} reference - A reference to check.
 * @returns {boolean} `true` if the reference is inside of the initializers.
 */
function isInInitializer(variable, reference) {
    if (variable.scope !== reference.from) {
        return false;
    }

    let node = variable.identifiers[0].parent;
    const location = reference.identifier.range[1];

    while (node) {
        if (node.type === "VariableDeclarator") {
            if (isInRange(node.init, location)) {
                return true;
            }
            if (
                FOR_IN_OF_TYPE.test(node.parent.parent.type) &&
                isInRange(node.parent.parent.right, location)
            ) {
                return true;
            }
            break;
        } else if (node.type === "AssignmentPattern") {
            if (isInRange(node.right, location)) {
                return true;
            }
        } else if (SENTINEL_TYPE.test(node.type)) {
            break;
        }

        node = node.parent;
    }

    return false;
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description:
                "Disallow the use of variables before they are defined",
            category: "Variables",
            recommended: false,
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/no-use-before-define.md"
        },

        schema: [
            {
                oneOf: [
                    {
                        enum: ["nofunc"]
                    },
                    {
                        type: "object",
                        properties: {
                            functions: { type: "boolean" },
                            classes: { type: "boolean" },
                            variables: { type: "boolean" },
                            typedefs: { type: "boolean" }
                        },
                        additionalProperties: false
                    }
                ]
            }
        ]
    },

    create(context) {
        const options = parseOptions(context.options[0]);

        /**
         * Determines whether a given use-before-define case should be reported according to the options.
         * @param {eslint-scope.Variable} variable The variable that gets used before being defined
         * @param {eslint-scope.Reference} reference The reference to the variable
         * @returns {boolean} `true` if the usage should be reported
         */
        function isForbidden(variable, reference) {
            if (isFunction(variable)) {
                return options.functions;
            }
            if (isOuterClass(variable, reference)) {
                return options.classes;
            }
            if (isType(variable) && !options.typedefs) {
                return false;
            }
            if (isOuterVariable(variable, reference)) {
                return options.variables;
            }
            return true;
        }

        /**
         * Finds and validates all variables in a given scope.
         * @param {Scope} scope The scope object.
         * @returns {void}
         * @private
         */
        function findVariablesInScope(scope) {
            scope.references.forEach(reference => {
                const variable = reference.resolved;

                // Skips when the reference is:
                // - initialization's.
                // - referring to an undefined variable.
                // - referring to a global environment variable (there're no identifiers).
                // - located preceded by the variable (except in initializers).
                // - allowed by options.
                if (
                    reference.init ||
                    !variable ||
                    variable.identifiers.length === 0 ||
                    (variable.identifiers[0].range[1] <
                        reference.identifier.range[1] &&
                        !isInInitializer(variable, reference)) ||
                    !isForbidden(variable, reference)
                ) {
                    return;
                }

                // Reports.
                context.report({
                    node: reference.identifier,
                    message: "'{{name}}' was used before it was defined.",
                    data: reference.identifier
                });
            });
        }

        /**
         * Validates variables inside of a node's scope.
         * @param {ASTNode} node The node to check.
         * @returns {void}
         * @private
         */
        function findVariables() {
            const scope = context.getScope();

            findVariablesInScope(scope);
        }

        const ruleDefinition = {
            "Program:exit"(node) {
                const scope = context.getScope(),
                    ecmaFeatures = context.parserOptions.ecmaFeatures || {};

                findVariablesInScope(scope);

                // both Node.js and Modules have an extra scope
                if (ecmaFeatures.globalReturn || node.sourceType === "module") {
                    findVariablesInScope(scope.childScopes[0]);
                }
            }
        };

        if (context.parserOptions.ecmaVersion >= 6) {
            ruleDefinition["BlockStatement:exit"] = findVariables;
            ruleDefinition["SwitchStatement:exit"] = findVariables;

            ruleDefinition["ArrowFunctionExpression:exit"] = function(node) {
                if (node.body.type !== "BlockStatement") {
                    findVariables();
                }
            };
        } else {
            ruleDefinition["FunctionExpression:exit"] = findVariables;
            ruleDefinition["FunctionDeclaration:exit"] = findVariables;
            ruleDefinition["ArrowFunctionExpression:exit"] = findVariables;
        }

        return ruleDefinition;
    }
};


/***/ }),

/***/ 1035:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Disallows the use of require statements except in import statements.
 * @author Macklin Underdown
 */


const util = __webpack_require__(1015);

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description:
                "Disallows the use of require statements except in import statements",
            extraDescription: [util.tslintRule("no-var-requires")],
            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/no-var-requires.md"
        },
        schema: []
    },
    create(context) {
        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            CallExpression(node) {
                if (
                    node.callee.name === "require" &&
                    node.parent.type === "VariableDeclarator"
                ) {
                    context.report({
                        node,
                        message:
                            "Require statement not part of import statement"
                    });
                }
            }
        };
    }
};


/***/ }),

/***/ 1036:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforces the use of the keyword `namespace` over `module` to declare custom TypeScript modules.
 * @author Patricio Trevino
 */


const util = __webpack_require__(1015);

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description:
                "Require the use of the `namespace` keyword instead of the `module` keyword to declare custom TypeScript modules.",
            extraDescription: [util.tslintRule("no-internal-module")],
            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/prefer-namespace-keyword.md"
        },
        fixable: "code",
        schema: []
    },

    create(context) {
        const sourceCode = context.getSourceCode();

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            TSModuleDeclaration(node) {
                // Get tokens of the declaration header.
                const firstToken = sourceCode.getFirstToken(node);
                const tokens = [firstToken].concat(
                    sourceCode.getTokensBetween(
                        firstToken,
                        sourceCode.getFirstToken(node.body)
                    )
                );

                // Get 'module' token and the next one.
                const moduleKeywordIndex = tokens.findIndex(
                    t => t.type === "Identifier" && t.value === "module"
                );
                const moduleKeywordToken =
                    moduleKeywordIndex === -1
                        ? null
                        : tokens[moduleKeywordIndex];
                const moduleNameToken = tokens[moduleKeywordIndex + 1];

                // Do nothing if the 'module' token was not found or the module name is a string.
                if (!moduleKeywordToken || moduleNameToken.type === "String") {
                    return;
                }

                context.report({
                    node,
                    message:
                        "Use 'namespace' instead of 'module' to declare custom TypeScript modules",
                    fix(fixer) {
                        return fixer.replaceText(
                            moduleKeywordToken,
                            "namespace"
                        );
                    }
                });
            }
        };
    }
};


/***/ }),

/***/ 1037:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforces spacing around type annotations.
 * @author Nicholas C. Zakas
 * @author Patricio Trevino
 */


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const definition = {
    type: "object",
    properties: {
        before: { type: "boolean" },
        after: { type: "boolean" }
    },
    additionalProperties: false
};

module.exports = {
    meta: {
        docs: {
            description: "Require consistent spacing around type annotations",
            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/type-annotation-spacing.md"
        },
        fixable: "code",
        schema: [
            {
                type: "object",
                properties: {
                    before: { type: "boolean" },
                    after: { type: "boolean" },
                    overrides: {
                        type: "object",
                        properties: {
                            colon: definition,
                            arrow: definition
                        },
                        additionalProperties: false
                    }
                }
            }
        ]
    },

    create(context) {
        const punctuators = [":", "=>"];
        const sourceCode = context.getSourceCode();
        const options = context.options[0] || {};

        const overrides = options.overrides || {};

        const colonOptions = Object.assign(
            {},
            { before: false, after: true },
            options,
            overrides.colon
        );
        const arrowOptions = Object.assign(
            {},
            { before: true, after: true },
            options,
            overrides.arrow
        );

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Checks if there's proper spacing around type annotations (no space
         * before colon, one space after).
         * @param {ASTNode} typeAnnotation The TSTypeAnnotation node.
         * @returns {void}
         * @private
         */
        function checkTypeAnnotationSpacing(typeAnnotation) {
            const nextToken = typeAnnotation;
            const punctuatorTokenEnd = sourceCode.getTokenBefore(nextToken);
            let punctuatorTokenStart = punctuatorTokenEnd;
            let previousToken = sourceCode.getTokenBefore(punctuatorTokenEnd);
            let type = punctuatorTokenEnd.value;

            if (punctuators.indexOf(type) === -1) {
                return;
            }

            const before =
                type === ":" ? colonOptions.before : arrowOptions.before;
            const after =
                type === ":" ? colonOptions.after : arrowOptions.after;

            if (type === ":" && previousToken.value === "?") {
                // shift the start to the ?
                type = "?:";
                punctuatorTokenStart = previousToken;
                previousToken = sourceCode.getTokenBefore(previousToken);

                // handle the +/- modifiers for optional modification operators
                if (
                    previousToken.value === "+" ||
                    previousToken.value === "-"
                ) {
                    type = `${previousToken.value}?:`;
                    punctuatorTokenStart = previousToken;
                    previousToken = sourceCode.getTokenBefore(previousToken);
                }
            }

            const previousDelta =
                punctuatorTokenStart.range[0] - previousToken.range[1];
            const nextDelta = nextToken.range[0] - punctuatorTokenEnd.range[1];

            if (after && nextDelta === 0) {
                context.report({
                    node: punctuatorTokenEnd,
                    message: `Expected a space after the '${type}'`,
                    fix(fixer) {
                        return fixer.insertTextAfter(punctuatorTokenEnd, " ");
                    }
                });
            } else if (!after && nextDelta > 0) {
                context.report({
                    node: punctuatorTokenEnd,
                    message: `Unexpected space after the '${type}'`,
                    fix(fixer) {
                        return fixer.removeRange([
                            punctuatorTokenEnd.range[1],
                            nextToken.range[0]
                        ]);
                    }
                });
            }

            if (before && previousDelta === 0) {
                context.report({
                    node: punctuatorTokenStart,
                    message: `Expected a space before the '${type}'`,
                    fix(fixer) {
                        return fixer.insertTextAfter(previousToken, " ");
                    }
                });
            } else if (!before && previousDelta > 0) {
                context.report({
                    node: punctuatorTokenStart,
                    message: `Unexpected space before the '${type}'`,
                    fix(fixer) {
                        return fixer.removeRange([
                            previousToken.range[1],
                            punctuatorTokenStart.range[0]
                        ]);
                    }
                });
            }
        }

        /**
         * Checks a function node for proper return type spacing.
         * @param {ASTNode} node The node representing a function.
         * @returns {void}
         * @private
         */
        function checkFunctionReturnTypeSpacing(node) {
            if (node.returnType) {
                checkTypeAnnotationSpacing(
                    node.returnType.typeAnnotation || node.returnType
                );
            }
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            Identifier(node) {
                if (node.typeAnnotation) {
                    checkTypeAnnotationSpacing(
                        node.typeAnnotation.typeAnnotation ||
                            node.typeAnnotation
                    );
                }
            },
            TSTypeAnnotation(node) {
                checkTypeAnnotationSpacing(node.typeAnnotation);
            },
            FunctionDeclaration: checkFunctionReturnTypeSpacing,
            FunctionExpression: checkFunctionReturnTypeSpacing,
            ArrowFunctionExpression: checkFunctionReturnTypeSpacing
        };
    }
};


/***/ })

}]);