Terrasoft.configuration.Structures["MLModelPageFiltersMixin"] = {innerHierarchyStack: ["MLModelPageFiltersMixin"]};
define("MLModelPageFiltersMixin", ["terrasoft"],
	function(Terrasoft) {
		/**
		 * @class Terrasoft.configuration.mixins.MLModelPageFiltersMixin
		 * Mixin that separates filter logic out of MLModelPage
		 */
		Ext.define("Terrasoft.configuration.mixins.MLModelPageFiltersMixin", {
			alternateClassName: "Terrasoft.MLModelPageFiltersMixin",

			//region Properties: Public

			/**
			 * Contains flags indicating that every particular filter is loaded.
			 * @type {Object}
			 */
			filterDataLoaded: {
				/**
				 * Indicates that training query filter module is loaded.
				 * @type {Boolean}
				*/
				TrainingFilterData: false,

				/**
				 * Indicates that training output filter module is loaded.
				 * @type {Boolean}
				 */
				TrainingOutputFilterData: false,

				/**
				 * Indicates that batch prediction filter module is loaded.
				 * @type {Boolean}
				 */
				BatchPredictionFilterData: false
			},

			//endregion

			//region Methods: Private

			/**
			 * @private
			 * @param {String} filterDataAttrName Attribute of the model stores filter edit data.
			 */
			_getFilterContainerId: function(filterDataAttrName) {
				return filterDataAttrName + "Container";
			},

			/**
			 * Returns the identifier of the training query filter unit module.
			 * @private
			 * @param {String} filterDataAttrName Attribute of the model stores filter edit data.
			 * @return {String}
			 */
			_getFilterUnitModuleId: function(filterDataAttrName) {
				return this.sandbox.id + "_" + filterDataAttrName + "EditModule";
			},

			/**
			 * Loads the filter unit module.
			 * @private
			 * @param {String} entitySchemaName Filter root entity schema name.
			 * @param {String} filterDataAttrName Attribute of the model stores filter edit data.
			 */
			_loadFilterUnitModule: function(entitySchemaName, filterDataAttrName) {
				const filterContainerId = this._getFilterContainerId(filterDataAttrName);
				if (!this.Ext.get(filterContainerId)) {
					return;
				}
				const moduleId = this._getFilterUnitModuleId(filterDataAttrName);
				this.sandbox.subscribe("OnFiltersChanged",
					this._onFiltersChanged.bind(this, filterDataAttrName), this, [moduleId]);
				this.sandbox.subscribe("GetFilterModuleConfig", function() {
					return this._getFilterModuleConfig(filterDataAttrName, entitySchemaName);
				}, this, [moduleId]);
				this.sandbox.loadModule("FilterEditModule", {
					renderTo: filterContainerId,
					id: moduleId
				});
				this.filterDataLoaded[filterDataAttrName] = true;
			},

			/**
			 * Updates filter unit module.
			 * @private
			 * @param {String} filterDataAttrName Attribute of the model stores filter edit data.
			 */
			_updateFilterModule: function(filterDataAttrName) {
				const referenceSchemaUId = this.get("RootSchemaUId");
				if (!referenceSchemaUId) {
					this._unloadFilterUnitModule(filterDataAttrName);
					return;
				}
				Terrasoft.EntitySchemaManager.findItemByUId(referenceSchemaUId, function(entitySchema) {
					const entitySchemaName = entitySchema && entitySchema.name;
					if (!this.filterDataLoaded[filterDataAttrName]) {
						this._loadFilterUnitModule(entitySchemaName, filterDataAttrName);
						return;
					}
					const moduleId = this._getFilterUnitModuleId(filterDataAttrName);
					const filterModuleConfig = this._getFilterModuleConfig(filterDataAttrName, entitySchemaName);
					this.sandbox.publish("SetFilterModuleConfig", filterModuleConfig, [moduleId]);
				}, this);
			},

			/**
			 * Unloads the training query filter unit module.
			 * @private
			 * @param {String} filterDataAttrName Attribute of the model stores filter edit data.
			 */
			_unloadFilterUnitModule: function(filterDataAttrName) {
				if (this.filterDataLoaded[filterDataAttrName]) {
					const moduleId = this._getFilterUnitModuleId(filterDataAttrName);
					this.sandbox.unloadModule(moduleId);
					this.filterDataLoaded[filterDataAttrName] = false;
				}
			},

			/**
			 * Returns settings for the filter unit.
			 * @private
			 * @param {String} filterDataAttrName Attribute of the model stores filter edit data.
			 * @param {String} entitySchemaName The entity schema name.
			 * return {Object} Filter unit settings.
			 */
			_getFilterModuleConfig: function(filterDataAttrName, entitySchemaName) {
				return {
					rootSchemaName: entitySchemaName,
					filters: this.get(filterDataAttrName),
					rightExpressionMenuAligned: true,
					entitySchemaFilterProviderConfig: {
						canDisplayId: true,
						shouldHideLookupActions: true,
						isColumnSettingsHidden: true
					}
				};
			},

			/**
			 * The event handler on filters changed.
			 * @private
			 * @param {String} filterDataAttrName Attribute of the model stores filter edit data.
			 * @param {Object} args Event arguments.
			 * @param {Terrasoft.FilterGroup} args.filter Filter object.
			 * @param {String} args.serializedFilter Serialized filter object.
			 */
			_onFiltersChanged: function(filterDataAttrName, args) {
				if (!this.emptyFilterData) {
					const filterGroup = this.Ext.create("Terrasoft.FilterGroup");
					this.emptyFilterData = filterGroup.serialize();
				}
				const emptyFilterData = this.emptyFilterData;
				const newFilterData = args.serializedFilter;
				const prevFilterData = this.get(filterDataAttrName);
				if (emptyFilterData === newFilterData || prevFilterData === newFilterData) {
					return;
				}
				const wasPrevFilterEmpty = this.Ext.isEmpty(prevFilterData) || prevFilterData === emptyFilterData;
				const isNewFilterEmpty = args.filter && args.filter.getCount() === 0;
				if (wasPrevFilterEmpty && isNewFilterEmpty) {
					return;
				}
				this.set(filterDataAttrName, newFilterData);
			},

			//endregion

			//region Methods: Public

			/**
			 * Updates the training query filter unit module.
			 */
			updateTrainingFilterModule: function() {
				this._updateFilterModule("TrainingFilterData");
			},

			/**
			 * Updates the training query filter unit module.
			 */
			updateTrainingOutputFilterModule: function() {
				if (this.getIsScoring()) {
					this._updateFilterModule("TrainingOutputFilterData");
				}
			},

			/**
			 * Updates the batch prediction query filter unit module.
			 */
			updateBatchPredictionFilterUnitModule: function() {
				if (this.getIsNotClassification()) {
					this._updateFilterModule("BatchPredictionFilterData");
				}
			},

			/**
			 * Unloads the training query filter unit module.
			 */
			unloadTrainingFilterUnitModule: function() {
				this._unloadFilterUnitModule("TrainingFilterData");
			},

			/**
			 * Unloads the training output filter unit module.
			 */
			unloadTrainingOutputFilterUnitModule: function() {
				this._unloadFilterUnitModule("TrainingOutputFilterData");
			},

			/**
			 * Unloads the batch prediction query filter unit module.
			 */
			unloadBatchPredictionFilterUnitModule: function() {
				this._unloadFilterUnitModule("BatchPredictionFilterData");
			}

			//endregion

		});

		return Terrasoft.MLModelPageFiltersMixin;
	});


