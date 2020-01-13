/**
 * Mixin for the class of editing the properties of the process element.
 */
Ext.define("Terrasoft.Designers.ProcessSchemaElementEditable", {
	alternateClassName: "Terrasoft.ProcessSchemaElementEditable",
	extend: "Terrasoft.core.BaseObject",

	/**
  * Sandbox in which the designer is executed.
  * @private
  * @type {Object}
  */
	sandbox: null,

	isReadonly: false,

	/**
  * The tag of the item being edited.
  * @private
  */
	tag: null,

	/**
  * Initialization. Registration of events to work with the designer.
  * After registration, the event of receiving item information by tag is published.
  * @protected
  * @param {Function} callback Callback function.
  * @param {Object} scope Execution context.
  */
	init: function(callback, scope) {
		var sandbox = this.sandbox;
		var messagesConfig = this.getMessagesConfig();
		sandbox.registerMessages(messagesConfig);
		var elementInfo = sandbox.publish("GetElementData", this.tag);
		if (elementInfo) {
			this.onElementDataLoad(elementInfo, function() {
				if (this.destroyed) {
					this.hideMask();
				} else {
					if (this.isReadonly !== true) {
						sandbox.subscribe("SaveElementProperties", this.onSaveElementProperties, this);
					}
					this.validateAfterDataLoaded();
					callback.call(scope || this);
				}
			}, this);
		} else {
			this.hideMask();
		}
	},

	/**
	 * Hides loading mask if exists.
	 * @private
	 */
	hideMask: function() {
		var maskId = this.maskId;
		if (maskId) {
			Terrasoft.Mask.hide(maskId);
		}
	},

	getMessagesConfig: function() {
		var messagesConfig = {
			"GetElementData": {
				direction: Terrasoft.MessageDirectionType.PUBLISH,
				mode: Terrasoft.MessageMode.PTP
			},
			"GetProcessSchema": {
				direction: Terrasoft.MessageDirectionType.PUBLISH,
				mode: Terrasoft.MessageMode.PTP
			},
			"GetSchemaManagerItem": {
				direction: Terrasoft.MessageDirectionType.PUBLISH,
				mode: Terrasoft.MessageMode.PTP
			}
		};
		if (this.isReadonly !== true) {
			Ext.apply(messagesConfig, {
				"SaveProperties": {
					direction: Terrasoft.MessageDirectionType.PUBLISH,
					mode: Terrasoft.MessageMode.PTP
				},
				"HidePropertyPage": {
					direction: Terrasoft.MessageDirectionType.PUBLISH,
					mode: Terrasoft.MessageMode.PTP
				},
				"SaveElementProperties": {
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
					mode: Terrasoft.MessageMode.PTP
				},
				"DiagramPageCaptionChanged": {
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
					mode: Terrasoft.MessageMode.PTP
				},
				"PropertiesPageCaptionChanged": {
					direction: Terrasoft.MessageDirectionType.PUBLISH,
					mode: Terrasoft.MessageMode.PTP
				}
			});
		}
		return messagesConfig;
	},

	/**
	 * Save process schema element properties.
	 * @param {Object} elementCfg Process schema element configuration.
	 */
	save: function(elementCfg) {
		if (this.isReadonly !== true) {
			this.sandbox.publish("SaveProperties", elementCfg);
		}
	},

	/**
	 * @override
	 * @inheritdoc Terrasoft.BaseObject#onDestroy
	 */
	onDestroy: function() {
		this.sandbox.unRegisterMessages();
	},

	/**
	 * Loads element data, should overlap in the heirs. The base implementation throws an exception.
	 * @throws {Terrasoft.NotImplementedException}
	 * @protected
	 */
	onElementDataLoad: function() {
		throw new Terrasoft.NotImplementedException({
			message: "editElement is not defined"
		});
	},

	/**
	 * Perform validate after element data is loaded, should overlap in the heirs.
	 * The base implementation throws an exception.
	 * @throws {Terrasoft.NotImplementedException}
	 * @protected
	 */
	validateAfterDataLoaded: function() {
		throw new Terrasoft.NotImplementedException({
			message: "validateAfterDataLoaded is not defined"
		});
	},

	/**
  * Saves the process parameters on the side of the property page.
  * @throws {Terrasoft.NotImplementedException}
  * @protected
  */
	onSaveElementProperties: function() {
		throw new Terrasoft.NotImplementedException({
			message: "onSaveElementProperties is not implemented"
		});
	}
});
