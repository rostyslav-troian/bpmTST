Terrasoft.configuration.Structures["ActivityConditionalSequenceFlowEditPage"] = {innerHierarchyStack: ["ActivityConditionalSequenceFlowEditPage"]};
define('ActivityConditionalSequenceFlowEditPageStructure', ['ActivityConditionalSequenceFlowEditPageResources'], function(resources) {return {schemaUId:'6240cce7-b2bd-48a6-afee-672534031112',schemaCaption: "ActivityConditionalSequenceFlowEditPage", parentSchemaName: "", schemaName:'ActivityConditionalSequenceFlowEditPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * ConditionalSequenceFlow edit page schema.
 * Parent: BaseProcessSchemaElementPropertiesPage
 */
define("ActivityConditionalSequenceFlowEditPage", ["terrasoft", "ActivityConditionalSequenceFlowEditPageResources"
], function(Terrasoft, resources) {
	return {
		messages: {
			/**
			 * @message ProcessActivitiesSelectedResultsChanged
			 * Publish selected results of ConditionalSequenceFlow element.
			 */
			"ProcessActivitiesSelectedResultsChanged": {
				"direction": Terrasoft.MessageDirectionType.PUBLISH,
				"mode": Terrasoft.MessageMode.PTP
			},

			/**
			 * @message GetConditionalSequenceFlowData
			 * Request previous ProcessActivity and conditions for designer ConditionalSequenceFlow.
			 */
			"GetConditionalSequenceFlowData": {
				"direction": Terrasoft.MessageDirectionType.PUBLISH,
				"mode": Terrasoft.MessageMode.PTP
			}
		},
		attributes: {
			/**
			 * Collection of possible results for conditional sequence flow.
			 * @type {Terrasoft.ViewModelCollection}
			 */
			ProcessActivityResultsCollection: {
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},

			/**
			 * Selected results for conditional sequence flow. Key - ProcessActivity uId, value - object of
			 * key-value pairs conditions.
			 * @type {Object}
			 */
			SelectedResults: {
				dataValueType: Terrasoft.DataValueType.OBJECT
			},

			/**
			 * Label caption for edit page.
			 * @type {String}
			 */
			ProcessActivitiesResultsCaption: {
				dataValueType: Terrasoft.DataValueType.TEXT
			}
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * Request previous ProcessActivity element, designed conditions and edit page schema name for
			 * ProcessActivity.
			 * @overridden
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					var activityResultsCollection = this.Ext.create("Terrasoft.BaseViewModelCollection");
					activityResultsCollection.on("itemChanged", this.onActivityResultChanged, this);
					this.set("ProcessActivityResultsCollection", activityResultsCollection);
					var sandbox = this.sandbox;
					var sequenceFlowData = sandbox.publish("GetConditionalSequenceFlowData",
						null, [sandbox.id]);
					var processActivity = sequenceFlowData.processActivityElement;
					var selectedResults = sequenceFlowData.selectedResults;
					this.set("ProcessActivity", processActivity);
					this.set("SelectedResults", selectedResults);
					var processActivitiesResultsCaption =
						this.getProcessActivitiesResultsCaption(processActivity);
					this.set("ProcessActivitiesResultsCaption", processActivitiesResultsCaption);
					this.loadActivityResultsCollection(sequenceFlowData.resultParameterValues, selectedResults);
					this.onActivityResultChanged();
					callback.call(scope);
				}, this]);
			},

			/**
			 * For each possible process activity result parameter value creates view model, initialize it by
			 * condition designed before and adds to ProcessActivityResultsCollection.
			 * @param {Object} resultParameterValues Key-value pairs of possible result parameter values.
			 * @param {Object} selectedResults Conditions designed before.
			 */
			loadActivityResultsCollection: function(resultParameterValues, selectedResults) {
				var activityResultsCollection = this.get("ProcessActivityResultsCollection");
				var processActivity = this.get("ProcessActivity");
				var collection = Ext.create("Terrasoft.Collection");
				var results = selectedResults[processActivity.uId] || [];
				Terrasoft.each(resultParameterValues, function(caption, uId) {
					var markerValue = this.Ext.String.format("{0}{1} {2}", "activityResult-", uId, caption);
					var viewModel = this.createActivityResultViewModel({
						uId: uId,
						caption: caption,
						checked: (results.indexOf(uId) > -1),
						resultMarkerValue: markerValue
					});
					collection.add(uId, viewModel);
				}, this);
				activityResultsCollection.loadAll(collection);
			},

			/**
			 * Returns text for description label. Text makes from resource
			 * ProcessActivitiesResultsCaption template and process activity element caption. If caption is
			 * empty used element name.
			 * @param {Terrasoft.ProcessUserTaskSchema} processActivity ProcessActivity element.
			 * @return {String}
			 * @private
			 */
			getProcessActivitiesResultsCaption: function(processActivity) {
				var caption = resources.localizableStrings.ProcessActivitiesResultsCaption;
				var processActivityCaption = processActivity.caption.getValue();
				if (processActivityCaption === "") {
					processActivityCaption = processActivity.name;
				}
				return Terrasoft.getFormattedString(caption, processActivityCaption);
			},

			/**
			 * Change event handler of activity results collection item. Calculate SelectedResult attribute and
			 * publish ProcessActivitiesSelectedResultsChanged message.
			 * @private
			 */
			onActivityResultChanged: function() {
				var processActivity = this.get("ProcessActivity");
				var activityResultsCollection = this.get("ProcessActivityResultsCollection");
				var selectedResults = {};
				var results = selectedResults[processActivity.uId] = [];
				var resultsCaptions = [];
				activityResultsCollection.each(function(activityResultViewModel) {
					var activityResult = activityResultViewModel.get("Checked");
					if (activityResult === true) {
						var resultUId = activityResultViewModel.get("UId");
						var resultCaption = activityResultViewModel.get("Caption");
						resultsCaptions.push(resultCaption);
						results.push(resultUId);
					}
				}, this);
				this.set("SelectedResults", selectedResults);
				var sandbox = this.sandbox;
				sandbox.publish("ProcessActivitiesSelectedResultsChanged", {
					selectedResults: selectedResults,
					resultsCaptions: resultsCaptions
				}, [sandbox.id]);
			},

			/**
			 * Creates and return viewModel for activity result item.
			 * @param {Object} columnValues Initialize column values. Key - column name, value - column value.
			 * Possible keys is uId, caption and checked.
			 * @return {Terrasoft.BaseViewModel}
			 */
			createActivityResultViewModel: function(columnValues) {
				var activityResultViewModel = Ext.create("Terrasoft.BaseViewModel", {
					columns: {
						UId: {
							dataValueType: Terrasoft.DataValueType.GUID
						},
						Checked: {
							dataValueType: Terrasoft.DataValueType.BOOLEAN
						},
						Caption: {
							dataValueType: Terrasoft.DataValueType.TEXT
						}
					},
					values: {
						UId: columnValues.uId,
						Caption: columnValues.caption,
						Checked: (columnValues.checked === true),
						resultMarkerValue: columnValues.resultMarkerValue
					}
				});
				activityResultViewModel.sandbox = this.sandbox;
				return activityResultViewModel;
			},

			/**
			 * @protected
			 */
			onActivityResultItemClick: function(uId) {
				const collection = this.get("ProcessActivityResultsCollection");
				if (collection) {
					const item = collection.get(uId);
					item.set("Checked", !item.get("Checked"));
				}
			}

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "ActivityResultsContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["activity-results-list"]
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "HeaderLabel",
				"parentName": "ActivityResultsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": {
						"labelClass": ["results-caption"]
					},
					"caption": {
						"bindTo": "ProcessActivitiesResultsCaption"
					},
					"styles": {
						"labelStyle": {
							"color": "#839DC3"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "ActivityResultsCollection",
				"parentName": "ActivityResultsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID,
					"markerValue": "ActivityResultsCollection",
					"idProperty": "UId",
					"dataItemIdPrefix": "activityResult",
					"selectableRowCss": "activity-result",
					"collection": {"bindTo": "ProcessActivityResultsCollection"},
					"onItemClick": {"bindTo": "onActivityResultItemClick"},
					"rowCssSelector": ".activity-result",
					"defaultItemConfig": {
						"className": "Terrasoft.Container",
						"items": [
							{
								"className": "Terrasoft.CheckBoxEdit",
								"checked": {"bindTo": "Checked"},
								"markerValue": {"bindTo": "resultMarkerValue"}
							},
							{
								"className": "Terrasoft.Label",
								"caption": {"bindTo": "Caption"}
							}
						]
					},
					"generator": "ContainerListGenerator.generatePartial"
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


