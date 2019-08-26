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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar BusinessProcessFlowViewer =\n/** @class */\nfunction () {\n  function BusinessProcessFlowViewer() {}\n  /**\r\n   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.\r\n   * Data-set values are not initialized here, use updateView.\r\n   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.\r\n   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.\r\n   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.\r\n   * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.\r\n   */\n\n\n  BusinessProcessFlowViewer.prototype.init = function (context, notifyOutputChanged, state, container) {\n    // Add control initialization code\n    this._context = context;\n    this._container = container;\n    this._controlViewRendered = false; //Get all parameters.\n\n    this.GetAllParameters();\n    this.CheckParameterAreValids(); // Adding the main table to the container DIV.\n\n    this._container = document.createElement(\"div\");\n    container.appendChild(this._container); //try to create style for color variable\n\n    this.InitializeCustomCSSWithParameters();\n  };\n  /**\r\n   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.\r\n   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions\r\n   */\n\n\n  BusinessProcessFlowViewer.prototype.updateView = function (context) {\n    if (!this._controlViewRendered) {\n      this._controlViewRendered = true;\n      this._context = context; //We make sure that the data set loading is finished.\n\n      if (!context.parameters.dataSet.loading) {\n        //We remove all items to make sure that if you perform a refresh, it will not add the records again.\n        this.RemoveChildItems(); //Parse the Parameters and make sure it contains datas.\n\n        var jsonParametersBPF = JSON.parse(this._parametersBPF);\n\n        if (!jsonParametersBPF || jsonParametersBPF.bpfs == null && jsonParametersBPF.bpfs.length == 0) {\n          console.log(\"[BPFV][UPDATEVIEW] Error : JsonParameters is Empty, ensure to correctly enter the BPF parameters value.\");\n          return;\n        } //Start the process for each records in the dataset (subgrid,view...).\n\n\n        var targetEntityLogicalName = context.parameters.dataSet.getTargetEntityType();\n        this.ProcessAllRecordsInDataSet(jsonParametersBPF, targetEntityLogicalName);\n      }\n    }\n  };\n\n  BusinessProcessFlowViewer.prototype.ProcessBusinessProcessFlowStageIdByCurrentRecordId = function (currentRecordId, entityName, filterFieldSchemaName, iteration, jsonParametersBPF, targetEntityLogicalName, foundBPF) {\n    var activeStage = new Array();\n\n    var _this = this;\n\n    var str = entityName + \"?$select=_activestageid_value,\" + filterFieldSchemaName + \",_processid_value&$filter=\" + filterFieldSchemaName + \" eq \" + currentRecordId;\n    console.log(str);\n\n    this._context.webAPI.retrieveMultipleRecords(entityName, \"?$select=_activestageid_value,\" + filterFieldSchemaName + \",_processid_value&$filter=\" + filterFieldSchemaName + \" eq \" + currentRecordId).then(function success(results) {\n      console.log(\"\\n [BPFV] ProcessBusinessProcessFlowStageIdByCurrentRecordId CALLBACK  \" + currentRecordId);\n\n      if (results.entities.length > 0) {\n        activeStage.push(results.entities[0][\"_activestageid_value\"]);\n        activeStage.push(results.entities[0][\"_processid_value\"]);\n      }\n\n      if (activeStage && activeStage.length > 0) //If we have something that means it's the BPF used.\n        {\n          //Building the DOM element...\n          var progresDiv = document.createElement(\"div\");\n          progresDiv.classList.add(\"progress\");\n          progresDiv.classList.add(\"progress\" + _this._viewId);\n          progresDiv.setAttribute(targetEntityLogicalName, currentRecordId.toUpperCase());\n          var progresTrackDiv = document.createElement(\"div\");\n          progresTrackDiv.classList.add(\"progress-track\");\n          progresTrackDiv.classList.add(\"progress-track\" + _this._viewId);\n          progresDiv.appendChild(progresTrackDiv);\n\n          progresDiv.onclick = function () {\n            var entityReference = _this._context.parameters.dataSet.records[currentRecordId].getNamedReference();\n\n            var entityFormOptions = {\n              entityName: targetEntityLogicalName,\n              entityId: entityReference.id,\n              openInNewWindow: true\n            };\n            console.log(\"OnCLik :  logical name = \" + targetEntityLogicalName + \" id = \" + currentRecordId);\n\n            _this._context.navigation.openForm(entityFormOptions);\n          };\n\n          progresDiv.onmouseover = function () {\n            console.log(\"Hover:  logical name = \" + targetEntityLogicalName + \" id = \" + currentRecordId);\n            var card = document.getElementsByClassName(currentRecordId)[0];\n            card.style.display = \"block\";\n          };\n\n          progresDiv.onmouseout = function () {\n            console.log(\"Hover Out:  logical name = \" + targetEntityLogicalName + \" id = \" + currentRecordId);\n            var card = document.getElementsByClassName(currentRecordId)[0];\n            card.style.display = \"none\";\n          };\n\n          foundBPF = true; // We set this var to true to stop the foreach loop for this record.\n          //Get process Unique Identifier and Active Stage Unique identifier for this BPF instance.\n\n          var activeStageIdCurrentRecord = activeStage[0];\n          var processIdCurrentRecord = activeStage[1]; //Retrieve all Stages (name and id) for this BPF.\t\t\t\t\t\n\n          _this.GetAllBusinessProcessFlowStageByProcessId(processIdCurrentRecord, targetEntityLogicalName, currentRecordId, progresDiv, activeStageIdCurrentRecord);\n        } else if (iteration == jsonParametersBPF.bpfs.length) console.log(\"\\n [BPFV] Don't find the good BPF for : \" + currentRecordId + \". You need to add it to the Parameters BPF.\");\n    }, function (error) {\n      console.log(\"\\n [BPFV] Error during ProcessBusinessProcessFlowStageIdByCurrentRecordId for bpf entity : \" + entityName + \" for record : \" + currentRecordId);\n    });\n  };\n\n  BusinessProcessFlowViewer.prototype.GetAllBusinessProcessFlowStageByProcessId = function (processIdCurrentRecord, targetEntityLogicalName, currentRecordId, progresDiv, activeStageIdCurrentRecord) {\n    //Create Array to contain all Stage Name.\n    var stage = new Array(); //Create Array to contain all Stage Id.\n\n    var processStageId = new Array(); //Create an object to be returned, containing the two array.\n\n    var datas = {\n      stage: {\n        id: processStageId,\n        name: stage\n      }\n    };\n\n    var _this = this;\n\n    this._context.webAPI.retrieveMultipleRecords(\"processstage\", \"?$select=_processid_value,processstageid,stagecategory,stagename&$filter=_processid_value eq \" + processIdCurrentRecord + \"&$orderby=stagecategory asc\").then(function success(results) {\n      for (var i = 0; i < results.entities.length; i++) {\n        var stagename = results.entities[i][\"stagecategory@OData.Community.Display.V1.FormattedValue\"];\n        var processStageid = results.entities[i][\"processstageid\"];\n        stage.push(stagename.toLowerCase());\n        processStageId.push(processStageid);\n      } // ? Maybe useless to stringify because we parse them just after. To be improved.\n\n\n      var jsonObjectStageId = JSON.stringify(datas.stage.id); //Define a variable to know which step is active for this record and this BPF.\n\n      var activeStageFound = false; //Parse all stage id and create cells with name and find the one active.\n\n      var listComp;\n      JSON.parse(jsonObjectStageId, function (key, value) {\n        if (typeof value === 'string') {\n          var progresStageDiv = document.createElement(\"div\"); //+this._viewId\n\n          progresStageDiv.classList.add(\"progress-step\");\n          progresStageDiv.classList.add(\"progress-step\" + _this._viewId);\n          progresStageDiv.classList.add(\"is-notactive\");\n          progresStageDiv.classList.add(\"is-notactive\" + _this._viewId); //Test if this is the Active Stage.\n\n          if (value === activeStageIdCurrentRecord) {\n            activeStageFound = true;\n            console.log(\"\\n [BPFV] Active stage found for \" + currentRecordId + \" : \" + _this.ToPascalCase(datas.stage.name[Number(key)])); //cast key an number\n\n            progresStageDiv.classList.add(\"is-active\");\n            progresStageDiv.classList.add(\"is-active\" + _this._viewId);\n            progresStageDiv.classList.remove(\"is-notactive\");\n            progresStageDiv.classList.remove(\"is-notactive\" + _this._viewId);\n          } //If we haven't find the active stage that means previous stage is completed...or not yet active\n\n\n          if (!activeStageFound) {\n            progresStageDiv.classList.add(\"is-complete\");\n            progresStageDiv.classList.add(\"is-complete\" + _this._viewId);\n            progresStageDiv.classList.remove(\"is-notactive\");\n            progresStageDiv.classList.remove(\"is-notactive\" + _this._viewId);\n          }\n\n          console.log(\"\\n [BPFV] Stage : \" + _this.ToPascalCase(datas.stage.name[Number(key)]) + \" / \" + value.toUpperCase());\n          progresStageDiv.innerText = _this.ToPascalCase(datas.stage.name[Number(key)]);\n          progresStageDiv.setAttribute(\"idStage\", value.toUpperCase()); //We add the element to the Div. \n\n          progresDiv.appendChild(progresStageDiv);\n        }\n      }); //Add the element to the container Div.\n\n      _this._container.appendChild(progresDiv);\n\n      listComp.push(progresDiv);\n      alert(\"alert comp list: \" + listComp); //_this._listComponents.push(progresDiv);\n      //test si on fais les cards ou pas\n      //_this.GetFieldsValueAndCreateDomCards(targetEntityLogicalName, currentRecordId);\n    }, function (error) {\n      console.log(\"\\n [BPFV] Error during getAllBusinessProcessFlowStageByProcessId for process id : \" + processIdCurrentRecord);\n    });\n  };\n\n  BusinessProcessFlowViewer.prototype.GetFieldsValueAndCreateDomCards = function (targetEntityLogicalName, currentRecordId) {\n    //Card PART Creation\n    var cardDiv = document.createElement(\"div\");\n    cardDiv.classList.add(\"card\");\n    cardDiv.classList.add(currentRecordId);\n    var cardDivHeader = document.createElement(\"div\");\n    cardDivHeader.classList.add(\"cardHeader\");\n\n    var _this = this;\n\n    this._context.webAPI.retrieveRecord(targetEntityLogicalName, currentRecordId, \"?$select=name,estimatedclosedate,estimatedvalue,modifiedon,_ownerid_value\").then(function success(result) {\n      var estimatedclosedate = result[\"estimatedclosedate\"];\n      var estimatedvalue_formatted = result[\"estimatedvalue@OData.Community.Display.V1.FormattedValue\"];\n      var modifiedon_formatted = result[\"modifiedon@OData.Community.Display.V1.FormattedValue\"];\n      var _ownerid_value_formatted = result[\"_ownerid_value@OData.Community.Display.V1.FormattedValue\"];\n      cardDivHeader.innerText = result[\"name\"];\n      cardDiv.appendChild(cardDivHeader);\n      var cardDivSeparator = document.createElement(\"span\");\n      cardDivSeparator.classList.add(\"separator\");\n      cardDiv.appendChild(cardDivSeparator);\n      var cardDivContent = document.createElement(\"div\");\n      cardDivContent.classList.add(\"cardContent\");\n      cardDiv.appendChild(cardDivContent); //pour un field\n\n      var cardDivContentData = document.createElement(\"div\");\n      cardDivContentData.classList.add(\"cardData\");\n      cardDivContent.appendChild(cardDivContentData); //label et data en span\n\n      var fieldLabel = document.createElement(\"span\");\n      fieldLabel.classList.add(\"fieldLabel\");\n      fieldLabel.innerText = \"Estimated Value: \";\n      cardDivContentData.appendChild(fieldLabel);\n      var fieldData = document.createElement(\"span\");\n      fieldData.classList.add(\"fieldData\");\n      fieldData.innerText = estimatedvalue_formatted;\n      cardDivContentData.appendChild(fieldData); //pour un autre  field\n\n      var cardDivContentData2 = document.createElement(\"div\");\n      cardDivContentData2.classList.add(\"cardData\");\n      cardDivContent.appendChild(cardDivContentData2);\n      var fieldLabel2 = document.createElement(\"span\");\n      fieldLabel2.classList.add(\"fieldLabel\");\n      fieldLabel2.innerText = \"Estimated Close Date: \";\n      cardDivContentData2.appendChild(fieldLabel2);\n      var fieldData2 = document.createElement(\"span\");\n      fieldData2.classList.add(\"fieldData\");\n      fieldData2.innerText = estimatedclosedate;\n      cardDivContentData2.appendChild(fieldData2); //un aute\n\n      var cardDivContentData3 = document.createElement(\"div\");\n      cardDivContentData3.classList.add(\"cardData\");\n      cardDivContent.appendChild(cardDivContentData3);\n      var fieldLabel3 = document.createElement(\"span\");\n      fieldLabel3.classList.add(\"fieldLabel\");\n      fieldLabel3.innerText = \"Last modification: \";\n      cardDivContentData3.appendChild(fieldLabel3);\n      var fieldData3 = document.createElement(\"span\");\n      fieldData3.classList.add(\"fieldData\");\n      fieldData3.innerText = modifiedon_formatted;\n      cardDivContentData3.appendChild(fieldData3); //aute\n\n      var cardDivContentData4 = document.createElement(\"div\");\n      cardDivContentData4.classList.add(\"cardData\");\n      cardDivContent.appendChild(cardDivContentData4);\n      var fieldLabel4 = document.createElement(\"span\");\n      fieldLabel4.classList.add(\"fieldLabel\");\n      fieldLabel4.innerText = \"Owner: \";\n      cardDivContentData4.appendChild(fieldLabel4);\n      var fieldData5 = document.createElement(\"span\");\n      fieldData5.classList.add(\"fieldData\");\n      fieldData5.innerText = _ownerid_value_formatted;\n      cardDivContentData4.appendChild(fieldData5);\n\n      _this._container.appendChild(cardDiv);\n\n      ;\n    }, function (error) {\n      console.log(\"\\n [BPFV] Error during GetFieldsValueAndCreateDomCards for record id : \" + currentRecordId);\n    });\n  };\n\n  BusinessProcessFlowViewer.prototype.ProcessAllRecordsInDataSet = function (jsonParametersBPF, targetEntityLogicalName) {\n    console.log(\"Count records : \" + this._context.parameters.dataSet.sortedRecordIds.length);\n    console.log(\"Count container : \" + this._container.childElementCount);\n\n    var _loop_1 = function _loop_1(currentRecordId) {\n      console.log(\"[BPFV][UPDATEVIEW] Record Id : \" + currentRecordId);\n      var foundBPF = false; //Boolean to avoid looking for a BPF when we have already found the one used.\t\t\t\n      //We're searching for each bpfs mentionned in the parameters until we found the active BPF for this opportunity.\n\n      iteration = 0;\n      var _this = this_1;\n      jsonParametersBPF.bpfs.forEach(function (element) {\n        if (!foundBPF) {\n          iteration++; //Get plural Schema Name of the BPF and the field schema name where we can link to the target record.\n\n          var bpfEntitySchemaName = element.bpfEntitySchemaName;\n          var lookupFieldSchemaName = element.lookupFieldSchemaName; //Trying to retrieve the bpf entity.\n\n          _this.ProcessBusinessProcessFlowStageIdByCurrentRecordId(currentRecordId, bpfEntitySchemaName, lookupFieldSchemaName, iteration, jsonParametersBPF, targetEntityLogicalName, foundBPF);\n        }\n      });\n    };\n\n    var this_1 = this,\n        iteration;\n\n    for (var _i = 0, _a = this._context.parameters.dataSet.sortedRecordIds; _i < _a.length; _i++) {\n      var currentRecordId = _a[_i];\n\n      _loop_1(currentRecordId);\n    }\n\n    alert(\"nb to build:  \" + this._listComponents.length);\n    console.log(\"Count after for records : \" + this._context.parameters.dataSet.sortedRecordIds.length);\n    console.log(\"Count after for container : \" + this._container.childElementCount);\n  };\n\n  BusinessProcessFlowViewer.prototype.GetAllParameters = function () {\n    this._parametersBPF = this._context.parameters.parametersBPF == undefined ? \"\" : this._context.parameters.parametersBPF.raw;\n    this._viewId = this._context.parameters.dataSet.getViewId() == undefined ? \"\" : this._context.parameters.dataSet.getViewId();\n    this._completedColor = this._context.parameters.completedColor == undefined ? \"\" : this._context.parameters.completedColor.raw;\n    this._completedTextColor = this._context.parameters.completedTextColor == undefined ? \"\" : this._context.parameters.completedTextColor.raw;\n    this._activeColor = this._context.parameters.activeColor == undefined ? \"\" : this._context.parameters.activeColor.raw;\n    this._activeTextColor = this._context.parameters.activeTextColor == undefined ? \"\" : this._context.parameters.activeTextColor.raw;\n    this._notActiveColor = this._context.parameters.notActiveColor == undefined ? \"\" : this._context.parameters.notActiveColor.raw;\n    this._notActiveTextColor = this._context.parameters.notActiveTextColor == undefined ? \"\" : this._context.parameters.notActiveTextColor.raw;\n    this._progressTrackLineColor = this._context.parameters.progressTrackLineColor == undefined ? \"\" : this._context.parameters.progressTrackLineColor.raw;\n    this._pulseColor = this._context.parameters.pulseColor == undefined ? \"\" : this._context.parameters.pulseColor.raw;\n  };\n\n  BusinessProcessFlowViewer.prototype.RemoveChildItems = function () {\n    while (this._container.firstChild) {\n      this._container.removeChild(this._container.firstChild);\n    }\n  };\n\n  BusinessProcessFlowViewer.prototype.CheckParameterAreValids = function () {\n    if (this._parametersBPF.length == 0) {\n      console.log(\"[BPFV][INIT] Parameters BPF is empty...\");\n      this.destroy();\n    }\n  };\n\n  BusinessProcessFlowViewer.prototype.InitializeCustomCSSWithParameters = function () {\n    var styleNode = document.createElement('style');\n    styleNode.type = \"text/css\"; //We create style css here because we use some parameters.\n\n    if (this._progressTrackLineColor.length > 0) {\n      var styleText = document.createTextNode('.progress-track' + this._viewId + ' { background-color: ' + this._progressTrackLineColor + '; } ');\n      styleNode.appendChild(styleText);\n    }\n\n    if (this._notActiveColor.length > 0) {\n      var styleText = document.createTextNode('.progress' + this._viewId + ' .progress-step:before { border: 4px solid ' + this._notActiveColor + '; } ');\n      styleNode.appendChild(styleText);\n    }\n\n    if (this._notActiveTextColor.length > 0) {\n      var styleText = document.createTextNode('.is-notactive' + this._viewId + ' { color: ' + this._notActiveTextColor + '; } ');\n      styleNode.appendChild(styleText);\n    }\n\n    if (this._activeColor.length > 0) {\n      if (this._pulseColor && this._pulseColor.length > 0) var styleText = document.createTextNode('.progress' + this._viewId + ' .progress-step.is-active:before { border: 4px solid ' + this._activeColor + '; animation: pulse' + this._viewId + ' 2s infinite; }');else var styleText = document.createTextNode('.progress' + this._viewId + ' .progress-step.is-active:before { border: 4px solid ' + this._activeColor + '; } ');\n      styleNode.appendChild(styleText);\n    }\n\n    if (this._activeTextColor.length > 0) {\n      var styleText = document.createTextNode('.is-active' + this._viewId + ' { color: ' + this._activeTextColor + '; } ');\n      styleNode.appendChild(styleText);\n    }\n\n    if (this._completedTextColor.length > 0) {\n      var styleText = document.createTextNode('.is-complete' + this._viewId + ' { color: ' + this._completedTextColor + '; } ');\n      styleNode.appendChild(styleText);\n    }\n\n    if (this._completedColor.length > 0) {\n      var styleText = document.createTextNode('.progress' + this._viewId + ' .progress-step.is-complete:before { background: ' + this._completedColor + '; } ');\n      styleNode.appendChild(styleText);\n      var styleText = document.createTextNode('.progress' + this._viewId + ' .progress-step.is-complete:after { background: ' + this._completedColor + '; } ');\n      styleNode.appendChild(styleText);\n    }\n\n    if (this._pulseColor && this._pulseColor.length > 0) {\n      var styleText = document.createTextNode(\"@keyframes pulse\" + this._viewId + \" {0% {box-shadow: 0 0 0 0 \" + this.HexToRgba(this._pulseColor, 40) + \" ;} 70% {box-shadow: 0 0 0 10px \" + this.HexToRgba(this._pulseColor, 100) + \";} 100% {box-shadow: 0 0 0 0 \" + this.HexToRgba(this._pulseColor, 100) + \";} }} \");\n      styleNode.appendChild(styleText);\n    }\n\n    document.getElementsByTagName('head')[0].appendChild(styleNode);\n  };\n  /**\r\n   * * This function convert a hex color to an rgba.\r\n   * @param hex : String of the hex color to be used for the pulse animation\r\n   * @param opacity: Opacity for the hex color\r\n   */\n\n\n  BusinessProcessFlowViewer.prototype.HexToRgba = function (hex, opacity) {\n    hex = hex.replace('#', '');\n    var r = parseInt(hex.substring(0, hex.length / 3), 16);\n    var g = parseInt(hex.substring(hex.length / 3, 2 * hex.length / 3), 16);\n    var b = parseInt(hex.substring(2 * hex.length / 3, 3 * hex.length / 3), 16);\n    return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';\n  };\n  /**\r\n   * * This function return a string converted in PascalCase format.\r\n   * @param stringToConvert: String variable to be converted in PascalCase format.\r\n   */\n\n\n  BusinessProcessFlowViewer.prototype.ToPascalCase = function (stringToConvert) {\n    return (\"\" + stringToConvert).replace(new RegExp(/[-_]+/, 'g'), ' ').replace(new RegExp(/[^\\w\\s]/, 'g'), '').replace(new RegExp(/\\s+(.)(\\w+)/, 'g'), function ($1, $2, $3) {\n      return \"\" + ($2.toUpperCase() + $3.toLowerCase());\n    }).replace(new RegExp(/\\s/, 'g'), '').replace(new RegExp(/\\w/), function (s) {\n      return s.toUpperCase();\n    });\n  };\n  /**\r\n   * It is called by the framework prior to a control receiving new data.\r\n   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”\r\n   */\n\n\n  BusinessProcessFlowViewer.prototype.getOutputs = function () {\n    return {};\n  };\n  /**\r\n   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.\r\n   * i.e. cancelling any pending remote calls, removing listeners, etc.\r\n   */\n\n\n  BusinessProcessFlowViewer.prototype.destroy = function () {// Add code to cleanup control if necessary\n  };\n\n  return BusinessProcessFlowViewer;\n}();\n\nexports.BusinessProcessFlowViewer = BusinessProcessFlowViewer;\n\n//# sourceURL=webpack://pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad/./BusinessProcessFlowViewer/index.ts?");

/***/ })

/******/ });
if (window.ComponentFramework && window.ComponentFramework.registerControl) {
	ComponentFramework.registerControl('BusinessProcessFlowViewer.BusinessProcessFlowViewer', pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.BusinessProcessFlowViewer);
} else {
	var BusinessProcessFlowViewer = BusinessProcessFlowViewer || {};
	BusinessProcessFlowViewer.BusinessProcessFlowViewer = pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.BusinessProcessFlowViewer;
	pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = undefined;
}