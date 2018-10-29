(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ 727:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Evk = _interopDefault(__webpack_require__(40));
var sortedLastIndex = _interopDefault(__webpack_require__(728));
var debugFactory = _interopDefault(__webpack_require__(740));
var escope = _interopDefault(__webpack_require__(23));
var first = _interopDefault(__webpack_require__(743));
var last = _interopDefault(__webpack_require__(745));
var sortedIndexBy = _interopDefault(__webpack_require__(746));
var sortedLastIndexBy = _interopDefault(__webpack_require__(852));
var assert = _interopDefault(__webpack_require__(24));
var findLastIndex = _interopDefault(__webpack_require__(853));
var esquery = _interopDefault(__webpack_require__(142));
var union = _interopDefault(__webpack_require__(858));
var intersection = _interopDefault(__webpack_require__(878));
var memoize = _interopDefault(__webpack_require__(841));
var EventEmitter = _interopDefault(__webpack_require__(881));
var path = __webpack_require__(82);

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

const ALIAS_PARENS = /^(\s*)\(([\s\S]+)\)(\s*(?:in|of)\b[\s\S]+)$/;
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
        ? __webpack_require__(882)(parserOptions.parser)
        : __webpack_require__(71);
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

const DIRECTIVE_NAME = /^(?:v-|[:@]).*[^.:@]$/;
const DT_DD = /^d[dt]$/;
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

const STARTS_WITH_LT = /^\s*</;
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

/***/ 728:
/***/ (function(module, exports, __webpack_require__) {

var baseSortedIndex = __webpack_require__(729);

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

/***/ 729:
/***/ (function(module, exports, __webpack_require__) {

var baseSortedIndexBy = __webpack_require__(730),
    identity = __webpack_require__(739),
    isSymbol = __webpack_require__(731);

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

/***/ 730:
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(731);

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

/***/ 731:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(732),
    isObjectLike = __webpack_require__(738);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ 732:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(733),
    getRawTag = __webpack_require__(736),
    objectToString = __webpack_require__(737);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ 733:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(734);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ 734:
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(735);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ 735:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(4)))

/***/ }),

/***/ 736:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(733);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ 737:
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ 738:
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ 739:
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ 740:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(741);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
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

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

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
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(18)))

/***/ }),

/***/ 741:
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(742);

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
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
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ 742:
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
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
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
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
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
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
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),

/***/ 743:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(744);


/***/ }),

/***/ 744:
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

/***/ 745:
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

/***/ 746:
/***/ (function(module, exports, __webpack_require__) {

var baseIteratee = __webpack_require__(747),
    baseSortedIndexBy = __webpack_require__(730);

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

/***/ 747:
/***/ (function(module, exports, __webpack_require__) {

var baseMatches = __webpack_require__(748),
    baseMatchesProperty = __webpack_require__(834),
    identity = __webpack_require__(739),
    isArray = __webpack_require__(804),
    property = __webpack_require__(849);

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

/***/ 748:
/***/ (function(module, exports, __webpack_require__) {

var baseIsMatch = __webpack_require__(749),
    getMatchData = __webpack_require__(831),
    matchesStrictComparable = __webpack_require__(833);

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

/***/ 749:
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(750),
    baseIsEqual = __webpack_require__(788);

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

/***/ 750:
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(751),
    stackClear = __webpack_require__(759),
    stackDelete = __webpack_require__(760),
    stackGet = __webpack_require__(761),
    stackHas = __webpack_require__(762),
    stackSet = __webpack_require__(763);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),

/***/ 751:
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(752),
    listCacheDelete = __webpack_require__(753),
    listCacheGet = __webpack_require__(756),
    listCacheHas = __webpack_require__(757),
    listCacheSet = __webpack_require__(758);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),

/***/ 752:
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),

/***/ 753:
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(754);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),

/***/ 754:
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(755);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),

/***/ 755:
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ 756:
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(754);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),

/***/ 757:
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(754);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),

/***/ 758:
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(754);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),

/***/ 759:
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(751);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),

/***/ 760:
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),

/***/ 761:
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),

/***/ 762:
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),

/***/ 763:
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(751),
    Map = __webpack_require__(764),
    MapCache = __webpack_require__(773);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),

/***/ 764:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(765),
    root = __webpack_require__(734);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ 765:
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(766),
    getValue = __webpack_require__(772);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ 766:
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(767),
    isMasked = __webpack_require__(769),
    isObject = __webpack_require__(768),
    toSource = __webpack_require__(771);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ 767:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(732),
    isObject = __webpack_require__(768);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ 768:
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ 769:
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(770);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ 770:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(734);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ 771:
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ 772:
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ 773:
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(774),
    mapCacheDelete = __webpack_require__(782),
    mapCacheGet = __webpack_require__(785),
    mapCacheHas = __webpack_require__(786),
    mapCacheSet = __webpack_require__(787);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),

/***/ 774:
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(775),
    ListCache = __webpack_require__(751),
    Map = __webpack_require__(764);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),

/***/ 775:
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(776),
    hashDelete = __webpack_require__(778),
    hashGet = __webpack_require__(779),
    hashHas = __webpack_require__(780),
    hashSet = __webpack_require__(781);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),

/***/ 776:
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(777);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),

/***/ 777:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(765);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),

/***/ 778:
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),

/***/ 779:
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(777);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),

/***/ 780:
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(777);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),

/***/ 781:
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(777);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),

/***/ 782:
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(783);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),

/***/ 783:
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(784);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),

/***/ 784:
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),

/***/ 785:
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(783);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),

/***/ 786:
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(783);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),

/***/ 787:
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(783);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),

/***/ 788:
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(789),
    isObjectLike = __webpack_require__(738);

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

/***/ 789:
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(750),
    equalArrays = __webpack_require__(790),
    equalByTag = __webpack_require__(796),
    equalObjects = __webpack_require__(800),
    getTag = __webpack_require__(826),
    isArray = __webpack_require__(804),
    isBuffer = __webpack_require__(813),
    isTypedArray = __webpack_require__(816);

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

/***/ 790:
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(791),
    arraySome = __webpack_require__(794),
    cacheHas = __webpack_require__(795);

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

/***/ 791:
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(773),
    setCacheAdd = __webpack_require__(792),
    setCacheHas = __webpack_require__(793);

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ }),

/***/ 792:
/***/ (function(module, exports) {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ }),

/***/ 793:
/***/ (function(module, exports) {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ }),

/***/ 794:
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

/***/ 795:
/***/ (function(module, exports) {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ }),

/***/ 796:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(733),
    Uint8Array = __webpack_require__(797),
    eq = __webpack_require__(755),
    equalArrays = __webpack_require__(790),
    mapToArray = __webpack_require__(798),
    setToArray = __webpack_require__(799);

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

/***/ 797:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(734);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),

/***/ 798:
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

/***/ 799:
/***/ (function(module, exports) {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ }),

/***/ 800:
/***/ (function(module, exports, __webpack_require__) {

var getAllKeys = __webpack_require__(801);

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

/***/ 801:
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(802),
    getSymbols = __webpack_require__(805),
    keys = __webpack_require__(808);

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),

/***/ 802:
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(803),
    isArray = __webpack_require__(804);

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),

/***/ 803:
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),

/***/ 804:
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ 805:
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(806),
    stubArray = __webpack_require__(807);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),

/***/ 806:
/***/ (function(module, exports) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),

/***/ 807:
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),

/***/ 808:
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(809),
    baseKeys = __webpack_require__(821),
    isArrayLike = __webpack_require__(825);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),

/***/ 809:
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(810),
    isArguments = __webpack_require__(811),
    isArray = __webpack_require__(804),
    isBuffer = __webpack_require__(813),
    isIndex = __webpack_require__(815),
    isTypedArray = __webpack_require__(816);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),

/***/ 810:
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),

/***/ 811:
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(812),
    isObjectLike = __webpack_require__(738);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ 812:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(732),
    isObjectLike = __webpack_require__(738);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ 813:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(734),
    stubFalse = __webpack_require__(814);

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(55)(module)))

/***/ }),

/***/ 814:
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ 815:
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ 816:
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(817),
    baseUnary = __webpack_require__(819),
    nodeUtil = __webpack_require__(820);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),

/***/ 817:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(732),
    isLength = __webpack_require__(818),
    isObjectLike = __webpack_require__(738);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),

/***/ 818:
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ 819:
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ 820:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(735);

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(55)(module)))

/***/ }),

/***/ 821:
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(822),
    nativeKeys = __webpack_require__(823);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),

/***/ 822:
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),

/***/ 823:
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(824);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ 824:
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),

/***/ 825:
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(767),
    isLength = __webpack_require__(818);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ 826:
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(827),
    Map = __webpack_require__(764),
    Promise = __webpack_require__(828),
    Set = __webpack_require__(829),
    WeakMap = __webpack_require__(830),
    baseGetTag = __webpack_require__(732),
    toSource = __webpack_require__(771);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),

/***/ 827:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(765),
    root = __webpack_require__(734);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),

/***/ 828:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(765),
    root = __webpack_require__(734);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),

/***/ 829:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(765),
    root = __webpack_require__(734);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),

/***/ 830:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(765),
    root = __webpack_require__(734);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),

/***/ 831:
/***/ (function(module, exports, __webpack_require__) {

var isStrictComparable = __webpack_require__(832),
    keys = __webpack_require__(808);

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

/***/ 832:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(768);

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

/***/ 833:
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

/***/ 834:
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(788),
    get = __webpack_require__(835),
    hasIn = __webpack_require__(846),
    isKey = __webpack_require__(838),
    isStrictComparable = __webpack_require__(832),
    matchesStrictComparable = __webpack_require__(833),
    toKey = __webpack_require__(845);

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

/***/ 835:
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(836);

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

/***/ 836:
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(837),
    toKey = __webpack_require__(845);

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

/***/ 837:
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(804),
    isKey = __webpack_require__(838),
    stringToPath = __webpack_require__(839),
    toString = __webpack_require__(842);

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

/***/ 838:
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(804),
    isSymbol = __webpack_require__(731);

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

/***/ 839:
/***/ (function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(840);

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

/***/ 840:
/***/ (function(module, exports, __webpack_require__) {

var memoize = __webpack_require__(841);

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

/***/ 841:
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(773);

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

/***/ 842:
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(843);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),

/***/ 843:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(733),
    arrayMap = __webpack_require__(844),
    isArray = __webpack_require__(804),
    isSymbol = __webpack_require__(731);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),

/***/ 844:
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),

/***/ 845:
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(731);

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

/***/ 846:
/***/ (function(module, exports, __webpack_require__) {

var baseHasIn = __webpack_require__(847),
    hasPath = __webpack_require__(848);

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

/***/ 847:
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

/***/ 848:
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(837),
    isArguments = __webpack_require__(811),
    isArray = __webpack_require__(804),
    isIndex = __webpack_require__(815),
    isLength = __webpack_require__(818),
    toKey = __webpack_require__(845);

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

/***/ 849:
/***/ (function(module, exports, __webpack_require__) {

var baseProperty = __webpack_require__(850),
    basePropertyDeep = __webpack_require__(851),
    isKey = __webpack_require__(838),
    toKey = __webpack_require__(845);

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

/***/ 850:
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

/***/ 851:
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(836);

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

/***/ 852:
/***/ (function(module, exports, __webpack_require__) {

var baseIteratee = __webpack_require__(747),
    baseSortedIndexBy = __webpack_require__(730);

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

/***/ 853:
/***/ (function(module, exports, __webpack_require__) {

var baseFindIndex = __webpack_require__(854),
    baseIteratee = __webpack_require__(747),
    toInteger = __webpack_require__(855);

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

/***/ 854:
/***/ (function(module, exports) {

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;


/***/ }),

/***/ 855:
/***/ (function(module, exports, __webpack_require__) {

var toFinite = __webpack_require__(856);

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;


/***/ }),

/***/ 856:
/***/ (function(module, exports, __webpack_require__) {

var toNumber = __webpack_require__(857);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;


/***/ }),

/***/ 857:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(768),
    isSymbol = __webpack_require__(731);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ 858:
/***/ (function(module, exports, __webpack_require__) {

var baseFlatten = __webpack_require__(859),
    baseRest = __webpack_require__(861),
    baseUniq = __webpack_require__(869),
    isArrayLikeObject = __webpack_require__(877);

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

/***/ 859:
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(803),
    isFlattenable = __webpack_require__(860);

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

/***/ 860:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(733),
    isArguments = __webpack_require__(811),
    isArray = __webpack_require__(804);

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

/***/ 861:
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(739),
    overRest = __webpack_require__(862),
    setToString = __webpack_require__(864);

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),

/***/ 862:
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(863);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),

/***/ 863:
/***/ (function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),

/***/ 864:
/***/ (function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(865),
    shortOut = __webpack_require__(868);

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),

/***/ 865:
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__(866),
    defineProperty = __webpack_require__(867),
    identity = __webpack_require__(739);

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),

/***/ 866:
/***/ (function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),

/***/ 867:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(765);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),

/***/ 868:
/***/ (function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),

/***/ 869:
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(791),
    arrayIncludes = __webpack_require__(870),
    arrayIncludesWith = __webpack_require__(874),
    cacheHas = __webpack_require__(795),
    createSet = __webpack_require__(875),
    setToArray = __webpack_require__(799);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;


/***/ }),

/***/ 870:
/***/ (function(module, exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(871);

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;


/***/ }),

/***/ 871:
/***/ (function(module, exports, __webpack_require__) {

var baseFindIndex = __webpack_require__(854),
    baseIsNaN = __webpack_require__(872),
    strictIndexOf = __webpack_require__(873);

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;


/***/ }),

/***/ 872:
/***/ (function(module, exports) {

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;


/***/ }),

/***/ 873:
/***/ (function(module, exports) {

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;


/***/ }),

/***/ 874:
/***/ (function(module, exports) {

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;


/***/ }),

/***/ 875:
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(829),
    noop = __webpack_require__(876),
    setToArray = __webpack_require__(799);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set(values);
};

module.exports = createSet;


/***/ }),

/***/ 876:
/***/ (function(module, exports) {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ }),

/***/ 877:
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(825),
    isObjectLike = __webpack_require__(738);

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

/***/ 878:
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(844),
    baseIntersection = __webpack_require__(879),
    baseRest = __webpack_require__(861),
    castArrayLikeObject = __webpack_require__(880);

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

/***/ 879:
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(791),
    arrayIncludes = __webpack_require__(870),
    arrayIncludesWith = __webpack_require__(874),
    arrayMap = __webpack_require__(844),
    baseUnary = __webpack_require__(819),
    cacheHas = __webpack_require__(795);

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

/***/ 880:
/***/ (function(module, exports, __webpack_require__) {

var isArrayLikeObject = __webpack_require__(877);

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

/***/ 881:
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


/***/ })

}]);