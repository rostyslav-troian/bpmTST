Terrasoft.configuration.Structures["EntityConnectionLinksPanelItemUtilities"] = {innerHierarchyStack: ["EntityConnectionLinksPanelItemUtilities"]};
define("EntityConnectionLinksPanelItemUtilities", ["NetworkUtilities",
		"EntityConnectionLinksPanelItemUtilitiesResources", "EntityConnectionLinksResourceUtilities"],
	function(NetworkUtilities, resources, EntityConnectionLinksResourceUtilities) {

		/**
		 * @class Terrasoft.configuration.mixins.EntityConnectionLinksPanelItemUtilities
		 * Entity connection panel item mixin.
		 * @type {Terrasoft.BaseObject}
		 */
		Ext.define("Terrasoft.configuration.mixins.EntityConnectionLinksPanelItemUtilities", {
			extend: "Terrasoft.core.BaseObject",
			alternateClassName: "Terrasoft.EntityConnectionLinksPanelItemUtilities",

			//region Methods: Protected

			/**
			 * ########## ######## ##### ####### ########### ####.
			 * @protected
			 * @param {Object} args #########.
			 * @param {String} columnName ######## ####### #####.
			 * @return {String} ######## ##### ########### ####.
			 */
			getLookupEntitySchemaName: function(args, columnName) {
				var schemaName = args.schemaName;
				if (!Ext.isEmpty(schemaName)) {
					return schemaName;
				}
				var column = this.getColumnByName(columnName);
				if (!column) {
					return "";
				}
				return column.referenceSchemaName;
			},

			/**
			 * Returns is column value empty.
			 * @protected
			 * @param {Object} value Column value.
			 * @return {Boolean}
			 */
			isEmptyColumnValue: function(value) {
				return this.Ext.isEmpty(value);
			},

			/**
			 * Handles relation menu item click.
			 * @private
			 */
			onRelationMenuItemClick: function(columnName) {
				var currentColumnName = this.get("CurrentColumnName");
				if (currentColumnName !== columnName) {
					this.set("CurrentColumnName", null);
					this.set("CurrentColumnValue", null);
					this.set("CurrentColumnName", columnName);
					this.set("IsCardOpened", false);
				}
			},

			//endregion

			//region Methods: Public

			/**
			 * Returns image configuration for column button.
			 * @param {String} columnName Column name.
			 * @return {Object} Image configuration.
			 */
			getRelationButtonImageConfig: function(columnName) {
				var resourceName = columnName + "ExistIcon";
				var image = EntityConnectionLinksResourceUtilities.resources.localizableImages[resourceName] ||
					EntityConnectionLinksResourceUtilities.resources.localizableImages.DefaultIcon;
				return image;
			},

			/**
			 * Handles linked relation button click.
			 */
			onLinkedRelationButtonClick: function() {
				var emailContainerListGrid = this.Ext.get("EmailContainerListGrid");
				var oldEmails = this.Ext.select("[class$=\"EmailModule selected\"]", false, emailContainerListGrid.dom);
				for (var i = 0; i < oldEmails.elements.length; i++) {
					var oldEmail = oldEmails.elements[i];
					var oldId = oldEmail.attributes.id.value;
					var oldEmailContainer = this.Ext.get(oldId);
					oldEmailContainer.removeCls("selected");
				}
				var newEmailContainer = this.Ext.select("[class*=\"emailContainer-" + this.$Id);
				if (newEmailContainer.elements.length > 0) {
					newEmailContainer.elements[0].classList.add("selected");
				}
			},

			/**
			 * Returns text of the lookup field, if field value is empty.
			 * @param {String} columnName Column name.
			 * @return {String} Column text.
			 */
			getPlaceholder: function(columnName) {
				var column = this.getColumnByName(columnName);
				if (this.Ext.isEmpty(column)) {
					return "";
				}
				var connectToText = resources.localizableStrings.ConnectTo;
				return Ext.String.format(connectToText, column.caption || columnName);
			},

			/**
			 * Initializes default column name.
			 */
			initDefaultColumnName: function() {
				var connectionColumnList = this.get("EntityConnectionColumnList");
				if (Ext.isEmpty(connectionColumnList)) {
					this.set("EntityConnectionColumnList", []);
					return;
				}
				var length = connectionColumnList.length;
				this.setIsAddNewRelationVisible();
				for (var i = 0; i < length; i++) {
					var columnName = connectionColumnList[i];
					if (!this.isColumnFilled(columnName)) {
						this.set("CurrentColumnName", columnName);
						return;
					}
				}
			},

			/**
			 * Returns is column filled.
			 * @param {String} columnName Column name.
			 * @return {Boolean}
			 */
			isColumnFilled: function(columnName) {
				var value = this.get(columnName);
				return !this.Ext.isEmpty(value);
			},

			/**
			 * Sets new relation lookup visibility.
			 */
			setIsAddNewRelationVisible: function() {
				var result = false;
				var connectionColumnList = this.get("EntityConnectionColumnList");
				this.Terrasoft.each(connectionColumnList, function(columnName) {
					if (!this.isColumnFilled(columnName)) {
						result = true;
						return false;
					}
				}, this);
				this.set("IsAddNewRelationVisible", result);
			},

			/**
			 * Determines if any relation column is filled.
			 * @return {Boolean} Sign that at least one relation column is filled.
			 */
			isAnyRelationColumnFilled: function() {
				var result = false;
				this.Terrasoft.each(this.$EntityConnectionColumnList, function(columnName) {
					if (this.isColumnFilled(columnName)) {
						result = true;
						return false;
					}
				}, this);
				return result;
			},

			/**
			 * Returns reference configuration for lookup.
			 * @param {String} columnName Column name.
			 * @return {Object}
			 */
			getHref: function(columnName) {
				var currentColumnValue = this.get(columnName);
				var currentColumnName = columnName;
				var column = this.columns[currentColumnName];
				if (Ext.isEmpty(column)) {
					return {};
				}
				var referenceSchemaName = column.referenceSchemaName;
				var entitySchemaConfig = this.Terrasoft.configuration.ModuleStructure[referenceSchemaName];
				if (currentColumnValue && entitySchemaConfig) {
					var typeAttr = NetworkUtilities.getTypeColumn(referenceSchemaName);
					var typeUId;
					if (typeAttr && currentColumnValue[typeAttr.path]) {
						typeUId = currentColumnValue[typeAttr.path].value;
					}
					var url = NetworkUtilities.getEntityUrl(referenceSchemaName, currentColumnValue.value, typeUId);
					return {
						url: "ViewModule.aspx#" + url,
						caption: currentColumnValue.displayValue
					};
				}
				return {};
			},

			/**
			 * Handles lookup link click event.
			 * @param {String} url Hyperlink.
			 * @param {String} columnName Column name.
			 * @return {Boolean} Sign, that DOM event handler must be canceled.
			 */
			onLinkClick: function(url, columnName) {
				var currentColumnValue = this.get(columnName);
				var currentColumnName = columnName;
				var column = this.columns[currentColumnName];
				if (this.Ext.isEmpty(column)) {
					return true;
				}
				var referenceSchemaName = column.referenceSchemaName;
				if (this.Ext.isEmpty(referenceSchemaName)) {
					return true;
				}
				var entityId = currentColumnValue.value;
				var historyState = this.sandbox.publish("GetHistoryState");
				var config = {
					sandbox: this.sandbox,
					entityId: entityId,
					entitySchemaName: referenceSchemaName
				};
				if (config.entityId !== historyState.state.primaryColumnValue) {
					NetworkUtilities.openEntityPage(config);
				}
				return false;
			}

			//endregion

		});
	});


