Terrasoft.configuration.Structures["DuplicatesSearchNotificationTargetLoader"] = {innerHierarchyStack: ["DuplicatesSearchNotificationTargetLoader"]};
define("DuplicatesSearchNotificationTargetLoader", ["BaseNotificationTargetLoader"],
		function() {
			Ext.define("Terrasoft.configuration.DuplicatesSearchNotificationTargetLoader", {
				extend: "Terrasoft.BaseNotificationTargetLoader",
				alternateClassName: "Terrasoft.DuplicatesSearchNotificationTargetLoader",

				/**
				 * @inheritdoc Terrasoft.BaseNotificationTargetLoader#loadFromViewModel
				 * @overridden
				 */
				loadFromViewModel: function(config) {
					this.loadPage(config.get("SchemaName"));
				},

				/**
				 * @inheritdoc Terrasoft.BaseNotificationTargetLoader#loadFromPopup
				 * @overridden
				 */
				loadFromPopup: function(config) {
					this.loadPage(config.id.split("_")[0]);
				},

				/**
				 * Loads page.
				 * @private
				 * @param {String} schemaName Name of schema.
				 */
				loadPage: function(schemaName) {
					var historyState = this.sandbox.publish("GetHistoryState");
					var state = historyState.state || {};
					this.sandbox.publish("ReplaceHistoryState", {
						stateObj: state,
						hash: "CardModuleV2/DuplicatesPageV2/" + schemaName,
						silent: false
					});
				}
			});

			return Terrasoft.DuplicatesSearchNotificationTargetLoader;
		});


