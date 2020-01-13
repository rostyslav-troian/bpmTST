define("BaseOrderPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		OrderPassport: "Order details",
		AgreementDocument: "Agreement terms",
		Visa: "Approvals",
		History: "History",
		FileNotes: "Attachments and notes",
		StartDateCaption: "Registration date",
		RequiredFieldsMessage: "Please fill in the \u0022Customer\u0022 field",
		DateLessActualDate: "Order date cannot be later than completion date",
		ValidatePaymentAmountNegative: "Payment amount cannot be negative",
		ValidatePaymentAmount: "Payment amount cannot exceed order amount",
		OrderHistoryTabCaption: "History",
		OrderVisaTabCaption: "Approvals",
		OrderPassportTabCaption: "Order details",
		LeadTabCaption: "Leads",
		FileNotesTabCaption: "Attachments and notes",
		DateLessDueDate: "Order date cannot be later than the planned end date",
		ValidateOrderStatus: "Amount of payments in the order does not match the sum of products. Please, make the necessary changes",
		Client: "Customer",
		CreateContract: "New contract based on order",
		OrderProduct: "Products",
		OrderDelivery: "Delivery",
		OrderResults: "Summary",
		OrderReceiverInformationGroupCaption: "Recipient information",
		OrderGeneralInformationTabCaption: "General information",
		DeliveryAndPaymentGroupCaption: "Delivery and payment",
		ClientTip: "A company or private person for whom the order was created. Records from the [Accounts] and [Contacts] section are available in this field. \u003Ca href=\u0022#\u0022 data-context-help-id=\u00221571\u0022\u003ERead more\u003C\/a\u003E",
		OwnerTip: "Full name of the record owner. Select the owner from the contacts registered as users in the system.",
		OpportunityTip: "An opportunity for which the order was created. The lookups are filtered by the contact and account specified in the order",
		PaymentAmountTip: "This field is non-editable and is calculated automatically based on the amount in the [Installment plan] detail. \u003Ca href=\u0022#\u0022 data-context-help-id=\u00221582\u0022 \u003ERead more\u003C\/a\u003E",
		AmountTip: "Total price for products in the order. This field is non-editable and is calculated automatically based on the product price on the [Products] detail",
		ChangeInvoice: "An invoice has been generated for the payment. Do you want to modify the invoice data?",
		OpportunityCaption: "Opportunity"
	};
	var localizableImages = {
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "BaseOrderPage",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseOrderPage",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseOrderPage",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseOrderPage",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseOrderPage",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "BaseOrderPage",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "BaseOrderPage",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "BaseOrderPage",
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