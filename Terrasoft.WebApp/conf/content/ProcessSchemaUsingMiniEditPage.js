Terrasoft.configuration.Structures["ProcessSchemaUsingMiniEditPage"] = {innerHierarchyStack: ["ProcessSchemaUsingMiniEditPage"], structureParent: "BaseProcessMiniEditPage"};
define('ProcessSchemaUsingMiniEditPageStructure', ['ProcessSchemaUsingMiniEditPageResources'], function(resources) {return {schemaUId:'7bfe673e-3d57-4fc4-a559-be798ba1dc63',schemaCaption: "ProcessSchemaUsingMiniEditPage", parentSchemaName: "BaseProcessMiniEditPage", schemaName:'ProcessSchemaUsingMiniEditPage',parentSchemaUId:'da1f5a7f-0c58-4745-981b-f3772a5f00bc',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseProcessMiniEditPage
 */
define("ProcessSchemaUsingMiniEditPage", ["terrasoft", "ProcessSchemaUsingMiniEditPageResources"],
	function(Terrasoft, resources) {
		return {
			attributes: {
				/**
				 * Name of 'Using'.
				 * @type {Terrasoft.dataValueType.TEXT}
				 */
				"Name": {
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"caption": resources.localizableStrings.NameCaption,
					"isRequired": true
				},
				/**
				 * Alias of 'Using'.
				 * @type {Terrasoft.dataValueType.TEXT}
				 */
				"Alias": {
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"caption": resources.localizableStrings.AliasCaption
				}
			},
			methods: {
				//region Methods: Protected

				/**
				 * @inheritdoc BaseSchemaViewModel#setValidationConfig
				 * @overridden
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("Name", this.usingNameValidator);
					this.addColumnValidator("Name", this.duplicateValueValidator);
				},

				/**
				 * @inheritdoc BaseProcessMiniEditPage#getSaveButtonHint
				 * @returns {undefined}
				 */
				getSaveButtonHint: function() {
					return this.get("IsEditable")
						? undefined
						: resources.localizableStrings.InheritedItemSaveButtonHint;
				},

				/**
				 * Executes name validation info.
				 * @protected
				 * @param {String} value Parameter name.
				 * @return {Object} Validation info.
				 */
				usingNameValidator: function(value) {
					var message = "";
					var reqExp = /^(global::|[a-zA-Z]{1})(\.[a-zA-Z]|[a-zA-Z0-9])*$/;
					if (!reqExp.test(value)) {
						message = this.get("Resources.Strings.WrongItemNameMessage");
					}
					return {
						invalidMessage: message
					};
				}

				//endregion
			},
			diff: /**SCHEMA_DIFF*/ [
				{
				"operation": "insert",
				"parentName": "Controls",
				"propertyName": "items",
				"name": "Name",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.TEXT,
					"value": {
						"bindTo": "Name"
					},
					"enabled": { "bindTo": "IsEditable" },
					"isRequired": true,
					"classes": {
						"labelClass": ["t-label-proc"]
					},
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"wrapClass": ["top-caption-control"]
				}
			},
			{
				"operation": "insert",
				"parentName": "Controls",
				"propertyName": "items",
				"name": "Alias",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.TEXT,
					"value": {
						"bindTo": "Alias"
					},
					"enabled": { "bindTo": "IsEditable" },
					"classes": {
						"labelClass": ["t-label-proc"]
					},
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					},
					"wrapClass": ["top-caption-control"]
				}
			}
		] /**SCHEMA_DIFF*/
		};
	});



