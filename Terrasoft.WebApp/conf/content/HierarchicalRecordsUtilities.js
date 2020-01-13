Terrasoft.configuration.Structures["HierarchicalRecordsUtilities"] = {innerHierarchyStack: ["HierarchicalRecordsUtilities"]};
define("HierarchicalRecordsUtilities", [],
		function() {
			var HierarchicalRecordsUtilitiesClass =
					this.Ext.define("Terrasoft.configuration.mixins.HierarchicalRecordsUtilities", {

						alternateClassName: "Terrasoft.HierarchicalRecordsUtilities",

						/**
						 * Initialize Hierarchical records service parameters.
						 */
						initConfig: function() {
							this.callParent(arguments);
							var entitySchemaName = this.entitySchemaName;
							var config = this.mixins.HierarchicalRecordsUtilities.getConfig.call(this);
							config.data.request.SchemaTableName = entitySchemaName;
							config.data.request.ParentIdColumnName = "Parent" + entitySchemaName + "Id";
							this.set("HierarchicalConfig", config);
							this.set("ParentColumnName", "Parent" + entitySchemaName);
						},

						/**
						 * Returns Hierarchical records service config object.
						 * @return {Object} service config.
						 */
						getConfig: function() {
							var config = {
								serviceName: "HierarchicalRecordSelectService",
								methodName: "GetRecords",
								data: {
									request: {
										Id: "",
										SchemaTableName: "",
										ParentIdColumnName: "",
										Type: ""
									}
								}
							};
							return config;
						},

						/**
						 * Fill filter of parent field
						 * @param {Array} childrenCollection Full deep collection of children items.
						 */
						createParentFilters: function(childrenCollection) {
							var parentColumnName = this.get("ParentColumnName");
							var filtersCollection = this.Terrasoft.createFilterGroup();
							var notSelfFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.NOT_EQUAL, "Id",
									this.get("Id"));
							filtersCollection.add("notSelfFilter", notSelfFilter);
							var notChildrenFilter = this.Terrasoft.createColumnInFilterWithParameters("Id", childrenCollection);
							notChildrenFilter.comparisonType = this.Terrasoft.ComparisonType.NOT_EQUAL;
							filtersCollection.add("notChildrenFilter", notChildrenFilter);
							this.set(parentColumnName + "Filters", filtersCollection);
							if (this.get("IsLoadVocabulary")) {
								this.set("IsLoadVocabulary", null);
								this.loadVocabulary(this, parentColumnName);
							} else {
								this.loadLookupData(this.get("ParentFilterText"),
										this.get(parentColumnName + "List"), parentColumnName, true);
							}
						},

						/**
						 * Gets collection of lookup`s child records.
						 */
						onLoadParent: function() {
							this.set("IsLoadVocabulary", true);
							this.mixins.HierarchicalRecordsUtilities.getChildrenCollection.call(this, this.get("Id"));
						},

						/**
						 * Gets collection of child records for list.
						 * @param {String} filter Filtration value.
						 */
						onPrepareParent: function(filter) {
							this.set("ParentFilterText", filter);
							this.mixins.HierarchicalRecordsUtilities.getChildrenCollection.call(this, this.get("Id"));
						},

						/**
						 * Calls service that returns child records.
						 * @param {Guid} item Parent element id.
						 */
						getChildrenCollection: function(item) {
							var config = this.get("HierarchicalConfig");
							config.data.request.Id = item;
							this.callService(config, this.mixins.HierarchicalRecordsUtilities.onSelectRecords, this);
						},

						/**
						 * CallBack of the function getChildrenCollection
						 * @private
						 * @param {Object} responseObject HierarchicalRecordSelectService/GetRecords service response.
						 */
						onSelectRecords: function(responseObject) {
							var parentColumnName = this.get("ParentColumnName");
							var result = responseObject.GetRecordsResult;
							if (this.get("IsLoadVocabulary")) {
								if (result) {
									this.mixins.HierarchicalRecordsUtilities.createParentFilters.call(this, result);
								} else {
									this.loadVocabulary(this, parentColumnName);
								}
							} else {
								if (result) {
									this.mixins.HierarchicalRecordsUtilities.createParentFilters.call(this, result);
								}
							}
						}
					});
			return Ext.create(HierarchicalRecordsUtilitiesClass);
		});


