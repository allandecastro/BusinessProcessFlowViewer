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
		//Get all parameters.
		this.getAllParameters();
		this.checkBPFParameterIsValid();
		// Adding the main table to the container DIV.
		this._container = document.createElement("div");
		container.appendChild(this._container);
		//try to create style for color variable
		this.initializeCustomCSSWithParameters();
	}
	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {

		this._context = context;
		//We make sure that the data set loading is finished.
		if (!context.parameters.dataSet.loading) {
			//We remove all items to make sure that if you perform a refresh, it will not add the records again.
			this.removeChildItems();
			//Parse the Parameters and make sure it contains datas.
			let jsonParametersBPF = JSON.parse(this._parametersBPF);
			if (!jsonParametersBPF || jsonParametersBPF.bpfs == null && jsonParametersBPF.bpfs.length == 0) {
				console.log("[BPFV][UPDATEVIEW] Error : JsonParameters is Empty, ensure to correctly enter the BPF parameters value.");
				return;
			}
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
						}
						else
							if (iteration == jsonParametersBPF.bpfs.length) console.log("\n [BPFV] Don't find the good BPF for : " + currentRecordId + ". You need to add it to the Parameters BPF.");
					}
				});
			}
		}
	}
	private getAllParameters() {
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
	private removeChildItems() {
		while (this._container.firstChild) {
			this._container.removeChild(this._container.firstChild);
		}
	}
	private checkBPFParameterIsValid() {
		if (this._parametersBPF.length == 0) {
			console.log("[BPFV][INIT] Parameters BPF is empty...");
			this.destroy()
		}
	}
	private initializeCustomCSSWithParameters() {
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
			var styleText = document.createTextNode("@keyframes pulse" + this._viewId + " {0% {box-shadow: 0 0 0 0 " + this.hexToRgba(this._pulseColor, 40) + " ;} 70% {box-shadow: 0 0 0 10px " + this.hexToRgba(this._pulseColor, 100) + ";} 100% {box-shadow: 0 0 0 0 " + this.hexToRgba(this._pulseColor, 100) + ";} }} ");
			styleNode.appendChild(styleText);
		}
		document.getElementsByTagName('head')[0].appendChild(styleNode);
	}
	/**
	 * * This function convert a hex color to an rgba.
	 * @param hex : String of the hex color to be used for the pulse animation
	 * @param opacity: Opacity for the hex color 
	 */
	private hexToRgba(hex: string, opacity: number): String {
		hex = hex.replace('#', '');
		var r = parseInt(hex.substring(0, hex.length / 3), 16);
		var g = parseInt(hex.substring(hex.length / 3, 2 * hex.length / 3), 16);
		var b = parseInt(hex.substring(2 * hex.length / 3, 3 * hex.length / 3), 16);

		return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
	}
	/**
	 * * This function query the process stages for a specific process id and return object with an Array with all Stage Name and Stage Unique Identifier.
	 * @param processId: Unique Identifier of the process id. 
	 */
	private getAllBusinessProcessFlowStageByProcessId(processId: string): any {
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
		var req2 = new XMLHttpRequest();
		req2.open("GET", "/api/data/v9.1/processstages?$select=_processid_value,processstageid,stagecategory,stagename,processstageid&$filter=_processid_value eq " + processId + " &$orderby=stagecategory asc", false);
		req2.setRequestHeader("OData-MaxVersion", "4.0");
		req2.setRequestHeader("OData-Version", "4.0");
		req2.setRequestHeader("Accept", "application/json");
		req2.setRequestHeader("Content-Type", "application/json; charset=utf-8");
		req2.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
		req2.onreadystatechange = function () {
			if (this.readyState === 4) {
				req2.onreadystatechange = null;
				if (this.status === 200) {
					var results = JSON.parse(this.response);
					for (var i = 0; i < results.value.length; i++) {
						var stagename = results.value[i]["stagecategory@OData.Community.Display.V1.FormattedValue"];
						var processStageid = results.value[i]["processstageid"];
						stage.push(stagename.toLowerCase());
						processStageId.push(processStageid);
					}
				} else
					console.log("\n [BPFV] Error during getAllBusinessProcessFlowStageByProcessId for process id : " + processId);
			}
		};
		req2.send();
		return datas;
	}
	/**
	 * * This function query the BPF entity and return an Array with the Unique Identifier of the ActiveStage and the Unique Identifier of the Process used.
	 * * Use a XMLHttpRequest and not WebApi because we need to be synchronous. 
	 * @param currentRecordId: Unique Identifier of the opportunity Id
	 * @param entityName: Plural Schema Name of the BPF entity 
	 * @param filterFieldSchemaName: Schema Name of the filter Field
	 */
	private getActiveBusinessProcessFlowStageIdByOpptyId(currentRecordId: string, entityName: string, filterFieldSchemaName: string): Array<string> {

		let activeStage: string[] = new Array();
		var req = new XMLHttpRequest();
		req.open("GET", "/api/data/v9.1/" + entityName + "?$select=_activestageid_value," + filterFieldSchemaName + ",_processid_value&$filter=" + filterFieldSchemaName + " eq " + currentRecordId, false);
		req.setRequestHeader("OData-MaxVersion", "4.0");
		req.setRequestHeader("OData-Version", "4.0");
		req.setRequestHeader("Accept", "application/json");
		req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
		req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
		req.onreadystatechange = function () {
			if (this.readyState === 4) {
				req.onreadystatechange = null;
				if (this.status === 200) {
					var results = JSON.parse(this.response);
					activeStage.push(results.value[0]["_activestageid_value"]);
					activeStage.push(results.value[0]["_processid_value"]);
				} else
					console.log("\n [BPFV] Error during getActiveBusinessProcessFlowStageIdByOpptyId for bpf entity : " + entityName + " for record : " + currentRecordId);
			}
		};
		req.send();
		return activeStage;
	}
	/**
	 * * This function return a string converted in PascalCase format.
	 * @param stringToConvert: String variable to be converted in PascalCase format.
	 */
	private toPascalCase(stringToConvert: string): string {
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