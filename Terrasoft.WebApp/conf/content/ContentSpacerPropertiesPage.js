Terrasoft.configuration.Structures["ContentSpacerPropertiesPage"] = {innerHierarchyStack: ["ContentSpacerPropertiesPage"], structureParent: "ContentItemPropertiesPage"};
define('ContentSpacerPropertiesPageStructure', ['ContentSpacerPropertiesPageResources'], function(resources) {return {schemaUId:'c53b86a5-c852-43f8-8215-104bc0b70dec',schemaCaption: "ContentSpacerPropertiesPage", parentSchemaName: "ContentItemPropertiesPage", schemaName:'ContentSpacerPropertiesPage',parentSchemaUId:'fe424518-8ce5-46a4-a265-ea8ff4ecd12d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 define("ContentSpacerPropertiesPage", ["css!ContentSpacerPropertiesPageCSS"], function() {
	return {
		modules: {
			BackgroundPropertyModulePage: {
				moduleId: "BackgroundPropertyModulePage",
				moduleName: "ConfigurationModuleV2",
				config: {
					schemaName: "BackgroundPropertyModule",
					isSchemaConfigInitialized: true,
					useHistoryState: false,
					parameters: {
						viewModelConfig: {
							Config: {
								attributeValue: "Config"
							},
							PropertyName: "Styles",
							UseImage: false
						}
					}
				}
			}
		},
		properties: {
			workStyles: ["height"]
		},
		attributes: {
			/**
			 * Actual spacer styles.
			 */
			Styles: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				onChange: "onStylesChanged"
			},

			/**
			 * Height of spacer.
			 */
			Height: {
				dataValueType: Terrasoft.core.enums.DataValueType.INTEGER,
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: true,
				onChange: "_onHeightChanged"
			}
		},
		methods: {
			/**
			 * @private
			 */
			_onHeightChanged: function(model, value) {
				const styles = Ext.JSON.decode(this.$Styles, true);
				if (value && this.heightValidator(value).isValid) {
					styles.height = value + "px";
					this.$Styles = JSON.stringify(styles, null, "\t");
					this.save();
				}
			},

			/**
			 * @private
			 */
			_initHeight: function(styles) {
				if (styles && styles.hasOwnProperty("height")) {
					this.$Height = styles.height.replace("px", "");
				} else {
					styles.height = this.$Height = 30;
				}
			},

			/**
			 * @inheritdoc ContentItemPropertiesPage#onContentItemConfigChanged
			 * @override
			 */
			onContentItemConfigChanged: function(config) {
				this.callParent(arguments);
				if (config) {
					this.$Config = config;
					const styles = config.Styles || {};
					this.$Styles = JSON.stringify(styles, null, "\t");
					this._initHeight(styles);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#setValidationConfig
			 * @override
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("Height", this.heightValidator);
			},

			/**
			 * Validates spacer height.
			 * @protected
			 */
			heightValidator: function(value) {
				return Ext.isEmpty(value)
					? { isValid: true }
					: Terrasoft.validateNumberRange(30, 1000, value);
			},

			/**
			 * Saves content item style.
			 * @protected
			 */
			onStylesChanged: function() {
				const styles = Ext.JSON.decode(this.$Styles, true);
				Ext.apply(this.$Config, { Styles: styles });
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "SpacerPropertiesContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["spacer-properties-container"]
				}
			},
			{
				"operation": "insert",
				"name": "SizeGroup",
				"parentName": "SpacerPropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": "$Resources.Strings.SizeCaption",
					"wrapClass": ["size-control-group"]
				},
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SizePropertiesLayout",
				"parentName": "SizeGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["control-editor-wrapper"]
				}
			},
			{
				"operation": "insert",
				"name": "SizePropertiesGrid",
				"parentName": "SizePropertiesLayout",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "Height",
				"parentName": "SizePropertiesGrid",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"markerValue": "Height",
					"value": "$Height",
					"wrapClass": ["style-input"],
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 10,
						"rowSpan": 1
					},
					"labelConfig": {
						"caption": "$Resources.Strings.HeightCaption"
					}
				}
			},
			{
				"operation": "insert",
				"name": "BackgroundGroup",
				"parentName": "SpacerPropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": "$Resources.Strings.BackgroundLabelCaption",
					"wrapClass": ["background-control-group"]
				},
				"index": 1
			},
			{
				"operation": "insert",
				"name": "BackgroundPropertyModulePage",
				"parentName": "BackgroundGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE
				}
			}
		]
	};
});


