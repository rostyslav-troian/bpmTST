Terrasoft.configuration.Structures["FileImportProcessingPage"] = {innerHierarchyStack: ["FileImportProcessingPage"], structureParent: "FileImportWizardStepPage"};
define('FileImportProcessingPageStructure', ['FileImportProcessingPageResources'], function(resources) {return {schemaUId:'6435fee0-888b-49e0-905d-a69a601855fd',schemaCaption: "FileImportProcessingPage", parentSchemaName: "FileImportWizardStepPage", schemaName:'FileImportProcessingPage',parentSchemaUId:'c28ed8d9-a852-43ed-ad8d-f594bb3a094f',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("FileImportProcessingPage", ["FileImportServerChannelResponse"],
	function() {
		return {
			attributes: {
				/**
				 * File import message header.
				 */
				FileImportMessageHeader: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: "FileImport"
				},
				/**
				 * File import complete message.
				 */
				FileImportCompleteMessage: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: "complete"
				},
				/**
				 * Percent of processing.
				 */
				ProcessingPercent: {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					value: 0
				},
				NextStepPageName: {
					value: "FileImportResultPage"
				}
			},
			methods: {

				//region Methods: Private

				/**
				 * Initializes server channel events.
				 * @private
				 */
				initServerChannelEvents: function() {
					this.Terrasoft.ServerChannel.on(this.Terrasoft.EventName.ON_MESSAGE,
						this.onServerChannelMessageReceived, this);
				},

				/**
				 * Destroys server channel events.
				 * @private
				 */
				destroyServerChannelEvents: function() {
					this.Terrasoft.ServerChannel.un(this.Terrasoft.EventName.ON_MESSAGE,
						this.onServerChannelMessageReceived, this);
				},

				//endregion

				//region Methods: Protected

				/**
				 * Creates server channel response.
				 * @protected
				 * @virtual
				 * @param {Object} responseConfig Response configuration.
				 * @return {Object} Server channel response.
				 */
				createServerChannelResponse: function(responseConfig) {
					return this.Ext.create(this.get("ServerChannelResponseClassName"), responseConfig);
				},

				//endregion

				//region Methods: Public

				/**
				 * @inheritdoc Terrasoft.BaseWizardStepPage#init
				 * @overridden
				 */
				init: function() {
					this.initServerChannelEvents();
					this.callParent(arguments);
					this.set("ServerChannelResponseClassName", "Terrasoft.FileImportServerChannelResponse");
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#destroy
				 * @overridden
				 */
				destroy: function() {
					this.destroyServerChannelEvents();
					this.callParent(arguments);
				},

				/**
				 * Handles server channel message.
				 * @param {Terrasoft.core.ServerChannel} channel Messaging channel.
				 * @param {Object} message Server message.
				 * @param {Object} message.Header Message header.
				 * @param {Object} message.Body Message body.
				 */
				onServerChannelMessageReceived: function(channel, message) {
					var serverResponse = this.createServerChannelResponse({
						message: message
					});
					var fileImportCompleteMessage = this.get("FileImportCompleteMessage");
					var fileImportMessageHeader = this.get("FileImportMessageHeader");
					if (!serverResponse.validateSender(fileImportMessageHeader)) {
						return;
					}
					var importSessionId = this.get("ImportSessionId");
					if (importSessionId !== serverResponse.getImportSessionId()) {
						return;
					}
					var status = serverResponse.getStatus();
					if (this.Terrasoft.isEmptyObject(status)) {
						return;
					}
					if (status.stage === fileImportCompleteMessage) {
						this.switchToNextStep();
					} else {
						var percent = status.percent;
						this.set("ProcessingPercent", percent);
						if (percent === 100) {
							this.switchToNextStep();
						}
					}
				},

				/**
				 * Gets import processing percent label caption.
				 * @return {String}
				 */
				getProcessingStatusLabelCaption: function() {
					var format = this.get("Resources.Strings.ProcessingStatusLabelFormat");
					var processingPercent = this.get("ProcessingPercent");
					return this.Ext.String.format(format, processingPercent);
				}

				//endregion

			},
			diff: [
				{
					"operation": "merge",
					"name": "HeaderContainer",
					"values": {
						"classes": {"wrapClassName": ["header-container", "processing"]}
					}
				},
				{
					"operation": "merge",
					"name": "CenterContainer",
					"values": {
						"classes": {"wrapClassName": ["center-container", "processing"]}
					}
				},
				{
					"operation": "insert",
					"parentName": "CenterContainer",
					"name": "ProcessingContainer",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["processing-wrapper"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ProcessingStatusLabel",
					"parentName": "ProcessingContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "getProcessingStatusLabelCaption"},
						"classes": {
							"labelClass": ["processing-label"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "ThanksLabel",
					"parentName": "ProcessingContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.ThanksLabelCaption"},
						"classes": {
							"labelClass": ["thanks-label"]
						}
					}
				},
				{
					"operation": "remove",
					"name": "FooterContainer"
				}
			]
		};
	}
);


