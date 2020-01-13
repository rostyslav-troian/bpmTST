define("SupplyPaymentPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		IncrementNumberSuffix: "LastNumber",
		IncrementMaskSuffix: "CodeMask",
		AmountNegative: "Amount cannot be negative",
		ProductTab: "Products",
		Currency: "Currency",
		CurrencyRate: "Exchange rate",
		AmountPlanNegative: "Value in the \u0022Expected amount\u0022 cannot be negative",
		AmountFactNegative: "Value in the \u0022Actual amount\u0022 cannot be negative",
		PercentageForSupplyIsNotEditableHint: "The \u0022Percentage, %\u0022 field is non-editable for delivery",
		PercentageForPaymentsWithProductIsNotEditableHint: "The \u0022Percentage, %\u0022 field is non-editable for payments containing products",
		ChangeInvoice: "An invoice has been generated for the payment. Do you want to modify the invoice data?",
		DatePlanTip: "Delivery and payment due date. The date is calculated automatically based on the previous step and the number of deferment days. You have to fill in the value manually when selecting the \u201CFixed date\u201D deferment type",
		PercentageTip: "The planned payment percentage or delivery percentage of the total order. The field automatically fills with the percentage that is not distributed between the delivery and payment for the current order. Products added during the delivery or payment step are included in the calculation",
		AmountPlanTip: "Expected delivery or payment amount. The amount is calculated based on the order rate or products added to the installment plan step",
		PreviousElementTip: "Previous payment or delivery date used to calculate the planned date of the current payment or delivery. This field is required if the \u201CDefer from due date\u201D or \u201CDefer from actual date\u201D value is specified in the [Deferment type] field",
		DelayTypeTip: "Deferment type to calculate the planned date of payment or delivery. The \u201CFixed date\u201D value  is used manually for the planned date and is always specified for the first record in the detail. The \u201CDefer from due date\u201D and \u201CDefer from actual date\u201D deferment types are used for automatic date calculation from the planned or actual date of payment or delivery. The [Previous entry] field is required when those values are selected. If the \u201CDefer from actual date\u201D deferment type contains no actual date specified on the previous step, the calculation is performed with the planed date of the previous step",
		ChangeInvoiceStatusWarning: "Are you sure you want to cancel the invoice and disconnect it from the installment plan?"
	};
	var localizableImages = {
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "SupplyPaymentPageV2",
				resourceItemName: "TagButtonIcon"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "SupplyPaymentPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "SupplyPaymentPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "SupplyPaymentPageV2",
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