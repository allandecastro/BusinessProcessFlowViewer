import { IInputs, IOutputs } from "./generated/ManifestTypes";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class BusinessProcessFlowViewer implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _context: ComponentFramework.Context<IInputs>;
	private _container: HTMLDivElement;
	private _parametersBPF: string;

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
		//this._context.mode.trackContainerResize(true);
		
		this._container = document.createElement("div");
		this._parametersBPF = this._context.parameters.parametersBPF.raw;
		if (this._parametersBPF.length == 0)
			console.log("[BPFV][INIT] Parameters BPF is empty...");
		// Adding the main table to the container DIV.
		container.appendChild(this._container);
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
			while (this._container.firstChild) {
				this._container.removeChild(this._container.firstChild);
			}
			//Parse the Parameters and make sure it contains datas.
			let jsonParametersBPF = JSON.parse(this._parametersBPF);
			if  (!jsonParametersBPF || jsonParametersBPF.bpfs == null && jsonParametersBPF.bpfs.length == 0) {
				console.log("[BPFV][UPDATEVIEW] Error : JsonParameters is Empty, ensure to correctly enter the BPF parameters value.");
				return;
			}
			//Start the process for each records in the dataset (subgrid,view...).
			let thisFunction=this;
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
							progresDiv.setAttribute("opportunityId", currentRecordId.toUpperCase());
							let progresTrackDiv: HTMLDivElement = document.createElement("div");
							progresTrackDiv.classList.add("progress-track");
							progresDiv.appendChild(progresTrackDiv);							
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
									progresStageDiv.classList.add("progress-step");
									progresStageDiv.classList.add("is-notactive");
									//Test if this is the Active Stage.
									if (value === activeStageIdCurrentRecord) {
										activeStageFound = true;
										console.log("\n [BPFV] Active stage found for " + currentRecordId + " : " + thisFunction.toPascalCase(stageProcess.stage.name[Number(key)]));//cast key an number
										progresStageDiv.classList.add("is-active");
										progresStageDiv.classList.remove("is-notactive");
									}
									//If we haven't find the active stage that means previous stage is completed...or not yet active
									if (!activeStageFound)
									{
										progresStageDiv.classList.add("is-complete");
										progresStageDiv.classList.remove("is-notactive");
									} 								
									console.log("\n [BPFV] Stage : " +thisFunction.toPascalCase(stageProcess.stage.name[Number(key)])+" / "+ value.toUpperCase());
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
							if (iteration == jsonParametersBPF.bpfs.length) console.log("\n [BPFV] Don't find the good BPF for : " + currentRecordId+". You need to add it to the Parameters BPF.");
					}
				});
			}
		}
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