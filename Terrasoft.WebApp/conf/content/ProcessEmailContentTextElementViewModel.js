Terrasoft.configuration.Structures["ProcessEmailContentTextElementViewModel"] = {innerHierarchyStack: ["ProcessEmailContentTextElementViewModel"]};
define("ProcessEmailContentTextElementViewModel", ["InlineParameterTextEdit", "ContentTextElementViewModel",
	"MappingEditMixin"], function() {
		Ext.define("Terrasoft.ContentBuilder.ProcessEmailContentTextElementViewModel", {
			extend: "Terrasoft.ContentTextElementViewModel",
			alternateClassName: "Terrasoft.ProcessEmailContentTextElementViewModel",

			mixins: {
				mappingEditMixin: "Terrasoft.MappingEditMixin"
			},

			/**
			 * Sandbox instance.
			 * @private
			 * @type {Object}
			 */
			sandbox: null,

			/**
			 * User task invoker uid of the mapping page.
			 * @private
			 * @type {String}
			 */
			invokerUId: null,

			/**
			 * @inheritdoc Terrasoft.MappingEditMixin#getInvokerUId
			 * @protected
			 * @overridden
			 */
			getInvokerUId: function() {
				return this.invokerUId;
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#constructor
			 * @overridden
			 */
			constructor: function() {
				this.callParent(arguments);
				this.initDesignerType();
			},

			/**
			 * @type {String}
			 * On parameter button click handler.
			 * @private
			 */
			onParameterButtonClick: function() {
				this.openEmailMappingWindow(this.onModalBoxSave, this);
			},

			/**
			 * On modal box close handler.
			 * @param {Object} parameter Modal box result parameter.
			 * @param {String} parameter.displayValue Display value of the result parameter.
			 * @private
			 */
			onModalBoxSave: function(parameter) {
				var htmlParameter = Ext.create("Terrasoft.InlineTextEditMacros", {
					value: parameter.value,
					displayValue: parameter.displayValue
				});
				this.set("SelectedText", htmlParameter.toHtml());
			},

			/**
			 * @inheritdoc Terrasoft.ContentElementBaseViewModel#getViewConfig
			 * @protected
			 * @overridden
			 */
			getViewConfig: function() {
				const viewConfig = this.callParent();
				const editorItem = _.find(viewConfig.items, function(item) {
					return item.className === "Terrasoft.InlineCodeTextEdit";
				}, this);
				Ext.apply(editorItem, {
					"className": "Terrasoft.InlineParameterTextEdit",
					"parameterclick": "$onParameterButtonClick"
				});
				return viewConfig;
			}
		});
	});


