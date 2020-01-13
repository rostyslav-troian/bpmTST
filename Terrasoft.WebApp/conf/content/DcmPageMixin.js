Terrasoft.configuration.Structures["DcmPageMixin"] = {innerHierarchyStack: ["DcmPageMixin"]};
define("DcmPageMixin", ["ext-base", "terrasoft", "DcmPageMixinResources", "DcmMixin"
], function(Ext, Terrasoft) {
	Ext.define("Terrasoft.configuration.mixins.DcmPageMixin", {
		extend: "Terrasoft.configuration.mixins.DcmMixin",
		alternateClassName: "Terrasoft.DcmPageMixin",

		activityConnectionColumnName: null,

		/**
		 * Event filter column names.
		 * @private
		 * @type {String}
		 */
		_eventFilterColumnNames: null,

		/**
		 * Array filtered columns.
		 * @private
		 * @type {Array}
		 */
		_filteredColumns: null,

		//region Methods: Private

		/**
		 * Returns EntitySchemaQuery for schema EntityConnection filtered by SysEntitySchemaUId.
		 * @private
		 * @param {String} entitySchemaUId Entity schema unique identifier.
		 * @return {Terrasoft.EntitySchemaQuery}
		 */
		getEntityConnectionSchemaQuery: function(entitySchemaUId) {
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "EntityConnection"
			});
			esq.addColumn("ColumnUId");
			var filter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
				"SysEntitySchemaUId", entitySchemaUId);
			esq.filters.addItem(filter);
			return esq;
		},

		/**
		 * Looking for activity connection reference column name for current page entity schema.
		 * @private
		 * @param {Function} callback The callback function.
		 * @param {String} callback.column Found column name or empty string.
		 * @param {Object} scope The scope of callback function.
		 */
		findActivityConnectionColumnName: function(callback, scope) {
			if (!Ext.isEmpty(this.activityConnectionColumnName, true)) {
				callback.call(scope, this.activityConnectionColumnName);
			} else {
				this.getEntitySchemaByName("Activity", function(activity) {
					var esq = this.getEntityConnectionSchemaQuery(activity.uId);
					esq.getEntityCollection(function(result) {
						var referenceColumn = null;
						result.collection.each(function(item) {
							referenceColumn = Terrasoft.findWhere(activity.columns, {
								uId: item.get("ColumnUId"),
								referenceSchemaName: this.entitySchemaName
							});
							if (referenceColumn) {
								return false;
							}
						}, this);
						this.activityConnectionColumnName = referenceColumn ? referenceColumn.name : "";
						callback.call(scope, this.activityConnectionColumnName);
					}, this);
				}, this);
			}
		},

		/**
		 * Subscribes on view model column changes to actualize DcmActionsDashboard.
		 * @private
		 * @param {Function} callback The Callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		subscribeOnColumnsChange: function(callback, scope) {
			Terrasoft.DcmUtilities.getFilteredColumns(this, function(filteredColumns) {
				this._filteredColumns = Ext.clone(filteredColumns);
				if (filteredColumns.length > 0) {
					var eventNames = filteredColumns.map(function(columnName) {
						return "change:" + columnName;
					});
					var event = this._eventFilterColumnNames = eventNames.join(" ");
					this.on(event, this.actualizeDcmActionsDashboard, this);
				}
				callback.call(scope);
			}, this);
		},

		/**
		 * Updates DcmActionsDashboardModule configuration.
		 * @private
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function context.
		 */
		updateDcmActionsDashboardConfig: function(callback, scope) {
			if (!this.get("HasAnyDcm")) {
				this.createDcmConfig({}, function(dcmConfig) {
					this.set("DcmConfig", dcmConfig);
					this.set("HasActiveDcm", false);
					Ext.callback(callback, scope);
				}, this);
				return;
			}
			Terrasoft.DcmUtilities.findRunningDcmSchemaUId(this, function(runningSchemaUId, isRunningSchemaActive) {
				var dcmSchemaManagerItem = Terrasoft.DcmUtilities.findActualDcmSchemaManagerItem(this);
				var actualSchemaUId = dcmSchemaManagerItem ? dcmSchemaManagerItem.getUId() : null;
				var config = {
					dcmSchemaUId: isRunningSchemaActive ? runningSchemaUId : actualSchemaUId,
					actualDcmSchemaUId: actualSchemaUId,
					runningSchemaUId: runningSchemaUId
				};
				this.createDcmConfig(config, function(dcmConfig) {
					this.set("DcmConfig", dcmConfig);
					this.set("HasActiveDcm", true);
					callback.call(scope);
				}, this);
			}, this);
		},

		/**
		 * Creates new dcm module config.
		 * @private
		 * @param {Object} config Configuration object.
		 * @param {String} config.dcmSchemaUId Current dcm schema identifier.
		 * @param {String} config.actualDcmSchemaUId Actual dcm schema identifier.
		 * @param {String} config.runningSchemaUId Running dcm schema identifier.
		 * @param {Function} callback The callback function.
		 * @param {Object} callback.dcmConfig New dcm config.
		 * @param {Object} scope The scope of callback function.
		 */
		createDcmConfig: function(config, callback, scope) {
			var newDcmConfig = {
				"dcmSchemaUId": config.dcmSchemaUId || null,
				"actualDcmSchemaUId": config.actualDcmSchemaUId || null,
				"runningSchemaUId": config.runningSchemaUId || null,
				"entitySchemaName": this.entitySchemaName
			};
			this.findActivityConnectionColumnName(function(activityColumnName) {
				if (activityColumnName) {
					newDcmConfig.dashboardConfig = {
						"Activity": {
							"masterColumnName": "Id",
							"referenceColumnName": activityColumnName,
							"referenceColumnSchemaName": this.entitySchemaName
						}
					};
				}
				callback.call(scope, newDcmConfig);
			}, this);
		},

		/**
		 * Subscribes for ActionsDashboard messages.
		 * @private
		 */
		subscribeActionsDashboardMessages: function() {
			var dcmActionsDashboardModuleId = this.getModuleId("DcmActionsDashboardModule");
			this.sandbox.subscribe("UpdateDcmActionsDashboardConfig", function(config) {
				this.updateDcmActionsDashboardConfig(config.callback, config.scope);
			}, this, [dcmActionsDashboardModuleId]);
			this.sandbox.subscribe("IsDcmFilterColumnChanged", this._isDcmFilterColumnsChanged, this,
				[dcmActionsDashboardModuleId]);
		},

		/**
		 * @private
		 */
		_isDcmFilterColumnsChanged: function() {
			const changeColumns = this.getChangedEntityColumns();
			const result = _.intersection(changeColumns, this._filteredColumns);
			return result.length > 0;
		},

		//endregion

		//region Methods: Public

		/**
		 * Initializes DcmActionsDashboard visibility.
		 * @param {Function} [callback] Callback method.
		 * @param {Object} [scope] Callback method context.
		 */
		initDcmActionsDashboardVisibility: function(callback, scope) {
			if (!this.entitySchema) {
				this.set("HasActiveDcm", false);
				return Ext.callback(callback, scope);
			}
			if (!this.get("HasAnyDcm")) {
				this.createDcmConfig({}, function(dcmConfig) {
					this.set("DcmConfig", dcmConfig);
					this.set("HasActiveDcm", false);
					Ext.callback(callback, scope);
				}, this);
				return;
			}
			Terrasoft.chain(
				function(next) {
					this.subscribeOnColumnsChange(next, this);
				},
				function(next) {
					this.updateDcmActionsDashboardConfig(next, this);
				},
				function() {
					this.subscribeActionsDashboardMessages();
					Ext.callback(callback, scope);
				}, this
			);
		},

		/**
		 * Unsubscribes on view model column changes.
		 */
		unsubscribeOnColumnsChange: function() {
			this.un(this._eventFilterColumnNames, this.actualizeDcmActionsDashboard, this);
		},

		/**
		 * Actualize DcmActionsDashboard. If new dcm schema is available, sets actual DcmConfig attribute value and
		 * publish ReInitializeActionsDashboard message.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function call context.
		 */
		actualizeDcmActionsDashboard: function(callback, scope) {
			this.updateDcmActionsDashboardConfig(function() {
				var tags = [
					this.getModuleId("ActionsDashboardModule"),
					this.getModuleId("DcmActionsDashboardModule")
				];
				this.sandbox.publish("ReInitializeActionsDashboard", null, tags);
				Ext.callback(callback, scope);
			}, this);
		}

		//endregion

	});
	return Ext.create("Terrasoft.DcmPageMixin");
});


