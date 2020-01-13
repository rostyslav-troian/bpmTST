Terrasoft.configuration.Structures["LinkedEntitiesExtendedMenu"] = {innerHierarchyStack: ["LinkedEntitiesExtendedMenu"]};
define("LinkedEntitiesExtendedMenu", ["ConfigurationConstants", "ConfigurationEnums", "EmailConstants",
		"NetworkUtilities", "LinkedEntitiesExtendedMenuResources", "BaseExtendedMenu"],
	function(ConfigurationConstants, ConfigurationEnums, EmailConstants, NetworkUtilities, resources) {

		Ext.define("Terrasoft.configuration.mixins.LinkedEntitiesExtendedMenu", {
			extend: "Terrasoft.BaseExtendedMenu",
			alternateClassName: "Terrasoft.LinkedEntitiesExtendedMenu",

			/**
			 * Initialize LinkedEntity extended menu collection.
			 * @protected
			 * @param {Array} recipientPropertyNames Extended menu name collection.
			 * @param {Function} afterLinkedEntityMenuItemClick Calls after menu item click.
			 */
			initLinkedEntitiesMenuButtonCollections: function(recipientPropertyNames, afterLinkedEntityMenuItemClick) {
				this.initExtendedMenuButtonCollections("LinkedEntities", recipientPropertyNames,
					afterLinkedEntityMenuItemClick);
			},

			/**
			 * Fill LinkedEntities extended menu.
			 * @protected
			 * @param {Array} recipientPropertyNames Extended menu name collection.
			 */
			fillLinkedEntitiesMenuButtonCollections: function(recipientPropertyNames) {
				recipientPropertyNames.forEach(function(item) {
					this.prepareLinkedEntitiesButtonMenu(item);
				}, this);
			},

			/**
			 * Prepare LinkedEntities extended menu item.
			 * @protected
			 * @param {String} item Extended menu name.
			 */
			prepareLinkedEntitiesButtonMenu: function(item) {
				var recipientInfo = this.fillExtendedMenuItems("LinkedEntities", item);
				this.getLinkedEntitiesData(recipientInfo, this.fillExtendedMenuData, this);
			},

			/**
			 * Get recipient LinkedEntities data.
			 * @protected
			 * @param {Object} recipientInfo Recepient information.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			getLinkedEntitiesData: function(recipientInfo, callback, scope) {
				var collection = this.generateLinkedEntitiesCollection();
				callback.call(scope || this, collection, recipientInfo, this.extendedLinkedEntitiesMenuItemClick);
			},

			/**
			 * Returns array of LinkedEntities.
			 * @protected
			 * @return {Array} Array of LinkedEntities.
			 */
			generateLinkedEntitiesCollection: function() {
				var collection = [{
					caption: resources.localizableStrings.Activity,
					tag: {
						entitySchemaName: "Activity",
						typeId: ConfigurationConstants.Activity.Type.Task
					}
				}];
				if (this.entitySchemaName === "Account") {
					collection.push({
						caption: resources.localizableStrings.Contact,
						tag: {
							entitySchemaName: "Contact",
							typeId: ""
						}
					});
				}
				return collection;
			},

			/**
			 * Opens page for LinkedEntity with filled default values.
			 * @protected
			 * @param {Object} item LinkedEntity information.
			 * @param {Function} callback Callback function.
			 */
			extendedLinkedEntitiesMenuItemClick: function(item, callback) {
				var valuePairs = [{
					name: this.entitySchemaName,
					value: this.get("PrimaryColumnValue")
				}];
				this.openCard(item, valuePairs);
				if (this.Ext.isFunction(callback)) {
					callback.call(this);
				}
			}
		});
	});


