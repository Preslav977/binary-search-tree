/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Node.js":
/*!*********************!*\
  !*** ./src/Node.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable no-underscore-dangle */
class Node {
  constructor(data) {
    this.data = data;
    this.leftChildren = null;
    this.rightChildren = null;
  }
  get leftChildren() {
    return this._leftChildren;
  }
  set leftChildren(value) {
    this._leftChildren = value;
  }
  get rightChildren() {
    return this._rightChildren;
  }
  set rightChildren(value) {
    this._rightChildren = value;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Node);

/***/ }),

/***/ "./src/Tree.js":
/*!*********************!*\
  !*** ./src/Tree.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node */ "./src/Node.js");
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

class Tree {
  array = [];
  constructor() {
    this.root = null;
  }
  get root() {
    return this._root;
  }
  set root(value) {
    this._root = value;
  }
  buildTree(array, start, end) {
    const newArray = [];
    array.sort((smallerValue, biggerValue) => smallerValue - biggerValue);
    array.forEach(element => {
      if (!newArray.includes(element)) {
        newArray.push(element);
      }
    });
    if (start > end) {
      return null;
    }
    const middle = Math.floor(parseInt(start + end) / 2);
    const node = new _Node__WEBPACK_IMPORTED_MODULE_0__["default"](newArray[middle]);
    node.leftChildren = this.buildTree(array, start, middle - 1);
    node.rightChildren = this.buildTree(array, middle + 1, end);
    this.root = node;
    return node;
  }
  prettyPrint = (() => {
    var _this = this;
    return function () {
      let node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.root;
      let prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      let isLeft = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (node === null) {
        return;
      }
      if (node.rightChildren !== null) {
        _this.prettyPrint(node.rightChildren, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.leftChildren !== null) {
        _this.prettyPrint(node.leftChildren, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    };
  })();

  // Don't use the original array that was used to build tree
  // for insert and delete function parameter
  // for this method it should traverse the tree and manipulate
  // their connection

  insert(data) {
    let root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.root;
    if (root === null) {
      root = new _Node__WEBPACK_IMPORTED_MODULE_0__["default"](data);
    }
    if (data < root.data) {
      root.leftChildren = this.insert(data, root.leftChildren);
    } else if (data > root.data) {
      root.rightChildren = this.insert(data, root.rightChildren);
    }
    return root;
  }

  // eslint-disable-next-line default-param-last
  delete(data) {
    let root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.root;
    if (root === null) {
      return root;
    }
    if (root.data > data) {
      root.leftChildren = this.delete(data, root.leftChildren);
    } else if (root.data < data) {
      root.rightChildren = this.delete(data, root.rightChildren);
      return root;
    }

    // if one of the children is empty
    if (root.leftChildren === null) {
      const temp = root.rightChildren;
      return temp;
    }
    if (root.rightChildren === null) {
      const temp = root.leftChildren;
      return temp;
    }
    let successorParent = root;
    let successor = root.rightChildren;
    while (successor.leftChildren !== null) {
      successorParent = successor;
      successor = successor.leftChildren;
    }

    // delete successor since it's always left child of it's parent
    // we can safely make successor's right, right children as left
    // of it's parent.
    // If there are no successor, then assign successor right to
    // successorParent right
    if (successorParent !== root) {
      successorParent.leftChildren = successor.rightChildren;
    } else {
      successorParent.rightChildren = successor.rightChildren;
    }
    // copy successor data to the root
    root.data = successor.data;
    return root;
  }
  find(data) {
    let root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.root;
    if (data < root.data) {
      const findNode = this.find(data, root.leftChildren);
      return findNode;
    }
    if (data > root.data) {
      const findNode = this.find(data, root.rightChildren);
      return findNode;
    }
    if (data === root.data) {
      return root;
    }
  }
  levelOrder() {
    let root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.root;
    const traverseNodes = [];
    if (root === null) {
      return null;
    }
    const newArray = [...this.array];
    newArray.push(root);
    while (newArray.length !== 0) {
      const breadthFirstSearch = newArray[0];
      if (breadthFirstSearch.leftChildren !== null) {
        newArray.push(breadthFirstSearch.leftChildren);
      }
      if (breadthFirstSearch.rightChildren !== null) {
        newArray.push(breadthFirstSearch.rightChildren);
      }
      newArray.shift(breadthFirstSearch);
      traverseNodes.push(breadthFirstSearch.data);
    }
    return traverseNodes;
  }
  inOrder() {
    let root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.root;
    let newArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.array;
    if (root === null) {
      return null;
    }
    root.leftChildren = this.inOrder(root.leftChildren);

    // console.log(root);

    newArray.push(root.data);
    root.rightChildren = this.inOrder(root.rightChildren);
    return newArray;
  }
  preOrder() {
    let root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.root;
    let newArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.array;
    if (root === null) {
      return null;
    }

    // console.log(root);

    newArray.push(root.data);
    root.leftChildren = this.preOrder(root.leftChildren);
    root.rightChildren = this.preOrder(root.rightChildren);
    return newArray;
  }
  postOrder() {
    let root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.root;
    let newArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.array;
    if (root === null) {
      return null;
    }
    root.leftChildren = this.postOrder(root.leftChildren);
    root.rightChildren = this.postOrder(root.rightChildren);

    // console.log(root);

    newArray.push(root.data);
    return newArray;
  }
  height() {
    let root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.root;
    let edge = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (root === null) {
      return edge;
    }
    const countLeftEdges = this.height(root.leftChildren, edge + 1);
    const countRightEdges = this.height(root.rightChildren, edge + 1);
    if (countLeftEdges > countRightEdges) {
      return countLeftEdges;
    }
    if (countRightEdges > countLeftEdges) {
      return countRightEdges;
    }
    if (countLeftEdges === countRightEdges) {
      return countLeftEdges;
    }
    if (countRightEdges === countLeftEdges) {
      return countRightEdges;
    }
  }
  depth() {
    let findNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.root;
    let edges = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    let compareNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.root;
    if (findNode.data === compareNode.data) {
      return edges;
    }
    if (findNode.data < compareNode.data) {
      return this.depth(findNode, edges + 1, compareNode.leftChildren);
    }
    if (findNode.data > compareNode.data) {
      return this.depth(findNode, edges + 1, compareNode.rightChildren);
    }
  }
  isBalanced() {
    let root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.root;
    if (root === null) {
      return 0;
    }
    const leftSubtreeHeight = this.height(root.leftChildren);
    const rightSubtreeHeight = this.height(root.rightChildren);
    const leftTreeHeight = leftSubtreeHeight - rightSubtreeHeight;
    const rightTreeHeight = rightSubtreeHeight - leftSubtreeHeight;
    if (leftTreeHeight <= 0 && leftTreeHeight >= 0 || rightTreeHeight <= 1 && rightTreeHeight >= 0) {
      return true;
    }
    return false;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tree);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background-color: lightblue;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,2BAA2B;AAC7B","sourcesContent":["body {\n  background-color: lightblue;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tree */ "./src/Tree.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");


const balancedTree = new _Tree__WEBPACK_IMPORTED_MODULE_0__["default"]();
console.log(balancedTree.buildTree([0, 6, 1, 2, 5, 3, 7, 8, 9, 6], 0, 8));
balancedTree.prettyPrint();
console.log(balancedTree.insert(4));
balancedTree.prettyPrint();
console.log(balancedTree.insert(10));
console.log(balancedTree.insert(20));
console.log(balancedTree.insert(30));
balancedTree.prettyPrint();

// console.log(balancedTree.delete(1));

balancedTree.prettyPrint();

// console.log(balancedTree.find(8));

// console.log(balancedTree.levelOrder());

// console.log(balancedTree.inOrder());

// console.log(balancedTree.preOrder());

// console.log(balancedTree.postOrder());

// console.log(balancedTree.height(balancedTree.find(6)));

// console.log(balancedTree.depth());

console.log(balancedTree.isBalanced());
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFZLENBQUMxQixNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFcENGLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDMkIsWUFBWSxDQUFDMUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRXBDRixPQUFPLENBQUNDLEdBQUcsQ0FBQzJCLFlBQVksQ0FBQzFCLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUVwQzBCLFlBQVksQ0FBQ25DLFdBQVcsQ0FBQyxDQUFDOztBQUUxQjs7QUFFQW1DLFlBQVksQ0FBQ25DLFdBQVcsQ0FBQyxDQUFDOztBQUUxQjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQU8sT0FBTyxDQUFDQyxHQUFHLENBQUMyQixZQUFZLENBQUNMLFVBQVUsQ0FBQyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RlbXBsYXRlLXJlcG9zaXRvcnkvLi9zcmMvTm9kZS5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvc2l0b3J5Ly4vc3JjL1RyZWUuanMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwb3NpdG9yeS8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwb3NpdG9yeS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwb3NpdG9yeS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG9zaXRvcnkvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwb3NpdG9yeS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvc2l0b3J5Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvc2l0b3J5Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG9zaXRvcnkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwb3NpdG9yeS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG9zaXRvcnkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvc2l0b3J5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG9zaXRvcnkvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwb3NpdG9yeS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwb3NpdG9yeS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG9zaXRvcnkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvc2l0b3J5L3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvc2l0b3J5Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5jbGFzcyBOb2RlIHtcbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5sZWZ0Q2hpbGRyZW4gPSBudWxsO1xuICAgIHRoaXMucmlnaHRDaGlsZHJlbiA9IG51bGw7XG4gIH1cblxuICBnZXQgbGVmdENoaWxkcmVuKCkge1xuICAgIHJldHVybiB0aGlzLl9sZWZ0Q2hpbGRyZW47XG4gIH1cblxuICBzZXQgbGVmdENoaWxkcmVuKHZhbHVlKSB7XG4gICAgdGhpcy5fbGVmdENoaWxkcmVuID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcmlnaHRDaGlsZHJlbigpIHtcbiAgICByZXR1cm4gdGhpcy5fcmlnaHRDaGlsZHJlbjtcbiAgfVxuXG4gIHNldCByaWdodENoaWxkcmVuKHZhbHVlKSB7XG4gICAgdGhpcy5fcmlnaHRDaGlsZHJlbiA9IHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5vZGU7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cbmltcG9ydCBOb2RlIGZyb20gXCIuL05vZGVcIjtcblxuY2xhc3MgVHJlZSB7XG4gIGFycmF5ID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yb290ID0gbnVsbDtcbiAgfVxuXG4gIGdldCByb290KCkge1xuICAgIHJldHVybiB0aGlzLl9yb290O1xuICB9XG5cbiAgc2V0IHJvb3QodmFsdWUpIHtcbiAgICB0aGlzLl9yb290ID0gdmFsdWU7XG4gIH1cblxuICBidWlsZFRyZWUoYXJyYXksIHN0YXJ0LCBlbmQpIHtcbiAgICBjb25zdCBuZXdBcnJheSA9IFtdO1xuXG4gICAgYXJyYXkuc29ydCgoc21hbGxlclZhbHVlLCBiaWdnZXJWYWx1ZSkgPT4gc21hbGxlclZhbHVlIC0gYmlnZ2VyVmFsdWUpO1xuICAgIGFycmF5LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGlmICghbmV3QXJyYXkuaW5jbHVkZXMoZWxlbWVudCkpIHtcbiAgICAgICAgbmV3QXJyYXkucHVzaChlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChzdGFydCA+IGVuZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IG1pZGRsZSA9IE1hdGguZmxvb3IocGFyc2VJbnQoc3RhcnQgKyBlbmQpIC8gMik7XG5cbiAgICBjb25zdCBub2RlID0gbmV3IE5vZGUobmV3QXJyYXlbbWlkZGxlXSk7XG5cbiAgICBub2RlLmxlZnRDaGlsZHJlbiA9IHRoaXMuYnVpbGRUcmVlKGFycmF5LCBzdGFydCwgbWlkZGxlIC0gMSk7XG5cbiAgICBub2RlLnJpZ2h0Q2hpbGRyZW4gPSB0aGlzLmJ1aWxkVHJlZShhcnJheSwgbWlkZGxlICsgMSwgZW5kKTtcblxuICAgIHRoaXMucm9vdCA9IG5vZGU7XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHByZXR0eVByaW50ID0gKG5vZGUgPSB0aGlzLnJvb3QsIHByZWZpeCA9IFwiXCIsIGlzTGVmdCA9IHRydWUpID0+IHtcbiAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAobm9kZS5yaWdodENoaWxkcmVuICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnByZXR0eVByaW50KFxuICAgICAgICBub2RlLnJpZ2h0Q2hpbGRyZW4sXG4gICAgICAgIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSCICAgXCIgOiBcIiAgICBcIn1gLFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilJTilIDilIAgXCIgOiBcIuKUjOKUgOKUgCBcIn0ke25vZGUuZGF0YX1gKTtcbiAgICBpZiAobm9kZS5sZWZ0Q2hpbGRyZW4gIT09IG51bGwpIHtcbiAgICAgIHRoaXMucHJldHR5UHJpbnQoXG4gICAgICAgIG5vZGUubGVmdENoaWxkcmVuLFxuICAgICAgICBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIiAgICBcIiA6IFwi4pSCICAgXCJ9YCxcbiAgICAgICAgdHJ1ZVxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gRG9uJ3QgdXNlIHRoZSBvcmlnaW5hbCBhcnJheSB0aGF0IHdhcyB1c2VkIHRvIGJ1aWxkIHRyZWVcbiAgLy8gZm9yIGluc2VydCBhbmQgZGVsZXRlIGZ1bmN0aW9uIHBhcmFtZXRlclxuICAvLyBmb3IgdGhpcyBtZXRob2QgaXQgc2hvdWxkIHRyYXZlcnNlIHRoZSB0cmVlIGFuZCBtYW5pcHVsYXRlXG4gIC8vIHRoZWlyIGNvbm5lY3Rpb25cblxuICBpbnNlcnQoZGF0YSwgcm9vdCA9IHRoaXMucm9vdCkge1xuICAgIGlmIChyb290ID09PSBudWxsKSB7XG4gICAgICByb290ID0gbmV3IE5vZGUoZGF0YSk7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEgPCByb290LmRhdGEpIHtcbiAgICAgIHJvb3QubGVmdENoaWxkcmVuID0gdGhpcy5pbnNlcnQoZGF0YSwgcm9vdC5sZWZ0Q2hpbGRyZW4pO1xuICAgIH0gZWxzZSBpZiAoZGF0YSA+IHJvb3QuZGF0YSkge1xuICAgICAgcm9vdC5yaWdodENoaWxkcmVuID0gdGhpcy5pbnNlcnQoZGF0YSwgcm9vdC5yaWdodENoaWxkcmVuKTtcbiAgICB9XG4gICAgcmV0dXJuIHJvb3Q7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVmYXVsdC1wYXJhbS1sYXN0XG4gIGRlbGV0ZShkYXRhLCByb290ID0gdGhpcy5yb290KSB7XG4gICAgaWYgKHJvb3QgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiByb290O1xuICAgIH1cblxuICAgIGlmIChyb290LmRhdGEgPiBkYXRhKSB7XG4gICAgICByb290LmxlZnRDaGlsZHJlbiA9IHRoaXMuZGVsZXRlKGRhdGEsIHJvb3QubGVmdENoaWxkcmVuKTtcbiAgICB9IGVsc2UgaWYgKHJvb3QuZGF0YSA8IGRhdGEpIHtcbiAgICAgIHJvb3QucmlnaHRDaGlsZHJlbiA9IHRoaXMuZGVsZXRlKGRhdGEsIHJvb3QucmlnaHRDaGlsZHJlbik7XG4gICAgICByZXR1cm4gcm9vdDtcbiAgICB9XG5cbiAgICAvLyBpZiBvbmUgb2YgdGhlIGNoaWxkcmVuIGlzIGVtcHR5XG4gICAgaWYgKHJvb3QubGVmdENoaWxkcmVuID09PSBudWxsKSB7XG4gICAgICBjb25zdCB0ZW1wID0gcm9vdC5yaWdodENoaWxkcmVuO1xuICAgICAgcmV0dXJuIHRlbXA7XG4gICAgfVxuICAgIGlmIChyb290LnJpZ2h0Q2hpbGRyZW4gPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHRlbXAgPSByb290LmxlZnRDaGlsZHJlbjtcbiAgICAgIHJldHVybiB0ZW1wO1xuICAgIH1cblxuICAgIGxldCBzdWNjZXNzb3JQYXJlbnQgPSByb290O1xuICAgIGxldCBzdWNjZXNzb3IgPSByb290LnJpZ2h0Q2hpbGRyZW47XG4gICAgd2hpbGUgKHN1Y2Nlc3Nvci5sZWZ0Q2hpbGRyZW4gIT09IG51bGwpIHtcbiAgICAgIHN1Y2Nlc3NvclBhcmVudCA9IHN1Y2Nlc3NvcjtcbiAgICAgIHN1Y2Nlc3NvciA9IHN1Y2Nlc3Nvci5sZWZ0Q2hpbGRyZW47XG4gICAgfVxuXG4gICAgLy8gZGVsZXRlIHN1Y2Nlc3NvciBzaW5jZSBpdCdzIGFsd2F5cyBsZWZ0IGNoaWxkIG9mIGl0J3MgcGFyZW50XG4gICAgLy8gd2UgY2FuIHNhZmVseSBtYWtlIHN1Y2Nlc3NvcidzIHJpZ2h0LCByaWdodCBjaGlsZHJlbiBhcyBsZWZ0XG4gICAgLy8gb2YgaXQncyBwYXJlbnQuXG4gICAgLy8gSWYgdGhlcmUgYXJlIG5vIHN1Y2Nlc3NvciwgdGhlbiBhc3NpZ24gc3VjY2Vzc29yIHJpZ2h0IHRvXG4gICAgLy8gc3VjY2Vzc29yUGFyZW50IHJpZ2h0XG4gICAgaWYgKHN1Y2Nlc3NvclBhcmVudCAhPT0gcm9vdCkge1xuICAgICAgc3VjY2Vzc29yUGFyZW50LmxlZnRDaGlsZHJlbiA9IHN1Y2Nlc3Nvci5yaWdodENoaWxkcmVuO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdWNjZXNzb3JQYXJlbnQucmlnaHRDaGlsZHJlbiA9IHN1Y2Nlc3Nvci5yaWdodENoaWxkcmVuO1xuICAgIH1cbiAgICAvLyBjb3B5IHN1Y2Nlc3NvciBkYXRhIHRvIHRoZSByb290XG4gICAgcm9vdC5kYXRhID0gc3VjY2Vzc29yLmRhdGE7XG4gICAgcmV0dXJuIHJvb3Q7XG4gIH1cblxuICBmaW5kKGRhdGEsIHJvb3QgPSB0aGlzLnJvb3QpIHtcbiAgICBpZiAoZGF0YSA8IHJvb3QuZGF0YSkge1xuICAgICAgY29uc3QgZmluZE5vZGUgPSB0aGlzLmZpbmQoZGF0YSwgcm9vdC5sZWZ0Q2hpbGRyZW4pO1xuICAgICAgcmV0dXJuIGZpbmROb2RlO1xuICAgIH1cbiAgICBpZiAoZGF0YSA+IHJvb3QuZGF0YSkge1xuICAgICAgY29uc3QgZmluZE5vZGUgPSB0aGlzLmZpbmQoZGF0YSwgcm9vdC5yaWdodENoaWxkcmVuKTtcbiAgICAgIHJldHVybiBmaW5kTm9kZTtcbiAgICB9XG4gICAgaWYgKGRhdGEgPT09IHJvb3QuZGF0YSkge1xuICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfVxuICB9XG5cbiAgbGV2ZWxPcmRlcihyb290ID0gdGhpcy5yb290KSB7XG4gICAgY29uc3QgdHJhdmVyc2VOb2RlcyA9IFtdO1xuXG4gICAgaWYgKHJvb3QgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld0FycmF5ID0gWy4uLnRoaXMuYXJyYXldO1xuXG4gICAgbmV3QXJyYXkucHVzaChyb290KTtcblxuICAgIHdoaWxlIChuZXdBcnJheS5sZW5ndGggIT09IDApIHtcbiAgICAgIGNvbnN0IGJyZWFkdGhGaXJzdFNlYXJjaCA9IG5ld0FycmF5WzBdO1xuXG4gICAgICBpZiAoYnJlYWR0aEZpcnN0U2VhcmNoLmxlZnRDaGlsZHJlbiAhPT0gbnVsbCkge1xuICAgICAgICBuZXdBcnJheS5wdXNoKGJyZWFkdGhGaXJzdFNlYXJjaC5sZWZ0Q2hpbGRyZW4pO1xuICAgICAgfVxuICAgICAgaWYgKGJyZWFkdGhGaXJzdFNlYXJjaC5yaWdodENoaWxkcmVuICE9PSBudWxsKSB7XG4gICAgICAgIG5ld0FycmF5LnB1c2goYnJlYWR0aEZpcnN0U2VhcmNoLnJpZ2h0Q2hpbGRyZW4pO1xuICAgICAgfVxuXG4gICAgICBuZXdBcnJheS5zaGlmdChicmVhZHRoRmlyc3RTZWFyY2gpO1xuICAgICAgdHJhdmVyc2VOb2Rlcy5wdXNoKGJyZWFkdGhGaXJzdFNlYXJjaC5kYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJhdmVyc2VOb2RlcztcbiAgfVxuXG4gIGluT3JkZXIocm9vdCA9IHRoaXMucm9vdCwgbmV3QXJyYXkgPSB0aGlzLmFycmF5KSB7XG4gICAgaWYgKHJvb3QgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJvb3QubGVmdENoaWxkcmVuID0gdGhpcy5pbk9yZGVyKHJvb3QubGVmdENoaWxkcmVuKTtcblxuICAgIC8vIGNvbnNvbGUubG9nKHJvb3QpO1xuXG4gICAgbmV3QXJyYXkucHVzaChyb290LmRhdGEpO1xuXG4gICAgcm9vdC5yaWdodENoaWxkcmVuID0gdGhpcy5pbk9yZGVyKHJvb3QucmlnaHRDaGlsZHJlbik7XG5cbiAgICByZXR1cm4gbmV3QXJyYXk7XG4gIH1cblxuICBwcmVPcmRlcihyb290ID0gdGhpcy5yb290LCBuZXdBcnJheSA9IHRoaXMuYXJyYXkpIHtcbiAgICBpZiAocm9vdCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gY29uc29sZS5sb2cocm9vdCk7XG5cbiAgICBuZXdBcnJheS5wdXNoKHJvb3QuZGF0YSk7XG5cbiAgICByb290LmxlZnRDaGlsZHJlbiA9IHRoaXMucHJlT3JkZXIocm9vdC5sZWZ0Q2hpbGRyZW4pO1xuXG4gICAgcm9vdC5yaWdodENoaWxkcmVuID0gdGhpcy5wcmVPcmRlcihyb290LnJpZ2h0Q2hpbGRyZW4pO1xuXG4gICAgcmV0dXJuIG5ld0FycmF5O1xuICB9XG5cbiAgcG9zdE9yZGVyKHJvb3QgPSB0aGlzLnJvb3QsIG5ld0FycmF5ID0gdGhpcy5hcnJheSkge1xuICAgIGlmIChyb290ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByb290LmxlZnRDaGlsZHJlbiA9IHRoaXMucG9zdE9yZGVyKHJvb3QubGVmdENoaWxkcmVuKTtcblxuICAgIHJvb3QucmlnaHRDaGlsZHJlbiA9IHRoaXMucG9zdE9yZGVyKHJvb3QucmlnaHRDaGlsZHJlbik7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhyb290KTtcblxuICAgIG5ld0FycmF5LnB1c2gocm9vdC5kYXRhKTtcblxuICAgIHJldHVybiBuZXdBcnJheTtcbiAgfVxuXG4gIGhlaWdodChyb290ID0gdGhpcy5yb290LCBlZGdlID0gMCkge1xuICAgIGlmIChyb290ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gZWRnZTtcbiAgICB9XG5cbiAgICBjb25zdCBjb3VudExlZnRFZGdlcyA9IHRoaXMuaGVpZ2h0KHJvb3QubGVmdENoaWxkcmVuLCBlZGdlICsgMSk7XG4gICAgY29uc3QgY291bnRSaWdodEVkZ2VzID0gdGhpcy5oZWlnaHQocm9vdC5yaWdodENoaWxkcmVuLCBlZGdlICsgMSk7XG5cbiAgICBpZiAoY291bnRMZWZ0RWRnZXMgPiBjb3VudFJpZ2h0RWRnZXMpIHtcbiAgICAgIHJldHVybiBjb3VudExlZnRFZGdlcztcbiAgICB9XG4gICAgaWYgKGNvdW50UmlnaHRFZGdlcyA+IGNvdW50TGVmdEVkZ2VzKSB7XG4gICAgICByZXR1cm4gY291bnRSaWdodEVkZ2VzO1xuICAgIH1cbiAgICBpZiAoY291bnRMZWZ0RWRnZXMgPT09IGNvdW50UmlnaHRFZGdlcykge1xuICAgICAgcmV0dXJuIGNvdW50TGVmdEVkZ2VzO1xuICAgIH1cbiAgICBpZiAoY291bnRSaWdodEVkZ2VzID09PSBjb3VudExlZnRFZGdlcykge1xuICAgICAgcmV0dXJuIGNvdW50UmlnaHRFZGdlcztcbiAgICB9XG4gIH1cblxuICBkZXB0aChmaW5kTm9kZSA9IHRoaXMucm9vdCwgZWRnZXMgPSAwLCBjb21wYXJlTm9kZSA9IHRoaXMucm9vdCkge1xuICAgIGlmIChmaW5kTm9kZS5kYXRhID09PSBjb21wYXJlTm9kZS5kYXRhKSB7XG4gICAgICByZXR1cm4gZWRnZXM7XG4gICAgfVxuXG4gICAgaWYgKGZpbmROb2RlLmRhdGEgPCBjb21wYXJlTm9kZS5kYXRhKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZXB0aChmaW5kTm9kZSwgZWRnZXMgKyAxLCBjb21wYXJlTm9kZS5sZWZ0Q2hpbGRyZW4pO1xuICAgIH1cblxuICAgIGlmIChmaW5kTm9kZS5kYXRhID4gY29tcGFyZU5vZGUuZGF0YSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVwdGgoZmluZE5vZGUsIGVkZ2VzICsgMSwgY29tcGFyZU5vZGUucmlnaHRDaGlsZHJlbik7XG4gICAgfVxuICB9XG5cbiAgaXNCYWxhbmNlZChyb290ID0gdGhpcy5yb290KSB7XG4gICAgaWYgKHJvb3QgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGNvbnN0IGxlZnRTdWJ0cmVlSGVpZ2h0ID0gdGhpcy5oZWlnaHQocm9vdC5sZWZ0Q2hpbGRyZW4pO1xuICAgIGNvbnN0IHJpZ2h0U3VidHJlZUhlaWdodCA9IHRoaXMuaGVpZ2h0KHJvb3QucmlnaHRDaGlsZHJlbik7XG5cbiAgICBjb25zdCBsZWZ0VHJlZUhlaWdodCA9IGxlZnRTdWJ0cmVlSGVpZ2h0IC0gcmlnaHRTdWJ0cmVlSGVpZ2h0O1xuXG4gICAgY29uc3QgcmlnaHRUcmVlSGVpZ2h0ID0gcmlnaHRTdWJ0cmVlSGVpZ2h0IC0gbGVmdFN1YnRyZWVIZWlnaHQ7XG5cbiAgICBpZiAoXG4gICAgICAobGVmdFRyZWVIZWlnaHQgPD0gMCAmJiBsZWZ0VHJlZUhlaWdodCA+PSAwKSB8fFxuICAgICAgKHJpZ2h0VHJlZUhlaWdodCA8PSAxICYmIHJpZ2h0VHJlZUhlaWdodCA+PSAwKVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmVlO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLDJCQUEyQjtBQUM3QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBUcmVlIGZyb20gXCIuL1RyZWVcIjtcbmltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5cbmNvbnN0IGJhbGFuY2VkVHJlZSA9IG5ldyBUcmVlKCk7XG5cbmNvbnNvbGUubG9nKGJhbGFuY2VkVHJlZS5idWlsZFRyZWUoWzAsIDYsIDEsIDIsIDUsIDMsIDcsIDgsIDksIDZdLCAwLCA4KSk7XG5cbmJhbGFuY2VkVHJlZS5wcmV0dHlQcmludCgpO1xuXG5jb25zb2xlLmxvZyhiYWxhbmNlZFRyZWUuaW5zZXJ0KDQpKTtcblxuYmFsYW5jZWRUcmVlLnByZXR0eVByaW50KCk7XG5cbmNvbnNvbGUubG9nKGJhbGFuY2VkVHJlZS5pbnNlcnQoMTApKTtcblxuY29uc29sZS5sb2coYmFsYW5jZWRUcmVlLmluc2VydCgyMCkpO1xuXG5jb25zb2xlLmxvZyhiYWxhbmNlZFRyZWUuaW5zZXJ0KDMwKSk7XG5cbmJhbGFuY2VkVHJlZS5wcmV0dHlQcmludCgpO1xuXG4vLyBjb25zb2xlLmxvZyhiYWxhbmNlZFRyZWUuZGVsZXRlKDEpKTtcblxuYmFsYW5jZWRUcmVlLnByZXR0eVByaW50KCk7XG5cbi8vIGNvbnNvbGUubG9nKGJhbGFuY2VkVHJlZS5maW5kKDgpKTtcblxuLy8gY29uc29sZS5sb2coYmFsYW5jZWRUcmVlLmxldmVsT3JkZXIoKSk7XG5cbi8vIGNvbnNvbGUubG9nKGJhbGFuY2VkVHJlZS5pbk9yZGVyKCkpO1xuXG4vLyBjb25zb2xlLmxvZyhiYWxhbmNlZFRyZWUucHJlT3JkZXIoKSk7XG5cbi8vIGNvbnNvbGUubG9nKGJhbGFuY2VkVHJlZS5wb3N0T3JkZXIoKSk7XG5cbi8vIGNvbnNvbGUubG9nKGJhbGFuY2VkVHJlZS5oZWlnaHQoYmFsYW5jZWRUcmVlLmZpbmQoNikpKTtcblxuLy8gY29uc29sZS5sb2coYmFsYW5jZWRUcmVlLmRlcHRoKCkpO1xuXG5jb25zb2xlLmxvZyhiYWxhbmNlZFRyZWUuaXNCYWxhbmNlZCgpKTtcbiJdLCJuYW1lcyI6WyJOb2RlIiwiY29uc3RydWN0b3IiLCJkYXRhIiwibGVmdENoaWxkcmVuIiwicmlnaHRDaGlsZHJlbiIsIl9sZWZ0Q2hpbGRyZW4iLCJ2YWx1ZSIsIl9yaWdodENoaWxkcmVuIiwiVHJlZSIsImFycmF5Iiwicm9vdCIsIl9yb290IiwiYnVpbGRUcmVlIiwic3RhcnQiLCJlbmQiLCJuZXdBcnJheSIsInNvcnQiLCJzbWFsbGVyVmFsdWUiLCJiaWdnZXJWYWx1ZSIsImZvckVhY2giLCJlbGVtZW50IiwiaW5jbHVkZXMiLCJwdXNoIiwibWlkZGxlIiwiTWF0aCIsImZsb29yIiwicGFyc2VJbnQiLCJub2RlIiwicHJldHR5UHJpbnQiLCJfdGhpcyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsInByZWZpeCIsImlzTGVmdCIsImNvbnNvbGUiLCJsb2ciLCJpbnNlcnQiLCJkZWxldGUiLCJ0ZW1wIiwic3VjY2Vzc29yUGFyZW50Iiwic3VjY2Vzc29yIiwiZmluZCIsImZpbmROb2RlIiwibGV2ZWxPcmRlciIsInRyYXZlcnNlTm9kZXMiLCJicmVhZHRoRmlyc3RTZWFyY2giLCJzaGlmdCIsImluT3JkZXIiLCJwcmVPcmRlciIsInBvc3RPcmRlciIsImhlaWdodCIsImVkZ2UiLCJjb3VudExlZnRFZGdlcyIsImNvdW50UmlnaHRFZGdlcyIsImRlcHRoIiwiZWRnZXMiLCJjb21wYXJlTm9kZSIsImlzQmFsYW5jZWQiLCJsZWZ0U3VidHJlZUhlaWdodCIsInJpZ2h0U3VidHJlZUhlaWdodCIsImxlZnRUcmVlSGVpZ2h0IiwicmlnaHRUcmVlSGVpZ2h0IiwiYmFsYW5jZWRUcmVlIl0sInNvdXJjZVJvb3QiOiIifQ==