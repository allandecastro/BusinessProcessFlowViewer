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
	private _listComponents: Array<number | HTMLDivElement>[] = new Array();
	private _numberOfRecords: number;
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
		//We make sure that the data set loading is finished.
		if (!this._controlViewRendered && !context.parameters.dataSet.loading) {
			this._controlViewRendered = true;
			this._context = context;
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
	}
	private ProcessAllRecordsInDataSet(jsonParametersBPF: any, targetEntityLogicalName: string) {
		var order = 1;
		this._numberOfRecords = this._context.parameters.dataSet.sortedRecordIds.length;
		console.log("Number Of Records :  " + this._numberOfRecords);
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
					_this.ProcessBusinessProcessFlowStageIdByCurrentRecordId(currentRecordId, bpfEntitySchemaName, lookupFieldSchemaName, iteration, jsonParametersBPF, targetEntityLogicalName, foundBPF, order);
				}
			});
			order++;
		}
	}
	private ProcessBusinessProcessFlowStageIdByCurrentRecordId(currentRecordId: string, entityName: string, filterFieldSchemaName: string, iteration: number, jsonParametersBPF: any, targetEntityLogicalName: string, foundBPF: boolean, order: number) {

		let activeStage: string[] = new Array();
		var _this = this;

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
						_this._context.navigation.openForm(entityFormOptions);
					};
					progresDiv.onmouseover = function () {
						var card = document.getElementsByClassName(currentRecordId)[0] as HTMLElement;
						card.style.display = "block";
					};
					progresDiv.onmouseout = function () {
						var card = document.getElementsByClassName(currentRecordId)[0] as HTMLElement;
						card.style.display = "none";
					};
					foundBPF = true; // We set this var to true to stop the foreach loop for this record.
					//Get process Unique Identifier and Active Stage Unique identifier for this BPF instance.
					let activeStageIdCurrentRecord: string = activeStage[0];
					let processIdCurrentRecord: string = activeStage[1];
					//Retrieve all Stages (name and id) for this BPF.					
					_this.GetAllBusinessProcessFlowStageByProcessId(processIdCurrentRecord, targetEntityLogicalName, currentRecordId, progresDiv, activeStageIdCurrentRecord, order);
				}
				else
					if (iteration == jsonParametersBPF.bpfs.length) console.log("\n [BPFV] Don't find the good BPF for : " + currentRecordId + ". You need to add it to the Parameters BPF.");
			},
			function (error) {
				console.log("\n [BPFV] Error during ProcessBusinessProcessFlowStageIdByCurrentRecordId for bpf entity : " + entityName + " for record : " + currentRecordId);
			}
		);
	}
	private GetAllBusinessProcessFlowStageByProcessId(processIdCurrentRecord: string, targetEntityLogicalName: string, currentRecordId: string, progresDiv: HTMLDivElement, activeStageIdCurrentRecord: string, order: number) {
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
						}
						console.log("\n [BPFV] Stage : " + _this.ToPascalCase(datas.stage.name[Number(key)]) + " / " + value.toUpperCase());
						progresStageDiv.innerText = _this.ToPascalCase(datas.stage.name[Number(key)]);
						progresStageDiv.setAttribute("idStage", value.toUpperCase());
						//We add the element to the Div. 
						progresDiv.appendChild(progresStageDiv);
					}
				});
				//Add the element to the container Div.
				var test = [order, progresDiv]
				_this._listComponents.push(test);
				console.log("param array:  " + _this._listComponents);
				if (_this._numberOfRecords == _this._listComponents.length) {
					//add to container
					_this._listComponents.sort().forEach((value) => {
						console.log("sort value 0 : " + value[0] + "value 1:  " + value[1]);
						_this._container.appendChild(value[1] as HTMLDivElement);

					})
				}
			},
			function (error) {
				console.log("\n [BPFV] Error during getAllBusinessProcessFlowStageByProcessId for process id : " + processIdCurrentRecord);
			}
		);
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

