Terrasoft.configuration.Structures["OpportunityOrderUtilities"] = {innerHierarchyStack: ["OpportunityOrderUtilities"]};
define("OpportunityOrderUtilities", ["OpportunityOrderUtilitiesResources", "ProcessModuleUtilities", "LookupUtilities"],
	function(resources, ProcessModuleUtilities, LookupUtilities) {
		Ext.define("Terrasoft.configuration.mixins.OpportunityOrderUtilities", {
			alternateClassName: "Terrasoft.OpportunityOrderUtilities",

			//region Methods: Private

			/**
			 * Runs order creation business process.
			 * @private
			 * @param {Object} arg Arguments for new business process creation.
			 * @param {Object} [arg.selectedRows] Collection of row items that were selected.
			 * @param {Boolean} [arg.IsCopyAllProduct] Will select all rows if true.
			 */
			runProcessCreateOrder: function(arg) {
				var selectedProduct = [];
				var isCopyAllProduct = false;
				if (arg && arg.selectedRows) {
					var itemCol = arg.selectedRows.getItems();
					for (var i = 0; i < itemCol.length; i++) {
						selectedProduct.push(itemCol[i].Id);
					}
				}
				if (arg && arg.IsCopyAllProduct) {
					isCopyAllProduct = arg.IsCopyAllProduct;
				}
				var processId = this.get("processId");
				var processIdValue = Ext.isObject(processId) ? processId.value : processId;
				ProcessModuleUtilities.executeProcess({
					sysProcessId: processIdValue,
					parameters: {
						CurrentOpportunity: this.getCurrentOpportunityId(),
						ProductItems: selectedProduct,
						IsCopyAllProduct: isCopyAllProduct
					}
				});
			},

			/**
			 * Shows copy product dialog.
			 * @private
			 * @param {Object} config Configuration object.
			 */
			showProductDialog: function(config) {
				var scope = this;
				Terrasoft.utils.showMessage({
					caption: resources.localizableStrings.CreateOrderQuestionCaption,
					buttons: [{
						className: "Terrasoft.Button",
						returnCode: "ButtonAll",
						style: "blue",
						caption: resources.localizableStrings.QuestionAllCaption
					}, {
						className: "Terrasoft.Button",
						returnCode: "ButtonChoice",
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: resources.localizableStrings.QuestionChoiceCaption
					}, "cancel"],
					defaultButton: 0,
					style: Terrasoft.MessageBoxStyles.BLUE,
					handler: function(buttonCode) {
						if (buttonCode === "ButtonAll") {
							scope.runProcessCreateOrder({"IsCopyAllProduct": true});
						}
						if (buttonCode === "ButtonChoice") {
							config.entitySchemaName = "Product";
							config.multiSelect = true;
							config.columns = ["Name"];
							config.actionsMenuConfig = [{
								caption: resources.localizableStrings.UnselectCaption,
								visible: {bindTo: "isUnSelectAllMenuVisible"},
								enabled: {bindTo: "isAnySelected"},
								click: {bindTo: "clearSelection"}
							}];
							LookupUtilities.Open(scope.sandbox, config, scope.runProcessCreateOrder, scope, null, false, false);
						}
					}
				});
			},

			/**
			 * Returns EntitySchemaQuery with the "Id" column.
			 * @private
			 * @param {String} currentOpportunityId Active opportunity Id.
			 * @return {Terrasoft.EntitySchemaQuery}
			 */
			getProductsEsq: function(currentOpportunityId) {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "Product"
				});
				esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
				var filter = this.getSearchDataFilter(currentOpportunityId);
				esq.filters.add("searchDataFilter", filter);
				return esq;
			},

			/**
			 * Returns comparison filter for current opportunity.
			 * @private
			 * @param {String} currentOpportunityId Active opportunity Id.
			 * @return {Terrasoft.CompareFilter}
			 */
			getSearchDataFilter: function(currentOpportunityId) {
				var filter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"[OpportunityProductInterest:Product].Opportunity", currentOpportunityId);
				return filter;
			},

			/**
			 * Starts CreateOrderFromOpportunity business process.
			 * @private
			 * @param {Terrasoft.EntitySchemaQuery} esq
			 * @param {Object} config Configuration object
			 */
			showDialogOrProceed: function(esq, config) {
				var scope = this;
				esq.getEntityCollection(function(result) {
					var collection = result.collection;
					if (collection.getCount() > 0) {
						config.selectedRows = [];
						collection.each(function(item) {
							config.selectedRows.push(item.get("Id"));
						});
						scope.showProductDialog(config);
					} else {
						scope.runProcessCreateOrder();
					}
				}, this);
			},

			// endregion

			//region Properties: Protected

			/**
			 * Starts CreateOrderFromOpportunity business process.
			 * @protected
			 */
			CreateOrderFromOpportunity: function() {
				var sysSettingName = "CreateOrderFromOpportunityProcess";
				var currentOpportunityId = this.getCurrentOpportunityId();
				if (!currentOpportunityId) {
					var invalidMessage = resources.localizableStrings.CurrentOpportunityNotFound;
					this.Terrasoft.showInformation(invalidMessage);
					return;
				}
				Terrasoft.SysSettings.querySysSettings([sysSettingName], function(result) {
					var processId = result[sysSettingName];
					this.set("processId", processId);
					var config = {};
					if (Ext.isEmpty(processId)) {
						var invalidMessage = resources.localizableStrings.ProcessOrderFromOpportunityNotFound;
						this.showInformationDialog(invalidMessage);
						return;
					}
					var esq = this.getProductsEsq(currentOpportunityId);
					config.filters = esq.filters.get("searchDataFilter");
					this.showDialogOrProceed(esq, config);
				}, this);
			},

			/**
			 * Returns Current opportunity id.
			 * @abstract
			 * @return {String}
			 */
			getCurrentOpportunityId: Terrasoft.abstractFn,

			// endregion

			//region Properties: Public
			/**
			 * Returns CreateOrderFromOpportunity button caption.
			 * @public
			 * @return {String} Button caption text.
			 */
			getButtonCaption: function() {
				var buttonCaption = resources.localizableStrings.CreateOrderFromOpportunityButtonCaption;
				return buttonCaption;
			}

			// endregion

		});
	});


