Terrasoft.configuration.Structures["CtiContainerList"] = {innerHierarchyStack: ["CtiContainerList"]};
define("CtiContainerList", ["terrasoft", "ext-base", "ContainerList", "SchemaBuilderV2"], function(Terrasoft, Ext) {

	/**
	 * Class implements displaying of panel collections.
	 */
	Ext.define("Terrasoft.controls.CtiContainerList", {
		extend: "Terrasoft.ContainerList",
		alternateClassName: "Terrasoft.CtiContainerList",

		/**
		 * Prefix of panel of elements identifier.
		 * @type {String}
		 */
		dataItemIdPrefix: "cti-panel-item",

		/**
		 * Sandbox identifier.
		 * Used to form unique identifier for panel element.
		 * @type {String}
		 */
		sandboxId: "",

		/**
		 * ##### ######## ########## ######.
		 * @type {String}
		 */
		wrapClassName: "list-item-container",

		/**
		 * CSS ######## ######## #########.
		 * @type {String}
		 */
		rowCssSelector: ".list-item-container",

		/**
		 * @inheritdoc Terrasoft.ContainerList#getItemElementId
		 * @overridden
		 */
		getItemElementId: function(item) {
			var id = item.get(this.idProperty);
			return this.dataItemIdPrefix + "-" + id + item.sandbox.id;
		},

		/**
		 * ######## ########## marker value ######## ##########.
		 * @protected
		 * @param {Object} item ####### ######### #######.
		 * @returns {String} ########## marker value ######## ##########.
		 */
		getItemMarkerValue: function(item) {
			var id = item.get(this.idProperty);
			return this.dataItemIdPrefix + "-" + id;
		},

		/**
		 * ########## ############ ############# ######## ######.
		 * @protected
		 * @param {Object} item ####### ######### #######.
		 * @returns {Object} ############ ############# ######## ######.
		 */
		getItemConfig: function(item) {
			var itemConfig = this.defaultItemConfig;
			var itemCfg = {};
			this.fireEvent("onGetItemConfig", itemCfg, item);
			if (itemCfg.config) {
				itemConfig = itemCfg.config;
				this.defaultItemConfig = itemCfg.config;
			}
			if (Ext.isFunction(this.getCustomItemConfig)) {
				itemConfig = this.getCustomItemConfig(item) || itemConfig;
			}
			return Terrasoft.deepClone(itemConfig);
		},

		/**
		 * @inheritdoc Terrasoft.ContainerList#getItemView
		 * @overridden
		 */
		getItemView: function(item) {
			this.sandboxId = item.sandbox.id;
			var itemConfig = this.getItemConfig(item);
			var itemMarkerValue = this.getItemMarkerValue(item);
			var itemElementId = this.getItemElementId(item);
			this.decorateView(itemConfig, itemElementId, this.sandboxId);
			return Ext.create("Terrasoft.Container", {
				id: itemElementId,
				markerValue: itemMarkerValue,
				items: itemConfig,
				classes: {"wrapClassName": [this.wrapClassName]}
			});
		}

	});

});


