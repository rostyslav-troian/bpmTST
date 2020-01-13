Terrasoft.configuration.Structures["DashboardManagerItem"] = {innerHierarchyStack: ["DashboardManagerItem"]};
define("DashboardManagerItem", ["DashboardManagerItemResources", "css!DashboardManagerItem"],
function(resources) {

	/**
	 * @class Terrasoft.DashboardManagerItem
	 * @public
	 * ##### ############ ####.
	 */
	Ext.define("Terrasoft.DashboardManagerItem", {
		extend: "Terrasoft.ObjectManagerItem",
		alternateClassName: "Terrasoft.DashboardManagerItem",

		// region Properties: Private

		/**
		 * #########.
		 * @private
		 * @type {String}
		 */
		caption: null,

		/**
		 * ############# #######.
		 * @private
		 * @type {String}
		 */
		sectionId: null,

		/**
		 * ############ ########### #########.
		 * @private
		 * @type {Object[]}
		 */
		viewConfig: null,

		/**
		 * ############ ####### #########.
		 * @private
		 * @type {Object}
		 */
		items: null,

		/**
		 * ####### ########.
		 * @private
		 * @type {Number}
		 */
		position: null,

		/**
		 * ###### ################# ##########.
		 * @type {String[]}
		 */
		encodedProperties: ["viewConfig", "items"],

		// endregion

		// region Methods: Private

		/**
		 * Changes items and viewConfig names.
		 * @private
		 * @type {Terrasoft.DashboardManagerItem}
		 */
		_changeItemsAndConfigNames: function(managerItem) {
			const items = managerItem.getItems();
			const names = Object.keys(managerItem.items);
			const viewConfig = managerItem.getViewConfig();
			Terrasoft.each(names, function(name) {
				const oldName = name;
				const newGuid = Terrasoft.generateGUID();
				const guidPart = newGuid.substr(newGuid.length - 12);
				const newName = oldName.substr(0, oldName.length - 12) + guidPart;
				items[newName] = items[oldName];
				delete items[oldName];
				Terrasoft.each(viewConfig, function(viewConfigItem) {
					if (viewConfigItem.name === oldName) {
						viewConfigItem.name = newName;
					}
				});
			});
			managerItem.setItems(items);
			managerItem.setViewConfig(viewConfig);
		},

		// endregion

		//region Properties: Public

		/**
		 * ####### ########## #####.
		 * @type {Boolean}
		 */
		isValid: false,

		//endregion

		// region Methods: Public

		/**
		 * ##### ########## #########.
		 * @return {String}
		 */
		getCaption: function() {
			return this.caption;
		},

		/**
		 * ##### ########## ############ ########### #########.
		 * @return {Object}
		 */
		getViewConfig: function() {
			return Terrasoft.deepClone(this.viewConfig);
		},

		/**
		 * Returns view config with visible items only.
		 * @return {Object}
		 */
		getVisibleViewConfig: function() {
			const items = this.getItems();
			const viewConfig = this.getViewConfig();
			const result = [];
			viewConfig.forEach(function(config) {
				if (items[config.name]) {
					result.push(config);
				}
			}, this);
			return result;
		},

		/**
		 * ##### ########## ############ ####### #########.
		 * @return {Object}
		 */
		getItems: function() {
			return Terrasoft.deepClone(this.items);
		},

		/**
		 * Returns visible items.
		 * @return {Object}
		 */
		getVisibleItems: function() {
			const items = this.getItems();
			const viewConfig = this.getViewConfig();
			const result = {};
			viewConfig.forEach(function(config) {
				if (items[config.name]) {
					result[config.name] = items[config.name];
				}
			}, this);
			return result;
		},

		/**
		 * ##### ########## ####### ########.
		 * @return {Number} ########## ####### ########
		 */
		getPosition: function() {
			return this.position;
		},

		/**
		 * ##### ########## ############# #######.
		 * @return {String} ########## ############# #######.
		 */
		getSectionId: function() {
			return this.sectionId;
		},

		getInvalidDashboardViewConfig: function() {
			var viewConfig = [{
				"layout": {"column": 0, "row": 0, "colSpan": 24, "rowSpan": 3},
				"name": this.id + "dashboard-manager-item-error-container",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {
					"wrapClassName": ["invalid-dashboard-manager-item-container"]
				},
				"controlConfig": {
					"items": [
						{
							className: "Terrasoft.ImageEdit",
							readonly: true,
							classes: {
								wrapClass: ["image-control"]
							},
							"imageSrc": Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.InfoImage)
						},
						{
							"className": "Terrasoft.Label",
							"labelClass": ["invalid-dashboard-manager-item-title"],
							"caption": resources.localizableStrings.CantShowDashboard
						},
						{
							"className": "Terrasoft.Label",
							"labelClass": ["invalid-dashboard-manager-item-hint"],
							"caption": resources.localizableStrings.CantShowDashboardHint
						}
					]
				}
			}];
			return viewConfig;
		},

		/**
		 * @inheritDoc Terrasoft.manager.ObjectManagerItem#setProperties
		 * @overridden
		 */
		setProperties: function() {
			this.callParent(arguments);
			try {
				this.viewConfig = (this.viewConfig && Terrasoft.decode(this.viewConfig)) || [];
				this.items = (this.items && Terrasoft.decode(this.items)) || {};
				this.isValid = true;
			} catch (e) {
				this.isValid = false;
				this.viewConfig = this.getInvalidDashboardViewConfig();
				this.items = {};
				var logMessage = Ext.String.format(resources.localizableStrings.InvalidJSONMessage, this.id, e.message);
				this.log(logMessage, Terrasoft.LogMessageType.ERROR);
			}
		},

		/**
		 * @inheritDoc Terrasoft.manager.ObjectManagerItem#setPropertyValue
		 * @overridden
		 */
		setPropertyValue: function(propertyName, propertyValue) {
			if (this.encodedProperties.indexOf(propertyName) !== -1) {
				var encodedPropertyValue = Terrasoft.encode(propertyValue);
				this.callParent([propertyName, encodedPropertyValue]);
				this[propertyName] = propertyValue;
			} else {
				this.callParent(arguments);
			}
		},

		/**
		 * ##### ############# ######## ### ######### ########.
		 * @public
		 * @param {String} caption #########.
		 */
		setCaption: function(caption) {
			this.setPropertyValue("caption", caption);
		},

		/**
		 * ##### ############# ####### ########.
		 * @param {Number} position #######.
		 */
		setPosition: function(position) {
			this.setPropertyValue("position", position);
		},

		/**
		 * ##### ############# ############ ########### #########.
		 * @param {Object[]} viewConfig ############ ########### #########.
		 */
		setViewConfig: function(viewConfig) {
			this.viewConfig = Terrasoft.deepClone(viewConfig);
			this.setPropertyValue("viewConfig", this.viewConfig);
		},

		/**
		 * ##### ############# ############ ####### #########.
		 * @param {Object} items ############ ####### #########.
		 */
		setItems: function(items) {
			this.items = Terrasoft.deepClone(items);
			this.setPropertyValue("items", this.items);
		},

		/**
		 * ##### ############# ############# #######.
		 * @param {String} sectionId ############# #######.
		 */
		setSectionId: function() {
			this.setPropertyValue("sectionId", this.sectionId);
		},

		/**
		 * @inheritDoc Terrasoft.manager.BaseManagerItem#getSerializedPropertiesConfig
		 * @overridden
		 */
		getSerializedPropertiesConfig: function() {
			var config = this.callParent(arguments);
			Ext.apply(config, {
				"caption": {
				},
				"viewConfig": {
				},
				"items": {
				},
				"position": {
				},
				"sectionId": {
				},
				"encodedProperties": {
				},
				"propertyColumnNames": {
				}
			});
			return config;
		},

		/**
		 * @inheritDoc Terrasoft.manager.BaseManagerItem#copy
		 * @overridden
		 */
		copy: function() {
			var copy = this.callParent(arguments);
			var newCaption = Ext.String.format(resources.localizableStrings.CopyCaptionFormat, copy.getCaption());
			copy.setCaption(newCaption);
			this._changeItemsAndConfigNames(copy);
			return copy;
		},

		/**
		 * Returns widget config by name.
		 * @param {String} widgetName Widget name.
		 * @return {Object} Widget config.
		 */
		getWidgetItem: function(widgetName) {
			var items = this.getItems();
			return items[widgetName];
		},

		/**
		 * Sets widget config by name.
		 * @param {String} widgetName Widget name.
		 * @param {Object} widgetConfig Widget config.
		 */
		setWidgetItem: function(widgetName, widgetConfig) {
			var items = this.getItems();
			items[widgetName] = widgetConfig;
			this.setItems(items);
		},

		/**
		 * Removes widget config by name.
		 * @param {String} widgetName Widget name.
		 */
		removeWidgetItem: function(widgetName) {
			var items = this.getItems();
			delete items[widgetName];
			this.setItems(items);
		}

		// endregion

	});
	return Terrasoft.DashboardManagerItem;
});


