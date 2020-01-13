Terrasoft.configuration.Structures["ChangeAdminRightsUserTaskAddRightsViewModel"] = {innerHierarchyStack: ["ChangeAdminRightsUserTaskAddRightsViewModel"]};
define("ChangeAdminRightsUserTaskAddRightsViewModel", ["ChangeAdminRightsUserTaskAddRightsViewModelResources",
	"RightUtilities", "ChangeAdminRightsUserTaskBaseItemViewModel"
], function(resources, RightUtilities) {

	/**
	 * Model record for the add rights block of change admin rights properties page.
	 */
	Ext.define("Terrasoft.model.ChangeAdminRightsUserTaskAddRightsViewModel", {
		extend: "Terrasoft.ChangeAdminRightsUserTaskBaseItemViewModel",
		alternateClassName: "Terrasoft.ChangeAdminRightsUserTaskAddRightsViewModel",

		//region Methods: Private

		/**
		 * Get current operation right level.
		 * @private
		 * @param {String} rightLevelValue value of parameter OperationRightLevel.
		 * @return {Object} Current operation right level
		 */
		getOperationRightLevel: function(rightLevelValue) {
			var rightLevels = this.Terrasoft.RightsEnums.rightLevels;
			var result = null;
			this.Terrasoft.each(rightLevels, function(rightLevel) {
				if (rightLevel.Value === rightLevelValue) {
					result = rightLevel;
					return false;
				}
			}, this);
			return result;
		},

		/**
		 * Returns right level image config.
		 * @private
		 * @return {String}
		 */
		getRightLevelImageConfig: function() {
			var rightLevel = this.get("OperationRightLevel");
			var rightLevelValue = rightLevel ? rightLevel.Value : null;
			var rightLevels = this.Terrasoft.RightsEnums.rightLevels;
			var rightLevelImage = "";
			switch (rightLevelValue) {
				case rightLevels.deny.Value:
					rightLevelImage = "DenyRightLevelButtonImage";
					break;
				case rightLevels.allow.Value:
					rightLevelImage = "AllowRightLevelButtonImage";
					break;
				case rightLevels.allowAndGrant.Value:
					rightLevelImage = "AllowAndGrantRightLevelButtonImage";
					break;
				default:
					return {
						source: this.Terrasoft.ImageSources.URL,
						url: this.Ext.BLANK_IMAGE_URL
					};
			}
			var imageConfig = resources.localizableImages[rightLevelImage];
			return imageConfig;
		},

		/**
		 * Set OperationRightLevel property value.
		 * @param {Object} tag Tag of button on which clicked.
		 * @private
		 */
		setOperationRightLevel: function(tag) {
			this.set("OperationRightLevel", tag);
		},

		/**
		 * Sets DenyVisible property value.
		 * @private
		 * @param {Function} [callback] Callback function.
		 * @param {Object} [scope] Execution context.
		 */
		initDenyVisible: function(callback, scope) {
			var entitySchemaUId = this.get("EntitySchemaUId");
			if (!entitySchemaUId) {
				if (callback) {
					callback.call(scope || this);
				}
				return;
			}
			var packageUId = this.values.packageUId;
			Terrasoft.EntitySchemaManager.findPackageItem(entitySchemaUId, packageUId, function(entitySchema) {
				RightUtilities.getUseDenyRecordRights({
					"schemaName": entitySchema.name
				}, function(useDenyRecord) {
					this.set("DenyVisible", useDenyRecord);
					if (callback) {
						callback.call(scope || this);
					}
				}, this);
			}, this);
		},

		/**
		 * Generates a list for the element drop-down menu.
		 * @private
		 * @return {Terrasoft.BaseViewModelCollection} Menu items collection.
		 */
		getRightLevelMenuItems: function() {
			var menuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
			menuItems.add(this.getButtonMenuItem({
				"caption": resources.localizableStrings.AllowMenuItemCaption,
				"imageConfig": resources.localizableImages.AllowRightLevelButtonImage,
				"tag": Terrasoft.RightsEnums.rightLevels.allow,
				"click": {
					"bindTo": "setOperationRightLevel"
				}
			}));
			menuItems.add(this.getButtonMenuItem({
				"caption": resources.localizableStrings.AllowAndGrantMenuItemCaption,
				"imageConfig": resources.localizableImages.AllowAndGrantRightLevelButtonImage,
				"tag": Terrasoft.RightsEnums.rightLevels.allowAndGrant,
				"click": {
					"bindTo": "setOperationRightLevel"
				}
			}));
			menuItems.add(this.getButtonMenuItem({
				"caption": resources.localizableStrings.DenyMenuItemCaption,
				"imageConfig": resources.localizableImages.DenyRightLevelButtonImage,
				"tag": Terrasoft.RightsEnums.rightLevels.deny,
				"click": {
					"bindTo": "setOperationRightLevel"
				},
				"visible": {
					"bindTo": "DenyVisible"
				}
			}));
			return menuItems;
		},

		/**
		 * Generates a model for the element drop-down menu.
		 * @param {Object} config Menu item config.
		 * @private
		 * @return {Terrasoft.BaseViewModel} Menu item viewModel.
		 */
		getButtonMenuItem: function(config) {
			return this.Ext.create("Terrasoft.BaseViewModel", {
				values: this.Ext.apply({}, config, {
					Id: Terrasoft.generateGUID(),
					Tag: config.tag,
					Caption: config.caption,
					Click: config.click,
					MarkerValue: config.caption,
					ImageConfig: config.imageConfig,
					Visible: config.visible
				})
			});
		},

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.ProcessMiniEditPageMixin#getActiveItemEditName
		 * @overridden
		 */
		getActiveItemEditName: function() {
			return "ProcessAddRightsEditName";
		},

		/**
		 * @inheritdoc Terrasoft.ProcessMiniEditPageMixin#getProcessMiniEditPageId
		 * @overridden
		 */
		getProcessMiniEditPageId: function() {
			return this.sandbox.id + "addrightsedit";
		},

		/**
			 * @inheritdoc Terrasoft.ProcessMiniEditPageMixin#getAddButtonEnabledProperyName
			 * @overridden
			 */
			getAddButtonEnabledProperyName: function() {
				return "IsAddRightsToolsButtonEnabled";
			},

			/**
		 * @inheritdoc Terrasoft.ChangeAdminRightsUserTaskBaseItemViewModel#convertServerObjectToViewModelAttributes
		 * @overridden
		 */
		convertServerObjectToViewModelAttributes: function(values) {
			var operationRightLevel = this.getOperationRightLevel(parseInt(values.OperationRightLevel, 10));
			this.set("OperationRightLevel", operationRightLevel);
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.ChangeAdminRightsUserTaskBaseItemViewModel#getBlockName
		 * @overridden
		 */
		getBlockName: function() {
			return "AddRights";
		},

		/**
		 * @inheritdoc Terrasoft.ChangeAdminRightsUserTaskBaseItemViewModel#convertViewModelAttributesToServerObject
		 * @overridden
		 */
		convertViewModelAttributesToServerObject: function() {
			var operationRightLevel = this.get("OperationRightLevel");
			var operationRightLevelValue = operationRightLevel ? operationRightLevel.Value.toString() : "";
			var config = {
				"OperationRightLevel": operationRightLevelValue
			};
			var defaultConfig = this.callParent(arguments);
			return this.Ext.apply(defaultConfig, config);
		},

		/**
		 * @inheritdoc Terrasoft.BaseModel#setInitialValue
		 * @overridden
		 */
		setInitialValue: function(callback, scope) {
			this.Ext.apply(this.columns, {
				"OperationRightLevel": {
					"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
					"value": Terrasoft.RightsEnums.rightLevels.allow
				},
				"DenyVisible": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": true
				}
			});
			this.callParent(arguments);
			this.initDenyVisible(callback, scope);
		}

		//endregion
	});

	return Terrasoft.ChangeAdminRightsUserTaskAddRightsViewModel;
});


