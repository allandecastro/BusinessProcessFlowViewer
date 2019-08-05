var pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./BusinessProcessFlowViewer/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./BusinessProcessFlowViewer/index.ts":
/*!********************************************!*\
  !*** ./BusinessProcessFlowViewer/index.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar BusinessProcessFlowViewer =\n/** @class */\nfunction () {\n  function BusinessProcessFlowViewer() {}\n  /**\r\n   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.\r\n   * Data-set values are not initialized here, use updateView.\r\n   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.\r\n   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.\r\n   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.\r\n   * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.\r\n   */\n\n\n  BusinessProcessFlowViewer.prototype.init = function (context, notifyOutputChanged, state, container) {\n    // Add control initialization code\n    this._context = context;\n    this._container = container; //this._context.mode.trackContainerResize(true);\n\n    this._container = document.createElement(\"div\"); //Get all parameters.\n\n    this._parametersBPF = this._context.parameters.parametersBPF == undefined ? \"\" : this._context.parameters.parametersBPF.raw;\n    this._completedColor = this._context.parameters.completedColor == undefined ? \"\" : this._context.parameters.completedColor.raw;\n    this._completedTextColor = this._context.parameters.completedTextColor == undefined ? \"\" : this._context.parameters.completedTextColor.raw;\n    this._activeColor = this._context.parameters.activeColor == undefined ? \"\" : this._context.parameters.activeColor.raw;\n    this._activeTextColor = this._context.parameters.activeTextColor == undefined ? \"\" : this._context.parameters.activeTextColor.raw;\n    this._notActiveColor = this._context.parameters.notActiveColor == undefined ? \"\" : this._context.parameters.notActiveColor.raw;\n    this._notActiveTextColor = this._context.parameters.notActiveTextColor == undefined ? \"\" : this._context.parameters.notActiveTextColor.raw;\n    this._progressTrackLineColor = this._context.parameters.progressTrackLineColor == undefined ? \"\" : this._context.parameters.progressTrackLineColor.raw;\n    if (this._parametersBPF.length == 0) console.log(\"[BPFV][INIT] Parameters BPF is empty...\"); // Adding the main table to the container DIV.\n\n    container.appendChild(this._container); //try to create style for color variable\n\n    var styleNode = document.createElement('style');\n    styleNode.type = \"text/css\"; //add\n\n    if (this._progressTrackLineColor.length > 0) {\n      var styleText = document.createTextNode('progress-track { background-color: ' + this._progressTrackLineColor + '; } ');\n      styleNode.appendChild(styleText);\n    }\n\n    if (this._notActiveTextColor.length > 0) {\n      var styleText = document.createTextNode('is-notactive { color: ' + this._notActiveTextColor + '; } ');\n      styleNode.appendChild(styleText);\n    }\n\n    if (this._activeTextColor.length > 0) {\n      var styleText = document.createTextNode('is-active { color: ' + this._activeTextColor + '; } ');\n      styleNode.appendChild(styleText);\n    }\n\n    if (this._completedTextColor.length > 0) {\n      var styleText = document.createTextNode('is-complete { color: ' + this._completedTextColor + '; } ');\n      styleNode.appendChild(styleText);\n    }\n\n    document.getElementsByTagName('head')[0].appendChild(styleNode);\n  };\n  /**\r\n   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.\r\n   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions\r\n   */\n\n\n  BusinessProcessFlowViewer.prototype.updateView = function (context) {\n    this._context = context; //We make sure that the data set loading is finished.\n\n    if (!context.parameters.dataSet.loading) {\n      //We remove all items to make sure that if you perform a refresh, it will not add the records again.\n      while (this._container.firstChild) {\n        this._container.removeChild(this._container.firstChild);\n      } //Parse the Parameters and make sure it contains datas.\n\n\n      var jsonParametersBPF_1 = JSON.parse(this._parametersBPF);\n\n      if (!jsonParametersBPF_1 || jsonParametersBPF_1.bpfs == null && jsonParametersBPF_1.bpfs.length == 0) {\n        console.log(\"[BPFV][UPDATEVIEW] Error : JsonParameters is Empty, ensure to correctly enter the BPF parameters value.\");\n        return;\n      } //Start the process for each records in the dataset (subgrid,view...).\n\n\n      var thisFunction_1 = this;\n\n      var _loop_1 = function _loop_1(currentRecordId) {\n        console.log(\"[BPFV][UPDATEVIEW] Record Id : \" + currentRecordId);\n        var foundBPF = false; //Boolean to avoid looking for a BPF when we have already found the one used.\t\t\t\n        //We're searching for each bpfs mentionned in the parameters until we found the active BPF for this opportunity.\n\n        iteration = 0;\n        jsonParametersBPF_1.bpfs.forEach(function (element) {\n          if (!foundBPF) {\n            iteration++; //Get plural Schema Name of the BPF and the field schema name where we can link to the target record.\n\n            var bpfEntityPluralSchemaName = element.bpfEntityPluralSchemaName;\n            var lookupFieldSchemaName = element.lookupFieldSchemaName; //Trying to retrieve the bpf entity.\n\n            var stageId = thisFunction_1.getActiveBusinessProcessFlowStageIdByOpptyId(currentRecordId, bpfEntityPluralSchemaName, lookupFieldSchemaName);\n\n            if (stageId && stageId.length > 0) //If we have something that means it's the BPF used.\n              {\n                //Building the DOM element...\n                var progresDiv_1 = document.createElement(\"div\");\n                progresDiv_1.classList.add(\"progress\");\n                progresDiv_1.setAttribute(\"opportunityId\", currentRecordId.toUpperCase());\n                var progresTrackDiv = document.createElement(\"div\");\n                progresTrackDiv.classList.add(\"progress-track\"); //HERE\n                //progresTrackDiv.style.backgroundColor=thisFunction._progressTrackLineColor;\n\n                progresDiv_1.appendChild(progresTrackDiv);\n                foundBPF = true; // We set this var to true to stop the foreach loop for this record.\n                //Get process Unique Identifier and Active Stage Unique identifier for this BPF instance.\n\n                var activeStageIdCurrentRecord_1 = stageId[0];\n                var processIdCurrentRecord = stageId[1]; //Retrieve all Stages (name and id) for this BPF.\n\n                var stageProcess_1 = thisFunction_1.getAllBusinessProcessFlowStageByProcessId(processIdCurrentRecord); // ? Maybe useless to stringify because we parse them just after. To be improved.\n\n                var jsonObjectStageId = JSON.stringify(stageProcess_1.stage.id); //Define a variable to know which step is active for this record and this BPF.\n\n                var activeStageFound_1 = false; //Parse all stage id and create cells with name and find the one active.\n\n                JSON.parse(jsonObjectStageId, function (key, value) {\n                  if (typeof value === 'string') {\n                    var progresStageDiv = document.createElement(\"div\");\n                    progresStageDiv.classList.add(\"progress-step\");\n                    progresStageDiv.classList.add(\"is-notactive\"); //HERE\n                    //progresStageDiv.style.color=thisFunction._notActiveTextColor;\n                    //Test if this is the Active Stage.\n\n                    if (value === activeStageIdCurrentRecord_1) {\n                      activeStageFound_1 = true;\n                      console.log(\"\\n [BPFV] Active stage found for \" + currentRecordId + \" : \" + thisFunction_1.toPascalCase(stageProcess_1.stage.name[Number(key)])); //cast key an number\n\n                      progresStageDiv.classList.add(\"is-active\"); //HERE\n                      //progresStageDiv.style.color=thisFunction._activeTextColor;\n\n                      progresStageDiv.classList.remove(\"is-notactive\");\n                    } //If we haven't find the active stage that means previous stage is completed...or not yet active\n\n\n                    if (!activeStageFound_1) {\n                      progresStageDiv.classList.add(\"is-complete\"); //HERE\n                      //progresStageDiv.style.color=thisFunction._completedTextColor;\t\t\t\t\n\n                      progresStageDiv.classList.remove(\"is-notactive\");\n                    }\n\n                    console.log(\"\\n [BPFV] Stage : \" + thisFunction_1.toPascalCase(stageProcess_1.stage.name[Number(key)]) + \" / \" + value.toUpperCase());\n                    progresStageDiv.innerText = thisFunction_1.toPascalCase(stageProcess_1.stage.name[Number(key)]);\n                    progresStageDiv.setAttribute(\"idStage\", value.toUpperCase()); //We add the element to the Div. \n\n                    progresDiv_1.appendChild(progresStageDiv);\n                  }\n                }); //Add the element to the container Div.\n\n                thisFunction_1._container.appendChild(progresDiv_1);\n              } else if (iteration == jsonParametersBPF_1.bpfs.length) console.log(\"\\n [BPFV] Don't find the good BPF for : \" + currentRecordId + \". You need to add it to the Parameters BPF.\");\n          }\n        });\n      };\n\n      var iteration;\n\n      for (var _i = 0, _a = context.parameters.dataSet.sortedRecordIds; _i < _a.length; _i++) {\n        var currentRecordId = _a[_i];\n\n        _loop_1(currentRecordId);\n      }\n    }\n  };\n  /**\r\n   * * This function query the process stages for a specific process id and return object with an Array with all Stage Name and Stage Unique Identifier.\r\n   * @param processId: Unique Identifier of the process id.\r\n   */\n\n\n  BusinessProcessFlowViewer.prototype.getAllBusinessProcessFlowStageByProcessId = function (processId) {\n    //Create Array to contain all Stage Name.\n    var stage = new Array(); //Create Array to contain all Stage Id.\n\n    var processStageId = new Array(); //Create an object to be returned, containing the two array.\n\n    var datas = {\n      stage: {\n        id: processStageId,\n        name: stage\n      }\n    };\n    var req2 = new XMLHttpRequest();\n    req2.open(\"GET\", \"/api/data/v9.1/processstages?$select=_processid_value,processstageid,stagecategory,stagename,processstageid&$filter=_processid_value eq \" + processId + \" &$orderby=stagecategory asc\", false);\n    req2.setRequestHeader(\"OData-MaxVersion\", \"4.0\");\n    req2.setRequestHeader(\"OData-Version\", \"4.0\");\n    req2.setRequestHeader(\"Accept\", \"application/json\");\n    req2.setRequestHeader(\"Content-Type\", \"application/json; charset=utf-8\");\n    req2.setRequestHeader(\"Prefer\", \"odata.include-annotations=\\\"*\\\"\");\n\n    req2.onreadystatechange = function () {\n      if (this.readyState === 4) {\n        req2.onreadystatechange = null;\n\n        if (this.status === 200) {\n          var results = JSON.parse(this.response);\n\n          for (var i = 0; i < results.value.length; i++) {\n            var stagename = results.value[i][\"stagecategory@OData.Community.Display.V1.FormattedValue\"];\n            var processStageid = results.value[i][\"processstageid\"];\n            stage.push(stagename.toLowerCase());\n            processStageId.push(processStageid);\n          }\n        } else console.log(\"\\n [BPFV] Error during getAllBusinessProcessFlowStageByProcessId for process id : \" + processId);\n      }\n    };\n\n    req2.send();\n    return datas;\n  };\n  /**\r\n   * * This function query the BPF entity and return an Array with the Unique Identifier of the ActiveStage and the Unique Identifier of the Process used.\r\n   * * Use a XMLHttpRequest and not WebApi because we need to be synchronous.\r\n   * @param currentRecordId: Unique Identifier of the opportunity Id\r\n   * @param entityName: Plural Schema Name of the BPF entity\r\n   * @param filterFieldSchemaName: Schema Name of the filter Field\r\n   */\n\n\n  BusinessProcessFlowViewer.prototype.getActiveBusinessProcessFlowStageIdByOpptyId = function (currentRecordId, entityName, filterFieldSchemaName) {\n    var activeStage = new Array();\n    var req = new XMLHttpRequest();\n    req.open(\"GET\", \"/api/data/v9.1/\" + entityName + \"?$select=_activestageid_value,\" + filterFieldSchemaName + \",_processid_value&$filter=\" + filterFieldSchemaName + \" eq \" + currentRecordId, false);\n    req.setRequestHeader(\"OData-MaxVersion\", \"4.0\");\n    req.setRequestHeader(\"OData-Version\", \"4.0\");\n    req.setRequestHeader(\"Accept\", \"application/json\");\n    req.setRequestHeader(\"Content-Type\", \"application/json; charset=utf-8\");\n    req.setRequestHeader(\"Prefer\", \"odata.include-annotations=\\\"*\\\"\");\n\n    req.onreadystatechange = function () {\n      if (this.readyState === 4) {\n        req.onreadystatechange = null;\n\n        if (this.status === 200) {\n          var results = JSON.parse(this.response);\n          activeStage.push(results.value[0][\"_activestageid_value\"]);\n          activeStage.push(results.value[0][\"_processid_value\"]);\n        } else console.log(\"\\n [BPFV] Error during getActiveBusinessProcessFlowStageIdByOpptyId for bpf entity : \" + entityName + \" for record : \" + currentRecordId);\n      }\n    };\n\n    req.send();\n    return activeStage;\n  };\n  /**\r\n   * * This function return a string converted in PascalCase format.\r\n   * @param stringToConvert: String variable to be converted in PascalCase format.\r\n   */\n\n\n  BusinessProcessFlowViewer.prototype.toPascalCase = function (stringToConvert) {\n    return (\"\" + stringToConvert).replace(new RegExp(/[-_]+/, 'g'), ' ').replace(new RegExp(/[^\\w\\s]/, 'g'), '').replace(new RegExp(/\\s+(.)(\\w+)/, 'g'), function ($1, $2, $3) {\n      return \"\" + ($2.toUpperCase() + $3.toLowerCase());\n    }).replace(new RegExp(/\\s/, 'g'), '').replace(new RegExp(/\\w/), function (s) {\n      return s.toUpperCase();\n    });\n  };\n  /**\r\n   * It is called by the framework prior to a control receiving new data.\r\n   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”\r\n   */\n\n\n  BusinessProcessFlowViewer.prototype.getOutputs = function () {\n    return {};\n  };\n  /**\r\n   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.\r\n   * i.e. cancelling any pending remote calls, removing listeners, etc.\r\n   */\n\n\n  BusinessProcessFlowViewer.prototype.destroy = function () {// Add code to cleanup control if necessary\n  };\n\n  return BusinessProcessFlowViewer;\n}();\n\nexports.BusinessProcessFlowViewer = BusinessProcessFlowViewer;\n\n//# sourceURL=webpack://pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad/./BusinessProcessFlowViewer/index.ts?");

/***/ })

/******/ });
if (window.ComponentFramework && window.ComponentFramework.registerControl) {
	ComponentFramework.registerControl('BusinessProcessFlowViewer.BusinessProcessFlowViewer', pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.BusinessProcessFlowViewer);
} else {
	var BusinessProcessFlowViewer = BusinessProcessFlowViewer || {};
	BusinessProcessFlowViewer.BusinessProcessFlowViewer = pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.BusinessProcessFlowViewer;
	pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = undefined;
}