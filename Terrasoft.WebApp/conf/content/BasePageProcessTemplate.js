Terrasoft.configuration.Structures["BasePageProcessTemplate"] = {innerHierarchyStack: ["BasePageProcessTemplate"], structureParent: "BasePageV2"};
define('BasePageProcessTemplateStructure', ['BasePageProcessTemplateResources'], function(resources) {return {schemaUId:'21620f25-166f-42f1-8b4d-224a959040a3',schemaCaption: "Tabbed page with area on top", parentSchemaName: "BasePageV2", schemaName:'BasePageProcessTemplate',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Base page template with process as source of data for page designer.
 * Parent: BasePageV2 => BaseEntityPage => BaseSchemaViewModel => BaseViewModel => BaseModel
 */
define("BasePageProcessTemplate", ["LookupUtilities", "BasePageProcessTemplateResources", "CustomProcessPageV2Utilities"
], function(LookupUtilities, resources) {
	return {
		mixins: {
			BaseProcessViewModel: "Terrasoft.CustomProcessPageV2Utilities"
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {

			// region Methods: Private

			/**
			 * @private
			 */
			_getDefaultButtonInfo: function(tag) {
				switch (tag) {
					case "SaveData":
						return {
							caption: resources.localizableStrings.SaveButtonCaption,
							performClosePage: true,
							performSaveData: true
						};
					case "ClosePage":
						return {
							caption: resources.localizableStrings.CloseButtonCaption,
							performClosePage: false,
							performSaveData: false
						};
					default:
						const message = "Button with tag " + tag + " not found";
						const error = new Terrasoft.ItemNotFoundException({message: message});
						this.warning(error.toString());
						return {
							caption: resources.localizableStrings.NoCaptionButtonCaption,
							performClosePage: false,
							performSaveData: false
						};
				}
			},

			/**
			 * @private
			 */
			_getButtonInfo: function(tag) {
				var buttonsParameterValue = this.get("Buttons");
				var buttons = buttonsParameterValue && Terrasoft.decode(buttonsParameterValue).$values;
				var button = _.find(buttons, function(item) {
					return item.Tag.value === tag;
				}, this);
				if (!button) {
					return this._getDefaultButtonInfo(tag);
				}
				return {
					performClosePage: !!button.PerformClosePage && button.PerformClosePage.value === "True",
					performSaveData: !!button.PerformSaveData && button.PerformSaveData.value === "True",
					caption: button.Caption ? button.Caption.value : resources.localizableStrings.NoCaptionButtonCaption
				};
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#validateColumn
			 * @override
			 */
			validateColumn: function(columnName, options) {
				if (options && options.skipValidation) {
					return this.callParent(arguments);
				}
				if (Terrasoft.Features.getIsDisabled("ValidateRequiredFields") &&
					Terrasoft.Features.getIsDisabled("DisablePreconfiguredPageValidateRequiredFields")) {
					this.fireEvent("validate:" + columnName, this);
				}
				return this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2.mixins.PrintReportUtilities#initCardPrintForms
			 * @override
			 */
			initCardPrintForms: function(callback, scope) {
				this.set(this.moduleCardPrintFormsCollectionName, new Terrasoft.BaseViewModelCollection());
				Ext.callback(callback, scope || this);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onCloseClick
			 * @override
			 */
			onCloseClick: function() {
				this.onCloseCardButtonClick.apply(this, arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#getPageHeader
			 * @override
			 */
			getPageHeader: function() {
				var processData = this.get("ProcessData");
				return processData.header;
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#initContainersVisibility
			 * @override
			 */
			initContainersVisibility: function() {
				this.callParent(arguments);
				this.set("IsPageHeaderVisible", false);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @override
			 */
			init: function() {
				this.set("IsSeparateMode", true);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BasePage#initEntity
			 * @override
			 */
			initEntity: function(callback, scope) {
				this.callParent([function() {
					this.loadDataModels({}, callback, scope);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel.mixins.EntityBaseViewModelMixin#findEntityColumn
			 * @override
			 */
			findEntityColumn: function(columnName) {
				return this.getColumnByName(columnName);
			},

			/**
			 * @inheritdoc Terrasoft.BaseEntityPage#saveEntityInChain
			 * @override
			 */
			saveEntityInChain: function(callback, scope) {
				this.cardSaveResponse = {success: true};
				Ext.callback(callback, scope);
			},

			/**
			 * Performs validation. Call callback when validation was successful.
			 * @protected
			 * @param {Function} [callback] The callback function.
			 * @param {Object} [scope] The scope of callback function.
			 */
			validation: function(callback, scope) {
				this.asyncValidate(function(result) {
					if (result.success) {
						Ext.callback(callback, scope);
					} else {
						this.showInformationDialog(result.message);
					}
				}, this);
			},

			/**
			 * Handler for button click with verification. Accept element of process when validation success.
			 * @protected
			 */
			completeProcessElementWithVerification: function(code) {
				this.set("CanEditResponse", null);
				Terrasoft.chain(
					this.validation.bind(this),
					this.saveCheckCanEditRight.bind(this),
					this.saveDataModels.bind(this),
					function(next, response) {
						this.validateSaveEntityResponse(response, next, this);
					},
					function() {
						this.acceptProcessElement(code);
					},
					this
				);
			},

			/**
			 * Handler for SaveButton click.
			 * @protected
			 */
			onSaveButtonClick: function(eventName, modelMethod, model, tag) {
				this.completeProcessElementWithVerification(tag);
			},

			// endregion

			// region Methods: Public

			/**
			 * Handler for process action buttons click.
			 * Using in PageDesignerSchema for binding.
			 */
			onProcessActionButtonClick: function(eventName, modelMethod, model, tag) {
				const info = this._getButtonInfo(tag);
				if (info.performClosePage) {
					if (info.performSaveData) {
						this.onSaveButtonClick.apply(this, arguments);
					} else {
						this.cancelProcessElement(tag);
					}
				} else {
					this.onCloseClick.apply(this, arguments);
				}
			},

			/**
			 * Returns caption for user defined buttons. Get resource from parameter Buttons.
			 * Using in PageDesignerSchema for binding.
			 */
			getProcessActionButtonCaption: function(tag) {
				var info = this._getButtonInfo(tag);
				return info.caption;
			}

			// endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "ActionButtonsContainer",
				"values": {
					"visible": true
				}
			},
			{
				"operation": "remove",
				"name": "LeftContainer"
			},
			{
				"operation": "remove",
				"name": "RightContainer"
			},
			{
				"operation": "insert",
				"parentName": "ActionButtonsContainer",
				"propertyName": "items",
				"name": "ProcessActionButtons",
				"alias": {
					"name": "LeftContainer"
				},
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["process-action-buttons"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "ProcessActionButtons",
				"propertyName": "items",
				"index": 0,
				"name": "Button-be6148b819154a0791eaee8f1635d859",
				"alias": {
					"name": "SaveButton"
				},
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"id": "f073e66a-36ec-47d7-9c6a-e5952dbf05a3",
					"style": "green",
					"tag": "SaveData",
					"caption": {"bindTo": "getProcessActionButtonCaption"},
					"click": {"bindTo": "onProcessActionButtonClick"}
				}
			},
			{
				"operation": "insert",
				"parentName": "ProcessActionButtons",
				"propertyName": "items",
				"index": 1,
				"name": "Button-3a8ac667899d4aa68021a07eb1c7c49c",
				"alias": {
					"name": "CloseButton"
				},
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"id": "c4841740-ff8c-406f-8626-1c78f78608bf",
					"style": "blue",
					"tag": "ClosePage",
					"caption": {"bindTo": "getProcessActionButtonCaption"},
					"click": {"bindTo": "onProcessActionButtonClick"}
				}
			},
			{
				"operation": "merge",
				"name": "HeaderCaptionContainer",
				"values": {
					"visible": true
				}
			},
			{
				"operation": "insert",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"name": "NewTab1",
				"values": {
					"caption": {"bindTo": "Resources.Strings.NewTab1Caption"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "NewTab1",
				"propertyName": "items",
				"name": "NewTab1Group1",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"caption": {"bindTo": "Resources.Strings.NewTab1Group1Caption"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "NewTab1Group1",
				"propertyName": "items",
				"name": "NewTab1GridLayout1",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "merge",
				"name": "LeftModulesContainer",
				"values": {
					"visible": false
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


