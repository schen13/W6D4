/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(array) {\n    this.htmlArray = array;\n  }\n  \n  html(string) {\n    if (typeof string === 'undefined') {\n      return this.htmlArray[0].innerHTML;\n    } else {\n      this.htmlArray.forEach((node) => {\n        node.innerHTML = string;\n      });\n    }\n  }\n  \n  empty() {\n    this.html(\"\");\n  }\n  \n  append(arg) {\n    this.htmlArray.forEach((node) => {\n      if (typeof arg === \"string\") {\n        node.innerHTML += arg;\n      } else if (arg instanceof HTMLElement) {\n        node.innerHTML += arg.outerHTML;\n      } else if (arg instanceof this.constructor) {\n        arg.htmlArray.forEach((innerNode) => {\n          node.innerHTML += innerNode.outerHTML;\n        });\n      }\n    });\n  }\n  \n  attr(name, value) {\n    if (typeof value === 'undefined') {\n      this.htmlArray.forEach((node) => {\n        let x = node.getAttribute(name);\n        if (x) return x;\n      });\n      return null;\n    } else {\n      this.htmlArray.forEach((node) => {\n        let outer = node.outerHTML.split(\" \");\n        let namevalue = [` ${name}` + \"=\" + `\"${value}\" `];\n        outer = outer[0].concat(namevalue, outer.slice(1));\n        node.outerHTML = outer;\n      });\n    }\n  }\n  \n  addClass(arg) {\n    this.htmlArray.forEach((node) => {\n      if (!node.className.includes(arg)) {\n        node.className += \" \" + arg;\n      }\n    });\n  }\n  \n  removeClass(arg) {\n    this.htmlArray.forEach((node) => {\n      if (node.className.includes(arg)) {\n        let nameArray = node.className.split(\" \");\n        nameArray = nameArray.filter((el) => el !== arg);\n        node.className = nameArray.join(\" \");\n      }\n    });\n  }\n  \n  children() {\n    let childArray = [];\n    this.htmlArray.forEach((node) => {\n      let mark = Array.from(node.children);\n      childArray = childArray.concat(mark);\n    });\n    return new DOMNodeCollection(childArray);\n  }\n  \n  parent() {\n    return new DOMNodeCollection([this.htmlArray[0].parentElement]);\n  }\n  \n  find(arg) {\n    let foundArray = [];\n    this.htmlArray.forEach((node) => {\n      let foundDes = node.querySelectorAll(arg);\n      foundArray = foundArray.concat(Array.from(foundDes));\n    });\n    return new DOMNodeCollection(foundArray);\n  }\n  \n  remove() {\n    let removedNodes = [];\n    \n    this.htmlArray.forEach((node) => {\n      removedNodes.push(node.parentNode.removeChild(node));\n    });\n    \n    return removedNodes;\n  }\n}\n\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./lib/dom_node_collection.js\");\n\nwindow.$l = (arg) => {\n  let selectorArr;\n  \n  if (arg instanceof HTMLElement) {\n    selectorArr = [arg];\n  } else {\n    const selector = document.querySelectorAll(arg);\n    selectorArr = Array.from(selector);\n  }\n  return new DOMNodeCollection(selectorArr);\n};\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });