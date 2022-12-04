/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/scss/style.scss":
/*!************************************!*\
  !*** ./src/client/scss/style.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://wetube/./src/client/scss/style.scss?");

/***/ }),

/***/ "./src/client/js/main.js":
/*!*******************************!*\
  !*** ./src/client/js/main.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"handleCloseSidenav\": () => (/* binding */ handleCloseSidenav),\n/* harmony export */   \"handleInputImage\": () => (/* binding */ handleInputImage),\n/* harmony export */   \"handleLoading\": () => (/* binding */ handleLoading),\n/* harmony export */   \"handleOpenSidenav\": () => (/* binding */ handleOpenSidenav),\n/* harmony export */   \"handleVideoClick\": () => (/* binding */ handleVideoClick),\n/* harmony export */   \"handleVideoInput\": () => (/* binding */ handleVideoInput)\n/* harmony export */ });\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ \"./src/client/scss/style.scss\");\n\n\n/////// get elements\nconst videoInput = document.getElementById(\"video\");\nconst closebtn = document.getElementById(\"closebtn\");\nconst openbtn = document.getElementById(\"openbtn\");\nconst inputImage = document.getElementsByClassName(\"inputImage\")[0];\n\n/////// 메뉴바(sidenav) 여닫기\nconst handleOpenSidenav = () => {\n  document.getElementById(\"sidenav\").style.width = \"250px\";\n};\n/* Set the width of the side navigation to 0 */\nconst handleCloseSidenav = () => {\n  document.getElementById(\"sidenav\").style.width = \"0\";\n};\n\n//////// video upload시\nconst handleVideoClick = event => {\n  document.getElementById(\"videoLoading\").style.visibility = \"visible\";\n};\nconst handleVideoInput = event => {\n  const reader = new FileReader();\n  reader.onload = () => {\n    document.getElementById(\"videoLoading\").style.visibility = \"hidden\";\n    // console.log(event.target.files[0].name);\n  };\n\n  document.getElementById(\"videoLoading\").style.visibility = \"hidden\";\n};\nconst handleLoading = () => {\n  document.getElementById(\"page\").style.display = \"block\";\n  document.getElementById(\"pageLoading\").style.display = \"none\";\n};\n\n/////// avatar upload 미리보기\nconst handleInputImage = e => {\n  const input = e.target;\n  console.log(input);\n  // 인풋 태그에 파일이 있는 경우\n  if (input.files && input.files[0]) {\n    // 이미지 파일인지 검사 (생략)\n    // FileReader 인스턴스 생성\n    const reader = new FileReader();\n    // 이미지가 로드가 된 경우\n    reader.onload = e => {\n      const previewImage = document.getElementById(\"preview-image\");\n      previewImage.src = e.target.result;\n    };\n    // reader가 이미지 읽도록 하기\n    reader.readAsDataURL(input.files[0]);\n  }\n};\n\n/////// event listener\nwindow.addEventListener(\"load\", handleLoading);\nif (videoInput) {\n  videoInput.addEventListener(\"click\", handleVideoClick);\n  videoInput.addEventListener(\"input\", handleVideoInput);\n}\n\n// closebtn.addEventListener(\"click\",handleCloseSidenav);\n// openbtn.addEventListener(\"click\",handleOpenSidenav);\nopenbtn.addEventListener(\"mouseover\", handleOpenSidenav);\nopenbtn.addEventListener(\"mouseout\", () => {\n  setTimeout(handleCloseSidenav, 1500);\n});\ninputImage.addEventListener(\"change\", handleInputImage);\n\n//# sourceURL=webpack://wetube/./src/client/js/main.js?");

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
/******/ 			// no module.id needed
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client/js/main.js");
/******/ 	
/******/ })()
;