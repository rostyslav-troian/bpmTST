define("ContractPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NumberCaption: "Number",
		StartDateCaption: "Start date",
		EndDateCaption: "End date",
		TypeCaption: "Type",
		NameCaption: "Name",
		StateCaption: "Status",
		AccountCaption: "Account",
		OwnerCaption: "Owner",
		ContactCaption: "Customer contact",
		OwnerAccountCaption: "Supplier",
		groupCaption: "",
		HistoryTab: "History",
		ParentCaption: "Parent contract",
		NotesAndFilesTab: "Attachments and notes",
		NumberMustBeUnique: "The entered number is already in use. Please enter another contract number.",
		OurCompanyCaption: "Supplier",
		GeneralInfoTabCaption: "General information",
		ContractConnectionsGroupCaption: "Connected to",
		HistoryTabCaption: "History",
		ContractSumCaption: "Amount",
		ContractVisaTabCaption: "Approvals",
		LinkProductCaption: "Which of the ordered products do you want to add to the contract {0}?",
		QuestionAllCaption: "Add all",
		QuestionChoiceCaption: "Select products",
		ContractPassportTab: "Contract details",
		DueDateLowerStartDate: "Contract start date cannot be later than contract end date",
		ConvertOrdersCurrencyMessage: "Order currency for this contract will be converted into the base currency. Continue?",
		ChangeOrdersCurrencyButtonCaption: "Change order currency",
		CustomerBillingInfoTip: "Banking details of an account. Go to the [Banking details] of the account page to add a new value",
		SupplierBillingInfoTip: "Banking details of our company. The list of field values is generated based on the [Banking details] specified for our company",
		OwnerTip: "Full name of the record owner. Select the owner from the contacts registered as users in the system.",
		ParentTip: "The parental agreement towards current document. Available for editing only for specifications and additional agreements. This field is editable and is completed automatically when adding records on the [Subordinate contracts] detail",
		OrderTip: "If the [Account] field is specified, only orders for the selected account are available",
		AmountTip: "Total contract amount. If the contract is created based on an order, the field becomes non-editable and is calculated as a total amount of products in the contract. The products are copied to the contract from the order.\nThe field is editable, if the contract is not connected to an order\n\u003Ca href=\u0022#\u0022 data-context-help-id=\u00221582\u0022 \u003ERead more\u003C\/a\u003E"
	};
	var localizableImages = {
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "ContractPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "ContractPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "ContractPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "ContractPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "ContractPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "ContractPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "ContractPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "ContractPageV2",
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