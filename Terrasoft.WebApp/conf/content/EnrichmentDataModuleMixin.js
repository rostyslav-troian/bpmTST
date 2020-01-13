Terrasoft.configuration.Structures["EnrichmentDataModuleMixin"] = {innerHierarchyStack: ["EnrichmentDataModuleMixin"]};
define("EnrichmentDataModuleMixin", ["SystemOperationsPermissionsMixin"], function() {
	/**
	 * @class Terrasoft.configuration.mixins.EnrichmentDataModuleMixin
	 * Mixin controls the display of the module data enrichment.
	 */
	Ext.define("Terrasoft.configuration.mixins.EnrichmentDataModuleMixin", {
		alternateClassName: "Terrasoft.EnrichmentDataModuleMixin",
		mixins: {
			SystemOperationsPermissionsMixin: "Terrasoft.SystemOperationsPermissionsMixin"
		},

		/**
		 * Initialize enrichment data module mixin.
		 * @protected
		 */
		init: function() {
			this.subscribeEnrichmentEvents();
		},

		/**
		 * Returns entity schema query with count column.
		 * @abstract
		 * @protected
		 * @return {Terrasoft.EntitySchemaQuery} Entity schema query.
		 */
		getEnrichedDataCountEsq: Terrasoft.abstractFn,

		/**
		 * Gets count of enriched data.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function context.
		 */
		getEnrichedDataCount: function(callback, scope) {
			var esq = this.getEnrichedDataCountEsq();
			Terrasoft.delay(esq.getEntityCollection, esq, 1000, [callback, scope]);
		},

		/**
		 * Subscribes on messages of the sandbox.
		 * @protected
		 */
		subscribeEnrichmentEvents: function() {
			this.sandbox.subscribe("HideEnrichmentDataModule", this.hideEnrichmentModule, this, this.getModuleIds());
			this.sandbox.subscribe("GetDetailId", this.getDetailId, this, this.getModuleIds());
		},

		/**
		 * Hides enrichment module.
		 * @protected
		 */
		hideEnrichmentModule: function() {
			this.set("IsEnrichmentModuleVisible", false);
		},

		/**
		 * Shows enrichment module if there is a right of access.
		 */
		loadEnrichmentModule: function() {
			this.checkEnrichmentPermssions(this.showEnrichmentModule, this);
		},

		/**
		 * Shows enrichment module.
		 * @protected
		 */
		showEnrichmentModule: function() {
			this.saveCardOnShowEnrichmentModule(function() {
				this.set("IsEnrichmentModuleVisible", true);
				this.sandbox.publish("ShowEnrichmentDataModule", this, this.getModuleIds());
			}, this);
		},

		/**
		 * Checks enrichment permissions.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function context.
		 */
		checkEnrichmentPermssions: function(callback, scope) {
			Terrasoft.chain(
				this.checkCanEnrichDataOperation,
				this.checkCanEditRecordRight,
				callback.bind(scope),
				this
			);
		},

		/**
		 * Silent save card.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function context.
		 */
		saveCardOnShowEnrichmentModule: function(callback, scope) {
			var config = {
				isSilent: true,
				callback: callback,
				scope: scope || this
			};
			this.save(config);
		},

		/**
		 * Checks can enrich data operation.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function context.
		 */
		checkCanEnrichDataOperation: function(callback, scope) {
			var operationCode = this.get("EnrichmentOperationCode");
			this.checkCanExecuteOperation(operationCode, function(result) {
				if (result) {
					Ext.callback(callback, scope);
					return;
				}
				this.showPermissionsErrorMessage(operationCode);
			}, this);
		},

		/**
		 * Checks can edit record right.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function context.
		 */
		checkCanEditRecordRight: function(callback, scope) {
			this.checkCanEditRight(function(response) {
				if (response.success) {
					Ext.callback(callback, scope);
					return;
				}
				this.showInformationDialog(response.message);
			}, this);
		}
	});
});


