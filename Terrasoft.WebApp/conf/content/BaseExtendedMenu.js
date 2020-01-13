Terrasoft.configuration.Structures["BaseExtendedMenu"] = {innerHierarchyStack: ["BaseExtendedMenu"]};
define("BaseExtendedMenu", ["ConfigurationEnums", "NetworkUtilities"], function(ConfigurationEnums, NetworkUtilities) {
	Ext.define("Terrasoft.configuration.mixins.BaseExtendedMenu", {
		alternateClassName: "Terrasoft.BaseExtendedMenu",

		/**
		 * Suffix for ExtendedMenu collection name.
		 */
		suffixExtendedMenuCollectionName: "ExtendedMenu",

		/**
		 * Suffix for ExtendedMenu button visible property name.
		 */
		suffixExtendedMenuButtonVisibility: "ExtendedMenuButtonVisible",

		/**
		 * Suffix for ExtendedMenu button click.
		 */
		suffixMenuItemAfterClick: "MenuItemAfterClick",

		/**
		 * Init ExtendedMenu button collections.
		 * @protected
		 * @param {String} name Extended menu name.
		 * @param {Array} recipientPropertyNames Properties names, which used for ExtendedMenu buttons.
		 */
		initExtendedMenuButtonCollections: function(name, recipientPropertyNames, afterMenuItemClick) {
			recipientPropertyNames.forEach(function(item) {
				this.set(name + item + this.suffixExtendedMenuCollectionName,
					this.Ext.create("Terrasoft.BaseViewModelCollection"));
			}, this);
			if (this.Ext.isFunction(afterMenuItemClick)) {
				this.set(name + this.suffixMenuItemAfterClick, afterMenuItemClick);
			}
		},

		/**
		 * Fill recipient ExtendedMenu items.
		 * @protected
		 * @param {String} name Extended menu name.
		 * @param {Array} recipientPropertyName Property name, which used for ExtendedMenu button.
		 */
		fillExtendedMenuItems: function(name, recipientPropertyName) {
			var recipientColumn = this.columns[recipientPropertyName];
			var recipient = this.get(recipientPropertyName);
			if (!recipientColumn || !recipient) {
				return;
			}
			var schemaName = recipientColumn.referenceSchemaName;
			var extendedMenuCollectionName = name + recipientPropertyName + this.suffixExtendedMenuCollectionName;
			var visibilityPropertyName = name + recipientPropertyName + this.suffixExtendedMenuButtonVisibility;
			var recipientInfo = {
				Id: recipient.value,
				MenuName: name,
				ExtendedMenuCollectionName: extendedMenuCollectionName,
				PropertyName: recipientPropertyName,
				VisibilityPropertyName: visibilityPropertyName,
				SchemaName: schemaName
			};
			return recipientInfo;
		},

		/**
		 * Fill ExtendedMenu data.
		 * @protected
		 * @param {Array} data The array that contains data to display.
		 * @param {Object} recipientInfo Recipient info, which used for call button.
		 * @param {Function} onClick Function, which executed on menu item click.
		 */
		fillExtendedMenuData: function(data, recipientInfo, onClick) {
			var items = this.get(recipientInfo.ExtendedMenuCollectionName);
			items.clear();
			if (data.length && data.length > 0) {
				this.set(recipientInfo.VisibilityPropertyName, true);
				data.forEach(function(item) {
					items.addItem(this.getButtonMenuItem({
						"Caption": item.caption,
						"Tag": {
							"itemTag": item.tag,
							"menuName": recipientInfo.MenuName,
							"menuItemClick": onClick
						},
						"Click": {"bindTo": "onButtonMenuItemClick"}
					}, this));
				}, this);
			}
		},

		/**
		 * On menu item click handler.
		 * @param {Function} config.menuItemClick On menu item click handler from extending mixin.
		 * @param {Object} config.itemTag Parameters for config.menuItemClick function.
		 * @param {String} config.menuName Menu name.
		 */
		onButtonMenuItemClick: function(config) {
			var afterMenuItemClick = this.get(config.menuName + this.suffixMenuItemAfterClick);
			config.menuItemClick.call(this, config.itemTag, afterMenuItemClick);
		},

		/**
		 * Opens card.
		 * @param {Object} item Item information.
		 * @param {Array} valuePairs Default values for card fields.
		 */
		openCard: function(item, valuePairs) {
			var historyState = this.sandbox.publish("GetHistoryState");
			var entitySchemaConfig = NetworkUtilities.getEntityConfigUrl({
				entitySchema: item.entitySchemaName,
				primaryColumnValue: this.Terrasoft.GUID_EMPTY,
				typeColumnValue: item.typeId,
				operation: ConfigurationEnums.CardStateV2.ADD
			});
			var entitySchemaName = entitySchemaConfig.entitySchemaName;
			var stateObj = {
				isSeparateMode: true,
				schemaName: entitySchemaConfig.cardSchema,
				entitySchemaName: entitySchemaName,
				operation: entitySchemaConfig.operation,
				primaryColumnValue: entitySchemaConfig.primaryColumnValue,
				isInChain: true,
				valuePairs: valuePairs
			};
			var typeColumnName = NetworkUtilities.getTypeColumn(entitySchemaName);
			if (!Ext.isEmpty(typeColumnName) && item.typeId) {
				stateObj.typeColumnName = typeColumnName.path;
				stateObj.typeUId = item.typeId;
			}
			var operation = historyState.state.operation;
			var isNew = (operation === ConfigurationEnums.CardStateV2.ADD ||
				operation === ConfigurationEnums.CardStateV2.COPY);
			if (isNew) {
				this.sandbox.publish("ReplaceHistoryState", {
					hash: historyState.hash.historyState,
					silent: true,
					stateObj: stateObj
				});
			} else {
				this.sandbox.publish("PushHistoryState", {
					hash: historyState.hash.historyState,
					silent: true,
					stateObj: stateObj
				});
			}
			var moduleId = this.sandbox.id + "_" + entitySchemaName + this.Terrasoft.generateGUID();
			this.sandbox.loadModule("CardModuleV2", {
				renderTo: "centerPanel",
				keepAlive: true,
				id: moduleId
			});
		}
	});
});


