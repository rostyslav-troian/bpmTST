define("RegistrationResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Surname: "Last name",
		FirstName: "Name",
		AdditionalName: "Middle name",
		Email: "Email",
		Password: "Password",
		ConfirmPassword: "Password confirmation",
		Register: "Register",
		RequiredField: "Fill in the {0} field for registration and try again.",
		RequiredFields: "Fill in the {0} for registration and try again.",
		PasswordsDoNotMatch: "Passwords do not match. Fill in the fields and try again.",
		InvalidEmail: "Invalid email format. Enter new value and try once again.",
		SuccessMessage: "Registration confirmation link is sent to the specified email address.",
		IsAgreedRequired: "Please accept the terms and conditions"
	};
	var localizableImages = {
		BPMonlineCRM: {
			source: 3,
			params: {
				schemaName: "Registration",
				resourceItemName: "BPMonlineCRM",
				hash: "0ed286cca2b0c42106ff05dffa4769db",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});