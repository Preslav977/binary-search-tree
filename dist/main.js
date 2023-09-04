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
  reBalance(start, end) {
    const isTreeBalanced = this.isBalanced(this.root);
    if (isTreeBalanced === false) {
      const newArray = this.levelOrder();
      console.log(newArray);
      return this.buildTree(newArray, start = 0, end = newArray.length - 1);
    }
  }
  createRandomNumbers(start, end) {
    const newArray = [];
    const firstNumber = Math.floor(Math.random() * 100);
    const secondNumber = Math.floor(Math.random() * 100);
    const thirdNumber = Math.floor(Math.random() * 100);
    const fourthNumber = Math.floor(Math.random() * 100);
    const fifthNumber = Math.floor(Math.random() * 100);
    newArray.push(firstNumber);
    newArray.push(secondNumber);
    newArray.push(thirdNumber);
    newArray.push(fourthNumber);
    newArray.push(fifthNumber);
    return this.buildTree(newArray, start = 0, end = newArray.length - 1);
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
console.log(balancedTree.createRandomNumbers(0, 4));
balancedTree.prettyPrint();
console.log(balancedTree.isBalanced());

// console.log(balancedTree.levelOrder());

// console.log(balancedTree.inOrder());

// console.log(balancedTree.preOrder());

// console.log(balancedTree.postOrder());

console.log(balancedTree.insert(102));
console.log(balancedTree.insert(110));
console.log(balancedTree.insert(120));
balancedTree.prettyPrint();
console.log(balancedTree.isBalanced());
console.log(balancedTree.reBalance(0, 12));
balancedTree.prettyPrint();
console.log(balancedTree.isBalanced());

// console.log(balancedTree.levelOrder());

// console.log(balancedTree.inOrder());

// console.log(balancedTree.preOrder());

// console.log(balancedTree.postOrder());

console.log(balancedTree.insert(20));
balancedTree.prettyPrint();

// console.log(balancedTree.delete(20));

// balancedTree.prettyPrint();

console.log(balancedTree.find(20));
console.log(balancedTree.height(balancedTree.find(20)));

// console.log(balancedTree.depth(new Node(20)));
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dkQsaUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvc2l0b3J5Ly4vc3JjL05vZGUuanMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwb3NpdG9yeS8uL3NyYy9UcmVlLmpzIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG9zaXRvcnkvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG9zaXRvcnkvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG9zaXRvcnkvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvc2l0b3J5Ly4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG9zaXRvcnkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwb3NpdG9yeS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwb3NpdG9yeS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvc2l0b3J5Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG9zaXRvcnkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvc2l0b3J5Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwb3NpdG9yeS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvc2l0b3J5L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RlbXBsYXRlLXJlcG9zaXRvcnkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG9zaXRvcnkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvc2l0b3J5L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwb3NpdG9yeS93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwb3NpdG9yeS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuY2xhc3MgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMubGVmdENoaWxkcmVuID0gbnVsbDtcbiAgICB0aGlzLnJpZ2h0Q2hpbGRyZW4gPSBudWxsO1xuICB9XG5cbiAgZ2V0IGxlZnRDaGlsZHJlbigpIHtcbiAgICByZXR1cm4gdGhpcy5fbGVmdENoaWxkcmVuO1xuICB9XG5cbiAgc2V0IGxlZnRDaGlsZHJlbih2YWx1ZSkge1xuICAgIHRoaXMuX2xlZnRDaGlsZHJlbiA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHJpZ2h0Q2hpbGRyZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JpZ2h0Q2hpbGRyZW47XG4gIH1cblxuICBzZXQgcmlnaHRDaGlsZHJlbih2YWx1ZSkge1xuICAgIHRoaXMuX3JpZ2h0Q2hpbGRyZW4gPSB2YWx1ZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOb2RlO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5pbXBvcnQgTm9kZSBmcm9tIFwiLi9Ob2RlXCI7XG5cbmNsYXNzIFRyZWUge1xuICBhcnJheSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucm9vdCA9IG51bGw7XG4gIH1cblxuICBnZXQgcm9vdCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcm9vdDtcbiAgfVxuXG4gIHNldCByb290KHZhbHVlKSB7XG4gICAgdGhpcy5fcm9vdCA9IHZhbHVlO1xuICB9XG5cbiAgYnVpbGRUcmVlKGFycmF5LCBzdGFydCwgZW5kKSB7XG4gICAgY29uc3QgbmV3QXJyYXkgPSBbXTtcblxuICAgIGFycmF5LnNvcnQoKHNtYWxsZXJWYWx1ZSwgYmlnZ2VyVmFsdWUpID0+IHNtYWxsZXJWYWx1ZSAtIGJpZ2dlclZhbHVlKTtcbiAgICBhcnJheS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBpZiAoIW5ld0FycmF5LmluY2x1ZGVzKGVsZW1lbnQpKSB7XG4gICAgICAgIG5ld0FycmF5LnB1c2goZWxlbWVudCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoc3RhcnQgPiBlbmQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBtaWRkbGUgPSBNYXRoLmZsb29yKHBhcnNlSW50KHN0YXJ0ICsgZW5kKSAvIDIpO1xuXG4gICAgY29uc3Qgbm9kZSA9IG5ldyBOb2RlKG5ld0FycmF5W21pZGRsZV0pO1xuXG4gICAgbm9kZS5sZWZ0Q2hpbGRyZW4gPSB0aGlzLmJ1aWxkVHJlZShhcnJheSwgc3RhcnQsIG1pZGRsZSAtIDEpO1xuXG4gICAgbm9kZS5yaWdodENoaWxkcmVuID0gdGhpcy5idWlsZFRyZWUoYXJyYXksIG1pZGRsZSArIDEsIGVuZCk7XG5cbiAgICB0aGlzLnJvb3QgPSBub2RlO1xuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBwcmV0dHlQcmludCA9IChub2RlID0gdGhpcy5yb290LCBwcmVmaXggPSBcIlwiLCBpc0xlZnQgPSB0cnVlKSA9PiB7XG4gICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG5vZGUucmlnaHRDaGlsZHJlbiAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5wcmV0dHlQcmludChcbiAgICAgICAgbm9kZS5yaWdodENoaWxkcmVuLFxuICAgICAgICBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIuKUgiAgIFwiIDogXCIgICAgXCJ9YCxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSU4pSA4pSAIFwiIDogXCLilIzilIDilIAgXCJ9JHtub2RlLmRhdGF9YCk7XG4gICAgaWYgKG5vZGUubGVmdENoaWxkcmVuICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnByZXR0eVByaW50KFxuICAgICAgICBub2RlLmxlZnRDaGlsZHJlbixcbiAgICAgICAgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCIgICAgXCIgOiBcIuKUgiAgIFwifWAsXG4gICAgICAgIHRydWVcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIC8vIERvbid0IHVzZSB0aGUgb3JpZ2luYWwgYXJyYXkgdGhhdCB3YXMgdXNlZCB0byBidWlsZCB0cmVlXG4gIC8vIGZvciBpbnNlcnQgYW5kIGRlbGV0ZSBmdW5jdGlvbiBwYXJhbWV0ZXJcbiAgLy8gZm9yIHRoaXMgbWV0aG9kIGl0IHNob3VsZCB0cmF2ZXJzZSB0aGUgdHJlZSBhbmQgbWFuaXB1bGF0ZVxuICAvLyB0aGVpciBjb25uZWN0aW9uXG5cbiAgaW5zZXJ0KGRhdGEsIHJvb3QgPSB0aGlzLnJvb3QpIHtcbiAgICBpZiAocm9vdCA9PT0gbnVsbCkge1xuICAgICAgcm9vdCA9IG5ldyBOb2RlKGRhdGEpO1xuICAgIH1cblxuICAgIGlmIChkYXRhIDwgcm9vdC5kYXRhKSB7XG4gICAgICByb290LmxlZnRDaGlsZHJlbiA9IHRoaXMuaW5zZXJ0KGRhdGEsIHJvb3QubGVmdENoaWxkcmVuKTtcbiAgICB9IGVsc2UgaWYgKGRhdGEgPiByb290LmRhdGEpIHtcbiAgICAgIHJvb3QucmlnaHRDaGlsZHJlbiA9IHRoaXMuaW5zZXJ0KGRhdGEsIHJvb3QucmlnaHRDaGlsZHJlbik7XG4gICAgfVxuICAgIHJldHVybiByb290O1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlZmF1bHQtcGFyYW0tbGFzdFxuICBkZWxldGUoZGF0YSwgcm9vdCA9IHRoaXMucm9vdCkge1xuICAgIGlmIChyb290ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gcm9vdDtcbiAgICB9XG5cbiAgICBpZiAocm9vdC5kYXRhID4gZGF0YSkge1xuICAgICAgcm9vdC5sZWZ0Q2hpbGRyZW4gPSB0aGlzLmRlbGV0ZShkYXRhLCByb290LmxlZnRDaGlsZHJlbik7XG4gICAgfSBlbHNlIGlmIChyb290LmRhdGEgPCBkYXRhKSB7XG4gICAgICByb290LnJpZ2h0Q2hpbGRyZW4gPSB0aGlzLmRlbGV0ZShkYXRhLCByb290LnJpZ2h0Q2hpbGRyZW4pO1xuICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfVxuXG4gICAgLy8gaWYgb25lIG9mIHRoZSBjaGlsZHJlbiBpcyBlbXB0eVxuICAgIGlmIChyb290LmxlZnRDaGlsZHJlbiA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgdGVtcCA9IHJvb3QucmlnaHRDaGlsZHJlbjtcbiAgICAgIHJldHVybiB0ZW1wO1xuICAgIH1cbiAgICBpZiAocm9vdC5yaWdodENoaWxkcmVuID09PSBudWxsKSB7XG4gICAgICBjb25zdCB0ZW1wID0gcm9vdC5sZWZ0Q2hpbGRyZW47XG4gICAgICByZXR1cm4gdGVtcDtcbiAgICB9XG5cbiAgICBsZXQgc3VjY2Vzc29yUGFyZW50ID0gcm9vdDtcbiAgICBsZXQgc3VjY2Vzc29yID0gcm9vdC5yaWdodENoaWxkcmVuO1xuICAgIHdoaWxlIChzdWNjZXNzb3IubGVmdENoaWxkcmVuICE9PSBudWxsKSB7XG4gICAgICBzdWNjZXNzb3JQYXJlbnQgPSBzdWNjZXNzb3I7XG4gICAgICBzdWNjZXNzb3IgPSBzdWNjZXNzb3IubGVmdENoaWxkcmVuO1xuICAgIH1cblxuICAgIC8vIGRlbGV0ZSBzdWNjZXNzb3Igc2luY2UgaXQncyBhbHdheXMgbGVmdCBjaGlsZCBvZiBpdCdzIHBhcmVudFxuICAgIC8vIHdlIGNhbiBzYWZlbHkgbWFrZSBzdWNjZXNzb3IncyByaWdodCwgcmlnaHQgY2hpbGRyZW4gYXMgbGVmdFxuICAgIC8vIG9mIGl0J3MgcGFyZW50LlxuICAgIC8vIElmIHRoZXJlIGFyZSBubyBzdWNjZXNzb3IsIHRoZW4gYXNzaWduIHN1Y2Nlc3NvciByaWdodCB0b1xuICAgIC8vIHN1Y2Nlc3NvclBhcmVudCByaWdodFxuICAgIGlmIChzdWNjZXNzb3JQYXJlbnQgIT09IHJvb3QpIHtcbiAgICAgIHN1Y2Nlc3NvclBhcmVudC5sZWZ0Q2hpbGRyZW4gPSBzdWNjZXNzb3IucmlnaHRDaGlsZHJlbjtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VjY2Vzc29yUGFyZW50LnJpZ2h0Q2hpbGRyZW4gPSBzdWNjZXNzb3IucmlnaHRDaGlsZHJlbjtcbiAgICB9XG4gICAgLy8gY29weSBzdWNjZXNzb3IgZGF0YSB0byB0aGUgcm9vdFxuICAgIHJvb3QuZGF0YSA9IHN1Y2Nlc3Nvci5kYXRhO1xuICAgIHJldHVybiByb290O1xuICB9XG5cbiAgZmluZChkYXRhLCByb290ID0gdGhpcy5yb290KSB7XG4gICAgaWYgKGRhdGEgPCByb290LmRhdGEpIHtcbiAgICAgIGNvbnN0IGZpbmROb2RlID0gdGhpcy5maW5kKGRhdGEsIHJvb3QubGVmdENoaWxkcmVuKTtcbiAgICAgIHJldHVybiBmaW5kTm9kZTtcbiAgICB9XG4gICAgaWYgKGRhdGEgPiByb290LmRhdGEpIHtcbiAgICAgIGNvbnN0IGZpbmROb2RlID0gdGhpcy5maW5kKGRhdGEsIHJvb3QucmlnaHRDaGlsZHJlbik7XG4gICAgICByZXR1cm4gZmluZE5vZGU7XG4gICAgfVxuICAgIGlmIChkYXRhID09PSByb290LmRhdGEpIHtcbiAgICAgIHJldHVybiByb290O1xuICAgIH1cbiAgfVxuXG4gIGxldmVsT3JkZXIocm9vdCA9IHRoaXMucm9vdCkge1xuICAgIGNvbnN0IHRyYXZlcnNlTm9kZXMgPSBbXTtcblxuICAgIGlmIChyb290ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdBcnJheSA9IFsuLi50aGlzLmFycmF5XTtcblxuICAgIG5ld0FycmF5LnB1c2gocm9vdCk7XG5cbiAgICB3aGlsZSAobmV3QXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgICBjb25zdCBicmVhZHRoRmlyc3RTZWFyY2ggPSBuZXdBcnJheVswXTtcblxuICAgICAgaWYgKGJyZWFkdGhGaXJzdFNlYXJjaC5sZWZ0Q2hpbGRyZW4gIT09IG51bGwpIHtcbiAgICAgICAgbmV3QXJyYXkucHVzaChicmVhZHRoRmlyc3RTZWFyY2gubGVmdENoaWxkcmVuKTtcbiAgICAgIH1cbiAgICAgIGlmIChicmVhZHRoRmlyc3RTZWFyY2gucmlnaHRDaGlsZHJlbiAhPT0gbnVsbCkge1xuICAgICAgICBuZXdBcnJheS5wdXNoKGJyZWFkdGhGaXJzdFNlYXJjaC5yaWdodENoaWxkcmVuKTtcbiAgICAgIH1cblxuICAgICAgbmV3QXJyYXkuc2hpZnQoYnJlYWR0aEZpcnN0U2VhcmNoKTtcbiAgICAgIHRyYXZlcnNlTm9kZXMucHVzaChicmVhZHRoRmlyc3RTZWFyY2guZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyYXZlcnNlTm9kZXM7XG4gIH1cblxuICBpbk9yZGVyKHJvb3QgPSB0aGlzLnJvb3QsIG5ld0FycmF5ID0gdGhpcy5hcnJheSkge1xuICAgIGlmIChyb290ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByb290LmxlZnRDaGlsZHJlbiA9IHRoaXMuaW5PcmRlcihyb290LmxlZnRDaGlsZHJlbik7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhyb290KTtcblxuICAgIG5ld0FycmF5LnB1c2gocm9vdC5kYXRhKTtcblxuICAgIHJvb3QucmlnaHRDaGlsZHJlbiA9IHRoaXMuaW5PcmRlcihyb290LnJpZ2h0Q2hpbGRyZW4pO1xuXG4gICAgcmV0dXJuIG5ld0FycmF5O1xuICB9XG5cbiAgcHJlT3JkZXIocm9vdCA9IHRoaXMucm9vdCwgbmV3QXJyYXkgPSB0aGlzLmFycmF5KSB7XG4gICAgaWYgKHJvb3QgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKHJvb3QpO1xuXG4gICAgbmV3QXJyYXkucHVzaChyb290LmRhdGEpO1xuXG4gICAgcm9vdC5sZWZ0Q2hpbGRyZW4gPSB0aGlzLnByZU9yZGVyKHJvb3QubGVmdENoaWxkcmVuKTtcblxuICAgIHJvb3QucmlnaHRDaGlsZHJlbiA9IHRoaXMucHJlT3JkZXIocm9vdC5yaWdodENoaWxkcmVuKTtcblxuICAgIHJldHVybiBuZXdBcnJheTtcbiAgfVxuXG4gIHBvc3RPcmRlcihyb290ID0gdGhpcy5yb290LCBuZXdBcnJheSA9IHRoaXMuYXJyYXkpIHtcbiAgICBpZiAocm9vdCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcm9vdC5sZWZ0Q2hpbGRyZW4gPSB0aGlzLnBvc3RPcmRlcihyb290LmxlZnRDaGlsZHJlbik7XG5cbiAgICByb290LnJpZ2h0Q2hpbGRyZW4gPSB0aGlzLnBvc3RPcmRlcihyb290LnJpZ2h0Q2hpbGRyZW4pO1xuXG4gICAgLy8gY29uc29sZS5sb2cocm9vdCk7XG5cbiAgICBuZXdBcnJheS5wdXNoKHJvb3QuZGF0YSk7XG5cbiAgICByZXR1cm4gbmV3QXJyYXk7XG4gIH1cblxuICBoZWlnaHQocm9vdCA9IHRoaXMucm9vdCwgZWRnZSA9IDApIHtcbiAgICBpZiAocm9vdCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGVkZ2U7XG4gICAgfVxuXG4gICAgY29uc3QgY291bnRMZWZ0RWRnZXMgPSB0aGlzLmhlaWdodChyb290LmxlZnRDaGlsZHJlbiwgZWRnZSArIDEpO1xuICAgIGNvbnN0IGNvdW50UmlnaHRFZGdlcyA9IHRoaXMuaGVpZ2h0KHJvb3QucmlnaHRDaGlsZHJlbiwgZWRnZSArIDEpO1xuXG4gICAgaWYgKGNvdW50TGVmdEVkZ2VzID4gY291bnRSaWdodEVkZ2VzKSB7XG4gICAgICByZXR1cm4gY291bnRMZWZ0RWRnZXM7XG4gICAgfVxuICAgIGlmIChjb3VudFJpZ2h0RWRnZXMgPiBjb3VudExlZnRFZGdlcykge1xuICAgICAgcmV0dXJuIGNvdW50UmlnaHRFZGdlcztcbiAgICB9XG4gICAgaWYgKGNvdW50TGVmdEVkZ2VzID09PSBjb3VudFJpZ2h0RWRnZXMpIHtcbiAgICAgIHJldHVybiBjb3VudExlZnRFZGdlcztcbiAgICB9XG4gICAgaWYgKGNvdW50UmlnaHRFZGdlcyA9PT0gY291bnRMZWZ0RWRnZXMpIHtcbiAgICAgIHJldHVybiBjb3VudFJpZ2h0RWRnZXM7XG4gICAgfVxuICB9XG5cbiAgZGVwdGgoZmluZE5vZGUgPSB0aGlzLnJvb3QsIGVkZ2VzID0gMCwgY29tcGFyZU5vZGUgPSB0aGlzLnJvb3QpIHtcbiAgICBpZiAoZmluZE5vZGUuZGF0YSA9PT0gY29tcGFyZU5vZGUuZGF0YSkge1xuICAgICAgcmV0dXJuIGVkZ2VzO1xuICAgIH1cblxuICAgIGlmIChmaW5kTm9kZS5kYXRhIDwgY29tcGFyZU5vZGUuZGF0YSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVwdGgoZmluZE5vZGUsIGVkZ2VzICsgMSwgY29tcGFyZU5vZGUubGVmdENoaWxkcmVuKTtcbiAgICB9XG5cbiAgICBpZiAoZmluZE5vZGUuZGF0YSA+IGNvbXBhcmVOb2RlLmRhdGEpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlcHRoKGZpbmROb2RlLCBlZGdlcyArIDEsIGNvbXBhcmVOb2RlLnJpZ2h0Q2hpbGRyZW4pO1xuICAgIH1cbiAgfVxuXG4gIGlzQmFsYW5jZWQocm9vdCA9IHRoaXMucm9vdCkge1xuICAgIGlmIChyb290ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBjb25zdCBsZWZ0U3VidHJlZUhlaWdodCA9IHRoaXMuaGVpZ2h0KHJvb3QubGVmdENoaWxkcmVuKTtcbiAgICBjb25zdCByaWdodFN1YnRyZWVIZWlnaHQgPSB0aGlzLmhlaWdodChyb290LnJpZ2h0Q2hpbGRyZW4pO1xuXG4gICAgY29uc3QgbGVmdFRyZWVIZWlnaHQgPSBsZWZ0U3VidHJlZUhlaWdodCAtIHJpZ2h0U3VidHJlZUhlaWdodDtcblxuICAgIGNvbnN0IHJpZ2h0VHJlZUhlaWdodCA9IHJpZ2h0U3VidHJlZUhlaWdodCAtIGxlZnRTdWJ0cmVlSGVpZ2h0O1xuXG4gICAgaWYgKFxuICAgICAgKGxlZnRUcmVlSGVpZ2h0IDw9IDAgJiYgbGVmdFRyZWVIZWlnaHQgPj0gMCkgfHxcbiAgICAgIChyaWdodFRyZWVIZWlnaHQgPD0gMSAmJiByaWdodFRyZWVIZWlnaHQgPj0gMClcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZUJhbGFuY2Uoc3RhcnQsIGVuZCkge1xuICAgIGNvbnN0IGlzVHJlZUJhbGFuY2VkID0gdGhpcy5pc0JhbGFuY2VkKHRoaXMucm9vdCk7XG4gICAgaWYgKGlzVHJlZUJhbGFuY2VkID09PSBmYWxzZSkge1xuICAgICAgY29uc3QgbmV3QXJyYXkgPSB0aGlzLmxldmVsT3JkZXIoKTtcbiAgICAgIGNvbnNvbGUubG9nKG5ld0FycmF5KTtcbiAgICAgIHJldHVybiB0aGlzLmJ1aWxkVHJlZShuZXdBcnJheSwgKHN0YXJ0ID0gMCksIChlbmQgPSBuZXdBcnJheS5sZW5ndGggLSAxKSk7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlUmFuZG9tTnVtYmVycyhzdGFydCwgZW5kKSB7XG4gICAgY29uc3QgbmV3QXJyYXkgPSBbXTtcblxuICAgIGNvbnN0IGZpcnN0TnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKTtcbiAgICBjb25zdCBzZWNvbmROdW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApO1xuICAgIGNvbnN0IHRoaXJkTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKTtcbiAgICBjb25zdCBmb3VydGhOdW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApO1xuICAgIGNvbnN0IGZpZnRoTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKTtcblxuICAgIG5ld0FycmF5LnB1c2goZmlyc3ROdW1iZXIpO1xuICAgIG5ld0FycmF5LnB1c2goc2Vjb25kTnVtYmVyKTtcbiAgICBuZXdBcnJheS5wdXNoKHRoaXJkTnVtYmVyKTtcbiAgICBuZXdBcnJheS5wdXNoKGZvdXJ0aE51bWJlcik7XG4gICAgbmV3QXJyYXkucHVzaChmaWZ0aE51bWJlcik7XG5cbiAgICByZXR1cm4gdGhpcy5idWlsZFRyZWUobmV3QXJyYXksIChzdGFydCA9IDApLCAoZW5kID0gbmV3QXJyYXkubGVuZ3RoIC0gMSkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyZWU7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsMkJBQTJCO0FBQzdCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFRyZWUgZnJvbSBcIi4vVHJlZVwiO1xuaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcblxuY29uc3QgYmFsYW5jZWRUcmVlID0gbmV3IFRyZWUoKTtcblxuY29uc29sZS5sb2coYmFsYW5jZWRUcmVlLmNyZWF0ZVJhbmRvbU51bWJlcnMoMCwgNCkpO1xuXG5iYWxhbmNlZFRyZWUucHJldHR5UHJpbnQoKTtcblxuY29uc29sZS5sb2coYmFsYW5jZWRUcmVlLmlzQmFsYW5jZWQoKSk7XG5cbi8vIGNvbnNvbGUubG9nKGJhbGFuY2VkVHJlZS5sZXZlbE9yZGVyKCkpO1xuXG4vLyBjb25zb2xlLmxvZyhiYWxhbmNlZFRyZWUuaW5PcmRlcigpKTtcblxuLy8gY29uc29sZS5sb2coYmFsYW5jZWRUcmVlLnByZU9yZGVyKCkpO1xuXG4vLyBjb25zb2xlLmxvZyhiYWxhbmNlZFRyZWUucG9zdE9yZGVyKCkpO1xuXG5jb25zb2xlLmxvZyhiYWxhbmNlZFRyZWUuaW5zZXJ0KDEwMikpO1xuXG5jb25zb2xlLmxvZyhiYWxhbmNlZFRyZWUuaW5zZXJ0KDExMCkpO1xuXG5jb25zb2xlLmxvZyhiYWxhbmNlZFRyZWUuaW5zZXJ0KDEyMCkpO1xuXG5iYWxhbmNlZFRyZWUucHJldHR5UHJpbnQoKTtcblxuY29uc29sZS5sb2coYmFsYW5jZWRUcmVlLmlzQmFsYW5jZWQoKSk7XG5cbmNvbnNvbGUubG9nKGJhbGFuY2VkVHJlZS5yZUJhbGFuY2UoMCwgMTIpKTtcblxuYmFsYW5jZWRUcmVlLnByZXR0eVByaW50KCk7XG5cbmNvbnNvbGUubG9nKGJhbGFuY2VkVHJlZS5pc0JhbGFuY2VkKCkpO1xuXG4vLyBjb25zb2xlLmxvZyhiYWxhbmNlZFRyZWUubGV2ZWxPcmRlcigpKTtcblxuLy8gY29uc29sZS5sb2coYmFsYW5jZWRUcmVlLmluT3JkZXIoKSk7XG5cbi8vIGNvbnNvbGUubG9nKGJhbGFuY2VkVHJlZS5wcmVPcmRlcigpKTtcblxuLy8gY29uc29sZS5sb2coYmFsYW5jZWRUcmVlLnBvc3RPcmRlcigpKTtcblxuY29uc29sZS5sb2coYmFsYW5jZWRUcmVlLmluc2VydCgyMCkpO1xuXG5iYWxhbmNlZFRyZWUucHJldHR5UHJpbnQoKTtcblxuLy8gY29uc29sZS5sb2coYmFsYW5jZWRUcmVlLmRlbGV0ZSgyMCkpO1xuXG4vLyBiYWxhbmNlZFRyZWUucHJldHR5UHJpbnQoKTtcblxuY29uc29sZS5sb2coYmFsYW5jZWRUcmVlLmZpbmQoMjApKTtcblxuY29uc29sZS5sb2coYmFsYW5jZWRUcmVlLmhlaWdodChiYWxhbmNlZFRyZWUuZmluZCgyMCkpKTtcblxuLy8gY29uc29sZS5sb2coYmFsYW5jZWRUcmVlLmRlcHRoKG5ldyBOb2RlKDIwKSkpO1xuIl0sIm5hbWVzIjpbIk5vZGUiLCJjb25zdHJ1Y3RvciIsImRhdGEiLCJsZWZ0Q2hpbGRyZW4iLCJyaWdodENoaWxkcmVuIiwiX2xlZnRDaGlsZHJlbiIsInZhbHVlIiwiX3JpZ2h0Q2hpbGRyZW4iLCJUcmVlIiwiYXJyYXkiLCJyb290IiwiX3Jvb3QiLCJidWlsZFRyZWUiLCJzdGFydCIsImVuZCIsIm5ld0FycmF5Iiwic29ydCIsInNtYWxsZXJWYWx1ZSIsImJpZ2dlclZhbHVlIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJpbmNsdWRlcyIsInB1c2giLCJtaWRkbGUiLCJNYXRoIiwiZmxvb3IiLCJwYXJzZUludCIsIm5vZGUiLCJwcmV0dHlQcmludCIsIl90aGlzIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwicHJlZml4IiwiaXNMZWZ0IiwiY29uc29sZSIsImxvZyIsImluc2VydCIsImRlbGV0ZSIsInRlbXAiLCJzdWNjZXNzb3JQYXJlbnQiLCJzdWNjZXNzb3IiLCJmaW5kIiwiZmluZE5vZGUiLCJsZXZlbE9yZGVyIiwidHJhdmVyc2VOb2RlcyIsImJyZWFkdGhGaXJzdFNlYXJjaCIsInNoaWZ0IiwiaW5PcmRlciIsInByZU9yZGVyIiwicG9zdE9yZGVyIiwiaGVpZ2h0IiwiZWRnZSIsImNvdW50TGVmdEVkZ2VzIiwiY291bnRSaWdodEVkZ2VzIiwiZGVwdGgiLCJlZGdlcyIsImNvbXBhcmVOb2RlIiwiaXNCYWxhbmNlZCIsImxlZnRTdWJ0cmVlSGVpZ2h0IiwicmlnaHRTdWJ0cmVlSGVpZ2h0IiwibGVmdFRyZWVIZWlnaHQiLCJyaWdodFRyZWVIZWlnaHQiLCJyZUJhbGFuY2UiLCJpc1RyZWVCYWxhbmNlZCIsImNyZWF0ZVJhbmRvbU51bWJlcnMiLCJmaXJzdE51bWJlciIsInJhbmRvbSIsInNlY29uZE51bWJlciIsInRoaXJkTnVtYmVyIiwiZm91cnRoTnVtYmVyIiwiZmlmdGhOdW1iZXIiLCJiYWxhbmNlZFRyZWUiXSwic291cmNlUm9vdCI6IiJ9