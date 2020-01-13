Terrasoft.configuration.Structures["ProcessEmailContentBuilder"] = {innerHierarchyStack: ["ProcessEmailContentBuilder"], structureParent: "EmailTemplateContentBuilder"};
define('ProcessEmailContentBuilderStructure', ['ProcessEmailContentBuilderResources'], function(resources) {return {schemaUId:'2cdb47bf-1bb4-45cc-9714-db7e2b069b51',schemaCaption: "ProcessEmailContentBuilder", parentSchemaName: "EmailTemplateContentBuilder", schemaName:'ProcessEmailContentBuilder',parentSchemaUId:'a0d499a2-eb19-4082-bf0a-a5db85897b0b',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: EmailTemplateContentBuilder
 */
define("ProcessEmailContentBuilder", ["EmailTemplateContentBuilder", "ProcessEmailContentBuilderHelper"
], function() {
	return {
		attributes: {
			/**
			 * User task invoker uid of the mapping page.
			 */
			"InvokerUId": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		messages: {
			/**
			 * @message GetProcessSchema
			 * Returns process schema.
			 */
			"GetProcessSchema": {
				direction: Terrasoft.MessageDirectionType.PUBLISH,
				mode: Terrasoft.MessageMode.PTP
			}
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.EmailTemplateContentBuilder#save
			 * @override
			 */
			save: function() {
				if (this.validateEmptyItems()) {
					this.forceSave();
				}
			},

			/**
			 * @inheritdoc Terrasoft.configuration.BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.$Caption = this.get("Resources.Strings.DefaultCaption");
					callback.call(scope);
				}, this]);
			},

			/**
			 * Splits content into array of strings and macros objects.
			 * @private
			 * @param {String} content Content string.
			 * @return {Array} Array of strings and macros objects.
			 */
			splitContent: function(content) {
				var stringArray = content.split(Terrasoft.process.constants.HTML_PARAMETER_REGEX);
				Terrasoft.each(stringArray, function(item, index) {
					if (this.getIsMacrosString(item)) {
						stringArray[index] = new Terrasoft.InlineTextEditMacros({html: item});
					}
				}, this);
				return stringArray;
			},

			/**
			 * Joins array of strings and macros objects into content string.
			 * @private
			 * @param {Array} contentArray Array of strings and macros objects.
			 * @return {String} Content string.
			 */
			joinContent: function(contentArray) {
				var result = "";
				Terrasoft.each(contentArray, function(item) {
					result += this.getIsMacrosObject(item) ? item.toHtml() : item;
				}, this);
				return result;
			},

			/**
			 * Returns true if string is a macros.
			 * @private
			 * @param {String} string Html string.
			 * @return {Boolean} True if string is macros.
			 */
			getIsMacrosString: function(string) {
				return Terrasoft.process.constants.HTML_PARAMETER_REGEX.test(string);
			},

			/**
			 * Returns true if object is a macros.
			 * @private
			 * @param {Object} object Testing object.
			 * @return {Boolean} True if object is macros.
			 */
			getIsMacrosObject: function(object) {
				return object instanceof Terrasoft.InlineTextEditMacros;
			},

			/**
			 * @inheritdoc Terrasoft.EmailTemplateContentBuilder#setContentSheetConfig
			 * @override
			 */
			setContentSheetConfig: function(emailTemplateData, callback, scope) {
				this.set("InvokerUId", emailTemplateData.invokerUId);
				var config = this.prepareConfig(emailTemplateData);
				this.filterContentSheetConfig(config, callback, scope);
			},

			/**
			 * @inheritdoc Terrasoft.EmailTemplateContentBuilder#filterContentSheetConfig
			 * @override
			 */
			filterContentSheetConfig: function(config, callback, scope) {
				var schema = this.sandbox.publish("GetProcessSchema");
				var textItems = this.filterTextItems(config.Items);
				Terrasoft.eachAsync(textItems,
					function(textItem, next) {
						this.updateMacrosDisplayValues(textItem, schema, next, this);
					},
					function() {
						Ext.callback(callback, scope || this, [config]);
					}, this
				);
			},

			/**
			 * Filters content sheet items by text type.
			 * @param {Array} items Content sheet items.
			 * @return {Array} Only content sheet items.
			 */
			filterTextItems: function(items) {
				var textItems = [];
				Terrasoft.each(items, function(block) {
					Terrasoft.each(block.Items, function(item) {
						if (item.ItemType === "text") {
							textItems.push(item);
						}
					}, this);
				}, this);
				return textItems;
			},

			/**
			 * Process html content of text items.
			 * @private
			 * @param {Object} textItem Content text item.
			 * @param {Terrasoft.ProcessSchema} schema Process schema.
			 * @param {Function} callback Callback.
			 * @param {Object} scope Scope of the callback.
			 */
			updateMacrosDisplayValues: function(textItem, schema, callback, scope) {
				var contentArray = this.splitContent(textItem.Content);
				Terrasoft.eachAsync(contentArray,
					function(item, next) {
						if (this.getIsMacrosObject(item)) {
							Terrasoft.FormulaParserUtils.getFormulaDisplayValue(item.value, schema,
								function(actualDisplayValue) {
									item.displayValue = actualDisplayValue;
									next();
								}, this);
						} else {
							next();
						}
					},
					function() {
						textItem.Content = this.joinContent(contentArray);
						Ext.callback(callback, scope);
					}, this
				);
			},

			/**
			 * @inheritdoc Terrasoft.EmailTemplateContentBuilder#getViewConfig
			 * @override
			 */
			createContentBuilderHelper: function() {
				return new Terrasoft.ProcessEmailContentBuilderHelper({
					sandbox: this.sandbox,
					invokerUId: this.get("InvokerUId")
				});
			}
		}
	};
});


