Terrasoft.configuration.Structures["DcmSchemaFilterProviderModule"] = {innerHierarchyStack: ["DcmSchemaFilterProviderModule"]};
define("DcmSchemaFilterProviderModule", ["terrasoft", "sandbox", "DcmSchemaFilterProviderModuleResources",
		"StructureExplorerUtilities", "LookupUtilities", "EntitySchemaFilterProviderModule"],
	function(Terrasoft, sandbox) {
		/**
		 * @class Terrasoft.data.filters.DcmSchemaFilterProvider
		 * Dcm schema start filters provider.
		 */
		Ext.define("Terrasoft.data.filters.DcmSchemaFilterProvider", {
			extend: "Terrasoft.data.filters.EntitySchemaFilterProvider",
			alternateClassName: "Terrasoft.DcmSchemaFilterProvider",
			sandbox: sandbox,

			/**
			 * @inheritdoc Terrasoft.data.filters.EntitySchemaFilterProvider#shouldHideLookupActions
			 * @override
			 */
			shouldHideLookupActions: true,

			/**
			 * Allowed filter comparison types.
			 * @type {Array}
			 */
			allowedFilterComparisonTypes: null,

			//region Constructors: Public

			constructor: function() {
				this.callParent(arguments);
				this.allowedFilterComparisonTypes = [
					Terrasoft.ComparisonType.EQUAL,
					Terrasoft.ComparisonType.IS_NULL
				];
				this.initEvents();
			},

			//endregion

			//region Methods: Private

			/**
			 * Initialize provider events.
			 * @private
			 */
			initEvents: function() {
				this.addEvents(
					"GetAllowedFilterManageOperations",
					"GetAllowedFilterGroupManageOperations"
				);
			},

			/**
			 * Returns allowed manage operation for filter item.
			 * @private
			 * @param {String} eventName Event to be fired.
			 * @param {Terrasoft.BaseFilter} filterItem Filter item for which manage operation are requested.
			 * @param {Object} defaultManageOperations Default filter item manage operations.
			 * @return {Object}
			 */
			getAllowedManageOperations: function(eventName, filterItem, defaultManageOperations) {
				var eventArgs = {
					filterItem: filterItem,
					allowedManageOperations: Terrasoft.deepClone(defaultManageOperations)
				};
				if (this.fireEvent(eventName, eventArgs) === false) {
					return eventArgs.allowedManageOperations;
				}
				return defaultManageOperations;
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.data.filters.EntitySchemaFilterProvider#getLeftExpressionConfig
			 * @override
			 */
			getLeftExpressionConfig: function() {
				var config = this.callParent(arguments);
				config.lookupsColumnsOnly = true;
				config.useBackwards = false;
				config.displayId = false;
				config.firstColumnsOnly = true;
				return config;
			},

			/**
			 * @inheritdoc Terrasoft.data.filters.EntitySchemaFilterProvider#getSimpleFilterComparisonTypes
			 * @override
			 */
			getSimpleFilterComparisonTypes: function() {
				return this.allowedFilterComparisonTypes;
			},

			/**
			 * @inheritdoc Terrasoft.data.filters.EntitySchemaFilterProvider#getAllowedMacrosTypes
			 * @override
			 */
			getAllowedMacrosTypes: function() {
				return [];
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.data.filters.BaseFilterProvider#getAllowedFilterManageOperations
			 * @override
			 */
			getAllowedFilterManageOperations: function(filter) {
				var allowedManageOperations = this.callParent(arguments);
				return this.getAllowedManageOperations("GetAllowedFilterManageOperations",
					filter, allowedManageOperations);
			},

			/**
			 * @inheritdoc Terrasoft.data.filters.BaseFilterProvider#getAllowedFilterGroupManageOperations
			 * @override
			 */
			getAllowedFilterGroupManageOperations: function(filterGroup) {
				var allowedManageOperations = this.callParent(arguments);
				return this.getAllowedManageOperations("GetAllowedFilterGroupManageOperations",
					filterGroup, allowedManageOperations);
			}

			//endregion

		});

		return Terrasoft.DcmSchemaFilterProvider;
	}
);


