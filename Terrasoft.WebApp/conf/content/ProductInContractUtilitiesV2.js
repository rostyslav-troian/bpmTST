Terrasoft.configuration.Structures["ProductInContractUtilitiesV2"] = {innerHierarchyStack: ["ProductInContractUtilitiesV2"]};
define("ProductInContractUtilitiesV2", [],
	function() {
		/**
		* @class Terrasoft.configuration.ProductInContractUtilities
		* ############### #####
		*/
		Ext.define("Terrasoft.configuration.ProductInContractUtilities", {
			alternateClassName: "Terrasoft.ProductInContractUtilities",

			scope: null,

			/**
			 * ######### ########## ######### ###### ### ###### #######,
			 * ####### ########## ####### # ####### #########.
			 * @private
			 * @param {String} orderId ############# ######.
			 * @param {String} contractId ############# ########.
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ########.
			 */
			openProductLookupToLink: function(orderId, contractId, callback, scope) {
				var config = {
					entitySchemaName: "OrderProduct",
					multiSelect: true,
					hideActions: true,
					columns: ["Name"]
				};
				this.scope = scope || this;
				this.Terrasoft = this.scope.Terrasoft;
				this.Ext = this.scope.Ext;
				this.callback = callback;

				var filters = this.Terrasoft.createFilterGroup();
				var idFilter = this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
					"Order", orderId);
				var contractIsNull = this.Terrasoft.createColumnIsNullFilter("Contract");
				filters.addItem(idFilter);
				filters.addItem(contractIsNull);
				config.filters = filters;
				this.scope.openLookup(config, function(response) {
					this.linkSelectedRecords(response, orderId, contractId);
				}, this);
			},

			/**
			 * ######### ##### ### ######### ######### # ####### #########.
			 * @private
			 * @param {Object} items ###### #### {columnName: string, selectedRows: []}.
			 * ######## ###### ######### ####### ## ###########.
			 * @param {String} orderId ############# ######.
			 * @param {String} contractId ############# ########.
			 */
			linkSelectedRecords: function(items, orderId, contractId) {
				var selectedRows = items.selectedRows.getKeys();
				if (items.selectedRows.getCount() > 0) {
					var update = this.Ext.create("Terrasoft.UpdateQuery", {
						rootSchemaName: "OrderProduct"
					});
					update.setParameterValue("Contract", contractId, this.Terrasoft.DataValueType.GUID);
					update.filters.addItem(this.Terrasoft.createColumnInFilterWithParameters("Id", selectedRows));
					update.execute(function() {
						this.updateContractAmount(orderId, contractId);
					}, this);
				}
			},

			/**
			 * ########## ######## # ####### #########.
			 * @private
			 * @param {String} orderId ############# ######.
			 * @param {String} contractId ############# ########.
			 */
			connectProducts: function(orderId, contractId) {
				var update = this.Ext.create("Terrasoft.UpdateQuery", {
					rootSchemaName: "OrderProduct"
				});
				update.setParameterValue("Contract", contractId, this.Terrasoft.DataValueType.GUID);
				update.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Order",  orderId));
				update.filters.addItem(this.Terrasoft.createColumnIsNullFilter("Contract"));
				update.execute(function() {
					this.updateContractAmount(orderId, contractId);
				}, this);
			},

			/**
			 * ######### ####### ############# ######### # #########.
			 * @private
			 * @param {String} orderId ############# ######.
			 * @param {Function} callback ####### ######### ######.
			 */
			getIsOrderHasUnlinkedProducts: function(orderId, callback) {
				var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "OrderProduct"
				});
				select.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Order",  orderId));
				select.filters.addItem(this.Terrasoft.createColumnIsNullFilter("Contract"));
				select.execute(function(response) {
					if (response && response.success) {
						if (response.collection.getCount() > 0) {
							callback.call(this, true);
						} else {
							callback.call(this, false);
						}
					}
				}, this);
			},

			/**
			 * ############ ##### ######### # ######## # ######### ##.
			 * @private
			 * @param {String} orderId ############# ######.
			 * @param {String} contractId ############# ########.
			 */
			updateContractAmount: function(orderId, contractId) {
				var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "OrderProduct"
				});
				select.addAggregationSchemaColumn("TotalAmount", this.Terrasoft.AggregationType.SUM, "TotalAmountSum");
				var filterGroup = new this.Terrasoft.createFilterGroup();
				filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
				filterGroup.add("OrderFilter", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Order", orderId));
				filterGroup.add("ContractFilter", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Contract", contractId));
				select.filters = filterGroup;
				select.getEntityCollection(function(response) {
					if (response.success && response.collection) {
						var items = response.collection.getItems();
						if (items.length > 0) {
							var update = this.Ext.create("Terrasoft.UpdateQuery", {
								rootSchemaName: "Contract"
							});
							update.setParameterValue("Amount", items[0].get("TotalAmountSum"),
								this.Terrasoft.DataValueType.MONEY);
							update.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "Id", contractId));
							update.execute(function() {
								if (this.callback) {
									this.callback.call(this.scope, contractId);
								}
							}, this);
						}
					}
				}, this);
			}
		});
		return Ext.create(Terrasoft.configuration.ProductInContractUtilities);
	});


