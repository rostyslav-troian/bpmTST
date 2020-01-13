Terrasoft.configuration.Structures["BaseUserTaskPropertiesPage"] = {innerHierarchyStack: ["BaseUserTaskPropertiesPage"], structureParent: "RootUserTaskPropertiesPage"};
define('BaseUserTaskPropertiesPageStructure', ['BaseUserTaskPropertiesPageResources'], function(resources) {return {schemaUId:'824a1fba-a081-4d8a-940c-6c258c298687',schemaCaption: "BaseUserTaskPropertiesPage", parentSchemaName: "RootUserTaskPropertiesPage", schemaName:'BaseUserTaskPropertiesPage',parentSchemaUId:'9ba919f3-0101-4b63-93c5-1a453985b538',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: RootUserTaskPropertiesPage
 */
define("BaseUserTaskPropertiesPage", ["terrasoft", "BaseUserTaskPropertiesPageResources"],
	function(Terrasoft) {
		return {
			messages: {},
			mixins: {},
			attributes: {
				"Recommendation": {
					dataValueType: this.Terrasoft.DataValueType.MAPPING,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true,
					doAutoSave: true
				},
				"StartIn": {
					dataValueType: this.Terrasoft.DataValueType.MAPPING,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					doAutoSave: true,
					initMethod: "initProperty"
				},
				"StartInPeriod": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true,
					doAutoSave: true,
					initMethod: "initPeriod"
				},
				"Duration": {
					dataValueType: this.Terrasoft.DataValueType.MAPPING,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					doAutoSave: true,
					initMethod: "initProperty"
				},
				"DurationPeriod": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true,
					doAutoSave: true,
					initMethod: "initPeriod"
				},
				"ShowInScheduler": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					doAutoSave: true,
					initMethod: "initProperty"
				},
				"ShowExecutionPage": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					doAutoSave: true,
					initMethod: "initProperty"
				},
				"OwnerId": {
					dataValueType: this.Terrasoft.DataValueType.MAPPING,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					referenceSchemaName: "Contact",
					isRequired: true,
					doAutoSave: true,
					initMethod: "initOwner"
				},
				"InformationOnStep": {
					dataValueType: this.Terrasoft.DataValueType.MAPPING,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					doAutoSave: true,
					initMethod: "initProperty"
				},
				"RemindBefore": {
					dataValueType: this.Terrasoft.DataValueType.MAPPING,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					doAutoSave: true,
					initMethod: "initProperty"
				},
				"RemindBeforePeriod": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true,
					doAutoSave: true,
					initMethod: "initPeriod"
				}
			},
			methods:
			{

				//region Methods: Protected

				/**
				 * @inheritdoc ProcessFlowElementPropertiesPage#initParameters
				 * @protected
				 * @overridden
				 */
				initParameters: function(processElement) {
					this.callParent(arguments);
					this.initRecommendation(processElement);
				},

				//endregion

				//region Methods: Private

				/**
				 * Sets display period value.
				 * @private
				 * @param {Terrasoft.ProcessSchemaParameter} parameter Process parameter.
				 */
				initPeriod: function(parameter) {
					var parameterName = parameter.name;
					var value = parameter.getValue();
					var periodConfig = this.getPeriodConfig();
					var item = Terrasoft.findWhere(periodConfig, {value: value});
					this.set(parameterName, item);
				},

				/**
				 * Returns period.
				 * @private
				 * @return {Object}.
				 */
				getPeriodConfig: function() {
					return {
						"minutes": {
							value: "0",
							displayValue: this.get("Resources.Strings.MinutesCaption")
						},
						"hours": {
							value: "1",
							displayValue: this.get("Resources.Strings.HoursCaption")
						},
						"days": {
							value: "2",
							displayValue: this.get("Resources.Strings.DaysCaption")
						},
						"weeks": {
							value: "3",
							displayValue: this.get("Resources.Strings.WeeksCaption")
						},
						"months": {
							value: "4",
							displayValue: this.get("Resources.Strings.MonthsCaption")
						}
					};
				},

				/**
				 * The event handler for preparing of the data drop-down period.
				 * @private
				 * @param {Object} filter Filters for data preparation.
				 * @param {Terrasoft.Collection} list The data for the drop-down list.
				 */
				onPreparePeriodList: function(filter, list) {
					if (Terrasoft.isEmptyObject(list)) {
						return;
					}
					list.clear();
					list.loadAll(this.getPeriodConfig());
				},

				/**
				 * Sets "Recommendation" attribute.
				 * @private
				 * @param {Terrasoft.ProcessUserTaskSchema} processElement Process element.
				 */
				initRecommendation: function(processElement) {
					var parameter = processElement.findParameterByName("Recommendation");
					var mappingValue = parameter.getMappingValue();
					if (!mappingValue.value) {
						var caption = processElement.caption.getValue();
						mappingValue.value = caption;
						mappingValue.displayValue = caption;
						mappingValue.source = Terrasoft.ProcessSchemaParameterValueSource.ConstValue;
						var sourceValue = {
							value: caption,
							displayValue: caption,
							source: Terrasoft.ProcessSchemaParameterValueSource.ConstValue
						};
						parameter.setMappingValue(sourceValue);
					}
					this.set("Recommendation", mappingValue);
				}

				//endregion

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "UserTaskContainer",
					"propertyName": "items",
					"parentName": "EditorsContainer",
					"className": "Terrasoft.GridLayoutEdit",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "TitleTaskContainer",
					"propertyName": "items",
					"parentName": "UserTaskContainer",
					"className": "Terrasoft.GridLayoutEdit",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						},
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "RecommendationLabel",
					"parentName": "TitleTaskContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						},
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.RecommendationCaption"},
						"classes": {
							"labelClass": ["t-title-label-proc"]
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


