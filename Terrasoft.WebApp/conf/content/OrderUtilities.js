Terrasoft.configuration.Structures["OrderUtilities"] = {innerHierarchyStack: ["OrderUtilities"]};
define("OrderUtilities", ["InvoiceConfigurationConstants", "OrderUtilitiesResources"],
	function(InvoiceConfigurationConstants, resources) {

		Ext.define("Terrasoft.configuration.mixins.OrderUtilities", {

			alternateClassName: "Terrasoft.OrderUtilities",

			/**
			 * ######### #### ## ########### ####.
			 * @protected
			 * @param {Object} config ######### #######.
			 * @param {Object} method ####### ### #########.
			 * @param {Function} scope ######## ##########.
			 */
			needToChangeInvoice: function(config, method, scope) {
				var needToChangeInvoiceResultHandler = this.needToChangeInvoiceResultHandler.bind(this);
				var self = this;
				var getSupplyPaymentElementEsq = this.getSupplyPaymentElementEsq.bind(this);
				return function() {
					var parrentArguments = arguments;
					var checkValidateColumns = self.checkValidateColumns.bind(this);
					var filterEntityName = config.name;
					var filterEntityId = config.getId.call(this);
					if (!filterEntityId) {
						method.apply(scope, parrentArguments);
						return;
					}
					if (!checkValidateColumns(config.validateColumns)) {
						method.apply(scope, parrentArguments);
						return;
					}
					var esq = getSupplyPaymentElementEsq(filterEntityName, filterEntityId);
					esq.getEntityCollection(function(result) {
						needToChangeInvoiceResultHandler(result, function(result) {
							if (result) {
								method.apply(scope, parrentArguments);
							}
						}, this);
					}, this);
				};
			},

			/**
			 * ######### #### ## ########### ####.
			 * @protected
			 * @param {Object} result ##### ## ####### ### esq.
			 * @param {Object} callback ####### ######### ######.
			 * @param {Function} scope ######## ##########.
			 */
			needToChangeInvoiceResultHandler: function(result, callback, scope) {
				if (result.success) {
					var collection = result.collection;
					if (collection && collection.getCount() > 0 &&
						collection.getByIndex(0).get("InvoiceCount") > 0) {
						this.showConfirmationDialog(resources.localizableStrings.ChangeInvoice,
							function(dialogResult) {
								callback.call(scope, (dialogResult ===
								this.Terrasoft.MessageBoxButtons.YES.returnCode));
							},
							["yes", "no"]
						);
					} else {
						callback.call(scope, true);
					}
				} else {
					throw new Terrasoft.UnknownException();
				}
			},

			/**
			 * ######## ##### ## ######### # ########### ## ######## #######.
			 * @protected
			 * @param {Array} validateColumns ##### ####### ### #########.
			 */
			checkValidateColumns: function(validateColumns) {
				var isNeedCheck = !validateColumns;
				if (validateColumns && this.changedValues) {
					this.Terrasoft.each(validateColumns, function(columnName) {
						if (this.changedValues.hasOwnProperty(columnName)) {
							isNeedCheck = true;
							return false;
						}
					}, this);
				}
				return isNeedCheck;
			},

			/**
			 * ########## esq ### ######## ####### ############ #####.
			 * @protected
			 * @param {Sting} filterEntityName ### ####### ### #######.
			 * @param {Guid} filterEntityId Id ###### ### ##########.
			 */
			getSupplyPaymentElementEsq: function(filterEntityName, filterEntityId) {
				var paymentStatus = InvoiceConfigurationConstants.Invoice.PaymentStatus;
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "SupplyPaymentElement"
				});
				esq.addAggregationSchemaColumn("Id", Terrasoft.AggregationType.COUNT, "InvoiceCount");
				esq.filters.add(filterEntityName, this.Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, filterEntityName, filterEntityId));
				esq.filters.add("Invoice.PaymentStatus", this.Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.NOT_EQUAL, "Invoice.PaymentStatus", paymentStatus.NotInvoiced));
				esq.filters.add("Invoice", this.Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.IS_NOT_NULL, "Invoice"));
				return esq;
			}
		});
		return Ext.create("Terrasoft.OrderUtilities");
	}
);


