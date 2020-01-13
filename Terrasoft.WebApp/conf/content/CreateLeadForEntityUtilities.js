Terrasoft.configuration.Structures["CreateLeadForEntityUtilities"] = {innerHierarchyStack: ["CreateLeadForEntityUtilities"]};
define("CreateLeadForEntityUtilities", ["CreateLeadForEntityUtilitiesResources"],
	function(resources) {
		return Ext.define("Terrasoft.configuration.mixins.CreateLeadForEntityUtilities", {
			alternateClassName: "Terrasoft.CreateLeadForEntityUtilities",

			//region Properties: Private

			/**
			 * The prefix code of system setting.
			 * @private
			 * @type {String}
			 */
			sysSettingCodePrefix: null,

			/**
			 * The value of system setting.
			 * @private
			 * @type {Boolean}
			 */
			sysSettingValue: false,

			//endregion

			//region Methods: Protected

			/**
			 * Loads value of system setting.
			 * @protected
			 */
			loadSysSetting: function() {
				var sysSettingName = this.getSysSettingName();
				Terrasoft.SysSettings.querySysSettingsItem(sysSettingName, function(value) {
					this.sysSettingValue = value;
				}, this);
			},

			/**
			 * Returns name of system setting.
			 * @protected
			 * @return {String} A name.
			 */
			getSysSettingName: function() {
				return this.sysSettingCodePrefix + this.entitySchemaName;
			},

			/**
			 * Returns a select query the number of leads in the entity.
			 * @protected
			 * @return {Terrasoft.EntitySchemaQuery}
			 */
			getLeadCountESQ: function() {
				var leadEsq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "Lead"
				});
				leadEsq.addAggregationSchemaColumn("Id", this.Terrasoft.AggregationType.COUNT, "Count");
				leadEsq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, this.entitySchemaName, this.get("Id")));
				return leadEsq;
			},

			/**
			 * Creating a lead for entity if there is no.
			 * @protected
			 * @param {Function} [callback]  The callback function.
			 * @param {Object} [scope] Scope for callback.
			 */
			createLeadIfNotExist: function(callback, scope) {
				var esq = this.getLeadCountESQ();
				esq.getEntityCollection(function(response) {
					if (response && response.success) {
						var collection = response.collection;
						if (collection && collection.getCount() > 0) {
							var count = collection.getByIndex(0).get("Count");
							if (count === 0) {
								this.createLead(callback, scope);
							}
						}
					}
					if (response.errorInfo) {
						this.showInformationDialog(response.errorInfo.message);
					}
					if (callback) {
						callback.call(scope || this);
					}
				}, this);
			},

			/**
			 * Creating a lead for opportunity.
			 * @protected
			 * @param {Function} [callback]  The callback function.
			 * @param {Object} [scope] Scope for callback.
			 */
			createLead: function(callback, scope) {
				var insert = Ext.create("Terrasoft.InsertQuery", {
					rootSchemaName: "Lead"
				});
				insert.setParameterValue(this.entitySchemaName,
					this.get("Id"), Terrasoft.DataValueType.GUID);
				this.addQueryColumns(insert);
				insert.execute(function(response) {
					if (response.errorInfo) {
						this.showInformationDialog(response.errorInfo.message);
					}
					if (callback) {
						callback.call(scope || this);
					}
				}, this);
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritDoc Terrasoft.BaseSchemaModule#init
			 * @overridden
			 */
			init: function() {
				this.sysSettingCodePrefix = resources.localizableStrings.SysSettingCodePrefix;
				this.loadSysSetting();
			},

			/**
			 * Creates lead after save entity.
			 * @param {Function} [callback] The callback function.
			 * @param {Object} [scope] Scope for callback.
			 */
			createLeadAfterSave: function(callback, scope) {
				if (this.sysSettingValue && this.isNewMode()) {
					this.createLeadIfNotExist(callback);
					return;
				}
				if (callback) {
					callback.call(scope || this);
				}
			},

			/**
			 * Adds columns with values to the query.
			 * @param {Terrasoft.InsertQuery} insert Query to save lead.
			 */
			addQueryColumns: this.Terrasoft.emptyFn

			//endgerion

		});
	});


