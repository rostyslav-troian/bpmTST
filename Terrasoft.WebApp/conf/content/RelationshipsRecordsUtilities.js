Terrasoft.configuration.Structures["RelationshipsRecordsUtilities"] = {innerHierarchyStack: ["RelationshipsRecordsUtilities"]};
define("RelationshipsRecordsUtilities", [],
	function() {
		var RelationshipsRecordsUtilitiesClass =
				this.Ext.define("Terrasoft.configuration.mixins.RelationshipsRecordsUtilities", {
				alternateClassName: "Terrasoft.RelationshipsRecordsUtilities",

			/**
			 * Returns Hierarchical records service config object.
			 * @param {Guid} parentId
			 * @param {Guid} childId
			 * @param {String} schemaName
			 * @param {String} ParentColumnName
			 * @return {Object} service config.
			 */
			getConfig: function(parentId, childId, schemaName, parentColumnName) {
				var config = {
					serviceName: "HierarchicalRecordSelectService",
					methodName: "UpdateRecords",
					data: {
						request: {
							ParentId: parentId,
							ChildrenIds: childId,
							SchemaName: schemaName,
							ParentColumnName: parentColumnName
						}
					}
				};
				return config;
			},
			/**
			 * Return filter: not current element, not parent element, not child element.
			 * @param {Guid} masterRecordId
			 * @param {Object} parentRecord
			 * @param {String} lookupName
			 * @returns {*|Terrasoft.FilterGroup} filter.
			 */
			getHierarchicalFilter: function(masterRecordId, parentRecord, lookupName) {
				var filtersCollection = this.Terrasoft.createFilterGroup();
				var notSelfFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.NOT_EQUAL, "Id",
						masterRecordId);
				filtersCollection.add("notSelfFilter", notSelfFilter);
				if(parentRecord) {
					var notParentFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.NOT_EQUAL, "Id",
							parentRecord.value);
					filtersCollection.add("notParentFilter", notParentFilter);
				}
				var notChildFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.NOT_EQUAL, lookupName,
						masterRecordId);
				var subFilter = this.Terrasoft.createFilterGroup();
				subFilter.logicalOperation = Terrasoft.LogicalOperatorType.OR;
				subFilter.add("ParentItemNull", Terrasoft.createColumnIsNullFilter(lookupName));
				subFilter.add("notChildFilter", notChildFilter);
				filtersCollection.add("subFilter", subFilter);
				return filtersCollection;
			},

			/**
			 * Calls the service to change the hierarchy
			 * @param {Object} serviceArgs
			 */
			callHierarchicalService: function(serviceParameters) {
				var config = this.mixins.RelationshipsRecordsUtilities.getConfig.call(this, serviceParameters.parentElement.value,
						serviceParameters.childId, serviceParameters.schemaName, serviceParameters.parentColumnName);
				this.callService(config, function(response) {
					this.mixins.RelationshipsRecordsUtilities.addElementInHierarchy.call(this, response,
							serviceParameters.parentElement, serviceParameters.lookupParentColumnName);
				}, this);
			},
			/**
			 * Service callback set parent element into current.
			 * @private
			 * @param {Object} responseObject
			 * @param {Object} newParentValue
			 * @param {String} lookupParentColumnName
			 */
			addElementInHierarchy: function(responseObject, newParentValue, lookupParentColumnName) {
				if(responseObject) {
					var result = responseObject.UpdateRecordsResult;
					if (result.success) {
						this.set(lookupParentColumnName, newParentValue);
					} else {
						Terrasoft.utils.showInformation(result.errorInfo.message);
					}
				}
			}
		});
		return Ext.create(RelationshipsRecordsUtilitiesClass);
	});


