define("InvoicePageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GeneralInfoTabCaption: "General information",
		InvoiceProductsTabCaption: "Products",
		InvoiceHistoryTabCaption: "History",
		InvoiceVisaTabCaption: "Approvals",
		InvoiceFileNotesTabCaption: "Attachments and notes",
		InvoiceLineTabCaption: "Feed",
		SumGroupCaption: "Amount",
		PaymentGroupCaption: "Payment",
		LinksGroupCaption: "Connected to",
		RemindCaption: "Remind",
		RequiredCurrencyRateMessage: "Value in the \u0022Exchange rate\u0022 field should be greater than zero",
		RequiredFieldsMessage: "Please, fill in either the \u0022Account\u0022 or \u0022Contact\u0022 field",
		CurrencyRateDateQuestion: "Use the exchange rate on the specified date?",
		ClientDetails: "Customer details",
		SupplierDetails: "Supplier details",
		ActionPlatesButtonCaption: "PRINTABLES",
		ActionInvoiceButtonCaption: "Invoice",
		RemindDateCaption: "Remind on",
		RemindControlGroupCaption: "Reminders",
		RemindToOwnerCaption: "Remind owner",
		CopyProductsQuestion: "Add products from original invoice?",
		CopyProductsError: "Error when copying products : {0}",
		StartDateCaption: "Date",
		CleanupSupplyPaymentElement: "Are you sure you want to cancel the invoice and disconnect it from the installment plan?",
		Client: "Customer",
		NumberTip: "Invoice number. This field is non-editable and is completed automatically according to the template",
		ClientTip: "A company or private person for whom the invoice was issued. Records from the [Accounts] and [Contacts] section are available in this field. \u003Ca href=\u0022#\u0022 data-context-help-id=\u00221571\u0022 \u003ERead more\u003C\/a\u003E",
		CustomerBillingInfoTip: "Banking details of the customer. Go to the [Banking details] of the account page to add a new detail",
		SupplierBillingInfoTip: "Banking details of the company that issued the invoice. These are based on the [Banking details] detail of the account page specified in the [Supplier] field",
		OrderTip: "Order number. This field is non-editable and is completed automatically when adding an invoice based on the order",
		OwnerTip: "Full name of the record owner. Select the owner from the contacts registered as users in the system.",
		ContractTip: "The contract for which the invoice was issued. The lookups are filtered by contact and account specified in the invoice.",
		OpportunityTip: "An opportunity for which the invoice was issued. The lookups are filtered by the contact and account specified in the invoice",
		AmountTip: "Total amount of products in the invoice. This field is non-editable unless there are no records on the [Products] detail"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "InvoicePageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "InvoicePageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "InvoicePageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "InvoicePageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "InvoicePageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "InvoicePageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "InvoicePageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "InvoicePageV2",
				resourceItemName: "OpenChangeLogBtnImage",
				hash: "cbebcb32589828e1055caf62150ff717",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});