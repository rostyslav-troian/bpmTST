Terrasoft.configuration.Structures["BaseCampaignSchemaElementPage"] = {innerHierarchyStack: ["BaseCampaignSchemaElementPage"], structureParent: "ProcessFlowElementPropertiesPage"};
define('BaseCampaignSchemaElementPageStructure', ['BaseCampaignSchemaElementPageResources'], function(resources) {return {schemaUId:'13b73e23-fb4d-41fb-850b-0f4ae4c3e9f1',schemaCaption: "BaseCampaignSchemaElementPage", parentSchemaName: "ProcessFlowElementPropertiesPage", schemaName:'BaseCampaignSchemaElementPage',parentSchemaUId:'0f347363-31e5-4222-a82e-dcfeda34cbb6',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * BaseCampaignSchemaElementPage edit page schema.
 * Parent: BaseProcessSchemaElementPropertiesPage.
 */
define("BaseCampaignSchemaElementPage", ["AcademyUtilities"], function() {
	return {
		attributes: {
			/**
			 * Url of the academy page.
			 */
			"AcademyUrl": {
				"dataValueType": this.Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		properties: {
			/**
			 * The container identifier for campaign element properties.
			 * @protected
			 * @virtual
			 * @type {String}
			 */
			propertiesContainerSelector: "#schema-designer-properties-ct"
		},
		methods: {
			/**
			 * @inheritdoc Terrasoft.BaseProcessSchemaElementPropertiesPage#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.initAcademyUrl(this.onAcademyUrlInitialized, this);
			},

			/**
			 *
			 * @private
			 */
			onAcademyUrlInitialized: function() {
				this.initInfoText();
			},

			/**
			 * Initializes information text.
			 * @private
			 */
			initInfoText: function() {
				var academyUrl = this.get("AcademyUrl");
				var informationText = this.get("Resources.Strings.ProcessInformationText");
				informationText = this.Ext.String.format(informationText, academyUrl);
				this.set("Resources.Strings.ProcessInformationText", informationText);
			},

			/**
			 * Returns code of the context help.
			 * @return {String}
			 * @protected
			 */
			getContextHelpCode: this.Ext.emptyFn,

			/**
			 * Initializes url to the academy.
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The callback execution context.
			 * @private
			 */
			initAcademyUrl: function(callback, scope) {
				Terrasoft.AcademyUtilities.getUrl({
					contextHelpCode: this.getContextHelpCode(),
					callback: function(academyUrl) {
						this.set("AcademyUrl", academyUrl);
						this.Ext.callback(callback, scope);
					},
					scope: this
				});
			},

			/**
			 * Saves validation results
			 * @return Boolean
			 */
			saveValidationResults: function() {
				var validationInfo = this.validationInfo;
				var processElement = this.get("ProcessElement");
				processElement.validationResults = [];
				Terrasoft.each(this.columns, function(column, columnName) {
					var columnValidationResult = validationInfo.get(columnName);
					if (columnValidationResult && !columnValidationResult.isValid) {
						this._saveValidationResult(columnValidationResult);
					}
				}, this);
				var customValidationResults = validationInfo.get("customValidationResults");
				Terrasoft.each(customValidationResults, this._saveValidationResult, this);
				var isElementValid = this.isElementValid(processElement.validationResults);
				processElement.setPropertyValue("isValidateExecuted", true, {
					silent: true
				});
				processElement.setPropertyValue("isValid", isElementValid, {
					silent: !isElementValid
				});
				return isElementValid;
			},

			/**
			 * Adds properties page validation result to campaign schema element validationResults property.
			 * @param {Object} validationResult Page validation result.
			 * - isValid {Boolean} Validation result.
			 * - invalidMessage {String} Control validation message.
			 * - fullInvalidMessage {String} Full validation message text.
			 * - validationType {Terrasoft.ValidationType} Validation type.
			 * @private
			 */
			_saveValidationResult: function(validationResult) {
				var processElement = this.get("ProcessElement");
				var validationType = validationResult.validationType || Terrasoft.ValidationType.ERROR;
				if (!validationResult.isValid) {
					processElement.validationResults.push({
						validationType: validationType,
						message: validationResult.fullInvalidMessage || validationResult.invalidMessage,
						propertyName: validationResult.propertyName,
						isCustomMessage: validationResult.isCustomMessage
					});
				}
			},

			/**
			 * Returns lookup config for open lookup.
			 * @return {Object} lookupConfig Resut config for open lookup.
			 * @protected
			 */
			getLookupConfig: function() {
				var config = {
					hideActions: true,
					settingsButtonVisible: false,
					multiSelect: false
				};
				return config;
			},

			/**
			 * Displays default messageBox with specific message content.
			 * @protected
			 * @param {String} caption Caption of MeaasgeBox.
			 * @param {String} message Message that displays inside message block.
			 * @param {Array} currentButtons Collection of MessageBox buttons to display.
			 * @param {Function} handler Callback function to call when messageBox will be closed.
			 * @param {Object} scope Context.
			 */
			showMessageBox: function(caption, message, currentButtons, handler, scope) {
				Terrasoft.ProcessSchemaDesignerUtilities.showProcessMessageBox({
					caption: caption,
					message: message,
					buttons: currentButtons,
					defaultButton: 0,
					handler: handler,
					scope: scope
				});
			},

			/**
			 * Loads element properties page mask.
			 * @protected
			 */
			loadPropertiesPageMask: function() {
				return this.showBodyMask({
					selector: this.propertiesContainerSelector,
					opacity: 0.5,
					showHidden: true,
					clearMasks: true
				});
			},

			/**
			 * @inheritdoc BaseProcessSchemaElementPropertiesPage#getLookupPageConfig
			 * @overridden
			 */
			getLookupPageConfig: function() {
				var config = this.callParent(arguments);
				config.hideActions = true;
				config.settingsButtonVisible = false;
				return config;
			},

			/**
			 * @inheritdoc BaseProcessSchemaElementPropertiesPage#getIsSerializeToDBVisible
			 * @overridden
			 */
			getIsSerializeToDBVisible: function() {
				return false;
			},

			/**
			 * @inheritdoc BaseProcessSchemaElementPropertiesPage#getIsLoggingVisible
			 * @overridden
			 */
			getIsLoggingVisible: function() {
				return false;
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "TopContainer",
				"parentName": "HeaderContainer",
				"values": {
					"wrapClass": ["top-container-wrapClass", "control-width-15"]
				}
			},
			{
				"operation": "remove",
				"parentName": "ToolsContainer",
				"name": "ToolsButton"
			}
		]/**SCHEMA_DIFF*/
	};
});


