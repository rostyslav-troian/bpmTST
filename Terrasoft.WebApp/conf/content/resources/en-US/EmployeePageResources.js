define("EmployeePageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		CareerTabCaption: "Career",
		CareerGeneralInfoGroupCaption: "General information",
		NameCaption: "Name",
		BaseInfoTabCaption: "Contact info",
		PhoneCaption: "Business phone",
		EmailCaption: "Email",
		BirthDateCaption: "Birth date",
		GenderCaption: "Gender",
		DateIsLessThanDateMessageTemplate: "The value in the \u0022{0}\u0022 field should be greater than the value in the \u0022{1}\u0022 field",
		UserIsActiveCaption: "Active",
		UserNameCaption: "User",
		AdministrationTabCaption: "User account",
		SysAdminUnitGeneralInfoGroupCaption: "User information",
		ContactTipMessage: "Non-editable field that is filled in when a new record is created",
		PhoneTipMessage: "Non-editable field that is filled in on the [Communication options] detail of the employee or contact page",
		EmailTipMessage: "Non-editable field that is filled in on the [Communication options] detail of the employee or contact page",
		BirthDateTipMessage: "Non-editable field that is filled in on the [Noteworthy events] detail of the employee or contact page",
		GenderTipMessage: "Non-editable field that is filled in on the contact page",
		SysAdminUnitTipMessage: "Non-editable field that is filled in automatically, if a system user account exists for the employee",
		UserIsActiveTipMessage: "Non-editable field that can be modified in the [System users] section of the System designer"
	};
	var localizableImages = {
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "EmployeePage",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		DefaultPhoto: {
			source: 3,
			params: {
				schemaName: "EmployeePage",
				resourceItemName: "DefaultPhoto",
				hash: "ed12916b583407914f22afb2a4581d7f",
				resourceItemExtension: ".svg"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "EmployeePage",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "EmployeePage",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "EmployeePage",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "EmployeePage",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "EmployeePage",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "EmployeePage",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "EmployeePage",
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