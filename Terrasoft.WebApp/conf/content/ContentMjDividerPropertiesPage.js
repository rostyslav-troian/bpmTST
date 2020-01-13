Terrasoft.configuration.Structures["ContentMjDividerPropertiesPage"] = {innerHierarchyStack: ["ContentMjDividerPropertiesPage"], structureParent: "ContentSeparatorPropertiesPage"};
define('ContentMjDividerPropertiesPageStructure', ['ContentMjDividerPropertiesPageResources'], function(resources) {return {schemaUId:'8cfecaab-e8a8-4bc8-9ec4-e4bbe1c3e48b',schemaCaption: "Страница редактирования элемента mj-divider", parentSchemaName: "ContentSeparatorPropertiesPage", schemaName:'ContentMjDividerPropertiesPage',parentSchemaUId:'9287bfee-0680-4de6-8701-f2471f48f945',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContentMjDividerPropertiesPage", ["ContentMjDividerPropertiesPageResources",
		"css!ContentMjDividerPropertiesPageCSS"], function(resources) {
	return {
		attributes: {
			/**
			 * Divider width.
			 */
			Width: {
				dataValueType: Terrasoft.DataValueType.FLOAT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "_onWidthChanged"
			}
		},
		properties: {
			defaults: {
				/**
				 * Max width size for divider (%).
				 * @type {Number}
				 */
				maxWidth: 100,
				/**
				 * Min width size for divider (%).
				 * @type {Number}
				 */
				minWidth: 0
			}
		},
		methods: {

			/**
			 * @private
			 */
			_onWidthChanged: function() {
				if (this.validateColumn("Width")) {
					Ext.apply(this.$Config, {
						Width: this.$Width ? this.$Width + "%" : Terrasoft.emptyString
					});
					this.save();
				}
			},

			/**
			 * Validates input width value, if the validation has passed, sets width of divider.
			 * @protected
			 * @param {Number} value Divider Width.
			 * @return {Object} Validation result.
			 */
			widthRangeValidator: function(value) {
				var invalidMessage = "";
				if ((value > this.defaults.maxWidth) || (value < this.defaults.minWidth)) {
					invalidMessage = Ext.String.format(resources.localizableStrings.MaxWidthLimitExceptionText,
						this.defaults.minWidth, this.defaults.maxWidth);
				}
				if (value === this.defaults.minWidth) {
					invalidMessage = resources.localizableStrings.ZeroWidthLimitExceptionText;
				}
				return {
					fullInvalidMessage: invalidMessage,
					invalidMessage: invalidMessage
				};
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#setValidationConfig
			 * @override
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("Width", this.widthRangeValidator);
			},

			/**
			 * @inheritdoc ContentItemPropertiesPage#onContentItemConfigChanged
			 * @override
			 */
			onContentItemConfigChanged: function(config) {
				this.callParent(arguments);
				if (config) {
					this.$Width = config.Width ? parseFloat(config.Width) : Terrasoft.emptyString;
				}
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "SizeGroup",
				"parentName": "SeparatorSettingsControlGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": "$Resources.Strings.SizeGroupCaption",
					"wrapClass": ["divider-width-wrap"]
				},
				"index": 0
			},
			{
				"operation": "insert",
				"parentName": "SizeGroup",
				"name": "SizeGroupContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["control-editor-wrapper"]
				}
			},
			{
				"operation": "insert",
				"parentName": "SizeGroupContainer",
				"propertyName": "items",
				"name": "Width",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"wrapClass": ["style-input"],
					"controlConfig": {"placeholder": "$Resources.Strings.PlaceholderAutoText"},
					"labelConfig": {
						"caption": "$Resources.Strings.DividerElementWidthCaption"
					},
					"classes": {"wrapClassName": ["show-placeholder"]},
					"markerValue": "DividerWidth"
				}
			}
		]
	};
});


