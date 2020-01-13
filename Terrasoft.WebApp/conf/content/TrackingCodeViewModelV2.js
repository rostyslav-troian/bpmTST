Terrasoft.configuration.Structures["TrackingCodeViewModelV2"] = {innerHierarchyStack: ["TrackingCodeViewModelV2"]};
define("TrackingCodeViewModelV2", ["ModalBox"],
	function(ModalBox) {
		Ext.define("Terrasoft.configuration.TrackingCodeViewModel", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.TrackingCodeViewModel",
			Ext: null,
			sandbox: null,
			Terrasoft: null,
			columns: {
				/**
				 * The text of website js script.
				 */
				"TrackingCode": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					value: ""
				}
			},

			/**
			 * On render handler.
			 */
			onRender: Ext.emptyFn,

			/**
			 * Close page.
			 */
			close: function() {
				if (ModalBox.getInnerBox()) {
					ModalBox.close(true);
				}
			},

			/**
			 * Cancel button click handler.
			 */
			onCancelButtonClick: function() {
				this.close();
			},

			/**
			 * Initialize text of website js script.
			 */
			initTrackingCodeText: function() {
				this.Terrasoft.SysSettings.querySysSettingsItem("EventTrackingApiKey", function(value) {
					var apiKey = value;
					this.Terrasoft.SysSettings.querySysSettingsItem("EventTrackingCodeTemplate", function(value) {
						this.set("TrackingCode", value.replace("{apiKey}", apiKey));
					}, this);
				}, this);

			},

			/**
			 * Initialize model.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			init: function(callback, scope) {
				this.initTrackingCodeText();
				callback.call(scope || this);
			}
		});
	});


