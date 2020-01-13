Terrasoft.configuration.Structures["ContentSmartHtmlPropertiesPage"] = {innerHierarchyStack: ["ContentSmartHtmlPropertiesPage"], structureParent: "ContentItemPropertiesPage"};
define('ContentSmartHtmlPropertiesPageStructure', ['ContentSmartHtmlPropertiesPageResources'], function(resources) {return {schemaUId:'c0df3365-f726-4dce-9141-7288ba179c45',schemaCaption: "ContentSmartHtmlPropertiesPage", parentSchemaName: "ContentItemPropertiesPage", schemaName:'ContentSmartHtmlPropertiesPage',parentSchemaUId:'fe424518-8ce5-46a4-a265-ea8ff4ecd12d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContentSmartHtmlPropertiesPage", ["ContentSmartHtmlPropertiesPageResources", "AcademyUtilities",
		"BaseMacroListItemViewModel", "css!ContentSmartHtmlPropertiesPageCSS"], function(resources, AcademyUtilities) {
	return {
		attributes: {
			/**
			 * Element macros collection.
			 */
			"Macros": {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.COLLECTION,
				value: Ext.create("Terrasoft.BaseViewModelCollection")
			}
		},
		methods: {
			/**
			 * Inits macros values.
			 * @private
			 * @param {Array} macros Configured column values json.
			 */
			_initMacros: function(macros) {
				var values = new Terrasoft.BaseViewModelCollection();
				Terrasoft.each(macros, function(macro) {
					var listItem = this.createMacroListItemViewModel(macro);
					values.add(listItem);
				}, this);
				this.$Macros.clear();
				this.$Macros.loadAll(values);
			},

			/**
			 * @inheritdoc Terrasoft.configuration.BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent(arguments);
				this.initHelpUrl();
			},

			/**
			 * Initialize link to help.
			 * @protected
			 */
			initHelpUrl: function() {
				var contextHelpCode = "ContentDesigner";
				var contextHelpId = this.get("ContextHelpId");
				const helpConfig = {
					callback: function(url) {
						this.set("HelpUrl", url);
					},
					scope: this,
					contextHelpId: contextHelpId,
					contextHelpCode: contextHelpCode
				};
				AcademyUtilities.getUrl(helpConfig);
			},

			/**
			 * @inheritdoc ContentItemPropertiesPage#onContentItemConfigChanged
			 * @override
			 */
			onContentItemConfigChanged: function(config) {
				this.callParent(arguments);
				if (config) {
					this._initMacros(config.Macros);
				}
			},

			/**
			 * Returns instance of the list item view model.
			 * @public
			 * @param {Object} macro Macro object.
			 * @returns {Terrasoft.BaseMacroListItemViewModel} List item view model.
			 */
			createMacroListItemViewModel: function(macro) {
				var listItemViewModel;
				var values = {
					DataValueType: macro.dataValueType,
					Value: macro.value,
					Name: macro.name
				};
				switch (macro.dataValueType) {
					case Terrasoft.DataValueType.TEXT:
						listItemViewModel = new Terrasoft.BaseMacroListItemViewModel({values: values});
						break;
					default:
						listItemViewModel = new Terrasoft.BaseMacroListItemViewModel({values: values});
				}
				return listItemViewModel;
			},

			/**
			 * Returns serialized collection of selected macro values.
			 * @protected
			 * @returns {String} Serialized selected macro values.
			 */
			getMacroValues: function() {
				var columnValues = [];
				if (this.$EntityColumnValues) {
					columnValues = this.$Macros.getItems().map(function(item) {
						return {
							dataValueType: item.$DataValueType,
							value: item.getMacroValue(),
							name: item.$Name
						};
					});
				}
				return columnValues;
			},

			/**
			 * Generates configuration view of the element.
			 * @protected
			 * @param {Object} itemConfig Link to configuration of element in ContainerList.
			 * @param {Terrasoft.BaseParameterListItemViewModel} item Macros list item.
			 * @returns {Object} Configuration of macro value in ContainerList.
			 */
			getMacroViewConfig: function(itemConfig, item) {
				if (Ext.isFunction(item.getViewConfig)) {
					itemConfig.config = item.getViewConfig();
				}
				return itemConfig;
			},

			/**
			 * Gets text of placeholder.
			 * @protected
			 * @return {String} Text of placeholder.
			 */
			getBlankSlateLabelText: function() {
				return String.format(resources.localizableStrings.BlankSlateLabel, this.get("HelpUrl"));
			},

			/**
			 * Gets visibility of macros list.
			 * @protected
			 * @return {Boolean} False when macros list is empty.
			 */
			getIsVisibleMacrosList: function() {
				return Boolean(this.$Config.Macros.length);
			},

			/**
			 * Gets visibility of placeholder.
			 * @protected
			 * @return {Boolean} True when macros list is empty.
			 */
			getIsVisiblePlaceholder: function() {
				return !this.getIsVisibleMacrosList();
			},

			/**
			 * Open modal box for edit smart block HTML.
			 * @protected
			 */
			editSmartBlock: function() {
				//TODO http://tscore-task/browse/MK-8125
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "ContentPropertiesContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["content-smarthtml-properties-container"]
				}
			},
			{
				"operation": "insert",
				"name": "BlankSlateContainer",
				"parentName": "ContentPropertiesContainer",
				"propertyName": "items",
				"index": 0,
				"values": {
					"generateId": false,
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"visible": "$getIsVisiblePlaceholder",
					"classes": {
						"wrapClassName": ["blank-slate-container"]
					},
					"items": [
						{
							"className": "Terrasoft.MultilineLabel",
							"itemType": this.Terrasoft.ViewItemType.LABEL,
							"caption": "$getBlankSlateLabelText",
							"contentVisible": true,
							"showLinks": true,
							"classes": {
								"labelClass": ["description-label"]
							}
						}
					]
				}
			},
			{
				"operation": "insert",
				"name": "EditButtonContainer",
				"parentName": "ContentPropertiesContainer",
				"propertyName": "items",
				"index": 1,
				"values": {
					"generateId": false,
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["edit-button-container"]
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "EditButton",
				"parentName": "EditButtonContainer",
				"propertyName": "items",
				"index": 1,
				"values": {
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"click": "$editSmartBlock",
					"caption": "$Resources.Strings.EditButtonCaption",
					"classes": {
						"textClass": ["edit-smart-block-button"]
					},
					"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT
				}
			},
			{
				"operation": "insert",
				"name": "MacrosListContainer",
				"parentName": "ContentPropertiesContainer",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"visible": "$getIsVisibleMacrosList",
					"classes": {
						"wrapClassName": ["macros-container"]
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "MacrosListLabel",
				"parentName": "MacrosListContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": "$Resources.Strings.MacrosListLabelCaption",
					"classes": {
						"labelClass": ["t-title-label-content-block"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "MacrosListValuesContainer",
				"parentName": "MacrosListContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"className": "Terrasoft.ContainerList",
					"generator": "ConfigurationItemGenerator.generateContainerList",
					"idProperty": "Name",
					"collection": "Macros",
					"onGetItemConfig": "getMacroViewConfig",
					"itemPrefix": "ContentSmartHtmlElement",
					"classes": {
						"wrapClassName": ["macro-values-container"]
					}
				}
			}
		]
	};
});


