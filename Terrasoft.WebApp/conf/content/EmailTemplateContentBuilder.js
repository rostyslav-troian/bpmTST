Terrasoft.configuration.Structures["EmailTemplateContentBuilder"] = {innerHierarchyStack: ["EmailTemplateContentBuilder"], structureParent: "EmailContentBuilder"};
define('EmailTemplateContentBuilderStructure', ['EmailTemplateContentBuilderResources'], function(resources) {return {schemaUId:'a0d499a2-eb19-4082-bf0a-a5db85897b0b',schemaCaption: "EmailTemplateContentBuilder", parentSchemaName: "EmailContentBuilder", schemaName:'EmailTemplateContentBuilder',parentSchemaUId:'ab75212f-7de6-4f93-a268-429bfab61422',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: EmailContentBuilder
 */
define("EmailTemplateContentBuilder", [
	"ContentBuilderHelper",
	"css!ContentBuilderCSS",
	"ContentExporterFactory"
], function() {
	return {
		attributes: {
			/**
			 * Current content exporter factory.
			 */
			ContentExporterFactory: {
				dataValueType: Terrasoft.core.enums.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				value: Ext.create("Terrasoft.ContentExporterFactory")
			}
		},
		messages: {
			"CloseEmailTemplateBuilder": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			"SetEmailTemplateData": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			"GetEmailTemplateData": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			"SetParametersInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		methods: {

			//region Methods: protected

			/**
			 * @inheritdoc Terrasoft.ContentBuilder#getContentSheetConfig
			 * @override
			 */
			getContentSheetConfig: function(callback, scope) {
				var templateData = this.sandbox.publish("GetEmailTemplateData");
				if (templateData) {
					this.setContentSheetConfig(templateData, callback, scope);
				}
			},

			/**
			 * Sets configuration of the content sheet.
			 * @protected
			 * @param {Object} emailTemplateData Template data.
			 * @param {String} emailTemplateData.bodyConfig Content builder configuration.
			 * @param {String} emailTemplateData.body Html body.
			 * @param {Object} callback Callback-function.
			 * @param {Object} scope Context of the callback-function.
			 */
			setContentSheetConfig: function(emailTemplateData, callback, scope) {
				var config = this.prepareConfig(emailTemplateData);
				Ext.callback(callback, scope || this, [config]);
			},

			/**
			 * Validates object template parameters, html-layout configuration and prepares the content item.
			 * @protected
			 * @param {Object} emailTemplateData Template data.
			 * @param {String} emailTemplateData.bodyConfig Content builder configuration.
			 * @param {String} emailTemplateData.body Html body.
			 * @return {Object} Configuration of the content item.
			 */
			prepareConfig: function(emailTemplateData) {
				var config = {
					"ItemType": "sheet"
				};
				var configText = emailTemplateData.bodyConfig;
				if (Ext.isEmpty(configText)) {
					var html = emailTemplateData.body;
					if (Ext.isEmpty(html)) {
						config.Items = [];
					} else {
						var block = this.getHtmlBlockConfig(html);
						config.Items = [block];
					}
				} else {
					config = Terrasoft.decode(configText);
				}
				return config;
			},

			/**
			 * Returns configuration of the content item for html-markup.
			 * @protected
			 * @param {String} html Html-markup.
			 * @return {Object} Configuration of the content item.
			 */
			getHtmlBlockConfig: function(html) {
				var item = {
					"ItemType": "html",
					"Column": 0,
					"Row": 0,
					"ColSpan": 24,
					"RowSpan": 0,
					"Content": html
				};
				var block = {
					"ItemType": "block",
					"Items": [item]
				};
				return block;
			},

			/**
			 * @inheritdoc Terrasoft.ContentBuilder#cancel
			 * @override
			 */
			cancel: function() {
				this.showInformationDialog(this.get("Resources.Strings.ExitMessage"), this.cancelHandler);
			},

			/**
			 * @inheritdoc Terrasoft.ContentBuilder#save
			 * @override
			 */
			save: function() {
				if (this.validateEmptyItems()) {
					this.showInformationDialog(this.get("Resources.Strings.SaveMessage"), this.saveHandler);
				}
			},

			/**
			 * @protected
			 * @return {boolean}
			 */
			validateEmptyItems: function() {
				var config = this.getContentBuilderConfig();
				if (Ext.isEmpty(config.Items)) {
					var emptyTemplateMessage = this.get("Resources.Strings.EmptyTemplateMessage");
					Terrasoft.utils.showInformation(emptyTemplateMessage);
					return false;
				}
				return true;
			},

			/**
			 * Returns the canvas content configuration.
			 * @protected
			 * @return {Object} Configuration of the content item.
			 */
			getContentBuilderConfig: function() {
				var contentBuilderHelper = Ext.create("Terrasoft.ContentBuilderHelper");
				return contentBuilderHelper.toJSON(this);
			},

			//endregion

			//region Methods: private

			/**
			 * @private
			 */
			_asyncActionsHandler: function(config) {
				var emailContentExporter = this.$ContentExporterFactory.getExporter(config);
				var configText = Terrasoft.encode(config);
				var displayHtml = emailContentExporter.exportData(config);
				var messageConfig = {
					body: displayHtml,
					bodyConfig: configText
				};
				this.sandbox.publish("SetEmailTemplateData", messageConfig);
				this.sandbox.publish("CloseEmailTemplateBuilder");
			},

			/**
			 * Handler for cancel message box result.
			 * @private
			 * @param {String} buttonCode Message button return code.
			 */
			cancelHandler: function(buttonCode) {
				if (buttonCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
					this.sandbox.publish("CloseEmailTemplateBuilder");
				}
			},

			/**
			 * Shows information dialog.
			 * @private
			 * @param {String} message Information message.
			 * @param {Function} handler Handler for result.
			 */
			showInformationDialog: function(message, handler) {
				Terrasoft.utils.showMessage({
					caption: message,
					buttons: [Terrasoft.MessageBoxButtons.YES, Terrasoft.MessageBoxButtons.NO],
					defaultButton: 0,
					style: Terrasoft.MessageBoxStyles.BLUE,
					handler: handler,
					scope: this
				});
			},

			/**
			 * Handler for save message box result.
			 * @private
			 * @param {String} buttonCode Message button return code.
			 */
			saveHandler: function(buttonCode) {
				if (buttonCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
					this.forceSave();
				}
			},

			/**
			 * @protected
			 */
			forceSave: function() {
				const config = this.getContentBuilderConfig();
				const images = {};
				const asyncActions = this.getHandlersForAllImages(config, images);
				asyncActions.push(this._asyncActionsHandler.bind(this, config));
				Terrasoft.chain.apply(this, asyncActions);
			}

			//endregion

		}
	}
});


