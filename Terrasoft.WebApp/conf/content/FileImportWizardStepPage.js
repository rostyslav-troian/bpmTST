Terrasoft.configuration.Structures["FileImportWizardStepPage"] = {innerHierarchyStack: ["FileImportWizardStepPage"], structureParent: "BaseWizardStepPage"};
define('FileImportWizardStepPageStructure', ['FileImportWizardStepPageResources'], function(resources) {return {schemaUId:'c28ed8d9-a852-43ed-ad8d-f594bb3a094f',schemaCaption: "File import wizard step page", parentSchemaName: "BaseWizardStepPage", schemaName:'FileImportWizardStepPage',parentSchemaUId:'213cef19-18b6-4b2d-97ab-2e076665e2fc',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("FileImportWizardStepPage", ["FileImportServiceRequest"], function() {
	return {
		attributes: {
			/**
			 * Import session unique identifier.
			 */
			"ImportSessionId": {
				dataValueType: Terrasoft.DataValueType.GUID
			},
			/**
			 * Next step page name.
			 */
			NextStepPageName: {
				dataValueType: Terrasoft.DataValueType.TEXT
			}
		},
		messages: {
			/**
			 * Publish message for current step change.
			 */
			"CurrentStepChange": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		methods: {

			//region Methods: Private

			/**
			 * Returns request to FileImportService.
			 * @private
			 * @param {Object} requestConfig Configuration for service request.
			 * @param {String} requestConfig.contractName Contract name.
			 * @param {String} requestConfig.importSessionId Import session identifier.
			 */
			getRequest: function(requestConfig) {
				return this.Ext.create(Terrasoft.configuration.fileImport.FileImportServiceRequest,
						requestConfig);
			},

			/**
			 * Sends request to FileImportService.
			 * @private
			 * @param {Object} requestConfig Configuration for service request.
			 * @param {String} requestConfig.contractName Contract name.
			 * @param {String} requestConfig.importSessionId Import session identifier.
			 * @param {Function} callback Callback.
			 * @param {Object} scope Callback execution scope.
			 */
			sendRequest: function(requestConfig, callback, scope) {
				var request = this.getRequest(requestConfig);
				request.execute(function(response) {
					this.processResponse(response, callback, scope);
				}, this);
			},

			/**
			 * Processes response.
			 * @private
			 * @param {Terrasoft.core.BaseResponse} response Response.
			 * @param {Boolean} response.sucess Request result.
			 * @param {Object} response.errorInfo Request error information.
			 * @param {Function} callback Callback.
			 * @param {Object} scope Callback execution scope.
			 */
			processResponse: function(response, callback, scope) {
				if (response && !response.success) {
					this.logRequestError(response.errorInfo);
					this.showInformationDialog(response.errorInfo.message);
					return;
				}
				callback.call(scope, response);
			},

			/**
			 * Initializes import parameters.
			 * @private
			 * @param {Function} callback Callback.
			 * @param {Terrasoft.core.BaseResponse} callback.response Server response.
			 * @param {Array} callback.response.Columns Import columns.
			 * @param {Object} scope Context for callback function execution.
			 */
			getImportParameters: function(callback, scope) {
				var importSessionId = this.get("ImportSessionId");
				var config = {
					contractName: "GetColumnsMappingParameters",
					importSessionId: importSessionId
				};
				this.sendRequest(config, callback, scope);
			},

			/**
			 * Sets column mapping parameters.
			 * @private
			 * @param {Array} columns Import schema columns.
			 * @param {Function} callback Callback.
			 * @param {Object} scope Callback execution scope.
			 */
			setColumnsMappingParameters: function(columns, callback, scope) {
				var importSessionId = this.get("ImportSessionId");
				var config = {
					contractName: "SetColumnsMappingParameters",
					importSessionId: importSessionId,
					columns: columns
				};
				this.sendRequest(config, callback, scope);
			},

			/**
			 * Scrolls page to top.
			 */
			scrollToTop: function() {
				var body = this.Ext.getBody();
				body.dom.scrollTop = 0;
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseWizardStepPage#getSubscribersTags
			 * @overridden
			 */
			getSubscribersTags: function() {
				var parentSubscribersTags = this.callParent();
				parentSubscribersTags.push("ViewModule_FileImportWizardHeaderModule");
				return parentSubscribersTags;
			},

			/**
			 * Returns validation result.
			 * @protected
			 * @virtual
			 * @return {Boolean}
			 */
			getValidationResult: function() {
				return true;
			},

			/**
			 * Returns saving result.
			 * @protected
			 * @virtual
			 * @return {Boolean}
			 */
			getSavingResult: function() {
				return true;
			},

			/**
			 * Initializes import session.
			 * @virtual
			 * @protected
			 */
			initImportSession: function() {
				var historyStateInfo = this.getStateInfo();
				var importSessionId = historyStateInfo.primaryColumnValue;
				if (!importSessionId) {
					var message = this.get("Resources.Strings.EmptyImportSessionIdMessage");
					this.showInformationDialog(message);
					throw new Terrasoft.NullOrEmptyException({
						message: message
					});
				}
				this.set("ImportSessionId", importSessionId);
			},

			/**
			 * Sets import session info parameters.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Scope of callback function.
			 */
			setImportSessionInfoParameters: function(callback, scope) {
				var isGoogleTagManagerEnabled = this.get("IsGoogleTagManagerEnabled");
				if (!isGoogleTagManagerEnabled) {
					callback.call(scope);
					return;
				}
				var importSessionId = this.get("ImportSessionId");
				var config = {
					contractName: "GetImportSessionInfo",
					importSessionId: importSessionId
				};
				this.sendRequest(config, function(response) {
					this.set("TotalRowsCount", response.totalRowsCount);
					this.set("ImportObject", response.importObject);
					callback.call(scope);
				}, this);
			},

			/**
			 * Logs error message.
			 * @private
			 * @param {Object} errorInfo Error information.
			 * @param {Terrasoft.LogMessageType} [type=Terrasoft.LogMessageType.ERROR] Log message type.
			 */
			logRequestError: function(errorInfo, type) {
				var message = this.getRequestErrorMessage(errorInfo);
				var messageType = (this.Ext.isEmpty(type)) ? this.Terrasoft.LogMessageType.ERROR : type;
				this.log(message, messageType);
			},

			/**
			 * Gets error message.
			 * @private
			 * @param {Object} errorInfo Error information.
			 * @return Error message.
			 */
			getRequestErrorMessage: function(errorInfo) {
				var template = "{0}: {1}\n{2}";
				return this.Ext.String.format(template, errorInfo.errorCode, errorInfo.message, errorInfo.stackTrace);
			},

			/**
			 * @inheritdoc
			 * @overridden
			 */
			initializeProfile: function(callback, scope) {
				callback.call(scope);
			},

			/**
			 * @inheritdoc
			 * @overridden
			 */
			initTypeColumnName: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#initGoogleTagManager
			 * @protected
			 * @overridden
			 */
			initGoogleTagManager: function(callback, scope) {
				this.callParent([
					function() {
						var isGoogleTagManagerEnabled = this.get("IsGoogleTagManagerEnabled");
						if (!isGoogleTagManagerEnabled) {
							callback.call(scope);
							return;
						}
						var key = this.get("ImportSessionId") + this.name;
						this.Terrasoft.require(["profile!" + key], function(profile) {
							if (profile && profile.isVisited) {
								this.set("IsGoogleTagManagerEnabled", false);
								this.setImportSessionInfoParameters(callback, scope);
								return;
							}
							this.Terrasoft.saveUserProfile(key, {isVisited: true}, false, function() {
								this.setImportSessionInfoParameters(callback, scope);
							}, this);
						}, this);
					}, this
				]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#getGoogleTagManagerData
			 * @protected
			 * @overridden
			 */
			getGoogleTagManagerData: function() {
				var data = this.callParent(arguments);
				this.Ext.apply(data, {
					primaryColumnValue: this.get("ImportSessionId")
				});
				this.applyImportSessionInfoParameters(data);
				return data;
			},

			/**
			 * Applies import session info parameters ot data.
			 * @protected
			 * @virtual
			 * @param {Object} data Google tag manager data.
			 */
			applyImportSessionInfoParameters: function(data) {
				var importObject = this.get("ImportObject");
				this.Ext.apply(data, {
					totalRowsCount: this.get("TotalRowsCount"),
					importObjectName: importObject.name
				});
			},

			//endregion

			//region Methods: Public

			/**
			 * Returns state info processed from history state.
			 * When schemas list contains more than one element, sets it to the primaryColumnValue property.
			 * Strange logic inside.
			 * @return {Object} History state info object.
			 */
			getStateInfo: function() {
				const stateInfo = this.getHistoryStateInfo();
				const stateSchemas = stateInfo.schemas;
				if (stateSchemas && stateSchemas.length > 1) {
					stateInfo.primaryColumnValue = stateSchemas.pop();
				}
				return stateInfo;
			},

			/**
			 * @inheritdoc
			 * @overridden
			 */
			init: function() {
				this.initImportSession();
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc
			 * @overridden
			 */
			onRender: function() {
				this.scrollToTop();
				this.callParent(arguments);
			},

			/**
			 * Returns next button caption.
			 * @return {String}
			 */
			getNextButtonMarkerValue: function() {
				return "LowerNextButton";
			},

			/**
			 * Handles next button click.
			 * @virtual
			 */
			onNextButtonClick: function() {
				this.switchToNextStep();
			},

			/**
			 * Initiates switch to a next page.
			 */
			switchToNextStep: function() {
				this.sandbox.publish("CurrentStepChange", this.get("NextStepPageName"), this.getSubscribersTags());
			}

			//endregion
		},
		diff: [
			{
				"operation": "insert",
				"name": "MainContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"generateId": false,
					"classes": {"wrapClassName": ["main-container"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "HeaderContainer",
				"parentName": "MainContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"generateId": false,
					"classes": {"wrapClassName": ["header-container"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "HeaderLabelContainer",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"generateId": false,
					"classes": {"wrapClassName": ["header-label-container"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "HeaderLabel",
				"parentName": "HeaderLabelContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.Header"},
					"classes": {"labelClass": ["header-label"]}
				}
			},
			{
				"operation": "insert",
				"name": "CenterContainer",
				"parentName": "MainContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"generateId": false,
					"classes": {"wrapClassName": ["center-container"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "FooterContainer",
				"parentName": "MainContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"generateId": false,
					"classes": {"wrapClassName": ["footer-container"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "NextButton",
				"parentName": "FooterContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"generateId": false,
					"click": {"bindTo": "onNextButtonClick"},
					"caption": {"bindTo": "Resources.Strings.NextButtonCaption"},
					"markerValue": {"bindTo": "getNextButtonMarkerValue"}
				}
			}
		]
	};
});


