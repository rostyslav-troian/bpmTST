Terrasoft.configuration.Structures["ResponseExceptionHelper"] = {innerHierarchyStack: ["ResponseExceptionHelper"]};
define("ResponseExceptionHelper", ["ResponseExceptionHelperResources"],
	function(resources) {

		Ext.define("Terrasoft.configuration.ResponseExceptionHelper", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.ResponseExceptionHelper",

			converterToLocalizableString: function(message) {
				if (Ext.isEmpty(message)) {
					return;
				}
				if (message.indexOf("@") === 0) {
					var parameters = [];
					var stringValue = message;
					var startParametersIndex = message.indexOf("~");
					if (startParametersIndex !== -1) {
						parameters = message.substring(startParametersIndex + 1).split("~");
						stringValue = message.substring(0, startParametersIndex);
					}
					var stringValues = stringValue.split(",");
					var stringName = stringValues[1].split(".").join("");
					if (parameters != null) {
						return Ext.String.format(resources.localizableStrings[stringName], parameters);
					}
					return resources.localizableStrings[stringName];
				}
				return message;
			},

			GetExceptionMessage: function(ex) {
				return this.converterToLocalizableString(ex.message);
			}
		});
		return Ext.create("Terrasoft.ResponseExceptionHelper");

	});


