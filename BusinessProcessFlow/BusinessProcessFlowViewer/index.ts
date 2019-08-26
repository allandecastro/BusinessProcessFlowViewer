import { IInputs, IOutputs } from "./generated/ManifestTypes";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class BusinessProcessFlowViewer implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _context: ComponentFramework.Context<IInputs>;
	private _container: HTMLDivElement;
	private _parametersBPF: string;
	private _completedColor: string;
	private _completedTextColor: string;
	private _activeColor: string;
	private _activeTextColor: string;
	private _notActiveColor: string;
	private _notActiveTextColor: string;
	private _progressTrackLineColor: string;
	private _pulseColor: string;
	private _viewId: string;
	// Flag if control view has been rendered
	private _controlViewRendered: Boolean;
	constructor() {

	}
	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		// Add control initialization code
		this._context = context;
		this._container = container;
		this._controlViewRendered = false;
		//Get all parameters.
		this.GetAllParameters();
		this.CheckParameterAreValids();
		// Adding the main table to the container DIV.
		this._container = document.createElement("div");
		container.appendChild(this._container);
		//try to create style for color variable
		this.InitializeCustomCSSWithParameters();
	}
	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {
		if (!this._controlViewRendered) {
			this._controlViewRendered = true;
			this._context = context;
			//We make sure that the data set loading is finished.
			if (!context.parameters.dataSet.loading) {
				//We remove all items to make sure that if you perform a refresh, it will not add the records again.
				this.RemoveChildItems();
				//Parse the Parameters and make sure it contains datas.
				let jsonParametersBPF = JSON.parse(this._parametersBPF);
				if (!jsonParametersBPF || jsonParametersBPF.bpfs == null && jsonParametersBPF.bpfs.length == 0) {
					console.log("[BPFV][UPDATEVIEW] Error : JsonParameters is Empty, ensure to correctly enter the BPF parameters value.");
					return;
				}
				//Start the process for each records in the dataset (subgrid,view...).
				let targetEntityLogicalName: string = context.parameters.dataSet.getTargetEntityType();
				this.ProcessAllRecordsInDataSet(jsonParametersBPF, targetEntityLogicalName);
			}
<<<<<<< Updated upstream
			//Start the process for each records in the dataset (subgrid,view...).

			let thisFunction = this;
			let targetEntityLogicalName: string = context.parameters.dataSet.getTargetEntityType();
			for (let currentRecordId of context.parameters.dataSet.sortedRecordIds) {
				console.log("[BPFV][UPDATEVIEW] Record Id : " + currentRecordId);
				let foundBPF: boolean = false; //Boolean to avoid looking for a BPF when we have already found the one used.			
				//We're searching for each bpfs mentionned in the parameters until we found the active BPF for this opportunity.
				var iteration = 0;
				jsonParametersBPF.bpfs.forEach(function (element: any) {
					if (!foundBPF) {
						iteration++;
						//Get plural Schema Name of the BPF and the field schema name where we can link to the target record.
						let bpfEntityPluralSchemaName: string = element.bpfEntityPluralSchemaName;
						let lookupFieldSchemaName: string = element.lookupFieldSchemaName;
						//Trying to retrieve the bpf entity.
						let stageId: string[] = thisFunction.getActiveBusinessProcessFlowStageIdByOpptyId(currentRecordId, bpfEntityPluralSchemaName, lookupFieldSchemaName);
						if (stageId && stageId.length > 0) 	//If we have something that means it's the BPF used.
						{
							//Building the DOM element...
							let progresDiv: HTMLDivElement = document.createElement("div");
							progresDiv.classList.add("progress");
							progresDiv.classList.add("progress" + thisFunction._viewId);
							progresDiv.setAttribute(targetEntityLogicalName, currentRecordId.toUpperCase());
							let progresTrackDiv: HTMLDivElement = document.createElement("div");
							progresTrackDiv.classList.add("progress-track");
							progresTrackDiv.classList.add("progress-track" + thisFunction._viewId);

							progresDiv.appendChild(progresTrackDiv)
							progresDiv.onclick = function () {
								let entityReference = context.parameters.dataSet.records[currentRecordId].getNamedReference();
								let entityFormOptions = {
									entityName: targetEntityLogicalName,
									entityId: entityReference.id,
									openInNewWindow: true
								}
								console.log("OnCLik :  logical name = " + targetEntityLogicalName + " id = " + currentRecordId);
								context.navigation.openForm(entityFormOptions);
							};
							foundBPF = true; // We set this var to true to stop the foreach loop for this record.
							//Get process Unique Identifier and Active Stage Unique identifier for this BPF instance.
							let activeStageIdCurrentRecord: string = stageId[0];
							let processIdCurrentRecord: string = stageId[1];
							//Retrieve all Stages (name and id) for this BPF.
							let stageProcess = thisFunction.getAllBusinessProcessFlowStageByProcessId(processIdCurrentRecord);
							// ? Maybe useless to stringify because we parse them just after. To be improved.
							let jsonObjectStageId = JSON.stringify(stageProcess.stage.id);
							//Define a variable to know which step is active for this record and this BPF.
							let activeStageFound: boolean = false;
							//Parse all stage id and create cells with name and find the one active.
							JSON.parse(jsonObjectStageId, (key, value) => {
								if (typeof value === 'string') {
									let progresStageDiv: HTMLDivElement = document.createElement("div");
									//+this._viewId
									progresStageDiv.classList.add("progress-step");
									progresStageDiv.classList.add("progress-step" + thisFunction._viewId);
									progresStageDiv.classList.add("is-notactive");
									progresStageDiv.classList.add("is-notactive" + thisFunction._viewId);
									//Test if this is the Active Stage.
									if (value === activeStageIdCurrentRecord) {
										activeStageFound = true;
										console.log("\n [BPFV] Active stage found for " + currentRecordId + " : " + thisFunction.toPascalCase(stageProcess.stage.name[Number(key)]));//cast key an number
										progresStageDiv.classList.add("is-active");
										progresStageDiv.classList.add("is-active" + thisFunction._viewId);
										progresStageDiv.classList.remove("is-notactive");
										progresStageDiv.classList.remove("is-notactive" + thisFunction._viewId);

									}
									//If we haven't find the active stage that means previous stage is completed...or not yet active
									if (!activeStageFound) {
										progresStageDiv.classList.add("is-complete");
										progresStageDiv.classList.add("is-complete" + thisFunction._viewId);
										progresStageDiv.classList.remove("is-notactive");
										progresStageDiv.classList.remove("is-notactive" + thisFunction._viewId);
									}
									console.log("\n [BPFV] Stage : " + thisFunction.toPascalCase(stageProcess.stage.name[Number(key)]) + " / " + value.toUpperCase());
									progresStageDiv.innerText = thisFunction.toPascalCase(stageProcess.stage.name[Number(key)]);
									progresStageDiv.setAttribute("idStage", value.toUpperCase());
									//We add the element to the Div. 
									progresDiv.appendChild(progresStageDiv);
								}
							});
							//Add the element to the container Div.
							thisFunction._container.appendChild(progresDiv);
=======
		}
	}
	public ProcessBusinessProcessFlowStageIdByCurrentRecordId(currentRecordId: string, entityName: string, filterFieldSchemaName: string, iteration: number, jsonParametersBPF: any, targetEntityLogicalName: string, foundBPF: boolean) {

		let activeStage: string[] = new Array();
		var _this = this;
		var str = entityName + "?$select=_activestageid_value," + filterFieldSchemaName + ",_processid_value&$filter=" + filterFieldSchemaName + " eq " + currentRecordId;
		console.log(str);
		this._context.webAPI.retrieveMultipleRecords(entityName, "?$select=_activestageid_value," + filterFieldSchemaName + ",_processid_value&$filter=" + filterFieldSchemaName + " eq " + currentRecordId).then(
			function success(results) {
				console.log("\n [BPFV] ProcessBusinessProcessFlowStageIdByCurrentRecordId CALLBACK  " + currentRecordId);
				if (results.entities.length > 0) {
					activeStage.push(results.entities[0]["_activestageid_value"]);
					activeStage.push(results.entities[0]["_processid_value"]);
				}
				if (activeStage && activeStage.length > 0) 	//If we have something that means it's the BPF used.
				{
					//Building the DOM element...
					let progresDiv: HTMLDivElement = document.createElement("div");
					progresDiv.classList.add("progress");

					progresDiv.classList.add("progress" + _this._viewId);
					progresDiv.setAttribute(targetEntityLogicalName, currentRecordId.toUpperCase());
					let progresTrackDiv: HTMLDivElement = document.createElement("div");
					progresTrackDiv.classList.add("progress-track");
					progresTrackDiv.classList.add("progress-track" + _this._viewId);
					progresDiv.appendChild(progresTrackDiv)
					progresDiv.onclick = function () {
						let entityReference = _this._context.parameters.dataSet.records[currentRecordId].getNamedReference();
						let entityFormOptions = {
							entityName: targetEntityLogicalName,
							entityId: entityReference.id,
							openInNewWindow: true
						}
						console.log("OnCLik :  logical name = " + targetEntityLogicalName + " id = " + currentRecordId);
						_this._context.navigation.openForm(entityFormOptions);
					};
					progresDiv.onmouseover = function () {
						console.log("Hover:  logical name = " + targetEntityLogicalName + " id = " + currentRecordId);
						var card = document.getElementsByClassName(currentRecordId)[0] as HTMLElement;
						card.style.display = "block";
					};
					progresDiv.onmouseout = function () {
						console.log("Hover Out:  logical name = " + targetEntityLogicalName + " id = " + currentRecordId)
						var card = document.getElementsByClassName(currentRecordId)[0] as HTMLElement;
						card.style.display = "none";
					};
					foundBPF = true; // We set this var to true to stop the foreach loop for this record.
					//Get process Unique Identifier and Active Stage Unique identifier for this BPF instance.
					let activeStageIdCurrentRecord: string = activeStage[0];
					let processIdCurrentRecord: string = activeStage[1];
					//Retrieve all Stages (name and id) for this BPF.					
					_this.GetAllBusinessProcessFlowStageByProcessId(processIdCurrentRecord, targetEntityLogicalName, currentRecordId, progresDiv, activeStageIdCurrentRecord);
				}
				else
					if (iteration == jsonParametersBPF.bpfs.length) console.log("\n [BPFV] Don't find the good BPF for : " + currentRecordId + ". You need to add it to the Parameters BPF.");
			},
			function (error) {
				console.log("\n [BPFV] Error during ProcessBusinessProcessFlowStageIdByCurrentRecordId for bpf entity : " + entityName + " for record : " + currentRecordId+" Error : "+error);
			}
		);
	}
	private GetAllBusinessProcessFlowStageByProcessId(processIdCurrentRecord: string, targetEntityLogicalName: string, currentRecordId: string, progresDiv: HTMLDivElement, activeStageIdCurrentRecord: string) {
		//Create Array to contain all Stage Name.
		let stage: string[] = new Array();
		//Create Array to contain all Stage Id.
		let processStageId: string[] = new Array();
		//Create an object to be returned, containing the two array.
		let datas = {
			stage: {
				id: processStageId,
				name: stage
			}
		};
		var _this = this;
		this._context.webAPI.retrieveMultipleRecords("processstage", "?$select=_processid_value,processstageid,stagecategory,stagename&$filter=_processid_value eq " + processIdCurrentRecord + "&$orderby=stagecategory asc").then(
			function success(results) {
				for (var i = 0; i < results.entities.length; i++) {
					var stagename = results.entities[i]["stagecategory@OData.Community.Display.V1.FormattedValue"];
					var processStageid = results.entities[i]["processstageid"];
					stage.push(stagename.toLowerCase());
					processStageId.push(processStageid);
				}
				// ? Maybe useless to stringify because we parse them just after. To be improved.
				let jsonObjectStageId = JSON.stringify(datas.stage.id);
				//Define a variable to know which step is active for this record and this BPF.
				let activeStageFound: boolean = false;
				//Parse all stage id and create cells with name and find the one active.
				JSON.parse(jsonObjectStageId, (key, value) => {
					if (typeof value === 'string') {
						let progresStageDiv: HTMLDivElement = document.createElement("div");
						//+this._viewId
						progresStageDiv.classList.add("progress-step");
						progresStageDiv.classList.add("progress-step" + _this._viewId);
						progresStageDiv.classList.add("is-notactive");
						progresStageDiv.classList.add("is-notactive" + _this._viewId);
						//Test if this is the Active Stage.
						if (value === activeStageIdCurrentRecord) {
							activeStageFound = true;
							console.log("\n [BPFV] Active stage found for " + currentRecordId + " : " + _this.ToPascalCase(datas.stage.name[Number(key)]));//cast key an number
							progresStageDiv.classList.add("is-active");
							progresStageDiv.classList.add("is-active" + _this._viewId);
							progresStageDiv.classList.remove("is-notactive");
							progresStageDiv.classList.remove("is-notactive" + _this._viewId);
						}
						//If we haven't find the active stage that means previous stage is completed...or not yet active
						if (!activeStageFound) {
							progresStageDiv.classList.add("is-complete");
							progresStageDiv.classList.add("is-complete" + _this._viewId);
							progresStageDiv.classList.remove("is-notactive");
							progresStageDiv.classList.remove("is-notactive" + _this._viewId);
>>>>>>> Stashed changes
						}
						console.log("\n [BPFV] Stage : " + _this.ToPascalCase(datas.stage.name[Number(key)]) + " / " + value.toUpperCase());
						progresStageDiv.innerText = _this.ToPascalCase(datas.stage.name[Number(key)]);
						progresStageDiv.setAttribute("idStage", value.toUpperCase());
						//We add the element to the Div. 
						progresDiv.appendChild(progresStageDiv);
					}
				});
				//Add the element to the container Div.
				_this._container.appendChild(progresDiv);

				//test si on fais les cards ou pas
				//_this.GetFieldsValueAndCreateDomCards(targetEntityLogicalName, currentRecordId);


			},
			function (error) {
				console.log("\n [BPFV] Error during getAllBusinessProcessFlowStageByProcessId for process id : " + processIdCurrentRecord);
			}
		);
	}
	private GetFieldsValueAndCreateDomCards(targetEntityLogicalName: string, currentRecordId: string) {

		//Card PART Creation
		let cardDiv: HTMLDivElement = document.createElement("div");
		cardDiv.classList.add("card");
		cardDiv.classList.add(currentRecordId);

		let cardDivHeader: HTMLDivElement = document.createElement("div");
		cardDivHeader.classList.add("cardHeader");
		var _this = this;
		this._context.webAPI.retrieveRecord(targetEntityLogicalName, currentRecordId, "?$select=name,estimatedclosedate,estimatedvalue,modifiedon,_ownerid_value").then(
			function success(result) {
				var estimatedclosedate = result["estimatedclosedate"];
				var estimatedvalue_formatted = result["estimatedvalue@OData.Community.Display.V1.FormattedValue"];
				var modifiedon_formatted = result["modifiedon@OData.Community.Display.V1.FormattedValue"];
				var _ownerid_value_formatted = result["_ownerid_value@OData.Community.Display.V1.FormattedValue"];
				cardDivHeader.innerText = result["name"];

				cardDiv.appendChild(cardDivHeader);

				let cardDivSeparator: HTMLSpanElement = document.createElement("span");
				cardDivSeparator.classList.add("separator");
				cardDiv.appendChild(cardDivSeparator);

				let cardDivContent: HTMLSpanElement = document.createElement("div");
				cardDivContent.classList.add("cardContent");
				cardDiv.appendChild(cardDivContent);

				//pour un field
				let cardDivContentData: HTMLSpanElement = document.createElement("div");
				cardDivContentData.classList.add("cardData");
				cardDivContent.appendChild(cardDivContentData);
				//label et data en span

				let fieldLabel: HTMLSpanElement = document.createElement("span");
				fieldLabel.classList.add("fieldLabel");
				fieldLabel.innerText = "Estimated Value: ";
				cardDivContentData.appendChild(fieldLabel);


				let fieldData: HTMLSpanElement = document.createElement("span");
				fieldData.classList.add("fieldData");
				fieldData.innerText = estimatedvalue_formatted;
				cardDivContentData.appendChild(fieldData);

				//pour un autre  field
				let cardDivContentData2: HTMLSpanElement = document.createElement("div");
				cardDivContentData2.classList.add("cardData");
				cardDivContent.appendChild(cardDivContentData2);

				let fieldLabel2: HTMLSpanElement = document.createElement("span");
				fieldLabel2.classList.add("fieldLabel");
				fieldLabel2.innerText = "Estimated Close Date: ";
				cardDivContentData2.appendChild(fieldLabel2);


				let fieldData2: HTMLSpanElement = document.createElement("span");
				fieldData2.classList.add("fieldData");
				fieldData2.innerText = estimatedclosedate;
				cardDivContentData2.appendChild(fieldData2);

				//un aute
				let cardDivContentData3: HTMLSpanElement = document.createElement("div");
				cardDivContentData3.classList.add("cardData");
				cardDivContent.appendChild(cardDivContentData3);

				let fieldLabel3: HTMLSpanElement = document.createElement("span");
				fieldLabel3.classList.add("fieldLabel");
				fieldLabel3.innerText = "Last modification: ";
				cardDivContentData3.appendChild(fieldLabel3);


				let fieldData3: HTMLSpanElement = document.createElement("span");
				fieldData3.classList.add("fieldData");
				fieldData3.innerText = modifiedon_formatted;
				cardDivContentData3.appendChild(fieldData3);
				//aute
				let cardDivContentData4: HTMLSpanElement = document.createElement("div");
				cardDivContentData4.classList.add("cardData");
				cardDivContent.appendChild(cardDivContentData4);

				let fieldLabel4: HTMLSpanElement = document.createElement("span");
				fieldLabel4.classList.add("fieldLabel");
				fieldLabel4.innerText = "Owner: ";
				cardDivContentData4.appendChild(fieldLabel4);


				let fieldData5: HTMLSpanElement = document.createElement("span");
				fieldData5.classList.add("fieldData");
				fieldData5.innerText = _ownerid_value_formatted;
				cardDivContentData4.appendChild(fieldData5);
				_this._container.appendChild(cardDiv);
				;
			},
			function (error) {
				console.log("\n [BPFV] Error during GetFieldsValueAndCreateDomCards for record id : " + currentRecordId);
			}
		);
	}
	private ProcessAllRecordsInDataSet(jsonParametersBPF: any, targetEntityLogicalName: string) {
		for (let currentRecordId of this._context.parameters.dataSet.sortedRecordIds) {
			console.log("[BPFV][UPDATEVIEW] Record Id : " + currentRecordId);
		
			let foundBPF: boolean = false; //Boolean to avoid looking for a BPF when we have already found the one used.			
			//We're searching for each bpfs mentionned in the parameters until we found the active BPF for this opportunity.
			var iteration = 0;
			let _this = this;
			jsonParametersBPF.bpfs.forEach(function (element: any) {
				if (!foundBPF) {
					iteration++;
					//Get plural Schema Name of the BPF and the field schema name where we can link to the target record.
					let bpfEntitySchemaName: string = element.bpfEntitySchemaName;
					let lookupFieldSchemaName: string = element.lookupFieldSchemaName;
					//Trying to retrieve the bpf entity.
					_this.ProcessBusinessProcessFlowStageIdByCurrentRecordId(currentRecordId, bpfEntitySchemaName, lookupFieldSchemaName, iteration, jsonParametersBPF, targetEntityLogicalName, foundBPF);
				}
			});
		}
	}
	private GetAllParameters() {
		this._parametersBPF = this._context.parameters.parametersBPF == undefined ? "" : this._context.parameters.parametersBPF.raw;
		this._viewId = this._context.parameters.dataSet.getViewId() == undefined ? "" : this._context.parameters.dataSet.getViewId();
		this._completedColor = this._context.parameters.completedColor == undefined ? "" : this._context.parameters.completedColor.raw;
		this._completedTextColor = this._context.parameters.completedTextColor == undefined ? "" : this._context.parameters.completedTextColor.raw;
		this._activeColor = this._context.parameters.activeColor == undefined ? "" : this._context.parameters.activeColor.raw;
		this._activeTextColor = this._context.parameters.activeTextColor == undefined ? "" : this._context.parameters.activeTextColor.raw;
		this._notActiveColor = this._context.parameters.notActiveColor == undefined ? "" : this._context.parameters.notActiveColor.raw;
		this._notActiveTextColor = this._context.parameters.notActiveTextColor == undefined ? "" : this._context.parameters.notActiveTextColor.raw;
		this._progressTrackLineColor = this._context.parameters.progressTrackLineColor == undefined ? "" : this._context.parameters.progressTrackLineColor.raw;
		this._pulseColor = this._context.parameters.pulseColor == undefined ? "" : this._context.parameters.pulseColor.raw;

	}
	private RemoveChildItems() {
		while (this._container.firstChild) {
			this._container.removeChild(this._container.firstChild);
		}
	}
	private CheckParameterAreValids() {
		if (this._parametersBPF.length == 0) {
			console.log("[BPFV][INIT] Parameters BPF is empty...");
			this.destroy();
		}
	}
	private InitializeCustomCSSWithParameters() {
		var styleNode = document.createElement('style');
		styleNode.type = "text/css";
		//We create style css here because we use some parameters.
		if (this._progressTrackLineColor.length > 0) {
			var styleText = document.createTextNode('.progress-track' + this._viewId + ' { background-color: ' + this._progressTrackLineColor + '; } ');
			styleNode.appendChild(styleText);
		}
		if (this._notActiveColor.length > 0) {
			var styleText = document.createTextNode('.progress' + this._viewId + ' .progress-step:before { border: 4px solid ' + this._notActiveColor + '; } ');
			styleNode.appendChild(styleText);
		}
		if (this._notActiveTextColor.length > 0) {
			var styleText = document.createTextNode('.is-notactive' + this._viewId + ' { color: ' + this._notActiveTextColor + '; } ');
			styleNode.appendChild(styleText);
		}

		if (this._activeColor.length > 0) {
			if (this._pulseColor && this._pulseColor.length > 0)
				var styleText = document.createTextNode('.progress' + this._viewId + ' .progress-step.is-active:before { border: 4px solid ' + this._activeColor + '; animation: pulse' + this._viewId + ' 2s infinite; }');
			else
				var styleText = document.createTextNode('.progress' + this._viewId + ' .progress-step.is-active:before { border: 4px solid ' + this._activeColor + '; } ');
			styleNode.appendChild(styleText);
		}
		if (this._activeTextColor.length > 0) {
			var styleText = document.createTextNode('.is-active' + this._viewId + ' { color: ' + this._activeTextColor + '; } ');
			styleNode.appendChild(styleText);
		}
		if (this._completedTextColor.length > 0) {
			var styleText = document.createTextNode('.is-complete' + this._viewId + ' { color: ' + this._completedTextColor + '; } ');
			styleNode.appendChild(styleText);
		}
		if (this._completedColor.length > 0) {
			var styleText = document.createTextNode('.progress' + this._viewId + ' .progress-step.is-complete:before { background: ' + this._completedColor + '; } ');
			styleNode.appendChild(styleText);
			var styleText = document.createTextNode('.progress' + this._viewId + ' .progress-step.is-complete:after { background: ' + this._completedColor + '; } ');
			styleNode.appendChild(styleText);
		}
		if (this._pulseColor && this._pulseColor.length > 0) {
			var styleText = document.createTextNode("@keyframes pulse" + this._viewId + " {0% {box-shadow: 0 0 0 0 " + this.HexToRgba(this._pulseColor, 40) + " ;} 70% {box-shadow: 0 0 0 10px " + this.HexToRgba(this._pulseColor, 100) + ";} 100% {box-shadow: 0 0 0 0 " + this.HexToRgba(this._pulseColor, 100) + ";} }} ");
			styleNode.appendChild(styleText);
		}
		document.getElementsByTagName('head')[0].appendChild(styleNode);
	}
	/**
	 * * This function convert a hex color to an rgba.
	 * @param hex : String of the hex color to be used for the pulse animation
	 * @param opacity: Opacity for the hex color 
	 */
	private HexToRgba(hex: string, opacity: number): String {
		hex = hex.replace('#', '');
		var r = parseInt(hex.substring(0, hex.length / 3), 16);
		var g = parseInt(hex.substring(hex.length / 3, 2 * hex.length / 3), 16);
		var b = parseInt(hex.substring(2 * hex.length / 3, 3 * hex.length / 3), 16);

		return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
	}

	/**
	 * * This function return a string converted in PascalCase format.
	 * @param stringToConvert: String variable to be converted in PascalCase format.
	 */
	private ToPascalCase(stringToConvert: string): string {
		return `${stringToConvert}`
			.replace(new RegExp(/[-_]+/, 'g'), ' ')
			.replace(new RegExp(/[^\w\s]/, 'g'), '')
			.replace(
				new RegExp(/\s+(.)(\w+)/, 'g'),
				($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
			)
			.replace(new RegExp(/\s/, 'g'), '')
			.replace(new RegExp(/\w/), s => s.toUpperCase());
	}
	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs {
		return {};
	}
	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
		// Add code to cleanup control if necessary
	}
}

