Terrasoft.configuration.Structures["PageUtilities"] = {innerHierarchyStack: ["PageUtilities"]};
define("PageUtilities", [], function() {
	/**
	 * @class Terrasoft.configuration.mixins.PageUtilities
	 * Contains utility methods used by page.
	 */
	Ext.define("Terrasoft.configuration.mixins.PageUtilities", {
		alternateClassName: "Terrasoft.PageUtilities",

		//region Properties: Private

		/**
		 * Default card module.
		 * @private
		 * @type {String}
		 */
		defaultCardModule: "CardModuleV2",

		//endregion

		//region Methods: Protected

		/**
		 * Finds lookup column attribute value.
		 * @protected
		 * @virtual
		 * @param {String} columnName Lookup column name.
		 * @param {Object} attribute Lookup column attribute.
		 * @return {Object} Value of card schema type lookup column.
		 */
		findLookupColumnAttributeValue: function(columnName, attribute) {
			return this.get(columnName + "." + attribute) || this.get(attribute);
		},

		//endregion

		//region Methods: Public

		/**
		 * Opens target page.
		 * @param {Object} config Target page config
		 * @param {String} config.entitySchemaName Name of page entity schema.
		 * @param {String} config.columnName Column name of target record.
		 * @param {String} config.value Value of target record.
		 * @param {Object} config.historyState PushHistoryState additional config.
		 */
		openPage: function(config) {
			var entitySchemaName = config.entitySchemaName;
			var columnName = config.columnName || "";
			var value = config.value || "";
			var moduleStructure = this.getModuleStructure(entitySchemaName);
			var cardSchema = this.getCardSchemaName(entitySchemaName, columnName, value);
			var cardModule = moduleStructure.cardModule || this.defaultCardModule;
			var path = this.Terrasoft.combinePath(cardModule, cardSchema,
					"edit", value);
			var historyStateConfig = {hash: path};
			if (config.historyState) {
				Ext.apply(historyStateConfig, config.historyState);
			}
			this.sandbox.publish("PushHistoryState", historyStateConfig);
		},

		/**
		 * Returns page name from modulePages array found by type column.
		 * Retrieves type value from the view model.
		 * @private
		 * @param {String} columnName Name of the lookup column to be found.
		 * @param {String} attribute Name of the type column.
		 * @param {Array} modulePages Array of the module or entity edit pages.
		 * @return {String} Typed page name.
		 */
		_getCardSchemaNameByType: function(columnName, attribute, modulePages) {
			var cardSchemaType = this.findLookupColumnAttributeValue(columnName, attribute);
			var filteredPages = modulePages.filter(function(item) {
				return ((item.UId === (cardSchemaType && cardSchemaType.value)) && item.cardSchema);
			});
			var page = !Ext.isEmpty(filteredPages) && filteredPages.shift();
			return (page && page.cardSchema) || null;
		},

		/**
		 * Gets the name of the entity editing cards.
		 * @param {String} entitySchemaName Name of entity schema.
		 * @param {String} columnName Column Name.
		 * @return {String} Name of the entity editing cards.
		 */
		getCardSchemaName: function(entitySchemaName, columnName) {
			var structure = this.getModuleStructure(entitySchemaName) || this.getEntityStructure(entitySchemaName);
			if (!structure) {
				throw new Terrasoft.ItemNotFoundException();
			}
			var cardSchemaName = structure.cardSchema;
			var attribute = structure && structure.attribute;
			var modulePages = Terrasoft.deepClone(structure.pages);
			var defaultPage = modulePages && modulePages.shift();
			if (attribute) {
				var typedCardName = this._getCardSchemaNameByType(columnName, attribute, structure.pages);
				cardSchemaName = typedCardName || cardSchemaName;
			}
			cardSchemaName = cardSchemaName || (defaultPage && defaultPage.cardSchema);
			return cardSchemaName;
		},

		/**
		 * Returns structure of the module.
		 * @param {String} moduleName Name of the module.
		 * @return {Object} Structure of the module.
		 */
		getModuleStructure: function(moduleName) {
			return Terrasoft.ModuleUtils.getModuleStructureByName(moduleName || this.entitySchemaName);
		},

		/**
		 * Returns entity schema information from entity structure for entitySchemaName.
		 * If it is not specified, use entitySchemaName field of the current class instance.
		 * @protected
		 * @param {String} [entitySchemaName] Entity schema name.
		 * @return {Object} Entity schema information.
		 */
		getEntityStructure: function(entitySchemaName) {
			return Terrasoft.ModuleUtils.getEntityStructureByName(entitySchemaName || this.entitySchemaName);
		}

		//endregion
	});

	return Terrasoft.PageUtilities;
});


