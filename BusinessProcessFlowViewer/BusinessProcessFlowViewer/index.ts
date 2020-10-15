import { IInputs, IOutputs } from "./generated/ManifestTypes";
interface Bpf {
	bpfEntitySchemaName: string;
	lookupFieldSchemaName: string;
}

interface BusinessProcessFlowJson {
	bpfs: Bpf[];
}

export class BusinessProcessFlowViewer implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private _context: ComponentFramework.Context<IInputs>;
	private _container: HTMLDivElement;
	private _parametersBPF: string;
	private _stageOrCategory: string;
	private _completedColor: string;
	private _completedTextColor: string;
	private _activeColor: string;
	private _activeTextColor: string;
	private _notActiveColor: string;
	private _notActiveTextColor: string;
	private _progressTrackLineColor: string;
	private _pulseColor: string;
	private _displayEntityName: string;
	private _viewId: string;
	private _listComponents: Array<number | HTMLDivElement>[] = new Array();
	private _numberOfRecords: number;
	private _controlViewRendered: Boolean; // Flag if control view has been rendered

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
		//Initialize Parameters.
		this.initializeParameters();
		this.checkBpfParameterIsValid();
		// Adding the main div to the default container.
		this._container = document.createElement("div");
		container.appendChild(this._container);
		//Initialize Customm CSS based on Parameters.
		this.initializeCustomCssWithParameters();
		debugger;
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
			this.removeChildItems();
			//Parse the Parameters and make sure it contains datas.
			let jsonParametersBPF: BusinessProcessFlowJson = JSON.parse(this._parametersBPF);
			if (!jsonParametersBPF || jsonParametersBPF.bpfs == null || jsonParametersBPF.bpfs.length == 0) {
				console.log("[BPFV][UPDATEVIEW] Error : JsonParameters is Empty, ensure to correctly enter the BPF parameters value.");
				return;
			}
			//Start the process for each records in the dataset (subgrid,view...).
			this.processAllRecordsInDataSet(jsonParametersBPF);
		}
	}
	/**
	 * Function to start the process for each records in the dataset.
	 * @param jsonParametersBPF JsonObject with all parameters to be used.
	 */
	private processAllRecordsInDataSet(jsonParametersBPF: BusinessProcessFlowJson) {
		var order: number = 1; // Used to keep the order of the records.
		this._numberOfRecords = this._context.parameters.dataSet.sortedRecordIds.length;
		this._context.parameters.dataSet.sortedRecordIds.forEach((currentRecordId) => {
			let entityReference: ComponentFramework.EntityReference = this._context.parameters.dataSet.records[currentRecordId].getNamedReference();
			let foundBPF: boolean = false; //Boolean to avoid looking for a BPF when we have already found the one used.			
			//We're searching for each bpfs mentionned in the parameters until we found the active BPF for this opportunity.
			var bpfIteration = 0;
			for (let bpf of jsonParametersBPF.bpfs) {
				if (!foundBPF) {
					bpfIteration++;
					//Get Schema Name of the BPF and the field schema name where we can link to the target record.
					let bpfEntitySchemaName: string = bpf.bpfEntitySchemaName;
					let lookupFieldSchemaName: string = bpf.lookupFieldSchemaName;
					//Trying to retrieve the bpf entity.									
					this.processBusinessProcessFlowStageIdByCurrentRecordId(entityReference, currentRecordId, bpfEntitySchemaName, lookupFieldSchemaName, bpfIteration, jsonParametersBPF, foundBPF, order);
				}
			}
			order++;
		})
	}
	/**
	 * Method used to Process a record and retrieve the good BPF.
	 * @param currentRecordId Unique identifier of the current record.
	 * @param bpfEntitySchemaName Schema Name of the BPF entity.
	 * @param filterFieldSchemaName Schema Name of field on the bpf entity where we can link to the target record.
	 * @param bpfIteration Used to indicate in console if we didn't find any bfp entity correspondign to bpf parameters.
	 * @param jsonParametersBPF JsonObject with all parameters to be used.
	 * @param foundBPF 
	 * @param order Number to indicate initial records order
	 */
	private async processBusinessProcessFlowStageIdByCurrentRecordId(entityReference: ComponentFramework.EntityReference, currentRecordId: string, bpfEntitySchemaName: string, filterFieldSchemaName: string, bpfIteration: number, jsonParametersBPF: BusinessProcessFlowJson, foundBPF: boolean, order: number) {

		let activeStage: string[] = new Array();
		let searchQuery: string = "?$select=_activestageid_value," + filterFieldSchemaName + ",_processid_value&$filter=" + filterFieldSchemaName + " eq " + currentRecordId;
		try {

			let result: ComponentFramework.WebApi.RetrieveMultipleResponse = await this._context.webAPI.retrieveMultipleRecords(bpfEntitySchemaName, searchQuery);
			if (result && result.entities.length > 0) {
				foundBPF = true; // We set this var to true to stop the foreach loop for this record.
				let bpfEntity: ComponentFramework.WebApi.Entity = result.entities[0];
				activeStage.push(bpfEntity["_activestageid_value"]);
				activeStage.push(bpfEntity["_processid_value"]);
				//If we have something that means it's the BPF used
				//Building the DOM element...
				let divContainer: HTMLDivElement = document.createElement("div");
				if (this._displayEntityName === "0") {
					divContainer.classList.add("divContainer");
					let divNameField: HTMLDivElement = document.createElement("div");
					divNameField.classList.add("fieldName");
					divNameField.innerText = entityReference.name;
					divContainer.appendChild(divNameField);
				}

				divContainer.addEventListener("click", () => {
					let entityFormOptions = {
						//@ts-ignore
						//Added this ts-ignore due to a bug of the FrameWork
						entityName: entityReference.etn || entityReference.entityType,
						entityId: entityReference.id.toString(),
						openInNewWindow: true
					}
					this._context.navigation.openForm(entityFormOptions);
				});
				let progresDiv: HTMLDivElement = document.createElement("div");
				progresDiv.classList.add("progress");
				progresDiv.classList.add("progress" + this._viewId);
				let progresTrackDiv: HTMLDivElement = document.createElement("div");
				progresTrackDiv.classList.add("progress-track");
				progresTrackDiv.classList.add("progress-track" + this._viewId);
				progresDiv.appendChild(progresTrackDiv)
				//Get process Unique Identifier and Active Stage Unique identifier for this BPF instance.
				let activeStageIdCurrentRecord: string = activeStage[0];
				let processIdCurrentRecord: string = activeStage[1];
				//Retrieve all Stages (name and id) for this BPF.					
				await this.getAllBusinessProcessFlowStageByProcessId(processIdCurrentRecord, divContainer, progresDiv, activeStageIdCurrentRecord, order);
			}
			else
				if (bpfIteration == jsonParametersBPF.bpfs.length) console.log("\n [BPFV] Don't find the good BPF for : " + currentRecordId + ". You need to add it to the Parameters BPF.");
		}
		catch (error) {
			console.log("\n [BPFV] Error during ProcessBusinessProcessFlowStageIdByCurrentRecordId for bpf entity : " + bpfEntitySchemaName + " for record : " + currentRecordId + " with error: " + error);
		}
	}
	/**
	 * 
	 * @param processIdCurrentRecord Unique identifier of the process used by this record.
	 * @param currentRecordId  Unique identifier of the current record.
	 * @param progresDiv DOM Element for this record.
	 * @param activeStageIdCurrentRecord Unique identifier of the active stage id for this record.
	 * @param order  Number to indicate initial records order.
	 */
	private async getAllBusinessProcessFlowStageByProcessId(processIdCurrentRecord: string, divContainer: HTMLDivElement, progresDiv: HTMLDivElement, activeStageIdCurrentRecord: string, order: number) {
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
		try {

			const searchQuery = "?$select=_processid_value,processstageid,stagecategory,stagename&$filter=_processid_value eq " + processIdCurrentRecord + "&$orderby=stagecategory asc";
			let result: ComponentFramework.WebApi.RetrieveMultipleResponse = await this._context.webAPI.retrieveMultipleRecords("processstage", searchQuery);
			if (result && result.entities.length > 0) {
				let fieldToDisplay: string;
				if (this._stageOrCategory === "0")
					fieldToDisplay = "stagename";
				else
					fieldToDisplay = "stagecategory@OData.Community.Display.V1.FormattedValue";
				result.entities.forEach(item => {
					var stagename: string = item[fieldToDisplay];
					var processStageid: string = item["processstageid"];
					stage.push(stagename);
					processStageId.push(processStageid);
				})
				let jsonObjectStageId: string = JSON.stringify(datas.stage.id);
				//Define a variable to know which step is active for this record and this BPF.
				let activeStageFound: boolean = false;
				//Parse all stage id and create cells with name and find the one active.
				JSON.parse(jsonObjectStageId, (key, value) => {
					let progresStageDiv: HTMLDivElement = document.createElement("div");
					progresStageDiv.classList.add("progress-step");
					progresStageDiv.classList.add("progress-step" + this._viewId);
					progresStageDiv.classList.add("is-notactive");
					progresStageDiv.classList.add("is-notactive" + this._viewId);
					//Test if this is the Active Stage.
					if (value === activeStageIdCurrentRecord) {
						activeStageFound = true;
						progresStageDiv.classList.add("is-active");
						progresStageDiv.classList.add("is-active" + this._viewId);
						progresStageDiv.classList.remove("is-notactive");
						progresStageDiv.classList.remove("is-notactive" + this._viewId);
					}
					//If we haven't find the active stage that means previous stage is completed...or not yet active!
					if (!activeStageFound) {
						progresStageDiv.classList.add("is-complete");
						progresStageDiv.classList.add("is-complete" + this._viewId);
						progresStageDiv.classList.remove("is-notactive");
						progresStageDiv.classList.remove("is-notactive" + this._viewId);
					}
					progresStageDiv.innerText = datas.stage.name[Number(key)];
					//We add the element to the Div. 
					progresDiv.appendChild(progresStageDiv);
				});
				divContainer.appendChild(progresDiv);
				//Add the element to the array.
				let elementToAdd: (number | HTMLDivElement)[] = [order, divContainer]
				this._listComponents.push(elementToAdd);
				// When we have gone through all the records we add them to the container
				if (this._numberOfRecords == this._listComponents.length) {
					this._listComponents.sort().forEach((value) => {
						this._container.appendChild(value[1] as HTMLDivElement);
					})
				}
			}
		}
		catch (error) {
			console.log("\n [BPFV] Error during GetAllBusinessProcessFlowStageByProcessId for process id : " + processIdCurrentRecord + " with error: " + error);
		}
	}
	/**
	 * Used to get all parameters.
	 */
	private initializeParameters() {
		this._parametersBPF = this._context.parameters.parametersBPF.raw ? this._context.parameters.parametersBPF.raw : "";
		this._stageOrCategory = this._context.parameters.stageOrCategory.raw;
		this._viewId = this._context.parameters.dataSet.getViewId() ? this._context.parameters.dataSet.getViewId() : "";
		this._completedColor = this._context.parameters.completedColor.raw ? this._context.parameters.completedColor.raw : "";
		this._completedTextColor = this._context.parameters.completedTextColor.raw ? this._context.parameters.completedTextColor.raw : "";
		this._activeColor = this._context.parameters.activeColor.raw ? this._context.parameters.activeColor.raw : "";
		this._activeTextColor = this._context.parameters.activeTextColor.raw ? this._context.parameters.activeTextColor.raw : "";
		this._notActiveColor = this._context.parameters.notActiveColor.raw ? this._context.parameters.notActiveColor.raw : "";
		this._notActiveTextColor = this._context.parameters.notActiveTextColor.raw ? this._context.parameters.notActiveTextColor.raw : "";
		this._progressTrackLineColor = this._context.parameters.progressTrackLineColor.raw ? this._context.parameters.progressTrackLineColor.raw : "";
		this._pulseColor = this._context.parameters.pulseColor.raw ? this._context.parameters.pulseColor.raw : "";
		this._displayEntityName = this._context.parameters.displayEntityName.raw;
	}
	/**
	 * Used to remove child dom element.
	 */
	private removeChildItems() {
		while (this._container.firstChild) {
			this._container.removeChild(this._container.firstChild);
		}
	}
	/**
	 * Used to ensure that the  parameter "Parameters BPF" is not empty or destroy the PCF.
	 */
	private checkBpfParameterIsValid() {
		if (this._parametersBPF.length == 0) {
			console.log("[BPFV][INIT] Parameters BPF is empty...");
			this.destroy();
		}
	}
	/**
	 * Used to create css for this PCF instance.
	 */
	private initializeCustomCssWithParameters() {
		var styleNode = document.createElement('style');
		styleNode.type = "text/css";
		//We create style css here because we use some parameters.
		if (this._progressTrackLineColor.length > 0) {
			var styleText: Text = document.createTextNode('.progress-track' + this._viewId + ' { background-color: ' + this._progressTrackLineColor + '; } ');
			styleNode.appendChild(styleText);
		}
		if (this._notActiveColor.length > 0) {
			var styleText: Text = document.createTextNode('.progress' + this._viewId + ' .progress-step:before { border: 4px solid ' + this._notActiveColor + '; } ');
			styleNode.appendChild(styleText);
		}
		if (this._notActiveTextColor.length > 0) {
			var styleText: Text = document.createTextNode('.is-notactive' + this._viewId + ' { color: ' + this._notActiveTextColor + '; } ');
			styleNode.appendChild(styleText);
		}

		if (this._activeColor.length > 0) {
			if (this._pulseColor && this._pulseColor.length > 0)
				var styleText: Text = document.createTextNode('.progress' + this._viewId + ' .progress-step.is-active:before { border: 4px solid ' + this._activeColor + '; animation: pulse' + this._viewId + ' 2s infinite; }');
			else
				var styleText: Text = document.createTextNode('.progress' + this._viewId + ' .progress-step.is-active:before { border: 4px solid ' + this._activeColor + '; } ');
			styleNode.appendChild(styleText);
		}
		if (this._activeTextColor.length > 0) {
			var styleText: Text = document.createTextNode('.is-active' + this._viewId + ' { color: ' + this._activeTextColor + '; } ');
			styleNode.appendChild(styleText);
		}
		if (this._completedTextColor.length > 0) {
			var styleText: Text = document.createTextNode('.is-complete' + this._viewId + ' { color: ' + this._completedTextColor + '; } ');
			styleNode.appendChild(styleText);
		}
		if (this._completedColor.length > 0) {
			var styleText: Text = document.createTextNode('.progress' + this._viewId + ' .progress-step.is-complete:before { background: ' + this._completedColor + '; } ');
			styleNode.appendChild(styleText);
			var styleText: Text = document.createTextNode('.progress' + this._viewId + ' .progress-step.is-complete:after { background: ' + this._completedColor + '; } ');
			styleNode.appendChild(styleText);
		}
		if (this._pulseColor && this._pulseColor.length > 0) {
			var styleText: Text = document.createTextNode("@keyframes pulse" + this._viewId + " {0% {box-shadow: 0 0 0 0 " + this.hexToRgba(this._pulseColor, 40) + " ;} 70% {box-shadow: 0 0 0 10px " + this.hexToRgba(this._pulseColor, 100) + ";} 100% {box-shadow: 0 0 0 0 " + this.hexToRgba(this._pulseColor, 100) + ";} }} ");
			styleNode.appendChild(styleText);
		}
		document.getElementsByTagName('head')[0].appendChild(styleNode);
	}
	/**
	 *  This function convert a hex color to an rgba.
	 * @param hex : String of the hex color to be used for the pulse animation
	 * @param opacity: Opacity for the hex color 
	 */
	private hexToRgba(hex: string, opacity: number): String {
		hex = hex.replace('#', '');
		let r = parseInt(hex.substring(0, hex.length / 3), 16);
		let g = parseInt(hex.substring(hex.length / 3, 2 * hex.length / 3), 16);
		let b = parseInt(hex.substring(2 * hex.length / 3, 3 * hex.length / 3), 16);

		return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
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

