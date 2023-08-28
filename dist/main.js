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
      traverseNodes.push(breadthFirstSearch);
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
    console.log(root);
    newArray.push(root);
    root.rightChildren = this.inOrder(root.rightChildren);
    return newArray;
  }
  preOrder() {
    let root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.root;
    let newArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.array;
    if (root === null) {
      return null;
    }
    console.log(root);
    newArray.push(root);
    root.leftChildren = this.preOrder(root.leftChildren);
    root.rightChildren = this.preOrder(root.rightChildren);
    return root;
  }
  postOrder() {
    let root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.root;
    let newArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.array;
    if (root === null) {
      return null;
    }
    root.leftChildren = this.postOrder(root.leftChildren);
    root.rightChildren = this.postOrder(root.rightChildren);
    console.log(root);
    newArray.push(root);
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
balancedTree.prettyPrint();
console.log(balancedTree.delete(1));
balancedTree.prettyPrint();

// console.log(balancedTree.find(8));

// console.log(balancedTree.levelOrder());

// console.log(balancedTree.inOrder());

// console.log(balancedTree.preOrder());

// console.log(balancedTree.postOrder());

console.log(balancedTree.height(balancedTree.find(10)));
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q2IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RlbXBsYXRlLXJlcG9zaXRvcnkvLi9zcmMvTm9kZS5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvc2l0b3J5Ly4vc3JjL1RyZWUuanMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwb3NpdG9yeS8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwb3NpdG9yeS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwb3NpdG9yeS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG9zaXRvcnkvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwb3NpdG9yeS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvc2l0b3J5Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvc2l0b3J5Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG9zaXRvcnkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwb3NpdG9yeS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG9zaXRvcnkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvc2l0b3J5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG9zaXRvcnkvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwb3NpdG9yeS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwb3NpdG9yeS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG9zaXRvcnkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvc2l0b3J5L3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvc2l0b3J5Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5jbGFzcyBOb2RlIHtcbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5sZWZ0Q2hpbGRyZW4gPSBudWxsO1xuICAgIHRoaXMucmlnaHRDaGlsZHJlbiA9IG51bGw7XG4gIH1cblxuICBnZXQgbGVmdENoaWxkcmVuKCkge1xuICAgIHJldHVybiB0aGlzLl9sZWZ0Q2hpbGRyZW47XG4gIH1cblxuICBzZXQgbGVmdENoaWxkcmVuKHZhbHVlKSB7XG4gICAgdGhpcy5fbGVmdENoaWxkcmVuID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcmlnaHRDaGlsZHJlbigpIHtcbiAgICByZXR1cm4gdGhpcy5fcmlnaHRDaGlsZHJlbjtcbiAgfVxuXG4gIHNldCByaWdodENoaWxkcmVuKHZhbHVlKSB7XG4gICAgdGhpcy5fcmlnaHRDaGlsZHJlbiA9IHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5vZGU7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cbmltcG9ydCBOb2RlIGZyb20gXCIuL05vZGVcIjtcblxuY2xhc3MgVHJlZSB7XG4gIGFycmF5ID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yb290ID0gbnVsbDtcbiAgfVxuXG4gIGdldCByb290KCkge1xuICAgIHJldHVybiB0aGlzLl9yb290O1xuICB9XG5cbiAgc2V0IHJvb3QodmFsdWUpIHtcbiAgICB0aGlzLl9yb290ID0gdmFsdWU7XG4gIH1cblxuICBidWlsZFRyZWUoYXJyYXksIHN0YXJ0LCBlbmQpIHtcbiAgICBjb25zdCBuZXdBcnJheSA9IFtdO1xuXG4gICAgYXJyYXkuc29ydCgoc21hbGxlclZhbHVlLCBiaWdnZXJWYWx1ZSkgPT4gc21hbGxlclZhbHVlIC0gYmlnZ2VyVmFsdWUpO1xuICAgIGFycmF5LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGlmICghbmV3QXJyYXkuaW5jbHVkZXMoZWxlbWVudCkpIHtcbiAgICAgICAgbmV3QXJyYXkucHVzaChlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChzdGFydCA+IGVuZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IG1pZGRsZSA9IE1hdGguZmxvb3IocGFyc2VJbnQoc3RhcnQgKyBlbmQpIC8gMik7XG5cbiAgICBjb25zdCBub2RlID0gbmV3IE5vZGUobmV3QXJyYXlbbWlkZGxlXSk7XG5cbiAgICBub2RlLmxlZnRDaGlsZHJlbiA9IHRoaXMuYnVpbGRUcmVlKGFycmF5LCBzdGFydCwgbWlkZGxlIC0gMSk7XG5cbiAgICBub2RlLnJpZ2h0Q2hpbGRyZW4gPSB0aGlzLmJ1aWxkVHJlZShhcnJheSwgbWlkZGxlICsgMSwgZW5kKTtcblxuICAgIHRoaXMucm9vdCA9IG5vZGU7XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHByZXR0eVByaW50ID0gKG5vZGUgPSB0aGlzLnJvb3QsIHByZWZpeCA9IFwiXCIsIGlzTGVmdCA9IHRydWUpID0+IHtcbiAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAobm9kZS5yaWdodENoaWxkcmVuICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnByZXR0eVByaW50KFxuICAgICAgICBub2RlLnJpZ2h0Q2hpbGRyZW4sXG4gICAgICAgIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSCICAgXCIgOiBcIiAgICBcIn1gLFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilJTilIDilIAgXCIgOiBcIuKUjOKUgOKUgCBcIn0ke25vZGUuZGF0YX1gKTtcbiAgICBpZiAobm9kZS5sZWZ0Q2hpbGRyZW4gIT09IG51bGwpIHtcbiAgICAgIHRoaXMucHJldHR5UHJpbnQoXG4gICAgICAgIG5vZGUubGVmdENoaWxkcmVuLFxuICAgICAgICBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIiAgICBcIiA6IFwi4pSCICAgXCJ9YCxcbiAgICAgICAgdHJ1ZVxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gRG9uJ3QgdXNlIHRoZSBvcmlnaW5hbCBhcnJheSB0aGF0IHdhcyB1c2VkIHRvIGJ1aWxkIHRyZWVcbiAgLy8gZm9yIGluc2VydCBhbmQgZGVsZXRlIGZ1bmN0aW9uIHBhcmFtZXRlclxuICAvLyBmb3IgdGhpcyBtZXRob2QgaXQgc2hvdWxkIHRyYXZlcnNlIHRoZSB0cmVlIGFuZCBtYW5pcHVsYXRlXG4gIC8vIHRoZWlyIGNvbm5lY3Rpb25cblxuICBpbnNlcnQoZGF0YSwgcm9vdCA9IHRoaXMucm9vdCkge1xuICAgIGlmIChyb290ID09PSBudWxsKSB7XG4gICAgICByb290ID0gbmV3IE5vZGUoZGF0YSk7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEgPCByb290LmRhdGEpIHtcbiAgICAgIHJvb3QubGVmdENoaWxkcmVuID0gdGhpcy5pbnNlcnQoZGF0YSwgcm9vdC5sZWZ0Q2hpbGRyZW4pO1xuICAgIH0gZWxzZSBpZiAoZGF0YSA+IHJvb3QuZGF0YSkge1xuICAgICAgcm9vdC5yaWdodENoaWxkcmVuID0gdGhpcy5pbnNlcnQoZGF0YSwgcm9vdC5yaWdodENoaWxkcmVuKTtcbiAgICB9XG4gICAgcmV0dXJuIHJvb3Q7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVmYXVsdC1wYXJhbS1sYXN0XG4gIGRlbGV0ZShkYXRhLCByb290ID0gdGhpcy5yb290KSB7XG4gICAgaWYgKHJvb3QgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiByb290O1xuICAgIH1cblxuICAgIGlmIChyb290LmRhdGEgPiBkYXRhKSB7XG4gICAgICByb290LmxlZnRDaGlsZHJlbiA9IHRoaXMuZGVsZXRlKGRhdGEsIHJvb3QubGVmdENoaWxkcmVuKTtcbiAgICB9IGVsc2UgaWYgKHJvb3QuZGF0YSA8IGRhdGEpIHtcbiAgICAgIHJvb3QucmlnaHRDaGlsZHJlbiA9IHRoaXMuZGVsZXRlKGRhdGEsIHJvb3QucmlnaHRDaGlsZHJlbik7XG4gICAgICByZXR1cm4gcm9vdDtcbiAgICB9XG5cbiAgICAvLyBpZiBvbmUgb2YgdGhlIGNoaWxkcmVuIGlzIGVtcHR5XG4gICAgaWYgKHJvb3QubGVmdENoaWxkcmVuID09PSBudWxsKSB7XG4gICAgICBjb25zdCB0ZW1wID0gcm9vdC5yaWdodENoaWxkcmVuO1xuICAgICAgcmV0dXJuIHRlbXA7XG4gICAgfVxuICAgIGlmIChyb290LnJpZ2h0Q2hpbGRyZW4gPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHRlbXAgPSByb290LmxlZnRDaGlsZHJlbjtcbiAgICAgIHJldHVybiB0ZW1wO1xuICAgIH1cblxuICAgIGxldCBzdWNjZXNzb3JQYXJlbnQgPSByb290O1xuICAgIGxldCBzdWNjZXNzb3IgPSByb290LnJpZ2h0Q2hpbGRyZW47XG4gICAgd2hpbGUgKHN1Y2Nlc3Nvci5sZWZ0Q2hpbGRyZW4gIT09IG51bGwpIHtcbiAgICAgIHN1Y2Nlc3NvclBhcmVudCA9IHN1Y2Nlc3NvcjtcbiAgICAgIHN1Y2Nlc3NvciA9IHN1Y2Nlc3Nvci5sZWZ0Q2hpbGRyZW47XG4gICAgfVxuXG4gICAgLy8gZGVsZXRlIHN1Y2Nlc3NvciBzaW5jZSBpdCdzIGFsd2F5cyBsZWZ0IGNoaWxkIG9mIGl0J3MgcGFyZW50XG4gICAgLy8gd2UgY2FuIHNhZmVseSBtYWtlIHN1Y2Nlc3NvcidzIHJpZ2h0LCByaWdodCBjaGlsZHJlbiBhcyBsZWZ0XG4gICAgLy8gb2YgaXQncyBwYXJlbnQuXG4gICAgLy8gSWYgdGhlcmUgYXJlIG5vIHN1Y2Nlc3NvciwgdGhlbiBhc3NpZ24gc3VjY2Vzc29yIHJpZ2h0IHRvXG4gICAgLy8gc3VjY2Vzc29yUGFyZW50IHJpZ2h0XG4gICAgaWYgKHN1Y2Nlc3NvclBhcmVudCAhPT0gcm9vdCkge1xuICAgICAgc3VjY2Vzc29yUGFyZW50LmxlZnRDaGlsZHJlbiA9IHN1Y2Nlc3Nvci5yaWdodENoaWxkcmVuO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdWNjZXNzb3JQYXJlbnQucmlnaHRDaGlsZHJlbiA9IHN1Y2Nlc3Nvci5yaWdodENoaWxkcmVuO1xuICAgIH1cbiAgICAvLyBjb3B5IHN1Y2Nlc3NvciBkYXRhIHRvIHRoZSByb290XG4gICAgcm9vdC5kYXRhID0gc3VjY2Vzc29yLmRhdGE7XG4gICAgcmV0dXJuIHJvb3Q7XG4gIH1cblxuICBmaW5kKGRhdGEsIHJvb3QgPSB0aGlzLnJvb3QpIHtcbiAgICBpZiAoZGF0YSA8IHJvb3QuZGF0YSkge1xuICAgICAgY29uc3QgZmluZE5vZGUgPSB0aGlzLmZpbmQoZGF0YSwgcm9vdC5sZWZ0Q2hpbGRyZW4pO1xuICAgICAgcmV0dXJuIGZpbmROb2RlO1xuICAgIH1cbiAgICBpZiAoZGF0YSA+IHJvb3QuZGF0YSkge1xuICAgICAgY29uc3QgZmluZE5vZGUgPSB0aGlzLmZpbmQoZGF0YSwgcm9vdC5yaWdodENoaWxkcmVuKTtcbiAgICAgIHJldHVybiBmaW5kTm9kZTtcbiAgICB9XG4gICAgaWYgKGRhdGEgPT09IHJvb3QuZGF0YSkge1xuICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfVxuICB9XG5cbiAgbGV2ZWxPcmRlcihyb290ID0gdGhpcy5yb290KSB7XG4gICAgY29uc3QgdHJhdmVyc2VOb2RlcyA9IFtdO1xuXG4gICAgaWYgKHJvb3QgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld0FycmF5ID0gWy4uLnRoaXMuYXJyYXldO1xuXG4gICAgbmV3QXJyYXkucHVzaChyb290KTtcblxuICAgIHdoaWxlIChuZXdBcnJheS5sZW5ndGggIT09IDApIHtcbiAgICAgIGNvbnN0IGJyZWFkdGhGaXJzdFNlYXJjaCA9IG5ld0FycmF5WzBdO1xuXG4gICAgICBpZiAoYnJlYWR0aEZpcnN0U2VhcmNoLmxlZnRDaGlsZHJlbiAhPT0gbnVsbCkge1xuICAgICAgICBuZXdBcnJheS5wdXNoKGJyZWFkdGhGaXJzdFNlYXJjaC5sZWZ0Q2hpbGRyZW4pO1xuICAgICAgfVxuICAgICAgaWYgKGJyZWFkdGhGaXJzdFNlYXJjaC5yaWdodENoaWxkcmVuICE9PSBudWxsKSB7XG4gICAgICAgIG5ld0FycmF5LnB1c2goYnJlYWR0aEZpcnN0U2VhcmNoLnJpZ2h0Q2hpbGRyZW4pO1xuICAgICAgfVxuXG4gICAgICBuZXdBcnJheS5zaGlmdChicmVhZHRoRmlyc3RTZWFyY2gpO1xuICAgICAgdHJhdmVyc2VOb2Rlcy5wdXNoKGJyZWFkdGhGaXJzdFNlYXJjaCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyYXZlcnNlTm9kZXM7XG4gIH1cblxuICBpbk9yZGVyKHJvb3QgPSB0aGlzLnJvb3QsIG5ld0FycmF5ID0gdGhpcy5hcnJheSkge1xuICAgIGlmIChyb290ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByb290LmxlZnRDaGlsZHJlbiA9IHRoaXMuaW5PcmRlcihyb290LmxlZnRDaGlsZHJlbik7XG5cbiAgICBjb25zb2xlLmxvZyhyb290KTtcblxuICAgIG5ld0FycmF5LnB1c2gocm9vdCk7XG5cbiAgICByb290LnJpZ2h0Q2hpbGRyZW4gPSB0aGlzLmluT3JkZXIocm9vdC5yaWdodENoaWxkcmVuKTtcblxuICAgIHJldHVybiBuZXdBcnJheTtcbiAgfVxuXG4gIHByZU9yZGVyKHJvb3QgPSB0aGlzLnJvb3QsIG5ld0FycmF5ID0gdGhpcy5hcnJheSkge1xuICAgIGlmIChyb290ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhyb290KTtcblxuICAgIG5ld0FycmF5LnB1c2gocm9vdCk7XG5cbiAgICByb290LmxlZnRDaGlsZHJlbiA9IHRoaXMucHJlT3JkZXIocm9vdC5sZWZ0Q2hpbGRyZW4pO1xuXG4gICAgcm9vdC5yaWdodENoaWxkcmVuID0gdGhpcy5wcmVPcmRlcihyb290LnJpZ2h0Q2hpbGRyZW4pO1xuXG4gICAgcmV0dXJuIHJvb3Q7XG4gIH1cblxuICBwb3N0T3JkZXIocm9vdCA9IHRoaXMucm9vdCwgbmV3QXJyYXkgPSB0aGlzLmFycmF5KSB7XG4gICAgaWYgKHJvb3QgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJvb3QubGVmdENoaWxkcmVuID0gdGhpcy5wb3N0T3JkZXIocm9vdC5sZWZ0Q2hpbGRyZW4pO1xuXG4gICAgcm9vdC5yaWdodENoaWxkcmVuID0gdGhpcy5wb3N0T3JkZXIocm9vdC5yaWdodENoaWxkcmVuKTtcblxuICAgIGNvbnNvbGUubG9nKHJvb3QpO1xuXG4gICAgbmV3QXJyYXkucHVzaChyb290KTtcblxuICAgIHJldHVybiBuZXdBcnJheTtcbiAgfVxuXG4gIGhlaWdodChyb290ID0gdGhpcy5yb290LCBlZGdlID0gMCkge1xuICAgIGlmIChyb290ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gZWRnZTtcbiAgICB9XG5cbiAgICBjb25zdCBjb3VudExlZnRFZGdlcyA9IHRoaXMuaGVpZ2h0KHJvb3QubGVmdENoaWxkcmVuLCBlZGdlICsgMSk7XG4gICAgY29uc3QgY291bnRSaWdodEVkZ2VzID0gdGhpcy5oZWlnaHQocm9vdC5yaWdodENoaWxkcmVuLCBlZGdlICsgMSk7XG5cbiAgICBpZiAoY291bnRMZWZ0RWRnZXMgPiBjb3VudFJpZ2h0RWRnZXMpIHtcbiAgICAgIHJldHVybiBjb3VudExlZnRFZGdlcztcbiAgICB9XG4gICAgaWYgKGNvdW50UmlnaHRFZGdlcyA+IGNvdW50TGVmdEVkZ2VzKSB7XG4gICAgICByZXR1cm4gY291bnRSaWdodEVkZ2VzO1xuICAgIH1cbiAgICBpZiAoY291bnRMZWZ0RWRnZXMgPT09IGNvdW50UmlnaHRFZGdlcykge1xuICAgICAgcmV0dXJuIGNvdW50TGVmdEVkZ2VzO1xuICAgIH1cbiAgICBpZiAoY291bnRSaWdodEVkZ2VzID09PSBjb3VudExlZnRFZGdlcykge1xuICAgICAgcmV0dXJuIGNvdW50UmlnaHRFZGdlcztcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJlZTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSwyQkFBMkI7QUFDN0JcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgVHJlZSBmcm9tIFwiLi9UcmVlXCI7XG5pbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuXG5jb25zdCBiYWxhbmNlZFRyZWUgPSBuZXcgVHJlZSgpO1xuXG5jb25zb2xlLmxvZyhiYWxhbmNlZFRyZWUuYnVpbGRUcmVlKFswLCA2LCAxLCAyLCA1LCAzLCA3LCA4LCA5LCA2XSwgMCwgOCkpO1xuXG5iYWxhbmNlZFRyZWUucHJldHR5UHJpbnQoKTtcblxuY29uc29sZS5sb2coYmFsYW5jZWRUcmVlLmluc2VydCg0KSk7XG5cbmJhbGFuY2VkVHJlZS5wcmV0dHlQcmludCgpO1xuXG5jb25zb2xlLmxvZyhiYWxhbmNlZFRyZWUuaW5zZXJ0KDEwKSk7XG5cbmJhbGFuY2VkVHJlZS5wcmV0dHlQcmludCgpO1xuXG5jb25zb2xlLmxvZyhiYWxhbmNlZFRyZWUuZGVsZXRlKDEpKTtcblxuYmFsYW5jZWRUcmVlLnByZXR0eVByaW50KCk7XG5cbi8vIGNvbnNvbGUubG9nKGJhbGFuY2VkVHJlZS5maW5kKDgpKTtcblxuLy8gY29uc29sZS5sb2coYmFsYW5jZWRUcmVlLmxldmVsT3JkZXIoKSk7XG5cbi8vIGNvbnNvbGUubG9nKGJhbGFuY2VkVHJlZS5pbk9yZGVyKCkpO1xuXG4vLyBjb25zb2xlLmxvZyhiYWxhbmNlZFRyZWUucHJlT3JkZXIoKSk7XG5cbi8vIGNvbnNvbGUubG9nKGJhbGFuY2VkVHJlZS5wb3N0T3JkZXIoKSk7XG5cbmNvbnNvbGUubG9nKGJhbGFuY2VkVHJlZS5oZWlnaHQoYmFsYW5jZWRUcmVlLmZpbmQoMTApKSk7XG4iXSwibmFtZXMiOlsiTm9kZSIsImNvbnN0cnVjdG9yIiwiZGF0YSIsImxlZnRDaGlsZHJlbiIsInJpZ2h0Q2hpbGRyZW4iLCJfbGVmdENoaWxkcmVuIiwidmFsdWUiLCJfcmlnaHRDaGlsZHJlbiIsIlRyZWUiLCJhcnJheSIsInJvb3QiLCJfcm9vdCIsImJ1aWxkVHJlZSIsInN0YXJ0IiwiZW5kIiwibmV3QXJyYXkiLCJzb3J0Iiwic21hbGxlclZhbHVlIiwiYmlnZ2VyVmFsdWUiLCJmb3JFYWNoIiwiZWxlbWVudCIsImluY2x1ZGVzIiwicHVzaCIsIm1pZGRsZSIsIk1hdGgiLCJmbG9vciIsInBhcnNlSW50Iiwibm9kZSIsInByZXR0eVByaW50IiwiX3RoaXMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJwcmVmaXgiLCJpc0xlZnQiLCJjb25zb2xlIiwibG9nIiwiaW5zZXJ0IiwiZGVsZXRlIiwidGVtcCIsInN1Y2Nlc3NvclBhcmVudCIsInN1Y2Nlc3NvciIsImZpbmQiLCJmaW5kTm9kZSIsImxldmVsT3JkZXIiLCJ0cmF2ZXJzZU5vZGVzIiwiYnJlYWR0aEZpcnN0U2VhcmNoIiwic2hpZnQiLCJpbk9yZGVyIiwicHJlT3JkZXIiLCJwb3N0T3JkZXIiLCJoZWlnaHQiLCJlZGdlIiwiY291bnRMZWZ0RWRnZXMiLCJjb3VudFJpZ2h0RWRnZXMiLCJiYWxhbmNlZFRyZWUiXSwic291cmNlUm9vdCI6IiJ9