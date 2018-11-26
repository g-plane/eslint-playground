(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ 730:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = __webpack_require__(82);
var Evk = _interopDefault(__webpack_require__(40));
var sortedLastIndex = _interopDefault(__webpack_require__(731));
var findLastIndex = _interopDefault(__webpack_require__(743));
var debugFactory = _interopDefault(__webpack_require__(853));
var sortedLastIndexBy = _interopDefault(__webpack_require__(856));
var first = _interopDefault(__webpack_require__(857));
var escope = _interopDefault(__webpack_require__(23));
var last = _interopDefault(__webpack_require__(859));
var EventEmitter = _interopDefault(__webpack_require__(860));
var esquery = _interopDefault(__webpack_require__(142));
var union = _interopDefault(__webpack_require__(861));
var intersection = _interopDefault(__webpack_require__(881));
var memoize = _interopDefault(__webpack_require__(839));
var assert = _interopDefault(__webpack_require__(24));
var sortedIndexBy = _interopDefault(__webpack_require__(884));

function isAcornStyleParseError(x) {
    return (typeof x.message === "string" &&
        typeof x.pos === "number" &&
        typeof x.loc === "object" &&
        x.loc !== null &&
        typeof x.loc.line === "number" &&
        typeof x.loc.column === "number");
}
class ParseError extends SyntaxError {
    static fromCode(code, offset, line, column) {
        return new ParseError(code, code, offset, line, column);
    }
    static normalize(x) {
        if (ParseError.isParseError(x)) {
            return x;
        }
        if (isAcornStyleParseError(x)) {
            return new ParseError(x.message, undefined, x.pos, x.loc.line, x.loc.column);
        }
        return null;
    }
    constructor(message, code, offset, line, column) {
        super(message);
        this.code = code;
        this.index = offset;
        this.lineNumber = line;
        this.column = column;
    }
    static isParseError(x) {
        return (x instanceof ParseError ||
            (typeof x.message === "string" &&
                typeof x.index === "number" &&
                typeof x.lineNumber === "number" &&
                typeof x.column === "number"));
    }
}

const NS = Object.freeze({
    HTML: "http://www.w3.org/1999/xhtml",
    MathML: "http://www.w3.org/1998/Math/MathML",
    SVG: "http://www.w3.org/2000/svg",
    XLink: "http://www.w3.org/1999/xlink",
    XML: "http://www.w3.org/XML/1998/namespace",
    XMLNS: "http://www.w3.org/2000/xmlns/",
});

const KEYS = Evk.unionWith({
    VAttribute: ["key", "value"],
    VDirectiveKey: [],
    VDocumentFragment: ["children"],
    VElement: ["startTag", "children", "endTag"],
    VEndTag: [],
    VExpressionContainer: ["expression"],
    VForExpression: ["left", "right"],
    VIdentifier: [],
    VLiteral: [],
    VOnExpression: ["body"],
    VSlotScopeExpression: ["id"],
    VStartTag: ["attributes"],
    VText: [],
});
function fallbackKeysFilter(key) {
    let value = null;
    return (key !== "comments" &&
        key !== "leadingComments" &&
        key !== "loc" &&
        key !== "parent" &&
        key !== "range" &&
        key !== "tokens" &&
        key !== "trailingComments" &&
        (value = this[key]) !== null &&
        typeof value === "object" &&
        (typeof value.type === "string" || Array.isArray(value)));
}
function getFallbackKeys(node) {
    return Object.keys(node).filter(fallbackKeysFilter, node);
}
function traverse(node, parent, visitor) {
    let i = 0;
    let j = 0;
    visitor.enterNode(node, parent);
    const keys = (visitor.visitorKeys || KEYS)[node.type] || getFallbackKeys(node);
    for (i = 0; i < keys.length; ++i) {
        const child = node[keys[i]];
        if (Array.isArray(child)) {
            for (j = 0; j < child.length; ++j) {
                if (child[j]) {
                    traverse(child[j], node, visitor);
                }
            }
        }
        else if (child) {
            traverse(child, node, visitor);
        }
    }
    visitor.leaveNode(node, parent);
}
function traverseNodes(node, visitor) {
    traverse(node, null, visitor);
}



var index = /*#__PURE__*/Object.freeze({
    ParseError: ParseError,
    NS: NS,
    traverseNodes: traverseNodes,
    getFallbackKeys: getFallbackKeys
});

class LocationCalculator {
    constructor(gapOffsets, ltOffsets, baseOffset) {
        this.gapOffsets = gapOffsets;
        this.ltOffsets = ltOffsets;
        this.baseOffset = baseOffset || 0;
        this.baseIndexOfGap =
            this.baseOffset === 0
                ? 0
                : sortedLastIndex(gapOffsets, this.baseOffset);
    }
    getSubCalculatorAfter(offset) {
        return new LocationCalculator(this.gapOffsets, this.ltOffsets, this.baseOffset + offset);
    }
    _getLocation(offset) {
        const line = sortedLastIndex(this.ltOffsets, offset) + 1;
        const column = offset - (line === 1 ? 0 : this.ltOffsets[line - 2]);
        return { line, column };
    }
    _getGap(index) {
        const offsets = this.gapOffsets;
        let g0 = sortedLastIndex(offsets, index + this.baseOffset);
        let pos = index + this.baseOffset + g0 - this.baseIndexOfGap;
        while (g0 < offsets.length && offsets[g0] <= pos) {
            g0 += 1;
            pos += 1;
        }
        return g0 - this.baseIndexOfGap;
    }
    getLocation(index) {
        return this._getLocation(this.baseOffset + index);
    }
    getOffsetWithGap(index) {
        return this.baseOffset + index + this._getGap(index);
    }
    fixLocation(node) {
        const range = node.range;
        const loc = node.loc;
        const gap0 = this._getGap(range[0]);
        const gap1 = this._getGap(range[1]);
        const d0 = this.baseOffset + Math.max(0, gap0);
        const d1 = this.baseOffset + Math.max(0, gap1);
        if (d0 !== 0) {
            range[0] += d0;
            if (node.start != null) {
                node.start += d0;
            }
            loc.start = this._getLocation(range[0]);
        }
        if (d1 !== 0) {
            range[1] += d1;
            if (node.end != null) {
                node.end += d0;
            }
            loc.end = this._getLocation(range[1]);
        }
    }
    fixErrorLocation(error) {
        const gap = this._getGap(error.index);
        const diff = this.baseOffset + Math.max(0, gap);
        error.index += diff;
        const loc = this._getLocation(error.index);
        error.lineNumber = loc.line;
        error.column = loc.column;
    }
}

const debug = debugFactory("vue-eslint-parser");

function isUnique(reference, index, references) {
    return (index === 0 || reference.identifier !== references[index - 1].identifier);
}
function hasDefinition(variable) {
    return variable.defs.length >= 1;
}
function transformReference(reference) {
    const ret = {
        id: reference.identifier,
        mode: reference.isReadOnly()
            ? "r"
            : reference.isWriteOnly()
                ? "w"
                : "rw",
        variable: null,
    };
    Object.defineProperty(ret, "variable", { enumerable: false });
    return ret;
}
function transformVariable(variable) {
    const ret = {
        id: variable.defs[0].name,
        kind: variable.scope.type === "for" ? "v-for" : "scope",
        references: [],
    };
    Object.defineProperty(ret, "references", { enumerable: false });
    return ret;
}
function getForScope(scope) {
    const child = scope.childScopes[0];
    return child.block === scope.block ? child.childScopes[0] : child;
}
function analyze(ast, parserOptions) {
    const ecmaVersion = parserOptions.ecmaVersion || 2017;
    const ecmaFeatures = parserOptions.ecmaFeatures || {};
    const sourceType = parserOptions.sourceType || "script";
    const result = escope.analyze(ast, {
        ignoreEval: true,
        nodejsScope: false,
        impliedStrict: ecmaFeatures.impliedStrict,
        ecmaVersion,
        sourceType,
        fallback: getFallbackKeys,
    });
    return result.globalScope;
}
function analyzeExternalReferences(ast, parserOptions) {
    const scope = analyze(ast, parserOptions);
    return scope.through.filter(isUnique).map(transformReference);
}
function analyzeVariablesAndExternalReferences(ast, parserOptions) {
    const scope = analyze(ast, parserOptions);
    return {
        variables: getForScope(scope)
            .variables.filter(hasDefinition)
            .map(transformVariable),
        references: scope.through.filter(isUnique).map(transformReference),
    };
}

const ALIAS_PARENS = /^(\s*)\(([\s\S]+)\)(\s*(?:in|of)\b[\s\S]+)$/u;
const DUMMY_PARENT = {};
function postprocess(result, locationCalculator) {
    const traversed = new Set();
    traverseNodes(result.ast, {
        visitorKeys: result.visitorKeys,
        enterNode(node, parent) {
            if (!traversed.has(node)) {
                traversed.add(node);
                node.parent = parent;
                if (!traversed.has(node.range)) {
                    traversed.add(node.range);
                    locationCalculator.fixLocation(node);
                }
            }
        },
        leaveNode() {
        },
    });
    for (const token of result.ast.tokens || []) {
        locationCalculator.fixLocation(token);
    }
    for (const comment of result.ast.comments || []) {
        locationCalculator.fixLocation(comment);
    }
}
function replaceAliasParens(code) {
    const match = ALIAS_PARENS.exec(code);
    if (match != null) {
        return `${match[1]}[${match[2]}]${match[3]}`;
    }
    return code;
}
function normalizeLeft(left, replaced) {
    if (left.type !== "VariableDeclaration") {
        throw new Error("unreachable");
    }
    const id = left.declarations[0].id;
    if (replaced) {
        return id.elements;
    }
    return [id];
}
function getCommaTokenBeforeNode(tokens, node) {
    let tokenIndex = sortedIndexBy(tokens, { range: node.range }, t => t.range[0]);
    while (tokenIndex >= 0) {
        const token = tokens[tokenIndex];
        if (token.type === "Punctuator" && token.value === ",") {
            return token;
        }
        tokenIndex -= 1;
    }
    return null;
}
function throwEmptyError(locationCalculator, expected) {
    const loc = locationCalculator.getLocation(0);
    const err = new ParseError(`Expected to be ${expected}, but got empty.`, undefined, 0, loc.line, loc.column);
    locationCalculator.fixErrorLocation(err);
    throw err;
}
function throwUnexpectedTokenError(name, token) {
    const err = new ParseError(`Unexpected token '${name}'.`, undefined, token.range[0], token.loc.start.line, token.loc.start.column);
    throw err;
}
function throwErrorAsAdjustingOutsideOfCode(err, code, locationCalculator) {
    if (ParseError.isParseError(err)) {
        const endOffset = locationCalculator.getOffsetWithGap(code.length);
        if (err.index >= endOffset) {
            err.message = "Unexpected end of expression.";
        }
    }
    throw err;
}
function parseScriptFragment(code, locationCalculator, parserOptions) {
    try {
        const result = parseScript(code, parserOptions);
        postprocess(result, locationCalculator);
        return result;
    }
    catch (err) {
        const perr = ParseError.normalize(err);
        if (perr) {
            locationCalculator.fixErrorLocation(perr);
            throw perr;
        }
        throw err;
    }
}
function parseScript(code, parserOptions) {
    const parser = typeof parserOptions.parser === "string"
        ? __webpack_require__(885)(parserOptions.parser)
        : __webpack_require__(886);
    const result = typeof parser.parseForESLint === "function"
        ? parser.parseForESLint(code, parserOptions)
        : parser.parse(code, parserOptions);
    if (result.ast != null) {
        return result;
    }
    return { ast: result };
}
function parseScriptElement(node, globalLocationCalculator, parserOptions) {
    const text = node.children[0];
    const offset = text != null && text.type === "VText"
        ? text.range[0]
        : node.startTag.range[1];
    const code = text != null && text.type === "VText" ? text.value : "";
    const locationCalculator = globalLocationCalculator.getSubCalculatorAfter(offset);
    const result = parseScriptFragment(code, locationCalculator, parserOptions);
    if (result.ast.tokens != null) {
        const startTag = node.startTag;
        const endTag = node.endTag;
        if (startTag != null) {
            result.ast.tokens.unshift({
                type: "Punctuator",
                range: startTag.range,
                loc: startTag.loc,
                value: "<script>",
            });
        }
        if (endTag != null) {
            result.ast.tokens.push({
                type: "Punctuator",
                range: endTag.range,
                loc: endTag.loc,
                value: "</script>",
            });
        }
    }
    return result;
}
function parseExpression(code, locationCalculator, parserOptions, allowEmpty = false) {
    debug('[script] parse expression: "0(%s)"', code);
    try {
        const ast = parseScriptFragment(`0(${code})`, locationCalculator.getSubCalculatorAfter(-2), parserOptions).ast;
        const tokens = ast.tokens || [];
        const comments = ast.comments || [];
        const references = analyzeExternalReferences(ast, parserOptions);
        const statement = ast.body[0];
        const callExpression = statement.expression;
        const expression = callExpression.arguments[0];
        if (!allowEmpty && !expression) {
            return throwEmptyError(locationCalculator, "an expression");
        }
        if (expression && expression.type === "SpreadElement") {
            return throwUnexpectedTokenError("...", expression);
        }
        if (callExpression.arguments[1]) {
            const node = callExpression.arguments[1];
            return throwUnexpectedTokenError(",", getCommaTokenBeforeNode(tokens, node) || node);
        }
        tokens.shift();
        tokens.shift();
        tokens.pop();
        return { expression, tokens, comments, references, variables: [] };
    }
    catch (err) {
        return throwErrorAsAdjustingOutsideOfCode(err, code, locationCalculator);
    }
}
function parseVForExpression(code, locationCalculator, parserOptions) {
    const processedCode = replaceAliasParens(code);
    debug('[script] parse v-for expression: "for(%s);"', processedCode);
    if (code.trim() === "") {
        throwEmptyError(locationCalculator, "'<alias> in <expression>'");
    }
    try {
        const replaced = processedCode !== code;
        const ast = parseScriptFragment(`for(let ${processedCode});`, locationCalculator.getSubCalculatorAfter(-8), parserOptions).ast;
        const tokens = ast.tokens || [];
        const comments = ast.comments || [];
        const scope = analyzeVariablesAndExternalReferences(ast, parserOptions);
        const references = scope.references;
        const variables = scope.variables;
        const statement = ast.body[0];
        const left = normalizeLeft(statement.left, replaced);
        const right = statement.right;
        const firstToken = tokens[3] || statement.left;
        const lastToken = tokens[tokens.length - 3] || statement.right;
        const expression = {
            type: "VForExpression",
            range: [firstToken.range[0], lastToken.range[1]],
            loc: { start: firstToken.loc.start, end: lastToken.loc.end },
            parent: DUMMY_PARENT,
            left,
            right,
        };
        for (const l of left) {
            if (l != null) {
                l.parent = expression;
            }
        }
        right.parent = expression;
        tokens.shift();
        tokens.shift();
        tokens.shift();
        tokens.pop();
        tokens.pop();
        if (replaced) {
            const closeOffset = statement.left.range[1] - 1;
            const open = tokens[0];
            const close = tokens.find(t => t.range[0] === closeOffset);
            if (open != null) {
                open.value = "(";
            }
            if (close != null) {
                close.value = ")";
            }
        }
        return { expression, tokens, comments, references, variables };
    }
    catch (err) {
        return throwErrorAsAdjustingOutsideOfCode(err, code, locationCalculator);
    }
}
function parseVOnExpression(code, locationCalculator, parserOptions) {
    debug('[script] parse v-on expression: "void function($event){%s}"', code);
    if (code.trim() === "") {
        throwEmptyError(locationCalculator, "statements");
    }
    try {
        const ast = parseScriptFragment(`void function($event){${code}}`, locationCalculator.getSubCalculatorAfter(-22), parserOptions).ast;
        const references = analyzeExternalReferences(ast, parserOptions);
        const outermostStatement = ast.body[0];
        const functionDecl = outermostStatement.expression
            .argument;
        const block = functionDecl.body;
        const body = block.body;
        const firstStatement = first(body);
        const lastStatement = last(body);
        const expression = {
            type: "VOnExpression",
            range: [
                firstStatement != null
                    ? firstStatement.range[0]
                    : block.range[0] + 1,
                lastStatement != null
                    ? lastStatement.range[1]
                    : block.range[1] - 1,
            ],
            loc: {
                start: firstStatement != null
                    ? firstStatement.loc.start
                    : locationCalculator.getLocation(1),
                end: lastStatement != null
                    ? lastStatement.loc.end
                    : locationCalculator.getLocation(code.length + 1),
            },
            parent: DUMMY_PARENT,
            body,
        };
        const tokens = ast.tokens || [];
        const comments = ast.comments || [];
        for (const b of body) {
            b.parent = expression;
        }
        tokens.splice(0, 6);
        tokens.pop();
        return { expression, tokens, comments, references, variables: [] };
    }
    catch (err) {
        return throwErrorAsAdjustingOutsideOfCode(err, code, locationCalculator);
    }
}
function parseSlotScopeExpression(code, locationCalculator, parserOptions) {
    debug('[script] parse slot-scope expression: "void function(%s) {}"', code);
    if (code.trim() === "") {
        throwEmptyError(locationCalculator, "an identifier or an array/object pattern");
    }
    try {
        const ast = parseScriptFragment(`void function(${code}) {}`, locationCalculator.getSubCalculatorAfter(-14), parserOptions).ast;
        const tokens = ast.tokens || [];
        const comments = ast.comments || [];
        const scope = analyzeVariablesAndExternalReferences(ast, parserOptions);
        const references = scope.references;
        const variables = scope.variables;
        const statement = ast.body[0];
        const rawExpression = statement.expression;
        const functionDecl = rawExpression.argument;
        const id = functionDecl.params[0];
        const expression = {
            type: "VSlotScopeExpression",
            range: [id.range[0], id.range[1]],
            loc: { start: id.loc.start, end: id.loc.end },
            parent: DUMMY_PARENT,
            id,
        };
        id.parent = expression;
        tokens.shift();
        tokens.shift();
        tokens.shift();
        tokens.pop();
        tokens.pop();
        tokens.pop();
        const extraToken = tokens.find(t => t.range[0] >= id.range[1]);
        if (extraToken) {
            throwUnexpectedTokenError(extraToken.value, extraToken);
        }
        if (id.type === "RestElement") {
            throwUnexpectedTokenError("...", id);
        }
        return { expression, tokens, comments, references, variables };
    }
    catch (err) {
        return throwErrorAsAdjustingOutsideOfCode(err, code, locationCalculator);
    }
}

function getOwnerDocument(leafNode) {
    let node = leafNode;
    while (node != null && node.type !== "VDocumentFragment") {
        node = node.parent;
    }
    return node;
}
function createSimpleToken(type, start, end, value, globalLocationCalculator) {
    return {
        type,
        range: [start, end],
        loc: {
            start: globalLocationCalculator.getLocation(start),
            end: globalLocationCalculator.getLocation(end),
        },
        value,
    };
}
function createDirectiveKey(node) {
    const raw = {
        name: "",
        argument: null,
        modifiers: [],
    };
    const ret = {
        type: "VDirectiveKey",
        range: node.range,
        loc: node.loc,
        parent: node.parent,
        name: "",
        argument: null,
        modifiers: [],
        shorthand: false,
        raw,
    };
    const id = node.name;
    const rawId = node.rawName;
    let i = 0;
    if (node.name.startsWith(":")) {
        ret.name = raw.name = "bind";
        ret.shorthand = true;
        i = 1;
    }
    else if (id.startsWith("@")) {
        ret.name = raw.name = "on";
        ret.shorthand = true;
        i = 1;
    }
    else {
        const colon = id.indexOf(":");
        if (colon !== -1) {
            ret.name = id.slice(0, colon);
            raw.name = rawId.slice(0, colon);
            i = colon + 1;
        }
    }
    const dotSplit = id.slice(i).split(".");
    const dotSplitRaw = rawId.slice(i).split(".");
    if (ret.name === "") {
        ret.name = dotSplit[0];
        raw.name = dotSplitRaw[0];
    }
    else {
        ret.argument = dotSplit[0];
        raw.argument = dotSplitRaw[0];
    }
    ret.modifiers = dotSplit.slice(1);
    raw.modifiers = dotSplitRaw.slice(1);
    if (ret.name.startsWith("v-")) {
        ret.name = ret.name.slice(2);
        raw.name = raw.name.slice(2);
    }
    return ret;
}
function splice(items, start, deleteCount, newItems) {
    switch (newItems.length) {
        case 0:
            items.splice(start, deleteCount);
            break;
        case 1:
            items.splice(start, deleteCount, newItems[0]);
            break;
        case 2:
            items.splice(start, deleteCount, newItems[0], newItems[1]);
            break;
        default:
            Array.prototype.splice.apply(items, [start, deleteCount].concat(newItems));
            break;
    }
}
function byRange0(x) {
    return x.range[0];
}
function byRange1(x) {
    return x.range[1];
}
function byIndex(x) {
    return x.index;
}
function replaceTokens(document, node, newTokens) {
    if (document == null) {
        return;
    }
    const index = sortedIndexBy(document.tokens, node, byRange0);
    const count = sortedLastIndexBy(document.tokens, node, byRange1) - index;
    splice(document.tokens, index, count, newTokens);
}
function insertComments(document, newComments) {
    if (document == null || newComments.length === 0) {
        return;
    }
    const index = sortedIndexBy(document.comments, newComments[0], byRange0);
    splice(document.comments, index, 0, newComments);
}
function insertError(document, error) {
    if (document == null) {
        return;
    }
    const index = sortedIndexBy(document.errors, error, byIndex);
    document.errors.splice(index, 0, error);
}
function parseAttributeValue(code, parserOptions, globalLocationCalculator, node, tagName, directiveKey) {
    const firstChar = code[node.range[0]];
    const quoted = firstChar === '"' || firstChar === "'";
    const locationCalculator = globalLocationCalculator.getSubCalculatorAfter(node.range[0] + (quoted ? 1 : 0));
    let result;
    if (quoted && node.value === "") {
        result = {
            expression: null,
            tokens: [],
            comments: [],
            variables: [],
            references: [],
        };
    }
    else if (directiveKey.name === "for") {
        result = parseVForExpression(node.value, locationCalculator, parserOptions);
    }
    else if (directiveKey.name === "on" && directiveKey.argument != null) {
        result = parseVOnExpression(node.value, locationCalculator, parserOptions);
    }
    else if (directiveKey.name === "slot-scope" ||
        (tagName === "template" && directiveKey.name === "scope")) {
        result = parseSlotScopeExpression(node.value, locationCalculator, parserOptions);
    }
    else {
        result = parseExpression(node.value, locationCalculator, parserOptions);
    }
    if (quoted) {
        result.tokens.unshift(createSimpleToken("Punctuator", node.range[0], node.range[0] + 1, firstChar, globalLocationCalculator));
        result.tokens.push(createSimpleToken("Punctuator", node.range[1] - 1, node.range[1], firstChar, globalLocationCalculator));
    }
    return result;
}
function resolveReference(referene, element) {
    let node = element;
    while (node != null && node.type === "VElement") {
        for (const variable of node.variables) {
            if (variable.id.name === referene.id.name) {
                referene.variable = variable;
                variable.references.push(referene);
                return;
            }
        }
        node = node.parent;
    }
}
function convertToDirective(code, parserOptions, locationCalculator, node) {
    debug('[template] convert to directive: %s="%s" %j', node.key.name, node.value && node.value.value, node.range);
    const directive = node;
    directive.directive = true;
    directive.key = createDirectiveKey(node.key);
    if (node.value == null) {
        return;
    }
    const document = getOwnerDocument(node);
    try {
        const ret = parseAttributeValue(code, parserOptions, locationCalculator, node.value, node.parent.parent.name, directive.key);
        directive.value = {
            type: "VExpressionContainer",
            range: node.value.range,
            loc: node.value.loc,
            parent: directive,
            expression: ret.expression,
            references: ret.references,
        };
        if (ret.expression != null) {
            ret.expression.parent = directive.value;
        }
        for (const variable of ret.variables) {
            node.parent.parent.variables.push(variable);
        }
        replaceTokens(document, node.value, ret.tokens);
        insertComments(document, ret.comments);
    }
    catch (err) {
        debug("[template] Parse error: %s", err);
        if (ParseError.isParseError(err)) {
            directive.value = {
                type: "VExpressionContainer",
                range: node.value.range,
                loc: node.value.loc,
                parent: directive,
                expression: null,
                references: [],
            };
            insertError(document, err);
        }
        else {
            throw err;
        }
    }
}
function processMustache(parserOptions, globalLocationCalculator, node, mustache) {
    const range = [
        mustache.startToken.range[1],
        mustache.endToken.range[0],
    ];
    debug("[template] convert mustache {{%s}} %j", mustache.value, range);
    const document = getOwnerDocument(node);
    try {
        const locationCalculator = globalLocationCalculator.getSubCalculatorAfter(range[0]);
        const ret = parseExpression(mustache.value, locationCalculator, parserOptions, true);
        node.expression = ret.expression || null;
        node.references = ret.references;
        if (ret.expression != null) {
            ret.expression.parent = node;
        }
        replaceTokens(document, { range }, ret.tokens);
        insertComments(document, ret.comments);
    }
    catch (err) {
        debug("[template] Parse error: %s", err);
        if (ParseError.isParseError(err)) {
            insertError(document, err);
        }
        else {
            throw err;
        }
    }
}
function resolveReferences(container) {
    let element = container.parent;
    while (element != null && element.type !== "VElement") {
        element = element.parent;
    }
    if (element != null) {
        for (const reference of container.references) {
            resolveReference(reference, element);
        }
    }
}

const SVG_ATTRIBUTE_NAME_MAP = new Map([
    ["attributename", "attributeName"],
    ["attributetype", "attributeType"],
    ["basefrequency", "baseFrequency"],
    ["baseprofile", "baseProfile"],
    ["calcmode", "calcMode"],
    ["clippathunits", "clipPathUnits"],
    ["diffuseconstant", "diffuseConstant"],
    ["edgemode", "edgeMode"],
    ["filterunits", "filterUnits"],
    ["glyphref", "glyphRef"],
    ["gradienttransform", "gradientTransform"],
    ["gradientunits", "gradientUnits"],
    ["kernelmatrix", "kernelMatrix"],
    ["kernelunitlength", "kernelUnitLength"],
    ["keypoints", "keyPoints"],
    ["keysplines", "keySplines"],
    ["keytimes", "keyTimes"],
    ["lengthadjust", "lengthAdjust"],
    ["limitingconeangle", "limitingConeAngle"],
    ["markerheight", "markerHeight"],
    ["markerunits", "markerUnits"],
    ["markerwidth", "markerWidth"],
    ["maskcontentunits", "maskContentUnits"],
    ["maskunits", "maskUnits"],
    ["numoctaves", "numOctaves"],
    ["pathlength", "pathLength"],
    ["patterncontentunits", "patternContentUnits"],
    ["patterntransform", "patternTransform"],
    ["patternunits", "patternUnits"],
    ["pointsatx", "pointsAtX"],
    ["pointsaty", "pointsAtY"],
    ["pointsatz", "pointsAtZ"],
    ["preservealpha", "preserveAlpha"],
    ["preserveaspectratio", "preserveAspectRatio"],
    ["primitiveunits", "primitiveUnits"],
    ["refx", "refX"],
    ["refy", "refY"],
    ["repeatcount", "repeatCount"],
    ["repeatdur", "repeatDur"],
    ["requiredextensions", "requiredExtensions"],
    ["requiredfeatures", "requiredFeatures"],
    ["specularconstant", "specularConstant"],
    ["specularexponent", "specularExponent"],
    ["spreadmethod", "spreadMethod"],
    ["startoffset", "startOffset"],
    ["stddeviation", "stdDeviation"],
    ["stitchtiles", "stitchTiles"],
    ["surfacescale", "surfaceScale"],
    ["systemlanguage", "systemLanguage"],
    ["tablevalues", "tableValues"],
    ["targetx", "targetX"],
    ["targety", "targetY"],
    ["textlength", "textLength"],
    ["viewbox", "viewBox"],
    ["viewtarget", "viewTarget"],
    ["xchannelselector", "xChannelSelector"],
    ["ychannelselector", "yChannelSelector"],
    ["zoomandpan", "zoomAndPan"],
]);
const MATHML_ATTRIBUTE_NAME_MAP = new Map([
    ["definitionurl", "definitionUrl"]
]);

const HTML_VOID_ELEMENT_TAGS = new Set([
    "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta",
    "param", "source", "track", "wbr",
]);
const HTML_CAN_BE_LEFT_OPEN_TAGS = new Set([
    "colgroup", "li", "options", "p", "td", "tfoot", "th", "thead",
    "tr", "source",
]);
const HTML_NON_FHRASING_TAGS = new Set([
    "address", "article", "aside", "base", "blockquote", "body", "caption",
    "col", "colgroup", "dd", "details", "dialog", "div", "dl", "dt", "fieldset",
    "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5",
    "h6", "head", "header", "hgroup", "hr", "html", "legend", "li", "menuitem",
    "meta", "optgroup", "option", "param", "rp", "rt", "source", "style",
    "summary", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "track",
]);
const HTML_RCDATA_TAGS = new Set([
    "title", "textarea",
]);
const HTML_RAWTEXT_TAGS = new Set([
    "style", "xmp", "iframe", "noembed", "noframes", "noscript", "script",
]);
const SVG_TAGS = new Set([
    "a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor",
    "animateMotion", "animateTransform", "animation", "audio", "canvas",
    "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "discard",
    "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite",
    "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap",
    "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB",
    "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode",
    "feMorphology", "feOffset", "fePointLight", "feSpecularLighting",
    "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face",
    "font-face-format", "font-face-name", "font-face-src", "font-face-uri",
    "foreignObject", "g", "glyph", "glyphRef", "handler", "hatch", "hatchpath",
    "hkern", "iframe", "image", "line", "linearGradient", "listener", "marker",
    "mask", "mesh", "meshgradient", "meshpatch", "meshrow", "metadata",
    "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline",
    "prefetch", "radialGradient", "rect", "script", "set", "solidColor",
    "solidcolor", "stop", "style", "svg", "switch", "symbol", "tbreak", "text",
    "textArea", "textPath", "title", "tref", "tspan", "unknown", "use", "video",
    "view", "vkern",
]);
const SVG_ELEMENT_NAME_MAP = new Map();
for (const name of SVG_TAGS) {
    if (/[A-Z]/.test(name)) {
        SVG_ELEMENT_NAME_MAP.set(name.toLowerCase(), name);
    }
}

const DUMMY_PARENT$1 = Object.freeze({});
function concat(text, token) {
    return text + token.value;
}
class IntermediateTokenizer {
    get text() {
        return this.tokenizer.text;
    }
    get errors() {
        return this.tokenizer.errors;
    }
    get state() {
        return this.tokenizer.state;
    }
    set state(value) {
        this.tokenizer.state = value;
    }
    get namespace() {
        return this.tokenizer.namespace;
    }
    set namespace(value) {
        this.tokenizer.namespace = value;
    }
    get expressionEnabled() {
        return this.tokenizer.expressionEnabled;
    }
    set expressionEnabled(value) {
        this.tokenizer.expressionEnabled = value;
    }
    constructor(tokenizer) {
        this.tokenizer = tokenizer;
        this.currentToken = null;
        this.attribute = null;
        this.attributeNames = new Set();
        this.expressionStartToken = null;
        this.expressionTokens = [];
        this.tokens = [];
        this.comments = [];
    }
    nextToken() {
        let token = null;
        let result = null;
        while (result == null && (token = this.tokenizer.nextToken()) != null) {
            result = this[token.type](token);
        }
        if (result == null && token == null && this.currentToken != null) {
            result = this.commit();
        }
        return result;
    }
    commit() {
        assert(this.currentToken != null || this.expressionStartToken != null);
        let token = this.currentToken;
        this.currentToken = null;
        this.attribute = null;
        if (this.expressionStartToken != null) {
            const start = this.expressionStartToken;
            const end = last(this.expressionTokens) || start;
            const value = this.expressionTokens.reduce(concat, start.value);
            this.expressionStartToken = null;
            this.expressionTokens = [];
            if (token == null) {
                token = {
                    type: "Text",
                    range: [start.range[0], end.range[1]],
                    loc: { start: start.loc.start, end: end.loc.end },
                    value,
                };
            }
            else if (token.type === "Text") {
                token.range[1] = end.range[1];
                token.loc.end = end.loc.end;
                token.value += value;
            }
            else {
                throw new Error("unreachable");
            }
        }
        return token;
    }
    reportParseError(token, code) {
        const error = ParseError.fromCode(code, token.range[0], token.loc.start.line, token.loc.start.column);
        this.errors.push(error);
        debug("[html] syntax error:", error.message);
    }
    processComment(token) {
        this.comments.push(token);
        if (this.currentToken != null && this.currentToken.type === "Text") {
            return this.commit();
        }
        return null;
    }
    processText(token) {
        this.tokens.push(token);
        let result = null;
        if (this.expressionStartToken != null) {
            const lastToken = last(this.expressionTokens) || this.expressionStartToken;
            if (lastToken.range[1] === token.range[0]) {
                this.expressionTokens.push(token);
                return null;
            }
            result = this.commit();
        }
        else if (this.currentToken != null) {
            if (this.currentToken.type === "Text" &&
                this.currentToken.range[1] === token.range[0]) {
                this.currentToken.value += token.value;
                this.currentToken.range[1] = token.range[1];
                this.currentToken.loc.end = token.loc.end;
                return null;
            }
            result = this.commit();
        }
        assert(this.currentToken == null);
        this.currentToken = {
            type: "Text",
            range: [token.range[0], token.range[1]],
            loc: { start: token.loc.start, end: token.loc.end },
            value: token.value,
        };
        return result;
    }
    HTMLAssociation(token) {
        this.tokens.push(token);
        if (this.attribute != null) {
            this.attribute.range[1] = token.range[1];
            this.attribute.loc.end = token.loc.end;
            if (this.currentToken == null ||
                this.currentToken.type !== "StartTag") {
                throw new Error("unreachable");
            }
            this.currentToken.range[1] = token.range[1];
            this.currentToken.loc.end = token.loc.end;
        }
        return null;
    }
    HTMLBogusComment(token) {
        return this.processComment(token);
    }
    HTMLCDataText(token) {
        return this.processText(token);
    }
    HTMLComment(token) {
        return this.processComment(token);
    }
    HTMLEndTagOpen(token) {
        this.tokens.push(token);
        let result = null;
        if (this.currentToken != null || this.expressionStartToken != null) {
            result = this.commit();
        }
        this.currentToken = {
            type: "EndTag",
            range: [token.range[0], token.range[1]],
            loc: { start: token.loc.start, end: token.loc.end },
            name: token.value,
        };
        return result;
    }
    HTMLIdentifier(token) {
        this.tokens.push(token);
        if (this.currentToken == null ||
            this.currentToken.type === "Text" ||
            this.currentToken.type === "Mustache") {
            throw new Error("unreachable");
        }
        if (this.currentToken.type === "EndTag") {
            this.reportParseError(token, "end-tag-with-attributes");
            return null;
        }
        if (this.attributeNames.has(token.value)) {
            this.reportParseError(token, "duplicate-attribute");
        }
        this.attributeNames.add(token.value);
        this.attribute = {
            type: "VAttribute",
            range: [token.range[0], token.range[1]],
            loc: { start: token.loc.start, end: token.loc.end },
            parent: DUMMY_PARENT$1,
            directive: false,
            key: {
                type: "VIdentifier",
                range: [token.range[0], token.range[1]],
                loc: { start: token.loc.start, end: token.loc.end },
                parent: DUMMY_PARENT$1,
                name: token.value,
                rawName: this.text.slice(token.range[0], token.range[1]),
            },
            value: null,
        };
        this.attribute.key.parent = this.attribute;
        this.currentToken.range[1] = token.range[1];
        this.currentToken.loc.end = token.loc.end;
        this.currentToken.attributes.push(this.attribute);
        return null;
    }
    HTMLLiteral(token) {
        this.tokens.push(token);
        if (this.attribute != null) {
            this.attribute.range[1] = token.range[1];
            this.attribute.loc.end = token.loc.end;
            this.attribute.value = {
                type: "VLiteral",
                range: [token.range[0], token.range[1]],
                loc: { start: token.loc.start, end: token.loc.end },
                parent: this.attribute,
                value: token.value,
            };
            if (this.currentToken == null ||
                this.currentToken.type !== "StartTag") {
                throw new Error("unreachable");
            }
            this.currentToken.range[1] = token.range[1];
            this.currentToken.loc.end = token.loc.end;
        }
        return null;
    }
    HTMLRCDataText(token) {
        return this.processText(token);
    }
    HTMLRawText(token) {
        return this.processText(token);
    }
    HTMLSelfClosingTagClose(token) {
        this.tokens.push(token);
        if (this.currentToken == null || this.currentToken.type === "Text") {
            throw new Error("unreachable");
        }
        if (this.currentToken.type === "StartTag") {
            this.currentToken.selfClosing = true;
        }
        else {
            this.reportParseError(token, "end-tag-with-trailing-solidus");
        }
        this.currentToken.range[1] = token.range[1];
        this.currentToken.loc.end = token.loc.end;
        return this.commit();
    }
    HTMLTagClose(token) {
        this.tokens.push(token);
        if (this.currentToken == null || this.currentToken.type === "Text") {
            throw new Error("unreachable");
        }
        this.currentToken.range[1] = token.range[1];
        this.currentToken.loc.end = token.loc.end;
        return this.commit();
    }
    HTMLTagOpen(token) {
        this.tokens.push(token);
        let result = null;
        if (this.currentToken != null || this.expressionStartToken != null) {
            result = this.commit();
        }
        this.currentToken = {
            type: "StartTag",
            range: [token.range[0], token.range[1]],
            loc: { start: token.loc.start, end: token.loc.end },
            name: token.value,
            rawName: this.text.slice(token.range[0] + 1, token.range[1]),
            selfClosing: false,
            attributes: [],
        };
        this.attribute = null;
        this.attributeNames.clear();
        return result;
    }
    HTMLText(token) {
        return this.processText(token);
    }
    HTMLWhitespace(token) {
        return this.processText(token);
    }
    VExpressionStart(token) {
        if (this.expressionStartToken != null) {
            return this.processText(token);
        }
        const separated = this.currentToken != null &&
            this.currentToken.range[1] !== token.range[0];
        const result = separated ? this.commit() : null;
        this.tokens.push(token);
        this.expressionStartToken = token;
        return result;
    }
    VExpressionEnd(token) {
        if (this.expressionStartToken == null) {
            return this.processText(token);
        }
        const start = this.expressionStartToken;
        const end = last(this.expressionTokens) || start;
        if (token.range[0] === start.range[1]) {
            this.tokens.pop();
            this.expressionStartToken = null;
            const result = this.processText(start);
            this.processText(token);
            return result;
        }
        if (end.range[1] !== token.range[0]) {
            const result = this.commit();
            this.processText(token);
            return result;
        }
        const value = this.expressionTokens.reduce(concat, "");
        this.tokens.push(token);
        this.expressionStartToken = null;
        this.expressionTokens = [];
        const result = this.currentToken != null ? this.commit() : null;
        this.currentToken = {
            type: "Mustache",
            range: [start.range[0], token.range[1]],
            loc: { start: start.loc.start, end: token.loc.end },
            value,
            startToken: start,
            endToken: token,
        };
        return result || this.commit();
    }
}

const DIRECTIVE_NAME = /^(?:v-|[:@]).*[^.:@]$/u;
const DT_DD = /^d[dt]$/u;
const DUMMY_PARENT$2 = Object.freeze({});
function isMathMLIntegrationPoint(element) {
    if (element.namespace === NS.MathML) {
        const name = element.name;
        return (name === "mi" ||
            name === "mo" ||
            name === "mn" ||
            name === "ms" ||
            name === "mtext");
    }
    return false;
}
function isHTMLIntegrationPoint(element) {
    if (element.namespace === NS.MathML) {
        return (element.name === "annotation-xml" &&
            element.startTag.attributes.some(a => a.directive === false &&
                a.key.name === "encoding" &&
                a.value != null &&
                (a.value.value === "text/html" ||
                    a.value.value === "application/xhtml+xml")));
    }
    if (element.namespace === NS.SVG) {
        const name = element.name;
        return name === "foreignObject" || name === "desc" || name === "title";
    }
    return false;
}
function adjustElementName(name, namespace) {
    if (namespace === NS.SVG) {
        return SVG_ELEMENT_NAME_MAP.get(name) || name;
    }
    return name;
}
function adjustAttributeName(name, namespace) {
    if (namespace === NS.SVG) {
        return SVG_ATTRIBUTE_NAME_MAP.get(name) || name;
    }
    if (namespace === NS.MathML) {
        return MATHML_ATTRIBUTE_NAME_MAP.get(name) || name;
    }
    return name;
}
function propagateEndLocation(node) {
    const lastChild = (node.type === "VElement" ? node.endTag : null) || last(node.children);
    if (lastChild != null) {
        node.range[1] = lastChild.range[1];
        node.loc.end = lastChild.loc.end;
    }
}
class Parser {
    get text() {
        return this.tokenizer.text;
    }
    get tokens() {
        return this.tokenizer.tokens;
    }
    get comments() {
        return this.tokenizer.comments;
    }
    get errors() {
        return this.tokenizer.errors;
    }
    get namespace() {
        return this.tokenizer.namespace;
    }
    set namespace(value) {
        this.tokenizer.namespace = value;
    }
    get expressionEnabled() {
        return this.tokenizer.expressionEnabled;
    }
    set expressionEnabled(value) {
        this.tokenizer.expressionEnabled = value;
    }
    get currentNode() {
        return last(this.elementStack) || this.document;
    }
    constructor(tokenizer, parserOptions) {
        this.tokenizer = new IntermediateTokenizer(tokenizer);
        this.locationCalculator = new LocationCalculator(tokenizer.gaps, tokenizer.lineTerminators);
        this.parserOptions = parserOptions;
        this.document = {
            type: "VDocumentFragment",
            range: [0, 0],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 0 },
            },
            parent: null,
            children: [],
            tokens: this.tokens,
            comments: this.comments,
            errors: this.errors,
        };
        this.elementStack = [];
    }
    parse() {
        let token = null;
        while ((token = this.tokenizer.nextToken()) != null) {
            this[token.type](token);
        }
        this.popElementStackUntil(0);
        propagateEndLocation(this.document);
        return this.document;
    }
    reportParseError(token, code) {
        const error = ParseError.fromCode(code, token.range[0], token.loc.start.line, token.loc.start.column);
        this.errors.push(error);
        debug("[html] syntax error:", error.message);
    }
    popElementStack() {
        assert(this.elementStack.length >= 1);
        const element = this.elementStack.pop();
        propagateEndLocation(element);
        const current = this.currentNode;
        this.namespace =
            current.type === "VElement" ? current.namespace : NS.HTML;
        if (this.elementStack.length === 0) {
            this.expressionEnabled = false;
        }
    }
    popElementStackUntil(index) {
        while (this.elementStack.length > index) {
            this.popElementStack();
        }
    }
    detectNamespace(token) {
        const name = token.name;
        let ns = this.namespace;
        if (ns === NS.MathML || ns === NS.SVG) {
            const element = this.currentNode;
            if (element.type === "VElement") {
                if (element.namespace === NS.MathML &&
                    element.name === "annotation-xml" &&
                    name === "svg") {
                    return NS.SVG;
                }
                if (isHTMLIntegrationPoint(element) ||
                    (isMathMLIntegrationPoint(element) &&
                        name !== "mglyph" &&
                        name !== "malignmark")) {
                    ns = NS.HTML;
                }
            }
        }
        if (ns === NS.HTML) {
            if (name === "svg") {
                return NS.SVG;
            }
            if (name === "math") {
                return NS.MathML;
            }
        }
        if (name === "template") {
            const xmlns = token.attributes.find(a => a.key.name === "xmlns");
            const value = xmlns && xmlns.value && xmlns.value.value;
            if (value === NS.HTML || value === NS.MathML || value === NS.SVG) {
                return value;
            }
        }
        return ns;
    }
    closeCurrentElementIfNecessary(name) {
        const element = this.currentNode;
        if (element.type !== "VElement") {
            return;
        }
        if (element.name === "p" && HTML_NON_FHRASING_TAGS.has(name)) {
            this.popElementStack();
        }
        if (element.name === name && HTML_CAN_BE_LEFT_OPEN_TAGS.has(name)) {
            this.popElementStack();
        }
        if (DT_DD.test(element.name) && DT_DD.test(name)) {
            this.popElementStack();
        }
    }
    processAttribute(node, namespace) {
        const tagName = node.parent.parent.name;
        const attrName = node.key.name;
        if (DIRECTIVE_NAME.test(attrName) ||
            attrName === "slot-scope" ||
            (tagName === "template" && attrName === "scope")) {
            convertToDirective(this.text, this.parserOptions, this.locationCalculator, node);
            return;
        }
        const key = (node.key.name = adjustAttributeName(node.key.name, namespace));
        const value = node.value && node.value.value;
        if (key === "xmlns" && value !== namespace) {
            this.reportParseError(node, "x-invalid-namespace");
        }
        else if (key === "xmlns:xlink" && value !== NS.XLink) {
            this.reportParseError(node, "x-invalid-namespace");
        }
    }
    StartTag(token) {
        debug("[html] StartTag %j", token);
        this.closeCurrentElementIfNecessary(token.name);
        const parent = this.currentNode;
        const namespace = this.detectNamespace(token);
        const element = {
            type: "VElement",
            range: [token.range[0], token.range[1]],
            loc: { start: token.loc.start, end: token.loc.end },
            parent,
            name: adjustElementName(token.name, namespace),
            rawName: token.rawName,
            namespace,
            startTag: {
                type: "VStartTag",
                range: token.range,
                loc: token.loc,
                parent: DUMMY_PARENT$2,
                selfClosing: token.selfClosing,
                attributes: token.attributes,
            },
            children: [],
            endTag: null,
            variables: [],
        };
        parent.children.push(element);
        element.startTag.parent = element;
        for (const attribute of token.attributes) {
            attribute.parent = element.startTag;
            this.processAttribute(attribute, namespace);
        }
        for (const attribute of element.startTag.attributes) {
            if (attribute.directive && attribute.value != null) {
                resolveReferences(attribute.value);
            }
        }
        const isVoid = namespace === NS.HTML && HTML_VOID_ELEMENT_TAGS.has(element.name);
        if (token.selfClosing && !isVoid && namespace === NS.HTML) {
            this.reportParseError(token, "non-void-html-element-start-tag-with-trailing-solidus");
        }
        if (token.selfClosing || isVoid) {
            return;
        }
        this.elementStack.push(element);
        this.namespace = namespace;
        if (namespace === NS.HTML) {
            if (element.name === "template" &&
                element.parent.type === "VDocumentFragment") {
                const langAttr = element.startTag.attributes.find(a => !a.directive && a.key.name === "lang");
                const lang = (langAttr && langAttr.value && langAttr.value.value) ||
                    "html";
                if (lang !== "html") {
                    this.tokenizer.state = "RAWTEXT";
                }
                this.expressionEnabled = true;
            }
            if (HTML_RCDATA_TAGS.has(element.name)) {
                this.tokenizer.state = "RCDATA";
            }
            if (HTML_RAWTEXT_TAGS.has(element.name)) {
                this.tokenizer.state = "RAWTEXT";
            }
        }
    }
    EndTag(token) {
        debug("[html] EndTag %j", token);
        const i = findLastIndex(this.elementStack, el => el.name.toLowerCase() === token.name);
        if (i === -1) {
            this.reportParseError(token, "x-invalid-end-tag");
            return;
        }
        const element = this.elementStack[i];
        element.endTag = {
            type: "VEndTag",
            range: token.range,
            loc: token.loc,
            parent: element,
        };
        this.popElementStackUntil(i);
    }
    Text(token) {
        debug("[html] Text %j", token);
        const parent = this.currentNode;
        parent.children.push({
            type: "VText",
            range: token.range,
            loc: token.loc,
            parent,
            value: token.value,
        });
    }
    Mustache(token) {
        debug("[html] Mustache %j", token);
        const parent = this.currentNode;
        const container = {
            type: "VExpressionContainer",
            range: token.range,
            loc: token.loc,
            parent,
            expression: null,
            references: [],
        };
        processMustache(this.parserOptions, this.locationCalculator, container, token);
        parent.children.push(container);
        resolveReferences(container);
    }
}

const alternativeCR = new Map([[128, 8364], [130, 8218], [131, 402], [132, 8222], [133, 8230], [134, 8224], [135, 8225], [136, 710], [137, 8240], [138, 352], [139, 8249], [140, 338], [142, 381], [145, 8216], [146, 8217], [147, 8220], [148, 8221], [149, 8226], [150, 8211], [151, 8212], [152, 732], [153, 8482], [154, 353], [155, 8250], [156, 339], [158, 382], [159, 376]]);

const entitySets = [{ "length": 32, "entities": { "CounterClockwiseContourIntegral;": [8755] } }, { "length": 25, "entities": { "ClockwiseContourIntegral;": [8754], "DoubleLongLeftRightArrow;": [10234] } }, { "length": 24, "entities": { "NotNestedGreaterGreater;": [10914, 824] } }, { "length": 23, "entities": { "DiacriticalDoubleAcute;": [733], "NotSquareSupersetEqual;": [8931] } }, { "length": 22, "entities": { "CloseCurlyDoubleQuote;": [8221], "DoubleContourIntegral;": [8751], "FilledVerySmallSquare;": [9642], "NegativeVeryThinSpace;": [8203], "NotPrecedesSlantEqual;": [8928], "NotRightTriangleEqual;": [8941], "NotSucceedsSlantEqual;": [8929] } }, { "length": 21, "entities": { "CapitalDifferentialD;": [8517], "DoubleLeftRightArrow;": [8660], "DoubleLongRightArrow;": [10233], "EmptyVerySmallSquare;": [9643], "NestedGreaterGreater;": [8811], "NotDoubleVerticalBar;": [8742], "NotGreaterSlantEqual;": [10878, 824], "NotLeftTriangleEqual;": [8940], "NotSquareSubsetEqual;": [8930], "OpenCurlyDoubleQuote;": [8220], "ReverseUpEquilibrium;": [10607] } }, { "length": 20, "entities": { "DoubleLongLeftArrow;": [10232], "DownLeftRightVector;": [10576], "LeftArrowRightArrow;": [8646], "NegativeMediumSpace;": [8203], "NotGreaterFullEqual;": [8807, 824], "NotRightTriangleBar;": [10704, 824], "RightArrowLeftArrow;": [8644], "SquareSupersetEqual;": [8850], "leftrightsquigarrow;": [8621] } }, { "length": 19, "entities": { "DownRightTeeVector;": [10591], "DownRightVectorBar;": [10583], "LongLeftRightArrow;": [10231], "Longleftrightarrow;": [10234], "NegativeThickSpace;": [8203], "NotLeftTriangleBar;": [10703, 824], "PrecedesSlantEqual;": [8828], "ReverseEquilibrium;": [8651], "RightDoubleBracket;": [10215], "RightDownTeeVector;": [10589], "RightDownVectorBar;": [10581], "RightTriangleEqual;": [8885], "SquareIntersection;": [8851], "SucceedsSlantEqual;": [8829], "blacktriangleright;": [9656], "longleftrightarrow;": [10231] } }, { "length": 18, "entities": { "DoubleUpDownArrow;": [8661], "DoubleVerticalBar;": [8741], "DownLeftTeeVector;": [10590], "DownLeftVectorBar;": [10582], "FilledSmallSquare;": [9724], "GreaterSlantEqual;": [10878], "LeftDoubleBracket;": [10214], "LeftDownTeeVector;": [10593], "LeftDownVectorBar;": [10585], "LeftTriangleEqual;": [8884], "NegativeThinSpace;": [8203], "NotGreaterGreater;": [8811, 824], "NotLessSlantEqual;": [10877, 824], "NotNestedLessLess;": [10913, 824], "NotReverseElement;": [8716], "NotSquareSuperset;": [8848, 824], "NotTildeFullEqual;": [8775], "RightAngleBracket;": [10217], "RightUpDownVector;": [10575], "SquareSubsetEqual;": [8849], "VerticalSeparator;": [10072], "blacktriangledown;": [9662], "blacktriangleleft;": [9666], "leftrightharpoons;": [8651], "rightleftharpoons;": [8652], "twoheadrightarrow;": [8608] } }, { "length": 17, "entities": { "DiacriticalAcute;": [180], "DiacriticalGrave;": [96], "DiacriticalTilde;": [732], "DoubleRightArrow;": [8658], "DownArrowUpArrow;": [8693], "EmptySmallSquare;": [9723], "GreaterEqualLess;": [8923], "GreaterFullEqual;": [8807], "LeftAngleBracket;": [10216], "LeftUpDownVector;": [10577], "LessEqualGreater;": [8922], "NonBreakingSpace;": [160], "NotPrecedesEqual;": [10927, 824], "NotRightTriangle;": [8939], "NotSucceedsEqual;": [10928, 824], "NotSucceedsTilde;": [8831, 824], "NotSupersetEqual;": [8841], "RightTriangleBar;": [10704], "RightUpTeeVector;": [10588], "RightUpVectorBar;": [10580], "UnderParenthesis;": [9181], "UpArrowDownArrow;": [8645], "circlearrowright;": [8635], "downharpoonright;": [8642], "ntrianglerighteq;": [8941], "rightharpoondown;": [8641], "rightrightarrows;": [8649], "twoheadleftarrow;": [8606], "vartriangleright;": [8883] } }, { "length": 16, "entities": { "CloseCurlyQuote;": [8217], "ContourIntegral;": [8750], "DoubleDownArrow;": [8659], "DoubleLeftArrow;": [8656], "DownRightVector;": [8641], "LeftRightVector;": [10574], "LeftTriangleBar;": [10703], "LeftUpTeeVector;": [10592], "LeftUpVectorBar;": [10584], "LowerRightArrow;": [8600], "NotGreaterEqual;": [8817], "NotGreaterTilde;": [8821], "NotHumpDownHump;": [8782, 824], "NotLeftTriangle;": [8938], "NotSquareSubset;": [8847, 824], "OverParenthesis;": [9180], "RightDownVector;": [8642], "ShortRightArrow;": [8594], "UpperRightArrow;": [8599], "bigtriangledown;": [9661], "circlearrowleft;": [8634], "curvearrowright;": [8631], "downharpoonleft;": [8643], "leftharpoondown;": [8637], "leftrightarrows;": [8646], "nLeftrightarrow;": [8654], "nleftrightarrow;": [8622], "ntrianglelefteq;": [8940], "rightleftarrows;": [8644], "rightsquigarrow;": [8605], "rightthreetimes;": [8908], "straightepsilon;": [1013], "trianglerighteq;": [8885], "vartriangleleft;": [8882] } }, { "length": 15, "entities": { "DiacriticalDot;": [729], "DoubleRightTee;": [8872], "DownLeftVector;": [8637], "GreaterGreater;": [10914], "HorizontalLine;": [9472], "InvisibleComma;": [8291], "InvisibleTimes;": [8290], "LeftDownVector;": [8643], "LeftRightArrow;": [8596], "Leftrightarrow;": [8660], "LessSlantEqual;": [10877], "LongRightArrow;": [10230], "Longrightarrow;": [10233], "LowerLeftArrow;": [8601], "NestedLessLess;": [8810], "NotGreaterLess;": [8825], "NotLessGreater;": [8824], "NotSubsetEqual;": [8840], "NotVerticalBar;": [8740], "OpenCurlyQuote;": [8216], "ReverseElement;": [8715], "RightTeeVector;": [10587], "RightVectorBar;": [10579], "ShortDownArrow;": [8595], "ShortLeftArrow;": [8592], "SquareSuperset;": [8848], "TildeFullEqual;": [8773], "UpperLeftArrow;": [8598], "ZeroWidthSpace;": [8203], "curvearrowleft;": [8630], "doublebarwedge;": [8966], "downdownarrows;": [8650], "hookrightarrow;": [8618], "leftleftarrows;": [8647], "leftrightarrow;": [8596], "leftthreetimes;": [8907], "longrightarrow;": [10230], "looparrowright;": [8620], "nshortparallel;": [8742], "ntriangleright;": [8939], "rightarrowtail;": [8611], "rightharpoonup;": [8640], "trianglelefteq;": [8884], "upharpoonright;": [8638] } }, { "length": 14, "entities": { "ApplyFunction;": [8289], "DifferentialD;": [8518], "DoubleLeftTee;": [10980], "DoubleUpArrow;": [8657], "LeftTeeVector;": [10586], "LeftVectorBar;": [10578], "LessFullEqual;": [8806], "LongLeftArrow;": [10229], "Longleftarrow;": [10232], "NotEqualTilde;": [8770, 824], "NotTildeEqual;": [8772], "NotTildeTilde;": [8777], "Poincareplane;": [8460], "PrecedesEqual;": [10927], "PrecedesTilde;": [8830], "RightArrowBar;": [8677], "RightTeeArrow;": [8614], "RightTriangle;": [8883], "RightUpVector;": [8638], "SucceedsEqual;": [10928], "SucceedsTilde;": [8831], "SupersetEqual;": [8839], "UpEquilibrium;": [10606], "VerticalTilde;": [8768], "VeryThinSpace;": [8202], "bigtriangleup;": [9651], "blacktriangle;": [9652], "divideontimes;": [8903], "fallingdotseq;": [8786], "hookleftarrow;": [8617], "leftarrowtail;": [8610], "leftharpoonup;": [8636], "longleftarrow;": [10229], "looparrowleft;": [8619], "measuredangle;": [8737], "ntriangleleft;": [8938], "shortparallel;": [8741], "smallsetminus;": [8726], "triangleright;": [9657], "upharpoonleft;": [8639], "varsubsetneqq;": [10955, 65024], "varsupsetneqq;": [10956, 65024] } }, { "length": 13, "entities": { "DownArrowBar;": [10515], "DownTeeArrow;": [8615], "ExponentialE;": [8519], "GreaterEqual;": [8805], "GreaterTilde;": [8819], "HilbertSpace;": [8459], "HumpDownHump;": [8782], "Intersection;": [8898], "LeftArrowBar;": [8676], "LeftTeeArrow;": [8612], "LeftTriangle;": [8882], "LeftUpVector;": [8639], "NotCongruent;": [8802], "NotHumpEqual;": [8783, 824], "NotLessEqual;": [8816], "NotLessTilde;": [8820], "Proportional;": [8733], "RightCeiling;": [8969], "RoundImplies;": [10608], "ShortUpArrow;": [8593], "SquareSubset;": [8847], "UnderBracket;": [9141], "VerticalLine;": [124], "blacklozenge;": [10731], "exponentiale;": [8519], "risingdotseq;": [8787], "triangledown;": [9663], "triangleleft;": [9667], "varsubsetneq;": [8842, 65024], "varsupsetneq;": [8843, 65024] } }, { "length": 12, "entities": { "CircleMinus;": [8854], "CircleTimes;": [8855], "Equilibrium;": [8652], "GreaterLess;": [8823], "LeftCeiling;": [8968], "LessGreater;": [8822], "MediumSpace;": [8287], "NotLessLess;": [8810, 824], "NotPrecedes;": [8832], "NotSucceeds;": [8833], "NotSuperset;": [8835, 8402], "OverBracket;": [9140], "RightVector;": [8640], "Rrightarrow;": [8667], "RuleDelayed;": [10740], "SmallCircle;": [8728], "SquareUnion;": [8852], "SubsetEqual;": [8838], "UpDownArrow;": [8597], "Updownarrow;": [8661], "VerticalBar;": [8739], "backepsilon;": [1014], "blacksquare;": [9642], "circledcirc;": [8858], "circleddash;": [8861], "curlyeqprec;": [8926], "curlyeqsucc;": [8927], "diamondsuit;": [9830], "eqslantless;": [10901], "expectation;": [8496], "nRightarrow;": [8655], "nrightarrow;": [8603], "preccurlyeq;": [8828], "precnapprox;": [10937], "quaternions;": [8461], "straightphi;": [981], "succcurlyeq;": [8829], "succnapprox;": [10938], "thickapprox;": [8776], "updownarrow;": [8597] } }, { "length": 11, "entities": { "Bernoullis;": [8492], "CirclePlus;": [8853], "EqualTilde;": [8770], "Fouriertrf;": [8497], "ImaginaryI;": [8520], "Laplacetrf;": [8466], "LeftVector;": [8636], "Lleftarrow;": [8666], "NotElement;": [8713], "NotGreater;": [8815], "Proportion;": [8759], "RightArrow;": [8594], "RightFloor;": [8971], "Rightarrow;": [8658], "ThickSpace;": [8287, 8202], "TildeEqual;": [8771], "TildeTilde;": [8776], "UnderBrace;": [9183], "UpArrowBar;": [10514], "UpTeeArrow;": [8613], "circledast;": [8859], "complement;": [8705], "curlywedge;": [8911], "eqslantgtr;": [10902], "gtreqqless;": [10892], "lessapprox;": [10885], "lesseqqgtr;": [10891], "lmoustache;": [9136], "longmapsto;": [10236], "mapstodown;": [8615], "mapstoleft;": [8612], "nLeftarrow;": [8653], "nleftarrow;": [8602], "nsubseteqq;": [10949, 824], "nsupseteqq;": [10950, 824], "precapprox;": [10935], "rightarrow;": [8594], "rmoustache;": [9137], "sqsubseteq;": [8849], "sqsupseteq;": [8850], "subsetneqq;": [10955], "succapprox;": [10936], "supsetneqq;": [10956], "upuparrows;": [8648], "varepsilon;": [1013], "varnothing;": [8709] } }, { "length": 10, "entities": { "Backslash;": [8726], "CenterDot;": [183], "CircleDot;": [8857], "Congruent;": [8801], "Coproduct;": [8720], "DoubleDot;": [168], "DownArrow;": [8595], "DownBreve;": [785], "Downarrow;": [8659], "HumpEqual;": [8783], "LeftArrow;": [8592], "LeftFloor;": [8970], "Leftarrow;": [8656], "LessTilde;": [8818], "Mellintrf;": [8499], "MinusPlus;": [8723], "NotCupCap;": [8813], "NotExists;": [8708], "NotSubset;": [8834, 8402], "OverBrace;": [9182], "PlusMinus;": [177], "Therefore;": [8756], "ThinSpace;": [8201], "TripleDot;": [8411], "UnionPlus;": [8846], "backprime;": [8245], "backsimeq;": [8909], "bigotimes;": [10754], "centerdot;": [183], "checkmark;": [10003], "complexes;": [8450], "dotsquare;": [8865], "downarrow;": [8595], "gtrapprox;": [10886], "gtreqless;": [8923], "gvertneqq;": [8809, 65024], "heartsuit;": [9829], "leftarrow;": [8592], "lesseqgtr;": [8922], "lvertneqq;": [8808, 65024], "ngeqslant;": [10878, 824], "nleqslant;": [10877, 824], "nparallel;": [8742], "nshortmid;": [8740], "nsubseteq;": [8840], "nsupseteq;": [8841], "pitchfork;": [8916], "rationals;": [8474], "spadesuit;": [9824], "subseteqq;": [10949], "subsetneq;": [8842], "supseteqq;": [10950], "supsetneq;": [8843], "therefore;": [8756], "triangleq;": [8796], "varpropto;": [8733] } }, { "length": 9, "entities": { "DDotrahd;": [10513], "DotEqual;": [8784], "Integral;": [8747], "LessLess;": [10913], "NotEqual;": [8800], "NotTilde;": [8769], "PartialD;": [8706], "Precedes;": [8826], "RightTee;": [8866], "Succeeds;": [8827], "SuchThat;": [8715], "Superset;": [8835], "Uarrocir;": [10569], "UnderBar;": [95], "andslope;": [10840], "angmsdaa;": [10664], "angmsdab;": [10665], "angmsdac;": [10666], "angmsdad;": [10667], "angmsdae;": [10668], "angmsdaf;": [10669], "angmsdag;": [10670], "angmsdah;": [10671], "angrtvbd;": [10653], "approxeq;": [8778], "awconint;": [8755], "backcong;": [8780], "barwedge;": [8965], "bbrktbrk;": [9142], "bigoplus;": [10753], "bigsqcup;": [10758], "biguplus;": [10756], "bigwedge;": [8896], "boxminus;": [8863], "boxtimes;": [8864], "bsolhsub;": [10184], "capbrcup;": [10825], "circledR;": [174], "circledS;": [9416], "cirfnint;": [10768], "clubsuit;": [9827], "cupbrcap;": [10824], "curlyvee;": [8910], "cwconint;": [8754], "doteqdot;": [8785], "dotminus;": [8760], "drbkarow;": [10512], "dzigrarr;": [10239], "elinters;": [9191], "emptyset;": [8709], "eqvparsl;": [10725], "fpartint;": [10765], "geqslant;": [10878], "gesdotol;": [10884], "gnapprox;": [10890], "hksearow;": [10533], "hkswarow;": [10534], "imagline;": [8464], "imagpart;": [8465], "infintie;": [10717], "integers;": [8484], "intercal;": [8890], "intlarhk;": [10775], "laemptyv;": [10676], "ldrushar;": [10571], "leqslant;": [10877], "lesdotor;": [10883], "llcorner;": [8990], "lnapprox;": [10889], "lrcorner;": [8991], "lurdshar;": [10570], "mapstoup;": [8613], "multimap;": [8888], "naturals;": [8469], "ncongdot;": [10861, 824], "notindot;": [8949, 824], "otimesas;": [10806], "parallel;": [8741], "plusacir;": [10787], "pointint;": [10773], "precneqq;": [10933], "precnsim;": [8936], "profalar;": [9006], "profline;": [8978], "profsurf;": [8979], "raemptyv;": [10675], "realpart;": [8476], "rppolint;": [10770], "rtriltri;": [10702], "scpolint;": [10771], "setminus;": [8726], "shortmid;": [8739], "smeparsl;": [10724], "sqsubset;": [8847], "sqsupset;": [8848], "subseteq;": [8838], "succneqq;": [10934], "succnsim;": [8937], "supseteq;": [8839], "thetasym;": [977], "thicksim;": [8764], "timesbar;": [10801], "triangle;": [9653], "triminus;": [10810], "trpezium;": [9186], "ulcorner;": [8988], "urcorner;": [8989], "varkappa;": [1008], "varsigma;": [962], "vartheta;": [977] } }, { "length": 8, "entities": { "Because;": [8757], "Cayleys;": [8493], "Cconint;": [8752], "Cedilla;": [184], "Diamond;": [8900], "DownTee;": [8868], "Element;": [8712], "Epsilon;": [917], "Implies;": [8658], "LeftTee;": [8867], "NewLine;": [10], "NoBreak;": [8288], "NotLess;": [8814], "Omicron;": [927], "OverBar;": [8254], "Product;": [8719], "UpArrow;": [8593], "Uparrow;": [8657], "Upsilon;": [933], "alefsym;": [8501], "angrtvb;": [8894], "angzarr;": [9084], "asympeq;": [8781], "backsim;": [8765], "because;": [8757], "bemptyv;": [10672], "between;": [8812], "bigcirc;": [9711], "bigodot;": [10752], "bigstar;": [9733], "bnequiv;": [8801, 8421], "boxplus;": [8862], "ccupssm;": [10832], "cemptyv;": [10674], "cirscir;": [10690], "coloneq;": [8788], "congdot;": [10861], "cudarrl;": [10552], "cudarrr;": [10549], "cularrp;": [10557], "curarrm;": [10556], "dbkarow;": [10511], "ddagger;": [8225], "ddotseq;": [10871], "demptyv;": [10673], "diamond;": [8900], "digamma;": [989], "dotplus;": [8724], "dwangle;": [10662], "epsilon;": [949], "eqcolon;": [8789], "equivDD;": [10872], "gesdoto;": [10882], "gtquest;": [10876], "gtrless;": [8823], "harrcir;": [10568], "intprod;": [10812], "isindot;": [8949], "larrbfs;": [10527], "larrsim;": [10611], "lbrksld;": [10639], "lbrkslu;": [10637], "ldrdhar;": [10599], "lesdoto;": [10881], "lessdot;": [8918], "lessgtr;": [8822], "lesssim;": [8818], "lotimes;": [10804], "lozenge;": [9674], "ltquest;": [10875], "luruhar;": [10598], "maltese;": [10016], "minusdu;": [10794], "napprox;": [8777], "natural;": [9838], "nearrow;": [8599], "nexists;": [8708], "notinva;": [8713], "notinvb;": [8951], "notinvc;": [8950], "notniva;": [8716], "notnivb;": [8958], "notnivc;": [8957], "npolint;": [10772], "npreceq;": [10927, 824], "nsqsube;": [8930], "nsqsupe;": [8931], "nsubset;": [8834, 8402], "nsucceq;": [10928, 824], "nsupset;": [8835, 8402], "nvinfin;": [10718], "nvltrie;": [8884, 8402], "nvrtrie;": [8885, 8402], "nwarrow;": [8598], "olcross;": [10683], "omicron;": [959], "orderof;": [8500], "orslope;": [10839], "pertenk;": [8241], "planckh;": [8462], "pluscir;": [10786], "plussim;": [10790], "plustwo;": [10791], "precsim;": [8830], "quatint;": [10774], "questeq;": [8799], "rarrbfs;": [10528], "rarrsim;": [10612], "rbrksld;": [10638], "rbrkslu;": [10640], "rdldhar;": [10601], "realine;": [8475], "rotimes;": [10805], "ruluhar;": [10600], "searrow;": [8600], "simplus;": [10788], "simrarr;": [10610], "subedot;": [10947], "submult;": [10945], "subplus;": [10943], "subrarr;": [10617], "succsim;": [8831], "supdsub;": [10968], "supedot;": [10948], "suphsol;": [10185], "suphsub;": [10967], "suplarr;": [10619], "supmult;": [10946], "supplus;": [10944], "swarrow;": [8601], "topfork;": [10970], "triplus;": [10809], "tritime;": [10811], "uparrow;": [8593], "upsilon;": [965], "uwangle;": [10663], "vzigzag;": [10650], "zigrarr;": [8669] } }, { "length": 7, "entities": { "Aacute;": [193], "Abreve;": [258], "Agrave;": [192], "Assign;": [8788], "Atilde;": [195], "Barwed;": [8966], "Bumpeq;": [8782], "Cacute;": [262], "Ccaron;": [268], "Ccedil;": [199], "Colone;": [10868], "Conint;": [8751], "CupCap;": [8781], "Dagger;": [8225], "Dcaron;": [270], "DotDot;": [8412], "Dstrok;": [272], "Eacute;": [201], "Ecaron;": [282], "Egrave;": [200], "Exists;": [8707], "ForAll;": [8704], "Gammad;": [988], "Gbreve;": [286], "Gcedil;": [290], "HARDcy;": [1066], "Hstrok;": [294], "Iacute;": [205], "Igrave;": [204], "Itilde;": [296], "Jsercy;": [1032], "Kcedil;": [310], "Lacute;": [313], "Lambda;": [923], "Lcaron;": [317], "Lcedil;": [315], "Lmidot;": [319], "Lstrok;": [321], "Nacute;": [323], "Ncaron;": [327], "Ncedil;": [325], "Ntilde;": [209], "Oacute;": [211], "Odblac;": [336], "Ograve;": [210], "Oslash;": [216], "Otilde;": [213], "Otimes;": [10807], "Racute;": [340], "Rarrtl;": [10518], "Rcaron;": [344], "Rcedil;": [342], "SHCHcy;": [1065], "SOFTcy;": [1068], "Sacute;": [346], "Scaron;": [352], "Scedil;": [350], "Square;": [9633], "Subset;": [8912], "Supset;": [8913], "Tcaron;": [356], "Tcedil;": [354], "Tstrok;": [358], "Uacute;": [218], "Ubreve;": [364], "Udblac;": [368], "Ugrave;": [217], "Utilde;": [360], "Vdashl;": [10982], "Verbar;": [8214], "Vvdash;": [8874], "Yacute;": [221], "Zacute;": [377], "Zcaron;": [381], "aacute;": [225], "abreve;": [259], "agrave;": [224], "andand;": [10837], "angmsd;": [8737], "angsph;": [8738], "apacir;": [10863], "approx;": [8776], "atilde;": [227], "barvee;": [8893], "barwed;": [8965], "becaus;": [8757], "bernou;": [8492], "bigcap;": [8898], "bigcup;": [8899], "bigvee;": [8897], "bkarow;": [10509], "bottom;": [8869], "bowtie;": [8904], "boxbox;": [10697], "bprime;": [8245], "brvbar;": [166], "bullet;": [8226], "bumpeq;": [8783], "cacute;": [263], "capand;": [10820], "capcap;": [10827], "capcup;": [10823], "capdot;": [10816], "ccaron;": [269], "ccedil;": [231], "circeq;": [8791], "cirmid;": [10991], "colone;": [8788], "commat;": [64], "compfn;": [8728], "conint;": [8750], "coprod;": [8720], "copysr;": [8471], "cularr;": [8630], "cupcap;": [10822], "cupcup;": [10826], "cupdot;": [8845], "curarr;": [8631], "curren;": [164], "cylcty;": [9005], "dagger;": [8224], "daleth;": [8504], "dcaron;": [271], "dfisht;": [10623], "divide;": [247], "divonx;": [8903], "dlcorn;": [8990], "dlcrop;": [8973], "dollar;": [36], "drcorn;": [8991], "drcrop;": [8972], "dstrok;": [273], "eacute;": [233], "easter;": [10862], "ecaron;": [283], "ecolon;": [8789], "egrave;": [232], "egsdot;": [10904], "elsdot;": [10903], "emptyv;": [8709], "emsp13;": [8196], "emsp14;": [8197], "eparsl;": [10723], "eqcirc;": [8790], "equals;": [61], "equest;": [8799], "female;": [9792], "ffilig;": [64259], "ffllig;": [64260], "forall;": [8704], "frac12;": [189], "frac13;": [8531], "frac14;": [188], "frac15;": [8533], "frac16;": [8537], "frac18;": [8539], "frac23;": [8532], "frac25;": [8534], "frac34;": [190], "frac35;": [8535], "frac38;": [8540], "frac45;": [8536], "frac56;": [8538], "frac58;": [8541], "frac78;": [8542], "gacute;": [501], "gammad;": [989], "gbreve;": [287], "gesdot;": [10880], "gesles;": [10900], "gtlPar;": [10645], "gtrarr;": [10616], "gtrdot;": [8919], "gtrsim;": [8819], "hairsp;": [8202], "hamilt;": [8459], "hardcy;": [1098], "hearts;": [9829], "hellip;": [8230], "hercon;": [8889], "homtht;": [8763], "horbar;": [8213], "hslash;": [8463], "hstrok;": [295], "hybull;": [8259], "hyphen;": [8208], "iacute;": [237], "igrave;": [236], "iiiint;": [10764], "iinfin;": [10716], "incare;": [8453], "inodot;": [305], "intcal;": [8890], "iquest;": [191], "isinsv;": [8947], "itilde;": [297], "jsercy;": [1112], "kappav;": [1008], "kcedil;": [311], "kgreen;": [312], "lAtail;": [10523], "lacute;": [314], "lagran;": [8466], "lambda;": [955], "langle;": [10216], "larrfs;": [10525], "larrhk;": [8617], "larrlp;": [8619], "larrpl;": [10553], "larrtl;": [8610], "latail;": [10521], "lbrace;": [123], "lbrack;": [91], "lcaron;": [318], "lcedil;": [316], "ldquor;": [8222], "lesdot;": [10879], "lesges;": [10899], "lfisht;": [10620], "lfloor;": [8970], "lharul;": [10602], "llhard;": [10603], "lmidot;": [320], "lmoust;": [9136], "loplus;": [10797], "lowast;": [8727], "lowbar;": [95], "lparlt;": [10643], "lrhard;": [10605], "lsaquo;": [8249], "lsquor;": [8218], "lstrok;": [322], "lthree;": [8907], "ltimes;": [8905], "ltlarr;": [10614], "ltrPar;": [10646], "mapsto;": [8614], "marker;": [9646], "mcomma;": [10793], "midast;": [42], "midcir;": [10992], "middot;": [183], "minusb;": [8863], "minusd;": [8760], "mnplus;": [8723], "models;": [8871], "mstpos;": [8766], "nVDash;": [8879], "nVdash;": [8878], "nacute;": [324], "nbumpe;": [8783, 824], "ncaron;": [328], "ncedil;": [326], "nearhk;": [10532], "nequiv;": [8802], "nesear;": [10536], "nexist;": [8708], "nltrie;": [8940], "notinE;": [8953, 824], "nparsl;": [11005, 8421], "nprcue;": [8928], "nrarrc;": [10547, 824], "nrarrw;": [8605, 824], "nrtrie;": [8941], "nsccue;": [8929], "nsimeq;": [8772], "ntilde;": [241], "numero;": [8470], "nvDash;": [8877], "nvHarr;": [10500], "nvdash;": [8876], "nvlArr;": [10498], "nvrArr;": [10499], "nwarhk;": [10531], "nwnear;": [10535], "oacute;": [243], "odblac;": [337], "odsold;": [10684], "ograve;": [242], "ominus;": [8854], "origof;": [8886], "oslash;": [248], "otilde;": [245], "otimes;": [8855], "parsim;": [10995], "percnt;": [37], "period;": [46], "permil;": [8240], "phmmat;": [8499], "planck;": [8463], "plankv;": [8463], "plusdo;": [8724], "plusdu;": [10789], "plusmn;": [177], "preceq;": [10927], "primes;": [8473], "prnsim;": [8936], "propto;": [8733], "prurel;": [8880], "puncsp;": [8200], "qprime;": [8279], "rAtail;": [10524], "racute;": [341], "rangle;": [10217], "rarrap;": [10613], "rarrfs;": [10526], "rarrhk;": [8618], "rarrlp;": [8620], "rarrpl;": [10565], "rarrtl;": [8611], "ratail;": [10522], "rbrace;": [125], "rbrack;": [93], "rcaron;": [345], "rcedil;": [343], "rdquor;": [8221], "rfisht;": [10621], "rfloor;": [8971], "rharul;": [10604], "rmoust;": [9137], "roplus;": [10798], "rpargt;": [10644], "rsaquo;": [8250], "rsquor;": [8217], "rthree;": [8908], "rtimes;": [8906], "sacute;": [347], "scaron;": [353], "scedil;": [351], "scnsim;": [8937], "searhk;": [10533], "seswar;": [10537], "sfrown;": [8994], "shchcy;": [1097], "sigmaf;": [962], "sigmav;": [962], "simdot;": [10858], "smashp;": [10803], "softcy;": [1100], "solbar;": [9023], "spades;": [9824], "sqcaps;": [8851, 65024], "sqcups;": [8852, 65024], "sqsube;": [8849], "sqsupe;": [8850], "square;": [9633], "squarf;": [9642], "ssetmn;": [8726], "ssmile;": [8995], "sstarf;": [8902], "subdot;": [10941], "subset;": [8834], "subsim;": [10951], "subsub;": [10965], "subsup;": [10963], "succeq;": [10928], "supdot;": [10942], "supset;": [8835], "supsim;": [10952], "supsub;": [10964], "supsup;": [10966], "swarhk;": [10534], "swnwar;": [10538], "target;": [8982], "tcaron;": [357], "tcedil;": [355], "telrec;": [8981], "there4;": [8756], "thetav;": [977], "thinsp;": [8201], "thksim;": [8764], "timesb;": [8864], "timesd;": [10800], "topbot;": [9014], "topcir;": [10993], "tprime;": [8244], "tridot;": [9708], "tstrok;": [359], "uacute;": [250], "ubreve;": [365], "udblac;": [369], "ufisht;": [10622], "ugrave;": [249], "ulcorn;": [8988], "ulcrop;": [8975], "urcorn;": [8989], "urcrop;": [8974], "utilde;": [361], "vangrt;": [10652], "varphi;": [981], "varrho;": [1009], "veebar;": [8891], "vellip;": [8942], "verbar;": [124], "vsubnE;": [10955, 65024], "vsubne;": [8842, 65024], "vsupnE;": [10956, 65024], "vsupne;": [8843, 65024], "wedbar;": [10847], "wedgeq;": [8793], "weierp;": [8472], "wreath;": [8768], "xoplus;": [10753], "xotime;": [10754], "xsqcup;": [10758], "xuplus;": [10756], "xwedge;": [8896], "yacute;": [253], "zacute;": [378], "zcaron;": [382], "zeetrf;": [8488] } }, { "length": 6, "entities": { "AElig;": [198], "Aacute": [193], "Acirc;": [194], "Agrave": [192], "Alpha;": [913], "Amacr;": [256], "Aogon;": [260], "Aring;": [197], "Atilde": [195], "Breve;": [728], "Ccedil": [199], "Ccirc;": [264], "Colon;": [8759], "Cross;": [10799], "Dashv;": [10980], "Delta;": [916], "Eacute": [201], "Ecirc;": [202], "Egrave": [200], "Emacr;": [274], "Eogon;": [280], "Equal;": [10869], "Gamma;": [915], "Gcirc;": [284], "Hacek;": [711], "Hcirc;": [292], "IJlig;": [306], "Iacute": [205], "Icirc;": [206], "Igrave": [204], "Imacr;": [298], "Iogon;": [302], "Iukcy;": [1030], "Jcirc;": [308], "Jukcy;": [1028], "Kappa;": [922], "Ntilde": [209], "OElig;": [338], "Oacute": [211], "Ocirc;": [212], "Ograve": [210], "Omacr;": [332], "Omega;": [937], "Oslash": [216], "Otilde": [213], "Prime;": [8243], "RBarr;": [10512], "Scirc;": [348], "Sigma;": [931], "THORN;": [222], "TRADE;": [8482], "TSHcy;": [1035], "Theta;": [920], "Tilde;": [8764], "Uacute": [218], "Ubrcy;": [1038], "Ucirc;": [219], "Ugrave": [217], "Umacr;": [362], "Union;": [8899], "Uogon;": [370], "UpTee;": [8869], "Uring;": [366], "VDash;": [8875], "Vdash;": [8873], "Wcirc;": [372], "Wedge;": [8896], "Yacute": [221], "Ycirc;": [374], "aacute": [225], "acirc;": [226], "acute;": [180], "aelig;": [230], "agrave": [224], "aleph;": [8501], "alpha;": [945], "amacr;": [257], "amalg;": [10815], "angle;": [8736], "angrt;": [8735], "angst;": [197], "aogon;": [261], "aring;": [229], "asymp;": [8776], "atilde": [227], "awint;": [10769], "bcong;": [8780], "bdquo;": [8222], "bepsi;": [1014], "blank;": [9251], "blk12;": [9618], "blk14;": [9617], "blk34;": [9619], "block;": [9608], "boxDL;": [9559], "boxDR;": [9556], "boxDl;": [9558], "boxDr;": [9555], "boxHD;": [9574], "boxHU;": [9577], "boxHd;": [9572], "boxHu;": [9575], "boxUL;": [9565], "boxUR;": [9562], "boxUl;": [9564], "boxUr;": [9561], "boxVH;": [9580], "boxVL;": [9571], "boxVR;": [9568], "boxVh;": [9579], "boxVl;": [9570], "boxVr;": [9567], "boxdL;": [9557], "boxdR;": [9554], "boxdl;": [9488], "boxdr;": [9484], "boxhD;": [9573], "boxhU;": [9576], "boxhd;": [9516], "boxhu;": [9524], "boxuL;": [9563], "boxuR;": [9560], "boxul;": [9496], "boxur;": [9492], "boxvH;": [9578], "boxvL;": [9569], "boxvR;": [9566], "boxvh;": [9532], "boxvl;": [9508], "boxvr;": [9500], "breve;": [728], "brvbar": [166], "bsemi;": [8271], "bsime;": [8909], "bsolb;": [10693], "bumpE;": [10926], "bumpe;": [8783], "caret;": [8257], "caron;": [711], "ccaps;": [10829], "ccedil": [231], "ccirc;": [265], "ccups;": [10828], "cedil;": [184], "check;": [10003], "clubs;": [9827], "colon;": [58], "comma;": [44], "crarr;": [8629], "cross;": [10007], "csube;": [10961], "csupe;": [10962], "ctdot;": [8943], "cuepr;": [8926], "cuesc;": [8927], "cupor;": [10821], "curren": [164], "cuvee;": [8910], "cuwed;": [8911], "cwint;": [8753], "dashv;": [8867], "dblac;": [733], "ddarr;": [8650], "delta;": [948], "dharl;": [8643], "dharr;": [8642], "diams;": [9830], "disin;": [8946], "divide": [247], "doteq;": [8784], "dtdot;": [8945], "dtrif;": [9662], "duarr;": [8693], "duhar;": [10607], "eDDot;": [10871], "eacute": [233], "ecirc;": [234], "efDot;": [8786], "egrave": [232], "emacr;": [275], "empty;": [8709], "eogon;": [281], "eplus;": [10865], "epsiv;": [1013], "eqsim;": [8770], "equiv;": [8801], "erDot;": [8787], "erarr;": [10609], "esdot;": [8784], "exist;": [8707], "fflig;": [64256], "filig;": [64257], "fjlig;": [102, 106], "fllig;": [64258], "fltns;": [9649], "forkv;": [10969], "frac12": [189], "frac14": [188], "frac34": [190], "frasl;": [8260], "frown;": [8994], "gamma;": [947], "gcirc;": [285], "gescc;": [10921], "gimel;": [8503], "gneqq;": [8809], "gnsim;": [8935], "grave;": [96], "gsime;": [10894], "gsiml;": [10896], "gtcir;": [10874], "gtdot;": [8919], "harrw;": [8621], "hcirc;": [293], "hoarr;": [8703], "iacute": [237], "icirc;": [238], "iexcl;": [161], "igrave": [236], "iiint;": [8749], "iiota;": [8489], "ijlig;": [307], "imacr;": [299], "image;": [8465], "imath;": [305], "imped;": [437], "infin;": [8734], "iogon;": [303], "iprod;": [10812], "iquest": [191], "isinE;": [8953], "isins;": [8948], "isinv;": [8712], "iukcy;": [1110], "jcirc;": [309], "jmath;": [567], "jukcy;": [1108], "kappa;": [954], "lAarr;": [8666], "lBarr;": [10510], "langd;": [10641], "laquo;": [171], "larrb;": [8676], "lates;": [10925, 65024], "lbarr;": [10508], "lbbrk;": [10098], "lbrke;": [10635], "lceil;": [8968], "ldquo;": [8220], "lescc;": [10920], "lhard;": [8637], "lharu;": [8636], "lhblk;": [9604], "llarr;": [8647], "lltri;": [9722], "lneqq;": [8808], "lnsim;": [8934], "loang;": [10220], "loarr;": [8701], "lobrk;": [10214], "lopar;": [10629], "lrarr;": [8646], "lrhar;": [8651], "lrtri;": [8895], "lsime;": [10893], "lsimg;": [10895], "lsquo;": [8216], "ltcir;": [10873], "ltdot;": [8918], "ltrie;": [8884], "ltrif;": [9666], "mDDot;": [8762], "mdash;": [8212], "micro;": [181], "middot": [183], "minus;": [8722], "mumap;": [8888], "nabla;": [8711], "napid;": [8779, 824], "napos;": [329], "natur;": [9838], "nbump;": [8782, 824], "ncong;": [8775], "ndash;": [8211], "neArr;": [8663], "nearr;": [8599], "nedot;": [8784, 824], "nesim;": [8770, 824], "ngeqq;": [8807, 824], "ngsim;": [8821], "nhArr;": [8654], "nharr;": [8622], "nhpar;": [10994], "nlArr;": [8653], "nlarr;": [8602], "nleqq;": [8806, 824], "nless;": [8814], "nlsim;": [8820], "nltri;": [8938], "notin;": [8713], "notni;": [8716], "npart;": [8706, 824], "nprec;": [8832], "nrArr;": [8655], "nrarr;": [8603], "nrtri;": [8939], "nsime;": [8772], "nsmid;": [8740], "nspar;": [8742], "nsubE;": [10949, 824], "nsube;": [8840], "nsucc;": [8833], "nsupE;": [10950, 824], "nsupe;": [8841], "ntilde": [241], "numsp;": [8199], "nvsim;": [8764, 8402], "nwArr;": [8662], "nwarr;": [8598], "oacute": [243], "ocirc;": [244], "odash;": [8861], "oelig;": [339], "ofcir;": [10687], "ograve": [242], "ohbar;": [10677], "olarr;": [8634], "olcir;": [10686], "oline;": [8254], "omacr;": [333], "omega;": [969], "operp;": [10681], "oplus;": [8853], "orarr;": [8635], "order;": [8500], "oslash": [248], "otilde": [245], "ovbar;": [9021], "parsl;": [11005], "phone;": [9742], "plusb;": [8862], "pluse;": [10866], "plusmn": [177], "pound;": [163], "prcue;": [8828], "prime;": [8242], "prnap;": [10937], "prsim;": [8830], "quest;": [63], "rAarr;": [8667], "rBarr;": [10511], "radic;": [8730], "rangd;": [10642], "range;": [10661], "raquo;": [187], "rarrb;": [8677], "rarrc;": [10547], "rarrw;": [8605], "ratio;": [8758], "rbarr;": [10509], "rbbrk;": [10099], "rbrke;": [10636], "rceil;": [8969], "rdquo;": [8221], "reals;": [8477], "rhard;": [8641], "rharu;": [8640], "rlarr;": [8644], "rlhar;": [8652], "rnmid;": [10990], "roang;": [10221], "roarr;": [8702], "robrk;": [10215], "ropar;": [10630], "rrarr;": [8649], "rsquo;": [8217], "rtrie;": [8885], "rtrif;": [9656], "sbquo;": [8218], "sccue;": [8829], "scirc;": [349], "scnap;": [10938], "scsim;": [8831], "sdotb;": [8865], "sdote;": [10854], "seArr;": [8664], "searr;": [8600], "setmn;": [8726], "sharp;": [9839], "sigma;": [963], "simeq;": [8771], "simgE;": [10912], "simlE;": [10911], "simne;": [8774], "slarr;": [8592], "smile;": [8995], "smtes;": [10924, 65024], "sqcap;": [8851], "sqcup;": [8852], "sqsub;": [8847], "sqsup;": [8848], "srarr;": [8594], "starf;": [9733], "strns;": [175], "subnE;": [10955], "subne;": [8842], "supnE;": [10956], "supne;": [8843], "swArr;": [8665], "swarr;": [8601], "szlig;": [223], "theta;": [952], "thkap;": [8776], "thorn;": [254], "tilde;": [732], "times;": [215], "trade;": [8482], "trisb;": [10701], "tshcy;": [1115], "twixt;": [8812], "uacute": [250], "ubrcy;": [1118], "ucirc;": [251], "udarr;": [8645], "udhar;": [10606], "ugrave": [249], "uharl;": [8639], "uharr;": [8638], "uhblk;": [9600], "ultri;": [9720], "umacr;": [363], "uogon;": [371], "uplus;": [8846], "upsih;": [978], "uring;": [367], "urtri;": [9721], "utdot;": [8944], "utrif;": [9652], "uuarr;": [8648], "vBarv;": [10985], "vDash;": [8872], "varpi;": [982], "vdash;": [8866], "veeeq;": [8794], "vltri;": [8882], "vnsub;": [8834, 8402], "vnsup;": [8835, 8402], "vprop;": [8733], "vrtri;": [8883], "wcirc;": [373], "wedge;": [8743], "xcirc;": [9711], "xdtri;": [9661], "xhArr;": [10234], "xharr;": [10231], "xlArr;": [10232], "xlarr;": [10229], "xodot;": [10752], "xrArr;": [10233], "xrarr;": [10230], "xutri;": [9651], "yacute": [253], "ycirc;": [375] } }, { "length": 5, "entities": { "AElig": [198], "Acirc": [194], "Aopf;": [120120], "Aring": [197], "Ascr;": [119964], "Auml;": [196], "Barv;": [10983], "Beta;": [914], "Bopf;": [120121], "Bscr;": [8492], "CHcy;": [1063], "COPY;": [169], "Cdot;": [266], "Copf;": [8450], "Cscr;": [119966], "DJcy;": [1026], "DScy;": [1029], "DZcy;": [1039], "Darr;": [8609], "Dopf;": [120123], "Dscr;": [119967], "Ecirc": [202], "Edot;": [278], "Eopf;": [120124], "Escr;": [8496], "Esim;": [10867], "Euml;": [203], "Fopf;": [120125], "Fscr;": [8497], "GJcy;": [1027], "Gdot;": [288], "Gopf;": [120126], "Gscr;": [119970], "Hopf;": [8461], "Hscr;": [8459], "IEcy;": [1045], "IOcy;": [1025], "Icirc": [206], "Idot;": [304], "Iopf;": [120128], "Iota;": [921], "Iscr;": [8464], "Iuml;": [207], "Jopf;": [120129], "Jscr;": [119973], "KHcy;": [1061], "KJcy;": [1036], "Kopf;": [120130], "Kscr;": [119974], "LJcy;": [1033], "Lang;": [10218], "Larr;": [8606], "Lopf;": [120131], "Lscr;": [8466], "Mopf;": [120132], "Mscr;": [8499], "NJcy;": [1034], "Nopf;": [8469], "Nscr;": [119977], "Ocirc": [212], "Oopf;": [120134], "Oscr;": [119978], "Ouml;": [214], "Popf;": [8473], "Pscr;": [119979], "QUOT;": [34], "Qopf;": [8474], "Qscr;": [119980], "Rang;": [10219], "Rarr;": [8608], "Ropf;": [8477], "Rscr;": [8475], "SHcy;": [1064], "Sopf;": [120138], "Sqrt;": [8730], "Sscr;": [119982], "Star;": [8902], "THORN": [222], "TScy;": [1062], "Topf;": [120139], "Tscr;": [119983], "Uarr;": [8607], "Ucirc": [219], "Uopf;": [120140], "Upsi;": [978], "Uscr;": [119984], "Uuml;": [220], "Vbar;": [10987], "Vert;": [8214], "Vopf;": [120141], "Vscr;": [119985], "Wopf;": [120142], "Wscr;": [119986], "Xopf;": [120143], "Xscr;": [119987], "YAcy;": [1071], "YIcy;": [1031], "YUcy;": [1070], "Yopf;": [120144], "Yscr;": [119988], "Yuml;": [376], "ZHcy;": [1046], "Zdot;": [379], "Zeta;": [918], "Zopf;": [8484], "Zscr;": [119989], "acirc": [226], "acute": [180], "aelig": [230], "andd;": [10844], "andv;": [10842], "ange;": [10660], "aopf;": [120146], "apid;": [8779], "apos;": [39], "aring": [229], "ascr;": [119990], "auml;": [228], "bNot;": [10989], "bbrk;": [9141], "beta;": [946], "beth;": [8502], "bnot;": [8976], "bopf;": [120147], "boxH;": [9552], "boxV;": [9553], "boxh;": [9472], "boxv;": [9474], "bscr;": [119991], "bsim;": [8765], "bsol;": [92], "bull;": [8226], "bump;": [8782], "caps;": [8745, 65024], "cdot;": [267], "cedil": [184], "cent;": [162], "chcy;": [1095], "cirE;": [10691], "circ;": [710], "cire;": [8791], "comp;": [8705], "cong;": [8773], "copf;": [120148], "copy;": [169], "cscr;": [119992], "csub;": [10959], "csup;": [10960], "cups;": [8746, 65024], "dArr;": [8659], "dHar;": [10597], "darr;": [8595], "dash;": [8208], "diam;": [8900], "djcy;": [1106], "dopf;": [120149], "dscr;": [119993], "dscy;": [1109], "dsol;": [10742], "dtri;": [9663], "dzcy;": [1119], "eDot;": [8785], "ecir;": [8790], "ecirc": [234], "edot;": [279], "emsp;": [8195], "ensp;": [8194], "eopf;": [120150], "epar;": [8917], "epsi;": [949], "escr;": [8495], "esim;": [8770], "euml;": [235], "euro;": [8364], "excl;": [33], "flat;": [9837], "fnof;": [402], "fopf;": [120151], "fork;": [8916], "fscr;": [119995], "gdot;": [289], "geqq;": [8807], "gesl;": [8923, 65024], "gjcy;": [1107], "gnap;": [10890], "gneq;": [10888], "gopf;": [120152], "gscr;": [8458], "gsim;": [8819], "gtcc;": [10919], "gvnE;": [8809, 65024], "hArr;": [8660], "half;": [189], "harr;": [8596], "hbar;": [8463], "hopf;": [120153], "hscr;": [119997], "icirc": [238], "iecy;": [1077], "iexcl": [161], "imof;": [8887], "iocy;": [1105], "iopf;": [120154], "iota;": [953], "iscr;": [119998], "isin;": [8712], "iuml;": [239], "jopf;": [120155], "jscr;": [119999], "khcy;": [1093], "kjcy;": [1116], "kopf;": [120156], "kscr;": [120000], "lArr;": [8656], "lHar;": [10594], "lang;": [10216], "laquo": [171], "larr;": [8592], "late;": [10925], "lcub;": [123], "ldca;": [10550], "ldsh;": [8626], "leqq;": [8806], "lesg;": [8922, 65024], "ljcy;": [1113], "lnap;": [10889], "lneq;": [10887], "lopf;": [120157], "lozf;": [10731], "lpar;": [40], "lscr;": [120001], "lsim;": [8818], "lsqb;": [91], "ltcc;": [10918], "ltri;": [9667], "lvnE;": [8808, 65024], "macr;": [175], "male;": [9794], "malt;": [10016], "micro": [181], "mlcp;": [10971], "mldr;": [8230], "mopf;": [120158], "mscr;": [120002], "nGtv;": [8811, 824], "nLtv;": [8810, 824], "nang;": [8736, 8402], "napE;": [10864, 824], "nbsp;": [160], "ncap;": [10819], "ncup;": [10818], "ngeq;": [8817], "nges;": [10878, 824], "ngtr;": [8815], "nisd;": [8954], "njcy;": [1114], "nldr;": [8229], "nleq;": [8816], "nles;": [10877, 824], "nmid;": [8740], "nopf;": [120159], "npar;": [8742], "npre;": [10927, 824], "nsce;": [10928, 824], "nscr;": [120003], "nsim;": [8769], "nsub;": [8836], "nsup;": [8837], "ntgl;": [8825], "ntlg;": [8824], "nvap;": [8781, 8402], "nvge;": [8805, 8402], "nvgt;": [62, 8402], "nvle;": [8804, 8402], "nvlt;": [60, 8402], "oast;": [8859], "ocir;": [8858], "ocirc": [244], "odiv;": [10808], "odot;": [8857], "ogon;": [731], "oint;": [8750], "omid;": [10678], "oopf;": [120160], "opar;": [10679], "ordf;": [170], "ordm;": [186], "oror;": [10838], "oscr;": [8500], "osol;": [8856], "ouml;": [246], "para;": [182], "part;": [8706], "perp;": [8869], "phiv;": [981], "plus;": [43], "popf;": [120161], "pound": [163], "prap;": [10935], "prec;": [8826], "prnE;": [10933], "prod;": [8719], "prop;": [8733], "pscr;": [120005], "qint;": [10764], "qopf;": [120162], "qscr;": [120006], "quot;": [34], "rArr;": [8658], "rHar;": [10596], "race;": [8765, 817], "rang;": [10217], "raquo": [187], "rarr;": [8594], "rcub;": [125], "rdca;": [10551], "rdsh;": [8627], "real;": [8476], "rect;": [9645], "rhov;": [1009], "ring;": [730], "ropf;": [120163], "rpar;": [41], "rscr;": [120007], "rsqb;": [93], "rtri;": [9657], "scap;": [10936], "scnE;": [10934], "sdot;": [8901], "sect;": [167], "semi;": [59], "sext;": [10038], "shcy;": [1096], "sime;": [8771], "simg;": [10910], "siml;": [10909], "smid;": [8739], "smte;": [10924], "solb;": [10692], "sopf;": [120164], "spar;": [8741], "squf;": [9642], "sscr;": [120008], "star;": [9734], "subE;": [10949], "sube;": [8838], "succ;": [8827], "sung;": [9834], "sup1;": [185], "sup2;": [178], "sup3;": [179], "supE;": [10950], "supe;": [8839], "szlig": [223], "tbrk;": [9140], "tdot;": [8411], "thorn": [254], "times": [215], "tint;": [8749], "toea;": [10536], "topf;": [120165], "tosa;": [10537], "trie;": [8796], "tscr;": [120009], "tscy;": [1094], "uArr;": [8657], "uHar;": [10595], "uarr;": [8593], "ucirc": [251], "uopf;": [120166], "upsi;": [965], "uscr;": [120010], "utri;": [9653], "uuml;": [252], "vArr;": [8661], "vBar;": [10984], "varr;": [8597], "vert;": [124], "vopf;": [120167], "vscr;": [120011], "wopf;": [120168], "wscr;": [120012], "xcap;": [8898], "xcup;": [8899], "xmap;": [10236], "xnis;": [8955], "xopf;": [120169], "xscr;": [120013], "xvee;": [8897], "yacy;": [1103], "yicy;": [1111], "yopf;": [120170], "yscr;": [120014], "yucy;": [1102], "yuml;": [255], "zdot;": [380], "zeta;": [950], "zhcy;": [1078], "zopf;": [120171], "zscr;": [120015], "zwnj;": [8204] } }, { "length": 4, "entities": { "AMP;": [38], "Acy;": [1040], "Afr;": [120068], "And;": [10835], "Auml": [196], "Bcy;": [1041], "Bfr;": [120069], "COPY": [169], "Cap;": [8914], "Cfr;": [8493], "Chi;": [935], "Cup;": [8915], "Dcy;": [1044], "Del;": [8711], "Dfr;": [120071], "Dot;": [168], "ENG;": [330], "ETH;": [208], "Ecy;": [1069], "Efr;": [120072], "Eta;": [919], "Euml": [203], "Fcy;": [1060], "Ffr;": [120073], "Gcy;": [1043], "Gfr;": [120074], "Hat;": [94], "Hfr;": [8460], "Icy;": [1048], "Ifr;": [8465], "Int;": [8748], "Iuml": [207], "Jcy;": [1049], "Jfr;": [120077], "Kcy;": [1050], "Kfr;": [120078], "Lcy;": [1051], "Lfr;": [120079], "Lsh;": [8624], "Map;": [10501], "Mcy;": [1052], "Mfr;": [120080], "Ncy;": [1053], "Nfr;": [120081], "Not;": [10988], "Ocy;": [1054], "Ofr;": [120082], "Ouml": [214], "Pcy;": [1055], "Pfr;": [120083], "Phi;": [934], "Psi;": [936], "QUOT": [34], "Qfr;": [120084], "REG;": [174], "Rcy;": [1056], "Rfr;": [8476], "Rho;": [929], "Rsh;": [8625], "Scy;": [1057], "Sfr;": [120086], "Sub;": [8912], "Sum;": [8721], "Sup;": [8913], "Tab;": [9], "Tau;": [932], "Tcy;": [1058], "Tfr;": [120087], "Ucy;": [1059], "Ufr;": [120088], "Uuml": [220], "Vcy;": [1042], "Vee;": [8897], "Vfr;": [120089], "Wfr;": [120090], "Xfr;": [120091], "Ycy;": [1067], "Yfr;": [120092], "Zcy;": [1047], "Zfr;": [8488], "acE;": [8766, 819], "acd;": [8767], "acy;": [1072], "afr;": [120094], "amp;": [38], "and;": [8743], "ang;": [8736], "apE;": [10864], "ape;": [8778], "ast;": [42], "auml": [228], "bcy;": [1073], "bfr;": [120095], "bne;": [61, 8421], "bot;": [8869], "cap;": [8745], "cent": [162], "cfr;": [120096], "chi;": [967], "cir;": [9675], "copy": [169], "cup;": [8746], "dcy;": [1076], "deg;": [176], "dfr;": [120097], "die;": [168], "div;": [247], "dot;": [729], "ecy;": [1101], "efr;": [120098], "egs;": [10902], "ell;": [8467], "els;": [10901], "eng;": [331], "eta;": [951], "eth;": [240], "euml": [235], "fcy;": [1092], "ffr;": [120099], "gEl;": [10892], "gap;": [10886], "gcy;": [1075], "gel;": [8923], "geq;": [8805], "ges;": [10878], "gfr;": [120100], "ggg;": [8921], "glE;": [10898], "gla;": [10917], "glj;": [10916], "gnE;": [8809], "gne;": [10888], "hfr;": [120101], "icy;": [1080], "iff;": [8660], "ifr;": [120102], "int;": [8747], "iuml": [239], "jcy;": [1081], "jfr;": [120103], "kcy;": [1082], "kfr;": [120104], "lEg;": [10891], "lap;": [10885], "lat;": [10923], "lcy;": [1083], "leg;": [8922], "leq;": [8804], "les;": [10877], "lfr;": [120105], "lgE;": [10897], "lnE;": [8808], "lne;": [10887], "loz;": [9674], "lrm;": [8206], "lsh;": [8624], "macr": [175], "map;": [8614], "mcy;": [1084], "mfr;": [120106], "mho;": [8487], "mid;": [8739], "nGg;": [8921, 824], "nGt;": [8811, 8402], "nLl;": [8920, 824], "nLt;": [8810, 8402], "nap;": [8777], "nbsp": [160], "ncy;": [1085], "nfr;": [120107], "ngE;": [8807, 824], "nge;": [8817], "ngt;": [8815], "nis;": [8956], "niv;": [8715], "nlE;": [8806, 824], "nle;": [8816], "nlt;": [8814], "not;": [172], "npr;": [8832], "nsc;": [8833], "num;": [35], "ocy;": [1086], "ofr;": [120108], "ogt;": [10689], "ohm;": [937], "olt;": [10688], "ord;": [10845], "ordf": [170], "ordm": [186], "orv;": [10843], "ouml": [246], "par;": [8741], "para": [182], "pcy;": [1087], "pfr;": [120109], "phi;": [966], "piv;": [982], "prE;": [10931], "pre;": [10927], "psi;": [968], "qfr;": [120110], "quot": [34], "rcy;": [1088], "reg;": [174], "rfr;": [120111], "rho;": [961], "rlm;": [8207], "rsh;": [8625], "scE;": [10932], "sce;": [10928], "scy;": [1089], "sect": [167], "sfr;": [120112], "shy;": [173], "sim;": [8764], "smt;": [10922], "sol;": [47], "squ;": [9633], "sub;": [8834], "sum;": [8721], "sup1": [185], "sup2": [178], "sup3": [179], "sup;": [8835], "tau;": [964], "tcy;": [1090], "tfr;": [120113], "top;": [8868], "ucy;": [1091], "ufr;": [120114], "uml;": [168], "uuml": [252], "vcy;": [1074], "vee;": [8744], "vfr;": [120115], "wfr;": [120116], "xfr;": [120117], "ycy;": [1099], "yen;": [165], "yfr;": [120118], "yuml": [255], "zcy;": [1079], "zfr;": [120119], "zwj;": [8205] } }, { "length": 3, "entities": { "AMP": [38], "DD;": [8517], "ETH": [208], "GT;": [62], "Gg;": [8921], "Gt;": [8811], "Im;": [8465], "LT;": [60], "Ll;": [8920], "Lt;": [8810], "Mu;": [924], "Nu;": [925], "Or;": [10836], "Pi;": [928], "Pr;": [10939], "REG": [174], "Re;": [8476], "Sc;": [10940], "Xi;": [926], "ac;": [8766], "af;": [8289], "amp": [38], "ap;": [8776], "dd;": [8518], "deg": [176], "ee;": [8519], "eg;": [10906], "el;": [10905], "eth": [240], "gE;": [8807], "ge;": [8805], "gg;": [8811], "gl;": [8823], "gt;": [62], "ic;": [8291], "ii;": [8520], "in;": [8712], "it;": [8290], "lE;": [8806], "le;": [8804], "lg;": [8822], "ll;": [8810], "lt;": [60], "mp;": [8723], "mu;": [956], "ne;": [8800], "ni;": [8715], "not": [172], "nu;": [957], "oS;": [9416], "or;": [8744], "pi;": [960], "pm;": [177], "pr;": [8826], "reg": [174], "rx;": [8478], "sc;": [8827], "shy": [173], "uml": [168], "wp;": [8472], "wr;": [8768], "xi;": [958], "yen": [165] } }, { "length": 2, "entities": { "GT": [62], "LT": [60], "gt": [62], "lt": [60] } }];

const EOF = -1;
const NULL = 0x00;
const TABULATION = 0x09;
const CARRIAGE_RETURN = 0x0D;
const LINE_FEED = 0x0A;
const FORM_FEED = 0x0C;
const SPACE = 0x20;
const EXCLAMATION_MARK = 0x21;
const QUOTATION_MARK = 0x22;
const NUMBER_SIGN = 0x23;
const AMPERSAND = 0x26;
const APOSTROPHE = 0x27;
const HYPHEN_MINUS = 0x2D;
const SOLIDUS = 0x2F;
const DIGIT_0 = 0x30;
const DIGIT_9 = 0x39;
const SEMICOLON = 0x3B;
const LESS_THAN_SIGN = 0x3C;
const EQUALS_SIGN = 0x3D;
const GREATER_THAN_SIGN = 0x3E;
const QUESTION_MARK = 0x3F;
const LATIN_CAPITAL_A = 0x41;
const LATIN_CAPITAL_D = 0x44;
const LATIN_CAPITAL_F = 0x46;
const LATIN_CAPITAL_X = 0x58;
const LATIN_CAPITAL_Z = 0x5A;
const LEFT_SQUARE_BRACKET = 0x5B;
const RIGHT_SQUARE_BRACKET = 0x5D;
const GRAVE_ACCENT = 0x60;
const LATIN_SMALL_A = 0x61;
const LATIN_SMALL_F = 0x66;
const LATIN_SMALL_X = 0x78;
const LATIN_SMALL_Z = 0x7A;
const LEFT_CURLY_BRACKET = 0x7B;
const RIGHT_CURLY_BRACKET = 0x7D;
const NULL_REPLACEMENT = 0xFFFD;
function isWhitespace(cp) {
    return cp === TABULATION || cp === LINE_FEED || cp === FORM_FEED || cp === CARRIAGE_RETURN || cp === SPACE;
}
function isUpperLetter(cp) {
    return cp >= LATIN_CAPITAL_A && cp <= LATIN_CAPITAL_Z;
}
function isLowerLetter(cp) {
    return cp >= LATIN_SMALL_A && cp <= LATIN_SMALL_Z;
}
function isLetter(cp) {
    return isLowerLetter(cp) || isUpperLetter(cp);
}
function isDigit(cp) {
    return cp >= DIGIT_0 && cp <= DIGIT_9;
}
function isUpperHexDigit(cp) {
    return cp >= LATIN_CAPITAL_A && cp <= LATIN_CAPITAL_F;
}
function isLowerHexDigit(cp) {
    return cp >= LATIN_SMALL_A && cp <= LATIN_SMALL_F;
}
function isHexDigit(cp) {
    return isDigit(cp) || isUpperHexDigit(cp) || isLowerHexDigit(cp);
}
function isControl(cp) {
    return (cp >= 0 && cp <= 0x1F) || (cp >= 0x7F && cp <= 0x9F);
}
function isSurrogate(cp) {
    return cp >= 0xD800 && cp <= 0xDFFF;
}
function isSurrogatePair(cp) {
    return cp >= 0xDC00 && cp <= 0xDFFF;
}
function isNonCharacter(cp) {
    return ((cp >= 0xFDD0 && cp <= 0xFDEF) ||
        ((cp & 0xFFFE) === 0xFFFE && cp <= 0x10FFFF));
}
function toLowerCodePoint(cp) {
    return cp + 0x0020;
}

class Tokenizer {
    constructor(text) {
        debug("[html] the source code length: %d", text.length);
        this.text = text;
        this.gaps = [];
        this.lineTerminators = [];
        this.lastCodePoint = NULL;
        this.offset = -1;
        this.column = -1;
        this.line = 1;
        this.state = "DATA";
        this.returnState = "DATA";
        this.reconsuming = false;
        this.buffer = [];
        this.crStartOffset = -1;
        this.crCode = 0;
        this.errors = [];
        this.committedToken = null;
        this.provisionalToken = null;
        this.currentToken = null;
        this.lastTagOpenToken = null;
        this.tokenStartOffset = -1;
        this.tokenStartColumn = -1;
        this.tokenStartLine = 1;
        this.namespace = NS.HTML;
        this.expressionEnabled = false;
    }
    nextToken() {
        let cp = this.lastCodePoint;
        while (this.committedToken == null &&
            (cp !== EOF || this.reconsuming)) {
            if (this.provisionalToken != null && !this.isProvisionalState()) {
                this.commitProvisionalToken();
                if (this.committedToken != null) {
                    break;
                }
            }
            if (this.reconsuming) {
                this.reconsuming = false;
                cp = this.lastCodePoint;
            }
            else {
                cp = this.consumeNextCodePoint();
            }
            debug("[html] parse", cp, this.state);
            this.state = this[this.state](cp);
        }
        {
            const token = this.consumeCommittedToken();
            if (token != null) {
                return token;
            }
        }
        assert(cp === EOF);
        if (this.currentToken != null) {
            this.endToken();
            const token = this.consumeCommittedToken();
            if (token != null) {
                return token;
            }
        }
        return this.currentToken;
    }
    consumeCommittedToken() {
        const token = this.committedToken;
        this.committedToken = null;
        return token;
    }
    consumeNextCodePoint() {
        if (this.offset >= this.text.length) {
            this.lastCodePoint = EOF;
            return EOF;
        }
        this.offset += this.lastCodePoint >= 0x10000 ? 2 : 1;
        if (this.offset >= this.text.length) {
            this.advanceLocation();
            this.lastCodePoint = EOF;
            return EOF;
        }
        const cp = this.text.codePointAt(this.offset);
        if (isSurrogate(this.text.charCodeAt(this.offset)) &&
            !isSurrogatePair(this.text.charCodeAt(this.offset + 1))) {
            this.reportParseError("surrogate-in-input-stream");
        }
        if (isNonCharacter(cp)) {
            this.reportParseError("noncharacter-in-input-stream");
        }
        if (isControl(cp) && !isWhitespace(cp) && cp !== NULL) {
            this.reportParseError("control-character-in-input-stream");
        }
        if (this.lastCodePoint === CARRIAGE_RETURN && cp === LINE_FEED) {
            this.lastCodePoint = LINE_FEED;
            this.gaps.push(this.offset);
            return this.consumeNextCodePoint();
        }
        this.advanceLocation();
        this.lastCodePoint = cp;
        if (cp === CARRIAGE_RETURN) {
            return LINE_FEED;
        }
        return cp;
    }
    advanceLocation() {
        if (this.lastCodePoint === LINE_FEED) {
            this.lineTerminators.push(this.offset);
            this.line += 1;
            this.column = 0;
        }
        else {
            this.column += this.lastCodePoint >= 0x10000 ? 2 : 1;
        }
    }
    reconsumeAs(state) {
        this.reconsuming = true;
        return state;
    }
    reportParseError(code) {
        const error = ParseError.fromCode(code, this.offset, this.line, this.column);
        this.errors.push(error);
        debug("[html] syntax error:", error.message);
    }
    setStartTokenMark() {
        this.tokenStartOffset = this.offset;
        this.tokenStartLine = this.line;
        this.tokenStartColumn = this.column;
    }
    clearStartTokenMark() {
        this.tokenStartOffset = -1;
    }
    startToken(type) {
        if (this.tokenStartOffset === -1) {
            this.setStartTokenMark();
        }
        const offset = this.tokenStartOffset;
        const line = this.tokenStartLine;
        const column = this.tokenStartColumn;
        if (this.currentToken != null) {
            this.endToken();
        }
        this.tokenStartOffset = -1;
        const token = (this.currentToken = {
            type,
            range: [offset, -1],
            loc: {
                start: { line, column },
                end: { line: -1, column: -1 },
            },
            value: "",
        });
        debug("[html] start token: %d %s", offset, token.type);
        return this.currentToken;
    }
    endToken() {
        if (this.currentToken == null) {
            throw new Error("Invalid state");
        }
        if (this.tokenStartOffset === -1) {
            this.setStartTokenMark();
        }
        const token = this.currentToken;
        const offset = this.tokenStartOffset;
        const line = this.tokenStartLine;
        const column = this.tokenStartColumn;
        const provisional = this.isProvisionalState();
        this.currentToken = null;
        this.tokenStartOffset = -1;
        token.range[1] = offset;
        token.loc.end.line = line;
        token.loc.end.column = column;
        if (token.range[0] === offset && !provisional) {
            debug("[html] abandon token: %j %s %j", token.range, token.type, token.value);
            return null;
        }
        if (provisional) {
            if (this.provisionalToken != null) {
                this.commitProvisionalToken();
            }
            this.provisionalToken = token;
            debug("[html] provisional-commit token: %j %s %j", token.range, token.type, token.value);
        }
        else {
            this.commitToken(token);
        }
        return token;
    }
    commitToken(token) {
        assert(this.committedToken == null, "Invalid state: the commited token existed already.");
        debug("[html] commit token: %j %j %s %j", token.range, token.loc, token.type, token.value);
        this.committedToken = token;
        if (token.type === "HTMLTagOpen") {
            this.lastTagOpenToken = token;
        }
    }
    isProvisionalState() {
        return (this.state.startsWith("RCDATA_") ||
            this.state.startsWith("RAWTEXT_"));
    }
    commitProvisionalToken() {
        assert(this.provisionalToken != null, "Invalid state: the provisional token was not found.");
        const token = this.provisionalToken;
        this.provisionalToken = null;
        if (token.range[0] < token.range[1]) {
            this.commitToken(token);
        }
    }
    rollbackProvisionalToken() {
        assert(this.currentToken != null);
        assert(this.provisionalToken != null);
        const token = this.currentToken;
        debug("[html] rollback token: %d %s", token.range[0], token.type);
        this.currentToken = this.provisionalToken;
        this.provisionalToken = null;
    }
    appendTokenValue(cp, expected) {
        const token = this.currentToken;
        if (token == null || (expected != null && token.type !== expected)) {
            const msg1 = expected ? `"${expected}" type` : "any token";
            const msg2 = token ? `"${token.type}" type` : "no token";
            throw new Error(`Tokenizer: Invalid state. Expected ${msg1}, but got ${msg2}.`);
        }
        token.value += String.fromCodePoint(cp);
    }
    isAppropriateEndTagOpen() {
        return (this.currentToken != null &&
            this.lastTagOpenToken != null &&
            this.currentToken.type === "HTMLEndTagOpen" &&
            this.currentToken.value === this.lastTagOpenToken.value);
    }
    DATA(cp) {
        this.clearStartTokenMark();
        while (true) {
            const type = isWhitespace(cp) ? "HTMLWhitespace" : "HTMLText";
            if (this.currentToken != null && this.currentToken.type !== type) {
                this.endToken();
                return this.reconsumeAs(this.state);
            }
            if (this.currentToken == null) {
                this.startToken(type);
            }
            if (cp === AMPERSAND) {
                this.returnState = "DATA";
                return "CHARACTER_REFERENCE";
            }
            if (cp === LESS_THAN_SIGN) {
                this.setStartTokenMark();
                return "TAG_OPEN";
            }
            if (cp === LEFT_CURLY_BRACKET && this.expressionEnabled) {
                this.setStartTokenMark();
                this.returnState = "DATA";
                return "V_EXPRESSION_START";
            }
            if (cp === RIGHT_CURLY_BRACKET && this.expressionEnabled) {
                this.setStartTokenMark();
                this.returnState = "DATA";
                return "V_EXPRESSION_END";
            }
            if (cp === EOF) {
                return "DATA";
            }
            if (cp === NULL) {
                this.reportParseError("unexpected-null-character");
            }
            this.appendTokenValue(cp, type);
            cp = this.consumeNextCodePoint();
        }
    }
    RCDATA(cp) {
        this.clearStartTokenMark();
        while (true) {
            const type = isWhitespace(cp) ? "HTMLWhitespace" : "HTMLRCDataText";
            if (this.currentToken != null && this.currentToken.type !== type) {
                this.endToken();
                return this.reconsumeAs(this.state);
            }
            if (this.currentToken == null) {
                this.startToken(type);
            }
            if (cp === AMPERSAND) {
                this.returnState = "RCDATA";
                return "CHARACTER_REFERENCE";
            }
            if (cp === LESS_THAN_SIGN) {
                this.setStartTokenMark();
                return "RCDATA_LESS_THAN_SIGN";
            }
            if (cp === LEFT_CURLY_BRACKET && this.expressionEnabled) {
                this.setStartTokenMark();
                this.returnState = "RCDATA";
                return "V_EXPRESSION_START";
            }
            if (cp === RIGHT_CURLY_BRACKET && this.expressionEnabled) {
                this.setStartTokenMark();
                this.returnState = "RCDATA";
                return "V_EXPRESSION_END";
            }
            if (cp === EOF) {
                return "DATA";
            }
            if (cp === NULL) {
                this.reportParseError("unexpected-null-character");
                cp = NULL_REPLACEMENT;
            }
            this.appendTokenValue(cp, type);
            cp = this.consumeNextCodePoint();
        }
    }
    RAWTEXT(cp) {
        this.clearStartTokenMark();
        while (true) {
            const type = isWhitespace(cp) ? "HTMLWhitespace" : "HTMLRawText";
            if (this.currentToken != null && this.currentToken.type !== type) {
                this.endToken();
                return this.reconsumeAs(this.state);
            }
            if (this.currentToken == null) {
                this.startToken(type);
            }
            if (cp === LESS_THAN_SIGN) {
                this.setStartTokenMark();
                return "RAWTEXT_LESS_THAN_SIGN";
            }
            if (cp === LEFT_CURLY_BRACKET && this.expressionEnabled) {
                this.setStartTokenMark();
                this.returnState = "RAWTEXT";
                return "V_EXPRESSION_START";
            }
            if (cp === RIGHT_CURLY_BRACKET && this.expressionEnabled) {
                this.setStartTokenMark();
                this.returnState = "RAWTEXT";
                return "V_EXPRESSION_END";
            }
            if (cp === EOF) {
                return "DATA";
            }
            if (cp === NULL) {
                this.reportParseError("unexpected-null-character");
                cp = NULL_REPLACEMENT;
            }
            this.appendTokenValue(cp, type);
            cp = this.consumeNextCodePoint();
        }
    }
    TAG_OPEN(cp) {
        if (cp === EXCLAMATION_MARK) {
            return "MARKUP_DECLARATION_OPEN";
        }
        if (cp === SOLIDUS) {
            return "END_TAG_OPEN";
        }
        if (isLetter(cp)) {
            this.startToken("HTMLTagOpen");
            return this.reconsumeAs("TAG_NAME");
        }
        if (cp === QUESTION_MARK) {
            this.reportParseError("unexpected-question-mark-instead-of-tag-name");
            this.startToken("HTMLBogusComment");
            return this.reconsumeAs("BOGUS_COMMENT");
        }
        if (cp === EOF) {
            this.clearStartTokenMark();
            this.reportParseError("eof-before-tag-name");
            this.appendTokenValue(LESS_THAN_SIGN, "HTMLText");
            return "DATA";
        }
        this.reportParseError("invalid-first-character-of-tag-name");
        this.appendTokenValue(LESS_THAN_SIGN, "HTMLText");
        return this.reconsumeAs("DATA");
    }
    END_TAG_OPEN(cp) {
        if (isLetter(cp)) {
            this.startToken("HTMLEndTagOpen");
            return this.reconsumeAs("TAG_NAME");
        }
        if (cp === GREATER_THAN_SIGN) {
            this.endToken();
            this.reportParseError("missing-end-tag-name");
            return "DATA";
        }
        if (cp === EOF) {
            this.clearStartTokenMark();
            this.reportParseError("eof-before-tag-name");
            this.appendTokenValue(LESS_THAN_SIGN, "HTMLText");
            this.appendTokenValue(SOLIDUS, "HTMLText");
            return "DATA";
        }
        this.reportParseError("invalid-first-character-of-tag-name");
        this.startToken("HTMLBogusComment");
        return this.reconsumeAs("BOGUS_COMMENT");
    }
    TAG_NAME(cp) {
        while (true) {
            if (isWhitespace(cp)) {
                this.endToken();
                return "BEFORE_ATTRIBUTE_NAME";
            }
            if (cp === SOLIDUS) {
                this.endToken();
                this.setStartTokenMark();
                return "SELF_CLOSING_START_TAG";
            }
            if (cp === GREATER_THAN_SIGN) {
                this.startToken("HTMLTagClose");
                return "DATA";
            }
            if (cp === EOF) {
                this.reportParseError("eof-in-tag");
                return "DATA";
            }
            if (cp === NULL) {
                this.reportParseError("unexpected-null-character");
                cp = NULL_REPLACEMENT;
            }
            this.appendTokenValue(isUpperLetter(cp) ? toLowerCodePoint(cp) : cp, null);
            cp = this.consumeNextCodePoint();
        }
    }
    RCDATA_LESS_THAN_SIGN(cp) {
        if (cp === SOLIDUS) {
            this.buffer = [];
            return "RCDATA_END_TAG_OPEN";
        }
        this.appendTokenValue(LESS_THAN_SIGN, "HTMLRCDataText");
        return this.reconsumeAs("RCDATA");
    }
    RCDATA_END_TAG_OPEN(cp) {
        if (isLetter(cp)) {
            this.startToken("HTMLEndTagOpen");
            return this.reconsumeAs("RCDATA_END_TAG_NAME");
        }
        this.appendTokenValue(LESS_THAN_SIGN, "HTMLRCDataText");
        this.appendTokenValue(SOLIDUS, "HTMLRCDataText");
        return this.reconsumeAs("RCDATA");
    }
    RCDATA_END_TAG_NAME(cp) {
        while (true) {
            if (isWhitespace(cp) && this.isAppropriateEndTagOpen()) {
                this.endToken();
                return "BEFORE_ATTRIBUTE_NAME";
            }
            if (cp === SOLIDUS && this.isAppropriateEndTagOpen()) {
                this.endToken();
                this.setStartTokenMark();
                return "SELF_CLOSING_START_TAG";
            }
            if (cp === GREATER_THAN_SIGN && this.isAppropriateEndTagOpen()) {
                this.startToken("HTMLTagClose");
                return "DATA";
            }
            if (!isLetter(cp)) {
                this.rollbackProvisionalToken();
                this.appendTokenValue(LESS_THAN_SIGN, "HTMLRCDataText");
                this.appendTokenValue(SOLIDUS, "HTMLRCDataText");
                for (const cp1 of this.buffer) {
                    this.appendTokenValue(cp1, "HTMLRCDataText");
                }
                return this.reconsumeAs("RCDATA");
            }
            this.appendTokenValue(isUpperLetter(cp) ? toLowerCodePoint(cp) : cp, "HTMLEndTagOpen");
            this.buffer.push(cp);
            cp = this.consumeNextCodePoint();
        }
    }
    RAWTEXT_LESS_THAN_SIGN(cp) {
        if (cp === SOLIDUS) {
            this.buffer = [];
            return "RAWTEXT_END_TAG_OPEN";
        }
        this.appendTokenValue(LESS_THAN_SIGN, "HTMLRawText");
        return this.reconsumeAs("RAWTEXT");
    }
    RAWTEXT_END_TAG_OPEN(cp) {
        if (isLetter(cp)) {
            this.startToken("HTMLEndTagOpen");
            return this.reconsumeAs("RAWTEXT_END_TAG_NAME");
        }
        this.appendTokenValue(LESS_THAN_SIGN, "HTMLRawText");
        this.appendTokenValue(SOLIDUS, "HTMLRawText");
        return this.reconsumeAs("RAWTEXT");
    }
    RAWTEXT_END_TAG_NAME(cp) {
        while (true) {
            if (cp === SOLIDUS && this.isAppropriateEndTagOpen()) {
                this.endToken();
                this.setStartTokenMark();
                return "SELF_CLOSING_START_TAG";
            }
            if (cp === GREATER_THAN_SIGN && this.isAppropriateEndTagOpen()) {
                this.startToken("HTMLTagClose");
                return "DATA";
            }
            if (isWhitespace(cp) && this.isAppropriateEndTagOpen()) {
                this.endToken();
                return "BEFORE_ATTRIBUTE_NAME";
            }
            if (!isLetter(cp)) {
                this.rollbackProvisionalToken();
                this.appendTokenValue(LESS_THAN_SIGN, "HTMLRawText");
                this.appendTokenValue(SOLIDUS, "HTMLRawText");
                for (const cp1 of this.buffer) {
                    this.appendTokenValue(cp1, "HTMLRawText");
                }
                return this.reconsumeAs("RAWTEXT");
            }
            this.appendTokenValue(isUpperLetter(cp) ? toLowerCodePoint(cp) : cp, "HTMLEndTagOpen");
            this.buffer.push(cp);
            cp = this.consumeNextCodePoint();
        }
    }
    BEFORE_ATTRIBUTE_NAME(cp) {
        while (isWhitespace(cp)) {
            cp = this.consumeNextCodePoint();
        }
        if (cp === SOLIDUS || cp === GREATER_THAN_SIGN || cp === EOF) {
            return this.reconsumeAs("AFTER_ATTRIBUTE_NAME");
        }
        if (cp === EQUALS_SIGN) {
            this.reportParseError("unexpected-equals-sign-before-attribute-name");
            this.startToken("HTMLIdentifier");
            this.appendTokenValue(cp, "HTMLIdentifier");
            return "ATTRIBUTE_NAME";
        }
        this.startToken("HTMLIdentifier");
        return this.reconsumeAs("ATTRIBUTE_NAME");
    }
    ATTRIBUTE_NAME(cp) {
        while (true) {
            if (isWhitespace(cp) ||
                cp === SOLIDUS ||
                cp === GREATER_THAN_SIGN ||
                cp === EOF) {
                this.endToken();
                return this.reconsumeAs("AFTER_ATTRIBUTE_NAME");
            }
            if (cp === EQUALS_SIGN) {
                this.startToken("HTMLAssociation");
                return "BEFORE_ATTRIBUTE_VALUE";
            }
            if (cp === NULL) {
                this.reportParseError("unexpected-null-character");
                cp = NULL_REPLACEMENT;
            }
            if (cp === QUOTATION_MARK ||
                cp === APOSTROPHE ||
                cp === LESS_THAN_SIGN) {
                this.reportParseError("unexpected-character-in-attribute-name");
            }
            this.appendTokenValue(isUpperLetter(cp) ? toLowerCodePoint(cp) : cp, "HTMLIdentifier");
            cp = this.consumeNextCodePoint();
        }
    }
    AFTER_ATTRIBUTE_NAME(cp) {
        while (isWhitespace(cp)) {
            cp = this.consumeNextCodePoint();
        }
        if (cp === SOLIDUS) {
            this.setStartTokenMark();
            return "SELF_CLOSING_START_TAG";
        }
        if (cp === EQUALS_SIGN) {
            this.startToken("HTMLAssociation");
            return "BEFORE_ATTRIBUTE_VALUE";
        }
        if (cp === GREATER_THAN_SIGN) {
            this.startToken("HTMLTagClose");
            return "DATA";
        }
        if (cp === EOF) {
            this.reportParseError("eof-in-tag");
            return "DATA";
        }
        this.startToken("HTMLIdentifier");
        return this.reconsumeAs("ATTRIBUTE_NAME");
    }
    BEFORE_ATTRIBUTE_VALUE(cp) {
        this.endToken();
        while (isWhitespace(cp)) {
            cp = this.consumeNextCodePoint();
        }
        if (cp === GREATER_THAN_SIGN) {
            this.reportParseError("missing-attribute-value");
            this.startToken("HTMLTagClose");
            return "DATA";
        }
        this.startToken("HTMLLiteral");
        if (cp === QUOTATION_MARK) {
            return "ATTRIBUTE_VALUE_DOUBLE_QUOTED";
        }
        if (cp === APOSTROPHE) {
            return "ATTRIBUTE_VALUE_SINGLE_QUOTED";
        }
        return this.reconsumeAs("ATTRIBUTE_VALUE_UNQUOTED");
    }
    ATTRIBUTE_VALUE_DOUBLE_QUOTED(cp) {
        while (true) {
            if (cp === QUOTATION_MARK) {
                return "AFTER_ATTRIBUTE_VALUE_QUOTED";
            }
            if (cp === AMPERSAND) {
                this.returnState = "ATTRIBUTE_VALUE_DOUBLE_QUOTED";
                return "CHARACTER_REFERENCE";
            }
            if (cp === NULL) {
                this.reportParseError("unexpected-null-character");
                cp = NULL_REPLACEMENT;
            }
            if (cp === EOF) {
                this.reportParseError("eof-in-tag");
                return "DATA";
            }
            this.appendTokenValue(cp, "HTMLLiteral");
            cp = this.consumeNextCodePoint();
        }
    }
    ATTRIBUTE_VALUE_SINGLE_QUOTED(cp) {
        while (true) {
            if (cp === APOSTROPHE) {
                return "AFTER_ATTRIBUTE_VALUE_QUOTED";
            }
            if (cp === AMPERSAND) {
                this.returnState = "ATTRIBUTE_VALUE_SINGLE_QUOTED";
                return "CHARACTER_REFERENCE";
            }
            if (cp === NULL) {
                this.reportParseError("unexpected-null-character");
                cp = NULL_REPLACEMENT;
            }
            if (cp === EOF) {
                this.reportParseError("eof-in-tag");
                return "DATA";
            }
            this.appendTokenValue(cp, "HTMLLiteral");
            cp = this.consumeNextCodePoint();
        }
    }
    ATTRIBUTE_VALUE_UNQUOTED(cp) {
        while (true) {
            if (isWhitespace(cp)) {
                this.endToken();
                return "BEFORE_ATTRIBUTE_NAME";
            }
            if (cp === AMPERSAND) {
                this.returnState = "ATTRIBUTE_VALUE_UNQUOTED";
                return "CHARACTER_REFERENCE";
            }
            if (cp === GREATER_THAN_SIGN) {
                this.startToken("HTMLTagClose");
                return "DATA";
            }
            if (cp === NULL) {
                this.reportParseError("unexpected-null-character");
                cp = NULL_REPLACEMENT;
            }
            if (cp === QUOTATION_MARK ||
                cp === APOSTROPHE ||
                cp === LESS_THAN_SIGN ||
                cp === EQUALS_SIGN ||
                cp === GRAVE_ACCENT) {
                this.reportParseError("unexpected-character-in-unquoted-attribute-value");
            }
            if (cp === EOF) {
                this.reportParseError("eof-in-tag");
                return "DATA";
            }
            this.appendTokenValue(cp, "HTMLLiteral");
            cp = this.consumeNextCodePoint();
        }
    }
    AFTER_ATTRIBUTE_VALUE_QUOTED(cp) {
        this.endToken();
        if (isWhitespace(cp)) {
            return "BEFORE_ATTRIBUTE_NAME";
        }
        if (cp === SOLIDUS) {
            this.setStartTokenMark();
            return "SELF_CLOSING_START_TAG";
        }
        if (cp === GREATER_THAN_SIGN) {
            this.startToken("HTMLTagClose");
            return "DATA";
        }
        if (cp === EOF) {
            this.reportParseError("eof-in-tag");
            return "DATA";
        }
        this.reportParseError("missing-whitespace-between-attributes");
        return this.reconsumeAs("BEFORE_ATTRIBUTE_NAME");
    }
    SELF_CLOSING_START_TAG(cp) {
        if (cp === GREATER_THAN_SIGN) {
            this.startToken("HTMLSelfClosingTagClose");
            return "DATA";
        }
        if (cp === EOF) {
            this.reportParseError("eof-in-tag");
            return "DATA";
        }
        this.reportParseError("unexpected-solidus-in-tag");
        this.clearStartTokenMark();
        return this.reconsumeAs("BEFORE_ATTRIBUTE_NAME");
    }
    BOGUS_COMMENT(cp) {
        while (true) {
            if (cp === GREATER_THAN_SIGN) {
                return "DATA";
            }
            if (cp === EOF) {
                return "DATA";
            }
            if (cp === NULL) {
                cp = NULL_REPLACEMENT;
            }
            this.appendTokenValue(cp, null);
            cp = this.consumeNextCodePoint();
        }
    }
    MARKUP_DECLARATION_OPEN(cp) {
        if (cp === HYPHEN_MINUS && this.text[this.offset + 1] === "-") {
            this.offset += 1;
            this.column += 1;
            this.startToken("HTMLComment");
            return "COMMENT_START";
        }
        if (cp === LATIN_CAPITAL_D &&
            this.text.slice(this.offset + 1, this.offset + 7) === "OCTYPE") {
            this.startToken("HTMLBogusComment");
            this.appendTokenValue(cp, "HTMLBogusComment");
            return "BOGUS_COMMENT";
        }
        if (cp === LEFT_SQUARE_BRACKET &&
            this.text.slice(this.offset + 1, this.offset + 7) === "CDATA[") {
            this.offset += 6;
            this.column += 6;
            if (this.namespace === NS.HTML) {
                this.reportParseError("cdata-in-html-content");
                this.startToken("HTMLBogusComment").value = "[CDATA[";
                return "BOGUS_COMMENT";
            }
            this.startToken("HTMLCDataText");
            return "CDATA_SECTION";
        }
        this.reportParseError("incorrectly-opened-comment");
        this.startToken("HTMLBogusComment");
        return this.reconsumeAs("BOGUS_COMMENT");
    }
    COMMENT_START(cp) {
        if (cp === HYPHEN_MINUS) {
            return "COMMENT_START_DASH";
        }
        if (cp === GREATER_THAN_SIGN) {
            this.reportParseError("abrupt-closing-of-empty-comment");
            return "DATA";
        }
        return this.reconsumeAs("COMMENT");
    }
    COMMENT_START_DASH(cp) {
        if (cp === HYPHEN_MINUS) {
            return "COMMENT_END";
        }
        if (cp === GREATER_THAN_SIGN) {
            this.reportParseError("abrupt-closing-of-empty-comment");
            return "DATA";
        }
        if (cp === EOF) {
            this.reportParseError("eof-in-comment");
            return "DATA";
        }
        this.appendTokenValue(HYPHEN_MINUS, "HTMLComment");
        return this.reconsumeAs("COMMENT");
    }
    COMMENT(cp) {
        while (true) {
            if (cp === LESS_THAN_SIGN) {
                this.appendTokenValue(LESS_THAN_SIGN, "HTMLComment");
                return "COMMENT_LESS_THAN_SIGN";
            }
            if (cp === HYPHEN_MINUS) {
                return "COMMENT_END_DASH";
            }
            if (cp === NULL) {
                this.reportParseError("unexpected-null-character");
                cp = NULL_REPLACEMENT;
            }
            if (cp === EOF) {
                this.reportParseError("eof-in-comment");
                return "DATA";
            }
            this.appendTokenValue(cp, "HTMLComment");
            cp = this.consumeNextCodePoint();
        }
    }
    COMMENT_LESS_THAN_SIGN(cp) {
        while (true) {
            if (cp === EXCLAMATION_MARK) {
                this.appendTokenValue(cp, "HTMLComment");
                return "COMMENT_LESS_THAN_SIGN_BANG";
            }
            if (cp !== LESS_THAN_SIGN) {
                return this.reconsumeAs("COMMENT");
            }
            this.appendTokenValue(cp, "HTMLComment");
            cp = this.consumeNextCodePoint();
        }
    }
    COMMENT_LESS_THAN_SIGN_BANG(cp) {
        if (cp === HYPHEN_MINUS) {
            return "COMMENT_LESS_THAN_SIGN_BANG_DASH";
        }
        return this.reconsumeAs("COMMENT");
    }
    COMMENT_LESS_THAN_SIGN_BANG_DASH(cp) {
        if (cp === HYPHEN_MINUS) {
            return "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH";
        }
        return this.reconsumeAs("COMMENT_END_DASH");
    }
    COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH(cp) {
        if (cp !== GREATER_THAN_SIGN && cp !== EOF) {
            this.reportParseError("nested-comment");
        }
        return this.reconsumeAs("COMMENT_END");
    }
    COMMENT_END_DASH(cp) {
        if (cp === HYPHEN_MINUS) {
            return "COMMENT_END";
        }
        if (cp === EOF) {
            this.reportParseError("eof-in-comment");
            return "DATA";
        }
        this.appendTokenValue(HYPHEN_MINUS, "HTMLComment");
        return this.reconsumeAs("COMMENT");
    }
    COMMENT_END(cp) {
        while (true) {
            if (cp === GREATER_THAN_SIGN) {
                return "DATA";
            }
            if (cp === EXCLAMATION_MARK) {
                return "COMMENT_END_BANG";
            }
            if (cp === EOF) {
                this.reportParseError("eof-in-comment");
                return "DATA";
            }
            this.appendTokenValue(HYPHEN_MINUS, "HTMLComment");
            if (cp !== HYPHEN_MINUS) {
                return this.reconsumeAs("COMMENT");
            }
            cp = this.consumeNextCodePoint();
        }
    }
    COMMENT_END_BANG(cp) {
        if (cp === HYPHEN_MINUS) {
            this.appendTokenValue(HYPHEN_MINUS, "HTMLComment");
            this.appendTokenValue(EXCLAMATION_MARK, "HTMLComment");
            return "COMMENT_END_DASH";
        }
        if (cp === GREATER_THAN_SIGN) {
            this.reportParseError("incorrectly-closed-comment");
            return "DATA";
        }
        if (cp === EOF) {
            this.reportParseError("eof-in-comment");
            return "DATA";
        }
        this.appendTokenValue(HYPHEN_MINUS, "HTMLComment");
        this.appendTokenValue(EXCLAMATION_MARK, "HTMLComment");
        return this.reconsumeAs("COMMENT");
    }
    CDATA_SECTION(cp) {
        while (true) {
            if (cp === RIGHT_SQUARE_BRACKET) {
                return "CDATA_SECTION_BRACKET";
            }
            if (cp === EOF) {
                this.reportParseError("eof-in-cdata");
                return "DATA";
            }
            this.appendTokenValue(cp, "HTMLCDataText");
            cp = this.consumeNextCodePoint();
        }
    }
    CDATA_SECTION_BRACKET(cp) {
        if (cp === RIGHT_SQUARE_BRACKET) {
            return "CDATA_SECTION_END";
        }
        this.appendTokenValue(RIGHT_SQUARE_BRACKET, "HTMLCDataText");
        return this.reconsumeAs("CDATA_SECTION");
    }
    CDATA_SECTION_END(cp) {
        while (true) {
            if (cp === GREATER_THAN_SIGN) {
                return "DATA";
            }
            if (cp !== RIGHT_SQUARE_BRACKET) {
                this.appendTokenValue(RIGHT_SQUARE_BRACKET, "HTMLCDataText");
                this.appendTokenValue(RIGHT_SQUARE_BRACKET, "HTMLCDataText");
                return this.reconsumeAs("CDATA_SECTION");
            }
            this.appendTokenValue(RIGHT_SQUARE_BRACKET, "HTMLCDataText");
            cp = this.consumeNextCodePoint();
        }
    }
    CHARACTER_REFERENCE(cp) {
        this.crStartOffset = this.offset - 1;
        this.buffer = [AMPERSAND];
        if (isWhitespace(cp) || cp === LESS_THAN_SIGN || cp === EOF) {
            return this.reconsumeAs("CHARACTER_REFERENCE_END");
        }
        if (cp === NUMBER_SIGN) {
            this.buffer.push(cp);
            return "NUMERIC_CHARACTER_REFERENCE";
        }
        return this.reconsumeAs("NAMED_CHARACTER_REFERENCE");
    }
    NAMED_CHARACTER_REFERENCE(cp) {
        for (const entitySet of entitySets) {
            const length = entitySet.length;
            const entities = entitySet.entities;
            const text = this.text.slice(this.offset, this.offset + length);
            const codepoints = entities[text];
            if (codepoints == null) {
                continue;
            }
            const semi = text.endsWith(";");
            const next = this.text.codePointAt(this.offset + 1);
            this.offset += length - 1;
            this.column += length - 1;
            if (this.returnState.startsWith("ATTR") &&
                !semi &&
                next != null &&
                (next === EQUALS_SIGN || isLetter(next) || isDigit(next))) {
                for (const cp1 of text) {
                    this.buffer.push(cp1.codePointAt(0));
                }
            }
            else {
                if (!semi) {
                    this.reportParseError("missing-semicolon-after-character-reference");
                }
                this.buffer = codepoints;
            }
            return "CHARACTER_REFERENCE_END";
        }
        for (const cp0 of this.buffer) {
            this.appendTokenValue(cp0, null);
        }
        this.appendTokenValue(cp, null);
        return "AMBIGUOUS_AMPERSAND";
    }
    AMBIGUOUS_AMPERSAND(cp) {
        while (isDigit(cp) || isLetter(cp)) {
            this.appendTokenValue(cp, null);
            cp = this.consumeNextCodePoint();
        }
        if (cp === SEMICOLON) {
            this.reportParseError("unknown-named-character-reference");
        }
        return this.reconsumeAs(this.returnState);
    }
    NUMERIC_CHARACTER_REFERENCE(cp) {
        this.crCode = 0;
        if (cp === LATIN_SMALL_X || cp === LATIN_CAPITAL_X) {
            this.buffer.push(cp);
            return "HEXADEMICAL_CHARACTER_REFERENCE_START";
        }
        return this.reconsumeAs("DECIMAL_CHARACTER_REFERENCE_START");
    }
    HEXADEMICAL_CHARACTER_REFERENCE_START(cp) {
        if (isHexDigit(cp)) {
            return this.reconsumeAs("HEXADEMICAL_CHARACTER_REFERENCE");
        }
        this.reportParseError("absence-of-digits-in-numeric-character-reference");
        return this.reconsumeAs("CHARACTER_REFERENCE_END");
    }
    DECIMAL_CHARACTER_REFERENCE_START(cp) {
        if (isDigit(cp)) {
            return this.reconsumeAs("DECIMAL_CHARACTER_REFERENCE");
        }
        this.reportParseError("absence-of-digits-in-numeric-character-reference");
        return this.reconsumeAs("CHARACTER_REFERENCE_END");
    }
    HEXADEMICAL_CHARACTER_REFERENCE(cp) {
        while (true) {
            if (isDigit(cp)) {
                this.crCode = 16 * this.crCode + (cp - 0x30);
            }
            else if (isUpperHexDigit(cp)) {
                this.crCode = 16 * this.crCode + (cp - 0x37);
            }
            else if (isLowerHexDigit(cp)) {
                this.crCode = 16 * this.crCode + (cp - 0x57);
            }
            else {
                if (cp === SEMICOLON) {
                    return "NUMERIC_CHARACTER_REFERENCE_END";
                }
                this.reportParseError("missing-semicolon-after-character-reference");
                return this.reconsumeAs("NUMERIC_CHARACTER_REFERENCE_END");
            }
            cp = this.consumeNextCodePoint();
        }
    }
    DECIMAL_CHARACTER_REFERENCE(cp) {
        while (true) {
            if (isDigit(cp)) {
                this.crCode = 10 * this.crCode + (cp - 0x30);
            }
            else {
                if (cp === SEMICOLON) {
                    return "NUMERIC_CHARACTER_REFERENCE_END";
                }
                this.reportParseError("missing-semicolon-after-character-reference");
                return this.reconsumeAs("NUMERIC_CHARACTER_REFERENCE_END");
            }
            cp = this.consumeNextCodePoint();
        }
    }
    NUMERIC_CHARACTER_REFERENCE_END(_cp) {
        let code = this.crCode;
        if (code === 0) {
            this.reportParseError("null-character-reference");
            code = NULL_REPLACEMENT;
        }
        else if (code > 0x10ffff) {
            this.reportParseError("character-reference-outside-unicode-range");
            code = NULL_REPLACEMENT;
        }
        else if (isSurrogate(code)) {
            this.reportParseError("surrogate-character-reference");
            code = NULL_REPLACEMENT;
        }
        else if (isNonCharacter(code)) {
            this.reportParseError("noncharacter-character-reference");
        }
        else if (code === 0x0d || (isControl(code) && !isWhitespace(code))) {
            this.reportParseError("control-character-reference");
            code = alternativeCR.get(code) || code;
        }
        this.buffer = [code];
        return this.reconsumeAs("CHARACTER_REFERENCE_END");
    }
    CHARACTER_REFERENCE_END(_cp) {
        assert(this.currentToken != null);
        const token = this.currentToken;
        const len0 = token.value.length;
        for (const cp1 of this.buffer) {
            this.appendTokenValue(cp1, null);
        }
        const newLength = token.value.length - len0;
        for (let i = this.crStartOffset + newLength; i < this.offset; ++i) {
            this.gaps.push(i);
        }
        return this.reconsumeAs(this.returnState);
    }
    V_EXPRESSION_START(cp) {
        if (cp === LEFT_CURLY_BRACKET) {
            this.startToken("VExpressionStart");
            this.appendTokenValue(LEFT_CURLY_BRACKET, null);
            this.appendTokenValue(LEFT_CURLY_BRACKET, null);
            return this.returnState;
        }
        this.appendTokenValue(LEFT_CURLY_BRACKET, null);
        return this.reconsumeAs(this.returnState);
    }
    V_EXPRESSION_END(cp) {
        if (cp === RIGHT_CURLY_BRACKET) {
            this.startToken("VExpressionEnd");
            this.appendTokenValue(RIGHT_CURLY_BRACKET, null);
            this.appendTokenValue(RIGHT_CURLY_BRACKET, null);
            return this.returnState;
        }
        this.appendTokenValue(RIGHT_CURLY_BRACKET, null);
        return this.reconsumeAs(this.returnState);
    }
}

function getPossibleTypes(parsedSelector) {
    switch (parsedSelector.type) {
        case "identifier":
            return [parsedSelector.value];
        case "matches": {
            const typesForComponents = parsedSelector.selectors.map(getPossibleTypes);
            if (typesForComponents.every(Boolean)) {
                return union.apply(null, typesForComponents);
            }
            return null;
        }
        case "compound": {
            const typesForComponents = parsedSelector.selectors.map(getPossibleTypes).filter(typesForComponent => typesForComponent);
            if (!typesForComponents.length) {
                return null;
            }
            return intersection.apply(null, typesForComponents);
        }
        case "child":
        case "descendant":
        case "sibling":
        case "adjacent":
            return getPossibleTypes(parsedSelector.right);
        default:
            return null;
    }
}
function countClassAttributes(parsedSelector) {
    switch (parsedSelector.type) {
        case "child":
        case "descendant":
        case "sibling":
        case "adjacent":
            return countClassAttributes(parsedSelector.left) + countClassAttributes(parsedSelector.right);
        case "compound":
        case "not":
        case "matches":
            return parsedSelector.selectors.reduce((sum, childSelector) => sum + countClassAttributes(childSelector), 0);
        case "attribute":
        case "field":
        case "nth-child":
        case "nth-last-child":
            return 1;
        default:
            return 0;
    }
}
function countIdentifiers(parsedSelector) {
    switch (parsedSelector.type) {
        case "child":
        case "descendant":
        case "sibling":
        case "adjacent":
            return countIdentifiers(parsedSelector.left) + countIdentifiers(parsedSelector.right);
        case "compound":
        case "not":
        case "matches":
            return parsedSelector.selectors.reduce((sum, childSelector) => sum + countIdentifiers(childSelector), 0);
        case "identifier":
            return 1;
        default:
            return 0;
    }
}
function compareSpecificity(selectorA, selectorB) {
    return selectorA.attributeCount - selectorB.attributeCount ||
        selectorA.identifierCount - selectorB.identifierCount ||
        (selectorA.rawSelector <= selectorB.rawSelector ? -1 : 1);
}
function tryParseSelector(rawSelector) {
    try {
        return esquery.parse(rawSelector.replace(/:exit$/, ""));
    }
    catch (err) {
        if (typeof err.offset === "number") {
            throw new Error(`Syntax error in selector "${rawSelector}" at position ${err.offset}: ${err.message}`);
        }
        throw err;
    }
}
const parseSelector = memoize(rawSelector => {
    const parsedSelector = tryParseSelector(rawSelector);
    return {
        rawSelector,
        isExit: rawSelector.endsWith(":exit"),
        parsedSelector,
        listenerTypes: getPossibleTypes(parsedSelector),
        attributeCount: countClassAttributes(parsedSelector),
        identifierCount: countIdentifiers(parsedSelector),
    };
});
class NodeEventGenerator {
    constructor(emitter) {
        this.emitter = emitter;
        this.currentAncestry = [];
        this.enterSelectorsByNodeType = new Map();
        this.exitSelectorsByNodeType = new Map();
        this.anyTypeEnterSelectors = [];
        this.anyTypeExitSelectors = [];
        const eventNames = typeof emitter.eventNames === "function"
            ? emitter.eventNames()
            : Object.keys(emitter._events);
        for (const rawSelector of eventNames) {
            if (typeof rawSelector === "symbol") {
                continue;
            }
            const selector = parseSelector(rawSelector);
            if (selector.listenerTypes) {
                for (const nodeType of selector.listenerTypes) {
                    const typeMap = selector.isExit ? this.exitSelectorsByNodeType : this.enterSelectorsByNodeType;
                    let selectors = typeMap.get(nodeType);
                    if (selectors == null) {
                        typeMap.set(nodeType, (selectors = []));
                    }
                    selectors.push(selector);
                }
            }
            else {
                (selector.isExit ? this.anyTypeExitSelectors : this.anyTypeEnterSelectors).push(selector);
            }
        }
        this.anyTypeEnterSelectors.sort(compareSpecificity);
        this.anyTypeExitSelectors.sort(compareSpecificity);
        for (const selectorList of this.enterSelectorsByNodeType.values()) {
            selectorList.sort(compareSpecificity);
        }
        for (const selectorList of this.exitSelectorsByNodeType.values()) {
            selectorList.sort(compareSpecificity);
        }
    }
    applySelector(node, selector) {
        if (esquery.matches(node, selector.parsedSelector, this.currentAncestry)) {
            this.emitter.emit(selector.rawSelector, node);
        }
    }
    applySelectors(node, isExit) {
        const selectorsByNodeType = (isExit ? this.exitSelectorsByNodeType : this.enterSelectorsByNodeType).get(node.type) || [];
        const anyTypeSelectors = isExit ? this.anyTypeExitSelectors : this.anyTypeEnterSelectors;
        let selectorsByTypeIndex = 0;
        let anyTypeSelectorsIndex = 0;
        while (selectorsByTypeIndex < selectorsByNodeType.length || anyTypeSelectorsIndex < anyTypeSelectors.length) {
            if (selectorsByTypeIndex >= selectorsByNodeType.length ||
                (anyTypeSelectorsIndex < anyTypeSelectors.length && compareSpecificity(anyTypeSelectors[anyTypeSelectorsIndex], selectorsByNodeType[selectorsByTypeIndex]) < 0)) {
                this.applySelector(node, anyTypeSelectors[anyTypeSelectorsIndex++]);
            }
            else {
                this.applySelector(node, selectorsByNodeType[selectorsByTypeIndex++]);
            }
        }
    }
    enterNode(node) {
        if (node.parent) {
            this.currentAncestry.unshift(node.parent);
        }
        this.applySelectors(node, false);
    }
    leaveNode(node) {
        this.applySelectors(node, true);
        this.currentAncestry.shift();
    }
}

function getStartLocation(token) {
    return token.range[0];
}
function search(tokens, location) {
    return sortedIndexBy(tokens, { range: [location] }, getStartLocation);
}
function getFirstIndex(tokens, indexMap, startLoc) {
    if (startLoc in indexMap) {
        return indexMap[startLoc];
    }
    if ((startLoc - 1) in indexMap) {
        const index = indexMap[startLoc - 1];
        const token = (index >= 0 && index < tokens.length) ? tokens[index] : null;
        if (token && token.range[0] >= startLoc) {
            return index;
        }
        return index + 1;
    }
    return 0;
}
function getLastIndex(tokens, indexMap, endLoc) {
    if (endLoc in indexMap) {
        return indexMap[endLoc] - 1;
    }
    if ((endLoc - 1) in indexMap) {
        const index = indexMap[endLoc - 1];
        const token = (index >= 0 && index < tokens.length) ? tokens[index] : null;
        if (token && token.range[1] > endLoc) {
            return index - 1;
        }
        return index;
    }
    return tokens.length - 1;
}

class Cursor {
    constructor() {
        this.current = null;
    }
    getOneToken() {
        return this.moveNext() ? this.current : null;
    }
    getAllTokens() {
        const tokens = [];
        while (this.moveNext()) {
            tokens.push(this.current);
        }
        return tokens;
    }
}

class BackwardTokenCommentCursor extends Cursor {
    constructor(tokens, comments, indexMap, startLoc, endLoc) {
        super();
        this.tokens = tokens;
        this.comments = comments;
        this.tokenIndex = getLastIndex(tokens, indexMap, endLoc);
        this.commentIndex = search(comments, endLoc) - 1;
        this.border = startLoc;
    }
    moveNext() {
        const token = (this.tokenIndex >= 0) ? this.tokens[this.tokenIndex] : null;
        const comment = (this.commentIndex >= 0) ? this.comments[this.commentIndex] : null;
        if (token && (!comment || token.range[1] > comment.range[1])) {
            this.current = token;
            this.tokenIndex -= 1;
        }
        else if (comment) {
            this.current = comment;
            this.commentIndex -= 1;
        }
        else {
            this.current = null;
        }
        return this.current != null && (this.border === -1 || this.current.range[0] >= this.border);
    }
}

class BackwardTokenCursor extends Cursor {
    constructor(tokens, _comments, indexMap, startLoc, endLoc) {
        super();
        this.tokens = tokens;
        this.index = getLastIndex(tokens, indexMap, endLoc);
        this.indexEnd = getFirstIndex(tokens, indexMap, startLoc);
    }
    moveNext() {
        if (this.index >= this.indexEnd) {
            this.current = this.tokens[this.index];
            this.index -= 1;
            return true;
        }
        return false;
    }
    getOneToken() {
        return (this.index >= this.indexEnd) ? this.tokens[this.index] : null;
    }
}

class DecorativeCursor extends Cursor {
    constructor(cursor) {
        super();
        this.cursor = cursor;
    }
    moveNext() {
        const retv = this.cursor.moveNext();
        this.current = this.cursor.current;
        return retv;
    }
}

class FilterCursor extends DecorativeCursor {
    constructor(cursor, predicate) {
        super(cursor);
        this.predicate = predicate;
    }
    moveNext() {
        const predicate = this.predicate;
        while (super.moveNext()) {
            if (predicate(this.current)) {
                return true;
            }
        }
        return false;
    }
}

class ForwardTokenCommentCursor extends Cursor {
    constructor(tokens, comments, indexMap, startLoc, endLoc) {
        super();
        this.tokens = tokens;
        this.comments = comments;
        this.tokenIndex = getFirstIndex(tokens, indexMap, startLoc);
        this.commentIndex = search(comments, startLoc);
        this.border = endLoc;
    }
    moveNext() {
        const token = (this.tokenIndex < this.tokens.length) ? this.tokens[this.tokenIndex] : null;
        const comment = (this.commentIndex < this.comments.length) ? this.comments[this.commentIndex] : null;
        if (token && (!comment || token.range[0] < comment.range[0])) {
            this.current = token;
            this.tokenIndex += 1;
        }
        else if (comment) {
            this.current = comment;
            this.commentIndex += 1;
        }
        else {
            this.current = null;
        }
        return this.current != null && (this.border === -1 || this.current.range[1] <= this.border);
    }
}

class ForwardTokenCursor extends Cursor {
    constructor(tokens, _comments, indexMap, startLoc, endLoc) {
        super();
        this.tokens = tokens;
        this.index = getFirstIndex(tokens, indexMap, startLoc);
        this.indexEnd = getLastIndex(tokens, indexMap, endLoc);
    }
    moveNext() {
        if (this.index <= this.indexEnd) {
            this.current = this.tokens[this.index];
            this.index += 1;
            return true;
        }
        return false;
    }
    getOneToken() {
        return (this.index <= this.indexEnd) ? this.tokens[this.index] : null;
    }
    getAllTokens() {
        return this.tokens.slice(this.index, this.indexEnd + 1);
    }
}

class LimitCursor extends DecorativeCursor {
    constructor(cursor, count) {
        super(cursor);
        this.count = count;
    }
    moveNext() {
        if (this.count > 0) {
            this.count -= 1;
            return super.moveNext();
        }
        return false;
    }
}

class SkipCursor extends DecorativeCursor {
    constructor(cursor, count) {
        super(cursor);
        this.count = count;
    }
    moveNext() {
        while (this.count > 0) {
            this.count -= 1;
            if (!super.moveNext()) {
                return false;
            }
        }
        return super.moveNext();
    }
}

class CursorFactory {
    constructor(TokenCursor, TokenCommentCursor) {
        this.TokenCursor = TokenCursor;
        this.TokenCommentCursor = TokenCommentCursor;
    }
    createBaseCursor(tokens, comments, indexMap, startLoc, endLoc, includeComments) {
        const TokenCursor = includeComments ? this.TokenCommentCursor : this.TokenCursor;
        return new TokenCursor(tokens, comments, indexMap, startLoc, endLoc);
    }
    createCursor(tokens, comments, indexMap, startLoc, endLoc, includeComments, filter, skip, count) {
        let cursor = this.createBaseCursor(tokens, comments, indexMap, startLoc, endLoc, includeComments);
        if (filter) {
            cursor = new FilterCursor(cursor, filter);
        }
        if (skip >= 1) {
            cursor = new SkipCursor(cursor, skip);
        }
        if (count >= 0) {
            cursor = new LimitCursor(cursor, count);
        }
        return cursor;
    }
}
const forward = new CursorFactory(ForwardTokenCursor, ForwardTokenCommentCursor);
const backward = new CursorFactory(BackwardTokenCursor, BackwardTokenCommentCursor);

class PaddedTokenCursor extends ForwardTokenCursor {
    constructor(tokens, comments, indexMap, startLoc, endLoc, beforeCount, afterCount) {
        super(tokens, comments, indexMap, startLoc, endLoc);
        this.index = Math.max(0, this.index - beforeCount);
        this.indexEnd = Math.min(tokens.length - 1, this.indexEnd + afterCount);
    }
}

function isCommentToken(token) {
    return token.type === "Line" || token.type === "Block" || token.type === "Shebang";
}
function createIndexMap(tokens, comments) {
    const map = Object.create(null);
    let tokenIndex = 0;
    let commentIndex = 0;
    let nextStart = 0;
    let range = null;
    while (tokenIndex < tokens.length || commentIndex < comments.length) {
        nextStart = (commentIndex < comments.length) ? comments[commentIndex].range[0] : Number.MAX_SAFE_INTEGER;
        while (tokenIndex < tokens.length && (range = tokens[tokenIndex].range)[0] < nextStart) {
            map[range[0]] = tokenIndex;
            map[range[1] - 1] = tokenIndex;
            tokenIndex += 1;
        }
        nextStart = (tokenIndex < tokens.length) ? tokens[tokenIndex].range[0] : Number.MAX_SAFE_INTEGER;
        while (commentIndex < comments.length && (range = comments[commentIndex].range)[0] < nextStart) {
            map[range[0]] = tokenIndex;
            map[range[1] - 1] = tokenIndex;
            commentIndex += 1;
        }
    }
    return map;
}
function createCursorWithSkip(factory, tokens, comments, indexMap, startLoc, endLoc, opts) {
    let includeComments = false;
    let skip = 0;
    let filter = null;
    if (typeof opts === "number") {
        skip = opts | 0;
    }
    else if (typeof opts === "function") {
        filter = opts;
    }
    else if (opts) {
        includeComments = Boolean(opts.includeComments);
        skip = opts.skip || 0;
        filter = opts.filter || null;
    }
    assert(skip >= 0, "options.skip should be zero or a positive integer.");
    assert(!filter || typeof filter === "function", "options.filter should be a function.");
    return factory.createCursor(tokens, comments, indexMap, startLoc, endLoc, includeComments, filter, skip, -1);
}
function createCursorWithCount(factory, tokens, comments, indexMap, startLoc, endLoc, opts) {
    let includeComments = false;
    let count = 0;
    let countExists = false;
    let filter = null;
    if (typeof opts === "number") {
        count = opts | 0;
        countExists = true;
    }
    else if (typeof opts === "function") {
        filter = opts;
    }
    else if (opts) {
        includeComments = Boolean(opts.includeComments);
        count = opts.count || 0;
        countExists = typeof opts.count === "number";
        filter = opts.filter || null;
    }
    assert(count >= 0, "options.count should be zero or a positive integer.");
    assert(!filter || typeof filter === "function", "options.filter should be a function.");
    return factory.createCursor(tokens, comments, indexMap, startLoc, endLoc, includeComments, filter, 0, countExists ? count : -1);
}
function createCursorWithPadding(tokens, comments, indexMap, startLoc, endLoc, beforeCount, afterCount) {
    if (typeof beforeCount === "undefined" && typeof afterCount === "undefined") {
        return new ForwardTokenCursor(tokens, comments, indexMap, startLoc, endLoc);
    }
    if (typeof beforeCount === "number" || typeof beforeCount === "undefined") {
        return new PaddedTokenCursor(tokens, comments, indexMap, startLoc, endLoc, beforeCount || 0, afterCount || 0);
    }
    return createCursorWithCount(forward, tokens, comments, indexMap, startLoc, endLoc, beforeCount);
}
function getAdjacentCommentTokensFromCursor(cursor) {
    const tokens = [];
    let currentToken = cursor.getOneToken();
    while (currentToken && isCommentToken(currentToken)) {
        tokens.push(currentToken);
        currentToken = cursor.getOneToken();
    }
    return tokens;
}
class TokenStore {
    constructor(tokens, comments) {
        this._tokens = tokens;
        this._comments = comments;
        this._indexMap = createIndexMap(tokens, comments);
    }
    getTokenByRangeStart(offset, options) {
        const includeComments = Boolean(options && options.includeComments);
        const token = forward.createBaseCursor(this._tokens, this._comments, this._indexMap, offset, -1, includeComments).getOneToken();
        if (token && token.range[0] === offset) {
            return token;
        }
        return null;
    }
    getFirstToken(node, options) {
        return createCursorWithSkip(forward, this._tokens, this._comments, this._indexMap, node.range[0], node.range[1], options).getOneToken();
    }
    getLastToken(node, options) {
        return createCursorWithSkip(backward, this._tokens, this._comments, this._indexMap, node.range[0], node.range[1], options).getOneToken();
    }
    getTokenBefore(node, options) {
        return createCursorWithSkip(backward, this._tokens, this._comments, this._indexMap, -1, node.range[0], options).getOneToken();
    }
    getTokenAfter(node, options) {
        return createCursorWithSkip(forward, this._tokens, this._comments, this._indexMap, node.range[1], -1, options).getOneToken();
    }
    getFirstTokenBetween(left, right, options) {
        return createCursorWithSkip(forward, this._tokens, this._comments, this._indexMap, left.range[1], right.range[0], options).getOneToken();
    }
    getLastTokenBetween(left, right, options) {
        return createCursorWithSkip(backward, this._tokens, this._comments, this._indexMap, left.range[1], right.range[0], options).getOneToken();
    }
    getTokenOrCommentBefore(node, skip) {
        return this.getTokenBefore(node, { includeComments: true, skip });
    }
    getTokenOrCommentAfter(node, skip) {
        return this.getTokenAfter(node, { includeComments: true, skip });
    }
    getFirstTokens(node, options) {
        return createCursorWithCount(forward, this._tokens, this._comments, this._indexMap, node.range[0], node.range[1], options).getAllTokens();
    }
    getLastTokens(node, options) {
        return createCursorWithCount(backward, this._tokens, this._comments, this._indexMap, node.range[0], node.range[1], options).getAllTokens().reverse();
    }
    getTokensBefore(node, options) {
        return createCursorWithCount(backward, this._tokens, this._comments, this._indexMap, -1, node.range[0], options).getAllTokens().reverse();
    }
    getTokensAfter(node, options) {
        return createCursorWithCount(forward, this._tokens, this._comments, this._indexMap, node.range[1], -1, options).getAllTokens();
    }
    getFirstTokensBetween(left, right, options) {
        return createCursorWithCount(forward, this._tokens, this._comments, this._indexMap, left.range[1], right.range[0], options).getAllTokens();
    }
    getLastTokensBetween(left, right, options) {
        return createCursorWithCount(backward, this._tokens, this._comments, this._indexMap, left.range[1], right.range[0], options).getAllTokens().reverse();
    }
    getTokens(node, beforeCount, afterCount) {
        return createCursorWithPadding(this._tokens, this._comments, this._indexMap, node.range[0], node.range[1], beforeCount, afterCount).getAllTokens();
    }
    getTokensBetween(left, right, padding) {
        return createCursorWithPadding(this._tokens, this._comments, this._indexMap, left.range[1], right.range[0], padding, typeof padding === "number" ? padding : undefined).getAllTokens();
    }
    commentsExistBetween(left, right) {
        const index = search(this._comments, left.range[1]);
        return (index < this._comments.length &&
            this._comments[index].range[1] <= right.range[0]);
    }
    getCommentsBefore(nodeOrToken) {
        const cursor = createCursorWithCount(backward, this._tokens, this._comments, this._indexMap, -1, nodeOrToken.range[0], { includeComments: true });
        return getAdjacentCommentTokensFromCursor(cursor).reverse();
    }
    getCommentsAfter(nodeOrToken) {
        const cursor = createCursorWithCount(forward, this._tokens, this._comments, this._indexMap, nodeOrToken.range[1], -1, { includeComments: true });
        return getAdjacentCommentTokensFromCursor(cursor);
    }
    getCommentsInside(node) {
        return this.getTokens(node, {
            includeComments: true,
            filter: isCommentToken,
        });
    }
}

const emitters = new WeakMap();
const stores = new WeakMap();
function define(rootAST) {
    return {
        defineTemplateBodyVisitor(templateBodyVisitor, scriptVisitor) {
            if (scriptVisitor == null) {
                scriptVisitor = {};
            }
            if (rootAST.templateBody == null) {
                return scriptVisitor;
            }
            let emitter = emitters.get(rootAST);
            if (emitter == null) {
                emitters.set(rootAST, (emitter = new EventEmitter()));
                const programExitHandler = scriptVisitor["Program:exit"];
                scriptVisitor["Program:exit"] = function () {
                    try {
                        if (typeof programExitHandler === "function") {
                            programExitHandler.apply(this, arguments);
                        }
                        const generator = new NodeEventGenerator(emitter);
                        traverseNodes(rootAST.templateBody, generator);
                    }
                    finally {
                        scriptVisitor["Program:exit"] = programExitHandler;
                        emitters.delete(rootAST);
                    }
                };
            }
            for (const selector of Object.keys(templateBodyVisitor)) {
                emitter.on(selector, templateBodyVisitor[selector]);
            }
            return scriptVisitor;
        },
        getTemplateBodyTokenStore() {
            const ast = rootAST.templateBody;
            const key = ast || stores;
            let store = stores.get(key);
            if (!store) {
                store =
                    ast != null
                        ? new TokenStore(ast.tokens, ast.comments)
                        : new TokenStore([], []);
                stores.set(key, store);
            }
            return store;
        },
    };
}

const STARTS_WITH_LT = /^\s*</u;
function isVueFile(code, options) {
    const filePath = options.filePath || "unknown.js";
    return path.extname(filePath) === ".vue" || STARTS_WITH_LT.test(code);
}
function isTemplateElement(node) {
    return node.type === "VElement" && node.name === "template";
}
function isScriptElement(node) {
    return node.type === "VElement" && node.name === "script";
}
function isLang(attribute) {
    return attribute.directive === false && attribute.key.name === "lang";
}
function getLang(element, defaultLang) {
    const langAttr = element && element.startTag.attributes.find(isLang);
    const lang = langAttr && langAttr.value && langAttr.value.value;
    return lang || defaultLang;
}
function parseForESLint(code, options) {
    options = Object.assign({
        comment: true,
        ecmaVersion: 2015,
        loc: true,
        range: true,
        tokens: true,
    }, options || {});
    let result;
    if (!isVueFile(code, options)) {
        result = parseScript(code, options);
    }
    else {
        const skipParsingScript = options.parser === false;
        const tokenizer = new Tokenizer(code);
        const rootAST = new Parser(tokenizer, options).parse();
        const locationCalcurator = new LocationCalculator(tokenizer.gaps, tokenizer.lineTerminators);
        const script = rootAST.children.find(isScriptElement);
        const template = rootAST.children.find(isTemplateElement);
        const templateLang = getLang(template, "html");
        const concreteInfo = {
            tokens: rootAST.tokens,
            comments: rootAST.comments,
            errors: rootAST.errors,
        };
        const templateBody = template != null && templateLang === "html"
            ? Object.assign(template, concreteInfo)
            : undefined;
        if (skipParsingScript || script == null) {
            result = parseScript("", options);
        }
        else {
            result = parseScriptElement(script, locationCalcurator, options);
        }
        result.ast.templateBody = templateBody;
    }
    result.services = Object.assign(result.services || {}, define(result.ast));
    return result;
}
function parse(code, options) {
    return parseForESLint(code, options).ast;
}

exports.parseForESLint = parseForESLint;
exports.parse = parse;
exports.AST = index;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 731:
/***/ (function(module, exports, __webpack_require__) {

var baseSortedIndex = __webpack_require__(732);

/**
 * This method is like `_.sortedIndex` except that it returns the highest
 * index at which `value` should be inserted into `array` in order to
 * maintain its sort order.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 * @example
 *
 * _.sortedLastIndex([4, 5, 5, 5, 6], 5);
 * // => 4
 */
function sortedLastIndex(array, value) {
  return baseSortedIndex(array, value, true);
}

module.exports = sortedLastIndex;


/***/ }),

/***/ 732:
/***/ (function(module, exports, __webpack_require__) {

var baseSortedIndexBy = __webpack_require__(733),
    identity = __webpack_require__(742),
    isSymbol = __webpack_require__(734);

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295,
    HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

/**
 * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
 * performs a binary search of `array` to determine the index at which `value`
 * should be inserted into `array` in order to maintain its sort order.
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {boolean} [retHighest] Specify returning the highest qualified index.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function baseSortedIndex(array, value, retHighest) {
  var low = 0,
      high = array == null ? low : array.length;

  if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
    while (low < high) {
      var mid = (low + high) >>> 1,
          computed = array[mid];

      if (computed !== null && !isSymbol(computed) &&
          (retHighest ? (computed <= value) : (computed < value))) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return high;
  }
  return baseSortedIndexBy(array, value, identity, retHighest);
}

module.exports = baseSortedIndex;


/***/ }),

/***/ 733:
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(734);

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295,
    MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeFloor = Math.floor,
    nativeMin = Math.min;

/**
 * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
 * which invokes `iteratee` for `value` and each element of `array` to compute
 * their sort ranking. The iteratee is invoked with one argument; (value).
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} iteratee The iteratee invoked per element.
 * @param {boolean} [retHighest] Specify returning the highest qualified index.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function baseSortedIndexBy(array, value, iteratee, retHighest) {
  value = iteratee(value);

  var low = 0,
      high = array == null ? 0 : array.length,
      valIsNaN = value !== value,
      valIsNull = value === null,
      valIsSymbol = isSymbol(value),
      valIsUndefined = value === undefined;

  while (low < high) {
    var mid = nativeFloor((low + high) / 2),
        computed = iteratee(array[mid]),
        othIsDefined = computed !== undefined,
        othIsNull = computed === null,
        othIsReflexive = computed === computed,
        othIsSymbol = isSymbol(computed);

    if (valIsNaN) {
      var setLow = retHighest || othIsReflexive;
    } else if (valIsUndefined) {
      setLow = othIsReflexive && (retHighest || othIsDefined);
    } else if (valIsNull) {
      setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
    } else if (valIsSymbol) {
      setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
    } else if (othIsNull || othIsSymbol) {
      setLow = false;
    } else {
      setLow = retHighest ? (computed <= value) : (computed < value);
    }
    if (setLow) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return nativeMin(high, MAX_ARRAY_INDEX);
}

module.exports = baseSortedIndexBy;


/***/ }),

/***/ 743:
/***/ (function(module, exports, __webpack_require__) {

var baseFindIndex = __webpack_require__(744),
    baseIteratee = __webpack_require__(745),
    toInteger = __webpack_require__(850);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * This method is like `_.findIndex` except that it iterates over elements
 * of `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=array.length-1] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ];
 *
 * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
 * // => 2
 *
 * // The `_.matches` iteratee shorthand.
 * _.findLastIndex(users, { 'user': 'barney', 'active': true });
 * // => 0
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findLastIndex(users, ['active', false]);
 * // => 2
 *
 * // The `_.property` iteratee shorthand.
 * _.findLastIndex(users, 'active');
 * // => 0
 */
function findLastIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = length - 1;
  if (fromIndex !== undefined) {
    index = toInteger(fromIndex);
    index = fromIndex < 0
      ? nativeMax(length + index, 0)
      : nativeMin(index, length - 1);
  }
  return baseFindIndex(array, baseIteratee(predicate, 3), index, true);
}

module.exports = findLastIndex;


/***/ }),

/***/ 745:
/***/ (function(module, exports, __webpack_require__) {

var baseMatches = __webpack_require__(746),
    baseMatchesProperty = __webpack_require__(832),
    identity = __webpack_require__(742),
    isArray = __webpack_require__(802),
    property = __webpack_require__(847);

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;


/***/ }),

/***/ 746:
/***/ (function(module, exports, __webpack_require__) {

var baseIsMatch = __webpack_require__(747),
    getMatchData = __webpack_require__(829),
    matchesStrictComparable = __webpack_require__(831);

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;


/***/ }),

/***/ 747:
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(748),
    baseIsEqual = __webpack_require__(786);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;


/***/ }),

/***/ 786:
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(787),
    isObjectLike = __webpack_require__(741);

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ }),

/***/ 787:
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(748),
    equalArrays = __webpack_require__(788),
    equalByTag = __webpack_require__(794),
    equalObjects = __webpack_require__(798),
    getTag = __webpack_require__(824),
    isArray = __webpack_require__(802),
    isBuffer = __webpack_require__(811),
    isTypedArray = __webpack_require__(814);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ }),

/***/ 788:
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(789),
    arraySome = __webpack_require__(792),
    cacheHas = __webpack_require__(793);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ }),

/***/ 792:
/***/ (function(module, exports) {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ }),

/***/ 794:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(736),
    Uint8Array = __webpack_require__(795),
    eq = __webpack_require__(753),
    equalArrays = __webpack_require__(788),
    mapToArray = __webpack_require__(796),
    setToArray = __webpack_require__(797);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ }),

/***/ 796:
/***/ (function(module, exports) {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ }),

/***/ 798:
/***/ (function(module, exports, __webpack_require__) {

var getAllKeys = __webpack_require__(799);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ }),

/***/ 829:
/***/ (function(module, exports, __webpack_require__) {

var isStrictComparable = __webpack_require__(830),
    keys = __webpack_require__(806);

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

module.exports = getMatchData;


/***/ }),

/***/ 830:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(766);

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;


/***/ }),

/***/ 831:
/***/ (function(module, exports) {

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

module.exports = matchesStrictComparable;


/***/ }),

/***/ 832:
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(786),
    get = __webpack_require__(833),
    hasIn = __webpack_require__(844),
    isKey = __webpack_require__(836),
    isStrictComparable = __webpack_require__(830),
    matchesStrictComparable = __webpack_require__(831),
    toKey = __webpack_require__(843);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;


/***/ }),

/***/ 833:
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(834);

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),

/***/ 834:
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(835),
    toKey = __webpack_require__(843);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),

/***/ 835:
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(802),
    isKey = __webpack_require__(836),
    stringToPath = __webpack_require__(837),
    toString = __webpack_require__(840);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),

/***/ 836:
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(802),
    isSymbol = __webpack_require__(734);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),

/***/ 837:
/***/ (function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(838);

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),

/***/ 838:
/***/ (function(module, exports, __webpack_require__) {

var memoize = __webpack_require__(839);

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),

/***/ 839:
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(771);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),

/***/ 843:
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(734);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),

/***/ 844:
/***/ (function(module, exports, __webpack_require__) {

var baseHasIn = __webpack_require__(845),
    hasPath = __webpack_require__(846);

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;


/***/ }),

/***/ 845:
/***/ (function(module, exports) {

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;


/***/ }),

/***/ 846:
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(835),
    isArguments = __webpack_require__(809),
    isArray = __webpack_require__(802),
    isIndex = __webpack_require__(813),
    isLength = __webpack_require__(816),
    toKey = __webpack_require__(843);

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;


/***/ }),

/***/ 847:
/***/ (function(module, exports, __webpack_require__) {

var baseProperty = __webpack_require__(848),
    basePropertyDeep = __webpack_require__(849),
    isKey = __webpack_require__(836),
    toKey = __webpack_require__(843);

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;


/***/ }),

/***/ 848:
/***/ (function(module, exports) {

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;


/***/ }),

/***/ 849:
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(834);

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;


/***/ }),

/***/ 853:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */
function log(...args) {
	// This hackery is required for IE8/9, where
	// the `console.log` function doesn't have 'apply'
	return typeof console === 'object' &&
		console.log &&
		console.log(...args);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(854)(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(18)))

/***/ }),

/***/ 854:
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(855);

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* Active `debug` instances.
	*/
	createDebug.instances = [];

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return match;
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.enabled = createDebug.enabled(namespace);
		debug.useColors = createDebug.useColors();
		debug.color = selectColor(namespace);
		debug.destroy = destroy;
		debug.extend = extend;
		// Debug.formatArgs = formatArgs;
		// debug.rawLog = rawLog;

		// env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		createDebug.instances.push(debug);

		return debug;
	}

	function destroy() {
		const index = createDebug.instances.indexOf(this);
		if (index !== -1) {
			createDebug.instances.splice(index, 1);
			return true;
		}
		return false;
	}

	function extend(namespace, delimiter) {
		return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}

		for (i = 0; i < createDebug.instances.length; i++) {
			const instance = createDebug.instances[i];
			instance.enabled = createDebug.enabled(instance.namespace);
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ 855:
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ 856:
/***/ (function(module, exports, __webpack_require__) {

var baseIteratee = __webpack_require__(745),
    baseSortedIndexBy = __webpack_require__(733);

/**
 * This method is like `_.sortedLastIndex` except that it accepts `iteratee`
 * which is invoked for `value` and each element of `array` to compute their
 * sort ranking. The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 * @example
 *
 * var objects = [{ 'x': 4 }, { 'x': 5 }];
 *
 * _.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
 * // => 1
 *
 * // The `_.property` iteratee shorthand.
 * _.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
 * // => 1
 */
function sortedLastIndexBy(array, value, iteratee) {
  return baseSortedIndexBy(array, value, baseIteratee(iteratee, 2), true);
}

module.exports = sortedLastIndexBy;


/***/ }),

/***/ 857:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(858);


/***/ }),

/***/ 858:
/***/ (function(module, exports) {

/**
 * Gets the first element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias first
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the first element of `array`.
 * @example
 *
 * _.head([1, 2, 3]);
 * // => 1
 *
 * _.head([]);
 * // => undefined
 */
function head(array) {
  return (array && array.length) ? array[0] : undefined;
}

module.exports = head;


/***/ }),

/***/ 859:
/***/ (function(module, exports) {

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

module.exports = last;


/***/ }),

/***/ 860:
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),

/***/ 861:
/***/ (function(module, exports, __webpack_require__) {

var baseFlatten = __webpack_require__(862),
    baseRest = __webpack_require__(864),
    baseUniq = __webpack_require__(872),
    isArrayLikeObject = __webpack_require__(880);

/**
 * Creates an array of unique values, in order, from all given arrays using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * _.union([2], [1, 2]);
 * // => [2, 1]
 */
var union = baseRest(function(arrays) {
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
});

module.exports = union;


/***/ }),

/***/ 862:
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(801),
    isFlattenable = __webpack_require__(863);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;


/***/ }),

/***/ 863:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(736),
    isArguments = __webpack_require__(809),
    isArray = __webpack_require__(802);

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;


/***/ }),

/***/ 880:
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(823),
    isObjectLike = __webpack_require__(741);

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;


/***/ }),

/***/ 881:
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(842),
    baseIntersection = __webpack_require__(882),
    baseRest = __webpack_require__(864),
    castArrayLikeObject = __webpack_require__(883);

/**
 * Creates an array of unique values that are included in all given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * _.intersection([2, 1], [2, 3]);
 * // => [2]
 */
var intersection = baseRest(function(arrays) {
  var mapped = arrayMap(arrays, castArrayLikeObject);
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped)
    : [];
});

module.exports = intersection;


/***/ }),

/***/ 882:
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(789),
    arrayIncludes = __webpack_require__(873),
    arrayIncludesWith = __webpack_require__(877),
    arrayMap = __webpack_require__(842),
    baseUnary = __webpack_require__(817),
    cacheHas = __webpack_require__(793);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * The base implementation of methods like `_.intersection`, without support
 * for iteratee shorthands, that accepts an array of arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of shared values.
 */
function baseIntersection(arrays, iteratee, comparator) {
  var includes = comparator ? arrayIncludesWith : arrayIncludes,
      length = arrays[0].length,
      othLength = arrays.length,
      othIndex = othLength,
      caches = Array(othLength),
      maxLength = Infinity,
      result = [];

  while (othIndex--) {
    var array = arrays[othIndex];
    if (othIndex && iteratee) {
      array = arrayMap(array, baseUnary(iteratee));
    }
    maxLength = nativeMin(array.length, maxLength);
    caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
      ? new SetCache(othIndex && array)
      : undefined;
  }
  array = arrays[0];

  var index = -1,
      seen = caches[0];

  outer:
  while (++index < length && result.length < maxLength) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (!(seen
          ? cacheHas(seen, computed)
          : includes(result, computed, comparator)
        )) {
      othIndex = othLength;
      while (--othIndex) {
        var cache = caches[othIndex];
        if (!(cache
              ? cacheHas(cache, computed)
              : includes(arrays[othIndex], computed, comparator))
            ) {
          continue outer;
        }
      }
      if (seen) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseIntersection;


/***/ }),

/***/ 883:
/***/ (function(module, exports, __webpack_require__) {

var isArrayLikeObject = __webpack_require__(880);

/**
 * Casts `value` to an empty array if it's not an array like object.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array|Object} Returns the cast array-like object.
 */
function castArrayLikeObject(value) {
  return isArrayLikeObject(value) ? value : [];
}

module.exports = castArrayLikeObject;


/***/ }),

/***/ 884:
/***/ (function(module, exports, __webpack_require__) {

var baseIteratee = __webpack_require__(745),
    baseSortedIndexBy = __webpack_require__(733);

/**
 * This method is like `_.sortedIndex` except that it accepts `iteratee`
 * which is invoked for `value` and each element of `array` to compute their
 * sort ranking. The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 * @example
 *
 * var objects = [{ 'x': 4 }, { 'x': 5 }];
 *
 * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
 * // => 0
 */
function sortedIndexBy(array, value, iteratee) {
  return baseSortedIndexBy(array, value, baseIteratee(iteratee, 2));
}

module.exports = sortedIndexBy;


/***/ }),

/***/ 886:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Main Espree file that converts Acorn into Esprima output.
 *
 * This file contains code from the following MIT-licensed projects:
 * 1. Acorn
 * 2. Babylon
 * 3. Babel-ESLint
 *
 * This file also contains code from Esprima, which is BSD licensed.
 *
 * Acorn is Copyright 2012-2015 Acorn Contributors (https://github.com/marijnh/acorn/blob/master/AUTHORS)
 * Babylon is Copyright 2014-2015 various contributors (https://github.com/babel/babel/blob/master/packages/babylon/AUTHORS)
 * Babel-ESLint is Copyright 2014-2015 Sebastian McKenzie <sebmck@gmail.com>
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * Esprima is Copyright (c) jQuery Foundation, Inc. and Contributors, All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *   * Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *   * Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
/* eslint no-undefined:0, no-use-before-define: 0 */



const acorn = __webpack_require__(887);
const jsx = __webpack_require__(888);
const astNodeTypes = __webpack_require__(890);
const espree = __webpack_require__(891);

// To initialize lazily.
const parsers = {
    _regular: null,
    _jsx: null,

    get regular() {
        if (this._regular === null) {
            this._regular = acorn.Parser.extend(espree());
        }
        return this._regular;
    },

    get jsx() {
        if (this._jsx === null) {
            this._jsx = acorn.Parser.extend(jsx(), espree());
        }
        return this._jsx;
    },

    get(options) {
        const useJsx = Boolean(
            options &&
            options.ecmaFeatures &&
            options.ecmaFeatures.jsx
        );
        return useJsx ? this.jsx : this.regular;
    }
};

//------------------------------------------------------------------------------
// Tokenizer
//------------------------------------------------------------------------------

/**
 * Tokenizes the given code.
 * @param {string} code The code to tokenize.
 * @param {Object} options Options defining how to tokenize.
 * @returns {Token[]} An array of tokens.
 * @throws {SyntaxError} If the input code is invalid.
 * @private
 */
function tokenize(code, options) {
    const Parser = parsers.get(options);

    // Ensure to collect tokens.
    if (!options || options.tokens !== true) {
        options = Object.assign({}, options, { tokens: true });
    }

    return new Parser(options, code).tokenize();
}

//------------------------------------------------------------------------------
// Parser
//------------------------------------------------------------------------------

/**
 * Parses the given code.
 * @param {string} code The code to tokenize.
 * @param {Object} options Options defining how to tokenize.
 * @returns {ASTNode} The "Program" AST node.
 * @throws {SyntaxError} If the input code is invalid.
 */
function parse(code, options) {
    const Parser = parsers.get(options);
    return new Parser(options, code).parse();
}

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

exports.version = __webpack_require__(894).version;

exports.tokenize = tokenize;

exports.parse = parse;

// Deep copy.
/* istanbul ignore next */
exports.Syntax = (function() {
    var name, types = {};

    if (typeof Object.create === "function") {
        types = Object.create(null);
    }

    for (name in astNodeTypes) {
        if (astNodeTypes.hasOwnProperty(name)) {
            types[name] = astNodeTypes[name];
        }
    }

    if (typeof Object.freeze === "function") {
        Object.freeze(types);
    }

    return types;
}());

/* istanbul ignore next */
exports.VisitorKeys = (function() {
    return __webpack_require__(40).KEYS;
}());


/***/ }),

/***/ 887:
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseExpressionAt", function() { return parseExpressionAt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokenizer", function() { return tokenizer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Parser", function() { return Parser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultOptions", function() { return defaultOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return Position; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SourceLocation", function() { return SourceLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLineInfo", function() { return getLineInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Node", function() { return Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenType", function() { return TokenType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokTypes", function() { return types; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keywordTypes", function() { return keywords$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokContext", function() { return TokContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokContexts", function() { return types$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIdentifierChar", function() { return isIdentifierChar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIdentifierStart", function() { return isIdentifierStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Token", function() { return Token; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNewLine", function() { return isNewLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineBreak", function() { return lineBreak; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineBreakG", function() { return lineBreakG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nonASCIIwhitespace", function() { return nonASCIIwhitespace; });
// Reserved word lists for various dialects of the language

var reservedWords = {
  3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
  5: "class enum extends super const export import",
  6: "enum",
  strict: "implements interface let package private protected public static yield",
  strictBind: "eval arguments"
};

// And the keywords

var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";

var keywords = {
  5: ecma5AndLessKeywords,
  6: ecma5AndLessKeywords + " const class extends export import super"
};

var keywordRelationalOperator = /^in(stanceof)?$/;

// ## Character categories

// Big ugly regular expressions that match characters in the
// whitespace, identifier, and identifier-start categories. These
// are only applied when a character is found to actually have a
// code point above 128.
// Generated by `bin/generate-identifier-regex.js`.

var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0560-\u0588\u05d0-\u05ea\u05ef-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0860-\u086a\u08a0-\u08b4\u08b6-\u08bd\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u09fc\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c60\u0c61\u0c80\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d54-\u0d56\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1878\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1c80-\u1c88\u1c90-\u1cba\u1cbd-\u1cbf\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312f\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fef\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7b9\ua7f7-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua8fe\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab65\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
var nonASCIIidentifierChars = "\u200c\u200d\xb7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u07fd\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08d3-\u08e1\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u09fe\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0afa-\u0aff\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c04\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d00-\u0d03\u0d3b\u0d3c\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2-\u1cf4\u1cf7-\u1cf9\u1dc0-\u1df9\u1dfb-\u1dff\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f1\ua8ff-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";

var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;

// These are a run-length and offset encoded representation of the
// >0xffff code points that are a valid part of identifiers. The
// offset starts at 0x10000, and each pair of numbers represents an
// offset to the next range, and then a size of the range. They were
// generated by bin/generate-identifier-regex.js

// eslint-disable-next-line comma-spacing
var astralIdentifierStartCodes = [0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,14,29,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,157,310,10,21,11,7,153,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,71,55,7,1,65,0,16,3,2,2,2,28,43,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,14,35,477,28,11,0,9,21,190,52,76,44,33,24,27,35,30,0,12,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,85,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,159,52,19,3,54,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,86,26,230,43,117,63,32,0,257,0,11,39,8,0,22,0,12,39,3,3,20,0,35,56,264,8,2,36,18,0,50,29,113,6,2,1,2,37,22,0,26,5,2,1,2,31,15,0,328,18,270,921,103,110,18,195,2749,1070,4050,582,8634,568,8,30,114,29,19,47,17,3,32,20,6,18,689,63,129,68,12,0,67,12,65,1,31,6129,15,754,9486,286,82,395,2309,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,4149,196,60,67,1213,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42710,42,4148,12,221,3,5761,15,7472,3104,541];

// eslint-disable-next-line comma-spacing
var astralIdentifierCodes = [509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,574,3,9,9,525,10,176,2,54,14,32,9,16,3,46,10,54,9,7,2,37,13,2,9,6,1,45,0,13,2,49,13,9,3,4,9,83,11,7,0,161,11,6,9,7,3,56,1,2,6,3,1,3,2,10,0,11,1,3,6,4,4,193,17,10,9,5,0,82,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,84,14,5,9,243,14,166,9,280,9,41,6,2,3,9,0,10,10,47,15,406,7,2,7,17,9,57,21,2,13,123,5,4,0,2,1,2,6,2,0,9,9,49,4,2,1,2,4,9,9,330,3,19306,9,135,4,60,6,26,9,1016,45,17,3,19723,1,5319,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,2214,6,110,6,6,9,792487,239];

// This has a complexity linear to the value of the code. The
// assumption is that looking up astral identifier characters is
// rare.
function isInAstralSet(code, set) {
  var pos = 0x10000;
  for (var i = 0; i < set.length; i += 2) {
    pos += set[i];
    if (pos > code) { return false }
    pos += set[i + 1];
    if (pos >= code) { return true }
  }
}

// Test whether a given character code starts an identifier.

function isIdentifierStart(code, astral) {
  if (code < 65) { return code === 36 }
  if (code < 91) { return true }
  if (code < 97) { return code === 95 }
  if (code < 123) { return true }
  if (code <= 0xffff) { return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code)) }
  if (astral === false) { return false }
  return isInAstralSet(code, astralIdentifierStartCodes)
}

// Test whether a given character is part of an identifier.

function isIdentifierChar(code, astral) {
  if (code < 48) { return code === 36 }
  if (code < 58) { return true }
  if (code < 65) { return false }
  if (code < 91) { return true }
  if (code < 97) { return code === 95 }
  if (code < 123) { return true }
  if (code <= 0xffff) { return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code)) }
  if (astral === false) { return false }
  return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes)
}

// ## Token types

// The assignment of fine-grained, information-carrying type objects
// allows the tokenizer to store the information it has about a
// token in a way that is very cheap for the parser to look up.

// All token type variables start with an underscore, to make them
// easy to recognize.

// The `beforeExpr` property is used to disambiguate between regular
// expressions and divisions. It is set on all token types that can
// be followed by an expression (thus, a slash after them would be a
// regular expression).
//
// The `startsExpr` property is used to check if the token ends a
// `yield` expression. It is set on all token types that either can
// directly start an expression (like a quotation mark) or can
// continue an expression (like the body of a string).
//
// `isLoop` marks a keyword as starting a loop, which is important
// to know when parsing a label, in order to allow or disallow
// continue jumps to that label.

var TokenType = function TokenType(label, conf) {
  if ( conf === void 0 ) conf = {};

  this.label = label;
  this.keyword = conf.keyword;
  this.beforeExpr = !!conf.beforeExpr;
  this.startsExpr = !!conf.startsExpr;
  this.isLoop = !!conf.isLoop;
  this.isAssign = !!conf.isAssign;
  this.prefix = !!conf.prefix;
  this.postfix = !!conf.postfix;
  this.binop = conf.binop || null;
  this.updateContext = null;
};

function binop(name, prec) {
  return new TokenType(name, {beforeExpr: true, binop: prec})
}
var beforeExpr = {beforeExpr: true};
var startsExpr = {startsExpr: true};

// Map keyword names to token types.

var keywords$1 = {};

// Succinct definitions of keyword token types
function kw(name, options) {
  if ( options === void 0 ) options = {};

  options.keyword = name;
  return keywords$1[name] = new TokenType(name, options)
}

var types = {
  num: new TokenType("num", startsExpr),
  regexp: new TokenType("regexp", startsExpr),
  string: new TokenType("string", startsExpr),
  name: new TokenType("name", startsExpr),
  eof: new TokenType("eof"),

  // Punctuation token types.
  bracketL: new TokenType("[", {beforeExpr: true, startsExpr: true}),
  bracketR: new TokenType("]"),
  braceL: new TokenType("{", {beforeExpr: true, startsExpr: true}),
  braceR: new TokenType("}"),
  parenL: new TokenType("(", {beforeExpr: true, startsExpr: true}),
  parenR: new TokenType(")"),
  comma: new TokenType(",", beforeExpr),
  semi: new TokenType(";", beforeExpr),
  colon: new TokenType(":", beforeExpr),
  dot: new TokenType("."),
  question: new TokenType("?", beforeExpr),
  arrow: new TokenType("=>", beforeExpr),
  template: new TokenType("template"),
  invalidTemplate: new TokenType("invalidTemplate"),
  ellipsis: new TokenType("...", beforeExpr),
  backQuote: new TokenType("`", startsExpr),
  dollarBraceL: new TokenType("${", {beforeExpr: true, startsExpr: true}),

  // Operators. These carry several kinds of properties to help the
  // parser use them properly (the presence of these properties is
  // what categorizes them as operators).
  //
  // `binop`, when present, specifies that this operator is a binary
  // operator, and will refer to its precedence.
  //
  // `prefix` and `postfix` mark the operator as a prefix or postfix
  // unary operator.
  //
  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
  // binary operators with a very low precedence, that should result
  // in AssignmentExpression nodes.

  eq: new TokenType("=", {beforeExpr: true, isAssign: true}),
  assign: new TokenType("_=", {beforeExpr: true, isAssign: true}),
  incDec: new TokenType("++/--", {prefix: true, postfix: true, startsExpr: true}),
  prefix: new TokenType("!/~", {beforeExpr: true, prefix: true, startsExpr: true}),
  logicalOR: binop("||", 1),
  logicalAND: binop("&&", 2),
  bitwiseOR: binop("|", 3),
  bitwiseXOR: binop("^", 4),
  bitwiseAND: binop("&", 5),
  equality: binop("==/!=/===/!==", 6),
  relational: binop("</>/<=/>=", 7),
  bitShift: binop("<</>>/>>>", 8),
  plusMin: new TokenType("+/-", {beforeExpr: true, binop: 9, prefix: true, startsExpr: true}),
  modulo: binop("%", 10),
  star: binop("*", 10),
  slash: binop("/", 10),
  starstar: new TokenType("**", {beforeExpr: true}),

  // Keyword token types.
  _break: kw("break"),
  _case: kw("case", beforeExpr),
  _catch: kw("catch"),
  _continue: kw("continue"),
  _debugger: kw("debugger"),
  _default: kw("default", beforeExpr),
  _do: kw("do", {isLoop: true, beforeExpr: true}),
  _else: kw("else", beforeExpr),
  _finally: kw("finally"),
  _for: kw("for", {isLoop: true}),
  _function: kw("function", startsExpr),
  _if: kw("if"),
  _return: kw("return", beforeExpr),
  _switch: kw("switch"),
  _throw: kw("throw", beforeExpr),
  _try: kw("try"),
  _var: kw("var"),
  _const: kw("const"),
  _while: kw("while", {isLoop: true}),
  _with: kw("with"),
  _new: kw("new", {beforeExpr: true, startsExpr: true}),
  _this: kw("this", startsExpr),
  _super: kw("super", startsExpr),
  _class: kw("class", startsExpr),
  _extends: kw("extends", beforeExpr),
  _export: kw("export"),
  _import: kw("import"),
  _null: kw("null", startsExpr),
  _true: kw("true", startsExpr),
  _false: kw("false", startsExpr),
  _in: kw("in", {beforeExpr: true, binop: 7}),
  _instanceof: kw("instanceof", {beforeExpr: true, binop: 7}),
  _typeof: kw("typeof", {beforeExpr: true, prefix: true, startsExpr: true}),
  _void: kw("void", {beforeExpr: true, prefix: true, startsExpr: true}),
  _delete: kw("delete", {beforeExpr: true, prefix: true, startsExpr: true})
};

// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

var lineBreak = /\r\n?|\n|\u2028|\u2029/;
var lineBreakG = new RegExp(lineBreak.source, "g");

function isNewLine(code, ecma2019String) {
  return code === 10 || code === 13 || (!ecma2019String && (code === 0x2028 || code === 0x2029))
}

var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;

var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;

var ref = Object.prototype;
var hasOwnProperty = ref.hasOwnProperty;
var toString = ref.toString;

// Checks if an object has a property.

function has(obj, propName) {
  return hasOwnProperty.call(obj, propName)
}

var isArray = Array.isArray || (function (obj) { return (
  toString.call(obj) === "[object Array]"
); });

// These are used when `options.locations` is on, for the
// `startLoc` and `endLoc` properties.

var Position = function Position(line, col) {
  this.line = line;
  this.column = col;
};

Position.prototype.offset = function offset (n) {
  return new Position(this.line, this.column + n)
};

var SourceLocation = function SourceLocation(p, start, end) {
  this.start = start;
  this.end = end;
  if (p.sourceFile !== null) { this.source = p.sourceFile; }
};

// The `getLineInfo` function is mostly useful when the
// `locations` option is off (for performance reasons) and you
// want to find the line/column position for a given character
// offset. `input` should be the code string that the offset refers
// into.

function getLineInfo(input, offset) {
  for (var line = 1, cur = 0;;) {
    lineBreakG.lastIndex = cur;
    var match = lineBreakG.exec(input);
    if (match && match.index < offset) {
      ++line;
      cur = match.index + match[0].length;
    } else {
      return new Position(line, offset - cur)
    }
  }
}

// A second optional argument can be given to further configure
// the parser process. These options are recognized:

var defaultOptions = {
  // `ecmaVersion` indicates the ECMAScript version to parse. Must be
  // either 3, 5, 6 (2015), 7 (2016), 8 (2017), 9 (2018), or 10
  // (2019). This influences support for strict mode, the set of
  // reserved words, and support for new syntax features. The default
  // is 9.
  ecmaVersion: 9,
  // `sourceType` indicates the mode the code should be parsed in.
  // Can be either `"script"` or `"module"`. This influences global
  // strict mode and parsing of `import` and `export` declarations.
  sourceType: "script",
  // `onInsertedSemicolon` can be a callback that will be called
  // when a semicolon is automatically inserted. It will be passed
  // th position of the comma as an offset, and if `locations` is
  // enabled, it is given the location as a `{line, column}` object
  // as second argument.
  onInsertedSemicolon: null,
  // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
  // trailing commas.
  onTrailingComma: null,
  // By default, reserved words are only enforced if ecmaVersion >= 5.
  // Set `allowReserved` to a boolean value to explicitly turn this on
  // an off. When this option has the value "never", reserved words
  // and keywords can also not be used as property names.
  allowReserved: null,
  // When enabled, a return at the top level is not considered an
  // error.
  allowReturnOutsideFunction: false,
  // When enabled, import/export statements are not constrained to
  // appearing at the top of the program.
  allowImportExportEverywhere: false,
  // When enabled, await identifiers are allowed to appear at the top-level scope,
  // but they are still not allowed in non-async functions.
  allowAwaitOutsideFunction: false,
  // When enabled, hashbang directive in the beginning of file
  // is allowed and treated as a line comment.
  allowHashBang: false,
  // When `locations` is on, `loc` properties holding objects with
  // `start` and `end` properties in `{line, column}` form (with
  // line being 1-based and column 0-based) will be attached to the
  // nodes.
  locations: false,
  // A function can be passed as `onToken` option, which will
  // cause Acorn to call that function with object in the same
  // format as tokens returned from `tokenizer().getToken()`. Note
  // that you are not allowed to call the parser from the
  // callback—that will corrupt its internal state.
  onToken: null,
  // A function can be passed as `onComment` option, which will
  // cause Acorn to call that function with `(block, text, start,
  // end)` parameters whenever a comment is skipped. `block` is a
  // boolean indicating whether this is a block (`/* */`) comment,
  // `text` is the content of the comment, and `start` and `end` are
  // character offsets that denote the start and end of the comment.
  // When the `locations` option is on, two more parameters are
  // passed, the full `{line, column}` locations of the start and
  // end of the comments. Note that you are not allowed to call the
  // parser from the callback—that will corrupt its internal state.
  onComment: null,
  // Nodes have their start and end characters offsets recorded in
  // `start` and `end` properties (directly on the node, rather than
  // the `loc` object, which holds line/column data. To also add a
  // [semi-standardized][range] `range` property holding a `[start,
  // end]` array with the same numbers, set the `ranges` option to
  // `true`.
  //
  // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
  ranges: false,
  // It is possible to parse multiple files into a single AST by
  // passing the tree produced by parsing the first file as
  // `program` option in subsequent parses. This will add the
  // toplevel forms of the parsed file to the `Program` (top) node
  // of an existing parse tree.
  program: null,
  // When `locations` is on, you can pass this to record the source
  // file in every node's `loc` object.
  sourceFile: null,
  // This value, if given, is stored in every node, whether
  // `locations` is on or off.
  directSourceFile: null,
  // When enabled, parenthesized expressions are represented by
  // (non-standard) ParenthesizedExpression nodes
  preserveParens: false
};

// Interpret and default an options object

function getOptions(opts) {
  var options = {};

  for (var opt in defaultOptions)
    { options[opt] = opts && has(opts, opt) ? opts[opt] : defaultOptions[opt]; }

  if (options.ecmaVersion >= 2015)
    { options.ecmaVersion -= 2009; }

  if (options.allowReserved == null)
    { options.allowReserved = options.ecmaVersion < 5; }

  if (isArray(options.onToken)) {
    var tokens = options.onToken;
    options.onToken = function (token) { return tokens.push(token); };
  }
  if (isArray(options.onComment))
    { options.onComment = pushComment(options, options.onComment); }

  return options
}

function pushComment(options, array) {
  return function(block, text, start, end, startLoc, endLoc) {
    var comment = {
      type: block ? "Block" : "Line",
      value: text,
      start: start,
      end: end
    };
    if (options.locations)
      { comment.loc = new SourceLocation(this, startLoc, endLoc); }
    if (options.ranges)
      { comment.range = [start, end]; }
    array.push(comment);
  }
}

// Each scope gets a bitset that may contain these flags
var SCOPE_TOP = 1;
var SCOPE_FUNCTION = 2;
var SCOPE_VAR = SCOPE_TOP | SCOPE_FUNCTION;
var SCOPE_ASYNC = 4;
var SCOPE_GENERATOR = 8;
var SCOPE_ARROW = 16;
var SCOPE_SIMPLE_CATCH = 32;
var SCOPE_SUPER = 64;
var SCOPE_DIRECT_SUPER = 128;

function functionFlags(async, generator) {
  return SCOPE_FUNCTION | (async ? SCOPE_ASYNC : 0) | (generator ? SCOPE_GENERATOR : 0)
}

// Used in checkLVal and declareName to determine the type of a binding
var BIND_NONE = 0;
var BIND_VAR = 1;
var BIND_LEXICAL = 2;
var BIND_FUNCTION = 3;
var BIND_SIMPLE_CATCH = 4;
var BIND_OUTSIDE = 5; // Special case for function names as bound inside the function

function keywordRegexp(words) {
  return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$")
}

var Parser = function Parser(options, input, startPos) {
  this.options = options = getOptions(options);
  this.sourceFile = options.sourceFile;
  this.keywords = keywordRegexp(keywords[options.ecmaVersion >= 6 ? 6 : 5]);
  var reserved = "";
  if (!options.allowReserved) {
    for (var v = options.ecmaVersion;; v--)
      { if (reserved = reservedWords[v]) { break } }
    if (options.sourceType === "module") { reserved += " await"; }
  }
  this.reservedWords = keywordRegexp(reserved);
  var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
  this.reservedWordsStrict = keywordRegexp(reservedStrict);
  this.reservedWordsStrictBind = keywordRegexp(reservedStrict + " " + reservedWords.strictBind);
  this.input = String(input);

  // Used to signal to callers of `readWord1` whether the word
  // contained any escape sequences. This is needed because words with
  // escape sequences must not be interpreted as keywords.
  this.containsEsc = false;

  // Set up token state

  // The current position of the tokenizer in the input.
  if (startPos) {
    this.pos = startPos;
    this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1;
    this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
  } else {
    this.pos = this.lineStart = 0;
    this.curLine = 1;
  }

  // Properties of the current token:
  // Its type
  this.type = types.eof;
  // For tokens that include more information than their type, the value
  this.value = null;
  // Its start and end offset
  this.start = this.end = this.pos;
  // And, if locations are used, the {line, column} object
  // corresponding to those offsets
  this.startLoc = this.endLoc = this.curPosition();

  // Position information for the previous token
  this.lastTokEndLoc = this.lastTokStartLoc = null;
  this.lastTokStart = this.lastTokEnd = this.pos;

  // The context stack is used to superficially track syntactic
  // context to predict whether a regular expression is allowed in a
  // given position.
  this.context = this.initialContext();
  this.exprAllowed = true;

  // Figure out if it's a module code.
  this.inModule = options.sourceType === "module";
  this.strict = this.inModule || this.strictDirective(this.pos);

  // Used to signify the start of a potential arrow function
  this.potentialArrowAt = -1;

  // Positions to delayed-check that yield/await does not exist in default parameters.
  this.yieldPos = this.awaitPos = 0;
  // Labels in scope.
  this.labels = [];

  // If enabled, skip leading hashbang line.
  if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!")
    { this.skipLineComment(2); }

  // Scope tracking for duplicate variable names (see scope.js)
  this.scopeStack = [];
  this.enterScope(SCOPE_TOP);

  // For RegExp validation
  this.regexpState = null;
};

var prototypeAccessors = { inFunction: { configurable: true },inGenerator: { configurable: true },inAsync: { configurable: true },allowSuper: { configurable: true },allowDirectSuper: { configurable: true } };

Parser.prototype.parse = function parse () {
  var node = this.options.program || this.startNode();
  this.nextToken();
  return this.parseTopLevel(node)
};

prototypeAccessors.inFunction.get = function () { return (this.currentVarScope().flags & SCOPE_FUNCTION) > 0 };
prototypeAccessors.inGenerator.get = function () { return (this.currentVarScope().flags & SCOPE_GENERATOR) > 0 };
prototypeAccessors.inAsync.get = function () { return (this.currentVarScope().flags & SCOPE_ASYNC) > 0 };
prototypeAccessors.allowSuper.get = function () { return (this.currentThisScope().flags & SCOPE_SUPER) > 0 };
prototypeAccessors.allowDirectSuper.get = function () { return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER) > 0 };

// Switch to a getter for 7.0.0.
Parser.prototype.inNonArrowFunction = function inNonArrowFunction () { return (this.currentThisScope().flags & SCOPE_FUNCTION) > 0 };

Parser.extend = function extend () {
    var plugins = [], len = arguments.length;
    while ( len-- ) plugins[ len ] = arguments[ len ];

  var cls = this;
  for (var i = 0; i < plugins.length; i++) { cls = plugins[i](cls); }
  return cls
};

Parser.parse = function parse (input, options) {
  return new this(options, input).parse()
};

Parser.parseExpressionAt = function parseExpressionAt (input, pos, options) {
  var parser = new this(options, input, pos);
  parser.nextToken();
  return parser.parseExpression()
};

Parser.tokenizer = function tokenizer (input, options) {
  return new this(options, input)
};

Object.defineProperties( Parser.prototype, prototypeAccessors );

var pp = Parser.prototype;

// ## Parser utilities

var literal = /^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)"|;)/;
pp.strictDirective = function(start) {
  var this$1 = this;

  for (;;) {
    skipWhiteSpace.lastIndex = start;
    start += skipWhiteSpace.exec(this$1.input)[0].length;
    var match = literal.exec(this$1.input.slice(start));
    if (!match) { return false }
    if ((match[1] || match[2]) === "use strict") { return true }
    start += match[0].length;
  }
};

// Predicate that tests whether the next token is of the given
// type, and if yes, consumes it as a side effect.

pp.eat = function(type) {
  if (this.type === type) {
    this.next();
    return true
  } else {
    return false
  }
};

// Tests whether parsed token is a contextual keyword.

pp.isContextual = function(name) {
  return this.type === types.name && this.value === name && !this.containsEsc
};

// Consumes contextual keyword if possible.

pp.eatContextual = function(name) {
  if (!this.isContextual(name)) { return false }
  this.next();
  return true
};

// Asserts that following token is given contextual keyword.

pp.expectContextual = function(name) {
  if (!this.eatContextual(name)) { this.unexpected(); }
};

// Test whether a semicolon can be inserted at the current position.

pp.canInsertSemicolon = function() {
  return this.type === types.eof ||
    this.type === types.braceR ||
    lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
};

pp.insertSemicolon = function() {
  if (this.canInsertSemicolon()) {
    if (this.options.onInsertedSemicolon)
      { this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc); }
    return true
  }
};

// Consume a semicolon, or, failing that, see if we are allowed to
// pretend that there is a semicolon at this position.

pp.semicolon = function() {
  if (!this.eat(types.semi) && !this.insertSemicolon()) { this.unexpected(); }
};

pp.afterTrailingComma = function(tokType, notNext) {
  if (this.type === tokType) {
    if (this.options.onTrailingComma)
      { this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc); }
    if (!notNext)
      { this.next(); }
    return true
  }
};

// Expect a token of a given type. If found, consume it, otherwise,
// raise an unexpected token error.

pp.expect = function(type) {
  this.eat(type) || this.unexpected();
};

// Raise an unexpected token error.

pp.unexpected = function(pos) {
  this.raise(pos != null ? pos : this.start, "Unexpected token");
};

function DestructuringErrors() {
  this.shorthandAssign =
  this.trailingComma =
  this.parenthesizedAssign =
  this.parenthesizedBind =
  this.doubleProto =
    -1;
}

pp.checkPatternErrors = function(refDestructuringErrors, isAssign) {
  if (!refDestructuringErrors) { return }
  if (refDestructuringErrors.trailingComma > -1)
    { this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element"); }
  var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
  if (parens > -1) { this.raiseRecoverable(parens, "Parenthesized pattern"); }
};

pp.checkExpressionErrors = function(refDestructuringErrors, andThrow) {
  if (!refDestructuringErrors) { return false }
  var shorthandAssign = refDestructuringErrors.shorthandAssign;
  var doubleProto = refDestructuringErrors.doubleProto;
  if (!andThrow) { return shorthandAssign >= 0 || doubleProto >= 0 }
  if (shorthandAssign >= 0)
    { this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns"); }
  if (doubleProto >= 0)
    { this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property"); }
};

pp.checkYieldAwaitInDefaultParams = function() {
  if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos))
    { this.raise(this.yieldPos, "Yield expression cannot be a default value"); }
  if (this.awaitPos)
    { this.raise(this.awaitPos, "Await expression cannot be a default value"); }
};

pp.isSimpleAssignTarget = function(expr) {
  if (expr.type === "ParenthesizedExpression")
    { return this.isSimpleAssignTarget(expr.expression) }
  return expr.type === "Identifier" || expr.type === "MemberExpression"
};

var pp$1 = Parser.prototype;

// ### Statement parsing

// Parse a program. Initializes the parser, reads any number of
// statements, and wraps them in a Program node.  Optionally takes a
// `program` argument.  If present, the statements will be appended
// to its body instead of creating a new node.

pp$1.parseTopLevel = function(node) {
  var this$1 = this;

  var exports = {};
  if (!node.body) { node.body = []; }
  while (this.type !== types.eof) {
    var stmt = this$1.parseStatement(null, true, exports);
    node.body.push(stmt);
  }
  this.adaptDirectivePrologue(node.body);
  this.next();
  if (this.options.ecmaVersion >= 6) {
    node.sourceType = this.options.sourceType;
  }
  return this.finishNode(node, "Program")
};

var loopLabel = {kind: "loop"};
var switchLabel = {kind: "switch"};

pp$1.isLet = function() {
  if (this.options.ecmaVersion < 6 || !this.isContextual("let")) { return false }
  skipWhiteSpace.lastIndex = this.pos;
  var skip = skipWhiteSpace.exec(this.input);
  var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
  if (nextCh === 91 || nextCh === 123) { return true } // '{' and '['
  if (isIdentifierStart(nextCh, true)) {
    var pos = next + 1;
    while (isIdentifierChar(this.input.charCodeAt(pos), true)) { ++pos; }
    var ident = this.input.slice(next, pos);
    if (!keywordRelationalOperator.test(ident)) { return true }
  }
  return false
};

// check 'async [no LineTerminator here] function'
// - 'async /*foo*/ function' is OK.
// - 'async /*\n*/ function' is invalid.
pp$1.isAsyncFunction = function() {
  if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
    { return false }

  skipWhiteSpace.lastIndex = this.pos;
  var skip = skipWhiteSpace.exec(this.input);
  var next = this.pos + skip[0].length;
  return !lineBreak.test(this.input.slice(this.pos, next)) &&
    this.input.slice(next, next + 8) === "function" &&
    (next + 8 === this.input.length || !isIdentifierChar(this.input.charAt(next + 8)))
};

// Parse a single statement.
//
// If expecting a statement and finding a slash operator, parse a
// regular expression literal. This is to handle cases like
// `if (foo) /blah/.exec(foo)`, where looking at the previous token
// does not help.

pp$1.parseStatement = function(context, topLevel, exports) {
  var starttype = this.type, node = this.startNode(), kind;

  if (this.isLet()) {
    starttype = types._var;
    kind = "let";
  }

  // Most types of statements are recognized by the keyword they
  // start with. Many are trivial to parse, some require a bit of
  // complexity.

  switch (starttype) {
  case types._break: case types._continue: return this.parseBreakContinueStatement(node, starttype.keyword)
  case types._debugger: return this.parseDebuggerStatement(node)
  case types._do: return this.parseDoStatement(node)
  case types._for: return this.parseForStatement(node)
  case types._function:
    if ((context && (this.strict || context !== "if")) && this.options.ecmaVersion >= 6) { this.unexpected(); }
    return this.parseFunctionStatement(node, false, !context)
  case types._class:
    if (context) { this.unexpected(); }
    return this.parseClass(node, true)
  case types._if: return this.parseIfStatement(node)
  case types._return: return this.parseReturnStatement(node)
  case types._switch: return this.parseSwitchStatement(node)
  case types._throw: return this.parseThrowStatement(node)
  case types._try: return this.parseTryStatement(node)
  case types._const: case types._var:
    kind = kind || this.value;
    if (context && kind !== "var") { this.unexpected(); }
    return this.parseVarStatement(node, kind)
  case types._while: return this.parseWhileStatement(node)
  case types._with: return this.parseWithStatement(node)
  case types.braceL: return this.parseBlock(true, node)
  case types.semi: return this.parseEmptyStatement(node)
  case types._export:
  case types._import:
    if (!this.options.allowImportExportEverywhere) {
      if (!topLevel)
        { this.raise(this.start, "'import' and 'export' may only appear at the top level"); }
      if (!this.inModule)
        { this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'"); }
    }
    return starttype === types._import ? this.parseImport(node) : this.parseExport(node, exports)

    // If the statement does not start with a statement keyword or a
    // brace, it's an ExpressionStatement or LabeledStatement. We
    // simply start parsing an expression, and afterwards, if the
    // next token is a colon and the expression was a simple
    // Identifier node, we switch to interpreting it as a label.
  default:
    if (this.isAsyncFunction()) {
      if (context) { this.unexpected(); }
      this.next();
      return this.parseFunctionStatement(node, true, !context)
    }

    var maybeName = this.value, expr = this.parseExpression();
    if (starttype === types.name && expr.type === "Identifier" && this.eat(types.colon))
      { return this.parseLabeledStatement(node, maybeName, expr, context) }
    else { return this.parseExpressionStatement(node, expr) }
  }
};

pp$1.parseBreakContinueStatement = function(node, keyword) {
  var this$1 = this;

  var isBreak = keyword === "break";
  this.next();
  if (this.eat(types.semi) || this.insertSemicolon()) { node.label = null; }
  else if (this.type !== types.name) { this.unexpected(); }
  else {
    node.label = this.parseIdent();
    this.semicolon();
  }

  // Verify that there is an actual destination to break or
  // continue to.
  var i = 0;
  for (; i < this.labels.length; ++i) {
    var lab = this$1.labels[i];
    if (node.label == null || lab.name === node.label.name) {
      if (lab.kind != null && (isBreak || lab.kind === "loop")) { break }
      if (node.label && isBreak) { break }
    }
  }
  if (i === this.labels.length) { this.raise(node.start, "Unsyntactic " + keyword); }
  return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement")
};

pp$1.parseDebuggerStatement = function(node) {
  this.next();
  this.semicolon();
  return this.finishNode(node, "DebuggerStatement")
};

pp$1.parseDoStatement = function(node) {
  this.next();
  this.labels.push(loopLabel);
  node.body = this.parseStatement("do");
  this.labels.pop();
  this.expect(types._while);
  node.test = this.parseParenExpression();
  if (this.options.ecmaVersion >= 6)
    { this.eat(types.semi); }
  else
    { this.semicolon(); }
  return this.finishNode(node, "DoWhileStatement")
};

// Disambiguating between a `for` and a `for`/`in` or `for`/`of`
// loop is non-trivial. Basically, we have to parse the init `var`
// statement or expression, disallowing the `in` operator (see
// the second parameter to `parseExpression`), and then check
// whether the next token is `in` or `of`. When there is no init
// part (semicolon immediately after the opening parenthesis), it
// is a regular `for` loop.

pp$1.parseForStatement = function(node) {
  this.next();
  var awaitAt = (this.options.ecmaVersion >= 9 && (this.inAsync || (!this.inFunction && this.options.allowAwaitOutsideFunction)) && this.eatContextual("await")) ? this.lastTokStart : -1;
  this.labels.push(loopLabel);
  this.enterScope(0);
  this.expect(types.parenL);
  if (this.type === types.semi) {
    if (awaitAt > -1) { this.unexpected(awaitAt); }
    return this.parseFor(node, null)
  }
  var isLet = this.isLet();
  if (this.type === types._var || this.type === types._const || isLet) {
    var init$1 = this.startNode(), kind = isLet ? "let" : this.value;
    this.next();
    this.parseVar(init$1, true, kind);
    this.finishNode(init$1, "VariableDeclaration");
    if ((this.type === types._in || (this.options.ecmaVersion >= 6 && this.isContextual("of"))) && init$1.declarations.length === 1 &&
        !(kind !== "var" && init$1.declarations[0].init)) {
      if (this.options.ecmaVersion >= 9) {
        if (this.type === types._in) {
          if (awaitAt > -1) { this.unexpected(awaitAt); }
        } else { node.await = awaitAt > -1; }
      }
      return this.parseForIn(node, init$1)
    }
    if (awaitAt > -1) { this.unexpected(awaitAt); }
    return this.parseFor(node, init$1)
  }
  var refDestructuringErrors = new DestructuringErrors;
  var init = this.parseExpression(true, refDestructuringErrors);
  if (this.type === types._in || (this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
    if (this.options.ecmaVersion >= 9) {
      if (this.type === types._in) {
        if (awaitAt > -1) { this.unexpected(awaitAt); }
      } else { node.await = awaitAt > -1; }
    }
    this.toAssignable(init, false, refDestructuringErrors);
    this.checkLVal(init);
    return this.parseForIn(node, init)
  } else {
    this.checkExpressionErrors(refDestructuringErrors, true);
  }
  if (awaitAt > -1) { this.unexpected(awaitAt); }
  return this.parseFor(node, init)
};

pp$1.parseFunctionStatement = function(node, isAsync, declarationPosition) {
  this.next();
  return this.parseFunction(node, FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT), false, isAsync)
};

pp$1.parseIfStatement = function(node) {
  this.next();
  node.test = this.parseParenExpression();
  // allow function declarations in branches, but only in non-strict mode
  node.consequent = this.parseStatement("if");
  node.alternate = this.eat(types._else) ? this.parseStatement("if") : null;
  return this.finishNode(node, "IfStatement")
};

pp$1.parseReturnStatement = function(node) {
  if (!this.inFunction && !this.options.allowReturnOutsideFunction)
    { this.raise(this.start, "'return' outside of function"); }
  this.next();

  // In `return` (and `break`/`continue`), the keywords with
  // optional arguments, we eagerly look for a semicolon or the
  // possibility to insert one.

  if (this.eat(types.semi) || this.insertSemicolon()) { node.argument = null; }
  else { node.argument = this.parseExpression(); this.semicolon(); }
  return this.finishNode(node, "ReturnStatement")
};

pp$1.parseSwitchStatement = function(node) {
  var this$1 = this;

  this.next();
  node.discriminant = this.parseParenExpression();
  node.cases = [];
  this.expect(types.braceL);
  this.labels.push(switchLabel);
  this.enterScope(0);

  // Statements under must be grouped (by label) in SwitchCase
  // nodes. `cur` is used to keep the node that we are currently
  // adding statements to.

  var cur;
  for (var sawDefault = false; this.type !== types.braceR;) {
    if (this$1.type === types._case || this$1.type === types._default) {
      var isCase = this$1.type === types._case;
      if (cur) { this$1.finishNode(cur, "SwitchCase"); }
      node.cases.push(cur = this$1.startNode());
      cur.consequent = [];
      this$1.next();
      if (isCase) {
        cur.test = this$1.parseExpression();
      } else {
        if (sawDefault) { this$1.raiseRecoverable(this$1.lastTokStart, "Multiple default clauses"); }
        sawDefault = true;
        cur.test = null;
      }
      this$1.expect(types.colon);
    } else {
      if (!cur) { this$1.unexpected(); }
      cur.consequent.push(this$1.parseStatement(null));
    }
  }
  this.exitScope();
  if (cur) { this.finishNode(cur, "SwitchCase"); }
  this.next(); // Closing brace
  this.labels.pop();
  return this.finishNode(node, "SwitchStatement")
};

pp$1.parseThrowStatement = function(node) {
  this.next();
  if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start)))
    { this.raise(this.lastTokEnd, "Illegal newline after throw"); }
  node.argument = this.parseExpression();
  this.semicolon();
  return this.finishNode(node, "ThrowStatement")
};

// Reused empty array added for node fields that are always empty.

var empty = [];

pp$1.parseTryStatement = function(node) {
  this.next();
  node.block = this.parseBlock();
  node.handler = null;
  if (this.type === types._catch) {
    var clause = this.startNode();
    this.next();
    if (this.eat(types.parenL)) {
      clause.param = this.parseBindingAtom();
      var simple = clause.param.type === "Identifier";
      this.enterScope(simple ? SCOPE_SIMPLE_CATCH : 0);
      this.checkLVal(clause.param, simple ? BIND_SIMPLE_CATCH : BIND_LEXICAL);
      this.expect(types.parenR);
    } else {
      if (this.options.ecmaVersion < 10) { this.unexpected(); }
      clause.param = null;
      this.enterScope(0);
    }
    clause.body = this.parseBlock(false);
    this.exitScope();
    node.handler = this.finishNode(clause, "CatchClause");
  }
  node.finalizer = this.eat(types._finally) ? this.parseBlock() : null;
  if (!node.handler && !node.finalizer)
    { this.raise(node.start, "Missing catch or finally clause"); }
  return this.finishNode(node, "TryStatement")
};

pp$1.parseVarStatement = function(node, kind) {
  this.next();
  this.parseVar(node, false, kind);
  this.semicolon();
  return this.finishNode(node, "VariableDeclaration")
};

pp$1.parseWhileStatement = function(node) {
  this.next();
  node.test = this.parseParenExpression();
  this.labels.push(loopLabel);
  node.body = this.parseStatement("while");
  this.labels.pop();
  return this.finishNode(node, "WhileStatement")
};

pp$1.parseWithStatement = function(node) {
  if (this.strict) { this.raise(this.start, "'with' in strict mode"); }
  this.next();
  node.object = this.parseParenExpression();
  node.body = this.parseStatement("with");
  return this.finishNode(node, "WithStatement")
};

pp$1.parseEmptyStatement = function(node) {
  this.next();
  return this.finishNode(node, "EmptyStatement")
};

pp$1.parseLabeledStatement = function(node, maybeName, expr, context) {
  var this$1 = this;

  for (var i$1 = 0, list = this$1.labels; i$1 < list.length; i$1 += 1)
    {
    var label = list[i$1];

    if (label.name === maybeName)
      { this$1.raise(expr.start, "Label '" + maybeName + "' is already declared");
  } }
  var kind = this.type.isLoop ? "loop" : this.type === types._switch ? "switch" : null;
  for (var i = this.labels.length - 1; i >= 0; i--) {
    var label$1 = this$1.labels[i];
    if (label$1.statementStart === node.start) {
      // Update information about previous labels on this node
      label$1.statementStart = this$1.start;
      label$1.kind = kind;
    } else { break }
  }
  this.labels.push({name: maybeName, kind: kind, statementStart: this.start});
  node.body = this.parseStatement(context);
  if (node.body.type === "ClassDeclaration" ||
      node.body.type === "VariableDeclaration" && node.body.kind !== "var" ||
      node.body.type === "FunctionDeclaration" && (this.strict || node.body.generator || node.body.async))
    { this.raiseRecoverable(node.body.start, "Invalid labeled declaration"); }
  this.labels.pop();
  node.label = expr;
  return this.finishNode(node, "LabeledStatement")
};

pp$1.parseExpressionStatement = function(node, expr) {
  node.expression = expr;
  this.semicolon();
  return this.finishNode(node, "ExpressionStatement")
};

// Parse a semicolon-enclosed block of statements, handling `"use
// strict"` declarations when `allowStrict` is true (used for
// function bodies).

pp$1.parseBlock = function(createNewLexicalScope, node) {
  var this$1 = this;
  if ( createNewLexicalScope === void 0 ) createNewLexicalScope = true;
  if ( node === void 0 ) node = this.startNode();

  node.body = [];
  this.expect(types.braceL);
  if (createNewLexicalScope) { this.enterScope(0); }
  while (!this.eat(types.braceR)) {
    var stmt = this$1.parseStatement(null);
    node.body.push(stmt);
  }
  if (createNewLexicalScope) { this.exitScope(); }
  return this.finishNode(node, "BlockStatement")
};

// Parse a regular `for` loop. The disambiguation code in
// `parseStatement` will already have parsed the init statement or
// expression.

pp$1.parseFor = function(node, init) {
  node.init = init;
  this.expect(types.semi);
  node.test = this.type === types.semi ? null : this.parseExpression();
  this.expect(types.semi);
  node.update = this.type === types.parenR ? null : this.parseExpression();
  this.expect(types.parenR);
  this.exitScope();
  node.body = this.parseStatement("for");
  this.labels.pop();
  return this.finishNode(node, "ForStatement")
};

// Parse a `for`/`in` and `for`/`of` loop, which are almost
// same from parser's perspective.

pp$1.parseForIn = function(node, init) {
  var type = this.type === types._in ? "ForInStatement" : "ForOfStatement";
  this.next();
  if (type === "ForInStatement") {
    if (init.type === "AssignmentPattern" ||
      (init.type === "VariableDeclaration" && init.declarations[0].init != null &&
       (this.strict || init.declarations[0].id.type !== "Identifier")))
      { this.raise(init.start, "Invalid assignment in for-in loop head"); }
  }
  node.left = init;
  node.right = type === "ForInStatement" ? this.parseExpression() : this.parseMaybeAssign();
  this.expect(types.parenR);
  this.exitScope();
  node.body = this.parseStatement("for");
  this.labels.pop();
  return this.finishNode(node, type)
};

// Parse a list of variable declarations.

pp$1.parseVar = function(node, isFor, kind) {
  var this$1 = this;

  node.declarations = [];
  node.kind = kind;
  for (;;) {
    var decl = this$1.startNode();
    this$1.parseVarId(decl, kind);
    if (this$1.eat(types.eq)) {
      decl.init = this$1.parseMaybeAssign(isFor);
    } else if (kind === "const" && !(this$1.type === types._in || (this$1.options.ecmaVersion >= 6 && this$1.isContextual("of")))) {
      this$1.unexpected();
    } else if (decl.id.type !== "Identifier" && !(isFor && (this$1.type === types._in || this$1.isContextual("of")))) {
      this$1.raise(this$1.lastTokEnd, "Complex binding patterns require an initialization value");
    } else {
      decl.init = null;
    }
    node.declarations.push(this$1.finishNode(decl, "VariableDeclarator"));
    if (!this$1.eat(types.comma)) { break }
  }
  return node
};

pp$1.parseVarId = function(decl, kind) {
  decl.id = this.parseBindingAtom(kind);
  this.checkLVal(decl.id, kind === "var" ? BIND_VAR : BIND_LEXICAL, false);
};

var FUNC_STATEMENT = 1;
var FUNC_HANGING_STATEMENT = 2;
var FUNC_NULLABLE_ID = 4;

// Parse a function declaration or literal (depending on the
// `isStatement` parameter).

pp$1.parseFunction = function(node, statement, allowExpressionBody, isAsync) {
  this.initFunction(node);
  if (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !isAsync)
    { node.generator = this.eat(types.star); }
  if (this.options.ecmaVersion >= 8)
    { node.async = !!isAsync; }

  if (statement & FUNC_STATEMENT) {
    node.id = (statement & FUNC_NULLABLE_ID) && this.type !== types.name ? null : this.parseIdent();
    if (node.id && !(statement & FUNC_HANGING_STATEMENT))
      { this.checkLVal(node.id, this.inModule && !this.inFunction ? BIND_LEXICAL : BIND_FUNCTION); }
  }

  var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos;
  this.yieldPos = 0;
  this.awaitPos = 0;
  this.enterScope(functionFlags(node.async, node.generator));

  if (!(statement & FUNC_STATEMENT))
    { node.id = this.type === types.name ? this.parseIdent() : null; }

  this.parseFunctionParams(node);
  this.parseFunctionBody(node, allowExpressionBody);

  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  return this.finishNode(node, (statement & FUNC_STATEMENT) ? "FunctionDeclaration" : "FunctionExpression")
};

pp$1.parseFunctionParams = function(node) {
  this.expect(types.parenL);
  node.params = this.parseBindingList(types.parenR, false, this.options.ecmaVersion >= 8);
  this.checkYieldAwaitInDefaultParams();
};

// Parse a class declaration or literal (depending on the
// `isStatement` parameter).

pp$1.parseClass = function(node, isStatement) {
  var this$1 = this;

  this.next();

  this.parseClassId(node, isStatement);
  this.parseClassSuper(node);
  var classBody = this.startNode();
  var hadConstructor = false;
  classBody.body = [];
  this.expect(types.braceL);
  while (!this.eat(types.braceR)) {
    var element = this$1.parseClassElement(node.superClass !== null);
    if (element) {
      classBody.body.push(element);
      if (element.type === "MethodDefinition" && element.kind === "constructor") {
        if (hadConstructor) { this$1.raise(element.start, "Duplicate constructor in the same class"); }
        hadConstructor = true;
      }
    }
  }
  node.body = this.finishNode(classBody, "ClassBody");
  return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression")
};

pp$1.parseClassElement = function(constructorAllowsSuper) {
  var this$1 = this;

  if (this.eat(types.semi)) { return null }

  var method = this.startNode();
  var tryContextual = function (k, noLineBreak) {
    if ( noLineBreak === void 0 ) noLineBreak = false;

    var start = this$1.start, startLoc = this$1.startLoc;
    if (!this$1.eatContextual(k)) { return false }
    if (this$1.type !== types.parenL && (!noLineBreak || !this$1.canInsertSemicolon())) { return true }
    if (method.key) { this$1.unexpected(); }
    method.computed = false;
    method.key = this$1.startNodeAt(start, startLoc);
    method.key.name = k;
    this$1.finishNode(method.key, "Identifier");
    return false
  };

  method.kind = "method";
  method.static = tryContextual("static");
  var isGenerator = this.eat(types.star);
  var isAsync = false;
  if (!isGenerator) {
    if (this.options.ecmaVersion >= 8 && tryContextual("async", true)) {
      isAsync = true;
      isGenerator = this.options.ecmaVersion >= 9 && this.eat(types.star);
    } else if (tryContextual("get")) {
      method.kind = "get";
    } else if (tryContextual("set")) {
      method.kind = "set";
    }
  }
  if (!method.key) { this.parsePropertyName(method); }
  var key = method.key;
  var allowsDirectSuper = false;
  if (!method.computed && !method.static && (key.type === "Identifier" && key.name === "constructor" ||
      key.type === "Literal" && key.value === "constructor")) {
    if (method.kind !== "method") { this.raise(key.start, "Constructor can't have get/set modifier"); }
    if (isGenerator) { this.raise(key.start, "Constructor can't be a generator"); }
    if (isAsync) { this.raise(key.start, "Constructor can't be an async method"); }
    method.kind = "constructor";
    allowsDirectSuper = constructorAllowsSuper;
  } else if (method.static && key.type === "Identifier" && key.name === "prototype") {
    this.raise(key.start, "Classes may not have a static property named prototype");
  }
  this.parseClassMethod(method, isGenerator, isAsync, allowsDirectSuper);
  if (method.kind === "get" && method.value.params.length !== 0)
    { this.raiseRecoverable(method.value.start, "getter should have no params"); }
  if (method.kind === "set" && method.value.params.length !== 1)
    { this.raiseRecoverable(method.value.start, "setter should have exactly one param"); }
  if (method.kind === "set" && method.value.params[0].type === "RestElement")
    { this.raiseRecoverable(method.value.params[0].start, "Setter cannot use rest params"); }
  return method
};

pp$1.parseClassMethod = function(method, isGenerator, isAsync, allowsDirectSuper) {
  method.value = this.parseMethod(isGenerator, isAsync, allowsDirectSuper);
  return this.finishNode(method, "MethodDefinition")
};

pp$1.parseClassId = function(node, isStatement) {
  node.id = this.type === types.name ? this.parseIdent() : isStatement === true ? this.unexpected() : null;
};

pp$1.parseClassSuper = function(node) {
  node.superClass = this.eat(types._extends) ? this.parseExprSubscripts() : null;
};

// Parses module export declaration.

pp$1.parseExport = function(node, exports) {
  var this$1 = this;

  this.next();
  // export * from '...'
  if (this.eat(types.star)) {
    this.expectContextual("from");
    if (this.type !== types.string) { this.unexpected(); }
    node.source = this.parseExprAtom();
    this.semicolon();
    return this.finishNode(node, "ExportAllDeclaration")
  }
  if (this.eat(types._default)) { // export default ...
    this.checkExport(exports, "default", this.lastTokStart);
    var isAsync;
    if (this.type === types._function || (isAsync = this.isAsyncFunction())) {
      var fNode = this.startNode();
      this.next();
      if (isAsync) { this.next(); }
      node.declaration = this.parseFunction(fNode, FUNC_STATEMENT | FUNC_NULLABLE_ID, false, isAsync, true);
    } else if (this.type === types._class) {
      var cNode = this.startNode();
      node.declaration = this.parseClass(cNode, "nullableID");
    } else {
      node.declaration = this.parseMaybeAssign();
      this.semicolon();
    }
    return this.finishNode(node, "ExportDefaultDeclaration")
  }
  // export var|const|let|function|class ...
  if (this.shouldParseExportStatement()) {
    node.declaration = this.parseStatement(null);
    if (node.declaration.type === "VariableDeclaration")
      { this.checkVariableExport(exports, node.declaration.declarations); }
    else
      { this.checkExport(exports, node.declaration.id.name, node.declaration.id.start); }
    node.specifiers = [];
    node.source = null;
  } else { // export { x, y as z } [from '...']
    node.declaration = null;
    node.specifiers = this.parseExportSpecifiers(exports);
    if (this.eatContextual("from")) {
      if (this.type !== types.string) { this.unexpected(); }
      node.source = this.parseExprAtom();
    } else {
      // check for keywords used as local names
      for (var i = 0, list = node.specifiers; i < list.length; i += 1) {
        var spec = list[i];

        this$1.checkUnreserved(spec.local);
      }

      node.source = null;
    }
    this.semicolon();
  }
  return this.finishNode(node, "ExportNamedDeclaration")
};

pp$1.checkExport = function(exports, name, pos) {
  if (!exports) { return }
  if (has(exports, name))
    { this.raiseRecoverable(pos, "Duplicate export '" + name + "'"); }
  exports[name] = true;
};

pp$1.checkPatternExport = function(exports, pat) {
  var this$1 = this;

  var type = pat.type;
  if (type === "Identifier")
    { this.checkExport(exports, pat.name, pat.start); }
  else if (type === "ObjectPattern")
    { for (var i = 0, list = pat.properties; i < list.length; i += 1)
      {
        var prop = list[i];

        this$1.checkPatternExport(exports, prop);
      } }
  else if (type === "ArrayPattern")
    { for (var i$1 = 0, list$1 = pat.elements; i$1 < list$1.length; i$1 += 1) {
      var elt = list$1[i$1];

        if (elt) { this$1.checkPatternExport(exports, elt); }
    } }
  else if (type === "Property")
    { this.checkPatternExport(exports, pat.value); }
  else if (type === "AssignmentPattern")
    { this.checkPatternExport(exports, pat.left); }
  else if (type === "RestElement")
    { this.checkPatternExport(exports, pat.argument); }
  else if (type === "ParenthesizedExpression")
    { this.checkPatternExport(exports, pat.expression); }
};

pp$1.checkVariableExport = function(exports, decls) {
  var this$1 = this;

  if (!exports) { return }
  for (var i = 0, list = decls; i < list.length; i += 1)
    {
    var decl = list[i];

    this$1.checkPatternExport(exports, decl.id);
  }
};

pp$1.shouldParseExportStatement = function() {
  return this.type.keyword === "var" ||
    this.type.keyword === "const" ||
    this.type.keyword === "class" ||
    this.type.keyword === "function" ||
    this.isLet() ||
    this.isAsyncFunction()
};

// Parses a comma-separated list of module exports.

pp$1.parseExportSpecifiers = function(exports) {
  var this$1 = this;

  var nodes = [], first = true;
  // export { x, y as z } [from '...']
  this.expect(types.braceL);
  while (!this.eat(types.braceR)) {
    if (!first) {
      this$1.expect(types.comma);
      if (this$1.afterTrailingComma(types.braceR)) { break }
    } else { first = false; }

    var node = this$1.startNode();
    node.local = this$1.parseIdent(true);
    node.exported = this$1.eatContextual("as") ? this$1.parseIdent(true) : node.local;
    this$1.checkExport(exports, node.exported.name, node.exported.start);
    nodes.push(this$1.finishNode(node, "ExportSpecifier"));
  }
  return nodes
};

// Parses import declaration.

pp$1.parseImport = function(node) {
  this.next();
  // import '...'
  if (this.type === types.string) {
    node.specifiers = empty;
    node.source = this.parseExprAtom();
  } else {
    node.specifiers = this.parseImportSpecifiers();
    this.expectContextual("from");
    node.source = this.type === types.string ? this.parseExprAtom() : this.unexpected();
  }
  this.semicolon();
  return this.finishNode(node, "ImportDeclaration")
};

// Parses a comma-separated list of module imports.

pp$1.parseImportSpecifiers = function() {
  var this$1 = this;

  var nodes = [], first = true;
  if (this.type === types.name) {
    // import defaultObj, { x, y as z } from '...'
    var node = this.startNode();
    node.local = this.parseIdent();
    this.checkLVal(node.local, BIND_LEXICAL);
    nodes.push(this.finishNode(node, "ImportDefaultSpecifier"));
    if (!this.eat(types.comma)) { return nodes }
  }
  if (this.type === types.star) {
    var node$1 = this.startNode();
    this.next();
    this.expectContextual("as");
    node$1.local = this.parseIdent();
    this.checkLVal(node$1.local, BIND_LEXICAL);
    nodes.push(this.finishNode(node$1, "ImportNamespaceSpecifier"));
    return nodes
  }
  this.expect(types.braceL);
  while (!this.eat(types.braceR)) {
    if (!first) {
      this$1.expect(types.comma);
      if (this$1.afterTrailingComma(types.braceR)) { break }
    } else { first = false; }

    var node$2 = this$1.startNode();
    node$2.imported = this$1.parseIdent(true);
    if (this$1.eatContextual("as")) {
      node$2.local = this$1.parseIdent();
    } else {
      this$1.checkUnreserved(node$2.imported);
      node$2.local = node$2.imported;
    }
    this$1.checkLVal(node$2.local, BIND_LEXICAL);
    nodes.push(this$1.finishNode(node$2, "ImportSpecifier"));
  }
  return nodes
};

// Set `ExpressionStatement#directive` property for directive prologues.
pp$1.adaptDirectivePrologue = function(statements) {
  for (var i = 0; i < statements.length && this.isDirectiveCandidate(statements[i]); ++i) {
    statements[i].directive = statements[i].expression.raw.slice(1, -1);
  }
};
pp$1.isDirectiveCandidate = function(statement) {
  return (
    statement.type === "ExpressionStatement" &&
    statement.expression.type === "Literal" &&
    typeof statement.expression.value === "string" &&
    // Reject parenthesized strings.
    (this.input[statement.start] === "\"" || this.input[statement.start] === "'")
  )
};

var pp$2 = Parser.prototype;

// Convert existing expression atom to assignable pattern
// if possible.

pp$2.toAssignable = function(node, isBinding, refDestructuringErrors) {
  var this$1 = this;

  if (this.options.ecmaVersion >= 6 && node) {
    switch (node.type) {
    case "Identifier":
      if (this.inAsync && node.name === "await")
        { this.raise(node.start, "Can not use 'await' as identifier inside an async function"); }
      break

    case "ObjectPattern":
    case "ArrayPattern":
    case "RestElement":
      break

    case "ObjectExpression":
      node.type = "ObjectPattern";
      if (refDestructuringErrors) { this.checkPatternErrors(refDestructuringErrors, true); }
      for (var i = 0, list = node.properties; i < list.length; i += 1) {
        var prop = list[i];

      this$1.toAssignable(prop, isBinding);
        // Early error:
        //   AssignmentRestProperty[Yield, Await] :
        //     `...` DestructuringAssignmentTarget[Yield, Await]
        //
        //   It is a Syntax Error if |DestructuringAssignmentTarget| is an |ArrayLiteral| or an |ObjectLiteral|.
        if (
          prop.type === "RestElement" &&
          (prop.argument.type === "ArrayPattern" || prop.argument.type === "ObjectPattern")
        ) {
          this$1.raise(prop.argument.start, "Unexpected token");
        }
      }
      break

    case "Property":
      // AssignmentProperty has type === "Property"
      if (node.kind !== "init") { this.raise(node.key.start, "Object pattern can't contain getter or setter"); }
      this.toAssignable(node.value, isBinding);
      break

    case "ArrayExpression":
      node.type = "ArrayPattern";
      if (refDestructuringErrors) { this.checkPatternErrors(refDestructuringErrors, true); }
      this.toAssignableList(node.elements, isBinding);
      break

    case "SpreadElement":
      node.type = "RestElement";
      this.toAssignable(node.argument, isBinding);
      if (node.argument.type === "AssignmentPattern")
        { this.raise(node.argument.start, "Rest elements cannot have a default value"); }
      break

    case "AssignmentExpression":
      if (node.operator !== "=") { this.raise(node.left.end, "Only '=' operator can be used for specifying default value."); }
      node.type = "AssignmentPattern";
      delete node.operator;
      this.toAssignable(node.left, isBinding);
      // falls through to AssignmentPattern

    case "AssignmentPattern":
      break

    case "ParenthesizedExpression":
      this.toAssignable(node.expression, isBinding);
      break

    case "MemberExpression":
      if (!isBinding) { break }

    default:
      this.raise(node.start, "Assigning to rvalue");
    }
  } else if (refDestructuringErrors) { this.checkPatternErrors(refDestructuringErrors, true); }
  return node
};

// Convert list of expression atoms to binding list.

pp$2.toAssignableList = function(exprList, isBinding) {
  var this$1 = this;

  var end = exprList.length;
  for (var i = 0; i < end; i++) {
    var elt = exprList[i];
    if (elt) { this$1.toAssignable(elt, isBinding); }
  }
  if (end) {
    var last = exprList[end - 1];
    if (this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier")
      { this.unexpected(last.argument.start); }
  }
  return exprList
};

// Parses spread element.

pp$2.parseSpread = function(refDestructuringErrors) {
  var node = this.startNode();
  this.next();
  node.argument = this.parseMaybeAssign(false, refDestructuringErrors);
  return this.finishNode(node, "SpreadElement")
};

pp$2.parseRestBinding = function() {
  var node = this.startNode();
  this.next();

  // RestElement inside of a function parameter must be an identifier
  if (this.options.ecmaVersion === 6 && this.type !== types.name)
    { this.unexpected(); }

  node.argument = this.parseBindingAtom();

  return this.finishNode(node, "RestElement")
};

// Parses lvalue (assignable) atom.

pp$2.parseBindingAtom = function() {
  if (this.options.ecmaVersion >= 6) {
    switch (this.type) {
    case types.bracketL:
      var node = this.startNode();
      this.next();
      node.elements = this.parseBindingList(types.bracketR, true, true);
      return this.finishNode(node, "ArrayPattern")

    case types.braceL:
      return this.parseObj(true)
    }
  }
  return this.parseIdent()
};

pp$2.parseBindingList = function(close, allowEmpty, allowTrailingComma) {
  var this$1 = this;

  var elts = [], first = true;
  while (!this.eat(close)) {
    if (first) { first = false; }
    else { this$1.expect(types.comma); }
    if (allowEmpty && this$1.type === types.comma) {
      elts.push(null);
    } else if (allowTrailingComma && this$1.afterTrailingComma(close)) {
      break
    } else if (this$1.type === types.ellipsis) {
      var rest = this$1.parseRestBinding();
      this$1.parseBindingListItem(rest);
      elts.push(rest);
      if (this$1.type === types.comma) { this$1.raise(this$1.start, "Comma is not permitted after the rest element"); }
      this$1.expect(close);
      break
    } else {
      var elem = this$1.parseMaybeDefault(this$1.start, this$1.startLoc);
      this$1.parseBindingListItem(elem);
      elts.push(elem);
    }
  }
  return elts
};

pp$2.parseBindingListItem = function(param) {
  return param
};

// Parses assignment pattern around given atom if possible.

pp$2.parseMaybeDefault = function(startPos, startLoc, left) {
  left = left || this.parseBindingAtom();
  if (this.options.ecmaVersion < 6 || !this.eat(types.eq)) { return left }
  var node = this.startNodeAt(startPos, startLoc);
  node.left = left;
  node.right = this.parseMaybeAssign();
  return this.finishNode(node, "AssignmentPattern")
};

// Verify that a node is an lval — something that can be assigned
// to.
// bindingType can be either:
// 'var' indicating that the lval creates a 'var' binding
// 'let' indicating that the lval creates a lexical ('let' or 'const') binding
// 'none' indicating that the binding should be checked for illegal identifiers, but not for duplicate references

pp$2.checkLVal = function(expr, bindingType, checkClashes) {
  var this$1 = this;
  if ( bindingType === void 0 ) bindingType = BIND_NONE;

  switch (expr.type) {
  case "Identifier":
    if (this.strict && this.reservedWordsStrictBind.test(expr.name))
      { this.raiseRecoverable(expr.start, (bindingType ? "Binding " : "Assigning to ") + expr.name + " in strict mode"); }
    if (checkClashes) {
      if (has(checkClashes, expr.name))
        { this.raiseRecoverable(expr.start, "Argument name clash"); }
      checkClashes[expr.name] = true;
    }
    if (bindingType !== BIND_NONE && bindingType !== BIND_OUTSIDE) { this.declareName(expr.name, bindingType, expr.start); }
    break

  case "MemberExpression":
    if (bindingType) { this.raiseRecoverable(expr.start, "Binding member expression"); }
    break

  case "ObjectPattern":
    for (var i = 0, list = expr.properties; i < list.length; i += 1)
      {
    var prop = list[i];

    this$1.checkLVal(prop, bindingType, checkClashes);
  }
    break

  case "Property":
    // AssignmentProperty has type === "Property"
    this.checkLVal(expr.value, bindingType, checkClashes);
    break

  case "ArrayPattern":
    for (var i$1 = 0, list$1 = expr.elements; i$1 < list$1.length; i$1 += 1) {
      var elem = list$1[i$1];

    if (elem) { this$1.checkLVal(elem, bindingType, checkClashes); }
    }
    break

  case "AssignmentPattern":
    this.checkLVal(expr.left, bindingType, checkClashes);
    break

  case "RestElement":
    this.checkLVal(expr.argument, bindingType, checkClashes);
    break

  case "ParenthesizedExpression":
    this.checkLVal(expr.expression, bindingType, checkClashes);
    break

  default:
    this.raise(expr.start, (bindingType ? "Binding" : "Assigning to") + " rvalue");
  }
};

// A recursive descent parser operates by defining functions for all
// syntactic elements, and recursively calling those, each function
// advancing the input stream and returning an AST node. Precedence
// of constructs (for example, the fact that `!x[1]` means `!(x[1])`
// instead of `(!x)[1]` is handled by the fact that the parser
// function that parses unary prefix operators is called first, and
// in turn calls the function that parses `[]` subscripts — that
// way, it'll receive the node for `x[1]` already parsed, and wraps
// *that* in the unary operator node.
//
// Acorn uses an [operator precedence parser][opp] to handle binary
// operator precedence, because it is much more compact than using
// the technique outlined above, which uses different, nesting
// functions to specify precedence, for all of the ten binary
// precedence levels that JavaScript defines.
//
// [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser

var pp$3 = Parser.prototype;

// Check if property name clashes with already added.
// Object/class getters and setters are not allowed to clash —
// either with each other or with an init property — and in
// strict mode, init properties are also not allowed to be repeated.

pp$3.checkPropClash = function(prop, propHash, refDestructuringErrors) {
  if (this.options.ecmaVersion >= 9 && prop.type === "SpreadElement")
    { return }
  if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand))
    { return }
  var key = prop.key;
  var name;
  switch (key.type) {
  case "Identifier": name = key.name; break
  case "Literal": name = String(key.value); break
  default: return
  }
  var kind = prop.kind;
  if (this.options.ecmaVersion >= 6) {
    if (name === "__proto__" && kind === "init") {
      if (propHash.proto) {
        if (refDestructuringErrors && refDestructuringErrors.doubleProto < 0) { refDestructuringErrors.doubleProto = key.start; }
        // Backwards-compat kludge. Can be removed in version 6.0
        else { this.raiseRecoverable(key.start, "Redefinition of __proto__ property"); }
      }
      propHash.proto = true;
    }
    return
  }
  name = "$" + name;
  var other = propHash[name];
  if (other) {
    var redefinition;
    if (kind === "init") {
      redefinition = this.strict && other.init || other.get || other.set;
    } else {
      redefinition = other.init || other[kind];
    }
    if (redefinition)
      { this.raiseRecoverable(key.start, "Redefinition of property"); }
  } else {
    other = propHash[name] = {
      init: false,
      get: false,
      set: false
    };
  }
  other[kind] = true;
};

// ### Expression parsing

// These nest, from the most general expression type at the top to
// 'atomic', nondivisible expression types at the bottom. Most of
// the functions will simply let the function(s) below them parse,
// and, *if* the syntactic construct they handle is present, wrap
// the AST node that the inner parser gave them in another node.

// Parse a full expression. The optional arguments are used to
// forbid the `in` operator (in for loops initalization expressions)
// and provide reference for storing '=' operator inside shorthand
// property assignment in contexts where both object expression
// and object pattern might appear (so it's possible to raise
// delayed syntax error at correct position).

pp$3.parseExpression = function(noIn, refDestructuringErrors) {
  var this$1 = this;

  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseMaybeAssign(noIn, refDestructuringErrors);
  if (this.type === types.comma) {
    var node = this.startNodeAt(startPos, startLoc);
    node.expressions = [expr];
    while (this.eat(types.comma)) { node.expressions.push(this$1.parseMaybeAssign(noIn, refDestructuringErrors)); }
    return this.finishNode(node, "SequenceExpression")
  }
  return expr
};

// Parse an assignment expression. This includes applications of
// operators like `+=`.

pp$3.parseMaybeAssign = function(noIn, refDestructuringErrors, afterLeftParse) {
  if (this.isContextual("yield")) {
    if (this.inGenerator) { return this.parseYield() }
    // The tokenizer will assume an expression is allowed after
    // `yield`, but this isn't that kind of yield
    else { this.exprAllowed = false; }
  }

  var ownDestructuringErrors = false, oldParenAssign = -1, oldTrailingComma = -1, oldShorthandAssign = -1;
  if (refDestructuringErrors) {
    oldParenAssign = refDestructuringErrors.parenthesizedAssign;
    oldTrailingComma = refDestructuringErrors.trailingComma;
    oldShorthandAssign = refDestructuringErrors.shorthandAssign;
    refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = refDestructuringErrors.shorthandAssign = -1;
  } else {
    refDestructuringErrors = new DestructuringErrors;
    ownDestructuringErrors = true;
  }

  var startPos = this.start, startLoc = this.startLoc;
  if (this.type === types.parenL || this.type === types.name)
    { this.potentialArrowAt = this.start; }
  var left = this.parseMaybeConditional(noIn, refDestructuringErrors);
  if (afterLeftParse) { left = afterLeftParse.call(this, left, startPos, startLoc); }
  if (this.type.isAssign) {
    var node = this.startNodeAt(startPos, startLoc);
    node.operator = this.value;
    node.left = this.type === types.eq ? this.toAssignable(left, false, refDestructuringErrors) : left;
    if (!ownDestructuringErrors) { DestructuringErrors.call(refDestructuringErrors); }
    refDestructuringErrors.shorthandAssign = -1; // reset because shorthand default was used correctly
    this.checkLVal(left);
    this.next();
    node.right = this.parseMaybeAssign(noIn);
    return this.finishNode(node, "AssignmentExpression")
  } else {
    if (ownDestructuringErrors) { this.checkExpressionErrors(refDestructuringErrors, true); }
  }
  if (oldParenAssign > -1) { refDestructuringErrors.parenthesizedAssign = oldParenAssign; }
  if (oldTrailingComma > -1) { refDestructuringErrors.trailingComma = oldTrailingComma; }
  if (oldShorthandAssign > -1) { refDestructuringErrors.shorthandAssign = oldShorthandAssign; }
  return left
};

// Parse a ternary conditional (`?:`) operator.

pp$3.parseMaybeConditional = function(noIn, refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseExprOps(noIn, refDestructuringErrors);
  if (this.checkExpressionErrors(refDestructuringErrors)) { return expr }
  if (this.eat(types.question)) {
    var node = this.startNodeAt(startPos, startLoc);
    node.test = expr;
    node.consequent = this.parseMaybeAssign();
    this.expect(types.colon);
    node.alternate = this.parseMaybeAssign(noIn);
    return this.finishNode(node, "ConditionalExpression")
  }
  return expr
};

// Start the precedence parser.

pp$3.parseExprOps = function(noIn, refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseMaybeUnary(refDestructuringErrors, false);
  if (this.checkExpressionErrors(refDestructuringErrors)) { return expr }
  return expr.start === startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, noIn)
};

// Parse binary operators with the operator precedence parsing
// algorithm. `left` is the left-hand side of the operator.
// `minPrec` provides context that allows the function to stop and
// defer further parser to one of its callers when it encounters an
// operator that has a lower precedence than the set it is parsing.

pp$3.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, noIn) {
  var prec = this.type.binop;
  if (prec != null && (!noIn || this.type !== types._in)) {
    if (prec > minPrec) {
      var logical = this.type === types.logicalOR || this.type === types.logicalAND;
      var op = this.value;
      this.next();
      var startPos = this.start, startLoc = this.startLoc;
      var right = this.parseExprOp(this.parseMaybeUnary(null, false), startPos, startLoc, prec, noIn);
      var node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical);
      return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, noIn)
    }
  }
  return left
};

pp$3.buildBinary = function(startPos, startLoc, left, right, op, logical) {
  var node = this.startNodeAt(startPos, startLoc);
  node.left = left;
  node.operator = op;
  node.right = right;
  return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression")
};

// Parse unary operators, both prefix and postfix.

pp$3.parseMaybeUnary = function(refDestructuringErrors, sawUnary) {
  var this$1 = this;

  var startPos = this.start, startLoc = this.startLoc, expr;
  if (this.isContextual("await") && (this.inAsync || (!this.inFunction && this.options.allowAwaitOutsideFunction))) {
    expr = this.parseAwait();
    sawUnary = true;
  } else if (this.type.prefix) {
    var node = this.startNode(), update = this.type === types.incDec;
    node.operator = this.value;
    node.prefix = true;
    this.next();
    node.argument = this.parseMaybeUnary(null, true);
    this.checkExpressionErrors(refDestructuringErrors, true);
    if (update) { this.checkLVal(node.argument); }
    else if (this.strict && node.operator === "delete" &&
             node.argument.type === "Identifier")
      { this.raiseRecoverable(node.start, "Deleting local variable in strict mode"); }
    else { sawUnary = true; }
    expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
  } else {
    expr = this.parseExprSubscripts(refDestructuringErrors);
    if (this.checkExpressionErrors(refDestructuringErrors)) { return expr }
    while (this.type.postfix && !this.canInsertSemicolon()) {
      var node$1 = this$1.startNodeAt(startPos, startLoc);
      node$1.operator = this$1.value;
      node$1.prefix = false;
      node$1.argument = expr;
      this$1.checkLVal(expr);
      this$1.next();
      expr = this$1.finishNode(node$1, "UpdateExpression");
    }
  }

  if (!sawUnary && this.eat(types.starstar))
    { return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false), "**", false) }
  else
    { return expr }
};

// Parse call, dot, and `[]`-subscript expressions.

pp$3.parseExprSubscripts = function(refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseExprAtom(refDestructuringErrors);
  var skipArrowSubscripts = expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")";
  if (this.checkExpressionErrors(refDestructuringErrors) || skipArrowSubscripts) { return expr }
  var result = this.parseSubscripts(expr, startPos, startLoc);
  if (refDestructuringErrors && result.type === "MemberExpression") {
    if (refDestructuringErrors.parenthesizedAssign >= result.start) { refDestructuringErrors.parenthesizedAssign = -1; }
    if (refDestructuringErrors.parenthesizedBind >= result.start) { refDestructuringErrors.parenthesizedBind = -1; }
  }
  return result
};

pp$3.parseSubscripts = function(base, startPos, startLoc, noCalls) {
  var this$1 = this;

  var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" &&
      this.lastTokEnd === base.end && !this.canInsertSemicolon() && this.input.slice(base.start, base.end) === "async";
  for (var computed = (void 0);;) {
    if ((computed = this$1.eat(types.bracketL)) || this$1.eat(types.dot)) {
      var node = this$1.startNodeAt(startPos, startLoc);
      node.object = base;
      node.property = computed ? this$1.parseExpression() : this$1.parseIdent(true);
      node.computed = !!computed;
      if (computed) { this$1.expect(types.bracketR); }
      base = this$1.finishNode(node, "MemberExpression");
    } else if (!noCalls && this$1.eat(types.parenL)) {
      var refDestructuringErrors = new DestructuringErrors, oldYieldPos = this$1.yieldPos, oldAwaitPos = this$1.awaitPos;
      this$1.yieldPos = 0;
      this$1.awaitPos = 0;
      var exprList = this$1.parseExprList(types.parenR, this$1.options.ecmaVersion >= 8, false, refDestructuringErrors);
      if (maybeAsyncArrow && !this$1.canInsertSemicolon() && this$1.eat(types.arrow)) {
        this$1.checkPatternErrors(refDestructuringErrors, false);
        this$1.checkYieldAwaitInDefaultParams();
        this$1.yieldPos = oldYieldPos;
        this$1.awaitPos = oldAwaitPos;
        return this$1.parseArrowExpression(this$1.startNodeAt(startPos, startLoc), exprList, true)
      }
      this$1.checkExpressionErrors(refDestructuringErrors, true);
      this$1.yieldPos = oldYieldPos || this$1.yieldPos;
      this$1.awaitPos = oldAwaitPos || this$1.awaitPos;
      var node$1 = this$1.startNodeAt(startPos, startLoc);
      node$1.callee = base;
      node$1.arguments = exprList;
      base = this$1.finishNode(node$1, "CallExpression");
    } else if (this$1.type === types.backQuote) {
      var node$2 = this$1.startNodeAt(startPos, startLoc);
      node$2.tag = base;
      node$2.quasi = this$1.parseTemplate({isTagged: true});
      base = this$1.finishNode(node$2, "TaggedTemplateExpression");
    } else {
      return base
    }
  }
};

// Parse an atomic expression — either a single token that is an
// expression, an expression started by a keyword like `function` or
// `new`, or an expression wrapped in punctuation like `()`, `[]`,
// or `{}`.

pp$3.parseExprAtom = function(refDestructuringErrors) {
  // If a division operator appears in an expression position, the
  // tokenizer got confused, and we force it to read a regexp instead.
  if (this.type === types.slash) { this.readRegexp(); }

  var node, canBeArrow = this.potentialArrowAt === this.start;
  switch (this.type) {
  case types._super:
    if (!this.allowSuper)
      { this.raise(this.start, "'super' keyword outside a method"); }
    node = this.startNode();
    this.next();
    if (this.type === types.parenL && !this.allowDirectSuper)
      { this.raise(node.start, "super() call outside constructor of a subclass"); }
    // The `super` keyword can appear at below:
    // SuperProperty:
    //     super [ Expression ]
    //     super . IdentifierName
    // SuperCall:
    //     super Arguments
    if (this.type !== types.dot && this.type !== types.bracketL && this.type !== types.parenL)
      { this.unexpected(); }
    return this.finishNode(node, "Super")

  case types._this:
    node = this.startNode();
    this.next();
    return this.finishNode(node, "ThisExpression")

  case types.name:
    var startPos = this.start, startLoc = this.startLoc, containsEsc = this.containsEsc;
    var id = this.parseIdent(this.type !== types.name);
    if (this.options.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(types._function))
      { return this.parseFunction(this.startNodeAt(startPos, startLoc), 0, false, true) }
    if (canBeArrow && !this.canInsertSemicolon()) {
      if (this.eat(types.arrow))
        { return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false) }
      if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types.name && !containsEsc) {
        id = this.parseIdent();
        if (this.canInsertSemicolon() || !this.eat(types.arrow))
          { this.unexpected(); }
        return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true)
      }
    }
    return id

  case types.regexp:
    var value = this.value;
    node = this.parseLiteral(value.value);
    node.regex = {pattern: value.pattern, flags: value.flags};
    return node

  case types.num: case types.string:
    return this.parseLiteral(this.value)

  case types._null: case types._true: case types._false:
    node = this.startNode();
    node.value = this.type === types._null ? null : this.type === types._true;
    node.raw = this.type.keyword;
    this.next();
    return this.finishNode(node, "Literal")

  case types.parenL:
    var start = this.start, expr = this.parseParenAndDistinguishExpression(canBeArrow);
    if (refDestructuringErrors) {
      if (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr))
        { refDestructuringErrors.parenthesizedAssign = start; }
      if (refDestructuringErrors.parenthesizedBind < 0)
        { refDestructuringErrors.parenthesizedBind = start; }
    }
    return expr

  case types.bracketL:
    node = this.startNode();
    this.next();
    node.elements = this.parseExprList(types.bracketR, true, true, refDestructuringErrors);
    return this.finishNode(node, "ArrayExpression")

  case types.braceL:
    return this.parseObj(false, refDestructuringErrors)

  case types._function:
    node = this.startNode();
    this.next();
    return this.parseFunction(node, 0)

  case types._class:
    return this.parseClass(this.startNode(), false)

  case types._new:
    return this.parseNew()

  case types.backQuote:
    return this.parseTemplate()

  default:
    this.unexpected();
  }
};

pp$3.parseLiteral = function(value) {
  var node = this.startNode();
  node.value = value;
  node.raw = this.input.slice(this.start, this.end);
  this.next();
  return this.finishNode(node, "Literal")
};

pp$3.parseParenExpression = function() {
  this.expect(types.parenL);
  var val = this.parseExpression();
  this.expect(types.parenR);
  return val
};

pp$3.parseParenAndDistinguishExpression = function(canBeArrow) {
  var this$1 = this;

  var startPos = this.start, startLoc = this.startLoc, val, allowTrailingComma = this.options.ecmaVersion >= 8;
  if (this.options.ecmaVersion >= 6) {
    this.next();

    var innerStartPos = this.start, innerStartLoc = this.startLoc;
    var exprList = [], first = true, lastIsComma = false;
    var refDestructuringErrors = new DestructuringErrors, oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, spreadStart;
    this.yieldPos = 0;
    this.awaitPos = 0;
    while (this.type !== types.parenR) {
      first ? first = false : this$1.expect(types.comma);
      if (allowTrailingComma && this$1.afterTrailingComma(types.parenR, true)) {
        lastIsComma = true;
        break
      } else if (this$1.type === types.ellipsis) {
        spreadStart = this$1.start;
        exprList.push(this$1.parseParenItem(this$1.parseRestBinding()));
        if (this$1.type === types.comma) { this$1.raise(this$1.start, "Comma is not permitted after the rest element"); }
        break
      } else {
        exprList.push(this$1.parseMaybeAssign(false, refDestructuringErrors, this$1.parseParenItem));
      }
    }
    var innerEndPos = this.start, innerEndLoc = this.startLoc;
    this.expect(types.parenR);

    if (canBeArrow && !this.canInsertSemicolon() && this.eat(types.arrow)) {
      this.checkPatternErrors(refDestructuringErrors, false);
      this.checkYieldAwaitInDefaultParams();
      this.yieldPos = oldYieldPos;
      this.awaitPos = oldAwaitPos;
      return this.parseParenArrowList(startPos, startLoc, exprList)
    }

    if (!exprList.length || lastIsComma) { this.unexpected(this.lastTokStart); }
    if (spreadStart) { this.unexpected(spreadStart); }
    this.checkExpressionErrors(refDestructuringErrors, true);
    this.yieldPos = oldYieldPos || this.yieldPos;
    this.awaitPos = oldAwaitPos || this.awaitPos;

    if (exprList.length > 1) {
      val = this.startNodeAt(innerStartPos, innerStartLoc);
      val.expressions = exprList;
      this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
    } else {
      val = exprList[0];
    }
  } else {
    val = this.parseParenExpression();
  }

  if (this.options.preserveParens) {
    var par = this.startNodeAt(startPos, startLoc);
    par.expression = val;
    return this.finishNode(par, "ParenthesizedExpression")
  } else {
    return val
  }
};

pp$3.parseParenItem = function(item) {
  return item
};

pp$3.parseParenArrowList = function(startPos, startLoc, exprList) {
  return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList)
};

// New's precedence is slightly tricky. It must allow its argument to
// be a `[]` or dot subscript expression, but not a call — at least,
// not without wrapping it in parentheses. Thus, it uses the noCalls
// argument to parseSubscripts to prevent it from consuming the
// argument list.

var empty$1 = [];

pp$3.parseNew = function() {
  var node = this.startNode();
  var meta = this.parseIdent(true);
  if (this.options.ecmaVersion >= 6 && this.eat(types.dot)) {
    node.meta = meta;
    var containsEsc = this.containsEsc;
    node.property = this.parseIdent(true);
    if (node.property.name !== "target" || containsEsc)
      { this.raiseRecoverable(node.property.start, "The only valid meta property for new is new.target"); }
    if (!this.inNonArrowFunction())
      { this.raiseRecoverable(node.start, "new.target can only be used in functions"); }
    return this.finishNode(node, "MetaProperty")
  }
  var startPos = this.start, startLoc = this.startLoc;
  node.callee = this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true);
  if (this.eat(types.parenL)) { node.arguments = this.parseExprList(types.parenR, this.options.ecmaVersion >= 8, false); }
  else { node.arguments = empty$1; }
  return this.finishNode(node, "NewExpression")
};

// Parse template expression.

pp$3.parseTemplateElement = function(ref) {
  var isTagged = ref.isTagged;

  var elem = this.startNode();
  if (this.type === types.invalidTemplate) {
    if (!isTagged) {
      this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
    }
    elem.value = {
      raw: this.value,
      cooked: null
    };
  } else {
    elem.value = {
      raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
      cooked: this.value
    };
  }
  this.next();
  elem.tail = this.type === types.backQuote;
  return this.finishNode(elem, "TemplateElement")
};

pp$3.parseTemplate = function(ref) {
  var this$1 = this;
  if ( ref === void 0 ) ref = {};
  var isTagged = ref.isTagged; if ( isTagged === void 0 ) isTagged = false;

  var node = this.startNode();
  this.next();
  node.expressions = [];
  var curElt = this.parseTemplateElement({isTagged: isTagged});
  node.quasis = [curElt];
  while (!curElt.tail) {
    if (this$1.type === types.eof) { this$1.raise(this$1.pos, "Unterminated template literal"); }
    this$1.expect(types.dollarBraceL);
    node.expressions.push(this$1.parseExpression());
    this$1.expect(types.braceR);
    node.quasis.push(curElt = this$1.parseTemplateElement({isTagged: isTagged}));
  }
  this.next();
  return this.finishNode(node, "TemplateLiteral")
};

pp$3.isAsyncProp = function(prop) {
  return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" &&
    (this.type === types.name || this.type === types.num || this.type === types.string || this.type === types.bracketL || this.type.keyword || (this.options.ecmaVersion >= 9 && this.type === types.star)) &&
    !lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
};

// Parse an object literal or binding pattern.

pp$3.parseObj = function(isPattern, refDestructuringErrors) {
  var this$1 = this;

  var node = this.startNode(), first = true, propHash = {};
  node.properties = [];
  this.next();
  while (!this.eat(types.braceR)) {
    if (!first) {
      this$1.expect(types.comma);
      if (this$1.afterTrailingComma(types.braceR)) { break }
    } else { first = false; }

    var prop = this$1.parseProperty(isPattern, refDestructuringErrors);
    if (!isPattern) { this$1.checkPropClash(prop, propHash, refDestructuringErrors); }
    node.properties.push(prop);
  }
  return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression")
};

pp$3.parseProperty = function(isPattern, refDestructuringErrors) {
  var prop = this.startNode(), isGenerator, isAsync, startPos, startLoc;
  if (this.options.ecmaVersion >= 9 && this.eat(types.ellipsis)) {
    if (isPattern) {
      prop.argument = this.parseIdent(false);
      if (this.type === types.comma) {
        this.raise(this.start, "Comma is not permitted after the rest element");
      }
      return this.finishNode(prop, "RestElement")
    }
    // To disallow parenthesized identifier via `this.toAssignable()`.
    if (this.type === types.parenL && refDestructuringErrors) {
      if (refDestructuringErrors.parenthesizedAssign < 0) {
        refDestructuringErrors.parenthesizedAssign = this.start;
      }
      if (refDestructuringErrors.parenthesizedBind < 0) {
        refDestructuringErrors.parenthesizedBind = this.start;
      }
    }
    // Parse argument.
    prop.argument = this.parseMaybeAssign(false, refDestructuringErrors);
    // To disallow trailing comma via `this.toAssignable()`.
    if (this.type === types.comma && refDestructuringErrors && refDestructuringErrors.trailingComma < 0) {
      refDestructuringErrors.trailingComma = this.start;
    }
    // Finish
    return this.finishNode(prop, "SpreadElement")
  }
  if (this.options.ecmaVersion >= 6) {
    prop.method = false;
    prop.shorthand = false;
    if (isPattern || refDestructuringErrors) {
      startPos = this.start;
      startLoc = this.startLoc;
    }
    if (!isPattern)
      { isGenerator = this.eat(types.star); }
  }
  var containsEsc = this.containsEsc;
  this.parsePropertyName(prop);
  if (!isPattern && !containsEsc && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop)) {
    isAsync = true;
    isGenerator = this.options.ecmaVersion >= 9 && this.eat(types.star);
    this.parsePropertyName(prop, refDestructuringErrors);
  } else {
    isAsync = false;
  }
  this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc);
  return this.finishNode(prop, "Property")
};

pp$3.parsePropertyValue = function(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc) {
  if ((isGenerator || isAsync) && this.type === types.colon)
    { this.unexpected(); }

  if (this.eat(types.colon)) {
    prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
    prop.kind = "init";
  } else if (this.options.ecmaVersion >= 6 && this.type === types.parenL) {
    if (isPattern) { this.unexpected(); }
    prop.kind = "init";
    prop.method = true;
    prop.value = this.parseMethod(isGenerator, isAsync);
  } else if (!isPattern && !containsEsc &&
             this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" &&
             (prop.key.name === "get" || prop.key.name === "set") &&
             (this.type !== types.comma && this.type !== types.braceR)) {
    if (isGenerator || isAsync) { this.unexpected(); }
    prop.kind = prop.key.name;
    this.parsePropertyName(prop);
    prop.value = this.parseMethod(false);
    var paramCount = prop.kind === "get" ? 0 : 1;
    if (prop.value.params.length !== paramCount) {
      var start = prop.value.start;
      if (prop.kind === "get")
        { this.raiseRecoverable(start, "getter should have no params"); }
      else
        { this.raiseRecoverable(start, "setter should have exactly one param"); }
    } else {
      if (prop.kind === "set" && prop.value.params[0].type === "RestElement")
        { this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params"); }
    }
  } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
    this.checkUnreserved(prop.key);
    prop.kind = "init";
    if (isPattern) {
      prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
    } else if (this.type === types.eq && refDestructuringErrors) {
      if (refDestructuringErrors.shorthandAssign < 0)
        { refDestructuringErrors.shorthandAssign = this.start; }
      prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
    } else {
      prop.value = prop.key;
    }
    prop.shorthand = true;
  } else { this.unexpected(); }
};

pp$3.parsePropertyName = function(prop) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(types.bracketL)) {
      prop.computed = true;
      prop.key = this.parseMaybeAssign();
      this.expect(types.bracketR);
      return prop.key
    } else {
      prop.computed = false;
    }
  }
  return prop.key = this.type === types.num || this.type === types.string ? this.parseExprAtom() : this.parseIdent(true)
};

// Initialize empty function node.

pp$3.initFunction = function(node) {
  node.id = null;
  if (this.options.ecmaVersion >= 6) { node.generator = node.expression = false; }
  if (this.options.ecmaVersion >= 8) { node.async = false; }
};

// Parse object or class method.

pp$3.parseMethod = function(isGenerator, isAsync, allowDirectSuper) {
  var node = this.startNode(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos;

  this.initFunction(node);
  if (this.options.ecmaVersion >= 6)
    { node.generator = isGenerator; }
  if (this.options.ecmaVersion >= 8)
    { node.async = !!isAsync; }

  this.yieldPos = 0;
  this.awaitPos = 0;
  this.enterScope(functionFlags(isAsync, node.generator) | SCOPE_SUPER | (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0));

  this.expect(types.parenL);
  node.params = this.parseBindingList(types.parenR, false, this.options.ecmaVersion >= 8);
  this.checkYieldAwaitInDefaultParams();
  this.parseFunctionBody(node, false);

  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  return this.finishNode(node, "FunctionExpression")
};

// Parse arrow function expression with given parameters.

pp$3.parseArrowExpression = function(node, params, isAsync) {
  var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos;

  this.enterScope(functionFlags(isAsync, false) | SCOPE_ARROW);
  this.initFunction(node);
  if (this.options.ecmaVersion >= 8) { node.async = !!isAsync; }

  this.yieldPos = 0;
  this.awaitPos = 0;

  node.params = this.toAssignableList(params, true);
  this.parseFunctionBody(node, true);

  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  return this.finishNode(node, "ArrowFunctionExpression")
};

// Parse function body and check parameters.

pp$3.parseFunctionBody = function(node, isArrowFunction) {
  var isExpression = isArrowFunction && this.type !== types.braceL;
  var oldStrict = this.strict, useStrict = false;

  if (isExpression) {
    node.body = this.parseMaybeAssign();
    node.expression = true;
    this.checkParams(node, false);
  } else {
    var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params);
    if (!oldStrict || nonSimple) {
      useStrict = this.strictDirective(this.end);
      // If this is a strict mode function, verify that argument names
      // are not repeated, and it does not try to bind the words `eval`
      // or `arguments`.
      if (useStrict && nonSimple)
        { this.raiseRecoverable(node.start, "Illegal 'use strict' directive in function with non-simple parameter list"); }
    }
    // Start a new scope with regard to labels and the `inFunction`
    // flag (restore them to their old value afterwards).
    var oldLabels = this.labels;
    this.labels = [];
    if (useStrict) { this.strict = true; }

    // Add the params to varDeclaredNames to ensure that an error is thrown
    // if a let/const declaration in the function clashes with one of the params.
    this.checkParams(node, !oldStrict && !useStrict && !isArrowFunction && this.isSimpleParamList(node.params));
    node.body = this.parseBlock(false);
    node.expression = false;
    this.adaptDirectivePrologue(node.body.body);
    this.labels = oldLabels;
  }
  this.exitScope();

  // Ensure the function name isn't a forbidden identifier in strict mode, e.g. 'eval'
  if (this.strict && node.id) { this.checkLVal(node.id, BIND_OUTSIDE); }
  this.strict = oldStrict;
};

pp$3.isSimpleParamList = function(params) {
  for (var i = 0, list = params; i < list.length; i += 1)
    {
    var param = list[i];

    if (param.type !== "Identifier") { return false
  } }
  return true
};

// Checks function params for various disallowed patterns such as using "eval"
// or "arguments" and duplicate parameters.

pp$3.checkParams = function(node, allowDuplicates) {
  var this$1 = this;

  var nameHash = {};
  for (var i = 0, list = node.params; i < list.length; i += 1)
    {
    var param = list[i];

    this$1.checkLVal(param, BIND_VAR, allowDuplicates ? null : nameHash);
  }
};

// Parses a comma-separated list of expressions, and returns them as
// an array. `close` is the token type that ends the list, and
// `allowEmpty` can be turned on to allow subsequent commas with
// nothing in between them to be parsed as `null` (which is needed
// for array literals).

pp$3.parseExprList = function(close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
  var this$1 = this;

  var elts = [], first = true;
  while (!this.eat(close)) {
    if (!first) {
      this$1.expect(types.comma);
      if (allowTrailingComma && this$1.afterTrailingComma(close)) { break }
    } else { first = false; }

    var elt = (void 0);
    if (allowEmpty && this$1.type === types.comma)
      { elt = null; }
    else if (this$1.type === types.ellipsis) {
      elt = this$1.parseSpread(refDestructuringErrors);
      if (refDestructuringErrors && this$1.type === types.comma && refDestructuringErrors.trailingComma < 0)
        { refDestructuringErrors.trailingComma = this$1.start; }
    } else {
      elt = this$1.parseMaybeAssign(false, refDestructuringErrors);
    }
    elts.push(elt);
  }
  return elts
};

pp$3.checkUnreserved = function(ref) {
  var start = ref.start;
  var end = ref.end;
  var name = ref.name;

  if (this.inGenerator && name === "yield")
    { this.raiseRecoverable(start, "Can not use 'yield' as identifier inside a generator"); }
  if (this.inAsync && name === "await")
    { this.raiseRecoverable(start, "Can not use 'await' as identifier inside an async function"); }
  if (this.keywords.test(name))
    { this.raise(start, ("Unexpected keyword '" + name + "'")); }
  if (this.options.ecmaVersion < 6 &&
    this.input.slice(start, end).indexOf("\\") !== -1) { return }
  var re = this.strict ? this.reservedWordsStrict : this.reservedWords;
  if (re.test(name)) {
    if (!this.inAsync && name === "await")
      { this.raiseRecoverable(start, "Can not use keyword 'await' outside an async function"); }
    this.raiseRecoverable(start, ("The keyword '" + name + "' is reserved"));
  }
};

// Parse the next token as an identifier. If `liberal` is true (used
// when parsing properties), it will also convert keywords into
// identifiers.

pp$3.parseIdent = function(liberal, isBinding) {
  var node = this.startNode();
  if (liberal && this.options.allowReserved === "never") { liberal = false; }
  if (this.type === types.name) {
    node.name = this.value;
  } else if (this.type.keyword) {
    node.name = this.type.keyword;

    // To fix https://github.com/acornjs/acorn/issues/575
    // `class` and `function` keywords push new context into this.context.
    // But there is no chance to pop the context if the keyword is consumed as an identifier such as a property name.
    // If the previous token is a dot, this does not apply because the context-managing code already ignored the keyword
    if ((node.name === "class" || node.name === "function") &&
        (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46)) {
      this.context.pop();
    }
  } else {
    this.unexpected();
  }
  this.next();
  this.finishNode(node, "Identifier");
  if (!liberal) { this.checkUnreserved(node); }
  return node
};

// Parses yield expression inside generator.

pp$3.parseYield = function() {
  if (!this.yieldPos) { this.yieldPos = this.start; }

  var node = this.startNode();
  this.next();
  if (this.type === types.semi || this.canInsertSemicolon() || (this.type !== types.star && !this.type.startsExpr)) {
    node.delegate = false;
    node.argument = null;
  } else {
    node.delegate = this.eat(types.star);
    node.argument = this.parseMaybeAssign();
  }
  return this.finishNode(node, "YieldExpression")
};

pp$3.parseAwait = function() {
  if (!this.awaitPos) { this.awaitPos = this.start; }

  var node = this.startNode();
  this.next();
  node.argument = this.parseMaybeUnary(null, true);
  return this.finishNode(node, "AwaitExpression")
};

var pp$4 = Parser.prototype;

// This function is used to raise exceptions on parse errors. It
// takes an offset integer (into the current `input`) to indicate
// the location of the error, attaches the position to the end
// of the error message, and then raises a `SyntaxError` with that
// message.

pp$4.raise = function(pos, message) {
  var loc = getLineInfo(this.input, pos);
  message += " (" + loc.line + ":" + loc.column + ")";
  var err = new SyntaxError(message);
  err.pos = pos; err.loc = loc; err.raisedAt = this.pos;
  throw err
};

pp$4.raiseRecoverable = pp$4.raise;

pp$4.curPosition = function() {
  if (this.options.locations) {
    return new Position(this.curLine, this.pos - this.lineStart)
  }
};

var pp$5 = Parser.prototype;

var Scope = function Scope(flags) {
  this.flags = flags;
  // A list of var-declared names in the current lexical scope
  this.var = [];
  // A list of lexically-declared names in the current lexical scope
  this.lexical = [];
};

// The functions in this module keep track of declared variables in the current scope in order to detect duplicate variable names.

pp$5.enterScope = function(flags) {
  this.scopeStack.push(new Scope(flags));
};

pp$5.exitScope = function() {
  this.scopeStack.pop();
};

pp$5.declareName = function(name, bindingType, pos) {
  var this$1 = this;

  var redeclared = false;
  if (bindingType === BIND_LEXICAL) {
    var scope = this.currentScope();
    redeclared = scope.lexical.indexOf(name) > -1 || scope.var.indexOf(name) > -1;
    scope.lexical.push(name);
  } else if (bindingType === BIND_SIMPLE_CATCH) {
    var scope$1 = this.currentScope();
    scope$1.lexical.push(name);
  } else if (bindingType === BIND_FUNCTION) {
    var scope$2 = this.currentScope();
    redeclared = scope$2.lexical.indexOf(name) > -1;
    scope$2.var.push(name);
  } else {
    for (var i = this.scopeStack.length - 1; i >= 0; --i) {
      var scope$3 = this$1.scopeStack[i];
      if (scope$3.lexical.indexOf(name) > -1 && !(scope$3.flags & SCOPE_SIMPLE_CATCH) && scope$3.lexical[0] === name) { redeclared = true; }
      scope$3.var.push(name);
      if (scope$3.flags & SCOPE_VAR) { break }
    }
  }
  if (redeclared) { this.raiseRecoverable(pos, ("Identifier '" + name + "' has already been declared")); }
};

pp$5.currentScope = function() {
  return this.scopeStack[this.scopeStack.length - 1]
};

pp$5.currentVarScope = function() {
  var this$1 = this;

  for (var i = this.scopeStack.length - 1;; i--) {
    var scope = this$1.scopeStack[i];
    if (scope.flags & SCOPE_VAR) { return scope }
  }
};

// Could be useful for `this`, `new.target`, `super()`, `super.property`, and `super[property]`.
pp$5.currentThisScope = function() {
  var this$1 = this;

  for (var i = this.scopeStack.length - 1;; i--) {
    var scope = this$1.scopeStack[i];
    if (scope.flags & SCOPE_VAR && !(scope.flags & SCOPE_ARROW)) { return scope }
  }
};

var Node = function Node(parser, pos, loc) {
  this.type = "";
  this.start = pos;
  this.end = 0;
  if (parser.options.locations)
    { this.loc = new SourceLocation(parser, loc); }
  if (parser.options.directSourceFile)
    { this.sourceFile = parser.options.directSourceFile; }
  if (parser.options.ranges)
    { this.range = [pos, 0]; }
};

// Start an AST node, attaching a start offset.

var pp$6 = Parser.prototype;

pp$6.startNode = function() {
  return new Node(this, this.start, this.startLoc)
};

pp$6.startNodeAt = function(pos, loc) {
  return new Node(this, pos, loc)
};

// Finish an AST node, adding `type` and `end` properties.

function finishNodeAt(node, type, pos, loc) {
  node.type = type;
  node.end = pos;
  if (this.options.locations)
    { node.loc.end = loc; }
  if (this.options.ranges)
    { node.range[1] = pos; }
  return node
}

pp$6.finishNode = function(node, type) {
  return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc)
};

// Finish node at given position

pp$6.finishNodeAt = function(node, type, pos, loc) {
  return finishNodeAt.call(this, node, type, pos, loc)
};

// The algorithm used to determine whether a regexp can appear at a
// given point in the program is loosely based on sweet.js' approach.
// See https://github.com/mozilla/sweet.js/wiki/design

var TokContext = function TokContext(token, isExpr, preserveSpace, override, generator) {
  this.token = token;
  this.isExpr = !!isExpr;
  this.preserveSpace = !!preserveSpace;
  this.override = override;
  this.generator = !!generator;
};

var types$1 = {
  b_stat: new TokContext("{", false),
  b_expr: new TokContext("{", true),
  b_tmpl: new TokContext("${", false),
  p_stat: new TokContext("(", false),
  p_expr: new TokContext("(", true),
  q_tmpl: new TokContext("`", true, true, function (p) { return p.tryReadTemplateToken(); }),
  f_stat: new TokContext("function", false),
  f_expr: new TokContext("function", true),
  f_expr_gen: new TokContext("function", true, false, null, true),
  f_gen: new TokContext("function", false, false, null, true)
};

var pp$7 = Parser.prototype;

pp$7.initialContext = function() {
  return [types$1.b_stat]
};

pp$7.braceIsBlock = function(prevType) {
  var parent = this.curContext();
  if (parent === types$1.f_expr || parent === types$1.f_stat)
    { return true }
  if (prevType === types.colon && (parent === types$1.b_stat || parent === types$1.b_expr))
    { return !parent.isExpr }

  // The check for `tt.name && exprAllowed` detects whether we are
  // after a `yield` or `of` construct. See the `updateContext` for
  // `tt.name`.
  if (prevType === types._return || prevType === types.name && this.exprAllowed)
    { return lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) }
  if (prevType === types._else || prevType === types.semi || prevType === types.eof || prevType === types.parenR || prevType === types.arrow)
    { return true }
  if (prevType === types.braceL)
    { return parent === types$1.b_stat }
  if (prevType === types._var || prevType === types._const || prevType === types.name)
    { return false }
  return !this.exprAllowed
};

pp$7.inGeneratorContext = function() {
  var this$1 = this;

  for (var i = this.context.length - 1; i >= 1; i--) {
    var context = this$1.context[i];
    if (context.token === "function")
      { return context.generator }
  }
  return false
};

pp$7.updateContext = function(prevType) {
  var update, type = this.type;
  if (type.keyword && prevType === types.dot)
    { this.exprAllowed = false; }
  else if (update = type.updateContext)
    { update.call(this, prevType); }
  else
    { this.exprAllowed = type.beforeExpr; }
};

// Token-specific context update code

types.parenR.updateContext = types.braceR.updateContext = function() {
  if (this.context.length === 1) {
    this.exprAllowed = true;
    return
  }
  var out = this.context.pop();
  if (out === types$1.b_stat && this.curContext().token === "function") {
    out = this.context.pop();
  }
  this.exprAllowed = !out.isExpr;
};

types.braceL.updateContext = function(prevType) {
  this.context.push(this.braceIsBlock(prevType) ? types$1.b_stat : types$1.b_expr);
  this.exprAllowed = true;
};

types.dollarBraceL.updateContext = function() {
  this.context.push(types$1.b_tmpl);
  this.exprAllowed = true;
};

types.parenL.updateContext = function(prevType) {
  var statementParens = prevType === types._if || prevType === types._for || prevType === types._with || prevType === types._while;
  this.context.push(statementParens ? types$1.p_stat : types$1.p_expr);
  this.exprAllowed = true;
};

types.incDec.updateContext = function() {
  // tokExprAllowed stays unchanged
};

types._function.updateContext = types._class.updateContext = function(prevType) {
  if (prevType.beforeExpr && prevType !== types.semi && prevType !== types._else &&
      !(prevType === types._return && lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) &&
      !((prevType === types.colon || prevType === types.braceL) && this.curContext() === types$1.b_stat))
    { this.context.push(types$1.f_expr); }
  else
    { this.context.push(types$1.f_stat); }
  this.exprAllowed = false;
};

types.backQuote.updateContext = function() {
  if (this.curContext() === types$1.q_tmpl)
    { this.context.pop(); }
  else
    { this.context.push(types$1.q_tmpl); }
  this.exprAllowed = false;
};

types.star.updateContext = function(prevType) {
  if (prevType === types._function) {
    var index = this.context.length - 1;
    if (this.context[index] === types$1.f_expr)
      { this.context[index] = types$1.f_expr_gen; }
    else
      { this.context[index] = types$1.f_gen; }
  }
  this.exprAllowed = true;
};

types.name.updateContext = function(prevType) {
  var allowed = false;
  if (this.options.ecmaVersion >= 6 && prevType !== types.dot) {
    if (this.value === "of" && !this.exprAllowed ||
        this.value === "yield" && this.inGeneratorContext())
      { allowed = true; }
  }
  this.exprAllowed = allowed;
};

var data = {
  "$LONE": [
    "ASCII",
    "ASCII_Hex_Digit",
    "AHex",
    "Alphabetic",
    "Alpha",
    "Any",
    "Assigned",
    "Bidi_Control",
    "Bidi_C",
    "Bidi_Mirrored",
    "Bidi_M",
    "Case_Ignorable",
    "CI",
    "Cased",
    "Changes_When_Casefolded",
    "CWCF",
    "Changes_When_Casemapped",
    "CWCM",
    "Changes_When_Lowercased",
    "CWL",
    "Changes_When_NFKC_Casefolded",
    "CWKCF",
    "Changes_When_Titlecased",
    "CWT",
    "Changes_When_Uppercased",
    "CWU",
    "Dash",
    "Default_Ignorable_Code_Point",
    "DI",
    "Deprecated",
    "Dep",
    "Diacritic",
    "Dia",
    "Emoji",
    "Emoji_Component",
    "Emoji_Modifier",
    "Emoji_Modifier_Base",
    "Emoji_Presentation",
    "Extender",
    "Ext",
    "Grapheme_Base",
    "Gr_Base",
    "Grapheme_Extend",
    "Gr_Ext",
    "Hex_Digit",
    "Hex",
    "IDS_Binary_Operator",
    "IDSB",
    "IDS_Trinary_Operator",
    "IDST",
    "ID_Continue",
    "IDC",
    "ID_Start",
    "IDS",
    "Ideographic",
    "Ideo",
    "Join_Control",
    "Join_C",
    "Logical_Order_Exception",
    "LOE",
    "Lowercase",
    "Lower",
    "Math",
    "Noncharacter_Code_Point",
    "NChar",
    "Pattern_Syntax",
    "Pat_Syn",
    "Pattern_White_Space",
    "Pat_WS",
    "Quotation_Mark",
    "QMark",
    "Radical",
    "Regional_Indicator",
    "RI",
    "Sentence_Terminal",
    "STerm",
    "Soft_Dotted",
    "SD",
    "Terminal_Punctuation",
    "Term",
    "Unified_Ideograph",
    "UIdeo",
    "Uppercase",
    "Upper",
    "Variation_Selector",
    "VS",
    "White_Space",
    "space",
    "XID_Continue",
    "XIDC",
    "XID_Start",
    "XIDS"
  ],
  "General_Category": [
    "Cased_Letter",
    "LC",
    "Close_Punctuation",
    "Pe",
    "Connector_Punctuation",
    "Pc",
    "Control",
    "Cc",
    "cntrl",
    "Currency_Symbol",
    "Sc",
    "Dash_Punctuation",
    "Pd",
    "Decimal_Number",
    "Nd",
    "digit",
    "Enclosing_Mark",
    "Me",
    "Final_Punctuation",
    "Pf",
    "Format",
    "Cf",
    "Initial_Punctuation",
    "Pi",
    "Letter",
    "L",
    "Letter_Number",
    "Nl",
    "Line_Separator",
    "Zl",
    "Lowercase_Letter",
    "Ll",
    "Mark",
    "M",
    "Combining_Mark",
    "Math_Symbol",
    "Sm",
    "Modifier_Letter",
    "Lm",
    "Modifier_Symbol",
    "Sk",
    "Nonspacing_Mark",
    "Mn",
    "Number",
    "N",
    "Open_Punctuation",
    "Ps",
    "Other",
    "C",
    "Other_Letter",
    "Lo",
    "Other_Number",
    "No",
    "Other_Punctuation",
    "Po",
    "Other_Symbol",
    "So",
    "Paragraph_Separator",
    "Zp",
    "Private_Use",
    "Co",
    "Punctuation",
    "P",
    "punct",
    "Separator",
    "Z",
    "Space_Separator",
    "Zs",
    "Spacing_Mark",
    "Mc",
    "Surrogate",
    "Cs",
    "Symbol",
    "S",
    "Titlecase_Letter",
    "Lt",
    "Unassigned",
    "Cn",
    "Uppercase_Letter",
    "Lu"
  ],
  "Script": [
    "Adlam",
    "Adlm",
    "Ahom",
    "Anatolian_Hieroglyphs",
    "Hluw",
    "Arabic",
    "Arab",
    "Armenian",
    "Armn",
    "Avestan",
    "Avst",
    "Balinese",
    "Bali",
    "Bamum",
    "Bamu",
    "Bassa_Vah",
    "Bass",
    "Batak",
    "Batk",
    "Bengali",
    "Beng",
    "Bhaiksuki",
    "Bhks",
    "Bopomofo",
    "Bopo",
    "Brahmi",
    "Brah",
    "Braille",
    "Brai",
    "Buginese",
    "Bugi",
    "Buhid",
    "Buhd",
    "Canadian_Aboriginal",
    "Cans",
    "Carian",
    "Cari",
    "Caucasian_Albanian",
    "Aghb",
    "Chakma",
    "Cakm",
    "Cham",
    "Cherokee",
    "Cher",
    "Common",
    "Zyyy",
    "Coptic",
    "Copt",
    "Qaac",
    "Cuneiform",
    "Xsux",
    "Cypriot",
    "Cprt",
    "Cyrillic",
    "Cyrl",
    "Deseret",
    "Dsrt",
    "Devanagari",
    "Deva",
    "Duployan",
    "Dupl",
    "Egyptian_Hieroglyphs",
    "Egyp",
    "Elbasan",
    "Elba",
    "Ethiopic",
    "Ethi",
    "Georgian",
    "Geor",
    "Glagolitic",
    "Glag",
    "Gothic",
    "Goth",
    "Grantha",
    "Gran",
    "Greek",
    "Grek",
    "Gujarati",
    "Gujr",
    "Gurmukhi",
    "Guru",
    "Han",
    "Hani",
    "Hangul",
    "Hang",
    "Hanunoo",
    "Hano",
    "Hatran",
    "Hatr",
    "Hebrew",
    "Hebr",
    "Hiragana",
    "Hira",
    "Imperial_Aramaic",
    "Armi",
    "Inherited",
    "Zinh",
    "Qaai",
    "Inscriptional_Pahlavi",
    "Phli",
    "Inscriptional_Parthian",
    "Prti",
    "Javanese",
    "Java",
    "Kaithi",
    "Kthi",
    "Kannada",
    "Knda",
    "Katakana",
    "Kana",
    "Kayah_Li",
    "Kali",
    "Kharoshthi",
    "Khar",
    "Khmer",
    "Khmr",
    "Khojki",
    "Khoj",
    "Khudawadi",
    "Sind",
    "Lao",
    "Laoo",
    "Latin",
    "Latn",
    "Lepcha",
    "Lepc",
    "Limbu",
    "Limb",
    "Linear_A",
    "Lina",
    "Linear_B",
    "Linb",
    "Lisu",
    "Lycian",
    "Lyci",
    "Lydian",
    "Lydi",
    "Mahajani",
    "Mahj",
    "Malayalam",
    "Mlym",
    "Mandaic",
    "Mand",
    "Manichaean",
    "Mani",
    "Marchen",
    "Marc",
    "Masaram_Gondi",
    "Gonm",
    "Meetei_Mayek",
    "Mtei",
    "Mende_Kikakui",
    "Mend",
    "Meroitic_Cursive",
    "Merc",
    "Meroitic_Hieroglyphs",
    "Mero",
    "Miao",
    "Plrd",
    "Modi",
    "Mongolian",
    "Mong",
    "Mro",
    "Mroo",
    "Multani",
    "Mult",
    "Myanmar",
    "Mymr",
    "Nabataean",
    "Nbat",
    "New_Tai_Lue",
    "Talu",
    "Newa",
    "Nko",
    "Nkoo",
    "Nushu",
    "Nshu",
    "Ogham",
    "Ogam",
    "Ol_Chiki",
    "Olck",
    "Old_Hungarian",
    "Hung",
    "Old_Italic",
    "Ital",
    "Old_North_Arabian",
    "Narb",
    "Old_Permic",
    "Perm",
    "Old_Persian",
    "Xpeo",
    "Old_South_Arabian",
    "Sarb",
    "Old_Turkic",
    "Orkh",
    "Oriya",
    "Orya",
    "Osage",
    "Osge",
    "Osmanya",
    "Osma",
    "Pahawh_Hmong",
    "Hmng",
    "Palmyrene",
    "Palm",
    "Pau_Cin_Hau",
    "Pauc",
    "Phags_Pa",
    "Phag",
    "Phoenician",
    "Phnx",
    "Psalter_Pahlavi",
    "Phlp",
    "Rejang",
    "Rjng",
    "Runic",
    "Runr",
    "Samaritan",
    "Samr",
    "Saurashtra",
    "Saur",
    "Sharada",
    "Shrd",
    "Shavian",
    "Shaw",
    "Siddham",
    "Sidd",
    "SignWriting",
    "Sgnw",
    "Sinhala",
    "Sinh",
    "Sora_Sompeng",
    "Sora",
    "Soyombo",
    "Soyo",
    "Sundanese",
    "Sund",
    "Syloti_Nagri",
    "Sylo",
    "Syriac",
    "Syrc",
    "Tagalog",
    "Tglg",
    "Tagbanwa",
    "Tagb",
    "Tai_Le",
    "Tale",
    "Tai_Tham",
    "Lana",
    "Tai_Viet",
    "Tavt",
    "Takri",
    "Takr",
    "Tamil",
    "Taml",
    "Tangut",
    "Tang",
    "Telugu",
    "Telu",
    "Thaana",
    "Thaa",
    "Thai",
    "Tibetan",
    "Tibt",
    "Tifinagh",
    "Tfng",
    "Tirhuta",
    "Tirh",
    "Ugaritic",
    "Ugar",
    "Vai",
    "Vaii",
    "Warang_Citi",
    "Wara",
    "Yi",
    "Yiii",
    "Zanabazar_Square",
    "Zanb"
  ]
};
Array.prototype.push.apply(data.$LONE, data.General_Category);
data.gc = data.General_Category;
data.sc = data.Script_Extensions = data.scx = data.Script;

var pp$9 = Parser.prototype;

var RegExpValidationState = function RegExpValidationState(parser) {
  this.parser = parser;
  this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : "");
  this.source = "";
  this.flags = "";
  this.start = 0;
  this.switchU = false;
  this.switchN = false;
  this.pos = 0;
  this.lastIntValue = 0;
  this.lastStringValue = "";
  this.lastAssertionIsQuantifiable = false;
  this.numCapturingParens = 0;
  this.maxBackReference = 0;
  this.groupNames = [];
  this.backReferenceNames = [];
};

RegExpValidationState.prototype.reset = function reset (start, pattern, flags) {
  var unicode = flags.indexOf("u") !== -1;
  this.start = start | 0;
  this.source = pattern + "";
  this.flags = flags;
  this.switchU = unicode && this.parser.options.ecmaVersion >= 6;
  this.switchN = unicode && this.parser.options.ecmaVersion >= 9;
};

RegExpValidationState.prototype.raise = function raise (message) {
  this.parser.raiseRecoverable(this.start, ("Invalid regular expression: /" + (this.source) + "/: " + message));
};

// If u flag is given, this returns the code point at the index (it combines a surrogate pair).
// Otherwise, this returns the code unit of the index (can be a part of a surrogate pair).
RegExpValidationState.prototype.at = function at (i) {
  var s = this.source;
  var l = s.length;
  if (i >= l) {
    return -1
  }
  var c = s.charCodeAt(i);
  if (!this.switchU || c <= 0xD7FF || c >= 0xE000 || i + 1 >= l) {
    return c
  }
  return (c << 10) + s.charCodeAt(i + 1) - 0x35FDC00
};

RegExpValidationState.prototype.nextIndex = function nextIndex (i) {
  var s = this.source;
  var l = s.length;
  if (i >= l) {
    return l
  }
  var c = s.charCodeAt(i);
  if (!this.switchU || c <= 0xD7FF || c >= 0xE000 || i + 1 >= l) {
    return i + 1
  }
  return i + 2
};

RegExpValidationState.prototype.current = function current () {
  return this.at(this.pos)
};

RegExpValidationState.prototype.lookahead = function lookahead () {
  return this.at(this.nextIndex(this.pos))
};

RegExpValidationState.prototype.advance = function advance () {
  this.pos = this.nextIndex(this.pos);
};

RegExpValidationState.prototype.eat = function eat (ch) {
  if (this.current() === ch) {
    this.advance();
    return true
  }
  return false
};

function codePointToString$1(ch) {
  if (ch <= 0xFFFF) { return String.fromCharCode(ch) }
  ch -= 0x10000;
  return String.fromCharCode((ch >> 10) + 0xD800, (ch & 0x03FF) + 0xDC00)
}

/**
 * Validate the flags part of a given RegExpLiteral.
 *
 * @param {RegExpValidationState} state The state to validate RegExp.
 * @returns {void}
 */
pp$9.validateRegExpFlags = function(state) {
  var this$1 = this;

  var validFlags = state.validFlags;
  var flags = state.flags;

  for (var i = 0; i < flags.length; i++) {
    var flag = flags.charAt(i);
    if (validFlags.indexOf(flag) === -1) {
      this$1.raise(state.start, "Invalid regular expression flag");
    }
    if (flags.indexOf(flag, i + 1) > -1) {
      this$1.raise(state.start, "Duplicate regular expression flag");
    }
  }
};

/**
 * Validate the pattern part of a given RegExpLiteral.
 *
 * @param {RegExpValidationState} state The state to validate RegExp.
 * @returns {void}
 */
pp$9.validateRegExpPattern = function(state) {
  this.regexp_pattern(state);

  // The goal symbol for the parse is |Pattern[~U, ~N]|. If the result of
  // parsing contains a |GroupName|, reparse with the goal symbol
  // |Pattern[~U, +N]| and use this result instead. Throw a *SyntaxError*
  // exception if _P_ did not conform to the grammar, if any elements of _P_
  // were not matched by the parse, or if any Early Error conditions exist.
  if (!state.switchN && this.options.ecmaVersion >= 9 && state.groupNames.length > 0) {
    state.switchN = true;
    this.regexp_pattern(state);
  }
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-Pattern
pp$9.regexp_pattern = function(state) {
  state.pos = 0;
  state.lastIntValue = 0;
  state.lastStringValue = "";
  state.lastAssertionIsQuantifiable = false;
  state.numCapturingParens = 0;
  state.maxBackReference = 0;
  state.groupNames.length = 0;
  state.backReferenceNames.length = 0;

  this.regexp_disjunction(state);

  if (state.pos !== state.source.length) {
    // Make the same messages as V8.
    if (state.eat(0x29 /* ) */)) {
      state.raise("Unmatched ')'");
    }
    if (state.eat(0x5D /* [ */) || state.eat(0x7D /* } */)) {
      state.raise("Lone quantifier brackets");
    }
  }
  if (state.maxBackReference > state.numCapturingParens) {
    state.raise("Invalid escape");
  }
  for (var i = 0, list = state.backReferenceNames; i < list.length; i += 1) {
    var name = list[i];

    if (state.groupNames.indexOf(name) === -1) {
      state.raise("Invalid named capture referenced");
    }
  }
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-Disjunction
pp$9.regexp_disjunction = function(state) {
  var this$1 = this;

  this.regexp_alternative(state);
  while (state.eat(0x7C /* | */)) {
    this$1.regexp_alternative(state);
  }

  // Make the same message as V8.
  if (this.regexp_eatQuantifier(state, true)) {
    state.raise("Nothing to repeat");
  }
  if (state.eat(0x7B /* { */)) {
    state.raise("Lone quantifier brackets");
  }
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-Alternative
pp$9.regexp_alternative = function(state) {
  while (state.pos < state.source.length && this.regexp_eatTerm(state))
    {  }
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Term
pp$9.regexp_eatTerm = function(state) {
  if (this.regexp_eatAssertion(state)) {
    // Handle `QuantifiableAssertion Quantifier` alternative.
    // `state.lastAssertionIsQuantifiable` is true if the last eaten Assertion
    // is a QuantifiableAssertion.
    if (state.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(state)) {
      // Make the same message as V8.
      if (state.switchU) {
        state.raise("Invalid quantifier");
      }
    }
    return true
  }

  if (state.switchU ? this.regexp_eatAtom(state) : this.regexp_eatExtendedAtom(state)) {
    this.regexp_eatQuantifier(state);
    return true
  }

  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Assertion
pp$9.regexp_eatAssertion = function(state) {
  var start = state.pos;
  state.lastAssertionIsQuantifiable = false;

  // ^, $
  if (state.eat(0x5E /* ^ */) || state.eat(0x24 /* $ */)) {
    return true
  }

  // \b \B
  if (state.eat(0x5C /* \ */)) {
    if (state.eat(0x42 /* B */) || state.eat(0x62 /* b */)) {
      return true
    }
    state.pos = start;
  }

  // Lookahead / Lookbehind
  if (state.eat(0x28 /* ( */) && state.eat(0x3F /* ? */)) {
    var lookbehind = false;
    if (this.options.ecmaVersion >= 9) {
      lookbehind = state.eat(0x3C /* < */);
    }
    if (state.eat(0x3D /* = */) || state.eat(0x21 /* ! */)) {
      this.regexp_disjunction(state);
      if (!state.eat(0x29 /* ) */)) {
        state.raise("Unterminated group");
      }
      state.lastAssertionIsQuantifiable = !lookbehind;
      return true
    }
  }

  state.pos = start;
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-Quantifier
pp$9.regexp_eatQuantifier = function(state, noError) {
  if ( noError === void 0 ) noError = false;

  if (this.regexp_eatQuantifierPrefix(state, noError)) {
    state.eat(0x3F /* ? */);
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-QuantifierPrefix
pp$9.regexp_eatQuantifierPrefix = function(state, noError) {
  return (
    state.eat(0x2A /* * */) ||
    state.eat(0x2B /* + */) ||
    state.eat(0x3F /* ? */) ||
    this.regexp_eatBracedQuantifier(state, noError)
  )
};
pp$9.regexp_eatBracedQuantifier = function(state, noError) {
  var start = state.pos;
  if (state.eat(0x7B /* { */)) {
    var min = 0, max = -1;
    if (this.regexp_eatDecimalDigits(state)) {
      min = state.lastIntValue;
      if (state.eat(0x2C /* , */) && this.regexp_eatDecimalDigits(state)) {
        max = state.lastIntValue;
      }
      if (state.eat(0x7D /* } */)) {
        // SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-term
        if (max !== -1 && max < min && !noError) {
          state.raise("numbers out of order in {} quantifier");
        }
        return true
      }
    }
    if (state.switchU && !noError) {
      state.raise("Incomplete quantifier");
    }
    state.pos = start;
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-Atom
pp$9.regexp_eatAtom = function(state) {
  return (
    this.regexp_eatPatternCharacters(state) ||
    state.eat(0x2E /* . */) ||
    this.regexp_eatReverseSolidusAtomEscape(state) ||
    this.regexp_eatCharacterClass(state) ||
    this.regexp_eatUncapturingGroup(state) ||
    this.regexp_eatCapturingGroup(state)
  )
};
pp$9.regexp_eatReverseSolidusAtomEscape = function(state) {
  var start = state.pos;
  if (state.eat(0x5C /* \ */)) {
    if (this.regexp_eatAtomEscape(state)) {
      return true
    }
    state.pos = start;
  }
  return false
};
pp$9.regexp_eatUncapturingGroup = function(state) {
  var start = state.pos;
  if (state.eat(0x28 /* ( */)) {
    if (state.eat(0x3F /* ? */) && state.eat(0x3A /* : */)) {
      this.regexp_disjunction(state);
      if (state.eat(0x29 /* ) */)) {
        return true
      }
      state.raise("Unterminated group");
    }
    state.pos = start;
  }
  return false
};
pp$9.regexp_eatCapturingGroup = function(state) {
  if (state.eat(0x28 /* ( */)) {
    if (this.options.ecmaVersion >= 9) {
      this.regexp_groupSpecifier(state);
    } else if (state.current() === 0x3F /* ? */) {
      state.raise("Invalid group");
    }
    this.regexp_disjunction(state);
    if (state.eat(0x29 /* ) */)) {
      state.numCapturingParens += 1;
      return true
    }
    state.raise("Unterminated group");
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedAtom
pp$9.regexp_eatExtendedAtom = function(state) {
  return (
    state.eat(0x2E /* . */) ||
    this.regexp_eatReverseSolidusAtomEscape(state) ||
    this.regexp_eatCharacterClass(state) ||
    this.regexp_eatUncapturingGroup(state) ||
    this.regexp_eatCapturingGroup(state) ||
    this.regexp_eatInvalidBracedQuantifier(state) ||
    this.regexp_eatExtendedPatternCharacter(state)
  )
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-InvalidBracedQuantifier
pp$9.regexp_eatInvalidBracedQuantifier = function(state) {
  if (this.regexp_eatBracedQuantifier(state, true)) {
    state.raise("Nothing to repeat");
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-SyntaxCharacter
pp$9.regexp_eatSyntaxCharacter = function(state) {
  var ch = state.current();
  if (isSyntaxCharacter(ch)) {
    state.lastIntValue = ch;
    state.advance();
    return true
  }
  return false
};
function isSyntaxCharacter(ch) {
  return (
    ch === 0x24 /* $ */ ||
    ch >= 0x28 /* ( */ && ch <= 0x2B /* + */ ||
    ch === 0x2E /* . */ ||
    ch === 0x3F /* ? */ ||
    ch >= 0x5B /* [ */ && ch <= 0x5E /* ^ */ ||
    ch >= 0x7B /* { */ && ch <= 0x7D /* } */
  )
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-PatternCharacter
// But eat eager.
pp$9.regexp_eatPatternCharacters = function(state) {
  var start = state.pos;
  var ch = 0;
  while ((ch = state.current()) !== -1 && !isSyntaxCharacter(ch)) {
    state.advance();
  }
  return state.pos !== start
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedPatternCharacter
pp$9.regexp_eatExtendedPatternCharacter = function(state) {
  var ch = state.current();
  if (
    ch !== -1 &&
    ch !== 0x24 /* $ */ &&
    !(ch >= 0x28 /* ( */ && ch <= 0x2B /* + */) &&
    ch !== 0x2E /* . */ &&
    ch !== 0x3F /* ? */ &&
    ch !== 0x5B /* [ */ &&
    ch !== 0x5E /* ^ */ &&
    ch !== 0x7C /* | */
  ) {
    state.advance();
    return true
  }
  return false
};

// GroupSpecifier[U] ::
//   [empty]
//   `?` GroupName[?U]
pp$9.regexp_groupSpecifier = function(state) {
  if (state.eat(0x3F /* ? */)) {
    if (this.regexp_eatGroupName(state)) {
      if (state.groupNames.indexOf(state.lastStringValue) !== -1) {
        state.raise("Duplicate capture group name");
      }
      state.groupNames.push(state.lastStringValue);
      return
    }
    state.raise("Invalid group");
  }
};

// GroupName[U] ::
//   `<` RegExpIdentifierName[?U] `>`
// Note: this updates `state.lastStringValue` property with the eaten name.
pp$9.regexp_eatGroupName = function(state) {
  state.lastStringValue = "";
  if (state.eat(0x3C /* < */)) {
    if (this.regexp_eatRegExpIdentifierName(state) && state.eat(0x3E /* > */)) {
      return true
    }
    state.raise("Invalid capture group name");
  }
  return false
};

// RegExpIdentifierName[U] ::
//   RegExpIdentifierStart[?U]
//   RegExpIdentifierName[?U] RegExpIdentifierPart[?U]
// Note: this updates `state.lastStringValue` property with the eaten name.
pp$9.regexp_eatRegExpIdentifierName = function(state) {
  state.lastStringValue = "";
  if (this.regexp_eatRegExpIdentifierStart(state)) {
    state.lastStringValue += codePointToString$1(state.lastIntValue);
    while (this.regexp_eatRegExpIdentifierPart(state)) {
      state.lastStringValue += codePointToString$1(state.lastIntValue);
    }
    return true
  }
  return false
};

// RegExpIdentifierStart[U] ::
//   UnicodeIDStart
//   `$`
//   `_`
//   `\` RegExpUnicodeEscapeSequence[?U]
pp$9.regexp_eatRegExpIdentifierStart = function(state) {
  var start = state.pos;
  var ch = state.current();
  state.advance();

  if (ch === 0x5C /* \ */ && this.regexp_eatRegExpUnicodeEscapeSequence(state)) {
    ch = state.lastIntValue;
  }
  if (isRegExpIdentifierStart(ch)) {
    state.lastIntValue = ch;
    return true
  }

  state.pos = start;
  return false
};
function isRegExpIdentifierStart(ch) {
  return isIdentifierStart(ch, true) || ch === 0x24 /* $ */ || ch === 0x5F /* _ */
}

// RegExpIdentifierPart[U] ::
//   UnicodeIDContinue
//   `$`
//   `_`
//   `\` RegExpUnicodeEscapeSequence[?U]
//   <ZWNJ>
//   <ZWJ>
pp$9.regexp_eatRegExpIdentifierPart = function(state) {
  var start = state.pos;
  var ch = state.current();
  state.advance();

  if (ch === 0x5C /* \ */ && this.regexp_eatRegExpUnicodeEscapeSequence(state)) {
    ch = state.lastIntValue;
  }
  if (isRegExpIdentifierPart(ch)) {
    state.lastIntValue = ch;
    return true
  }

  state.pos = start;
  return false
};
function isRegExpIdentifierPart(ch) {
  return isIdentifierChar(ch, true) || ch === 0x24 /* $ */ || ch === 0x5F /* _ */ || ch === 0x200C /* <ZWNJ> */ || ch === 0x200D /* <ZWJ> */
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-AtomEscape
pp$9.regexp_eatAtomEscape = function(state) {
  if (
    this.regexp_eatBackReference(state) ||
    this.regexp_eatCharacterClassEscape(state) ||
    this.regexp_eatCharacterEscape(state) ||
    (state.switchN && this.regexp_eatKGroupName(state))
  ) {
    return true
  }
  if (state.switchU) {
    // Make the same message as V8.
    if (state.current() === 0x63 /* c */) {
      state.raise("Invalid unicode escape");
    }
    state.raise("Invalid escape");
  }
  return false
};
pp$9.regexp_eatBackReference = function(state) {
  var start = state.pos;
  if (this.regexp_eatDecimalEscape(state)) {
    var n = state.lastIntValue;
    if (state.switchU) {
      // For SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-atomescape
      if (n > state.maxBackReference) {
        state.maxBackReference = n;
      }
      return true
    }
    if (n <= state.numCapturingParens) {
      return true
    }
    state.pos = start;
  }
  return false
};
pp$9.regexp_eatKGroupName = function(state) {
  if (state.eat(0x6B /* k */)) {
    if (this.regexp_eatGroupName(state)) {
      state.backReferenceNames.push(state.lastStringValue);
      return true
    }
    state.raise("Invalid named reference");
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-CharacterEscape
pp$9.regexp_eatCharacterEscape = function(state) {
  return (
    this.regexp_eatControlEscape(state) ||
    this.regexp_eatCControlLetter(state) ||
    this.regexp_eatZero(state) ||
    this.regexp_eatHexEscapeSequence(state) ||
    this.regexp_eatRegExpUnicodeEscapeSequence(state) ||
    (!state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state)) ||
    this.regexp_eatIdentityEscape(state)
  )
};
pp$9.regexp_eatCControlLetter = function(state) {
  var start = state.pos;
  if (state.eat(0x63 /* c */)) {
    if (this.regexp_eatControlLetter(state)) {
      return true
    }
    state.pos = start;
  }
  return false
};
pp$9.regexp_eatZero = function(state) {
  if (state.current() === 0x30 /* 0 */ && !isDecimalDigit(state.lookahead())) {
    state.lastIntValue = 0;
    state.advance();
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-ControlEscape
pp$9.regexp_eatControlEscape = function(state) {
  var ch = state.current();
  if (ch === 0x74 /* t */) {
    state.lastIntValue = 0x09; /* \t */
    state.advance();
    return true
  }
  if (ch === 0x6E /* n */) {
    state.lastIntValue = 0x0A; /* \n */
    state.advance();
    return true
  }
  if (ch === 0x76 /* v */) {
    state.lastIntValue = 0x0B; /* \v */
    state.advance();
    return true
  }
  if (ch === 0x66 /* f */) {
    state.lastIntValue = 0x0C; /* \f */
    state.advance();
    return true
  }
  if (ch === 0x72 /* r */) {
    state.lastIntValue = 0x0D; /* \r */
    state.advance();
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-ControlLetter
pp$9.regexp_eatControlLetter = function(state) {
  var ch = state.current();
  if (isControlLetter(ch)) {
    state.lastIntValue = ch % 0x20;
    state.advance();
    return true
  }
  return false
};
function isControlLetter(ch) {
  return (
    (ch >= 0x41 /* A */ && ch <= 0x5A /* Z */) ||
    (ch >= 0x61 /* a */ && ch <= 0x7A /* z */)
  )
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-RegExpUnicodeEscapeSequence
pp$9.regexp_eatRegExpUnicodeEscapeSequence = function(state) {
  var start = state.pos;

  if (state.eat(0x75 /* u */)) {
    if (this.regexp_eatFixedHexDigits(state, 4)) {
      var lead = state.lastIntValue;
      if (state.switchU && lead >= 0xD800 && lead <= 0xDBFF) {
        var leadSurrogateEnd = state.pos;
        if (state.eat(0x5C /* \ */) && state.eat(0x75 /* u */) && this.regexp_eatFixedHexDigits(state, 4)) {
          var trail = state.lastIntValue;
          if (trail >= 0xDC00 && trail <= 0xDFFF) {
            state.lastIntValue = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
            return true
          }
        }
        state.pos = leadSurrogateEnd;
        state.lastIntValue = lead;
      }
      return true
    }
    if (
      state.switchU &&
      state.eat(0x7B /* { */) &&
      this.regexp_eatHexDigits(state) &&
      state.eat(0x7D /* } */) &&
      isValidUnicode(state.lastIntValue)
    ) {
      return true
    }
    if (state.switchU) {
      state.raise("Invalid unicode escape");
    }
    state.pos = start;
  }

  return false
};
function isValidUnicode(ch) {
  return ch >= 0 && ch <= 0x10FFFF
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-IdentityEscape
pp$9.regexp_eatIdentityEscape = function(state) {
  if (state.switchU) {
    if (this.regexp_eatSyntaxCharacter(state)) {
      return true
    }
    if (state.eat(0x2F /* / */)) {
      state.lastIntValue = 0x2F; /* / */
      return true
    }
    return false
  }

  var ch = state.current();
  if (ch !== 0x63 /* c */ && (!state.switchN || ch !== 0x6B /* k */)) {
    state.lastIntValue = ch;
    state.advance();
    return true
  }

  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalEscape
pp$9.regexp_eatDecimalEscape = function(state) {
  state.lastIntValue = 0;
  var ch = state.current();
  if (ch >= 0x31 /* 1 */ && ch <= 0x39 /* 9 */) {
    do {
      state.lastIntValue = 10 * state.lastIntValue + (ch - 0x30 /* 0 */);
      state.advance();
    } while ((ch = state.current()) >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */)
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClassEscape
pp$9.regexp_eatCharacterClassEscape = function(state) {
  var ch = state.current();

  if (isCharacterClassEscape(ch)) {
    state.lastIntValue = -1;
    state.advance();
    return true
  }

  if (
    state.switchU &&
    this.options.ecmaVersion >= 9 &&
    (ch === 0x50 /* P */ || ch === 0x70 /* p */)
  ) {
    state.lastIntValue = -1;
    state.advance();
    if (
      state.eat(0x7B /* { */) &&
      this.regexp_eatUnicodePropertyValueExpression(state) &&
      state.eat(0x7D /* } */)
    ) {
      return true
    }
    state.raise("Invalid property name");
  }

  return false
};
function isCharacterClassEscape(ch) {
  return (
    ch === 0x64 /* d */ ||
    ch === 0x44 /* D */ ||
    ch === 0x73 /* s */ ||
    ch === 0x53 /* S */ ||
    ch === 0x77 /* w */ ||
    ch === 0x57 /* W */
  )
}

// UnicodePropertyValueExpression ::
//   UnicodePropertyName `=` UnicodePropertyValue
//   LoneUnicodePropertyNameOrValue
pp$9.regexp_eatUnicodePropertyValueExpression = function(state) {
  var start = state.pos;

  // UnicodePropertyName `=` UnicodePropertyValue
  if (this.regexp_eatUnicodePropertyName(state) && state.eat(0x3D /* = */)) {
    var name = state.lastStringValue;
    if (this.regexp_eatUnicodePropertyValue(state)) {
      var value = state.lastStringValue;
      this.regexp_validateUnicodePropertyNameAndValue(state, name, value);
      return true
    }
  }
  state.pos = start;

  // LoneUnicodePropertyNameOrValue
  if (this.regexp_eatLoneUnicodePropertyNameOrValue(state)) {
    var nameOrValue = state.lastStringValue;
    this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue);
    return true
  }
  return false
};
pp$9.regexp_validateUnicodePropertyNameAndValue = function(state, name, value) {
  if (!data.hasOwnProperty(name) || data[name].indexOf(value) === -1) {
    state.raise("Invalid property name");
  }
};
pp$9.regexp_validateUnicodePropertyNameOrValue = function(state, nameOrValue) {
  if (data.$LONE.indexOf(nameOrValue) === -1) {
    state.raise("Invalid property name");
  }
};

// UnicodePropertyName ::
//   UnicodePropertyNameCharacters
pp$9.regexp_eatUnicodePropertyName = function(state) {
  var ch = 0;
  state.lastStringValue = "";
  while (isUnicodePropertyNameCharacter(ch = state.current())) {
    state.lastStringValue += codePointToString$1(ch);
    state.advance();
  }
  return state.lastStringValue !== ""
};
function isUnicodePropertyNameCharacter(ch) {
  return isControlLetter(ch) || ch === 0x5F /* _ */
}

// UnicodePropertyValue ::
//   UnicodePropertyValueCharacters
pp$9.regexp_eatUnicodePropertyValue = function(state) {
  var ch = 0;
  state.lastStringValue = "";
  while (isUnicodePropertyValueCharacter(ch = state.current())) {
    state.lastStringValue += codePointToString$1(ch);
    state.advance();
  }
  return state.lastStringValue !== ""
};
function isUnicodePropertyValueCharacter(ch) {
  return isUnicodePropertyNameCharacter(ch) || isDecimalDigit(ch)
}

// LoneUnicodePropertyNameOrValue ::
//   UnicodePropertyValueCharacters
pp$9.regexp_eatLoneUnicodePropertyNameOrValue = function(state) {
  return this.regexp_eatUnicodePropertyValue(state)
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClass
pp$9.regexp_eatCharacterClass = function(state) {
  if (state.eat(0x5B /* [ */)) {
    state.eat(0x5E /* ^ */);
    this.regexp_classRanges(state);
    if (state.eat(0x5D /* [ */)) {
      return true
    }
    // Unreachable since it threw "unterminated regular expression" error before.
    state.raise("Unterminated character class");
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-ClassRanges
// https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRanges
// https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRangesNoDash
pp$9.regexp_classRanges = function(state) {
  var this$1 = this;

  while (this.regexp_eatClassAtom(state)) {
    var left = state.lastIntValue;
    if (state.eat(0x2D /* - */) && this$1.regexp_eatClassAtom(state)) {
      var right = state.lastIntValue;
      if (state.switchU && (left === -1 || right === -1)) {
        state.raise("Invalid character class");
      }
      if (left !== -1 && right !== -1 && left > right) {
        state.raise("Range out of order in character class");
      }
    }
  }
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtom
// https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtomNoDash
pp$9.regexp_eatClassAtom = function(state) {
  var start = state.pos;

  if (state.eat(0x5C /* \ */)) {
    if (this.regexp_eatClassEscape(state)) {
      return true
    }
    if (state.switchU) {
      // Make the same message as V8.
      var ch$1 = state.current();
      if (ch$1 === 0x63 /* c */ || isOctalDigit(ch$1)) {
        state.raise("Invalid class escape");
      }
      state.raise("Invalid escape");
    }
    state.pos = start;
  }

  var ch = state.current();
  if (ch !== 0x5D /* [ */) {
    state.lastIntValue = ch;
    state.advance();
    return true
  }

  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassEscape
pp$9.regexp_eatClassEscape = function(state) {
  var start = state.pos;

  if (state.eat(0x62 /* b */)) {
    state.lastIntValue = 0x08; /* <BS> */
    return true
  }

  if (state.switchU && state.eat(0x2D /* - */)) {
    state.lastIntValue = 0x2D; /* - */
    return true
  }

  if (!state.switchU && state.eat(0x63 /* c */)) {
    if (this.regexp_eatClassControlLetter(state)) {
      return true
    }
    state.pos = start;
  }

  return (
    this.regexp_eatCharacterClassEscape(state) ||
    this.regexp_eatCharacterEscape(state)
  )
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassControlLetter
pp$9.regexp_eatClassControlLetter = function(state) {
  var ch = state.current();
  if (isDecimalDigit(ch) || ch === 0x5F /* _ */) {
    state.lastIntValue = ch % 0x20;
    state.advance();
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
pp$9.regexp_eatHexEscapeSequence = function(state) {
  var start = state.pos;
  if (state.eat(0x78 /* x */)) {
    if (this.regexp_eatFixedHexDigits(state, 2)) {
      return true
    }
    if (state.switchU) {
      state.raise("Invalid escape");
    }
    state.pos = start;
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalDigits
pp$9.regexp_eatDecimalDigits = function(state) {
  var start = state.pos;
  var ch = 0;
  state.lastIntValue = 0;
  while (isDecimalDigit(ch = state.current())) {
    state.lastIntValue = 10 * state.lastIntValue + (ch - 0x30 /* 0 */);
    state.advance();
  }
  return state.pos !== start
};
function isDecimalDigit(ch) {
  return ch >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigits
pp$9.regexp_eatHexDigits = function(state) {
  var start = state.pos;
  var ch = 0;
  state.lastIntValue = 0;
  while (isHexDigit(ch = state.current())) {
    state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
    state.advance();
  }
  return state.pos !== start
};
function isHexDigit(ch) {
  return (
    (ch >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */) ||
    (ch >= 0x41 /* A */ && ch <= 0x46 /* F */) ||
    (ch >= 0x61 /* a */ && ch <= 0x66 /* f */)
  )
}
function hexToInt(ch) {
  if (ch >= 0x41 /* A */ && ch <= 0x46 /* F */) {
    return 10 + (ch - 0x41 /* A */)
  }
  if (ch >= 0x61 /* a */ && ch <= 0x66 /* f */) {
    return 10 + (ch - 0x61 /* a */)
  }
  return ch - 0x30 /* 0 */
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-LegacyOctalEscapeSequence
// Allows only 0-377(octal) i.e. 0-255(decimal).
pp$9.regexp_eatLegacyOctalEscapeSequence = function(state) {
  if (this.regexp_eatOctalDigit(state)) {
    var n1 = state.lastIntValue;
    if (this.regexp_eatOctalDigit(state)) {
      var n2 = state.lastIntValue;
      if (n1 <= 3 && this.regexp_eatOctalDigit(state)) {
        state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue;
      } else {
        state.lastIntValue = n1 * 8 + n2;
      }
    } else {
      state.lastIntValue = n1;
    }
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-OctalDigit
pp$9.regexp_eatOctalDigit = function(state) {
  var ch = state.current();
  if (isOctalDigit(ch)) {
    state.lastIntValue = ch - 0x30; /* 0 */
    state.advance();
    return true
  }
  state.lastIntValue = 0;
  return false
};
function isOctalDigit(ch) {
  return ch >= 0x30 /* 0 */ && ch <= 0x37 /* 7 */
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-Hex4Digits
// https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigit
// And HexDigit HexDigit in https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
pp$9.regexp_eatFixedHexDigits = function(state, length) {
  var start = state.pos;
  state.lastIntValue = 0;
  for (var i = 0; i < length; ++i) {
    var ch = state.current();
    if (!isHexDigit(ch)) {
      state.pos = start;
      return false
    }
    state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
    state.advance();
  }
  return true
};

// Object type used to represent tokens. Note that normally, tokens
// simply exist as properties on the parser object. This is only
// used for the onToken callback and the external tokenizer.

var Token = function Token(p) {
  this.type = p.type;
  this.value = p.value;
  this.start = p.start;
  this.end = p.end;
  if (p.options.locations)
    { this.loc = new SourceLocation(p, p.startLoc, p.endLoc); }
  if (p.options.ranges)
    { this.range = [p.start, p.end]; }
};

// ## Tokenizer

var pp$8 = Parser.prototype;

// Move to the next token

pp$8.next = function() {
  if (this.options.onToken)
    { this.options.onToken(new Token(this)); }

  this.lastTokEnd = this.end;
  this.lastTokStart = this.start;
  this.lastTokEndLoc = this.endLoc;
  this.lastTokStartLoc = this.startLoc;
  this.nextToken();
};

pp$8.getToken = function() {
  this.next();
  return new Token(this)
};

// If we're in an ES6 environment, make parsers iterable
if (typeof Symbol !== "undefined")
  { pp$8[Symbol.iterator] = function() {
    var this$1 = this;

    return {
      next: function () {
        var token = this$1.getToken();
        return {
          done: token.type === types.eof,
          value: token
        }
      }
    }
  }; }

// Toggle strict mode. Re-reads the next number or string to please
// pedantic tests (`"use strict"; 010;` should fail).

pp$8.curContext = function() {
  return this.context[this.context.length - 1]
};

// Read a single token, updating the parser object's token-related
// properties.

pp$8.nextToken = function() {
  var curContext = this.curContext();
  if (!curContext || !curContext.preserveSpace) { this.skipSpace(); }

  this.start = this.pos;
  if (this.options.locations) { this.startLoc = this.curPosition(); }
  if (this.pos >= this.input.length) { return this.finishToken(types.eof) }

  if (curContext.override) { return curContext.override(this) }
  else { this.readToken(this.fullCharCodeAtPos()); }
};

pp$8.readToken = function(code) {
  // Identifier or keyword. '\uXXXX' sequences are allowed in
  // identifiers, so '\' also dispatches to that.
  if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92 /* '\' */)
    { return this.readWord() }

  return this.getTokenFromCode(code)
};

pp$8.fullCharCodeAtPos = function() {
  var code = this.input.charCodeAt(this.pos);
  if (code <= 0xd7ff || code >= 0xe000) { return code }
  var next = this.input.charCodeAt(this.pos + 1);
  return (code << 10) + next - 0x35fdc00
};

pp$8.skipBlockComment = function() {
  var this$1 = this;

  var startLoc = this.options.onComment && this.curPosition();
  var start = this.pos, end = this.input.indexOf("*/", this.pos += 2);
  if (end === -1) { this.raise(this.pos - 2, "Unterminated comment"); }
  this.pos = end + 2;
  if (this.options.locations) {
    lineBreakG.lastIndex = start;
    var match;
    while ((match = lineBreakG.exec(this.input)) && match.index < this.pos) {
      ++this$1.curLine;
      this$1.lineStart = match.index + match[0].length;
    }
  }
  if (this.options.onComment)
    { this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos,
                           startLoc, this.curPosition()); }
};

pp$8.skipLineComment = function(startSkip) {
  var this$1 = this;

  var start = this.pos;
  var startLoc = this.options.onComment && this.curPosition();
  var ch = this.input.charCodeAt(this.pos += startSkip);
  while (this.pos < this.input.length && !isNewLine(ch)) {
    ch = this$1.input.charCodeAt(++this$1.pos);
  }
  if (this.options.onComment)
    { this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos,
                           startLoc, this.curPosition()); }
};

// Called at the start of the parse and after every token. Skips
// whitespace and comments, and.

pp$8.skipSpace = function() {
  var this$1 = this;

  loop: while (this.pos < this.input.length) {
    var ch = this$1.input.charCodeAt(this$1.pos);
    switch (ch) {
    case 32: case 160: // ' '
      ++this$1.pos;
      break
    case 13:
      if (this$1.input.charCodeAt(this$1.pos + 1) === 10) {
        ++this$1.pos;
      }
    case 10: case 8232: case 8233:
      ++this$1.pos;
      if (this$1.options.locations) {
        ++this$1.curLine;
        this$1.lineStart = this$1.pos;
      }
      break
    case 47: // '/'
      switch (this$1.input.charCodeAt(this$1.pos + 1)) {
      case 42: // '*'
        this$1.skipBlockComment();
        break
      case 47:
        this$1.skipLineComment(2);
        break
      default:
        break loop
      }
      break
    default:
      if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
        ++this$1.pos;
      } else {
        break loop
      }
    }
  }
};

// Called at the end of every token. Sets `end`, `val`, and
// maintains `context` and `exprAllowed`, and skips the space after
// the token, so that the next one's `start` will point at the
// right position.

pp$8.finishToken = function(type, val) {
  this.end = this.pos;
  if (this.options.locations) { this.endLoc = this.curPosition(); }
  var prevType = this.type;
  this.type = type;
  this.value = val;

  this.updateContext(prevType);
};

// ### Token reading

// This is the function that is called to fetch the next token. It
// is somewhat obscure, because it works in character codes rather
// than characters, and because operator parsing has been inlined
// into it.
//
// All in the name of speed.
//
pp$8.readToken_dot = function() {
  var next = this.input.charCodeAt(this.pos + 1);
  if (next >= 48 && next <= 57) { return this.readNumber(true) }
  var next2 = this.input.charCodeAt(this.pos + 2);
  if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) { // 46 = dot '.'
    this.pos += 3;
    return this.finishToken(types.ellipsis)
  } else {
    ++this.pos;
    return this.finishToken(types.dot)
  }
};

pp$8.readToken_slash = function() { // '/'
  var next = this.input.charCodeAt(this.pos + 1);
  if (this.exprAllowed) { ++this.pos; return this.readRegexp() }
  if (next === 61) { return this.finishOp(types.assign, 2) }
  return this.finishOp(types.slash, 1)
};

pp$8.readToken_mult_modulo_exp = function(code) { // '%*'
  var next = this.input.charCodeAt(this.pos + 1);
  var size = 1;
  var tokentype = code === 42 ? types.star : types.modulo;

  // exponentiation operator ** and **=
  if (this.options.ecmaVersion >= 7 && code === 42 && next === 42) {
    ++size;
    tokentype = types.starstar;
    next = this.input.charCodeAt(this.pos + 2);
  }

  if (next === 61) { return this.finishOp(types.assign, size + 1) }
  return this.finishOp(tokentype, size)
};

pp$8.readToken_pipe_amp = function(code) { // '|&'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === code) { return this.finishOp(code === 124 ? types.logicalOR : types.logicalAND, 2) }
  if (next === 61) { return this.finishOp(types.assign, 2) }
  return this.finishOp(code === 124 ? types.bitwiseOR : types.bitwiseAND, 1)
};

pp$8.readToken_caret = function() { // '^'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === 61) { return this.finishOp(types.assign, 2) }
  return this.finishOp(types.bitwiseXOR, 1)
};

pp$8.readToken_plus_min = function(code) { // '+-'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === code) {
    if (next === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 &&
        (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)))) {
      // A `-->` line comment
      this.skipLineComment(3);
      this.skipSpace();
      return this.nextToken()
    }
    return this.finishOp(types.incDec, 2)
  }
  if (next === 61) { return this.finishOp(types.assign, 2) }
  return this.finishOp(types.plusMin, 1)
};

pp$8.readToken_lt_gt = function(code) { // '<>'
  var next = this.input.charCodeAt(this.pos + 1);
  var size = 1;
  if (next === code) {
    size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
    if (this.input.charCodeAt(this.pos + size) === 61) { return this.finishOp(types.assign, size + 1) }
    return this.finishOp(types.bitShift, size)
  }
  if (next === 33 && code === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 &&
      this.input.charCodeAt(this.pos + 3) === 45) {
    // `<!--`, an XML-style comment that should be interpreted as a line comment
    this.skipLineComment(4);
    this.skipSpace();
    return this.nextToken()
  }
  if (next === 61) { size = 2; }
  return this.finishOp(types.relational, size)
};

pp$8.readToken_eq_excl = function(code) { // '=!'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === 61) { return this.finishOp(types.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) }
  if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) { // '=>'
    this.pos += 2;
    return this.finishToken(types.arrow)
  }
  return this.finishOp(code === 61 ? types.eq : types.prefix, 1)
};

pp$8.getTokenFromCode = function(code) {
  switch (code) {
  // The interpretation of a dot depends on whether it is followed
  // by a digit or another two dots.
  case 46: // '.'
    return this.readToken_dot()

  // Punctuation tokens.
  case 40: ++this.pos; return this.finishToken(types.parenL)
  case 41: ++this.pos; return this.finishToken(types.parenR)
  case 59: ++this.pos; return this.finishToken(types.semi)
  case 44: ++this.pos; return this.finishToken(types.comma)
  case 91: ++this.pos; return this.finishToken(types.bracketL)
  case 93: ++this.pos; return this.finishToken(types.bracketR)
  case 123: ++this.pos; return this.finishToken(types.braceL)
  case 125: ++this.pos; return this.finishToken(types.braceR)
  case 58: ++this.pos; return this.finishToken(types.colon)
  case 63: ++this.pos; return this.finishToken(types.question)

  case 96: // '`'
    if (this.options.ecmaVersion < 6) { break }
    ++this.pos;
    return this.finishToken(types.backQuote)

  case 48: // '0'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 120 || next === 88) { return this.readRadixNumber(16) } // '0x', '0X' - hex number
    if (this.options.ecmaVersion >= 6) {
      if (next === 111 || next === 79) { return this.readRadixNumber(8) } // '0o', '0O' - octal number
      if (next === 98 || next === 66) { return this.readRadixNumber(2) } // '0b', '0B' - binary number
    }

  // Anything else beginning with a digit is an integer, octal
  // number, or float.
  case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: // 1-9
    return this.readNumber(false)

  // Quotes produce strings.
  case 34: case 39: // '"', "'"
    return this.readString(code)

  // Operators are parsed inline in tiny state machines. '=' (61) is
  // often referred to. `finishOp` simply skips the amount of
  // characters it is given as second argument, and returns a token
  // of the type given by its first argument.

  case 47: // '/'
    return this.readToken_slash()

  case 37: case 42: // '%*'
    return this.readToken_mult_modulo_exp(code)

  case 124: case 38: // '|&'
    return this.readToken_pipe_amp(code)

  case 94: // '^'
    return this.readToken_caret()

  case 43: case 45: // '+-'
    return this.readToken_plus_min(code)

  case 60: case 62: // '<>'
    return this.readToken_lt_gt(code)

  case 61: case 33: // '=!'
    return this.readToken_eq_excl(code)

  case 126: // '~'
    return this.finishOp(types.prefix, 1)
  }

  this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
};

pp$8.finishOp = function(type, size) {
  var str = this.input.slice(this.pos, this.pos + size);
  this.pos += size;
  return this.finishToken(type, str)
};

pp$8.readRegexp = function() {
  var this$1 = this;

  var escaped, inClass, start = this.pos;
  for (;;) {
    if (this$1.pos >= this$1.input.length) { this$1.raise(start, "Unterminated regular expression"); }
    var ch = this$1.input.charAt(this$1.pos);
    if (lineBreak.test(ch)) { this$1.raise(start, "Unterminated regular expression"); }
    if (!escaped) {
      if (ch === "[") { inClass = true; }
      else if (ch === "]" && inClass) { inClass = false; }
      else if (ch === "/" && !inClass) { break }
      escaped = ch === "\\";
    } else { escaped = false; }
    ++this$1.pos;
  }
  var pattern = this.input.slice(start, this.pos);
  ++this.pos;
  var flagsStart = this.pos;
  var flags = this.readWord1();
  if (this.containsEsc) { this.unexpected(flagsStart); }

  // Validate pattern
  var state = this.regexpState || (this.regexpState = new RegExpValidationState(this));
  state.reset(start, pattern, flags);
  this.validateRegExpFlags(state);
  this.validateRegExpPattern(state);

  // Create Literal#value property value.
  var value = null;
  try {
    value = new RegExp(pattern, flags);
  } catch (e) {
    // ESTree requires null if it failed to instantiate RegExp object.
    // https://github.com/estree/estree/blob/a27003adf4fd7bfad44de9cef372a2eacd527b1c/es5.md#regexpliteral
  }

  return this.finishToken(types.regexp, {pattern: pattern, flags: flags, value: value})
};

// Read an integer in the given radix. Return null if zero digits
// were read, the integer value otherwise. When `len` is given, this
// will return `null` unless the integer has exactly `len` digits.

pp$8.readInt = function(radix, len) {
  var this$1 = this;

  var start = this.pos, total = 0;
  for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
    var code = this$1.input.charCodeAt(this$1.pos), val = (void 0);
    if (code >= 97) { val = code - 97 + 10; } // a
    else if (code >= 65) { val = code - 65 + 10; } // A
    else if (code >= 48 && code <= 57) { val = code - 48; } // 0-9
    else { val = Infinity; }
    if (val >= radix) { break }
    ++this$1.pos;
    total = total * radix + val;
  }
  if (this.pos === start || len != null && this.pos - start !== len) { return null }

  return total
};

pp$8.readRadixNumber = function(radix) {
  this.pos += 2; // 0x
  var val = this.readInt(radix);
  if (val == null) { this.raise(this.start + 2, "Expected number in radix " + radix); }
  if (isIdentifierStart(this.fullCharCodeAtPos())) { this.raise(this.pos, "Identifier directly after number"); }
  return this.finishToken(types.num, val)
};

// Read an integer, octal integer, or floating-point number.

pp$8.readNumber = function(startsWithDot) {
  var start = this.pos;
  if (!startsWithDot && this.readInt(10) === null) { this.raise(start, "Invalid number"); }
  var octal = this.pos - start >= 2 && this.input.charCodeAt(start) === 48;
  if (octal && this.strict) { this.raise(start, "Invalid number"); }
  if (octal && /[89]/.test(this.input.slice(start, this.pos))) { octal = false; }
  var next = this.input.charCodeAt(this.pos);
  if (next === 46 && !octal) { // '.'
    ++this.pos;
    this.readInt(10);
    next = this.input.charCodeAt(this.pos);
  }
  if ((next === 69 || next === 101) && !octal) { // 'eE'
    next = this.input.charCodeAt(++this.pos);
    if (next === 43 || next === 45) { ++this.pos; } // '+-'
    if (this.readInt(10) === null) { this.raise(start, "Invalid number"); }
  }
  if (isIdentifierStart(this.fullCharCodeAtPos())) { this.raise(this.pos, "Identifier directly after number"); }

  var str = this.input.slice(start, this.pos);
  var val = octal ? parseInt(str, 8) : parseFloat(str);
  return this.finishToken(types.num, val)
};

// Read a string value, interpreting backslash-escapes.

pp$8.readCodePoint = function() {
  var ch = this.input.charCodeAt(this.pos), code;

  if (ch === 123) { // '{'
    if (this.options.ecmaVersion < 6) { this.unexpected(); }
    var codePos = ++this.pos;
    code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
    ++this.pos;
    if (code > 0x10FFFF) { this.invalidStringToken(codePos, "Code point out of bounds"); }
  } else {
    code = this.readHexChar(4);
  }
  return code
};

function codePointToString(code) {
  // UTF-16 Decoding
  if (code <= 0xFFFF) { return String.fromCharCode(code) }
  code -= 0x10000;
  return String.fromCharCode((code >> 10) + 0xD800, (code & 1023) + 0xDC00)
}

pp$8.readString = function(quote) {
  var this$1 = this;

  var out = "", chunkStart = ++this.pos;
  for (;;) {
    if (this$1.pos >= this$1.input.length) { this$1.raise(this$1.start, "Unterminated string constant"); }
    var ch = this$1.input.charCodeAt(this$1.pos);
    if (ch === quote) { break }
    if (ch === 92) { // '\'
      out += this$1.input.slice(chunkStart, this$1.pos);
      out += this$1.readEscapedChar(false);
      chunkStart = this$1.pos;
    } else {
      if (isNewLine(ch, this$1.options.ecmaVersion >= 10)) { this$1.raise(this$1.start, "Unterminated string constant"); }
      ++this$1.pos;
    }
  }
  out += this.input.slice(chunkStart, this.pos++);
  return this.finishToken(types.string, out)
};

// Reads template string tokens.

var INVALID_TEMPLATE_ESCAPE_ERROR = {};

pp$8.tryReadTemplateToken = function() {
  this.inTemplateElement = true;
  try {
    this.readTmplToken();
  } catch (err) {
    if (err === INVALID_TEMPLATE_ESCAPE_ERROR) {
      this.readInvalidTemplateToken();
    } else {
      throw err
    }
  }

  this.inTemplateElement = false;
};

pp$8.invalidStringToken = function(position, message) {
  if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
    throw INVALID_TEMPLATE_ESCAPE_ERROR
  } else {
    this.raise(position, message);
  }
};

pp$8.readTmplToken = function() {
  var this$1 = this;

  var out = "", chunkStart = this.pos;
  for (;;) {
    if (this$1.pos >= this$1.input.length) { this$1.raise(this$1.start, "Unterminated template"); }
    var ch = this$1.input.charCodeAt(this$1.pos);
    if (ch === 96 || ch === 36 && this$1.input.charCodeAt(this$1.pos + 1) === 123) { // '`', '${'
      if (this$1.pos === this$1.start && (this$1.type === types.template || this$1.type === types.invalidTemplate)) {
        if (ch === 36) {
          this$1.pos += 2;
          return this$1.finishToken(types.dollarBraceL)
        } else {
          ++this$1.pos;
          return this$1.finishToken(types.backQuote)
        }
      }
      out += this$1.input.slice(chunkStart, this$1.pos);
      return this$1.finishToken(types.template, out)
    }
    if (ch === 92) { // '\'
      out += this$1.input.slice(chunkStart, this$1.pos);
      out += this$1.readEscapedChar(true);
      chunkStart = this$1.pos;
    } else if (isNewLine(ch)) {
      out += this$1.input.slice(chunkStart, this$1.pos);
      ++this$1.pos;
      switch (ch) {
      case 13:
        if (this$1.input.charCodeAt(this$1.pos) === 10) { ++this$1.pos; }
      case 10:
        out += "\n";
        break
      default:
        out += String.fromCharCode(ch);
        break
      }
      if (this$1.options.locations) {
        ++this$1.curLine;
        this$1.lineStart = this$1.pos;
      }
      chunkStart = this$1.pos;
    } else {
      ++this$1.pos;
    }
  }
};

// Reads a template token to search for the end, without validating any escape sequences
pp$8.readInvalidTemplateToken = function() {
  var this$1 = this;

  for (; this.pos < this.input.length; this.pos++) {
    switch (this$1.input[this$1.pos]) {
    case "\\":
      ++this$1.pos;
      break

    case "$":
      if (this$1.input[this$1.pos + 1] !== "{") {
        break
      }
    // falls through

    case "`":
      return this$1.finishToken(types.invalidTemplate, this$1.input.slice(this$1.start, this$1.pos))

    // no default
    }
  }
  this.raise(this.start, "Unterminated template");
};

// Used to read escaped characters

pp$8.readEscapedChar = function(inTemplate) {
  var ch = this.input.charCodeAt(++this.pos);
  ++this.pos;
  switch (ch) {
  case 110: return "\n" // 'n' -> '\n'
  case 114: return "\r" // 'r' -> '\r'
  case 120: return String.fromCharCode(this.readHexChar(2)) // 'x'
  case 117: return codePointToString(this.readCodePoint()) // 'u'
  case 116: return "\t" // 't' -> '\t'
  case 98: return "\b" // 'b' -> '\b'
  case 118: return "\u000b" // 'v' -> '\u000b'
  case 102: return "\f" // 'f' -> '\f'
  case 13: if (this.input.charCodeAt(this.pos) === 10) { ++this.pos; } // '\r\n'
  case 10: // ' \n'
    if (this.options.locations) { this.lineStart = this.pos; ++this.curLine; }
    return ""
  default:
    if (ch >= 48 && ch <= 55) {
      var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
      var octal = parseInt(octalStr, 8);
      if (octal > 255) {
        octalStr = octalStr.slice(0, -1);
        octal = parseInt(octalStr, 8);
      }
      this.pos += octalStr.length - 1;
      ch = this.input.charCodeAt(this.pos);
      if ((octalStr !== "0" || ch === 56 || ch === 57) && (this.strict || inTemplate)) {
        this.invalidStringToken(
          this.pos - 1 - octalStr.length,
          inTemplate
            ? "Octal literal in template string"
            : "Octal literal in strict mode"
        );
      }
      return String.fromCharCode(octal)
    }
    return String.fromCharCode(ch)
  }
};

// Used to read character escape sequences ('\x', '\u', '\U').

pp$8.readHexChar = function(len) {
  var codePos = this.pos;
  var n = this.readInt(16, len);
  if (n === null) { this.invalidStringToken(codePos, "Bad character escape sequence"); }
  return n
};

// Read an identifier, and return it as a string. Sets `this.containsEsc`
// to whether the word contained a '\u' escape.
//
// Incrementally adds only escaped chars, adding other chunks as-is
// as a micro-optimization.

pp$8.readWord1 = function() {
  var this$1 = this;

  this.containsEsc = false;
  var word = "", first = true, chunkStart = this.pos;
  var astral = this.options.ecmaVersion >= 6;
  while (this.pos < this.input.length) {
    var ch = this$1.fullCharCodeAtPos();
    if (isIdentifierChar(ch, astral)) {
      this$1.pos += ch <= 0xffff ? 1 : 2;
    } else if (ch === 92) { // "\"
      this$1.containsEsc = true;
      word += this$1.input.slice(chunkStart, this$1.pos);
      var escStart = this$1.pos;
      if (this$1.input.charCodeAt(++this$1.pos) !== 117) // "u"
        { this$1.invalidStringToken(this$1.pos, "Expecting Unicode escape sequence \\uXXXX"); }
      ++this$1.pos;
      var esc = this$1.readCodePoint();
      if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral))
        { this$1.invalidStringToken(escStart, "Invalid Unicode escape"); }
      word += codePointToString(esc);
      chunkStart = this$1.pos;
    } else {
      break
    }
    first = false;
  }
  return word + this.input.slice(chunkStart, this.pos)
};

// Read an identifier or keyword token. Will check for reserved
// words when necessary.

pp$8.readWord = function() {
  var word = this.readWord1();
  var type = types.name;
  if (this.keywords.test(word)) {
    if (this.containsEsc) { this.raiseRecoverable(this.start, "Escape sequence in keyword " + word); }
    type = keywords$1[word];
  }
  return this.finishToken(type, word)
};

// Acorn is a tiny, fast JavaScript parser written in JavaScript.
//
// Acorn was written by Marijn Haverbeke, Ingvar Stepanyan, and
// various contributors and released under an MIT license.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/acornjs/acorn.git
//
// Please use the [github bug tracker][ghbt] to report issues.
//
// [ghbt]: https://github.com/acornjs/acorn/issues
//
// [walk]: util/walk.js

var version = "6.0.4";

// The main exported interface (under `self.acorn` when in the
// browser) is a `parse` function that takes a code string and
// returns an abstract syntax tree as specified by [Mozilla parser
// API][api].
//
// [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

function parse(input, options) {
  return Parser.parse(input, options)
}

// This function tries to parse a single expression at a given
// offset in a string. Useful for parsing mixed-language formats
// that embed JavaScript expressions.

function parseExpressionAt(input, pos, options) {
  return Parser.parseExpressionAt(input, pos, options)
}

// Acorn is organized as a tokenizer and a recursive-descent parser.
// The `tokenizer` export provides an interface to the tokenizer.

function tokenizer(input, options) {
  return Parser.tokenizer(input, options)
}


//# sourceMappingURL=acorn.mjs.map


/***/ }),

/***/ 888:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const XHTMLEntities = __webpack_require__(889);

const hexNumber = /^[\da-fA-F]+$/;
const decimalNumber = /^\d+$/;

const acorn = __webpack_require__(887);
const tt = acorn.tokTypes;
const TokContext = acorn.TokContext;
const tokContexts = acorn.tokContexts;
const TokenType = acorn.TokenType;
const isNewLine = acorn.isNewLine;
const isIdentifierStart = acorn.isIdentifierStart;
const isIdentifierChar = acorn.isIdentifierChar;

const tc_oTag = new TokContext('<tag', false);
const tc_cTag = new TokContext('</tag', false);
const tc_expr = new TokContext('<tag>...</tag>', true, true);

const tok = {
  jsxName: new TokenType('jsxName'),
  jsxText: new TokenType('jsxText', {beforeExpr: true}),
  jsxTagStart: new TokenType('jsxTagStart'),
  jsxTagEnd: new TokenType('jsxTagEnd')
}

tok.jsxTagStart.updateContext = function() {
  this.context.push(tc_expr); // treat as beginning of JSX expression
  this.context.push(tc_oTag); // start opening tag context
  this.exprAllowed = false;
};
tok.jsxTagEnd.updateContext = function(prevType) {
  let out = this.context.pop();
  if (out === tc_oTag && prevType === tt.slash || out === tc_cTag) {
    this.context.pop();
    this.exprAllowed = this.curContext() === tc_expr;
  } else {
    this.exprAllowed = true;
  }
};

// Transforms JSX element name to string.

function getQualifiedJSXName(object) {
  if (!object)
    return object;

  if (object.type === 'JSXIdentifier')
    return object.name;

  if (object.type === 'JSXNamespacedName')
    return object.namespace.name + ':' + object.name.name;

  if (object.type === 'JSXMemberExpression')
    return getQualifiedJSXName(object.object) + '.' +
    getQualifiedJSXName(object.property);
}

module.exports = function(options) {
  options = options || {};
  return function(Parser) {
    return plugin({
      allowNamespaces: options.allowNamespaces !== false,
      allowNamespacedObjects: !!options.allowNamespacedObjects
    }, Parser);
  }
};
module.exports.tokTypes = tok;

function plugin(options, Parser) {
  return class extends Parser {
    // Reads inline JSX contents token.
    jsx_readToken() {
      let out = '', chunkStart = this.pos;
      for (;;) {
        if (this.pos >= this.input.length)
          this.raise(this.start, 'Unterminated JSX contents');
        let ch = this.input.charCodeAt(this.pos);

        switch (ch) {
        case 60: // '<'
        case 123: // '{'
          if (this.pos === this.start) {
            if (ch === 60 && this.exprAllowed) {
              ++this.pos;
              return this.finishToken(tok.jsxTagStart);
            }
            return this.getTokenFromCode(ch);
          }
          out += this.input.slice(chunkStart, this.pos);
          return this.finishToken(tok.jsxText, out);

        case 38: // '&'
          out += this.input.slice(chunkStart, this.pos);
          out += this.jsx_readEntity();
          chunkStart = this.pos;
          break;

        default:
          if (isNewLine(ch)) {
            out += this.input.slice(chunkStart, this.pos);
            out += this.jsx_readNewLine(true);
            chunkStart = this.pos;
          } else {
            ++this.pos;
          }
        }
      }
    }

    jsx_readNewLine(normalizeCRLF) {
      let ch = this.input.charCodeAt(this.pos);
      let out;
      ++this.pos;
      if (ch === 13 && this.input.charCodeAt(this.pos) === 10) {
        ++this.pos;
        out = normalizeCRLF ? '\n' : '\r\n';
      } else {
        out = String.fromCharCode(ch);
      }
      if (this.options.locations) {
        ++this.curLine;
        this.lineStart = this.pos;
      }

      return out;
    }

    jsx_readString(quote) {
      let out = '', chunkStart = ++this.pos;
      for (;;) {
        if (this.pos >= this.input.length)
          this.raise(this.start, 'Unterminated string constant');
        let ch = this.input.charCodeAt(this.pos);
        if (ch === quote) break;
        if (ch === 38) { // '&'
          out += this.input.slice(chunkStart, this.pos);
          out += this.jsx_readEntity();
          chunkStart = this.pos;
        } else if (isNewLine(ch)) {
          out += this.input.slice(chunkStart, this.pos);
          out += this.jsx_readNewLine(false);
          chunkStart = this.pos;
        } else {
          ++this.pos;
        }
      }
      out += this.input.slice(chunkStart, this.pos++);
      return this.finishToken(tt.string, out);
    }

    jsx_readEntity() {
      let str = '', count = 0, entity;
      let ch = this.input[this.pos];
      if (ch !== '&')
        this.raise(this.pos, 'Entity must start with an ampersand');
      let startPos = ++this.pos;
      while (this.pos < this.input.length && count++ < 10) {
        ch = this.input[this.pos++];
        if (ch === ';') {
          if (str[0] === '#') {
            if (str[1] === 'x') {
              str = str.substr(2);
              if (hexNumber.test(str))
                entity = String.fromCharCode(parseInt(str, 16));
            } else {
              str = str.substr(1);
              if (decimalNumber.test(str))
                entity = String.fromCharCode(parseInt(str, 10));
            }
          } else {
            entity = XHTMLEntities[str];
          }
          break;
        }
        str += ch;
      }
      if (!entity) {
        this.pos = startPos;
        return '&';
      }
      return entity;
    }

    // Read a JSX identifier (valid tag or attribute name).
    //
    // Optimized version since JSX identifiers can't contain
    // escape characters and so can be read as single slice.
    // Also assumes that first character was already checked
    // by isIdentifierStart in readToken.

    jsx_readWord() {
      let ch, start = this.pos;
      do {
        ch = this.input.charCodeAt(++this.pos);
      } while (isIdentifierChar(ch) || ch === 45); // '-'
      return this.finishToken(tok.jsxName, this.input.slice(start, this.pos));
    }

    // Parse next token as JSX identifier

    jsx_parseIdentifier() {
      let node = this.startNode();
      if (this.type === tok.jsxName)
        node.name = this.value;
      else if (this.type.keyword)
        node.name = this.type.keyword;
      else
        this.unexpected();
      this.next();
      return this.finishNode(node, 'JSXIdentifier');
    }

    // Parse namespaced identifier.

    jsx_parseNamespacedName() {
      let startPos = this.start, startLoc = this.startLoc;
      let name = this.jsx_parseIdentifier();
      if (!options.allowNamespaces || !this.eat(tt.colon)) return name;
      var node = this.startNodeAt(startPos, startLoc);
      node.namespace = name;
      node.name = this.jsx_parseIdentifier();
      return this.finishNode(node, 'JSXNamespacedName');
    }

    // Parses element name in any form - namespaced, member
    // or single identifier.

    jsx_parseElementName() {
      if (this.type === tok.jsxTagEnd) return '';
      let startPos = this.start, startLoc = this.startLoc;
      let node = this.jsx_parseNamespacedName();
      if (this.type === tt.dot && node.type === 'JSXNamespacedName' && !options.allowNamespacedObjects) {
        this.unexpected();
      }
      while (this.eat(tt.dot)) {
        let newNode = this.startNodeAt(startPos, startLoc);
        newNode.object = node;
        newNode.property = this.jsx_parseIdentifier();
        node = this.finishNode(newNode, 'JSXMemberExpression');
      }
      return node;
    }

    // Parses any type of JSX attribute value.

    jsx_parseAttributeValue() {
      switch (this.type) {
      case tt.braceL:
        let node = this.jsx_parseExpressionContainer();
        if (node.expression.type === 'JSXEmptyExpression')
          this.raise(node.start, 'JSX attributes must only be assigned a non-empty expression');
        return node;

      case tok.jsxTagStart:
      case tt.string:
        return this.parseExprAtom();

      default:
        this.raise(this.start, 'JSX value should be either an expression or a quoted JSX text');
      }
    }

    // JSXEmptyExpression is unique type since it doesn't actually parse anything,
    // and so it should start at the end of last read token (left brace) and finish
    // at the beginning of the next one (right brace).

    jsx_parseEmptyExpression() {
      let node = this.startNodeAt(this.lastTokEnd, this.lastTokEndLoc);
      return this.finishNodeAt(node, 'JSXEmptyExpression', this.start, this.startLoc);
    }

    // Parses JSX expression enclosed into curly brackets.

    jsx_parseExpressionContainer() {
      let node = this.startNode();
      this.next();
      node.expression = this.type === tt.braceR
        ? this.jsx_parseEmptyExpression()
        : this.parseExpression();
      this.expect(tt.braceR);
      return this.finishNode(node, 'JSXExpressionContainer');
    }

    // Parses following JSX attribute name-value pair.

    jsx_parseAttribute() {
      let node = this.startNode();
      if (this.eat(tt.braceL)) {
        this.expect(tt.ellipsis);
        node.argument = this.parseMaybeAssign();
        this.expect(tt.braceR);
        return this.finishNode(node, 'JSXSpreadAttribute');
      }
      node.name = this.jsx_parseNamespacedName();
      node.value = this.eat(tt.eq) ? this.jsx_parseAttributeValue() : null;
      return this.finishNode(node, 'JSXAttribute');
    }

    // Parses JSX opening tag starting after '<'.

    jsx_parseOpeningElementAt(startPos, startLoc) {
      let node = this.startNodeAt(startPos, startLoc);
      node.attributes = [];
      let nodeName = this.jsx_parseElementName();
      if (nodeName) node.name = nodeName;
      while (this.type !== tt.slash && this.type !== tok.jsxTagEnd)
        node.attributes.push(this.jsx_parseAttribute());
      node.selfClosing = this.eat(tt.slash);
      this.expect(tok.jsxTagEnd);
      return this.finishNode(node, nodeName ? 'JSXOpeningElement' : 'JSXOpeningFragment');
    }

    // Parses JSX closing tag starting after '</'.

    jsx_parseClosingElementAt(startPos, startLoc) {
      let node = this.startNodeAt(startPos, startLoc);
      let nodeName = this.jsx_parseElementName();
      if (nodeName) node.name = nodeName;
      this.expect(tok.jsxTagEnd);
      return this.finishNode(node, nodeName ? 'JSXClosingElement' : 'JSXClosingFragment');
    }

    // Parses entire JSX element, including it's opening tag
    // (starting after '<'), attributes, contents and closing tag.

    jsx_parseElementAt(startPos, startLoc) {
      let node = this.startNodeAt(startPos, startLoc);
      let children = [];
      let openingElement = this.jsx_parseOpeningElementAt(startPos, startLoc);
      let closingElement = null;

      if (!openingElement.selfClosing) {
        contents: for (;;) {
          switch (this.type) {
          case tok.jsxTagStart:
            startPos = this.start; startLoc = this.startLoc;
            this.next();
            if (this.eat(tt.slash)) {
              closingElement = this.jsx_parseClosingElementAt(startPos, startLoc);
              break contents;
            }
            children.push(this.jsx_parseElementAt(startPos, startLoc));
            break;

          case tok.jsxText:
            children.push(this.parseExprAtom());
            break;

          case tt.braceL:
            children.push(this.jsx_parseExpressionContainer());
            break;

          default:
            this.unexpected();
          }
        }
        if (getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name)) {
          this.raise(
            closingElement.start,
            'Expected corresponding JSX closing tag for <' + getQualifiedJSXName(openingElement.name) + '>');
        }
      }
      let fragmentOrElement = openingElement.name ? 'Element' : 'Fragment';

      node['opening' + fragmentOrElement] = openingElement;
      node['closing' + fragmentOrElement] = closingElement;
      node.children = children;
      if (this.type === tt.relational && this.value === "<") {
        this.raise(this.start, "Adjacent JSX elements must be wrapped in an enclosing tag");
      }
      return this.finishNode(node, 'JSX' + fragmentOrElement);
    }

    // Parse JSX text

    jsx_parseText(value) {
      let node = this.parseLiteral(value);
      node.type = "JSXText";
      return node;
    }

    // Parses entire JSX element from current position.

    jsx_parseElement() {
      let startPos = this.start, startLoc = this.startLoc;
      this.next();
      return this.jsx_parseElementAt(startPos, startLoc);
    }

    parseExprAtom(refShortHandDefaultPos) {
      if (this.type === tok.jsxText)
        return this.jsx_parseText(this.value);
      else if (this.type === tok.jsxTagStart)
        return this.jsx_parseElement();
      else
        return super.parseExprAtom(refShortHandDefaultPos);
    }

    readToken(code) {
      let context = this.curContext();

      if (context === tc_expr) return this.jsx_readToken();

      if (context === tc_oTag || context === tc_cTag) {
        if (isIdentifierStart(code)) return this.jsx_readWord();

        if (code == 62) {
          ++this.pos;
          return this.finishToken(tok.jsxTagEnd);
        }

        if ((code === 34 || code === 39) && context == tc_oTag)
          return this.jsx_readString(code);
      }

      if (code === 60 && this.exprAllowed && this.input.charCodeAt(this.pos + 1) !== 33) {
        ++this.pos;
        return this.finishToken(tok.jsxTagStart);
      }
      return super.readToken(code)
    }

    updateContext(prevType) {
      if (this.type == tt.braceL) {
        var curContext = this.curContext();
        if (curContext == tc_oTag) this.context.push(tokContexts.b_expr);
        else if (curContext == tc_expr) this.context.push(tokContexts.b_tmpl);
        else super.updateContext(prevType)
        this.exprAllowed = true;
      } else if (this.type === tt.slash && prevType === tok.jsxTagStart) {
        this.context.length -= 2; // do not consider JSX expr -> JSX open tag -> ... anymore
        this.context.push(tc_cTag); // reconsider as closing tag context
        this.exprAllowed = false;
      } else {
        return super.updateContext(prevType);
      }
    }
  };
}


/***/ }),

/***/ 889:
/***/ (function(module, exports) {

module.exports = {
  quot: '\u0022',
  amp: '&',
  apos: '\u0027',
  lt: '<',
  gt: '>',
  nbsp: '\u00A0',
  iexcl: '\u00A1',
  cent: '\u00A2',
  pound: '\u00A3',
  curren: '\u00A4',
  yen: '\u00A5',
  brvbar: '\u00A6',
  sect: '\u00A7',
  uml: '\u00A8',
  copy: '\u00A9',
  ordf: '\u00AA',
  laquo: '\u00AB',
  not: '\u00AC',
  shy: '\u00AD',
  reg: '\u00AE',
  macr: '\u00AF',
  deg: '\u00B0',
  plusmn: '\u00B1',
  sup2: '\u00B2',
  sup3: '\u00B3',
  acute: '\u00B4',
  micro: '\u00B5',
  para: '\u00B6',
  middot: '\u00B7',
  cedil: '\u00B8',
  sup1: '\u00B9',
  ordm: '\u00BA',
  raquo: '\u00BB',
  frac14: '\u00BC',
  frac12: '\u00BD',
  frac34: '\u00BE',
  iquest: '\u00BF',
  Agrave: '\u00C0',
  Aacute: '\u00C1',
  Acirc: '\u00C2',
  Atilde: '\u00C3',
  Auml: '\u00C4',
  Aring: '\u00C5',
  AElig: '\u00C6',
  Ccedil: '\u00C7',
  Egrave: '\u00C8',
  Eacute: '\u00C9',
  Ecirc: '\u00CA',
  Euml: '\u00CB',
  Igrave: '\u00CC',
  Iacute: '\u00CD',
  Icirc: '\u00CE',
  Iuml: '\u00CF',
  ETH: '\u00D0',
  Ntilde: '\u00D1',
  Ograve: '\u00D2',
  Oacute: '\u00D3',
  Ocirc: '\u00D4',
  Otilde: '\u00D5',
  Ouml: '\u00D6',
  times: '\u00D7',
  Oslash: '\u00D8',
  Ugrave: '\u00D9',
  Uacute: '\u00DA',
  Ucirc: '\u00DB',
  Uuml: '\u00DC',
  Yacute: '\u00DD',
  THORN: '\u00DE',
  szlig: '\u00DF',
  agrave: '\u00E0',
  aacute: '\u00E1',
  acirc: '\u00E2',
  atilde: '\u00E3',
  auml: '\u00E4',
  aring: '\u00E5',
  aelig: '\u00E6',
  ccedil: '\u00E7',
  egrave: '\u00E8',
  eacute: '\u00E9',
  ecirc: '\u00EA',
  euml: '\u00EB',
  igrave: '\u00EC',
  iacute: '\u00ED',
  icirc: '\u00EE',
  iuml: '\u00EF',
  eth: '\u00F0',
  ntilde: '\u00F1',
  ograve: '\u00F2',
  oacute: '\u00F3',
  ocirc: '\u00F4',
  otilde: '\u00F5',
  ouml: '\u00F6',
  divide: '\u00F7',
  oslash: '\u00F8',
  ugrave: '\u00F9',
  uacute: '\u00FA',
  ucirc: '\u00FB',
  uuml: '\u00FC',
  yacute: '\u00FD',
  thorn: '\u00FE',
  yuml: '\u00FF',
  OElig: '\u0152',
  oelig: '\u0153',
  Scaron: '\u0160',
  scaron: '\u0161',
  Yuml: '\u0178',
  fnof: '\u0192',
  circ: '\u02C6',
  tilde: '\u02DC',
  Alpha: '\u0391',
  Beta: '\u0392',
  Gamma: '\u0393',
  Delta: '\u0394',
  Epsilon: '\u0395',
  Zeta: '\u0396',
  Eta: '\u0397',
  Theta: '\u0398',
  Iota: '\u0399',
  Kappa: '\u039A',
  Lambda: '\u039B',
  Mu: '\u039C',
  Nu: '\u039D',
  Xi: '\u039E',
  Omicron: '\u039F',
  Pi: '\u03A0',
  Rho: '\u03A1',
  Sigma: '\u03A3',
  Tau: '\u03A4',
  Upsilon: '\u03A5',
  Phi: '\u03A6',
  Chi: '\u03A7',
  Psi: '\u03A8',
  Omega: '\u03A9',
  alpha: '\u03B1',
  beta: '\u03B2',
  gamma: '\u03B3',
  delta: '\u03B4',
  epsilon: '\u03B5',
  zeta: '\u03B6',
  eta: '\u03B7',
  theta: '\u03B8',
  iota: '\u03B9',
  kappa: '\u03BA',
  lambda: '\u03BB',
  mu: '\u03BC',
  nu: '\u03BD',
  xi: '\u03BE',
  omicron: '\u03BF',
  pi: '\u03C0',
  rho: '\u03C1',
  sigmaf: '\u03C2',
  sigma: '\u03C3',
  tau: '\u03C4',
  upsilon: '\u03C5',
  phi: '\u03C6',
  chi: '\u03C7',
  psi: '\u03C8',
  omega: '\u03C9',
  thetasym: '\u03D1',
  upsih: '\u03D2',
  piv: '\u03D6',
  ensp: '\u2002',
  emsp: '\u2003',
  thinsp: '\u2009',
  zwnj: '\u200C',
  zwj: '\u200D',
  lrm: '\u200E',
  rlm: '\u200F',
  ndash: '\u2013',
  mdash: '\u2014',
  lsquo: '\u2018',
  rsquo: '\u2019',
  sbquo: '\u201A',
  ldquo: '\u201C',
  rdquo: '\u201D',
  bdquo: '\u201E',
  dagger: '\u2020',
  Dagger: '\u2021',
  bull: '\u2022',
  hellip: '\u2026',
  permil: '\u2030',
  prime: '\u2032',
  Prime: '\u2033',
  lsaquo: '\u2039',
  rsaquo: '\u203A',
  oline: '\u203E',
  frasl: '\u2044',
  euro: '\u20AC',
  image: '\u2111',
  weierp: '\u2118',
  real: '\u211C',
  trade: '\u2122',
  alefsym: '\u2135',
  larr: '\u2190',
  uarr: '\u2191',
  rarr: '\u2192',
  darr: '\u2193',
  harr: '\u2194',
  crarr: '\u21B5',
  lArr: '\u21D0',
  uArr: '\u21D1',
  rArr: '\u21D2',
  dArr: '\u21D3',
  hArr: '\u21D4',
  forall: '\u2200',
  part: '\u2202',
  exist: '\u2203',
  empty: '\u2205',
  nabla: '\u2207',
  isin: '\u2208',
  notin: '\u2209',
  ni: '\u220B',
  prod: '\u220F',
  sum: '\u2211',
  minus: '\u2212',
  lowast: '\u2217',
  radic: '\u221A',
  prop: '\u221D',
  infin: '\u221E',
  ang: '\u2220',
  and: '\u2227',
  or: '\u2228',
  cap: '\u2229',
  cup: '\u222A',
  'int': '\u222B',
  there4: '\u2234',
  sim: '\u223C',
  cong: '\u2245',
  asymp: '\u2248',
  ne: '\u2260',
  equiv: '\u2261',
  le: '\u2264',
  ge: '\u2265',
  sub: '\u2282',
  sup: '\u2283',
  nsub: '\u2284',
  sube: '\u2286',
  supe: '\u2287',
  oplus: '\u2295',
  otimes: '\u2297',
  perp: '\u22A5',
  sdot: '\u22C5',
  lceil: '\u2308',
  rceil: '\u2309',
  lfloor: '\u230A',
  rfloor: '\u230B',
  lang: '\u2329',
  rang: '\u232A',
  loz: '\u25CA',
  spades: '\u2660',
  clubs: '\u2663',
  hearts: '\u2665',
  diams: '\u2666'
};


/***/ }),

/***/ 890:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview The AST node types produced by the parser.
 * @author Nicholas C. Zakas
 */



//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

// None!

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

module.exports = {
    AssignmentExpression: "AssignmentExpression",
    AssignmentPattern: "AssignmentPattern",
    ArrayExpression: "ArrayExpression",
    ArrayPattern: "ArrayPattern",
    ArrowFunctionExpression: "ArrowFunctionExpression",
    AwaitExpression: "AwaitExpression",
    BlockStatement: "BlockStatement",
    BinaryExpression: "BinaryExpression",
    BreakStatement: "BreakStatement",
    CallExpression: "CallExpression",
    CatchClause: "CatchClause",
    ClassBody: "ClassBody",
    ClassDeclaration: "ClassDeclaration",
    ClassExpression: "ClassExpression",
    ConditionalExpression: "ConditionalExpression",
    ContinueStatement: "ContinueStatement",
    DoWhileStatement: "DoWhileStatement",
    DebuggerStatement: "DebuggerStatement",
    EmptyStatement: "EmptyStatement",
    ExpressionStatement: "ExpressionStatement",
    ForStatement: "ForStatement",
    ForInStatement: "ForInStatement",
    ForOfStatement: "ForOfStatement",
    FunctionDeclaration: "FunctionDeclaration",
    FunctionExpression: "FunctionExpression",
    Identifier: "Identifier",
    IfStatement: "IfStatement",
    Literal: "Literal",
    LabeledStatement: "LabeledStatement",
    LogicalExpression: "LogicalExpression",
    MemberExpression: "MemberExpression",
    MetaProperty: "MetaProperty",
    MethodDefinition: "MethodDefinition",
    NewExpression: "NewExpression",
    ObjectExpression: "ObjectExpression",
    ObjectPattern: "ObjectPattern",
    Program: "Program",
    Property: "Property",
    RestElement: "RestElement",
    ReturnStatement: "ReturnStatement",
    SequenceExpression: "SequenceExpression",
    SpreadElement: "SpreadElement",
    Super: "Super",
    SwitchCase: "SwitchCase",
    SwitchStatement: "SwitchStatement",
    TaggedTemplateExpression: "TaggedTemplateExpression",
    TemplateElement: "TemplateElement",
    TemplateLiteral: "TemplateLiteral",
    ThisExpression: "ThisExpression",
    ThrowStatement: "ThrowStatement",
    TryStatement: "TryStatement",
    UnaryExpression: "UnaryExpression",
    UpdateExpression: "UpdateExpression",
    VariableDeclaration: "VariableDeclaration",
    VariableDeclarator: "VariableDeclarator",
    WhileStatement: "WhileStatement",
    WithStatement: "WithStatement",
    YieldExpression: "YieldExpression",
    JSXIdentifier: "JSXIdentifier",
    JSXNamespacedName: "JSXNamespacedName",
    JSXMemberExpression: "JSXMemberExpression",
    JSXEmptyExpression: "JSXEmptyExpression",
    JSXExpressionContainer: "JSXExpressionContainer",
    JSXElement: "JSXElement",
    JSXClosingElement: "JSXClosingElement",
    JSXOpeningElement: "JSXOpeningElement",
    JSXAttribute: "JSXAttribute",
    JSXSpreadAttribute: "JSXSpreadAttribute",
    JSXText: "JSXText",
    ExportDefaultDeclaration: "ExportDefaultDeclaration",
    ExportNamedDeclaration: "ExportNamedDeclaration",
    ExportAllDeclaration: "ExportAllDeclaration",
    ExportSpecifier: "ExportSpecifier",
    ImportDeclaration: "ImportDeclaration",
    ImportSpecifier: "ImportSpecifier",
    ImportDefaultSpecifier: "ImportDefaultSpecifier",
    ImportNamespaceSpecifier: "ImportNamespaceSpecifier"
};


/***/ }),

/***/ 891:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const acorn = __webpack_require__(887);
const jsx = __webpack_require__(888);
const commentAttachment = __webpack_require__(892);
const TokenTranslator = __webpack_require__(893);

const DEFAULT_ECMA_VERSION = 5;
const STATE = Symbol("espree's internal state");
const ESPRIMA_FINISH_NODE = Symbol("espree's esprimaFinishNode");
const tokTypes = Object.assign({}, acorn.tokTypes, jsx.tokTypes);

/**
 * Normalize ECMAScript version from the initial config
 * @param {number} ecmaVersion ECMAScript version from the initial config
 * @returns {number} normalized ECMAScript version
 */
function normalizeEcmaVersion(ecmaVersion) {
    if (typeof ecmaVersion === "number") {
        let version = ecmaVersion;

        // Calculate ECMAScript edition number from official year version starting with
        // ES2015, which corresponds with ES6 (or a difference of 2009).
        if (version >= 2015) {
            version -= 2009;
        }

        switch (version) {
            case 3:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                return version;

            default:
                throw new Error("Invalid ecmaVersion.");
        }
    } else {
        return DEFAULT_ECMA_VERSION;
    }
}

/**
 * Converts an Acorn comment to a Esprima comment.
 * @param {boolean} block True if it's a block comment, false if not.
 * @param {string} text The text of the comment.
 * @param {int} start The index at which the comment starts.
 * @param {int} end The index at which the comment ends.
 * @param {Location} startLoc The location at which the comment starts.
 * @param {Location} endLoc The location at which the comment ends.
 * @returns {Object} The comment object.
 * @private
 */
function convertAcornCommentToEsprimaComment(block, text, start, end, startLoc, endLoc) {
    const comment = {
        type: block ? "Block" : "Line",
        value: text
    };

    if (typeof start === "number") {
        comment.start = start;
        comment.end = end;
        comment.range = [start, end];
    }

    if (typeof startLoc === "object") {
        comment.loc = {
            start: startLoc,
            end: endLoc
        };
    }

    return comment;
}

module.exports = () => Parser => class Espree extends Parser {
    constructor(options, code) {
        if (typeof options !== "object" || options === null) {
            options = {};
        }
        if (typeof code !== "string" && !(code instanceof String)) {
            code = String(code);
        }

        const ecmaFeatures = options.ecmaFeatures || {};
        const ecmaVersion = normalizeEcmaVersion(options.ecmaVersion);
        const isModule = options.sourceType === "module";
        const tokenTranslator =
            options.tokens === true ?
                new TokenTranslator(tokTypes, code) :
                null;

        // Initialize acorn parser.
        super({
            ecmaVersion: isModule ? Math.max(6, ecmaVersion) : ecmaVersion,
            sourceType: isModule ? "module" : "script",
            ranges: options.range === true || options.attachComment === true,
            locations: options.loc === true,

            // Truthy value is true for backward compatibility.
            allowReturnOutsideFunction: Boolean(ecmaFeatures.globalReturn),

            // Collect tokens
            onToken: (token) => {
                if (tokenTranslator) {
                    // Use `tokens`, `ecmaVersion`, and `jsxAttrValueToken` in the state.
                    tokenTranslator.onToken(token, this[STATE]);
                }
                if (token.type !== tokTypes.eof) {
                    this[STATE].lastToken = token;
                }
            },

            // Collect comments
            onComment: (block, text, start, end, startLoc, endLoc) => {
                if (this[STATE].comments) {
                    const comment = convertAcornCommentToEsprimaComment(block, text, start, end, startLoc, endLoc);
                    this[STATE].comments.push(comment);

                    if (options.attachComment === true) {
                        commentAttachment.addComment(comment);
                    }
                }
            }
        }, code);

        // TODO: remove global state.
        commentAttachment.reset();

        // Initialize internal state.
        this[STATE] = {
            tokens: tokenTranslator ? [] : null,
            comments: options.comment === true || options.attachComment === true ? [] : null,
            attachComment: options.attachComment === true,
            impliedStrict: ecmaFeatures.impliedStrict === true && this.options.ecmaVersion >= 5,
            ecmaVersion: this.options.ecmaVersion,
            jsxAttrValueToken: false,
            lastToken: null
        };
    }

    tokenize() {
        do {
            this.next();
        } while (this.type !== tokTypes.eof);

        const extra = this[STATE];
        const tokens = extra.tokens;

        if (extra.comments) {
            tokens.comments = extra.comments;
        }

        return tokens;
    }

    finishNode(...args) {
        const result = super.finishNode(...args);
        return this[ESPRIMA_FINISH_NODE](result);
    }

    finishNodeAt(...args) {
        const result = super.finishNodeAt(...args);
        return this[ESPRIMA_FINISH_NODE](result);
    }

    parse() {
        const extra = this[STATE];
        const program = super.parse();

        program.sourceType = this.options.sourceType;

        if (extra.comments) {
            program.comments = extra.comments;
        }
        if (extra.tokens) {
            program.tokens = extra.tokens;
        }

        /*
         * Adjust opening and closing position of program to match Esprima.
         * Acorn always starts programs at range 0 whereas Esprima starts at the
         * first AST node's start (the only real difference is when there's leading
         * whitespace or leading comments). Acorn also counts trailing whitespace
         * as part of the program whereas Esprima only counts up to the last token.
         */
        if (program.range) {
            program.range[0] = program.body.length ? program.body[0].range[0] : program.range[0];
            program.range[1] = extra.lastToken ? extra.lastToken.range[1] : program.range[1];
        }
        if (program.loc) {
            program.loc.start = program.body.length ? program.body[0].loc.start : program.loc.start;
            program.loc.end = extra.lastToken ? extra.lastToken.loc.end : program.loc.end;
        }

        return program;
    }

    parseTopLevel(node) {
        if (this[STATE].impliedStrict) {
            this.strict = true;
        }
        return super.parseTopLevel(node);
    }

    /**
     * Overwrites the default raise method to throw Esprima-style errors.
     * @param {int} pos The position of the error.
     * @param {string} message The error message.
     * @throws {SyntaxError} A syntax error.
     * @returns {void}
     */
    raise(pos, message) {
        const loc = acorn.getLineInfo(this.input, pos);
        const err = new SyntaxError(message);
        err.index = pos;
        err.lineNumber = loc.line;
        err.column = loc.column + 1; // acorn uses 0-based columns
        throw err;
    }

    /**
     * Overwrites the default raise method to throw Esprima-style errors.
     * @param {int} pos The position of the error.
     * @param {string} message The error message.
     * @throws {SyntaxError} A syntax error.
     * @returns {void}
     */
    raiseRecoverable(pos, message) {
        this.raise(pos, message);
    }

    /**
     * Overwrites the default unexpected method to throw Esprima-style errors.
     * @param {int} pos The position of the error.
     * @throws {SyntaxError} A syntax error.
     * @returns {void}
     */
    unexpected(pos) {
        let message = "Unexpected token";

        if (pos !== null && pos !== void 0) {
            this.pos = pos;

            if (this.options.locations) {
                while (this.pos < this.lineStart) {
                    this.lineStart = this.input.lastIndexOf("\n", this.lineStart - 2) + 1;
                    --this.curLine;
                }
            }

            this.nextToken();
        }

        if (this.end > this.start) {
            message += " " + this.input.slice(this.start, this.end);
        }

        this.raise(this.start, message);
    }

    /*
     * Esprima-FB represents JSX strings as tokens called "JSXText", but Acorn-JSX
     * uses regular tt.string without any distinction between this and regular JS
     * strings. As such, we intercept an attempt to read a JSX string and set a flag
     * on extra so that when tokens are converted, the next token will be switched
     * to JSXText via onToken.
     */
    jsx_readString(quote) { // eslint-disable-line camelcase
        const result = super.jsx_readString(quote);
        if (this.type === tokTypes.string) {
            this[STATE].jsxAttrValueToken = true;
        }
        return result;
    }

    /**
     * Performs last-minute Esprima-specific compatibility checks and fixes.
     * @param {ASTNode} result The node to check.
     * @returns {ASTNode} The finished node.
     */
    [ESPRIMA_FINISH_NODE](result) {
        // Acorn doesn't count the opening and closing backticks as part of templates
        // so we have to adjust ranges/locations appropriately.
        if (result.type === "TemplateElement") {

            // additional adjustment needed if ${ is the last token
            const terminalDollarBraceL = this.input.slice(result.end, result.end + 2) === "${";

            if (result.range) {
                result.range[0]--;
                result.range[1] += (terminalDollarBraceL ? 2 : 1);
            }

            if (result.loc) {
                result.loc.start.column--;
                result.loc.end.column += (terminalDollarBraceL ? 2 : 1);
            }
        }

        if (this[STATE].attachComment) {
            commentAttachment.processComment(result);
        }

        if (result.type.indexOf("Function") > -1 && !result.generator) {
            result.generator = false;
        }

        return result;
    }
};


/***/ }),

/***/ 892:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Attaches comments to the AST.
 * @author Nicholas C. Zakas
 */



//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var astNodeTypes = __webpack_require__(890);

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

var extra = {
    trailingComments: [],
    leadingComments: [],
    bottomRightStack: [],
    previousNode: null
};

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

module.exports = {

    reset: function() {
        extra.trailingComments = [];
        extra.leadingComments = [];
        extra.bottomRightStack = [];
        extra.previousNode = null;
    },

    addComment: function(comment) {
        extra.trailingComments.push(comment);
        extra.leadingComments.push(comment);
    },

    processComment: function(node) {
        var lastChild,
            trailingComments,
            i,
            j;

        if (node.type === astNodeTypes.Program) {
            if (node.body.length > 0) {
                return;
            }
        }

        if (extra.trailingComments.length > 0) {

            /*
             * If the first comment in trailingComments comes after the
             * current node, then we're good - all comments in the array will
             * come after the node and so it's safe to add then as official
             * trailingComments.
             */
            if (extra.trailingComments[0].range[0] >= node.range[1]) {
                trailingComments = extra.trailingComments;
                extra.trailingComments = [];
            } else {

                /*
                 * Otherwise, if the first comment doesn't come after the
                 * current node, that means we have a mix of leading and trailing
                 * comments in the array and that leadingComments contains the
                 * same items as trailingComments. Reset trailingComments to
                 * zero items and we'll handle this by evaluating leadingComments
                 * later.
                 */
                extra.trailingComments.length = 0;
            }
        } else {
            if (extra.bottomRightStack.length > 0 &&
                    extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments &&
                    extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments[0].range[0] >= node.range[1]) {
                trailingComments = extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
                delete extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
            }
        }

        // Eating the stack.
        while (extra.bottomRightStack.length > 0 && extra.bottomRightStack[extra.bottomRightStack.length - 1].range[0] >= node.range[0]) {
            lastChild = extra.bottomRightStack.pop();
        }

        if (lastChild) {
            if (lastChild.leadingComments) {
                if (lastChild.leadingComments[lastChild.leadingComments.length - 1].range[1] <= node.range[0]) {
                    node.leadingComments = lastChild.leadingComments;
                    delete lastChild.leadingComments;
                } else {
                    // A leading comment for an anonymous class had been stolen by its first MethodDefinition,
                    // so this takes back the leading comment.
                    // See Also: https://github.com/eslint/espree/issues/158
                    for (i = lastChild.leadingComments.length - 2; i >= 0; --i) {
                        if (lastChild.leadingComments[i].range[1] <= node.range[0]) {
                            node.leadingComments = lastChild.leadingComments.splice(0, i + 1);
                            break;
                        }
                    }
                }
            }
        } else if (extra.leadingComments.length > 0) {
            if (extra.leadingComments[extra.leadingComments.length - 1].range[1] <= node.range[0]) {
                if (extra.previousNode) {
                    for (j = 0; j < extra.leadingComments.length; j++) {
                        if (extra.leadingComments[j].end < extra.previousNode.end) {
                            extra.leadingComments.splice(j, 1);
                            j--;
                        }
                    }
                }
                if (extra.leadingComments.length > 0) {
                    node.leadingComments = extra.leadingComments;
                    extra.leadingComments = [];
                }
            } else {

                // https://github.com/eslint/espree/issues/2

                /*
                 * In special cases, such as return (without a value) and
                 * debugger, all comments will end up as leadingComments and
                 * will otherwise be eliminated. This extra step runs when the
                 * bottomRightStack is empty and there are comments left
                 * in leadingComments.
                 *
                 * This loop figures out the stopping point between the actual
                 * leading and trailing comments by finding the location of the
                 * first comment that comes after the given node.
                 */
                for (i = 0; i < extra.leadingComments.length; i++) {
                    if (extra.leadingComments[i].range[1] > node.range[0]) {
                        break;
                    }
                }

                /*
                 * Split the array based on the location of the first comment
                 * that comes after the node. Keep in mind that this could
                 * result in an empty array, and if so, the array must be
                 * deleted.
                 */
                node.leadingComments = extra.leadingComments.slice(0, i);
                if (node.leadingComments.length === 0) {
                    delete node.leadingComments;
                }

                /*
                 * Similarly, trailing comments are attached later. The variable
                 * must be reset to null if there are no trailing comments.
                 */
                trailingComments = extra.leadingComments.slice(i);
                if (trailingComments.length === 0) {
                    trailingComments = null;
                }
            }
        }

        extra.previousNode = node;

        if (trailingComments) {
            node.trailingComments = trailingComments;
        }

        extra.bottomRightStack.push(node);
    }

};


/***/ }),

/***/ 893:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Translates tokens between Acorn format and Esprima format.
 * @author Nicholas C. Zakas
 */
/* eslint no-underscore-dangle: 0 */



//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

// none!

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------


// Esprima Token Types
var Token = {
    Boolean: "Boolean",
    EOF: "<end>",
    Identifier: "Identifier",
    Keyword: "Keyword",
    Null: "Null",
    Numeric: "Numeric",
    Punctuator: "Punctuator",
    String: "String",
    RegularExpression: "RegularExpression",
    Template: "Template",
    JSXIdentifier: "JSXIdentifier",
    JSXText: "JSXText"
};

/**
 * Converts part of a template into an Esprima token.
 * @param {AcornToken[]} tokens The Acorn tokens representing the template.
 * @param {string} code The source code.
 * @returns {EsprimaToken} The Esprima equivalent of the template token.
 * @private
 */
function convertTemplatePart(tokens, code) {
    var firstToken = tokens[0],
        lastTemplateToken = tokens[tokens.length - 1];

    var token = {
        type: Token.Template,
        value: code.slice(firstToken.start, lastTemplateToken.end)
    };

    if (firstToken.loc) {
        token.loc = {
            start: firstToken.loc.start,
            end: lastTemplateToken.loc.end
        };
    }

    if (firstToken.range) {
        token.start = firstToken.range[0];
        token.end = lastTemplateToken.range[1];
        token.range = [token.start, token.end];
    }

    return token;
}

/**
 * Contains logic to translate Acorn tokens into Esprima tokens.
 * @param {Object} acornTokTypes The Acorn token types.
 * @param {string} code The source code Acorn is parsing. This is necessary
 *      to correct the "value" property of some tokens.
 * @constructor
 */
function TokenTranslator(acornTokTypes, code) {

    // token types
    this._acornTokTypes = acornTokTypes;

    // token buffer for templates
    this._tokens = [];

    // track the last curly brace
    this._curlyBrace = null;

    // the source code
    this._code = code;

}

TokenTranslator.prototype = {
    constructor: TokenTranslator,

    /**
     * Translates a single Esprima token to a single Acorn token. This may be
     * inaccurate due to how templates are handled differently in Esprima and
     * Acorn, but should be accurate for all other tokens.
     * @param {AcornToken} token The Acorn token to translate.
     * @param {Object} extra Espree extra object.
     * @returns {EsprimaToken} The Esprima version of the token.
     */
    translate: function(token, extra) {

        var type = token.type,
            tt = this._acornTokTypes;

        if (type === tt.name) {
            token.type = Token.Identifier;

            // TODO: See if this is an Acorn bug
            if (token.value === "static") {
                token.type = Token.Keyword;
            }

            if (extra.ecmaVersion > 5 && (token.value === "yield" || token.value === "let")) {
                token.type = Token.Keyword;
            }

        } else if (type === tt.semi || type === tt.comma ||
                 type === tt.parenL || type === tt.parenR ||
                 type === tt.braceL || type === tt.braceR ||
                 type === tt.dot || type === tt.bracketL ||
                 type === tt.colon || type === tt.question ||
                 type === tt.bracketR || type === tt.ellipsis ||
                 type === tt.arrow || type === tt.jsxTagStart ||
                 type === tt.incDec || type === tt.starstar ||
                 type === tt.jsxTagEnd || type === tt.prefix ||
                 (type.binop && !type.keyword) ||
                 type.isAssign) {

            token.type = Token.Punctuator;
            token.value = this._code.slice(token.start, token.end);
        } else if (type === tt.jsxName) {
            token.type = Token.JSXIdentifier;
        } else if (type.label === "jsxText" || type === tt.jsxAttrValueToken) {
            token.type = Token.JSXText;
        } else if (type.keyword) {
            if (type.keyword === "true" || type.keyword === "false") {
                token.type = Token.Boolean;
            } else if (type.keyword === "null") {
                token.type = Token.Null;
            } else {
                token.type = Token.Keyword;
            }
        } else if (type === tt.num) {
            token.type = Token.Numeric;
            token.value = this._code.slice(token.start, token.end);
        } else if (type === tt.string) {

            if (extra.jsxAttrValueToken) {
                extra.jsxAttrValueToken = false;
                token.type = Token.JSXText;
            } else {
                token.type = Token.String;
            }

            token.value = this._code.slice(token.start, token.end);
        } else if (type === tt.regexp) {
            token.type = Token.RegularExpression;
            var value = token.value;
            token.regex = {
                flags: value.flags,
                pattern: value.pattern
            };
            token.value = "/" + value.pattern + "/" + value.flags;
        }

        return token;
    },

    /**
     * Function to call during Acorn's onToken handler.
     * @param {AcornToken} token The Acorn token.
     * @param {Object} extra The Espree extra object.
     * @returns {void}
     */
    onToken: function(token, extra) {

        var that = this,
            tt = this._acornTokTypes,
            tokens = extra.tokens,
            templateTokens = this._tokens;

        /**
         * Flushes the buffered template tokens and resets the template
         * tracking.
         * @returns {void}
         * @private
         */
        function translateTemplateTokens() {
            tokens.push(convertTemplatePart(that._tokens, that._code));
            that._tokens = [];
        }

        if (token.type === tt.eof) {

            // might be one last curlyBrace
            if (this._curlyBrace) {
                tokens.push(this.translate(this._curlyBrace, extra));
            }

            return;
        }

        if (token.type === tt.backQuote) {

            // if there's already a curly, it's not part of the template
            if (this._curlyBrace) {
                tokens.push(this.translate(this._curlyBrace, extra));
                this._curlyBrace = null;
            }

            templateTokens.push(token);

            // it's the end
            if (templateTokens.length > 1) {
                translateTemplateTokens();
            }

            return;
        } else if (token.type === tt.dollarBraceL) {
            templateTokens.push(token);
            translateTemplateTokens();
            return;
        } else if (token.type === tt.braceR) {

            // if there's already a curly, it's not part of the template
            if (this._curlyBrace) {
                tokens.push(this.translate(this._curlyBrace, extra));
            }

            // store new curly for later
            this._curlyBrace = token;
            return;
        } else if (token.type === tt.template || token.type === tt.invalidTemplate) {
            if (this._curlyBrace) {
                templateTokens.push(this._curlyBrace);
                this._curlyBrace = null;
            }

            templateTokens.push(token);
            return;
        }

        if (this._curlyBrace) {
            tokens.push(this.translate(this._curlyBrace, extra));
            this._curlyBrace = null;
        }

        tokens.push(this.translate(token, extra));
    }
};

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

module.exports = TokenTranslator;


/***/ }),

/***/ 894:
/***/ (function(module) {

module.exports = {"name":"espree","description":"An Esprima-compatible JavaScript parser built on Acorn","author":"Nicholas C. Zakas <nicholas+npm@nczconsulting.com>","homepage":"https://github.com/eslint/espree","main":"espree.js","version":"4.1.0","files":["lib","espree.js"],"engines":{"node":">=6.0.0"},"repository":"eslint/espree","bugs":{"url":"http://github.com/eslint/espree.git"},"license":"BSD-2-Clause","dependencies":{"acorn":"^6.0.2","acorn-jsx":"^5.0.0","eslint-visitor-keys":"^1.0.0"},"devDependencies":{"browserify":"^7.0.0","chai":"^1.10.0","eslint":"^2.13.1","eslint-config-eslint":"^3.0.0","eslint-release":"^1.0.0","esprima":"latest","esprima-fb":"^8001.2001.0-dev-harmony-fb","json-diff":"~0.3.1","leche":"^1.0.1","mocha":"^2.0.1","nyc":"^13.0.1","regenerate":"~0.5.4","shelljs":"^0.3.0","shelljs-nodecli":"^0.1.1","unicode-6.3.0":"~0.1.0"},"keywords":["ast","ecmascript","javascript","parser","syntax","acorn"],"scripts":{"generate-regex":"node tools/generate-identifier-regex.js","test":"npm run-script lint && node Makefile.js test","lint":"node Makefile.js lint","browserify":"node Makefile.js browserify","generate-release":"eslint-generate-release","generate-alpharelease":"eslint-generate-prerelease alpha","generate-betarelease":"eslint-generate-prerelease beta","generate-rcrelease":"eslint-generate-prerelease rc","publish-release":"eslint-publish-release"}};

/***/ })

}]);