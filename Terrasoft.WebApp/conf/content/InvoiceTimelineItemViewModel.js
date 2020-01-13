Terrasoft.configuration.Structures["InvoiceTimelineItemViewModel"] = {innerHierarchyStack: ["InvoiceTimelineItemViewModel"]};
define("InvoiceTimelineItemViewModel", ["InvoiceTimelineItemViewModelResources", "BaseTimelineItemViewModel"],
	function() {
		/**
		 * @class Terrasoft.configuration.InvoiceTimelineItemViewModel
		 * Invoice timeline item view model class.
		 */
		Ext.define("Terrasoft.configuration.InvoiceTimelineItemViewModel", {
			alternateClassName: "Terrasoft.InvoiceTimelineItemViewModel",
			extend: "Terrasoft.BaseTimelineItemViewModel",

			// region Methods: Protected

			/**
			 * Sets primary currency symbol. Callback function.
			 * @protected
			 * @param {Object} response Response object for esq request.
			 */
			setPrimaryCurrencySymbolCallback: function(response) {
				if (response && response.success) {
					this.set("PrimaryCurrencySymbol", response.entity.get("Symbol"));
				}
			},

			/**
			 * Sets primary currency symbol.
			 * @protected
			 * @param {String} currency lookup value.
			 */
			setPrimaryCurrencySymbol: function(currency) {
				if (!Ext.isEmpty(currency)) {
					var currencyId = currency.value;
					var cacheItemName = "TimelinePrimaryCurrencySymbol_" + currencyId;
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "Currency"
					});
					esq.clientESQCacheParameters = {cacheItemName: cacheItemName};
					esq.serverESQCacheParameters = {
						cacheLevel: Terrasoft.ESQServerCacheLevels.SESSION,
						cacheGroup: "Timeline",
						cacheItemName: cacheItemName
					};
					esq.addColumn("Symbol");
					esq.getEntity(currencyId, this.setPrimaryCurrencySymbolCallback, this);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseTimelineItemViewModel#initDefaultValues
			 * @override
			 */
			initDefaultValues: function() {
				Terrasoft.SysSettings.querySysSettingsItem("PrimaryCurrency", this.setPrimaryCurrencySymbol, this);
				this.callParent(arguments);
			},

			/**
			 * Returns caption with currency symbol.
			 * @protected
			 * @param {String} caption Field caption.
			 * @param {String} currencySymbol Symbol of currency.
 			 * @return {String} Amount caption text with currency symbol suffix.
			 */
			getCaptionWithCurrencySymbol: function(caption, currencySymbol) {
				return currencySymbol
					? caption + ", " + currencySymbol
					: caption;
			},

			// endregion

			// region Methods: Public

			/**
			 * Concatenates amount caption text with current currency symbol.
			 * @return {String} Amount caption text with currency symbol suffix.
			 */
			getAmountWithCurrencyCaption: function() {
				var amountCaption = this.get("Resources.Strings.AmountCaption");
				var currencySymbol = this.get("PrimaryCurrencySymbol");
				return amountCaption
					? this.getCaptionWithCurrencySymbol(amountCaption, currencySymbol)
					: "";
			},

			/**
			 * Concatenates payment amount caption text with current currency symbol.
			 * @return {String} Amount caption text with currency symbol suffix.
			 */
			getPaymentAmountWithCurrencyCaption: function() {
				var paymentAmountCaption = this.get("Resources.Strings.PaymentAmountCaption");
				var currencySymbol = this.get("PrimaryCurrencySymbol");
				return paymentAmountCaption
					? this.getCaptionWithCurrencySymbol(paymentAmountCaption, currencySymbol)
					: "";
			}

			// endregion
		});
	});


